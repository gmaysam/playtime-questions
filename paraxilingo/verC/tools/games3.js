
/* =====================================================================================================
   Nov 10b: SEVEN NEW GAME TYPES - jigsaw puzzle, maze, parade (moving characters), little engineering lab
   (lamp circuit, magnet, gears), word search, tap-what-you-hear, block fit (Tetris-like)
   ===================================================================================================== */
const G3_READY=__G3VOICE__;
const G3=n=>"w/PX_G3_"+n;
const wById=i=>WORDS.find(x=>x.i===i);
const WN=w=>WORDS.find(x=>x.w===w);
/* ---------- 1. jigsaw puzzle ---------- */
const PZ_SET={animals:["bird","cow","duck","chicken","bee","frog","fox","cat","dog","pig","snake","bat"],farm:["cow","duck","chicken","pig","dog","cat","bee"],
  world:["tree","rainbow","cake","honey","salad","balloon"],letters:null,read:null,count:null,add:null,shapes:null};
function qPuzzle(cat){const a=lvl(),[c,r]=a<=4?[2,2]:a<=6?[3,2]:[3,3],ghost=a<=5;let pic,name;
  if(cat==="sky"){const k=pickOne([1,2,3,4,5,6,7,8]);pic=`<img src="img/w/pl_${k}.png" alt="">`;name=PLANET_N[k]}
  else if(cat==="shapes"){const k=pickOne([...SHAPES.keys()].slice(0,12));pic=`<img src="img/w/shape_${k}.png" alt="">`;name=SHAPES[k].toLowerCase()}
  else{const pool=(PZ_SET[cat]||[]).map(WN).filter(Boolean),x=pickOne(pool.length?pool:WORDS.filter(w=>w.w.length<=6));pic=`<img src="img/w/wd_${x.i}.png" alt="">`;name=x.w}
  const f=FACT_EN[name]||FACT_EN[name.replace(/s$/,"")]||`You made a picture of a ${name}!`;
  return {game:"puzzle",c,r,ghost,pic,name,voice:[G3("PUZZLE")],factT:f}}
function puzzleQ(q){const n=q.c*q.r,B=Math.min(264,Math.round(innerHeight*.34),Math.round(($("qBody").clientWidth||340)*.78)),W=B,H=Math.round(B*q.r/q.c*(q.c===q.r?1:1.15)),pw=W/q.c,ph=H/q.r,k=.78;
  const inner=(i,s)=>{const x=i%q.c,y=Math.floor(i/q.c);return `<div class="pz-in" style="width:${W*s}px;height:${H*s}px;left:${-x*pw*s}px;top:${-y*ph*s}px">${q.pic}</div>`};
  const order=sh([...Array(n).keys()]);
  gShow(`<div class="game">${gHead("🧩","Puzzle","Put the pieces together!")}
    <div class="pz-board" style="width:${W}px;height:${H}px">${q.ghost?`<div class="pz-ghost">${q.pic}</div>`:""}
      ${Array.from({length:n},(_,i)=>`<div class="pz-sl" data-i="${i}" style="left:${(i%q.c)*pw}px;top:${Math.floor(i/q.c)*ph}px;width:${pw}px;height:${ph}px"></div>`).join("")}</div>
    <div class="pz-tray">${order.map(i=>`<div class="pz-p" data-i="${i}" style="width:${pw*k}px;height:${ph*k}px">${inner(i,k)}</div>`).join("")}</div></div>`);
  gAsk(q);let miss=0,done=0,sel=null;const SL=[...$("qBody").querySelectorAll(".pz-sl")];
  const put=(el,z)=>{if(q.done||el.dataset.done)return;const i=+el.dataset.i;
    if(+z.dataset.i===i){el.dataset.done=1;el.classList.add("gone");z.innerHTML=inner(i,1);z.classList.add("ok");sfx.tap();done++;sel=null;
      if(done===n){$("qBody").querySelector(".pz-board").classList.add("full");gameWin(q,miss>2?1:0,$("qBody").querySelector(".pz-board"),sayIf(q.name))}}
    else{miss++;sfx.oops();bounce(el);z.classList.add("no");setTimeout(()=>z.classList.remove("no"),500)}};
  $("qBody").querySelectorAll(".pz-p").forEach(el=>dragify(el,()=>SL.filter(z=>!z.classList.contains("ok")),z=>put(el,z),()=>{if(el.dataset.done)return;sfx.tap();$("qBody").querySelectorAll(".pz-p").forEach(x=>x.classList.toggle("sel",x===el));sel=el}));
  SL.forEach(z=>z.onclick=()=>{if(sel&&!z.classList.contains("ok"))put(sel,z)});
  window.__gSolve=()=>{for(let i=0;i<n;i++)put($("qBody").querySelector(`.pz-p[data-i="${i}"]`),SL[i])}}

/* ---------- 2. maze ---------- */
const MAZES={animals:[["🐝","🌸","Bees visit flowers to collect nectar and make honey."],["🐿️","🌰","Squirrels hide nuts in the ground to eat in winter."],["🐶","🦴","Dogs can smell things from very far away."],["🐛","🍃","Caterpillars eat lots of leaves before they become butterflies."]],
  farm:[["🐄","🌾","A cow eats grass for many hours every day."],["🐝","🌸","Bees visit flowers to collect nectar and make honey."],["🐶","🦴","Dogs can smell things from very far away."]],
  sky:[["🚀","🌍","Astronauts come back home to Earth after their trip to space."]],world:[["🐢","🌊","Sea turtles swim in the ocean but lay their eggs on the beach."],["🐿️","🌰","Squirrels hide nuts in the ground to eat in winter."],["🐛","🍃","Caterpillars eat lots of leaves before they become butterflies."]],
  robot:[["🤖","🔋","Robots need energy from a battery to move."]],count:[["🐸","🪷","Frogs can jump far with their strong back legs."]],shapes:[["🤖","🔋","Robots need energy from a battery to move."]]};
