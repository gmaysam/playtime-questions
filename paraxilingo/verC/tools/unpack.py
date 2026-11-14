import struct,os,sys,glob,json,zlib,subprocess
src=sys.argv[1];out=sys.argv[2];os.makedirs(out,exist_ok=True)
def crc_ogg(data):
    # ogg crc32 (poly 0x04c11db7, no reflection)
    crc=0
    for b in data:
        crc^=b<<24
        for _ in range(8):crc=((crc<<1)^0x04C11DB7)&0xffffffff if crc&0x80000000 else (crc<<1)&0xffffffff
    return crc
def page(serial,seq,granule,packets,flags=0):
    segs=[]
    for p in packets:
        n=len(p)
        while n>=255:segs.append(255);n-=255
        segs.append(n)
    hdr=b"OggS"+bytes([0,flags])+struct.pack("<qIII",granule,serial,seq,0)+bytes([len(segs)])+bytes(segs)
    body=b"".join(packets);pg=hdr+body;c=crc_ogg(pg)
    return pg[:22]+struct.pack("<I",c)+pg[26:]
def pdur(p):
    toc=p[0];cfg=toc>>3
    if cfg<12:fs=[480,960,1920,2880][cfg%4]
    elif cfg<16:fs=[480,960][cfg%2]
    else:fs=[120,240,480,960][cfg%4]
    c=toc&3;n=1 if c==0 else 2 if c in (1,2) else (p[1]&0x3f)
    return fs*n
def write_ogg(packets,path):
    serial=1234;head=b"OpusHead"+bytes([1,1])+struct.pack("<HIhB",312,16000,0,0)
    tags=b"OpusTags"+struct.pack("<I",3)+b"pak"+struct.pack("<I",0)
    o=page(serial,0,0,[head],2)+page(serial,1,0,[tags]);g=0;seq=2
    for i in range(0,len(packets),20):
        chunk=packets[i:i+20];g+=sum(pdur(p) for p in chunk)
        o+=page(serial,seq,g,chunk,4 if i+20>=len(packets) else 0);seq+=1
    open(path,"wb").write(o)
seen={}
for f in sorted(glob.glob(src+"/*.pak")):
    d=open(f,"rb").read();assert d[:4]==b"PTPK"
    ver,n,day,blen,crc=struct.unpack("<BBHII",d[4:16]);p=16
    for k in range(n):
        kind,amin,amax,ans,ps,pi,nopt,topic=d[p:p+8];p+=8
        strs=[]
        for _ in range(1+(0 if kind==0 else nopt)+1):
            e=d.index(b"\0",p);strs.append(d[p:e].decode());p=e+1
        clips=[]
        for _ in range(4):
            nb,ns=struct.unpack("<II",d[p:p+8]);p+=8;data=d[p:p+nb];p+=nb
            pk=[];q=0
            while q<len(data):
                L=struct.unpack("<H",data[q:q+2])[0];pk.append(data[q+2:q+2+L]);q+=2+L
            clips.append(pk)
        q=strs[0]
        if q in seen:continue
        idx=len(seen);rec=dict(kind="tf" if kind==0 else "choice",amin=amin,amax=amax,answer=ans,pic=[ps,pi],topic=topic,q=q,opts=strs[1:-1],explain=strs[-1],qa="",ea="")
        for j,name in ((0,"q"),(2,"e")):
            if clips[j]:
                tmp=f"{out}/w{idx:03d}{name}.ogg";write_ogg(clips[j],tmp)
                mp=f"{out}/w{idx:03d}{name}.mp3"
                r=subprocess.run(["ffmpeg","-nostdin","-loglevel","error","-y","-i",tmp,"-ac","1","-ar","24000","-b:a","40k",mp])
                os.remove(tmp)
                if r.returncode==0:rec["qa" if name=="q" else "ea"]=f"w{idx:03d}{name}"
        seen[q]=rec
json.dump(list(seen.values()),open(out+"/watcher.json","w"),ensure_ascii=False,indent=0)
print(len(seen),"questions",sum(1 for r in seen.values() if r["qa"]),"with voice")
