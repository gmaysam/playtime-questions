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
function enSay(word){const w=String(word).toLowerCase().trim();if(/^\d+$/.test(w))return +w>=1&&+w<=100?["w/LULU_EN"+(+w)]:[];if(PLANET_N.includes(w))return [];if(DINOS.includes(w))return EN_SAY[w]?["w/"+EN_SAY[w]]:[];
  const c=EN_SAY[w]||EN_SAY[w.replace(/s$/,"")]||EN_SAY[w+"s"];return c?["w/"+c]:[]}
const faNum=n=>n<=20?[N(n)]:n%10===0||n===100?["w/PX_FA_"+n]:[n<30?N(20):"w/PX_FA_"+(n-n%10),"w/PX_VA",N(n%10)];
const both=word=>(/^\d+$/.test(String(word))&&+word>20&&+word<=100?faNum(+word):faSay(word)).concat(enSay(word));
function faSay(word){
  const w=String(word).toLowerCase().trim();
  if(/^\d+$/.test(w))return [N(+w)];
  if(DINOS.includes(w))return [];                                  /* dinosaurs: the English name is enough */
  const pi=PLANET_N.indexOf(w);if(pi>0)return ["w/LULU_FA_PL"+pi,"w/LULU_YA","w/LULU_PL"+pi];   /* "Moshtari ya Jupiter" */
  const c=FA_SAY[w]||FA_SAY[w.replace(/s$/,"")]||FA_SAY[w+"s"];return c?["w/"+c]:[];
}
const PRAISE_CLIPS=["w/LULU_PR_A","w/LULU_PR_B","w/LULU_PR_C","w/LULU_PR_D","w/LULU_PR_E","w/LULU_PR_F","w/LULU_BD_RIGHT"];  /* only clips whose words we know: no stars, no prizes */
const PRAISE_T=["Yay!","Super!","Woohoo!","Amazing!","Brilliant!","Great job!","Fantastic!","Hooray!","So smart!","Wow!"];
const OBJ=["🍎","🐟","⭐","🦆","🌸","🍓","🐞","🎈","🍪","🐣","🧁","🦋"];
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const lvl=()=>Math.max(3,Math.min(10,S.age+(S.diff-1)));
const DK=()=>3;   /* always 4 answers in a 2 x 2 grid (owner, Nov 8) */   /* wrong answers per question: 4 answers in a 2 x 2 grid from age 4, 2 big answers at age 3 */

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
function numOpts(right,cands,k=DK()+1){const w=sh([...new Set(cands.filter(x=>x!==right&&x>=0&&(x<=100||right>100)))]).slice(0,k-1),o=sh([right,...w]);return {opts:o.map(numOpt),ans:o.indexOf(right)}}
const near=n=>[n-1,n+1,n+2,n-2,n+3];

/* ---------- categories: each mound of the day is one category; a day never repeats one in a row ---------- */
const CATS=[
 {id:"count",topic:"math",e:"🔢",name:"Counting"},
 {id:"add",topic:"math",e:"➕",name:"Adding & taking away"},
 {id:"clock",topic:"clock",e:"🕒",name:"Clock & time"},
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
  /* age ladder (Khan Kids / PBS Kids style): 3 = 2 choices, pictures, count to 5 · 4-5 = 3 choices, to 10 · 6 = words, to 100 by tens · 7-8 = two steps, near-miss traps */
  if(cat==="count")return a<=3?["find","more","less","long"]:a<=4?["find","more","less","long","order"]:a<=5?["find","more","less","missing","long","order"]:a<=6?["after","before","missing","skip","order"]:["missing","skip","graph","after","order"];
  if(cat==="add")return a<=3?["addPic","share"]:a<=4?["addPic","subPic","share"]:a<=5?["addPic","subPic","left","share","pizza"]:a<=6?["sum","minus","left","teach","pizza"]:a<=7?["carry","groups","share","minus","pizza"]:["carry","groups","share","big","pizza"];
  if(cat==="clock")return a<=5?["routine","oclock"]:a<=6?["routine","oclock","half","season","nowseason"]:a<=7?["half","quarter","season","today","tomorrow","week"]:["quarter","minutes","after","before","monthafter","yesterday","months"];
  if(cat==="money")return a<=5?["pennies","value"]:a<=6?["pennies","value","count"]:a<=7?["value","count","same"]:["count","same","change"];
  if(cat==="letters")return a<=4?["abc","listen","match","rhyme"]:a<=6?["listen","first","abc","whatis","lafter","match","rhyme","build"]:["listen","first","whatis","lafter","lbefore","match","build"];
  if(cat==="read")return a<=5?["balloon","flash"]:["balloon","flash","sentence"];
  if(cat==="farm")return a<=4?["home","sound","fly","match","pairs"]:["home","food","sound","fly","water","match","pairs"];
  if(cat==="shapes")return a<=4?["shape","color","pattern","match","robot","simon"]:a<=6?["shape","sides","both","pattern","match","robot","simon"]:["sides","both","pattern","bigsmall","match","robot","simon"];
  if(cat==="people")return a<=5?["feel","job","job2"]:["feel","flag","job","flag2","job2"];
  return ["w"];
}
const MAXN=()=>{const a=lvl();return a<=4?5:a<=5?10:a<=6?20:100};

