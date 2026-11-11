
/* =====================================================================================================
   Nov 11: NEW GAMES - drums & xylophone, moving shapes, slot machine, Pattern Detective, quilt, Emotion
   Detective, Adventure runner, Move with me (real-world movement), Little Scientist, + toddler: clean the
   window, grow a flower, free drums. Shapes and faces are drawn (no stock emoji).
   ===================================================================================================== */
var G4_READY=__G4VOICE__;
const G4=n=>"w/PX_G4_"+n;
/* ---------- sound: drums and xylophone, made with Web Audio ---------- */
let __dac=null;const dac=()=>(__dac=__dac||new (window.AudioContext||window.webkitAudioContext)());
function drumHit(k){try{if(!S.fx)return;const c=dac(),t=c.currentTime,g=c.createGain();g.connect(c.destination);
  if(k===0){const o=c.createOscillator();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(45,t+.35);g.gain.setValueAtTime(1,t);g.gain.exponentialRampToValueAtTime(.001,t+.45);o.connect(g);o.start(t);o.stop(t+.5);return}
  if(k===2){const o=c.createOscillator();o.frequency.setValueAtTime(240,t);o.frequency.exponentialRampToValueAtTime(120,t+.25);g.gain.setValueAtTime(.8,t);g.gain.exponentialRampToValueAtTime(.001,t+.35);o.connect(g);o.start(t);o.stop(t+.4);return}
  const n=c.sampleRate*.4,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();
  f.type=k===3?"highpass":"bandpass";f.frequency.value=k===3?7000:1800;g.gain.setValueAtTime(k===3?.45:.7,t);g.gain.exponentialRampToValueAtTime(.001,t+(k===3?.3:.2));s.connect(f);f.connect(g);s.start(t);s.stop(t+.4);
  if(k===1){const o=c.createOscillator(),g2=c.createGain();o.frequency.value=190;g2.gain.setValueAtTime(.4,t);g2.gain.exponentialRampToValueAtTime(.001,t+.12);o.connect(g2);g2.connect(c.destination);o.start(t);o.stop(t+.15)}}catch(e){}}
function xyloHit(k){try{if(!S.fx)return;const c=dac(),t=c.currentTime,f=[523,659,784,1047][k];[1,4].forEach((m,j)=>{const o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.value=f*m;g.gain.setValueAtTime(j?.12:.5,t);g.gain.exponentialRampToValueAtTime(.001,t+(j?.25:1));o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+1)})}catch(e){}}
const DRUM_C=[["#FF6B6B","#C94848"],["#4DABF7","#2B7FC1"],["#FFC94D","#D49A1C"],["#8CE99A","#4CAF5F"]];
const drumSVG=(i,xy)=>xy?`<svg viewBox="0 0 60 120" class="xb"><rect x="6" y="${4+i*8}" width="48" height="${112-i*16}" rx="10" fill="${DRUM_C[i][0]}"/><rect x="6" y="${4+i*8}" width="48" height="${112-i*16}" rx="10" fill="none" stroke="${DRUM_C[i][1]}" stroke-width="4"/><circle cx="30" cy="${16+i*8}" r="4" fill="#fff" opacity=".8"/><circle cx="30" cy="${104-i*8}" r="4" fill="#fff" opacity=".8"/></svg>`
  :`<svg viewBox="0 0 100 90" class="db"><ellipse cx="50" cy="66" rx="42" ry="16" fill="${DRUM_C[i][1]}"/><rect x="8" y="30" width="84" height="36" fill="${DRUM_C[i][0]}"/><path d="M8 34 L24 64 L40 34 L56 64 L72 34 L92 60" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/><ellipse cx="50" cy="30" rx="42" ry="16" fill="#FFF8EC" stroke="${DRUM_C[i][1]}" stroke-width="4"/><ellipse cx="40" cy="25" rx="14" ry="4" fill="#fff"/></svg>`;
function qDrum(cat){const a=lvl(),len=a<=4?2:a<=6?3:a<=8?4:5,xy=Math.random()<.45,seq=Array.from({length:len},()=>ri(0,3));return {game:"drum",xy,seq,voice:[G3("HEAR")],gid:"g:drum",factT:xy?"A xylophone has bars: the short ones sing high, the long ones sing low.":"Drums make sound when their skin shakes. Big drums sound low, small drums sound high."}}
function drumQ(q){let at=0,miss=0,busy=true;const hit=i=>(q.xy?xyloHit:drumHit)(i);
  gShow(`<div class="game">${gHead(q.xy?"🎶":"🥁",q.xy?"Xylophone":"Drums","Listen, then play the same!")}<div class="dr ${q.xy?"xy":""}" id="drB">${[0,1,2,3].map(i=>`<button class="dr-p" data-i="${i}">${drumSVG(i,q.xy)}</button>`).join("")}</div>
    <div class="smdots" id="drD">${q.seq.map(()=>"<i></i>").join("")}</div><button class="hr-play sm" id="drR">🔁</button></div>`);
  const P=[...$("qBody").querySelectorAll(".dr-p")],dots=()=>$("drD").querySelectorAll("i").forEach((d,k)=>d.className=k<at?"on":"");
  const bang=(i,ms=300)=>{P[i].classList.add("hit");hit(i);setTimeout(()=>P[i].classList.remove("hit"),ms)};
  const play=(slow=1)=>{busy=true;at=0;dots();$("drB").classList.add("watch");let k=0;const st=()=>{if(!L||L.q!==q)return;if(k>=q.seq.length){$("drB").classList.remove("watch");busy=false;return}bang(q.seq[k++],420);setTimeout(st,900*slow)};setTimeout(st,400)};
  $("drR").onclick=()=>{if(!busy){sfx.tap();play(1.2)}};
  P.forEach(b=>b.onclick=()=>{if(busy||q.done)return;const i=+b.dataset.i;bang(i);if(i===q.seq[at]){at++;dots();if(at===q.seq.length){busy=true;gameWin(q,miss,$("drB"),[])}}
    else{miss++;sfx.oops();$("drB").classList.add("bump");setTimeout(()=>$("drB").classList.remove("bump"),450);if(miss>=3){busy=true;setTimeout(()=>{play(1.4);setTimeout(()=>gameLearn(q,"Listen once more and play along!",[]),q.seq.length*1300+600)},600)}else setTimeout(()=>play(1+miss*.25),700)}});
  setTimeout(()=>{if(L&&L.q===q)sayseq(q.voice,()=>play())},350);
  window.__gSolve=()=>{busy=true;gameWin(q,0,$("drB"),[])}}
