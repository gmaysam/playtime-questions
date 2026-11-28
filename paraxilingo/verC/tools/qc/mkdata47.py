import json,subprocess,os
V='/home/claude/playtime-questions/paraxilingo/verC/audio/w';Q='/home/claude/qcpub'
F=json.load(open('fa45.json'));P=json.load(open('/home/claude/rec47/plan47.json'));rep=json.load(open('replies.json'))
ed47={}
for old,new in P['R'].items():
    key='PX_O42_CHEESE_POWER' if old=='PX_F45_COAL' else old
    ed47[key]=[new,P['D'][old]]
F['ed']={**ed47,**{k:v for k,v in F['ed'].items() if k not in ed47}}
F['move']=[m for m in F.get('move',[]) if m not in ed47]+list(ed47)
for k in ed47: F['round'][k]='28 Nov, 2nd fix'
SR=22050;gap=b'\x00\x00'*int(SR*.12);pcm=b''
for c in [v[0] for v in ed47.values()]:
    raw=subprocess.run(['ffmpeg','-v','error','-i',V+'/'+c+'.mp3','-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout;assert raw,c
    F['idx'][c]=['fa47',round(len(pcm)/2/SR,3),round(len(raw)/2/SR,3)];pcm+=raw+gap
subprocess.run(['ffmpeg','-v','error','-y','-f','s16le','-ac','1','-ar',str(SR),'-i','-','-b:a','40k',Q+'/aud/fa47.mp3'],input=pcm)
WRONG={'PX_F44_BIG_BEN','PX_FA_W_RICE','PX_O40_KITTEN','PX_O41_THE_BIG_DIPPER','PX_OW2_BABY_CAT','PX_OW2_CLOUDS_MOVING','PX_OW2_HOT_COLD_WARM','PX_OW2_IT_MELTS','PX_OW2_TOYS','PX_OW2_TO_SLEEP','PX_OW3_ALBERT_EINSTEIN','PX_OW3_WITH_GILLS','PX_OW_AFTERNOON','PX_OW_BROCCOLI','PX_OW_CRAYON','PX_OW_LOLLIPOP','PX_OW_MAKE_FUN_OF_THEM','PX_OW2_NOSE','PX_O42_CHEESE_POWER'}
R={'LULU_FA_MON4':'Re-recorded as «مِی» (May).','PX_O38_FOG':'Re-recorded as «مِه» (fog).','PX_FX_17':'Re-recorded; checked that Lulu now says «آبشُش» (aabshosh).','PX_FX_24':'Re-recorded with a pause after «آتش‌نشانی».','PX_FX_46':'Re-recorded with a pause between «فلز» and «برق».','PX_FY_066':'Re-recorded with your words («سبز هست»).','PX_FY_100':'Re-recorded with a pause after «لوزی».','PX_FY_113':'Re-recorded with «زُهره» (Zohreh).','PX_TD_S_hen':'Recorded the whole story again, so «مرغه روی لونه‌ش نشست» is said in one go.','ST_S104_L3':'Re-recorded with your pause after «دَمِ در».','px571_e_lulu':'Re-recorded with your words (pause after «نَوَد»).','PX_OW3_WITH_LUNGS':'Re-recorded with your pause: «با، ریه».','PX_OW2_NOSE':'The old one was cut short («دما»). Re-recorded «دماغ».','px22_e_lulu':'My own check heard «زردآلو» here, so I re-recorded it: «موز، زَرده...».','px204_e_lulu':'My own check heard «بعدش» instead of «بادش», so I re-recorded it.','px258_e_lulu':'My own check heard the first word unclearly, so I re-recorded it: «قیفِ بستنی، شکلِ مخروطه.»'}
for k in ed47:
    rep['fa:'+k]=R.get(k) or ('This one was cut into the wrong file last time, so it said another word. Recorded again and checked word by word.' if k in WRONG else 'Re-recorded.')
json.dump(rep,open('replies.json','w'),ensure_ascii=False);json.dump(F,open('fa45.json','w'),ensure_ascii=False)
print(len(ed47),os.path.getsize(Q+'/aud/fa47.mp3'))
