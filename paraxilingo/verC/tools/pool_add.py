import json,sys,os,shutil,subprocess,csv
S='/tmp/claude-0/-home-claude/4b546809-d061-5b8c-bae2-78a259824393/scratchpad'
px=json.load(open(f'{S}/tools/px_questions.json'))
for q in px:
    if not q['o']: q['o']=['True','False']
out=[dict(question=q['q'],question_farsi=q['fa_q'],options=' | '.join(q['o']),answer=q['o'][q['n']],explanation=q['x'],game="Today's Quiz",area='Science: living things',skill='dinosaurs',age_min=q['a'],difficulty=1,standard='NGSS K-LS1-1',kind=('tf' if q['k']=='tf' else 'choose'),voice=f"quiz_voices/{q['i']}_q_lulu.mp3 (question only)",**{'from':'Paraxilingo'}) for q in px]
json.dump(out,open('library/questions/incoming/2026-11-07_paraxilingo.json','w'),ensure_ascii=False,indent=1)
txt={}
for m in ['fa_new.json','fa_new2.json','en_new.json']:
    p=f'{S}/fa_new/{m}'
    if os.path.exists(p):
        for w,c in json.load(open(p)).items():
            for f in (c if isinstance(c,list) else [c]): txt[str(f).split('/')[-1].replace('.mp3','')]=('(Farsi word) ' if 'fa' in m else '(English word) ')+w
have=set(os.listdir('library/voices'))|set(os.listdir('library/quiz_voices'))
rows=[];nq=0
for f in sorted(os.listdir(f'{S}/fa_new/out')):
    if f in have: continue
    q=f.endswith('_q_lulu.mp3');dst='library/quiz_voices' if q else 'library/voices'
    shutil.copy(f'{S}/fa_new/out/{f}',f'{dst}/{f}')
    if q: nq+=1;continue
    d=subprocess.run(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',f'{S}/fa_new/out/{f}'],capture_output=True,text=True).stdout.strip()
    t=txt.get(f[:-4],'(painting game intro)' if 'PAINT_INTRO' in f else '')
    rows.append([f,'Lulu',f"{float(d or 0):.2f}",t])
with open('library/voices/clips.csv','a',newline='',encoding='utf-8') as fh: csv.writer(fh).writerows(rows)
print(len(out),'questions;',len(rows),'voice rows;',nq,'quiz voices; empty text:',[r[0] for r in rows if not r[3]])
