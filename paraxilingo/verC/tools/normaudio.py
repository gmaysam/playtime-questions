#!/usr/bin/env python3
"""Make every voice clip equally loud (-18 LUFS) so questions, praise and facts sound alike.
Cached by the original file's hash, so only new or changed clips are processed.  usage: normaudio.py <audio dir> <cache dir>"""
import os,sys,hashlib,subprocess,shutil
from concurrent.futures import ThreadPoolExecutor
D,C=sys.argv[1:3];os.makedirs(C,exist_ok=True)
def one(f):
    p=os.path.join(D,f);h=hashlib.md5(open(p,'rb').read()).hexdigest();out=os.path.join(C,h+'.mp3')
    if os.path.exists(os.path.join(C,h+'.done')):return 0          # this file is already a normalized output
    if not os.path.exists(out):
        sr=subprocess.run(['ffprobe','-v','0','-show_entries','stream=sample_rate','-of','csv=p=0',p],capture_output=True,text=True).stdout.strip() or '44100'
        tmp=out+'.tmp.mp3'
        r=subprocess.run(['ffmpeg','-v','error','-y','-i',p,'-af','loudnorm=I=-18:TP=-1.5:LRA=11','-ar',sr,'-ac','1','-c:a','libmp3lame','-b:a','48k' if sr=='16000' else '96k',tmp])
        if r.returncode:return 0
        os.replace(tmp,out)
    shutil.copy(out,p);open(os.path.join(C,hashlib.md5(open(p,'rb').read()).hexdigest()+'.done'),'w').close();return 1
fs=[f for f in os.listdir(D) if f.endswith('.mp3')]
with ThreadPoolExecutor(8) as ex:n=sum(ex.map(one,fs))
print('loudness: %d of %d clips updated'%(n,len(fs)))
