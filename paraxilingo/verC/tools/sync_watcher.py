#!/usr/bin/env python3
"""Pulls the shared Watcher Device library (Desktop/Watcher/Version B/Library, copied to wlib/) into Paraxilingo:
Today's Quiz questions, the voiced ids, the stories and their questions, and every voice clip the game uses.
Run before every build so new Watcher questions and stories appear automatically.
usage: sync_watcher.py <wlib dir> <scratch dir>"""
import sys, os, csv, json, re, shutil, glob
LIB, S = sys.argv[1:3]
Q = os.path.join(LIB, 'questions')

# ---------- Today's Quiz from bank.py (has the picture names) ----------
ns = {}
exec(open(os.path.join(Q, 'bank.py'), encoding='utf-8').read(), ns)
pics = {}
for k, v in ns.items():
    if isinstance(v, dict) and k.isupper() and v and all(isinstance(t, tuple) for t in v.values()):
        for name, t in v.items(): pics.setdefault(t, name)
wq = []
for q in ns['QUESTIONS']:
    p = pics.get(tuple(q['pic'])) if q.get('pic') else None
    if q['kind'] == 'tf':
        wq.append(dict(i=q['id'], k='tf', t=q['topic'], a=q['age'][0], q=q['q'], o=[], n=0 if q['answer'] else 1, x=q['explain'], p=p))
    else:
        wq.append(dict(i=q['id'], k='c', t=q['topic'], a=q['age'][0], q=q['q'], o=q['opts'], n=q['answer'], x=q['explain'], p=p))
json.dump(wq, open(os.path.join(S, 'watcher', 'wq.json'), 'w'), ensure_ascii=False)

# ---------- stories ----------
E = {"apple": "🍎", "red apple": "🍎", "banana": "🍌", "cherry blossom": "🌸", "blossom": "🌸", "flower": "🌸", "car": "🚗", "automobile": "🚗",
     "deciduous tree": "🌳", "tree": "🌳", "cloud": "☁️", "house": "🏠", "rainbow": "🌈", "crescent moon": "🌙", "moon": "🌙", "cat": "🐱",
     "cat face": "🐱", "cow": "🐄", "cow face": "🐄", "duck": "🦆", "birthday cake": "🎂", "cake": "🎂", "pizza": "🍕", "green salad": "🥗",
     "salad": "🥗", "white circle": "⚪", "circle": "⚪", "red triangle pointed up": "🔺", "triangle": "🔺", "blue square": "🟦",
     "square": "🟦", "star": "⭐", "cook": "🧑‍🍳", "pilot": "🧑‍✈️", "health worker": "🧑‍⚕️", "doctor": "🧑‍⚕️", "flag: canada": "🇨🇦",
     "flag: united states": "🇺🇸", "flag: japan": "🇯🇵", "high-speed train": "🚄", "train": "🚄", "turtle": "🐢", "snail": "🐌",
     "candy": "🍬", "droplet": "💧", "water": "💧", "soccer ball": "⚽", "ball": "⚽", "glass of milk": "🥛", "milk": "🥛",
     "beach with umbrella": "🏖️", "beach": "🏖️", "salt shaker": "🧂", "salt": "🧂", "lemon": "🍋", "fish": "🐟", "spouting whale": "🐳",
     "whale": "🐳", "crab": "🦀", "books": "📚", "guitar": "🎸", "straight ruler": "📏", "balance scale": "⚖️", "scales": "⚖️",
     "alarm clock": "⏰", "dog": "🐶", "bird": "🐦", "frog": "🐸", "sun": "☀️", "umbrella": "☂️", "egg": "🥚", "bread": "🍞",
     "orange (colour)": "🟠", "blue (colour)": "🔵", "green (colour)": "🟢", "red (colour)": "🔴", "purple (colour)": "🟣",
     "yellow (colour)": "🟡", "red": "🔴", "yellow": "🟡", "blue": "🔵", "green": "🟢", "purple": "🟣"}
