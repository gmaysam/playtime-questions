
/* ================= Nov 9d: many new ways to ask - drag, sort, find, count, swipe, trace, catch ... ================= */
const V=c=>"w/PX_"+c;
const sayIf=w=>{try{return both(w)||[]}catch(e){return []}};
const cap1=s=>s[0].toUpperCase()+s.slice(1);
function gHint(t){const h=$("qBody").querySelector(".ghint");if(h)h.textContent=t}
/* drag with a finger (or tap the thing, then tap where it goes) */
function dragify(el,zones,onDrop,onTap){
  let sx=0,sy=0,moved=false,on=false;el.style.touchAction="none";
  const zoneAt=(x,y)=>zones().find(z=>{const r=z.getBoundingClientRect();return x>=r.left-8&&x<=r.right+8&&y>=r.top-8&&y<=r.bottom+8});
  el.addEventListener("pointerdown",e=>{if(el.dataset.done)return;e.preventDefault();on=true;moved=false;sx=e.clientX;sy=e.clientY;try{el.setPointerCapture(e.pointerId)}catch(_){}el.classList.add("drag")});
  el.addEventListener("pointermove",e=>{if(!on)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)+Math.abs(dy)>8)moved=true;if(moved){el.style.transform=`translate(${dx}px,${dy}px) scale(1.1)`;const z=zoneAt(e.clientX,e.clientY);zones().forEach(x=>x.classList.toggle("hov",x===z))}});
  const end=e=>{if(!on)return;on=false;el.classList.remove("drag");el.style.transform="";zones().forEach(x=>x.classList.remove("hov"));
    if(moved){const z=zoneAt(e.clientX,e.clientY);if(z)onDrop(z)}else onTap&&onTap()};
  el.addEventListener("pointerup",end);el.addEventListener("pointercancel",()=>{on=false;el.classList.remove("drag");el.style.transform=""});
}
const bounce=el=>{el.classList.remove("nope");void el.offsetWidth;el.classList.add("nope")};
const SKF={sort:"Sorting into groups",tapall:"Finding all of them",tcount:"Counting things",tshow:"Showing a number",swipe:"Yes or no",feed:"What animals eat",setclock:"Setting the clock",seq:"Putting things in order",dragpat:"Patterns",balance:"Balancing numbers",spy:"Finding things (I spy)",trace:"Tracing letters and numbers",whack:"Quick eyes",catch:"Catching the right ones",paint:"Colours and shapes"};
Object.assign(SKN,SKF);

/* ---------- data ---------- */
const FRUIT=[["🍎","apple"],["🍌","banana"],["🍇","grapes"],["🍓","strawberry"],["🍊","orange"],["🍉","watermelon"],["🍐","pear"],["🍒","cherries"],["🍍","pineapple"]];
const VEG=[["🥕","carrot"],["🥦","broccoli"],["🥔","potato"],["🧅","onion"],["🥬","lettuce"],["🧄","garlic"]];
const THINGS=[["🚗","car"],["⚽","ball"],["👟","shoe"],["📚","books"],["🔑","key"],["🧸","teddy bear"]];
const FLYERS=[["🐦","bird"],["🐝","bee"],["🦇","bat"],["🦋","butterfly"],["🦉","owl"],["🦅","eagle"],["🐞","ladybug"]];
const WALKERS=[["🐄","cow"],["🐶","dog"],["🐱","cat"],["🐸","frog"],["🐍","snake"],["🐢","turtle"],["🐘","elephant"],["🐷","pig"]];
const WINGS_Y=[...FLYERS,["🦆","duck"],["🐔","chicken"]];
const SEA=[["🐟","fish"],["🦈","shark"],["🐙","octopus"],["🐳","whale"],["🦀","crab"],["🐬","dolphin"]];
const FARM=[["🐄","cow"],["🐷","pig"],["🐑","sheep"],["🐴","horse"],["🐔","chicken"],["🐐","goat"]];
const LAND=[["🐄","cow"],["🐶","dog"],["🐱","cat"],["🐦","bird"],["🐝","bee"],["🐴","horse"],["🦊","fox"],["🐘","elephant"]];
const HOT=[["☀️","sun"],["🔥","fire"],["🌋","volcano"],["☕","hot tea"],["🍲","hot soup"]];
const COLD=[["❄️","snow"],["🧊","ice"],["⛄","snowman"],["🍦","ice cream"],["🥶","cold face"]];
const SKYTH=[["☀️","sun"],["🌙","moon"],["⭐","star"],["☁️","cloud"],["🚀","rocket"],["✈️","airplane"],["🌈","rainbow"]];
const SEATH=[["🐟","fish"],["🐙","octopus"],["🐳","whale"],["🦀","crab"],["🐚","shell"],["🐬","dolphin"],["⛵","boat"]];
const REDS=[["🍎","apple"],["🍓","strawberry"],["🚒","fire truck"],["🌹","rose"],["🐞","ladybug"],["🍒","cherries"],["❤️","heart"]];
const NOTRED=[["🍌","banana"],["🥦","broccoli"],["🐸","frog"],["🫐","blueberries"],["🌻","sunflower"],["🐳","whale"],["🥕","carrot"],["🌳","tree"]];
const FOOD_E={worms:"🪱",grass:"🌿",seeds:"🌾",bone:"🦴",fish:"🐟",flies:"🪰",flowers:"🌸",leaves:"🍃",mosquitoes:"🦟",apples:"🍎",mice:"🐭",eggs:"🥚",corn:"🌽"};
const EATS={bird:["worms","seeds"],cow:["grass","corn"],duck:["seeds","flies"],chicken:["corn","seeds","worms"],pig:["apples","corn","grass"],shark:["fish"],fox:["mice","eggs","apples"],dog:["bone","fish"],frog:["flies","mosquitoes"],bee:["flowers"],caterpillar:["leaves","flowers"],cat:["fish","mice","eggs"],bat:["mosquitoes","flies"],snake:["eggs","mice"]};
const SEQS=[{k:"plant",c:"From a seed to a tree",s:[["🌰","seed"],["🌱","sprout"],["🪴","little plant"],["🌳","tree"]],f:"A seed needs water, soil and sunlight to grow into a tree."},
 {k:"chick",c:"From an egg to a hen",s:[["🥚","egg"],["🐣","hatching"],["🐥","chick"],["🐔","hen"]],f:"A chick grows inside the egg for about 3 weeks before it hatches."},
 {k:"butterfly",c:"How a butterfly grows",s:[["🥚","egg"],["🐛","caterpillar"],["🦋","butterfly"]],f:"A caterpillar eats and eats, makes a chrysalis, then comes out as a butterfly."},
 {k:"life",c:"Growing up",s:[["👶","baby"],["🧒","child"],["🧑","grown-up"],["🧓","grandparent"]],f:"Everyone grows from a baby to a grown-up, little by little."},
 {k:"day",c:"From morning to night",s:[["🌅","morning"],["☀️","noon"],["🌇","evening"],["🌙","night"]],f:"The sun rises in the morning and sets in the evening."},
 {k:"size",c:"From smallest to biggest",s:[["🐜","ant"],["🐭","mouse"],["🐶","dog"],["🐘","elephant"]],v:"G_SIZE",f:"The elephant is the biggest animal that lives on land."},
 {k:"week",c:"Days of the week, in order",t:1,s:[["Mon","Monday"],["Tue","Tuesday"],["Wed","Wednesday"],["Thu","Thursday"]],f:"A week has 7 days: Monday to Sunday."},
 {k:"months",c:"Months, in order",t:1,s:[["Jan","January"],["Feb","February"],["Mar","March"],["Apr","April"]],f:"A year has 12 months."}];
