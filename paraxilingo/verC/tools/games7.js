
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
