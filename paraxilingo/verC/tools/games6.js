
/* =====================================================================================================
   Nov 11c: 20 MORE GAMES - moving, hands-on, dynamic.
   Lab: colour mixing, ramp race, magnet fishing, shadow lab, ice melt race, singing bottles, balloon pump, volcano.
   Feelings: feelings memory, make-a-face mirror, calm breathing, kind or unkind, cheer up a friend.
   Movement: rhythm drums, balance beam, basket catch, Simon says, hopscotch, dance copy, wall climb.
   ===================================================================================================== */
var G6_READY=__G6VOICE__;
const G6=n=>"w/PX_G6_"+n;
const g6tone=(f,d=.35,type="sine",v=.4)=>{try{if(!S.fx)return;const c=dac(),t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d)}catch(e){}};
const clampN=(x,a,b)=>Math.max(a,Math.min(b,x));

/* ---------------- LAB 1: colour mixing ---------------- */
const PNT6={red:"#FF4D4D",yellow:"#FFD43B",blue:"#3B8BFF",white:"#FFFFFF"},PMIX=[["orange","#FF922B",["red","yellow"]],["green","#40C057",["blue","yellow"]],["purple","#9C5DE8",["red","blue"]],["pink","#FF9EC4",["red","white"]],["light blue","#9AD3FF",["blue","white"]]];
function qMix(){const a=lvl(),m=pickOne(PMIX.slice(0,a<=5?3:5));return {game:"mix",m,voice:[G6("MIX")],gid:"g:mix",factT:`${cap1(m[2][0])} and ${m[2][1]} make ${m[0]}!`}}
function mixQ(q){let inB=[],miss=0;const pots=Object.keys(PNT6).filter(k=>lvl()>5||k!=="white");
  gShow(`<div class="game">${gHead("🎨","Colour lab","Make this colour!")}<div class="mx-top"><span class="mx-t" style="background:${q.m[1]}"></span><b>${cap1(q.m[0])}</b></div>
    <div class="mx-bowl" id="mxB"><svg viewBox="0 0 200 110"><path d="M10 20 Q100 150 190 20Z" fill="#F1F3F5" stroke="#ADB5BD" stroke-width="5"/><ellipse id="mxL" cx="100" cy="30" rx="80" ry="12" fill="#F8F9FA"/><g id="mxS" opacity="0"><path d="M60 32 q40 -18 80 0" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/></g></svg></div>
    <div class="mx-pots">${pots.map(k=>`<button class="mx-p" data-k="${k}"><span style="background:${PNT6[k]}"></span><small>${cap1(k)}</small></button>`).join("")}</div>
    <div class="mx-row"><button class="mv-skip" id="mxC">Empty the bowl</button><button class="qcheck on" id="mxM">MIX! 🥄</button></div></div>`);gAsk(q);
  const mixCol=()=>{if(!inB.length)return "#F8F9FA";if(inB.length===1)return PNT6[inB[0]];const f=PMIX.find(m=>m[2].every(c=>inB.includes(c)));return f?f[1]:"#8D6E63"};
  const show=()=>$("mxL").setAttribute("fill",inB.length?PNT6[inB[inB.length-1]]:"#F8F9FA");
  $("qBody").querySelectorAll(".mx-p").forEach(b=>{const add=()=>{if(q.done||inB.length>=2||inB.includes(b.dataset.k))return;inB.push(b.dataset.k);g6tone(300+inB.length*120,.15);const d=document.createElement("i");d.className="mx-drop";d.style.background=PNT6[b.dataset.k];$("mxB").appendChild(d);setTimeout(()=>d.remove(),700);setTimeout(show,500)};
    dragify(b,()=>[$("mxB")],add,add)});
  $("mxC").onclick=()=>{inB=[];show();sfx.tap()};
  $("mxM").onclick=()=>{if(q.done)return;if(inB.length<2){toastHint("Put two paints in the bowl 🎨");return}$("mxS").setAttribute("opacity","1");$("mxB").classList.add("stir");
    setTimeout(()=>{$("mxB").classList.remove("stir");$("mxS").setAttribute("opacity","0");$("mxL").setAttribute("fill",mixCol());const ok=q.m[2].every(c=>inB.includes(c));
      if(ok)gameWin(q,miss,$("mxB"),[]);else{miss++;const f=PMIX.find(m=>m[2].every(c=>inB.includes(c)));toastHint(f?`That made ${f[0]}! Try again 🎨`:"That made brown! Try again 🎨");setTimeout(()=>{inB=[];show()},1400);if(miss>=3){q.done=true;gameLearn(q,`${cap1(q.m[2][0])} + ${q.m[2][1]} = ${q.m[0]}`,[])}}},1100)};
  window.__gSolve=()=>{inB=q.m[2].slice();$("mxM").click()}}

/* ---------------- LAB 2: ramp race ---------------- */
function qRamp(){const t=ri(2,5);return {game:"ramp",t,voice:[G6("RAMP")],gid:"g:ramp",factT:"A higher ramp makes the car go faster and farther!"}}
function rampQ(q){let h=1,miss=0,busy=false;
  gShow(`<div class="game">${gHead("🏎️","Ramp race","Stop the car on the flag!")}<div class="rp" id="rpF"><svg viewBox="0 0 320 150" class="rp-svg"><path id="rpR" fill="#C49A6C" stroke="#9E7444" stroke-width="3"/><rect x="0" y="130" width="320" height="20" fill="#8CE99A"/>
      ${[1,2,3,4,5].map(i=>`<line x1="${70+i*45}" y1="128" x2="${70+i*45}" y2="134" stroke="#2F9E44" stroke-width="3"/>`).join("")}</svg><span class="rp-flag" style="left:${(70+q.t*45)/320*100}%">🚩</span><span class="rp-car" id="rpC">🚗</span></div>
    <div class="rp-ctl"><span>Ramp height</span><button class="sc-t" id="rpD">➖</button><b id="rpH">1</b><button class="sc-t" id="rpU">➕</button></div><button class="qcheck on" id="rpG">GO! 🏁</button></div>`);gAsk(q);
  const F=$("rpF"),C=$("rpC");const draw=()=>{const top=130-h*20;$("rpR").setAttribute("d",`M0 ${top} L70 130 L0 130Z`);$("rpH").textContent=h;C.style.transition="none";C.style.left="0%";C.style.top=(top-22)/150*100+"%";C.style.transform=`rotate(${Math.atan2(h*20,70)*57}deg)`};draw();
  $("rpU").onclick=()=>{if(!busy&&h<5){h++;sfx.tap();draw()}};$("rpD").onclick=()=>{if(!busy&&h>1){h--;sfx.tap();draw()}};
  $("rpG").onclick=()=>{if(busy||q.done)return;busy=true;g6tone(200,.8,"sawtooth",.08);C.style.transition="left 1.6s cubic-bezier(.2,.7,.4,1),top .5s ease-in,transform .5s";C.style.top=(130-22)/150*100+"%";C.style.transform="rotate(0)";C.style.left=((70+h*45)/320*100-5)+"%";
    setTimeout(()=>{busy=false;if(h===q.t)gameWin(q,miss,C,[]);else{miss++;toastHint(h<q.t?"Not far enough - make the ramp higher ⬆️":"Too far - make the ramp lower ⬇️");if(miss>=4){q.done=true;h=q.t;draw();gameLearn(q,"Higher ramp = farther!",[])}else setTimeout(draw,900)}},1750)};
  window.__gSolve=()=>{h=q.t;draw();$("rpG").click()}}

