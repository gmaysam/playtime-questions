/* =====================================================================================================
   v31 (Nov 18): QUIZ GAMES + more questions.
   Quiz race (car vs snail), Fishing quiz, Quiz show (climb the stairs, one 50:50), Beat the clock,
   Word train (spell a word letter by letter), Missing letter (pop the balloon).
   The quiz games ask the section's own questions (same questions and voices as the classic ones, via shGate).
   Also: the px bank now feeds Letters/Read it! (english), Jobs & feelings (life, feelings) from age 5.
   ===================================================================================================== */
const G31=n=>"w/PX_G31_"+n;
const EN31=__EN31__;   /* english-topic options: Lulu reads the English word only (no Farsi meaning) */
/* --- the px bank in more sections, from age 5 --- */
Object.assign(PX8,{life:["people"],feelings:["people"]});
const _kf31=kindsFor;kindsFor=function(cat){const k=_kf31(cat);if(!PX8C.includes(cat)||lvl()<5||k.includes("w"))return k;try{if(wPool(cat).length>=4)return [...k,"w"]}catch(e){}return k};
const _qw31=qWatcher;qWatcher=function(cat,used){const q=_qw31(cat,used);if(!q||!q.wid)return q;const w=WQ.find(x=>x.i===q.wid);
  if(w&&w.t==="english"&&w.k==="c"&&q.opts)q.opts.forEach(o=>{const m=(o.h||"").match(/<(?:small|b)[^>]*>([^<]+)<\/(?:small|b)>/);if(!m)return;const t=m[1].trim(),k=t.toLowerCase();if(w.a<=8)o.h=`<b class="word">${t}</b>`;   /* a reading question: the word only, no picture that gives it away */
    
    if(/^[a-z]$/.test(k)){o.say=["w/LULU_LN_"+k.toUpperCase()];return}
    const c=EN31[k]||(EN_SAY[k]?"w/"+EN_SAY[k]:null);if(c)o.say=[c]});
  return q};

/* --- shared: a few section questions whose answers are all spoken --- */
/* a section question with every answer spoken. (v31 fix: the gate kept its own list of what it had used - qWatcher puts the px id in "used"
   itself, so before this every px question was thrown away and Space run never asked one.) */
function gate31(cat,used,maxH){const ks=sh(kindsFor(cat)),seen=used._g31||(used._g31=new Set());
  for(let t=0;t<60;t++){const k=ks[t%ks.length];let q=null;try{q=buildQ(cat,k,used)}catch(e){q=null}
    if(!q||q.game||q.match||q.flash||!q.opts||q.opts.length<2||!(q.ans>=0)||q.layout==="match")continue;
    if(k==="w"&&!q.wid)continue;
    if(q.opts.some(o=>!o.say||!o.say.length||!o.h||o.h.length>(maxH||420)))continue;
    if(!q.voice||!q.voice.length)continue;
    const key=q.wid||q.cap;if(seen.has(key))continue;seen.add(key);q.kind=k;return q}
  return null}
shGate=(cat,used)=>gate31(cat,used,420);
function qz31(cat,n,minOpts){const used=new Set(),out=[];for(let i=0;i<n*2&&out.length<n;i++){const g=gate31(cat,used,900);if(!g)break;if(g.opts.length<(minOpts||2))continue;out.push(g)}return out}
const QZ31_CATS=["count","add","clock","animals","world","sky","farm","shapes","people","flags","letters","read"];
/* read the question, then each answer with its box lit */
function rd31(q,cur,boxes,first,onDone){hush();const tok={};window.__optTok=tok;
  const list=[{c:[...(first||[]),...(cur.voice||[])]},...cur.opts.map((o,i)=>boxes[i]&&!boxes[i].hidden?{c:o.say||[],b:boxes[i]}:null).filter(Boolean)];let i=0;
  const lit=b=>boxes.forEach(x=>x&&x.classList.toggle("saying",x===b));
  const step=()=>{if(window.__optTok!==tok||!L||L.q!==q||q.done){lit(null);return}if(i>=list.length){lit(null);onDone&&onDone();return}const x=list[i++];lit(x.b||null);
    if(!x.c.length){step();return}sayseq(x.c,()=>setTimeout(step,x.b?150:250))};step()}
