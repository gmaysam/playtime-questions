import json,subprocess,os
V='/home/claude/playtime-questions/paraxilingo/verC/audio/w';Q='/home/claude/qcpub'
F=json.load(open('fa45.json'));P46=json.load(open('/home/claude/rec46/plan46.json'))
rep=json.load(open('replies.json'))
names={r[0] for r in json.load(open('/home/claude/qc43/fa_published.json'))}
ed46={};move=[]
for old,new in P46['R'].items():
    ed46[old]=[new,P46['D'][old]];move.append(old)
# newest first in the Edited tab
F['ed']={**ed46,**{k:v for k,v in F['ed'].items() if k not in ed46}}
F['move']=move
F['round']={k:'28 Nov' for k in list(ed46)+list(P46['TXT'])+['PX_FY_067','PX_F46_CHINA']}
F['txt'].update(P46['TXT'])
F['del']=F['del']+['PX_FY_067']
F['add']=F['add']+[['PX_F46_CHINA','did','پرچمِ چین قرمزه و پنج تا ستاره‌یِ زرد داره.']]
# audio pack for v46 clips
SR=22050;gap=b'\x00\x00'*int(SR*.12);pcm=b''
for c in [v[0] for v in ed46.values()]+['PX_F46_CHINA']:
    raw=subprocess.run(['ffmpeg','-v','error','-i',V+'/'+c+'.mp3','-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout
    assert raw,c
    F['idx'][c]=['fa46',round(len(pcm)/2/SR,3),round(len(raw)/2/SR,3)];pcm+=raw+gap
subprocess.run(['ffmpeg','-v','error','-y','-f','s16le','-ac','1','-ar',str(SR),'-i','-','-b:a','40k',Q+'/aud/fa46.mp3'],input=pcm)
R={
 'KD39_O_WANT_TO_SHARE_MINE':'Re-recorded with «این» instead of «مالِ من».',
 'LULU_IF_CALENDAR_5':'Re-recorded (the old one was cut off).','LULU_IF_CALENDAR_6':'Re-recorded without the noise.',
 'LULU_IF_COMPARE_4':'Checked: the cheetah is the fastest runner on land. It is correct, so I kept it as it was.',
 'LULU_IF_COMPARE_6':'You are right, the alligator picture depends on how you look at it. New sentence without the alligator: the open side faces the bigger number and the point faces the smaller one, like 5 > 2.',
 'LULU_IF_WORDS_10':'It is E. Re-recorded so Lulu says «ای» (E), not «اِی» (A).',
 'LULU_IF_WORDS_9':'Checked: sea and see sound the same and mean different things. It is correct, so I kept it as it was.',
 'PX_FY_067':'Removed. India passed China in 2023, so the sentence is no longer true. In the flag game China now says «پرچمِ چین قرمزه و پنج تا ستاره‌یِ زرد داره.» (new recording, at the end of the list).',
 'PX_FY_034':'Re-recorded with your words («رویِ سه هست»).','PX_FY_035':'Your edit did not reach me, so I did the same as in PX_FY_034: «رویِ نُه هست». Tell me if you meant something else.',
 'PX_TD_S_hen':'Cut off the first words (they were from the bunny story: «خرگوشه چی خورد؟»). Same recording, now starts with «مرغه...».',
 'ST_S106_Q2':'The question means "who", so Lulu now says «کی بود که عیدی داد؟», which can only be read "ki".',
 'PX_FY_293':'Re-recorded with «غُرّش». The imperial version (5 miles) is re-recorded the same way.',
}
for k in ed46:
    rep.setdefault('fa:'+k,'');rep['fa:'+k]=R.get(k) or 'Re-recorded.'
for k in P46['TXT']: rep['fa:'+k]='Added the words (written from what Lulu says; her voice did not change).'
for k in ['LULU_IF_COMPARE_4','LULU_IF_WORDS_9','PX_FY_067']: rep['fa:'+k]=R[k]
json.dump(rep,open('replies.json','w'),ensure_ascii=False)
json.dump(F,open('fa45.json','w'),ensure_ascii=False)
print(len(ed46),os.path.getsize(Q+'/aud/fa46.mp3'))
