
/* =====================================================================================================
   v22 (Nov 14): CHANGES FROM THE PARENT'S QUESTION CHECK NOTES
   ===================================================================================================== */
const G13_READY=__G13VOICE__,G13=n=>"w/PX_G13_"+n,FIXCLIPS=new Set(__FIXCLIPS__);
/* pictures drawn for the question (not just decoration) */
const SVG_LUNGS=`<svg viewBox="0 0 120 140" width="130" height="150" aria-label="A body with the lungs in pink"><circle cx="60" cy="20" r="15" fill="#FFD8A8"/><rect x="30" y="38" width="60" height="78" rx="26" fill="#FFE8CC"/><rect x="14" y="44" width="16" height="56" rx="8" fill="#FFE8CC"/><rect x="90" y="44" width="16" height="56" rx="8" fill="#FFE8CC"/><rect x="58" y="40" width="4" height="22" fill="#F08C8C"/><path d="M58 60 q-6 2 -10 6 M62 60 q6 2 10 6" stroke="#F08C8C" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M56 56 C40 52 34 66 34 84 C34 98 44 100 56 94 Z" fill="#FF8FAB" stroke="#E64980" stroke-width="2"/><path d="M64 56 C80 52 86 66 86 84 C86 98 76 100 64 94 Z" fill="#FF8FAB" stroke="#E64980" stroke-width="2"/></svg>`;
const SVG_ROOTS=`<svg viewBox="0 0 140 150" width="150" height="160" aria-label="A tree with its roots in the soil"><rect x="0" y="86" width="140" height="64" fill="#A47148"/><rect x="0" y="86" width="140" height="8" fill="#6B9E3E"/><path d="M64 88 C60 104 50 114 34 124 M70 90 C70 108 70 120 66 140 M76 88 C82 104 94 112 110 120 M66 100 C56 104 48 102 40 98 M74 104 C84 110 92 128 96 136" stroke="#5C3A1E" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="62" y="44" width="16" height="46" rx="4" fill="#8B5A2B"/><circle cx="70" cy="34" r="28" fill="#51CF66"/><circle cx="48" cy="46" r="18" fill="#40C057"/><circle cx="92" cy="46" r="18" fill="#40C057"/></svg>`;
const ROW_SEED=`<div class="g13-row"><span>🫘</span><b>→</b><span>🌱</span><b>→</b><span>🌷</span></div>`;
/* per question: [new age, picture, delete, new question voice, new fact voice, new English text] */
const WQFIX={a19:{a:5,pic:"🕷️"},a22:{a:5},b03:{a:3},n04:{a:3},b11:{a:8,pic:"🍼"},b04:{pic:"🖐️"},b10:{svg:SVG_LUNGS},n02:{svg:SVG_ROOTS},n06:{svg:ROW_SEED},n08:{pic:"🧊"},
  a18:{del:1},
  a28:{qv:"PX_FIX_A28_Q"},b13:{ev:"PX_FIX_B13_E"},
  b05:{qv:"PX_FIX_B05_Q",ev:"PX_FIX_B05_E",q:"Sleep helps keep your body healthy.",x:"When you sleep, your body rests and gets stronger."}};
for(const [id,f] of Object.entries(WQFIX)){const k=WQ.findIndex(w=>w.i===id);if(k<0)continue;
  if(f.del){WQ.splice(k,1);continue}
  if(f.a)WQ[k].a=f.a;
  /* new words only together with Lulu's new recording */
  if(f.q&&FIXCLIPS.has(f.qv)){WQ[k].q=f.q}if(f.x&&FIXCLIPS.has(f.ev)){WQ[k].x=f.x}}
