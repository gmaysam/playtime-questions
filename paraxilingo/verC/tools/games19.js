/* ================= v39: TEN MORE GAMES (ages 4-10), MOVIE SOUNDS =================
   Who said it? / Arash's mix-up / Dad's riddles / Mom's shopping / What happens next? /
   Machine detective / Sound safari / What should I say? / Sara's English words / Count the sounds.
   Movie sounds: each movie plays a quiet sound of its own (rain, bees, a rocket...) when the sound setting is on. */
const D39=__G39__;
const FAM39={sara:["👧","Sara","PX_N39_SARA"],arash:["👦","Arash","PX_N39_ARASH"],mom:["👩","Mom","PX_N39_MOM"],dad:["👨","Dad","PX_N39_DAD"]};
(function(){const st=document.createElement("style");st.textContent=`
.g39-stage{display:flex;flex-direction:column;align-items:center;gap:8px;margin:6px auto 10px;max-width:560px;width:100%}
.g39-big{font-size:72px;line-height:1;transition:transform .15s}.g39-big.hit{transform:scale(1.25)}
.g39-ear{border:0;border-radius:50%;width:96px;height:96px;font-size:48px;background:#fff6e0;box-shadow:0 3px 0 rgba(0,0,0,.12);cursor:pointer}
.g39-ear.on{box-shadow:0 0 0 6px #ffd34d}
.g39-row{display:flex;align-items:flex-end;gap:8px;width:100%}
.g39-again{display:block;margin:0 auto 8px;border:0;border-radius:14px;background:#e9f3ff;color:#2a5ea8;font-size:15px;padding:6px 14px;cursor:pointer}
.g39-o.n4{display:grid!important;grid-template-columns:1fr 1fr}.g39-o .q31-b{display:flex;align-items:center;justify-content:center;gap:6px}.g39-o .q31-b span{font-size:28px}
.g39-mv{width:100%;max-width:540px;aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#eee}.g39-mv img{width:100%;height:100%;object-fit:cover;display:block}
.g39-sl{display:flex;gap:6px;justify-content:center}.g39-sl i{width:44px;height:52px;border-radius:10px;background:#fff;border:3px dashed #d8c49a;display:flex;align-items:center;justify-content:center;font:700 30px/1 system-ui;font-style:normal;color:#5a3d00;text-transform:lowercase}
.g39-sl i.f{border-style:solid;border-color:#7bc96f;background:#effbea}
.g39-tl{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:6px}.g39-tl button{width:52px;height:56px;border:0;border-radius:12px;background:#fff3c4;box-shadow:0 3px 0 #e0c46a;font:700 30px/1 system-ui;color:#5a3d00;cursor:pointer;text-transform:lowercase}
.g39-tl button.used{visibility:hidden}`;document.head.appendChild(st)})();
const age39=()=>S.age||6;
/* --- movie sounds: quiet, once per movie, only with the sound setting on --- */
const MFX39={};for(const k in D39.mfx)for(const n of D39.mfx[k])MFX39[n]=k;
let mfxA39=null,mfxT39=null;
function movieFxStop39(){clearInterval(mfxT39);if(mfxA39){try{mfxA39.pause()}catch(e){}mfxA39=null}}
function movieFx39(n){movieFxStop39();const k=MFX39[n];if(!k||!S.fx)return;const q=L&&L.q;
  try{const a=new Audio("audio/w/SFX39_m_"+k+".mp3");a.volume=.32;mfxA39=a;a.play().catch(()=>{});const t0=Date.now();
    mfxT39=setInterval(()=>{if(!mfxA39||mfxA39!==a){clearInterval(mfxT39);return}const el=Date.now()-t0;
      if(!L||L.q!==q||el>7500)movieFxStop39();else if(el>6000)a.volume=Math.max(0,a.volume-.06)},250)}catch(e){}}
