import json,subprocess,os
V='/home/claude/playtime-questions/paraxilingo/verC/audio/w';Q='/home/claude/qcpub'
F=json.load(open('fa45.json'));P=json.load(open('/home/claude/rec48/plan48.json'));rep=json.load(open('replies.json'))
ed48={k:[n,P['D'][k]] for k,n in P['R'].items()}
F['ed']={**ed48,**{k:v for k,v in F['ed'].items() if k not in ed48}}
F['move']=list(ed48)            # only the new ones wait at the end of the Farsi list
F['show']=list(ed48)            # the Edited tab keeps only what the owner asked for this time
F['showDel']=['px34_q_lulu','px34_e_lulu']
F['del']=F['del']+['px34_q_lulu','px34_e_lulu']
F['qchg']=[{"id":"px34","what":"Question removed","before":"What do we wear on our feet? / رو پامون چی می‌پوشیم؟","after":"removed","show":1},
           {"id":"px137","what":"English fact","before":"The stomach mixes food with juices to break it down.","after":"The stomach mixes food with juices so it can be digested.","show":1}]
for k in ed48: F['round'][k]='28 Nov, 3rd fix'
SR=22050;gap=b'\x00\x00'*int(SR*.12);pcm=b''
for c in [v[0] for v in ed48.values()]:
    raw=subprocess.run(['ffmpeg','-v','error','-i',V+'/'+c+'.mp3','-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout;assert raw,c
    F['idx'][c]=['fa48',round(len(pcm)/2/SR,3),round(len(raw)/2/SR,3)];pcm+=raw+gap
subprocess.run(['ffmpeg','-v','error','-y','-f','s16le','-ac','1','-ar',str(SR),'-i','-','-b:a','40k',Q+'/aud/fa48.mp3'],input=pcm)
R={'LULU_PRAISE2':'Recorded your new word: «عالیه!»','PX_FA_W_RICE':'Re-recorded as «بِرِنْج» (berenj).','PX_FX_17':'Lulu said «آبشوش» with a long u. With «آبشُش‌هاشون» she says it short (like in a03, which you passed), so I used that: «ماهی‌ها با آبشُش‌هاشون زیرِ آب نفس می‌کشن.»','PX_OW3_WITH_GILLS':'Same as PX_FX_17: «با آبشُش‌ها» so the o is short.','PX_Q443_A17':'Re-recorded with your words (pause after «کرمِ پروانه»).','PX_TD_S_hen':'Re-recorded with your words (pause after «مرغه»).','n02_q_lulu':'Re-recorded with your words («ریشه، دارن»).','p06_q_lulu':'Re-recorded with your words (pause after «روی ماه»).','px137_e_lulu':'«ریزش کنه» was not clear. New fact: «معده غذا رو با شیره‌هایی قاطی می‌کنه تا غذا هضم بشه.» (English: …so it can be digested.)','px371_e_lulu':'Re-recorded with «صِداهایی» said clearly.','px58_e_lulu':'Re-recorded with your words («عاشقِ موز هستن»).','px58_q_lulu':'Re-recorded with your words («عاشقِ موز هست»).'}
for k in ed48: rep['fa:'+k]=R[k]
rep['fa:px34_q_lulu']='Removed the question (and its fact) from the app and from this check.'
json.dump(rep,open('replies.json','w'),ensure_ascii=False);json.dump(F,open('fa45.json','w'),ensure_ascii=False)
print(len(ed48),os.path.getsize(Q+'/aud/fa48.mp3'))