function qMaze(cat){const a=lvl(),n=a<=4?4:a<=6?5:a<=8?6:7,[s,g,f]=pickOne(MAZES[cat]||MAZES.animals);
  /* a perfect maze: random depth-first walk, so there is exactly one way through */
  const W=Array.from({length:n*n},()=>({r:1,b:1})),seen=new Set([0]),st=[0];
  while(st.length){const c=st[st.length-1],x=c%n,y=Math.floor(c/n),nb=[[x+1,y],[x-1,y],[x,y+1],[x,y-1]].filter(([u,v])=>u>=0&&v>=0&&u<n&&v<n&&!seen.has(v*n+u));
    if(!nb.length){st.pop();continue}const [u,v]=pickOne(nb),d=v*n+u;if(u>x)W[c].r=0;else if(u<x)W[d].r=0;else if(v>y)W[c].b=0;else W[d].b=0;seen.add(d);st.push(d)}
  return {game:"maze",n,W,s,g,voice:[G3("MAZE")],factT:f}}
function mazeOpen(q,c,d){const n=q.n,x=c%n,y=Math.floor(c/n),u=d%n,v=Math.floor(d/n);if(Math.abs(x-u)+Math.abs(y-v)!==1)return false;
  if(u>x)return !q.W[c].r;if(u<x)return !q.W[d].r;if(v>y)return !q.W[c].b;return !q.W[d].b}
function mazeQ(q){const n=q.n,goal=n*n-1;let pos=0,bumps=0;const trail=new Set([0]);
  gShow(`<div class="game">${gHead("🌀","Maze","Find the way!")}<div class="mz mzt-${q.g==="🌊"||q.g==="🐟"?"sea":q.g==="🌍"||q.g==="🪐"?"space":"grass"}" id="mzB" style="grid-template-columns:repeat(${n},1fr);--n:${n}">${q.W.map((w,i)=>`<div class="mzc${w.r?" r":""}${w.b?" b":""}${i%n===0?" l":""}${i<n?" t":""}" data-i="${i}"></div>`).join("")}
    <span class="mz-g" id="mzG">${q.g}</span><span class="mz-s" id="mzS">${q.s}</span></div><p class="gmhint">Slide your finger along the path</p></div>`);
  gAsk(q);const B=$("mzB"),cells=[...B.querySelectorAll(".mzc")];
  const place=(el,i)=>{const c=cells[i];el.style.left=c.offsetLeft+"px";el.style.top=c.offsetTop+"px";el.style.width=c.offsetWidth+"px";el.style.height=c.offsetHeight+"px"};
  const draw=()=>{place($("mzS"),pos);place($("mzG"),goal);cells.forEach((c,i)=>c.classList.toggle("tr",trail.has(i)))};requestAnimationFrame(draw);setTimeout(draw,500);
  const step=d=>{if(q.done)return;if(d===pos)return;if(mazeOpen(q,pos,d)){pos=d;trail.add(d);sfx.tap();draw();if(pos===goal){gameWin(q,bumps>4?1:0,$("mzG"),[])}}};
  let on=false;const cellAt=(x,y)=>{const e=document.elementFromPoint(x,y);return e&&e.classList.contains("mzc")?+e.dataset.i:null};
  B.style.touchAction="none";
  B.addEventListener("pointerdown",e=>{on=true;try{B.setPointerCapture(e.pointerId)}catch(_){}const c=cellAt(e.clientX,e.clientY);if(c!==null&&c!==pos){if(mazeOpen(q,pos,c))step(c);else{bumps++;bounce($("mzS"))}}});
  B.addEventListener("pointermove",e=>{if(!on)return;const c=cellAt(e.clientX,e.clientY);if(c===null||c===pos)return;if(mazeOpen(q,pos,c))step(c)});
  const off=()=>{on=false};B.addEventListener("pointerup",off);B.addEventListener("pointercancel",off);
  window.__gSolve=()=>{const prev={0:-1},fr=[0];while(fr.length){const c=fr.shift();if(c===goal)break;for(const d of [c+1,c-1,c+n,c-n])if(d>=0&&d<n*n&&!(d in prev)&&mazeOpen(q,c,d)){prev[d]=c;fr.push(d)}}
    const path=[];let c=goal;while(c!==0){path.unshift(c);c=prev[c]}path.forEach(step)}}

/* ---------- 3. parade: characters walk past, count one kind ---------- */
const PAR={animals:[["🐰","rabbit"],["🦆","duck"],["🐢","turtle"],["🐘","elephant"],["🐕","dog"],["🐈","cat"]],farm:[["🐄","cow"],["🐖","pig"],["🐑","sheep"],["🐓","rooster"],["🐐","goat"]],
  world:[["🚗","car"],["🚌","bus"],["🚲","bike"],["🚒","fire truck"],["🚜","tractor"]],count:[["🐰","rabbit"],["🦆","duck"],["🐢","turtle"],["🐕","dog"]],add:[["🚗","car"],["🚌","bus"],["🚲","bike"],["🚜","tractor"]],sky:[["🚀","rocket"],["✈️","airplane"],["🛸","flying saucer"],["🎈","balloon"]]};
function qParade(cat){const a=lvl(),set=PAR[cat]||PAR.animals,t=pickOne(set),others=set.filter(x=>x!==t),N=a<=4?6:a<=6?8:10,k=ri(a<=4?2:3,a<=4?4:a<=6?5:7);
  const line=sh([...Array(k).fill(t),...Array.from({length:N-k},()=>pickOne(others))]);
  const o=sh([k,...sh([k-1,k+1,k+2,k-2].filter(x=>x>0&&x!==k)).slice(0,2)]);
  return {game:"parade",t,line,k,o,speed:a<=4?1.25:a<=6?1:.8,voice:[G3("PARADE")],factT:numFact(k)}}
