#!/usr/bin/env python3
"""Make the voice clips light and snappy for the web build (the originals in the source and the pool stay untouched):
   - cut the quiet bit at the start to 0.05 s and at the end to 0.1 s, so clips in a row follow each other quickly
   - mono MP3 at 64 kbps (clear for speech, about a third smaller than 96 kbps); clips already at 64 kbps or less keep their rate
   Results are cached by the file's content, so a rebuild only does the new or changed clips.
usage: optaudio.py <Web/audio/w dir> [cache dir]"""
import sys, os, hashlib, subprocess, shutil, json
from concurrent.futures import ThreadPoolExecutor
D = sys.argv[1]; C = sys.argv[2] if len(sys.argv) > 2 else '/home/claude/build/acache'
os.makedirs(C, exist_ok=True)
AF = ('silenceremove=start_periods=1:start_silence=0.05:start_threshold=-42dB,areverse,'
      'silenceremove=start_periods=1:start_silence=0.1:start_threshold=-42dB,areverse')
def br(f):
    try: return int(json.loads(subprocess.run(['ffprobe','-v','error','-show_entries','format=bit_rate','-of','json',f],capture_output=True,text=True).stdout)['format']['bit_rate'])//1000
    except Exception: return 96
def one(name):
    f = os.path.join(D, name); data = open(f, 'rb').read()
    key = hashlib.sha1(data + b'v1').hexdigest(); out = os.path.join(C, key + '.mp3')
    if not os.path.exists(out):
        rate = min(64, max(32, br(f)))
        tmp = out + '.tmp.mp3'
        r = subprocess.run(['ffmpeg','-nostdin','-y','-loglevel','error','-i',f,'-af',AF,'-ac','1','-b:a',f'{rate}k',tmp])
        ok = r.returncode == 0 and os.path.exists(tmp) and os.path.getsize(tmp) > 800
        if ok and os.path.getsize(tmp) < len(data): os.replace(tmp, out)
        else:
            if os.path.exists(tmp): os.remove(tmp)
            open(out, 'wb').write(data)          # keep the original when the light copy is not smaller or failed
    shutil.copyfile(out, f)
    return len(data), os.path.getsize(f)
names = [n for n in os.listdir(D) if n.endswith('.mp3')]
with ThreadPoolExecutor(max_workers=os.cpu_count() or 4) as ex: res = list(ex.map(one, names))
a = sum(x for x, _ in res); b = sum(y for _, y in res)
print('audio', len(names), 'clips', round(a/1e6, 1), 'MB ->', round(b/1e6, 1), 'MB')
