
/* =====================================================================================================
   Nov 10e: MORE PLAY FOR THE YOUNGEST - little picture stories with one easy question, bubbles, peekaboo,
   shape sorter, colour the balloons, and an easy robot walk (each arrow moves the robot at once)
   ===================================================================================================== */
const TD_READY=__TDVOICE__,TV=n=>"w/PX_TD_"+n;
/* [id, sections, panels, English story, question, right [emoji,label], other [emoji,label]] */
const TSTORY=[["bunny",["animals","letters","read"],["🐰","😋","🥕","😊"],"Bunny was hungry. She found a big orange carrot. Crunch, crunch! Now Bunny is happy.","What did Bunny eat?",["🥕","carrot"],["🍦","ice cream"]],
 ["hen",["farm","animals"],["🐔","🥚","💥","🐥"],"Hen sat on her nest. Crack! A little yellow chick came out. Peep, peep!","Who came out of the egg?",["🐥","chick"],["🐶","puppy"]],
 ["moon",["sky","clock"],["🌆","🌙","⭐","😴"],"Night came. The Moon came up and the stars twinkled. Everyone went to sleep.","What comes out at night?",["🌙","Moon"],["☀️","Sun"]],
 ["apples",["count","add"],["🧸","🍎","👩","🍎🍎"],"Teddy had one apple. Then Mom gave him one more. Now Teddy has two apples!","How many apples does Teddy have?",["🍎🍎","two"],["🍎🍎🍎🍎🍎","five"]],
 ["rain",["world","sky","letters","read"],["🌧️","☔","☀️","🌈"],"It rained and rained. Then the sun came out, and a big rainbow appeared!","What came after the rain?",["🌈","rainbow"],["⛄","snowman"]],
 ["balloon",["shapes","count"],["🦆","🎈","💨","☁️"],"Duck had a red balloon. Whoosh! The wind took it up, up, up into the sky.","What colour was the balloon?",["🔴","red"],["🔵","blue"]],
 ["fire",["people","world"],["🐱","🌳","🧑‍🚒","🪜"],"Oh no, a cat is stuck in a tree! The firefighter climbed the ladder and brought the cat down.","Who helped the cat?",["🧑‍🚒","firefighter"],["🧑‍🍳","chef"]],
 ["penguin",["flags","world","animals"],["🐧","🧊","❄️","🛷"],"Penguin lives where it is very cold. Brr! He likes to slide on the ice.","Where does Penguin live?",["🧊","on the ice"],["🏜️","in the desert"]]];
function qTStory(cat,used){const pool=TSTORY.filter(s=>s[1].includes(cat)),s=pickOne(pool.length?pool:TSTORY);return {game:"tstory",s,voice:[TV("S_"+s[0])],gid:"learn.story",factT:s[3]}}
function tstoryQ(q){const [id,,pan,txt,qq,R,W]=q.s,opts=sh([R,W]);let miss=0;
  gShow(`<div class="game lrn">${gHead("📖","Little story","Listen to the story")}<div class="ts-pan">${pan.map((p,i)=>`<span class="ts-p" style="--d:${i}">${p}</span>`).join("")}</div>
    <p class="ts-txt">${txt}</p><button class="hr-play sm" id="tsP">🔊</button><div class="ts-q" id="tsQ" hidden><b>${qq}</b><div class="lr-two">${opts.map((o,j)=>`<button class="lr-p" data-j="${j}"><span class="lr-pic"><span class="lr-emo ts-o">${o[0]}</span></span><b>${o[1]}</b></button>`).join("")}</div></div></div>`);
  const P=[...$("qBody").querySelectorAll(".ts-p")];
  const tell=()=>{hush();$("tsQ").hidden=true;P.forEach(p=>p.classList.remove("in"));P.forEach((p,i)=>setTimeout(()=>p.classList.add("in"),300+i*1500));
    sayseq([TV("S_"+id)],()=>{if(!L||L.q!==q)return;P.forEach(p=>p.classList.add("in"));$("tsQ").hidden=false;if(typeof gReadList==="function"&&G8_READY&&gReadList(q,[TV("Q_"+id)],[...$("qBody").querySelectorAll(".lr-p")].map(b=>({b,c:tsSay(opts[+b.dataset.j][1])}))))return;sayseq([TV("Q_"+id)],()=>{})})};
  $("tsP").onclick=()=>{sfx.tap();tell()};setTimeout(()=>{if(L&&L.q===q)tell()},350);
  $("qBody").querySelectorAll(".lr-p").forEach(b=>b.onclick=()=>{if(q.done)return;const o=opts[+b.dataset.j];
    if(o===R){b.classList.add("ok");gameWin(q,miss,b,[])}else{miss++;q.done=true;b.classList.add("soft");const r=[...$("qBody").querySelectorAll(".lr-p")].find(x=>opts[+x.dataset.j]===R);r.classList.add("ok","show");
      sayseq([LV("HERE")],()=>{q.done=false;gameWin(q,1,r,[])})}});
  window.__gSolve=()=>{$("tsQ").hidden=false;[...$("qBody").querySelectorAll(".lr-p")].find(x=>opts[+x.dataset.j]===R).click()}}
