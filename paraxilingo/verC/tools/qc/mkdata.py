import json,subprocess,os
V='/home/claude/playtime-questions/paraxilingo/verC';Q='/home/claude/qcpub'
P=json.load(open('/home/claude/qc43/fa_published.json'))
plan=json.load(open('/home/claude/rec45/plan.json'));R=plan['R'];OLD=plan['OLD']
T=json.load(open('/home/claude/rec45/texts.json'))
names={r[0] for r in P}
# rows removed from the check: deleted questions + clips the app no longer uses
DEL=[]
for q in plan['DEL_Q']:
    for s in ('_q_lulu','_e_lulu'):
        if q+s in names: DEL.append(q+s)
for c in ['a18_e_lulu','a28_q_lulu','b05_q_lulu','b05_e_lulu','s12_q_lulu','s12_e_lulu']:
    if c in names and c not in DEL: DEL.append(c)
# edits: row clip -> new clip and new text
ED={}
for k,t in R.items(): ED[k]=["PX_R45_"+k,T["PX_R45_"+k]]
ED['PX_O42_CHEESE_POWER']=["PX_F45_COAL",T["PX_F45_COAL"]]
ED['PX_O42_WATER_TURNS_INTO_CANDY']=["PX_F45_WATER_DISAPPEARS",T["PX_F45_WATER_DISAPPEARS"]]

TXT={"LULU_FA_IS":"فارسی یعنی؟","s01_q_lulu":"بارون از کجا میاد؟","s05_q_lulu":"وقتی بارون میاد چی می‌پوشیم؟","p05_q_lulu":"کدوم سیاره قرمزه؟","p05_e_lulu":"به مریخ می‌گن سیاره‌ی سرخ، به‌خاطرِ خاکِ قرمزش.","p06_q_lulu":"روی ماه بدونِ کلاهِ فضایی می‌شه نفس کشید؟ درسته یا غلط؟","p06_e_lulu":"روی ماه هوا نیست، واسه همین فضانوردها لباسِ فضایی می‌پوشن.","b13_e_lulu":"بیشتر از نصفِ بدنت آبه."}
# note id -> row (notes made on a row that is now gone or renamed)
NOTE_ROW={"fa:a28_q_lulu":"PX_FIX_A28_Q"}
# new clips (go at the end of the list)
ADD=[]
for c in sorted(T):
    if c.startswith('PX_U45_') and not c.startswith('PX_U45_E_') and os.path.exists(V+'/audio/w/'+c+'.mp3'): ADD.append([c,'fact' if c.endswith('_E') else 'q' if c.endswith('_Q') else 'did' if 'IF_' in c or 'FY' in c or 'MX' in c else 'ans',T[c]])
# audio pack for the new clips
SR=22050;gap=b'\x00\x00'*int(SR*.12);pcm=b'';idx={}
need=[v[0] for v in ED.values()]+[a[0] for a in ADD]
for c in need:
    raw=subprocess.run(['ffmpeg','-v','error','-i',V+'/audio/w/'+c+'.mp3','-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout
    assert raw,c
    idx[c]=['fa45',round(len(pcm)/2/SR,3),round(len(raw)/2/SR,3)];pcm+=raw+gap
subprocess.run(['ffmpeg','-v','error','-y','-f','s16le','-ac','1','-ar',str(SR),'-i','-','-b:a','40k',Q+'/aud/fa45.mp3'],input=pcm)
OLDT={r[0]:r[2] for r in P}
json.dump({'del':DEL,'ed':ED,'txt':TXT,'add':ADD,'idx':idx,'noteRow':NOTE_ROW,'last':'px393_e_lulu'},open('fa45.json','w'),ensure_ascii=False)
print(len(DEL),len(ED),len(ADD),len(idx),os.path.getsize(Q+'/aud/fa45.mp3'))