const SVGSH={circle:c=>`<circle cx="50" cy="50" r="38" fill="${c}"/>`,square:c=>`<rect x="14" y="14" width="72" height="72" rx="6" fill="${c}"/>`,triangle:c=>`<polygon points="50,10 92,86 8,86" fill="${c}"/>`,
 star:c=>`<polygon points="50,6 61,38 95,38 67,58 78,92 50,71 22,92 33,58 5,38 39,38" fill="${c}"/>`};
const shSVG=(s,c,st="")=>`<svg viewBox="0 0 100 100" class="gsh"${st}>${SVGSH[s](c)}</svg>`;
const GCOLS={red:"#FF4B4B",blue:"#1CB0F6",yellow:"#FFC800",green:"#58CC02"};
const tileE=(e,l,cls="")=>`<span class="gt-e">${e}</span>${l?`<small class="gt-l">${l}</small>`:""}`;

/* ---------- 1. sort into two baskets ---------- */
function qSort(cat){const a=lvl(),n=a<=4?4:a<=6?6:8,sets={
  fly:["G_SORT_FLY",["🪽","Can fly"],["🚶","Can't fly"],FLYERS,WALKERS,"Birds, bats and many insects have wings to fly."],
  fruit:["G_SORT_FRUIT",["🍎","Fruit"],["🥕","Vegetable"],FRUIT,VEG,"Fruits have seeds inside. Vegetables are roots, leaves or stems we eat."],
  hot:["G_SORT_HOT",["🔥","Hot"],["❄️","Cold"],HOT,COLD,"Heat melts ice and snow into water."],
  farm:["G_SORT_FARM",["🏡","Farm"],["🌊","Sea"],FARM,SEA,"Sea animals swim; farm animals live on land with people."],
  sky:["G_SORT_SKY",["☁️","Sky"],["🌊","Sea"],SKYTH,SEATH,"Birds and planes fly in the sky; fish and whales swim in the sea."],
  num:["G_SORT_NUM",["🐭","Less than 5"],["🐘","More than 5"],[1,2,3,4].map(x=>[String(x),""]),[6,7,8,9,10].map(x=>[String(x),""]),"Numbers less than 5 come before 5 when we count."],
  letter:["G_SORT_LETTER",["🔤","Letters"],["🔢","Numbers"],"ABDEGHKMPRST".split("").map(x=>[x,""]),"1234567890".split("").map(x=>[x,""]),"Letters make words; numbers tell how many."],
  shape:["G_SORT_SHAPE",["📄","Flat"],["🧊","Solid"],[0,1,2,3,4,8,9].map(i=>[PIC("shape_"+i,"wp gsp"),""]),[12,13,14,15,16].map(i=>[PIC("shape_"+i,"wp gsp"),""]),"Flat shapes are drawn on paper. Solid shapes you can hold, like a ball or a box."]};
  const pick={count:["num"],add:["num"],letters:["letter"],read:["letter"],farm:["fly","farm"],animals:["fly","farm"],world:["fruit","hot"],sky:["sky"],shapes:a>=5?["shape"]:["fly"]}[cat]||["fruit"];
  const k=pickOne(pick),s=sets[k],A=sh(s[3]).slice(0,n/2),B=sh(s[4]).slice(0,n/2),items=sh([...A.map(x=>[...x,0]),...B.map(x=>[...x,1])]);
  return {game:"sort",set:k,bk:[s[1],s[2]],items,voice:[V(s[0])],factT:s[5]}}
function sortQ(q){
  gShow(`<div class="game">${gHead("🧺","Sort it","Put each one in the right basket")}
    <div class="srt-items">${q.items.map((x,i)=>`<div class="srt-it" data-i="${i}">${tileE(x[0],x[1])}</div>`).join("")}</div>
    <div class="srt-bk">${q.bk.map((b,j)=>`<div class="bask" data-b="${j}"><span class="bk-e">${b[0]}</span><b>${b[1]}</b><div class="bk-in"></div></div>`).join("")}</div></div>`);
  gAsk(q);let left=q.items.length,miss=0,sel=null;const B=[...$("qBody").querySelectorAll(".bask")];
  const put=(el,z)=>{if(q.done||el.dataset.done)return;const x=q.items[+el.dataset.i];
    if(+z.dataset.b===x[2]){el.dataset.done=1;sfx.good();z.querySelector(".bk-in").insertAdjacentHTML("beforeend",`<span>${x[0]}</span>`);el.classList.add("gone");hush();if(x[1])sayseq(sayIf(x[1]),()=>{});
      if(--left===0)gameWin(q,miss>1?1:0,$("qBody").querySelector(".srt-bk"))}
    else{miss++;sfx.oops();bounce(el);bounce(z)}};
  $("qBody").querySelectorAll(".srt-it").forEach(el=>dragify(el,()=>B,z=>put(el,z),()=>{sfx.tap();if(sel)sel.classList.remove("sel");sel=el;el.classList.add("sel")}));
  B.forEach(z=>z.onclick=()=>{if(sel){const s2=sel;sel.classList.remove("sel");sel=null;put(s2,z)}});
  window.__gSolve=()=>$("qBody").querySelectorAll(".srt-it").forEach(el=>put(el,B[q.items[+el.dataset.i][2]]));
}

/* ---------- 2. tap them all ---------- */
function qTapAll(cat){const a=lvl(),big=a>=5,n=big?9:6,yes=big?3:2;let k,Y,NN,v=[],f="";
  const opts={farm:["wings","water"],animals:["wings","water"],world:["fruit","red"],count:a>=6?["even"]:["shape"],letters:["letter"],read:["letter"],shapes:["shape"],sky:["shape"]}[cat]||["fruit"];k=pickOne(opts);
  if(k==="wings"){Y=WINGS_Y;NN=WALKERS;v=[V("G_TAP_WINGS")];f="Birds, bees, bats and butterflies all have wings. Chickens and ducks have wings too!"}
  if(k==="water"){Y=SEA;NN=LAND;v=[V("G_TAP_WATER")];f="Fish breathe under water with gills. Whales and dolphins come up to breathe air."}
  if(k==="fruit"){Y=FRUIT;NN=[...VEG,...THINGS];v=[V("G_TAP_FRUIT")];f="Fruits grow from flowers and have seeds inside."}
  if(k==="red"){Y=REDS;NN=NOTRED;v=[V("G_TAP_RED")];f="Red is the colour of strawberries, cherries and fire trucks."}
  if(k==="even"){const ev=sh([2,4,6,8,10,12,14,16,18,20]),od=sh([1,3,5,7,9,11,13,15,17,19]);Y=ev.map(x=>[String(x),""]);NN=od.map(x=>[String(x),""]);v=[V("G_TAP_EVEN")];f="Even numbers end in 0, 2, 4, 6 or 8."}
  if(k==="shape"){const ss=Object.keys(SVGSH),t=pickOne(ss),cs=Object.values(GCOLS);Y=sh(cs).map(c=>[shSVG(t,c),""]);NN=ss.filter(x=>x!==t).flatMap(x=>cs.map(c=>[shSVG(x,c),""]));v=[V("G_TAP_THIS"),...faSay(t)];f=SHAPE_F[t]||"";k="shape:"+t}
  if(k==="letter"){const L2=pickOne("ABCDEFGHKLMNPRST".split("")),others=sh("ABCDEFGHKLMNOPRSTUVW".split("").filter(x=>x!==L2));Y=Array(4).fill([L2,""]);NN=others.map(x=>[x,""]);v=[V("G_TAP_THIS"),...lSay(L2)];f=`${L2} is letter number ${L2.charCodeAt(0)-64} of 26.`;k="letter:"+L2}
  const items=sh([...sh(Y).slice(0,yes).map(x=>[...x,1]),...sh(NN).slice(0,n-yes).map(x=>[...x,0])]);
  const show=k.startsWith("shape")?`<span class="gsh-big">${shSVG(k.slice(6),"#4B4B4B")}</span>`:k.startsWith("letter")?`<b class="ta-big">${k.slice(7)}</b>`:"";
  const cap2=k==="wings"?"Tap every one with wings":k==="water"?"Tap every animal that lives in water":k==="fruit"?"Tap every fruit":k==="red"?"Tap every red thing":k==="even"?"Tap every even number":k.startsWith("shape")?`Tap every ${k.slice(6)}`:`Tap every ${k.slice(7)}`;
  return {game:"tapall",set:k,items,yes,voice:v,show,factT:f,cap2}}
