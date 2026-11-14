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
cat = json.load(open(os.path.join(Q, 'catalog.json')))['questions']
retired = {c['id'] for c in cat if c.get('status') == 'retired'}
wq = [w for w in wq if w['i'] not in retired]
# Paraxilingo age check (Nov 11): these are too hard for a 3-year-old; raise the youngest age here (the shared pool keeps its own ages)
AGE_UP={'p03':6,'p05':6,'p06':6,'p02':5,'p04':5,'m01':4,'m04':4,'m05':4,'m02':4,'w04':5,'x01':5,'x03':4,'n07':4,'n08':4,'f04':5,'f05':5,'a16':5,'e02':5,'e03':5,'n05':5}
# Nov 11 age review: true/false sentences need age 4+; harder facts move up, easy ones move down (AGE_SET wins over everything)
AGE_SET={'a03':4,'a04':4,'a06':4,'a11':4,'a13':4,'b03':4,'b05':4,'b07':4,'e04':4,'f02':4,'f06':4,'l02':4,'l04':4,'n02':5,'n04':4,'n06':4,'x02':4,'x04':4,'s02':4,'s04':4,'s06':4,'s08':5,
 'a07':4,'b04':4,'px67':4,'l01':4,'m06':4,'p01':4,'d01':5,'px70':5,'px85':5,'x01':5,'p02':5,
 'a17':5,'a20':5,'a21':5,'a23':5,'a25':4,'a26':4,'a28':5,'a24':7,'b13':4,'b12':5,'b11':7,'b09':7,'b14':7,'e08':7,'e09':5,'f07':5,'f09':5,'f08':7,'f10':7,
 'l05':4,'l06':5,'l07':4,'m07':5,'m12':7,'m13':7,'n13':4,'n10':7,'n14':7,'x06':7,'x08':8,'s11':7,'s14':7,'p09':7,'p10':7,'p12':7,'p13':7,'p14':7,'w05':5,'w06':5,'w07':5,'w08':5}
for w in wq:
    if w['i'] in AGE_UP: w['a'] = max(w['a'], AGE_UP[w['i']])
    if w['i'] in AGE_SET: w['a'] = AGE_SET[w['i']]
# Paraxilingo's own bank (tools/pxbank.json): only questions whose voice is recorded
_px=os.path.join(os.path.dirname(os.path.abspath(__file__)),'pxbank.json')
if os.path.exists(_px):
    _aud=os.path.join(S,'appC','audio','w')
    wq += [w for w in json.load(open(_px)) if os.path.exists(os.path.join(_aud, w['i']+'_q_lulu.mp3'))]
for w in wq:
    if w['i'] in AGE_SET: w['a'] = AGE_SET[w['i']]
json.dump(wq, open(os.path.join(S, 'watcher', 'wq.json'), 'w'), ensure_ascii=False)
# words, letters, sight words, sentences (only questions that are 'in the games')
clips = {r['file'][:-4]: r['text'] for r in csv.DictReader(open(os.path.join(LIB, 'voices', 'clips.csv'), encoding='utf-8-sig'))}
words = [dict(i=int(k[9:]), w=re.sub(r'^\(English word\)\s*', '', v).strip()) for k, v in clips.items() if re.match(r'LULU_WORD\d+$', k)]
sight = [dict(i=int(k[10:]), w=re.sub(r'^\(English sight word\)\s*', '', v).strip()) for k, v in clips.items() if re.match(r'LULU_SIGHT\d+$', k)]
ok = lambda c: c.get('status') == 'in the games'
sents = [dict(id=c['id'], q=c['question'], o=[o.strip() for o in c['options'].split('|')], a=c['answer'].strip()) for c in cat if ok(c) and c['id'].startswith('sent')]
abc = []
for c in cat:
    if ok(c) and c['game'] == 'A B C':
        m = re.match(r'(\w) \.\.\. (\w+)!', c['question'])
        if m: abc.append(dict(l=m.group(1), w=m.group(2)))
json.dump(dict(words=sorted(words, key=lambda x: x['i']), sight=sorted(sight, key=lambda x: x['i']), sents=sents, abc=abc), open(os.path.join(S, 'watcher', 'pool.json'), 'w'), ensure_ascii=False)

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
       "balance scale": ["⚖️", "Scales"], "droplet": ["💧", "Water"], "crescent moon": ["🌙", "Moon"], "cherry blossom": ["🌸", "Flowers"], "automobile": ["🚗", "Car"], "cat face": ["🐱", "Cat"], "cow face": ["🐄", "Cow"], "dog face": ["🐶", "Dog"], "spouting whale": ["🐳", "Whale"], "soccer ball": ["⚽", "Ball"]}
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
keep = re.compile(r'^(LULU_N\d+|LULU_(PLUS|MINUS|EQUALS|C_FIND|C_AFTER1|C_BEFORE1|CP_.*|SM_.*|FR_.*|TRY_ONCE|ANS_IS|BD_PRIZE|BD_READY|BD_PRIZE_IS|BD_RIGHT|L_END|PRIZE_SHORT|ST_INTRO|YA|AN_.*|H_.*|SND_.*|SH_.*|SHF\d+|SK_.*|CA_.*|GEO_.*|JOB_.*|COL_WHAT|PT_NEXT|EN\d+|EN_.*|WORD\d+|LN_.|PH_.|W_.*|RD_.*|R_.*|SIGHT\d+|AB_.*|IF_.*|RB_.*)|LULU_WP_.*|LULU_TF\d+|LULU_PR_.|LULU_PRAISE\d|LULU_EV_.*|LULU_FA_.*|LULU_FAW\d+|LULU_PL\d|LULU_COLOR\d|LULU_EN_SH\d+|ST_S\d+_.*)\.mp3$')
n = 0
for f in voices:
    if keep.match(f): shutil.copy(os.path.join(LIB, 'voices', f), os.path.join(dst, f)); n += 1
for f in os.listdir(os.path.join(LIB, 'quiz_voices')):
    if f.endswith('_q_lulu.mp3') or f.endswith('_e_lulu.mp3'):
        # Paraxilingo reads every answer itself (Farsi, then English), so it uses the question-only cut when there is one
        qs = f.replace('_q_lulu.mp3', '_qs_lulu.mp3')
        src = qs if f.endswith('_q_lulu.mp3') and os.path.exists(os.path.join(LIB, 'quiz_voices', qs)) else f
        shutil.copy(os.path.join(LIB, 'quiz_voices', src), os.path.join(dst, f)); n += 1
for f in glob.glob(os.path.join(S, 'fa_new', 'out', '*.mp3')): shutil.copy(f, dst); n += 1
# the pool holds the newest take of every Paraxilingo clip (re-voiced fixes too), so it always wins over the old fa_new copies
for f in voices:
    if f.startswith(('PX_','px')): shutil.copy(os.path.join(LIB, 'voices', f), os.path.join(dst, f)); n += 1
pd=os.path.join(S,'appC','img','w');os.makedirs(pd,exist_ok=True)
for f in os.listdir(os.path.join(LIB,'pictures')):
    if re.match(r'(home|food|pl|shape|sky|wd)_\d+\.png$',f): shutil.copy(os.path.join(LIB,'pictures',f),os.path.join(pd,f))
print('watcher sync:', len(wq), 'quiz questions,', len(stories), 'stories,', n, 'clips')
