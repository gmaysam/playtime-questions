/* ================= question engine (verC): spoken, picture-first, always positive ================= */
/* Every question is read aloud by Lulu (Farsi). Clips come from the Watcher Device library (audio/w/). */
const WQ=__WQ__;
const VOICED=new Set(__VOICED__);
const PIC_E=__PIC_E__;
const WORD_E=__WORD_E__;
const N=n=>n>=0&&n<=20?"w/LULU_N"+n:null;
/* the new, cuter Domi (vector) everywhere */
bv=function(w){return `<span class="bv" style="width:${w}px;--w:${w}px"><img src="${domiSrc()}" alt=""></span>`};
/* Farsi names of answer words (Watcher clips + Paraxilingo's own PX_FA_* clips) */
const FA_SAY=__FA_SAY__;
const PLANET_N=["sun","mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"];
const DINOS=["t-rex","tyrannosaurus","triceratops","stegosaurus","brachiosaurus","velociraptor","diplodocus","pterodactyl"];
const EN_SAY=__EN_SAY__;
function enSay(word){const w=String(word).toLowerCase().trim();if(/^\d+$/.test(w))return +w>=1&&+w<=100?["w/LULU_EN"+(+w)]:[];if(DINOS.includes(w)||PLANET_N.includes(w))return [];
  const c=EN_SAY[w]||EN_SAY[w.replace(/s$/,"")]||EN_SAY[w+"s"];return c?["w/"+c]:[]}
const both=word=>faSay(word).concat(enSay(word));
function faSay(word){
  const w=String(word).toLowerCase().trim();
  if(/^\d+$/.test(w))return [N(+w)];
  if(DINOS.includes(w))return [];                                  /* dinosaurs: the English name is enough */
  const pi=PLANET_N.indexOf(w);if(pi>0)return ["w/LULU_FA_PL"+pi,"w/LULU_YA","w/LULU_PL"+pi];   /* "Moshtari ya Jupiter" */
  const c=FA_SAY[w]||FA_SAY[w.replace(/s$/,"")]||FA_SAY[w+"s"];return c?["w/"+c]:[];
}
const PRAISE_CLIPS=["w/LULU_PR_A","w/LULU_PR_B","w/LULU_PR_C","w/LULU_PR_D","w/LULU_PR_E","w/LULU_PR_F","w/LULU_PRAISE1","w/LULU_PRAISE2","w/LULU_PRAISE3","w/LULU_PRAISE4","w/LULU_BD_RIGHT","praise1","praise2","praise3","praise4"];
const PRAISE_T=["Yay!","Super!","Woohoo!","Amazing!","Brilliant!","You're a star!","Fantastic!","Hooray!","So smart!","Wow!"];
const OBJ=["🍎","🐟","⭐","🦆","🌸","🍓","🐞","🎈","🍪","🐣","🧁","🦋"];
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const lvl=()=>Math.max(3,Math.min(10,S.age+(S.diff-1)));

/* ---------- sound: play a list of clips one after another ---------- */
let seqId=0;
function speaking(on){const b=$("qSpk");if(b)b.classList.toggle("talking",on)}
function sayseq(list,onEnd){
  const id=++seqId,l=list.filter(Boolean);let i=0;
  const next=()=>{if(id!==seqId)return;if(i>=l.length){speaking(false);onEnd&&onEnd();return}say(l[i++],next)};
  speaking(true);next();
}
function hush(){seqId++;askTok++;if(voice){voice.onended=null;voice.onerror=null;voice.pause();voice=null}speaking(false)}
sfx.oops=()=>tone([[392,0,.12,"triangle",.1],[330,.1,.18,"triangle",.1]]);

/* ---------- pictures ---------- */
const grp=(n,e,cls="")=>`<span class="grp ${cls}">${Array.from({length:n},()=>`<i class="ob">${e}</i>`).join("")}</span>`;
const dots=n=>n<=10?`<span class="dots">${"●".repeat(n)}</span>`:"";
const numOpt=n=>({h:`<b class="num">${n}</b>${dots(n)}`,say:both(n)});
function numOpts(right,cands,k=3){const w=sh([...new Set(cands.filter(x=>x!==right&&x>=0))]).slice(0,k-1),o=sh([right,...w]);return {opts:o.map(numOpt),ans:o.indexOf(right)}}
const near=n=>[n-1,n+1,n+2,n-2,n+3];

/* ---------- categories: each mound of the day is one category; a day never repeats one in a row ---------- */
const CATS=[
 {id:"count",topic:"math",e:"🔢",name:"Counting"},
 {id:"add",topic:"math",e:"➕",name:"Adding & taking away"},
 {id:"clock",topic:"clock",e:"🕒",name:"Clock & time"},
 {id:"money",topic:"money",e:"🪙",name:"Coins"},
 {id:"animals",topic:"watcher",e:"🐾",name:"Animals"},
 {id:"world",topic:"watcher",e:"🌳",name:"Our world"},
 {id:"sky",topic:"watcher",e:"🌙",name:"Sky & space"},
 {id:"farm",topic:"watcher",e:"🏡",name:"Homes, food & sounds"},
 {id:"shapes",topic:"shapes",e:"🔷",name:"Shapes, colours & patterns"},
 {id:"people",topic:"people",e:"🚩",name:"Flags & jobs"},
 {id:"letters",topic:"words",e:"🔤",name:"Letters & words"},
 {id:"read",topic:"reading",e:"📖",name:"Read it!"},
 {id:"story",topic:"radio",e:"📻",name:"Domi's Radio"},
 {id:"paint",topic:"paint",e:"🎨",name:"Painting"},
];
const catById=id=>CATS.find(c=>c.id===id);

/* what a child of each age can do (US Common Core K-2 + Minnesota grade 1 benchmarks):
   5: count to 10, add/take away within 5, o'clock, pennies
   6: count to 20, add/take away within 10, o'clock + half past, penny/nickel/dime values, small coin sums
   7: add/take away within 20, quarter past/to, quarter, coin sums to 50¢, same amount two ways
   8+: within 100, 5-minute times, change from $1 */
function kindsFor(cat){
  const a=lvl();
  if(cat==="count")return a<=4?["find","more","less"]:a<=6?["find","more","less","after","before"]:["after","before","find","more"];
  if(cat==="add")return a<=4?["addPic","subPic","teach"]:a<=7?["addPic","subPic","sum","teach","minus"]:["sum","minus","teach","big"];
  if(cat==="clock")return a<=5?["routine","oclock"]:a<=6?["routine","oclock","half","season","nowseason"]:a<=7?["half","quarter","season","today","tomorrow","week"]:["quarter","minutes","after","before","monthafter","yesterday","months"];
  if(cat==="money")return a<=5?["pennies","value"]:a<=6?["pennies","value","count"]:a<=7?["value","count","same"]:["count","same","change"];
  if(cat==="letters")return a<=4?["abc","listen"]:a<=6?["listen","first","abc","whatis","lafter"]:["listen","first","whatis","lafter","lbefore"];
  if(cat==="read")return a<=5?["balloon","flash"]:["balloon","flash","sentence"];
  if(cat==="farm")return a<=4?["home","sound","fly"]:["home","food","sound","fly","water"];
  if(cat==="shapes")return a<=4?["shape","color","pattern"]:["shape","color","pattern","bigsmall"];
  if(cat==="people")return a<=5?["job","job2"]:["flag","job","flag2","job2"];
  return ["w"];
}
const MAXN=()=>{const a=lvl();return a<=4?5:a<=6?10:a<=7?20:100};