/* free drums for the youngest: every tap makes music */
function qTDrum(){return {game:"tdrum",need:10,voice:[G4("TDRUM")],gid:"g:drum",factT:"Boom, boom! You made music!"}}
function tdrumQ(q){let n=0;gShow(`<div class="game lrn">${gHead("🥁","Drums","Bang the drums!")}<div class="dr big" id="drB">${[0,1,2,3].map(i=>`<button class="dr-p" data-i="${i}">${drumSVG(i)}</button>`).join("")}</div><div class="td-notes" id="tdN"></div></div>`);gAsk(q);
  $("qBody").querySelectorAll(".dr-p").forEach(b=>b.onclick=()=>{if(q.done)return;const i=+b.dataset.i;b.classList.add("hit");drumHit(i);setTimeout(()=>b.classList.remove("hit"),250);n++;
    const s=document.createElement("span");s.textContent=pickOne(["🎵","🎶","⭐"]);s.style.left=(15+Math.random()*70)+"%";$("tdN").appendChild(s);setTimeout(()=>s.remove(),1200);if(n>=q.need){q.done=true;setTimeout(()=>gameWin(q,0,$("drB"),[]),500)}});
  window.__gSolve=()=>{q.done=true;gameWin(q,0,$("drB"),[])}}

/* ---------- moving shapes: catch the ones like this ---------- */
const SHP=[["Circle",'<circle cx="50" cy="50" r="40"/>'],["Square",'<rect x="12" y="12" width="76" height="76" rx="10"/>'],["Triangle",'<path d="M50 8 L92 88 L8 88 Z" stroke-linejoin="round"/>'],["Star",'<path d="M50 6l12 28 30 3-23 20 7 30-26-16-26 16 7-30-23-20 30-3z"/>'],["Oval",'<ellipse cx="50" cy="50" rx="44" ry="30"/>'],["Rectangle",'<rect x="6" y="24" width="88" height="52" rx="8"/>']];
const SHPC=["#FF6B6B","#4DABF7","#FFC94D","#8CE99A","#B197FC","#FF8CC6"];
const shpSVG=(k,c,cls="")=>`<svg viewBox="0 0 100 100" class="shp ${cls}"><g fill="${c}" stroke="rgba(0,0,0,.18)" stroke-width="5">${SHP[k][1]}</g><ellipse cx="38" cy="34" rx="12" ry="7" fill="#fff" opacity=".45"/></svg>`;
const shpSay=k=>{const i=SHAPES.indexOf(SHP[k][0]);return i>=0?shSay(i):enSay(SHP[k][0].toLowerCase())};
function qShapes4(cat){const a=lvl(),free=S.age<=3,t=ri(0,a<=4?2:5),need=free?6:a<=5?3:4,others=[0,1,2,3,4,5].filter(x=>x!==t&&(a>4||x<3));
  const items=free?Array.from({length:need},()=>[pickOne(SHPC),ri(0,2)]):sh([...Array(need).fill(t),...Array.from({length:a<=5?4:6},()=>pickOne(others))]).map(k=>[pickOne(SHPC),k]);
  return {game:"shapes",t,items,free,need,voice:free?[G4("SHAPEFREE")]:[G4("SHAPECATCH"),...shpSay(t)],gid:"g:shapes",factT:free?"Circles, squares and triangles - you caught them all!":`You found every ${SHP[t][0].toLowerCase()}!`}}
function shapesQ(q){let got=0,miss=0;
  gShow(`<div class="game">${gHead("🔷","Moving shapes",q.free?"Catch the shapes!":`Catch every ${SHP[q.t][0].toLowerCase()}!`)}${q.free?"":`<div class="sh-t">${shpSVG(q.t,"#FFFFFF","tgt")}</div>`}<div class="sh-f" id="shF">${q.items.map(([c,k],j)=>`<button class="sh-i" data-j="${j}" style="--x:${ri(6,74)}%;--y:${ri(4,70)}%;--dx:${ri(-40,40)}px;--dy:${ri(-50,50)}px;--d:${(3+Math.random()*2.5).toFixed(1)}s;--r:${ri(-30,30)}deg">${shpSVG(k,c)}</button>`).join("")}</div></div>`);
  gAsk(q);$("qBody").querySelectorAll(".sh-i").forEach(b=>b.onclick=()=>{if(q.done||b.classList.contains("got"))return;const k=q.items[+b.dataset.j][1];
    if(q.free||k===q.t){b.classList.add("got");sfx.tap();hush();sayseq(shpSay(k),()=>{});got++;if(got>=q.need){q.done=true;setTimeout(()=>gameWin(q,miss>2?1:0,$("shF"),[]),600)}}
    else{miss++;sfx.oops();b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500)}});
  window.__gSolve=()=>$("qBody").querySelectorAll(".sh-i").forEach(b=>{if(q.free||q.items[+b.dataset.j][1]===q.t)b.click()})}

/* ---------- slot machine: spin, then set the reels to make the word / the number ---------- */
const AB3="abcdefghijklmnoprstuwy";
function qSlot(cat){const a=lvl();
  if(cat==="letters"||cat==="read"){const w=pickOne(WORDS.filter(x=>x.w.length===3&&[...x.w].every(c=>AB3.includes(c))));return {game:"slot",mode:"word",w,reels:3,voice:[G4("SLOTW"),...wSay(w)],gid:"g:slot",factT:`${w.w.toUpperCase()}: ${w.w.split("").join(" - ")}`}}
  const tgt=a<=4?ri(2,5):a<=6?ri(4,10):ri(8,18);return {game:"slot",mode:"num",tgt,reels:a<=4?1:2,voice:[G4("SLOTN"),...both(tgt)],gid:"g:slot",factT:a<=4?`${tgt}!`:`There are many ways to make ${tgt}!`}}