FIX = {"#ffd400": ["🟡", "Yellow"], "house building": ["🏠", "House"], "slice of pizza": ["🍕", "Pizza"], "medium white circle": ["⚪", "Circle"],
       "up-pointing red triangle": ["🔺", "Triangle"], "large blue square": ["🟦", "Square"], "white medium star": ["⭐", "Star"],
       "adult cooking": ["🧑‍🍳", "Cook"], "adult airplane": ["🧑‍✈️", "Pilot"], "adult staff of aesculapius": ["🧑‍⚕️", "Doctor"],
       "regional indicator symbol letter c regional indicator symbol letter a": ["🇨🇦", "Canada"],
       "regional indicator symbol letter u regional indicator symbol letter s": ["🇺🇸", "USA"],
       "regional indicator symbol letter j regional indicator symbol letter p": ["🇯🇵", "Japan"],
       "deciduous tree": ["🌳", "Tree"], "birthday cake": ["🎂", "Cake"], "green salad": ["🥗", "Salad"], "salt shaker": ["🧂", "Salt"],
       "high-speed train": ["🚄", "Train"], "glass of milk": ["🥛", "Milk"], "beach with umbrella": ["🏖️", "Beach"], "straight ruler": ["📏", "Ruler"],
       "balance scale": ["⚖️", "Scales"], "droplet": ["💧", "Water"], "crescent moon": ["🌙", "Moon"], "cherry blossom": ["🌸", "Flowers"], "automobile": ["🚗", "Car"]}
LABEL = lambda o: re.sub(r'\s*\(colou?r\)', '', o).replace('flag: ', '').replace('high-speed ', '').replace('spouting ', '').strip().capitalize()
rows = list(csv.DictReader(open(os.path.join(Q, 'questions.csv'), encoding='utf-8-sig')))
voices = set(os.listdir(os.path.join(LIB, 'voices')))
stories = []
for n in range(40):
    qs = sorted([r for r in rows if r['game'] == 'Story time' and r['id'].startswith(f's{n}_q')], key=lambda r: r['id'])
    lines = len([v for v in voices if re.match(rf'ST_S{n}_L\d+\.mp3$', v)])
    if not qs or not lines: continue
    m = re.search(r"'([^']+)'", qs[0]['question']); title = m.group(1) if m else f"Story {n+1}"
    out = []
    for r in qs:
        k = int(r['id'].split('_q')[1])
        if f'ST_S{n}_Q{k}.mp3' not in voices: continue
        opts = [o.strip() for o in r['options'].split('|')]; ans = opts.index(r['answer'].strip())
        if all(o.isdigit() for o in opts): out.append(dict(k=k, nums=[int(o) for o in opts], ans=ans))
        else: out.append(dict(k=k, opts=[(["🟡", "Yellow"] if o.strip().startswith("#") else FIX.get(o.lower())) or [E.get(o.lower(), "🔹"), LABEL(o)] for o in opts], ans=ans))
    stories.append(dict(s=n, t=title, lines=lines, q=out))
json.dump(stories, open(os.path.join(S, 'watcher', 'stories.json'), 'w'), ensure_ascii=False)

# ---------- voice clips ----------
dst = os.path.join(S, 'appC', 'audio', 'w'); os.makedirs(dst, exist_ok=True)
keep = re.compile(r'^(LULU_N\d+|LULU_(PLUS|MINUS|EQUALS|C_FIND|C_AFTER1|C_BEFORE1|CP_MORE|CP_LESS|TRY_ONCE|ANS_IS|BD_PRIZE|BD_READY|BD_PRIZE_IS|BD_RIGHT|L_END|PRIZE_SHORT|ST_INTRO|YA)|LULU_WP_.*|LULU_TF\d+|LULU_PR_.|LULU_PRAISE\d|LULU_EV_.*|LULU_FA_.*|LULU_FAW\d+|LULU_PL\d|LULU_COLOR\d|LULU_EN_SH\d+|ST_S\d+_.*)\.mp3$')
n = 0
for f in voices:
    if keep.match(f): shutil.copy(os.path.join(LIB, 'voices', f), os.path.join(dst, f)); n += 1
for f in os.listdir(os.path.join(LIB, 'quiz_voices')):
    if f.endswith('_lulu.mp3'): shutil.copy(os.path.join(LIB, 'quiz_voices', f), os.path.join(dst, f)); n += 1
for f in glob.glob(os.path.join(S, 'fa_new', 'out', '*.mp3')): shutil.copy(f, dst); n += 1
print('watcher sync:', len(wq), 'quiz questions,', len(stories), 'stories,', n, 'clips')
