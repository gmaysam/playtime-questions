import json,subprocess,re,os
L='/home/claude/playtime-library/library/quiz_voices'
first=[0.66,4.28,7.54,10.92,14.68,18.8,22.22,25.36,28.96,32.56,36.34,40.04,43.94,47.36,51.0,54.52,58.1,62.32,65.5,68.76,72.68,76.6,79.66,83.14,86.8,90.4,94.14,97.62,101.56,105.06,108.8,112.06,115.82,119.44,122.86,126.92,130.139,133.8,137.54,142.06,144.78,148.4]
off=json.load(open('qcut/off2.json'));ids=[k for k,v in sorted(off.items(),key=lambda x:x[1][0]) if not k.startswith('x')]
assert len(ids)==len(first)
dur=lambda f:float(subprocess.run(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
def sil(f):
    e=subprocess.run(['ffmpeg','-i',f,'-af','silencedetect=noise=-38dB:d=0.1','-f','null','-'],capture_output=True,text=True).stderr
    return list(zip([float(x) for x in re.findall(r'silence_start: ([\d.]+)',e)],[float(x) for x in re.findall(r'silence_end: ([\d.]+)',e)]))
os.system('rm -f qcut/*_qs_lulu.mp3')
for i,w in zip(ids,first):
    t0,s=off[i];f=f'{L}/{i}_q_lulu.mp3';rel=w-t0;start=s+rel
    SKIP={'a10':2,'a14':1,'a15':1,'b04':2,'b12':2,'b14':2,'s05':1,'s11':1,'d01':1}
    if i in SKIP:   # the first answer began before the window: cut at the pause before it
        ss=[x for x in sil(f) if x[1]<=start+0.02 and x[0]>start-4]
        start=ss[-SKIP[i]][1] if len(ss)>=SKIP[i] else None;how='pause %s'%[(round(a,2),round(b,2)) for a,b in ss]
    else:how='words'
    if start is None:print(i,'?');continue
    cut=start-0.06
    subprocess.run(['ffmpeg','-y','-v','0','-i',f,'-t',f'{cut:.3f}','-af',f'afade=t=out:st={max(0,cut-0.06):.3f}:d=0.06','-c:a','libmp3lame','-b:a','64k',f'qcut/{i}_qs_lulu.mp3'],check=True)
    print(i,how,round(dur(f),2),'->',round(cut,2))