function paradeQ(q){let miss=0,ready=false;
  gShow(`<div class="game">${gHead("👀","Count them",`How many <span class="pr-t">${q.t[0]}</span> walk by?`)}<div class="pr-road" id="prR"><div class="pr-ground"></div></div>
    <div class="pr-opts" id="prO">${q.o.map(n=>`<button class="pr-o" data-n="${n}" disabled>${n}</button>`).join("")}</div><button class="pr-again" id="prA" hidden>👀 Watch again</button></div>`);
  const R=$("prR"),gap=950*q.speed,dur=4200*q.speed;
  const run=()=>{R.querySelectorAll(".pr-w").forEach(x=>x.remove());$("prA").hidden=true;q.line.forEach((x,i)=>setTimeout(()=>{if(L.q!==q)return;const w=document.createElement("span");w.className="pr-w";w.textContent=x[0];w.style.animationDuration=dur+"ms";R.appendChild(w);setTimeout(()=>w.remove(),dur+50)},i*gap));
    setTimeout(()=>{if(L.q!==q||q.done)return;ready=true;$("prO").querySelectorAll("button").forEach(b=>b.disabled=false);$("prA").hidden=false;sayseq([G3("HOWMANY")],()=>{})},(q.line.length-1)*gap+dur)};
  setTimeout(()=>{if(L&&L.q===q)sayseq(q.voice,()=>run())},400);
  $("prA").onclick=()=>{sfx.tap();$("prO").querySelectorAll("button").forEach(b=>b.disabled=true);run()};
  $("prO").querySelectorAll("button").forEach(b=>b.onclick=()=>{if(q.done||!ready)return;const n=+b.dataset.n;
    if(n===q.k){b.classList.add("ok");gameWin(q,miss,b,both(n))}else{miss++;sfx.oops();bounce(b);b.disabled=true;if(miss>=2){q.done=true;gameLearn(q,`${q.k} ${q.t[0]}`,both(q.k))}}});
  window.__gSolve=()=>{ready=true;$("prO").querySelector(`[data-n="${q.k}"]`).disabled=false;$("prO").querySelector(`[data-n="${q.k}"]`).click()}}

/* ---------- 4. little engineering lab: lamp circuit, magnet, gears ---------- */
const CONDUCT=[["🔑","key"],["🥄","spoon"],["📎","paper clip"],["🪙","coin"],["🔩","bolt"]],INSUL=[["🖍️","crayon"],["🧸","teddy bear"],["🧦","sock"],["🍃","leaf"],["🎈","balloon"],["🧽","sponge"]];
const MAGNETIC=[["📎","paper clip"],["🔩","bolt"],["🧷","safety pin"],["🔧","wrench"],["✂️","scissors"],["🪛","screwdriver"]],NONMAG=[["🧸","teddy bear"],["🍎","apple"],["🖍️","crayon"],["🧦","sock"],["🎈","balloon"],["🪵","wood"],["🥛","glass of milk"]];
const LAB_F={circuit:"Metal lets electricity flow, so the lamp turns on.",magnet:"Magnets pull things made of iron and steel.",g2:"Gears that touch turn opposite ways.",g3:"With three gears in a row, the first and the last turn the same way."};
/* tap-all experiments: [target emoji, caption, yes items, no items] */
const LAB_TAP={float:["🛁","Which ones float on water?",[["🪵","wood"],["🍃","leaf"],["🎈","balloon"],["🧽","sponge"],["🏐","ball"],["🍎","apple"]],[["🪨","rock"],["🔑","key"],["🪙","coin"],["🔩","bolt"],["🥄","spoon"]]],
  grow:["🌱","What does a seed need to grow?",[["💧","water"],["☀️","sunlight"],["🟫","soil"],["🌬️","air"]],[["🍬","candy"],["🧦","sock"],["📱","phone"],["🧸","teddy bear"],["🎈","balloon"]]],
  melt:["☀️","What melts in the hot sun?",[["🧊","ice"],["🍦","ice cream"],["⛄","snowman"],["🍫","chocolate"]],[["🪨","rock"],["🔑","key"],["🧱","brick"],["🪵","wood"],["🥄","spoon"]]],
  light:["👀","Which ones make their own light?",[["☀️","Sun"],["⭐","star"],["💡","lamp"],["🔦","flashlight"],["🔥","fire"]],[["🌙","Moon"],["🪐","planet"],["🌍","Earth"],["🪞","mirror"]]],
  healthy:["💪","What helps keep us healthy?",[["🧼","soap"],["🥦","broccoli"],["💧","water"],["🛌","sleep"],["🍎","apple"]],[["🍭","candy"],["🥤","soda"],["📺","TV all day"]]]};
Object.assign(LAB_F,{float:"Wood, leaves and balloons are light, so they float. Rocks and keys sink.",grow:"A seed needs water, soil, air and sunlight to grow.",melt:"Heat from the sun melts ice, snow and chocolate.",
  light:"The Sun and stars make their own light. The Moon shines because sunlight bounces off it.",healthy:"Washing hands, good food, water and sleep keep our bodies healthy.",seesaw:"The heavier side of a seesaw goes down.",mix:"Mixing two colours makes a new colour!"});
const LAB_BY={count:["seesaw"],add:["seesaw"],clock:["gears","light"],animals:["float","healthy"],farm:["grow","float"],world:["circuit","magnet","float","melt","grow"],
  sky:["light","melt"],shapes:["mix","gears","circuit","seesaw"],people:["healthy","circuit"],flags:["melt","float"],letters:["float","magnet"],read:["float","magnet","grow"],robot:["circuit","magnet","gears"],memory:["magnet","light","circuit"]};
