
/* =====================================================================================================
   Nov 11d: 20 NEW GAMES (v12). Each is a different activity; each has an age window and is offered only
   in the sections it fits. Same look as every other game: gHead (section + speaker), title, big buttons.
   ===================================================================================================== */
var G7_READY=__G7VOICE__;
const G7=n=>"w/PX_G7_"+n;
const g7btn=(id,txt,cls="")=>`<button class="qcheck on ${cls}" id="${id}">${txt}</button>`;
const g7solve=f=>{window.__gSolve=f};
const tapAll=(sel,fn)=>$("qBody").querySelectorAll(sel).forEach(b=>b.onpointerdown=e=>{e.preventDefault();fn(b,e)});
const fire7=b=>b&&b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));

/* 1. Water the flowers (age 3+) - tap every thirsty flower */
function qGarden(){const n=ri(3,lvl()<=4?4:6);return {game:"garden",n,voice:[G7("GARDEN")],gid:"g:garden",factT:"Plants need water to grow."}}
function gardenQ(q){gShow(`<div class="game">${gHead("🌻","Water the flowers","Give every thirsty flower some water!")}
  <div class="g7-garden">${Array.from({length:q.n},(_,i)=>`<button class="g7-fl" data-i="${i}"><span class="g7-drop">💧</span><b>🥀</b></button>`).join("")}</div></div>`);gAsk(q);
  let left=q.n;tapAll(".g7-fl",b=>{if(q.done||b.dataset.ok)return;b.dataset.ok=1;b.classList.add("ok");b.querySelector("b").textContent="🌻";sfx.tap();left--;sayseq([N(q.n-left)].filter(Boolean),()=>{});if(!left)setTimeout(()=>gameWin(q,0,b,[]),500)});
  g7solve(()=>$("qBody").querySelectorAll(".g7-fl").forEach(fire7))}

/* 2. Colour bubbles (age 3+) - pop only the bubbles of one colour */
const BCOL=[["red","#FF5A5F"],["blue","#4DABF7"],["yellow","#FFD43B"],["green","#51CF66"],["purple","#9775FA"]];
function qBubCol(){const cs=sh(BCOL).slice(0,lvl()<=4?2:3),t=cs[0],k=ri(3,lvl()<=4?4:5),items=sh([...Array(k).fill(t),...Array.from({length:k+1},()=>pickOne(cs.slice(1)))]);return {game:"bubcol",t,items,k,voice:[G7("BUBCOL"),...faSay(t[0]),...enSay(t[0])],gid:"g:bubcol",factT:"Bubbles are made of soap and water."}}
function bubcolQ(q){let miss=0,left=q.k;gShow(`<div class="game">${gHead("🫧","Colour bubbles",`Pop only the <span style="color:${q.t[1]};font-weight:900">${q.t[0]}</span> bubbles!`)}
  <div class="g7-bub">${q.items.map((c,i)=>`<button class="g7-b" data-i="${i}" style="--c:${c[1]};--d:${(i%5)*0.4}s"></button>`).join("")}</div></div>`);gAsk(q);
  tapAll(".g7-b",b=>{if(q.done||b.dataset.gone)return;const c=q.items[+b.dataset.i];if(c===q.t){b.dataset.gone=1;b.classList.add("pop");sfx.tap();left--;if(!left)gameWin(q,miss>1?1:0,b,[])}else{miss++;sfx.oops();b.classList.add("no");setTimeout(()=>b.classList.remove("no"),400);toastHint(`Only the ${q.t[0]} ones!`)}});
  g7solve(()=>$("qBody").querySelectorAll(".g7-b").forEach(b=>{if(q.items[+b.dataset.i]===q.t)fire7(b)}))}

/* 3. Animal train (age 4+) - board the animals from the smallest to the biggest */
const SIZEA=[["mouse","🐭"],["cat","🐱"],["dog","🐶"],["horse","🐴"],["elephant","🐘"]];
function qTrain(){const k=lvl()<=5?3:4,idx=sh([0,1,2,3,4]).slice(0,k).sort((a,b)=>a-b);return {game:"train",order:idx.map(i=>SIZEA[i]),voice:[G7("TRAIN")],gid:"g:train",factT:"From the smallest to the biggest!"}}
function trainQ(q){let k=0,miss=0;const shown=sh(q.order);gShow(`<div class="game">${gHead("🚂","Animal train","Smallest first, biggest last!")}
  <div class="g7-wag">🚂${q.order.map((_,i)=>`<span class="g7-w" id="tw${i}"></span>`).join("")}</div>
  <div class="g7-ani">${shown.map(a=>`<button class="g7-a" data-n="${a[0]}"><span style="font-size:${30+SIZEA.findIndex(z=>z[0]===a[0])*9}px">${a[1]}</span><small>${cap1(a[0])}</small></button>`).join("")}</div></div>`);gAsk(q);
  tapAll(".g7-a",b=>{if(q.done||b.dataset.done)return;if(b.dataset.n===q.order[k][0]){b.dataset.done=1;b.classList.add("gone");$("tw"+k).textContent=q.order[k][1];sfx.tap();sayseq(both(b.dataset.n),()=>{});k++;if(k===q.order.length)setTimeout(()=>gameWin(q,miss>1?1:0,$("tw0"),[]),400)}else{miss++;sfx.oops();toastHint("Find the smallest one left 🔍")}});
  g7solve(()=>{const t=()=>{if(q.done||k>=q.order.length)return;fire7([...$("qBody").querySelectorAll(".g7-a")].find(b=>b.dataset.n===q.order[k][0]));setTimeout(t,120)};t()})}

/* 4. Feed the fish (age 3+) - drop exactly N food flakes */
function qFish(){const n=ri(2,lvl()<=4?5:9);return {game:"fishfood",n,voice:[G7("FISH"),...faSay(String(n)),...enSay(String(n))],gid:"g:fishfood",factT:"Fish eat a little food every day."}}
function fishfoodQ(q){let c=0,miss=0;gShow(`<div class="game">${gHead("🐠","Feed the fish",`The fish wants <b class="g7-big">${q.n}</b> flakes`)}
  <div class="g7-tank" id="fsT"><span class="g7-fish">🐠</span><div class="g7-flk" id="fsF"></div></div>
  <div class="g7-row2">${g7btn("fsD","Drop food 🍤")}<div class="mx-row"><button class="mv-skip" id="fsR">Start again</button>${g7btn("fsK","Done ✓","g7-ok")}</div></div></div>`);gAsk(q);
  const F=$("fsF"),draw=()=>{F.innerHTML="🟤".repeat(c)};
  $("fsD").onclick=()=>{if(q.done)return;c++;draw();sfx.tap();sayseq([N(c)].filter(Boolean),()=>{})};
  $("fsR").onclick=()=>{c=0;draw()};
  $("fsK").onclick=()=>{if(q.done)return;if(c===q.n)gameWin(q,miss,$("fsT"),[]);else{miss++;sfx.oops();toastHint(c<q.n?"A bit more food 🍤":"Too much! Start again");if(c>q.n){c=0;draw()}}};
  g7solve(()=>{c=q.n;draw();$("fsK").click()})}

/* 5. Dress for the weather (age 3+) */
const WEA={sunny:["☀️",[["hat","🧢"],["sunglasses","🕶️"],["shorts","🩳"]]],rainy:["🌧️",[["umbrella","☂️"],["boots","🥾"],["raincoat","🧥"]]],snowy:["❄️",[["scarf","🧣"],["gloves","🧤"],["woolly hat","🧶"]]]};
const WEAF={sunny:"On sunny days a hat and sunglasses protect us from the sun.",rainy:"On rainy days an umbrella and boots keep us dry.",snowy:"On snowy days a scarf and gloves keep us warm."};
function qWeather(){const w=pickOne(Object.keys(WEA)),need=lvl()<=4?2:3,good=WEA[w][1].slice(0,need),bad=sh(Object.keys(WEA).filter(x=>x!==w).flatMap(x=>WEA[x][1])).slice(0,need===2?2:3);
  return {game:"weather",w,good,items:sh([...good,...bad]),voice:[G7("WEATHER"),G7("W_"+w.toUpperCase())],gid:"g:weather",factT:WEAF[w]}}
function weatherQ(q){let miss=0,got=0;gShow(`<div class="game">${gHead(WEA[q.w][0],"Dress for the weather",`It is <b>${q.w}</b>! What do we wear?`)}
  <div class="g7-sky g7-${q.w}"><span>${WEA[q.w][0]}</span><span class="g7-kid">🧒</span></div>
  <div class="g7-clo">${q.items.map((it,i)=>`<button class="g7-c" data-i="${i}"><span>${it[1]}</span><small>${cap1(it[0])}</small></button>`).join("")}</div></div>`);gAsk(q);
  tapAll(".g7-c",b=>{if(q.done||b.dataset.done)return;const it=q.items[+b.dataset.i];if(q.good.includes(it)){b.dataset.done=1;b.classList.add("ok");sfx.tap();got++;if(got===q.good.length)setTimeout(()=>gameWin(q,miss>1?1:0,b,[]),300)}else{miss++;sfx.oops();b.classList.add("no");setTimeout(()=>b.classList.remove("no"),400);toastHint(`Not for ${q.w} weather!`)}});
  g7solve(()=>$("qBody").querySelectorAll(".g7-c").forEach(b=>{if(q.good.includes(q.items[+b.dataset.i]))fire7(b)}))}

/* 6. Toy shop (age 6+) - pay the exact price with coins */
function qShop(){const p=ri(4,lvl()<=6?12:20),toy=pickOne(["🧸","🪀","🚗","🪁","🎈","🦖","⚽"]);return {game:"shop",p,toy,voice:[G7("SHOP"),...faSay(String(p)),...enSay(String(p))],gid:"g:shop",factT:"We can make the same price with different coins!"}}
function shopQ(q){let sum=0,miss=0,used=[];gShow(`<div class="game">${gHead("🛒","Toy shop",`Pay exactly <b class="g7-big">${q.p}</b> coins`)}
  <div class="g7-shop"><span class="g7-toy">${q.toy}</span><span class="g7-tag">${q.p} 🪙</span></div><div class="g7-tray" id="spT"></div><div class="g7-sum" id="spS">0</div>
  <div class="g7-coins">${[1,2,5,10].map(v=>`<button class="g7-coin" data-v="${v}">${v}</button>`).join("")}</div>
  <div class="mx-row"><button class="mv-skip" id="spR">Take back</button>${g7btn("spP","Pay 💳")}</div></div>`);gAsk(q);
  const draw=()=>{$("spT").innerHTML=used.map(v=>`<span class="g7-coin s">${v}</span>`).join("");$("spS").textContent=sum};
  tapAll(".g7-coin",b=>{if(q.done)return;const v=+b.dataset.v;used.push(v);sum+=v;sfx.tap();draw()});
  $("spR").onclick=()=>{used=[];sum=0;draw()};
  $("spP").onclick=()=>{if(q.done)return;if(sum===q.p)gameWin(q,miss,$("spT"),[]);else{miss++;sfx.oops();toastHint(sum<q.p?`${q.p-sum} more`:"Too much - take some back");}};
  g7solve(()=>{used=[];sum=0;let r=q.p;for(const v of [10,5,2,1])while(r>=v){used.push(v);r-=v;sum+=v}draw();$("spP").click()})}