const vis31=cur=>cur.visual&&cur.visual.length<1800&&cur.visual.replace(/<[^>]*>/g,"").replace(/\s/g,"").length<=4?`<div class="q31-vis">${cur.visual}</div>`:"";
const expSay31=cur=>cur.exp&&cur.exp.v&&cur.exp.v.length?cur.exp.v:(cur.opts[cur.ans].say||[]);

/* ================= 1. QUIZ RACE: right answer = the car drives on; wrong = the snail creeps ================= */
function qRace(cat){const a=lvl(),qs=qz31(cat,9);if(qs.length<5)return null;
  return {game:"race",gid:"g:race",cat,qs,goal:a<=5?4:5,voice:[G31("RACE")],factT:"Racing cars have special tyres that grip the road.",factV:[]}}
GAMES.race=q=>{const G=q.goal;
  gShow(`<div class="game">${gHead("🏁","Quiz race","Answer right to drive to the flag!")}
    <div class="r31"><div class="r31-lane"><span class="r31-car" id="r31c">🚗</span>${Array.from({length:G},()=>"<i></i>").join("")}<b>🏁</b></div>
    <div class="r31-lane snail"><span class="r31-car" id="r31s">🐌</span>${Array.from({length:G},()=>"<i></i>").join("")}<b>🥬</b></div></div>
    <div class="q31" id="r31q"></div></div>`);
  let qi=0,car=0,sn=0,miss=0,tries=0,cur=null,busy=true;const C=$("r31c"),Sn=$("r31s");
  const pos=()=>{C.style.left=`calc(${car/G*86}% )`;Sn.style.left=`calc(${sn/G*86}% )`};
  const show=(first)=>{if(qi>=q.qs.length){qi=0}cur=q.qs[qi++];tries=0;busy=true;
    $("r31q").innerHTML=`<div class="q31-cap">${cur.cap||""}</div>${vis31(cur)}<div class="q31-o">${cur.opts.map((o,i)=>`<button class="opt q31-b" data-i="${i}">${o.h}</button>`).join("")}</div>`;
    const bs=[...$("r31q").querySelectorAll(".q31-b")];bs.forEach(b=>b.onclick=()=>pick(b,bs));rd31(q,cur,bs,first?q.voice:null,()=>{busy=false});busy=false};
  const pick=(b,bs)=>{if(q.done||b.classList.contains("no"))return;window.__optTok={};hush();const i=+b.dataset.i;
    if(i===cur.ans){sfx.good();b.classList.add("ok");car++;pos();burstAt(C,12);
      if(car>=G){setTimeout(()=>gameWin(q,miss>2?1:0,C),700);return}setTimeout(()=>{if(!q.done)show(false)},1000)}
    else{sfx.oops();miss++;tries++;b.classList.add("no");bounce(b);if(sn<G-1){sn++;pos()}
      if(tries>=2){const r=bs[cur.ans];r.classList.add("ok");sayseq(expSay31(cur),()=>{});toastHint("This was the right one!");setTimeout(()=>{if(!q.done)show(false)},2600)}
      else toastHint("Try again!")}};
  pos();show(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;const b=$("r31q").querySelector(`.q31-b[data-i="${cur.ans}"]`);if(b&&!b.classList.contains("ok"))b.click();setTimeout(go,1200)};go()}};

/* ================= 2. FISHING QUIZ: the fish with the right answer swims by - tap it ================= */
function qFish(cat){const a=lvl(),qs=qz31(cat,a<=4?3:4);if(qs.length<3)return null;
  return {game:"fish",gid:"g:fish",cat,qs,voice:[G31("FISH")],factT:"Fish breathe with gills.",factV:[]}}