function tapallQ(q){
  gShow(`<div class="game">${gHead("👆","Find them all",q.cap2||"Tap every one that fits")}
    <div class="ta-top">${q.show}<span class="ta-left" id="taLeft">${q.yes} left</span></div>
    <div class="ta-grid" style="grid-template-columns:repeat(3,1fr)">${q.items.map((x,i)=>`<button class="ta-it" data-i="${i}">${tileE(x[0],x[1])}</button>`).join("")}</div></div>`);
  gAsk(q);let left=q.yes,miss=0;
  $("qBody").querySelectorAll(".ta-it").forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(q.done||b.dataset.done)return;const x=q.items[+b.dataset.i];
    if(x[2]){b.dataset.done=1;b.classList.add("ok");sfx.good();hush();if(x[1])sayseq(sayIf(x[1]),()=>{});left--;$("taLeft").textContent=left?`${left} left`:"All found! 🎉";if(!left)gameWin(q,miss>1?1:0,$("qBody").querySelector(".ta-grid"))}
    else{miss++;sfx.oops();bounce(b)}});
  window.__gSolve=()=>$("qBody").querySelectorAll(".ta-it").forEach(b=>{if(q.items[+b.dataset.i][2])b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}))});
}

/* ---------- 3. tap to count, then fill the ten-frame / show a number ---------- */
const CNT_E=["🍎","🐞","⭐","🐟","🎈","🌸","🍪","🦆"];
function qTCount(show){const a=lvl(),n=show?ri(a<=4?2:4,a<=5?8:a<=6?10:15):ri(a<=4?3:4,a<=4?6:a<=6?10:12);
  return {game:show?"tshow":"tcount",n,e:pickOne(CNT_E),voice:show?[V("G_SHOW"),N(n)]:[V("G_COUNT")],factT:numFact(n)}}
function frameHTML(n){const fr=n>10?2:1;return `<div class="tf-wrap">${Array.from({length:fr},(_,f)=>`<div class="tf">${Array.from({length:10},(_,i)=>`<button class="tf-c" data-c="${f*10+i}"></button>`).join("")}</div>`).join("")}</div>`}
function tcountQ(q){const show=q.game==="tshow";
  const pos=[];if(!show){const cols=q.n<=6?3:q.n<=10?4:5;for(let i=0;i<q.n;i++)pos.push([((i%cols)+.5)/cols*100+ri(-6,6),(Math.floor(i/cols)+.5)/Math.ceil(q.n/cols)*100+ri(-6,6)])}
  gShow(`<div class="game">${gHead(show?"🔟":"🔢",show?"Show the number":"Count them",show?`Fill ${q.n} boxes`:"Tap each one to count")}
    ${show?`<div class="tc-num">${q.n}</div>`:`<div class="tc-field">${pos.map((p,i)=>`<button class="tc-o" data-i="${i}" style="left:${p[0]}%;top:${p[1]}%">${q.e}</button>`).join("")}</div><div class="tc-say" id="tcSay"></div>`}
    <div class="tc-frame" id="tcF" ${show?"":"hidden"}>${frameHTML(Math.max(q.n,10))}<button class="qcheck" id="tcGo" disabled>CHECK</button></div></div>`);
  gAsk(q);let k=0,miss=0,fill=0;
  const frame=()=>{const F=$("tcF");F.hidden=false;if(!show){$("qBody").querySelector(".tc-field").classList.add("small");sayseq([V("G_FRAME")],()=>{})}
    F.querySelectorAll(".tf-c").forEach(c=>c.onpointerdown=e=>{e.preventDefault();if(q.done)return;sfx.tap();c.classList.toggle("on");fill=F.querySelectorAll(".tf-c.on").length;$("tcGo").disabled=!fill;$("tcGo").classList.toggle("on",!!fill)});
    $("tcGo").onclick=()=>{if(q.done)return;if(fill===q.n)gameWin(q,miss,F);else{miss++;sfx.oops();bounce(F);toastHint(fill>q.n?"Too many! Take some away.":"A few more!");if(miss>=3){F.querySelectorAll(".tf-c").forEach((c,i)=>c.classList.toggle("on",i<q.n));gameLearn(q,`${q.n}`,[N(q.n)])}}}};
  if(show)frame();
  else $("qBody").querySelectorAll(".tc-o").forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(b.dataset.done||q.done)return;b.dataset.done=1;k++;b.classList.add("on");b.dataset.k=k;sfx.tap();hush();sayseq([N(k)].filter(Boolean),()=>{});$("tcSay").textContent=k;if(k===q.n)setTimeout(frame,900)});
  window.__gSolve=()=>{if(!show)$("qBody").querySelectorAll(".tc-o").forEach(b=>b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true})));
    setTimeout(()=>{$("tcF").querySelectorAll(".tf-c").forEach((c,i)=>{if(i<q.n)c.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}))});$("tcGo").click()},show?100:1500)};
}

/* ---------- 4. swipe yes / no ---------- */
function qSwipe(cat){const a=lvl(),n=a<=4?4:5,decks={
  fruit:["G_SW_FRUIT",FRUIT,[...VEG,...THINGS],"Is it a fruit?"],fly:["G_SW_FLY",FLYERS,WALKERS,"Can it fly?"],water:["G_SW_WATER",SEA,LAND,"Does it live in water?"],
  planet:["G_SW_PLANET",[1,2,3,4,5,6,7,8].map(i=>[PL_IMG(PLANET_N[i]),cap1(PLANET_N[i])]),[["☀️","Sun"],["🌙","Moon"],["⭐","Star"],["☄️","Comet"]],"Is it a planet?"],
  corner:["G_SW_CORNER",[1,2,3,4,6,8,9].map(i=>[PIC("shape_"+i,"wp gsp"),SHAPES[i]]),[0,5,14].map(i=>[PIC("shape_"+i,"wp gsp"),SHAPES[i]]),"Does it have corners?"],
  big:["G_SW_BIG",[6,7,8,9,10].map(x=>[String(x),""]),[1,2,3,4].map(x=>[String(x),""]),"Is it bigger than 5?"]};
  let k;const pk={world:["fruit"],farm:["fly","water"],animals:["fly","water"],sky:["planet"],shapes:["corner"],count:["big"],add:["big"]}[cat];
  if(cat==="flags"){const c=sh([...COUNTRIES.keys()]).slice(0,n),cards=c.map(i=>{const yes=Math.random()<.5,j=yes?i:pickOne([...COUNTRIES.keys()].filter(x=>x!==i));return [COUNTRIES[j][1],COUNTRIES[i][0]+"?",yes?1:0,ctySay(i)]});
    return {game:"swipe",deck:"flag",q2:"Is this the right flag?",cards,voice:[V("G_SW_FLAG"),V("G_SWIPE")],factT:"Every country has its own flag with its own colours and shapes."}}
  k=pickOne(pk||["fruit"]);const d=decks[k],ny=ri(Math.floor(n/2),Math.ceil(n/2)),cards=sh([...sh(d[1]).slice(0,ny).map(x=>[...x,1]),...sh(d[2]).slice(0,n-ny).map(x=>[...x,0])]);
  return {game:"swipe",deck:k,q2:d[3],cards,voice:[V(d[0]),V("G_SWIPE")],factT:{fruit:"Fruits have seeds inside.",fly:"Animals that fly have wings.",water:"Fish breathe under water with gills.",planet:"There are 8 planets. The Sun is a star and the Moon goes around the Earth.",corner:"Circles and ovals have no corners.",big:"Numbers after 5 are bigger than 5."}[k]}}
