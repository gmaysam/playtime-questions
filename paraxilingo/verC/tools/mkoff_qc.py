"""Offline copy of the QC page on GitHub Pages: <site>/qc/ (page, voice packs, pictures, its own service worker).
Run after mksite.py (which empties the site folder). usage: mkoff.py <site dir>"""
import sys,os,shutil,hashlib,json
SITE=sys.argv[1];Q='/home/claude/qcpub';D=os.path.join(SITE,'qc')
shutil.rmtree(D,ignore_errors=True);os.makedirs(D)
shutil.copy(Q+'/index.html',D+'/index.html')
F={}
for sub in ('aud','shot'):
    os.makedirs(os.path.join(D,sub))
    for f in sorted(os.listdir(os.path.join(Q,sub))):
        b=open(os.path.join(Q,sub,f),'rb').read();open(os.path.join(D,sub,f),'wb').write(b);F[sub+'/'+f]=hashlib.sha1(b).hexdigest()[:10]
ver=hashlib.sha1(open(D+'/index.html','rb').read()).hexdigest()[:10]
sw='''/* QC page, offline: the page is fetched fresh when online and kept for offline; voices and pictures are kept once (by fingerprint) */
const V="qc-page-%s",M="qc-media",F=%s;
const rel=u=>decodeURIComponent(new URL(u).pathname.slice(new URL(self.registration.scope).pathname.length)),key=p=>p+"?h="+F[p];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>fetch("./",{cache:"no-store"}).then(r=>r.ok&&c.put("./",r)).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith("qc-page-")&&k!==V)await caches.delete(k);
  const m=await caches.open(M);for(const q of await m.keys()){const u=new URL(q.url),p=rel(q.url);if(!F[p]||u.searchParams.get("h")!==F[p])await m.delete(q)}await self.clients.claim()})())});
async function media(r,p){const c=await caches.open(M);let res=await c.match(key(p));
  if(!res){const n=await fetch(p);if(!(n.ok&&n.status===200))return n;await c.put(key(p),n.clone());res=n}
  const rg=r.headers.get("range");if(!rg)return res;
  const buf=await res.arrayBuffer(),L=buf.byteLength,m=/bytes=(\\d*)-(\\d*)/.exec(rg)||[];let s=m[1]?+m[1]:0,e=m[2]?+m[2]:L-1;if(!m[1]&&m[2]){s=Math.max(0,L-(+m[2]));e=L-1}e=Math.min(e,L-1);
  if(s>=L)return new Response(null,{status:416,headers:{"Content-Range":"bytes */"+L}});
  return new Response(buf.slice(s,e+1),{status:206,statusText:"Partial Content",headers:{"Content-Type":res.headers.get("Content-Type")||"audio/mpeg","Content-Range":"bytes "+s+"-"+e+"/"+L,"Content-Length":String(e-s+1),"Accept-Ranges":"bytes"}})}
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||!r.url.startsWith(self.registration.scope))return;
  if(r.mode==="navigate"){e.respondWith(fetch(r,{cache:"no-store"}).then(n=>{if(n.ok){const c=n.clone();caches.open(V).then(x=>x.put("./",c))}return n}).catch(()=>caches.open(V).then(c=>c.match("./")).then(m=>m||Response.error())));return}
  const p=rel(r.url);if(F[p]){e.respondWith(media(r,p).catch(()=>fetch(r)));return}
  e.respondWith(fetch(r).catch(()=>caches.match(r,{ignoreSearch:true})))});
'''%(ver,json.dumps(F))
open(D+'/sw.js','w').write(sw)
print('qc offline copy:',len(F),'files',sum(os.path.getsize(os.path.join(D,f)) for f in F)//1048576,'MB')