GAMES.fish=q=>{
  gShow(`<div class="game">${gHead("🎣","Fishing quiz","Catch the fish with the right answer")}
    <div class="f31-top"><div class="q31-cap" id="f31c"></div><div class="f31-n" id="f31n"></div></div>
    <div class="f31-pond" id="f31p"><span class="f31-rod">🎣</span></div></div>`);
  let qi=0,miss=0,tries=0,cur=null;const P=$("f31p");
  const upd=()=>{$("f31n").textContent=q.qs.map((x,i)=>i<qi-1?"🐟":i===qi-1?"🟡":"⚪").join(" ")};
  const show=(first)=>{cur=q.qs[qi++];tries=0;upd();$("f31c").innerHTML=`${cur.cap||""}${vis31(cur)}`;
    P.querySelectorAll(".f31-f").forEach(x=>x.remove());const n=cur.opts.length;
    const fs=cur.opts.map((o,i)=>{const f=document.createElement("button");f.className="f31-f"+(i%2?" rev":"");f.dataset.i=i;
      f.style.top=(14+i*(72/n))+"%";f.style.animationDuration=(9+((i*37)%5))+"s";f.style.animationDelay=(-i*2.3)+"s";
      f.innerHTML=`<span class="f31-fish">🐟</span><span class="opt f31-o">${o.h}</span>`;f.onclick=()=>pick(f,fs);P.appendChild(f);return f});
    rd31(q,cur,fs,first?q.voice:null,()=>{})};
  const pick=(f,fs)=>{if(q.done||f.classList.contains("no")||f.classList.contains("got"))return;window.__optTok={};hush();
    if(+f.dataset.i===cur.ans){sfx.good();f.classList.add("got");burstAt(f,14);
      if(qi>=q.qs.length){setTimeout(()=>gameWin(q,miss>1?1:0,f),900);return}setTimeout(()=>{if(!q.done)show(false)},1300)}
    else{sfx.oops();miss++;tries++;f.classList.add("no");setTimeout(()=>f.classList.remove("no"),700);
      if(tries>=2){fs[cur.ans].classList.add("hint");sayseq(expSay31(cur),()=>{});toastHint("Catch this one!")}else toastHint("Not that fish - try again!")}};
  show(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;const f=P.querySelector(`.f31-f[data-i="${cur.ans}"]:not(.got)`);if(f)f.click();setTimeout(go,1500)};go()}};