/* ---- peekaboo: tap each bush to see who is hiding ---- */
function qPeek(cat){const T=lrThings(cat)||lrThings("animals"),items=sh(T).slice(0,3),cover=cat==="sky"?"☁️":["animals","farm","world"].includes(cat)?"🌳":"🎁";return {game:"peek",items,cover,voice:[TV("PEEK")],gid:"learn.peek",factT:items.map(t=>t.n.replace(/ is for .*/,"")).join(", ")+"!"}}
function peekQ(q){let open=0;
  gShow(`<div class="game lrn">${gHead("🙈","Peekaboo","Who is hiding?")}<div class="pk">${q.items.map((t,j)=>`<button class="pk-b" data-j="${j}"><span class="pk-in">${BIGPIC(t.p,"sm")}<b>${t.n.replace(/ is for .*/,"")}</b></span><span class="pk-c">${q.cover}</span></button>`).join("")}</div></div>`);
  gAsk(q);$("qBody").querySelectorAll(".pk-b").forEach(b=>b.onclick=()=>{if(b.classList.contains("open")||q.done)return;b.classList.add("open");sfx.tap();hush();open++;const t=q.items[+b.dataset.j];
    sayseq(t.say,()=>{if(open===q.items.length&&!q.done){q.done=true;gameWin(q,0,b,[])}})});
  window.__gSolve=()=>{q.done=true;gameWin(q,0,$("qBody").querySelector(".pk-b"),[])}}
/* ---- bubbles: pop them and hear what was inside ---- */
function qBubble(cat){const T=lrThings(cat)||lrThings("animals");return {game:"bubble",items:sh(T).slice(0,6),voice:[TV("BUBBLE")],gid:"learn.bubble",factT:"Pop, pop, pop!"}}
function bubbleQ(q){let popped=0,k=0;
  gShow(`<div class="game lrn">${gHead("🫧","Bubbles","Pop the bubbles!")}<div class="bb" id="bbF"></div></div>`);gAsk(q);const F=$("bbF");
  const spawn=()=>{if(!L||L.q!==q||q.done||k>=q.items.length)return;const t=q.items[k++],b=document.createElement("button");b.className="bb-b";b.style.left=(8+Math.random()*62)+"%";b.style.animationDuration=(7+Math.random()*2)+"s";
    b.innerHTML=BIGPIC(t.p,"sm");b.onclick=()=>{if(b.classList.contains("pop"))return;b.classList.add("pop");sfx.tap();hush();sayseq(t.say,()=>{});popped++;setTimeout(()=>b.remove(),400);if(popped===q.items.length)setTimeout(()=>gameWin(q,0,F,[]),900)};
    b.addEventListener("animationend",()=>{if(!b.classList.contains("pop")){b.remove();q.items.push(t)}});F.appendChild(b);setTimeout(spawn,1400)};
  setTimeout(spawn,900);window.__gSolve=()=>{q.done=true;gameWin(q,0,F,[])}}