function slotQ(q){const word=q.mode==="word",vals=word?AB3.split(""):Array.from({length:q.reels===1?10:10},(_,i)=>i),R=Array.from({length:q.reels},()=>ri(0,vals.length-1));let spun=false,miss=0;
  const face=r=>word?vals[R[r]].toUpperCase():q.reels===1?"🔵".repeat(0)+vals[R[r]]:vals[R[r]];
  gShow(`<div class="game">${gHead("🎰","Lucky slots",word?"Spin, then make the word!":`Make ${q.tgt}!`)}
    <div class="sl-top">${word?`<img src="img/w/wd_${q.w.i}.png" alt="">`:q.reels===1?`<span class="sl-dots">${"●".repeat(q.tgt)}</span>`:`<b class="sl-t">${q.tgt}</b>`}</div>
    <div class="sl-m" id="slM"><div class="sl-lights"></div><div class="sl-reels">${R.map((_,r)=>`${!word&&r===1?'<b class="sl-op">+</b>':""}<div class="sl-r"><button class="sl-a" data-r="${r}" data-d="-1">▲</button><span class="sl-w" id="slW${r}">?</span><button class="sl-a" data-r="${r}" data-d="1">▼</button></div>`).join("")}</div>
    <button class="sl-lever" id="slL"><i></i></button></div><button class="qcheck" id="slC" disabled>CHECK</button></div>`);gAsk(q);
  const draw=()=>R.forEach((_,r)=>$("slW"+r).textContent=face(r));
  $("slL").onclick=()=>{if(q.done)return;sfx.tap();$("slL").classList.add("pull");setTimeout(()=>$("slL").classList.remove("pull"),500);$("slM").classList.add("spin");
    let t=0;const iv=setInterval(()=>{R.forEach((_,r)=>R[r]=ri(0,vals.length-1));draw();if(++t>12){clearInterval(iv);$("slM").classList.remove("spin");spun=true;$("slC").disabled=false;$("slC").classList.add("on")}},70)};
  $("qBody").querySelectorAll(".sl-a").forEach(b=>b.onclick=()=>{if(!spun||q.done)return;const r=+b.dataset.r;R[r]=(R[r]+ +b.dataset.d+vals.length)%vals.length;sfx.tap();draw()});
  const ok=()=>word?R.map(r=>vals[r]).join("")===q.w.w:q.reels===1?vals[R[0]]===q.tgt:vals[R[0]]+vals[R[1]]===q.tgt;
  const chk=()=>{if(q.done)return;if(ok()){$("slM").classList.add("win");gameWin(q,miss,$("slM"),word?wSay(q.w):[])}else{miss++;sfx.oops();$("slM").classList.add("bump");setTimeout(()=>$("slM").classList.remove("bump"),450);
    if(miss>=3){q.done=true;if(word)q.w.w.split("").forEach((ch,r)=>R[r]=vals.indexOf(ch));else if(q.reels===1)R[0]=q.tgt;else{R[0]=Math.min(9,q.tgt-Math.min(9,Math.floor(q.tgt/2)));R[1]=q.tgt-R[0]}draw();gameLearn(q,word?q.w.w.toUpperCase():`${q.tgt}`,word?wSay(q.w):both(q.tgt))}}};$("slC").onclick=chk;
  window.__gSolve=()=>{spun=true;if(word)q.w.w.split("").forEach((ch,r)=>R[r]=vals.indexOf(ch));else if(q.reels===1)R[0]=q.tgt;else{R[0]=Math.min(9,Math.floor(q.tgt/2));R[1]=q.tgt-R[0]}draw();chk()}}

/* ---------- Pattern Detective: colours, shapes, numbers, growing patterns and the 3x3 grid ---------- */
const FAB=[["dots","#FF6B6B"],["checks","#58CC02"],["stripes","#4DABF7"],["flowers","#FFC800"],["zigzag","#B197FC"]];
const fabDef=()=>`<svg width="0" height="0" style="position:absolute"><defs>
  <pattern id="fb-dots" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#FF6B6B"/><circle cx="6" cy="6" r="2.4" fill="#fff"/></pattern>
  <pattern id="fb-checks" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#D9F7C7"/><rect width="7" height="7" fill="#58CC02"/><rect x="7" y="7" width="7" height="7" fill="#58CC02"/></pattern>
  <pattern id="fb-stripes" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="#4DABF7"/><rect width="4" height="10" fill="#A5D8FF"/></pattern>
  <pattern id="fb-flowers" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#FFF3BF"/><circle cx="9" cy="9" r="2.5" fill="#E8590C"/><circle cx="9" cy="4.5" r="2.4" fill="#FFC800"/><circle cx="9" cy="13.5" r="2.4" fill="#FFC800"/><circle cx="4.5" cy="9" r="2.4" fill="#FFC800"/><circle cx="13.5" cy="9" r="2.4" fill="#FFC800"/></pattern>
  <pattern id="fb-zigzag" width="16" height="10" patternUnits="userSpaceOnUse"><rect width="16" height="10" fill="#E5DBFF"/><path d="M0 8 L4 2 L8 8 L12 2 L16 8" fill="none" stroke="#7950F2" stroke-width="2"/></pattern></defs></svg>`;
const tileSVG=(sh,fab,n)=>`<svg viewBox="0 0 100 100" class="pt"><g fill="url(#fb-${FAB[fab][0]})" stroke="#3F3F3F" stroke-width="4" stroke-linejoin="round">${SHP[sh][1]}</g>${n!=null?`<text x="50" y="64" text-anchor="middle" class="ptn">${n}</text>`:""}</svg>`;
function qPDet(cat){const a=lvl();let seq,opts,ans,kind;
  if(a<=4){const A=[ri(0,5),ri(0,4)];let B;do{B=[ri(0,5),ri(0,4)]}while(B[0]===A[0]);seq=[A,B,A,B,A,null];ans=B;kind="AB"}
  else if(a<=6){const t=pickOne(["AAB","ABC","ABB"]),P=[];while(P.length<3){const x=[ri(0,5),ri(0,4)];if(!P.some(y=>y[0]===x[0]))P.push(x)}const m={A:P[0],B:P[1],C:P[2]},u=(t+t).split("").map(c=>m[c]);const hole=ri(2,5);seq=u.slice(0,6);ans=seq[hole];seq[hole]=null;kind=t}
  else if(Math.random()<.4){/* numbers: step pattern */const st=ri(1,5),d=pickOne([2,3,5,10]),ns=Array.from({length:6},(_,i)=>st+d*i),hole=ri(2,5),f=ri(0,4),s=ri(0,5);seq=ns.map(n=>[s,f,n]);ans=seq[hole];seq[hole]=null;kind="num"}
  else{/* 3x3 grid: each row one shape, each column one fabric */const rs=sh([0,1,2,3,5]).slice(0,3),cs=sh([0,1,2,3,4]).slice(0,3),hole=ri(0,8);seq=[];for(let r=0;r<3;r++)for(let c=0;c<3;c++)seq.push([rs[r],cs[c]]);ans=seq[hole];seq[hole]=null;kind="grid"}
  const key=x=>x.join(","),pool=[ans];while(pool.length<3){const x=kind==="num"?[ans[0],ans[1],ans[2]+pickOne([-2,-1,1,2,3])]:[ri(0,5),ri(0,4)];if(x[2]!==undefined&&x[2]<0)continue;if(!pool.some(y=>key(y)===key(x)))pool.push(x)}
  opts=sh(pool);return {game:"pdet",seq,opts,ans:opts.indexOf(ans),kind,voice:[G4("PDET")],gid:"g:pdet",factT:kind==="grid"?"Each row has one shape, each column one pattern!":kind==="num"?"Numbers can grow by the same step each time!":"The pattern repeats again and again!"}}