window.movieFx39=movieFx39;
function fx39(name,onEnd,vol){if(!S.fx&&!S.voice){onEnd&&onEnd();return}try{const a=new Audio("audio/w/SFX39_"+name+".mp3");a.volume=vol||1;let d=false;const e=()=>{if(d)return;d=true;onEnd&&onEnd()};a.onended=e;a.onerror=e;setTimeout(e,4500);a.play().catch(e)}catch(x){onEnd&&onEnd()}}
const bub39=(who,txt,r)=>{const W=FAM39[who]||["🙂",who];return `<div class="t38-row on${r?" r":""} g39-row"><div class="t38-av">${W[0]}</div><div class="t38-bub"><b>${W[1]}</b>${txt}</div></div>`};
const eo39=(e,en,c)=>({h:`<span>${e}</span>${en}`,say:["w/"+c]});
/* --- one engine for all ten: a round = stage + "pre" (listen/watch) + question with options read aloud --- */
const MK39={};
function q39(game,gid,cat,rounds,voice,factT){if(!rounds||!rounds.length)return null;return {game,gid,cat,rounds,voice,factT,factV:[]}}
function run39(q,icon,kick,title){let ri=0,miss=0;
  gShow(`<div class="game">${gHead(icon,kick,title)}<div class="g39-stage" id="g39s"></div><div class="q31" id="g39q"></div></div>`);
  const alive=()=>!q.done&&L&&L.q===q&&$("g39s");
  const round=()=>{const R=q.rounds[ri],first=ri===0;ri++;const P=MK39[q.game](R,q,first);q._p=P;let tries=0;
    $("g39q").innerHTML="";$("g39s").innerHTML=P.stage||"";if(typeof e3fix==="function")e3fix($("g39s"));
    const ask=()=>{if(!alive())return;
      $("g39q").innerHTML=(P.again?`<button class="g39-again" id="g39a">🔁 Again</button>`:"")+`<div class="q31-cap">${P.cap||""}</div><div class="q31-o g39-o${P.yn?" yn":""}${P.opts.length===4?" n4":""}">${P.opts.map((o,i)=>`<button class="opt q31-b" data-i="${i}">${o.h}</button>`).join("")}</div>`;
      if(typeof e3fix==="function")e3fix($("g39q"));
      const bs=[...$("g39q").querySelectorAll(".q31-b")];
      if(P.again)$("g39a").onclick=()=>{window.__optTok={};hush();P.pre(()=>rd31(q,{voice:P.voice2||[],opts:P.opts},bs,null,()=>{}))};
      bs.forEach(b=>b.onclick=()=>{if(q.done||b.classList.contains("no")||b.classList.contains("ok"))return;window.__optTok={};hush();const i=+b.dataset.i;
        if(i===P.ans){sfx.good();b.classList.add("ok");burstAt(b,12);const ex=P.ex||[];if(P.right)P.right();sayseq(ex,()=>{});
          setTimeout(()=>{if(!alive())return;if(ri<q.rounds.length)round();else gameWin(q,miss>1?1:0,b)},P.wait||(ex.length?4300:1700))}
        else{sfx.oops();miss++;tries++;b.classList.add("no");bounce(b);
          if(tries<2){toastHint("Not quite - try again!");sayseq(["w/LULU_TRY_ONCE"],()=>{})}else{bs[P.ans].classList.add("hint");toastHint("Look again!")}}});
      rd31(q,{voice:P.voice||[],opts:P.opts},bs,null,()=>{})};
    q._ask=ask;
    if(P.custom){P.custom(()=>{if(!alive())return;if(ri<q.rounds.length)round();else gameWin(q,q._miss>1?1:0,$("g39s"))});return}
    hush();setTimeout(()=>{if(!alive())return;let d=0;const go=()=>{if(d)return;d=1;setTimeout(ask,350)};setTimeout(go,P.guard||12000);(P.pre||(f=>f()))(go)},400)};  /* a clip that never ends must not stop the game */
  round();
  window.__gSolve=()=>{const go=()=>{if(!alive())return;const P=q._p;if(P&&P.solve)P.solve();else{const bs=$("g39q").querySelectorAll(".q31-b");if(P&&bs.length&&!bs[P.ans].classList.contains("ok"))bs[P.ans].click()}setTimeout(go,1200)};go()}}