const MIXES=[["red","yellow","orange"],["blue","yellow","green"],["red","blue","purple"],["red","white","pink"]];
const PCOL=n=>(PAINT_COLORS.find(x=>x[0]===n)||[n,"#ccc"])[1];
function qLab(cat){const a=lvl(),opts=(LAB_BY[cat]||["circuit","magnet","gears"]).filter(x=>x!=="gears"||a>=6),pick=pickOne(opts.length?opts:["circuit"]),wordOnly=(cat==="read"||cat==="letters")&&a>=6;
  if(LAB_TAP[pick]){const [tg,capT,yes,no]=LAB_TAP[pick],y=sh(yes).slice(0,a<=4?2:3),items=sh([...y.map(x=>[...x,1]),...sh(no).slice(0,a<=4?2:3).map(x=>[...x,0])]);
    return {game:"lab",sub:pick,tg,capT,items,wordOnly,voice:[G3(pick.toUpperCase())],factT:LAB_F[pick]}}
  if(pick==="seesaw"){const l=ri(1,a<=4?4:8);let r=ri(1,a<=4?4:8);if(r===l)r=l+(l<3?2:-1);return {game:"lab",sub:"seesaw",l,r,voice:[G3("SEESAW")],factT:LAB_F.seesaw}}
  if(pick==="mix"){const m=pickOne(MIXES),o=sh([m[2],...sh(["orange","green","purple","pink","brown"].filter(x=>x!==m[2])).slice(0,2)]);return {game:"lab",sub:"mix",m,o,voice:[G3("MIX")],factT:LAB_F.mix}}
  if(pick==="circuit"){const ok=pickOne(CONDUCT),items=sh([ok,...sh(INSUL).slice(0,a<=4?2:3)]);return {game:"lab",sub:"circuit",ok,items,voice:[G3("CIRCUIT")],factT:LAB_F.circuit}}
  if(pick==="magnet"){const y=sh(MAGNETIC).slice(0,a<=4?2:3),items=sh([...y.map(x=>[...x,1]),...sh(NONMAG).slice(0,a<=4?2:3).map(x=>[...x,0])]);return {game:"lab",sub:"magnet",items,voice:[G3("MAGNET")],factT:LAB_F.magnet}}
  const three=a>=8&&Math.random()<.6,cw=Math.random()<.5;return {game:"lab",sub:"gears",three,cw,voice:[G3("GEARS")],factT:three?LAB_F.g3:LAB_F.g2}}
const gearSVG=(r,t,cls)=>{let d="";for(let i=0;i<t;i++){const a=i/t*Math.PI*2,a2=(i+.5)/t*Math.PI*2;d+=`<rect x="-6" y="${-r-9}" width="12" height="14" rx="3" transform="rotate(${a*180/Math.PI})"/>`}
  return `<g class="${cls}">${d}<circle r="${r}"/><circle r="${r*.32}" class="hub"/></g>`};
