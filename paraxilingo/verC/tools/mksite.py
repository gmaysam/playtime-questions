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
        if rel.startswith('.git') or rel in ('sw.js',): continue
        files.append(rel)
files.sort()
h = hashlib.sha1()
for f in files: h.update(open(os.path.join(SITE, f), 'rb').read())
ver = h.hexdigest()[:10]
sw = '''/* offline cache. A new version takes over in seconds (only the page itself is saved first);
   pictures and sounds are saved the first time they are used, and in the background after that. */
const V="px-%s",FILES=%s,CORE=["./","index.html","manifest.json","icon180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>fetch(u,{cache:"no-store"}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()).then(()=>{
  /* fill the rest of the offline copy slowly, without blocking anything */
  caches.open(V).then(async c=>{for(const f of FILES){try{if(!(await c.match(f))){const r=await fetch(f);if(r.ok)await c.put(f,r)}}catch(x){}}});
}))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET"||!r.url.startsWith(self.location.origin))return;
  if(r.mode==="navigate"){e.respondWith(fetch(r,{cache:"no-store"}).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put("./",c));return n}).catch(()=>caches.match("./")));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(n=>{if(n.ok){const c=n.clone();caches.open(V).then(x=>x.put(r,c))}return n})));
});
''' % (ver, json.dumps(files))
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