function swipeQ(q){
  gShow(`<div class="game">${gHead("👍","Yes or no?",q.q2)}
    <div class="sw-stack" id="swS"></div>
    <div class="sw-btns"><button class="sw-no" id="swN">✗ No</button><span class="sw-ct" id="swC">1 / ${q.cards.length}</span><button class="sw-yes" id="swY">Yes ✓</button></div></div>`);
  gAsk(q);let i=0,miss=0,busy=false;
  const show=()=>{const c=q.cards[i];$("swC").textContent=`${i+1} / ${q.cards.length}`;
    $("swS").innerHTML=`<div class="sw-card" id="swCard"><div class="sw-e">${c[0]}</div>${c[1]?`<b>${c[1]}</b>`:""}<span class="sw-l">✗</span><span class="sw-r">✓</span></div>`;
    const el=$("swCard");if(i>0||q.deck==="flag"){setTimeout(()=>{if(L&&L.q===q&&i<q.cards.length){if(q.deck==="flag"&&c[3])sayseq(c[3],()=>{});else if(i>0&&c[1])sayseq(sayIf(c[1].toLowerCase()),()=>{})}},i===0?3200:150)}
    let sx=0,on=false,dx=0;el.style.touchAction="none";
    el.onpointerdown=e=>{if(busy)return;on=true;sx=e.clientX;dx=0;try{el.setPointerCapture(e.pointerId)}catch(_){}};
    el.onpointermove=e=>{if(!on)return;dx=e.clientX-sx;el.style.transform=`translateX(${dx}px) rotate(${dx/14}deg)`;el.classList.toggle("lean-r",dx>40);el.classList.toggle("lean-l",dx<-40)};
    el.onpointerup=()=>{if(!on)return;on=false;if(Math.abs(dx)>70)decide(dx>0?1:0);else{el.style.transform="";el.classList.remove("lean-r","lean-l")}}};
  const decide=yes=>{if(busy||q.done)return;busy=true;const c=q.cards[i],el=$("swCard"),ok=(yes===c[2]);
    if(ok){sfx.good();el.style.transform=`translateX(${yes?420:-420}px) rotate(${yes?25:-25}deg)`;el.style.opacity="0"}
    else{miss++;sfx.oops();el.classList.add(c[2]?"was-y":"was-n");bounce(el)}
    setTimeout(()=>{busy=false;i++;if(i>=q.cards.length)gameWin(q,miss>1?1:0,$("swS"));else show()},ok?380:1100)};
  $("swY").onclick=()=>decide(1);$("swN").onclick=()=>decide(0);show();
  window.__gSolve=()=>{let k=0;const t=()=>{if(k>=q.cards.length)return;if(busy)return setTimeout(t,200);decide(q.cards[i][2]);k++;setTimeout(t,500)};t()};
}

/* ---------- 5. feed the animal ---------- */
function qFeed(){const a=lvl(),an=pickOne(Object.keys(EATS).filter(x=>AN.some(z=>z[0]===x))),ok=EATS[an],r=pickOne(ok),wr=sh(FOODS.filter(f=>!ok.includes(f))).slice(0,a<=4?2:3),foods=sh([r,...wr]);
  return {game:"feed",an,ae:AN.find(z=>z[0]===an)[1],r,foods,voice:[V("G_FEED"),...anSay(an)],factT:`${cap1(an)}s eat ${ok.join(" and ")}.`}}
function feedQ(q){const FS=f=>["w/LULU_FA_FOOD"+FOODS.indexOf(f),...enSay(f)];
  gShow(`<div class="game">${gHead("🍽️","Feed me!",`What does the ${q.an} eat?`)}
    <div class="fd-an" id="fdA"><span class="fd-e">${q.ae}</span></div>
    <div class="fd-foods">${q.foods.map((f,i)=>`<div class="fd-f" data-f="${f}"><span>${FOOD_E[f]||"🍽️"}</span><small>${f}</small></div>`).join("")}</div></div>`);
  gAsk(q);let miss=0;const A=$("fdA");
  const give=el=>{if(q.done)return;const f=el.dataset.f;
    if(f===q.r||EATS[q.an].includes(f)){el.dataset.done=1;el.classList.add("gone");A.classList.add("chomp");A.insertAdjacentHTML("beforeend",`<span class="fd-eat">${FOOD_E[f]}</span>`);hush();gameWin(q,miss,A,FS(f))}
    else{miss++;sfx.oops();A.classList.remove("spit");void A.offsetWidth;A.classList.add("spit");bounce(el);if(miss>=2){q.done=true;const rr=$("qBody").querySelector(`.fd-f[data-f="${q.r}"]`);rr&&rr.classList.add("hint");gameLearn(q,`The ${q.an} eats ${EATS[q.an].join(" or ")}`,FS(q.r))}}};
  $("qBody").querySelectorAll(".fd-f").forEach(el=>dragify(el,()=>[A],()=>give(el),()=>give(el)));
  window.__gSolve=()=>give($("qBody").querySelector(`.fd-f[data-f="${q.r}"]`));
}

/* ---------- 6. set the clock ---------- */
function qSetClock(){const a=lvl(),h=ri(1,12),m=a<=5?0:a<=6?pickOne([0,30]):pickOne([0,30,15,45]);
  return {game:"setclock",h,m,both:a>=6,voice:[V("G_CLOCK"),N(h),"w/LULU_EN"+h,...(m?["w/LULU_EN"+m]:[])].filter(Boolean),factT:m===0?`At ${h} o'clock the long hand points straight up to 12.`:m===30?"Half past: the long hand points down to the 6.":m===15?"Quarter past: the long hand points to the 3.":"Quarter to: the long hand points to the 9."}}