function labQ(q){let miss=0;
  if(q.sub==="circuit"){
    gShow(`<div class="game">${gHead("💡","Lab","Which one lights the lamp?")}<div class="lab-c"><svg viewBox="0 0 300 170" class="lab-svg" id="labS">
      <path d="M40 130 V40 H68 M112 40 H168 M212 40 H260 V130 H192 M108 130 H40" class="wire"/>
      <g transform="translate(90,40)" id="lamp"><circle r="22" class="bulb"/><path d="M-8 4 l4 -8 l4 8 l4 -8 l4 8" class="fil"/></g>
      <g transform="translate(150,130)"><rect x="-40" y="-14" width="80" height="28" rx="6" class="batt"/><rect x="40" y="-6" width="6" height="12" class="batt"/><text x="0" y="6" text-anchor="middle" class="bt">+ −</text></g>
      <rect x="168" y="27" width="44" height="26" rx="6" class="gap" id="labGap"/></svg><div class="lab-drop" id="labDrop"></div></div>
      <div class="lab-items">${q.items.map((x,i)=>`<div class="lab-it" data-i="${i}"><span>${x[0]}</span><small>${x[1]}</small></div>`).join("")}</div></div>`);
    gAsk(q);const drop=$("labDrop");
    const tryIt=el=>{if(q.done)return;const x=q.items[+el.dataset.i];drop.innerHTML=`<span>${x[0]}</span>`;
      if(x===q.ok){$("labS").classList.add("on");el.classList.add("gone");gameWin(q,miss,drop,sayIf(x[1]))}
      else{miss++;sfx.oops();$("labS").classList.add("dud");setTimeout(()=>{$("labS").classList.remove("dud");drop.innerHTML=""},900);bounce(el);el.classList.add("used");
        if(miss>=3){q.done=true;drop.innerHTML=`<span>${q.ok[0]}</span>`;$("labS").classList.add("on");gameLearn(q,`${q.ok[1]}: metal`,[])}}};
    $("qBody").querySelectorAll(".lab-it").forEach(el=>dragify(el,()=>[drop],()=>tryIt(el),()=>tryIt(el)));
    window.__gSolve=()=>tryIt($("qBody").querySelector(`.lab-it[data-i="${q.items.indexOf(q.ok)}"]`));return}
  if(LAB_TAP[q.sub]){const need=q.items.filter(x=>x[2]).length;let got=0;
    gShow(`<div class="game">${gHead("🔬","Lab",q.capT)}<div class="mg-top"><span class="lab-tg">${q.tg}</span><div class="mg-got" id="mgGot"></div></div>
      <div class="mg-items">${q.items.map((x,i)=>`<button class="mg-it${q.wordOnly?" wo":""}" data-i="${i}">${q.wordOnly?`<b>${x[1]}</b>`:`<span>${x[0]}</span><small>${x[1]}</small>`}</button>`).join("")}</div><p class="gmhint">Tap every one that fits</p></div>`);
    gAsk(q);
    $("qBody").querySelectorAll(".mg-it").forEach(b=>b.onclick=()=>{if(q.done||b.disabled)return;const x=q.items[+b.dataset.i];
      if(x[2]){b.disabled=true;b.classList.add("fly");sfx.tap();$("mgGot").insertAdjacentHTML("beforeend",`<span>${x[0]}</span>`);got++;if(got===need)gameWin(q,miss>1?1:0,$("mgGot"),[])}
      else{miss++;sfx.oops();bounce(b);b.classList.add("no");if(miss>=4){q.done=true;gameLearn(q,q.items.filter(z=>z[2]).map(z=>z[0]+" "+z[1]).join(", "),[])}}});
    window.__gSolve=()=>$("qBody").querySelectorAll(".mg-it").forEach(b=>{if(q.items[+b.dataset.i][2])b.click()});return}
  if(q.sub==="seesaw"){const down=q.l>q.r?"l":"r",blk=n=>Array.from({length:n},()=>"<i>🧱</i>").join("");
    gShow(`<div class="game">${gHead("⚖️","Lab","Which side goes down?")}<div class="ss" id="ssB"><div class="ss-bar"><span class="ss-l">${blk(q.l)}</span><span class="ss-r">${blk(q.r)}</span></div><div class="ss-pv"></div></div>
      <div class="gr-opts"><button class="gr-o" data-s="l">⬅️<small>this side</small></button><button class="gr-o" data-s="r">➡️<small>that side</small></button></div></div>`);
    gAsk(q);let m2=0;
    $("qBody").querySelectorAll(".gr-o").forEach(b=>b.onclick=()=>{if(q.done)return;if(b.dataset.s===down){b.classList.add("ok");$("ssB").classList.add(down==="l"?"tl":"tr");gameWin(q,m2,b,[...both(q.l),...both(q.r)].slice(0,0))}
      else{m2++;sfx.oops();bounce(b);if(m2>=2){q.done=true;$("ssB").classList.add(down==="l"?"tl":"tr");gameLearn(q,`${Math.max(q.l,q.r)} is heavier than ${Math.min(q.l,q.r)}`,[])}}});
    window.__gSolve=()=>$("qBody").querySelector(`.gr-o[data-s="${down}"]`).click();return}
  if(q.sub==="mix"){const [c1,c2,res]=q.m;
    gShow(`<div class="game">${gHead("🎨","Lab","What colour do they make?")}<div class="mx"><span class="mx-d" style="--c:${PCOL(c1)}"></span><b>+</b><span class="mx-d" style="--c:${PCOL(c2)}"></span><b>=</b><span class="mx-d q" id="mxR"><i class="mx-q">?</i></span></div>
      <div class="mx-opts">${q.o.map(c=>`<button class="mx-o" data-c="${c}" style="--c:${PCOL(c)}" aria-label="${c}"></button>`).join("")}</div></div>`);
    gAsk(q);let m3=0;
    $("qBody").querySelectorAll(".mx-o").forEach(b=>b.onclick=()=>{if(q.done)return;sayseq(faSay(b.dataset.c),()=>{});
      if(b.dataset.c===res){b.classList.add("ok");const r=$("mxR");r.textContent="";r.classList.remove("q");r.style.setProperty("--c",PCOL(res));gameWin(q,m3,b,[])}
      else{m3++;sfx.oops();bounce(b);b.disabled=true;if(m3>=2){q.done=true;const r=$("mxR");r.textContent="";r.classList.remove("q");r.style.setProperty("--c",PCOL(res));gameLearn(q,`${c1} + ${c2} = ${res}`,faSay(res))}}});
    window.__gSolve=()=>$("qBody").querySelector(`.mx-o[data-c="${res}"]`).click();return}
  if(q.sub==="magnet"){const need=q.items.filter(x=>x[2]).length;let got=0;
    gShow(`<div class="game">${gHead("🧲","Lab","What does the magnet pick up?")}<div class="mg-top"><span class="mg">🧲</span><div class="mg-got" id="mgGot"></div></div>
      <div class="mg-items">${q.items.map((x,i)=>`<button class="mg-it" data-i="${i}"><span>${x[0]}</span><small>${x[1]}</small></button>`).join("")}</div><p class="gmhint">Tap every one the magnet pulls</p></div>`);
    gAsk(q);
    $("qBody").querySelectorAll(".mg-it").forEach(b=>b.onclick=()=>{if(q.done||b.disabled)return;const x=q.items[+b.dataset.i];
      if(x[2]){b.disabled=true;b.classList.add("fly");sfx.tap();$("mgGot").insertAdjacentHTML("beforeend",`<span>${x[0]}</span>`);got++;if(got===need)gameWin(q,miss>1?1:0,$("mgGot"),[])}
      else{miss++;sfx.oops();bounce(b);b.classList.add("no");if(miss>=4){q.done=true;gameLearn(q,"Iron and steel: "+q.items.filter(z=>z[2]).map(z=>z[1]).join(", "),[])}}});
    window.__gSolve=()=>$("qBody").querySelectorAll(".mg-it").forEach(b=>{if(q.items[+b.dataset.i][2])b.click()});return}
  /* gears */
  const n=q.three?3:2,ans=q.three?q.cw:!q.cw;
  gShow(`<div class="game">${gHead("⚙️","Lab",`Which way does the ${q.three?"last":"blue"} gear turn?`)}<svg viewBox="0 0 ${n===3?320:230} 130" class="gears" id="gearS">
    <g transform="translate(60,65)">${gearSVG(36,10,"g1 "+(q.cw?"cw":"ccw"))}</g>
    <g transform="translate(${60+80},65)">${gearSVG(36,10,"g2"+(n===2?" q":""))}</g>${n===3?`<g transform="translate(${60+160},65)">${gearSVG(36,10,"g3 q")}</g>`:""}</svg>
    <div class="gr-opts"><button data-cw="1" class="gr-o">↻<small>this way</small></button><button data-cw="0" class="gr-o">↺<small>that way</small></button></div></div>`);
  gAsk(q);let miss2=0;
  $("qBody").querySelectorAll(".gr-o").forEach(b=>b.onclick=()=>{if(q.done)return;const v=b.dataset.cw==="1";
    if(v===ans){b.classList.add("ok");const S2=$("gearS");S2.querySelector(".g2").classList.add(q.cw?"ccw":"cw");if(n===3)S2.querySelector(".g3").classList.add(q.cw?"cw":"ccw");gameWin(q,miss2,b,[])}
    else{miss2++;sfx.oops();bounce(b);if(miss2>=2){q.done=true;gameLearn(q,LAB_F[q.three?"g3":"g2"],[])}}});
  window.__gSolve=()=>$("qBody").querySelector(`.gr-o[data-cw="${ans?1:0}"]`).click()}

