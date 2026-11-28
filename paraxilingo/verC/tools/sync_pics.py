#!/usr/bin/env python3
"""Bring the pictures from Image/App_Pictures_Updated into the app. Run before every release.
usage: sync_pics.py <folder with App_Pictures_Updated (staged copy)> <appC dir> [--init]
The folder's Paraxilingo_pictures.xlsx says which app file each picture becomes ("Used in app as"):
  a .png name -> img/w/<name> (256x256 png), a .webp name -> img/e3/<name> (256x256 webp).
tools/pic_manifest.json remembers the md5 of every picture already brought in, so only new or changed ones are copied.
--init only records the current pictures (when the app already has them)."""
import sys, os, json, hashlib, openpyxl
from PIL import Image
SRC, APP = sys.argv[1], sys.argv[2]; INIT = '--init' in sys.argv
MAN = os.path.join(os.path.dirname(__file__), 'pic_manifest.json')
man = json.load(open(MAN)) if os.path.exists(MAN) else {}
ws = openpyxl.load_workbook(os.path.join(SRC, 'Paraxilingo_pictures.xlsx'))['Pictures']
hdr = [c.value for c in ws[1]]; fi, ui = hdr.index('Image file'), hdr.index('Used in app as')
rows = [(r[fi], r[ui]) for r in ws.iter_rows(min_row=2, values_only=True) if r[fi]]
done, nomap, missing = [], [], []
for f, u in rows:
    p = os.path.join(SRC, f)
    if not os.path.exists(p): missing.append(f); continue
    h = hashlib.md5(open(p, 'rb').read()).hexdigest()
    if not u: nomap.append(f); continue
    for t in str(u).replace(',', ' ').split():
        key = f + '>' + t
        if man.get(key) == h: continue
        if not INIT:
            d = os.path.join(APP, 'img', 'w' if t.endswith('.png') else 'e3', t)
            im = Image.open(p).convert('RGBA'); im.thumbnail((256, 256), Image.LANCZOS)
            c = Image.new('RGBA', (256, 256), (0, 0, 0, 0)); c.paste(im, ((256 - im.width) // 2, (256 - im.height) // 2))
            c.save(d, 'PNG', optimize=True) if t.endswith('.png') else c.save(d, 'WEBP', quality=88, method=6)
            done.append(f + ' -> ' + t)
        man[key] = h
json.dump(man, open(MAN, 'w'), indent=0, sort_keys=True)
known = {f for f, _ in rows}
extra = sorted(x for x in os.listdir(SRC) if x.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) and x not in known)
print('pictures: %d rows, %d updated in the app%s' % (len(rows), len(done), ' (init)' if INIT else ''))
for x in done: print('  updated', x)
if nomap: print('  no "Used in app as" yet:', ', '.join(nomap))
if extra: print('  in the folder but not in the spreadsheet:', ', '.join(extra))
if missing: print('  in the spreadsheet but not in the folder:', ', '.join(missing))