/* ================= 3. QUIZ SHOW: climb the stairs, one 50:50 help (ages 8-12) ================= */
function qShow31(cat){const qs=qz31(cat,8,3);if(qs.length<6)return null;return {game:"qshow",gid:"g:qshow",cat,qs,voice:[G31("SHOW")],factT:"Quiz shows ask questions about many subjects.",factV:[]}}
GAMES.qshow=q=>{const N=q.qs.length;
  gShow(`<div class="game">${gHead("🎤","Quiz show","Climb one step for every right answer")}
    <div class="s31"><div class="s31-st" id="s31st">${Array.from({length:N},(_,i)=>`<i data-k="${N-i}">${N-i}</i>`).join("")}</div>
    <div class="s31-main"><div class="q31" id="s31q"></div><button class="s31-ff" id="s31ff">50 : 50</button></div></div></div>`);
  let qi=0,step=0,miss=0,cur=null,ans=false,ffUsed=false;
  const upd=()=>$("s31st").querySelectorAll("i").forEach(x=>{const k=+x.dataset.k;x.className=k<=step?"on":k===qi?"now":""});
  const show=(first)=>{cur=q.qs[qi++];ans=false;upd();
    $("s31q").innerHTML=`<div class="s31-n">Question ${qi} of ${N}</div><div class="q31-cap">${cur.cap||""}</div>${vis31(cur)}<div class="q31-o col">${cur.opts.map((o,i)=>`<button class="opt q31-b" data-i="${i}"><span class="s31-l">${"ABCD"[i]}</span>${o.h}</button>`).join("")}</div>`;
    const bs=[...$("s31q").querySelectorAll(".q31-b")];bs.forEach(b=>b.onclick=()=>pick(b,bs));$("s31ff").disabled=ffUsed||cur.opts.length<3;
    $("s31ff").onclick=()=>{if(ffUsed||ans||q.done)return;ffUsed=true;$("s31ff").disabled=true;sfx.tap();window.__optTok={};hush();
      sh(bs.filter(b=>+b.dataset.i!==cur.ans)).slice(0,cur.opts.length-2).forEach(b=>{b.classList.add("gone");b.disabled=true});sayseq([G31("FIFTY")],()=>{})};
    rd31(q,cur,bs,first?q.voice:null,()=>{})};
  const next=()=>{if(q.done)return;if(qi>=N){upd();gameWin(q,miss>2?2:miss?1:0,$("s31st"));return}show(false)};
  const pick=(b,bs)=>{if(q.done||ans||b.disabled)return;ans=true;window.__optTok={};hush();const i=+b.dataset.i;
    if(i===cur.ans){sfx.good();b.classList.add("ok");step++;upd();burstAt(b,12);setTimeout(next,1100)}
    else{sfx.oops();miss++;b.classList.add("no");bs[cur.ans].classList.add("ok");sayseq(expSay31(cur),()=>{});setTimeout(next,2800)}};
  show(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;if(!ans){const b=$("s31q").querySelector(`.q31-b[data-i="${cur.ans}"]`);if(b)b.click()}setTimeout(go,1300)};go()}};

/* ================= 4. BEAT THE CLOCK: answer before the sand runs out ================= */
function qBeat(cat){const a=lvl(),qs=qz31(cat,6);if(qs.length<4)return null;return {game:"beat",gid:"g:beat",cat,qs,secs:a<=7?20:a<=9?15:10,voice:[G31("CLOCK")],factT:"An hourglass measures time with falling sand.",factV:[]}}
GAMES.beat=q=>{
  gShow(`<div class="game">${gHead("⏳","Beat the clock","Answer before the time runs out!")}
    <div class="b31-top"><span class="b31-h">⏳</span><div class="b31-bar"><i id="b31t"></i></div><span class="b31-sc">⭐ <b id="b31s">0</b>/${q.qs.length}</span></div>
    <div class="q31" id="b31q"></div></div>`);
  let qi=0,score=0,miss=0,cur=null,ans=false,t0=0,raf=0;const T=$("b31t");
  const stop=()=>cancelAnimationFrame(raf);
  const tick=t=>{if(!L||L.q!==q||q.done||ans){stop();return}if(!t0)t0=t;const f=Math.max(0,1-(t-t0)/(q.secs*1000));T.style.width=(f*100)+"%";T.classList.toggle("low",f<.3);
    if(f<=0){timeUp();return}raf=requestAnimationFrame(tick)};
  const show=(first)=>{cur=q.qs[qi++];ans=false;t0=0;T.style.width="100%";T.classList.remove("low");
    $("b31q").innerHTML=`<div class="q31-cap">${cur.cap||""}</div>${vis31(cur)}<div class="q31-o">${cur.opts.map((o,i)=>`<button class="opt q31-b" data-i="${i}">${o.h}</button>`).join("")}</div>`;
    const bs=[...$("b31q").querySelectorAll(".q31-b")];bs.forEach(b=>b.onclick=()=>pick(b,bs));
    rd31(q,cur,bs,first?q.voice:null,()=>{if(!ans&&!q.done)raf=requestAnimationFrame(tick)})};
  const next=()=>{if(q.done)return;if(qi>=q.qs.length){gameWin(q,miss>2?2:miss?1:0,$("b31q"));return}show(false)};
  const timeUp=()=>{if(ans)return;ans=true;miss++;sfx.oops();const r=$("b31q").querySelector(`.q31-b[data-i="${cur.ans}"]`);if(r)r.classList.add("ok");hush();sayseq([G31("TIMEUP")],()=>{});setTimeout(next,2600)};
  const pick=(b,bs)=>{if(q.done||ans)return;ans=true;stop();window.__optTok={};hush();const i=+b.dataset.i;
    if(i===cur.ans){sfx.good();b.classList.add("ok");score++;$("b31s").textContent=score;burstAt(b,12);setTimeout(next,1000)}
    else{sfx.oops();miss++;b.classList.add("no");bs[cur.ans].classList.add("ok");sayseq(expSay31(cur),()=>{});setTimeout(next,2800)}};
  show(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;if(!ans){const b=$("b31q").querySelector(`.q31-b[data-i="${cur.ans}"]`);if(b)b.click()}setTimeout(go,1200)};go()}};