/* 7. Fix the bridge (age 5+) - pick the plank that fits the gap */
function qBridge(){const g=ri(2,lvl()<=6?5:7),o=sh([g,...sh([1,2,3,4,5,6,7,8].filter(x=>x!==g)).slice(0,2)]);return {game:"bridge",g,o,voice:[G7("BRIDGE")],gid:"g:bridge",factT:"Measure first, then build!"}}
function bridgeQ(q){let miss=0;const U=26;gShow(`<div class="game">${gHead("🌉","Fix the bridge","Which plank fits the gap exactly?")}
  <div class="g7-br"><span class="g7-bank"></span><span class="g7-gap" id="brG" style="width:${q.g*U}px">${"<i></i>".repeat(q.g)}</span><span class="g7-bank"></span><span class="g7-car" id="brC">🚗</span></div>
  <div class="g7-planks">${q.o.map((l,i)=>`<button class="g7-pl" data-i="${i}"><span style="width:${l*U}px">${"<i></i>".repeat(l)}</span><small>${l}</small></button>`).join("")}</div></div>`);gAsk(q);
  tapAll(".g7-pl",b=>{if(q.done)return;const l=q.o[+b.dataset.i];if(l===q.g){$("brG").classList.add("fill");$("brC").classList.add("go");sfx.good();setTimeout(()=>gameWin(q,miss,$("brG"),[]),1300);q.locked=true}else{miss++;sfx.oops();b.classList.add("no");toastHint(l<q.g?"Too short - it falls in 💦":"Too long - it does not fit")}});
  g7solve(()=>fire7([...$("qBody").querySelectorAll(".g7-pl")].find(b=>q.o[+b.dataset.i]===q.g)))}

/* 8. Traffic light (age 3+) - tap GO only on green */
function qTraffic(){return {game:"traffic",need:3,voice:[G7("TRAFFIC")],gid:"g:traffic",factT:"Red means stop, green means go!"}}
function trafficQ(q){let n=0,miss=0,col="red",tm=null;gShow(`<div class="game">${gHead("🚦","Traffic light","Cross only when the light is green!")}
  <div class="g7-tl"><div class="g7-lamp" id="tlL"><i class="r"></i><i class="y"></i><i class="g"></i></div><div class="g7-road"><span id="tlK">🚶</span></div></div>
  <div class="g7-dots" id="tlD">${"○".repeat(q.need)}</div><div class="mx-row">${g7btn("tlG","GO! 🚶")}</div></div>`);gAsk(q);
  const L2=$("tlL"),set=c=>{col=c;L2.className="g7-lamp "+c},cyc=()=>{if(q.done||!$("tlL"))return;const nx={red:"green",green:"yellow",yellow:"red"}[col];set(nx);tm=setTimeout(cyc,nx==="green"?1700:nx==="yellow"?900:ri(1500,2600))};set("red");tm=setTimeout(cyc,1800);
  $("tlG").onclick=()=>{if(q.done)return;if(col==="green"){n++;$("tlD").textContent="●".repeat(n)+"○".repeat(q.need-n);$("tlK").classList.remove("x");void $("tlK").offsetWidth;$("tlK").classList.add("x");sfx.tap();if(n>=q.need){clearTimeout(tm);setTimeout(()=>gameWin(q,miss>1?1:0,$("tlL"),[]),600)}}else{miss++;sfx.oops();toastHint(col==="red"?"Red means STOP ✋":"Yellow - wait for green")}};
  g7solve(()=>{clearTimeout(tm);n=q.need-1;set("green");$("tlG").click()})}

/* 9. Recycling (age 5+) */
const REC=[["newspaper","📰","paper"],["box","📦","paper"],["paper","📄","paper"],["bottle","🧴","plastic"],["cup","🥤","plastic"],["toy","🪀","plastic"],["jar","🫙","glass"],["glass bottle","🍾","glass"]];
const BIN={paper:["📘","#4DABF7"],plastic:["📒","#FFD43B"],glass:["📗","#51CF66"]};
function qRecycle(){return {game:"recycle",items:sh(REC).slice(0,lvl()<=6?4:5),voice:[G7("RECYCLE")],gid:"g:recycle",factT:"Recycling turns old things into new things."}}
function recycleQ(q){let k=0,miss=0;gShow(`<div class="game">${gHead("♻️","Recycling","Put it in the right bin!")}
  <div class="g7-rit" id="rcI"></div><div class="g7-bins">${Object.keys(BIN).map(b=>`<button class="g7-bin" data-b="${b}" style="--c:${BIN[b][1]}"><span>🗑️</span><b>${cap1(b)}</b></button>`).join("")}</div></div>`);gAsk(q);
  const show=()=>{const it=q.items[k];$("rcI").innerHTML=`<span>${it[1]}</span><small>${cap1(it[0])}</small>`};show();
  tapAll(".g7-bin",b=>{if(q.done)return;const it=q.items[k];if(b.dataset.b===it[2]){sfx.tap();b.classList.add("ok");setTimeout(()=>b.classList.remove("ok"),300);k++;if(k===q.items.length)gameWin(q,miss>1?1:0,b,[]);else show()}else{miss++;sfx.oops();toastHint(`${cap1(it[0])} is ${it[2]}`)}});
  g7solve(()=>{const t=()=>{if(q.done)return;fire7([...$("qBody").querySelectorAll(".g7-bin")].find(b=>b.dataset.b===q.items[k][2]));setTimeout(t,80)};t()})}

/* 10. Brush the teeth (age 3-6) */
function qTeeth(){return {game:"teeth",n:lvl()<=4?4:6,voice:[G7("TEETH")],gid:"g:teeth",factT:"Brush your teeth two times a day!"}}
function teethQ(q){let left=q.n;const spots=sh([0,1,2,3,4,5,6,7]).slice(0,q.n);gShow(`<div class="game">${gHead("🪥","Brush the teeth","Brush away all the germs!")}
  <div class="g7-mouth">${Array.from({length:8},(_,i)=>`<span class="g7-tooth">${spots.includes(i)?`<button class="g7-germ" data-i="${i}">🦠</button>`:""}</span>`).join("")}</div></div>`);gAsk(q);
  tapAll(".g7-germ",b=>{if(q.done||b.dataset.done)return;b.dataset.done=1;b.textContent="✨";b.classList.add("ok");sfx.tap();left--;if(!left)setTimeout(()=>gameWin(q,0,b,[]),400)});
  g7solve(()=>$("qBody").querySelectorAll(".g7-germ").forEach(fire7))}

/* 11. Grow a plant (age 3+) - give water AND sunshine */
function qGrow(){const w=lvl()<=4?2:3,s=lvl()<=4?2:3;return {game:"grow",w,s,voice:[G7("GROW")],gid:"g:grow",factT:"Plants need water and sunlight to grow."}}
function growQ(q){let w=0,s=0,miss=0;const ST=["🌱","🌿","🪴","🌷"];gShow(`<div class="game">${gHead("🌱","Grow a plant","Give it water and sunshine!")}
  <div class="g7-pot"><span class="g7-plant" id="grP">🌰</span><span class="g7-need"><b id="grW">${"💧".repeat(q.w)}</b><b id="grS">${"☀️".repeat(q.s)}</b></span></div>
  <div class="mx-row">${g7btn("grA","Water 💧")}${g7btn("grB","Sunshine ☀️","g7-sun")}</div></div>`);gAsk(q);
  const draw=()=>{$("grW").innerHTML="✅".repeat(Math.min(w,q.w))+"💧".repeat(Math.max(0,q.w-w));$("grS").innerHTML="✅".repeat(Math.min(s,q.s))+"☀️".repeat(Math.max(0,q.s-s));const st=Math.min(w,q.w)+Math.min(s,q.s);$("grP").textContent=st===0?"🌰":ST[Math.min(3,Math.floor(st*4/(q.w+q.s+1)))];
    if(w===q.w&&s===q.s){$("grP").textContent="🌷";gameWin(q,miss,$("grP"),[])}};
  $("grA").onclick=()=>{if(q.done)return;if(w>=q.w){miss++;sfx.oops();toastHint("That's enough water! Now sunshine ☀️");return}w++;sfx.tap();draw()};
  $("grB").onclick=()=>{if(q.done)return;if(s>=q.s){miss++;sfx.oops();toastHint("Enough sun! Now water 💧");return}s++;sfx.tap();draw()};
  g7solve(()=>{w=q.w;s=q.s;draw()})}

/* 12. Whose shadow? (age 3+) */
const SIL=[["cat","🐱"],["dog","🐶"],["rabbit","🐰"],["elephant","🐘"],["giraffe","🦒"],["duck","🦆"],["horse","🐴"],["turtle","🐢"],["snail","🐌"],["butterfly","🦋"]];
function qShadow7(){const o=sh(SIL.filter(a=>both(a[0]).length)).slice(0,lvl()<=4?3:4),t=o[0];return {game:"sil",t,o:sh(o),voice:[G7("SIL")],gid:"g:sil",factT:"That is the "+t[0]+"!"}}
function silQ(q){let miss=0;gShow(`<div class="game">${gHead("🌑","Whose shadow?","Who does this shadow belong to?")}
  <div class="g7-sil"><span>${q.t[1]}</span></div><div class="g7-opts">${q.o.map((a,i)=>`<button class="g7-o" data-i="${i}"><span>${a[1]}</span><small>${cap1(a[0])}</small></button>`).join("")}</div></div>`);gAsk(q);
  tapAll(".g7-o",b=>{if(q.done)return;const a=q.o[+b.dataset.i];if(a===q.t){$("qBody").querySelector(".g7-sil").classList.add("lit");gameWin(q,miss,b,[])}else{miss++;sfx.oops();b.classList.add("no");toastHint("Look at the shape again 👀")}});
  g7solve(()=>fire7([...$("qBody").querySelectorAll(".g7-o")].find(b=>q.o[+b.dataset.i]===q.t)))}

/* 13. Four seasons (age 4+) */
const SEAS7={spring:"🌸",summer:"☀️",autumn:"🍂",winter:"⛄"};
const SEAI=[["snowman","⛄","winter"],["sledge","🛷","winter"],["flowers","🌷","spring"],["baby birds","🐣","spring"],["beach","🏖️","summer"],["ice cream","🍦","summer"],["falling leaves","🍁","autumn"],["pumpkin","🎃","autumn"]];
function qSeasons(){const it=[];for(const s of sh(Object.keys(SEAS7)).slice(0,lvl()<=5?3:4))it.push(pickOne(SEAI.filter(x=>x[2]===s)));return {game:"seasons",items:it,voice:[G7("SEASONS")],gid:"g:seasons",factT:"A year has 4 seasons: spring, summer, autumn and winter."}}
function seasonsQ(q){let k=0,miss=0;gShow(`<div class="game">${gHead("🍂","Four seasons","Which season is it?")}
  <div class="g7-rit" id="ssI"></div><div class="g7-seas">${Object.keys(SEAS7).map(s=>`<button class="g7-s" data-s="${s}"><span>${SEAS7[s]}</span><b>${cap1(s)}</b></button>`).join("")}</div></div>`);gAsk(q);
  const show=()=>{const it=q.items[k];$("ssI").innerHTML=`<span>${it[1]}</span><small>${cap1(it[0])}</small>`};show();
  tapAll(".g7-s",b=>{if(q.done)return;const it=q.items[k];if(b.dataset.s===it[2]){sfx.tap();k++;if(k===q.items.length)gameWin(q,miss>1?1:0,b,[]);else show()}else{miss++;sfx.oops();toastHint(`${cap1(it[0])}: think again 🤔`)}});
  g7solve(()=>{const t=()=>{if(q.done)return;fire7([...$("qBody").querySelectorAll(".g7-s")].find(b=>b.dataset.s===q.items[k][2]));setTimeout(t,80)};t()})}