function pdetQ(q){let miss=0;const t=x=>tileSVG(x[0],x[1],x[2]);
  gShow(`<div class="game">${fabDef()}${gHead("🔍","Pattern Detective","What is missing?")}<div class="pd ${q.kind==="grid"?"grid":""}">${q.seq.map(x=>x?`<span class="pd-c">${t(x)}</span>`:`<span class="pd-c hole" id="pdH">?</span>`).join("")}</div>
    <div class="pd-o">${q.opts.map((x,j)=>`<button class="pd-b" data-j="${j}">${t(x)}</button>`).join("")}</div></div>`);gAsk(q);
  const put=j=>{if(q.done)return;const b=$("qBody").querySelector(`.pd-b[data-j="${j}"]`);if(j===q.ans){$("pdH").innerHTML=t(q.opts[j]);$("pdH").classList.add("ok");b.classList.add("gone");gameWin(q,miss,$("pdH"),[])}
    else{miss++;sfx.oops();bounce(b);b.disabled=true;if(miss>=2){q.done=true;$("pdH").innerHTML=t(q.opts[q.ans]);gameLearn(q,"Look at what repeats!",[])}}};
  $("qBody").querySelectorAll(".pd-b").forEach(b=>dragify(b,()=>[$("pdH")],()=>put(+b.dataset.j),()=>put(+b.dataset.j)));
  window.__gSolve=()=>put(q.ans)}
/* quilt: each piece goes into the hole of the same shape (and, for older children, the same fabric) */
function qQuilt(){const a=lvl(),n=a<=4?3:a<=6?4:6,holes=sh([0,1,2,3,4,5]).slice(0,n).map(s=>[s,ri(0,4)]);return {game:"quilt",holes,fab:a>=6,voice:[G4("QUILT")],gid:"g:quilt",factT:"Every shape found its home on the quilt!"}}
function quiltQ(q){let done=0,miss=0;const pieces=sh(q.holes.map((h,i)=>i));
  gShow(`<div class="game">${fabDef()}${gHead("🧵","Patchwork","Put each piece in its place!")}<div class="qu" style="grid-template-columns:repeat(${q.holes.length===4?2:3},1fr);${q.holes.length===4?"width:min(70%,220px,30vh)":""}">${q.holes.map((h,i)=>`<span class="qu-h" data-i="${i}" style="--f:url(#fb-${FAB[(i+2)%5][0]})"><svg viewBox="0 0 100 100" class="qu-bg"><rect width="100" height="100" fill="url(#fb-${FAB[(i+2)%5][0]})"/><g fill="#FFF6C8" stroke="#E8C64A" stroke-width="3">${SHP[h[0]][1]}</g></svg></span>`).join("")}</div>
    <div class="qu-t">${pieces.map(i=>`<div class="qu-p" data-i="${i}">${tileSVG(q.holes[i][0],q.fab?q.holes[i][1]:i%5)}</div>`).join("")}</div></div>`);gAsk(q);
  const H=[...$("qBody").querySelectorAll(".qu-h")];let sel=null;
  const put=(el,h)=>{if(el.dataset.done)return;const pi=+el.dataset.i,hi=+h.dataset.i;if(q.holes[pi][0]===q.holes[hi][0]&&!h.classList.contains("ok")){el.dataset.done=1;el.classList.add("gone");h.classList.add("ok");h.querySelector("g").setAttribute("fill",`url(#fb-${FAB[q.fab?q.holes[pi][1]:pi%5][0]})`);sfx.tap();done++;sel=null;if(done===q.holes.length)setTimeout(()=>gameWin(q,miss>2?1:0,$("qBody").querySelector(".qu"),[]),500)}
    else{miss++;bounce(el)}};
  $("qBody").querySelectorAll(".qu-p").forEach(el=>dragify(el,()=>H.filter(h=>!h.classList.contains("ok")),h=>put(el,h),()=>{sfx.tap();$("qBody").querySelectorAll(".qu-p").forEach(x=>x.classList.toggle("sel",x===el));sel=el}));
  H.forEach(h=>h.onclick=()=>{if(sel)put(sel,h)});window.__gSolve=()=>$("qBody").querySelectorAll(".qu-p").forEach(el=>put(el,H[+el.dataset.i]))}

/* ---------- Emotion Detective: drawn faces, situations, helping ---------- */
const SKIN=["#F6D3B3","#E9B48A","#C98C5E","#8D5A3B"],HAIR=["#3B2A20","#7A4A1E","#E0A43A","#1F1F1F","#B5462E"];
function faceSVG(e,v=0,me){const sk=SKIN[v%4],hr=HAIR[(v>>1)%5],brow={happy:"M30 34 Q38 30 46 34 M54 34 Q62 30 70 34",sad:"M30 32 Q38 36 46 30 M54 30 Q62 36 70 32",angry:"M30 30 L46 37 M70 30 L54 37",scared:"M30 30 Q38 24 46 30 M54 30 Q62 24 70 30",surprised:"M30 26 Q38 20 46 26 M54 26 Q62 20 70 26"}[e];
  const mouth={happy:'<path d="M36 62 Q50 76 64 62" fill="#fff" stroke="#7A2E2E" stroke-width="3"/>',sad:'<path d="M38 70 Q50 60 62 70" fill="none" stroke="#7A2E2E" stroke-width="3.5" stroke-linecap="round"/>',angry:'<path d="M38 68 L62 68" stroke="#7A2E2E" stroke-width="4" stroke-linecap="round"/><path d="M40 64 L60 64 L60 70 L40 70Z" fill="#fff" stroke="#7A2E2E" stroke-width="2"/>',scared:'<path d="M40 70 Q44 64 48 70 Q52 64 56 70 Q60 64 62 70" fill="none" stroke="#7A2E2E" stroke-width="3"/>',surprised:'<ellipse cx="50" cy="68" rx="7" ry="9" fill="#7A2E2E"/>'}[me||e];
  const eye=e==="surprised"||e==="scared"?'<circle cx="38" cy="46" r="6" fill="#fff"/><circle cx="62" cy="46" r="6" fill="#fff"/><circle cx="38" cy="46" r="3.2" fill="#2B2B2B"/><circle cx="62" cy="46" r="3.2" fill="#2B2B2B"/>':e==="happy"?'<path d="M32 47 Q38 41 44 47 M56 47 Q62 41 68 47" fill="none" stroke="#2B2B2B" stroke-width="3.5" stroke-linecap="round"/>':'<circle cx="38" cy="46" r="3.6" fill="#2B2B2B"/><circle cx="62" cy="46" r="3.6" fill="#2B2B2B"/>';
  const tear=e==="sad"&&(!me||me==="sad")?'<path d="M64 52 q3 6 0 9 q-3 -3 0 -9z" fill="#74C0FC"/>':"",cheek=e==="angry"?"#FF8787":"#FFB3B3";
  return `<svg viewBox="0 0 100 100" class="fc"><path d="M14 52 Q14 14 50 12 Q86 14 86 52 L86 40 Q80 18 50 18 Q20 18 14 40Z" fill="${hr}"/><circle cx="50" cy="54" r="34" fill="${sk}"/><path d="M18 46 Q22 18 50 18 Q78 18 82 46 Q72 28 50 30 Q30 30 18 46Z" fill="${hr}"/><circle cx="28" cy="60" r="6" fill="${cheek}" opacity=".55"/><circle cx="72" cy="60" r="6" fill="${cheek}" opacity=".55"/><path d="${brow}" fill="none" stroke="#3B2A20" stroke-width="3" stroke-linecap="round"/>${eye}${tear}${mouth}</svg>`}
