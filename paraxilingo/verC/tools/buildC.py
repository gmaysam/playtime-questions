#!/usr/bin/env python3
"""Builds Paraxilingo verC from verB: keeps verB's question engine, replaces the shell
(month map with the big house, top bar with prizes + parents, intro screen, prizes, rewards)."""
import sys, re, json
SRC, OUT, WQ = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(SRC).read()
wq = open(WQ).read()

def between(a, b, text=None, incl_b=False):
    t = s if text is None else text
    i = t.index(a); j = t.index(b, i)
    return t[i:j + (len(b) if incl_b else 0)]

css = between('<style>', '</style>')[len('<style>'):]
script = between('<script>', '</script>')[len('<script>'):]

# ---------------- pieces of verB's script we keep ----------------
A = between('(()=>{', '/* ================= learn: map ================= */', script)
B = between('const prompt=(t,ex)=>', 'function heartsModal(cb){', script)
C = between('function closeLesson(){', '/* ---------- results:', script)
D = between('function modal(html,btns){', '/* ================= leagues tab', script)
E1 = between('function askParents(){', 'function recapHTML(pn){', script)
E2 = between('function ageUpCeremony(){', 'function showParents(){', script)
F = between('/* ================= confetti ================= */', '/* ================= start ================= */', script)
TRY = between('const DINNER=', 'const dayN=', script)
A = A.replace('function wkLog(){if(!S.wk||S.wk.id!==weekId())S.wk={id:weekId(),pos0:S.pos,q:0,right:0,topics:[]};return S.wk}','')

def rep(text, a, b, cnt=1):
    n = text.count(a)
    assert n == cnt, ("COUNT", n, a[:100])
    return text.replace(a, b)

# ---- A: content, state, audio ----
A = rep(A, ' {id:"feel",e:"😊",name:"Feelings & Friends",soon:true},',
 ''' {id:"watcher",e:"🔎",name:"Discover the world",desc:"Animals, body, nature, sky, space, food: the Watcher questions"},
 {id:"radio",e:"📻",name:"Domi's Radio",desc:"Listen to a short story, then answer questions about it"},
 {id:"feel",e:"😊",name:"Feelings & Friends",soon:true},''')
A = rep(A, 'perDay:20,', 'perDay:10,')
A = rep(A, 'ansLang:"",topics:["math","clock","money"],topicsV2:1});',
 'ansLang:"",topics:["math","clock","money","watcher","radio"],topicsV2:1,topicsV3:1,acorns:0,wood:0,day:{d:"",done:0,house:false,plan:null},stickers:[],seenW:[],real:null,notified:[],mapMonth:"auto",questions:0});')
A = rep(A, 'if(!S.topicsV2){S.topics=[...new Set([...(S.topics||[]),"math","clock","money"])];S.topicsV2=1}',
 'if(!S.topicsV2){S.topics=[...new Set([...(S.topics||[]),"math","clock","money"])];S.topicsV2=1}if(!S.topicsV3){S.topics=[...new Set([...S.topics,"watcher","radio"])];S.topicsV3=1}if(!S.real)S.real=defaultReal();if(![10,15,20,30].includes(S.perDay))S.perDay=10')
A = rep(A, 'const save=()=>{', '''function defaultReal(){return [{id:"book",e:"📚",name:"A new book",a:60,w:8},{id:"clothes",e:"👕",name:"New clothes",a:120,w:15},{id:"toy",e:"🧸",name:"A toy",a:200,w:25}]}
const save=()=>{''')
A = rep(A, 'const a=new Audio("audio/"+(S.lang==="fr"&&!/^(en|rep)\\d/.test(name)?"fr/":"")+name+".mp3");', 'const a=new Audio("audio/"+name+".mp3");')

# ---- B: lesson engine ----
B = rep(B, 'const kindLabel={teach:"Teach Domi",', 'const kindLabel={wq:"",radio:"Domi\'s Radio",rq:"",teach:"Is Domi right?",')
# fewer words in prompts
B = rep(B, '''h+=prompt(ops?`${ex.a} ${nm(ex.a)} and ${ex.b} ${nm(ex.b)}. How many in all?`:`What is ${expr(ex)}?`)''', '''h+=prompt(ops?`How many ${z.many}?`:`${expr(ex)} = ?`)''')
B = rep(B, '''h+=prompt(`Which picture shows ${expr(ex)}?`)''', '''h+=prompt(`${expr(ex)} = ?`)''')
B = rep(B, '''h+=prompt("Which number is missing?")''', '''h+=prompt("Missing number?")''')
B = rep(B, '''h+=prompt("Use the cards to make a true sum!")''', '''h+=prompt("Make a true sum!")''')
B = rep(B, '''h+=prompt(`${expr(ex)} = ? Tap the number!`)''', '''h+=prompt(`${expr(ex)} = ?`)''')
B = rep(B, '''h+=prompt(`${expr(ex)} = ? Say the answer out loud!`)''', '''h+=prompt(`Say it! 🎤`)''')
B = rep(B, '''h+=prompt(L.sk<=1?"Tap a number, then its picture!":"Tap a sum, then its answer!")''', '''h+=prompt("Match them!")''')
B = rep(B, '''I think…<b>${expr(ex)} = ${ex.shown}</b>Am I right?''', '''<b>${expr(ex)} = ${ex.shown}</b>''')
B = rep(B, '''<button class="ans opt" data-j="1">✅ Yes, Domi is right</button><button class="ans opt" data-j="0">❌ Oops! Domi made a mistake</button>''', '''<button class="ans yn yes" data-j="1">✅</button><button class="ans yn no" data-j="0">❌</button>''')
B = rep(B, '''box.className="answers";''', '''box.className="answers";box.classList.remove("yn2");''')
B = rep(B, '''<div class="answers wide" id="teachBtns">''', '''<div class="answers yn2" id="teachBtns">''')
# new exercise kinds: Watcher questions, radio story and its questions
B = rep(B, '''  }else if(ex.type==="mcq"){''', '''  }else if(ex.type==="wq"){
    const w=ex.w,pic=wEmoji(w);
    if(w.k==="tf"){
      h+=`<div class="teach">${pic?`<div class="wpic">${pic}</div>`:""}<div class="said">${bv(64)}<div class="tb2">${w.q}</div></div></div>
        <div class="answers yn2"><button class="ans yn yes" data-v="0" aria-label="Right">✅</button><button class="ans yn no" data-v="1" aria-label="Wrong">❌</button></div>`;
    }else{
      h+=`<div class="teach">${pic?`<div class="wpic">${pic}</div>`:""}<div class="tb2 q">${w.q}</div></div>
        <div class="answers ${w.o.length>2?"wide3":""}">${w.o.map((o,i)=>`<button class="ans opt pico" data-v="${i}">${optEmoji(o)?`<span class="oe">${optEmoji(o)}</span>`:""}<span>${o}</span></button>`).join("")}</div>`;
    }
  }else if(ex.type==="radio"){
    const R=RADIO[ex.r];
    h+=`<div class="radio"><div class="rbox" id="rBox"><span class="rwave"></span><span class="remo">📻</span><span class="rwave r2"></span></div>
      <div class="said">${bv(70)}<div class="tb2">${R.title}</div></div>
      <button class="btn blue" id="rPlay">▶︎ Listen</button><button class="btn green" id="rDone" disabled>I'm ready!</button></div>`;
  }else if(ex.type==="rq"){
    const R=RADIO[ex.r],q=R.qs[ex.qi];
    h+=`<div class="teach"><div class="wpic">📻</div><div class="tb2 q">${q.q}</div></div>
      <div class="answers wide3">${q.opts.map((o,i)=>`<button class="ans opt pico" data-v="${i}"><span class="oe">${o[0]}</span><span>${o[1]}</span></button>`).join("")}</div>`;
  }else if(ex.type==="mcq"){''')
B = rep(B, '''  const play=(r)=>ex.type==="repeat"?say(AUDIO.repeat,()=>say(ex.rep[0])):say(ex.audio||AUDIO[ex.type],null,r);''',
 '''  const play=(r)=>ex.type==="repeat"?say(AUDIO.repeat,()=>say(ex.rep[0])):ex.type==="wq"?say(ex.w.k==="tf"?(CLIPS.has("q_tf")?"q_tf":"q_teach"):"q_choose"):ex.type==="rq"?say(RADIO[ex.r].qs[ex.qi].clip):ex.type==="radio"?null:say(ex.audio||AUDIO[ex.type],null,r);
  if(ex.type==="radio")setupRadio(ex);''')