/* ---- shape sorter: each shape fits only its own hole ---- */
function qSorter(){const sh3=sh([0,1,2]);return {game:"sorter",s:sh3,voice:[TV("SORTER")],gid:"learn.sorter",factT:"Circle, square and triangle each have their own home!"}}
function sorterQ(q){let done=0,miss=0;const IMG=i=>`<img src="img/w/shape_${i}.png" alt="">`;
  gShow(`<div class="game lrn">${gHead("🔺","Shape sorter","Put each shape in its home")}<div class="so-box">${[0,1,2].map(i=>`<span class="so-h" data-i="${i}">${IMG(i)}</span>`).join("")}</div>
    <div class="so-tray">${q.s.map(i=>`<div class="so-s" data-i="${i}">${IMG(i)}</div>`).join("")}</div></div>`);
  gAsk(q);const H=[...$("qBody").querySelectorAll(".so-h")];let sel=null;
  const put=(el,h)=>{if(el.dataset.done)return;if(h.dataset.i===el.dataset.i){el.dataset.done=1;el.classList.add("gone");h.classList.add("ok");sfx.tap();hush();sayseq(shSay(+el.dataset.i),()=>{});done++;sel=null;if(done===3)setTimeout(()=>gameWin(q,miss>2?1:0,$("qBody").querySelector(".so-box"),[]),700)}
    else{miss++;bounce(el)}};
  $("qBody").querySelectorAll(".so-s").forEach(el=>dragify(el,()=>H.filter(h=>!h.classList.contains("ok")),h=>put(el,h),()=>{sfx.tap();$("qBody").querySelectorAll(".so-s").forEach(x=>x.classList.toggle("sel",x===el));sel=el}));
  H.forEach(h=>h.onclick=()=>{if(sel)put(sel,h)});
  window.__gSolve=()=>$("qBody").querySelectorAll(".so-s").forEach(el=>put(el,H[+el.dataset.i]))}
/* ---- colour the balloons ---- */
function qColorIt(){return {game:"colorit",c:sh(PAINT_COLORS.filter(x=>!["black","white","brown"].includes(x[0]))).slice(0,4),voice:[TV("COLORIT")],gid:"learn.colorit",factT:"What beautiful balloons!"}}
function coloritQ(q){let cur=null,filled=0;const bal=j=>`<svg viewBox="0 0 60 90" class="ci-b" data-j="${j}"><path d="M30 4C14 4 6 18 6 32c0 18 14 30 24 34 10-4 24-16 24-34C54 18 46 4 30 4z" class="ci-f"/><path d="M30 66l-4 6h8z" class="ci-k"/><path d="M30 72c-4 6 4 10 0 16" class="ci-s"/></svg>`;
  gShow(`<div class="game lrn">${gHead("🎨","Colour it","Pick a colour, then tap a balloon")}<div class="ci-row">${[0,1,2].map(bal).join("")}</div>
    <div class="ci-pal">${q.c.map(c=>`<button class="ci-c" data-c="${c[0]}" style="--c:${c[1]}"></button>`).join("")}</div></div>`);
  gAsk(q);$("qBody").querySelectorAll(".ci-c").forEach(b=>b.onclick=()=>{cur=b.dataset.c;$("qBody").querySelectorAll(".ci-c").forEach(x=>x.classList.toggle("on",x===b));sfx.tap();hush();sayseq(both(cur),()=>{})});
  $("qBody").querySelectorAll(".ci-b").forEach(s=>s.onclick=()=>{if(!cur){$("qBody").querySelector(".ci-pal").classList.add("wig");setTimeout(()=>$("qBody").querySelector(".ci-pal").classList.remove("wig"),700);return}
    const f=s.querySelector(".ci-f");if(!s.dataset.done){s.dataset.done=1;filled++}f.style.fill=PCOL(cur);s.classList.remove("pop2");void s.getBoundingClientRect();s.classList.add("pop2");sfx.tap();
    if(filled===3&&!q.done){q.done=true;setTimeout(()=>gameWin(q,0,s,[]),800)}});
  window.__gSolve=()=>{q.done=true;gameWin(q,0,$("qBody").querySelector(".ci-row"),[])}}