/* 1. WHO SAID IT? (5-9) - a family member says a line from Family talk; which one said it? */
MK39.who39=(R,q,first)=>{const ks=["sara","arash","mom","dad"];return {stage:`<button class="g39-ear" id="g39e">🔊</button>`,
  pre:f=>{const e=$("g39e");if(e)e.classList.add("on");sayseq([...(first?["w/PX_G39_WHO"]:[]),"w/"+R[0]],()=>{const e=$("g39e");if(e)e.classList.remove("on");f()})},again:1,
  cap:"Who said it?",opts:ks.map(k=>eo39(FAM39[k][0],FAM39[k][1],FAM39[k][2])),ans:ks.indexOf(R[1]),right:()=>{$("g39s").innerHTML=bub39(R[1],R[2])},wait:2600}};
function qWho39(cat){const a=age39(),P=D39.who.filter(x=>x[3]<=a);const pick=[];const seen={};for(const x of sh(P)){if(pick.length>=(a<=6?3:4))break;if(seen[x[1]]>=2)continue;seen[x[1]]=(seen[x[1]]||0)+1;pick.push(x)}
  return q39("who39","g:who39",cat,pick,["w/PX_G39_WHO"],"Every voice is a little different: we can tell who is talking just by listening.")}
/* 2. ARASH'S MIX-UP (7-10) - Arash says something; is it right? */
MK39.mix39=(R,q,first)=>({stage:bub39("arash",R[2]),pre:f=>sayseq([...(first?["w/PX_G39_MIX"]:[]),"w/"+R[0]],f),again:1,
  cap:"Is Arash right?",yn:1,opts:[{h:"<span class='yn'>"+YES_B+"</span><small>True</small>",say:["w/LULU_SK_YES"]},{h:"<span class='yn'>"+NO_B+"</span><small>Not true</small>",say:["w/LULU_SK_NO"]}],ans:R[1]?0:1,
  ex:["w/"+R[0]+"_E"],right:()=>{$("g39s").insertAdjacentHTML("beforeend",`<div class="q31-cap">💡 ${R[3]}</div>`)}});
function qMix39(cat){return q39("mix39","g:mix39",cat,sh(D39.mix).slice(0,age39()>=9?4:3),["w/PX_G39_MIX"],"Thinking 'is that really true?' is how scientists learn.")}
/* 3. DAD'S RIDDLES (5-9) */
MK39.rid39=(R,q,first)=>({stage:bub39("dad",R[2]),pre:f=>sayseq([...(first?["w/PX_G39_RID"]:[]),"w/"+R[0]],f),again:1,
  ...(()=>{const o=sh(R[3]);return {opts:o.map(x=>eo39(x[0],x[1],x[2])),ans:o.indexOf(R[3][0])}})(),cap:"What is it?",ex:[]});
function near39(L0,minAge){const a=age39();const ok=L0.filter(x=>x[minAge]<=a);const n=ok.filter(x=>x[minAge]>=a-2);return n.length>=3?n:ok}
function qRid39(cat){return q39("rid39","g:rid39",cat,sh(near39(D39.rid,1)).slice(0,3),["w/PX_G39_RID"],"Riddles make our brain look for clues.")}
/* 4. MOM'S SHOPPING (6-9) - money sums */
MK39.shop39=(R,q,first)=>{const v=sh([R[3],...R[4]]);return {stage:`<div class="g39-big">${R[5]}</div>`+bub39("mom",R[2]),pre:f=>sayseq([...(first?["w/PX_G39_SHOP"]:[]),"w/"+R[0]],f),again:1,
  cap:"How many dollars?",opts:v.map(n=>numOpt(n)),ans:v.indexOf(R[3]),ex:both(R[3])}};
function qShop39(cat){return q39("shop39","g:shop39",cat,sh(near39(D39.shop,1)).slice(0,3),["w/PX_G39_SHOP"],"Adding up prices helps us shop wisely.")}
/* 5. WHAT HAPPENS NEXT? (4-9) - the first picture of a movie; guess; then the movie plays */
MK39.next39=(R,q,first)=>{const n=pickOne(R[0].filter(x=>GIFS34.includes(x)));const o=sh(R[3]);
  return {stage:`<div class="g39-mv" id="g39m"><img src="img/gif/s/${n}_first.webp" alt=""></div>`,pre:f=>sayseq([...(first?["w/PX_G39_NEXT"]:[]),"w/"+R[1]],f),again:1,
  cap:R[2],opts:o.map(x=>eo39(x[0],x[1],x[2])),ans:o.indexOf(R[3][0]),wait:6500,right:()=>{const m=$("g39m");if(m){m.innerHTML=gifImg32(n);movieFx39(n)}}}};