const EMO=["happy","sad","angry","scared","surprised"],EMO_I={happy:0,sad:1,angry:2,scared:3,surprised:4};
const EMO_S=[["S1","Sara's ice cream fell on the ground.","sad","🍦"],["S2","It is Ali's birthday and he got lots of presents!","happy","🎁"],["S3","Someone knocked down Nima's block tower.","angry","🧱"],["S4","Suddenly there was a very loud thunder!","scared","⛈️"],["S5","She opened the door and everyone shouted: Surprise!","surprised","🎉"]];
const EMO_H=[["H1","Your friend fell down and hurt her knee.",[["🤝","Help her up and ask if she is okay",1],["😆","Laugh",0],["🏃","Run away",0]]],["H2","A new child has nobody to play with.",[["⚽","Ask: do you want to play with us?",1],["🙈","Pretend you did not see",0],["🤪","Make fun of them",0]]]];
function qEmo(cat){const a=lvl(),m=a<=4?pickOne(["face","sit"]):pickOne(["face","sit","sit","help"]);
  if(m==="face"){const e=pickOne(a<=4?EMO.slice(0,4):EMO),o=sh([e,...sh(EMO.filter(x=>x!==e&&(a>4||x!=="surprised"))).slice(0,a<=4?1:2)]);return {game:"emo",mode:"face",e,o,v:ri(0,9),voice:["w/PX_FEEL_HOW"],gid:"g:emo",factT:{happy:"We smile when we feel happy.",sad:"It's okay to feel sad sometimes - a hug can help.",angry:"When angry, take a big breath and count to 5.",scared:"Talking to someone you love helps when you're scared.",surprised:"Surprised faces have big eyes and an open mouth!"}[e]}}
  if(m==="sit"){const s=pickOne(EMO_S),o=sh([s[2],...sh(EMO.filter(x=>x!==s[2])).slice(0,a<=4?1:2)]);return {game:"emo",mode:"sit",s,e:s[2],o,v:ri(0,9),voice:[G4("EMO_"+s[0]),G4("EMO_HOW")],gid:"g:emo",factT:"Our faces show how we feel - and we can guess how others feel too."}}
  const h=pickOne(EMO_H);return {game:"emo",mode:"help",h,o:sh(h[2].slice()),voice:[G4("EMO_"+h[0]),G4("EMO_HELP")],gid:"g:emo:help",factT:"Being kind helps everyone feel better."}}
function emoQ(q){let miss=0;const E=x=>`<span class="em-f">${faceSVG(x,q.v)}</span>`;
  const top=q.mode==="face"?`<div class="em-big">${faceSVG(q.e,q.v)}</div>`:q.mode==="sit"?`<div class="em-sit"><span class="em-e">${q.s[3]}</span><p>${q.s[1]}</p></div>`:`<div class="em-sit"><span class="em-e">🤔</span><p>${q.h[1]}</p></div>`;
  const opts=q.mode==="help"?q.o.map((x,j)=>`<button class="em-o h" data-j="${j}"><span class="em-e sm">${x[0]}</span><b>${x[1]}</b></button>`):q.o.map((x,j)=>`<button class="em-o" data-j="${j}">${q.mode==="sit"?E(x):""}<b>${cap1(x)}</b></button>`);
  gShow(`<div class="game">${gHead("🕵️","Feelings detective",q.mode==="face"?"How does this child feel?":q.mode==="sit"?"How do they feel?":"What can you do?")}${top}<div class="em-os ${q.mode}">${opts.join("")}</div></div>`);gAsk(q);
  $("qBody").querySelectorAll(".em-o").forEach(b=>b.onclick=()=>{if(q.done)return;const x=q.o[+b.dataset.j],good=q.mode==="help"?x[2]===1:x===q.e;if(q.mode!=="help"){hush();sayseq(feelSay(EMO_I[x]),()=>{})}
    if(good){b.classList.add("ok");gameWin(q,miss,b,[])}else{miss++;sfx.oops();bounce(b);b.disabled=true;if(miss>=2){q.done=true;gameLearn(q,q.mode==="help"?q.o.find(z=>z[2])[1]:cap1(q.e),[])}}});
  window.__gSolve=()=>{const j=q.mode==="help"?q.o.findIndex(z=>z[2]):q.o.indexOf(q.e);$("qBody").querySelector(`.em-o[data-j="${j}"]`).click()}}

/* ---------- Adventure runner: tap to jump over things ---------- */
const RUNNERS={sky:["🚀","☄️"],animals:["🐰","🪵"],farm:["🐶","🌵"],world:["🐢","🪨"],robot:["🤖","🧱"],people:["🧒","🪨"],memory:["🐱","🌵"]};
function qRun(cat){const a=lvl(),[h,o]=RUNNERS[cat]||pickOne(Object.values(RUNNERS));return {game:"run",h,o,need:a<=4?4:a<=6?6:8,speed:a<=4?3.4:a<=6?2.8:2.3,voice:[G4("RUN")],gid:"g:run",factT:"Jumping at the right moment takes good timing - well done!"}}
function runQ(q){let passed=0,bumps=0,air=false,alive=true,spawned=0;
  gShow(`<div class="game">${gHead("🏃","Adventure run","Tap to jump!")}<div class="rn" id="rnF"><div class="rn-sky"></div><div class="rn-gr"></div><span class="rn-h" id="rnH">${q.h}</span><div class="rn-cnt" id="rnC">0 / ${q.need}</div></div><button class="rn-j" id="rnJ">⤴ JUMP</button></div>`);gAsk(q);
  const F=$("rnF"),Hh=$("rnH");const jump=()=>{if(air||q.done)return;air=true;Hh.classList.add("up");sfx.tap();setTimeout(()=>{Hh.classList.remove("up");air=false},850)};
  $("rnJ").onclick=jump;F.onclick=jump;
  const spawn=()=>{if(!L||L.q!==q||q.done||!alive)return;if(spawned>=q.need+bumps)return;spawned++;const o=document.createElement("span");o.className="rn-o";o.textContent=q.o;o.style.animationDuration=q.speed+"s";F.appendChild(o);
    const chk=setInterval(()=>{if(!o.isConnected){clearInterval(chk);return}const r=o.getBoundingClientRect(),hr=Hh.getBoundingClientRect();if(!o.dataset.done&&r.left<hr.right-8&&r.right>hr.left+8){if(!air){o.dataset.done="hit";bumps++;F.classList.add("bump");setTimeout(()=>F.classList.remove("bump"),400)}}
      if(!o.dataset.counted&&r.right<hr.left){o.dataset.counted=1;if(o.dataset.done!=="hit"){passed++;$("rnC").textContent=passed+" / "+q.need;if(passed>=q.need&&!q.done){q.done=true;alive=false;gameWin(q,bumps>2?1:0,Hh,[])}}}},60);
    o.addEventListener("animationend",()=>{o.remove()});setTimeout(spawn,(q.speed*1000)*(.55+Math.random()*.35))};
  setTimeout(spawn,1800);window.__gSolve=()=>{q.done=true;alive=false;gameWin(q,0,Hh,[])}}