const _qw13=qWatcher;qWatcher=function(cat,used){const q=_qw13(cat,used);if(!q||!q.wid)return q;const f=WQFIX[q.wid];
  /* plain numbers on the answers of the written questions (no dots under them) */
  (q.opts||[]).forEach(o=>{if(/class="dots"/.test(o.h||""))o.h=o.h.replace(/<span class="dots"[^>]*>[\s\S]*?<\/span>/g,"").replace(/<i class="dots"[^>]*>[\s\S]*?<\/i>/g,"")});
  if(!f)return q;
  if(f.pic)q.visual=`<div class="bigpic">${f.pic}</div>`;if(f.svg)q.visual=`<div class="bigpic g13-svg">${f.svg}</div>`;
  if(f.qv&&FIXCLIPS.has(f.qv))q.voice=["w/"+f.qv];
  if(f.ev&&FIXCLIPS.has(f.ev)){if(q.why)q.why.v=["w/"+f.ev];if(q.exp)q.exp.v=["w/"+f.ev]}
  if(f.q&&FIXCLIPS.has(f.qv))q.cap=f.q;if(f.x&&FIXCLIPS.has(f.ev)){if(q.why)q.why.t=f.x;if(q.exp)q.exp.t=(q.tf?(q.ans===0?"✅ True! ":"❌ Not true. "):"")+f.x}
  return q};
/* ages from the notes */
Object.assign(FMAX,{f_bubcol:4,f_ice:5,f_parade:6,f_shapes:5,f_swipe:6,f_teeth:5});
Object.assign(FMIN,{f_shapes:3,f_swipe:4});
/* ---------- v22: pictures for the new true / not true questions ---------- */
const _qw13b=qWatcher;qWatcher=function(cat,used){const q=_qw13b(cat,used);if(q&&q.wid&&q.tf){const w=WQ.find(x=>x.i===q.wid);if(w&&w.pe&&!WQFIX[q.wid])q.visual=`<div class="bigpic">${w.pe}</div>`}return q};
/* ---------- v22: 20 more stories, for each age; holiday stories come back every year around their date ---------- */
const ST2=__STORIES2__;
const ST2_OK=ST2.stories.filter(s=>FIXCLIPS.has("ST_S"+s.s+"_L0")||FIXCLIPS.has("ST_S"+s.s+"_Q0"));
ST2_OK.forEach(s=>{STORIES.push({s:s.s,t:s.t,lines:s.lines,q:s.q,ages:s.ages,when:s.when});ST_E[s.t]=s.e});
Object.assign(ST_EN,ST2.en);
const _qs13=qStory;qStory=function(si,k){const q=_qs13(si,k);const st=STORIES[si];if(st&&st.s>=100&&q&&q.opts){const sq=st.q.find(x=>x.k===k)||st.q[k];if(sq&&sq.opts&&q.opts.length>sq.opts.length){const keep=q.opts.map((o,i)=>({o,i})).filter(({o})=>sq.opts.some(z=>(o.h||"").includes("<small>"+z[1]+"</small>")));if(keep.length===sq.opts.length){const right=q.opts[q.ans];q.opts=keep.map(x=>x.o);q.ans=q.opts.indexOf(right)}}}if(st&&st.s>=100&&q&&q.opts)q.opts.forEach(o=>{const m=String(o.h||"").match(/<small>([\s\S]*?)<\/small>/),lab=m?m[1].trim():"";if(ST2.lab[lab])o.say=["w/"+ST2.lab[lab]]});return q};
const mmdd=d=>String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const inWin=(w,t)=>!w||(w[0]<=w[1]?(t>=w[0]&&t<=w[1]):(t>=w[0]||t<=w[1]));
function storyFor(){const t=mmdd(new Date()),a=S.age||5,ok=s=>{const g=s.ages||[3,6];return a>=g[0]-1&&a<=g[1]+1};
  const idx=STORIES.map((s,i)=>i);const fit=idx.filter(i=>ok(STORIES[i]));
  const seas=fit.filter(i=>STORIES[i].when&&inWin(STORIES[i].when,t));const rest=fit.filter(i=>!STORIES[i].when||inWin(STORIES[i].when,t));
  const n=dayN();if(seas.length&&n%2===0)return seas[Math.floor(n/2)%seas.length];
  const pool=rest.length?rest:idx.filter(i=>!STORIES[i].when);return pool[n%pool.length]}