function qNext39(cat){const P=D39.next.filter(g=>g[0].some(x=>GIFS34.includes(x)));return q39("next39","g:next39",cat,sh(P).slice(0,3),["w/PX_G39_NEXT"],"Guessing what comes next, then checking, is what scientists do.")}
/* 6. MACHINE DETECTIVE (7-10) - a simple-machine movie (lever, pulley, gears), then a question about it */
const GQ39=[{g:["lever-rock"],ids:["px583","px584","px585","px586","px597","px598","px602"]},{g:["pulley-beam","pulley-garden"],ids:["px587","px588","px589","px599","px601","px598"]},{g:["gears-mill","gears-pair"],ids:["px590","px591","px592","px593","px600"]}];
if(typeof GQ34!=="undefined")for(const G of GQ39)GQ34.push({g:G.g,s:["world"],ids:G.ids});  /* the Movie quiz gets them too */
MK39.mach39=(R,q,first)=>{const Q=R.q,ex=(Q.why&&Q.why.v&&Q.why.v.length?Q.why.v:(Q.exp&&Q.exp.v)||[]);
  return {stage:`<div class="g39-mv">${gifImg32(R.n)}</div>`,pre:f=>{movieFx39(R.n);if(first)sayseq(["w/PX_G39_MACH"],()=>{});setTimeout(f,6300)},
  cap:Q.cap,yn:Q.tf,opts:Q.opts,ans:Q.ans,voice:Q.voice,ex}};
function qMach39(cat){const rounds=[];for(const G of sh(GQ39)){if(rounds.length>=2)break;const g=G.g.filter(x=>GIFS34.includes(x));if(!g.length)continue;
  const ids=sh(gqFit34({ids:G.ids}));for(const id of ids){const Q=gqBuild34(id);if(Q){rounds.push({n:pickOne(g),q:Q,id});break}}}
  return q39("mach39","g:mach39",cat,rounds,["w/PX_G39_MACH"],"Levers, pulleys and gears are simple machines: they make work easier.")}
/* 7. SOUND SAFARI (4-8) */
MK39.snd39=(R,q,first)=>{const o=sh([R,...sh(D39.snd.filter(x=>x[0]!==R[0])).slice(0,age39()<=5?1:3)]);
  return {stage:`<button class="g39-ear" id="g39e">🔊</button>`,pre:f=>{const go=()=>{const e=$("g39e");if(e)e.classList.add("on");fx39(R[0],()=>{const e=$("g39e");if(e)e.classList.remove("on");f()})};first?sayseq(["w/PX_G39_SND"],go):go()},again:1,
  cap:"What made this sound?",opts:o.map(x=>eo39(x[1],x[2],x[3])),ans:o.indexOf(R),ex:["w/"+R[3]],right:()=>{$("g39s").innerHTML=`<div class="g39-big">${R[1]}</div>`}}};
function qSnd39(cat){return q39("snd39","g:snd39",cat,sh(D39.snd).slice(0,3),["w/PX_G39_SND"],"Our ears can tell us what is around us, even with our eyes closed.")}
/* 8. WHAT SHOULD I SAY? (4-7) - kind words */
MK39.kind39=(R,q,first)=>{const o=sh(R[3]);return {stage:bub39(R[1],R[2]),pre:f=>sayseq(["w/"+R[0],...(first?["w/PX_G39_KIND"]:[])],f),again:1,
  cap:"What should we say?",opts:o.map(x=>eo39(x[0],x[1],x[2])),ans:o.indexOf(R[3][0]),ex:["w/"+R[0]+"_E"]}};