/* ---------- 5. word search ---------- */
const WS_SET={animals:["bird","cow","duck","chicken","bee","frog","fox","cat","dog","pig","bat","hen","bug","snake"],farm:["cow","duck","chicken","pig","hen","dog","cat","bee"],world:["tree","sun","star","rainbow","cake","honey","salad","bus","car"]};
function qWSearch(cat){const a=lvl(),n=a<=7?6:7,nw=a<=7?3:4,diag=a>=8;
  const cand=sh(WORDS.filter(w=>w.w.length>=3&&w.w.length<=n&&/^[a-z]+$/.test(w.w)&&(!WS_SET[cat]||WS_SET[cat].includes(w.w))));
  for(let tries=0;tries<60;tries++){const G=Array(n*n).fill(null),placed=[];
    for(const w of cand){if(placed.length===nw)break;const dirs=[[1,0],[0,1],...(diag?[[1,1]]:[])];let ok=false;
      for(let t=0;t<40&&!ok;t++){const [dx,dy]=pickOne(dirs),L2=w.w.length,x0=ri(0,n-1-dx*(L2-1)),y0=ri(0,n-1-dy*(L2-1));
        const cs=[...w.w].map((ch,j)=>[(y0+dy*j)*n+x0+dx*j,ch]);if(cs.every(([c,ch])=>G[c]===null||G[c]===ch)){cs.forEach(([c,ch])=>G[c]=ch);placed.push({w:w.w,i:w.i,cells:cs.map(z=>z[0])});ok=true}}}
    if(placed.length<nw)continue;const AB="abcdefghijklmnoprstuwy";for(let i=0;i<G.length;i++)if(!G[i])G[i]=AB[ri(0,AB.length-1)];
    return {game:"wsearch",n,G:G.map(c=>c.toUpperCase()),words:placed,diag,voice:[G3("WSEARCH")],factT:"Word hunters look in rows and in columns!"}}
  return null}
function wsearchQ(q){const n=q.n;let miss=0,found=0,a0=null,sel=[];
  gShow(`<div class="game">${gHead("🔎","Word search","Find the words!")}<div class="ws" id="wsB" style="grid-template-columns:repeat(${n},1fr)">${q.G.map((c,i)=>`<b class="wsc" data-i="${i}">${c}</b>`).join("")}</div>
    <div class="ws-list">${q.words.map((w,j)=>`<span class="ws-w" data-j="${j}"><img src="img/w/wd_${w.i}.png" alt=""><small>${w.w.toUpperCase()}</small></span>`).join("")}</div></div>`);
  gAsk(q);const B=$("wsB"),cells=[...B.querySelectorAll(".wsc")];
  const line=(s,e)=>{const x0=s%n,y0=Math.floor(s/n),x1=e%n,y1=Math.floor(e/n),dx=Math.sign(x1-x0),dy=Math.sign(y1-y0),len=Math.max(Math.abs(x1-x0),Math.abs(y1-y0));
    if(!(dx===0||dy===0||(q.diag&&Math.abs(x1-x0)===Math.abs(y1-y0))))return [s];return Array.from({length:len+1},(_,j)=>(y0+dy*j)*n+x0+dx*j)};
  const show=()=>cells.forEach((c,i)=>c.classList.toggle("sel",sel.includes(i)));
  const check=()=>{const key=sel.join(","),rev=[...sel].reverse().join(",");const j=q.words.findIndex(w=>!w.found&&(w.cells.join(",")===key||w.cells.join(",")===rev));
    if(j>=0){const w=q.words[j];w.found=true;found++;w.cells.forEach(c=>cells[c].classList.add("fd","c"+(j%4)));$("qBody").querySelector(`.ws-w[data-j="${j}"]`).classList.add("ok");sayseq(wSay(w),()=>{});
      if(found===q.words.length)setTimeout(()=>gameWin(q,miss>2?1:0,B,[]),700)}
    else if(sel.length>1){miss++;sfx.oops();B.classList.add("bump");setTimeout(()=>B.classList.remove("bump"),400)}
    sel=[];show()};
  const cellAt=(x,y)=>{const e=document.elementFromPoint(x,y);return e&&e.classList.contains("wsc")?+e.dataset.i:null};
  B.style.touchAction="none";let on=false,moved=false;
  B.addEventListener("pointerdown",e=>{if(q.done)return;const c=cellAt(e.clientX,e.clientY);if(c===null)return;on=true;moved=false;try{B.setPointerCapture(e.pointerId)}catch(_){}
    if(a0!==null&&a0!==c){sel=line(a0,c);a0=null;show();on=false;check();return}a0=c;sel=[c];show()});
  B.addEventListener("pointermove",e=>{if(!on)return;const c=cellAt(e.clientX,e.clientY);if(c===null)return;if(c!==a0)moved=true;sel=line(a0,c);show()});
  B.addEventListener("pointerup",()=>{if(!on)return;on=false;if(moved){a0=null;check()}});   /* a tap keeps the first letter chosen: tap the last letter next */
  window.__gSolve=()=>q.words.forEach(w=>{if(!w.found){sel=w.cells.slice();check()}})}

/* ---------- 6. tap what you hear (pictures for little ones, words for readers) ---------- */
const HEAR_S=POOL.sents.map(s=>({id:s.id,t:cap1(s.q.replace("___",s.a)),wr:s.o.filter(x=>x!==s.a)}));
function qHear(cat){const a=lvl();
  if(a>=6&&(cat==="read"||cat==="letters")){const s=pickOne(HEAR_S),words=s.t.replace(/[.!?]/g,"").split(" "),extra=sh(s.wr.filter(w=>!words.map(x=>x.toLowerCase()).includes(w))).slice(0,a>=8?2:1);
    return {game:"hear",mode:"sent",ans:words,tiles:sh([...words,...extra]),sid:s.id,text:s.t,voice:[G3("HEAR"),"w/PX_HEAR_"+s.id],factT:s.t}}
  const k=a<=3?2:3,pool=sh(WORDS.filter(w=>w.w.length<=7)),ans=pool.slice(0,k),tiles=sh(pool.slice(0,k+(a<=3?1:2)));
  return {game:"hear",mode:"pic",ans:ans.map(w=>w.w),tiles:tiles.map(w=>w.w),wi:Object.fromEntries(tiles.map(w=>[w.w,w.i])),voice:[G3("HEAR"),...ans.flatMap(w=>wSay(w))],factT:ans.map(w=>cap1(w.w)).join(", ")}}