function setclockQ(q){let hA=((q.h+ri(3,8))%12)*30,mA=q.both?ri(1,11)*30:0;const tgtH=((q.h%12)+q.m/60)*30,tgtM=q.m*6;
  const svg=()=>{const hand=(ang,len,w,c,id)=>`<line id="${id}" x1="100" y1="100" x2="${100+len*Math.sin(ang*Math.PI/180)}" y2="${100-len*Math.cos(ang*Math.PI/180)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
    return `<svg viewBox="0 0 200 200" class="sc-svg" id="scS"><circle cx="100" cy="100" r="94" fill="#fff" stroke="#1CB0F6" stroke-width="8"/>${Array.from({length:12},(_,i)=>{const a2=(i+1)*30*Math.PI/180;return `<text x="${100+72*Math.sin(a2)}" y="${100-72*Math.cos(a2)+8}" text-anchor="middle" font-size="22" font-weight="900" fill="#4B4B4B" font-family="Nunito,sans-serif">${i+1}</text>`}).join("")}
      ${hand(mA,70,7,"#1CB0F6","scM")}${hand(hA,44,11,"#4B4B4B","scH")}<circle cx="100" cy="100" r="8" fill="#FF4B4B"/></svg>`};
  const lbl=q.m===0?`${q.h} o'clock`:q.m===30?`half past ${q.h}`:q.m===15?`quarter past ${q.h}`:`quarter to ${hh(q.h+1)}`;
  gShow(`<div class="game">${gHead("🕒","Set the clock",`Make it ${lbl}`)}<div class="sc-dig">${q.h}:${String(q.m).padStart(2,"0")}</div>
    <div class="sc-wrap" id="scW">${svg()}</div><div class="sc-tip">${q.both?"Drag the long hand and the short hand":"Drag the short hand"}</div><button class="qcheck on" id="scGo">CHECK</button></div>`);
  gAsk(q);let miss=0,drag=null;const W=$("scW");
  const ang=e=>{const r=$("scS").getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;return (Math.atan2(x,-y)*180/Math.PI+360)%360};
  const redraw=()=>{W.innerHTML=svg()};
  W.style.touchAction="none";
  W.onpointerdown=e=>{if(q.done)return;e.preventDefault();const A2=ang(e),dH=Math.abs(((A2-hA+540)%360)-180),dM=Math.abs(((A2-mA+540)%360)-180);drag=!q.both?"h":(dM<dH?"m":"h");try{W.setPointerCapture(e.pointerId)}catch(_){};W.onpointermove(e)};
  W.onpointermove=e=>{if(!drag)return;const A2=ang(e);if(drag==="h")hA=Math.round(A2/(q.both?15:30))*(q.both?15:30)%360;else mA=Math.round(A2/30)*30%360;redraw()};
  W.onpointerup=()=>{if(drag){drag=null;sfx.tap()}};
  $("scGo").onclick=()=>{if(q.done)return;const okH=Math.abs(((hA-tgtH+540)%360)-180)<=16,okM=Math.abs(((mA-tgtM+540)%360)-180)<=3;
    if(okH&&okM)gameWin(q,miss,W);else{miss++;sfx.oops();bounce(W);toastHint(!okM?"Check the long hand!":"Check the short hand!");if(miss>=3){hA=tgtH;mA=tgtM;redraw();gameLearn(q,lbl,q.voice.slice(1))}}};
  window.__gSolve=()=>{hA=tgtH;mA=tgtM;redraw();$("scGo").click()};
}

/* ---------- 7. put in order (life cycles, the day, size, weekdays) ---------- */
function qSeq(cat){const a=lvl(),pk={world:["plant","chick","life","butterfly"],animals:["chick","butterfly","size"],farm:["chick","size"],sky:["day"],clock:a>=6?["day","week","months"]:["day"],count:["size"],shapes:["size"]}[cat]||["plant"];
  const kk=pickOne(pk),s=SEQS.find(x=>x.k===kk);return {game:"seq",s,order:sh([...s.s.keys()]),voice:[V(s.v||"G_ORDER")],factT:s.f}}
function seqQ(q){const s=q.s,n=s.s.length;
  gShow(`<div class="game">${gHead("➡️","Put in order",s.c)}
    <div class="sq-slots">${s.s.map((_,i)=>`<div class="sq-sl" data-s="${i}"><small>${i+1}</small></div>`).join("")}</div>
    <div class="sq-cards">${q.order.map(i=>`<div class="sq-c${s.t?" txt":""}" data-i="${i}">${s.t?`<b>${s.s[i][0]}</b>`:`<span>${s.s[i][0]}</span>`}<small>${s.s[i][1]}</small></div>`).join("")}</div></div>`);
  gAsk(q);let at=0,miss=0;const SL=[...$("qBody").querySelectorAll(".sq-sl")];
  const place=el=>{if(q.done||el.dataset.done)return;const i=+el.dataset.i;
    if(i===at){el.dataset.done=1;sfx.tap();SL[at].innerHTML=el.innerHTML;SL[at].classList.add("ok");el.classList.add("gone");at++;if(at===n)gameWin(q,miss>1?1:0,$("qBody").querySelector(".sq-slots"))}
    else{miss++;sfx.oops();bounce(el);if(miss>=4){q.done=true;s.s.forEach((x,j)=>{SL[j].innerHTML=`<span>${x[0]}</span><small>${x[1]}</small>`;SL[j].classList.add("ok")});gameLearn(q,s.s.map(x=>x[1]).join(" → "),[])}}};
  $("qBody").querySelectorAll(".sq-c").forEach(el=>dragify(el,()=>[SL[at]].filter(Boolean),()=>place(el),()=>place(el)));
  window.__gSolve=()=>{for(let i=0;i<n;i++)place($("qBody").querySelector(`.sq-c[data-i="${i}"]`))};
}

/* ---------- 8. drag the missing piece into the pattern ---------- */
function qDragPat(){const a=lvl(),[x,y]=pickOne(PAT),z=pickOne(OBJ.filter(o=>o!==x&&o!==y)),kind=a<=4?0:ri(0,2),
  base=kind===0?[x,y]:kind===1?[x,x,y]:[x,y,z],seq=[...base,...base,...base].slice(0,kind===0?6:kind===1?6:6),gap=a<=5?seq.length-1:ri(2,seq.length-1);
  const ans=seq[gap],pieces=sh([ans,...sh([...new Set([x,y,z,...OBJ.slice(0,6)])].filter(o=>o!==ans)).slice(0,a<=4?1:2)]);
  return {game:"dragpat",seq,gap,ans,pieces,voice:[V("G_PATTERN")],factT:"A pattern repeats again and again. Can you see what repeats?"}}
function dragpatQ(q){
  gShow(`<div class="game">${gHead("🧩","Finish the pattern","Drag the missing piece in")}
    <div class="dp-row">${q.seq.map((e,i)=>i===q.gap?`<span class="dp-gap" id="dpG">?</span>`:`<span class="dp-t">${e}</span>`).join("")}</div>
    <div class="dp-pcs">${q.pieces.map(e=>`<div class="dp-p" data-e="${e}">${e}</div>`).join("")}</div></div>`);
  gAsk(q);let miss=0;const G=$("dpG");
  const put=el=>{if(q.done)return;if(el.dataset.e===q.ans){el.classList.add("gone");G.textContent=q.ans;G.classList.add("ok");gameWin(q,miss,G)}else{miss++;sfx.oops();bounce(el);bounce(G);if(miss>=2){q.done=true;G.textContent=q.ans;G.classList.add("ok");gameLearn(q,q.seq.join(" "),[])}}};
  $("qBody").querySelectorAll(".dp-p").forEach(el=>dragify(el,()=>[G],()=>put(el),()=>put(el)));
  window.__gSolve=()=>put($("qBody").querySelector(`.dp-p[data-e="${q.ans}"]`));
}

/* ---------- 9. balance scale ---------- */
function qBalance(){const a=lvl(),T=a<=4?ri(2,5):a<=6?ri(4,10):ri(8,15),g=ri(a<=4?0:1,Math.max(0,T-2));return {game:"balance",T,g,voice:[V("G_BALANCE")],factT:`${g} + ${T-g} = ${T}. Both sides weigh the same!`}}
function balanceQ(q){let add=0,miss=0,over=false;
  const blocks=(n,cls)=>Array.from({length:n},()=>`<i class="${cls}"></i>`).join("");
  gShow(`<div class="game">${gHead("⚖️","Balance it","Make both sides the same")}
    <div class="bl-eq" id="blEq"></div>
    <div class="bl-scale"><div class="bl-beam" id="blB"><div class="bl-pan l"><div class="bl-st">${blocks(q.T,"bk-l")}</div><b>${q.T}</b></div><div class="bl-pan r" id="blR"><div class="bl-st" id="blRS"></div><b id="blRN"></b></div></div><div class="bl-post"></div></div>
    <div class="bl-ctl"><button class="bl-btn" id="blM">−</button><button class="bl-add" id="blP">＋ 🟦</button></div></div>`);
  gAsk(q);
  const draw=()=>{const R=q.g+add,d=Math.max(-1,Math.min(1,(R-q.T)/Math.max(3,q.T/2)));$("blB").style.transform=`rotate(${d*12}deg)`;
    $("blRS").innerHTML=blocks(q.g,"bk-g")+blocks(add,"bk-a");$("blRN").textContent=R;$("blEq").innerHTML=lvl()>=6?`${q.g} + <b>${add||"?"}</b> = ${q.T}`:"";
    if(R===q.T&&!q.done){$("blB").classList.add("flat");setTimeout(()=>{if(q.g+add===q.T&&!q.done)gameWin(q,over?1:0,$("blB"))},600)}else $("blB").classList.remove("flat");
    if(R>q.T&&!over){over=true;miss++;toastHint("Too heavy! Take one off.")}};
  $("blP").onclick=()=>{if(q.done||add>=20)return;sfx.tap();add++;draw()};$("blM").onclick=()=>{if(q.done||!add)return;sfx.tap();add--;draw()};draw();
  window.__gSolve=()=>{add=q.T-q.g;draw()};
}

/* ---------- 10. I spy (and animal sounds) ---------- */
function qSpy(cat){const a=lvl(),n=a<=4?8:12;let pool,tgt,v,f="",bg="farm";
  if(cat==="sky"){pool=SKYN.filter(x=>skySay(x).length>1&&!["planet","galaxy","full moon"].includes(x)).map(x=>[PIC("sky_"+SKYN.indexOf(x),"wp sp-pic"),x]);bg="sky"}
  else if(cat==="flags"){pool=COUNTRIES.map((c,i)=>[c[1],c[0],i]);bg="map"}
  else if(cat==="people"){pool=JOBS.map((j,i)=>[j[1],j[0],i]);bg="town"}
  else if(cat==="world"){pool=FOODS.filter(f2=>FOOD_E[f2]).map(f2=>[FOOD_E[f2],f2]);bg="kitchen"}
  else if(cat==="shapes"){pool=Object.keys(SVGSH).flatMap(s=>Object.keys(GCOLS).map(c=>[shSVG(s,GCOLS[c]),s+"|"+c]));bg="paper"}
  else {pool=AN.map(x=>[x[1],x[0]]);bg=Math.random()<.5?"farm":"sound"}
  const t=pickOne(pool),others=sh(pool.filter(x=>x[1]!==t[1]&&!(cat==="shapes"&&false))).slice(0,n-1),items=sh([t,...others]);
  if(cat==="sky")v=skySay(t[1]);else if(cat==="flags")v=ctySay(t[2]);else if(cat==="people")v=jobSay(t[2]);else if(cat==="world")v=["w/LULU_FA_FOOD"+FOODS.indexOf(t[1]),...enSay(t[1])];
  else if(cat==="shapes"){const [s,c]=t[1].split("|");v=[...faSay(s),...faSay(c)]}else v=anSay(t[1]);
  const snd=bg==="sound"&&SOUNDS.includes(t[1]);
  return {game:"spy",items,t:t[1],bg:bg==="sound"?"farm":bg,snd,voice:snd?["w/LULU_SND_WHO","w/LULU_EN_SOUND"+SOUNDS.indexOf(t[1])]:[V("G_SPY"),...v],
    label:cat==="shapes"?(()=>{const [s,c]=t[1].split("|");return `the ${c} ${s}`})():snd?"Who makes this sound?":cap1(String(t[1])),factT:factFor({cat:cat==="animals"?"farm":cat,kind:"spy",opts:[{h:String(t[1]).split("|")[0]}],ans:0})||(cat==="world"?"Animals eat different foods: cows eat grass, bees drink nectar and frogs catch flies.":"Good eyes! Looking carefully is a super skill.")}}
function spyQ(q){const cells=q.items.length<=8?[4,2]:[4,3],[C,Rr]=cells;
  gShow(`<div class="game">${gHead(q.snd?"🔊":"🔍",q.snd?"Listen!":"I spy",q.snd?q.label:`Find ${q.label}`)}${q.snd?`<button class="qspk sp-snd" id="spSnd">🔊</button>`:""}
    <div class="sp-scene bg-${q.bg}">${q.items.map((x,i)=>{const cx=Math.max(10,Math.min(90,(i%C+.5)/C*100+ri(-6,6))),cy=Math.max(9,Math.min(91,(Math.floor(i/C)+.5)/Rr*100+ri(-7,7)));return `<button class="sp-it" data-i="${i}" style="left:${cx}%;top:${cy}%;--r:${ri(-14,14)}deg;--s:${(.8+Math.random()*.45).toFixed(2)}">${x[0]}</button>`}).join("")}</div></div>`);
  gAsk(q);if(q.snd)$("spSnd").onclick=()=>{hush();sayseq(q.voice,()=>{})};let miss=0;
  $("qBody").querySelectorAll(".sp-it").forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(q.done)return;const x=q.items[+b.dataset.i];
    if(x[1]===q.t){b.classList.add("found");gameWin(q,miss,b)}else{miss++;sfx.oops();bounce(b);if(miss>=3){q.done=true;const r=[...$("qBody").querySelectorAll(".sp-it")].find(z=>q.items[+z.dataset.i][1]===q.t);r&&r.classList.add("found");gameLearn(q,q.label,q.voice.slice(1))}}});
  window.__gSolve=()=>[...$("qBody").querySelectorAll(".sp-it")].find(z=>q.items[+z.dataset.i][1]===q.t).dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));
}