/* ---------- builders ---------- */
function qCount(k){
  const mx=Math.min(MAXN(),20),e=pickOne(OBJ);
  if(k==="find"){const n=ri(2,Math.min(mx,10)),c=sh([n,...sh(near(n).filter(x=>x>=1&&x<=12&&x!==n)).slice(0,2)]);
    return {voice:["w/LULU_C_FIND",N(n)],cap:`Find ${n}`,visual:`<div class="bignum">${n}</div>`,opts:c.map(x=>({h:grp(x,e),say:both(x)})),ans:c.indexOf(n),layout:"col",hint:"elim",exp:{t:`${n}`,v:["w/LULU_ANS_IS"]}}}
  if(k==="more"||k==="less"){let a=ri(1,Math.min(mx,9)),b;do{b=ri(1,Math.min(mx,9))}while(b===a||Math.abs(a-b)>4);const o=[a,b],r=k==="more"?Math.max(a,b):Math.min(a,b);
    return {voice:[k==="more"?"w/LULU_CP_MORE":"w/LULU_CP_LESS"],cap:k==="more"?"Which has more?":"Which has less?",visual:`<div class="listen">⚖️</div>`,opts:o.map(x=>({h:grp(x,e),say:both(x)})),ans:o.indexOf(r),layout:"row",hint:"count",exp:{t:`${r}`,v:["w/LULU_ANS_IS"]}}}
  if(k==="after"){const n=ri(1,Math.min(mx,19)-1);return Object.assign({voice:["w/LULU_C_AFTER1",N(n)],cap:`${n} → ?`,visual:`<div class="seq"><b class="bignum sm">${n}</b><span class="arr">➜</span><b class="bignum sm q">?</b></div>`,layout:"row3",hint:"line",line:[n,n+1],exp:{t:`${n} → ${n+1}`,v:["w/LULU_ANS_IS"]}},numOpts(n+1,[n,n+2,n-1,n+3]))}
  const n=ri(2,Math.min(mx,20));return Object.assign({voice:["w/LULU_C_BEFORE1",N(n)],cap:`? → ${n}`,visual:`<div class="seq"><b class="bignum sm q">?</b><span class="arr">➜</span><b class="bignum sm">${n}</b></div>`,layout:"row3",hint:"line",line:[n-1,n],exp:{t:`${n-1} → ${n}`,v:["w/LULU_ANS_IS"]}},numOpts(n-1,[n,n+1,n-2]));
}
function qAdd(k){
  const mx=MAXN(),e=pickOne(OBJ),pm=Math.min(mx,10);
  if(k==="addPic"){const s=ri(2,pm),a=ri(1,s-1),b=s-a;
    return Object.assign({voice:["w/LULU_WP_IF",N(a),"w/LULU_WP_HAVE",N(b),"w/LULU_WP_MORE"],cap:`${a} + ${b}`,visual:`<div class="story2">${grp(a,e)}<span class="op">+</span>${grp(b,e)}</div>`,layout:"row3",hint:"count",exp:{t:`${a} + ${b} = ${s}`,v:[N(a),"w/LULU_PLUS",N(b),"w/LULU_EQUALS",N(s)]}},numOpts(s,near(s)))}
  if(k==="subPic"){const a=ri(2,pm),b=ri(1,a-1),r=a-b;
    return Object.assign({voice:["w/LULU_WP_IF",N(a),"w/LULU_WP_HAVE",N(b),"w/LULU_WP_GIVE"],cap:`${a} − ${b}`,visual:`<div class="story2"><span class="grp">${Array.from({length:a},(x,i)=>`<i class="ob ${i>=r?"gone":""}">${e}</i>`).join("")}</span><span class="gift">👋 ${b}</span></div>`,layout:"row3",hint:"count",countSel:".ob:not(.gone)",exp:{t:`${a} − ${b} = ${r}`,v:[N(a),"w/LULU_MINUS",N(b),"w/LULU_EQUALS",N(r)]}},numOpts(r,near(r)))}
  let a,b,op;
  if(k==="big"){const p=makeProb(skillFor(S.age,S.diff));a=p.a;b=p.b;op=p.op}
  else if(k==="minus"){a=ri(2,Math.min(mx,20));b=ri(1,a-1);op="−"}
  else{const s=ri(2,Math.min(mx,20));a=ri(1,s-1);b=s-a;op="+"}
  const r=calc(a,op,b),spoken=r<=20&&a<=20&&b<=20&&(op==="+"||op==="−");
  const eq=`<div class="eq"><span>${a}${dots(a)}</span><b>${op}</b><span>${b}${dots(b)}</span><b>=</b><span class="q">?</span></div>`;
  if(k==="teach"){const shown=Math.random()<.5?r:r+pickOne([1,-1,2]);const ok=shown===r;
    return {voice:spoken?[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS",N(shown),"q_teach"]:["q_teach"],cap:"Is Domi right?",
      visual:`<div class="domisays">${bv(78)}<div class="bub"><b>${a} ${op} ${b} = ${shown}</b></div></div>`,opts:[{h:"<span class='yn'>✅</span>",say:["w/LULU_SK_YES"]},{h:"<span class='yn'>❌</span>",say:["w/LULU_SK_NO"]}],ans:ok?0:1,layout:"yn",hint:"dots",a,b,
      exp:{t:`${a} ${op} ${b} = ${r}`,v:[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS",N(r)]}}}
  return Object.assign({voice:spoken?[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS"]:["q_choose"],cap:"",visual:eq,layout:"row3",hint:spoken&&r<=10?"dots":"elim",
    exp:{t:`${a} ${op} ${b} = ${r}`,v:spoken?[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS",N(r)]:["w/LULU_ANS_IS"]}},numOpts(r,near(r).concat([r+10,r-10])));
}
const dig=(h,m)=>`${h}:${String(m).padStart(2,"0")}`;
const DAYS_EN=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],MONTHS_EN=["January","February","March","April","May","June","July","August","September","October","November","December"],SEAS=["Spring","Summer","Fall","Winter"];
const daySay=i=>["w/LULU_FA_DAY"+i,"w/LULU_EN_DAY"+i],seaSay=i=>["w/LULU_FA_SEA"+i,"w/LULU_EN_SEASON"+i],SEA_E=["🌸","☀️","🍂","⛄"];
function dayOpts(r){const o=sh([r,...sh([0,1,2,3,4,5,6].filter(x=>x!==r)).slice(0,2)]);return {opts:o.map(i=>({h:`<span class="oe">📅</span><small class="dn">${DAYS_EN[i]}</small>`,say:daySay(i)})),ans:o.indexOf(r)}}
function qCal(k){
  const t=(new Date().getDay()+6)%7,m=new Date().getMonth(),sea=[3,3,0,0,0,1,1,1,2,2,2,3][m];
  if(k==="today")return Object.assign({voice:["w/LULU_CA_TODAY"],cap:"What day is today?",visual:`<div class="bigemo">📅</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[t],v:["w/LULU_ANS_IS",...daySay(t)]}},dayOpts(t));
  if(k==="tomorrow")return Object.assign({voice:["w/LULU_CA_TOMORROW"],cap:"What day is tomorrow?",visual:`<div class="bigemo">🌅</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[(t+1)%7],v:["w/LULU_ANS_IS",...daySay((t+1)%7)]}},dayOpts((t+1)%7));
  if(k==="yesterday")return Object.assign({voice:["w/LULU_CA_YESTERDAY"],cap:"What day was yesterday?",visual:`<div class="bigemo">🌙</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[(t+6)%7],v:["w/LULU_ANS_IS",...daySay((t+6)%7)]}},dayOpts((t+6)%7));
  if(k==="after"){const d=ri(0,6);return Object.assign({voice:["w/LULU_CA_DAY_AFTER",...daySay(d)],cap:`${DAYS_EN[d]} → ?`,visual:`<div class="daycard">${DAYS_EN[d]}</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[(d+1)%7],v:["w/LULU_ANS_IS",...daySay((d+1)%7)]}},dayOpts((d+1)%7))}
  if(k==="before"){const d=ri(0,6);return Object.assign({voice:["w/LULU_CA_DAY_BEFORE",...daySay(d)],cap:`? → ${DAYS_EN[d]}`,visual:`<div class="daycard">${DAYS_EN[d]}</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[(d+6)%7],v:["w/LULU_ANS_IS",...daySay((d+6)%7)]}},dayOpts((d+6)%7))}
  if(k==="monthafter"){const mo=ri(0,11),r=(mo+1)%12,o=sh([r,...sh([...Array(12).keys()].filter(x=>x!==r&&x!==mo)).slice(0,2)]),mSay=i=>["w/LULU_FA_MON"+i,"w/LULU_EN_MONTH"+i];
    return {voice:["w/LULU_CA_MONTH_AFTER",...mSay(mo)],cap:`${MONTHS_EN[mo]} → ?`,visual:`<div class="daycard">${MONTHS_EN[mo]}</div>`,opts:o.map(i=>({h:`<span class="oe">🗓️</span><small class="dn">${MONTHS_EN[i]}</small>`,say:mSay(i)})),ans:o.indexOf(r),layout:"col",hint:"elim",exp:{t:MONTHS_EN[r],v:["w/LULU_ANS_IS",...mSay(r)]}}}
  if(k==="nowseason"){const o=sh([0,1,2,3]);return {voice:["w/LULU_CA_NOW_SEASON"],cap:"Which season is it now?",visual:`<div class="bigemo">🗓️</div>`,opts:o.map(i=>({h:`<span class="oe">${SEA_E[i]}</span><small>${SEAS[i]}</small>`,say:seaSay(i)})),ans:o.indexOf(sea),layout:"grid",hint:"elim",exp:{t:SEAS[sea],v:["w/LULU_ANS_IS",...seaSay(sea)]}}}
  if(k==="week")return Object.assign({voice:["w/LULU_CA_WEEK_DAYS"],cap:"How many days in a week?",visual:`<div class="bigemo">📆</div>`,layout:"row3",hint:"elim",exp:{t:"7",v:["w/LULU_ANS_IS",N(7)]}},numOpts(7,[5,10,6,8]));
  return Object.assign({voice:["w/LULU_CA_YEAR_MONTHS"],cap:"How many months in a year?",visual:`<div class="bigemo">🗓️</div>`,layout:"row3",hint:"elim",exp:{t:"12",v:["w/LULU_ANS_IS",N(12)]}},numOpts(12,[10,7,14]));
}
function qClock(k){
  if(["today","tomorrow","yesterday","after","before","monthafter","nowseason","week","months"].includes(k))return qCal(k);
  if(k==="routine"){const r=pickOne(ROUTINES);return {voice:["c_routine"],cap:"Morning or night?",visual:`<div class="bigemo">${r[0]}</div>`,opts:[{h:"<span class='yn'>☀️</span><small>Morning</small>",say:both("morning")},{h:"<span class='yn'>🌙</span><small>Night</small>",say:both("night")}],ans:r[2],layout:"yn",hint:"elim",exp:{t:r[2]?"Night 🌙":"Morning ☀️",v:["w/LULU_ANS_IS"]}}}
  if(k==="season"){const sz=pickOne(SEASONS),SE={Winter:"⛄",Spring:"🌸",Summer:"☀️",Autumn:"🍂"},o=sh(["Winter","Spring","Summer","Autumn"]);
    return {voice:["c_season"],cap:"Which season?",visual:`<div class="bigemo">${sz[0]}</div>`,opts:o.map(x=>({h:`<span class="oe">${SE[x]}</span><small>${x}</small>`,say:seaSay(["Spring","Summer","Autumn","Winter"].indexOf(x))})),ans:o.indexOf(sz[2]),layout:"grid",hint:"elim",exp:{t:sz[2],v:["w/LULU_ANS_IS"]}}}
  const h=ri(1,12),m=k==="oclock"?0:k==="half"?30:k==="quarter"?pickOne([15,45]):ri(1,11)*5;
  const w=[dig(hh(h+1),m),dig(hh(h-1),m),dig(h,m===30?0:30),dig(h,(m+15)%60)];
  const o=sh([dig(h,m),...sh([...new Set(w.filter(x=>x!==dig(h,m)))]).slice(0,2)]);
  return {voice:["c_read"],cap:"What time is it?",visual:clockSVG(h,m),opts:o.map(x=>({h:`<b class="num t">${x}</b>`,say:(([hh2,mm2])=>[N(+hh2),"w/LULU_EN"+(+hh2)].concat(+mm2?["w/LULU_EN"+(+mm2)]:[]))(x.split(":"))})),ans:o.indexOf(dig(h,m)),layout:"row3",hint:"clock",exp:{t:`${dig(h,m)}  (${tName(h,m)})`,v:["w/LULU_ANS_IS"]}};
}
function qMoney(k){
  const a=lvl();
  if(k==="pennies"){const n=ri(2,a<=5?5:9);return Object.assign({voice:["m_count"],cap:"How many cents?",visual:coinsHTML(Array(n).fill("p"),false),layout:"row3",hint:"coins",exp:{t:`${n}¢`,v:["w/LULU_ANS_IS"]}},cents(n,near(n)))}
  if(k==="value"){const pool=a<=5?["p","n"]:a<=6?["p","n","d"]:["p","n","d","q"],c=pickOne(pool),o=sh(pool.map(x=>COINS[x].v)).slice(0,Math.min(3,pool.length));if(!o.includes(COINS[c].v))o[0]=COINS[c].v;const oo=sh(o);
    return {voice:["m_value"],cap:COINS[c].name,visual:coinsHTML([c],false).replace(/width="([\d.]+)" height="([\d.]+)"/,(x,w,h)=>`width="${w*1.9}" height="${h*1.9}"`)+`<div class="coinname">${COINS[c].name}</div>`,opts:oo.map(v=>({h:`<b class="num">${v}¢</b>`,say:both(v)})),ans:oo.indexOf(COINS[c].v),layout:oo.length===2?"yn":"row3",hint:"elim",exp:{t:`${COINS[c].name} = ${COINS[c].v}¢`,v:["w/LULU_ANS_IS"]}}}
  if(k==="count"){let ks;const pool=a<=6?["p","n"]:a<=7?["p","n","d"]:["p","n","d","q"],cap=a<=6?20:a<=7?50:99;do{ks=Array.from({length:ri(2,4)},()=>pickOne(pool))}while(sumC(ks)>cap);ks.sort((x,y)=>COINS[y].v-COINS[x].v);const t=sumC(ks);
    return Object.assign({voice:["m_count"],cap:"How much money?",visual:coinsHTML(ks,false),layout:"row3",hint:"coins",exp:{t:ks.map(x=>COINS[x].v+"¢").join(" + ")+` = ${t}¢`,v:["w/LULU_ANS_IS"]}},cents(t,[t+1,t-1,t+5,t-5,t+10]))}
  const m=makeMoney();const q={voice:[m.audio],cap:m.title,visual:m.visual,opts:m.opts.map(x=>({h:/<svg/.test(x)?x:`<b class="num">${x}</b>`})),ans:m.ans,layout:m.wide?"col":"row3",hint:"elim",exp:{t:m.answerText||m.opts[m.ans].replace(/<[^>]+>/g,""),v:["w/LULU_ANS_IS"]}};
  return q;
}
function cents(r,c){const w=sh([...new Set(c.filter(x=>x>0&&x!==r))]).slice(0,2),o=sh([r,...w]);return {opts:o.map(x=>({h:`<b class="num">${x}¢</b>`,say:both(x)})),ans:o.indexOf(r)}}

/* Watcher Device questions: Lulu reads the question and the explanation */
const SKY_TF=[1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0];
const SKY_TF_E=["☀️","🌙","🌍","⭐","☁️","🌙","🌈","🧑‍🚀","🪐","🌌","⛈️","☀️","🌍","🌙","❄️","☄️"];
const SKY_TF_T=["The sun is a star.","The moon is a planet.","We live on planet Earth.","Stars are there only at night.","Clouds are made of tiny drops of water.","The moon has its own light.","A rainbow has seven colours.","Astronauts float in space.","Jupiter is smaller than Earth.","Our galaxy is the Milky Way.","Thunder is the loud sound of the sky.","The sun turns off at night.","The Earth goes around the sun.","There is air to breathe on the moon.","Snow is frozen water.","A comet is a real star with a tail."];
function wPool(cat){
  const pre={animals:["a","x"],world:["b","n"],sky:["s","p"]}[cat],young=S.age<=7;
  return WQ.filter(w=>pre.includes(w.i[0])&&w.a<=Math.max(3,S.age)&&(!young||VOICED.has(w.i)));
}
const TEXT_E=[["t-rex","🦖"],["dinosaur","🦕"],["penguin","🐧"],["whale","🐋"],["giraffe","🦒"],["octopus","🐙"],["elephant","🐘"],["spider","🕷️"],["cheetah","🐆"],["bear","🐻"],["owl","🦉"],["hands","🧼"],["teeth","🦷"],["heart","❤️"],["bones","🦴"],["eyes","👀"],["nose","👃"],["ears","👂"],["sleep","😴"],["water","💧"],["cactus","🌵"],["mushroom","🍄"],["mountain","⛰️"],["river","🏞️"],["volcano","🌋"],["carrot","🥕"],["milk","🥛"],["moon","🌙"],["sun","☀️"],["star","⭐"],["rain","🌧️"],["fog","🌫️"],["wind","🌬️"],["planet","🪐"],["plant","🌱"],["flower","🌸"],["tree","🌳"],["bird","🐦"],["fish","🐟"],["egg","🥚"]];
const wEmoji=w=>{if(w.p&&PIC_E[w.p])return PIC_E[w.p];const t=w.q.toLowerCase();for(const [k,e] of TEXT_E)if(t.includes(k))return e;return "🤔"};
Object.assign(WORD_E,{"brachiosaurus":"🦕","t-rex":"🦖","eggs":"🥚","bones":"🦴","clouds":"☁️"});
const E_VOICED=new Set(__EVOICED__);
const optE=o=>WORD_E[o.toLowerCase()]||"";
function qWatcher(cat,used){
  if(cat==="sky"&&Math.random()<.3){const k=sh([...Array(16).keys()]).find(i=>!used.has("tf"+i));if(k!==undefined){used.add("tf"+k);
    return {voice:["w/LULU_TF"+k],cap:SKY_TF_T[k],visual:`<div class="bigpic">${SKY_TF_E[k]}</div>`,opts:[{h:"<span class='yn'>✅</span>",say:["w/LULU_SK_YES"]},{h:"<span class='yn'>❌</span>",say:["w/LULU_SK_NO"]}],ans:SKY_TF[k]?0:1,layout:"yn",hint:"again",exp:{t:SKY_TF_T[k]+(SKY_TF[k]?" ✅ True!":" ❌ Not true."),v:["w/LULU_ANS_IS"]}}}}
  let pool=wPool(cat).filter(w=>!used.has(w.i)&&!S.seenW.includes(w.i));
  if(!pool.length){S.seenW=S.seenW.filter(i=>!wPool(cat).some(w=>w.i===i));pool=wPool(cat).filter(w=>!used.has(w.i))}
  /* avoid two of the same small topic (e.g. body, nature) in one mound */
  const tops=new Set([...used].map(i=>(WQ.find(w=>w.i===i)||{}).t));const fresh=pool.filter(w=>!tops.has(w.t));const w=pickOne(fresh.length?fresh:pool);
  if(!w)return qCount("find");
  used.add(w.i);S.seenW.push(w.i);
  const v=VOICED.has(w.i),qv=v?[`w/${w.i}_q_lulu`]:["q_choose"],ev=E_VOICED.has(w.i)?[`w/${w.i}_e_lulu`]:["w/LULU_ANS_IS"];
  if(w.k==="tf")return {voice:qv,cap:w.q,visual:`<div class="bigpic">${wEmoji(w)}</div>`,opts:[{h:"<span class='yn'>✅</span>",say:["w/LULU_SK_YES"]},{h:"<span class='yn'>❌</span>",say:["w/LULU_SK_NO"]}],ans:w.n,layout:"yn",hint:"again",exp:{t:(w.n===0?"✅ True! ":"❌ Not true. ")+w.x,v:ev}};
  return {voice:qv,cap:w.q,visual:`<div class="listen">${(()=>{const t=w.q.toLowerCase(),oe=w.o.map(optE);for(const [k,e] of TEXT_E)if(t.includes(k)&&!oe.includes(e))return e;return catById(cat).e})()}</div>`,opts:w.o.map(o=>/^\d+$/.test(o)?numOpt(+o):({h:`<span class="oe">${optE(o)||"🔹"}</span><small>${o}</small>`,say:both(o)})),ans:w.n,layout:w.o.length>2?"row3":"yn",hint:"elim",exp:{t:`${w.o[w.n]}: ${w.x}`,v:ev}};
}
/* Story time (Domi's Radio): stories and questions from the Watcher Device, 5 voices */
const STORIES=__STORIES__;
const ST_E={Picnic:"🧺",Rainbow:"🌈",Farm:"🐄",House:"🏠",Trip:"✈️",Seed:"🌱",Sea:"🌊",Clock:"⏰",Market:"🛒"};
function qStory(si,k){
  const st=STORIES[si],q=st.q.find(x=>x.k===k)||st.q[k],nums=!!q.nums;
  const opts=nums?q.nums.map(numOpt):q.opts.map(o=>({h:`<span class="oe">${o[0]}</span><small>${o[1]}</small>`,say:both(o[1])}));
  return {voice:[`w/ST_S${st.s}_Q${q.k}`],cap:"",visual:`<div class="listen radio">${ST_E[st.t]||"📻"}</div>`,opts,ans:q.ans,layout:"row3",hint:"elim",story:si,exp:{t:nums?String(q.nums[q.ans]):q.opts[q.ans][1],v:["w/LULU_ANS_IS"]}};
}
function buildQ(cat,kind,used){
  if(cat==="count")return qCount(kind);
  if(cat==="add")return qAdd(kind);
  if(cat==="clock")return qClock(kind);
  if(cat==="money")return qMoney(kind);
  if(cat==="clock")return qClock(kind);
  if(cat==="farm")return qFarm(kind,used);
  if(cat==="letters")return qLetters(kind,used);
  if(cat==="read")return qRead(kind,used);
  if(cat==="shapes")return qShapes(kind,used);
  if(cat==="people")return qPeople(kind,used);
  if(cat==="sky"&&Math.random()<.35)return Math.random()<.5?qSkyPic(used):qPlanet(used);
  return qWatcher(cat,used);
}

/* ================= a mound = one round of questions ================= */
let L=null;
function openMound(i){
  closeDrop();
  const p=dayPlan()[i],cat=p.cat;
  L={g:i,cat,correct:0,first:0,acorns:0,k:0,t0:Date.now(),queue:[]};
  if(cat==="paint"){L.paint=p.page%PAGES.length}
  else if(cat==="story"){const s=p.story%STORIES.length;L.queue=[{radio:s},...STORIES[s].q.map(x=>qStory(s,x.k))]}
  else{const ks=kindsFor(cat),used=new Set();let bag=[];let last=null;
    for(let n=0;n<p.count;n++){if(!bag.length)bag=sh(ks);let k=bag.shift();if(k===last&&bag.length){bag.push(k);k=bag.shift()}last=k;
      const q=buildQ(cat,k,used);q.cat=cat;q.kind=k;L.queue.push(q)}}
  L.total=L.queue.filter(q=>!q.radio).length;
  {const w=wkLog(),t=catById(cat).topic;if(!w.topics.includes(t))w.topics.push(t);S.lastTopic=t;save()}
  $("qResult").hidden=true;$("qSheet").className="qsheet";
  $("qDots").innerHTML=L.queue.filter(q=>!q.radio).map(()=>"<i></i>").join("");
  $("lesson").classList.add("open");$("lesson").setAttribute("aria-hidden","false");
  setTimeout(L.paint!==undefined?()=>paintGame(L.paint):nextQ,350);
}
function closeLesson(){hush();$("lesson").classList.remove("open");$("lesson").setAttribute("aria-hidden","true");$("qSheet").className="qsheet";setTimeout(()=>{$("qResult").hidden=true},400)}
$("lClose").onclick=()=>{sfx.tap();closeLesson();L=null};
function nextQ(){
  if(!L)return;hush();$("qSheet").className="qsheet";
  const q=L.queue.shift();if(!q)return moundDone();
  L.q=q;q.tries=0;q.locked=false;
  if(q.radio!==undefined)return radioQ(q.radio);
  const tints=sh([0,1,2,3]);
  const cc=CATS.find(c=>c.id===L.cat)||{};
  $("qBody").innerHTML=`<div class="qkick"><span class="qke">${cc.e||"⭐"}</span>${cc.name||""}</div><div class="qtop${(q.cap||"").length>30?" long":""}"><button class="qspk" id="qSpk" aria-label="Hear the question again"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>${q.cap?`<span class="cap">${q.cap}</span>`:""}</div>
    ${/^<div class="listen/.test(q.visual||"")&&!/radio/.test(q.visual)?"":`<div class="qvis">${q.visual}</div>`}
    <div class="qopts ${q.layout} ${/^<div class="listen/.test(q.visual||"")&&!/radio/.test(q.visual)?"tall":""}">${q.opts.map((o,j)=>`<button class="qo t${tints[j%4]}" data-j="${j}">${o.h}</button>`).join("")}</div>`;
  $("qSpk").onclick=()=>{sfx.tap();ask(q)};
  $("qBody").querySelectorAll(".qo").forEach(b=>b.onclick=()=>pick(+b.dataset.j,b));
  $("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in");
  if(q.flash)setTimeout(()=>{const f=$("qBody").querySelector(".flash");if(f)f.classList.add("hid")},2200);
  setTimeout(()=>{if(L&&L.q===q)ask(q)},350);
}
let askTok=0;
function ask(q,done){
  const tok=++askTok,bs=[...$("qBody").querySelectorAll(".qo")];
  const lit=j=>bs.forEach((b,k)=>b.classList.toggle("saying",k===j));
  const list=[{c:q.voice,j:-1},...q.opts.map((o,j)=>({c:(o.say||[]).filter(Boolean),j})).filter(x=>x.c.length)];
  let i=0;const step=()=>{if(tok!==askTok||!L||L.q!==q){lit(-1);return}
    if(i>=list.length){lit(-1);done&&done();return}
    const it=list[i++];lit(it.j);sayseq(it.c,()=>setTimeout(step,it.j<0?250:150))};
  step();
}
function setDot(){const d=$("qDots").children[L.k];if(d)d.className="on";L.k++}
function pick(j,b){
  const q=L.q;if(!q||q.locked)return;
  if(j===q.ans){
    q.locked=true;hush();b.classList.add("right");sfx.good();burstAt(b,40);
    const n=q.tries?1:2;S.acorns+=n;L.acorns+=n;L.correct++;if(!q.tries)L.first++;S.questions++;
    {const w=wkLog();w.q++;w.right++}save();renderStats();bump("sAcorns");setDot();
    L.row=(L.row||0)+1;if(L.row%3===0)dance();
    sheet("good",pickOne(PRAISE_T),`+${n} 🌰`);
    let gone=false;const go=()=>{if(!gone){gone=true;nextQ()}};
    sayseq([pickOne(PRAISE_CLIPS)],()=>setTimeout(go,500));setTimeout(go,3400);
    $("qNext").onclick=()=>{sfx.tap();go()};
    return;
  }
  q.tries++;L.row=0;sfx.oops();b.classList.add("wrong");setTimeout(()=>{b.classList.remove("wrong");b.classList.add("faded")},450);
  if(q.tries===1){
    q.locked=true;hush();toastHint(pickOne(["Almost! Try again 💪","So close! One more try","Let's look again 👀"]));
    sayseq(["w/LULU_TRY_ONCE"],()=>{q.locked=false;giveHint(q,()=>{})});
    return;
  }
  /* second miss: Domi shows the answer and explains, then we go on */
  q.locked=true;hush();S.questions++;{const w=wkLog();w.q++}save();setDot();
  const rb=$("qBody").querySelectorAll(".qo")[q.ans];rb.classList.add("show");
  sheet("learn","Let's learn it together!",q.exp.t);
  let gone=false;const go=()=>{if(!gone){gone=true;nextQ()}};
  $("qNext").onclick=()=>{sfx.tap();go()};
  sayseq(q.exp.v,()=>{});
}
function toastHint(t){const h=document.createElement("div");h.className="qhint";h.textContent=t;$("lesson").appendChild(h);setTimeout(()=>h.remove(),2300)}
function giveHint(q,done){
  const opts=[...$("qBody").querySelectorAll(".qo")];
  const elim=()=>{const w=opts.filter((b,j)=>j!==q.ans&&!b.classList.contains("faded"));if(opts.length>2&&w.length>1){const x=pickOne(w);x.classList.add("faded");x.disabled=true}};
  if(q.hint==="dots"&&q.a!==undefined&&q.a+q.b<=12){const e=pickOne(OBJ);$("qBody").querySelector(".qvis").insertAdjacentHTML("beforeend",`<div class="tgrp">${grp(q.a,e)}<span class="op">+</span>${grp(q.b,e)}</div>`);countAlong([...$("qBody").querySelectorAll(".tgrp .ob")],done);return}
  if(q.hint==="count"||q.hint==="dots"){
    let els=[...$("qBody").querySelectorAll(q.countSel?".qvis "+q.countSel:".qvis .ob")];
    if(!els.length)els=[...$("qBody").querySelectorAll(".qvis .dots")].flatMap(d=>{d.innerHTML=[...d.textContent].map(()=>"<i class='ob dot'>●</i>").join("");return [...d.querySelectorAll(".ob")]});
    if(!els.length&&q.layout==="row")els=[...$("qBody").querySelectorAll(".qo .ob")];
    if(els.length&&els.length<=20){countAlong(els,done);return}
  }
  if(q.hint==="clock"){const s=$("qBody").querySelector(".clk");if(s)s.classList.add("hintclk");elim();ask(q,done);return}
  if(q.hint==="coins"){$("qBody").querySelectorAll(".qvis svg[aria-label]").forEach(sv=>{const c=Object.values(COINS).find(x=>x.name===sv.getAttribute("aria-label"));if(c){const t=document.createElement("span");t.className="ctag";t.textContent=c.v+"¢";sv.after(t)}});ask(q,done);return}
  if(q.hint==="line"){const v=$("qBody").querySelector(".qvis");v.insertAdjacentHTML("beforeend",`<div class="nline">${Array.from({length:7},(x,i)=>q.line[0]-2+i).filter(x=>x>=0).map(x=>`<span class="${q.line.includes(x)?"hi":""}">${x}</span>`).join("")}</div>`);ask(q,done);return}
  if(q.hint==="again"){ask(q,done);return}
  elim();ask(q,done);
}
function countAlong(els,done){
  let i=0;const step=()=>{if(!L)return;if(i>=els.length){done();return}const e=els[i];e.classList.add("counted");e.setAttribute("data-n",i+1);sfx.count(i);i++;const c=N(i);if(c)say(c,()=>setTimeout(step,80));else setTimeout(step,450)};
  step();
}
function sheet(kind,title,sub){
  $("qSheet").innerHTML=`<div class="qsrow"><span class="qsf">${kind==="good"?"🎉":"💡"}</span><span><b>${title}</b><span>${sub}</span></span></div><button class="qbtn ${kind}" id="qNext">Next ➜</button>`;
  $("qSheet").className="qsheet show "+kind;
}
function dance(){
  const d=document.createElement("div");d.className="dance";d.innerHTML=`${bv(150)}<div class="tx">${pickOne(["Hop hop hooray!","3 in a row!","You rock!","Wow wow wow!"])}</div>`;
  $("lesson").appendChild(d);burst(120);setTimeout(()=>d.remove(),1900);
}
/* radio: Domi tells a short story with 5 voices, then asks questions */
function radioQ(s){
  const st=STORIES[s];
  $("qBody").innerHTML=`<div class="radio"><div class="rbox" id="rBox"><span class="rwave"></span><span class="remo">📻</span><span class="rwave r2"></span></div>
    <div class="rtitle">${ST_E[st.t]||""} ${st.t}</div>
    <div class="rbtns"><button class="qbtn sky" id="rPlay">↻ Again</button><button class="qbtn good" id="rDone" disabled>I'm ready! ➜</button></div></div>`;
  $("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in");
  const box=$("rBox"),done=$("rDone");
  const play=()=>{box.classList.add("on");sayseq(["w/LULU_ST_INTRO",...Array.from({length:st.lines},(x,i)=>`w/ST_S${st.s}_L${i}`)],()=>{box.classList.remove("on");done.disabled=false;done.classList.add("pulse")})};
  $("rPlay").onclick=()=>{sfx.tap();play()};
  done.onclick=()=>{sfx.tap();hush();nextQ()};
  setTimeout(play,400);setTimeout(()=>{done.disabled=false},30000);
}
function moundDone(){
  const i=L.g,first=i===S.day.done;
  if(first){S.day.done++;S.wood+=1;wkLog().mounds=(wkLog().mounds||0)+1}
  save();renderStats();
  const r=$("qResult");sfx.fanfare();burst(160);
  sayseq([pickOne(["w/LULU_L_END","w/LULU_PR_E","w/LULU_PR_D"])]);
  r.innerHTML=`<div class="rs-sun"></div><span class="dm">${bv(170)}</span><h2>${pickOne(["You did it!","Amazing job!","Super star!","Hooray!"])}</h2><p>${pickOne(["Domi is so proud of you!","Your brain is growing!","What a great learner!"])}</p>
    <div class="gains"><span class="gn a">+${L.acorns} 🌰</span>${first?`<span class="gn w">+1 🪵</span>`:""}</div>
    <button class="qbtn good big" id="resBtn">Continue ➜</button>`;
  r.hidden=false;
  const leave=()=>{closeLesson();L=null;setTimeout(()=>{renderMap();placeBeaver(true);setTimeout(()=>{scrollToCurrent(true);if(S.day.done>=HOLES[landIdx()].length&&!S.day.house)setTimeout(openHouse,900);else checkRealPrizes()},700)},420)};
  let moved=false;const go=()=>{if(!moved){moved=true;leave()}};
  $("resBtn").onclick=()=>{sfx.tap();go()};
}

/* ================= painting (this app only: big screens) ================= */
const PAINT_COLORS=[["red","#FF5A5F"],["orange","#FF9F40"],["yellow","#FFD43B"],["green","#51CF66"],["blue","#4DABF7"],["purple","#9775FA"],["pink","#F783AC"],["brown","#A0703C"],["black","#343A40"],["white","#FFFFFF"]];
/* each page: [name, emoji, [shapes]]; a shape is [svg tag + attributes] and every shape is one colourable area */
const PAGES=[
 ["Fish","🐟",['rect x="4" y="4" width="392" height="392" rx="30"','path d="M70 200 Q160 90 270 200 Q160 310 70 200Z"','path d="M262 200 L350 130 L340 200 L350 270Z"','path d="M150 150 Q175 110 210 140 Q180 150 170 165Z"','path d="M150 250 Q175 290 210 262 Q180 252 170 236Z"','circle cx="120" cy="190" r="16"','circle cx="300" cy="80" r="18"','circle cx="335" cy="40" r="11"','path d="M4 340 Q60 310 110 340 T210 340 T310 340 T396 340 L396 396 L4 396Z"']],
 ["House","🏠",['rect x="4" y="4" width="392" height="300" rx="30"','circle cx="320" cy="80" r="40"','rect x="4" y="300" width="392" height="96" rx="0"','rect x="90" y="180" width="220" height="150"','path d="M70 185 L200 80 L330 185Z"','rect x="255" y="95" width="32" height="60"','rect x="175" y="250" width="52" height="80" rx="8"','rect x="110" y="210" width="45" height="45"','rect x="245" y="210" width="45" height="45"']],
 ["Butterfly","🦋",['rect x="4" y="4" width="392" height="392" rx="30"','path d="M195 190 Q120 60 60 110 Q40 190 195 200Z"','path d="M205 190 Q280 60 340 110 Q360 190 205 200Z"','path d="M195 205 Q90 220 100 300 Q160 330 195 215Z"','path d="M205 205 Q310 220 300 300 Q240 330 205 215Z"','rect x="190" y="130" width="20" height="170" rx="10"','circle cx="115" cy="140" r="16"','circle cx="285" cy="140" r="16"','circle cx="140" cy="270" r="13"','circle cx="260" cy="270" r="13"']],
 ["Flower","🌸",['rect x="4" y="4" width="392" height="392" rx="30"','path d="M196 230 Q180 300 196 330 L204 330 Q220 300 204 230Z"','path d="M200 290 Q140 250 120 290 Q150 315 200 300Z"','path d="M200 280 Q260 240 280 280 Q250 305 200 292Z"','circle cx="200" cy="105" r="38"','circle cx="262" cy="145" r="38"','circle cx="240" cy="215" r="38"','circle cx="160" cy="215" r="38"','circle cx="138" cy="145" r="38"','circle cx="200" cy="160" r="34"','path d="M130 330 L270 330 L250 392 L150 392Z"']],
 ["Rocket","🚀",['rect x="4" y="4" width="392" height="392" rx="30"','path d="M200 40 Q250 90 250 160 L250 280 L150 280 L150 160 Q150 90 200 40Z"','circle cx="200" cy="160" r="26"','path d="M150 220 L105 290 L150 280Z"','path d="M250 220 L295 290 L250 280Z"','path d="M165 282 L235 282 L200 370Z"','path d="M70 70 l8 18 l20 2 l-15 13 l5 20 l-18 -10 l-18 10 l5 -20 l-15 -13 l20 -2z"','path d="M320 220 l7 15 l16 2 l-12 11 l4 16 l-15 -8 l-15 8 l4 -16 l-12 -11 l16 -2z"','circle cx="320" cy="90" r="22"']],
 ["Domi","🦫",['rect x="4" y="4" width="392" height="392" rx="30"','ellipse cx="300" cy="300" rx="44" ry="76" transform="rotate(-28 300 300)"','ellipse cx="200" cy="296" rx="92" ry="84"','ellipse cx="200" cy="304" rx="60" ry="60"','circle cx="116" cy="92" r="30"','circle cx="284" cy="92" r="30"','ellipse cx="200" cy="156" rx="110" ry="98"','ellipse cx="200" cy="196" rx="54" ry="40"','ellipse cx="156" cy="150" rx="22" ry="27"','ellipse cx="244" cy="150" rx="22" ry="27"','path d="M182 176 q18 -12 36 0 q-4 16 -18 18 q-14 -2 -18 -18z"','rect x="186" y="208" width="28" height="22" rx="4"']],
];
function paintSVG(pi,fills){
  const pg=PAGES[pi%PAGES.length],f=fills||[];
  return `<svg viewBox="0 0 400 400" class="psvg">${pg[2].map((t,k)=>`<${t} class="rg" data-k="${k}" fill="${f[k]||"#FFFFFF"}" stroke="#3B3A4A" stroke-width="5" stroke-linejoin="round"/>`).join("")}</svg>`;
}
function paintGame(pi){
  const pg=PAGES[pi],fills=[];let col=PAINT_COLORS[0][1];
  $("qDots").innerHTML="";
  $("qBody").innerHTML=`<div class="paint">
    <div class="pcanvas" id="pCanvas">${paintSVG(pi,fills)}</div>
    <div class="ppal" id="pPal">${PAINT_COLORS.map(([n,c],k)=>`<button class="pot${k===0?" on":""}" data-c="${c}" data-n="${n}" style="--c:${c}" aria-label="${n}"></button>`).join("")}</div>
    <div class="pbtns"><button class="qbtn sky" id="pClear">↺</button><button class="qbtn good" id="pDone" disabled>✓ ${pg[1]} Done!</button></div></div>`;
  $("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in");
  const n=pg[2].length;
  const upd=()=>{const k=fills.filter(Boolean).length;$("pDone").disabled=k<Math.ceil(n/2);$("pDone").classList.toggle("pulse",k>=Math.ceil(n/2))};
  $("pPal").querySelectorAll(".pot").forEach(b=>b.onclick=()=>{col=b.dataset.c;$("pPal").querySelectorAll(".pot").forEach(x=>x.classList.toggle("on",x===b));sfx.tap();sayseq(faSay(b.dataset.n))});
  const bindRegions=()=>$("pCanvas").querySelectorAll(".rg").forEach(r=>r.onclick=e=>{const k=+r.dataset.k;fills[k]=col;r.setAttribute("fill",col);r.classList.remove("pop");void r.getBoundingClientRect();r.classList.add("pop");sfx.pop();upd()});
  bindRegions();
  $("pClear").onclick=()=>{sfx.tap();fills.length=0;$("pCanvas").innerHTML=paintSVG(pi,fills);bindRegions();upd()};
  $("pDone").onclick=()=>{sfx.tap();hush();S.paintings.push({p:pi,f:fills.slice(),d:today()});if(S.paintings.length>24)S.paintings.shift();S.acorns+=3;L.acorns+=3;save();renderStats();burst(140);moundDone()};
  setTimeout(()=>sayseq(["w/PX_PAINT_INTRO"]),400);
}

/* ================= games from the Watcher Device library (pictures + Lulu's voice) ================= */
const PIC=(f,c="wp")=>`<img class="${c}" src="img/w/${f}.png" alt="">`;
const AN=[["bird","🐦"],["cow","🐄"],["duck","🦆"],["chicken","🐔"],["pig","🐷"],["shark","🦈"],["fox","🦊"],["dog","🐶"],["frog","🐸"],["bee","🐝"],["caterpillar","🐛"],["cat","🐱"],["bat","🦇"],["snake","🐍"]];
const HOMES=["nest","barn","pond","doghouse","house","hive","tree","cave","den","sea","rocks"];
const FOODS=["worms","grass","seeds","bone","fish","flies","flowers","leaves","mosquitoes","apples","mice","eggs","corn"];
const HOME_OF={bird:["nest","tree"],cow:["barn"],duck:["pond","nest"],chicken:["barn","nest"],pig:["barn"],shark:["sea"],fox:["den","cave"],dog:["doghouse","house"],frog:["pond"],bee:["hive","tree"],caterpillar:["tree"],cat:["house"],bat:["cave","tree"],snake:["rocks","cave"]};
const FOOD_OF={bird:["worms","seeds"],cow:["grass","corn"],duck:["seeds","flies"],chicken:["corn","seeds","worms"],pig:["apples","corn","grass"],shark:["fish"],fox:["mice","eggs","apples"],dog:["bone","fish"],frog:["flies","mosquitoes"],bee:["flowers"],caterpillar:["leaves","flowers"],cat:["fish","mice","eggs"],bat:["mosquitoes","flies"],snake:["eggs","mice"]};
const SOUNDS=["cow","dog","cat","duck","pig","frog","bee","snake","chicken"];
const anSay=n=>{const i=AN.findIndex(a=>a[0]===n);return ["w/LULU_FA_AN"+i,...enSay(n)]};
const anOpt=n=>({h:`<span class="oe big">${AN.find(a=>a[0]===n)[1]}</span>`,say:anSay(n)});
function pick3(right,pool,used,key){const w=sh(pool.filter(x=>!right.includes(x))).slice(0,2),r=pickOne(right);const o=sh([r,...w]);return {o,ans:o.indexOf(r),r}}
function freshAnimal(used,ok){const c=sh(AN.map(a=>a[0]).filter(ok));return c.find(n=>!used.has("an_"+n))||c[0]}
function qFarm(k,used){
  if(k==="home"||k==="food"){const n=freshAnimal(used,x=>true);used.add("an_"+n);const L2=k==="home"?HOMES:FOODS,R2=(k==="home"?HOME_OF:FOOD_OF)[n],{o,ans,r}=pick3(R2,L2);
    const say=x=>k==="home"?["w/LULU_FA_HOME"+HOMES.indexOf(x),...enSay(x)]:["w/LULU_FA_FOOD"+FOODS.indexOf(x),...enSay(x)];
    return {voice:[...anSay(n),k==="home"?"w/LULU_AN_HOME":"w/LULU_AN_FOOD"],cap:k==="home"?`Where does the ${n} live?`:`What does the ${n} eat?`,visual:`<div class="bigemo">${AN.find(a=>a[0]===n)[1]}</div>`,
      opts:o.map(x=>({h:PIC((k==="home"?"home_":"food_")+L2.indexOf(x),"wp op")+`<small>${x}</small>`,say:say(x)})),ans,layout:"row3",hint:"elim",exp:{t:`${n} → ${r}`,v:["w/LULU_ANS_IS",...say(r)]}}}
  if(k==="sound"){const n=sh(SOUNDS).find(x=>!used.has("snd_"+x))||SOUNDS[0];used.add("snd_"+n);const o=sh([n,...sh(SOUNDS.filter(x=>x!==n)).slice(0,2)]);
    return {voice:["w/LULU_SND_WHO","w/LULU_EN_SOUND"+SOUNDS.indexOf(n)],cap:"Who says that?",visual:`<div class="listen">🔊</div>`,opts:o.map(anOpt),ans:o.indexOf(n),layout:"row3",hint:"elim",exp:{t:n,v:["w/LULU_ANS_IS",...anSay(n)]}}}
  const set=k==="fly"?["bird","duck","bee","bat"]:["duck","shark","frog"],non=AN.map(a=>a[0]).filter(x=>!set.includes(x)&&(k!=="fly"||x!=="chicken")),r=pickOne(set),o=sh([r,...sh(non).slice(0,2)]);
  return {voice:[k==="fly"?"w/LULU_AN_FLY":"w/LULU_AN_WATER"],cap:k==="fly"?"Who can fly?":"Who lives in the water?",visual:`<div class="bigemo">${k==="fly"?"🪽":"💧"}</div>`,opts:o.map(anOpt),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:r,v:["w/LULU_ANS_IS",...anSay(r)]}};
}
const SHAPES=["Circle","Square","Triangle","Rectangle","Star","Oval","Rhombus","Trapezoid","Pentagon","Hexagon","Octagon","Parallelogram","Cube","Cylinder","Sphere","Cone","Pyramid","Rectangular prism"];
const shSay=i=>["w/LULU_SHF"+i,"w/LULU_EN_SH"+i];
const COLS=[["Red","#FF5A5F",["🍎","🍓","🚒","🌹"]],["Blue","#4DABF7",["🐳","🫐","🧢","💙"]],["Yellow","#FFD43B",["🍌","🌻","🐥","⭐"]],["Green","#51CF66",["🐸","🥦","🌲","🍀"]],["Orange","#FF9F40",["🍊","🥕","🎃","🦊"]],["Purple","#9775FA",["🍇","🍆","🔮","🦄"]],["Pink","#F783AC",["🌸","🐷","🦩","🍬"]],["Brown","#A0703C",["🐻","🍫","🌰","🪵"]],["Black","#343A40",["🎱","🐜","🕶️","🐈‍⬛"]],["White","#FFFFFF",["☁️","🐑","⚪","🦷"]]];
const colSay=i=>["w/PX_FA_"+COLS[i][0].toUpperCase(),"w/LULU_COLOR"+i];
const PAT=[["🍎","🍌"],["⭐","🌙"],["🐶","🐱"],["🔴","🔵"],["🌸","🍀"],["🚗","🚲"]];
function qShapes(k,used){
  const a=lvl();
  if(k==="shape"){const max=a<=6?6:a<=7?12:18,c=sh([...Array(max).keys()]),r=c.find(i=>!used.has("sh"+i));used.add("sh"+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,2)]);
    return {voice:["w/LULU_SH_FIND",...shSay(r)],cap:`Find the ${SHAPES[r].toLowerCase()}!`,visual:`<div class="listen">🔷</div>`,opts:o.map(i=>({h:PIC("shape_"+i,"wp op"),say:shSay(i)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:SHAPES[r],v:["w/LULU_ANS_IS",...shSay(r)]}}}
  if(k==="color"){const c=sh([...Array(a<=5?8:10).keys()]),r=c.find(i=>!used.has("col"+i));used.add("col"+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,2)]);
    return {voice:["w/LULU_COL_WHAT"],cap:"What colour is it?",visual:`<div class="bigemo">${pickOne(COLS[r][2])}</div>`,opts:o.map(i=>({h:`<span class="swatch" style="--c:${COLS[i][1]}"></span><small>${COLS[i][0]}</small>`,say:colSay(i)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:COLS[r][0],v:["w/LULU_ANS_IS",...colSay(r)]}}}
  if(k==="bigsmall"){const e=pickOne(OBJ),big=Math.random()<.5,o=sh([0,1]),r=big?0:1;
    return {voice:[big?"w/LULU_CP_BIG":"w/LULU_CP_SMALL"],cap:big?"Which is bigger?":"Which is smaller?",visual:`<div class="bigemo soft">${big?"🐘":"🐭"}</div>`,opts:o.map(i=>({h:`<span class="oe" style="font-size:${i===0?72:30}px">${e}</span>`})),ans:o.indexOf(r),layout:"row",hint:"elim",exp:{t:big?"The big one!":"The small one!",v:["w/LULU_ANS_IS"]}}}
  /* pattern: what comes next? */
  const [x,y]=sh(PAT).find(p=>!used.has("pt"+p[0]))||PAT[0];used.add("pt"+x);const kind=a<=5?0:ri(0,2);
  const seq=kind===0?[x,y,x,y,x]:kind===1?[x,x,y,x,x]:[x,y,y,x,y],next=kind===0?y:kind===1?y:y,ans3=sh([x,y,pickOne(OBJ.filter(z=>z!==x&&z!==y))]);
  return {voice:["w/LULU_PT_NEXT"],cap:"What comes next?",visual:`<div class="pat">${seq.map(e=>`<span>${e}</span>`).join("")}<span class="q">?</span></div>`,opts:ans3.map(e=>({h:`<span class="oe big">${e}</span>`})),ans:ans3.indexOf(next),layout:"row3",hint:"elim",exp:{t:seq.join(" ")+" "+next,v:["w/LULU_ANS_IS"]}};
}
const COUNTRIES=[["Iran","🇮🇷"],["the United States","🇺🇸"],["Canada","🇨🇦"],["Mexico","🇲🇽"],["Brazil","🇧🇷"],["the United Kingdom","🇬🇧"],["France","🇫🇷"],["Germany","🇩🇪"],["Italy","🇮🇹"],["China","🇨🇳"],["Japan","🇯🇵"],["India","🇮🇳"],["Egypt","🇪🇬"],["Australia","🇦🇺"]];
const JOBS=[["Doctor","🧑‍⚕️"],["Firefighter","🧑‍🚒"],["Police officer","👮"],["Chef","🧑‍🍳"],["Farmer","🧑‍🌾"],["Teacher","🧑‍🏫"],["Pilot","🧑‍✈️"],["Astronaut","🧑‍🚀"],["Mechanic","🧑‍🔧"],["Scientist","🧑‍🔬"],["Artist","🧑‍🎨"],["Builder","👷"]];
const ctySay=i=>["w/LULU_FA_CTY"+i,"w/LULU_EN_COUNTRY"+i],jobSay=i=>["w/LULU_FA_JOB"+i,"w/LULU_EN_JOB"+i];
function qPeople(k,used){
  const flag=k.startsWith("flag"),L2=flag?COUNTRIES:JOBS,c=sh([...L2.keys()]),r=c.find(i=>!used.has(k[0]+i));used.add(k[0]+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,2)]),say=flag?ctySay:jobSay;
  return {voice:[flag?"w/LULU_GEO_FIND":"w/LULU_JOB_FIND",...say(r)],cap:flag?`Find the flag of ${L2[r][0]}`:`Find the ${L2[r][0].toLowerCase()}`,visual:`<div class="listen">${flag?"🚩":"👀"}</div>`,
    opts:o.map(i=>({h:`<span class="oe big">${L2[i][1]}</span>`,say:say(i)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:L2[r][0],v:["w/LULU_ANS_IS",...say(r)]}};
}
const SKYN=["sun","moon","star","cloud","rain","rainbow","lightning","snow","rocket","astronaut","telescope","galaxy","comet","satellite","planet","full moon"];
const skySay=n=>{const i=SKYN.indexOf(n);const fa=n==="sun"?["w/LULU_FA_PL0"]:n==="full moon"?faSay("full moon"):i>0&&i<15?["w/LULU_FA_SKY"+i]:[];return fa.concat(n==="sun"?["w/LULU_PL0"]:enSay(n==="galaxy"?"milky way":n))};
const SKYQ=[["w/LULU_SK_NIGHT",["moon","star","full moon"],["sun","rainbow"]],["w/LULU_SK_DAY",["sun"],["star","galaxy","comet"]],["w/LULU_SK_RAIN",["cloud"],["sun","star","moon","rocket"]],["w/LULU_SK_COLD",["snow"],["sun","rainbow","lightning"]],["w/LULU_SK_SPACE",["rocket","satellite"],["cloud","rain","rainbow","snow"]],["w/LULU_SK_ASTRONAUT",["astronaut"],["cloud","rainbow","snow","telescope"]],["w/LULU_SK_AFTER_RAIN",["rainbow"],["snow","comet","star","rocket"]],["w/LULU_SK_LOOK",["telescope"],["rocket","satellite","cloud"]],["w/LULU_SK_GALAXY",["galaxy"],["planet","full moon","comet","cloud"]]];
function qSkyPic(used){
  const i=sh([...SKYQ.keys()]).find(j=>!used.has("skq"+j));if(i===undefined)return qWatcher("sky",used);used.add("skq"+i);
  const [clip,R2,W]=SKYQ[i],r=pickOne(R2),o=sh([r,...sh(W).slice(0,2)]);
  return {voice:[clip],cap:"",visual:`<div class="listen">🌌</div>`,opts:o.map(n=>({h:PIC("sky_"+SKYN.indexOf(n),"wp op"),say:skySay(n)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:r,v:["w/LULU_ANS_IS",...skySay(r)]}};
}
function qPlanet(used){
  const c=sh([...PLANET_N.keys()]),r=c.find(i=>!used.has("pl"+i));if(r===undefined)return qWatcher("sky",used);used.add("pl"+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,2)]);
  const plSay=i=>i===0?["w/LULU_FA_PL0","w/LULU_YA","w/LULU_PL0"]:["w/LULU_FA_PL"+i,"w/LULU_YA","w/LULU_PL"+i];
  return {voice:["w/LULU_SK_WHICH"],cap:"What is this?",visual:PIC("pl_"+r,"wp big"),opts:o.map(i=>({h:`<span class="oe">🪐</span><small>${PLANET_N[i][0].toUpperCase()+PLANET_N[i].slice(1)}</small>`,say:plSay(i)})),ans:o.indexOf(r),layout:"col",hint:"elim",exp:{t:PLANET_N[r],v:["w/LULU_ANS_IS",...plSay(r)]}};
}

/* ================= letters, words and reading (from the shared pool, 'in the games' only) ================= */
const POOL=__POOL__;
const WORD_FALLBACK="bird honey cow cake rainbow key baby salad sun star balloon bed duck socks ten tree chicken bus cab mad bag ham fan map web leg hen jet bib lid pig fin lip hit mix pod log mom mop hot fox tub mud mug gum cut dog frog box bee bug cat hat bat car snake truck net can cap pin ship nut".split(" ");
const WORDS=POOL.words.map(x=>({i:x.i,w:(x.w||WORD_FALLBACK[x.i]||"").toLowerCase()})).filter(x=>x.w&&!["mad","hit","mix","cut","mom"].includes(x.w));
const LET="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lSay=l=>["w/LULU_LN_"+l];
const wSay=x=>["w/LULU_WORD"+x.i];
function pickWord(used){const c=sh(WORDS);return c.find(x=>!used.has("wd"+x.i))||c[0]}
function qLetters(k,used){
  if(k==="abc"){const it=sh(POOL.abc).find(x=>!used.has("abc"+x.l))||POOL.abc[0];used.add("abc"+it.l);const o=sh([it.l,...sh(POOL.abc.map(x=>x.l).filter(l=>l!==it.l)).slice(0,2)]);
    return {voice:[...lSay(it.l),...enSay(it.w),...lSay(it.l)],cap:"Find the letter!",visual:`<div class="bigemo">${WORD_E[it.w]||optE(it.w)||"🔤"}</div>`,opts:o.map(l=>({h:`<b class="num letter">${l}</b>`,say:lSay(l)})),ans:o.indexOf(it.l),layout:"row3",hint:"elim",exp:{t:it.l,v:["w/LULU_ANS_IS",...lSay(it.l)]}}}
  if(k==="lafter"||k==="lbefore"){const i=k==="lafter"?ri(0,24):ri(1,25),r=LET[k==="lafter"?i+1:i-1],o=sh([r,...sh(LET.split("").filter(l=>l!==r&&l!==LET[i])).slice(0,2)]);
    return {voice:[k==="lafter"?"w/LULU_AB_AFTER":"w/LULU_AB_BEFORE",...lSay(LET[i])],cap:k==="lafter"?`${LET[i]} → ?`:`? → ${LET[i]}`,visual:`<div class="seq">${k==="lafter"?`<b class="bignum sm">${LET[i]}</b><span class="arr">➜</span><b class="bignum sm q">?</b>`:`<b class="bignum sm q">?</b><span class="arr">➜</span><b class="bignum sm">${LET[i]}</b>`}</div>`,opts:o.map(l=>({h:`<b class="num letter">${l}</b>`,say:lSay(l)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:r,v:["w/LULU_ANS_IS",...lSay(r)]}}}
  const x=pickWord(used);used.add("wd"+x.i);const o=sh([x,...sh(WORDS.filter(y=>y.i!==x.i)).slice(0,2)]);
  if(k==="listen")   /* hear the English word, tap its picture (the pictures are not named, that is the game) */
    return {voice:["w/LULU_W_LISTEN",...wSay(x)],cap:"Listen and find it!",visual:`<div class="listen">👂</div>`,opts:o.map(y=>({h:PIC("wd_"+y.i,"wp op")})),ans:o.indexOf(x),layout:"row3",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x)]}};
  if(k==="first"){const r=x.w[0].toUpperCase(),lo=sh([r,...sh(LET.split("").filter(l=>l!==r)).slice(0,2)]);
    return {voice:["w/LULU_W_FIRST",...wSay(x)],cap:"First letter?",visual:PIC("wd_"+x.i,"wp big"),opts:lo.map(l=>({h:`<b class="num letter">${l}</b>`,say:lSay(l)})),ans:lo.indexOf(r),layout:"row3",hint:"elim",exp:{t:`${r} … ${x.w}`,v:["w/LULU_ANS_IS",...lSay(r),...wSay(x)]}}}
  return {voice:["w/LULU_SK_WHICH"],cap:"What is it?",visual:PIC("wd_"+x.i,"wp big"),opts:o.map(y=>({h:`<b class="word">${y.w}</b>`,say:wSay(y)})),ans:o.indexOf(x),layout:"col",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x)]}};
}
/* reading: the answers are NOT read aloud, the child reads them */
function qRead(k,used){
  if(k==="sentence"){const st=sh(POOL.sents).find(x=>!used.has(x.id))||POOL.sents[0];used.add(st.id);const o=sh(st.o.slice());
    return {voice:["w/LULU_RD_SENTENCE"],cap:"",visual:`<div class="sent">${st.q.replace("___",'<span class="gap">?</span>')}</div>`,opts:o.map(w=>({h:`<b class="word">${w}</b>`})),ans:o.indexOf(st.a),layout:"row3",hint:"elim",exp:{t:st.q.replace("___",st.a),v:["w/LULU_ANS_IS"]}}}
  const pool=POOL.sight.slice(0,lvl()<=5?30:lvl()<=6?60:100),x=sh(pool).find(y=>!used.has("sw"+y.i))||pool[0];used.add("sw"+x.i);
  const o=sh([x,...sh(pool.filter(y=>y.i!==x.i&&y.w[0]!==x.w[0])).slice(0,2)]);
  if(k==="flash")return {voice:["w/LULU_RD_FLASH"],cap:"Look! Then find it.",visual:`<div class="flash"><b class="word big">${x.w}</b></div>`,opts:o.map(y=>({h:`<b class="word">${y.w}</b>`})),ans:o.indexOf(x),layout:"row3",hint:"elim",flash:true,exp:{t:x.w,v:["w/LULU_ANS_IS","w/LULU_SIGHT"+x.i]}};
  return {voice:["w/LULU_RD_BALLOON","w/LULU_SIGHT"+x.i],cap:"Pop the balloon!",visual:`<div class="listen">🎈</div>`,opts:o.map(y=>({h:`<span class="balloon"><b class="word">${y.w}</b></span>`})),ans:o.indexOf(x),layout:"row3",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS","w/LULU_SIGHT"+x.i]}};
}

/* ================= each player picks their own Domi (5 beavers) ================= */
const DOMIS=[["Button",1],["Honey",2],["Leafy",3],["Mochi",4],["Hello",5]];
function domiSrc(){let n=1;try{n=(curPlayer().domi)||1}catch(e){}return `img/domi_${n}.svg`}
function paintDomi(){document.querySelectorAll("img.talk,.bv img").forEach(i=>i.src=domiSrc())}
function domiPicker(){const cur=(curPlayer().domi)||1;
  return `<p class="dh">Pick your Domi</p><div class="domis">`+DOMIS.map(([n,i])=>`<button class="dpick ${i===cur?"on":""}" data-domi="${i}" aria-label="Domi ${n}"><img src="img/domi_${i}.svg" alt=""></button>`).join("")+`</div>`}
function wireDomi(){document.querySelectorAll("[data-domi]").forEach(b=>b.onclick=e=>{e.stopPropagation();const p=curPlayer();p.domi=+b.dataset.domi;savePlayers();sfx.tap();
  document.querySelectorAll("[data-domi]").forEach(x=>x.classList.toggle("on",x===b));paintDomi()})}
setTimeout(paintDomi,0);
