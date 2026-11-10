#!/usr/bin/env python3
"""Turns the verC page into a stand-alone web folder for the iPad app (works back to iOS 12 Safari).
usage: mkweb.py <appC dir> <out Web dir> <esbuild binary>"""
import re, sys, os, re, shutil, subprocess
SRC, OUT, ESB = sys.argv[1:4]
s = open(os.path.join(SRC, 'index.html'), encoding='utf-8').read()
head = s[:s.index('<style>')]
css = s[s.index('<style>') + 7:s.index('</style>')]
body = s[s.index('</style>') + 8:s.index('<script>')]
js = s[s.index('<script>') + 8:s.rindex('</script>')]

# the fake phone frame is only for desktop browsers; on the iPad the app fills the screen
css = css.replace('@media (min-width:560px) and (min-height:720px)', '@media (min-width:560px) and (min-height:720px) and (hover:hover) and (pointer:fine)')
# wide-screen rules: on touch screens (iPad) there is no phone frame, so they apply at any height
import re as _re2
css = _re2.sub(r'@media (\([^{]*?) and \(max-height:719px\)\{', lambda m: '@media '+m.group(1)+' and (max-height:719px), '+m.group(1)+' and (hover:none), '+m.group(1)+' and (pointer:coarse){', css)
css += '''
/* iPad: keep questions and pages a comfortable width */
.qbody,.panel{max-width:680px;margin-left:auto;margin-right:auto;width:100%}
.qopts .qo{min-height:120px}
'''
# old Safari has no aspect-ratio: size the land picture by hand
js = js.replace('sec.style.aspectRatio=`720/${TILE_H[z]}`;',
  'sec.style.aspectRatio=`720/${TILE_H[z]}`;if(!(window.CSS&&CSS.supports&&CSS.supports("aspect-ratio","1/1"))){const fit=()=>{sec.style.height=(journey.clientWidth*TILE_H[z]/720)+"px"};requestAnimationFrame(fit);window.addEventListener("resize",fit)}')

def lower_inset(c):
    def f(m):
        v=m.group(2).split();imp=m.group(3) or ''
        t,r,b,l=(v*4)[:4] if len(v)==1 else (v[0],v[1],v[0],v[1]) if len(v)==2 else (v[0],v[1],v[2],v[1]) if len(v)==3 else v
        return f"{m.group(1)}top:{t}{imp};right:{r}{imp};bottom:{b}{imp};left:{l}{imp}"
    return re.sub(r'([{;\s])inset:\s*([^;}!]+?)\s*(!important)?(?=[;}])',f,c)
css = lower_inset(css)

def esb(code, loader):
    r = subprocess.run([ESB, '--loader=' + loader, '--target=safari12', '--log-level=error'], input=code.encode(), capture_output=True)
    if r.returncode: sys.exit(r.stderr.decode())
    return r.stdout.decode()
css2 = esb(css, 'css')
js2 = esb(js, 'js')

head = re.sub(r'<meta name="viewport"[^>]*>\n?', '', head)
page = ('<!doctype html>\n<html lang="en"><head><meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">\n'
        '<meta name="apple-mobile-web-app-capable" content="yes">\n'
        + head + '<style>' + css2 + '</style>\n</head><body>' + body + '<script>' + js2 + '</script>\n</body></html>\n')
if os.path.isdir(OUT):
    shutil.rmtree(OUT)
os.makedirs(OUT)
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(page)
for d in ('img', 'audio'):
    shutil.copytree(os.path.join(SRC, d), os.path.join(OUT, d))
print('web ok', len(page))