/* ---------------- LAB 3: magnet fishing ---------------- */
const MAGY6=[["📎","paper clip"],["🔩","bolt"],["🧷","safety pin"],["✂️","scissors"],["🪛","screwdriver"]],MAGN6=[["🍃","leaf"],["🍎","apple"],["🦆","rubber duck"],["🪵","wood"],["🐚","shell"],["🧸","teddy"]];
function qMag2(){const a=lvl(),y=sh(MAGY6).slice(0,a<=4?2:3),n=sh(MAGN6).slice(0,a<=4?3:4);return {game:"mag2",items:sh([...y.map(x=>[...x,1]),...n.map(x=>[...x,0])]),need:y.length,voice:[G6("MAGNET")],gid:"g:mag2",factT:"Magnets pull things made of iron and steel."}}
function mag2Q(q){let got=0,miss=0,busy=false;
  gShow(`<div class="game">${gHead("🧲","Magnet fishing","Fish out everything the magnet can pick up!")}<div class="mgp" id="mgP"><div class="mg-rod" id="mgR"><i></i><span>🧲</span></div>
    ${q.items.map((x,j)=>`<button class="mg-i" data-j="${j}" style="--x:${8+(j%4)*23}%;--y:${48+Math.floor(j/4)*24}%;--d:${(2+Math.random()*2).toFixed(1)}s">${x[0]}</button>`).join("")}</div><div class="mg-cnt" id="mgC">${"⚪".repeat(q.need)}</div></div>`);gAsk(q);
  const R=$("mgR");$("qBody").querySelectorAll(".mg-i").forEach(b=>b.onclick=()=>{if(busy||q.done||b.classList.contains("up"))return;busy=true;const x=q.items[+b.dataset.j],P=$("mgP").getBoundingClientRect(),r=b.getBoundingClientRect();
    R.style.left=(r.left-P.left+r.width/2)+"px";R.style.setProperty("--len",(r.top-P.top)+"px");R.classList.add("down");sfx.tap();
    setTimeout(()=>{R.classList.remove("down");if(x[2]){b.classList.add("up");g6tone(880,.2);got++;$("mgC").textContent="🟢".repeat(got)+"⚪".repeat(q.need-got);if(got===q.need)setTimeout(()=>gameWin(q,miss>2?1:0,$("mgP"),[]),700)}else{miss++;b.classList.add("no");setTimeout(()=>b.classList.remove("no"),600);toastHint(`The magnet can't pull the ${x[1]}`)}setTimeout(()=>busy=false,500)},700)});
  window.__gSolve=()=>{q.items.forEach((x,j)=>{if(x[2]){const b=$("qBody").querySelector(`.mg-i[data-j="${j}"]`);b.classList.add("up")}});gameWin(q,0,$("mgP"),[])}}

/* ---------------- LAB 4: shadow lab ---------------- */
function qShadow(){const side=pickOne([-1,1]);return {game:"shadow",side,obj:pickOne(["🐰","🌲","🦒","🏠","🐱"]),voice:[G6("SHADOW")],gid:"g:shadow",factT:"A shadow falls on the side away from the light."}}
function shadowQ(q){let x=50,miss=0,won=false;const goal=50+q.side*30;
  gShow(`<div class="game">${gHead("🔦","Shadow lab","Move the torch so the shadow covers the star!")}<div class="sh-room" id="shR"><span class="sh-star" style="left:${goal}%">⭐</span><span class="sh-shadow" id="shS"></span><span class="sh-obj">${q.obj}</span><span class="sh-torch" id="shT">🔦</span><div class="sh-beam" id="shB"></div></div>
    <input type="range" class="sh-sl" id="shX" min="5" max="95" value="50" aria-label="Move the torch"></div>`);gAsk(q);
  const S2=$("shS"),T=$("shT"),B=$("shB");const draw=()=>{const sx=clampN(50+(50-x)*1.2,2,98);S2.style.left=sx+"%";S2.style.width=(14+Math.abs(50-x)*.5)+"%";T.style.left=x+"%";T.style.transform=`translateX(-50%) rotate(${x<50?45:x>50?-45+180:90}deg)`;B.style.left=Math.min(x,50)+"%";B.style.width=Math.abs(50-x)+"%";
    if(!won&&Math.abs(sx-goal)<7){won=true;$("shX").disabled=true;g6tone(988,.3);setTimeout(()=>gameWin(q,miss,S2,[]),500)}};draw();
  $("shX").oninput=e=>{x=+e.target.value;draw()};window.__gSolve=()=>{x=50-(goal-50)/1.2;draw()}}

/* ---------------- LAB 5: ice melt race ---------------- */
function qIce(){return {game:"ice",voice:[G6("ICE")],gid:"g:ice",factT:"Heat melts ice. The sunny spot is warmest, so its ice melts first."}}
function iceQ(q){const P=[["sun","☀️","Sunny window",3],["shade","🌳","Shady tree",7],["freezer","🧊","Freezer",99]];
  gShow(`<div class="game">${gHead("🧊","Ice race","Where will the ice melt first?")}<div class="ic">${P.map((p,j)=>`<button class="ic-c" data-j="${j}"><span class="ic-e">${p[1]}</span><span class="ic-cube" id="icC${j}"><i></i></span><span class="ic-pud" id="icP${j}"></span><small>${p[2]}</small></button>`).join("")}</div></div>`);gAsk(q);
  $("qBody").querySelectorAll(".ic-c").forEach(b=>b.onclick=()=>{if(q.done)return;q.done=true;const j=+b.dataset.j;b.classList.add("pick");sfx.tap();
    P.forEach((p,k)=>{const c=$("icC"+k),pd=$("icP"+k);c.style.transition=`transform ${p[3]}s linear,opacity ${p[3]}s linear`;pd.style.transition=`transform ${p[3]}s linear`;requestAnimationFrame(()=>{if(p[3]<50){c.style.transform="scale(.1)";c.style.opacity=".2";pd.style.transform="scaleX(1)"}else c.classList.add("frost")})});
    setTimeout(()=>{q.done=false;gameWin(q,j===0?0:1,$("icC0"),[])},3300)});window.__gSolve=()=>$("qBody").querySelector('.ic-c[data-j="0"]').click()}