function qKind39(cat){return q39("kind39","g:kind39",cat,sh(D39.kind).slice(0,3),["w/PX_G39_KIND"],"Kind words make our friends and family feel good.")}
/* 9. SARA'S ENGLISH WORDS (6-9) - Sara says a word; build it from letters */
MK39.spell39=(R,q,first)=>({custom:done=>{const w=R[0],a=age39();const extra=a>=8?sh("abcdefghijklmnoprstuw".split("").filter(c=>!w.includes(c))).slice(0,2):[];
  const tiles=sh([...w.split(""),...extra]);let k=0;q._miss=q._miss||0;
  $("g39s").innerHTML=`<div class="g39-big">${R[1]}</div><button class="g39-again" id="g39a">🔊 Sara</button><div class="g39-sl" id="g39w">${w.split("").map(()=>"<i></i>").join("")}</div>`;
  $("g39q").innerHTML=`<div class="g39-tl" id="g39t">${tiles.map((c,i)=>`<button data-c="${c}">${c}</button>`).join("")}</div>`;if(typeof e3fix==="function")e3fix($("g39s"));
  const word=()=>{hush();sayseq(["w/"+R[2]],()=>{})};$("g39a").onclick=word;hush();sayseq([...(first?["w/PX_G39_SPELL"]:[]),"w/"+R[2]],()=>{});
  const bs=[...$("g39t").querySelectorAll("button")];q._p={solve:()=>{const b=bs.find(b=>!b.classList.contains("used")&&b.dataset.c===w[k]);if(b)b.click()}};
  bs.forEach(b=>b.onclick=()=>{if(q.done||b.classList.contains("used")||k>=w.length)return;
    if(b.dataset.c===w[k]){const s=$("g39w").children[k];s.textContent=w[k];s.classList.add("f");b.classList.add("used");k++;smTone&&smTone(520+k*60,160);
      if(k===w.length){sfx.good();burstAt($("g39w"),16);hush();sayseq(["w/"+R[2]],()=>{});setTimeout(done,2000)}}
    else{sfx.oops();q._miss++;bounce(b)}})}});
function qSpell39(cat){const a=age39(),mx=a<=6?3:a===7?4:5,P=D39.spell.filter(x=>x[0].length<=mx&&x[0].length>=Math.min(mx,a>=8?4:3));
  return q39("spell39","g:spell39",cat,sh(P).slice(0,3),["w/PX_G39_SPELL"],"Every English word is made of letters, one after another.")}
/* 10. COUNT THE SOUNDS (4-7) */
MK39.count39=(R,q,first)=>{const v=numOpts(R.n,near(R.n).filter(x=>x>=1),3);const ic=R.s==="drum1"?"🥁":"🔔";
  return {stage:`<div class="g39-big" id="g39b">${ic}</div>`,pre:f=>{const hit=i=>{if(!$("g39b"))return;if(i>=R.n){setTimeout(f,300);return}const b=$("g39b");b.classList.add("hit");setTimeout(()=>b&&b.classList.remove("hit"),220);fx39(R.s,null,.9);setTimeout(()=>hit(i+1),900)};
    sayseq(first?["w/PX_G39_COUNT"]:[],()=>setTimeout(()=>hit(0),300))},again:1,guard:16000,cap:"How many times?",opts:v.opts,ans:v.ans,ex:both(R.n)}};
function qCount39(cat){const a=age39(),lo=a<=4?1:a===5?2:3,hi=a<=4?4:a===5?5:7;const r=[];let last=0;for(let i=0;i<3;i++){let n;do{n=lo+Math.floor(Math.random()*(hi-lo+1))}while(n===last);last=n;r.push({n,s:pickOne(["drum1","bell1"])})}
  return q39("count39","g:count39",cat,r,["w/PX_G39_COUNT"],"Counting sounds trains our ears and our numbers together.")}

/* --- wiring --- */
const T39={who39:["🗣️","Who said it?","Listen, then tap who said it"],mix39:["🤪","Arash's mix-up","Is Arash right or not?"],rid39:["🧩","Dad's riddles","Listen to Dad's riddle"],shop39:["🛒","Mom's shopping","Help Mom count the money"],
 next39:["🔮","What happens next?","Guess, then watch the movie"],mach39:["⚙️","Machine detective","Watch the machine, then answer"],snd39:["🦁","Sound safari","Listen: what made this sound?"],kind39:["💛","What should I say?","Pick the kind words"],
 spell39:["🔤","Sara's English words","Build the word Sara says"],count39:["🥁","Count the sounds","Listen and count"]};
