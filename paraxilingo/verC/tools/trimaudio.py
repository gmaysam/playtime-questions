#!/usr/bin/env python3
"""Cut the quiet bit at the start (and long quiet at the end) of every voice clip, so Lulu starts talking
right away. Cached by the file's hash.  usage: trimaudio.py <audio dir> <cache dir>"""
import os,sys,hashlib,subprocess,shutil
from concurrent.futures import ThreadPoolExecutor
D,C=sys.argv[1:3];os.makedirs(C,exist_ok=True)
F="silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.12,areverse"
def one(f):
    p=os.path.join(D,f);h=hashlib.md5(open(p,'rb').read()).hexdigest()
    if os.path.exists(os.path.join(C,h+'.ok')):return 0
    out=os.path.join(C,h+'.mp3')
    if not os.path.exists(out):
        sr=subprocess.run(['ffprobe','-v','0','-show_entries','stream=sample_rate','-of','csv=p=0',p],capture_output=True,text=True).stdout.strip() or '44100'
        tmp=out+'.tmp.mp3'
        r=subprocess.run(['ffmpeg','-v','error','-y','-i',p,'-af',F,'-ar',sr,'-ac','1','-c:a','libmp3lame','-b:a','48k' if sr=='16000' else '96k',tmp])
        if r.returncode or os.path.getsize(tmp)<800:
            try:os.remove(tmp)
            except OSError:pass
            open(os.path.join(C,h+'.ok'),'w').close();return 0
        os.replace(tmp,out)
    shutil.copy(out,p);open(os.path.join(C,hashlib.md5(open(p,'rb').read()).hexdigest()+'.ok'),'w').close();return 1
fs=[f for f in os.listdir(D) if f.endswith('.mp3')]
with ThreadPoolExecutor(8) as ex:n=sum(ex.map(one,fs))
print('trim: %d of %d clips trimmed'%(n,len(fs)))