/* ---------- 11. trace a letter or a number ---------- */
function qTrace(cat){const a=lvl(),num=cat==="count"||cat==="add",ch=num?String(ri(a<=4?1:0,9)):pickOne("ABCDEFGHIJKLMNOPRSTUVWZ".split(""));
  return {game:"trace",ch,voice:[V("G_TRACE"),...(num?[N(+ch),"w/LULU_EN"+ch].filter(Boolean):lSay(ch))],factT:num?numFact(+ch):`${ch} is letter number ${ch.charCodeAt(0)-64} of 26.${"AEIOU".includes(ch)?` ${ch} is a vowel.`:""}`}}
function traceQ(q){
  gShow(`<div class="game">${gHead("✏️","Trace it","Draw over the line with your finger")}
    <div class="tr-wrap" id="trW"><canvas id="trBg"></canvas><canvas id="trInk"></canvas><div class="tr-bar"><div id="trP"></div></div></div>
    <div class="tr-btns"><button class="bl-btn" id="trClr">↺ Again</button></div></div>`);
  gAsk(q);const W=$("trW"),bg=$("trBg"),ink=$("trInk");let pts=[],mask=null,drawing=false,last=null,done=false;
  const setup=()=>{const r=W.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);[bg,ink].forEach(c=>{c.width=r.width*dpr;c.height=r.height*dpr;c.style.width=r.width+"px";c.style.height=r.height+"px"});
    const g=bg.getContext("2d"),fs=Math.min(r.width*.9,r.height*.95)*dpr;g.font=`900 ${fs}px Nunito, sans-serif`;g.textAlign="center";g.textBaseline="middle";
    g.fillStyle="#EDEDED";g.fillText(q.ch,bg.width/2,bg.height*.53);g.setLineDash([10*dpr,12*dpr]);g.lineWidth=3*dpr;g.strokeStyle="#B9B9B9";g.strokeText(q.ch,bg.width/2,bg.height*.53);
    const m=document.createElement("canvas");m.width=bg.width;m.height=bg.height;const mg=m.getContext("2d");mg.font=g.font;mg.textAlign="center";mg.textBaseline="middle";mg.fillText(q.ch,m.width/2,m.height*.53);
    const d=mg.getImageData(0,0,m.width,m.height).data,step=Math.round(9*dpr);pts=[];for(let y=0;y<m.height;y+=step)for(let x=0;x<m.width;x+=step)if(d[(y*m.width+x)*4+3]>128)pts.push([x,y]);mask=d;
    const ig=ink.getContext("2d");ig.lineCap="round";ig.lineJoin="round";ig.lineWidth=Math.max(26*dpr,fs*.11);ig.strokeStyle="rgba(28,176,246,.85)";W._dpr=dpr};
  const score=()=>{const id=ink.getContext("2d").getImageData(0,0,ink.width,ink.height).data;let hit=0;for(const [x,y] of pts)if(id[(y*ink.width+x)*4+3]>40)hit++;return pts.length?hit/pts.length:0};
  const pos=e=>{const r=ink.getBoundingClientRect();return [(e.clientX-r.left)*W._dpr,(e.clientY-r.top)*W._dpr]};
  ink.style.touchAction="none";
  ink.onpointerdown=e=>{if(done)return;e.preventDefault();drawing=true;last=pos(e);try{ink.setPointerCapture(e.pointerId)}catch(_){};const g=ink.getContext("2d");g.beginPath();g.arc(last[0],last[1],g.lineWidth/2,0,7);g.fillStyle=g.strokeStyle;g.fill()};
  ink.onpointermove=e=>{if(!drawing)return;const p=pos(e),g=ink.getContext("2d");g.beginPath();g.moveTo(last[0],last[1]);g.lineTo(p[0],p[1]);g.stroke();last=p};
  ink.onpointerup=()=>{if(!drawing)return;drawing=false;const s=score();$("trP").style.width=Math.round(Math.min(1,s/.7)*100)+"%";if(s>=.7&&!done){done=true;gameWin(q,0,W)}};
  $("trClr").onclick=()=>{sfx.tap();ink.getContext("2d").clearRect(0,0,ink.width,ink.height);$("trP").style.width="0"};
  requestAnimationFrame(()=>requestAnimationFrame(setup));
  window.__gSolve=()=>{const g=ink.getContext("2d");for(const [x,y] of pts){g.beginPath();g.arc(x,y,g.lineWidth/2,0,7);g.fill()}ink.onpointerdown=null;drawing=true;ink.onpointerup()};
}

