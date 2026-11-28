import json,os,glob
from PIL import Image
S='/tmp/claude-0/-home-claude/4b546809-d061-5b8c-bae2-78a259824393/scratchpad/qc'
L=json.load(open(f'{S}/caplist.json'))
os.makedirs(f'{S}/site/shot',exist_ok=True)
for f in glob.glob(f'{S}/site/shot/*'): os.remove(f)
pos={};sheet=[];sn=0
def trim(im):
    g=im.convert('L');w,h=g.size;px=g.load()
    y=h-41
    while y>320:
        row=[px[x,y] for x in range(0,w,6)]
        if min(row)<245: break
        y-=1
    return im.crop((0,0,w,min(h,y+14)))
def flush():
    global sheet,sn
    if not sheet: return
    cols=5;cw=390;rows=[sheet[i:i+cols] for i in range(0,len(sheet),cols)]
    rh=[max(im.size[1] for _,im in r) for r in rows];H=sum(rh)
    out=Image.new('RGB',(cw*cols,H),'white');y=0
    for r,h in zip(rows,rh):
        for j,(iid,im) in enumerate(r):
            out.paste(im,(j*cw,y));pos[iid]=[sn,j*cw,y,im.size[0],im.size[1]]
        y+=h
    out.save(f'{S}/site/shot/s{sn}.webp','WEBP',quality=62,method=5);sn+=1;sheet=[]
for i,it in enumerate(L):
    f=f'{S}/shots/{i}.png'
    if not os.path.exists(f): continue
    im=Image.open(f).convert('RGB');sheet.append((it['id'],trim(im)))
    if len(sheet)==25: flush()
flush()
json.dump(pos,open(f'{S}/build/shots.json','w'))
tot=sum(os.path.getsize(x) for x in glob.glob(f'{S}/site/shot/*'))
print(len(pos),sn,round(tot/1e6,1),'MB')
