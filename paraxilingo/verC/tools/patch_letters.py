p='qengine.js';s=open(p).read()
def R(a,b,cnt=1):
    global s
    assert s.count(a)==cnt,(s.count(a),a[:80]); s=s.replace(a,b)
R(''' {id:"story",topic:"radio",e:"📻",name:"Domi's Radio"},''',''' {id:"letters",topic:"words",e:"🔤",name:"Letters & words"},
 {id:"read",topic:"reading",e:"📖",name:"Read it!"},
 {id:"story",topic:"radio",e:"📻",name:"Domi's Radio"},''')
R('''  if(cat==="farm")return a<=4''','''  if(cat==="letters")return a<=4?["abc","listen"]:a<=6?["listen","first","abc","whatis","lafter"]:["listen","first","whatis","lafter","lbefore"];
  if(cat==="read")return a<=5?["balloon","flash"]:["balloon","flash","sentence"];
  if(cat==="farm")return a<=4''')
R('''  if(cat==="farm")return qFarm(kind,used);''','''  if(cat==="farm")return qFarm(kind,used);
  if(cat==="letters")return qLetters(kind,used);
  if(cat==="read")return qRead(kind,used);''')
R('''["quarter","minutes","after","yesterday","months"]''','''["quarter","minutes","after","before","monthafter","yesterday","months"]''')
R('''  if(["today","tomorrow","yesterday","after","nowseason","week","months"].includes(k))return qCal(k);''','''  if(["today","tomorrow","yesterday","after","before","monthafter","nowseason","week","months"].includes(k))return qCal(k);''')
R('''  if(k==="nowseason"){''','''  if(k==="before"){const d=ri(0,6);return Object.assign({voice:["w/LULU_CA_DAY_BEFORE",...daySay(d)],cap:`? → ${DAYS_EN[d]}`,visual:`<div class="daycard">${DAYS_EN[d]}</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[(d+6)%7],v:["w/LULU_ANS_IS",...daySay((d+6)%7)]}},dayOpts((d+6)%7))}
  if(k==="monthafter"){const mo=ri(0,11),r=(mo+1)%12,o=sh([r,...sh([...Array(12).keys()].filter(x=>x!==r&&x!==mo)).slice(0,2)]),mSay=i=>["w/LULU_FA_MON"+i,"w/LULU_EN_MONTH"+i];
    return {voice:["w/LULU_CA_MONTH_AFTER",...mSay(mo)],cap:`${MONTHS_EN[mo]} → ?`,visual:`<div class="daycard">${MONTHS_EN[mo]}</div>`,opts:o.map(i=>({h:`<span class="oe">🗓️</span><small class="dn">${MONTHS_EN[i]}</small>`,say:mSay(i)})),ans:o.indexOf(r),layout:"col",hint:"elim",exp:{t:MONTHS_EN[r],v:["w/LULU_ANS_IS",...mSay(r)]}}}
  if(k==="nowseason"){''')
s+=open('letters_block.js').read()
R('''  $("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in");
  setTimeout(()=>{if(L&&L.q===q)ask(q)},350);''','''  $("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in");
  if(q.flash)setTimeout(()=>{const f=$("qBody").querySelector(".flash");if(f)f.classList.add("hid")},2200);
  setTimeout(()=>{if(L&&L.q===q)ask(q)},350);''')
open(p,'w').write(s)
p='buildC2.py';s=open(p).read()
R(".replace('__EN_SAY__',json.dumps(EN_SAY))",".replace('__EN_SAY__',json.dumps(EN_SAY)).replace('__POOL__',open(os.path.join(SDIR,'watcher','pool.json')).read())")
R(''' {id:"paint",e:"🎨",name:"Painting",desc:"Colour a picture, tap by tap"},''',''' {id:"words",e:"🔤",name:"Letters & words",desc:"ABC, first letter, English words"},
 {id:"reading",e:"📖",name:"Read it!",desc:"Sight words and short sentences (age 5+)"},
 {id:"paint",e:"🎨",name:"Painting",desc:"Colour a picture, tap by tap"},''')
R('''topics:["math","clock","money","watcher","shapes","people","radio","paint"],topicsV2:1,topicsV3:1,topicsV4:1,topicsV5:1,''','''topics:["math","clock","money","watcher","shapes","people","words","reading","radio","paint"],topicsV2:1,topicsV3:1,topicsV4:1,topicsV5:1,topicsV6:1,''')
R('''S.topicsV5=1}''','''S.topicsV5=1}if(!S.topicsV6){S.topics=[...new Set([...S.topics,"words","reading"])];S.topicsV6=1}''')
R('''shapes:"🔷",people:"🚩",radio:"📻"''','''shapes:"🔷",people:"🚩",words:"🔤",reading:"📖",radio:"📻"''')
R('''shapes:"Shapes",people:"People",''','''shapes:"Shapes",people:"People",words:"Letters",reading:"Read",''')
open(p,'w').write(s)
print('patched')