for(const g in T39)GAMES[g]=q=>run39(q,...T39[g]);
const B39={f_who39:qWho39,f_mix39:qMix39,f_rid39:qRid39,f_shop39:qShop39,f_next39:qNext39,f_mach39:qMach39,f_snd39:qSnd39,f_kind39:qKind39,f_spell39:qSpell39,f_count39:qCount39};
const SEC39={f_who39:["people","memory"],f_mix39:["world","sky","animals"],f_rid39:["animals","farm","world"],f_shop39:["add","count"],f_next39:["world","sky","animals"],f_mach39:["world"],f_snd39:["animals","farm"],f_kind39:["people"],f_spell39:["letters"],f_count39:["count","memory"]};
Object.assign(FMIN,{f_who39:5,f_mix39:7,f_rid39:5,f_shop39:6,f_next39:4,f_mach39:7,f_snd39:4,f_kind39:4,f_spell39:6,f_count39:4});
Object.assign(FMAX,{f_who39:9,f_mix39:10,f_rid39:9,f_shop39:9,f_next39:9,f_mach39:10,f_snd39:8,f_kind39:7,f_spell39:9,f_count39:7});
const _bf39=buildFormat;buildFormat=function(kind,cat){if(B39[kind])return B39[kind](cat);return _bf39(kind,cat)};
const _ff39=formatsFor0;formatsFor0=function(cat){const b=_ff39(cat),add=Object.keys(SEC39).filter(f=>SEC39[f].includes(cat)&&ageOK(f)&&!b.includes(f));return [...b,...add]};
if(typeof gReadOpts==="function"){const _gro39=gReadOpts;gReadOpts=function(q){if(q&&T39[q.game]){const b=$("g39a");if(b)b.click();else if(q._p&&q._p.voice){hush();sayseq(q._p.voice,()=>{})}return true}return _gro39(q)}}
Object.assign(GMAP,{
 "g:who39":G("Who said it?",["lang","listen"],[["cog","memory"]],"A line from Family talk plays (Sara, Arash, Mom or Dad, each in their own voice); the child taps who said it.","Practice"),
 "g:mix39":G("Arash's mix-up",["cog","logic"],[["cre","science"]],"Arash says a 'fact' that is sometimes wrong (the Sun goes around the Earth!); the child says true or not true, then Lulu explains.","Practice"),
 "g:rid39":G("Dad's riddles",["cog","logic"],[["lang","listen"]],"Dad tells a riddle in his own voice (I have hands but no arms and go tick-tock...); the child picks the answer.","Practice"),
 "g:shop39":G("Mom's shopping",["cog","math"],[["life","everyday"]],"Mom adds up prices and change at the shop (milk 3 dollars, bread 4...); the child works out the total.","Practice"),
 "g:next39":G("What happens next?",["cre","science"],[["cog","logic"]],"The first picture of a movie (an egg, a snowman in the sun, a seed); the child guesses what happens, then the movie plays with its sound.","Practice"),
 "g:mach39":G("Machine detective",["cre","science"],[["cog","curiosity"]],"A lever, pulley or gears movie plays, then a question about how that simple machine works.","Practice"),
 "g:snd39":G("Sound safari",["lang","listen"],[["lang","vocab"]],"A real sound plays (a cow, a train, thunder, a doorbell); the child taps what made it.","Practice"),
 "g:kind39":G("What should I say?",["soc","empathy"],[["lang","listen"]],"Sara or Arash says something (I'm sad, I won a prize, sorry I'm late); the child picks the kind thing to say back.","Practice"),
 "g:spell39":G("Sara's English words",["lang","read"],[["lang","vocab"]],"Sara says an English word (cat, frog, zebra); the child builds it from letter tiles.","Practice"),
 "g:count39":G("Count the sounds",["cog","math"],[["lang","listen"]],"A drum or bell plays a few times; the child counts and picks the number.","Practice")});
window.__g39=()=>{const q=L&&L.q;return q&&T39[q.game]?q.rounds.map(r=>Array.isArray(r)?r[0]:r.id||r.n):null};
