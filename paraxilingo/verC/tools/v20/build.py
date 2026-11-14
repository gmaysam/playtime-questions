import json,glob,re
S='/tmp/claude-0/-home-claude/4b546809-d061-5b8c-bae2-78a259824393/scratchpad'
d=json.load(open(f'{S}/sh8/dump.json'));res={}
for f in glob.glob(f'{S}/qc/shots/res_*.json'): res.update(json.load(open(f)))
ok=lambda r:r if r and not r.get('err') else None
for f in d['fixed']: f['q']=ok(res.get('q:'+f['id']))
for t in d['tf']: t['q']=ok(res.get('tf:'+t['id']))
for s in d['stories']: s['q']=ok(res.get('st:'+s['id']))
for g in d['gen']:
    sm=[]
    for i in range(3):
        r=ok(res.get('gen:%s.%s#%d'%(g['cat'],g['kind'],i)))
        if r: sm.append(r)
    g['samples']=sm
bad=[k for k,v in res.items() if not v or v.get('err')]
print('items',len(res),'not built',len(bad),bad[:10])
json.dump(d,open(f'{S}/sh8/dump2.json','w'),ensure_ascii=False)
import subprocess;subprocess.run(['python3',f'{S}/qc/sprites.py',f'{S}/sh8/dump2.json'],check=True)
a=json.load(open(f'{S}/qc/build/audio.json'))
import re as _r;a['txt']={k:_r.sub(r'\[[^\]]*\]\s*','',v).strip() for k,v in a['txt'].items()};sh=json.load(open(f'{S}/qc/build/shots.json'))
# audio for any new clips not in the sprites
s=json.dumps(d);need=set(re.findall(r'"w/([A-Za-z0-9_]+)"',s));print('clips missing from sprites',len(need-set(a['idx'])))
js=lambda o:json.dumps(o,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
open(f'{S}/qc/site/index.html','w').write(open(f'{S}/qc/page.html').read().replace('__DATA__',js(d)).replace('__AUDIO__',js(a)).replace('__SHOTS__',js(sh)))
json.dump(sorted(need-set(a['idx'])),open(f'{S}/qc/build/needclips.json','w'))