/* ---------- Move with me: watch the moves, tap them in order, then do them for real ---------- */
const MOVES=[["M1","Jump like a frog","🐸"],["M2","Spin around","🌀"],["M3","Clap your hands","👏"],["M4","Stand on one leg","🦩"],["M5","Touch your toes","🦶"],["M6","Walk like a bear","🐻"]];
function qMove(){const a=lvl(),n=a<=4?2:3,seq=sh(MOVES.slice()).slice(0,n),extra=sh(MOVES.filter(m=>!seq.includes(m))).slice(0,a<=4?1:2);return {game:"move",seq,cards:sh([...seq,...extra]),voice:[G4("MOVE_WATCH")],gid:"g:move",factT:"Moving your body makes it strong - and it's fun!"}}
function moveQ(q){let at=0,miss=0,ready=false;
  gShow(`<div class="game">${gHead("🤸","Move with me","Watch, then tap them in order")}<div class="mv-stage" id="mvS"><span class="mv-big" id="mvB">👀</span><b id="mvT"></b></div>
    <div class="mv-cards">${q.cards.map((m,j)=>`<button class="mv-c" data-j="${j}" disabled><span>${m[2]}</span><small>${m[1]}</small></button>`).join("")}</div>
    <div class="mv-real" id="mvR" hidden><p>Now do it for real! 🙌</p><button class="qcheck on" id="mvY">I did it! ⭐</button><button class="mv-skip" id="mvN">Skip</button></div></div>`);
  const C=[...$("qBody").querySelectorAll(".mv-c")];
  const show=()=>{ready=false;at=0;C.forEach(c=>{c.disabled=true;c.classList.remove("ok")});let k=0;const st=()=>{if(!L||L.q!==q)return;if(k>=q.seq.length){$("mvB").textContent="👆";$("mvT").textContent="Your turn!";C.forEach(c=>c.disabled=false);ready=true;return}
    const m=q.seq[k++];$("mvB").textContent=m[2];$("mvB").className="mv-big mv-"+m[0];$("mvT").textContent=m[1];sayseq([G4(m[0])],()=>setTimeout(st,500))};st()};
  sayseq(q.voice,()=>setTimeout(show,300));
  C.forEach(c=>c.onclick=()=>{if(!ready||q.done)return;const m=q.cards[+c.dataset.j];if(m===q.seq[at]){c.classList.add("ok");sfx.tap();at++;if(at===q.seq.length){ready=false;$("mvR").hidden=false;sayseq([G4("MOVE_YOU")],()=>{})}}
    else{miss++;sfx.oops();bounce(c);if(miss>=3){ready=false;$("mvR").hidden=false}else setTimeout(show,700)}});
  const fin=()=>{if(q.done)return;gameWin(q,miss>1?1:0,$("mvS"),[])};$("mvY").onclick=fin;$("mvN").onclick=fin;
  window.__gSolve=()=>{q.done=false;fin()}}

/* ---------- Little Scientist: predict, try, see what happens ---------- */
const FLOATERS=[["🪵","wood",1],["🍎","apple",1],["🦆","rubber duck",1],["🍃","leaf",1],["🏐","ball",1],["🪨","rock",0],["🔑","key",0],["🪙","coin",0],["⚓","anchor",0]];
function qSci(cat){const a=lvl(),pool={sky:["weather","day"],world:["float","plant","weather","day"],farm:["plant","weather"],animals:["float","plant"],clock:["day"],flags:["day","weather"],shapes:["float"],count:["float"]}[cat]||["float","plant","weather","day"],m=pickOne(pool);
  if(m==="float"){const x=pickOne(FLOATERS);return {game:"sci",m,x,voice:[G4("SCI_FLOAT")],gid:"g:sci",factT:"Wood, leaves and balloons are light, so they float. Rocks and keys sink."}}
  if(m==="weather"){const want=pickOne(["rain","snow"]);return {game:"sci",m,want,voice:[G4(want==="rain"?"SCI_RAIN":"SCI_SNOW")],gid:"g:sci",factT:want==="rain"?"When it is warm, clouds drop rain.":"When it is very cold, clouds drop snow."}}
  if(m==="day")return {game:"sci",m,voice:[G4("SCI_DAY")],gid:"g:sci",factT:"When our side of Earth faces the Sun, it is day."};
  return {game:"sci",m:"plant",voice:[G4("SCI_PLANT")],gid:"g:sci",factT:"A seed needs water, soil, air and sunlight to grow."}}
