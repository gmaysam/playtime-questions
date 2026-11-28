import json,subprocess,os
V='/home/claude/playtime-questions/paraxilingo/verC/audio/w';Q='/home/claude/qcpub'
F=json.load(open('fa45.json'));rep=json.load(open('replies.json'))
ed49={'n02_q_lulu':['PX_R49_n02_q_lulu','درخت‌ها ریشه دارن. درسته یا غلط؟'],
      'px371_e_lulu':['PX_R49_px371_e_lulu','نهنگ‌ها با هم آواز می‌خونن و صداشون توی آب خیلی دور می‌ره.'],
      'px58_q_lulu':['PX_R49_px58_q_lulu','کدوم حیوون دُمِ دراز داره و عاشقِ موز هست؟'],
      'PX_FX_17':['PX_R49A_PX_FX_17','ماهی‌ها با آبشُش زیرِ آب نفس می‌کشن.'],
      'PX_OW3_WITH_GILLS':['PX_R49A_PX_OW3_WITH_GILLS','با آبشُش']}
F['alt']={'PX_FX_17':['PX_R49B_PX_FX_17','ماهی‌ها با آبشُش زیرِ آب نفس می‌کشن.','Option B is made with another ElevenLabs model (multilingual v2), same Lulu voice. If B is the right one, press “Fix it” and write B.'],
          'PX_OW3_WITH_GILLS':['PX_R49B_PX_OW3_WITH_GILLS','با آبشُش','Option B is made with another ElevenLabs model (multilingual v2), same Lulu voice. If B is the right one, press “Fix it” and write B.']}
F['ed']={**ed49,**{k:v for k,v in F['ed'].items() if k not in ed49}}
F['move']=list(ed49);F['show']=list(ed49);F['showDel']=[]
F['qchg']=[{"id":"px371","what":"English fact","before":"Whales talk to each other with sounds that travel far through water.","after":"Whales sing to each other, and their songs travel very far through water.","show":1}]
for k in ed49: F['round'][k]='28 Nov, 4th fix'
SR=22050;gap=b'\x00\x00'*int(SR*.12);pcm=b''
for c in [v[0] for v in ed49.values()]+[v[0] for v in F['alt'].values()]:
    raw=subprocess.run(['ffmpeg','-v','error','-i',V+'/'+c+'.mp3','-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout;assert raw,c
    F['idx'][c]=['fa49',round(len(pcm)/2/SR,3),round(len(raw)/2/SR,3)];pcm+=raw+gap
subprocess.run(['ffmpeg','-v','error','-y','-f','s16le','-ac','1','-ar',str(SR),'-i','-','-b:a','40k',Q+'/aud/fa49.mp3'],input=pcm)
R={'n02_q_lulu':'Re-recorded without a pause: «درخت‌ها ریشه دارن.»',
   'px371_e_lulu':'New fact: «نهنگ‌ها با هم آواز می‌خونن و صداشون توی آب خیلی دور می‌ره.» (Whales sing to each other, and their songs travel very far through water.)',
   'px58_q_lulu':'Re-recorded with «دُمِ دراز» joined (dom-e deraz).',
   'PX_FX_17':'The usual model keeps saying "shoosh", so there are two tries. Now = usual model with a new spelling «آبْشُشْ». Option B = the other model. Pick the right one.',
   'PX_OW3_WITH_GILLS':'Same as PX_FX_17: two tries, Now and Option B. Pick the right one.'}
for k in ed49: rep['fa:'+k]=R[k]
json.dump(rep,open('replies.json','w'),ensure_ascii=False);json.dump(F,open('fa45.json','w'),ensure_ascii=False)
print(os.path.getsize(Q+'/aud/fa49.mp3'))