/* ---------- 12. whack-a-mole ---------- */
function qWhack(cat){const a=lvl();let pool,t,v;
  if(cat==="letters"||cat==="read"){pool="ABCDEFGHKLMNOPRSTU".split("");t=pickOne(pool);v=lSay(t)}
  else if(cat==="count"||cat==="add"){pool=[1,2,3,4,5,6,7,8,9].map(String);t=pickOne(pool);v=[N(+t),"w/LULU_EN"+t]}
  else {pool=AN.map(x=>x[1]);const k=pickOne(AN);t=k[1];v=anSay(k[0])}
  return {game:"whack",pool,t,need:a<=4?4:5,speed:a<=4?1700:a<=6?1350:1100,voice:[V("G_WHACK"),...v.filter(Boolean)],factT:"Quick eyes! You found it every time."}}
function whackQ(q){
  gShow(`<div class="game">${gHead("🔨","Quick!",`Tap only <span class="wk-t">${q.t}</span>`)}
    <div class="wk-score" id="wkS">${"○".repeat(q.need)}</div>
    <div class="wk-grid">${Array.from({length:6},(_,i)=>`<div class="wk-h"><button class="wk-m" data-h="${i}"></button></div>`).join("")}</div></div>`);
  gAsk(q);let got=0,miss=0,tm=null;const H=[...$("qBody").querySelectorAll(".wk-m")];
  const pop=()=>{if(!L||L.q!==q||q.done){clearTimeout(tm);return}const free=H.filter(h=>!h.classList.contains("up"));if(free.length){const h=pickOne(free),isT=Math.random()<.45;h.textContent=isT?q.t:pickOne(q.pool.filter(x=>x!==q.t));h.dataset.v=h.textContent;h.classList.add("up");
      setTimeout(()=>h.classList.remove("up","hit","bad"),q.speed)}tm=setTimeout(pop,q.speed*.55)};
  H.forEach(h=>h.onpointerdown=e=>{e.preventDefault();if(!h.classList.contains("up")||q.done||h.classList.contains("hit"))return;
    if(h.dataset.v===q.t){h.classList.add("hit");sfx.good();got++;$("wkS").textContent="●".repeat(got)+"○".repeat(q.need-got);if(got>=q.need){clearTimeout(tm);gameWin(q,miss>1?1:0,$("wkS"))}}
    else{miss++;h.classList.add("bad");sfx.oops()}});
  setTimeout(pop,2600);
  window.__gSolve=()=>{const t=()=>{if(q.done)return;const h=H.find(x=>x.classList.contains("up")&&x.dataset.v===q.t&&!x.classList.contains("hit"));if(h)h.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));setTimeout(t,150)};t()};
}

/* ---------- 13. catch the falling ones ---------- */
function qCatch(cat){const a=lvl();let good,bad,v,lbl;
  if(cat==="count"||cat==="add"){good=[6,7,8,9,10].map(String);bad=[1,2,3,4].map(String);v=[V("G_CATCH_BIG")];lbl="numbers bigger than 5"}
  else if(cat==="letters"||cat==="read"){const t=pickOne("ABDEGKMPRST".split(""));good=[t];bad="ABDEGKMPRSTUZ".split("").filter(x=>x!==t);v=[V("G_CATCH_THIS"),...lSay(t)];lbl=t}
  else {good=FRUIT.map(x=>x[0]);bad=[...VEG,...THINGS].map(x=>x[0]);v=[V("G_CATCH_FRUIT")];lbl="fruit"}
  return {game:"catch",good,bad,need:a<=4?4:5,fall:a<=4?5200:a<=6?4200:3400,voice:v,lbl,factT:cat==="count"?"6, 7, 8, 9 and 10 come after 5.":lbl==="fruit"?"Fruits have seeds inside.":`You caught every ${lbl}!`}}