function hearQ(q){let miss=0,line=[];const pic=q.mode==="pic";
  const tile=(w,j)=>pic?`<img src="img/w/wd_${q.wi[w]}.png" alt="${w}">`:`<b>${w}</b>`;
  gShow(`<div class="game">${gHead("👂","Listen",pic?"Tap the pictures in order!":"Tap what you hear")}
    <button class="hr-play" id="hrP">🔊</button><div class="hr-line${pic?" pic":""}" id="hrL"></div>
    <div class="hr-tiles${pic?" pic":""}">${q.tiles.map((w,j)=>`<button class="hr-t" data-j="${j}">${tile(w,j)}</button>`).join("")}</div>
    <button class="qcheck" id="hrC" disabled>CHECK</button></div>`);
  const replay=()=>{hush();sayseq(pic?q.voice.slice(1):q.voice.slice(-1),()=>{})};gAsk(q);$("hrP").onclick=()=>{sfx.tap();replay()};
  const draw=()=>{$("hrL").innerHTML=line.map(j=>`<button class="hr-t in" data-j="${j}">${tile(q.tiles[j],j)}</button>`).join("");
    $("qBody").querySelectorAll(".hr-tiles .hr-t").forEach(b=>b.classList.toggle("used",line.includes(+b.dataset.j)));
    $("hrL").querySelectorAll(".hr-t").forEach(b=>b.onclick=()=>{if(q.done)return;sfx.tap();line=line.filter(x=>x!==+b.dataset.j);draw()});
    $("hrC").disabled=!line.length;$("hrC").classList.toggle("on",!!line.length)};
  $("qBody").querySelectorAll(".hr-tiles .hr-t").forEach(b=>b.onclick=()=>{if(q.done)return;const j=+b.dataset.j;if(line.includes(j))return;sfx.tap();line.push(j);if(pic){const w=q.tiles[j];sayseq(wSay(wById(q.wi[w])||{i:q.wi[w]}),()=>{})}draw()});
  $("hrC").onclick=()=>{if(q.done)return;const got=line.map(j=>q.tiles[j].toLowerCase()),want=q.ans.map(w=>w.toLowerCase());
    if(got.join(" ")===want.join(" ")){$("hrC").disabled=true;gameWin(q,miss,$("hrL"),pic?[]:["w/PX_HEAR_"+q.sid])}
    else{miss++;sfx.oops();$("hrL").classList.add("bump");setTimeout(()=>$("hrL").classList.remove("bump"),450);toastHint("Listen again 👂");setTimeout(replay,500);
      if(miss>=3){q.done=true;gameLearn(q,pic?q.ans.map(cap1).join(" → "):q.text,pic?q.voice.slice(1):["w/PX_HEAR_"+q.sid])}}};
  window.__gSolve=()=>{const used=new Set();line=q.ans.map(w=>{const j=q.tiles.findIndex((t,jj)=>!used.has(jj)&&t.toLowerCase()===w.toLowerCase());used.add(j);return j});draw();$("hrC").click()}}

/* ---------- 7. block fit: a falling piece fills the gap (Tetris-like, one piece at a time) ---------- */
const TET={I:[[0,0],[1,0],[2,0],[3,0]],O:[[0,0],[1,0],[0,1],[1,1]],T:[[0,0],[1,0],[2,0],[1,1]],L:[[0,0],[0,1],[0,2],[1,2]],J:[[1,0],[1,1],[1,2],[0,2]],S:[[1,0],[2,0],[0,1],[1,1]],Z:[[0,0],[1,0],[1,1],[2,1]]};
/* each section dresses the blocks in its own pictures */
const TET_TH={count:["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"],add:["➕","➖","🟰","🔢"],clock:["🕐","🕑","🕒","⏰","☀️","🌙"],animals:["🐶","🐱","🐰","🐻","🦊","🐸"],farm:["🐄","🐖","🐑","🐔","🌾","🥕"],
  world:["🌳","🌸","🍎","🌍","🌊","🍄"],sky:["⭐","🌙","🪐","☀️","🚀","☁️"],shapes:["🔺","🟦","🟡","🔶","⬛","🟣"],people:["👩‍🚒","👨‍🍳","👩‍⚕️","😀","😢","😮"],flags:["🇪🇬","🇫🇷","🇯🇵","🇧🇷","🇨🇦","🇮🇹"],
  letters:["A","B","C","D","E","F"],read:["a","b","c","d","e","f"],robot:["🤖","⚙️","🔋","🔩"],memory:["🧠","🎹","🔴","🟢","🔵","🟡"]};
const TCOL={I:"#1CB0F6",O:"#FFC800",T:"#CE82FF",L:"#FF9600",J:"#2B70C9",S:"#58CC02",Z:"#FF4B4B"};
const rot=(p,k)=>{let c=p.map(x=>x.slice());for(let i=0;i<k;i++)c=c.map(([x,y])=>[-y,x]);const mx=Math.min(...c.map(z=>z[0])),my=Math.min(...c.map(z=>z[1]));return c.map(([x,y])=>[x-mx,y-my])};
function qBlocks(cat){const a=lvl(),W=6,H=8,turn=a>=6;
  for(let t=0;t<200;t++){const k=pickOne(Object.keys(TET)),r=ri(0,3),P=rot(TET[k],r),pw=Math.max(...P.map(z=>z[0]))+1,ph=Math.max(...P.map(z=>z[1]))+1;
    if(ph>(a<=5?2:3))continue;const x=ri(0,W-pw),rows=ph,gap=new Set(P.map(([u,v])=>(H-rows+v)*W+x+u));
    /* every gap cell must be reachable from above */
    if([...gap].some(c=>{const cx=c%W,cy=Math.floor(c/W);for(let y=H-rows;y<cy;y++)if(!gap.has(y*W+cx))return true;return false}))continue;
    const fill=[];for(let y=H-rows;y<H;y++)for(let xx=0;xx<W;xx++)if(!gap.has(y*W+xx))fill.push(y*W+xx);
    const r0=turn?(r+ri(1,3))%4:r,th=sh(TET_TH[cat]||TET_TH.shapes);return {game:"blocks",W,H,k,r0,rt:r,gx:x,rows,fill,turn,th,voice:[G3("BLOCKS")],factT:"Turning a shape does not change it. It is still the same shape!"}}
  return null}