/* 14. Rocket countdown (age 4+) - tap the numbers counting DOWN */
function qRocket(){const top=lvl()<=5?5:10;return {game:"rocket",top,voice:[G7("ROCKET")],gid:"g:rocket",factT:"Rockets launch after a countdown!"}}
function rocketQ(q){let k=q.top,miss=0;const ns=sh(Array.from({length:q.top},(_,i)=>i+1));gShow(`<div class="game">${gHead("🚀","Rocket countdown",`Count down from ${q.top} to 1!`)}
  <div class="g7-pad"><span class="g7-rk" id="rkR">🚀</span></div><div class="g7-nums">${ns.map(n=>`<button class="g7-n" data-n="${n}">${n}</button>`).join("")}</div></div>`);gAsk(q);
  tapAll(".g7-n",b=>{if(q.done||b.dataset.done)return;const n=+b.dataset.n;if(n===k){b.dataset.done=1;b.classList.add("ok");sfx.tap();sayseq([N(n)].filter(Boolean),()=>{});k--;if(!k){$("rkR").classList.add("go");setTimeout(()=>gameWin(q,miss>1?1:0,$("rkR"),[]),1100)}}else{miss++;sfx.oops();toastHint(`Next is ${k}`)}});
  g7solve(()=>{const t=()=>{if(q.done||!k)return;fire7([...$("qBody").querySelectorAll(".g7-n")].find(b=>+b.dataset.n===k));setTimeout(t,60)};t()})}

/* 15. Butterfly symmetry (age 5+) - colour the right wing like the left */
function qSym(){const R=4,C=2,on=new Set();while(on.size<(lvl()<=6?3:5))on.add(ri(0,R*C-1));return {game:"sym",R,C,on:[...on],voice:[G7("SYM")],gid:"g:sym",factT:"Both halves of a butterfly look the same. That is symmetry."}}
function symQ(q){let miss=0;const pick=new Set();const cell=(r,c,side)=>{const i=r*q.C+c;return `<i class="g7-y ${side==="L"&&q.on.includes(i)?"on":""}" data-i="${side==="R"?r*q.C+(q.C-1-c):""}"></i>`};
  gShow(`<div class="game">${gHead("🦋","Butterfly wings","Make the right wing match the left wing!")}
  <div class="g7-fly"><div class="g7-wing">${Array.from({length:q.R},(_,r)=>Array.from({length:q.C},(_,c)=>cell(r,c,"L")).join("")).join("")}</div><span class="g7-body"></span><div class="g7-wing R">${Array.from({length:q.R},(_,r)=>Array.from({length:q.C},(_,c)=>cell(r,c,"R")).join("")).join("")}</div></div>
  <div class="mx-row">${g7btn("syC","Check ✓")}</div></div>`);gAsk(q);
  $("qBody").querySelectorAll(".g7-wing.R .g7-y").forEach(c=>c.onpointerdown=e=>{e.preventDefault();if(q.done)return;const i=+c.dataset.i;pick.has(i)?pick.delete(i):pick.add(i);c.classList.toggle("on");sfx.tap()});
  $("syC").onclick=()=>{if(q.done)return;const ok=pick.size===q.on.length&&q.on.every(i=>pick.has(i));if(ok)gameWin(q,miss,$("qBody").querySelector(".g7-fly"),[]);else{miss++;sfx.oops();toastHint("Look at each row of the left wing 🦋")}};
  g7solve(()=>{$("qBody").querySelectorAll(".g7-wing.R .g7-y").forEach(c=>{const i=+c.dataset.i;if(q.on.includes(i)!==pick.has(i))fire7(c)});$("syC").click()})}

/* 16. Make the sandwich (age 4+) - remember the order */
const LAYR=[["bread","🍞"],["cheese","🧀"],["tomato","🍅"],["lettuce","🥬"],["egg","🥚"],["cucumber","🥒"]];
function qSand(){const k=lvl()<=5?3:4,mid=sh(LAYR.slice(1)).slice(0,k-1);return {game:"sand",rec:[LAYR[0],...mid],voice:[G7("SAND")],gid:"g:sand",factT:"Good memory! You made it in the right order."}}
function sandQ(q){let k=0,miss=0,hide=false;const opts=sh([...q.rec,...sh(LAYR.filter(x=>!q.rec.includes(x))).slice(0,2)]);
  gShow(`<div class="game">${gHead("🥪","Make the sandwich","Look at the recipe, then make it!")}
  <div class="g7-rec" id="sdR">${q.rec.map(x=>`<span>${x[1]}</span>`).join("")}</div><div class="g7-plate" id="sdP"></div>
  <div class="g7-ing">${opts.map(x=>`<button class="g7-g" data-n="${x[0]}" disabled><span>${x[1]}</span><small>${cap1(x[0])}</small></button>`).join("")}</div>
  <div class="mx-row">${g7btn("sdG","I remember! 👍")}</div></div>`);gAsk(q);
  $("sdG").onclick=()=>{if(hide)return;hide=true;$("sdR").classList.add("hid");$("sdG").style.visibility="hidden";$("qBody").querySelectorAll(".g7-g").forEach(b=>b.disabled=false)};
  tapAll(".g7-g",b=>{if(q.done||!hide)return;if(b.dataset.n===q.rec[k][0]){$("sdP").insertAdjacentHTML("beforeend",`<span>${q.rec[k][1]}</span>`);sfx.tap();k++;if(k===q.rec.length){$("sdR").classList.remove("hid");gameWin(q,miss>1?1:0,$("sdP"),[])}}else{miss++;sfx.oops();toastHint("Not that one yet 🤔");if(miss>=3){$("sdR").classList.remove("hid");setTimeout(()=>$("sdR").classList.add("hid"),1500)}}});
  g7solve(()=>{$("sdG").click();const t=()=>{if(q.done)return;fire7([...$("qBody").querySelectorAll(".g7-g")].find(b=>b.dataset.n===q.rec[k][0]));setTimeout(t,60)};t()})}

/* 17. Hide and seek cups (age 3+) */
function qCups(){return {game:"cups",a:pickOne(["🐰","🐥","🐭","🐞"]),sw:lvl()<=4?3:5,voice:[G7("CUPS")],gid:"g:cups",factT:"You kept your eyes on it!"}}
function cupsQ(q){let pos=[0,1,2],at=ri(0,2),ready=false,miss=0;gShow(`<div class="game">${gHead("🥤","Hide and seek","Watch the cups. Where is the friend?")}
  <div class="g7-cups" id="cpW">${[0,1,2].map(i=>`<button class="g7-cup" data-i="${i}" style="--x:${i}"><span class="g7-hid">${i===at?q.a:""}</span><b>🥤</b></button>`).join("")}</div>
  <div class="mx-row">${g7btn("cpS","Start! 🔀")}</div></div>`);gAsk(q);
  const C=[...$("qBody").querySelectorAll(".g7-cup")],place=()=>C.forEach((c,i)=>c.style.setProperty("--x",pos[i]));
  $("cpS").onclick=()=>{if(ready||q.done)return;$("cpS").style.visibility="hidden";C.forEach(c=>c.classList.add("down"));let n=0;const step=()=>{if(!$("cpW"))return;if(n>=q.sw){ready=true;return}const a=ri(0,2),b=(a+ri(1,2))%3;const ia=pos.indexOf(a),ib=pos.indexOf(b);[pos[ia],pos[ib]]=[pos[ib],pos[ia]];place();sfx.tap();n++;setTimeout(step,lvl()<=4?750:550)};setTimeout(step,700)};
  tapAll(".g7-cup",b=>{if(q.done||!ready)return;const i=+b.dataset.i;b.classList.remove("down");if(i===at){gameWin(q,miss,b,[])}else{miss++;sfx.oops();toastHint("Not here! Try another cup");setTimeout(()=>b.classList.add("down"),700)}});
  g7solve(()=>{ready=true;fire7(C[at])})}

/* 18. My day (age 4+) - morning, afternoon or night? */
const DAYI=[["wake up","🌅","morning"],["breakfast","🥣","morning"],["brush teeth","🪥","morning"],["lunch","🍽️","afternoon"],["play in the park","🛝","afternoon"],["moon and stars","🌙","night"],["go to bed","🛏️","night"],["pyjamas","🧸","night"]];
const DAYP={morning:"🌅",afternoon:"☀️",night:"🌙"};
function qMyDay(){const it=[];for(const p of sh(Object.keys(DAYP)))it.push(pickOne(DAYI.filter(x=>x[2]===p)));return {game:"myday",items:it,voice:[G7("MYDAY")],gid:"g:myday",factT:"We wake up in the morning and sleep at night."}}
function mydayQ(q){let k=0,miss=0;gShow(`<div class="game">${gHead("🕰️","My day","When do we do this?")}
  <div class="g7-rit" id="mdI"></div><div class="g7-seas">${Object.keys(DAYP).map(s=>`<button class="g7-s" data-s="${s}"><span>${DAYP[s]}</span><b>${cap1(s)}</b></button>`).join("")}</div></div>`);gAsk(q);
  const show=()=>{const it=q.items[k];$("mdI").innerHTML=`<span>${it[1]}</span><small>${cap1(it[0])}</small>`};show();
  tapAll(".g7-s",b=>{if(q.done)return;const it=q.items[k];if(b.dataset.s===it[2]){sfx.tap();k++;if(k===q.items.length)gameWin(q,miss>1?1:0,b,[]);else show()}else{miss++;sfx.oops();toastHint("Think about your day 🤔")}});
  g7solve(()=>{const t=()=>{if(q.done)return;fire7([...$("qBody").querySelectorAll(".g7-s")].find(b=>b.dataset.s===q.items[k][2]));setTimeout(t,80)};t()})}

/* 19. Letter post office (age 5+) - big letter to its small letter */
function qPost(){const ls=sh("abcdefghijklmnoprstuw".split("")).slice(0,lvl()<=6?3:4);return {game:"post",ls,voice:[G7("POST")],gid:"g:post",factT:"Every letter has a big and a small shape, like B and b."}}
function postQ(q){let k=0,miss=0;gShow(`<div class="game">${gHead("📮","Letter post","Post the big letter into its small letter box!")}
  <div class="g7-env" id="poE"></div><div class="g7-boxes">${sh(q.ls).map(l=>`<button class="g7-box" data-l="${l}"><span>📫</span><b>${l}</b></button>`).join("")}</div></div>`);gAsk(q);
  const show=()=>{$("poE").innerHTML=`<span>✉️</span><b>${q.ls[k].toUpperCase()}</b>`;sayseq(["w/LULU_LN_"+q.ls[k].toUpperCase()],()=>{})};setTimeout(show,0);
  tapAll(".g7-box",b=>{if(q.done)return;if(b.dataset.l===q.ls[k]){b.disabled=true;b.classList.add("ok");sfx.tap();k++;if(k===q.ls.length)gameWin(q,miss>1?1:0,b,[]);else show()}else{miss++;sfx.oops();toastHint(`Find small ${q.ls[k]}`)}});
  g7solve(()=>{const t=()=>{if(q.done)return;fire7([...$("qBody").querySelectorAll(".g7-box")].find(b=>b.dataset.l===q.ls[k]));setTimeout(t,80)};t()})}