function catchQ(q){
  gShow(`<div class="game">${gHead("🧺","Catch!",`Catch only <b>${q.lbl}</b>`)}<div class="wk-score" id="caS">${"○".repeat(q.need)}</div>
    <div class="ca-field" id="caF"><div class="ca-bask" id="caB">🧺</div></div></div>`);
  gAsk(q);const F=$("caF"),Bk=$("caB");let bx=50,got=0,miss=0,items=[],t0=0,spawnT=0,raf=0;
  F.style.touchAction="none";const mv=e=>{const r=F.getBoundingClientRect();bx=Math.max(8,Math.min(92,(e.clientX-r.left)/r.width*100));Bk.style.left=bx+"%"};
  F.onpointerdown=e=>{e.preventDefault();mv(e);try{F.setPointerCapture(e.pointerId)}catch(_){}};F.onpointermove=e=>{if(e.buttons||e.pointerType==="touch")mv(e)};
  const spawn=()=>{const g=Math.random()<.5,v=g?pickOne(q.good):pickOne(q.bad),el=document.createElement("div");el.className="ca-it";el.textContent=v;el.style.left=ri(8,92)+"%";F.appendChild(el);items.push({el,g,y:-10,x:parseFloat(el.style.left)})};
  const caught=(it)=>{if(it.g){got++;sfx.good();$("caS").textContent="●".repeat(got)+"○".repeat(q.need-got);if(got>=q.need&&!q.done){cancelAnimationFrame(raf);gameWin(q,miss>1?1:0,Bk)}}else{miss++;sfx.oops();bounce(Bk)}};
  const tick=t=>{if(!L||L.q!==q||q.done){cancelAnimationFrame(raf);return}if(!t0)t0=t;const dt=Math.min(50,t-(tick.l||t));tick.l=t;
    if(t-spawnT>1100){spawnT=t;spawn()}
    items=items.filter(it=>{it.y+=dt/q.fall*110;it.el.style.top=it.y+"%";
      if(it.y>78&&it.y<92&&Math.abs(it.x-bx)<11){caught(it);it.el.remove();return false}
      if(it.y>105){it.el.remove();return false}return true});raf=requestAnimationFrame(tick)};
  setTimeout(()=>{raf=requestAnimationFrame(tick)},2400);
  window.__gSolve=()=>{const t=()=>{if(q.done)return;caught({g:true});setTimeout(t,120)};t()};
}

/* ---------- 14. colour by instruction ---------- */
function qPaint(){const a=lvl(),shapes=sh(Object.keys(SVGSH)),steps=shapes.slice(0,a<=4?2:3).map(s=>[s,pickOne(Object.keys(GCOLS))]);
  return {game:"paint",shapes,steps,voice:[V("G_PAINT"),...faSay(steps[0][0]),...faSay(steps[0][1])],factT:"Red, yellow and blue are the 3 main colours. Mix them to make all the others!"}}
function paintQ(q){let st=0,col=null,miss=0;
  gShow(`<div class="game">${gHead("🎨","Colour it","")}
    <div class="pt-ins" id="ptI"></div>
    <div class="pt-shapes">${q.shapes.map(s=>`<button class="pt-s" data-s="${s}">${shSVG(s,"#fff",' stroke="#4B4B4B" stroke-width="3"')}</button>`).join("")}</div>
    <div class="pt-pal">${Object.entries(GCOLS).map(([n,c])=>`<button class="pt-c" data-c="${n}" style="--c:${c}" aria-label="${n}"></button>`).join("")}</div></div>`);
  const ins=()=>{const [s,c]=q.steps[st];$("ptI").innerHTML=`Colour the <b>${s}</b> <span class="pt-sw" style="background:${GCOLS[c]}"></span> <b style="color:${GCOLS[c]}">${c}</b>`;$("qBody").querySelector(".qtitle").textContent=`Step ${st+1} of ${q.steps.length}`};
  ins();gAsk(q);
  $("qBody").querySelectorAll(".pt-c").forEach(b=>b.onpointerdown=e=>{e.preventDefault();sfx.tap();col=b.dataset.c;$("qBody").querySelectorAll(".pt-c").forEach(x=>x.classList.toggle("sel",x===b))});
  $("qBody").querySelectorAll(".pt-s").forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(q.done)return;const [s,c]=q.steps[st];
    if(!col){toastHint("First pick a colour 🎨");bounce($("qBody").querySelector(".pt-pal"));return}
    b.querySelector("svg").innerHTML=SVGSH[b.dataset.s](GCOLS[col]);
    if(b.dataset.s===s&&col===c){sfx.good();b.classList.add("done");st++;if(st>=q.steps.length)gameWin(q,miss>1?1:0,$("qBody").querySelector(".pt-shapes"));else{ins();hush();sayseq([V("G_PAINT"),...faSay(q.steps[st][0]),...faSay(q.steps[st][1])],()=>{})}}
    else{miss++;sfx.oops();bounce(b);setTimeout(()=>{if(!b.classList.contains("done"))b.querySelector("svg").innerHTML=SVGSH[b.dataset.s]("#fff")},600);toastHint(b.dataset.s!==s?`That is the ${b.dataset.s}. Find the ${s}!`:`Use ${c}!`)}});
  window.__gSolve=()=>{const t=()=>{if(q.done||st>=q.steps.length)return;const [s,c]=q.steps[st];$("qBody").querySelector(`.pt-c[data-c="${c}"]`).dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));$("qBody").querySelector(`.pt-s[data-s="${s}"]`).dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));setTimeout(t,200)};t()};
}

Object.assign(GAMES,{sort:sortQ,tapall:tapallQ,tcount:tcountQ,tshow:tcountQ,swipe:swipeQ,feed:feedQ,setclock:setclockQ,seq:seqQ,dragpat:dragpatQ,balance:balanceQ,spy:spyQ,trace:traceQ,whack:whackQ,catch:catchQ,paint:paintQ});

/* which new formats each topic gets (by age) */
function formatsFor(cat){const a=lvl(),F={
  count:["f_tcount","f_tshow","f_balance","f_whack","f_swipe",...(a>=5?["f_catch","f_sort"]:[]),...(a<=6?["f_trace"]:[]),...(a>=6?["f_tapall"]:[]),"f_seq"],
  add:["f_balance","f_tshow","f_catch","f_swipe",...(a<=5?["f_tcount"]:[])],
  clock:a>=4?["f_setclock","f_seq"]:["f_seq"],
  letters:["f_trace","f_whack","f_tapall","f_catch",...(a>=5?["f_sort"]:[])],
  read:["f_whack","f_tapall","f_catch"],
  farm:["f_feed","f_sort","f_tapall","f_swipe","f_spy","f_seq"],
  animals:["f_feed","f_spy","f_sort","f_swipe","f_seq","f_tapall"],
  world:["f_sort","f_tapall","f_swipe","f_catch","f_seq","f_spy"],
  sky:["f_sort","f_swipe","f_spy","f_seq"],
  shapes:["f_paint","f_dragpat","f_tapall","f_spy","f_swipe",...(a>=5?["f_sort"]:[])],
  people:["f_spy"],flags:["f_spy","f_swipe"]}[cat];return F||[]}
function buildFormat(kind,cat){const k=kind.slice(2);
  if(k==="sort")return qSort(cat);if(k==="tapall")return qTapAll(cat);if(k==="tcount")return qTCount(false);if(k==="tshow")return qTCount(true);
  if(k==="swipe")return qSwipe(cat);if(k==="feed")return qFeed();if(k==="setclock")return qSetClock();if(k==="seq")return qSeq(cat);if(k==="dragpat")return qDragPat();
  if(k==="balance")return qBalance();if(k==="spy")return qSpy(cat);if(k==="trace")return qTrace(cat);if(k==="whack")return qWhack(cat);if(k==="catch")return qCatch(cat);if(k==="paint")return qPaint();return null}
/* a round: about 1 in 4 classic choose-the-answer, the rest new formats; never the same format twice in a row */
function planRound(cat,count){const ks=kindsFor(cat),fs=formatsFor(cat);if(!fs.length)return null;
  const nClassic=Math.max(1,Math.round(count/4)),out=[];let fb=[],cb=[];
  const slots=sh([...Array(count).keys()]).slice(0,nClassic);
  for(let i=0;i<count;i++){let k;const prev=out[out.length-1];
    if(!slots.includes(i)){if(!fb.length)fb=sh(fs);k=fb.shift();if(k===prev&&fb.length){fb.push(k);k=fb.shift()}if(k===prev)k=null}
    if(!k){if(!cb.length)cb=sh(ks);k=cb.shift();if(k===prev&&cb.length){cb.push(k);k=cb.shift()}}
    out.push(k)}
  return out}
