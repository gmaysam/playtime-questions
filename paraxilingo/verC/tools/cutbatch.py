"""Cut one long ElevenLabs take into clips: the N-1 longest pauses are the cuts.
usage: python3 cutbatch.py take.mp3 names.json outdir   (names.json: list of clip names in order)"""
import json,re,subprocess,sys
mp3,names,out=sys.argv[1],json.load(open(sys.argv[2])),sys.argv[3]
dur=float(subprocess.run(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout)
log=subprocess.run(['ffmpeg','-i',mp3,'-af','silencedetect=n=-38dB:d=0.18','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',log)];en=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',log)]
inner=[(a,b) for a,b in zip(st,en) if a>0.05 and b<dur-0.05]
top=sorted(sorted(inner,key=lambda s:s[1]-s[0])[-(len(names)-1):])
assert len(top)==len(names)-1,(len(top),len(names))
segs=[(0,top[0][0]+0.08)]+[(top[i][1]-0.06,top[i+1][0]+0.1) for i in range(len(top)-1)]+[(top[-1][1]-0.06,dur)]
for (a,b),n in zip(segs,names):
    d=b-a;subprocess.run(['ffmpeg','-y','-v','error','-ss',f'{a:.3f}','-t',f'{d:.3f}','-i',mp3,'-af',f'silenceremove=stop_periods=-1:stop_duration=0.3:stop_threshold=-45dB,afade=t=in:d=0.02,afade=t=out:st={max(0,d-0.08):.3f}:d=0.06','-b:a','128k',f'{out}/{n}.mp3'],check=True)
    print(n,round(d,2))