/* ================= 5. WORD TRAIN: tap the letters in order to spell the picture's word ================= */
const LN31=c=>"w/LULU_LN_"+c.toUpperCase();
function words31(mx){return WORDS.filter(x=>/^[a-z]+$/.test(x.w)&&x.w.length>=3&&x.w.length<=mx&&!/^(one|two|three|four|five|six|seven|eight|nine|ten|zero)$/.test(x.w))}
function qTrain(cat){const a=lvl(),W=sh(words31(a<=6?4:a<=8?5:7)).slice(0,3);if(W.length<3)return null;
  return {game:"wtrain",gid:"g:wtrain",cat,words:W,extra:a>=7?2:a>=6?1:0,voice:[G31("TRAIN")],factT:"Long ago, trains were pulled by steam engines.",factV:[]}}
GAMES.wtrain=q=>{
  gShow(`<div class="game">${gHead("🚂","Word train","Tap the letters in order to fill the train")}
    <div class="t31-pic" id="t31p"></div><div class="t31-train" id="t31t"></div><div class="t31-tiles" id="t31l"></div></div>`);
  let wi=0,k=0,miss=0,W=null;
  const show=(first)=>{W=q.words[wi++];k=0;const w=W.w;
    $("t31p").innerHTML=PIC("wd_"+W.i,"wp t31-img");
    $("t31t").innerHTML=`<span class="t31-eng">🚂</span>`+[...w].map(()=>`<span class="t31-car"><b></b></span>`).join("");
    const pool=sh([...w,...sh("abcdefghijklmnopqrstuvwxyz".split("").filter(c=>!w.includes(c))).slice(0,q.extra)]);
    $("t31l").innerHTML=pool.map(c=>`<button class="t31-tile" data-c="${c}">${c}</button>`).join("");
    $("t31l").querySelectorAll(".t31-tile").forEach(b=>b.onclick=()=>tap(b));
    hush();sayseq([...(first?q.voice:[]),...wSay(W)],()=>{})};
  const tap=b=>{if(q.done||b.disabled)return;const w=W.w,c=b.dataset.c;
    if(c===w[k]){sfx.tap();b.disabled=true;b.classList.add("used");const car=$("t31t").querySelectorAll(".t31-car b")[k];car.textContent=c;car.parentNode.classList.add("full");k++;hush();sayseq([LN31(c)],()=>{});
      if(k>=w.length){sfx.good();$("t31t").classList.add("go");setTimeout(()=>{$("t31t").classList.remove("go");hush();sayseq(wSay(W),()=>{})},150);
        if(wi>=q.words.length){setTimeout(()=>gameWin(q,miss>2?1:0,$("t31t")),1600);return}setTimeout(()=>{if(!q.done)show(false)},2000)}}
    else{sfx.oops();miss++;bounce(b);b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500);
      const h=[...$("t31l").querySelectorAll(".t31-tile:not(.used)")].find(x=>x.dataset.c===w[k]);if(miss%2===0&&h){h.classList.add("hint");setTimeout(()=>h.classList.remove("hint"),1200)}}};
  show(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;const w=W.w;if(k<w.length){const b=[...$("t31l").querySelectorAll(".t31-tile:not(.used)")].find(x=>x.dataset.c===w[k]);if(b)b.click();setTimeout(go,250)}else setTimeout(go,2200)};go()}};