B = rep(B, '''    if(ex.type==="mcq"){const v=+b.dataset.v;return answer(v===ex.ans,ex.answerText||ex.opts[ex.ans].replace(/<[^>]+>/g,""),b)}''',
 '''    if(ex.type==="mcq"){const v=+b.dataset.v;return answer(v===ex.ans,ex.answerText||ex.opts[ex.ans].replace(/<[^>]+>/g,""),b)}
    if(ex.type==="wq"){const v=+b.dataset.v,w=ex.w;return answer(v===w.n,w.x,b,false,null,w.k==="tf"?(w.n===0?"✅ Right! "+w.x:"❌ Not true. "+w.x):`${w.o[w.n]}: ${w.x}`)}
    if(ex.type==="rq"){const v=+b.dataset.v,q=RADIO[ex.r].qs[ex.qi];return answer(v===q.ans,q.opts[q.ans][0]+" "+q.opts[q.ans][1],b)}''')
# answers: no repeats at the end; the second miss explains; more praise; acorns
B = rep(B, '''function answer(ok,correctText,btn,skipped,goodTitle){''', '''function answer(ok,correctText,btn,skipped,goodTitle,explain){''')
B = rep(B, '''    L.correct++;L.row++;L.bestRow=Math.max(L.bestRow,L.row);L.miss=0;''', '''    L.correct++;L.row++;L.bestRow=Math.max(L.bestRow,L.row);L.miss=0;
    {const n=ex.retried?1:2;S.acorns+=n;L.acorns=(L.acorns||0)+n;S.questions++;save();renderStats();bump("sAcorns")}''')
B = rep(B, '''    showFb(true,goodTitle||(L.row>=3?["Domi is so proud!","Hop hop hooray!","You're on a roll!"][L.row%3]:["Yay! You got it!","Domi is dancing!","Super smart!","Woohoo!"][Math.floor(Math.random()*4)]),correctText,3);''',
 '''    showFb(true,goodTitle||(L.row>=3?["Domi is so proud!","Hop hop hooray!","You're on a roll!","Unstoppable!"][L.row%4]:PRAISE_T[Math.floor(Math.random()*PRAISE_T.length)]),`+${ex.retried?1:2} 🌰`,3);
    if(L.row>0&&L.row%3===0)dance();''')
B = rep(B, '''    say("praise"+(1+Math.floor(Math.random()*4)),()=>setTimeout(go,Math.max(150,1300-(Date.now()-t0))));''',
 '''    say(L.row>0&&L.row%3===0&&CLIPS.has("praise8")?"praise8":pickOne(["praise1","praise2","praise3","praise4","praise5","praise6","praise7"].filter(c=>CLIPS.has(c))),()=>setTimeout(go,Math.max(150,1300-(Date.now()-t0))));''')
B = rep(B, '''    {const c=Object.assign({},ex);delete c.locked;delete c.pending;delete c.chosen;L.queue.push(c)} /* wrong ones come back at the end */''', '''    S.questions+=skipped?0:1;save();''')
B = rep(B, '''    showFb(false,skipped?"Let's look together":"Here's how:",skipped?"Answer: "+correctText:correctText,5);''',
 '''    showFb(false,skipped?"Let's look together":"Here's why:",explain||correctText,6);''')
B = rep(B, '''    say("wrong",()=>setTimeout(once,500));setTimeout(once,5500);''', '''    say("wrong",()=>setTimeout(once,1200));setTimeout(once,7000);''')
B = rep(B, '''  answer(false,ex.type==="match"?"Match each pair":ex.type==="mcq"?''', '''  if(ex.type==="radio"){$("rDone").disabled=false;$("rDone").click();return}
  answer(false,ex.type==="wq"?ex.w.x:ex.type==="rq"?RADIO[ex.r].qs[ex.qi].opts[RADIO[ex.r].qs[ex.qi].ans][1]:ex.type==="match"?"Match each pair":ex.type==="mcq"?''')
B = rep(B, '''  if(L.topic==="clock"||L.topic==="money")return makeMcq(L.topic);''', '''  if(L.topic==="clock"||L.topic==="money")return makeMcq(L.topic);
  if(L.topic==="watcher"){const w=pickWatcher(true);if(w)return {type:"wq",w}}''')
B = B.replace('''const tag=()=>L.node==="lesson"?"":`<div class="ltag">${NODE[L.node].icon} ${NODE[L.node].label}</div>`;''', '''const tag=()=>"";''')
B = rep(B, '''function dayDoneModal(){''', '''function dayDoneModal_unused(){''')

B = rep(B, '''    $("lBar").style.width=(L.correct/L.total*100)+"%";''', '')
B = rep(B, '''  L.answered++;''', '''  L.answered++;$("lBar").style.width=Math.min(100,L.answered/L.total*100)+"%";''')
B = rep(B, '''    const after=()=>{if(L===lesson&&L.miss>=2&&L.jump===undefined){L.miss=0;calmCorner(()=>{if(L===lesson){L.queue.unshift(easierEx());go()}})}else go()};''', '''    const after=go;''')
B = rep(B, '''  if(btn){btn.classList.add("wrong");btn.disabled=true}''', '''  if(btn){btn.classList.add("wrong");btn.disabled=!btn.classList.contains("yn")}''')
C = rep(C, '''  resetCheck();''', '''''')

