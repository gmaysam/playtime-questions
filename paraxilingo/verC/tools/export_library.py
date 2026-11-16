#!/usr/bin/env python3
"""Exports everything Paraxilingo makes into the shared pool (share/Library, copied to Desktop/Paraxilingo/Library
and to GitHub paraxilingo/Library), in the same layout as the Watcher Device library.
usage: export_library.py <scratch dir>"""
import sys, os, json, re, csv, shutil, glob
S = sys.argv[1]; L = os.path.join(S, 'share', 'Library')
for d in ('voices', 'pictures', 'games', 'questions'): os.makedirs(os.path.join(L, d), exist_ok=True)
for f in glob.glob(os.path.join(S, 'fa_new', 'out', '*.mp3')): shutil.copy(f, os.path.join(L, 'voices'))
shutil.copy(os.path.join(S, 'tools', 'domi.svg'), os.path.join(L, 'pictures', 'domi.svg'))
for _i in range(1, 6): shutil.copy(os.path.join(S, 'tools', f'domi_{_i}.svg'), os.path.join(L, 'pictures', f'domi_{_i}.svg'))
js = open(os.path.join(S, 'tools', 'qengine.js')).read()
pages = re.search(r'const PAGES=(\[.*?\n\]);', js, re.S).group(1)
open(os.path.join(L, 'games', 'painting_pages.js'), 'w').write('// Paraxilingo painting pages: [name, emoji, [svg shapes]]; viewBox 0 0 400 400\nconst PAGES=' + pages + ';\n')
fa = json.load(open(os.path.join(S, 'fa_new', 'fa_new.json'))); fa.update(json.load(open(os.path.join(S, 'fa_new', 'fa_new2.json'))))
en = json.load(open(os.path.join(S, 'fa_new', 'en_new.json')))
q = json.load(open(os.path.join(S, 'tools', 'px_questions.json')))
w = csv.writer(open(os.path.join(L, 'voices', 'clips.csv'), 'w', newline='', encoding='utf-8')); w.writerow(['file', 'voice', 'language', 'word'])
for k, v in fa.items(): w.writerow([v + '.mp3', 'lulu', 'fa', k])
for k, v in en.items(): w.writerow([v + '.mp3', 'lulu', 'en', k])
w.writerow(['PX_PAINT_INTRO.mp3', 'lulu', 'fa', 'painting intro'])
for x in q: w.writerow([x['i'] + '_q_lulu.mp3', 'lulu', 'fa', 'question ' + x['i']])
w = csv.writer(open(os.path.join(L, 'questions', 'paraxilingo_questions.csv'), 'w', newline='', encoding='utf-8'))
w.writerow(['id', 'game', 'kind', 'age', 'question', 'question_farsi', 'options', 'answer', 'explanation', 'voice'])
for x in q:
    tf = x['k'] == 'tf'
    w.writerow([x['i'], x.get('game', x['t'].capitalize()), 'true/false' if tf else 'choose', f"{x['a']}+", x['q'], x.get('fa_q', ''),
                'True | False' if tf else ' | '.join(x['o']), ('True' if x['n'] == 0 else 'False') if tf else x['o'][x['n']], x['x'],
                x['i'] + '_q_lulu.mp3' if os.path.exists(os.path.join(L, 'voices', x['i'] + '_q_lulu.mp3')) else ''])
print('pool export:', len(q), 'questions,', len(fa) + len(en), 'word clips')
