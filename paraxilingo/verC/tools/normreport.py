import json,re,os,collections
R=json.load(open('/tmp/norm.json'));A='/home/claude/playtime-questions/paraxilingo/verC/audio/'
flags=collections.defaultdict(list)
for r in R:
    if 'err' in r: flags['ERROR'].append((r['tag'],r['err']));continue
    t=re.sub(r'@\d+','',r['tag']);said=r['said']
    if not said: flags['NOTHING READ'].append((t,r['content'][:90]))
    for c in said:
        if not os.path.exists(A+c+'.mp3'): flags['MISSING FILE'].append((t,c))
    nb=len([b for b in r['btns'] if b.lower()!='say it'])
    if nb==2 and r['optSaid']>0: flags['2 ANSWERS READ'].append((t,r['content'][:60],r['btns']))
# statement not voiced: same said (minus answers) for different content
G=collections.defaultdict(dict)
for r in R:
    if 'err' in r or not r['said']:continue
    t=re.sub(r'@\d+','',r['tag']);G[t].setdefault(tuple(r['said'][:3]),set()).add(r['content'])
for t,m in G.items():
    for k,cs in m.items():
        cs={re.sub(r'\d+','#',c) for c in cs}
        if len(cs)>1: flags['SAME VOICE, DIFFERENT TEXT'].append((t,list(cs)[:3]))
for k,v in flags.items():
    seen=set();u=[x for x in v if not (str(x[0]) in seen or seen.add(str(x[0])))]
    print(f'== {k}: {len(v)} ({len(u)} kinds)')
    for x in u[:40]: print('  ',x)