function blocksQ(q){const {W,H}=q;let miss=0,r=q.r0,px,py,timer=null,landed=false;
  const S2=Math.floor(Math.min(36,(innerHeight*.42)/H,(($("qBody").clientWidth||340)*.62)/W));
  gShow(`<div class="game">${gHead("🧱","Block fit","Fill the gap!")}<div class="bk" id="bkB" style="width:${W*S2}px;height:${H*S2}px;--s:${S2}px"></div>
    <p class="gmhint">${q.turn?"Turn it 🔄 and slide it ⬅️ ➡️, then drop it ⬇️":"Slide it ⬅️ ➡️, then drop it ⬇️"} — no rush!</p><div class="bk-pad">${["l",...(q.turn?["r"]:[]),"d","R"].map(k=>`<button data-k="${k}" class="${k==="d"?"bkdrop":""}">${{l:"⬅️",r:"🔄",d:"⬇️",R:"➡️"}[k]}</button>`).join("")}</div></div>`);
  gAsk(q);const B=$("bkB"),cells=()=>rot(TET[q.k],r).map(([u,v])=>[u+px,v+py]);
  const fits=(cs)=>cs.every(([x,y])=>x>=0&&x<W&&y<H&&(y<0||!q.fill.includes(y*W+x)));
  const th=q.th||["🟦"],te=i=>`<em>${th[i%th.length]}</em>`;
  const draw=()=>{let h=q.fill.map((c,i)=>`<i class="bf" style="left:${(c%W)*S2}px;top:${Math.floor(c/W)*S2}px">${te(i+2)}</i>`).join("");
    if(!landed){let gy=py;const at=d=>cells().map(([x,y])=>[x,y+d]);let d=0;while(fits(at(d+1)))d++;if(d>0)h+=at(d).map(([x,y])=>`<i class="bg" style="left:${x*S2}px;top:${y*S2}px;border-color:${TCOL[q.k]}"></i>`).join("")}
    h+=cells().map(([x,y],i)=>`<i class="bp" style="left:${x*S2}px;top:${y*S2}px;background:${TCOL[q.k]}">${te(i)}</i>`).join("");B.innerHTML=h};
  const reset=()=>{r=q.r0;const P=rot(TET[q.k],r);px=Math.floor((W-(Math.max(...P.map(z=>z[0]))+1))/2);py=0;landed=false;draw();clearInterval(timer)};
  const lock=()=>{clearInterval(timer);landed=true;const cs=cells(),full=[];for(let y=H-q.rows;y<H;y++){let ok=true;for(let x=0;x<W;x++)if(!q.fill.includes(y*W+x)&&!cs.some(([a,b])=>a===x&&b===y))ok=false;if(ok)full.push(y)}
    if(full.length===q.rows){B.classList.add("clear");gameWin(q,miss,B,[])}
    else{miss++;sfx.oops();B.classList.add("bump");setTimeout(()=>B.classList.remove("bump"),450);toastHint("Not quite! Try again 🧱");
      if(miss>=3){q.done=true;r=q.rt;px=q.gx;py=H-q.rows;draw();gameLearn(q,"Turn it and slide it into the gap.",[])}else setTimeout(()=>{if(L.q===q&&!q.done)reset()},900)}};
  const fall=()=>{if(q.done||landed||L.q!==q){clearInterval(timer);return}py++;if(!fits(cells())){py--;draw();lock()}else draw()};
  let busyD=false;const move=k=>{if(q.done||landed||busyD)return;sfx.tap();if(k==="l"||k==="R"){px+=k==="l"?-1:1;if(!fits(cells()))px+=k==="l"?1:-1}
    else if(k==="r"){const o=r;r=(r+1)%4;if(!fits(cells())){px--;if(!fits(cells())){px+=2;if(!fits(cells())){px--;r=o}}}}
    else{busyD=true;const st=()=>{py++;if(!fits(cells())){py--;draw();busyD=false;lock()}else{draw();setTimeout(st,70)}};st();return}draw()};
  $("qBody").querySelectorAll(".bk-pad button").forEach(b=>b.onclick=()=>move(b.dataset.k));
  reset();
  window.__gSolve=()=>{clearInterval(timer);busyD=false;r=q.rt;px=q.gx;py=0;draw();while(fits(cells()))py++;py--;draw();lock()}}

Object.assign(GAMES,{puzzle:puzzleQ,maze:mazeQ,parade:paradeQ,lab:labQ,wsearch:wsearchQ,hear:hearQ,blocks:blocksQ});
/* where the new games appear (by topic and age) */
const _ff0=formatsFor0;
formatsFor0=function(cat){const a=lvl(),base=_ff0(cat);if(!G3_READY)return base;const add={
  count:["f_puzzle","f_maze","f_parade"],add:["f_parade","f_puzzle"],clock:["f_puzzle"],letters:["f_puzzle","f_hear",...(a>=6?["f_wsearch"]:[])],read:["f_hear",...(a>=6?["f_wsearch"]:[]),"f_puzzle"],
  farm:["f_puzzle","f_maze","f_parade",...(a>=6?["f_wsearch"]:[])],animals:["f_puzzle","f_maze","f_parade",...(a>=6?["f_wsearch"]:[])],world:["f_puzzle","f_maze","f_lab","f_parade",...(a>=7?["f_wsearch"]:[])],
  sky:["f_puzzle","f_maze","f_parade"],shapes:["f_puzzle","f_blocks","f_lab"],people:["f_puzzle"],flags:["f_puzzle"],robot:["f_maze","f_lab","f_blocks"]}[cat]||[];
  const out=[...base,...add];if(!["story","paint"].includes(cat)){/* in every section, about 6% of questions each (balanced against the other games) */for(const g of ["f_blocks","f_lab"])if(!out.includes(g)&&(window.__allfmt||Math.random()<.6))out.push(g)}
  return out};
const _bf=buildFormat;
buildFormat=function(kind,cat){const k=kind.slice(2);
  if(k==="puzzle")return qPuzzle(cat);if(k==="maze")return qMaze(cat);if(k==="parade")return qParade(cat);if(k==="lab")return qLab(cat);
  if(k==="wsearch")return qWSearch(cat);if(k==="hear")return qHear(cat);if(k==="blocks")return qBlocks(cat);return _bf(kind,cat)};