css += r'''
/* ===================== verC ===================== */
body{background:#fff}
.topbar{gap:6px}
.stats{justify-content:flex-start;gap:10px;padding-left:4px}
.tbtn{width:44px;height:44px;border-radius:14px;border:2px solid var(--line);box-shadow:0 3px 0 var(--line);display:grid;place-items:center;font-size:22px;position:relative;flex:none;background:#fff}
.tbtn .dotn{position:absolute;top:-6px;right:-6px;min-width:20px;height:20px;border-radius:10px;background:var(--berry);color:#fff;font-size:12px;font-weight:900;display:grid;place-items:center;padding:0 4px;border:2px solid #fff}
.stat .emo{font-size:20px}
.monthbar{position:sticky;top:0;z-index:7;padding:10px 12px;background:linear-gradient(#fff 72%,transparent)}
.monthbar .unit{padding:9px 12px 9px 18px}
.monthbar .ev{font-size:26px}
.daypill{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:800;opacity:.95}
.house{position:relative;height:214px;background:linear-gradient(#fff 0%,#fff 35%,#DDEFFB 35%,#BFE0F5 100%)}
.house svg.lodge{position:absolute;left:50%;top:6px;transform:translateX(-50%);width:200px;height:170px;overflow:visible;top:38px;filter:drop-shadow(0 6px 6px rgba(0,0,0,.18))}
.house .glow{transform-origin:100px 118px;animation:glow 1.6s ease-in-out infinite}
@keyframes glow{50%{transform:scale(1.15);opacity:.65}}
.house .htag{position:absolute;left:50%;top:6px;z-index:3;transform:translateX(-50%);background:#fff;border:2px solid var(--line);border-radius:999px;padding:4px 12px;font-weight:800;font-size:13px;white-space:nowrap}
.house.done .htag{border-color:var(--leaf);color:var(--leaf-deep)}
.hole.sg .sym{font-size:min(5.6vw,22px);line-height:1}
.hole.sg.future .sym{filter:grayscale(.2);opacity:.6}
.hole.sg.done .ok{position:absolute;right:-6px;top:-6px;width:18px;height:18px;border-radius:50%;background:var(--leaf);color:#fff;font-size:11px;font-weight:900;display:grid;place-items:center;border:2px solid #fff}
.hole.current .cic{font-size:30px}
.hole .qn{position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:2px;font-size:11px;font-weight:900;background:#fff;border-radius:999px;padding:1px 7px;border:1.5px solid var(--line);white-space:nowrap;color:var(--ink-soft)}
.evdeco{position:absolute;font-size:30px;pointer-events:none;z-index:2;animation:floaty 4s ease-in-out infinite;opacity:.9}
@keyframes floaty{50%{transform:translateY(-10px) rotate(8deg)}}
/* intro screen */
.introC{position:absolute;inset:0;z-index:60;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px max(22px,env(safe-area-inset-right,0px)) 30px max(22px,env(safe-area-inset-left,0px));text-align:center;transition:opacity .4s,transform .4s}
.introC.gone{opacity:0;transform:scale(1.05);pointer-events:none}
.introC .talk{width:220px;max-width:62%}
.introC .mcard{border:2px solid var(--line);border-radius:22px;padding:14px 18px;max-width:330px;width:100%}
.introC .mcard .mm{font-size:13px;font-weight:900;letter-spacing:1px;text-transform:uppercase;color:var(--ink-soft)}
.introC .mcard b{display:block;font-family:var(--f-display);font-weight:600;font-size:28px;line-height:1.15}
.introC .mcard p{margin:8px 0 0;font-weight:700;color:var(--ink-soft);line-height:1.35}
.introC .evb{font-size:34px}
.introC .btn{max-width:320px}
.introC .skip{font-weight:800;color:var(--ink-soft);text-transform:uppercase;letter-spacing:1px;font-size:14px;padding:8px 14px}
.introC .tap{font-size:13px;color:var(--ink-soft);font-weight:700}
/* questions with pictures */
.wpic{font-size:86px;line-height:1.05;text-align:center;filter:drop-shadow(0 4px 2px rgba(0,0,0,.12))}
.said{display:flex;align-items:flex-end;gap:8px;max-width:100%}
.tb2.q{font-size:22px}
.said .tb2{font-size:19px}
.answers.yn2{grid-template-columns:1fr 1fr}
.ans.yn{font-size:52px;min-height:96px}
.ans.yn.yes{border-color:#BFE3A6}.ans.yn.no{border-color:#F3C2B5}
.answers.wide3{grid-template-columns:1fr}
.ans.pico{display:flex;align-items:center;gap:12px;justify-content:center;font-size:22px}
.ans.pico .oe{font-size:34px}
.radio{display:flex;flex-direction:column;align-items:center;gap:12px}
.rbox{position:relative;width:150px;height:150px;border-radius:30px;background:linear-gradient(#FBE6D2,#F2C9A4);display:grid;place-items:center;box-shadow:0 6px 0 #D9A877}
.rbox .remo{font-size:84px}
.rbox .rwave{position:absolute;inset:-10px;border-radius:40px;border:4px solid #F2B98A;opacity:0}
.rbox.on .rwave{animation:wavec 1.4s ease-out infinite}.rbox.on .r2{animation-delay:.7s}
@keyframes wavec{from{transform:scale(.9);opacity:.9}to{transform:scale(1.35);opacity:0}}
.radio .btn{max-width:300px}
/* praise dance */
.dance{position:absolute;inset:0;z-index:28;display:grid;place-items:center;pointer-events:none}
.dance .bv{animation:dancea .45s ease-in-out 4 alternate}
.dance .tx{position:absolute;bottom:34%;font-family:var(--f-display);font-weight:700;font-size:30px;color:var(--sun-deep);text-shadow:0 2px 0 #fff}
@keyframes dancea{from{transform:rotate(-12deg) translateY(0)}to{transform:rotate(12deg) translateY(-24px)}}
/* prizes page */
.prz h2{margin:0 0 4px}
.stk{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.stk button{aspect-ratio:1;border-radius:16px;border:2px solid var(--line);font-size:30px;display:grid;place-items:center;background:#fff}
.stk .empty{opacity:.35;font-size:20px;color:var(--ink-soft)}
.rp{border:2px solid var(--line);border-radius:18px;padding:12px 14px;margin-bottom:10px;display:grid;grid-template-columns:auto 1fr;gap:4px 12px;align-items:center}
.rp .re{font-size:44px;grid-row:span 3}
.rp b{font-size:17px}
.rp>span{display:block;min-width:0}
.rp>span small{display:block;margin-top:2px}
.rp .bar{display:block;height:12px;border-radius:999px;background:var(--mist);overflow:hidden}
.rp .bar i{display:block;height:100%;border-radius:999px}
.rp .bar.a i{background:#C8803F}.rp .bar.w i{background:#7A4A1E}
.rp small{font-weight:700;color:var(--ink-soft)}
.rp.ready{border-color:var(--leaf);background:var(--leaf-tint)}
.howto{background:var(--mist);border-radius:16px;padding:12px 14px;font-weight:700;line-height:1.45;color:var(--ink-soft)}
.howto b{color:var(--ink)}
/* reveal animation */
.reveal{position:absolute;inset:0;z-index:45;background:rgba(255,255,255,.96);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center;padding:24px}
.reveal .gift{font-size:110px;animation:shakeg .5s ease-in-out 3}
.reveal .gift.open{animation:none;transform:scale(0);transition:transform .3s}
.reveal .item{font-size:130px;transform:scale(0) rotate(-200deg);transition:transform .7s cubic-bezier(.3,1.6,.5,1)}
.reveal .item.show{transform:scale(1) rotate(0)}
.reveal h2{margin:0;font-family:var(--f-display);font-weight:700;font-size:30px}
.reveal p{margin:0;font-weight:700;color:var(--ink-soft)}
.reveal .btn{max-width:300px}
.rays{position:absolute;width:340px;height:340px;border-radius:50%;background:repeating-conic-gradient(#FFE9A8 0 12deg,transparent 12deg 30deg);animation:spin 8s linear infinite;opacity:0;transition:opacity .5s;z-index:-1}
.reveal.lit .rays{opacity:.8}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes shakeg{25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
.costrow{display:flex;align-items:center;gap:8px;margin:6px 0}
.costrow .stp{width:34px;height:34px;border-radius:10px;border:2px solid var(--line);font-weight:900;font-size:18px}
.costrow span{min-width:64px;text-align:center;font-weight:800}
.prset{border:2px solid var(--line);border-radius:16px;padding:10px 12px;margin-bottom:10px}
.prset .pt{display:flex;align-items:center;gap:8px;font-weight:800}
.prset .pt .e{font-size:28px}
.prset .est{font-size:13px;font-weight:700;color:var(--ink-soft);margin:4px 0 0}
.pop.up{transform-origin:var(--ax) 100%}
.pop.up::before{top:auto;bottom:-8px}
.months{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
'''

markup = '''
<div class="stage">
<div class="phone" id="phone">
  <div class="island" aria-hidden="true"></div>
  <div class="statusbar" aria-hidden="true"><span id="clock">9:41</span><span></span></div>

  <header class="topbar">
    <button class="course" id="tbCourse" aria-label="Players" aria-expanded="false"></button>
    <div class="stats">
      <span class="stat flame" id="sWood" aria-label="Wood"><i class="emo" style="font-style:normal">🪵</i><span>0</span></span>
      <span class="stat gem" id="sAcorns" aria-label="Acorns"><i class="emo" style="font-style:normal">🌰</i><span>0</span></span>
    </div>
    <button class="tbtn" id="tbPrizes" aria-label="My prizes">🏆<span class="dotn" id="prDot" hidden>!</span></button>
    <button class="tbtn" id="tbParents" aria-label="Parents">👨‍👩‍👧</button>
  </header>
  <div class="dim" id="dim"></div>
  <div class="drop" id="drop" role="dialog"></div>

  <main class="map" id="map" aria-label="Today's path">
    <div class="monthbar"><div class="unit" id="unit"><span class="ut"><small id="unitK">November</small><b id="unitN">Green Forest</b></span><span class="ev" id="unitE"></span></div></div>
    <div class="journey" id="journey"></div>
  </main>

  <section class="panel" id="pPrizes" hidden></section>
  <section class="panel" id="pSettings" hidden></section>

  <section class="lesson over" id="lesson" aria-hidden="true">
    <div class="lhead">
      <button class="lclose" id="lClose" aria-label="Back to the map"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <div class="lbar" aria-hidden="true"><i id="lBar"></i><span class="combo" id="combo"></span></div>
    </div>
    <div class="lbody" id="lBody"></div>
    <div class="lfoot" id="lFoot" hidden><button class="btn ghost" id="lSkip">Skip</button><button class="btn green" id="lCheck" disabled>Check</button></div>
    <div class="fb" id="fb"><div class="fbtop"><span class="face" id="fbFace"></span><span class="fbt"><b id="fbTitle"></b><span class="t" id="fbSub"></span></span><button class="flag" id="fbFlag" aria-label="Report a problem">⚑</button></div><button class="btn" id="fbBtn">Continue</button></div>
    <div class="result" id="result" hidden></div>
  </section>

  <div class="modal" id="modal"><div class="card" id="mCard"></div></div>
  <div class="toast" id="toast"></div>

  <div class="introC" id="introC">
    <img class="talk" src="img/beaver_talk.webp" alt="Domi the beaver talking">
    <div class="mcard"><div class="mm" id="inMonth">November</div><b id="inLand">Green Forest</b><p id="inText">A prize is waiting in Domi's big house by the dam. Are you ready?</p></div>
    <button class="btn green" id="inGo">I'm ready!</button>
    <button class="skip" id="inSkip">Skip</button>
  </div>

  <canvas class="fx" id="fx"></canvas>
</div>
</div>
'''

