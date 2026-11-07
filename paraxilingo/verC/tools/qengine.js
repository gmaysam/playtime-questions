/* ================= question engine (verC): spoken, picture-first, always positive ================= */
/* Every question is read aloud by Lulu (Farsi). Clips come from the Watcher Device library (audio/w/). */
const WQ=__WQ__;
const VOICED=new Set(__VOICED__);
const PIC_E=__PIC_E__;
const WORD_E=__WORD_E__;
const N=n=>n>=0&&n<=20?"w/LULU_N"+n:null;
/* the new, cuter Domi (vector) everywhere */
bv=function(w){return `<span class="bv" style="width:${w}px;--w:${w}px"><img src="img/domi.svg" alt=""></span>`};
/* Farsi names of answer words (Watcher clips + Paraxilingo's own PX_FA_* clips) */
const FA_SAY=__FA_SAY__;
const PLANET_N=["sun","mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"];
const DINOS=["t-rex","tyrannosaurus","triceratops","stegosaurus","brachiosaurus","velociraptor","diplodocus","pterodactyl"];
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
const numOpt=n=>({h:`<b class="num">${n}</b>${dots(n)}`,say:[N(n)]});
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
  if(cat==="clock")return a<=5?["routine","oclock"]:a<=6?["routine","oclock","half","season"]:a<=7?["half","quarter","season","oclock"]:["quarter","minutes","half"];
  if(cat==="money")return a<=5?["pennies","value"]:a<=6?["pennies","value","count"]:a<=7?["value","count","same"]:["count","same","change"];
  return ["w"];
}
const MAXN=()=>{const a=lvl();return a<=4?5:a<=6?10:a<=7?20:100};