/* 20. Healthy plate (age 4+) */
const FOODH=[["broccoli","🥦",1],["apple","🍎",1],["carrot","🥕",1],["fish","🐟",1],["egg","🥚",1],["banana","🍌",1],["lollipop","🍭",0],["doughnut","🍩",0],["chips","🍟",0],["fizzy drink","🥤",0]];
function qPlate(){const g=sh(FOODH.filter(f=>f[2])).slice(0,lvl()<=5?3:4),b=sh(FOODH.filter(f=>!f[2])).slice(0,3);return {game:"plate",g,items:sh([...g,...b]),voice:[G7("PLATE")],gid:"g:plate",factT:"Fruits and vegetables help us grow strong."}}
function plateQ(q){let got=0,miss=0;gShow(`<div class="game">${gHead("🍽️","Healthy plate","Fill the plate with healthy food!")}
  <div class="g7-dish" id="plD"></div><div class="g7-clo">${q.items.map((f,i)=>`<button class="g7-c" data-i="${i}"><span>${f[1]}</span><small>${cap1(f[0])}</small></button>`).join("")}</div></div>`);gAsk(q);
  tapAll(".g7-c",b=>{if(q.done||b.dataset.done)return;const f=q.items[+b.dataset.i];if(f[2]){b.dataset.done=1;b.classList.add("gone");$("plD").insertAdjacentHTML("beforeend",`<span>${f[1]}</span>`);sfx.tap();got++;if(got===q.g.length)setTimeout(()=>gameWin(q,miss>1?1:0,$("plD"),[]),300)}else{miss++;sfx.oops();toastHint("That's a treat - only sometimes 🍭")}});
  g7solve(()=>$("qBody").querySelectorAll(".g7-c").forEach(b=>{if(q.items[+b.dataset.i][2])fire7(b)}))}

/* ---------------- wiring ---------------- */
const G7F={garden:qGarden,bubcol:qBubCol,train:qTrain,fishfood:qFish,weather:qWeather,shop:qShop,bridge:qBridge,traffic:qTraffic,recycle:qRecycle,teeth:qTeeth,grow:qGrow,sil:qShadow7,seasons:qSeasons,rocket:qRocket,sym:qSym,sand:qSand,cups:qCups,myday:qMyDay,post:qPost,plate:qPlate};
Object.assign(GAMES,{garden:gardenQ,bubcol:bubcolQ,train:trainQ,fishfood:fishfoodQ,weather:weatherQ,shop:shopQ,bridge:bridgeQ,traffic:trafficQ,recycle:recycleQ,teeth:teethQ,grow:growQ,sil:silQ,seasons:seasonsQ,rocket:rocketQ,sym:symQ,sand:sandQ,cups:cupsQ,myday:mydayQ,post:postQ,plate:plateQ});
const _bf9=buildFormat;buildFormat=function(kind,cat){const F=kind.startsWith("f_")&&G7F[kind.slice(2)];return F?F(cat):_bf9(kind,cat)};
Object.assign(FMIN,{f_garden:3,f_bubcol:3,f_fishfood:3,f_weather:3,f_traffic:3,f_teeth:3,f_grow:3,f_sil:3,f_cups:3,f_train:4,f_seasons:4,f_rocket:4,f_sand:4,f_myday:4,f_plate:4,f_bridge:5,f_recycle:5,f_sym:5,f_post:5,f_shop:6});
Object.assign(FMAX,{f_teeth:6,f_garden:6,f_bubcol:6,f_fishfood:7,f_cups:7,f_grow:7});
const G7CAT={count:["f_garden","f_fishfood","f_rocket","f_train"],add:["f_shop","f_fishfood"],farm:["f_garden","f_grow","f_sil","f_sand","f_plate"],world:["f_garden","f_traffic","f_recycle","f_grow","f_weather"],animals:["f_sil","f_train","f_fishfood"],
  sky:["f_weather","f_rocket","f_seasons"],clock:["f_myday","f_seasons","f_weather"],people:["f_teeth","f_traffic","f_plate","f_weather","f_myday"],shapes:["f_bubcol","f_sym","f_bridge"],memory:["f_cups","f_sand","f_bubcol","f_sym"],robot:["f_bridge","f_traffic"],letters:["f_post"],read:["f_post"],flags:[]};
const _ff9=formatsFor0;formatsFor0=function(cat){const b=_ff9(cat);if(!G7_READY)return b;return [...b,...(G7CAT[cat]||[]).filter(k=>ageOK(k))]};
Object.assign(GMAP,{
 "g:garden":G("Water the flowers",["cog","math"],[["cre","science"]],"Water every thirsty flower and count them as they bloom.","Play"),
 "g:bubcol":G("Colour bubbles",["cog","logic"],[["phys","fine"]],"Pop only the bubbles of one colour.","Play"),
 "g:train":G("Animal train",["cog","math"],[["cog","logic"]],"Put animals on the train from smallest to biggest.","Play"),
 "g:fishfood":G("Feed the fish",["cog","math"],[["life","decide"]],"Drop exactly the number of food flakes the fish wants.","Play"),
 "g:weather":G("Dress for the weather",["life","decide"],[["cre","science"]],"Choose clothes for sunny, rainy or snowy days.","Play"),
 "g:shop":G("Toy shop",["cog","math"],[["life","decide"]],"Pay the exact price with 1, 2, 5 and 10 coins.","Play"),
 "g:bridge":G("Fix the bridge",["cog","logic"],[["cog","math"]],"Pick the plank that fits the gap exactly (measuring).","Explore"),
 "g:traffic":G("Traffic light",["life","decide"],[["phys","coord"]],"Cross only on green: stop and go with the traffic light.","Play"),
 "g:recycle":G("Recycling",["life","decide"],[["cre","science"]],"Put paper, plastic and glass into the right bin.","Play"),
 "g:teeth":G("Brush the teeth",["phys","body"],[["life","decide"]],"Brush away every germ - a healthy habit.","Play"),
 "g:grow":G("Grow a plant",["cre","science"],[["cog","math"]],"Give a seed the right amount of water and sunshine.","Explore"),
 "g:sil":G("Whose shadow?",["cog","logic"],[["lang","vocab"]],"Match a black shadow to the animal it belongs to.","Play"),
 "g:seasons":G("Four seasons",["cre","science"],[["lang","vocab"]],"Match things to spring, summer, autumn or winter.","Play"),
 "g:rocket":G("Rocket countdown",["cog","math"],[["phys","fine"]],"Count down from 5 or 10 to launch the rocket.","Play"),
 "g:sym":G("Butterfly wings",["cog","logic"],[["cre","art"]],"Colour the right wing to match the left (symmetry).","Create"),
 "g:sand":G("Make the sandwich",["cog","memory"],[["life","decide"]],"Remember a recipe, then build it in the right order.","Play"),
 "g:cups":G("Hide and seek",["cog","memory"],[["phys","coord"]],"Follow the cup with the friend under it.","Play"),
 "g:myday":G("My day",["cog","logic"],[["lang","vocab"]],"Is it morning, afternoon or night?","Play"),
 "g:post":G("Letter post",["lang","read"],[["cog","memory"]],"Post each capital letter into its small-letter box.","Play"),
 "g:plate":G("Healthy plate",["life","decide"],[["phys","body"]],"Fill a plate with healthy food, not treats.","Play")});