function sciQ(q){let miss=0;
  if(q.m==="float"){const x=q.x;gShow(`<div class="game">${gHead("🧪","Little scientist","Float or sink?")}<div class="sc-tank" id="scT"><span class="sc-obj" id="scO">${x[0]}</span><div class="sc-water"></div></div>
      <div class="gr-opts"><button class="gr-o sc-p" data-f="1">🛟<small>Floats</small></button><button class="gr-o sc-p" data-f="0">⬇️<small>Sinks</small></button></div></div>`);gAsk(q);
    $("qBody").querySelectorAll(".sc-p").forEach(b=>b.onclick=()=>{if(q.done)return;q.done=true;const right=+b.dataset.f===x[2];b.classList.add(right?"ok":"no");$("scO").classList.add(x[2]?"float":"sink");sfx.tap();
      setTimeout(()=>{q.done=false;gameWin(q,right?0:1,$("scT"),[])},1900)});window.__gSolve=()=>$("qBody").querySelector(`.sc-p[data-f="${x[2]}"]`).click();return}
  if(q.m==="plant"){let sun=false,water=false;gShow(`<div class="game">${gHead("🌱","Little scientist","What does the plant need?")}<div class="sc-pot" id="scP"><span class="sc-sun" id="scSun">☀️</span><span class="sc-rain" id="scRn">💧💧💧</span><span class="sc-plant" id="scPl">🌱</span><span class="sc-soil"></span></div>
      <div class="sc-tog"><button class="sc-t" data-k="water">💧<small>Water</small></button><button class="sc-t" data-k="sun">☀️<small>Sunlight</small></button><button class="sc-t" data-k="candy">🍬<small>Candy</small></button></div><button class="qcheck on" id="scG">GROW! 🌱</button></div>`);gAsk(q);
    $("qBody").querySelectorAll(".sc-t").forEach(b=>b.onclick=()=>{const k=b.dataset.k;b.classList.toggle("on");if(k==="sun")sun=b.classList.contains("on");if(k==="water")water=b.classList.contains("on");$("scP").classList.toggle("sunny",sun);$("scP").classList.toggle("wet",water);sfx.tap()});
    $("scG").onclick=()=>{if(q.done)return;if(sun&&water){q.done=true;$("scPl").textContent="🌻";$("scPl").classList.add("grow");setTimeout(()=>{q.done=false;gameWin(q,miss,$("scP"),[])},1400)}else{miss++;$("scPl").textContent="🥀";$("scPl").classList.add("droop");setTimeout(()=>{$("scPl").textContent="🌱";$("scPl").classList.remove("droop")},1300);toastHint(!water?"It needs water 💧":"It needs sunlight ☀️")}};
    window.__gSolve=()=>{sun=water=true;$("scG").click()};return}
  if(q.m==="weather"){let cloud=false,temp=null;gShow(`<div class="game">${gHead("⛅","Little scientist",q.want==="rain"?"Make it rain!":"Make it snow!")}<div class="sc-sky" id="scK"><span class="sc-cl" id="scCl">☁️</span><span class="sc-fall" id="scF"></span><span class="sc-th" id="scTh">🌡️</span></div>
      <div class="sc-tog"><button class="sc-t" data-k="cloud">☁️<small>Clouds</small></button><button class="sc-t" data-k="warm">🔥<small>Warm</small></button><button class="sc-t" data-k="cold">❄️<small>Very cold</small></button></div><button class="qcheck on" id="scG">TRY IT!</button></div>`);gAsk(q);
    $("qBody").querySelectorAll(".sc-t").forEach(b=>b.onclick=()=>{const k=b.dataset.k;sfx.tap();if(k==="cloud"){cloud=!cloud;b.classList.toggle("on",cloud);$("scK").classList.toggle("cloudy",cloud)}else{temp=temp===k?null:k;$("qBody").querySelectorAll('[data-k="warm"],[data-k="cold"]').forEach(x=>x.classList.toggle("on",x.dataset.k===temp));$("scK").dataset.t=temp||""}});
    $("scG").onclick=()=>{if(q.done)return;const res=cloud&&temp==="warm"?"rain":cloud&&temp==="cold"?"snow":cloud?"cloud":"sun";$("scF").textContent=res==="rain"?"💧💧💧💧":res==="snow"?"❄️❄️❄️❄️":"";$("scF").className="sc-fall go";
      if(res===q.want){q.done=true;setTimeout(()=>{q.done=false;gameWin(q,miss,$("scK"),[])},1500)}else{miss++;toastHint(res==="rain"?"That made rain! 🌧️":res==="snow"?"That made snow! ❄️":!cloud?"We need clouds ☁️":"Is it warm or cold? 🌡️")}};
    window.__gSolve=()=>{cloud=true;temp=q.want==="rain"?"warm":"cold";$("scK").classList.add("cloudy");$("scG").click()};return}
  let ang=pickOne([0,90]);gShow(`<div class="game">${gHead("🌍","Little scientist","Make it day for the house!")}<div class="sc-space"><span class="sc-s">☀️</span><div class="sc-earth"><div class="sc-rot" id="scE"><span class="sc-home">🏠</span></div></div></div><div class="gr-opts"><button class="gr-o" id="scRot">🔄<small>Spin Earth</small></button></div></div>`);gAsk(q);
  const E2=$("scE"),set=()=>{E2.style.transform=`rotate(${ang}deg)`;E2.parentNode.classList.toggle("day",ang%360===270)};set();
  $("scRot").onclick=()=>{if(q.done)return;ang+=90;sfx.tap();set();if(ang%360===270){q.done=true;setTimeout(()=>{q.done=false;gameWin(q,0,E2,[])},900)}};window.__gSolve=()=>{ang=270;set();q.done=false;gameWin(q,0,E2,[])}}

/* ---------- toddler: clean the window, grow a flower ---------- */
function qScratch(cat){const T=lrThings(cat)||lrThings("animals"),t=pickOne(T);return {game:"scratch",t,voice:[G4("SCRATCH")],gid:"learn.scratch",factT:t.n.replace(/ is for .*/,"")+"!"}}
function scratchQ(q){gShow(`<div class="game lrn">${gHead("🧽","Clean the window","Who is behind the window?")}<div class="scr" id="scrB"><div class="scr-in">${BIGPIC(q.t.p)}</div><canvas id="scrC"></canvas></div></div>`);gAsk(q);
  const cv=$("scrC"),B=$("scrB"),ctx=cv.getContext("2d");const fit=()=>{cv.width=B.clientWidth;cv.height=B.clientHeight;const g=ctx.createLinearGradient(0,0,cv.width,cv.height);g.addColorStop(0,"#B9D7EA");g.addColorStop(1,"#DCEBF5");ctx.fillStyle=g;ctx.fillRect(0,0,cv.width,cv.height);ctx.fillStyle="rgba(255,255,255,.5)";for(let i=0;i<40;i++){ctx.beginPath();ctx.arc(Math.random()*cv.width,Math.random()*cv.height,4+Math.random()*12,0,7);ctx.fill()}};requestAnimationFrame(fit);
  let on=false,done=false,lastC=0;const rub=e=>{const r=cv.getBoundingClientRect();ctx.globalCompositeOperation="destination-out";ctx.beginPath();ctx.arc(e.clientX-r.left,e.clientY-r.top,38,0,7);ctx.fill();
    const now=Date.now();if(!done&&now-lastC>150){lastC=now;const d=ctx.getImageData(0,0,cv.width,cv.height).data;let c=0;for(let i=3;i<d.length;i+=64)if(d[i]===0)c++;if(c/(d.length/64)>.5){done=true;cv.style.opacity=0;hush();q.stay=true;gameWin(q,0,B,q.t.say)}}};
  cv.style.touchAction="none";cv.addEventListener("pointerdown",e=>{on=true;rub(e)});cv.addEventListener("pointermove",e=>{if(on)rub(e)});["pointerup","pointercancel","pointerleave"].forEach(k=>cv.addEventListener(k,()=>on=false));
  window.__gSolve=()=>{done=true;cv.style.opacity=0;q.stay=true;gameWin(q,0,B,q.t.say)}}
