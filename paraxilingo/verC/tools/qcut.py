import json,re,subprocess,sys,os
LIB='/home/claude/playtime-library/library';OUT=sys.argv[1]
c=json.load(open(f'{LIB}/questions/catalog.json'))['questions']
def dur(f):return float(subprocess.run(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
def sil(f):
    e=subprocess.run(['ffmpeg','-i',f,'-af','silencedetect=noise=-38dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',e)];en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',e)]
    return list(zip(st,en))
rep=[]
for q in c:
    if q['status']!='in the games' or q['game']!="Today's Quiz" or q['kind']!='choose':continue
    t=q.get('question_farsi','');m=re.match(r'^(.*؟)\s+([^؟]*[A-Za-z][^؟]*)؟\s*$',t)
    if not m:continue
    f=f"{LIB}/quiz_voices/{q['id']}_q_lulu.mp3"
    if not os.path.exists(f):continue
    d=dur(f);est=len(m.group(1))/len(t)*d
    ss=[s for s in sil(f) if 0.3<s[0]<d-0.3]
    if not ss:rep.append((q['id'],'NO SILENCE',round(d,2),round(est,2)));continue
    s=min(ss,key=lambda s:abs(s[0]-est))
    if abs(s[0]-est)>1.2:rep.append((q['id'],'FAR',round(d,2),round(est,2),s));continue
    cut=min(s[0]+0.12,s[1])
    o=f"{OUT}/{q['id']}_qs_lulu.mp3"
    subprocess.run(['ffmpeg','-y','-v','0','-i',f,'-t',f'{cut:.3f}','-af',f'afade=t=out:st={max(0,cut-0.08):.3f}:d=0.08','-c:a','libmp3lame','-b:a','64k',o],check=True)
    rep.append((q['id'],'ok',round(d,2),round(est,2),round(cut,2)))
for r in rep:print(*r)