/* read the choices aloud in games where the child must choose between named things: each button lights up while Lulu says it */
const OPTREAD={volc:".vc-p",mix:".mx-p",weather:".g7-c",plate:".g7-c",sil:".g7-o",train:".g7-a",seasons:".g7-s",myday:".g7-s",recycle:".g7-bin",cheer:".ch-i"};
const optLabel=b=>{const e=b.querySelector("small,b");return (e?e.textContent:b.textContent).replace(/[^A-Za-z' -]/g,"").trim()};
function gReadOpts(q){const sel=OPTREAD[q.game];if(!sel)return false;const bs=[...$("qBody").querySelectorAll(sel)];if(bs.length<2)return false;
  const it=bs.map(b=>({b,c:both(optLabel(b).toLowerCase())})).filter(x=>x.c.length);if(it.length<bs.length)return false;
  const tok={};window.__optTok=tok;const lit=b=>bs.forEach(x=>x.classList.toggle("saying",x===b));
  const list=[{c:q.voice||[]},...it];let i=0;const step=()=>{if(window.__optTok!==tok||!L||L.q!==q||q.done){lit(null);return}
    if(i>=list.length){lit(null);return}const x=list[i++];lit(x.b||null);sayseq(x.c,()=>setTimeout(step,x.b?150:250))};step();return true}

/* question types also have an age: rhymes, hearing letters, clock faces and fair sharing are too hard for the youngest */
const KMIN={"letters:rhyme":5,"letters:listen":4,"clock:oclock":5,"add:share":4};
const _kf9=kindsFor;kindsFor=function(cat){const k=_kf9(cat),a=S.age||6,f=k.filter(x=>a>=(KMIN[cat+":"+x]||0));if(cat==="clock"&&a<=4&&!f.includes("season"))f.push("season");return f.length?f:k};

/* ---------------- new dynamic maths questions (v13) ---------------- */
const MQ=n=>"w/PX_MQ_"+n;
const eqH=(a,op,b,r)=>`<div class="eq"><span>${a}</span><b>${op}</b><span>${b}</span><b>=</b><span${r==="?"?' class="q"':""}>${r}</span></div>`;
const wordOpt=(t,say)=>({h:`<b class="word">${t.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</b>`,say});
const MQGEN={
 bond(){const s=S.age<=5?ri(4,8):ri(6,10),a=ri(1,s-1),r=s-a;return Object.assign({voice:[N(a),MQ("PLUSWHAT"),N(s)],cap:"",visual:eqH(a,"+","?",s).replace('<span>?</span>','<span class="q">?</span>'),layout:"row3",hint:"dots",exp:{t:`${a} + ${r} = ${s}`,v:[N(a),"w/LULU_PLUS",N(r),"w/LULU_EQUALS",N(s)]}},numOpts(r,near(r)))},
 make10(){const t=S.age>=8&&Math.random()<.4?20:10,a=ri(1,t-1),r=t-a;return Object.assign({voice:[N(a),MQ("PLUSWHAT"),N(t)],cap:`Make ${t}!`,visual:eqH(a,"+","?",t).replace('<span>?</span>','<span class="q">?</span>')+`<div class="mq-ten">${Array.from({length:t},(_,i)=>`<i class="${i<a?"on":""}"></i>`).join("")}</div>`,layout:"row3",hint:"elim",exp:{t:`${a} + ${r} = ${t}`,v:[N(a),"w/LULU_PLUS",N(r),"w/LULU_EQUALS",N(t)]}},numOpts(r,near(r)))},
 double(){const a=ri(2,S.age<=6?5:10),r=2*a;return Object.assign({voice:[N(a),"w/LULU_PLUS",N(a),MQ("HOWMUCH")],cap:"Doubles!",visual:eqH(a,"+",a,"?"),layout:"row3",hint:"elim",exp:{t:`${a} + ${a} = ${r}`,v:[N(a),"w/LULU_PLUS",N(a),"w/LULU_EQUALS",N(r)]}},numOpts(r,near(r).concat([r+2,r-2,a])))},
 half(){const r=ri(2,S.age<=7?6:10),n=2*r;return Object.assign({voice:[MQ("HALFOF"),N(n),MQ("HOWMUCH")],cap:`Half of ${n}`,visual:`<div class="mq-half"><span>${"●".repeat(r)}</span><b>|</b><span>${"●".repeat(r)}</span></div>`,layout:"row3",hint:"elim",exp:{t:`${r} + ${r} = ${n}`,v:[N(r),"w/LULU_PLUS",N(r),"w/LULU_EQUALS",N(n)]}},numOpts(r,near(r).concat([n,r+2])))},
 compare(){const a=ri(1,S.age<=6?10:20),b=Math.random()<.2?a:ri(1,S.age<=6?10:20),r=a>b?">":a<b?"<":"=";const os=[[">",MQ("GT")],["<",MQ("LT")],["=",MQ("EQ")]];
  return {voice:[MQ("COMPARE"),N(a),N(b)],cap:"Which sign fits?",visual:`<div class="eq"><span>${a}</span><span class="q">?</span><span>${b}</span></div>`,layout:"row3",hint:"elim",opts:os.map(o=>wordOpt(o[0],[o[1]])),ans:os.findIndex(o=>o[0]===r),
   exp:{t:`${a} ${r} ${b}`,v:r==="="?[N(a),"w/PX_VA",N(b),MQ("EQUALSAME")]:[N(a),"w/PX_RC_AZ",N(b),MQ(r===">"?"BIGGER":"SMALLER")]}}},
 oddeven(){const n=ri(1,S.age<=6?12:20),ev=n%2===0;return {voice:[N(n),MQ("ODDEVEN")],cap:`${n}: odd or even?`,visual:`<div class="mq-pairs">${Array.from({length:Math.ceil(n/2)},(_,i)=>`<span>${i*2+1<n?"●●":"●"}</span>`).join("")}</div>`,layout:"row3",hint:"elim",
  opts:[wordOpt("Even",[MQ("EVEN")]),wordOpt("Odd",[MQ("ODD")])],ans:ev?0:1,exp:{t:`${n} is ${ev?"even":"odd"}`,v:[N(n),MQ(ev?"ISEVEN":"ISODD")]}}},
 numline(){const a=ri(0,S.age<=6?6:10),j=ri(1,S.age<=6?4:6),r=a+j,mx=Math.max(10,r+1);return Object.assign({voice:[MQ("FROM"),N(a)||"w/LULU_N0",MQ("JUMP"),N(j),MQ("JUMPS")].filter(Boolean),cap:`Start at ${a}, jump ${j}`,
  visual:`<div class="mq-line">${Array.from({length:mx+1},(_,i)=>`<span class="${i===a?"st":""}"><em>${i===a?"▼":""}</em><b>${i}</b></span>`).join("")}</div>`,layout:"row3",hint:"elim",exp:{t:`${a} + ${j} = ${r}`,v:[N(a),"w/LULU_PLUS",N(j),"w/LULU_EQUALS",N(r)].filter(Boolean)}},numOpts(r,near(r)))},
 measure(){const L2=ri(2,S.age<=5?6:9),o=pickOne(["✏️","🐍","🥖","🖍️"]);return Object.assign({voice:[MQ("MEASURE")],cap:"How many blocks long?",visual:`<div class="mq-ms"><div class="mq-obj" style="width:${L2*30}px"><span>${o}</span></div><div class="mq-cubes">${Array.from({length:10},(_,i)=>`<i class="${i<L2?"on":""}"></i>`).join("")}</div></div>`,layout:"row3",hint:"elim",exp:{t:`${L2} blocks long`,v:[N(L2),MQ("CUBES")]}},numOpts(L2,near(L2)))}};
const MQMIN={"add:bond":5,"add:make10":6,"add:double":6,"add:half":7,"add:numline":6,"count:compare":6,"count:oddeven":6,"count:measure":5};
var MQ_READY=__MQVOICE__;
const _kfM=kindsFor;kindsFor=function(cat){const k=_kfM(cat);if(!MQ_READY)return k;const a=S.age||6;return [...k,...Object.keys(MQMIN).filter(x=>x.startsWith(cat+":")&&a>=MQMIN[x]).map(x=>x.split(":")[1])]};
const _bqM=buildQ;buildQ=function(cat,k,used){if(MQGEN[k]){const q=MQGEN[k]();q.cat=cat;q.kind=k;if(k==="compare"||k==="oddeven")q.why={t:q.exp.t,v:q.exp.v};return q}return _bqM(cat,k,used)};
Object.assign(GMAP,{
 "add.bond":G("Missing addend",["cog","math"],[["cog","logic"]],"Find the number that is missing: 3 + ? = 5.","Practice"),
 "add.make10":G("Make 10",["cog","math"],0,"Find the partner that makes 10 (or 20).","Practice"),
 "add.double":G("Doubles",["cog","math"],0,"Add a number to itself: 4 + 4.","Practice"),
 "add.half":G("Halves",["cog","math"],[["cog","logic"]],"Share a number into two equal halves.","Practice"),
 "add.numline":G("Number-line jumps",["cog","math"],[["cog","logic"]],"Start on a number line and jump forward.","Practice"),
 "count.compare":G("Bigger, smaller or equal",["cog","math"],[["cog","logic"]],"Choose >, < or = between two numbers.","Practice"),
 "count.oddeven":G("Odd or even",["cog","math"],0,"Pair the dots: is the number odd or even?","Practice"),
 "count.measure":G("Measuring with blocks",["cog","math"],[["life","everyday"]],"Measure how many blocks long a thing is.","Practice")});

/* ---------------- spaced review (v14): missed questions come back after 1, 3, 7, 14 and 30 days; known fact questions get one check-up after 2 weeks ---------------- */
const REV_INT=[1,3,7,14,30],dayNo=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);
const revKey=q=>q.wid?"w:"+q.wid:(q.kind&&!q.game&&!q.match&&!q.robot&&!String(q.kind).startsWith("f_")&&q.kind!=="w"?"k:"+q.cat+":"+q.kind:null);
const _lsR=logSk;logSk=function(q,ok){try{const k=q&&q.cat&&revKey(q);if(k){const R=S.rev||(S.rev={}),r=R[k],first=ok&&!q.tries;
  if(!first)R[k]={b:0,due:dayNo()+1,cat:q.cat,n:(r&&r.n||0)+1};
  else if(r){r.b++;if(r.b>=REV_INT.length)delete R[k];else r.due=dayNo()+REV_INT[r.b]}
  else if(k.startsWith("w:"))R[k]={b:3,due:dayNo()+14,cat:q.cat,n:0};
  const ks=Object.keys(R);if(ks.length>400)ks.sort((a,b)=>R[a].due-R[b].due).slice(0,ks.length-400).forEach(x=>delete R[x])}}catch(e){}return _lsR(q,ok)};
const _omR=openMound;openMound=function(i){_omR(i);try{if(!L||!L.queue.length||L.queue[0].radio||!S.rev)return;const cat=L.cat,now=dayNo();
  const due=Object.entries(S.rev).filter(([k,r])=>r.cat===cat&&r.due<=now).sort((a,b)=>a[1].due-b[1].due);if(!due.length)return;
  const slots=L.queue.map((q,j)=>j).filter(j=>j>0&&!L.queue[j].game&&!L.queue[j].radio),max=Math.max(1,Math.floor(L.queue.length/4));const used=new Set(L.queue.map(q=>q.wid).filter(Boolean));let n=0;
  for(const [k,r] of due){if(n>=max||!slots.length)break;let q=null;
    if(k.startsWith("w:")){const id=k.slice(2);if(used.has(id)||!wPool(cat).some(w=>w.i===id))continue;window.__fw=id;try{q=qWatcher(cat,used)}finally{window.__fw=null}if(!q||q.wid!==id)continue}
    else{const kind=k.split(":")[2];if(!kindsFor(cat).includes(kind))continue;q=buildQ(cat,kind,new Set())}
    if(!q)continue;q.cat=cat;q.kind=q.kind||(k.startsWith("w:")?"w":k.split(":")[2]);q.review=true;L.queue[slots.splice(ri(0,slots.length-1),1)[0]]=q;n++}}catch(e){}};

/* ---------------- animal fact table -> generated knowledge questions (v14) ----------------
   [name, emoji, homes, eats, cover, legs, can, cannot, baby]   (empty = we do not use that fact for this animal) */
const AFT=[["cat","🐱",["house"],["fish","meat"],"fur",4,["climb","jump"],["fly"],"milk"],["dog","🐶",["house"],["meat"],"fur",4,["swim","jump"],["fly","climb"],"milk"],
 ["cow","🐄",["farm"],["grass"],"fur",4,[],["fly","climb","jump"],"milk"],["pig","🐷",["farm"],[],"",4,[],["fly","climb"],"milk"],["hen","🐔",["farm"],["seeds"],"feathers",2,[],["swim","climb"],"eggs"],
 ["duck","🦆",["pond"],["seeds"],"feathers",2,["fly","swim"],["climb"],"eggs"],["horse","🐴",["farm"],["grass"],"fur",4,["jump"],["fly","climb"],"milk"],["sheep","🐑",["farm"],["grass"],"",4,[],["fly","climb"],"milk"],
 ["goat","🐐",["farm"],["grass"],"fur",4,["climb","jump"],["fly"],"milk"],["rabbit","🐰",[],["grass","carrots"],"fur",4,["jump"],["fly","climb"],"milk"],["mouse","🐭",[],["seeds"],"fur",4,["climb"],["fly"],"milk"],
 ["lion","🦁",["grassland"],["meat"],"fur",4,[],["fly"],"milk"],["tiger","🐯",["jungle"],["meat"],"fur",4,["swim"],["fly"],"milk"],["elephant","🐘",["grassland"],["grass","leaves"],"",4,["swim"],["fly","jump","climb"],"milk"],
 ["giraffe","🦒",["grassland"],["leaves"],"",4,[],["fly","climb"],"milk"],["zebra","🦓",["grassland"],["grass"],"",4,[],["fly","climb"],"milk"],["monkey","🐒",["jungle"],["bananas"],"fur",0,["climb","jump"],["fly"],"milk"],
 ["bear","🐻",["forest"],["fish"],"fur",4,["climb","swim"],["fly"],"milk"],["panda","🐼",["forest"],["leaves"],"fur",4,["climb"],["fly"],"milk"],["kangaroo","🦘",["grassland"],["grass"],"fur",0,["jump"],["fly","climb"],"milk"],
 ["camel","🐪",["desert"],[],"",4,[],["fly","climb"],"milk"],["fox","🦊",["forest"],["meat"],"fur",4,["jump"],["fly"],"milk"],["wolf","🐺",["forest"],["meat"],"fur",4,[],["fly","climb"],"milk"],
 ["owl","🦉",["forest"],["meat"],"feathers",2,["fly"],["swim"],"eggs"],["eagle","🦅",[],["meat","fish"],"feathers",2,["fly"],[],"eggs"],["parrot","🦜",["jungle"],["seeds"],"feathers",2,["fly","climb"],["swim"],"eggs"],
 ["penguin","🐧",["ice"],["fish"],"feathers",2,["swim"],["fly","climb"],"eggs"],["bee","🐝",["hive"],["nectar"],"",6,["fly"],["swim"],"eggs"],["butterfly","🦋",[],["nectar"],"",6,["fly"],["swim"],"eggs"],
 ["ant","🐜",[],[],"",6,["climb"],[],"eggs"],["spider","🕷️",[],["insects"],"",8,["climb"],["fly"],"eggs"],["ladybug","🐞",[],["insects"],"",6,["fly"],["swim"],"eggs"],["snail","🐌",[],["leaves"],"shell",0,[],["fly","jump"],"eggs"],
 ["frog","🐸",["pond"],["insects"],"",4,["jump","swim"],["fly"],"eggs"],["turtle","🐢",["pond","sea"],[],"shell",4,["swim"],["fly","jump","climb"],"eggs"],["snake","🐍",[],["meat"],"scales",0,[],["fly","jump"],""],
 ["crocodile","🐊",["river"],["meat","fish"],"scales",4,["swim"],["fly","climb"],"eggs"],["lizard","🦎",["desert"],["insects"],"scales",4,["climb"],["fly"],"eggs"],["fish","🐟",["sea","river"],[],"scales",0,["swim"],["fly","climb","jump"],"eggs"],
 ["shark","🦈",["sea"],["fish"],"",0,["swim"],["fly","climb"],""],["whale","🐋",["sea"],[],"",0,["swim"],["fly","climb"],"milk"],["dolphin","🐬",["sea"],["fish"],"",0,["swim","jump"],["fly","climb"],"milk"],
 ["octopus","🐙",["sea"],[],"",0,["swim"],["fly"],"eggs"],["crab","🦀",["sea"],[],"shell",0,[],["fly"],"eggs"],["bat","🦇",["cave"],["insects"],"fur",2,["fly"],[],"milk"],
 ["squirrel","🐿️",["forest"],["nuts"],"fur",4,["climb","jump"],["fly"],"milk"],["polar bear","🐻‍❄️",["ice"],["fish"],"fur",4,["swim"],["fly"],"milk"],["hippo","🦛",["river"],["grass"],"",4,["swim"],["fly","climb","jump"],"milk"]];
const APL={house:"🏠",farm:"🚜",sea:"🌊",jungle:"🌴",forest:"🌲",grassland:"🌾",desert:"🏜️",ice:"🧊",pond:"🪷",river:"🏞️",hive:"🍯",cave:"🪨"};
const inP=p=>(["farm","ice"].includes(p)?"on the ":p==="house"?"in a ":"in the ")+p,AF=n=>"w/PX_AF_"+n,AFK=s=>s.replace(/ /g,"_").toUpperCase();
var AF_READY=__AFVOICE__;
const aVoiced=a=>both(a[0]).length>0;
const aOpt=a=>({h:`<span class="oe">${a[1]}</span><small>${cap1(a[0])}</small>`,say:both(a[0])});
const aPick=(good,bad,k)=>{const g=pickOne(good.filter(aVoiced)),b=sh(bad.filter(x=>aVoiced(x)&&x!==g)).slice(0,k-1);if(!g||b.length<k-1)return null;const o=sh([g,...b]);return {g,o}};
const AQ={
 aHome(){const ys=S.age<=3?["house","farm","sea","pond"]:Object.keys(APL);const p=pickOne(ys.filter(p=>AFT.some(a=>a[2].includes(p)&&aVoiced(a))));
  const GRP=[["sea","river","pond"],["forest","jungle"],["grassland","farm"]],near=GRP.find(g=>g.includes(p))||[p];const r=aPick(AFT.filter(a=>a[2].includes(p)),AFT.filter(a=>a[2].length&&!a[2].some(h=>near.includes(h))),3);if(!r)return null;
  return {voice:[AF("Q_HOME_"+AFK(p))],cap:`Who lives ${inP(p)}? ${APL[p]}`,layout:"row3",hint:"elim",opts:r.o.map(aOpt),ans:r.o.indexOf(r.g),why:{t:`The ${r.g[0]} lives ${inP(p)}.`,v:[...both(r.g[0]),AF("F_HOME_"+AFK(p))]}}},
 aEat(){const fs=["grass","meat","fish","leaves","seeds","nectar","bananas","insects","carrots","nuts"].filter(f=>AFT.some(a=>a[3].includes(f)&&aVoiced(a)));const f=pickOne(fs);
  const r=aPick(AFT.filter(a=>a[3].includes(f)),AFT.filter(a=>a[3].length&&!a[3].includes(f)&&!(f==="meat"&&a[3].includes("fish"))&&!(f==="fish"&&a[3].includes("meat"))&&!(f==="grass"&&a[3].includes("leaves"))&&!(f==="leaves"&&a[3].includes("grass"))),3);if(!r)return null;
  return {voice:[AF("Q_EAT_"+AFK(f))],cap:`Who eats ${f}?`,layout:"row3",hint:"elim",opts:r.o.map(aOpt),ans:r.o.indexOf(r.g),why:{t:`The ${r.g[0]} eats ${f}.`,v:[...both(r.g[0]),AF("F_EAT_"+AFK(f))]}}},
 aCover(){const cs=S.age<=4?["fur","feathers","shell"]:["fur","feathers","shell","scales"];const c=pickOne(cs);
  const r=aPick(AFT.filter(a=>a[4]===c),AFT.filter(a=>a[4]&&a[4]!==c),3);if(!r)return null;
  return {voice:[AF("Q_COVER_"+AFK(c))],cap:`Who has ${c}?`,layout:"row3",hint:"elim",opts:r.o.map(aOpt),ans:r.o.indexOf(r.g),why:{t:`The ${r.g[0]} has ${c}.`,v:[...both(r.g[0]),AF("F_COVER_"+AFK(c))]}}},
 aCan(){const v=pickOne(S.age<=3?["fly","swim"]:["fly","swim","jump","climb"]);const r=aPick(AFT.filter(a=>a[6].includes(v)),AFT.filter(a=>a[7].includes(v)),3);if(!r)return null;
  return {voice:[AF("Q_CAN_"+AFK(v))],cap:`Who can ${v}?`,layout:"row3",hint:"elim",opts:r.o.map(aOpt),ans:r.o.indexOf(r.g),why:{t:`The ${r.g[0]} can ${v}.`,v:[...both(r.g[0]),AF("F_CAN_"+AFK(v))]}}},
 aYN(){const v=pickOne(["fly","swim","jump","climb"]),yes=Math.random()<.5,pool=AFT.filter(a=>aVoiced(a)&&(yes?a[6]:a[7]).includes(v)),a=pickOne(pool);if(!a)return null;
  return {voice:[...both(a[0]),AF("Q_CANYN_"+AFK(v))],cap:`Can a ${a[0]} ${v}?`,visual:`<div class="bigpic"><span class="oe" style="font-size:84px">${a[1]}</span></div>`,layout:"yn",hint:"again",tf:true,
   opts:[{h:"<span class='yn'>"+YES_B+"</span><small>Yes</small>",say:["w/LULU_SK_YES"]},{h:"<span class='yn'>"+NO_B+"</span><small>No</small>",say:["w/LULU_SK_NO"]}],ans:yes?0:1,why:{t:`The ${a[0]} ${yes?"can":"cannot"} ${v}.`,v:[...both(a[0]),AF((yes?"F_CAN_":"F_CANT_")+AFK(v))]}}},
 aBaby(){const b=pickOne(["eggs","milk"]);const r=aPick(AFT.filter(a=>a[8]===b),AFT.filter(a=>a[8]&&a[8]!==b),3);if(!r)return null;
  return {voice:[AF(b==="eggs"?"Q_EGGS":"Q_MILK")],cap:b==="eggs"?"Who lays eggs? 🥚":"Who feeds its babies milk? 🍼",layout:"row3",hint:"elim",opts:r.o.map(aOpt),ans:r.o.indexOf(r.g),why:{t:b==="eggs"?`The ${r.g[0]} lays eggs.`:`The ${r.g[0]} feeds its babies milk.`,v:[...both(r.g[0]),AF(b==="eggs"?"F_EGGS":"F_MILK")]}}},
 aLegs(){const a=pickOne(AFT.filter(a=>aVoiced(a)&&[2,4,6,8].includes(a[5])||(aVoiced(a)&&a[5]===0&&["snake","fish"].includes(a[0]))));if(!a)return null;const o=numOpts(a[5],[0,2,4,6,8].filter(x=>x!==a[5]),3);
  return Object.assign({voice:[...both(a[0]),AF("Q_LEGS")],cap:`How many legs does a ${a[0]} have?`,visual:`<div class="bigpic"><span class="oe" style="font-size:84px">${a[1]}</span></div>`,layout:"row3",hint:"elim",why:{t:`A ${a[0]} has ${a[5]} legs.`,v:[...both(a[0]),...(a[5]?[N(a[5]),AF("F_LEGS")]:[AF("F_NOLEGS")])]}},o)},
 aWhere(){const a=pickOne(AFT.filter(a=>aVoiced(a)&&a[2].length===1&&a[2][0]!=="house"));if(!a)return null;const p=a[2][0],o=sh([p,...sh(Object.keys(APL).filter(x=>x!==p&&x!=="house"&&x!=="hive"&&!(p==="sea"&&x==="river")&&!(p==="river"&&["sea","pond"].includes(x))&&!(p==="pond"&&x==="river")&&!(p==="forest"&&x==="jungle")&&!(p==="jungle"&&x==="forest"))).slice(0,2)]);
  return {voice:[...both(a[0]),AF("Q_WHERE")],cap:`Where does the ${a[0]} live?`,visual:`<div class="bigpic"><span class="oe" style="font-size:84px">${a[1]}</span></div>`,layout:"row3",hint:"elim",opts:o.map(x=>({h:`<span class="oe">${APL[x]}</span><small>${cap1(x)}</small>`,say:both(x)})),ans:o.indexOf(p),why:{t:`The ${a[0]} lives ${inP(p)}.`,v:[...both(a[0]),AF("F_HOME_"+AFK(p))]}}}};
const AQAGE={aHome:[3,6],aCan:[3,6],aEat:[4,7],aCover:[4,7],aYN:[4,7],aBaby:[5,9],aLegs:[5,9],aWhere:[5,9]};
const _kfA=kindsFor;kindsFor=function(cat){const k=_kfA(cat);if(!AF_READY||!["animals","farm"].includes(cat))return k;const a=S.age||6;
  return [...k,...Object.keys(AQAGE).filter(x=>a>=AQAGE[x][0]&&a<=AQAGE[x][1]&&(cat==="animals"||["aHome","aEat","aBaby"].includes(x)))]};
const _bqA=buildQ;buildQ=function(cat,k,used){if(AQ[k]){for(let t=0;t<8;t++){const q=AQ[k]();if(q){q.cat=cat;q.kind=k;q.exp={t:q.why.t,v:q.why.v};return q}}return _bqA(cat,"w",used)}return _bqA(cat,k,used)};
Object.assign(GMAP,{"animals.aHome":G("Who lives where?",["cre","science"],[["lang","vocab"]],"Which animal lives in the sea, on the farm, in the forest...","Explore"),
 "animals.aEat":G("Who eats what?",["cre","science"],[["cog","logic"]],"Which animal eats grass, meat, fish, nectar...","Explore"),"animals.aCover":G("Fur, feathers or scales?",["cre","science"],[["cog","logic"]],"Which animal has fur, feathers, scales or a shell.","Explore"),
 "animals.aCan":G("What can it do?",["cre","science"],[["phys","body"]],"Which animal can fly, swim, jump or climb.","Explore"),"animals.aYN":G("Can it?",["cre","science"],[["cog","logic"]],"Yes or no: can this animal fly, swim, jump or climb?","Explore"),
 "animals.aBaby":G("Eggs or milk?",["cre","science"],[["cog","curiosity"]],"Which animals lay eggs and which feed their babies milk.","Explore"),"animals.aLegs":G("How many legs?",["cog","math"],[["cre","science"]],"Count the legs of animals and insects.","Explore"),
 "animals.aWhere":G("Where does it live?",["cre","science"],[["cog","curiosity"]],"Pick the home of an animal: sea, ice, desert, jungle...","Explore"),
 "farm.aHome":G("Who lives where?",["cre","science"],[["lang","vocab"]],"Which animal lives in the sea, on the farm, in the forest...","Explore"),"farm.aEat":G("Who eats what?",["cre","science"],[["cog","logic"]],"Which animal eats grass, meat, fish, nectar...","Explore"),"farm.aBaby":G("Eggs or milk?",["cre","science"],[["cog","curiosity"]],"Which animals lay eggs and which feed their babies milk.","Explore")});

/* ---------------- upper limits (v15): the easiest question types stop at a level, so older / advanced children never get toddler questions ---------------- */
const KMAX={"count:find":6,"count:more":6,"count:less":6,"count:long":6,"count:order":8,"add:addPic":6,"add:subPic":7,"add:share":7,"add:left":8,"add:sum":8,"add:pizza":8,
 "clock:routine":6,"clock:oclock":7,"clock:season":7,"letters:abc":6,"letters:match":6,"letters:listen":7,"letters:rhyme":8,"letters:first":7,"shapes:shape":6,"shapes:color":6,"shapes:match":7,
 "farm:sound":6,"farm:match":6,"farm:fly":7,"farm:home":7,"read:balloon":8,"read:flash":9,"add:bond":8,"add:double":9,"add:make10":9,"count:measure":8,"count:compare":9,"count:oddeven":9};
const _kfX=kindsFor;kindsFor=function(cat){const k=_kfX(cat),l=lvl(),f=k.filter(x=>l<=(KMAX[cat+":"+x]||99));return f.length?f:k};

/* ---------------- maths for levels 8-12 (v15) ---------------- */
var V15_READY=__V15VOICE__;
const M2=n=>"w/PX_MQ2_"+n;
const NV0=n=>n<=20?[N(n)]:faNum(n);
function NV(n){n=Math.round(n);if(n<0)return [M2("MINUSNUM"),...NV(-n)];if(n<=100)return NV0(n);
  if(n<1000){const h=Math.floor(n/100),r=n%100;return [M2("H"+h),...(r?["w/PX_VA",...NV0(r)]:[])]}
  const k=Math.floor(n/1000),r=n%1000;return [...(k===1?[]:NV(k)),M2("THOUSAND"),...(r?["w/PX_VA",...NV(r)]:[])]}
const NVd=x=>{const s=String(x);if(!s.includes("."))return NV(+s);const [a,b]=s.split(".");return [...NV(+a),M2("POINT"),...b.split("").map(d=>N(+d))]};
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,",");
const bOpt=x=>({h:`<b class="num">${typeof x==="number"?fmt(x):x}</b>`,say:typeof x==="number"?NV(x):NVd(x)});
const bOpts=(r,c)=>{const o=sh([r,...sh([...new Set(c.filter(x=>x!==r&&(typeof x!=="number"||x>=0||r<0)))]).slice(0,3)]);return {opts:o.map(bOpt),ans:o.indexOf(r)}};
const eqV=(a,op,b)=>[...NV(a),op,...NV(b),MQ("HOWMUCH")];
const FR={"1/2":[1,2,"12"],"1/3":[1,3,"13"],"1/4":[1,4,"14"],"3/4":[3,4,"34"],"2/3":[2,3,"23"],"1/5":[1,5,"15"],"2/5":[2,5,"25"],"1/10":[1,10,"110"],"1/8":[1,8,"18"]};
const frBar=f=>{const [a,b]=FR[f];return `<span class="m2-fr"><i style="width:${a/b*100}%"></i></span>`};
const M2GEN={
 times(){const m=lvl()<=9?10:12,a=ri(2,m),b=ri(2,m),r=a*b;return Object.assign({voice:eqV(a,"w/PX_RC_TIMES",b),cap:"Multiply",visual:eqH(a,"×",b,"?"),layout:"row3",hint:"elim",exp:{t:`${a} × ${b} = ${r}`,v:[...NV(a),"w/PX_RC_TIMES",...NV(b),"w/LULU_EQUALS",...NV(r)]}},bOpts(r,[r+a,r-a,r+b,r-b,(a+1)*(b+1)]))},
 divide(){const b=ri(2,lvl()<=9?10:12),c=ri(2,10),a=b*c;return Object.assign({voice:eqV(a,M2("DIV"),b),cap:"Divide",visual:eqH(a,"÷",b,"?"),layout:"row3",hint:"elim",exp:{t:`${a} ÷ ${b} = ${c} because ${b} × ${c} = ${a}`,v:[...NV(a),M2("DIV"),...NV(b),"w/LULU_EQUALS",...NV(c)]}},bOpts(c,[c+1,c-1,c+2,b]))},
 mul2(){const a=ri(11,lvl()<=11?49:99),b=ri(2,9),r=a*b;return Object.assign({voice:eqV(a,"w/PX_RC_TIMES",b),cap:"Multiply",visual:eqH(a,"×",b,"?"),layout:"row3",hint:"elim",exp:{t:`${a} × ${b} = ${r}`,v:[...NV(a),"w/PX_RC_TIMES",...NV(b),"w/LULU_EQUALS",...NV(r)]}},bOpts(r,[r+b,r-b,r+10,r-10,a*(b+1)]))},
 big3(){const d=lvl()>=11?4:3,lo=10**(d-1),a=ri(lo,10**d-1),plus=Math.random()<.5,b=plus?ri(lo/10|0||10,10**d-1-a>lo?10**d-1-a:lo):ri(lo/10|0||10,a-1),r=plus?a+b:a-b;
  return Object.assign({voice:eqV(a,plus?"w/LULU_PLUS":"w/LULU_MINUS",b),cap:plus?"Add":"Subtract",visual:eqH(fmt(a),plus?"+":"−",fmt(b),"?"),layout:"row3",hint:"elim",exp:{t:`${fmt(a)} ${plus?"+":"−"} ${fmt(b)} = ${fmt(r)}`,v:[...NV(a),plus?"w/LULU_PLUS":"w/LULU_MINUS",...NV(b),"w/LULU_EQUALS",...NV(r)]}},bOpts(r,[r+10,r-10,r+100,r-100,r+1]))},
 fracof(){const fs=lvl()<=9?["1/2","1/4","1/3"]:["1/2","1/3","1/4","3/4","2/3","1/5","2/5","1/10"],f=pickOne(fs),[a,b,c]=FR[f],n=b*ri(2,lvl()<=9?6:12),r=n/b*a;
  return Object.assign({voice:[M2("F_"+c+"_OF"),...NV(n),MQ("HOWMUCH")],cap:`${f} of ${n}`,visual:`<div class="eq"><span>${f}</span><b>of</b><span>${n}</span><b>=</b><span class="q">?</span></div>${frBar(f)}`,layout:"row3",hint:"elim",exp:{t:`${n} ÷ ${b} = ${n/b}, so ${f} of ${n} = ${r}`,v:[...NV(n),M2("DIV"),...NV(b),"w/LULU_EQUALS",...NV(n/b)]}},bOpts(r,[n/b,r+1,r-1,n-r,r*2]))},
 fraccmp(){const ks=Object.keys(FR);let x,y;do{x=pickOne(ks);y=pickOne(ks)}while(x===y||FR[x][0]/FR[x][1]===FR[y][0]/FR[y][1]);const big=FR[x][0]/FR[x][1]>FR[y][0]/FR[y][1]?x:y,o=sh([x,y]);
  return {voice:[M2("FRACBIG")],cap:"Which fraction is bigger?",layout:"yn",hint:"elim",opts:o.map(f=>({h:`<b class="num">${f}</b>${frBar(f)}`,say:[M2("FR_"+FR[f][2])]})),ans:o.indexOf(big),why:{t:`${big} is bigger.`,v:[M2("FR_"+FR[big][2]),MQ("BIGGER")]}}},
 place(){const d=lvl()>=11?5:4;let n,s,p;do{n=ri(10**(d-1),10**d-1);s=String(n);p=ri(0,d-1)}while(s[p]==="0");const dig=+s[p],pw=d-1-p,r=dig*10**pw,c=[0,1,2,3,4].filter(x=>x!==pw&&x<d).map(x=>dig*10**x);
  return Object.assign({voice:[M2("PLACE_A"),...NV(n),M2("PLACE_B"),N(dig),M2("PLACE_C")],cap:`The value of ${dig} in ${fmt(n)}`,visual:`<div class="eq m2-pl">${s.split("").map((ch,i)=>`<span class="${i===p?"q":""}">${ch}</span>`).join("")}</div>`,layout:"row3",hint:"elim",exp:{t:`The ${dig} is worth ${fmt(r)}`,v:[...NV(r)]}},bOpts(r,c))},
 round(){const to=lvl()>=11&&Math.random()<.4?1000:Math.random()<.5?10:100,n=ri(to===1000?1001:101,to===1000?9998:999),r=Math.round(n/to)*to;
  return Object.assign({voice:[...NV(n),M2("ROUND"+to)],cap:`Round ${fmt(n)} to the nearest ${to}`,visual:`<div class="eq"><span>${fmt(n)}</span><b>≈</b><span class="q">?</span></div>`,layout:"row3",hint:"elim",exp:{t:`${fmt(n)} ≈ ${fmt(r)}`,v:[...NV(r)]}},bOpts(r,[r+to,r-to,Math.floor(n/to)*to===r?Math.ceil(n/to)*to:Math.floor(n/to)*to,n]))},
 area(){const w=ri(2,8),h=ri(2,6),per=Math.random()<.5&&lvl()>=10,r=per?2*(w+h):w*h;
  return Object.assign({voice:[M2(per?"PERIM":"AREA")],cap:per?"Perimeter (all the way round)":"Area (how many squares?)",visual:`<div class="m2-grid" style="grid-template-columns:repeat(${w},22px)">${"<i></i>".repeat(w*h)}</div><div class="m2-dim">${w} × ${h}</div>`,layout:"row3",hint:"elim",exp:{t:per?`${w} + ${h} + ${w} + ${h} = ${r}`:`${w} × ${h} = ${r}`,v:per?[...NV(w),"w/LULU_PLUS",...NV(h),"w/LULU_PLUS",...NV(w),"w/LULU_PLUS",...NV(h),"w/LULU_EQUALS",...NV(r)]:[...NV(w),"w/PX_RC_TIMES",...NV(h),"w/LULU_EQUALS",...NV(r)]}},bOpts(r,per?[w*h,w+h,r+2,r-2]:[2*(w+h),w+h,r+w,r-h]))},
 elapsed(){const h=ri(1,11),m=pickOne([0,15,30,45,10,20,40,50]),d=pickOne(lvl()<=9?[15,30,45,60]:[15,25,35,45,50,75,90]),t=h*60+m+d,H=((Math.floor(t/60)-1)%12)+1,Mm=t%60;
  const tv=(hh,mm)=>["w/PX_RC_CLOCK",N(hh),...(mm?["w/PX_VA",...NV(mm),"w/PX_RC_MIN"]:[])],ts=(hh,mm)=>`${hh}:${String(mm).padStart(2,"0")}`;
  const c=[[H,(Mm+15)%60],[((H)%12)+1,Mm],[h,(m+d)%60],[H,(Mm+45)%60]].filter(x=>!(x[0]===H&&x[1]===Mm));const seen=new Set([H+":"+Mm]),cu=sh(c).filter(x=>{const k=x[0]+":"+x[1];if(seen.has(k))return false;seen.add(k);return true});const o=[[H,Mm],...cu.slice(0,2)];
  return {voice:[M2("NOW"),N(h),...(m?["w/PX_VA",...NV(m),"w/PX_RC_MIN"]:[]),...NV(d),M2("LATER")],cap:`It is ${ts(h,m)}. What time is it ${d} minutes later?`,visual:`<div class="eq"><span>${ts(h,m)}</span><b>+</b><span>${d} min</span><b>=</b><span class="q">?</span></div>`,layout:"row3",hint:"elim",
   opts:o.map(x=>({h:`<b class="num">${ts(x[0],x[1])}</b>`,say:tv(x[0],x[1])})),ans:0,why:{t:`${ts(h,m)} + ${d} minutes = ${ts(H,Mm)}`,v:tv(H,Mm)},_o:o}},
 change(){const big=lvl()>=11,paid=big?1000:100,p=ri(big?101:11,paid-1);const r=paid-p;
  return Object.assign({voice:[M2("CH_A"),...NV(p),M2("CH_B"),...NV(paid),M2("CH_C")],cap:`A book costs ${p} coins. You pay ${paid}. Change?`,visual:`<div class="eq"><span>${paid}</span><b>−</b><span>${p}</span><b>=</b><span class="q">?</span></div>`,layout:"row3",hint:"elim",exp:{t:`${paid} − ${p} = ${r}`,v:[...NV(paid),"w/LULU_MINUS",...NV(p),"w/LULU_EQUALS",...NV(r)]}},bOpts(r,[r+10,r-10,r+1,r-1]))},
 story(){const t=ri(1,3);if(t===1){const a=ri(2,12),b=ri(2,5),c=ri(2,6),r=a+b*c;return Object.assign({voice:[M2("WP1_A"),...NV(a),M2("WP1_B"),...NV(b),M2("WP1_C"),...NV(c),M2("WP1_D")],cap:`Sara has ${a} apples. She buys ${b} bags with ${c} apples in each. How many apples now?`,layout:"row3",hint:"elim",exp:{t:`${a} + ${b} × ${c} = ${a} + ${b*c} = ${r}`,v:[...NV(a),"w/LULU_PLUS",...NV(b*c),"w/LULU_EQUALS",...NV(r)]}},bOpts(r,[(a+b)*c,a+b+c,r+c,r-c]))}
  if(t===2){const a=ri(15,40),b=ri(3,12),c=ri(3,12),r=a-b+c;return Object.assign({voice:[M2("WP2_A"),...NV(a),M2("WP2_B"),...NV(b),M2("WP2_C"),...NV(c),M2("WP2_D")],cap:`${a} people are on a bus. At the stop ${b} get off and ${c} get on. How many now?`,layout:"row3",hint:"elim",exp:{t:`${a} − ${b} + ${c} = ${r}`,v:[...NV(a),"w/LULU_MINUS",...NV(b),"w/LULU_PLUS",...NV(c),"w/LULU_EQUALS",...NV(r)]}},bOpts(r,[a+b+c,a-b-c,r+2,r-2]))}
  const b=ri(2,8),e=ri(3,9),a=b*e;return Object.assign({voice:[...NV(a),M2("WP3_A"),...NV(b),M2("WP3_B")],cap:`${a} stickers are shared equally between ${b} friends. How many each?`,layout:"row3",hint:"elim",exp:{t:`${a} ÷ ${b} = ${e}`,v:[...NV(a),M2("DIV"),...NV(b),"w/LULU_EQUALS",...NV(e)]}},bOpts(e,[e+1,e-1,a-b,b]))},
 neg(){const a=ri(-5,10),b=ri(2,10),cold=Math.random()<.6,r=cold?a-b:a+b;return Object.assign({voice:[M2("T_A"),...NV(a),M2("T_B"),...NV(b),M2(cold?"T_COLD":"T_WARM")],cap:`It is ${a}°. It gets ${b}° ${cold?"colder":"warmer"}. Now?`,visual:`<div class="m2-th">🌡️ <b>${a}°</b> ${cold?"⬇️":"⬆️"} ${b}°</div>`,layout:"row3",hint:"elim",exp:{t:`${a} ${cold?"−":"+"} ${b} = ${r}`,v:[...NV(a),cold?"w/LULU_MINUS":"w/LULU_PLUS",...NV(b),"w/LULU_EQUALS",...NV(r)]}},bOpts(r,[-r,r+1,r-1,cold?a+b:a-b]))},
 decimal(){const a=ri(10,99)/10,b=ri(10,99)/10,plus=Math.random()<.6||a<=b,r=Math.round((plus?a+b:a-b)*10)/10,f=x=>Math.round(x*10)/10;
  const o=sh([r,...sh([f(r+1),f(r-1),f(r+0.1),f(r-0.1),f(r+10)].filter(x=>x>0&&x!==r)).slice(0,3)]);
  return {voice:[...NVd(a),plus?"w/LULU_PLUS":"w/LULU_MINUS",...NVd(b),MQ("HOWMUCH")],cap:"Decimals",visual:eqH(a,plus?"+":"−",b,"?"),layout:"row3",hint:"elim",opts:o.map(x=>({h:`<b class="num">${x}</b>`,say:NVd(x)})),ans:o.indexOf(r),exp:{t:`${a} ${plus?"+":"−"} ${b} = ${r}`,v:[...NVd(a),plus?"w/LULU_PLUS":"w/LULU_MINUS",...NVd(b),"w/LULU_EQUALS",...NVd(r)]}}},
 percent(){const p=pickOne([10,25,50,75,20]),n=pickOne([20,40,60,80,100,120,200].filter(x=>x*p%100===0)),r=n*p/100;
  return Object.assign({voice:[...NV(p),M2("PCT"),...NV(n),MQ("HOWMUCH")],cap:`${p}% of ${n}`,visual:`<div class="eq"><span>${p}%</span><b>of</b><span>${n}</span><b>=</b><span class="q">?</span></div>`,layout:"row3",hint:"elim",exp:{t:`${p}% of ${n} = ${r}`,v:[...NV(p),M2("PCT"),...NV(n),"w/LULU_EQUALS",...NV(r)]}},bOpts(r,[r*2,r/2|0,n-r,r+10]))}};
/* section and level window for each type (level = age + parent's level + how well the child does) */
const M2WIN={"add:times":[8,12],"add:divide":[8,12],"add:mul2":[10,12],"add:big3":[9,12],"add:fracof":[9,12],"add:fraccmp":[9,12],"add:story":[9,12],"add:change":[9,12],"add:neg":[10,12],"add:decimal":[10,12],"add:percent":[11,12],
 "count:place":[9,12],"count:round":[9,12],"shapes:area":[9,12],"clock:elapsed":[9,12]};
const _kfM2=kindsFor;kindsFor=function(cat){const k=_kfM2(cat);if(!V15_READY)return k;const l=lvl();return [...k,...Object.keys(M2WIN).filter(x=>x.startsWith(cat+":")&&l>=M2WIN[x][0]&&l<=M2WIN[x][1]).map(x=>x.split(":")[1])]};
const _bqM2=buildQ;buildQ=function(cat,k,used){if(M2GEN[k]){const q=M2GEN[k]();if(q._o){const o=q._o;delete q._o;const j=0,perm=sh([0,1,2]);q.opts=perm.map(i=>q.opts[i]);q.ans=perm.indexOf(0)}q.cat=cat;q.kind=k;if(!q.exp&&q.why)q.exp={t:q.why.t,v:q.why.v};if(!q.why&&q.exp)q.why={t:q.exp.t,v:q.exp.v||[]};return q}return _bqM2(cat,k,used)};
Object.assign(GMAP,Object.fromEntries(Object.keys(M2WIN).map(x=>[x.replace(":","."),G({times:"Times tables",divide:"Division",mul2:"Multiplying big numbers",big3:"Big adding and taking away",fracof:"Fraction of a number",fraccmp:"Comparing fractions",story:"Two-step word problems",change:"Money and change",neg:"Negative numbers",decimal:"Decimals",percent:"Percent",place:"Place value",round:"Rounding",area:"Area and perimeter",elapsed:"Elapsed time"}[x.split(":")[1]],["cog","math"],[["cog","logic"]],"Maths for ages 9-12 (or children who are ahead).","Practice")])));

/* ---------------- English for levels 8-12 (v15): opposites, plurals, past tense, synonyms ---------------- */
const LW={opp:[["hot","cold"],["big","small"],["fast","slow"],["happy","sad"],["open","close"],["up","down"],["day","night"],["full","empty"],["light","dark"],["early","late"],["strong","weak"],["quiet","loud"],["hard","soft"],["young","old"],["tall","short"],["push","pull"],["win","lose"],["wet","dry"],["clean","dirty"],["first","last"]],
 plu:[["child","children"],["mouse","mice"],["foot","feet"],["tooth","teeth"],["man","men"],["woman","women"],["box","boxes"],["baby","babies"],["leaf","leaves"],["sheep","sheep"],["person","people"],["knife","knives"],["goose","geese"],["city","cities"],["fish","fish"]],
 past:[["go","went"],["eat","ate"],["see","saw"],["run","ran"],["swim","swam"],["write","wrote"],["sing","sang"],["take","took"],["buy","bought"],["think","thought"],["catch","caught"],["fly","flew"],["drink","drank"],["sleep","slept"],["teach","taught"]],
 syn:[["big","large"],["small","little"],["happy","glad"],["fast","quick"],["begin","start"],["end","finish"],["smart","clever"],["angry","mad"],["scared","afraid"],["shout","yell"],["gift","present"],["hard","difficult"]]};
const EW=w=>{const e=enSay(w);return e.length?e:["w/PX_EW_"+w.replace(/ /g,"_").toUpperCase()]};
const LPW=(w,r)=>[...new Set([/(s|x|ch|sh)$/.test(w)?w+"s":w+"s",w])].filter(x=>x!==r).concat(r===w?[w+"s",w+"es"]:[]).slice(0,2),LTW=(w,r)=>[w+(w.endsWith("e")?"d":"ed"),w].filter(x=>x!==r);
const LWRONG={plu:(w,r)=>[w+"s",w+"es",r.slice(0,-1)+"s"].filter(x=>x!==r&&x!==w+"s"||x!==r),past:(w,r)=>[w+"ed",w+"s",w+"ing"]};
const LGEN={};for(const t of Object.keys(LW))LGEN["w"+t]=function(){const [w,r]=pickOne(LW[t]);let wrong;
  if(t==="plu")wrong=LPW(w,r);else if(t==="past")wrong=LTW(w,r);
  else wrong=sh(LW[t].flatMap(p=>p).filter(x=>x!==w&&x!==r&&!LW[t].some(p=>p.includes(w)&&p.includes(x))));
  const o=sh([r,...[...new Set(wrong)].slice(0,2)]);
  return {voice:[M2("L_"+t.toUpperCase()),...EW(w)],cap:{opp:"Which word means the opposite?",plu:"Which is the plural (more than one)?",past:"Which is the past tense?",syn:"Which word means the same?"}[t],visual:`<div class="eq"><span>${w}</span></div>`,layout:"col",hint:"elim",
   opts:o.map(x=>({h:`<b class="word">${x}</b>`,say:EW(x)})),ans:o.indexOf(r),why:{t:`${w} → ${r}`,v:[...EW(w),...EW(r)]}}};
const LWIN={"letters:wopp":[8,12],"read:wopp":[8,12],"letters:wplu":[9,12],"read:wplu":[9,12],"letters:wpast":[10,12],"read:wpast":[10,12],"letters:wsyn":[11,12],"read:wsyn":[11,12]};
const _kfL=kindsFor;kindsFor=function(cat){const k=_kfL(cat);if(!V15_READY)return k;const l=lvl();return [...k,...Object.keys(LWIN).filter(x=>x.startsWith(cat+":")&&l>=LWIN[x][0]&&l<=LWIN[x][1]).map(x=>x.split(":")[1])]};
const _bqL=buildQ;buildQ=function(cat,k,used){if(LGEN[k]){const q=LGEN[k]();q.cat=cat;q.kind=k;q.exp={t:q.why.t,v:q.why.v};return q}return _bqL(cat,k,used)};
Object.assign(GMAP,Object.fromEntries(Object.keys(LWIN).map(x=>[x.replace(":","."),G({wopp:"Opposites",wplu:"Plurals",wpast:"Past tense",wsyn:"Same meaning (synonyms)"}[x.split(":")[1]],["lang","vocab"],[["lang","read"]],"English words for ages 9-12.","Practice")])));

/* new 9-12 kinds: the worked answer is the fact; drop generic facts that have no voice */
const _ffV15=factFor;factFor=function(q){const f=_ffV15(q);if(f&&q&&(M2GEN[q.kind]||LGEN[q.kind])&&!factV(f).length)return "";return f};