/* ---------------- LAB 6: singing bottles ---------------- */
function qBottle(){const n=lvl()<=5?3:4,lv=sh([20,40,60,80].slice(0,n));return {game:"bottle",lv,voice:[G6("BOTTLE")],gid:"g:bottle",factT:"When you tap a bottle, more water makes a lower sound."}}
function bottleQ(q){const order=q.lv.map((v,i)=>[v,i]).sort((a,b)=>b[0]-a[0]).map(x=>x[1]);let at=0,miss=0;const freq=v=>1100-v*8;
  gShow(`<div class="game">${gHead("🍾","Singing bottles","Tap them from the lowest sound to the highest!")}<div class="bt">${q.lv.map((v,i)=>`<button class="bt-b" data-i="${i}"><svg viewBox="0 0 60 130"><path d="M22 4h16v26q16 10 16 30v62q0 6-6 6H12q-6 0-6-6V60q0-20 16-30Z" fill="#E7F5FF" stroke="#74C0FC" stroke-width="3"/><clipPath id="btc${i}"><path d="M22 4h16v26q16 10 16 30v62q0 6-6 6H12q-6 0-6-6V60q0-20 16-30Z"/></clipPath><rect clip-path="url(#btc${i})" x="0" y="${128-v*1.2}" width="60" height="${v*1.2}" fill="${["#4DABF7","#FF8787","#69DB7C","#FFD43B"][i]}"/></svg><b class="bt-n"></b></button>`).join("")}</div>
    <button class="hr-play sm" id="btL">👂</button></div>`);gAsk(q);
  const B=[...$("qBody").querySelectorAll(".bt-b")];const ring=i=>{g6tone(freq(q.lv[i]),.6,"triangle",.35);B[i].classList.add("ring");setTimeout(()=>B[i].classList.remove("ring"),400)};
  $("btL").onclick=()=>{let k=0;const t=()=>{if(k<B.length){ring(k++);setTimeout(t,600)}};t()};
  B.forEach(b=>b.onclick=()=>{if(q.done)return;const i=+b.dataset.i;ring(i);if(b.classList.contains("ok"))return;if(i===order[at]){b.classList.add("ok");b.querySelector(".bt-n").textContent=at+1;at++;if(at===B.length)setTimeout(()=>gameWin(q,miss,$("qBody").querySelector(".bt"),[]),500)}
    else{miss++;bounce(b);if(miss>=4){q.done=true;order.forEach((o,k)=>{B[o].classList.add("ok");B[o].querySelector(".bt-n").textContent=k+1});gameLearn(q,"Most water = lowest sound",[])}}});
  window.__gSolve=()=>order.forEach(o=>{if(!B[o].classList.contains("ok"))B[o].click()})}

/* ---------------- LAB 7: balloon pump ---------------- */
function qPump(){return {game:"pump",t:ri(3,lvl()<=4?4:6),voice:[G6("PUMP")],gid:"g:pump",factT:"Air takes up space: more air makes the balloon bigger."}}
function pumpQ(q){let n=0,miss=0;
  gShow(`<div class="game">${gHead("🎈","Balloon pump","Pump it up to the dotted line - not more!")}<div class="pm" id="pmF"><span class="pm-goal" style="--s:${.45+q.t*.15}"></span><span class="pm-b" id="pmB"><svg viewBox="0 0 100 120"><ellipse cx="50" cy="48" rx="40" ry="46" fill="#FF6B9A"/><ellipse cx="36" cy="30" rx="10" ry="14" fill="#fff" opacity=".45"/><path d="M45 92 L55 92 L50 100Z" fill="#E0457B"/></svg></span><span class="pm-pump">🧰</span></div>
    <div class="mx-row"><button class="qcheck on pm-btn" id="pmP">PUMP 💨</button><button class="qcheck" id="pmD" style="background:#58CC02;color:#fff">DONE ✓</button></div></div>`);gAsk(q);
  const B=$("pmB"),sz=()=>B.style.setProperty("--s",.3+n*.15);sz();
  $("pmP").onclick=()=>{if(q.done)return;n++;g6tone(200+n*60,.25,"triangle",.2);sz();B.classList.add("puff");setTimeout(()=>B.classList.remove("puff"),200);
    if(n>q.t+1){miss++;B.classList.add("pop");sfx.oops();toastHint("POP! Too much air 🎈 Try again");setTimeout(()=>{B.classList.remove("pop");n=0;sz()},900)}};
  $("pmD").onclick=()=>{if(q.done)return;if(n===q.t)gameWin(q,miss,B,[]);else{miss++;toastHint(n<q.t?"A little more air 💨":"Too big!");if(n>q.t){n=0;sz()}}};
  window.__gSolve=()=>{n=q.t;sz();$("pmD").click()}}

/* ---------------- LAB 8: volcano ---------------- */
const VOLC6=[["🧂","baking soda",1],["🍶","vinegar",1],["💧","water",0],["🍬","sugar",0],["🏖️","sand",0]];
function qVolc(){return {game:"volc",voice:[G6("VOLCANO")],gid:"g:volc",factT:"Baking soda and vinegar make bubbles of gas - fizz!"}}
function volcQ(q){let pot=[],miss=0;const shelf=sh(VOLC6.slice());
  gShow(`<div class="game">${gHead("🌋","Fizzy volcano","Which two make it erupt?")}<div class="vc" id="vcV"><span class="vc-foam" id="vcF"></span><svg viewBox="0 0 200 130"><path d="M20 128 L80 30 L120 30 L180 128Z" fill="#A9744F"/><path d="M80 30 L120 30 L112 44 L88 44Z" fill="#5C3A21"/></svg><span class="vc-in" id="vcI"></span></div>
    <div class="mx-pots">${shelf.map((x,j)=>`<button class="mx-p vc-p" data-j="${j}"><span class="vc-e">${x[0]}</span><small>${cap1(x[1])}</small></button>`).join("")}</div></div>`);gAsk(q);
  const go=()=>{const ok=pot.every(x=>x[2]);$("vcF").className="vc-foam "+(ok?"boom":"meh");g6tone(ok?120:300,ok?1.2:.3,"sawtooth",.08);
    setTimeout(()=>{if(ok)gameWin(q,miss,$("vcV"),[]);else{miss++;toastHint(`${cap1(pot[0][1])} and ${pot[1][1]} don't fizz. Try others!`);pot=[];$("vcI").textContent="";$("vcF").className="vc-foam";$("qBody").querySelectorAll(".vc-p").forEach(b=>b.disabled=false);if(miss>=3){q.done=true;gameLearn(q,"Baking soda + vinegar = FIZZ!",[])}}},1600)};
  $("qBody").querySelectorAll(".vc-p").forEach(b=>{const add=()=>{if(q.done||pot.length>=2||b.disabled)return;pot.push(shelf[+b.dataset.j]);b.disabled=true;sfx.tap();$("vcI").textContent=pot.map(x=>x[0]).join(" ");if(pot.length===2)setTimeout(go,500)};dragify(b,()=>[$("vcV")],add,add)});
  window.__gSolve=()=>{pot=VOLC6.slice(0,2);go()}}

/* ---------------- FEELINGS 1: feelings memory ---------------- */
function qEmoMatch(){const n=lvl()<=4?3:4;return {game:"emomatch",es:sh(EMO.slice()).slice(0,n),v:ri(0,9),voice:[G6("EMOMATCH")],gid:"g:emomatch",factT:"Our faces show how we feel - and we can guess how others feel too."}}
function emomatchQ(q){const cards=sh([...q.es.map(e=>["f",e]),...q.es.map(e=>["w",e])]);let open=[],got=0,miss=0,lock=false;
  gShow(`<div class="game">${gHead("🃏","Feelings memory","Find each face and its feeling word!")}<div class="em-mem ${cards.length>6?"c4":""}">${cards.map((c,j)=>`<button class="emc" data-j="${j}"><span class="emc-in"><span class="emc-b">❓</span><span class="emc-f">${c[0]==="f"?`<span class="em-f">${faceSVG(c[1],q.v+j)}</span>`:`<b>${cap1(c[1])}</b>`}</span></span></button>`).join("")}</div></div>`);gAsk(q);
  const B=[...$("qBody").querySelectorAll(".emc")];B.forEach(b=>b.onclick=()=>{if(lock||q.done||b.classList.contains("on"))return;const j=+b.dataset.j;b.classList.add("on");sfx.tap();open.push(j);
    if(open.length===2){lock=true;const [a,c]=open;if(cards[a][1]===cards[c][1]&&cards[a][0]!==cards[c][0]){got++;hush();sayseq(feelSay(EMO_I[cards[a][1]]),()=>{});B[a].classList.add("ok");B[c].classList.add("ok");open=[];lock=false;if(got===q.es.length)setTimeout(()=>gameWin(q,miss>3?1:0,$("qBody").querySelector(".em-mem"),[]),800)}
      else{miss++;setTimeout(()=>{B[a].classList.remove("on");B[c].classList.remove("on");open=[];lock=false},900)}}});
  window.__gSolve=()=>{B.forEach(b=>b.classList.add("on","ok"));gameWin(q,0,$("qBody").querySelector(".em-mem"),[])}}

/* ---------------- FEELINGS 2: make-a-face mirror ---------------- */
function qMirror(){const e=pickOne(EMO);return {game:"mirror",e,v:ri(0,9),voice:[G6("MIRROR"),...feelSay(EMO_I[e])],gid:"g:mirror",factT:{happy:"We smile when we feel happy.",sad:"It's okay to feel sad sometimes - a hug can help.",angry:"When angry, take a big breath and count to 5.",scared:"Talking to someone you love helps when you're scared.",surprised:"Surprised faces have big eyes and an open mouth!"}[e]}}
function mirrorQ(q){const st=pickOne(EMO.filter(x=>x!==q.e));let brow=EMO_I[st],mouth=EMO_I[pickOne(EMO.filter(x=>x!==q.e))],miss=0;const PARTS=EMO;  /* brow and mouth both cycle through the 5 feelings' shapes */
  gShow(`<div class="game">${gHead("🪞","Make a face",`Make a ${q.e} face!`)}<div class="mr"><div class="mr-face" id="mrF"></div>
    <div class="mr-ctl"><div><small>Eyebrows</small><button class="sc-t" data-p="b" data-d="-1">◀</button><button class="sc-t" data-p="b" data-d="1">▶</button></div><div><small>Mouth</small><button class="sc-t" data-p="m" data-d="-1">◀</button><button class="sc-t" data-p="m" data-d="1">▶</button></div></div></div>
    <button class="qcheck on" id="mrC">THAT'S IT! 🪞</button></div>`);gAsk(q);
  const draw=()=>{$("mrF").innerHTML=faceSVG(PARTS[brow],q.v,PARTS[mouth])};draw();
  $("qBody").querySelectorAll(".mr-ctl .sc-t").forEach(b=>b.onclick=()=>{if(q.done)return;const d=+b.dataset.d;if(b.dataset.p==="b")brow=(brow+d+5)%5;else mouth=(mouth+d+5)%5;sfx.tap();draw()});
  $("mrC").onclick=()=>{if(q.done)return;if(PARTS[mouth]===q.e&&(PARTS[brow]===q.e||(q.e==="scared"&&PARTS[brow]==="surprised")||(q.e==="surprised"&&PARTS[brow]==="scared")))gameWin(q,miss,$("mrF"),[]);else{miss++;bounce($("mrF"));toastHint(PARTS[mouth]!==q.e?"Look at the mouth 👄":"Look at the eyebrows 🤨");if(miss>=4){q.done=true;brow=mouth=EMO_I[q.e];draw();gameLearn(q,cap1(q.e),feelSay(EMO_I[q.e]))}}};
  window.__gSolve=()=>{brow=mouth=EMO_I[q.e];draw();$("mrC").click()}}

/* ---------------- FEELINGS 3: calm breathing ---------------- */
function qCalm(){return {game:"calm",need:3,voice:[G6("CALM")],gid:"g:calm",factT:"Slow, deep breaths help our body feel calm."}}
function calmQ(q){let n=0,hold=false,t0=0;
  gShow(`<div class="game lrn">${gHead("🌬️","Calm breathing","Hold to breathe in, let go to breathe out")}<div class="cm"><span class="cm-ring" id="cmR"></span><span class="cm-f" id="cmF">🌸</span><b id="cmT">Hold the button</b></div><div class="cm-dots" id="cmD">${"○".repeat(q.need)}</div>
    <button class="cm-btn" id="cmB">🫁 Breathe</button></div>`);gAsk(q);
  const R=$("cmR"),T=$("cmT"),B=$("cmB");const down=e=>{e.preventDefault();if(q.done)return;hold=true;t0=Date.now();R.className="cm-ring in";T.textContent="Breathe in… 2… 3…"};
  const up=()=>{if(!hold||q.done)return;hold=false;const ok=Date.now()-t0>1800;R.className="cm-ring out";T.textContent=ok?"…and breathe out 😌":"A little longer next time";if(ok){n++;$("cmD").textContent="●".repeat(n)+"○".repeat(q.need-n);g6tone(523,.6,"sine",.15);if(n>=q.need){q.done=true;setTimeout(()=>gameWin(q,0,$("cmF"),[]),1800)}}};
  B.addEventListener("pointerdown",down);["pointerup","pointerleave","pointercancel"].forEach(k=>B.addEventListener(k,up));B.style.touchAction="none";
  window.__gSolve=()=>{q.done=true;gameWin(q,0,$("cmF"),[])}}

/* ---------------- FEELINGS 4: kind or unkind ---------------- */
const KIND6=[["K1","🤝","Sharing your toys with a friend",1],["K2","😝","Laughing when someone falls",0],["K3","🎁","Making a card for grandma",1],["K4","🙉","Not listening when a friend talks",0],["K5","🧹","Helping to tidy up",1],["K6","🖍️","Grabbing a crayon without asking",0],["K7","🫂","Hugging a sad friend",1],["K8","🚫","Saying 'you can't play with us'",0]];
function qKind(){const c=sh(KIND6.slice()).slice(0,4);if(!c.some(x=>x[3]))c[0]=KIND6[0];if(c.every(x=>x[3]))c[3]=KIND6[1];return {game:"kind",c,voice:[G6("KIND")],gid:"g:kind",factT:"Kind actions make everyone feel good - including you!"}}
function kindQ(q){let at=0,miss=0;
  gShow(`<div class="game">${gHead("💚","Kind or unkind?","Is it kind?")}<div class="kd" id="kdS"></div><div class="kd-btns"><button class="kd-b no" data-v="0">💔<small>Unkind</small></button><button class="kd-b yes" data-v="1">💚<small>Kind</small></button></div><div class="cm-dots" id="kdD">${"○".repeat(q.c.length)}</div></div>`);
  const show=()=>{const c=q.c[at];$("kdS").innerHTML=`<div class="kd-card in"><span>${c[1]}</span><p>${c[2]}</p></div>`;hush();sayseq(at===0?[...q.voice,G6(c[0])]:[G6(c[0])],()=>{})};show();
  $("qBody").querySelectorAll(".kd-b").forEach(b=>b.onclick=()=>{if(q.done)return;const c=q.c[at],v=+b.dataset.v,card=$("kdS").firstChild;if(v===c[3]){sfx.tap();card.classList.add(v?"go-r":"go-l");at++;$("kdD").textContent="●".repeat(at)+"○".repeat(q.c.length-at);
      if(at===q.c.length){q.done=true;setTimeout(()=>{q.done=false;gameWin(q,miss,$("kdS"),[])},500)}else setTimeout(show,450)}else{miss++;bounce(card);toastHint(c[3]?"Hmm, that's a kind thing to do 💚":"Would that make someone feel sad? 💔")}});
  window.__gSolve=()=>{at=q.c.length;q.done=false;gameWin(q,0,$("kdS"),[])}}

/* ---------------- FEELINGS 5: cheer up a friend ---------------- */
const CHEER6=[["🫂","A hug",1],["🧸","Share a toy",1],["🤧","A tissue",1],["🎈","A balloon",1],["😜","Make fun of them",0],["🙈","Walk away",0]];
function qCheer(){return {game:"cheer",v:ri(0,9),voice:[G6("CHEER")],gid:"g:cheer",factT:"When we help a sad friend, they can feel happy again."}}
function cheerQ(q){let joy=0,miss=0;const it=sh(CHEER6.slice());
  gShow(`<div class="game">${gHead("🌈","Cheer up a friend","Give your friend what helps!")}<div class="ch"><div class="ch-f" id="chF">${faceSVG("sad",q.v)}</div><div class="ch-bar"><i id="chM"></i></div></div>
    <div class="ch-items">${it.map((x,j)=>`<button class="ch-i" data-j="${j}"><span>${x[0]}</span><small>${x[1]}</small></button>`).join("")}</div></div>`);gAsk(q);
  const F=$("chF");const give=b=>{if(q.done||b.disabled)return;const x=it[+b.dataset.j];b.disabled=true;
    if(x[2]){joy++;g6tone(500+joy*120,.3);$("chM").style.width=joy/3*100+"%";F.innerHTML=faceSVG(joy>=3?"happy":joy>=2?"surprised":"sad",q.v);F.classList.add("bob");setTimeout(()=>F.classList.remove("bob"),500);if(joy>=3){q.done=true;setTimeout(()=>{q.done=false;gameWin(q,miss,F,[])},600)}}
    else{miss++;sfx.oops();bounce(F);toastHint("That won't help 😟")}};
  $("qBody").querySelectorAll(".ch-i").forEach(b=>dragify(b,()=>[F],()=>give(b),()=>give(b)));
  window.__gSolve=()=>{joy=3;q.done=false;gameWin(q,0,F,[])}}

/* ---------------- MOVE 1: rhythm drums ---------------- */
function qRhythm(){const a=lvl();return {game:"rhythm",n:a<=4?5:7,need:a<=4?3:5,sp:a<=4?2.6:a<=6?2.2:1.8,voice:[G6("RHYTHM")],gid:"g:rhythm",factT:"Keeping a beat is great practice for timing!"}}
function rhythmQ(q){let hit=0,gone=0,miss=0;
  gShow(`<div class="game">${gHead("🥁","Rhythm drums","Tap the drum when the star reaches it!")}<div class="rh" id="rhL"><span class="rh-t" id="rhT">${drumSVG(0)}</span></div><div class="mg-cnt" id="rhC">0 / ${q.need}</div></div>`);gAsk(q);
  const L2=$("rhL"),T=$("rhT"),notes=[];
  const tap=()=>{if(q.done)return;drumHit(0);T.classList.add("hit");setTimeout(()=>T.classList.remove("hit"),150);const tr=T.getBoundingClientRect(),c=tr.left+tr.width/2;
    const n=notes.find(o=>!o.dataset.d&&Math.abs(o.getBoundingClientRect().left+o.offsetWidth/2-c)<tr.width*.6);
    if(n){n.dataset.d=1;n.classList.add("got");hit++;$("rhC").textContent=hit+" / "+q.need;if(hit>=q.need){q.done=true;setTimeout(()=>gameWin(q,miss>3?1:0,T,[]),400)}}else miss++};
  L2.addEventListener("pointerdown",e=>{e.preventDefault();tap()});
  let k=0;const spawn=()=>{if(!L||L.q!==q||q.done)return;if(k>=q.n+3&&hit<q.need){k=0}k++;const o=document.createElement("span");o.className="rh-n";o.textContent="⭐";o.style.animationDuration=q.sp+"s";L2.appendChild(o);notes.push(o);o.addEventListener("animationend",()=>{o.remove();notes.splice(notes.indexOf(o),1)});setTimeout(spawn,q.sp*1000*.55)};
  setTimeout(spawn,2200);window.__gSolve=()=>{q.done=true;gameWin(q,0,T,[])}}

/* ---------------- MOVE 2: balance beam ---------------- */
function qBeam6(){const a=lvl();return {game:"beam",dur:a<=4?9:a<=6?12:15,drift:a<=4?.6:a<=6?.9:1.2,who:pickOne(["🐧","🐱","🧒","🐻"]),voice:[G6("BALANCE")],gid:"g:beam",factT:"Balancing uses your whole body - great job!"}}
function beamQ(q){let tilt=0,v=0,prog=0,falls=0,run=true,last=performance.now();
  gShow(`<div class="game">${gHead("🤸","Balance beam","Keep it from falling! Tap the side that goes up")}<div class="bm" id="bmF"><div class="bm-beam"></div><span class="bm-w" id="bmW">${q.who}<i class="bm-pole"></i></span><div class="bm-prog"><i id="bmP"></i></div></div>
    <div class="bm-btns"><button class="kd-b" id="bmL">⬅️</button><button class="kd-b" id="bmR">➡️</button></div></div>`);gAsk(q);
  const W=$("bmW");$("bmL").onclick=()=>{v-=1.6;sfx.tap()};$("bmR").onclick=()=>{v+=1.6;sfx.tap()};
  const step=t=>{if(!run||!L||L.q!==q)return;const dt=Math.min(.05,(t-last)/1000);last=t;v+=(tilt*.9+(Math.random()-.5)*q.drift*6)*dt;v*=.97;tilt+=v*dt*20;
    if(Math.abs(tilt)>38){falls++;sfx.oops();tilt=0;v=0;W.classList.add("wob");setTimeout(()=>W.classList.remove("wob"),500);toastHint("Whoops! Keep going 🤸")}
    prog=Math.min(1,prog+dt/q.dur);W.style.left=(8+prog*80)+"%";W.style.transform=`translateX(-50%) rotate(${tilt}deg)`;$("bmP").style.width=prog*100+"%";
    if(prog>=1){run=false;gameWin(q,falls>2?1:0,W,[]);return}requestAnimationFrame(step)};setTimeout(()=>{last=performance.now();requestAnimationFrame(step)},2200);
  window.__gSolve=()=>{run=false;gameWin(q,0,W,[])}}

/* ---------------- MOVE 3: basket catch ---------------- */
function qBasket(){const a=lvl(),good=pickOne([["🍎","🍌","🍓","🍐"],["⭐","🌟"],["🥚"]]);return {game:"basket",good,bad:["🪨"],need:a<=3?4:a<=5?6:8,sp:a<=3?4:a<=5?3.2:2.6,rocks:a>3,voice:[G6("BASKET")],gid:"g:basket",factT:"Moving to catch things trains your eyes and hands to work together."}}
function basketQ(q){let got=0,x=50,miss=0;
  gShow(`<div class="game">${gHead("🧺","Catch them!",q.rocks?"Catch them - not the rocks!":"Catch them all!")}<div class="bs" id="bsF"><span class="bs-b" id="bsB">🧺</span><div class="mg-cnt bs-c" id="bsC">0 / ${q.need}</div></div><p class="gmhint">Slide your finger to move the basket</p></div>`);gAsk(q);
  const F=$("bsF"),B=$("bsB");const mv=e=>{const r=F.getBoundingClientRect();x=clampN((e.clientX-r.left)/r.width*100,8,92);B.style.left=x+"%"};F.addEventListener("pointermove",mv);F.addEventListener("pointerdown",mv);F.style.touchAction="none";
  const drop=()=>{if(!L||L.q!==q||q.done)return;const bad=q.rocks&&Math.random()<.25,o=document.createElement("span");o.className="bs-o";o.textContent=bad?"🪨":pickOne(q.good);const ox=ri(10,90);o.style.left=ox+"%";o.style.animationDuration=q.sp+"s";F.appendChild(o);
    o.addEventListener("animationend",()=>{if(Math.abs(ox-x)<13){if(bad){miss++;sfx.oops();F.classList.add("bump");setTimeout(()=>F.classList.remove("bump"),400)}else{got++;g6tone(660+got*40,.15);$("bsC").textContent=got+" / "+q.need;B.classList.add("hit");setTimeout(()=>B.classList.remove("hit"),200);if(got>=q.need){q.done=true;gameWin(q,miss>2?1:0,B,[])}}}o.remove()});setTimeout(drop,q.sp*1000*.5)};
  setTimeout(drop,2000);window.__gSolve=()=>{q.done=true;gameWin(q,0,B,[])}}

/* ---------------- MOVE 4: Simon says (do it for real) ---------------- */
const SIMON6=[["C1","Touch your nose","👃"],["C2","Jump","🦘"],["C3","Clap","👏"],["C4","Hands up","🙌"],["C5","Wiggle","🐛"],["C6","Sit down","🪑"]];
function qSimon6(){const c=sh(SIMON6.slice()).slice(0,lvl()<=4?3:4).map(x=>[...x,Math.random()<.7]);if(c.every(x=>x[3]))c[ri(1,c.length-1)][3]=false;if(!c[0][3])c[0][3]=true;return {game:"simon2",c,voice:[G6("SIMON")],gid:"g:simon2",factT:"Listening carefully before you move is a super skill!"}}
function simon2Q(q){let at=0,miss=0;
  gShow(`<div class="game">${gHead("🙋","Simon says","Only move when Simon says!")}<div class="sm2" id="smS"></div><div class="kd-btns"><button class="kd-b" data-v="1">✅<small>I did it!</small></button><button class="kd-b" data-v="0">🧊<small>I stayed still</small></button></div><div class="cm-dots" id="smD">${"○".repeat(q.c.length)}</div></div>`);
  const show=()=>{const c=q.c[at];$("smS").innerHTML=`<div class="kd-card in"><span>${c[2]}</span><p>${c[3]?"Simon says: ":""}${c[1]}!</p></div>`;hush();sayseq([...(at===0?q.voice:[]),...(c[3]?[G6("SAYS")]:[]),G6(c[0])],()=>{})};show();
  $("qBody").querySelectorAll(".kd-b").forEach(b=>b.onclick=()=>{if(q.done)return;const c=q.c[at],ok=(+b.dataset.v===1)===c[3];if(ok){sfx.tap();at++;$("smD").textContent="●".repeat(at)+"○".repeat(q.c.length-at);if(at===q.c.length){q.done=true;setTimeout(()=>{q.done=false;gameWin(q,miss,$("smS"),[])},400)}else setTimeout(show,500)}
    else{miss++;bounce($("smS"));toastHint(c[3]?"Simon said it - so do it! ✅":"Simon didn't say it - stay still! 🧊")}});
  window.__gSolve=()=>{q.done=false;gameWin(q,0,$("smS"),[])}}

/* ---------------- MOVE 5: hopscotch ---------------- */
function qHop(){const a=lvl(),st=a<=4?1:a<=6?pickOne([1,2]):pickOne([2,5,10]),n=a<=3?3:a<=4?5:6,seq=Array.from({length:n},(_,i)=>(st===1?i+1:st*(i+1)));const ex=sh([...Array(30).keys()].map(i=>i+1).filter(x=>!seq.includes(x)&&x<=seq[n-1]+st)).slice(0,a<=4?1:3);
  return {game:"hop",seq,ex,st,voice:[G6("HOP")],gid:"g:hop",factT:st===1?"You hopped 1, 2, 3 - in order!":`You counted by ${st}s!`}}
function hopQ(q){let at=0,miss=0;const all=sh([...q.seq,...q.ex]);const pos=all.map((_,i)=>[8+(i%3)*30+ri(0,10),12+Math.floor(i/3)*28+ri(0,6)]);
  gShow(`<div class="game">${gHead("🐸","Hopscotch",q.st===1?"Hop on the stones in order!":`Hop by ${q.st}s!`)}<div class="hp" id="hpF">${all.map((n,i)=>`<button class="hp-s" data-n="${n}" style="left:${pos[i][0]}%;top:${pos[i][1]}%">${n}</button>`).join("")}<span class="hp-f" id="hpG" style="left:46%;top:88%">🐸</span></div></div>`);gAsk(q);
  const G2=$("hpG");$("qBody").querySelectorAll(".hp-s").forEach(b=>b.onclick=()=>{if(q.done||b.classList.contains("ok"))return;const n=+b.dataset.n;if(n===q.seq[at]){b.classList.add("ok");G2.style.left=b.style.left;G2.style.top=b.style.top;G2.classList.remove("jump");void G2.offsetWidth;G2.classList.add("jump");g6tone(400+at*80,.15);at++;if(at===q.seq.length)setTimeout(()=>gameWin(q,miss,G2,[]),600)}
    else{miss++;bounce(b);if(miss>=4){q.done=true;gameLearn(q,q.seq.join(", "),[])}}});
  window.__gSolve=()=>q.seq.slice(at).forEach(n=>$("qBody").querySelector(`.hp-s[data-n="${n}"]`).click())}

/* ---------------- MOVE 6: dance copy ---------------- */
const DMOV6=[["L","⬅️","lean"],["R","➡️","lean"],["U","⬆️","jump"],["D","⬇️","squat"]];
function qDance(){const a=lvl(),n=a<=4?2:a<=6?3:4;return {game:"dance",seq:Array.from({length:n},()=>pickOne(DMOV6)),who:pickOne(["🐻","🐧","🐰","🤖"]),voice:[G6("DANCE")],gid:"g:dance",factT:"Dancing is a fun way to remember moves and keep your body strong!"}}
function danceQ(q){let at=0,miss=0,ready=false;
  gShow(`<div class="game">${gHead("💃","Dance copy","Watch the dance, then copy it!")}<div class="dc" id="dcF"><span class="dc-w" id="dcW">${q.who}</span><span class="dc-sp">✨</span></div>
    <div class="dc-pad">${DMOV6.map(m=>`<button class="dc-b" data-k="${m[0]}" disabled>${m[1]}</button>`).join("")}</div><div class="mv-real" id="dcR" hidden><p>Now dance it for real! 🎶</p><button class="qcheck on" id="dcY">I danced! ⭐</button></div></div>`);
  const W=$("dcW"),P=[...$("qBody").querySelectorAll(".dc-b")];const pose=k=>{W.className="dc-w dc-"+k;g6tone({L:392,R:440,U:523,D:330}[k],.25,"triangle",.2);setTimeout(()=>W.className="dc-w",420)};
  const show=()=>{ready=false;at=0;P.forEach(b=>b.disabled=true);let k=0;const st=()=>{if(!L||L.q!==q)return;if(k>=q.seq.length){P.forEach(b=>b.disabled=false);ready=true;return}const m=q.seq[k++];pose(m[0]);P.find(b=>b.dataset.k===m[0]).classList.add("flash");setTimeout(()=>P.forEach(b=>b.classList.remove("flash")),400);setTimeout(st,800)};setTimeout(st,500)};
  sayseq(q.voice,()=>show());
  P.forEach(b=>b.onclick=()=>{if(!ready||q.done)return;pose(b.dataset.k);if(b.dataset.k===q.seq[at][0]){at++;if(at===q.seq.length){ready=false;$("dcR").hidden=false}}else{miss++;sfx.oops();ready=false;setTimeout(show,700)}});
  $("dcY").onclick=()=>{if(!q.done)gameWin(q,miss>1?1:0,W,[])};window.__gSolve=()=>{gameWin(q,0,W,[])}}

/* ---------------- MOVE 7: wall climb (left, right, left, right) ---------------- */
function qClimb(){const a=lvl();return {game:"climb",need:a<=4?6:a<=6?8:10,who:pickOne(["🐒","🧗","🦎","🐱"]),voice:[G6("CLIMB")],gid:"g:climb",factT:"Climbers move one hand, then the other - left, right, left, right!"}}
function climbQ(q){let h=0,next="L",miss=0;
  gShow(`<div class="game">${gHead("🧗","Wall climb","Left hand, right hand - take turns!")}<div class="cl" id="clF"><span class="cl-top">🍌</span><span class="cl-w" id="clW">${q.who}</span></div>
    <div class="bm-btns"><button class="kd-b" data-k="L">✋<small>Left</small></button><button class="kd-b" data-k="R">🤚<small>Right</small></button></div></div>`);gAsk(q);
  const W=$("clW");const set=()=>{W.style.bottom=(4+h/q.need*78)+"%"};set();
  $("qBody").querySelectorAll(".bm-btns .kd-b").forEach(b=>b.onclick=()=>{if(q.done)return;if(b.dataset.k===next){h++;next=next==="L"?"R":"L";g6tone(300+h*40,.1);W.classList.toggle("flip");set();if(h>=q.need){q.done=true;setTimeout(()=>{q.done=false;gameWin(q,miss>2?1:0,W,[])},500)}}
    else{miss++;h=Math.max(0,h-1);set();bounce(W);toastHint(`Now the ${next==="L"?"left ✋":"right 🤚"} hand!`)}});
  window.__gSolve=()=>{h=q.need;set();gameWin(q,0,W,[])}}

/* ---------------- wiring ---------------- */
const G6F={mix:qMix,ramp:qRamp,mag2:qMag2,shadow:qShadow,ice:qIce,bottle:qBottle,pump:qPump,volc:qVolc,emomatch:qEmoMatch,mirror:qMirror,calm:qCalm,kind:qKind,cheer:qCheer,rhythm:qRhythm,beam:qBeam6,basket:qBasket,simon2:qSimon6,hop:qHop,dance:qDance,climb:qClimb};
Object.assign(GAMES,{mix:mixQ,ramp:rampQ,mag2:mag2Q,shadow:shadowQ,ice:iceQ,bottle:bottleQ,pump:pumpQ,volc:volcQ,emomatch:emomatchQ,mirror:mirrorQ,calm:calmQ,kind:kindQ,cheer:cheerQ,rhythm:rhythmQ,beam:beamQ,basket:basketQ,simon2:simon2Q,hop:hopQ,dance:danceQ,climb:climbQ});
const _bf6=buildFormat;buildFormat=function(kind,cat){const F=kind.startsWith("f_")&&G6F[kind.slice(2)];return F?F(cat):_bf6(kind,cat)};
const _ff6=formatsFor0;
formatsFor0=function(cat){const b=_ff6(cat);if(!G6_READY)return b;const a=S.age,add={world:["f_mix","f_mag2","f_ice","f_volc","f_shadow","f_kind","f_cheer","f_basket"],sky:["f_shadow","f_ice","f_ramp","f_dance"],farm:["f_basket","f_hop","f_pump","f_climb"],animals:["f_climb","f_beam","f_hop","f_basket","f_dance"],
  people:["f_emomatch","f_mirror","f_calm","f_kind","f_cheer","f_simon2","f_dance"],shapes:["f_mix","f_bottle","f_emomatch"],count:["f_hop","f_pump","f_ramp","f_rhythm"],add:["f_hop","f_ramp"],memory:["f_emomatch","f_rhythm","f_simon2","f_dance","f_bottle"],robot:["f_ramp","f_mag2","f_volc","f_beam","f_climb"],clock:["f_shadow","f_ice","f_rhythm"],flags:["f_volc","f_beam"],read:["f_kind"],letters:["f_simon2"]}[cat]||[];
  return [...b,...add.filter(k=>a>3||["f_mix","f_pump","f_basket","f_calm","f_cheer","f_rhythm","f_emomatch","f_simon2","f_hop","f_dance"].includes(k))]};
const _pr6=planRound;
planRound=function(cat,count){const p=_pr6(cat,count);if(!G6_READY||S.age>3||!p)return p;const toy=sh(["f_calm","f_pump","f_basket","f_mix","f_cheer","f_rhythm"]);let j=0;return p.map((k,i)=>(i%3===2&&j<2&&!/tstory|ltog/.test(k))?toy[j++]:k)};
Object.assign(GMAP,{
 "g:mix":G("Colour lab",["cre","experiment"],[["cre","art"]],"Mix two paints in a bowl to make a new colour.","Explore"),
 "g:ramp":G("Ramp race",["cre","experiment"],[["cog","logic"]],"Change the ramp height so the car stops on the flag (cause and effect).","Explore"),
 "g:mag2":G("Magnet fishing",["cre","science"],[["phys","fine"]],"Lower a magnet to fish out only the things it can pull.","Explore"),
 "g:shadow":G("Shadow lab",["cre","science"],[["cog","logic"]],"Move a torch and watch the shadow move the other way.","Explore"),
 "g:ice":G("Ice race",["cre","science"],[["cog","curiosity"]],"Predict where ice melts first, then watch it happen.","Explore"),
 "g:bottle":G("Singing bottles",["cre","science"],[["cre","art"],["lang","listen"]],"Tap bottles with different water levels and order them by sound.","Explore"),
 "g:pump":G("Balloon pump",["cre","experiment"],[["cog","math"]],"Pump just enough air to fill the balloon to the line.","Play"),
 "g:volc":G("Fizzy volcano",["cre","experiment"],[["cre","science"]],"Try pairs of ingredients to find the two that fizz.","Explore"),
 "g:emomatch":G("Feelings memory",["soc","emotions"],[["cog","memory"]],"Flip cards to match each face with its feeling word.","Play"),
 "g:mirror":G("Make a face",["soc","emotions"],[["cre","art"]],"Change eyebrows and mouth to show a feeling.","Create"),
 "g:calm":G("Calm breathing",["soc","confidence"],[["phys","body"]],"Hold to breathe in, let go to breathe out - a calming routine.","Reflect"),
 "g:kind":G("Kind or unkind?",["soc","empathy"],[["life","decide"]],"Decide if everyday actions are kind or unkind.","Reflect"),
 "g:cheer":G("Cheer up a friend",["soc","empathy"],[["soc","sharing"]],"Give a sad friend the things that help, and watch them smile.","Play"),
 "g:rhythm":G("Rhythm drums",["phys","coord"],[["cre","art"]],"Tap the drum right when the star reaches it (timing).","Play"),
 "g:beam":G("Balance beam",["phys","coord"],[["cog","memory"]],"Keep a walker balanced on a beam by tapping left and right.","Play"),
 "g:basket":G("Catch them!",["phys","coord"],[["phys","fine"]],"Slide a basket to catch falling things and avoid rocks.","Play"),
 "g:simon2":G("Simon says",["phys","gross"],[["lang","listen"],["cog","memory"]],"Move for real - but only when Simon says.","Play"),
 "g:hop":G("Hopscotch",["cog","math"],[["phys","coord"]],"Hop the frog across stones in number order or by 2s, 5s, 10s.","Play"),
 "g:dance":G("Dance copy",["phys","gross"],[["cog","memory"],["cre","art"]],"Watch a short dance, copy it, then dance it for real.","Play"),
 "g:climb":G("Wall climb",["phys","coord"],[["cog","logic"]],"Climb by tapping left and right hands in turn.","Play")});