/* ---------- builders ---------- */
function qCount(k){
  const mx=Math.min(MAXN(),20),e=pickOne(OBJ);
  if(k==="find"){const n=ri(2,Math.min(mx,10)),c=sh([n,...sh(near(n).filter(x=>x>=1&&x<=12&&x!==n)).slice(0,2)]);
    return {voice:["w/LULU_C_FIND",N(n)],cap:`Find ${n}`,visual:`<div class="bignum">${n}</div>`,opts:c.map(x=>({h:grp(x,e),say:null})),ans:c.indexOf(n),layout:"col",hint:"elim",exp:{t:`${n}`,v:["w/LULU_ANS_IS"]}}}
  if(k==="more"||k==="less"){let a=ri(1,Math.min(mx,9)),b;do{b=ri(1,Math.min(mx,9))}while(b===a||Math.abs(a-b)>4);const o=[a,b],r=k==="more"?Math.max(a,b):Math.min(a,b);
    return {voice:[k==="more"?"w/LULU_CP_MORE":"w/LULU_CP_LESS"],cap:k==="more"?"Which has more?":"Which has less?",visual:`<div class="listen">⚖️</div>`,opts:o.map(x=>({h:grp(x,e)})),ans:o.indexOf(r),layout:"row",hint:"count",exp:{t:`${r}`,v:["w/LULU_ANS_IS"]}}}
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
      visual:`<div class="domisays">${bv(78)}<div class="bub"><b>${a} ${op} ${b} = ${shown}</b></div></div>`,opts:[{h:"<span class='yn'>✅</span>"},{h:"<span class='yn'>❌</span>"}],ans:ok?0:1,layout:"yn",hint:"dots",a,b,
      exp:{t:`${a} ${op} ${b} = ${r}`,v:[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS",N(r)]}}}
  return Object.assign({voice:spoken?[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS"]:["q_choose"],cap:"",visual:eq,layout:"row3",hint:spoken&&r<=10?"dots":"elim",
    exp:{t:`${a} ${op} ${b} = ${r}`,v:spoken?[N(a),op==="+"?"w/LULU_PLUS":"w/LULU_MINUS",N(b),"w/LULU_EQUALS",N(r)]:["w/LULU_ANS_IS"]}},numOpts(r,near(r).concat([r+10,r-10])));
}
const dig=(h,m)=>`${h}:${String(m).padStart(2,"0")}`;
function qClock(k){
  if(k==="routine"){const r=pickOne(ROUTINES);return {voice:["c_routine"],cap:"Morning or night?",visual:`<div class="bigemo">${r[0]}</div>`,opts:[{h:"<span class='yn'>☀️</span><small>Morning</small>",say:faSay("morning")},{h:"<span class='yn'>🌙</span><small>Night</small>",say:faSay("night")}],ans:r[2],layout:"yn",hint:"elim",exp:{t:r[2]?"Night 🌙":"Morning ☀️",v:["w/LULU_ANS_IS"]}}}
  if(k==="season"){const sz=pickOne(SEASONS),SE={Winter:"⛄",Spring:"🌸",Summer:"☀️",Autumn:"🍂"},o=sh(["Winter","Spring","Summer","Autumn"]);
    return {voice:["c_season"],cap:"Which season?",visual:`<div class="bigemo">${sz[0]}</div>`,opts:o.map(x=>({h:`<span class="oe">${SE[x]}</span><small>${x}</small>`,say:faSay(x)})),ans:o.indexOf(sz[2]),layout:"grid",hint:"elim",exp:{t:sz[2],v:["w/LULU_ANS_IS"]}}}
  const h=ri(1,12),m=k==="oclock"?0:k==="half"?30:k==="quarter"?pickOne([15,45]):ri(1,11)*5;
  const w=[dig(hh(h+1),m),dig(hh(h-1),m),dig(h,m===30?0:30),dig(h,(m+15)%60)];
  const o=sh([dig(h,m),...sh([...new Set(w.filter(x=>x!==dig(h,m)))]).slice(0,2)]);
  return {voice:["c_read"],cap:"What time is it?",visual:clockSVG(h,m),opts:o.map(x=>({h:`<b class="num t">${x}</b>`})),ans:o.indexOf(dig(h,m)),layout:"row3",hint:"clock",exp:{t:`${dig(h,m)}  (${tName(h,m)})`,v:["w/LULU_ANS_IS"]}};
}
function qMoney(k){
  const a=lvl();
  if(k==="pennies"){const n=ri(2,a<=5?5:9);return Object.assign({voice:["m_count"],cap:"How many cents?",visual:coinsHTML(Array(n).fill("p"),false),layout:"row3",hint:"coins",exp:{t:`${n}¢`,v:["w/LULU_ANS_IS"]}},cents(n,near(n)))}
  if(k==="value"){const pool=a<=5?["p","n"]:a<=6?["p","n","d"]:["p","n","d","q"],c=pickOne(pool),o=sh(pool.map(x=>COINS[x].v)).slice(0,Math.min(3,pool.length));if(!o.includes(COINS[c].v))o[0]=COINS[c].v;const oo=sh(o);
    return {voice:["m_value"],cap:COINS[c].name,visual:coinsHTML([c],false).replace(/width="([\d.]+)" height="([\d.]+)"/,(x,w,h)=>`width="${w*1.9}" height="${h*1.9}"`)+`<div class="coinname">${COINS[c].name}</div>`,opts:oo.map(v=>({h:`<b class="num">${v}¢</b>`,say:[N(v)]})),ans:oo.indexOf(COINS[c].v),layout:oo.length===2?"yn":"row3",hint:"elim",exp:{t:`${COINS[c].name} = ${COINS[c].v}¢`,v:["w/LULU_ANS_IS"]}}}
  if(k==="count"){let ks;const pool=a<=6?["p","n"]:a<=7?["p","n","d"]:["p","n","d","q"],cap=a<=6?20:a<=7?50:99;do{ks=Array.from({length:ri(2,4)},()=>pickOne(pool))}while(sumC(ks)>cap);ks.sort((x,y)=>COINS[y].v-COINS[x].v);const t=sumC(ks);
    return Object.assign({voice:["m_count"],cap:"How much money?",visual:coinsHTML(ks,false),layout:"row3",hint:"coins",exp:{t:ks.map(x=>COINS[x].v+"¢").join(" + ")+` = ${t}¢`,v:["w/LULU_ANS_IS"]}},cents(t,[t+1,t-1,t+5,t-5,t+10]))}
  const m=makeMoney();const q={voice:[m.audio],cap:m.title,visual:m.visual,opts:m.opts.map(x=>({h:/<svg/.test(x)?x:`<b class="num">${x}</b>`})),ans:m.ans,layout:m.wide?"col":"row3",hint:"elim",exp:{t:m.answerText||m.opts[m.ans].replace(/<[^>]+>/g,""),v:["w/LULU_ANS_IS"]}};
  return q;
}
function cents(r,c){const w=sh([...new Set(c.filter(x=>x>0&&x!==r))]).slice(0,2),o=sh([r,...w]);return {opts:o.map(x=>({h:`<b class="num">${x}¢</b>`,say:[N(x)]})),ans:o.indexOf(r)}}

/* Watcher Device questions: Lulu reads the question and the explanation */
const SKY_TF=[1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0];
const SKY_TF_E=["☀️","🌙","🌍","⭐","☁️","🌙","🌈","🧑‍🚀","🪐","🌌","⛈️","☀️","🌍","🌙","❄️","☄️"];
const SKY_TF_T=["The sun is a star.","The moon is a planet.","We live on planet Earth.","Stars are there only at night.","Clouds are made of tiny drops of water.","The moon has its own light.","A rainbow has seven colours.","Astronauts float in space.","Jupiter is smaller than Earth.","Our galaxy is the Milky Way.","Thunder is the loud sound of the sky.","The sun turns off at night.","The Earth goes around the sun.","There is air to breathe on the moon.","Snow is frozen water.","A comet is a real star with a tail."];
function wPool(cat){
  const pre={animals:["a"],world:["b","n"],sky:["s","p"]}[cat],young=S.age<=7;
  return WQ.filter(w=>pre.includes(w.i[0])&&w.a<=Math.max(3,S.age)&&(!young||VOICED.has(w.i)));
}
const TEXT_E=[["penguin","🐧"],["whale","🐋"],["giraffe","🦒"],["octopus","🐙"],["elephant","🐘"],["spider","🕷️"],["cheetah","🐆"],["bear","🐻"],["owl","🦉"],["hands","🧼"],["teeth","🦷"],["heart","❤️"],["bones","🦴"],["eyes","👀"],["nose","👃"],["ears","👂"],["sleep","😴"],["water","💧"],["cactus","🌵"],["mushroom","🍄"],["mountain","⛰️"],["river","🏞️"],["volcano","🌋"],["carrot","🥕"],["milk","🥛"],["moon","🌙"],["sun","☀️"],["star","⭐"],["rain","🌧️"],["fog","🌫️"],["wind","🌬️"],["planet","🪐"],["plant","🌱"],["flower","🌸"],["tree","🌳"],["bird","🐦"],["fish","🐟"],["egg","🥚"]];
const wEmoji=w=>{if(w.p&&PIC_E[w.p])return PIC_E[w.p];const t=w.q.toLowerCase();for(const [k,e] of TEXT_E)if(t.includes(k))return e;return "🤔"};
const optE=o=>WORD_E[o.toLowerCase()]||"";
function qWatcher(cat,used){
  if(cat==="sky"&&Math.random()<.3){const k=sh([...Array(16).keys()]).find(i=>!used.has("tf"+i));if(k!==undefined){used.add("tf"+k);
    return {voice:["w/LULU_TF"+k],cap:SKY_TF_T[k],visual:`<div class="bigpic">${SKY_TF_E[k]}</div>`,opts:[{h:"<span class='yn'>✅</span>"},{h:"<span class='yn'>❌</span>"}],ans:SKY_TF[k]?0:1,layout:"yn",hint:"again",exp:{t:SKY_TF_T[k]+(SKY_TF[k]?" ✅ True!":" ❌ Not true."),v:["w/LULU_ANS_IS"]}}}}
  let pool=wPool(cat).filter(w=>!used.has(w.i)&&!S.seenW.includes(w.i));
  if(!pool.length){S.seenW=S.seenW.filter(i=>!wPool(cat).some(w=>w.i===i));pool=wPool(cat).filter(w=>!used.has(w.i))}
  /* avoid two of the same small topic (e.g. body, nature) in one mound */
  const tops=new Set([...used].map(i=>(WQ.find(w=>w.i===i)||{}).t));const fresh=pool.filter(w=>!tops.has(w.t));const w=pickOne(fresh.length?fresh:pool);
  if(!w)return qCount("find");
  used.add(w.i);S.seenW.push(w.i);
  const v=VOICED.has(w.i),qv=v?[`w/${w.i}_q_lulu`]:["q_choose"],ev=v?[`w/${w.i}_e_lulu`]:["w/LULU_ANS_IS"];
  if(w.k==="tf")return {voice:qv,cap:w.q,visual:`<div class="bigpic">${wEmoji(w)}</div>`,opts:[{h:"<span class='yn'>✅</span>"},{h:"<span class='yn'>❌</span>"}],ans:w.n,layout:"yn",hint:"again",exp:{t:(w.n===0?"✅ True! ":"❌ Not true. ")+w.x,v:ev}};
  return {voice:qv,cap:w.q,visual:`<div class="listen">${(()=>{const t=w.q.toLowerCase(),oe=w.o.map(optE);for(const [k,e] of TEXT_E)if(t.includes(k)&&!oe.includes(e))return e;return catById(cat).e})()}</div>`,opts:w.o.map(o=>({h:`<span class="oe">${optE(o)||"🔹"}</span><small>${o}</small>`,say:faSay(o)})),ans:w.n,layout:w.o.length>2?"row3":"yn",hint:"elim",exp:{t:`${w.o[w.n]}: ${w.x}`,v:ev}};
}
/* Story time (Domi's Radio): stories and questions from the Watcher Device, 5 voices */
const STORIES=__STORIES__;
const ST_E={Picnic:"🧺",Rainbow:"🌈",Farm:"🐄",House:"🏠",Trip:"✈️",Seed:"🌱",Sea:"🌊",Clock:"⏰",Market:"🛒"};
function qStory(si,k){
  const st=STORIES[si],q=st.q.find(x=>x.k===k)||st.q[k],nums=!!q.nums;
  const opts=nums?q.nums.map(numOpt):q.opts.map(o=>({h:`<span class="oe">${o[0]}</span><small>${o[1]}</small>`,say:faSay(o[1])}));
  return {voice:[`w/ST_S${st.s}_Q${q.k}`],cap:"",visual:`<div class="listen radio">${ST_E[st.t]||"📻"}</div>`,opts,ans:q.ans,layout:"row3",hint:"elim",story:si,exp:{t:nums?String(q.nums[q.ans]):q.opts[q.ans][1],v:["w/LULU_ANS_IS"]}};
}
function buildQ(cat,kind,used){
  if(cat==="count")return qCount(kind);
  if(cat==="add")return qAdd(kind);
  if(cat==="clock")return qClock(kind);
  if(cat==="money")return qMoney(kind);
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
  $("qBody").innerHTML=`<div class="qtop"><button class="qspk" id="qSpk" aria-label="Hear the question again"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>${q.cap?`<span class="cap">${q.cap}</span>`:""}</div>
    <div class="qvis">${q.visual}</div>
    <div class="qopts ${q.layout}">${q.opts.map((o,j)=>`<button class="qo t${tints[j%4]}" data-j="${j}">${o.h}</button>`).join("")}</div>`;
  $("qSpk").onclick=()=>{sfx.tap();ask(q)};
  $("qBody").querySelectorAll(".qo").forEach(b=>b.onclick=()=>pick(+b.dataset.j,b));
  $("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in");
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
    sayseq(["w/LULU_TRY_ONCE"],()=>giveHint(q,()=>{q.locked=false}));
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
