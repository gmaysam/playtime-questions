#!/usr/bin/env python3
"""Cut a long take into lines using a word-timed transcript (ElevenLabs scribe).
usage: wordcut.py take.mp3 lines.json status_result.json outdir"""
import json,sys,re,difflib,subprocess
mp3,lines,tr,out=sys.argv[1],json.load(open(sys.argv[2])),json.load(open(sys.argv[3])),sys.argv[4]
W=[w for w in tr['transcripts'][0]['words'] if (w.get('type','word')=='word')]
def norm(s):return re.sub(r'[ً-ْ‌‍«»!?.,،؛:;"\'\-–…]','',s).replace('ي','ی').replace('ك','ک').lower()
P=[];  # prompt words with line index
for i,(n,t) in enumerate(lines):
    for w in t.split():
        if norm(w):P.append((norm(w),i))
T=[norm(w['text']) for w in W]
sm=difflib.SequenceMatcher(None,[p for p,_ in P],T,autojunk=False)
first={};last={}
for a,b,size in sm.get_matching_blocks():
    for k in range(size):
        i=P[a+k][1];w=W[b+k];first.setdefault(i,w['start']);last[i]=w['end']
dur=float(subprocess.run(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout)
miss=[lines[i][0] for i in range(len(lines)) if i not in first]
print('lines',len(lines),'matched',len(first),'missing',miss)
for i,(n,t) in enumerate(lines):
    if i not in first:continue
    # extend to midpoint of the gap with neighbours
    a=first[i];b=last[i]
    pa=max([last[j] for j in last if j<i] or [0]);nb=min([first[j] for j in first if j>i] or [dur])
    s=max(pa,a-0.12) if pa<a else a-0.05; e=min(nb,b+0.18) if nb>b else b+0.05
    s=max(0,s);d=e-s
    subprocess.run(['ffmpeg','-y','-v','error','-ss',f'{s:.3f}','-t',f'{d:.3f}','-i',mp3,'-af',f'afade=t=in:d=0.02,afade=t=out:st={max(0,d-0.06):.3f}:d=0.05','-b:a','128k',f'{out}/{n}.mp3'],check=True)
    print(n,f'{d:.2f}',len(t))
