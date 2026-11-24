#!/usr/bin/env python3
"""Makes the GitHub Pages site from the iPad Web folder: home-screen icon, manifest, offline cache.
usage: mksite.py <Web dir> <site dir> <icon1024.png>"""
import sys, os, shutil, json, hashlib
from PIL import Image
WEB, SITE, ICON = sys.argv[1:4]
if os.path.isdir(SITE):
    for f in os.listdir(SITE):
        if f == '.git': continue
        p = os.path.join(SITE, f)
        shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)
else:
    os.makedirs(SITE)
for f in os.listdir(WEB):
    s, d = os.path.join(WEB, f), os.path.join(SITE, f)
    shutil.copytree(s, d) if os.path.isdir(s) else shutil.copy(s, d)
im = Image.open(ICON).convert('RGB')
for n in (180, 192, 512):
    im.resize((n, n), Image.LANCZOS).save(os.path.join(SITE, f'icon{n}.png'))
json.dump({"name": "Paraxilingo", "short_name": "Paraxilingo", "start_url": "./", "display": "standalone",
           "orientation": "portrait", "background_color": "#ffffff", "theme_color": "#E6F3FF",
           "icons": [{"src": "icon192.png", "sizes": "192x192", "type": "image/png"},
                     {"src": "icon512.png", "sizes": "512x512", "type": "image/png"}]},
          open(os.path.join(SITE, 'manifest.json'), 'w'))
files = []
for d, _, ff in os.walk(SITE):
    for f in ff:
        rel = os.path.relpath(os.path.join(d, f), SITE)
        if rel.startswith('.git') or rel in ('sw.js', '.nojekyll'): continue
        files.append(rel)
files.sort()
h = hashlib.sha1(); FH = {}
for f in files:
    b = open(os.path.join(SITE, f), 'rb').read(); h.update(b)
    FH[f] = [hashlib.sha1(b).hexdigest()[:10], len(b)]
ver = h.hexdigest()[:10]
CORE = ['index.html', 'manifest.json', 'icon180.png'] + [f for f in files if f.startswith('app.') and f.endswith('.js')]
MEDIA = {f: v for f, v in FH.items() if f not in CORE}
sw = """/* offline copy.
   The page and its script are saved per version. Pictures and sounds live in one lasting store, each under its own
   content fingerprint: a new version only downloads the files that really changed, never the whole app again. */
const V="px-core-%s",M="px-media",CORE=%s,F=%s;
const key=p=>p+"?h="+F[p][0],rel=u=>decodeURIComponent(new URL(u).pathname.slice(new URL(self.registration.scope).pathname.length));
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(["./",...CORE].map(u=>fetch(u,{cache:"no-store"}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))).then(()=>self.skipWaiting()))});
async function tidy(){const ks=await caches.keys(),m=await caches.open(M);
  for(const k of ks){if(k===V||k===M||!k.startsWith("px-"))continue;
    if(!k.startsWith("px-core-")){const old=await caches.open(k);   /* the store of an older version: keep the files that did not change */
      for(const q of await old.keys()){try{const p=rel(q.url);if(!F[p])continue;
        if(await m.match(key(p)))continue;const r=await old.match(q);const n=+(r.headers.get("content-length")||0)||(await r.clone().blob()).size;if(n===F[p][1])await m.put(key(p),r)}catch(x){}}}
    await caches.delete(k)}
  for(const q of await m.keys()){const u=new URL(q.url),p=rel(q.url);if(!F[p]||u.searchParams.get("h")!==F[p][0])await m.delete(q)}}
self.addEventListener("activate",e=>{e.waitUntil(tidy().catch(()=>{}).then(()=>self.clients.claim()).then(()=>{
  /* fill the rest of the offline copy slowly, without blocking anything */
  caches.open(M).then(async c=>{for(const f in F){try{if(!(await c.match(key(f)))){const r=await fetch(f);if(r.ok&&r.status===200)await c.put(key(f),r)}}catch(x){}}});
}))});
/* sounds and videos: iPhone/iPad Safari asks for them in byte ranges and only plays an answer of exactly that range (206) */
async function media(r,p){const c=await caches.open(M);let res=await c.match(key(p));
  if(!res){const n=await fetch(p);if(!(n.ok&&n.status===200))return fetch(r);await c.put(key(p),n.clone());res=n}
  const rg=r.headers.get("range");if(!rg)return res;
  const buf=await res.arrayBuffer(),L=buf.byteLength,m=/bytes=(\d*)-(\d*)/.exec(rg)||[];let s=m[1]?+m[1]:0,e=m[2]?+m[2]:L-1;if(!m[1]&&m[2]){s=Math.max(0,L-(+m[2]));e=L-1}e=Math.min(e,L-1);
  if(s>=L)return new Response(null,{status:416,headers:{"Content-Range":"bytes */"+L}});
  return new Response(buf.slice(s,e+1),{status:206,statusText:"Partial Content",headers:{"Content-Type":res.headers.get("Content-Type")||"audio/mpeg","Content-Range":"bytes "+s+"-"+e+"/"+L,"Content-Length":String(e-s+1),"Accept-Ranges":"bytes"}})}
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET"||!r.url.startsWith(self.registration.scope))return;
  if(r.mode==="navigate"){e.respondWith(caches.open(V).then(c=>c.match("./")).then(m=>m||fetch(r,{cache:"no-store"})).catch(()=>fetch(r)));return}
  const p=rel(r.url);
  if(F[p]){e.respondWith(media(r,p).catch(()=>fetch(r)));return}
  e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true})).then(m=>m||fetch(r)).catch(()=>fetch(r)));
});
""" % (ver, json.dumps(CORE), json.dumps(MEDIA, separators=(',', ':')))
open(os.path.join(SITE, 'sw.js'), 'w').write(sw)
p = os.path.join(SITE, 'index.html'); s = open(p, encoding='utf-8').read()
s = s.replace('<meta name="apple-mobile-web-app-capable" content="yes">',
  '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="default">\n'
  '<meta name="apple-mobile-web-app-title" content="Paraxilingo">\n<link rel="apple-touch-icon" href="icon180.png">\n'
  '<link rel="manifest" href="manifest.json">\n<meta name="theme-color" content="#E6F3FF">', 1)
s = s.replace('</body>', '<script>if("serviceWorker" in navigator){navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(function(r){r.update()}).catch(function(){});var pxR=false;navigator.serviceWorker.addEventListener("controllerchange",function(){if(!pxR){pxR=true;location.reload()}})}</script>\n</body>', 1)
open(p, 'w', encoding='utf-8').write(s)
open(os.path.join(SITE, '.nojekyll'), 'w').write('')
print('site', ver, len(files), 'files')