const _dp13=dayPlan;dayPlan=function(){const p=_dp13();try{p.forEach(x=>{if(x&&x.cat==="story")x.story=storyFor()})}catch(e){}return p};
window.__storyFor=storyFor;

/* numbers above 100 in answers (206 bones, 1000) have their own Farsi clip */
const _fs13=faSay;faSay=function(word){const w=String(word).toLowerCase().trim();if(/^\d+$/.test(w)&&+w>100&&FA_SAY[w])return ["w/"+FA_SAY[w]];return _fs13(word)};
/* ---------- v22b: second round of question-check notes ---------- */
Object.assign(FMAX,{f_fishfood:5,f_puzzle:6,f_quilt:5,f_say:6,f_sci:7,f_sort:6,f_tapall:5});
Object.assign(FMIN,{f_setclock:7});
GRADE.count.oddeven=[2,3];GRADE.count.after=[-1,0];
const _bq13=buildQ;buildQ=function(cat,k,used){let q=_bq13(cat,k,used);
  /* big sums for 7+: no 1 + 1 */
  if(q&&cat==="add"&&k==="big"&&lvl()>=7){for(let t=0;t<15;t++){const ns=String(q.visual||"").replace(/<[^>]+>/g," ").match(/\d+/g)||[];if(ns.length>=2&&ns.every(n=>+n>=3)&&Math.max(...ns.map(Number))>=8)break;q=_bq13(cat,k,used)}}
  /* plain numbers in "which number is missing" */
  if(q&&cat==="count"&&k==="missing"&&q.opts)q.opts.forEach(o=>{o.h=String(o.h||"").replace(/<span class="dots"[^>]*>[\s\S]*?<\/span>/g,"")});
  return q};
