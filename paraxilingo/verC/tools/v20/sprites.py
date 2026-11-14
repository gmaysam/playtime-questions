import json,re,os,subprocess,wave,csv,sys
S='/tmp/claude-0/-home-claude/4b546809-d061-5b8c-bae2-78a259824393/scratchpad'
d=json.load(open(f'{S}/sh8/dump.json'))
txt={}
for r in csv.reader(open('/home/claude/playtime-library/library/voices/clips.csv',encoding='utf-8-sig')):
    if len(r)>=4: txt[r[0][:-4]]=r[3]
# clip -> group, in order of first appearance
order=[]
def walk(o,g):
    s=json.dumps(o)
    for c in re.findall(r'"w/([A-Za-z0-9_]+)"',s):
        if c not in seen: seen[c]=g;order.append(c)
seen={}
for f in d['fixed']: walk(f,'f_'+f['cat'])
walk(d['tf'],'f_sky');walk(d['stories'],'stories')
for g in d['gen']: walk(g,'g_'+g['cat'])
groups={}
for c in order: groups.setdefault(seen[c],[]).append(c)
SR=22050;gap=int(.12*SR);index={}
os.makedirs(f'{S}/qc/build/wav',exist_ok=True)
for g,cl in groups.items():
    frames=bytearray();pos=0
    for c in cl:
        w=f'{S}/qc/build/wav/{c}.wav'
        if not os.path.exists(w): subprocess.run(['ffmpeg','-v','error','-y','-i',f'{S}/appC/audio/w/{c}.mp3','-ac','1','-ar',str(SR),'-sample_fmt','s16',w],check=True)
        with wave.open(w) as wf: fr=wf.readframes(wf.getnframes())
        n=len(fr)//2;index[c]=[g,round(pos/SR,3),round(n/SR,3)];frames+=fr+b'\0\0'*gap;pos+=n+gap
    out=f'{S}/qc/build/{g}.wav'
    with wave.open(out,'wb') as wf: wf.setnchannels(1);wf.setsampwidth(2);wf.setframerate(SR);wf.writeframes(bytes(frames))
    subprocess.run(['ffmpeg','-v','error','-y','-i',out,'-c:a','libmp3lame','-b:a','40k','-ar',str(SR),f'{S}/qc/site/aud/{g}.mp3'],check=True)
    print(g,len(cl),round(os.path.getsize(f'{S}/qc/site/aud/{g}.mp3')/1e6,2),'MB')
json.dump({'idx':index,'txt':{c:txt.get(c,'') for c in index}},open(f'{S}/qc/build/audio.json','w'),ensure_ascii=False)