/* ================= 6. MISSING LETTER: c _ t - pop the balloon with the missing letter ================= */
function qGap(cat){const a=lvl(),W=sh(words31(a<=6?4:5)).slice(0,4);if(W.length<4)return null;
  return {game:"gap",gid:"g:gap",cat,words:W,voice:[G31("GAP")],factT:"Most English words have at least one vowel: a, e, i, o or u.",factV:[]}}
GAMES.gap=q=>{
  gShow(`<div class="game">${gHead("🎈","Missing letter","Pop the balloon with the missing letter")}
    <div class="t31-pic" id="g31p"></div><div class="g31-w" id="g31w"></div><div class="g31-bl" id="g31b"></div></div>`);
  let wi=0,miss=0,W=null,gi=0,tries=0;const COL=["#FF6B6B","#4DABF7","#FFD43B","#69DB7C","#B197FC"];
  const show=(first)=>{W=q.words[wi++];tries=0;const w=W.w;gi=Math.floor(Math.random()*w.length);
    $("g31p").innerHTML=PIC("wd_"+W.i,"wp t31-img");
    $("g31w").innerHTML=[...w].map((c,i)=>i===gi?`<span class="g31-gap">?</span>`:`<span>${c}</span>`).join("");
    const ok=w[gi],wr=sh("abcdefghijklmnopqrstuvwxyz".split("").filter(c=>c!==ok&&!w.includes(c))).slice(0,2),ls=sh([ok,...wr]);
    $("g31b").innerHTML=ls.map((c,i)=>`<button class="g31-ball" style="--c:${COL[(wi+i)%COL.length]};animation-delay:${-i*.7}s" data-c="${c}"><b>${c}</b></button>`).join("");
    const bs=[...$("g31b").querySelectorAll(".g31-ball")];bs.forEach(b=>b.onclick=()=>pop(b));
    hush();const tok={};window.__optTok=tok;sayseq([...(first?q.voice:[]),...wSay(W)],()=>{let j=0;const st=()=>{if(window.__optTok!==tok||q.done||j>=bs.length){bs.forEach(x=>x.classList.remove("saying"));return}bs.forEach(x=>x.classList.toggle("saying",x===bs[j]));sayseq([LN31(bs[j++].dataset.c)],()=>setTimeout(st,150))};st()})};
  const pop=b=>{if(q.done||b.classList.contains("popped"))return;window.__optTok={};hush();const w=W.w;
    if(b.dataset.c===w[gi]){sfx.good();b.classList.add("popped");const g=$("g31w").querySelector(".g31-gap");g.textContent=w[gi];g.classList.add("ok");burstAt(g,14);sayseq(wSay(W),()=>{});
      if(wi>=q.words.length){setTimeout(()=>gameWin(q,miss>1?1:0,g),1500);return}setTimeout(()=>{if(!q.done)show(false)},1900)}
    else{sfx.oops();miss++;tries++;bounce(b);sayseq([LN31(b.dataset.c)],()=>{});if(tries>=2){const r=[...$("g31b").querySelectorAll(".g31-ball")].find(x=>x.dataset.c===w[gi]);if(r)r.classList.add("hint")}}};
  show(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;const b=[...$("g31b").querySelectorAll(".g31-ball:not(.popped)")].find(x=>x.dataset.c===W.w[gi]);if(b)b.click();setTimeout(go,2100)};go()}};