/* ---------- v22c: second round of notes - nicer pictures ---------- */
const CAR_SVG=`<svg class="g13-car" viewBox="0 0 64 36" width="48" height="27" aria-hidden="true"><path d="M6 24 L8 14 Q10 10 16 10 L24 4 Q27 2 32 2 L42 2 Q47 2 50 6 L55 12 Q61 13 62 18 L62 24 Z" fill="#FA5252"/><path d="M27 6 L32 5 L41 5 Q44 5 46 8 L49 12 L23 12 Z" fill="#D0EBFF"/><rect x="34" y="5" width="3" height="7" fill="#FA5252"/><circle cx="17" cy="26" r="7" fill="#343A40"/><circle cx="17" cy="26" r="3" fill="#CED4DA"/><circle cx="49" cy="26" r="7" fill="#343A40"/><circle cx="49" cy="26" r="3" fill="#CED4DA"/><rect x="58" y="16" width="4" height="3" rx="1" fill="#FFE066"/></svg>`;
const MIC13=`<svg class="g13-mic" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><rect x="8" y="2" width="8" height="13" rx="4" fill="#fff"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><path d="M12 18v3.5M8.5 21.5h7" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><rect x="10" y="4.5" width="2" height="5" rx="1" fill="#FFC9C9"/></svg>`;
const KID_C=["#4DABF7","#FF8787","#69DB7C","#FFD43B","#B197FC"],KID_H=["#5C3A1E","#212529","#E8590C","#5C3A1E","#F08C00"];
const KID_SVG=i=>`<svg class="g13-kid" viewBox="0 0 40 72" width="34" height="62" aria-hidden="true"><circle cx="20" cy="14" r="10" fill="#FFD8A8"/><path d="M10 13 Q10 3 20 3 Q30 3 30 13 Q26 8 20 8 Q14 8 10 13Z" fill="${KID_H[i%5]}"/><circle cx="16.5" cy="15" r="1.4" fill="#343A40"/><circle cx="23.5" cy="15" r="1.4" fill="#343A40"/><path d="M16.5 19 Q20 22 23.5 19" stroke="#C92A2A" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M9 30 Q9 25 14 25 L26 25 Q31 25 31 30 L31 46 L9 46Z" fill="${KID_C[i%5]}"/><path d="M9 30 L4 42 M31 30 L36 42" stroke="#FFD8A8" stroke-width="4" stroke-linecap="round"/><rect x="12" y="46" width="6" height="20" rx="3" fill="#495057"/><rect x="22" y="46" width="6" height="20" rx="3" fill="#495057"/><ellipse cx="14" cy="67" rx="5" ry="3" fill="#343A40"/><ellipse cx="26" cy="67" rx="5" ry="3" fill="#343A40"/></svg>`;
const PEN_C=["#FFD43B","#74C0FC","#FF8787","#8CE99A"];
const _bq13c=buildQ;buildQ=function(cat,k,used){let q=_bq13c(cat,k,used);if(!q)return q;
  /* friends with a whole body, not just a head */
  if(cat==="add"&&k==="share"&&q.visual)q.visual=q.visual.replace(/<span class="grp">((?:🧒)+)<\/span>/,(m,s)=>`<span class="grp g13-kids">${Array.from({length:[...s].length/[..."🧒"].length},(_,i)=>KID_SVG(i)).join("")}</span>`);
  /* longer / shorter: real coloured pencils */
  if(cat==="count"&&k==="long"&&q.opts)q.opts.forEach((o,i)=>{const w=(String(o.h).match(/width:(\d+)%/)||[])[1]||50;o.h=`<span class="g13-len"><span class="g13-pen" style="width:${w}%;--c:${PEN_C[i%4]}"></span></span>`});if(cat==="count"&&k==="long")q.style="cards";
  /* bigger, clearer picture graph */
  if(cat==="count"&&k==="graph"&&q.visual)q.visual=q.visual.replace('class="graph"','class="g13-graph"').replace(/class="gbar"/g,'class="g13-gb"').replace(/<span class="gl">/g,'<span class="g13-gl">');
  /* "what comes after": bigger numbers as the child gets them right */
  if(cat==="count"&&k==="after"){const r=S.sk&&S.sk["count|"+skName("count","after")],tier=Math.min(3,Math.floor(((r&&r.f)||0)/5))+(lvl()>=7?1:0);
    if(tier>=1){const top=[0,30,60,100,100][tier],lo=tier>=2?20:10,n=ri(lo,top-1);
      q=Object.assign({},q,{voice:["w/LULU_C_AFTER1",...fNum(n)],cap:`${n} → ?`,visual:`<div class="seq"><b class="bignum sm">${n}</b><span class="arr">➜</span><b class="bignum sm q">?</b></div>`,line:null,hint:"elim",exp:{t:`${n} → ${n+1}`,v:["w/LULU_ANS_IS",...fNum(n+1)]}},numOpts(n+1,[n,n+2,n+10,n-1].filter(x=>x>0&&x!==n+1)))}}
  return q};