/* ---- easy robot walk: every arrow tap moves the robot at once ---- */
function qRoboWalk(cat){const two=Math.random()<.5,th=typeof G4_READY!=="undefined"&&G4_READY?roboTheme(cat):"robot",v=[th==="robot"?TV("ROBOWALK"):TV("GOAL")],T=ROBO_TH[th];return two?{game:"robowalk",th,n:3,start:[0,2],goal:[2,0],voice:v,gid:"learn.robowalk",factT:"One step at a time - you did it!"}:{game:"robowalk",th,n:5,row:1,start:[0,0],goal:[4,0],voice:v,gid:"learn.robowalk",factT:"One step at a time - you did it!"}}
function robowalkQ(q){let [x,y]=q.start;const W=q.n,H=q.row||q.n;
  gShow(`<div class="game lrn">${gHead(ROBO_TH[q.th||"robot"][0],"Little trip",ROBO_TH[q.th||"robot"][3])}<div class="rw" id="rwB" style="grid-template-columns:repeat(${W},1fr);--w:${W}"></div>
    <div class="rw-pad${H>1?" x":""}">${(H>1?["u","l","r","d"]:["l","r"]).map(k=>`<button data-k="${k}" class="k${k}">${{u:"⬆️",l:"⬅️",r:"➡️",d:"⬇️"}[k]}</button>`).join("")}</div></div>`);gAsk(q);
  const draw=()=>{let h="";for(let j=0;j<H;j++)for(let i=0;i<W;i++)h+=`<span class="rw-c">${i===x&&j===y?ROBO_TH[q.th||"robot"][0]:i===q.goal[0]&&j===q.goal[1]?ROBO_TH[q.th||"robot"][1]:""}</span>`;$("rwB").innerHTML=h};draw();
  $("qBody").querySelectorAll(".rw-pad button").forEach(b=>b.onclick=()=>{if(q.done)return;const k=b.dataset.k,nx=x+(k==="r")-(k==="l"),ny=y+(k==="d")-(k==="u");
    if(nx<0||ny<0||nx>=W||ny>=H){bounce($("rwB"));return}x=nx;y=ny;sfx.tap();draw();if(x===q.goal[0]&&y===q.goal[1]){q.done=true;gameWin(q,0,$("rwB"),[])}});
  window.__gSolve=()=>{q.done=true;gameWin(q,0,$("rwB"),[])}}
Object.assign(GAMES,{tstory:tstoryQ,peek:peekQ,bubble:bubbleQ,sorter:sorterQ,colorit:coloritQ,robowalk:robowalkQ});
const _bf3=buildFormat;
buildFormat=function(kind,cat){if(kind==="f_tstory")return qTStory(cat);if(kind==="f_peek")return qPeek(cat);if(kind==="f_bubble")return qBubble(cat);if(kind==="f_sorter")return qSorter();if(kind==="f_colorit")return qColorIt();if(kind==="f_robowalk")return qRoboWalk(cat);return _bf3(kind,cat)};
/* the youngest: a varied round, stories first, only one look-and-listen */
const _pr1=planRound;
planRound=function(cat,count){if(!TD_READY||S.age>4)return _pr1(cat,count);
  if(cat==="robot"&&S.age<=3)return ["f_robowalk","f_maze","f_robowalk","f_blocks","f_bubble","f_robowalk","f_sorter"].slice(0,count);
  if(!lrOn(cat))return _pr1(cat,count);
  const play=sh(["f_peek","f_bubble","f_sorter","f_colorit"]).slice(0,3);
  if(S.age<=3){const r=["f_tstory",play[0],"f_ltog",play[1],"f_lshow",play[2],pickOne(["f_tstory","f_lfind"])];return r.slice(0,count)}
  const base=(_pr1(cat,count)||[]).map(k=>["f_lshow","f_ltog","f_lfind","f_tstory","f_peek","f_bubble","f_sorter","f_colorit"].includes(k)?pickOne(kindsFor(cat)):k);[["f_tstory",0],[play[0],3],["f_ltog",5]].forEach(([k,p])=>{if(p<base.length)base[p]=k});return base};
const _ff2=formatsFor0;formatsFor0=function(cat){const b=_ff2(cat);if(!TD_READY||S.age>4)return b;if(cat==="robot"&&S.age<=3)return [...b,"f_robowalk"];return lrOn(cat)?[...b,"f_tstory","f_peek","f_bubble","f_sorter","f_colorit"]:b};