/* --- wiring --- */
if(typeof gReadOpts==="function"){const _gro31=gReadOpts;gReadOpts=function(q){if(q&&["race","fish","qshow","beat","wtrain","gap"].includes(q.game)){hush();if(q.game==="wtrain"||q.game==="gap"){sayseq([...q.voice],()=>{})}else sayseq(q.voice,()=>{});return true}return _gro31(q)}}
const B31={f_race:qRace,f_fish:qFish,f_qshow:qShow31,f_beat:qBeat,f_wtrain:qTrain,f_gap:qGap};
Object.assign(FMIN,{f_race:4,f_fish:3,f_qshow:8,f_beat:6,f_wtrain:5,f_gap:5});Object.assign(FMAX,{f_race:12,f_fish:8,f_qshow:12,f_beat:12,f_wtrain:9,f_gap:7});
const _bf31=buildFormat;buildFormat=function(kind,cat){if(B31[kind]||kind==="f_shuttle"){for(let t=0;t<4;t++){const q=B31[kind]?B31[kind](cat):_bf31(kind,cat);if(q)return q}return null}return _bf31(kind,cat)};
const OK31={};
const _ff31=formatsFor0;formatsFor0=function(cat){const b=_ff31(cat),add=[];
  const quiz=QZ31_CATS.includes(cat),word=["letters","read"].includes(cat);
  for(const f of ["f_race","f_fish","f_qshow","f_beat"]){if(!quiz||!ageOK(f))continue;const kk=f+"|"+cat+"|"+lvl();if(OK31[kk]===undefined){let ok=false;for(let t=0;t<3&&!ok;t++){try{ok=!!B31[f](cat)}catch(e){}}OK31[kk]=ok}if(OK31[kk])add.push(f)}
  if(word){for(const f of ["f_wtrain","f_gap"])if(ageOK(f))add.push(f)}
  return [...b,...add.filter(f=>!b.includes(f))]};
Object.assign(GMAP,{
 "g:race":G("Quiz race",["cog","curiosity"],[["lang","listen"]],"Answer the section's questions: each right answer drives the car one step to the flag; a wrong one lets the snail creep forward.","Practice"),
 "g:fish":G("Fishing quiz",["cog","curiosity"],[["phys","coord"]],"Fish swim by with the answers; the child taps the fish with the right one.","Practice"),
 "g:qshow":G("Quiz show",["cog","logic"],[["cog","curiosity"]],"Eight questions like a TV quiz: climb one step per right answer, with one 50:50 help.","Practice"),
 "g:beat":G("Beat the clock",["cog","memory"],[["cog","curiosity"]],"Answer each question before the sand timer runs out; a star for each one in time.","Practice"),
 "g:wtrain":G("Word train",["lang","read"],[["lang","vocab"]],"See a picture and hear its word, then tap the letters in order to fill the train cars.","Practice"),
 "g:gap":G("Missing letter",["lang","read"],[["lang","listen"]],"A word with one letter missing; pop the balloon with the missing letter.","Practice")});
window.__qz31=(c,a,n,m)=>{const o=S.age;S.age=a;try{return qz31(c,n,m).length}finally{S.age=o}};
window.__dbg31=(cat,a)=>{const o=S.age;S.age=a;const R={};try{const ks=kindsFor(cat);R.kinds=ks.join(",");for(let t=0;t<20;t++){const k=ks[t%ks.length];let q=null;try{q=buildQ(cat,k,new Set())}catch(e){R["err:"+k]=e.message;continue}
 const why=!q?"null":q.game?"game":q.match?"match":q.flash?"flash":!q.opts?"noopts":q.opts.length<2?"few":!(q.ans>=0)?"ans":q.layout==="match"?"lm":q.opts.some(o=>!o.say||!o.say.length)?"nosay":q.opts.some(o=>!o.h||o.h.length>420)?"hlen":(!q.voice||!q.voice.length)?"novoice":"ok";R[k+":"+why]=(R[k+":"+why]||0)+1}}finally{S.age=o}return R};
window.__dbg31b=(cat,a)=>{const o=S.age;S.age=a;const R=[];try{const used=new Set();for(let i=0;i<5;i++){let g;try{g=shGate(cat,used)}catch(e){R.push("ERR "+e.message);break}R.push(g?(g.wid||g.cap):"null")}R.push([...used].slice(0,10).join(","))}finally{S.age=o}return R};