shell = r'''
/* ================= Watcher questions, radio, praise ================= */
const WQ=__WQ__;
const PIC_E={apples:"🍎",astronaut:"🧑‍🚀",baby:"👶",bat:"🦇",bed:"🛏️",bee:"🐝",bird:"🐦",car:"🚗",cat:"🐱",caterpillar:"🐛",circle:"⚪",cloud:"☁️",corn:"🌽",cow:"🐄",dog:"🐶",duck:"🦆",earth:"🌍",eggs:"🥚",fish:"🐟",frog:"🐸",fullmoon:"🌕",galaxy:"🌌",grass:"🌿",hat:"🎩",hen:"🐔",hexagon:"⬢",honey:"🍯",jet:"✈️",jupiter:"🪐",key:"🔑",leaves:"🍂",lightning:"⚡",mars:"🔴",mercury:"🌑",moon:"🌙",nest:"🪺",planet:"🪐",rain:"🌧️",rainbow:"🌈",satellite:"🛰️",saturn:"🪐",sea:"🌊",seeds:"🌱",shark:"🦈",ship:"🚢",snake:"🐍",snow:"❄️",sphere:"🔵",square:"🟥",star:"⭐",sun:"☀️",telescope:"🔭",tree:"🌳",triangle:"🔺",web:"🕸️"};
const WORD_E={ant:"🐜",apple:"🍎",apples:"🍎",astronaut:"🧑‍🚀",autumn:"🍂",baker:"🧑‍🍳",ball:"⚽",banana:"🍌",barn:"🛖",beach:"🏖️",beans:"🫘",bear:"🐻",bed:"🛏️",bee:"🐝",big:"🐘",bird:"🐦",black:"⚫",blue:"🔵",boat:"⛵",bones:"🦴",brain:"🧠",bread:"🍞",breathe:"🌬️",brush:"🪥",bus:"🚌",butterfly:"🦋",candy:"🍬",car:"🚗",cars:"🚗",cat:"🐱",cave:"🕳️",cheese:"🧀",cheetah:"🐆",chef:"🧑‍🍳",chips:"🍟",circle:"⚪",clock:"🕒",clouds:"☁️",cold:"🥶",comet:"☄️",corn:"🌽",cow:"🐄",crown:"👑",dentist:"🦷",desert:"🏜️",doctor:"🧑‍⚕️",dog:"🐶",down:"⬇️",duck:"🦆",ears:"👂",earth:"🌍",elbow:"💪",elephant:"🐘",eyes:"👀",farmer:"🧑‍🌾",fast:"💨",feet:"🦶",fish:"🐟",flour:"🌾",fork:"🍴",fox:"🦊",frog:"🐸",grass:"🌿",green:"🟢",hair:"💇",hands:"👐",hat:"🎩",hen:"🐔",hive:"🐝",in:"📥",juice:"🧃",jupiter:"🪐",key:"🔑",knee:"🦵",ladder:"🪜",lake:"🏞️",lava:"🌋",leaves:"🍂",lightning:"⚡",lion:"🦁",map:"🗺️",maple:"🍁",mars:"🔴",mercury:"🌑",milk:"🥛",moon:"🌙",mouse:"🐭",nails:"💅",nectar:"🌸",neptune:"🔵",nest:"🪺",nose:"👃",ocean:"🌊",on:"🔛",orange:"🟠",paper:"📄",pig:"🐷",pilot:"🧑‍✈️",pine:"🌲",pond:"🦆",purple:"🟣",rain:"🌧️",rainbow:"🌈",raincoat:"🧥",red:"🔴",rice:"🍚",rock:"🪨",rocks:"🪨",sand:"⏳",saturn:"🪐",sea:"🌊",ship:"🚢",shoes:"👟",shops:"🏪",smoke:"💨",snow:"❄️",spoon:"🥄",spring:"🌸",square:"🟥",stones:"🪨",summer:"☀️",sun:"☀️",swimsuit:"🩱",telescope:"🔭",think:"🤔",thunder:"⛈️",toe:"🦶",toys:"🧸",trees:"🌳",triangle:"🔺",turtle:"🐢",venus:"🟡",walk:"🚶",water:"💧",white:"⚪",wind:"🌬️",winter:"⛄",yellow:"🟡","north pole":"🧊","it freezes":"🧊","it steams":"♨️","a low cloud":"🌫️","blocking sun":"🌑"};
const TEXT_E=[["whale","🐋"],["penguin","🐧"],["giraffe","🦒"],["octopus","🐙"],["hands","🧼"],["teeth","🪥"],["heart","❤️"],["water","💧"],["cactus","🌵"],["mushroom","🍄"],["mountain","⛰️"],["river","🏞️"],["carrot","🥕"],["tomato","🍅"],["toys","🧸"],["paper","📄"],["nowruz","🌸"],["ice","🧊"],["light","💡"],["sound","🔊"],["heavy","🪨"],["elephant","🐘"],["spider","🕷️"],["cheetah","🐆"],["bear","🐻"],["rain","🌧️"],["volcano","🌋"],["moon","🌙"],["sun","☀️"],["plant","🌱"],["milk","🥛"],["bread","🍞"],["egg","🥚"],["bone","🦴"],["eye","👀"],["nose","👃"],["ear","👂"],["shape","🔷"],["clock","🕒"],["number","🔢"]];
function wEmoji(w){if(w.p&&PIC_E[w.p])return PIC_E[w.p];const t=w.q.toLowerCase();for(const [k,e] of TEXT_E)if(t.includes(k))return e;return w.k==="tf"?"🤔":"❓"}
const optEmoji=o=>WORD_E[o.toLowerCase()]||(/^\d+$/.test(o)?"":"");
function pickWatcher(easy){
  const age=Math.min(8,S.age),pool=WQ.filter(w=>w.a<=Math.max(3,age)&&(!easy||w.a<=3));
  let left=pool.filter(w=>!S.seenW.includes(w.i));
  if(!left.length){S.seenW=[];left=pool}
  const w=pickOne(left);if(!w)return null;S.seenW.push(w.i);return w;
}
const RADIO=[
 {clip:"story1",title:"Domi and the apples 🍎",qs:[{clip:"rq1a",q:"How many apples?",opts:[["🍎🍎","Two"],["🍎🍎🍎","Three"],["🍎🍎🍎🍎","Four"]],ans:1},{clip:"rq1b",q:"Who got an apple?",opts:[["🦆","Duck"],["🐱","Cat"],["🐶","Dog"]],ans:0}]},
 {clip:"story2",title:"Domi in the rain ☔",qs:[{clip:"rq2a",q:"What colour was the umbrella?",opts:[["🟡","Yellow"],["🔴","Red"],["🔵","Blue"]],ans:0},{clip:"rq2b",q:"Who did Domi see?",opts:[["🐸","Frog"],["🐟","Fish"],["🐦","Bird"]],ans:0}]},
 {clip:"story3",title:"Domi and the stars ⭐",qs:[{clip:"rq3a",q:"How many stars?",opts:[["⭐⭐⭐","Three"],["⭐⭐⭐⭐⭐","Five"],["⭐⭐⭐⭐⭐⭐⭐","Seven"]],ans:1},{clip:"rq3b",q:"What did Domi do at the end?",opts:[["😴","Slept"],["🍽️","Ate"],["⚽","Played"]],ans:0}]},
];
const CLIPS=new Set(__CLIPS__);
const PRAISE_T=["Yay! You got it!","Super smart!","Woohoo!","Amazing!","Brilliant!","You're a star!","Fantastic!","Domi is dancing!"];
function setupRadio(ex){
  const R=RADIO[ex.r],box=$("rBox"),done=$("rDone");
  const enable=()=>{done.disabled=false;box.classList.remove("on")};
  $("rPlay").onclick=()=>{sfx.tap();box.classList.add("on");say("radio",()=>say(R.clip,enable))};
  done.onclick=()=>{sfx.tap();if(voice){voice.onended=null;voice.pause();voice=null}box.classList.remove("on");ex.locked=true;nextExercise(200)};
  setTimeout(()=>{if(L&&L.ex===ex)$("rPlay").click()},400);
  setTimeout(enable,25000);
  $("lFoot").hidden=true;
}
function dance(){
  const d=document.createElement("div");d.className="dance";d.innerHTML=`${bv(150)}<div class="tx">${pickOne(["Hop hop hooray!","3 in a row!","You rock!"])}</div>`;
  $("lesson").appendChild(d);burst(120);setTimeout(()=>d.remove(),1900);
}

/* ================= months and events ================= */
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_LAND=[7,5,4,6,11,8,9,1,2,10,0,3]; /* which land of the big picture each month uses */
function eventNow(d=new Date()){
  const m=d.getMonth()+1,day=d.getDate();
  if(m===12&&day>=19&&day<=22)return {id:"yalda",e:"🍉",name:"Yalda Night",deco:["🍉","🍎","🕯️"],clip:"ev_yalda"};
  if((m===3&&day>=19)||(m===4&&day<=2))return {id:"nowruz",e:"🌸",name:"Nowruz",deco:["🌸","🐟","🌱"],clip:"ev_nowruz"};
  if(m===10&&day>=29||m===11&&day===1)return {id:"halloween",e:"🎃",name:"Halloween",deco:["🎃","🦇","🍬"],clip:"ev_halloween"};
  return null;
}
const monthIdx=()=>S.mapMonth==="auto"?new Date().getMonth():+S.mapMonth;
const landIdx=()=>MONTH_LAND[monthIdx()];
const TOPIC_SYM={math:"➕",clock:"🕒",money:"🪙",watcher:"🔎",radio:"📻"};

/* ================= today's path: the parents' daily questions split over the mounds ================= */
const activeTopics=()=>S.topics.filter(t=>TOPIC_SYM[t]);
function dayPlan(){
  if(S.day.d!==today()||!S.day.plan||S.day.land!==landIdx()||S.day.per!==S.perDay||S.day.tops!==activeTopics().join()){
    const n=HOLES[landIdx()].length,Q=S.perDay,base=Math.floor(Q/n),rem=Q%n,tops=activeTopics().filter(t=>t!=="radio");
    const t0=tops.length?tops:["math"],off=dayN()%t0.length;
    const rk=activeTopics().includes("radio")&&n>2?Math.floor(n/2):-1;let j=0;
    const plan=Array.from({length:n},(x,i)=>i===rk?{count:Math.max(2,base+(i<rem?1:0)),topic:"radio",story:dayN()%RADIO.length}:{count:Math.max(1,base+(i<rem?1:0)),topic:t0[(j++ +off)%t0.length]});
    const keep=S.day.d===today()&&S.day.land===landIdx();
    S.day={d:today(),done:keep?Math.min(S.day.done,n):0,house:keep?S.day.house:false,plan,land:landIdx(),per:S.perDay,tops:activeTopics().join()};save();
  }
  return S.day.plan;
}

/* ================= map ================= */
const journey=$("journey");let landEl=null,houseEl=null,holeEls=[];
const beaver=document.createElement("button");beaver.className="beaver";beaver.setAttribute("aria-label","Domi");
const LODGE=`<svg class="lodge" viewBox="0 0 200 170" aria-hidden="true">
  <ellipse cx="100" cy="150" rx="96" ry="16" fill="#9CCDEB"/>
  <path d="M6 150 Q20 118 34 150 Z" fill="#8C5A2B"/><path d="M166 150 Q180 118 194 150 Z" fill="#8C5A2B"/>
  <path d="M22 150 C24 80 60 30 100 30 C140 30 176 80 178 150 Z" fill="#A8713C" stroke="#6B3E14" stroke-width="4"/>
  <g stroke="#6B3E14" stroke-width="4" stroke-linecap="round" opacity=".55"><path d="M40 120 L80 108"/><path d="M120 60 L160 82"/><path d="M50 82 L92 70"/><path d="M118 108 L164 120"/><path d="M70 50 L108 44"/><path d="M60 140 L100 132"/></g>
  <circle class="glow" cx="100" cy="118" r="30" fill="#FFE27A" opacity=".9"/>
  <path d="M74 150 V118 a26 26 0 0 1 52 0 V150 Z" fill="#4A2A10"/>
  <text x="100" y="140" text-anchor="middle" font-size="30" id="lodgeGift">🎁</text>
  <path d="M100 6 L106 22 L100 18 L94 22 Z" fill="#E0559A"/></svg>`;
function buildMap(){
  journey.innerHTML="";const z=landIdx(),Z=ZONES[z];
  houseEl=document.createElement("div");houseEl.className="house";houseEl.innerHTML=LODGE+`<span class="htag" id="houseTag">🎁 Domi's big house</span>`;
  houseEl.onclick=()=>{if(S.day.done>=HOLES[z].length&&!S.day.house)openHouse();else if(S.day.house)toast("You opened today's prize! Come back tomorrow 🌙");else toast("Finish all the mounds to open the big house!")};
  journey.appendChild(houseEl);
  const sec=document.createElement("section");sec.className="zone";sec.style.aspectRatio=`720/${TILE_H[z]}`;
  const src=`img/w/z${String(z).padStart(2,"0")}.webp`;
  sec.innerHTML=`<div class="zbg"><img src="${src}" alt="${Z.name}"><img class="gr" src="${src}" alt=""></div>`;
  holeEls=HOLES[z].map(([x,y],i)=>{const b=document.createElement("button");b.className="hole";b.style.left=x+"%";b.style.top=y+"%";b.onclick=e=>{e.stopPropagation();showPop(i)};sec.appendChild(b);return b});
  const ev=eventNow();
  if(ev)for(let k=0;k<6;k++){const d=document.createElement("span");d.className="evdeco";d.textContent=ev.deco[k%ev.deco.length];d.style.left=(k%2?82:6)+"%";d.style.top=(8+k*15)+"%";d.style.animationDelay=(k*.6)+"s";sec.appendChild(d)}
  sec.appendChild(beaver);journey.appendChild(sec);landEl=sec;
}
function renderMap(){
  const z=landIdx(),Z=ZONES[z],plan=dayPlan(),done=S.day.done,n=HOLES[z].length,ev=eventNow();
  if(!landEl||landEl.dataset.z!=String(z)){buildMap();landEl.dataset.z=z}
  $("unitK").textContent=`${MONTHS[monthIdx()]}${ev?" · "+ev.name:""}`;$("unitN").textContent=Z.name;$("unitE").textContent=ev?ev.e:Z.o;
  $("unit").style.setProperty("--uc",Z.c);
  holeEls.forEach((b,i)=>{
    const p=plan[i],st=i<done?"done":i===done?"current":"future";b.style.setProperty("--dc",Z.c);
    if(st==="current"){b.className="hole current";b.innerHTML=`<span class="cic">${TOPIC_SYM[p.topic]}</span><span class="tip">${i===0?"START":"GO!"}</span>`}
    else{b.className="hole sg "+st;b.innerHTML=`<span class="sym">${TOPIC_SYM[p.topic]}</span>`+(st==="done"?`<span class="ok">✓</span>`:"")}
  });
  const cut=done>=n?-10:HOLES[z][done][1]-4;landEl.style.setProperty("--cut",cut+"%");
  houseEl.classList.toggle("done",S.day.house);
  $("houseTag").textContent=S.day.house?"✅ Today's prize is open":done>=n?"🎁 Tap to open!":`🎁 ${n-done} ${n-done===1?"mound":"mounds"} to the big house`;
  const g=$("lodgeGift");if(g)g.textContent=S.day.house?(S.stickers.length?S.stickers[S.stickers.length-1].e:"✨"):"🎁";
  beaver.innerHTML=bv(64);
  renderStats();
}
function moundXY(i){const z=landIdx(),[x,y]=MOUNDS[z][Math.min(i,MOUNDS[z].length-1)];return {x:x/100*landEl.offsetWidth,y:landEl.offsetTop+y/100*landEl.offsetHeight}}
function placeBeaver(animate){
  const n=HOLES[landIdx()].length,done=S.day.done;
  let p;if(done>=n){p={x:journey.offsetWidth/2,y:houseEl.offsetTop+200}}else p=moundXY(done);
  const W=64,H=58,left=p.x-W/2,top=p.y+14-H-(done>=n?0:landEl.offsetTop);
  const parent=done>=n?houseEl:landEl;if(beaver.parentNode!==parent)parent.appendChild(beaver);
  const tp=done>=n?p.y-houseEl.offsetTop+10-H:top;
  if(!animate){beaver.style.transition="none";beaver.style.left=left+"px";beaver.style.top=tp+"px";void beaver.offsetWidth;beaver.style.transition="";return}
  beaver.classList.add("walking");beaver.style.left=left+"px";beaver.style.top=tp+"px";
  let k=0;const t=setInterval(()=>{sfx.step();if(++k>3)clearInterval(t)},260);
  setTimeout(()=>{beaver.classList.remove("walking");void beaver.offsetWidth;beaver.classList.add("popin");sfx.pop()},1150);
}
window.addEventListener("resize",()=>{if(!$("map").hidden)placeBeaver(false)});
beaver.onclick=e=>{e.stopPropagation();const n=HOLES[landIdx()].length;if(S.day.done<n)showPop(S.day.done);else houseEl.onclick()};
function scrollToCurrent(smooth){
  const n=HOLES[landIdx()].length,y=S.day.done>=n?0:moundXY(S.day.done).y,map=$("map");
  map.scrollTo({top:Math.max(0,journey.offsetTop+y-map.clientHeight/2),behavior:smooth?"smooth":"auto"});
}
function renderStats(){
  $("sAcorns").querySelector("span").textContent=S.acorns;$("sWood").querySelector("span").textContent=S.wood;
  const cp=curPlayer();$("tbCourse").style.setProperty("--pc",cp.color);$("tbCourse").textContent=cp.name.trim()[0].toUpperCase();
  $("prDot").hidden=!S.real.some(r=>S.acorns>=r.a&&S.wood>=r.w);
}
function bump(id){const e=$(id);if(!e)return;e.classList.remove("bump");void e.offsetWidth;e.classList.add("bump")}

/* mound pop-up */
let popEl=null;
function closePop(){if(popEl){popEl.remove();popEl=null}}
function showPop(i){
  closePop();sfx.tap();
  const plan=dayPlan(),p=plan[i],done=S.day.done,c=COURSE.find(x=>x.id===p.topic),pt=moundXY(i),W=250,left=Math.max(12,Math.min(journey.offsetWidth-W-12,pt.x-W/2));
  popEl=document.createElement("div");popEl.className="pop";popEl.style.left=left+"px";popEl.style.top=(pt.y-landEl.offsetTop+20)+"px";popEl.style.setProperty("--ax",(pt.x-left)+"px");
  popEl.style.setProperty("--pc",i<done?"#9AA0A8":i===done?ZONES[landIdx()].c:"#AFAFBA");
  const cnt=p.topic==="radio"?"a story + 2 questions":`${p.count} ${p.count===1?"question":"questions"}`;
  popEl.innerHTML=i===done?`<h4>${TOPIC_SYM[p.topic]} ${c?c.name:""}</h4><p>${cnt}</p><button class="btn">Let's go!</button>`
    :i<done?`<h4>✅ Done!</h4><p>You finished this mound today.</p>`:`<h4>${TOPIC_SYM[p.topic]} ${c?c.name:""}</h4><p>Coming up: ${cnt}</p>`;
  popEl.onclick=e=>e.stopPropagation();
  const b=popEl.querySelector(".btn");if(b)b.onclick=()=>{closePop();sfx.tap();openMound(i)};
  landEl.appendChild(popEl);
  /* near the bottom of the land: open the card above the mound so its button stays on screen */
  const top0=pt.y-landEl.offsetTop+20,h=popEl.offsetHeight;
  if(top0+h>landEl.offsetHeight-8){popEl.classList.add("up");popEl.style.top=Math.max(8,pt.y-landEl.offsetTop-62-h)+"px"}
  const map=$("map"),r=popEl.getBoundingClientRect(),mr=map.getBoundingClientRect();
  if(r.bottom>mr.bottom-8||r.top<mr.top+70)map.scrollBy({top:r.bottom>mr.bottom-8?r.bottom-mr.bottom+20:r.top-mr.top-80,behavior:"smooth"});
}
$("map").addEventListener("click",closePop);

/* ================= a mound = one set of questions ================= */
let L=null;
function openMound(i){
  closeDrop();
  const z=landIdx(),p=dayPlan()[i];
  L={g:i,z,node:"lesson",correct:0,mistakes:0,answered:0,row:0,bestRow:0,t0:Date.now(),acorns:0,topic:p.topic};
  L.sk=skillFor(S.age,S.diff,0);
  if(p.topic==="radio")L.queue=[{type:"radio",r:p.story},{type:"rq",r:p.story,qi:0},{type:"rq",r:p.story,qi:1}];
  else if(p.topic==="clock"||p.topic==="money")L.queue=Array.from({length:p.count},()=>makeMcq(p.topic));
  else if(p.topic==="watcher")L.queue=Array.from({length:p.count},()=>({type:"wq",w:pickWatcher()})).filter(e=>e.w);
  else{const start=(dayN()*3+i*2)%TYPES.length;L.queue=Array.from({length:p.count},(x,k)=>newEx(TYPES[(start+k)%TYPES.length]));
    if(i===dayPlan().findIndex(x=>x.topic==="math")&&L.queue.length>1)L.queue.splice(1,1,newEx("teach"))}
  L.total=L.queue.filter(e=>e.type!=="radio").length||1;
  {const w=wkLog();if(!w.topics.includes(p.topic))w.topics.push(p.topic);S.lastTopic=p.topic;save()}
  $("lBar").style.width="0";$("result").hidden=true;$("combo").className="combo";$("fbFace").innerHTML=bv(60);
  $("lesson").classList.add("open");$("lesson").setAttribute("aria-hidden","false");
  nextExercise(380);
}
function lessonComplete(){
  const i=L.g,first=i===S.day.done,stars=L.mistakes===0?3:L.mistakes<=2?2:1,earned=L.acorns||0;
  if(first){S.day.done++;S.wood+=1;wkLog().mounds=(wkLog().mounds||0)+1}
  save();renderStats();
  const r=$("result");$("fb").className="fb";$("lFoot").hidden=true;
  sfx.fanfare();burst(140);say("mound_done");
  r.innerHTML=`<span class="dm">${bv(150)}</span><h2>${L.correct===0?"Good try! Mound done!":stars===3?"Perfect! Mound done!":stars===2?"Super job!":"Great work!"}</h2>
    <div class="bigstars">${STAR+STAR+STAR}</div>
    <div class="cards3"><div class="c3 xp"><small>Acorns</small><b>+${earned} 🌰</b></div><div class="c3 tm"><small>Wood</small><b>+${first?1:0} 🪵</b></div><div class="c3 ac"><small>Right</small><b>${L.correct}/${L.total}</b></div></div>
    <button class="btn green" id="resBtn">Continue</button>`;
  r.hidden=false;
  r.querySelectorAll(".bigstars svg").forEach((s,k)=>{if(k<stars)setTimeout(()=>{s.classList.add("on");sfx.count(k*3)},350+k*330)});
  const leave=()=>{closeLesson();L=null;setTimeout(()=>{renderMap();placeBeaver(true);setTimeout(()=>{scrollToCurrent(true);if(S.day.done>=HOLES[landIdx()].length&&!S.day.house)setTimeout(openHouse,900);else checkRealPrizes()},700)},420)};
  let moved=false;const go=()=>{if(!moved){moved=true;leave()}};
  $("resBtn").onclick=()=>{sfx.tap();go()};setTimeout(go,7000);
}
/* the big house: today's sticker, with an animation */
function themeItems(){return (REWARDS[S.reward]||REWARDS.unicorn).items}
function openHouse(){
  if(S.day.house)return;
  const items=themeItems(),e=items[S.stickers.length%items.length];
  S.day.house=true;S.wood+=3;S.stickers.push({e,d:today(),land:landIdx()});save();
  say("house_open");
  reveal(e,"Today's prize!",`A new sticker for your collection, and +3 🪵 wood!`,()=>{renderMap();checkRealPrizes()});
}
function reveal(item,title,text,cb,gift="🎁"){
  const v=document.createElement("div");v.className="reveal";
  v.innerHTML=`<div class="rays"></div><div class="gift" id="rvGift">${gift}</div><div class="item" id="rvItem">${item}</div><h2>${title}</h2><p>${text}</p><button class="btn green" id="rvOk">Yay!</button>`;
  $("phone").appendChild(v);sfx.unlock();
  setTimeout(()=>{$("rvGift").classList.add("open");setTimeout(()=>{$("rvGift").remove();$("rvItem").classList.add("show");v.classList.add("lit");sfx.fanfare();burst(180);setTimeout(()=>burst(120),600)},300)},1500);
  $("rvOk").onclick=()=>{sfx.tap();v.remove();cb&&cb()};
}
function checkRealPrizes(){
  const ready=S.real.find(r=>S.acorns>=r.a&&S.wood>=r.w&&!S.notified.includes(r.id));
  if(!ready)return;
  S.notified.push(ready.id);save();say("bigprize");
  reveal(ready.e,`${ready.name} is ready!`,"You earned it! Go and tell a grown-up 🎉",()=>renderStats(),"🎁");
}

/* ================= prizes page ================= */
function showPrizes(){
  hidePanels();$("pPrizes").hidden=false;$("map").hidden=true;
  const items=S.stickers;
  $("pPrizes").innerHTML=`<button class="back" id="prBack"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>Back</button>
    <div class="prz"><h2>🏆 My prizes</h2><p class="sub" style="margin:0 0 12px">You have ${S.acorns} 🌰 acorns and ${S.wood} 🪵 wood</p>
    <h3>Big prizes</h3>
    ${S.real.map(r=>{const ok=S.acorns>=r.a&&S.wood>=r.w,fa=Math.min(1,S.acorns/r.a),fw=Math.min(1,S.wood/r.w);
      return `<button class="rp ${ok?"ready":""}" data-rp="${r.id}" style="width:100%;text-align:left"><span class="re">${r.e}</span><b>${r.name}${ok?" · Ready! 🎉":""}</b>
        <span><span class="bar a"><i style="width:${fa*100}%"></i></span><small>🌰 ${Math.min(S.acorns,r.a)} / ${r.a}${ok?"":` · ${Math.max(0,r.a-S.acorns)} more`}</small></span>
        <span><span class="bar w"><i style="width:${fw*100}%"></i></span><small>🪵 ${Math.min(S.wood,r.w)} / ${r.w}${ok?"":` · ${Math.max(0,r.w-S.wood)} more`}</small></span></button>`}).join("")}
    <div class="howto">🌰 <b>Acorns</b>: one for every right answer, two when right the first time.<br>🪵 <b>Wood</b>: one for every finished mound, three for opening Domi's big house.</div>
    <h3>My stickers (${items.length})</h3>
    <div class="stk">${items.map((s,k)=>`<button data-st="${k}" aria-label="Sticker">${s.e}</button>`).join("")}${Array.from({length:Math.max(0,10-items.length)},()=>`<button class="empty" disabled>?</button>`).join("")}</div>
    <p class="sub" style="margin-top:10px">A new sticker waits in the big house at the end of every day's path.</p></div>`;
  $("prBack").onclick=()=>{sfx.tap();showMap()};
  $("pPrizes").querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>{const s=S.stickers[+b.dataset.st];reveal(s.e,"My sticker",`Won on ${s.d}`,null,"✨")});
  $("pPrizes").querySelectorAll("[data-rp]").forEach(b=>b.onclick=()=>{const r=S.real.find(x=>x.id===b.dataset.rp),ok=S.acorns>=r.a&&S.wood>=r.w;
    reveal(r.e,r.name,ok?"Ready! Ask a grown-up for your prize 🎉":`${Math.max(0,r.a-S.acorns)} more 🌰 and ${Math.max(0,r.w-S.wood)} more 🪵 to go!`,null,ok?"🎁":"🔒")});
}
function hidePanels(){closePop();closeDrop();$("pPrizes").hidden=true;$("pSettings").hidden=true}
function showMap(){hidePanels();$("map").hidden=false;renderMap();requestAnimationFrame(()=>{placeBeaver(false);scrollToCurrent(false)})}
$("tbPrizes").onclick=()=>{sfx.tap();showPrizes()};
$("tbParents").onclick=()=>{sfx.tap();askParents()};

/* ================= parents ================= */
const dayN=()=>Math.floor(Date.now()/864e5);
__TRY__
function wkLog(){if(!S.wk||S.wk.id!==weekId())S.wk={id:weekId(),q:0,right:0,topics:[],mounds:0,days:[]};if(!S.wk.days.includes(today()))S.wk.days.push(today());return S.wk}
function estimate(r){const perQ=1.7,perDayA=S.perDay*perQ,perDayW=HOLES[landIdx()].length+3;const qa=Math.ceil(Math.max(0,r.a-S.acorns)/perQ),days=Math.max(Math.ceil(Math.max(0,r.a-S.acorns)/perDayA),Math.ceil(Math.max(0,r.w-S.wood)/perDayW));return {qa,days,fromZeroQ:Math.ceil(r.a/perQ),fromZeroD:Math.max(Math.ceil(r.a/perDayA),Math.ceil(r.w/perDayW))}}
function showParents(){
  hidePanels();$("map").hidden=true;$("pSettings").hidden=false;
  const pn=curPlayer().name,w=wkLog(),tp=S.lastTopic||"math",dq=(DINNER[tp]||DINNER.math),names=w.topics.map(t=>(COURSE.find(c=>c.id===t)||{}).name).filter(Boolean);
  const sk=skillFor(S.age,S.diff),ex1=makeProb(sk),ex2=makeProb(sk),n=HOLES[landIdx()].length;
  $("pSettings").innerHTML=`<button class="back" id="closeSettings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>Back</button>
    <div class="ptitle"><span class="pe">👨‍👩‍👧</span><div><h2>Parents</h2><p class="sub" style="margin:0">Settings for ${pn} · switch child from the top-left button</p></div></div>
    <div class="recap"><b>This week with ${pn}</b>
      <div class="rn"><div><b>${w.days.length}</b><span>days played</span></div><div><b>${w.q}</b><span>questions</span></div><div><b>${w.q?Math.round(w.right/w.q*100):0}%</b><span>right</span></div></div>
      <p>📚 Practised: ${names.length?names.join(", "):"nothing yet this week"}</p>
      <p>🏡 Try this week: ${TRY[tp]||TRY.math}</p>
      <p>🍽️ Dinner-table question: “${dq[dayN()%dq.length]}”</p></div>
    <h3>Big prizes</h3>
    <div class="howto"><b>How rewards work.</b> 🌰 Acorns reward <b>effort on each question</b> (1 per right answer, 2 if right the first time). 🪵 Wood rewards <b>finishing</b> (1 per mound, 3 for reaching the big house each day). A big prize needs both, so it takes good answers <i>and</i> showing up each day.</div>
    ${S.real.map((r,k)=>{const e=estimate(r),ok=S.acorns>=r.a&&S.wood>=r.w;return `<div class="prset"><div class="pt"><span class="e">${r.e}</span>${r.name}${ok?` <span style="margin-left:auto;color:var(--leaf-deep)">Ready!</span>`:""}</div>
      <div class="costrow">🌰<button class="stp" data-c="${k}:a:-10">−</button><span>${r.a}</span><button class="stp" data-c="${k}:a:10">+</button>🪵<button class="stp" data-c="${k}:w:-1">−</button><span>${r.w}</span><button class="stp" data-c="${k}:w:1">+</button></div>
      <p class="est">From zero: about ${e.fromZeroQ} right answers and ${e.fromZeroD} days of play. ${ok?"":`Still needed: about ${e.qa} right answers, ${e.days} ${e.days===1?"day":"days"}.`}</p>
      ${ok?`<button class="btn green" data-give="${k}" style="margin-top:8px">We gave the ${r.name.replace(/^A |^New /,"").toLowerCase()} ✓ (uses ${r.a} 🌰 + ${r.w} 🪵)</button>`:""}</div>`}).join("")}
    <h3>Questions per day</h3>
    <div class="chips">${[10,15,20,30].map(q=>`<button class="chip" data-per="${q}" aria-pressed="${S.perDay===q}">${q}</button>`).join("")}</div>
    <p class="sub" style="margin:8px 0 0">Today's path has ${n} mounds, so about ${Math.max(1,Math.round(S.perDay/n))} questions each. Reaching the big house opens a sticker.</p>
    <h3>Course</h3><p class="sub" style="margin:0 0 10px">Each mound takes a topic in turn.</p>
    ${COURSE.map(c=>`<button class="topic ${c.soon?"soon":""}" ${c.soon?"disabled":`data-topic="${c.id}"`} aria-pressed="${!c.soon&&S.topics.includes(c.id)}"><span class="ti2">${c.e}</span><span>${c.name}<small>${c.soon?"Coming soon":c.desc}</small></span><span class="tk">${c.soon?"":S.topics.includes(c.id)?"✅":"⬜"}</span></button>`).join("")}
    <h3>How old is ${pn}?</h3>
    <div class="chips">${[3,4,5,6,7,8,9,10,11,12].map(a=>`<button class="chip" data-age="${a}" aria-pressed="${S.age===a}">${a}</button>`).join("")}</div>
    <h3>Level</h3>
    <div class="chips">${[["Easy",0],["Medium",1],["Hard",2]].map(([nm,d])=>`<button class="chip" data-diff="${d}" aria-pressed="${S.diff===d}">${nm}</button>`).join("")}</div>
    <div class="sample">Math will look like: <b>${expr(ex1)} = ${ex1.ans}</b> · <b>${expr(ex2)} = ${ex2.ans}</b></div>
    <h3>Map of the month</h3><p class="sub" style="margin:0 0 8px">Each month has its own land. Pick one to preview it.</p>
    <div class="months"><button class="chip" data-mon="auto" aria-pressed="${S.mapMonth==="auto"}">Auto</button>${MONTHS.map((m,k)=>`<button class="chip" data-mon="${k}" aria-pressed="${S.mapMonth===String(k)}">${m.slice(0,3)}</button>`).join("")}</div>
    <h3>Sticker theme</h3>
    <div class="themes">${Object.entries(REWARDS).map(([k,r])=>`<button class="theme" data-rw="${k}" aria-pressed="${S.reward===k}">${r.e}<small>${r.name}</small></button>`).join("")}</div>
    <h3>Sounds and answers</h3>
    <div class="setting"><span>Narrator voice<small>Domi speaks Farsi; words on screen are English</small></span><button class="switch" id="swVoice" role="switch" aria-checked="${S.voice}" aria-label="Narrator voice"></button></div>
    <div class="setting"><span>Game sounds<small>Chimes, pops and fanfares</small></span><button class="switch" id="swFx" role="switch" aria-checked="${S.fx}" aria-label="Game sounds"></button></div>
    <div style="height:18px"></div>
    <button class="btn danger" id="btnReset">Start ${pn} over</button>
    <div id="resetConfirm" hidden style="margin-top:14px;display:grid;gap:12px">
      <p class="sub" style="margin:0;font-weight:900;color:var(--berry-deep)">This clears acorns, wood, stickers and today's path for ${pn}. Are you sure?</p>
      <button class="btn red" id="btnResetYes">Yes, clear it</button><button class="btn ghost" id="btnResetNo">No, keep it</button></div>`;
  const P$=q=>$("pSettings").querySelectorAll(q);
  const keep=fn=>{const y=$("pSettings").scrollTop;fn();save();sfx.tap();showParents();$("pSettings").scrollTop=y};
  $("closeSettings").onclick=()=>{sfx.tap();showMap();if(S.ageUp)setTimeout(ageUpCeremony,500)};
  P$("[data-c]").forEach(b=>b.onclick=()=>keep(()=>{const [k,f,d]=b.dataset.c.split(":");const r=S.real[+k];r[f]=Math.max(f==="a"?10:1,r[f]+ +d);S.notified=S.notified.filter(x=>x!==r.id)}));
  P$("[data-give]").forEach(b=>b.onclick=()=>keep(()=>{const r=S.real[+b.dataset.give];S.acorns-=r.a;S.wood-=r.w;S.notified=S.notified.filter(x=>x!==r.id);toast(`${r.e} Enjoy the prize!`)}));
  P$("[data-topic]").forEach(b=>b.onclick=()=>keep(()=>{const id=b.dataset.topic,on=S.topics.includes(id);if(on&&activeTopics().length===1){toast("Keep at least one topic");return}S.topics=on?S.topics.filter(x=>x!==id):[...S.topics,id]}));
  P$("[data-age]").forEach(b=>b.onclick=()=>keep(()=>{const old=S.age;S.age=+b.dataset.age;S.ageUp=S.age>old?S.age:0}));
  P$("[data-diff]").forEach(b=>b.onclick=()=>keep(()=>{S.diff=+b.dataset.diff}));
  P$("[data-per]").forEach(b=>b.onclick=()=>keep(()=>{S.perDay=+b.dataset.per}));
  P$("[data-mon]").forEach(b=>b.onclick=()=>keep(()=>{S.mapMonth=b.dataset.mon;landEl=null}));
  P$("[data-rw]").forEach(b=>b.onclick=()=>keep(()=>{S.reward=b.dataset.rw}));
  [["swVoice","voice"],["swFx","fx"]].forEach(([id,key])=>$(id).onclick=()=>{S[key]=!S[key];$(id).setAttribute("aria-checked",S[key]);save();sfx.tap();if(!S.voice&&voice)voice.pause()});
  $("btnReset").onclick=()=>{$("resetConfirm").hidden=false;$("btnReset").hidden=true};
  $("btnResetNo").onclick=()=>{$("resetConfirm").hidden=true;$("btnReset").hidden=false};
  $("btnResetYes").onclick=()=>{const k={voice:S.voice,fx:S.fx,age:S.age,diff:S.diff,perDay:S.perDay,reward:S.reward,topics:S.topics,real:S.real};S=Object.assign(fresh(),k);S.seen=true;save();landEl=null;showMap()};
}

/* ================= players ================= */
let dropKind=null;
function closeDrop(){dropKind=null;$("drop").classList.remove("show");$("dim").classList.remove("show");$("tbCourse").setAttribute("aria-expanded","false")}
function openDrop(){
  if(dropKind)return closeDrop();dropKind="player";sfx.tap();
  $("drop").innerHTML=`<p class="dh">Players</p><div class="courses">`+P.list.map(p=>{const st=p.id===P.cur?S:peek(p.id);
    return `<button class="crs ${p.id===P.cur?"on":""}" data-pl="${p.id}"><span class="ci" style="background:${p.color}">${p.name.trim()[0].toUpperCase()}</span><span style="flex:1;min-width:0">${p.name}<small>🌰 ${st.acorns||0} · 🪵 ${st.wood||0} · stickers ${(st.stickers||[]).length}</small></span>${p.id===P.cur?"✓":""}</button>`}).join("")+`</div>
    <div class="addpl"><input id="plName" maxlength="16" placeholder="New player's name" aria-label="New player's name"><button class="btn green" id="plAdd">Add</button></div>`;
  $("drop").classList.add("show");$("dim").classList.add("show");$("tbCourse").setAttribute("aria-expanded","true");
  $("drop").querySelectorAll("[data-pl]").forEach(b=>b.onclick=()=>{if(b.dataset.pl!==P.cur)switchPlayer(b.dataset.pl)});
  $("plAdd").onclick=()=>{const n=$("plName").value.trim();if(!n){$("plName").focus();return}
    const id="p"+Date.now();P.list.push({id,name:n,color:PCOLORS[P.list.length%PCOLORS.length]});savePlayers();
    try{const st=fresh();st.seen=true;localStorage.setItem(keyFor(id),JSON.stringify(st))}catch(e){}
    switchPlayer(id)};
}
$("dim").onclick=closeDrop;
$("tbCourse").onclick=()=>openDrop();
function switchPlayer(id){save();P.cur=id;savePlayers();loadState();save();closeDrop();landEl=null;showMap();sfx.fanfare();toast(`Hi, ${curPlayer().name}! 👋`)}
'''