/* ---------- builders ---------- */
function qCount(k){
  const mx=Math.min(MAXN(),20),e=pickOne(OBJ);
  if(k==="find"){const n=ri(2,Math.min(mx,10)),c=sh([n,...sh(near(n).filter(x=>x>=1&&x<=12&&x!==n)).slice(0,DK())]);
    return {voice:["w/LULU_C_FIND",N(n)],cap:`Find ${n}`,visual:`<div class="bignum">${n}</div>`,opts:c.map(x=>({h:grp(x,e),say:both(x)})),ans:c.indexOf(n),layout:"col",hint:"elim",exp:{t:`${n}`,v:["w/LULU_ANS_IS"]}}}
  if(k==="more"||k==="less"){let a=ri(1,Math.min(mx,9)),b;do{b=ri(1,Math.min(mx,9))}while(b===a||Math.abs(a-b)>4);let o=[a,b];
    if(true){const pool=sh([...Array(Math.min(mx,9)).keys()].map(x=>x+1).filter(x=>!o.includes(x)));o=sh([...o,...pool.slice(0,2)])}
    const r=k==="more"?Math.max(...o):Math.min(...o);
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
      visual:`<div class="domisays">${bv(78)}<div class="bub"><b>${a} ${op} ${b} = ${shown}</b></div></div>`,opts:[{h:"<span class='yn'>✅</span><small>True</small>",say:["w/LULU_SK_YES"]},{h:"<span class='yn'>❌</span><small>Not true</small>",say:["w/LULU_SK_NO"]}],ans:ok?0:1,layout:"yn",hint:"dots",a,b,
      exp:{t:`${a} ${op} ${b} = ${r}`,v:[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS",N(r)]}}}
  return Object.assign({voice:spoken?[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS"]:["q_choose"],cap:"",visual:eq,layout:"row3",hint:spoken&&r<=10?"dots":"elim",
    exp:{t:`${a} ${op} ${b} = ${r}`,v:spoken?[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS",N(r)]:["w/LULU_ANS_IS"]}},numOpts(r,near(r).concat([r+10,r-10])));
}
const dig=(h,m)=>`${h}:${String(m).padStart(2,"0")}`;
const DAYS_EN=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],MONTHS_EN=["January","February","March","April","May","June","July","August","September","October","November","December"],SEAS=["Spring","Summer","Fall","Winter"];
const daySay=i=>["w/LULU_FA_DAY"+i,"w/LULU_EN_DAY"+i],seaSay=i=>["w/LULU_FA_SEA"+i,"w/LULU_EN_SEASON"+i],SEA_E=["🌸","☀️","🍂","⛄"];
/* every day and month gets its own look, so the answers never look the same */
const DAY_C=["#FF8A80","#FFB74D","#FFD54F","#81C784","#4FC3F7","#7986CB","#BA68C8"];
const MON_E=["⛄","💝","🌱","🌧️","🌷","☀️","🏖️","🍉","🍎","🎃","🍂","🎄"];
function dayOpts(r){const o=sh([r,...sh([0,1,2,3,4,5,6].filter(x=>x!==r)).slice(0,DK())]);return {opts:o.map(i=>({h:`<span class="dayb" style="--c:${DAY_C[i]}">${DAYS_EN[i].slice(0,2)}</span><small class="dn">${DAYS_EN[i]}</small>`,say:daySay(i)})),ans:o.indexOf(r)}}
function qCal(k){
  const t=(new Date().getDay()+6)%7,m=new Date().getMonth(),sea=[3,3,0,0,0,1,1,1,2,2,2,3][m];
  if(k==="today")return Object.assign({voice:["w/LULU_CA_TODAY"],cap:"What day is today?",visual:`<div class="bigemo">📅</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[t],v:["w/LULU_ANS_IS",...daySay(t)]}},dayOpts(t));
  if(k==="tomorrow")return Object.assign({voice:["w/LULU_CA_TOMORROW"],cap:"What day is tomorrow?",visual:`<div class="bigemo">🌅</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[(t+1)%7],v:["w/LULU_ANS_IS",...daySay((t+1)%7)]}},dayOpts((t+1)%7));
  if(k==="yesterday")return Object.assign({voice:["w/LULU_CA_YESTERDAY"],cap:"What day was yesterday?",visual:`<div class="bigemo">🌙</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[(t+6)%7],v:["w/LULU_ANS_IS",...daySay((t+6)%7)]}},dayOpts((t+6)%7));
  if(k==="after"){const d=ri(0,6);return Object.assign({voice:["w/LULU_CA_DAY_AFTER",...daySay(d)],cap:`${DAYS_EN[d]} → ?`,visual:`<div class="daycard">${DAYS_EN[d]}</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[(d+1)%7],v:["w/LULU_ANS_IS",...daySay((d+1)%7)]}},dayOpts((d+1)%7))}
  if(k==="before"){const d=ri(0,6);return Object.assign({voice:["w/LULU_CA_DAY_BEFORE",...daySay(d)],cap:`? → ${DAYS_EN[d]}`,visual:`<div class="daycard">${DAYS_EN[d]}</div>`,layout:"col",hint:"elim",exp:{t:DAYS_EN[(d+6)%7],v:["w/LULU_ANS_IS",...daySay((d+6)%7)]}},dayOpts((d+6)%7))}
  if(k==="monthafter"){const mo=ri(0,11),r=(mo+1)%12,o=sh([r,...sh([...Array(12).keys()].filter(x=>x!==r&&x!==mo)).slice(0,DK())]),mSay=i=>["w/LULU_FA_MON"+i,"w/LULU_EN_MONTH"+i];
    return {voice:["w/LULU_CA_MONTH_AFTER",...mSay(mo)],cap:`${MONTHS_EN[mo]} → ?`,visual:`<div class="daycard">${MONTHS_EN[mo]}</div>`,opts:o.map(i=>({h:`<span class="oe">${MON_E[i]}</span><small class="dn">${MONTHS_EN[i]}</small>`,say:mSay(i)})),ans:o.indexOf(r),layout:"col",hint:"elim",exp:{t:MONTHS_EN[r],v:["w/LULU_ANS_IS",...mSay(r)]}}}
  if(k==="nowseason"){const o=sh([0,1,2,3]);return {voice:["w/LULU_CA_NOW_SEASON"],cap:"Which season is it now?",visual:`<div class="bigemo">🗓️</div>`,opts:o.map(i=>({h:`<span class="oe">${SEA_E[i]}</span><small>${SEAS[i]}</small>`,say:seaSay(i)})),ans:o.indexOf(sea),layout:"grid",hint:"elim",exp:{t:SEAS[sea],v:["w/LULU_ANS_IS",...seaSay(sea)]}}}
  if(k==="week")return Object.assign({voice:["w/LULU_CA_WEEK_DAYS"],cap:"How many days in a week?",visual:`<div class="bigemo">📆</div>`,layout:"row3",hint:"elim",exp:{t:"7",v:["w/LULU_ANS_IS",N(7)]}},numOpts(7,[5,10,6,8]));
  return Object.assign({voice:["w/LULU_CA_YEAR_MONTHS"],cap:"How many months in a year?",visual:`<div class="bigemo">🗓️</div>`,layout:"row3",hint:"elim",exp:{t:"12",v:["w/LULU_ANS_IS",N(12)]}},numOpts(12,[10,7,14]));
}
function qClock(k){
  if(["today","tomorrow","yesterday","after","before","monthafter","nowseason","week","months"].includes(k))return qCal(k);
  if(k==="routine"){const r=pickOne(ROUTINES.filter(x=>!["☀️","🌙"].includes(x[0])));  /* never show the sun or moon: they are the answers */return {voice:["c_routine"],cap:"Morning or night?",visual:`<div class="bigemo">${r[0]}</div>`,opts:[{h:"<span class='yn'>☀️</span><small>Morning</small>",say:both("morning")},{h:"<span class='yn'>🌙</span><small>Night</small>",say:both("night")}],ans:r[2],layout:"yn",hint:"elim",exp:{t:r[2]?"Night 🌙":"Morning ☀️",v:["w/LULU_ANS_IS"]}}}
  if(k==="season"){const sz=pickOne(SEASONS),SE={Winter:"❄️",Spring:"🌷",Summer:"🌞",Autumn:"🍁"},o=sh(["Winter","Spring","Summer","Autumn"]);
    return {voice:["c_season"],cap:"Which season?",visual:`<div class="bigemo">${sz[0]}</div>`,opts:o.map(x=>({h:`<span class="oe">${SE[x]}</span><small>${x}</small>`,say:seaSay(["Spring","Summer","Autumn","Winter"].indexOf(x))})),ans:o.indexOf(sz[2]),layout:"grid",hint:"elim",exp:{t:sz[2],v:["w/LULU_ANS_IS"]}}}
  const h=ri(1,12),m=k==="oclock"?0:k==="half"?30:k==="quarter"?pickOne([15,45]):ri(1,11)*5;
  const w=[dig(hh(h+1),m),dig(hh(h-1),m),dig(h,m===30?0:30),dig(h,(m+15)%60)];
  const o=sh([dig(h,m),...sh([...new Set(w.filter(x=>x!==dig(h,m)))]).slice(0,DK())]);
  return {voice:["c_read"],cap:"What time is it?",visual:clockSVG(h,m),opts:o.map(x=>({h:`<b class="num t">${x}</b>`,say:(([hh2,mm2])=>[N(+hh2),"w/LULU_EN"+(+hh2)].concat(+mm2?["w/LULU_EN"+(+mm2)]:[]))(x.split(":"))})),ans:o.indexOf(dig(h,m)),layout:"row3",hint:"clock",exp:{t:`${dig(h,m)}  (${tName(h,m)})`,v:["w/LULU_ANS_IS"]}};
}
function qMoney(k){
  const a=lvl();
  if(k==="pennies"){const n=ri(2,a<=5?5:9);return Object.assign({voice:["m_count"],cap:"How many cents?",visual:coinsHTML(Array(n).fill("p"),false),layout:"row3",hint:"coins",exp:{t:`${n}¢`,v:["w/LULU_ANS_IS"]}},cents(n,near(n)))}
  if(k==="value"){const pool=a<=5?["p","n"]:a<=6?["p","n","d"]:["p","n","d","q"],c=pickOne(pool),o=sh(pool.map(x=>COINS[x].v)).slice(0,Math.min(3,pool.length));if(!o.includes(COINS[c].v))o[0]=COINS[c].v;const oo=sh(o);
    return {voice:["m_value"],cap:COINS[c].name,visual:coinsHTML([c],false).replace(/width="([\d.]+)" height="([\d.]+)"/,(x,w,h)=>`width="${w*1.9}" height="${h*1.9}"`)+`<div class="coinname">${COINS[c].name}</div>`,opts:oo.map(v=>({h:`<b class="num">${v}¢</b>`,say:both(v)})),ans:oo.indexOf(COINS[c].v),layout:oo.length===2?"yn":"row3",hint:"elim",exp:{t:`${COINS[c].name} = ${COINS[c].v}¢`,v:["w/LULU_ANS_IS"]}}}
  if(k==="count"){let ks;const pool=a<=6?["p","n"]:a<=7?["p","n","d"]:["p","n","d","q"],cap=a<=6?20:a<=7?50:99;do{ks=Array.from({length:ri(2,4)},()=>pickOne(pool))}while(sumC(ks)>cap);ks.sort((x,y)=>COINS[y].v-COINS[x].v);const t=sumC(ks);
    return Object.assign({voice:["m_count"],cap:"How much money?",visual:coinsHTML(ks,false),layout:"row3",hint:"coins",exp:{t:ks.map(x=>COINS[x].v+"¢").join(" + ")+` = ${t}¢`,v:["w/LULU_ANS_IS"]}},cents(t,[t+1,t-1,t+5,t-5,t+10]))}
  const m=makeMoney();const q={voice:[m.audio],cap:m.title,visual:m.visual,opts:m.opts.map(x=>{const n=/<svg/.test(x)?null:/(\d+)/.exec(String(x).replace(/<[^>]+>/g,""));return {h:/<svg/.test(x)?x:`<b class="num">${x}</b>`,say:n&&+n[1]<=100?both(+n[1]):[]}}),ans:m.ans,layout:m.wide?"col":"row3",hint:"elim",exp:{t:m.answerText||m.opts[m.ans].replace(/<[^>]+>/g,""),v:["w/LULU_ANS_IS"]}};
  return q;
}
function cents(r,c){const w=sh([...new Set([...c,r+1,r+2,r-1,r+5,r+10].filter(x=>x>0&&x!==r))]).slice(0,DK()),o=sh([r,...w]);return {opts:o.map(x=>({h:`<b class="num">${x}¢</b>`,say:both(x)})),ans:o.indexOf(r)}}

/* Watcher Device questions: Lulu reads the question and the explanation */
const SKY_TF=[1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0];
const SKY_TF_E=["☀️","🌙","🌍","⭐","☁️","🌙","🌈","🧑‍🚀","🪐","🌌","⛈️","☀️","🌍","🌙","❄️","☄️"];
const SKY_TF_X=["The sun is our closest star. It looks big because it is near.","The moon is not a planet. It goes around the Earth.","Earth is our home planet.","Stars are in the sky in the day too. The bright sun hides them.","Clouds are made of tiny drops of water.","The moon has no light of its own. It shines with light from the sun.","Red, orange, yellow, green, blue, indigo and violet!","There is no gravity pulling them down in space, so they float.","Jupiter is the biggest planet. More than 1,000 Earths could fit inside.","Our galaxy is called the Milky Way.","Thunder is the sound lightning makes.","The sun never turns off. At night our side of Earth is turned away from it.","The Earth goes around the sun once every year.","There is no air on the moon. Astronauts bring air with them.","Snow is frozen water.","A comet is a ball of ice and dust, not a star."];
const SKY_TF_T=["The sun is a star.","The moon is a planet.","We live on planet Earth.","Stars are there only at night.","Clouds are made of tiny drops of water.","The moon has its own light.","A rainbow has seven colours.","Astronauts float in space.","Jupiter is smaller than Earth.","Our galaxy is the Milky Way.","Thunder is the loud sound of the sky.","The sun turns off at night.","The Earth goes around the sun.","There is air to breathe on the moon.","Snow is frozen water.","A comet is a real star with a tail."];
function wPool(cat){
  const pre={animals:["a","x"],world:["b","n"],sky:["s","p"]}[cat],young=S.age<=7;
  return WQ.filter(w=>pre.includes(w.i[0])&&w.a<=Math.max(3,S.age)&&(!young||VOICED.has(w.i)));
}
const TEXT_E=[["t-rex","🦖"],["dinosaur","🦕"],["penguin","🐧"],["whale","🐋"],["giraffe","🦒"],["octopus","🐙"],["elephant","🐘"],["spider","🕷️"],["cheetah","🐆"],["bear","🐻"],["owl","🦉"],["hands","🧼"],["teeth","🦷"],["heart","❤️"],["bones","🦴"],["eyes","👀"],["nose","👃"],["ears","👂"],["sleep","😴"],["water","💧"],["cactus","🌵"],["mushroom","🍄"],["mountain","⛰️"],["river","🏞️"],["volcano","🌋"],["carrot","🥕"],["milk","🥛"],["moon","🌙"],["sun","☀️"],["star","⭐"],["rain","🌧️"],["fog","🌫️"],["wind","🌬️"],["planet","🪐"],["plant","🌱"],["flower","🌸"],["tree","🌳"],["bird","🐦"],["fish","🐟"],["egg","🥚"]];
const wEmoji=w=>{if(w.p&&PIC_E[w.p])return PIC_E[w.p];const t=w.q.toLowerCase();for(const [k,e] of TEXT_E)if(t.includes(k))return e;return "🤔"};
Object.assign(WORD_E,{"brachiosaurus":"🦕","t-rex":"🦖","eggs":"🥚","bones":"🦴","clouds":"☁️"});
const E_VOICED=new Set(__EVOICED__);
/* wording fixes from the Nov 7 check (also sent to the shared pool as suggestions) */
const QFIX={s09:{q:"In a storm, what do we see first?"},x07:{o:["Blocking light","Rain","Wind"]}};
const EXTRA_E={"brachiosaurus":"🦕","t-rex":"🦖","eggs":"🥚"};
const optE=o=>WORD_E[o.toLowerCase()]||EXTRA_E[o.toLowerCase()]||"";
/* a 4th answer that is surely wrong: a number nobody would pick, or a thing from a different topic */
/* a 4th answer for each Watcher question, picked by hand (plausible but clearly wrong) */
const WQ_EXTRA={"a01": "Dog", "a02": "Cow", "a05": "Frog", "a07": "8", "a08": "Cave", "a10": "Dog", "a12": "Cat", "a14": "Chips", "a15": "Cow", "a17": "Frog", "a19": "4", "a21": "Pig", "a23": "Pig", "a25": "Desert", "a27": "Bird", "b01": "Hands", "b02": "Nose", "b04": "3", "b06": "Feet", "b08": "Cake", "b10": "Sleep", "b12": "Knee", "b14": "20", "n01": "Candy", "n03": "Black", "n05": "Purple", "n07": "Autumn", "n09": "Juice", "n11": "Banana", "n13": "Toys", "s01": "Moon", "s03": "Comet", "s05": "Sunglasses", "s07": "Cloud", "s11": "Rain", "s13": "Winter", "p01": "Doctor", "p03": "Venus", "p05": "Saturn", "p07": "Earth", "p09": "10", "p11": "Fork", "p13": "Jupiter", "e01": "Juice", "e03": "North Pole", "e05": "River", "e07": "Milk", "e09": "Forest", "f01": "Rice", "f03": "Purple", "f05": "Sand", "f07": "Milk", "f09": "Bread", "m01": "6", "m02": "4", "m04": "1", "m07": "9", "m08": "6", "m09": "8", "m11": "9", "m12": "12", "m13": "9", "w01": "Cow", "w02": "Bike", "w03": "Cup", "w04": "Cat", "w05": "Up", "w06": "Big", "w07": "Pig", "w08": "5", "l01": "Yellow", "l03": "Farmer", "l05": "Chef", "l07": "Spoon", "x01": "Water", "x03": "Spoon", "x07": "Snow", "d03": "Rocks", "d05": "Shoes"};
function extraOpt(w){
  if(WQ_EXTRA[w.i]&&!w.o.includes(WQ_EXTRA[w.i]))return WQ_EXTRA[w.i];
  if(w.o.every(o=>/^\d+$/.test(o))){const n=w.o.map(Number),c=[Math.max(...n)+ri(2,5),Math.max(1,Math.min(...n)-ri(1,3))].filter(x=>!n.includes(x));return c.length?String(c[0]):null}
  const t=w.q.toLowerCase(),c=sh(WQ.filter(v=>v.t!==w.t&&v.k==="c").flatMap(v=>v.o)).find(o=>!/^\d+$/.test(o)&&!w.o.includes(o)&&!t.includes(o.toLowerCase())&&optE(o)&&faSay(o).length&&enSay(o).length);
  return c||null}
function qWatcher(cat,used){
  if(cat==="sky"&&Math.random()<.3){const k=sh([...Array(16).keys()]).find(i=>!used.has("tf"+i));if(k!==undefined){used.add("tf"+k);
    return {tf:true,why:{t:SKY_TF_X[k],v:[]},voice:["w/LULU_TF"+k],cap:SKY_TF_T[k],visual:`<div class="bigpic">${SKY_TF_E[k]}</div>`,opts:[{h:"<span class='yn'>✅</span><small>True</small>",say:["w/LULU_SK_YES"]},{h:"<span class='yn'>❌</span><small>Not true</small>",say:["w/LULU_SK_NO"]}],ans:SKY_TF[k]?0:1,layout:"yn",hint:"again",exp:{t:SKY_TF_T[k]+(SKY_TF[k]?" ✅ True!":" ❌ Not true."),v:["w/LULU_ANS_IS"]}}}}
  let pool=wPool(cat).filter(w=>!used.has(w.i)&&!S.seenW.includes(w.i));
  /* true/false only now and then: at most one per round, the rest are choose-the-answer */
  const tfDone=[...used].some(i=>(WQ.find(w=>w.i===i)||{}).k==="tf");
  if(tfDone||Math.random()<.65){const ch=pool.filter(w=>w.k!=="tf");if(ch.length)pool=ch}
  if(!pool.length){S.seenW=S.seenW.filter(i=>!wPool(cat).some(w=>w.i===i));pool=wPool(cat).filter(w=>!used.has(w.i))}
  /* avoid two of the same small topic (e.g. body, nature) in one mound */
  const tops=new Set([...used].map(i=>(WQ.find(w=>w.i===i)||{}).t));const fresh=pool.filter(w=>!tops.has(w.t));let w=pickOne(fresh.length?fresh:pool);
  if(!w)return qCount("find");
  used.add(w.i);S.seenW.push(w.i);
  {const f=QFIX[w.i];if(f)Object.assign(w,f)}
  const v=VOICED.has(w.i),qv=v?[`w/${w.i}_q_lulu`]:["q_choose"],ev=E_VOICED.has(w.i)?[`w/${w.i}_e_lulu`]:["w/LULU_ANS_IS"];
  const why={t:w.x,v:E_VOICED.has(w.i)?[`w/${w.i}_e_lulu`]:[]};
  if(w.k==="tf")return {voice:qv,cap:w.q,tf:true,visual:`<div class="bigpic">${wEmoji(w)}</div>`,opts:[{h:"<span class='yn'>✅</span><small>True</small>",say:["w/LULU_SK_YES"]},{h:"<span class='yn'>❌</span><small>Not true</small>",say:["w/LULU_SK_NO"]}],ans:w.n,layout:"yn",hint:"again",why,exp:{t:(w.n===0?"✅ True! ":"❌ Not true. ")+w.x,v:ev}};
  if(/what is this/i.test(w.q)&&w.p&&PIC_E[w.p])  /* the picture IS the question */
    return {voice:qv,cap:w.q,visual:`<div class="bigpic">${PIC_E[w.p]}</div>`,opts:w.o.map(o=>({h:`<b class="word">${o}</b>`,say:both(o)})),ans:w.n,layout:"col",hint:"elim",why,exp:{t:`${w.o[w.n]}: ${w.x}`,v:ev}};
  if(w.o.length===3){w=Object.assign({},w,{o:w.o.slice()});const x=extraOpt(w);if(x!==null){const at=ri(0,3);w.o.splice(at,0,x);if(at<=w.n)w.n++}}
  return {voice:qv,cap:w.q,visual:`<div class="listen">${(()=>{const t=w.q.toLowerCase(),oe=w.o.map(optE);for(const [k,e] of TEXT_E)if(t.includes(k)&&!oe.includes(e))return e;return catById(cat).e})()}</div>`,opts:w.o.map(o=>/^\d+$/.test(o)?numOpt(+o):({h:`<span class="oe">${optE(o)||"🔹"}</span><small>${o}</small>`,say:both(o)})),ans:w.n,layout:w.o.length>2?"row3":"yn",hint:"elim",why,exp:{t:`${w.o[w.n]}: ${w.x}`,v:ev}};
}
/* Story time (Domi's Radio): stories and questions from the Watcher Device, 5 voices */
const STORIES=__STORIES__;
const ST_E={Picnic:"🧺",Rainbow:"🌈",Farm:"🐄",House:"🏠",Trip:"✈️",Seed:"🌱",Sea:"🌊",Clock:"⏰",Market:"🛒"};
function qStory(si,k){
  const st=STORIES[si],q=st.q.find(x=>x.k===k)||st.q[k],nums=!!q.nums;
  let src=nums?q.nums.slice():q.opts.slice(),ans=q.ans;
  if(src.length===3){let x=null;
    if(nums){const c=[Math.max(...src)+ri(2,4),Math.min(...src)-ri(1,2)].filter(v=>v>=0&&!src.includes(v));x=c.length?c[0]:null}
    else x=sh(STORIES.filter((z,i)=>i!==si).flatMap(z=>z.q.filter(y=>y.opts).flatMap(y=>y.opts))).find(o=>!src.some(y=>y[1]===o[1])&&faSay(o[1]).length);
    if(x!==null&&x!==undefined){const at=ri(0,3);src.splice(at,0,x);if(at<=ans)ans++}}
  const opts=nums?src.map(numOpt):src.map(o=>({h:`<span class="oe">${o[0]}</span><small>${o[1]}</small>`,say:both(o[1])}));
  return {voice:[`w/ST_S${st.s}_Q${q.k}`],cap:ST_EN[st.s+"_"+q.k]||"Listen to Domi's story",visual:`<div class="listen radio">📻</div>`,opts,ans,layout:"row3",hint:"elim",story:si,exp:{t:nums?String(q.nums[q.ans]):q.opts[q.ans][1],v:["w/LULU_ANS_IS"]}};
}
function buildQ(cat,kind,used){fitAge.cat=cat;fitAge.kind=kind;return fitAge(buildQ0(cat,kind,used))}
function buildQ0(cat,kind,used){
  if(kind==="robot")return qRobot();
  if(kind==="simon")return qSimon();
  if(kind==="pairs")return qPairs();
  if(kind==="order")return qOrder();
  if(kind==="pizza")return qPizza();
  if(kind==="build")return qBuild(used);
  if(cat==="animals"&&!used.has("pairs")&&Math.random()<.2){used.add("pairs");const g=qPairs();g.kind="pairs";return g}
  if(["missing","skip","long","graph","carry","groups","share","left","sides","both","feel","rhyme"].includes(kind))return qNew(kind,used);
  if(kind==="match")return qMatch(cat==="letters"?"wd":cat==="shapes"?"sh":"an",used);
  if((cat==="animals"||cat==="sky")&&!used.has("match")&&Math.random()<.22){used.add("match");return qMatch(cat==="sky"?"pl":"an",used)}
  if(cat==="count")return qCount(kind);
  if(cat==="add")return qAdd(kind);
  if(cat==="clock")return qClock(kind);
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
  if(q.match)return matchQ(q);
  if(q.robot)return robotQ(q);
  if(q.game)return GAMES[q.game](q);
  const tints=sh([0,1,2,3]);
  const cc=CATS.find(c=>c.id===L.cat)||{};
  if(q.visual&&q.opts&&q.ans>=0&&!q.showsAns){const tk=h=>{const t=new Set();(h||"").replace(/src="([^"]+)"/g,(m,x)=>t.add(x));((h||"").replace(/<[^>]+>/g," ").match(/\p{Extended_Pictographic}/gu)||[]).forEach(x=>t.add(x));return t};
    const v=tk(q.visual),a=[...tk(q.opts[q.ans].h)],others=q.opts.filter((o,i)=>i!==q.ans).map(o=>tk(o.h));
    if(a.some(x=>v.has(x)&&!others.every(o=>o.has(x))))q.visual=`<div class="listen">${cc.e||"⭐"}</div>`}
  const deco=/^<div class="listen/.test(q.visual||"")&&!/radio/.test(q.visual);
  if(!q.style){q.style="cards";if(q.opts&&q.opts.length===4&&q.layout!=="yn"&&!q.tf&&!q.flash){const r=Math.random();q.style=r<.22?"balloon":r<.4?"fish":"cards"}}
  /* owner's template: title, speaker + the thing asked, 4 cards in a 2 x 2 grid, big CHECK button */
  $("qBody").innerHTML=`<div class="qkick"><span class="qke">${cc.e||"⭐"}</span>${cc.name||""}</div>
    <h2 class="qtitle${(q.cap||"").length>34?" long":""}">${q.cap||"Choose the right one"}</h2>
    <div class="qtop2${/class="(seqrow|pat|eq|coins|coinname|graph|story2|bags|clues|seq|daycard|sent)/.test(q.visual||"")?" wide":""}"><button class="qspk" id="qSpk" aria-label="Hear the question again"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>${deco||!q.visual?"":`<div class="qvis">${q.visual}</div>`}</div>
    <div class="qopts ${q.layout} ${deco?"tall":""} st-${q.style}">${q.opts.map((o,j)=>`<button class="qo t${tints[j%4]}" data-j="${j}">${o.h}</button>`).join("")}</div>
    ${q.style==="cards"?`<button class="qcheck" id="qCheck" disabled>CHECK</button>`:`<div class="qhint2">${q.style==="balloon"?"🎈 Pop the right balloon!":"🎣 Catch the right fish!"}</div><button class="qcheck" id="qCheck" disabled hidden>CHECK</button>`}`;
  $("qSpk").onclick=()=>{sfx.tap();ask(q)};
  /* tap = choose (Lulu says it), CHECK = answer */
  const chk=$("qCheck");
  $("qBody").querySelectorAll(".qo").forEach(b=>b.onclick=()=>{if(q.done||b.classList.contains("faded"))return;sfx.tap();
    if(q.style==="balloon"||q.style==="fish"){hush();q.locked=false;b.classList.add(q.style==="balloon"?"popped":"caught");pick(+b.dataset.j,b);return}
    $("qBody").querySelectorAll(".qo.sel").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");
    hush();sayseq((q.opts[+b.dataset.j]||{}).say||[],()=>{});chk.disabled=false;chk.classList.add("on")});
  chk.onclick=()=>{const b=$("qBody").querySelector(".qo.sel");if(!b||q.done)return;hush();q.locked=false;b.classList.remove("sel");chk.disabled=true;chk.classList.remove("on");pick(+b.dataset.j,b)};
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
    q.locked=true;q.done=true;hush();b.classList.add("right");sfx.good();burstAt(b,40);logSk(q,true);
    const n=q.tries?1:2;S.acorns+=n;L.acorns+=n;L.correct++;if(!q.tries)L.first++;S.questions++;
    {const w=wkLog();w.q++;w.right++}save();renderStats();bump("sAcorns");setDot();
    L.row=(L.row||0)+1;if(L.row%3===0)dance();
    let gone=false;const go=()=>{if(!gone){gone=true;nextQ()}};
    if(!q.why&&q.fact&&q.exp&&q.exp.t)q.why={t:q.exp.t,v:[]};
    /* a short fact that matches THIS answer (English text); Lulu explains the answer in Farsi */
    {const lab=((q.opts[q.ans]||{}).h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().toLowerCase(),fe=FACT_EN[lab]||FACT_EN[lab.replace(/s$/,"")];
     if(fe){if(!q.why)q.why={t:"",v:[]};if(!(q.why.t||"").includes(fe))q.why.f=fe}
     if(q.why&&!q.why.v.length&&q.exp&&q.exp.v)q.why.v=q.exp.v.filter(Boolean)}
    if(q.why){ /* short "why" after the answer: text on the card, Lulu reads it when there is a voice for it */
      sheet("good why",(q.tf?(q.ans===0?"✅ True! ":"❌ Not true! "):"")+pickOne(PRAISE_T),(q.why.t||"")+(q.why.f?`<span class="ffact"><b>💡</b><span>${q.why.f}</span></span>`:""));
      sayseq([pickOne(PRAISE_CLIPS),...q.why.v],()=>setTimeout(go,q.why.v.length?1800:5500));
    }else{
      /* a short fact or the worked answer under the praise (e.g. "Pig: barn", "7 + 5 = 12") */
      const fact=q.exp&&q.exp.t&&String(q.exp.t).length>2?q.exp.t:"";
      sheet("good"+(fact?" why":""),pickOne(PRAISE_T),fact||`+${n} 🌰`);
      sayseq([pickOne(PRAISE_CLIPS)],()=>setTimeout(go,fact?1600:500));setTimeout(go,fact?4200:3400);
    }
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
  q.locked=true;q.done=true;hush();logSk(q,false);S.questions++;{const w=wkLog();w.q++}save();setDot();
  const rb=$("qBody").querySelectorAll(".qo")[q.ans];rb.classList.add("show");
  sheet("learn"+(q.why?" why":""),"Let's learn it together!",q.exp.t);
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
  sayseq([pickOne(["w/LULU_PR_A","w/LULU_PR_E","w/LULU_PR_D"])]);
  r.innerHTML=`<div class="rs-sun"></div><span class="dm">${bv(170)}</span><h2>${pickOne(["You did it!","Amazing job!","Great work!","Hooray!"])}</h2><p>${pickOne(["Domi is so proud of you!","Your brain is growing!","What a great learner!"])}</p>
    <div class="gains"><span class="gn a">+${L.acorns} 🌰</span>${first?`<span class="gn w">+1 🪵</span>`:""}</div>${goalCard()}
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
const anOpt=n=>({h:`<span class="oe big">${AN.find(a=>a[0]===n)[1]}</span><small>${n[0].toUpperCase()+n.slice(1)}</small>`,say:anSay(n)});
function pick3(right,pool,used,key){const w=sh(pool.filter(x=>!right.includes(x))).slice(0,DK()),r=pickOne(right);const o=sh([r,...w]);return {o,ans:o.indexOf(r),r}}
function freshAnimal(used,ok){const c=sh(AN.map(a=>a[0]).filter(ok));return c.find(n=>!used.has("an_"+n))||c[0]}
function qFarm(k,used){
  if(k==="home"||k==="food"){const n=freshAnimal(used,x=>true);used.add("an_"+n);const L2=k==="home"?HOMES:FOODS,R2=(k==="home"?HOME_OF:FOOD_OF)[n],{o,ans,r}=pick3(R2,L2);
    const say=x=>k==="home"?["w/LULU_FA_HOME"+HOMES.indexOf(x),...enSay(x)]:["w/LULU_FA_FOOD"+FOODS.indexOf(x),...enSay(x)];
    return {voice:[...anSay(n),k==="home"?"w/LULU_AN_HOME":"w/LULU_AN_FOOD"],cap:k==="home"?`Where does the ${n} live?`:`What does the ${n} eat?`,visual:`<div class="bigemo">${AN.find(a=>a[0]===n)[1]}</div>`,
      opts:o.map(x=>({h:PIC((k==="home"?"home_":"food_")+L2.indexOf(x),"wp op")+`<small>${x}</small>`,say:say(x)})),ans,layout:"row3",hint:"elim",exp:{t:`${n} → ${r}`,v:["w/LULU_ANS_IS",...say(r)]}}}
  if(k==="sound"){const n=sh(SOUNDS).find(x=>!used.has("snd_"+x))||SOUNDS[0];used.add("snd_"+n);const o=sh([n,...sh(SOUNDS.filter(x=>x!==n)).slice(0,DK())]);
    return {voice:["w/LULU_SND_WHO","w/LULU_EN_SOUND"+SOUNDS.indexOf(n)],cap:"Who says that?",visual:`<div class="listen">🔊</div>`,opts:o.map(anOpt),ans:o.indexOf(n),layout:"row3",hint:"elim",exp:{t:n,v:["w/LULU_ANS_IS",...anSay(n)]}}}
  const set=k==="fly"?["bird","duck","bee","bat"]:["duck","shark","frog"],non=AN.map(a=>a[0]).filter(x=>!set.includes(x)&&(k!=="fly"||x!=="chicken")),r=pickOne(set),o=sh([r,...sh(non).slice(0,DK())]);
  return {voice:[k==="fly"?"w/LULU_AN_FLY":"w/LULU_AN_WATER"],cap:k==="fly"?"Who can fly?":"Who lives in the water?",visual:`<div class="bigemo">${k==="fly"?"🪽":"💧"}</div>`,opts:o.map(anOpt),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:r,v:["w/LULU_ANS_IS",...anSay(r)]}};
}
const SHAPES=["Circle","Square","Triangle","Rectangle","Star","Oval","Rhombus","Trapezoid","Pentagon","Hexagon","Octagon","Parallelogram","Cube","Cylinder","Sphere","Cone","Pyramid","Rectangular prism"];
const shSay=i=>["w/LULU_SHF"+i,"w/LULU_EN_SH"+i];
const COLS=[["Red","#FF5A5F",["🍎","🍓","🚒","🌹"]],["Blue","#4DABF7",["🐳","🫐","🧢","💙"]],["Yellow","#FFD43B",["🍌","🌻","🐥","⭐"]],["Green","#51CF66",["🐸","🥦","🌲","🍀"]],["Orange","#FF9F40",["🍊","🥕","🎃","🦊"]],["Purple","#9775FA",["🍇","🍆","🔮","🦄"]],["Pink","#F783AC",["🌸","🐷","🦩","🍬"]],["Brown","#A0703C",["🐻","🍫","🌰","🪵"]],["Black","#343A40",["🎱","🐜","🕶️","🐈‍⬛"]],["White","#FFFFFF",["☁️","🐑","⚪","🦷"]]];
const colSay=i=>["w/PX_FA_"+COLS[i][0].toUpperCase(),"w/LULU_COLOR"+i];
const PAT=[["🍎","🍌"],["⭐","🌙"],["🐶","🐱"],["🔴","🔵"],["🌸","🍀"],["🚗","🚲"]];
function qShapes(k,used){
  const a=lvl();
  if(k==="shape"){const max=a<=6?6:a<=7?12:18,c=sh([...Array(max).keys()]),r=c.find(i=>!used.has("sh"+i));used.add("sh"+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,DK())]);
    return {voice:["w/LULU_SH_FIND",...shSay(r)],cap:`Find the ${SHAPES[r].toLowerCase()}!`,visual:`<div class="listen">🔷</div>`,opts:o.map(i=>({h:PIC("shape_"+i,"wp op"),say:shSay(i)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:SHAPES[r],v:["w/LULU_ANS_IS",...shSay(r)]}}}
  if(k==="color"){const c=sh([...Array(a<=5?8:10).keys()]),r=c.find(i=>!used.has("col"+i));used.add("col"+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,DK())]);
    return {voice:["w/LULU_COL_WHAT"],cap:"What colour is it?",visual:`<div class="bigemo">${pickOne(COLS[r][2])}</div>`,opts:o.map(i=>({h:`<span class="swatch" style="--c:${COLS[i][1]}"></span><small>${COLS[i][0]}</small>`,say:colSay(i)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:COLS[r][0],v:["w/LULU_ANS_IS",...colSay(r)]}}}
  if(k==="bigsmall"){const e=pickOne(OBJ),big=Math.random()<.5,o=sh([0,1,2,3]),r=big?0:3,SZ=[96,72,52,34];
    return {voice:[big?"w/LULU_CP_BIG":"w/LULU_CP_SMALL"],cap:big?"Which is bigger?":"Which is smaller?",visual:`<div class="listen">${big?"🐘":"🐭"}</div>`,opts:o.map(i=>({h:`<span class="oe" style="font-size:${SZ[i]}px">${e}</span>`})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:big?"The biggest one!":"The smallest one!",v:["w/LULU_ANS_IS"]}}}
  /* pattern: what comes next? */
  const [x,y]=sh(PAT).find(p=>!used.has("pt"+p[0]))||PAT[0];used.add("pt"+x);const kind=a<=5?0:ri(0,2);
  const seq=kind===0?[x,y,x,y,x]:kind===1?[x,x,y,x,x]:[x,y,y,x,y],next=kind===0?y:kind===1?y:y,ans3=sh([x,y,...sh(OBJ.filter(z=>z!==x&&z!==y)).slice(0,DK()-1)]);
  return {showsAns:true,voice:["w/LULU_PT_NEXT"],cap:"What comes next?",visual:`<div class="pat">${seq.map(e=>`<span>${e}</span>`).join("")}<span class="q">?</span></div>`,opts:ans3.map(e=>({h:`<span class="oe big">${e}</span>`})),ans:ans3.indexOf(next),layout:"row3",hint:"elim",exp:{t:seq.join(" ")+" "+next,v:["w/LULU_ANS_IS"]}};
}
const COUNTRIES=[["Iran","🇮🇷"],["the United States","🇺🇸"],["Canada","🇨🇦"],["Mexico","🇲🇽"],["Brazil","🇧🇷"],["the United Kingdom","🇬🇧"],["France","🇫🇷"],["Germany","🇩🇪"],["Italy","🇮🇹"],["China","🇨🇳"],["Japan","🇯🇵"],["India","🇮🇳"],["Egypt","🇪🇬"],["Australia","🇦🇺"]];
const JOBS=[["Doctor","🧑‍⚕️"],["Firefighter","🧑‍🚒"],["Police officer","👮"],["Chef","🧑‍🍳"],["Farmer","🧑‍🌾"],["Teacher","🧑‍🏫"],["Pilot","🧑‍✈️"],["Astronaut","🧑‍🚀"],["Mechanic","🧑‍🔧"],["Scientist","🧑‍🔬"],["Artist","🧑‍🎨"],["Builder","👷"]];
const ctySay=i=>["w/LULU_FA_CTY"+i,"w/LULU_EN_COUNTRY"+i],jobSay=i=>["w/LULU_FA_JOB"+i,"w/LULU_EN_JOB"+i];
function qPeople(k,used){
  const flag=k.startsWith("flag"),L2=flag?COUNTRIES:JOBS,c=sh([...L2.keys()]),r=c.find(i=>!used.has(k[0]+i));used.add(k[0]+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,DK())]),say=flag?ctySay:jobSay;
  return {voice:[flag?"w/LULU_GEO_FIND":"w/LULU_JOB_FIND",...say(r)],cap:flag?`Find the flag of ${L2[r][0]}`:`Find the ${L2[r][0].toLowerCase()}`,visual:`<div class="listen">${flag?"🚩":"👀"}</div>`,
    opts:o.map(i=>({h:`<span class="oe big">${L2[i][1]}</span>${flag?"":`<small>${L2[i][0]}</small>`}`,say:say(i)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:L2[r][0],v:["w/LULU_ANS_IS",...say(r)]}};
}
const SKYN=["sun","moon","star","cloud","rain","rainbow","lightning","snow","rocket","astronaut","telescope","galaxy","comet","satellite","planet","full moon"];
const skySay=n=>{const i=SKYN.indexOf(n);const fa=n==="sun"?["w/LULU_FA_PL0"]:n==="full moon"?faSay("full moon"):i>0&&i<15?["w/LULU_FA_SKY"+i]:[];return fa.concat(n==="sun"?["w/LULU_PL0"]:enSay(n==="galaxy"?"milky way":n))};
const SKYQ=[["w/LULU_SK_NIGHT",["moon","star","full moon"],["sun","rainbow","astronaut"]],["w/LULU_SK_DAY",["sun"],["star","galaxy","comet"]],["w/LULU_SK_RAIN",["cloud"],["sun","star","moon","rocket"]],["w/LULU_SK_COLD",["snow"],["sun","rainbow","lightning"]],["w/LULU_SK_SPACE",["rocket","satellite"],["cloud","rain","rainbow","snow"]],["w/LULU_SK_ASTRONAUT",["astronaut"],["cloud","rainbow","snow","telescope"]],["w/LULU_SK_AFTER_RAIN",["rainbow"],["snow","comet","star","rocket"]],["w/LULU_SK_LOOK",["telescope"],["rocket","satellite","cloud"]],["w/LULU_SK_GALAXY",["galaxy"],["planet","full moon","comet","cloud"]]];
function qSkyPic(used){
  const i=sh([...SKYQ.keys()]).find(j=>!used.has("skq"+j));if(i===undefined)return qWatcher("sky",used);used.add("skq"+i);
  const [clip,R2,W]=SKYQ[i],r=pickOne(R2),o=sh([r,...sh(W).slice(0,DK())]);
  return {voice:[clip],cap:"",visual:`<div class="listen">🌌</div>`,opts:o.map(n=>({h:PIC("sky_"+SKYN.indexOf(n),"wp op"),say:skySay(n)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:r,v:["w/LULU_ANS_IS",...skySay(r)]}};
}
function qPlanet(used){
  const c=sh([...PLANET_N.keys()]),r=c.find(i=>!used.has("pl"+i));if(r===undefined)return qWatcher("sky",used);used.add("pl"+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,DK())]);
  const plSay=i=>i===0?["w/LULU_FA_PL0","w/LULU_YA","w/LULU_PL0"]:["w/LULU_FA_PL"+i,"w/LULU_YA","w/LULU_PL"+i];
  const o4=sh([r,...c.filter(i=>i!==r).slice(0,3)]),nm=i=>PLANET_N[i][0].toUpperCase()+PLANET_N[i].slice(1);
  return {voice:["w/LULU_SH_FIND",...plSay(r)],cap:`Find ${nm(r)}!`,visual:`<div class="listen">🔭</div>`,opts:o4.map(i=>({h:PIC("pl_"+i,"wp op")+`<small>${nm(i)}</small>`,say:plSay(i)})),ans:o4.indexOf(r),layout:"grid4",hint:"elim",exp:{t:nm(r),v:["w/LULU_ANS_IS",...plSay(r)]}};
}

/* ================= letters, words and reading (from the shared pool, 'in the games' only) ================= */
const POOL=__POOL__;
const WORD_FALLBACK="bird honey cow cake rainbow key baby salad sun star balloon bed duck socks ten tree chicken bus cab mad bag ham fan map web leg hen jet bib lid pig fin lip hit mix pod log mom mop hot fox tub mud mug gum cut dog frog box bee bug cat hat bat car snake truck net can cap pin ship nut".split(" ");
const WORDS=POOL.words.map(x=>({i:x.i,w:(x.w||WORD_FALLBACK[x.i]||"").toLowerCase()})).filter(x=>x.w&&!["mad","hit","mix","cut","mom","cab","pod","mud","tub","log","mop","hot","gum","lid","fin","lip","bib","ham"].includes(x.w));  /* only words whose picture is clear */
const LET="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lSay=l=>["w/LULU_LN_"+l];
const wSay=x=>["w/LULU_WORD"+x.i];
function pickWord(used){const c=sh(WORDS);return c.find(x=>!used.has("wd"+x.i))||c[0]}
function qLetters(k,used){
  if(k==="abc"){const it=sh(POOL.abc).find(x=>!used.has("abc"+x.l))||POOL.abc[0];used.add("abc"+it.l);const o=sh([it.l,...sh(POOL.abc.map(x=>x.l).filter(l=>l!==it.l)).slice(0,DK())]);
    return {voice:[...lSay(it.l),...enSay(it.w),...lSay(it.l)],cap:"Find the letter!",visual:`<div class="bigemo">${WORD_E[it.w]||optE(it.w)||"🔤"}</div>`,opts:o.map(l=>({h:`<b class="num letter">${l}</b>`,say:lSay(l)})),ans:o.indexOf(it.l),layout:"row3",hint:"elim",exp:{t:it.l,v:["w/LULU_ANS_IS",...lSay(it.l)]}}}
  if(k==="lafter"||k==="lbefore"){const i=k==="lafter"?ri(0,24):ri(1,25),r=LET[k==="lafter"?i+1:i-1],o=sh([r,...sh(LET.split("").filter(l=>l!==r&&l!==LET[i])).slice(0,DK())]);
    return {voice:[k==="lafter"?"w/LULU_AB_AFTER":"w/LULU_AB_BEFORE",...lSay(LET[i])],cap:k==="lafter"?`${LET[i]} → ?`:`? → ${LET[i]}`,visual:`<div class="seq">${k==="lafter"?`<b class="bignum sm">${LET[i]}</b><span class="arr">➜</span><b class="bignum sm q">?</b>`:`<b class="bignum sm q">?</b><span class="arr">➜</span><b class="bignum sm">${LET[i]}</b>`}</div>`,opts:o.map(l=>({h:`<b class="num letter">${l}</b>`,say:lSay(l)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:r,v:["w/LULU_ANS_IS",...lSay(r)]}}}
  const x=pickWord(used);used.add("wd"+x.i);const o=sh([x,...sh(WORDS.filter(y=>y.i!==x.i)).slice(0,DK())]);
  if(k==="listen")   /* hear the English word, tap its picture (the pictures are not named, that is the game) */
    {const o4=sh([x,...sh(WORDS.filter(y=>y.i!==x.i)).slice(0,3)]);
    return {voice:["w/LULU_W_LISTEN",...wSay(x)],cap:"Listen and find it!",visual:`<div class="listen">👂</div>`,opts:o4.map(y=>({h:PIC("wd_"+y.i,"wp op")})),ans:o4.indexOf(x),layout:"grid4",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x)]}}}
    return {voice:["w/LULU_W_LISTEN",...wSay(x)],cap:"Listen and find it!",visual:`<div class="listen">👂</div>`,opts:o.map(y=>({h:PIC("wd_"+y.i,"wp op")})),ans:o.indexOf(x),layout:"row3",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x)]}};
  if(k==="first"){const r=x.w[0].toUpperCase(),lo=sh([r,...sh(LET.split("").filter(l=>l!==r)).slice(0,DK())]);
    return {voice:["w/LULU_W_FIRST",...wSay(x)],cap:"First letter?",visual:PIC("wd_"+x.i,"wp big"),opts:lo.map(l=>({h:`<b class="num letter">${l}</b>`,say:lSay(l)})),ans:lo.indexOf(r),layout:"row3",hint:"elim",exp:{t:`${r} … ${x.w}`,v:["w/LULU_ANS_IS",...lSay(r),...wSay(x)]}}}
  return {voice:["w/LULU_SK_WHICH"],cap:"What is it?",visual:PIC("wd_"+x.i,"wp big"),opts:o.map(y=>({h:`<b class="word">${y.w}</b>`,say:wSay(y)})),ans:o.indexOf(x),layout:"col",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x)]}};
}
/* reading: the answers are NOT read aloud, the child reads them */
function qRead(k,used){
  if(k==="sentence"){const st=sh(POOL.sents).find(x=>!used.has(x.id))||POOL.sents[0];used.add(st.id);const o0=st.o.slice();if(o0.length===3){const x=sh(POOL.sight).find(y=>!o0.includes(y.w)&&y.w.length>2&&!st.q.includes(y.w));if(x)o0.push(x.w)}const o=sh(o0);
    return {voice:["w/LULU_RD_SENTENCE"],cap:"",visual:`<div class="sent">${st.q.replace("___",'<span class="gap">?</span>')}</div>`,opts:o.map(w=>({h:`<b class="word">${w}</b>`})),ans:o.indexOf(st.a),layout:"row3",hint:"elim",exp:{t:st.q.replace("___",st.a),v:["w/LULU_ANS_IS"]}}}
  const pool=POOL.sight.slice(0,lvl()<=5?30:lvl()<=6?60:100),x=sh(pool).find(y=>!used.has("sw"+y.i))||pool[0];used.add("sw"+x.i);
  const o=sh([x,...sh(pool.filter(y=>y.i!==x.i&&y.w[0]!==x.w[0])).slice(0,DK())]);
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

/* ================= Tap the matching pairs (picture on the left, English word on the right) ================= */
function qMatch(set,used){
  let items;
  if(set==="wd")items=sh(WORDS.filter(x=>faSay(x.w).length)).slice(0,4).map(x=>({id:"w"+x.i,pic:PIC("wd_"+x.i,"wp mp"),word:x.w,ps:faSay(x.w),ws:wSay(x)}));
  else if(set==="pl"){items=sh([1,2,3,4,5,6,7,8]).slice(0,4).map(i=>({id:"p"+i,pic:PIC("pl_"+i,"wp mp"),word:PLANET_N[i][0].toUpperCase()+PLANET_N[i].slice(1),ps:["w/LULU_FA_PL"+i],ws:["w/LULU_PL"+i]}))}
  else if(set==="sh")items=sh([...SHAPES.keys()].filter(i=>(lvl()>=7||SHAPES[i].length<=9)&&faSay(SHAPES[i]).length)).slice(0,4).map(i=>({id:"s"+i,pic:PIC("shape_"+i,"wp mp"),word:SHAPES[i],ps:faSay(SHAPES[i]),ws:["w/LULU_EN_SH"+i]}));
  else items=sh(AN.filter(a=>enSay(a[0]).length)).slice(0,4).map(a=>({id:"a"+a[0],pic:`<span class="oe big">${a[1]}</span>`,word:a[0][0].toUpperCase()+a[0].slice(1),ps:["w/LULU_FA_AN"+AN.indexOf(a)],ws:enSay(a[0])}));
  return {match:items,voice:["w/PX_MATCH"],cap:"Tap the matching pairs",opts:[],ans:-1,layout:"match",exp:{t:"",v:[]}};
}
function matchQ(q){
  const cc=CATS.find(c=>c.id===L.cat)||{};
  const L1=sh(q.match.slice()),R1=sh(q.match.slice());
  $("qBody").innerHTML=`<div class="qkick"><span class="qke">${cc.e||"⭐"}</span>${cc.name||""}</div><div class="qtop"><span class="cap">Tap the matching pairs</span></div>
    <div class="mboard">${L1.map((x,k)=>`<button class="mc pic" data-id="${x.id}" style="grid-row:${k+1};grid-column:1">${x.pic}</button><button class="mc wrd" data-id="${R1[k].id}" style="grid-row:${k+1};grid-column:2"><span>${R1[k].word}</span></button>`).join("")}</div>`;
  $("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in");
  let selP=null,selW=null,left=q.match.length,miss=0;setTimeout(()=>{if(L&&L.q===q)sayseq(q.voice,()=>{})},400);
  const it=id=>q.match.find(x=>x.id===id);
  const tryPair=()=>{if(!selP||!selW)return;
    const a=selP,b=selW;selP=selW=null;
    if(a.dataset.id===b.dataset.id){a.className="mc pic ok";b.className="mc wrd ok";a.disabled=b.disabled=true;sfx.good();burstAt(b,14);left--;
      const x=it(a.dataset.id);hush();sayseq([...x.ps,...x.ws],()=>{});
      if(!left){q.locked=true;q.tries=miss?1:0;logSk(q,true);L.correct++;if(!miss)L.first++;const n=miss?1:2;S.acorns+=n;L.acorns+=n;S.questions++;{const w=wkLog();w.q++;w.right++}save();renderStats();bump("sAcorns");setDot();
        setTimeout(()=>{sheet("good",pickOne(PRAISE_T),`+${n} 🌰`);let gone=false;const go=()=>{if(!gone){gone=true;nextQ()}};$("qNext").onclick=()=>{sfx.tap();go()};sayseq([pickOne(PRAISE_CLIPS)],()=>setTimeout(go,700))},900)}}
    else{miss++;sfx.oops();[a,b].forEach(e=>{e.classList.remove("sel");e.classList.add("wrong");setTimeout(()=>e.classList.remove("wrong"),450)})}};
  $("qBody").querySelectorAll(".mc").forEach(b=>b.onclick=()=>{if(b.disabled||q.locked)return;sfx.tap();const x=it(b.dataset.id);
    if(b.classList.contains("pic")){if(selP)selP.classList.remove("sel");selP=b;hush();sayseq(x.ps.length?x.ps:[],()=>{})}
    else{if(selW)selW.classList.remove("sel");selW=b;hush();sayseq(x.ws,()=>{})}
    b.classList.add("sel");setTimeout(tryPair,selP&&selW?250:0)});
}

/* ================= Nov 8: questions inspired by the Khan Academy Kids / PBS Kids ladder ================= */
/* age 3 gets 2 choices, older children 3 (4 at 8+ where the builder makes them) */
function fitAge(q){
  /* 4 answers from age 4: a 3-answer number question gets one more number that is surely wrong */
  if(q&&q.opts&&q.opts.length===3){const m=q.opts.map(o=>/<b class="num">(\d+)(¢?)<\/b>/.exec(o.h||""));
    if(m.every(Boolean)){const ns=m.map(x=>+x[1]),suf=m[0][2];let n=Math.max(...ns)+ri(1,4);if(ns.includes(n))n++;
      const at=ri(0,3);q.opts.splice(at,0,{h:`<b class="num">${n}${suf}</b>${suf?"":dots(n)}`,say:both(n)});if(at<=q.ans)q.ans++;if(q.layout==="col")q.layout="row3"}}
  /* every question gets 4 answers (true/false stays 2): top up with answers from another question of the same kind */
  if(!q||!q.opts||q.match||q.radio!==undefined||q.layout==="yn"||q.opts.length>=4||!fitAge.cat)return q;
  const key=h=>{const t=(h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim(),src=((h||"").match(/src="([^"]+)"/)||[])[1]||"",n=((h||"").match(/class="ob/g)||[]).length;return t+"|"+src+"|"+n};
  const have=new Set(q.opts.map(o=>key(o.h)));
  for(let t=0;t<12&&q.opts.length<4;t++){let q2;try{q2=buildQ0(fitAge.cat,fitAge.kind,new Set())}catch(e){break}
    if(!q2||!q2.opts)continue;for(const o of sh(q2.opts.slice())){const k=key(o.h);if(q.opts.length>=4)break;if(!have.has(k)&&o!==q2.opts[q2.ans]){have.add(k);const at=ri(0,q.opts.length);q.opts.splice(at,0,o);if(at<=q.ans)q.ans++}}}
  return q;
}
const NK=()=>DK()+1;
const seqHtml=(a,hole)=>`<div class="seqrow">${a.map((n,i)=>i===hole?`<b class="tile q">?</b>`:`<b class="tile">${n}</b>`).join("")}</div>`;
const fNum=n=>faNum(n).filter(Boolean);
const FEEL=[["Happy","😀"],["Sad","😢"],["Angry","😠"],["Scared","😨"],["Surprised","😲"]];
const feelSay=i=>["w/PX_FA_"+FEEL[i][0].toUpperCase(),"w/PX_EN_"+FEEL[i][0].toUpperCase()];
const SIDES=[[2,3],[1,4],[3,4],[8,5],[9,6],[10,8]];   /* [shape index, sides]: triangle, square, rectangle, pentagon, hexagon, octagon */
const CLR=[["Red","#F25C54"],["Blue","#4A90E2"],["Yellow","#F7C548"],["Green","#5BC796"]],FORM=["circle","square","triangle"];
const shapeDiv=(c,f,big)=>`<span class="cshape ${f}${big?" big":""}" style="--c:${c<0?"#C9D2DE":CLR[c][1]}"></span>`;
function rhymeSets(){const by={};for(const x of WORDS){const k=x.w.slice(-2);(by[k]=by[k]||[]).push(x)}return Object.values(by).filter(v=>v.length>=2)}
function qNew(k,used){
  const a=lvl(),e=pickOne(OBJ);
  if(k==="missing"){const len=5,st=a<=5?ri(1,6):a<=6?ri(1,15):ri(10,94),hole=ri(1,3),arr=Array.from({length:len},(x,i)=>st+i),r=arr[hole];
    const o=numOpts(r,[arr[len-1]+1,st-1,r+10,r-10,arr[len-1]+2].filter(x=>x>0&&!arr.includes(x)),NK());
    return Object.assign({voice:["w/LULU_CA_MISSING"],cap:"Which number is missing?",visual:seqHtml(arr,hole),layout:"row3",hint:"elim",fact:true,exp:{t:arr.join(", "),v:["w/LULU_ANS_IS",...fNum(r)]}},o)}
  if(k==="skip"){const step=a<=6?pickOne([10,2]):a<=7?pickOne([5,2,10]):pickOne([3,4,5,25]),st=step===10?10:step===25?25:step*ri(1,a<=6?3:6),arr=[0,1,2,3].map(i=>st+i*step),r=st+4*step;
    if(r>100)return qNew("missing",used);
    const o=numOpts(r,[arr[3]+1,r+step,r-1,r+1],NK());
    return Object.assign({voice:[...arr.flatMap(fNum),"w/LULU_PT_NEXT"],cap:`Count by ${step}s! What comes next?`,visual:seqHtml([...arr,"?"],4),layout:"row3",hint:"elim",fact:true,exp:{t:`Count by ${step}s: ${arr.join(", ")}, ${r}`,v:["w/LULU_ANS_IS",...fNum(r)]}},o)}
  if(k==="long"){const lg=Math.random()<.5,w=sh([ri(86,96),ri(64,74),ri(44,54),ri(22,32)]),r=lg?w.indexOf(Math.max(...w)):w.indexOf(Math.min(...w)),it=pickOne(["🐍","✏️","🚂"]);
    return {voice:[lg?"w/LULU_CP_LONG":"w/LULU_CP_SHORT"],cap:lg?"Which is longer?":"Which is shorter?",visual:`<div class="listen">📏</div>`,opts:w.map(x=>({h:`<span class="lbar" style="width:${x}%"><i>${it}</i></span>`})),ans:r,layout:"row3",hint:"elim",exp:{t:lg?"The long one!":"The short one!",v:["w/LULU_ANS_IS"]}}}
  if(k==="graph"){const pets=sh(["dog","cat","fish","bird","rabbit","duck","pig"].filter(n=>AN.some(x=>x[0]===n))).slice(0,4),cnt=sh([ri(7,9),ri(4,6),ri(2,3),1]),r=cnt.indexOf(Math.max(...cnt));
    const em=n=>AN.find(x=>x[0]===n)[1];
    return {showsAns:true,voice:["w/LULU_CP_MORE"],cap:"Which pet do MOST children have?",visual:`<div class="graph">${pets.map((n,i)=>`<div class="gbar"><span class="gl">${em(n)}</span>${"<i></i>".repeat(cnt[i])}</div>`).join("")}</div>`,opts:pets.map(anOpt),ans:r,layout:"row3",hint:"elim",exp:{t:`${pets[r]}: ${cnt[r]}`,v:["w/LULU_ANS_IS",...anSay(pets[r])]}}}
  if(k==="carry"){let x,y;do{x=ri(12,a>=8?68:48);y=ri(5,a>=8?39:29)}while((x%10)+(y%10)<10||x+y>100);const r=x+y;
    const o=numOpts(r,[r-10,r+10,r+1,r-1],NK());   /* r-10 = forgot to carry the ten, r+10 = carried twice */
    return Object.assign({voice:[...fNum(x),"w/LULU_PLUS",...fNum(y),"w/LULU_EQUALS"],cap:`${x} + ${y} = ?`,visual:`<div class="eq"><span>${x}</span><b>+</b><span>${y}</span><b>=</b><span class="q">?</span></div>`,layout:"row3",hint:"elim",fact:true,exp:{t:`${x%10} + ${y%10} = ${(x%10)+(y%10)}: carry the ten! ${x} + ${y} = ${r}`,v:["w/LULU_ANS_IS",...fNum(r)]}},o)}
  if(k==="groups"){const g=ri(2,a>=8?5:4),n=ri(2,a>=8?6:5),r=g*n;
    const o=numOpts(r,[g+n,r+n,r-n,r+1],NK());     /* g+n = added instead of groups */
    return Object.assign({voice:["w/PX_GROUPS"],cap:`${g} bags, ${n} in each. How many in all?`,visual:`<div class="bags">${Array.from({length:g},()=>`<span class="bag">${grp(n,e)}</span>`).join("")}</div>`,layout:"row3",hint:"count",fact:true,exp:{t:`${g} groups of ${n}: ${Array(g).fill(n).join(" + ")} = ${r}`,v:["w/LULU_ANS_IS",...fNum(r)]}},o)}
  if(k==="share"){const f=a<=5?2:pickOne([2,3,4]),each=a<=4?ri(1,2):a<=6?ri(2,4):ri(3,5),tot=f*each;
    const o=numOpts(each,[each+1,each-1,tot,f,each+2,each+3].filter(x=>x>0),Math.max(NK(),DK()+1));
    return Object.assign({voice:["w/PX_SHARE"],cap:`Share ${tot} fairly between ${f} friends`,visual:`<div class="story2">${grp(tot,"🍪")}<span class="op">→</span><span class="grp">${"🧒".repeat(f)}</span></div>`,layout:"row3",hint:"count",fact:true,exp:{t:`${tot} shared by ${f} friends = ${each} each`,v:["w/LULU_ANS_IS",...fNum(each)]}},o)}
  if(k==="left"){const tot=ri(4,a<=5?8:12),ate=ri(1,Math.min(4,tot-1)),r=tot-ate;
    const o=numOpts(r,[r+1,r-1,tot,ate].filter(x=>x>=0),NK());
    return Object.assign({voice:["w/LULU_WP_IF",N(tot),"w/LULU_WP_HAVE",N(ate),"w/LULU_WP_GIVE","w/PX_LEFT"],cap:`${tot} cookies. Domi ate ${ate}. How many left?`,visual:`<div class="story2"><span class="grp">${Array.from({length:tot},(x,i)=>`<i class="ob ${i>=r?"gone":""}">🍪</i>`).join("")}</span></div>`,layout:"row3",hint:"count",fact:true,exp:{t:`${tot} − ${ate} = ${r}`,v:["w/LULU_ANS_IS",N(r)]}},o)}
  if(k==="sides"){const pool=a<=5?SIDES.slice(0,3):SIDES,[si,n]=pickOne(pool.filter(p=>!used.has("sd"+p[0]))||pool);used.add("sd"+si);
    const o=numOpts(n,[n-1,n+1,n+2],NK());
    return Object.assign({voice:["w/LULU_SH_SIDES"],cap:`How many sides does a ${SHAPES[si].toLowerCase()} have?`,visual:PIC("shape_"+si,"wp big"),layout:"row3",hint:"elim",fact:true,exp:{t:`A ${SHAPES[si].toLowerCase()} has ${n} straight sides.`,v:["w/LULU_ANS_IS",N(n),...shSay(si)]}},o)}
  if(k==="both"){const c=ri(0,3),f=ri(0,2);let c2;do{c2=ri(0,3)}while(c2===c);let f2;do{f2=ri(0,2)}while(f2===f);
    const items=sh([[c,f],[c,f2],[c2,f],[c2,f2]]),r=items.findIndex(x=>x[0]===c&&x[1]===f);  /* each trap matches exactly one clue */
    return {voice:["w/PX_BOTH"],cap:`Find the one that is ${CLR[c][0].toUpperCase()} and a ${FORM[f].toUpperCase()}`,visual:`<div class="clues"><span class="clue">${shapeDiv(c,"circle")}<small>${CLR[c][0]}</small></span><b>+</b><span class="clue">${shapeDiv(-1,FORM[f])}<small>${FORM[f]}</small></span></div>`.replace("--c:undefined","--c:#C9D2DE"),
      opts:items.map(x=>({h:shapeDiv(x[0],FORM[x[1]],1)})),ans:r,layout:"row3",hint:"elim",exp:{t:`${CLR[c][0]} AND ${FORM[f]}`,v:["w/LULU_ANS_IS"]}}}
  if(k==="feel"){const i=ri(0,a<=4?3:4),o=sh([i,...sh([0,1,2,3,4].filter(x=>x!==i&&(a>4||x<4))).slice(0,DK())]);
    return {voice:["w/PX_FEEL_HOW"],cap:"How does this child feel?",visual:`<div class="bigpic">${FEEL[i][1]}</div>`,opts:o.map(j=>({h:`<b class="word">${FEEL[j][0]}</b>`,say:feelSay(j)})),ans:o.indexOf(i),layout:"col",hint:"elim",exp:{t:FEEL[i][0],v:["w/LULU_ANS_IS",...feelSay(i)]}}}
  if(k==="rhyme"){const sets=sh(rhymeSets()),st=sets.find(v=>!used.has("rh"+v[0].w))||sets[0];used.add("rh"+st[0].w);const [t,r]=sh(st.slice()).slice(0,2);
    const others=sh(WORDS.filter(x=>x.w.slice(-2)!==t.w.slice(-2))).slice(0,NK()-1),o=sh([r,...others]);
    return {voice:["w/PX_RHYME",...wSay(t)],cap:`What rhymes with ${t.w}?`,visual:PIC("wd_"+t.i,"wp big"),opts:o.map(y=>({h:PIC("wd_"+y.i,"wp op")+`<small>${y.w}</small>`,say:wSay(y)})),ans:o.indexOf(r),layout:o.length>3?"grid4":"row3",hint:"elim",exp:{t:`${t.w} – ${r.w}`,v:["w/LULU_ANS_IS",...wSay(r)]}}}
  return qCount("find");
}

/* ================= "Did you know?" facts after an answer (Lulu voice, from the Watcher device pool) ================= */
const ROBOT_EN=["Robots and computers do exactly what we tell them, step by step.", "Left and right are opposites, and so are up and down.", "A mistake in a program is called a bug.", "Robots help build cars in factories.", "A robot vacuum cleans the floor all by itself.", "Planning before you start saves time.", "A loop repeats steps: '3 times right' instead of right, right, right.", "The word 'algorithm' comes from al-Khwarizmi, a Persian scientist.", "Robots on Mars drive around and take photos.", "Ada Lovelace wrote one of the first computer programs, about 200 years ago.", "Computers only understand two numbers: 0 and 1.", "Finding the shortest path is a puzzle that maps solve every day."];
const FACT_EN={"bird": "Birds are the only animals with feathers.", "cow": "A cow has four parts to its tummy!", "duck": "Ducks have waterproof feathers.", "chicken": "A hen can lay about one egg every day.", "pig": "Pigs are very clever – smarter than dogs!", "shark": "Sharks have lots of teeth and grow new ones all the time.", "fox": "Foxes use their bushy tail as a warm blanket.", "dog": "A dog's nose is 10,000 times better than ours.", "frog": "Frogs drink water through their skin.", "bee": "Bees dance to tell friends where flowers are.", "caterpillar": "A caterpillar turns into a butterfly.", "cat": "Cats sleep for about 15 hours a day!", "bat": "Bats sleep upside down.", "snake": "Snakes smell with their tongue.", "bear": "Bears sleep through the cold winter.", "hen": "A hen can lay about one egg every day.", "elephant": "Elephants are the biggest animals on land.", "lion": "A lion's roar can be heard 8 km away.", "mouse": "A mouse's teeth never stop growing.", "fish": "Fish breathe water through their gills.", "whale": "Blue whales are the biggest animals ever.", "butterfly": "Butterflies taste with their feet!", "ant": "Ants can carry things 50 times heavier than themselves.", "cheetah": "The cheetah is the fastest land animal.", "turtle": "Some turtles live more than 100 years.", "horse": "Horses can sleep standing up.", "sheep": "Sheep wool keeps growing all year.", "rabbit": "A rabbit's teeth never stop growing.", "goat": "Goats are great climbers.", "owl": "Owls can turn their heads almost all the way round.", "penguin": "Penguins can't fly, but they swim very fast.", "sun": "The Sun is a star – the closest one to us.", "mercury": "Mercury is the closest planet to the Sun.", "venus": "Venus is the hottest planet.", "earth": "Earth is the only planet we know with life.", "mars": "Mars is red because of rusty dust.", "jupiter": "Jupiter is the biggest planet.", "saturn": "Saturn's rings are made of ice and rock.", "uranus": "Uranus spins on its side.", "neptune": "Neptune is the windiest planet.", "moon": "The Moon has no light of its own – it shines with sunlight.", "star": "Stars are giant balls of hot gas, very far away.", "full moon": "We see a full moon about once a month.", "cloud": "Clouds are made of tiny drops of water.", "clouds": "Clouds are made of tiny drops of water.", "rain": "Rain falls when cloud drops get too heavy.", "rainbow": "A rainbow appears when sunlight shines through raindrops.", "lightning": "Lightning is hotter than the surface of the Sun!", "snow": "No two snowflakes are exactly the same.", "rocket": "Rockets need lots of power to get to space.", "astronaut": "Astronauts float in space because there's no gravity pulling them down.", "telescope": "A telescope makes faraway things look closer.", "galaxy": "Our galaxy is called the Milky Way.", "comet": "Comets are big balls of ice and dust.", "satellite": "Satellites help phones, TV and maps work.", "planet": "There are 8 planets around our Sun.", "circle": "A circle has no corners at all.", "square": "A square has 4 sides that are all the same.", "triangle": "A triangle has 3 sides and 3 corners.", "rectangle": "A rectangle has 4 sides and 4 right corners.", "oval": "An egg is shaped like an oval.", "rhombus": "A rhombus looks like a diamond.", "pentagon": "A pentagon has 5 sides.", "hexagon": "Bees build their honeycomb with hexagons.", "octagon": "A stop sign is an octagon – 8 sides.", "cube": "A dice is a cube – 6 square faces.", "sphere": "A ball is a sphere.", "cone": "An ice-cream cone is a cone shape.", "cylinder": "A can is a cylinder.", "pyramid": "The pyramids of Egypt are very old.", "doctor": "Doctors help us get better when we're sick.", "firefighter": "Firefighters put out fires and rescue people.", "police officer": "Police officers help keep us safe.", "chef": "A chef cooks food in a restaurant.", "farmer": "Farmers grow food and care for animals.", "teacher": "Teachers help us learn new things.", "pilot": "Pilots fly planes high in the sky.", "mechanic": "Mechanics fix cars.", "scientist": "Scientists ask questions and do experiments.", "artist": "Artists make paintings, music and more.", "builder": "Builders make houses and bridges.", "dentist": "Dentists help keep our teeth healthy.", "nest": "Birds build nests from twigs and leaves.", "barn": "A barn is a home for farm animals.", "pond": "Ponds are homes for ducks, frogs and fish.", "hive": "A hive is a home for bees.", "cave": "Bears and bats like caves.", "sea": "The sea covers most of our planet.", "den": "A den is a cosy home for foxes.", "grass": "Cows eat grass most of the day.", "seeds": "Birds love seeds.", "bone": "Dogs love to chew bones.", "flies": "Frogs catch flies with their long sticky tongue.", "flowers": "Bees collect nectar from flowers.", "leaves": "Caterpillars eat lots of leaves.", "worms": "Birds pull worms out of the ground.", "corn": "Chickens love corn.", "red": "Red is the colour of strawberries.", "blue": "The sky and the sea look blue.", "yellow": "Bananas and the sun are yellow.", "green": "Plants are green because of a thing called chlorophyll.", "orange": "Carrots and oranges are orange.", "purple": "Grapes can be purple.", "pink": "Flamingos are pink because of the food they eat.", "brown": "Chocolate and tree trunks are brown.", "black": "Black is the colour of the night sky.", "white": "Snow and clouds are white.", "spring": "In spring, flowers bloom and trees grow new leaves.", "summer": "Summer is the hottest season.", "autumn": "In autumn, leaves change colour and fall.", "winter": "Winter is the coldest season.", "happy": "We smile when we feel happy.", "sad": "It's okay to feel sad sometimes – a hug can help.", "angry": "When angry, take a big breath and count to 4.", "scared": "Talking to someone you love helps when you're scared.", "surprised": "When surprised, our eyes open wide!", "iran": "Nowruz, the Persian New Year, starts on the first day of spring.", "japan": "Japan has very fast trains.", "canada": "Canada's flag has a maple leaf.", "the united states": "The USA has 50 states.", "mexico": "Mexico is famous for tacos.", "apple": "Apples float in water.", "banana": "Bananas grow in bunches called hands.", "milk": "Milk helps make strong bones.", "water": "All living things need water.", "eggs": "Chickens lay eggs."};
const ST_EN={"0_0": "How many apples did Mom bring?", "0_1": "What colour were the bananas?", "0_2": "What does the bee like?", "1_0": "Where does rain come from?", "1_1": "What came out in the sky after the rain?", "1_2": "How many colours does a rainbow have?", "2_0": "Which animal says moo?", "2_1": "How many eggs did Arash find?", "2_2": "What did Mom make with the eggs?", "3_0": "What shape was the roof?", "3_1": "What shape was Arash's window?", "3_2": "How many windows did the house have?", "4_0": "Who flies the plane?", "4_1": "Which is the flag of Japan?", "4_2": "What is very fast in Japan?", "5_0": "What does a seed need to grow?", "5_1": "What colour was the sprout?", "5_2": "What did Arash give the pot every day?", "6_0": "What does sea water taste like?", "6_1": "Which fish did Sara see first?", "6_2": "Which was the biggest animal in the story?", "7_0": "What time was it in the morning?", "7_1": "What did Arash bring?", "7_2": "How many times did they go down the slide?", "8_0": "How many bananas did Sara want?", "8_1": "What colour is a watermelon on the outside?", "8_2": "What did they weigh the fruit with?"};
const IFACTS={"MATH": [["LULU_IF_MATH_0", "تو ده تا انگشت داری، واسه همینه که ما ده‌تا ده‌تا می‌شمریم!"], ["LULU_IF_MATH_1", "صفر یعنی هیچی، مثل یه بشقابِ خالی."], ["LULU_IF_MATH_2", "اگه به یه عدد یکی اضافه کنی، عددِ بعدی رو می‌گیری: پنج و یکی دیگه می‌شه شیش."], ["LULU_IF_MATH_3", "توی جمع، جای عددها مهم نیست: دو به اضافه‌ی سه و سه به اضافه‌ی دو، هر دو می‌شن پنج."], ["LULU_IF_MATH_4", "یه دوجین یعنی دوازده تا، مثل یه جعبه با دوازده تا تخم‌مرغ."], ["LULU_IF_MATH_5", "تفریق برعکسِ جمعه: پنج منهای دو می‌شه سه، و سه به اضافه‌ی دو می‌شه پنج."], ["LULU_IF_MATH_6", "عددهای زوج رو می‌شه عادلانه بین دو تا دوست تقسیم کرد: دو، چهار، شیش، هشت..."], ["LULU_IF_MATH_7", "هر عددی ضرب در صفر، می‌شه صفر!"], ["LULU_IF_MATH_8", "عددهایی که ما می‌نویسیم از هند و ایران، بیشتر از هزار سال پیش، به ما رسیده."], ["LULU_IF_MATH_9", "خوارزمی، یه ریاضیدانِ ایرانی، حدود هزار و دویست سال پیش یه کتابِ معروف درباره‌ی جبر نوشت."], ["LULU_IF_MATH_10", "عددها هیچ‌وقت تموم نمی‌شن: همیشه می‌شه یکی دیگه اضافه کرد!"], ["LULU_IF_MATH_11", "ضرب یعنی جمعِ سریع: سه ضربدر چهار می‌شه چهار و چهار و چهار، یعنی دوازده."]], "PLANETS": [["LULU_IF_PLANETS_0", "زمین تنها سیاره‌ایه که می‌دونیم توش زندگی هست."], ["LULU_IF_PLANETS_1", "ابرها از قطره‌های خیلی کوچیکِ آب درست شدن. وقتی قطره‌ها سنگین بشن، به شکلِ بارون می‌ریزن."], ["LULU_IF_PLANETS_2", "رنگین‌کمون وقتی درست می‌شه که نورِ خورشید از قطره‌های بارون رد بشه."], ["LULU_IF_PLANETS_3", "ماه نورِ خودش رو نداره. می‌درخشه چون خورشید روش نور می‌تابونه."], ["LULU_IF_PLANETS_4", "ستاره‌ها توپ‌های بزرگی از گازِ داغ هستن. خورشید نزدیک‌ترین ستاره به ماست."], ["LULU_IF_PLANETS_5", "زحل حلقه‌های قشنگی داره که از یخ و سنگ درست شدن."], ["LULU_IF_PLANETS_6", "فضانوردها روی ماه راه رفتن. جای پاشون هنوز اونجاست، چون اونجا باد نمیاد!"], ["LULU_IF_PLANETS_7", "برق خیلی داغه، و رعد صدای اونه. اول نور رو می‌بینیم، بعد صدای بوم رو می‌شنویم."], ["LULU_IF_PLANETS_8", "کهکشانِ ما، راه شیری، شکلِ یه مارپیچِ خیلی بزرگه که می‌چرخه."], ["LULU_IF_PLANETS_9", "نورِ خورشید حدود هشت دقیقه طول می‌کشه تا به زمین برسه."], ["LULU_IF_PLANETS_10", "مشتری بزرگ‌ترین سیاره‌ست، بیشتر از هزار تا زمین توش جا می‌شه!"], ["LULU_IF_PLANETS_11", "نورِ ستاره‌های دور می‌تونه هزاران سال توی راه باشه تا به چشمِ تو برسه."]], "SHAPES": [["LULU_IF_SHAPES_0", "مثلث سه تا ضلع و سه تا گوشه داره."], ["LULU_IF_SHAPES_1", "دایره اصلاً گوشه نداره."], ["LULU_IF_SHAPES_2", "مربع چهار تا ضلع داره که همه‌شون هم‌اندازه‌ان."], ["LULU_IF_SHAPES_3", "چرخ‌ها گِردن تا بتونن راحت قِل بخورن."], ["LULU_IF_SHAPES_4", "تابلوی ایست هشت‌ضلعیه، یعنی هشت تا ضلع داره."], ["LULU_IF_SHAPES_5", "تاس مکعبه، شیش تا وجهِ مربعی داره."], ["LULU_IF_SHAPES_6", "زنبورها لونه‌شون رو از شش‌ضلعی‌ها می‌سازن."], ["LULU_IF_SHAPES_7", "هرم‌های مصر بیشتر از چهار هزار و پونصد سال عمر دارن."], ["LULU_IF_SHAPES_8", "کُره از هر طرف یه شکل دیده می‌شه، مثلِ توپ."], ["LULU_IF_SHAPES_9", "زاویه‌های یه مثلث با هم همیشه می‌شن صد و هشتاد درجه."], ["LULU_IF_SHAPES_10", "دونه‌های برف معمولاً شیش تا شاخه دارن."], ["LULU_IF_SHAPES_11", "کاشی‌ها و فرش‌های ایرانی پر از الگوهای قشنگِ شکل‌هان."]], "WORDS": [["LULU_IF_WORDS_0", "cat و hat و bat هم‌قافیه‌ان، آخرشون یه صدا داره."], ["LULU_IF_WORDS_1", "الفبای انگلیسی بیست و شیش تا حرف داره."], ["LULU_IF_WORDS_2", "به حرف‌های A و E و I و O و U می‌گن حروفِ صدادار."], ["LULU_IF_WORDS_3", "الفبای فارسی سی و دو تا حرف داره."], ["LULU_IF_WORDS_4", "فارسی از راست به چپ نوشته می‌شه، انگلیسی از چپ به راست."], ["LULU_IF_WORDS_5", "یه کلمه می‌تونه چند تا معنی داشته باشه: bat هم یه حیوونه هم چوبِ بیسبال."], ["LULU_IF_WORDS_6", "کلمه‌های مرکب از دو تا کلمه درست می‌شن: sun و flower می‌شه sunflower."], ["LULU_IF_WORDS_7", "بعضی از کلمه‌های بلندِ انگلیسی بیشتر از بیست تا حرف دارن!"], ["LULU_IF_WORDS_8", "انگلیسی بعضی کلمه‌ها رو از فارسی گرفته، مثلِ paradise و pajamas و bazaar."], ["LULU_IF_WORDS_9", "کلمه‌هایی که یه‌جور تلفظ می‌شن ولی معنی‌شون فرق داره، مثلِ sea و see."], ["LULU_IF_WORDS_10", "حرفِ E پرکاربردترین حرفِ انگلیسیه."], ["LULU_IF_WORDS_11", "هر سال کلمه‌های جدید به فرهنگِ لغت اضافه می‌شن."]], "READ": [["LULU_IF_READ_0", "the پرکاربردترین کلمه‌ی انگلیسیه."], ["LULU_IF_READ_1", "هر روز یه کم خوندن، تو رو یه کتاب‌خونِ قهرمان می‌کنه."], ["LULU_IF_READ_2", "عکس‌های کتاب کمک می‌کنن قصه رو بفهمیم."], ["LULU_IF_READ_3", "می‌تونی واسه عروسک‌هات کتاب بخونی، اونا هم قصه دوست دارن!"], ["LULU_IF_READ_4", "توی کتابخونه می‌شه کتاب رو مجانی امانت گرفت."], ["LULU_IF_READ_5", "حدودِ صد تا کلمه‌ی پرتکرار، نصفِ چیزهایی‌ان که می‌خونیم."], ["LULU_IF_READ_6", "اولین کتاب‌های چاپی بیشتر از پونصد سال پیش ساخته شدن."], ["LULU_IF_READ_7", "آدم‌های نابینا با انگشت‌هاشون، با نقطه‌های بریل، می‌خونن."], ["LULU_IF_READ_8", "بلند خوندن کمک می‌کنه کلمه‌ها رو بهتر یادت بمونه."], ["LULU_IF_READ_9", "شاهنامه، یه کتابِ معروفِ فارسی، حدودِ پنجاه هزار بیت شعر داره."], ["LULU_IF_READ_10", "وقتی قصه می‌خونی، مغزت توی ذهنت عکس می‌سازه."], ["LULU_IF_READ_11", "بعضی‌ها می‌تونن توی یه دقیقه بیشتر از دویست تا کلمه بخونن."]], "ROBOT": [["LULU_IF_ROBOT_0", "ربات‌ها فقط کاری رو می‌کنن که ما بهشون بگیم."], ["LULU_IF_ROBOT_1", "راست و چپ برعکسِ همن، بالا و پایین هم همین‌طور."], ["LULU_IF_ROBOT_2", "به اشتباه توی برنامه می‌گن باگ."], ["LULU_IF_ROBOT_3", "ربات‌ها توی کارخونه به ساختنِ ماشین کمک می‌کنن."], ["LULU_IF_ROBOT_4", "جاروبرقیِ رباتی خودش تنهایی زمین رو تمیز می‌کنه."], ["LULU_IF_ROBOT_5", "اگه قبل از شروع برنامه‌ریزی کنی، وقتت هدر نمی‌ره."], ["LULU_IF_ROBOT_6", "حلقه قدم‌ها رو تکرار می‌کنه: «سه بار برو راست» به جای راست، راست، راست."], ["LULU_IF_ROBOT_7", "کلمه‌ی الگوریتم از اسمِ خوارزمی، دانشمندِ ایرانی، اومده."], ["LULU_IF_ROBOT_8", "ربات‌هایی که روی مریخ هستن، دور می‌زنن و عکس می‌گیرن."], ["LULU_IF_ROBOT_9", "آدا لاولیس حدودِ دویست سال پیش یکی از اولین برنامه‌های کامپیوتری رو نوشت."], ["LULU_IF_ROBOT_10", "کامپیوترها فقط دو تا عدد رو می‌فهمن: صفر و یک."], ["LULU_IF_ROBOT_11", "پیدا کردنِ کوتاه‌ترین راه، معماییه که نقشه‌ها و ماشین‌های پست هر روز حلش می‌کنن."]], "SIMON": [["LULU_IF_SIMON_0", "قرمز و زرد و آبی رو که قاطی کنی، کلی رنگِ دیگه درست می‌شه."], ["LULU_IF_SIMON_1", "زرد و آبی با هم می‌شن سبز."], ["LULU_IF_SIMON_2", "قرمز و زرد با هم می‌شن نارنجی."], ["LULU_IF_SIMON_3", "آهنگ‌ها کمکمون می‌کنن چیزها یادمون بمونه، واسه همینه که الفبا رو آواز می‌خونیم."], ["LULU_IF_SIMON_4", "یه خوابِ خوب کمک می‌کنه چیزهایی که امروز یاد گرفتی یادت بمونه."], ["LULU_IF_SIMON_5", "فیل‌ها حافظه‌ی فوق‌العاده‌ای دارن."], ["LULU_IF_SIMON_6", "بیشترِ آدم‌ها می‌تونن حدودِ هفت تا چیز رو همزمان توی ذهنشون نگه دارن."], ["LULU_IF_SIMON_7", "دسته‌بندی کمک می‌کنه: یه شماره رو دو تا دو تا راحت‌تر یادت می‌مونه."], ["LULU_IF_SIMON_8", "رنگین‌کمون همیشه رنگ‌هاش به یه ترتیبه: قرمز، نارنجی، زرد، سبز، آبی، نیلی، بنفش."], ["LULU_IF_SIMON_9", "مغزت حدودِ هشتاد و شیش میلیارد سلولِ عصبی داره."], ["LULU_IF_SIMON_10", "موسیقی زدن و بازی کردن می‌تونه حافظه رو قوی‌تر کنه."], ["LULU_IF_SIMON_11", "بعضی قهرمان‌های حافظه، ترتیبِ یه دسته‌ی کاملِ ورق رو کمتر از یه دقیقه حفظ می‌کنن."]], "PATTERN": [["LULU_IF_PATTERN_0", "روز و شب هر روز تکرار می‌شن، این یه الگوئه."], ["LULU_IF_PATTERN_1", "گورخرها راه‌راه‌ان، و راه‌راه‌های هر گورخر با بقیه فرق داره."], ["LULU_IF_PATTERN_2", "فصل‌ها تکرار می‌شن: بهار، تابستون، پاییز، زمستون."], ["LULU_IF_PATTERN_3", "دو تا دو تا شمردن: دو، چهار، شیش، هشت، ده!"], ["LULU_IF_PATTERN_4", "دست، دست، پا، یه الگوئه که می‌شه شنیدش."], ["LULU_IF_PATTERN_5", "روزهای هفته هر هفت روز یه بار تکرار می‌شن."], ["LULU_IF_PATTERN_6", "پنج تا پنج تا شمردن: پنج، ده، پونزده، بیست، آخرشون همیشه پنج یا صفره."], ["LULU_IF_PATTERN_7", "دونه‌های آفتابگردون به شکلِ مارپیچ کنار هم می‌رویَن."], ["LULU_IF_PATTERN_8", "توی یک، یک، دو، سه، پنج، هشت، هر عدد جمعِ دو تا عددِ قبلیه."], ["LULU_IF_PATTERN_9", "شکلِ ماه با یه الگو عوض می‌شه که حدودِ هر بیست و نه روز تکرار می‌شه."], ["LULU_IF_PATTERN_10", "رمزها و پیام‌های مخفی معمولاً الگوهای پنهونی‌ان."], ["LULU_IF_PATTERN_11", "فرش‌های ایرانی الگوهاشون رو گره به گره، کامل تکرار می‌کنن."]], "COMPARE": [["LULU_IF_COMPARE_0", "فیل از موش بزرگ‌تره، و موش از گربه کوچیک‌تره."], ["LULU_IF_COMPARE_1", "نهنگِ آبی بزرگ‌ترین حیوونیه که تا حالا بوده."], ["LULU_IF_COMPARE_2", "زرافه بلندترین حیوونه."], ["LULU_IF_COMPARE_3", "ده از نُه بیشتره، چون وقتی می‌شمریم بعد از نُه میاد."], ["LULU_IF_COMPARE_4", "یوزپلنگ سریع‌ترین دونده‌ی روی خشکیه."], ["LULU_IF_COMPARE_5", "پاهات از وقتی نی‌نی بودی بزرگ‌تر شدن، کفش‌هات رو مقایسه کن!"], ["LULU_IF_COMPARE_6", "علامتِ بزرگ‌تر مثلِ دهنِ تمساحه، دهنش رو به عددِ بزرگ‌تر بازه، مثلِ پنج بزرگ‌تر از دو."], ["LULU_IF_COMPARE_7", "اورست بلندترین کوهه، تقریباً نُه کیلومتر ارتفاع داره."], ["LULU_IF_COMPARE_8", "دماوند، بلندترین کوهِ ایران، بیشتر از پنج هزار و ششصد متر ارتفاع داره."], ["LULU_IF_COMPARE_9", "بین پنجاه و دو و بیست و پنج، دهگان می‌گه کدوم بزرگ‌تره: پنج تا ده از دو تا ده بیشتره."], ["LULU_IF_COMPARE_10", "یه کیلو پَر با یه کیلو سنگ هم‌وزنه!"], ["LULU_IF_COMPARE_11", "خورشید کوچیک به نظر میاد چون خیلی دوره، ولی واقعاً خیلی بزرگه."]], "SOUNDS": [["LULU_IF_SOUNDS_0", "حرفِ S صدای مار می‌ده: سسس!"], ["LULU_IF_SOUNDS_1", "حرفِ M مثلِ وقتیه که یه چیز خوشمزه می‌خوری: مممم!"], ["LULU_IF_SOUNDS_2", "cat و can و cap همه با یه صدا شروع می‌شن."], ["LULU_IF_SOUNDS_3", "هر کلمه حداقل یه صدای صدادار داره."], ["LULU_IF_SOUNDS_4", "یه صدا رو عوض کنی یه کلمه‌ی جدید می‌گیری: cat، hat، mat!"], ["LULU_IF_SOUNDS_5", "دست زدن کمک می‌کنه قسمت‌های کلمه رو بشمری: بَ-نا-نا سه تا قسمت داره."], ["LULU_IF_SOUNDS_6", "sh با هم یه صدا می‌دن، مثلِ ship و shoe."], ["LULU_IF_SOUNDS_7", "حرفِ C گاهی صدای کِ می‌ده مثلِ cat، گاهی صدای سِ مثلِ city."], ["LULU_IF_SOUNDS_8", "E ی بی‌صدا آخرِ کلمه، صدای حرف رو عوض می‌کنه: cap می‌شه cape."], ["LULU_IF_SOUNDS_9", "انگلیسی حدودِ چهل و چهار تا صدا داره ولی فقط بیست و شیش تا حرف."], ["LULU_IF_SOUNDS_10", "نی‌نی‌ها قبل از حرف زدن، صداهای زبونشون رو یاد می‌گیرن."], ["LULU_IF_SOUNDS_11", "جمله‌های زبون‌پیچ مثلِ she sells sea shells صداهات رو تمرین می‌دن."]], "ANIMALS": [["LULU_IF_ANIMALS_0", "زنبورها از گل‌ها عسل درست می‌کنن."], ["LULU_IF_ANIMALS_1", "قورباغه‌ها با زبونِ دراز و چسبناکشون مگس می‌گیرن."], ["LULU_IF_ANIMALS_2", "معده‌ی گاو چهار قسمت داره تا علف رو هضم کنه."], ["LULU_IF_ANIMALS_3", "خفاش‌ها توی غار سروته می‌خوابن."], ["LULU_IF_ANIMALS_4", "کاترپیلارها، یعنی کرمِ پروانه، بزرگ که بشن پروانه می‌شن."], ["LULU_IF_ANIMALS_5", "پرهای اردک ضدآبه."], ["LULU_IF_ANIMALS_6", "کوسه‌ها از دایناسورها هم قدیمی‌ترن."], ["LULU_IF_ANIMALS_7", "روباه‌ها با گوش‌های بزرگشون صدای موش رو زیرِ برف می‌شنون."], ["LULU_IF_ANIMALS_8", "یه زنبور توی یه سفر می‌تونه به صد تا گل سر بزنه."], ["LULU_IF_ANIMALS_9", "مارها با زبونشون بو می‌کشن."], ["LULU_IF_ANIMALS_10", "یوزپلنگِ ایرانی فقط توی ایران زندگی می‌کنه و خیلی کمیابه."], ["LULU_IF_ANIMALS_11", "هشت‌پا سه تا قلب و خونِ آبی داره."]], "PIZZA": [["LULU_IF_PIZZA_0", "نصفِ چهار می‌شه دو."], ["LULU_IF_PIZZA_1", "دو تا نصف می‌شه یه کامل."], ["LULU_IF_PIZZA_2", "چهار تا یک چهارم می‌شه یه کامل."], ["LULU_IF_PIZZA_3", "نیم ساعت یعنی سی دقیقه."], ["LULU_IF_PIZZA_4", "اگه یه ساندویچ رو گوشه به گوشه ببری، دو تا مثلث می‌شه."], ["LULU_IF_PIZZA_5", "یک چهارم یعنی نصفِ یه نصف."], ["LULU_IF_PIZZA_6", "یک دوم از یک چهارم بزرگ‌تره، با اینکه چهار از دو بزرگ‌تره!"], ["LULU_IF_PIZZA_7", "یه ربع ساعت یعنی پونزده دقیقه."], ["LULU_IF_PIZZA_8", "اگه سه چهارمِ پیتزا رو بخوری، یک چهارمش واسه دوستت می‌مونه."], ["LULU_IF_PIZZA_9", "دو چهارم همون اندازه‌ی یک دومه."], ["LULU_IF_PIZZA_10", "موسیقی هم کسر داره: نُتِ نصف و نُتِ یک چهارم."], ["LULU_IF_PIZZA_11", "پیتزایی که هشت تیکه بشه، هر تیکه‌اش یک هشتمه."]], "DAILY": [["LULU_IF_DAILY_0", "بچه‌ها هر روز صدها سؤال می‌پرسن!"], ["LULU_IF_DAILY_1", "چرا آسمون آبیه؟ نورِ خورشید توی هوا این‌ور و اون‌ور می‌ره، و رنگِ آبی از همه بیشتر."], ["LULU_IF_DAILY_2", "قلبِ تو هر روز حدود صد هزار بار می‌زنه."], ["LULU_IF_DAILY_3", "عسل هیچ‌وقت خراب نمی‌شه. زنبورها اون رو از گل‌ها درست می‌کنن."], ["LULU_IF_DAILY_4", "هشت‌پا سه تا قلب داره."], ["LULU_IF_DAILY_5", "گیاه‌ها با ریشه‌هاشون آب می‌خورن."], ["LULU_IF_DAILY_6", "استخون‌هات تا وقتی بزرگ بشی رشد می‌کنن."], ["LULU_IF_DAILY_7", "یه روز روی زمین بیست و چهار ساعته: یه دورِ کاملِ سیاره‌ی ما."], ["LULU_IF_DAILY_8", "پروانه‌ها با پاهاشون مزه رو می‌فهمن."], ["LULU_IF_DAILY_9", "بزرگ‌ترین حیوونِ دنیا نهنگِ آبیه."], ["LULU_IF_DAILY_10", "آب می‌تونه یخ باشه، آب باشه یا بخار."], ["LULU_IF_DAILY_11", "صدا از نور آهسته‌تر می‌ره؛ واسه همینه که رعد بعد از برق میاد."]], "CALENDAR": [["LULU_IF_CALENDAR_0", "نوروز، سالِ نوِ ایرانی، با اولین روزِ بهار شروع می‌شه."], ["LULU_IF_CALENDAR_1", "شنبه و یکشنبه توی خیلی از کشورها آخرِ هفته‌ست."], ["LULU_IF_CALENDAR_2", "فوریه کوتاه‌ترین ماهه: بیست و هشت روز داره، یا توی سالِ کبیسه بیست و نه روز."], ["LULU_IF_CALENDAR_3", "توی زمستون شب‌ها بلندن و روزها کوتاه."], ["LULU_IF_CALENDAR_4", "برگ‌ها توی پاییز رنگ عوض می‌کنن چون درخت‌ها برای زمستون آماده می‌شن."], ["LULU_IF_CALENDAR_5", "تولدت سالی یه بار میاد."], ["LULU_IF_CALENDAR_6", "جولای و آگوست هر دو سی و یک روز دارن."], ["LULU_IF_CALENDAR_7", "شبِ یلدا، اولِ زمستون، بلندترین شبِ ساله."], ["LULU_IF_CALENDAR_8", "سالِ کبیسه هر چهار سال یه بار میاد و سیصد و شصت و شش روز داره."], ["LULU_IF_CALENDAR_9", "وقتی اینجا تابستونه، توی استرالیا زمستونه!"], ["LULU_IF_CALENDAR_10", "یه روز بیست و چهار ساعته و یه ساعت شصت دقیقه."], ["LULU_IF_CALENDAR_11", "اسمِ جولای و آگوست از ژولیوس سزار و آگوستوس اومده."]]};
const FACT_SET={count:"MATH",add:"MATH",money:"MATH",clock:"DAILY",animals:"ANIMALS",farm:"ANIMALS",world:"ANIMALS",sky:"PLANETS",shapes:"SHAPES",people:"DAILY",letters:"WORDS",read:"READ"};
const factSeen={};
function funFact(cat,kind){const k=kind==="pattern"?"PATTERN":kind==="robot"?"ROBOT":kind==="sound"?"SOUNDS":["more","less","long","bigsmall"].includes(kind)?"COMPARE":["months","week","today","tomorrow","yesterday","after","before","monthafter","season","nowseason"].includes(kind)?"CALENDAR":FACT_SET[cat];
  const L2=IFACTS[k];if(!L2)return null;factSeen[k]=factSeen[k]||[];if(factSeen[k].length>=L2.length)factSeen[k]=[];
  const i=sh(L2.map((x,j)=>j).filter(j=>!factSeen[k].includes(j)))[0];factSeen[k].push(i);return {c:L2[i][0],t:L2[i][1]}}

/* ================= Robot path (like the Watcher device): build the arrows, press GO ================= */
function qRobot(){const a=lvl(),n=a<=4?3:a<=6?4:5;let walls=[],st,gl;
  for(let t=0;t<200;t++){st=[0,ri(0,n-1)];gl=[n-1,ri(0,n-1)];walls=[];const nw=a<=4?0:a<=6?2:4;
    while(walls.length<nw){const w=[ri(0,n-1),ri(0,n-1)];if(!(w[0]===st[0]&&w[1]===st[1])&&!(w[0]===gl[0]&&w[1]===gl[1])&&!walls.some(x=>x[0]===w[0]&&x[1]===w[1]))walls.push(w)}
    if(robPath(n,st,gl,walls)>0)break}
  return {robot:{n,st,gl,walls},voice:["w/LULU_RB_INTRO"],cap:"Help the robot reach the flag!",opts:[],ans:-1,kind:"robot",exp:{t:"",v:[]}}}
function robPath(n,st,gl,walls){const key=p=>p[0]+","+p[1],seen=new Set([key(st)]);let fr=[[st,0]];
  while(fr.length){const [p,d]=fr.shift();if(p[0]===gl[0]&&p[1]===gl[1])return d;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const q2=[p[0]+dx,p[1]+dy];if(q2[0]<0||q2[1]<0||q2[0]>=n||q2[1]>=n||walls.some(w=>w[0]===q2[0]&&w[1]===q2[1])||seen.has(key(q2)))continue;seen.add(key(q2));fr.push([q2,d+1])}}return -1}
function robotQ(q){const R2=q.robot,cc=CATS.find(c=>c.id===L.cat)||{};let prog=[],pos=R2.st.slice(),running=false,miss=0;
  const ARW={r:["➡️",1,0],l:["⬅️",-1,0],u:["⬆️",0,-1],d:["⬇️",0,1]};
  const cell=(x,y)=>x===pos[0]&&y===pos[1]?"🤖":x===R2.gl[0]&&y===R2.gl[1]?"🏁":R2.walls.some(w=>w[0]===x&&w[1]===y)?"🧱":"";
  const draw=()=>{$("rbGrid").innerHTML=Array.from({length:R2.n*R2.n},(_,i)=>{const x=i%R2.n,y=Math.floor(i/R2.n);return `<div class="rbc">${cell(x,y)}</div>`}).join("");
    $("rbProg").innerHTML=prog.length?prog.map(k=>`<span>${ARW[k][0]}</span>`).join(""):`<em>Tap the arrows</em>`};
  $("qBody").innerHTML=`<div class="qkick"><span class="qke">🤖</span>Robot path</div><h2 class="qtitle">Help the robot reach the flag!</h2>
    <div class="rbwrap"><div class="rbgrid" id="rbGrid" style="grid-template-columns:repeat(${R2.n},1fr);grid-template-rows:repeat(${R2.n},1fr)"></div>
    <div class="rbprog" id="rbProg"></div>
    <div class="rbpad"><button data-k="u">⬆️</button><button data-k="l">⬅️</button><button data-k="d">⬇️</button><button data-k="r">➡️</button><button class="rbdel" data-k="x">↩️</button></div></div>
    <button class="qcheck on" id="rbGo">GO ▶</button>`;
  $("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in");draw();
  setTimeout(()=>{if(L&&L.q===q)sayseq(q.voice,()=>{})},400);
  window.__rbSolve=()=>{const key=p=>p+"",prev={},fr=[R2.st],seen=new Set([key(R2.st)]);while(fr.length){const p=fr.shift();if(p[0]===R2.gl[0]&&p[1]===R2.gl[1])break;for(const k of "rlud"){const a2=ARW[k],q2=[p[0]+a2[1],p[1]+a2[2]];if(q2[0]<0||q2[1]<0||q2[0]>=R2.n||q2[1]>=R2.n||R2.walls.some(w=>w[0]===q2[0]&&w[1]===q2[1])||seen.has(key(q2)))continue;seen.add(key(q2));prev[key(q2)]=[p,k];fr.push(q2)}}
    const path=[];let c=R2.gl;while(key(c)!==key(R2.st)){const [p,k]=prev[key(c)];path.unshift(k);c=p}prog=path;draw();$("rbGo").click()};   /* used by the automatic tests */
  $("qBody").querySelectorAll(".rbpad button").forEach(b=>b.onclick=()=>{if(running||q.done)return;sfx.tap();const k=b.dataset.k;if(k==="x")prog.pop();else if(prog.length<14)prog.push(k);pos=R2.st.slice();draw()});
  $("rbGo").onclick=()=>{if(running||q.done||!prog.length)return;running=true;pos=R2.st.slice();draw();let i=0;hush();
    const step=()=>{if(i>=prog.length){running=false;if(pos[0]===R2.gl[0]&&pos[1]===R2.gl[1])return win();miss++;sfx.oops();sayseq(["w/LULU_RB_OOPS"],()=>{});pos=R2.st.slice();setTimeout(draw,900);return}
      const a2=ARW[prog[i]],nx=[pos[0]+a2[1],pos[1]+a2[2]];
      if(nx[0]<0||nx[1]<0||nx[0]>=R2.n||nx[1]>=R2.n||R2.walls.some(w=>w[0]===nx[0]&&w[1]===nx[1])){running=false;miss++;sfx.oops();sayseq(["w/LULU_RB_WALL"],()=>{});$("rbGrid").classList.add("bump");setTimeout(()=>{$("rbGrid").classList.remove("bump");pos=R2.st.slice();draw()},900);return}
      pos=nx;i++;sfx.tap();draw();if(pos[0]===R2.gl[0]&&pos[1]===R2.gl[1]){running=false;return win()}setTimeout(step,450)};
    setTimeout(step,300)};
  const win=()=>{q.done=q.locked=true;q.tries=miss?1:0;logSk(q,true);sfx.good();burstAt($("rbGrid"),40);L.correct++;if(!miss)L.first++;const n=miss?1:2;S.acorns+=n;L.acorns+=n;S.questions++;{const w=wkLog();w.q++;w.right++}save();renderStats();bump("sAcorns");setDot();
    const f=funFact("shapes","robot"),fi=f?+f.c.split("_").pop():-1;setTimeout(()=>{sheet("good why",pickOne(PRAISE_T),f?`<span class="ffact"><b>💡</b><span>${ROBOT_EN[fi]||""}</span></span>`:"");let gone=false;const go=()=>{if(!gone){gone=true;nextQ()}};$("qNext").onclick=()=>{sfx.tap();go()};
      sayseq([pickOne(PRAISE_CLIPS),...(f?["w/"+f.c]:[])],()=>setTimeout(go,1800))},700)};
}
window.__qm=(s)=>qMatch(s,new Set());window.__fa=faSay;