/* learn: count pictures in a neat bunch, bigger */
const _lrT13=lrThings;lrThings=function(cat){const r=_lrT13(cat);if(r&&(cat==="count"||cat==="add"||cat==="clock"))r.forEach(t=>{const n=t.num||1,c=n<=3?n:n===4?2:n<=6?3:n<=8?4:n===9?3:5;t.p=t.p.replace('<span class="lr-row">',`<span class="lr-row g13-bunch" style="--c:${c}">`).replace(/<span class="lr-row g13-bunch" style="--c:\d+">([^<]*)<\/span>/,(m,s)=>m.replace(s,[...s.matchAll(/\p{Extended_Pictographic}\uFE0F?/gu)].map(x=>`<i>${x[0]}</i>`).join("")))});return r};
/* microphone: one drawn mic everywhere */
const micFix=root=>{(root||document).querySelectorAll(".sy-mic,.qmic-i").forEach(b=>{if(b.textContent.trim()==="🎤")b.innerHTML=MIC13})};
try{new MutationObserver(()=>micFix()).observe(document.body,{childList:true,subtree:true})}catch(e){}
/* game wrappers (after the game draws itself) */
const g13wrap=(name,fn)=>{const o=GAMES[name];if(o)GAMES[name]=function(q){const r=o(q);try{fn(q)}catch(e){}return r}};
const FLIP13=new Set(["🐕","🐇","🐈","🏃","🐢","🐩"]);
Object.assign(RUNNERS,{animals:["🐇","🪵"],farm:["🐕","🌵"],people:["🏃","🪨"],memory:["🐈","🌵"]});
g13wrap("run",q=>{const h=$("rnH");if(h){h.innerHTML=`<i class="g13-runner${FLIP13.has(q.h)?" flip":""}">${q.h}</i>`}});
g13wrap("grow",q=>{const p=$("grP");if(!p)return;p.innerHTML=`<svg viewBox="0 0 60 30" width="60" height="30"><ellipse cx="30" cy="24" rx="28" ry="8" fill="#8B5A2B"/><ellipse cx="30" cy="18" rx="7" ry="5" fill="#C08457" stroke="#7A4A1E" stroke-width="1.5"/></svg>`;
  const w=document.createElement("span");w.className="g13-pw";p.parentNode.insertBefore(w,p);w.appendChild(p);w.insertAdjacentHTML("beforeend",`<svg class="g13-pot" viewBox="0 0 100 70" width="110" height="77"><rect x="4" y="0" width="92" height="16" rx="5" fill="#E8590C"/><path d="M12 16 L88 16 L78 68 L22 68Z" fill="#FD7E14"/><path d="M20 30 L80 30" stroke="#E8590C" stroke-width="3"/><rect x="4" y="0" width="92" height="6" rx="3" fill="#8B5A2B"/></svg>`)});
g13wrap("plate",q=>{const d=$("plD");if(!d)return;const t=document.createElement("div");t.className="g13-table";d.parentNode.insertBefore(t,d);
  t.innerHTML=`<svg viewBox="0 0 20 110" width="18" height="100" aria-hidden="true"><path d="M3 4v26q0 8 7 8t7-8V4M10 4v24" stroke="#ADB5BD" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="7.5" y="36" width="5" height="70" rx="2.5" fill="#ADB5BD"/></svg>`;t.appendChild(d);
  t.insertAdjacentHTML("beforeend",`<svg viewBox="0 0 20 110" width="18" height="100" aria-hidden="true"><path d="M10 4 Q18 10 16 50 L10 50Z" fill="#CED4DA"/><rect x="7" y="48" width="6" height="58" rx="3" fill="#ADB5BD"/></svg>`)});