start = r'''
/* ================= start: Domi tells what month or event it is ================= */
const clk=()=>{const d=new Date();$("clock").textContent=d.getHours()+":"+String(d.getMinutes()).padStart(2,"0")};clk();setInterval(clk,30000);
dayPlan();showMap();
(function intro(){
  const ev=eventNow(),z=landIdx(),Z=ZONES[z];
  $("inMonth").textContent=MONTHS[monthIdx()]+(ev?" · "+ev.name+" "+ev.e:"");$("inLand").textContent=`${Z.o} ${Z.name}`;
  const n=HOLES[z].length,left=n-S.day.done;
  $("inText").textContent=S.day.house?"You opened today's prize! You can still look around, or come back tomorrow for a new path.":`A prize is waiting in Domi's big house by the dam. ${left} ${left===1?"mound":"mounds"} to go. Are you ready?`;
  let spoke=false;const speak=()=>{if(spoke)return;spoke=true;const first=ev?ev.clip:"z"+Z.a;say(first,()=>say("intro_prize"))};
  setTimeout(speak,500);
  $("introC").addEventListener("pointerdown",()=>{if(!voice||voice.paused){spoke=false;speak()}},{once:true});
  const go=(start)=>{if(voice){voice.onended=null;voice.pause();voice=null}$("introC").classList.add("gone");setTimeout(()=>$("introC").hidden=true,420);S.seen=true;save();
    showMap();if(start){const n2=HOLES[landIdx()].length;setTimeout(()=>{if(S.day.done<n2)showPop(S.day.done)},700)}};
  $("inGo").onclick=e=>{e.stopPropagation();sfx.tap();go(true)};
  $("inSkip").onclick=e=>{e.stopPropagation();sfx.tap();go(false)};
})();
})();
'''

import os
clips=sorted(f[:-4] for f in os.listdir(os.path.join(os.path.dirname(OUT),'audio')) if f.endswith('.mp3'))
shell = shell.replace('__CLIPS__', json.dumps(clips)).replace('__WQ__', wq).replace('__TRY__', TRY)
script_new = A + '\n' + shell + '\n/* ================= lesson engine ================= */\n' + B + C + '$("lClose").onclick=()=>{sfx.tap();closeLesson();L=null};\n' + D + E1 + E2 + F + start
script_new = script_new.replace('function closeLesson(){', 'function closeLesson(){', 1)

head = s[:s.index('<style>')]
head = head.replace('<title>Paraxilingo B</title>', '<title>Paraxilingo C</title>')
out = head + '<style>' + css + '</style>\n' + markup + '\n<script>' + script_new + '</script>\n'
open(OUT, 'w').write(out)
print("ok", len(out))