function qTGrow(){return {game:"tgrow",voice:[G4("TGROW")],gid:"learn.tgrow",factT:"Water and sunshine help flowers grow!"}}
function tgrowQ(q){let w=0,s=0;gShow(`<div class="game lrn">${gHead("🌻","Grow a flower","Give it water and sunshine")}<div class="sc-pot big" id="scP"><span class="sc-plant" id="scPl" style="font-size:60px">🌰</span><span class="sc-soil"></span></div>
    <div class="sc-tog"><button class="sc-t big" data-k="w">🚿<small>Water</small></button><button class="sc-t big" data-k="s">☀️<small>Sun</small></button></div></div>`);gAsk(q);
  const stage=()=>{const n=w+s,P=$("scPl");P.textContent=n<2?"🌰":n<4?"🌱":n<6?"🌿":"🌻";P.style.fontSize=(60+n*10)+"px";if(n>=6&&!q.done){q.done=true;setTimeout(()=>gameWin(q,0,P,[]),700)}};
  $("qBody").querySelectorAll(".sc-t").forEach(b=>b.onclick=()=>{if(q.done)return;b.dataset.k==="w"?w=Math.min(3,w+1):s=Math.min(3,s+1);sfx.tap();$("scP").classList.add(b.dataset.k==="w"?"wet":"sunny");setTimeout(()=>$("scP").classList.remove("wet","sunny"),700);stage()});
  window.__gSolve=()=>{w=s=3;stage()}}

Object.assign(GAMES,{drum:drumQ,tdrum:tdrumQ,shapes:shapesQ,slot:slotQ,pdet:pdetQ,quilt:quiltQ,emo:emoQ,run:runQ,move:moveQ,sci:sciQ,scratch:scratchQ,tgrow:tgrowQ});
const _bf4=buildFormat;
buildFormat=function(kind,cat){const k=kind.startsWith("f_")?kind.slice(2):"",F={drum:qDrum,tdrum:qTDrum,shapes:qShapes4,slot:qSlot,pdet:qPDet,quilt:qQuilt,emo:qEmo,run:qRun,move:qMove,sci:qSci,scratch:qScratch,tgrow:qTGrow}[k];return F?F(cat):_bf4(kind,cat)};
const _ff4=formatsFor0;
formatsFor0=function(cat){const b=_ff4(cat);if(!G4_READY)return b;const a=lvl(),add={memory:["f_drum","f_shapes","f_pdet","f_quilt","f_move"],shapes:["f_shapes","f_pdet","f_quilt","f_drum"],count:["f_slot","f_pdet","f_shapes","f_sci"],add:["f_slot","f_pdet"],
  letters:["f_slot"],read:["f_slot",...(a>=5?["f_emo"]:[])],people:["f_emo","f_emo","f_move","f_run"],animals:["f_run","f_move","f_sci"],farm:["f_run","f_sci"],world:["f_sci","f_sci","f_run","f_emo"],sky:["f_sci","f_run"],clock:["f_sci","f_drum"],flags:["f_sci"],robot:["f_run","f_pdet","f_quilt"]}[cat]||[];
  return [...b,...add.filter(k=>S.age>3||!["f_slot","f_pdet"].includes(k))]};
/* the youngest: more play in their rounds */
const _pr4=planRound;
planRound=function(cat,count){const p=_pr4(cat,count);if(!G4_READY||S.age>3||!p)return p;const toy=sh(["f_scratch","f_tgrow","f_tdrum","f_shapes",...(["people","world","animals"].includes(cat)?["f_emo","f_move"]:[])]);
  let j=0;return p.map((k,i)=>(k==="f_lshow"||k==="f_lfind"||(k==="f_colorit"&&i>3))&&j<toy.length?toy[j++]:k)};
Object.assign(GMAP,{
 "g:drum":G("Drums & xylophone",["cre","art"],[["cog","memory"],["lang","listen"]],"Listen to a beat, then play it back on drums or a xylophone.","Play"),
 "g:shapes":G("Moving shapes",["cog","math"],[["phys","coord"]],"Catch the floating shapes that match the target shape.","Play"),
 "g:slot":G("Lucky slots",["lang","read"],[["cog","math"]],"Spin the slot machine, then set the reels to spell a word or make a number.","Play"),
 "g:pdet":G("Pattern detective",["cog","logic"],[["cog","math"],["cog","memory"]],"Find the missing piece of a colour, shape or number pattern (grows to 3x3 grids).","Play"),
 "g:quilt":G("Patchwork quilt",["cog","logic"],[FIN],"Fit each patterned piece into the hole of the same shape.","Play"),
 "g:emo":G("Feelings detective",["soc","emotions"],[["soc","empathy"]],"Read feelings from faces and from little everyday situations.","Reflect"),
 "g:emo:help":G("Kind choices",["soc","empathy"],[["soc","sharing"]],"Choose the helpful thing to do when a friend needs help.","Reflect"),
 "g:run":G("Adventure run",["phys","coord"],[["cog","memory"]],"Tap at the right moment to jump over obstacles (timing).","Play"),
 "g:move":G("Move with me",["phys","gross"],[["cog","memory"],["phys","coord"]],"Remember a sequence of moves, then do them for real.","Play"),
 "g:sci":G("Little scientist",["cre","science"],[["cre","experiment"],["cog","curiosity"]],"Predict, try and see: float or sink, what plants need, making rain, day and night.","Explore"),
 "learn.scratch":G("Clean the window",["lang","vocab"],[FIN],"Wipe the foggy window to find who is behind it, and hear its name.","Play"),
 "learn.tgrow":G("Grow a flower",["cre","science"],[["phys","fine"]],"Give a seed water and sun and watch it grow.","Explore")});
/* more maze adventures */
MAZES.animals.push(["🐧","🐟","Penguins cannot fly, but they are great swimmers."],["🐢","🌊","Sea turtles swim in the ocean but lay their eggs on the beach."],["🐒","🍌","Monkeys use their long tails to hold on to branches."]);
MAZES.sky.push(["🛸","🪐","Saturn has beautiful rings made of ice and rock."],["🧑‍🚀","🚀","Astronauts fly to space in a rocket."]);
MAZES.farm.push(["🐔","🌽","Hens like to eat corn and seeds."],["🐑","🌾","Sheep eat grass, and their wool keeps them warm."]);
MAZES.world.push(["🐬","🌊","Dolphins live in the sea and breathe air through a hole on their head."]);
MAZES.shapes.push(["🚗","⛽","Cars need fuel or electricity to drive."]);MAZES.robot.push(["🚗","⛽","Cars need fuel or electricity to drive."],["🐝","🌸","Bees visit flowers to collect nectar and make honey."]);
MAZES.count.push(["🐰","🥕","Rabbits have long ears to hear danger far away."]);
