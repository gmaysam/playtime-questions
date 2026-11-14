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
 {id:"shapes",e:"🔷",name:"Shapes & colours",desc:"Shapes, colours, patterns, bigger or smaller"},
 {id:"people",e:"🧑‍🚒",name:"Jobs & feelings",desc:"Find the job, how does this child feel?"},
 {id:"flags",e:"🗺️",name:"Geography",desc:"Continents, oceans and countries on the world map, and flags"},
 {id:"robot",e:"🤖",name:"Robots",desc:"Help the robot reach the flag: first steps in coding"},
 {id:"memory",e:"🧠",name:"Concentration",desc:"Simon colours, piano notes, memory pairs"},
 {id:"words",e:"🔤",name:"Letters & words",desc:"ABC, first letter, English words"},
 {id:"reading",e:"📖",name:"Read it!",desc:"Sight words and short sentences (age 5+)"},
 {id:"feel",e:"😊",name:"Feelings & Friends",soon:true},''')
A = rep(A, 'perDay:20,', 'perDay:28,')
A = rep(A, 'function say(name,onEnd,rate=1){', 'function say(name,onEnd,rate=.92){')
A = rep(A, 'voice=a;a.playbackRate=rate;', 'voice=a;a.playbackRate=rate;try{a.preservesPitch=true;a.webkitPreservesPitch=true}catch(e){}')
A = rep(A, ' {id:"money",e:"🪙",name:"Money Market",desc:"Coins, their values, counting money, change from $1"},\n', '')
A = rep(A, 'ansLang:"",topics:["math","clock","money"],topicsV2:1});',
 'ansLang:"",topics:["math","clock","money","watcher","shapes","people","words","reading","radio","paint"],topicsV2:1,topicsV3:1,topicsV4:1,topicsV5:1,topicsV6:1,paintings:[],acorns:0,wood:0,day:{d:"",done:0,house:false,plan:null},stickers:[],seenW:[],real:null,notified:[],mapMonth:"auto",questions:0});')
A = rep(A, 'if(!S.topicsV2){S.topics=[...new Set([...(S.topics||[]),"math","clock","money"])];S.topicsV2=1}',
 'if(!S.topicsV2){S.topics=[...new Set([...(S.topics||[]),"math","clock","money"])];S.topicsV2=1}if(!S.topicsV3){S.topics=[...new Set([...S.topics,"watcher","radio"])];S.topicsV3=1}if(!S.topicsV4){S.topics=[...new Set([...S.topics,"paint"])];S.topicsV4=1}if(!S.topicsV5){S.topics=[...new Set([...S.topics,"shapes","people"])];S.topicsV5=1}if(!S.topicsV6){S.topics=[...new Set([...S.topics,"words","reading"])];S.topicsV6=1}if(!S.paintings)S.paintings=[];if(!S.real)S.real=defaultReal();if(![28,35,42,49].includes(S.perDay))S.perDay=28;S.topics=(S.topics||[]).filter(t=>t!=="paint");if(S.age>10){S.age=10;S.diff=2}if(!S.topicsV7){S.topics=[...new Set([...S.topics,"flags","robot","memory"])];S.topicsV7=1}if(!S.realV){if((S.real||[]).map(r=>r.id).join()==="book,clothes,toy")S.real=[];S.realV=1}if(!S.sk)S.sk={}')
A = rep(A, 'const save=()=>{', '''function defaultReal(){return []}
const save=()=>{''')
A = rep(A, 'const a=new Audio("audio/"+(S.lang==="fr"&&!/^(en|rep)\\d/.test(name)?"fr/":"")+name+".mp3");', 'const a=new Audio("audio/"+name+".mp3");')

# ---- B: new question engine ----
import os
PIC_E=re.search(r'const PIC_E=(\{.*?\});',open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'buildC.py')).read()).group(1)
WORD_E=re.search(r'const WORD_E=(\{.*?\});',open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'buildC.py')).read()).group(1)
import os
VOICED=sorted(set(f.split('_')[0] for f in os.listdir(os.path.join(os.path.dirname(OUT),'audio','w')) if f.endswith('_q_lulu.mp3')))
EVOICED=sorted(set(f.split('_')[0] for f in os.listdir(os.path.join(os.path.dirname(OUT),'audio','w')) if f.endswith('_e_lulu.mp3')))
# Paraxilingo's own dinosaur questions are now in the pool as d01-d06 (no separate merge)
SDIR=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FA_SAY=json.load(open(os.path.join(SDIR,'tools','fa_have.json')));EN_SAY=json.load(open(os.path.join(SDIR,'tools','en_have.json')));EN_SAY.update(json.load(open(os.path.join(SDIR,'fa_new','en_new.json'))));FA_SAY.update(json.load(open(os.path.join(SDIR,'fa_new','fa_new2.json'))));FA_SAY.update(json.load(open(os.path.join(SDIR,'fa_new','fa_new.json'))))

for _f,_d in (('fa_new3.json','FA'),('en_new2.json','EN')):
    _p=os.path.join(SDIR,'fa_new',_f)
    if os.path.exists(_p):
        for _w,_c in json.load(open(_p)).items():
            if os.path.exists(os.path.join(SDIR,'fa_new','out',_c+'.mp3')):(FA_SAY if _d=='FA' else EN_SAY)[_w]=_c
B=open(os.path.join(os.path.dirname(__file__),'qengine.js')).read().replace('__STORIES__',open(os.path.join(SDIR,'watcher','stories.json')).read()).replace('__FA_SAY__',json.dumps(FA_SAY)).replace('__EVOICED__',json.dumps(EVOICED)).replace('__EN_SAY__',json.dumps(EN_SAY)).replace('__POOL__',open(os.path.join(SDIR,'watcher','pool.json')).read()).replace('__WQ__',wq).replace('__VOICED__',json.dumps(VOICED)).replace('__PIC_E__',PIC_E).replace('__WORD_E__',WORD_E)+open(os.path.join(os.path.dirname(__file__),'games.js')).read().replace('__FACTV__',json.dumps({t:c for t,c in json.load(open(os.path.join(os.path.dirname(__file__),'fact_voice.json'))).items() if os.path.exists('appC/audio/w/'+c+'.mp3')},ensure_ascii=False))+open(os.path.join(os.path.dirname(__file__),'games2.js')).read().replace('__GVOICE__','true' if os.path.exists('appC/audio/w/PX_G_SPY.mp3') else 'false').replace('__SK2VOICE__','true' if os.path.exists('appC/audio/w/PX_SK2_Q_k19.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'games3.js')).read().replace('__G3VOICE__','true' if os.path.exists('appC/audio/w/PX_G3_PUZZLE.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'learn.js')).read().replace('__LRNVOICE__','true' if os.path.exists('appC/audio/w/PX_LRN_COUNT.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'toddler.js')).read().replace('__TDVOICE__','true' if os.path.exists('appC/audio/w/PX_TD_PEEK.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'geo.js')).read().replace('__GEOMAP__',open(os.path.join(os.path.dirname(__file__),'geo_map.json')).read()).replace('__GEOVOICE__','true' if os.path.exists('appC/audio/w/PX_GEO_Q_FIND.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'pillars.js')).read()+open(os.path.join(os.path.dirname(__file__),'games4.js')).read().replace('__G4VOICE__','true' if os.path.exists('appC/audio/w/PX_G4_PDET.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'games5.js')).read().replace('__G5VOICE__','true' if os.path.exists('appC/audio/w/PX_G5_SPELL.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'games6.js')).read().replace('__G6VOICE__','true' if os.path.exists('appC/audio/w/PX_G6_MIX.mp3') else 'false').replace('__SWL__',json.dumps(sorted(f[6:-4] for f in os.listdir('appC/audio/w') if f.startswith('PX_SW_')))).replace('__RCL__',json.dumps(sorted(f[6:-4] for f in os.listdir('appC/audio/w') if f.startswith('PX_RC_'))))+open(os.path.join(os.path.dirname(__file__),'games7.js')).read().replace('__G7VOICE__','true' if os.path.exists('appC/audio/w/PX_G7_GARDEN.mp3') else 'false').replace('__MQVOICE__','true' if os.path.exists('appC/audio/w/PX_MQ_PLUSWHAT.mp3') else 'false').replace('__AFVOICE__','true' if os.path.exists('appC/audio/w/PX_AF_Q_WHERE.mp3') else 'false').replace('__V15VOICE__','true' if os.path.exists('appC/audio/w/PX_MQ2_DIV.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'games8.js')).read().replace('__G8VOICE__','true' if os.path.exists('appC/audio/w/PX_G8_ANG_Q.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'games9.js')).read()+open(os.path.join(os.path.dirname(__file__),'games10.js')).read().replace('__G10VOICE__','true' if os.path.exists('appC/audio/w/PX_G10_SAY_Q.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'games11.js')).read().replace('__G11VOICE__','true' if os.path.exists('appC/audio/w/PX_G11_ROCKET.mp3') else 'false')+open(os.path.join(os.path.dirname(__file__),'e3.js')).read().replace('__E3MAP__',json.dumps({k:v for k,v in json.load(open(os.path.join(os.path.dirname(__file__),'e3map.json'))).items() if os.path.exists('appC/img/e3/'+v+'.webp')},ensure_ascii=False))+open(os.path.join(os.path.dirname(__file__),'fit.js')).read()
C=''

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

css += open(os.path.join(os.path.dirname(__file__),'qengine.css')).read()

markup = '''
<div class="stage">
<div class="phone" id="phone">
  <div class="island" aria-hidden="true"></div>
  <div class="statusbar" aria-hidden="true"><span id="clock">9:41</span><span></span></div>

  <header class="topbar">
    <button class="course" id="tbCourse" aria-label="Players" aria-expanded="false"></button>
    <div class="stats">
      <span class="stat flame" id="sWood" aria-label="Wood" hidden style="display:none"><i class="emo" style="font-style:normal">🪵</i><span>0</span></span>
      <span class="stat gem" id="sAcorns" aria-label="Acorns"><i class="emo" style="font-style:normal">🌰</i><span>0</span></span>
    </div>
    <button class="tbtn" id="tbPrizes" aria-label="My prizes">🏆<span class="dotn" id="prDot" hidden>!</span></button>
    <button class="tbtn" id="tbParents" aria-label="Parents">👨‍👩‍👧</button>
  </header>
  <div class="dim" id="dim"></div>
  <div class="drop" id="drop" role="dialog"></div>

  <main class="map" id="map" aria-label="Today's path">
    <div class="journey" id="journey"></div>
  </main>

  <section class="panel" id="pPrizes" hidden></section>
  <section class="panel" id="pSettings" hidden></section>

  <section class="lesson over q2" id="lesson" aria-hidden="true">
    <div class="lhead">
      <button class="lclose" id="lClose" aria-label="Back to the map"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <div class="qdots" id="qDots" aria-hidden="true"></div><span style="width:40px"></span>
    </div>
    <div class="qbody" id="qBody"></div>
    <div class="qsheet" id="qSheet"></div>
    <div class="qresult" id="qResult" hidden></div>
  </section>

  <div class="modal" id="modal"><div class="card" id="mCard"></div></div>
  <div class="toast" id="toast"></div>

  <div class="introC" id="introC">
    <img class="talk" src="img/domi_1.svg" alt="Domi the beaver">
    <div class="inev" id="inEv"></div>
  </div>

  <canvas class="fx" id="fx"></canvas>
</div>
</div>
'''

shell = r'''
/* ================= months and events ================= */
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_LAND=[7,5,4,6,11,8,9,1,2,10,0,3]; /* which land of the big picture each month uses */
function eventNow(d=new Date()){
  const m=d.getMonth()+1,day=d.getDate(),thx=(()=>{const f=new Date(d.getFullYear(),10,1).getDay();return 1+((4-f+7)%7)+21})();
  if(m===12&&day>=7&&day<=21)return {id:"yalda",e:"🍉",name:"Yalda Night",deco:["🍉","🍎","🕯️"],clip:"w/LULU_EV_YALDA"};
  if(m===12&&day>=22&&day<=25)return {id:"christmas",e:"🎄",name:"Christmas",deco:["🎄","⭐","🎁"],clip:"w/LULU_EV_CHRISTMAS"};
  if(m===3&&day>=5&&day<=20)return {id:"nowruz",e:"🌸",name:"Nowruz",deco:["🌸","🐟","🌱"],clip:"w/LULU_EV_NOWRUZ"};
  if(m===2&&day>=7&&day<=14)return {id:"valentine",e:"💝",name:"Valentine's Day",deco:["💝","🌹","💌"],clip:"w/LULU_EV_VALENTINE"};
  if(m===11&&day>=thx-7&&day<=thx)return {id:"thanks",e:"🦃",name:"Thanksgiving",deco:["🦃","🥧","🍂"],clip:"w/LULU_EV_THANKSGIVING"};
  if(m===10&&day>=17)return {id:"halloween",e:"🎃",name:"Halloween",deco:["🎃","🦇","🍬"],clip:"w/LULU_EV_HALLOWEEN"};
  return null;
}
const monthIdx=()=>S.mapMonth==="auto"?new Date().getMonth():+S.mapMonth;
const landIdx=()=>MONTH_LAND[monthIdx()];
const TOPIC_SYM={flags:"🗺️",robot:"🤖",memory:"🧠",math:"➕",clock:"🕒",watcher:"🔎",shapes:"🔷",people:"🚩",words:"🔤",reading:"📖",radio:"📻",paint:"🎨"};

/* ================= today's path: the parents' daily questions split over the mounds ================= */
/* sections that need an older child: flags and countries from 5, reading from 5, clock from 4 */
const TOPIC_MINAGE={flags:5,reading:5,clock:4};
const activeTopics=()=>{const t=S.topics.filter(t=>TOPIC_SYM[t]&&(S.age||6)>=(TOPIC_MINAGE[t]||0));return t.length?t:["math","shapes"]};
const activeCats=()=>CATS.filter(c=>activeTopics().includes(c.topic));
function dayPlan(){
  if(S.day.d!==today()||!S.day.plan||S.day.v!==5||S.day.land!==landIdx()||S.day.per!==S.perDay||S.day.tops!==activeTopics().join()){
    const n=HOLES[landIdx()].length,cats=activeCats(),hasStory=cats.some(c=>c.id==="story")&&n>2,hasPaint=cats.some(c=>c.id==="paint")&&n>3;
    let rest=cats.filter(c=>c.id!=="story"&&c.id!=="paint").map(c=>c.id);if(!rest.length)rest=["count"];
    const off=dayN()%rest.length;rest=[...rest.slice(off),...rest.slice(0,off)];
    {const fav=["memory","robot"].filter(x=>rest.includes(x)),m0=n-(hasStory?1:0)-(hasPaint?1:0);if(fav.length&&!rest.slice(0,m0).some(x=>fav.includes(x))){const f=fav[dayN()%fav.length];rest=rest.filter(x=>x!==f);rest.splice(1,0,f)}}
    const sk=hasStory?Math.floor(n/2):-1,pk=hasPaint?n-1:-1,Q=Math.max(n,S.perDay)-(hasStory?3:0),m=n-(hasStory?1:0)-(hasPaint?1:0),base=Math.floor(Q/m),rem=Q%m;let j=0,r=0;
    const plan=Array.from({length:n},(x,i)=>i===sk?{cat:"story",count:3,story:dayN()%STORIES.length}:i===pk?{cat:"paint",count:0,page:dayN()%PAGES.length}:{cat:rest[(j++)%rest.length],count:Math.max(1,base+(r++<rem?1:0))});
    const keep=S.day.d===today()&&S.day.land===landIdx();
    S.day={d:today(),done:keep?Math.min(S.day.done,n):0,house:keep?S.day.house:false,plan,land:landIdx(),per:S.perDay,tops:activeTopics().join(),v:5};save();
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

  holeEls.forEach((b,i)=>{
    const p=plan[i],st=i<done?"done":i===done?"current":"future";b.style.setProperty("--dc",Z.c);
    const sym=catById(p.cat).e;
    if(st==="current"){b.className="hole current";b.innerHTML=`<span class="cic">${sym}</span><span class="tip">${i===0?"START":"GO!"}</span>`}
    else{b.className="hole sg "+st;b.innerHTML=`<span class="sym">${sym}</span>`+(st==="done"?`<span class="ok">✓</span>`:"")}
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
  const g=goalPick();$("tbPrizes").innerHTML=(g?`<span class="tbg" style="--f:${Math.round(goalPct(g)*360)}deg">${pzI(g,"sm")}</span>`:"🏆")+`<span class="dotn" id="prDot" hidden>!</span>`;
  $("tbPrizes").classList.toggle("hasg",!!g);
  $("prDot").hidden=!S.real.some(r=>S.acorns>=r.a&&S.wood>=r.w);
}
/* the parents' optional prize: a photo of the toy, and how close the child is */
const pzI=(r,c="")=>r.img?`<img class="pzimg ${c}" src="${r.img}" alt="">`:`<span class="pze ${c}">${r.e||"🎁"}</span>`;
const goalPct=r=>Math.min(1,S.acorns/r.a);
function goalPick(){const R=S.real||[];if(!R.length)return null;const nr=R.filter(r=>!(S.acorns>=r.a&&S.wood>=r.w));return (nr.length?nr:R).slice().sort((x,y)=>goalPct(y)-goalPct(x))[0]}
function goalCard(){const r=goalPick();if(!r)return "";const ok=S.acorns>=r.a&&S.wood>=r.w,fa=Math.min(1,S.acorns/r.a),fw=Math.min(1,S.wood/r.w),ma=Math.max(0,r.a-S.acorns),mw=Math.max(0,r.w-S.wood),close=!ok&&goalPct(r)>=.85;
  return `<div class="goalc ${ok?"ok":close?"close":""}"><span class="gpic">${pzI(r)}</span><div class="gtx"><b>${ok?"Your prize is ready! 🎉":close?"Almost there! ✨":"Your prize: "+r.name}</b>
    <span class="gbar a"><i style="width:${fa*100}%"></i></span><small>🌰 ${Math.min(S.acorns,r.a)} / ${r.a}${ma?` · ${ma} more`:" ✓"}</small></div></div>`}
function pzLoad(file,cb){const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const m=360,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);
  c.getContext("2d").drawImage(im,0,0,c.width,c.height);cb(c.toDataURL("image/jpeg",.8))};im.onerror=()=>toast("Could not open that picture");im.src=fr.result};fr.readAsDataURL(file)}
function bump(id){const e=$(id);if(!e)return;e.classList.remove("bump");void e.offsetWidth;e.classList.add("bump")}

/* mound pop-up */
let popEl=null;
function closePop(){if(popEl){popEl.remove();popEl=null}}
function showPop(i){
  closePop();sfx.tap();
  const plan=dayPlan(),p=plan[i],done=S.day.done,c=catById(p.cat),pt=moundXY(i),W=250,left=Math.max(12,Math.min(journey.offsetWidth-W-12,pt.x-W/2));
  popEl=document.createElement("div");popEl.className="pop";popEl.style.left=left+"px";popEl.style.top=(pt.y-landEl.offsetTop+20)+"px";popEl.style.setProperty("--ax",(pt.x-left)+"px");
  popEl.style.setProperty("--pc",i<done?"#9AA0A8":i===done?ZONES[landIdx()].c:"#AFAFBA");
  const cnt=p.cat==="story"?"a story + 3 questions":p.cat==="paint"?"colour a picture":`${p.count} ${p.count===1?"question":"questions"}`;
  popEl.innerHTML=i===done?`<h4>${c.e} ${c.name}</h4><p>${cnt}</p><button class="btn">Let's go!</button>`
    :i<done?`<h4>✅ Done!</h4><p>You finished this mound today.</p>`:`<h4>${c.e} ${c.name}</h4><p>Coming up: ${cnt}</p>`;
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

/* the big house: today's sticker, with an animation */
function themeItems(){return (REWARDS[S.reward]||REWARDS.unicorn).items}
function openHouse(){
  if(S.day.house)return;
  const items=themeItems(),e=items[S.stickers.length%items.length];
  S.day.house=true;S.acorns+=5;S.stickers.push({e,d:today(),land:landIdx()});save();
  say("w/LULU_BD_PRIZE_IS");
  const rv=reveal(e,"Today's prize!",`A new sticker for your collection, and +5 🌰 acorns!`,()=>{renderMap();checkRealPrizes()});
  const gc=goalCard();if(gc)rv.querySelector("p").insertAdjacentHTML("afterend",gc);
}
function reveal(item,title,text,cb,gift="🎁"){
  const v=document.createElement("div");v.className="reveal";
  v.innerHTML=`<div class="rays"></div><div class="gift" id="rvGift">${gift}</div><div class="item" id="rvItem">${item}</div><h2>${title}</h2><p>${text}</p><button class="btn green" id="rvOk">Yay!</button>`;
  $("phone").appendChild(v);sfx.unlock();
  setTimeout(()=>{$("rvGift").classList.add("open");setTimeout(()=>{$("rvGift").remove();$("rvItem").classList.add("show");v.classList.add("lit");sfx.fanfare();burst(180);setTimeout(()=>burst(120),600)},300)},1500);
  $("rvOk").onclick=()=>{sfx.tap();v.remove();cb&&cb()};
  return v;
}
function checkRealPrizes(){
  const ready=S.real.find(r=>S.acorns>=r.a&&S.wood>=r.w&&!S.notified.includes(r.id));
  if(!ready)return;
  S.notified.push(ready.id);save();say("w/LULU_PRIZE_SHORT");
  reveal(pzI(ready,"big"),`${ready.name} is ready!`,"You earned it! Go and tell a grown-up 🎉",()=>renderStats(),"🎁");
}

/* ================= prizes page ================= */
function showPrizes(){
  hidePanels();$("pPrizes").hidden=false;$("map").hidden=true;
  const items=S.stickers;
  const jar=(have,need,kind)=>{const f=Math.min(1,have/need),left=Math.max(0,need-have);return `<div class="jar ${kind}${f>=1?" full":""}"><div class="jar-g"><i class="jar-f" style="height:${Math.round(f*100)}%"></i><span class="jar-e">${kind==="a"?"🌰":"🪵"}</span></div>
    <b class="jar-n">${f>=1?"✓":left}</b><small>${f>=1?"full!":"more"}</small></div>`};
  $("pPrizes").innerHTML=`<button class="back" id="prBack"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>Back</button>
    <div class="prz prz2"><div class="pz-hero"><span class="pz-chest">🧰</span><h2>My treasure</h2>
      <div class="pz-cnt"><span class="pzc a"><i>🌰</i><b>${S.acorns}</b></span><span class="pzc s"><i>🦄</i><b>${items.length}</b></span></div></div>
    ${S.real.length?`<h3 class="pz-h">🎁 My big prizes</h3>`:`<div class="pz-none"><span>🎁</span><b>No big prize yet</b><small>Ask a grown-up to add one in the parents' corner 👨‍👩‍👧</small></div>`}
    ${S.real.map(r=>{const ok=S.acorns>=r.a&&S.wood>=r.w,f=Math.min(1,S.acorns/r.a);
      return `<button class="pz-card ${ok?"ready":""}" data-rp="${r.id}"><span class="pz-ph">${pzI(r)}${ok?`<span class="pz-burst">🎉</span>`:""}</span>
        <b class="pz-name">${r.name}</b>${ok?`<span class="pz-ready">Ready! Go and tell a grown-up 🎉</span>`:`<span class="pz-road"><i style="width:${Math.round(f*100)}%"></i><span class="pz-walker" style="left:${Math.round(f*100)}%">🦫</span><span class="pz-goal">🎁</span></span>`}
        <span class="pz-jars">${jar(S.acorns,r.a,"a")}</span></button>`}).join("")}
    <div class="pz-how"><span><b>🌰</b>right answer</span><span><b>🌰🌰</b>finished mound</span><span><b>🦄</b>Domi's house</span></div>
    <h3 class="pz-h">🦄 My sticker book</h3>
    <div class="pz-book">${items.map((s,k)=>`<button data-st="${k}" aria-label="Sticker" style="--r:${((k*37)%17)-8}deg">${s.e}</button>`).join("")}${Array.from({length:Math.max(0,12-items.length)},()=>`<button class="empty" disabled>✨</button>`).join("")}</div>
    ${S.paintings.length?`<h3 class="pz-h">🎨 My paintings</h3><div class="pz-gal">${S.paintings.slice().reverse().map(pp=>`<span class="pz-frame">${paintSVG(pp.p,pp.f)}</span>`).join("")}</div>`:""}</div>`;
  $("prBack").onclick=()=>{sfx.tap();showMap()};
  $("pPrizes").querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>{const s=S.stickers[+b.dataset.st];reveal(s.e,"My sticker",`Won on ${s.d}`,null,"✨")});
  $("pPrizes").querySelectorAll("[data-rp]").forEach(b=>b.onclick=()=>{const r=S.real.find(x=>x.id===b.dataset.rp),ok=S.acorns>=r.a&&S.wood>=r.w;
    reveal(pzI(r,"big"),r.name,ok?"Ready! Ask a grown-up for your prize 🎉":`${Math.max(0,r.a-S.acorns)} more 🌰 to go!`,null,ok?"🎁":"🔒")});
}
function hidePanels(){closePop();closeDrop();$("pPrizes").hidden=true;$("pSettings").hidden=true}
function showMap(){hidePanels();$("map").hidden=false;renderMap();requestAnimationFrame(()=>{placeBeaver(false);scrollToCurrent(false)})}
$("tbPrizes").onclick=()=>{sfx.tap();showPrizes()};
$("tbParents").onclick=()=>{sfx.tap();askParents()};

/* ================= parents ================= */
const dayN=()=>Math.floor(Date.now()/864e5);
__TRY__
function wkLog(){if(!S.wk||S.wk.id!==weekId())S.wk={id:weekId(),q:0,right:0,topics:[],mounds:0,days:[]};if(!S.wk.days.includes(today()))S.wk.days.push(today());return S.wk}
function estimate(r){const perQ=1.7,perDayA=S.perDay*perQ+HOLES[landIdx()].length*2+5,perDayW=HOLES[landIdx()].length+3;const qa=Math.ceil(Math.max(0,r.a-S.acorns)/perQ),days=Math.max(Math.ceil(Math.max(0,r.a-S.acorns)/perDayA),0);return {qa,days,fromZeroQ:Math.ceil(r.a/perQ),fromZeroD:Math.max(Math.ceil(r.a/perDayA),Math.ceil(r.w/perDayW))}}
function showParents(){
  hidePanels();$("map").hidden=true;$("pSettings").hidden=false;
  const pn=curPlayer().name,w=wkLog(),tp=S.lastTopic||"math",dq=(DINNER[tp]||DINNER.math),names=w.topics.map(t=>(COURSE.find(c=>c.id===t)||{}).name).filter(Boolean);
  const sk=skillFor(S.age,S.diff),ex1=makeProb(sk),ex2=makeProb(sk),n=HOLES[landIdx()].length;
  const SHORT={flags:"Geography",robot:"Robots",memory:"Focus",people:"Jobs",math:"Numbers",clock:"Clock",watcher:"World",shapes:"Shapes",words:"Letters",reading:"Read",radio:"Radio",paint:"Paint"},pct=w.q?Math.round(w.right/w.q*100):0;
  const ring=(v,max,c,ic)=>{const f=Math.min(1,v/max);return `<span class="pring" style="--f:${f*360}deg;--c:${c}"><i>${ic}</i></span><small class="pnum">${Math.min(v,max)}/${max}</small>`};
  const sec=(e,t)=>`<div class="psec"><span>${e}</span>${t}</div>`;
  $("pSettings").innerHTML=`<button class="back" id="closeSettings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>Back</button>
    ${dashHTML(pn)}
    ${sec("💬","Talk about it at home")}
    <div class="ptalk"><div>🏡 ${TRY[tp]||TRY.math}</div><div>🍽️ “${dq[dayN()%dq.length]}”</div></div>
    <h2 class="psettings">⚙️ Settings</h2>
    ${sec("🎁","Prize (optional)")}
    <p class="pnote">Optional: a toy with a 🌰 price that ${pn} works towards.</p>
    ${S.real.length?`<div class="plegend"><span>🌰 = right answers, finished mounds and Domi's house</span></div>`:""}
    ${S.real.map((r,k)=>{const e=estimate(r),ok=S.acorns>=r.a&&S.wood>=r.w;return `<div class="pprize ${ok?"ok":""}">
      <label class="ppe" title="Change photo">${pzI(r)}<input type="file" accept="image/*" data-pic="${k}" hidden></label><b class="ppn">${r.name}</b><button class="pdel" data-del="${k}" aria-label="Remove prize">✕</button>
      <div class="ppr">${ring(S.acorns,r.a,"#C8803F","🌰")}<div class="pstep"><button class="stp" data-c="${k}:a:-10">−</button><button class="stp" data-c="${k}:a:10">+</button></div></div>
      ${ok?`<button class="pgive" data-give="${k}">✓ Given</button>`:`<span class="pdays">⏳ ~${e.days} days</span>`}</div>`}).join("")}
    <button class="padd" id="pzAdd">＋ Add a prize</button>
    <div class="pzform" id="pzForm" hidden>
      <label class="pzpic"><input type="file" accept="image/*" id="pzFile" hidden><span id="pzPrev">📷<small>Add a photo</small></span></label>
      <div class="pzf2"><input id="pzName" maxlength="28" placeholder="What is it? e.g. Lego car" aria-label="Prize name">
        <div class="pzgoal"><label>🌰<select id="pzA">${[50,100,150,200,300,400,500,700,1000].map(x=>`<option ${x===200?"selected":""}>${x}</option>`).join("")}</select></label></div>
        <small id="pzEst"></small></div>
      <div class="pzbtns"><button class="btn ghost" id="pzCancel">Cancel</button><button class="btn green" id="pzSave">Save prize</button></div>
    </div>
    ${sec("❓","Questions a day")}
    <div class="pseg">${[28,35,42,49].map(q=>`<button data-per="${q}" aria-pressed="${S.perDay===q}">${q}</button>`).join("")}</div>
    ${sec("📚","Topics")}
    <div class="ptopics">${COURSE.filter(c=>!c.soon).map(c=>`<button data-topic="${c.id}" aria-pressed="${S.topics.includes(c.id)}"><i>${c.e}</i><small>${SHORT[c.id]||c.name}</small></button>`).join("")}</div>
    ${sec("🎂","Age")}
    <div class="pages">${[3,4,5,6,7,8,9,10].map(a=>`<button data-age="${a}" aria-pressed="${S.age===a}">${a}</button>`).join("")}</div>
    ${sec("📈","Level")}
    <div class="pseg lv">${[["🐢",0],["🐇",1],["🚀",2]].map(([e,d])=>`<button data-diff="${d}" aria-pressed="${S.diff===d}">${e}</button>`).join("")}</div>
    <div class="psample">${expr(ex1)} = ${ex1.ans} &nbsp;·&nbsp; ${expr(ex2)} = ${ex2.ans}</div>
    ${sec("🗺️","Map")}
    <div class="pmonths"><button data-mon="auto" aria-pressed="${S.mapMonth==="auto"}">✨</button>${MONTHS.map((m,k)=>`<button data-mon="${k}" aria-pressed="${S.mapMonth===String(k)}"><i>${ZONES[MONTH_LAND[k]].o}</i>${m.slice(0,3)}</button>`).join("")}</div>
    ${sec("🦄","Stickers")}
    <div class="ptopics">${Object.entries(REWARDS).map(([k,r])=>`<button data-rw="${k}" aria-pressed="${S.reward===k}"><i>${r.e}</i></button>`).join("")}</div>
    ${sec("🔊","Sound")}
    <div class="ptopics two"><button id="swVoice" aria-pressed="${S.voice}"><i>🗣️</i><small>Voice</small></button><button id="swFx" aria-pressed="${S.fx}"><i>🔔</i><small>Effects</small></button><button id="swMic" aria-pressed="${S.mic!==false}"><i>🎤</i><small>Say it</small></button></div>
    <div style="height:22px"></div>
    <button class="qbtn sky" id="btnToday" style="margin-bottom:8px">↺ Play today's games again</button>
    <button class="preset" id="btnReset">↺ Start ${pn} over</button>
    <div id="resetConfirm" hidden class="pconf"><b>Clear 🌰 🦄 ?</b><button class="btn red" id="btnResetYes">Yes</button><button class="btn ghost" id="btnResetNo">No</button></div>`;
  wireDash(pn);
  const P$=q=>$("pSettings").querySelectorAll(q);
  const keep=fn=>{const y=$("pSettings").scrollTop;fn();save();sfx.tap();showParents();$("pSettings").scrollTop=y};
  $("closeSettings").onclick=()=>{sfx.tap();showMap();if(S.ageUp)setTimeout(ageUpCeremony,500)};
  P$("[data-c]").forEach(b=>b.onclick=()=>keep(()=>{const [k,f,d]=b.dataset.c.split(":");const r=S.real[+k];r[f]=Math.max(f==="a"?10:1,r[f]+ +d);S.notified=S.notified.filter(x=>x!==r.id)}));
  P$("[data-del]").forEach(b=>b.onclick=()=>keep(()=>{const r=S.real[+b.dataset.del];S.real.splice(+b.dataset.del,1);S.notified=S.notified.filter(x=>x!==r.id)}));
  P$("[data-pic]").forEach(inp=>inp.onchange=()=>{const f=inp.files[0];if(f)pzLoad(f,u=>keep(()=>{S.real[+inp.dataset.pic].img=u}))});
  {let img="";const est=()=>{const r={a:+$("pzA").value,w:0};$("pzEst").textContent=`About ${estimate({a:r.a+S.acorns,w:0}).days} days of play at ${S.perDay} questions a day`};
   $("pzAdd").onclick=()=>{sfx.tap();$("pzForm").hidden=false;$("pzAdd").hidden=true;est();$("pzName").focus()};
   $("pzCancel").onclick=()=>{sfx.tap();$("pzForm").hidden=true;$("pzAdd").hidden=false};
   $("pzA").onchange=est;
   $("pzFile").onchange=()=>{const f=$("pzFile").files[0];if(f)pzLoad(f,u=>{img=u;$("pzPrev").innerHTML=`<img src="${u}" alt="">`})};
   $("pzSave").onclick=()=>{const name=$("pzName").value.trim()||"A surprise";keep(()=>{S.real.push({id:"r"+Date.now(),e:"🎁",img,name,a:+$("pzA").value+S.acorns,w:0})})}}
  $("pShare")&&($("pShare").onclick=()=>{const t=reportText(pn);sfx.tap();if(navigator.share)navigator.share({title:`${pn}'s learning`,text:t}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast("Report copied 📋"));});
  P$("[data-give]").forEach(b=>b.onclick=()=>keep(()=>{const r=S.real[+b.dataset.give];S.acorns-=r.a;S.wood-=r.w;S.notified=S.notified.filter(x=>x!==r.id);toast(`🎉 Enjoy the ${r.name}!`)}));
  P$("[data-topic]").forEach(b=>b.onclick=()=>keep(()=>{const id=b.dataset.topic,on=S.topics.includes(id);if(on&&activeTopics().length===1){toast("Keep at least one topic");return}S.topics=on?S.topics.filter(x=>x!==id):[...S.topics,id]}));
  P$("[data-age]").forEach(b=>b.onclick=()=>keep(()=>{const old=S.age;S.age=+b.dataset.age;S.ageUp=S.age>old?S.age:0}));
  P$("[data-diff]").forEach(b=>b.onclick=()=>keep(()=>{S.diff=+b.dataset.diff}));
  P$("[data-per]").forEach(b=>b.onclick=()=>keep(()=>{S.perDay=+b.dataset.per}));
  P$("[data-mon]").forEach(b=>b.onclick=()=>keep(()=>{S.mapMonth=b.dataset.mon;landEl=null}));
  P$("[data-rw]").forEach(b=>b.onclick=()=>keep(()=>{S.reward=b.dataset.rw}));
  $("swMic").onclick=()=>{S.mic=S.mic===false;$("swMic").setAttribute("aria-pressed",S.mic);save();sfx.tap()};
  [["swVoice","voice"],["swFx","fx"]].forEach(([id,key])=>$(id).onclick=()=>{S[key]=!S[key];$(id).setAttribute("aria-pressed",S[key]);save();sfx.tap();if(!S.voice&&voice)voice.pause()});
  $("btnToday").onclick=()=>{sfx.tap();S.day={d:"",done:0,house:false,plan:null};save();landEl=null;toast("Today's games are ready again! 🎉");showMap()};
  $("btnReset").onclick=()=>{$("resetConfirm").hidden=false;$("btnReset").hidden=true};
  $("btnResetNo").onclick=()=>{$("resetConfirm").hidden=true;$("btnReset").hidden=false};
  $("btnResetYes").onclick=()=>{const k={voice:S.voice,fx:S.fx,age:S.age,diff:S.diff,perDay:S.perDay,reward:S.reward,topics:S.topics,real:S.real};S=Object.assign(fresh(),k);S.seen=true;save();landEl=null;showMap()};
}

/* ================= the parents' learning report: every skill the child practised, and how sure they are ================= */
const LVL_T=[["🌱","New"],["🌿","Learning"],["🌳","Knows it"]];
function skRows(){const sk=S.sk||{};return Object.entries(sk).map(([k,r])=>{const [cat,name]=k.split("|");return {cat,name,r,lv:skLevel(r)}})}
function reportHTML(pn){const rows=skRows();
  /* the last 7 days: how many questions a day */
  const days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push([d,(S.dq||{})[dayStr(d)]||0])}
  const mx=Math.max(10,...days.map(x=>x[1])),goal=S.perDay;
  const week=`<div class="rweek"><div class="rwh"><b>Last 7 days</b><small>questions a day · goal ${goal}</small></div><div class="rbars">${days.map(([d,n],i)=>`<div class="rb"><span class="rbn">${n||""}</span><i class="${n>=goal?"full":n?"some":""}" style="height:${Math.max(4,n/Math.max(mx,goal)*100)}%"></i><small>${i===6?"Today":["Su","Mo","Tu","We","Th","Fr","Sa"][d.getDay()]}</small></div>`).join("")}<span class="rgoal" style="bottom:calc(22px + ${goal/Math.max(mx,goal)*100}% * (100% - 40px) / 100%)"></span></div></div>`;
  if(!rows.length)return week+`<p class="pnote">Play a few rounds and you'll see here what ${pn} is learning.</p>`;
  const cnt=[0,1,2].map(l=>rows.filter(x=>x.lv===l).length),tot=rows.length,areas={};
  rows.forEach(x=>{const A=AREA[x.cat]||["⭐","Other"];(areas[A[1]]=areas[A[1]]||{e:A[0],l:[]}).l.push(x)});
  const prac=rows.filter(x=>x.lv===1).sort((a,b)=>((a.r.h.match(/1/g)||[]).length/a.r.h.length)-((b.r.h.match(/1/g)||[]).length/b.r.h.length)).slice(0,2);
  const seg=l=>cnt[l]?`<i class="s${l}" style="flex:${cnt[l]}"></i>`:"";
  return `<div class="rhero"><div class="rbig">${cnt[2]}<small>of ${tot}</small></div><div class="rht"><b>skills ${pn} knows well</b><div class="rstack">${seg(2)}${seg(1)}${seg(0)}</div>
      <div class="rleg"><span><i class="s2"></i>${LVL_T[2][1]} ${cnt[2]}</span><span><i class="s1"></i>${LVL_T[1][1]} ${cnt[1]}</span><span><i class="s0"></i>${LVL_T[0][1]} ${cnt[0]}</span></div></div></div>
    ${week}
    ${prac.length?`<div class="rtip"><b>🤝 Practise together</b>${prac.map(x=>`<span>${(AREA[x.cat]||["⭐"])[0]} ${x.name}</span>`).join("")}</div>`:""}
    <div class="rgrid">${Object.entries(areas).map(([a,g])=>{const k2=g.l.filter(x=>x.lv===2).length,f=k2/g.l.length;
      return `<details class="rcard"><summary><span class="rring" style="--f:${Math.round(f*360)}deg"><i>${g.e}</i></span><b>${a}</b><small>${k2} of ${g.l.length} known</small></summary>
        <div class="rlist">${g.l.sort((x,y)=>y.lv-x.lv).map(x=>`<span class="l${x.lv}">${LVL_T[x.lv][0]} ${x.name}</span>`).join("")}</div></details>`}).join("")}</div>
    <p class="rhow">🌳 knows it = right the first time almost every time lately · 🌿 learning = still mixing it up · 🌱 new = just started. Tap an area to see its skills.</p>
    <button class="padd share" id="pShare">📤 Share this report</button>`}
function reportText(pn){const rows=skRows(),w=wkLog();let t=`${pn}'s learning in Paraxilingo\nThis week: ${w.days.length} days, ${w.q} questions, ${w.q?Math.round(w.right/w.q*100):0}% right\n`;
  [2,1,0].forEach(l=>{const r=rows.filter(x=>x.lv===l);if(r.length)t+=`\n${LVL_T[l][0]} ${LVL_T[l][1]}: ${r.map(x=>x.name).join(", ")}`});return t+"\n"}

/* ================= players ================= */
let dropKind=null;
function closeDrop(){dropKind=null;$("drop").classList.remove("show");$("dim").classList.remove("show");$("tbCourse").setAttribute("aria-expanded","false")}
function openDrop(){
  if(dropKind)return closeDrop();dropKind="player";sfx.tap();
  $("drop").innerHTML=domiPicker()+`<p class="dh">Players</p><div class="courses">`+P.list.map(p=>{const st=p.id===P.cur?S:peek(p.id);
    return `<button class="crs ${p.id===P.cur?"on":""}" data-pl="${p.id}"><span class="ci" style="background:${p.color}">${p.name.trim()[0].toUpperCase()}</span><span style="flex:1;min-width:0">${p.name}<small>🌰 ${st.acorns||0} · 🪵 ${st.wood||0} · stickers ${(st.stickers||[]).length}</small></span>${p.id===P.cur?"✓":""}</button>`}).join("")+`</div>
    <div class="addpl"><input id="plName" maxlength="16" placeholder="New player's name" aria-label="New player's name"><button class="btn green" id="plAdd">Add</button></div>`;
  $("drop").classList.add("show");$("dim").classList.add("show");$("tbCourse").setAttribute("aria-expanded","true");
  wireDomi();$("drop").querySelectorAll("[data-pl]").forEach(b=>b.onclick=()=>{if(b.dataset.pl!==P.cur)switchPlayer(b.dataset.pl)});
  $("plAdd").onclick=()=>{const n=$("plName").value.trim();if(!n){$("plName").focus();return}
    const id="p"+Date.now();P.list.push({id,name:n,color:PCOLORS[P.list.length%PCOLORS.length]});savePlayers();
    try{const st=fresh();st.seen=true;localStorage.setItem(keyFor(id),JSON.stringify(st))}catch(e){}
    switchPlayer(id)};
}
$("dim").onclick=closeDrop;
$("tbCourse").onclick=()=>openDrop();
function switchPlayer(id){save();P.cur=id;savePlayers();loadState();save();closeDrop();paintDomi();landEl=null;showMap();sfx.fanfare();toast(`Hi, ${curPlayer().name}! 👋`)}
'''

start = r'''
/* ================= start: Domi tells what month or event it is ================= */
const clk=()=>{const d=new Date();$("clock").textContent=d.getHours()+":"+String(d.getMinutes()).padStart(2,"0")};clk();setInterval(clk,30000);
dayPlan();showMap();
(function intro(){
  const ev=eventNow(),z=landIdx(),Z=ZONES[z],t0=Date.now();
  $("inEv").textContent=ev?ev.e:"";
  let gone=false;
  const go=()=>{if(gone)return;gone=true;hush();$("introC").classList.add("gone");setTimeout(()=>$("introC").hidden=true,420);S.seen=true;save();
    showMap();const n2=HOLES[landIdx()].length;setTimeout(()=>{if(S.day.done<n2)showPop(S.day.done)},700)};
  const later=()=>setTimeout(go,Math.max(600,2600-(Date.now()-t0)));
  setTimeout(()=>sayseq([ev?ev.clip:"z"+Z.a,"w/LULU_BD_PRIZE"],later),400);
  setTimeout(go,9000);
  $("introC").addEventListener("pointerdown",()=>{sfx.tap();go()});
})();
})();
'''

import os
clips=sorted(f[:-4] for f in os.listdir(os.path.join(os.path.dirname(OUT),'audio')) if f.endswith('.mp3'))
shell = shell.replace('__WQ__', wq).replace('__TRY__', TRY)
script_new = A + '\n' + B + '\n' + shell + '\n' + D + E1 + E2 + F + start
script_new = script_new.replace('function closeLesson(){', 'function closeLesson(){', 1)

head = s[:s.index('<style>')]
head = head.replace('<title>Paraxilingo B</title>', '<title>Paraxilingo C</title>')
if 'name="viewport"' not in head:  # same screen setting as the published site, so tests see real phone/iPad layouts
    head = head.replace('<title>', '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">\n<title>', 1)
out = head + '<style>' + css + '</style>\n' + markup + '\n<script>' + script_new + '</script>\n'
# wide-screen rules must never apply inside the 390px phone frame (shown when the window is 560+ wide and 720+ tall)
import re as _re
out=_re.sub(r'@media ?\((min-width:\s*(?:680|700)px|orientation:\s*landscape)\)((?: and \([^)]*\))*) ?\{',lambda m:'@media ('+m.group(1)+')'+m.group(2)+' and (max-height:719px){',out)
open(OUT, 'w').write(out)
print("ok", len(out))