g13wrap("traffic",q=>{const r=$("qBody").querySelector(".g7-road");if(r){r.classList.add("g13-road");r.insertAdjacentHTML("afterbegin",`<b class="g13-zebra"></b>`)}});
g13wrap("bridge",q=>{const c=$("brC");if(c)c.innerHTML=CAR_SVG;const b=$("qBody").querySelector(".g7-br");if(b)b.classList.add("g13-br")});
g13wrap("beam",q=>{const f=$("bmF");if(f)f.classList.add("g13-bm")});
g13wrap("catch",q=>{const f=$("caF");if(f)f.classList.add("g13-sky")});
g13wrap("spy",q=>{const f=$("qBody").querySelector(".sp-scene");if(f)f.classList.add("g13-spy")});
/* the balance walker: a whole little friend */
const _qb13=qBeam6;qBeam6=function(){const q=_qb13();q.who=pickOne(["🐧","🧸","🦩","🐥"]);return q};
G6F.beam=qBeam6;
/* whose shadow: harder for children who keep getting it */
const _qs7=qShadow7;qShadow7=function(){const q=_qs7(),g=gxOf("sil")+(lvl()>=7?1:0);if(g>=1){const pool=sh(SIL.filter(a=>both(a[0]).length&&a!==q.t));q.o=sh([q.t,...pool.slice(0,g>=2?5:4)]);q.hard=g}return q};G7F.sil=qShadow7;
g13wrap("sil",q=>{const s=$("qBody").querySelector(".g7-sil");if(s&&q.hard)s.classList.add(q.hard>=3?"h3":q.hard>=2?"h2":"h1")});
/* ramp: the car rolls down the slope and slides along the floor */
GAMES.ramp=function(q){let h=1,miss=0,busy=false;
  gShow(`<div class="game">${gHead("🏎️","Ramp race","Stop the car on the flag!")}<div class="rp g13-rp" id="rpF"><svg viewBox="0 0 320 150" class="rp-svg"><path id="rpR" fill="#C49A6C" stroke="#9E7444" stroke-width="3"/><rect x="0" y="130" width="320" height="20" fill="#8CE99A"/>
      ${[1,2,3,4,5].map(i=>`<line x1="${70+i*45}" y1="128" x2="${70+i*45}" y2="134" stroke="#2F9E44" stroke-width="3"/>`).join("")}</svg><span class="rp-flag" style="left:${(70+q.t*45)/320*100}%">🚩</span><span class="rp-car g13-rpc" id="rpC">${CAR_SVG}</span></div>
    <div class="rp-ctl"><span>Ramp height</span><button class="sc-t" id="rpD">➖</button><b id="rpH">1</b><button class="sc-t" id="rpU">➕</button></div><button class="qcheck on" id="rpG">GO! 🏁</button></div>`);gAsk(q);
  const C=$("rpC"),CW=40,CH=24;let anim=null;
  /* car box: its bottom-middle sits on the road */
  const at=(x,y,a)=>({left:(x-CW/2)/320*100+"%",top:(y-CH)/150*100+"%",transform:`rotate(${a}deg)`});
  const geo=()=>{const top=130-h*20,a=Math.atan2(h*20,70)*180/Math.PI;return {top,a}};
  const draw=()=>{const {top,a}=geo();$("rpR").setAttribute("d",`M0 ${top} L70 130 L0 130Z`);$("rpH").textContent=h;if(anim){anim.cancel();anim=null}Object.assign(C.style,at(CW/2*Math.cos(a/57.3),top+CW/2*Math.sin(a/57.3),a))};draw();
  $("rpU").onclick=()=>{if(!busy&&h<5){h++;sfx.tap();draw()}};$("rpD").onclick=()=>{if(!busy&&h>1){h--;sfx.tap();draw()}};
  $("rpG").onclick=()=>{if(busy||q.done)return;busy=true;g6tone(200,.8,"sawtooth",.08);const {top,a}=geo(),end=70+h*45-6;
    const k=[at(CW/2*Math.cos(a/57.3),top+CW/2*Math.sin(a/57.3),a),Object.assign(at(70-CW/2*Math.cos(a/57.3)*.6,130-CW/2*Math.sin(a/57.3)*.6,a),{offset:.32,easing:"linear"}),Object.assign(at(78,130,0),{offset:.4,easing:"cubic-bezier(.2,.6,.35,1)"}),at(end,130,0)];
    k[0].easing="cubic-bezier(.5,0,1,1)";
    anim=C.animate(k,{duration:2200,fill:"forwards"});
    setTimeout(()=>{busy=false;if(h===q.t)gameWin(q,miss,C,[]);else{miss++;toastHint(h<q.t?"Not far enough - make the ramp higher ⬆️":"Too far - make the ramp lower ⬇️");if(miss>=4){q.done=true;h=q.t;draw();gameLearn(q,"Higher ramp = farther!",[])}else setTimeout(draw,900)}},2300)};
  window.__gSolve=()=>{h=q.t;draw();$("rpG").click()}};
