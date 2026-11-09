
/* ================= Nov 9: Watcher-style play games (Simon, memory pairs, put in order, pizza, build the word) ================= */
/* what the child is learning: every answer is logged per skill for the parents' report */
const SKN={find:"Counting things",more:"More or less",less:"More or less",long:"Longer or shorter",missing:"Missing number",after:"What comes next",before:"What comes before",skip:"Skip counting",graph:"Reading a chart",order:"Putting numbers in order",
 addPic:"Adding with pictures",share:"Sharing equally",subPic:"Taking away with pictures",left:"How many are left",sum:"Adding numbers",minus:"Taking away numbers",teach:"Adding (story problems)",carry:"Adding bigger numbers",groups:"Equal groups",big:"Bigger sums",pizza:"Halves and quarters",
 routine:"Daily routine",oclock:"Time: o'clock",half:"Time: half past",quarter:"Time: quarter past / to",minutes:"Time: minutes",season:"Seasons",nowseason:"Seasons",today:"Days of the week",tomorrow:"Days of the week",week:"Days of the week",yesterday:"Days of the week",monthafter:"Months",months:"Months",
 abc:"Letters A to Z",listen:"English words by ear",match:"Matching words and pictures",rhyme:"Rhyming words",first:"First letter sounds",whatis:"Reading words",lafter:"Alphabet order",lbefore:"Alphabet order",build:"Spelling words",
 balloon:"Sight words",flash:"Sight words (quick look)",sentence:"Reading sentences",
 home:"Animal homes",sound:"Animal sounds",fly:"Animals that fly",food:"What animals eat",water:"Animals in water",pairs:"Memory (pairs)",
 shape:"Shape names",color:"Colours",pattern:"Patterns",robot:"Coding (robot path)",sides:"Sides of shapes",both:"Two clues",bigsmall:"Big and small",simon:"Memory (colours in order)",
 feel:"Feelings",piano:"Memory (piano notes)",job:"Jobs",job2:"Jobs",flag:"Flags",flag2:"Flags",w:"Facts about the world"};
const SKCAT={"clock.after":"What day comes next","clock.before":"What day came before","count.after":"What comes next","count.before":"What comes before"};
const AREA={count:["🔢","Numbers"],add:["➕","Adding & taking away"],clock:["🕒","Time & calendar"],letters:["🔤","Letters & words"],read:["📖","Reading"],farm:["🏡","Animals"],animals:["🐾","Animals"],world:["🌳","Our world"],sky:["🌙","Sky & space"],shapes:["🔷","Shapes & thinking"],people:["🧑‍🚒","Jobs & feelings"],flags:["🚩","Flags"],robot:["🤖","Robots"],memory:["🧠","Concentration"],story:["📻","Listening (stories)"]};
const skName=(cat,kind)=>SKCAT[cat+"."+kind]||(cat==="story"?"Listening to a story":SKN[kind])||(cat==="sky"?"Sky & space facts":cat==="animals"?"Animal facts":cat==="world"?"Facts about our world":"Other");
function logSk(q,ok){try{const cat=q.cat||(L&&L.cat)||"",k=cat+"|"+skName(cat,q.game||(q.match?"match":q.robot?"robot":q.kind)||"");if(!S.sk)S.sk={};const r=S.sk[k]||(S.sk[k]={n:0,r:0,f:0,d0:today(),d:"",h:""});
  r.n++;if(ok)r.r++;if(!S.dq)S.dq={};S.dq[today()]=(S.dq[today()]||0)+1;{const ks=Object.keys(S.dq).sort();while(ks.length>21)delete S.dq[ks.shift()]}const first=ok&&!q.tries;if(first)r.f++;r.d=today();r.h=(r.h+(first?"1":"0")).slice(-10)}catch(e){}}
function skLevel(r){const ones=(r.h.match(/1/g)||[]).length,p=r.h.length?ones/r.h.length:0;return r.n<4?0:p>=.8&&r.n>=6?2:1}

/* shared bits for the play games */
const gHead=(e,kick,title)=>`<div class="qkick"><span class="qke">${e}</span>${kick}</div><h2 class="qtitle">${title}</h2>`;
function gShow(html){$("qBody").innerHTML=html;$("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in")}
function gameWin(q,miss,el,extra){q.done=q.locked=true;q.tries=miss?1:0;logSk(q,true);sfx.good();if(el)burstAt(el,40);L.correct++;if(!miss)L.first++;
  const n=miss?1:2;S.acorns+=n;L.acorns+=n;S.questions++;{const w=wkLog();w.q++;w.right++}save();renderStats();bump("sAcorns");setDot();L.row=(L.row||0)+1;
  setTimeout(()=>{sheet("good",pickOne(PRAISE_T),`+${n} 🌰`+(q.factT?`<span class="ffact"><b>💡</b><span>${q.factT}</span></span>`:""));let gone=false;const go=()=>{if(!gone){gone=true;nextQ()}};$("qNext").onclick=()=>{sfx.tap();go()};
    sayseq([...(extra||[]),pickOne(PRAISE_CLIPS)],()=>setTimeout(go,q.factT?2600:900))},extra&&extra.length?200:600)}
function gameLearn(q,t,v){q.done=q.locked=true;q.tries=2;logSk(q,false);S.questions++;{const w=wkLog();w.q++}save();setDot();L.row=0;
  sheet("learn","Let's learn it together!",t);let gone=false;const go=()=>{if(!gone){gone=true;nextQ()}};$("qNext").onclick=()=>{sfx.tap();go()};sayseq(v||[],()=>{})}
const gAsk=q=>setTimeout(()=>{if(L&&L.q===q)sayseq(q.voice,()=>{})},400);
let __ac=null;function smTone(f,ms=380){try{if(!S.fx)return;__ac=__ac||new (window.AudioContext||window.webkitAudioContext)();const o=__ac.createOscillator(),g=__ac.createGain(),t=__ac.currentTime;
  o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.35,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+ms/1000);o.connect(g).connect(__ac.destination);o.start(t);o.stop(t+ms/1000+.05)}catch(e){}}

/* ---- Simon colours: watch the pads light up, then tap them in the same order ---- */
const SMC=[["#FF4B4B","#D33131",330],["#1CB0F6","#1899D6",392],["#FFC800","#E0A800",494],["#58CC02","#46A302",587]];
function qSimon(){const a=lvl(),len=a<=3?2:a<=4?3:a<=6?4:5;let seq=[];for(let i=0;i<len;i++){let c;do{c=ri(0,3)}while(seq.length&&c===seq[seq.length-1]&&Math.random()<.7);seq.push(c)}
  return {game:"simon",seq,voice:["w/LULU_SM_INTRO"]}}
function simonQ(q){
  gShow(`<div class="game">${gHead("🎵","Simon colours","Watch, then tap the same colours!")}
    <div class="smwrap"><div class="smboard" id="smB">${SMC.map((c,i)=>`<button class="smp" data-i="${i}" style="--c:${c[0]};--d:${c[1]}" aria-label="colour ${i+1}"></button>`).join("")}<div class="smmid" id="smMid">👀</div></div>
    <div class="smdots" id="smDots">${q.seq.map(()=>"<i></i>").join("")}</div></div></div>`);
  let at=0,miss=0,busy=true;const pads=[...$("qBody").querySelectorAll(".smp")];
  const flash=(i,ms=520)=>{pads[i].classList.add("lit");smTone(SMC[i][2],ms);setTimeout(()=>pads[i].classList.remove("lit"),ms-80)};
  const dots=()=>$("smDots").querySelectorAll("i").forEach((d,k)=>d.className=k<at?"on":"");
  const show=(clip,cb)=>{busy=true;at=0;dots();$("smMid").textContent="👀";$("smB").classList.add("watch");
    sayseq(clip?[clip]:[],()=>{let k=0;const step=()=>{if(!L||L.q!==q)return;if(k>=q.seq.length){$("smB").classList.remove("watch");$("smMid").textContent="👆";busy=false;sayseq(["w/LULU_SM_YOUR"],()=>{});cb&&cb();return}flash(q.seq[k++]);setTimeout(step,a2)};setTimeout(step,350)})};
  const a2=lvl()<=4?800:650;
  pads.forEach(b=>b.onclick=()=>{if(busy||q.done)return;const i=+b.dataset.i;flash(i,360);
    if(i===q.seq[at]){at++;dots();if(at===q.seq.length){busy=true;$("smMid").textContent="🎉";gameWin(q,miss,$("smB"))}}
    else{miss++;sfx.oops();$("smB").classList.add("bump");setTimeout(()=>$("smB").classList.remove("bump"),450);
      if(miss>=2){busy=true;setTimeout(()=>show(null,()=>{busy=true;gameLearn(q,"Watch the colours: "+q.seq.map(c=>["🔴","🔵","🟡","🟢"][c]).join(" "))}),700)}
      else setTimeout(()=>show("w/LULU_SM_WATCH"),700)}});
  window.__gSolve=()=>{let k=0;const t=()=>{if(busy)return setTimeout(t,300);if(k<q.seq.length){pads[q.seq[k++]].click();setTimeout(t,120)}};t()};
  setTimeout(()=>{if(L&&L.q===q)show("w/LULU_SM_INTRO")},400);
}

/* ---- Memory pairs: flip the cards and find the two that match ---- */
function qPairs(){const a=lvl(),np=a<=4?3:a<=6?4:6;const items=sh(AN.filter(x=>enSay(x[0]).length)).slice(0,np).map(x=>({e:x[1],w:x[0],v:["w/LULU_FA_AN"+AN.indexOf(x),...enSay(x[0])]}));
  return {game:"pairs",items,voice:["w/LULU_SM_PAIRS"]}}
function pairsQ(q){const cards=sh([...q.items.keys(),...q.items.keys()]),cols=cards.length<=6?3:4;
  gShow(`<div class="game">${gHead("🃏","Memory","Find the pairs!")}
    <div class="pgrid" style="grid-template-columns:repeat(${cols},1fr)">${cards.map((k,j)=>`<button class="pc" data-k="${k}" data-j="${j}"><span class="pcb">?</span><span class="pcf">${q.items[k].e}</span></button>`).join("")}</div></div>`);
  gAsk(q);let open=[],found=0,miss=0,busy=false;const bs=[...$("qBody").querySelectorAll(".pc")];
  bs.forEach(b=>b.onclick=()=>{if(busy||q.done||b.classList.contains("up"))return;sfx.tap();b.classList.add("up");open.push(b);
    if(open.length<2)return;const [x,y]=open;open=[];
    if(x.dataset.k===y.dataset.k){found++;x.classList.add("got");y.classList.add("got");sfx.good();hush();const it=q.items[+x.dataset.k];sayseq(it.v,()=>{});
      if(found===q.items.length)setTimeout(()=>gameWin(q,miss>q.items.length?1:0,$("qBody").querySelector(".pgrid")),900)}
    else{miss++;busy=true;setTimeout(()=>{x.classList.remove("up");y.classList.remove("up");busy=false},850)}});
  window.__gSolve=()=>{const by={};bs.forEach(b=>(by[b.dataset.k]=by[b.dataset.k]||[]).push(b));let ks=Object.keys(by),i=0;const t=()=>{if(busy)return setTimeout(t,200);if(i<ks.length){const [x,y]=by[ks[i++]];x.click();y.click();setTimeout(t,300)}};t()};
}

/* ---- Put in order: tap the numbers from the smallest to the biggest ---- */
function qOrder(){const a=lvl(),k=a<=5?3:4,mx=a<=4?10:a<=6?20:100,s=new Set();while(s.size<k)s.add(ri(a<=6?1:10,mx));return {game:"order",nums:[...s],voice:["w/LULU_CP_ORDER"]}}
function orderQ(q){const sorted=q.nums.slice().sort((x,y)=>x-y);
  gShow(`<div class="game">${gHead("🔢","Put in order","Smallest to biggest!")}
    <div class="odslots">${sorted.map((x,i)=>`<span class="ods" data-s="${i}">${i?"":"<small>small</small>"}</span>`).join("<i>›</i>")}</div>
    <div class="odball">${q.nums.map((n,i)=>`<button class="odb" data-n="${n}" style="--h:${[200,330,40,140][i%4]};--dl:${i*.4}s">${n}</button>`).join("")}</div></div>`);
  gAsk(q);let at=0,miss=0;const sl=[...$("qBody").querySelectorAll(".ods")];
  $("qBody").querySelectorAll(".odb").forEach(b=>b.onclick=()=>{if(q.done||b.disabled)return;const n=+b.dataset.n;
    if(n===sorted[at]){sfx.tap();b.disabled=true;b.classList.add("gone");sl[at].innerHTML=`<b>${n}</b>`;sl[at].classList.add("ok");at++;hush();sayseq(faNum(n).filter(Boolean),()=>{});
      if(at===sorted.length)setTimeout(()=>gameWin(q,miss,$("qBody").querySelector(".odslots")),500)}
    else{miss++;sfx.oops();b.classList.add("wrong");setTimeout(()=>b.classList.remove("wrong"),450);
      if(miss>=3){q.done=true;sorted.forEach((x,i)=>{sl[i].innerHTML=`<b>${x}</b>`;sl[i].classList.add("ok")});$("qBody").querySelectorAll(".odb").forEach(z=>z.classList.add("gone"));gameLearn(q,sorted.join(" < "),["w/LULU_ANS_IS",...sorted.flatMap(x=>faNum(x)).filter(Boolean)])}}});
  window.__gSolve=()=>{let i=0;const t=()=>{if(i<sorted.length){$("qBody").querySelector(`.odb[data-n="${sorted[i++]}"]`).click();setTimeout(t,250)}};t()};
}

/* ---- Pizza: colour a half / a quarter / three quarters ---- */
function qPizza(){const a=lvl();const opts=a<=5?[["h",2],["h",4]]:a<=6?[["h",2],["h",4],["q",4],["h",8]]:[["q",4],["t",4],["h",8],["q",8],["t",8]];
  const [f,sl]=pickOne(opts),need=f==="h"?sl/2:f==="q"?sl/4:sl*3/4;
  return {game:"pizza",f,sl,need,voice:[f==="h"?"w/LULU_FR_HALF":f==="q"?"w/LULU_FR_QUARTER":"w/LULU_FR_3Q"],en:f==="h"?"w/LULU_W_HALF":f==="q"?"w/LULU_W_QUARTER":"w/LULU_W_3Q"}}
function pizzaSVG(sl,on){const R=92,c=100;let s=`<svg viewBox="0 0 200 200" class="pz"><circle cx="100" cy="100" r="98" fill="#E7A55A"/>`;
  for(let i=0;i<sl;i++){const a0=-Math.PI/2+i*2*Math.PI/sl,a1=a0+2*Math.PI/sl,x0=c+R*Math.cos(a0),y0=c+R*Math.sin(a0),x1=c+R*Math.cos(a1),y1=c+R*Math.sin(a1),am=(a0+a1)/2;
    s+=`<path class="pzs${on[i]?" on":""}" data-i="${i}" d="M100 100 L${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z"/>`;
    s+=`<circle cx="${(c+R*.58*Math.cos(am)).toFixed(1)}" cy="${(c+R*.58*Math.sin(am)).toFixed(1)}" r="${sl>4?7:10}" class="pep${on[i]?" on":""}" pointer-events="none"/>`}
  return s+`</svg>`}
function pizzaQ(q){const on=Array(q.sl).fill(false),T={h:"Colour HALF of the pizza",q:"Colour ONE QUARTER of the pizza",t:"Colour THREE QUARTERS of the pizza"}[q.f],F={h:"½",q:"¼",t:"¾"}[q.f];
  gShow(`<div class="game">${gHead("🍕","Pizza",T)}<div class="pzwrap"><span class="pzf">${F}</span><div id="pzBox">${pizzaSVG(q.sl,on)}</div><small class="pzn" id="pzN">0 of ${q.sl} coloured</small></div>
    <button class="qcheck" id="pzGo" disabled>CHECK</button></div>`);
  gAsk(q);let miss=0;
  const draw=()=>{$("pzBox").innerHTML=pizzaSVG(q.sl,on);const n=on.filter(Boolean).length;$("pzN").textContent=`${n} of ${q.sl} coloured`;$("pzGo").disabled=!n;$("pzGo").classList.toggle("on",!!n);
    $("pzBox").querySelectorAll(".pzs").forEach(p=>p.onclick=()=>{if(q.done)return;sfx.tap();on[+p.dataset.i]=!on[+p.dataset.i];draw()})};draw();
  $("pzGo").onclick=()=>{if(q.done)return;const n=on.filter(Boolean).length;
    if(n===q.need){$("pzGo").disabled=true;gameWin(q,miss,$("pzBox"),[q.en])}
    else{miss++;sfx.oops();$("pzBox").classList.add("bump");setTimeout(()=>$("pzBox").classList.remove("bump"),450);toastHint(n>q.need?"Too many pieces! 🍕":"A few more pieces! 🍕");
      if(miss>=2){on.fill(false);for(let i=0;i<q.need;i++)on[i]=true;draw();gameLearn(q,`${F} = ${q.need} of ${q.sl} pieces`,[q.en])}}};
  window.__gSolve=()=>{on.fill(false);for(let i=0;i<q.need;i++)on[i]=true;draw();$("pzGo").click()};
}

/* ---- Build the word: hear it, see it, tap the letters in order ---- */
function qBuild(used){const a=lvl(),c=sh(WORDS.filter(x=>/^[a-z]{3,5}$/.test(x.w)&&(a>=7||x.w.length<=4)));const x=c.find(z=>!used.has("bd"+z.i))||c[0];used.add("bd"+x.i);
  const L2=x.w.toUpperCase().split(""),extra=a>=7?sh("ABCDEFGHIKLMNOPRSTU".split("").filter(l=>!L2.includes(l))).slice(0,2):a>=6?sh("AEIOUSTMP".split("").filter(l=>!L2.includes(l))).slice(0,1):[];
  return {game:"build",x,letters:L2,tiles:sh([...L2,...extra]),voice:["w/LULU_RD_BUILD",...wSay(x)]}}
function bldQ(q){
  gShow(`<div class="game">${gHead("🔤","Build the word","Tap the letters in order")}
    <div class="bdtop"><button class="qspk" id="bdSpk" aria-label="Hear the word">🔊</button>${PIC("wd_"+q.x.i,"wp bdpic")}</div>
    <div class="bdslots">${q.letters.map(()=>`<span class="bds"></span>`).join("")}</div>
    <div class="bdtiles">${q.tiles.map((l,i)=>`<button class="bdt" data-l="${l}" data-j="${i}">${l}</button>`).join("")}</div></div>`);
  gAsk(q);$("bdSpk").onclick=()=>{hush();sayseq(wSay(q.x),()=>{})};
  let at=0,miss=0;const sl=[...$("qBody").querySelectorAll(".bds")];
  $("qBody").querySelectorAll(".bdt").forEach(b=>b.onclick=()=>{if(q.done||b.disabled)return;
    if(b.dataset.l===q.letters[at]){sfx.tap();b.disabled=true;b.classList.add("gone");sl[at].textContent=q.letters[at];sl[at].classList.add("ok");at++;
      if(at===q.letters.length){hush();gameWin(q,miss,$("qBody").querySelector(".bdslots"),[...wSay(q.x),...faSay(q.x.w)])}}
    else{miss++;sfx.oops();b.classList.add("wrong");setTimeout(()=>b.classList.remove("wrong"),450);
      if(miss>=3){q.done=true;sl.forEach((s,i)=>{s.textContent=q.letters[i];s.classList.add("ok")});gameLearn(q,q.x.w.toUpperCase(),[...wSay(q.x),...faSay(q.x.w)])}}});
  window.__gSolve=()=>{let i=0;const t=()=>{if(i<q.letters.length){const l=q.letters[i++];[...$("qBody").querySelectorAll(".bdt")].find(b=>!b.disabled&&b.dataset.l===l).click();setTimeout(t,200)}};t()};
}
const GAMES={piano:pianoQ,simon:simonQ,pairs:pairsQ,order:orderQ,pizza:pizzaQ,build:bldQ};

/* ================= Nov 9: a short English fact after EVERY right answer, made from the question and its answer ================= */
const DAYS7=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],MONTHS12=["January","February","March","April","May","June","July","August","September","October","November","December"];
const SEASON_F={spring:"In spring, flowers bloom and baby animals are born.",summer:"Summer has the longest days of the year.",autumn:"In autumn, many leaves turn red and yellow and fall down.",fall:"In autumn, many leaves turn red and yellow and fall down.",winter:"In winter, some animals sleep until spring. That is called hibernation."};
const JOB_F={astronaut:"Astronauts float in space because there is almost no gravity up there.",farmer:"Farmers grow the food we eat, like wheat for our bread.",pilot:"Pilots fly planes high above the clouds.",scientist:"Scientists ask questions and do experiments to find answers.",builder:"Builders use bricks, wood and steel to make houses.",chef:"Chefs cook food in restaurants. Their tall hat is called a toque.",teacher:"Teachers help children learn to read, write and count.",doctor:"Doctors listen to your heart with a stethoscope.",firefighter:"Firefighters use big hoses to put out fires.",police:"Police officers help keep people safe.","police officer":"Police officers help keep people safe.",dentist:"Dentists keep our teeth clean and strong.",nurse:"Nurses take care of people who are sick.",baker:"Bakers get up very early to bake fresh bread.",vet:"Vets are doctors for animals.",mechanic:"Mechanics fix cars and trucks.",artist:"Artists make pictures, songs and stories.",singer:"Singers use their voice like a musical instrument.",mail:"Mail carriers bring letters to every house."};
const FLAG_F={"the united states":"The US flag has 50 stars, one for each state.",italy:"Italy is shaped like a boot! Its flag is green, white and red.",egypt:"Egypt has the famous pyramids. Its flag has an eagle in the middle.",france:"France's flag is blue, white and red. Paris is its capital.",japan:"Japan's flag shows a red sun. Japan is called the Land of the Rising Sun.",canada:"Canada's flag has a red maple leaf.",iran:"Iran's flag is green, white and red.",china:"China has the most people of any country.",brazil:"Brazil's flag is green with a blue globe full of stars.",germany:"Germany's flag is black, red and gold.",india:"India's flag has a blue wheel in the middle.",mexico:"Mexico's flag has an eagle eating a snake.","the united kingdom":"The UK flag is called the Union Jack.",spain:"Spain's flag is red and yellow.",australia:"Australia is home to kangaroos and koalas.",turkey:"Turkey's flag has a white moon and star."};
const SHAPE_F={circle:"A circle has no corners and no straight sides.",square:"A square has 4 sides that are all the same length.",triangle:"A triangle has 3 sides and 3 corners.",rectangle:"A rectangle has 4 sides: 2 long and 2 short.",star:"Our star shape has 5 points.",oval:"An oval looks like a stretched circle, like an egg.",heart:"A heart shape means love.",diamond:"A diamond is a square standing on its corner.",rhombus:"A rhombus has 4 sides that are all the same length.",pentagon:"A pentagon has 5 sides.",hexagon:"A hexagon has 6 sides, like a honeycomb cell.",octagon:"An octagon has 8 sides, like a stop sign.",trapezoid:"A trapezoid has 4 sides, and 2 of them are parallel.",cube:"A cube has 6 square faces, like a dice.",sphere:"A sphere is round all over, like a ball.",cylinder:"A cylinder is like a can: 2 circles and a tube.",cone:"A cone is like an ice cream cone.",pyramid:"A pyramid has a square bottom and triangle sides."};
const COLOR_F={red:"Red and yellow mixed together make orange.",blue:"The sky looks blue because of how sunlight scatters.",yellow:"Yellow and blue mixed together make green.",green:"Plants are green because of chlorophyll, which helps them make food.",orange:"Orange is a mix of red and yellow.",purple:"Purple is a mix of red and blue.",pink:"Pink is red mixed with white.",brown:"Brown is made by mixing many colours together.",black:"Black is what we see when there is no light.",white:"White light holds all the colours of the rainbow.",grey:"Grey is black mixed with white.",gray:"Grey is black mixed with white."};
const FEEL_F={happy:"When we are happy, we smile and our eyes crinkle.",sad:"It is OK to feel sad. A hug can help.",angry:"When you feel angry, take three slow, deep breaths.",scared:"When we feel scared, our heart beats faster.",surprised:"When we are surprised, our eyes and mouth open wide."};
const VOWEL="AEIOU";
function numFact(n){n=+n;if(!(n>=0))return "";if(n===0)return "Zero means nothing at all.";
  const eo=n%2===0?`${n} is an even number: it makes 2 equal groups of ${n/2}.`:`${n} is an odd number: one is always left over when we make pairs.`;
  if(n>=10&&n<100){const t=Math.floor(n/10),o=n%10;return o?`${n} is ${t} tens and ${o} ones.`:`${n} is ${t} tens. ${eo}`}
  return n===100?"100 is ten tens!":eo}
function factFor(q){try{
  const raw=((q.opts&&q.opts[q.ans]||{}).h||"").replace(/<[^>]+>/g," ").replace(/[●]/g," ").replace(/\s+/g," ").trim(),lab=raw.toLowerCase(),
    k=q.kind||"",c=q.cat||"",obs=((q.opts&&q.opts[q.ans]||{}).h||"").match(/class="ob/g),num=(lab.match(/\d+/)||[])[0]||(obs&&obs.length?String(obs.length):undefined);
  let w=lab.replace(/^[^a-z0-9]+/,"").trim();if(!w)w=String(q.exp&&q.exp.t||"").toLowerCase().replace(/[^a-z' -]/g,"").trim();
  const fe=FACT_EN[w]||FACT_EN[w.replace(/s$/,"")]||FACT_EN[lab];
  if(fe&&!["count","add"].includes(c))return fe;
  if(c==="count"||c==="add"){
    if(k==="more"||k==="less"){const ns=q.opts.map(o=>(o.h.match(/class="ob/g)||[]).length).filter(Boolean),r=ns[q.ans],o=k==="more"?Math.min(...ns):Math.max(...ns);
      return r&&o?`${r} is ${k==="more"?"more":"less"} than ${o}: it comes ${k==="more"?"after":"before"} ${o} when we count.`:"Count each group carefully, one by one."}
    if(k==="long")return /short/i.test(q.cap)?"Short things need fewer blocks to measure them.":"Long things need more blocks to measure them.";
    if(k==="graph")return "A chart shows numbers as bars. The tallest bar is the biggest number.";
    if(k==="skip"){const m=(q.cap||"").match(/by (\d+)/);return m?`Counting by ${m[1]}s is faster than counting by ones!`:numFact(num)}
    if(k==="share")return "Sharing fairly means everyone gets the same amount.";
    if(k==="groups")return "Equal groups help us count faster. That's called multiplying!";
    if(k==="carry")return "When the ones make 10 or more, we carry a ten to the tens.";
    if(k==="addPic"||k==="sum")return "Adding means putting things together, so we get more.";
    if(k==="subPic"||k==="minus"||k==="left")return "Taking away means fewer are left than we started with.";
    if(num)return numFact(num);
    if(fe)return fe}
  if(c==="clock"){const tm=lab.match(/(\d+):(\d\d)/);
    if(tm){const m=+tm[2];return m===0?`At ${tm[1]} o'clock the long hand points straight up to 12.`:m===30?"Half past: the long hand points down to the 6.":m===15?"Quarter past: the long hand points to the 3.":m===45?"Quarter to: the long hand points to the 9.":"There are 60 minutes in one hour."}
    const d=DAYS7.findIndex(x=>lab.includes(x.toLowerCase()));if(d>=0)return `A week has 7 days. ${DAYS7[d]} comes after ${DAYS7[(d+6)%7]}.`;
    const mo=MONTHS12.findIndex(x=>lab.includes(x.toLowerCase()));if(mo>=0)return `${MONTHS12[mo]} is month number ${mo+1} of the 12 months in a year.`;
    for(const s2 in SEASON_F)if(lab.includes(s2))return SEASON_F[s2];
    if(/morning/.test(lab))return "In the morning the sun comes up in the east.";
    if(/night/.test(lab))return "At night our bodies rest and grow while we sleep.";
    if(/afternoon|evening/.test(lab))return "Evening comes after the afternoon, when the sun goes down.";
    if(k==="week")return "A week has 7 days: 5 school days and 2 weekend days.";
    if(k==="months")return "A year has 12 months and 4 seasons.";
    if(num)return numFact(num)}
  if(c==="letters"){
    if(/^[a-z]$/i.test(w)){const L2=w.toUpperCase(),i=L2.charCodeAt(0)-64;return `${L2} is letter number ${i} of the 26 letters.${VOWEL.includes(L2)?` ${L2} is a vowel.`:""}`}
    if(k==="rhyme")return `Rhyming words end with the same sound, like "${w}" and "${(q.exp&&q.exp.t||"").split(/[–-]/)[0].trim()}".`;
    if(w)return `"${w}" has ${w.replace(/[^a-z]/g,"").length} letters and starts with ${w[0].toUpperCase()}.`}
  if(c==="read"){if(k==="sentence"){const t=String(q.exp&&q.exp.t||"");return t?`Read it all together: "${t}"`:"A sentence starts with a capital letter and ends with a full stop."}
    return `"${w}" is one of the words we read most often. Now you know it by sight!`}
  if(c==="shapes"){if(k==="pattern")return "A pattern repeats again and again, like the stripes on a zebra.";
    if(k==="both")return "You checked two things at once: the colour AND the shape!";
    if(k==="bigsmall")return /small/i.test(q.cap)?"Small things take up less space.":"Big things take up more space.";
    const sh=Object.keys(SHAPE_F).find(x=>lab.includes(x)||String(q.exp&&q.exp.t||"").toLowerCase().includes(x)||(q.cap||"").toLowerCase().includes(x));if(sh)return SHAPE_F[sh];
    const co=Object.keys(COLOR_F).find(x=>lab.includes(x));if(co)return COLOR_F[co]}
  if(c==="people"||c==="flags"){const f2=FEEL_F[w];if(f2)return f2;const j=Object.keys(JOB_F).find(x=>lab.includes(x));if(j)return JOB_F[j];
    const t=String(q.exp&&q.exp.t||lab).toLowerCase(),fl=Object.keys(FLAG_F).find(x=>t.includes(x));if(fl)return FLAG_F[fl];if(k.startsWith("flag"))return "Every country has its own flag with its own colours."}
  if(c==="farm"){if(k==="fly")return "Animals that fly have wings: birds, bats and many insects.";if(k==="water")return "Fish breathe under water with gills.";if(k==="sound")return "Every animal has its own way to talk to its friends.";
    if(k==="home")return "Animals live where they can find food and stay safe.";if(k==="food")return "Some animals eat plants, some eat meat, and some eat both."}
  if(fe)return fe;
  if(num)return numFact(num);
  return ""}catch(e){return ""}}

/* ================= Nov 9c: answer text sized by script, so it fits on every device ================= */
function fitOpts(){const B=$("qBody");if(!B)return;B.querySelectorAll(".qo[data-j]").forEach(c=>{const W=c.clientWidth,H=c.clientHeight;if(!W||!H)return;
  const round=c.closest(".st-balloon,.st-fish"),pic=c.querySelector("img,.oe,.grp,.cshape,.swatch,.dayb,svg"),dots=c.querySelector(".dots");
  c.querySelectorAll("b.num,b.word").forEach(e=>{const n=Math.max(1.3,e.textContent.trim().length*.6);
    let f=Math.min(H*(pic?.26:dots?.42:round?.36:.48),W*(round?.66:.8)/n,round?64:120);f=Math.max(f,14);e.style.fontSize=f+"px";e.style.lineHeight="1.15";e.style.whiteSpace="nowrap";
    let g=0;while(e.scrollWidth>W*(round?.72:.88)&&g++<25&&f>12){f*=.9;e.style.fontSize=f+"px"}})})}
window.addEventListener("resize",()=>{try{fitOpts()}catch(e){}});

/* ================= Nov 9c: balloons float up and fly away, fish swim across - pop / catch the answer before it leaves ================= */
function moveField(q){const box=$("qBody").querySelector(".qopts");if(!box)return;box.classList.add("field");
  const els=[...box.querySelectorAll(".qo[data-j]")],n=els.length,a=lvl(),T=a<=4?11:a<=6?9:7.5,lanes=sh([...Array(n).keys()]);
  els.forEach((e,i)=>{const lane=lanes[i];e.style.setProperty("--t",(T+Math.random()*2).toFixed(2)+"s");e.style.setProperty("--d",(-(i*T/n)+1.2).toFixed(2)+"s");
    if(q.style==="balloon")e.style.left=(4+lane*(92/n))+"%";else e.style.top=(4+lane*(92/n))+"%"})}

/* ================= Nov 9c: piano - listen to a few notes, then play them back ================= */
const PIANO=[["C","Do","#FF5A5F",262],["D","Re","#FF9F1C",294],["E","Mi","#FFD23F",330],["F","Fa","#3DDC97",349],["G","Sol","#2EC4B6",392],["A","La","#4D96FF",440],["B","Si","#9B5DE5",494],["C","Do","#F15BB5",523]];
let __pac=null;function pianoTone(f,ms=700){try{__pac=__pac||new (window.AudioContext||window.webkitAudioContext)();const t=__pac.currentTime,g=__pac.createGain();g.connect(__pac.destination);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.45,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+ms/1000);
  [[1,1],[2,.35],[3,.12]].forEach(([m,v])=>{const o=__pac.createOscillator(),gg=__pac.createGain();o.type="sine";o.frequency.value=f*m;gg.gain.value=v;o.connect(gg).connect(g);o.start(t);o.stop(t+ms/1000+.05)})}catch(e){}}
function qPiano(){const a=lvl(),keys=a<=4?5:8,len=a<=3?2:a<=5?3:a<=7?4:5;let seq=[];for(let i=0;i<len;i++){let k;do{k=ri(0,keys-1)}while(seq.length&&k===seq[seq.length-1]);seq.push(k)}
  return {game:"piano",seq,keys,voice:["w/PX_PIANO"]}}
function pianoQ(q){
  gShow(`<div class="game">${gHead("🎹","Piano","Listen, then play the same notes!")}
    <div class="pnwrap"><div class="pnmid" id="pnMid">👂</div><div class="pnkeys" id="pnK" style="grid-template-columns:repeat(${q.keys},1fr)">${PIANO.slice(0,q.keys).map((k,i)=>`<button class="pnk" data-i="${i}" style="--c:${k[2]}"><span>${k[1]}</span></button>`).join("")}</div>
    <div class="smdots" id="pnDots">${q.seq.map(()=>"<i></i>").join("")}</div></div></div>`);
  let at=0,miss=0,busy=true;const ks=[...$("qBody").querySelectorAll(".pnk")];
  const hit=(i,ms=650)=>{ks[i].classList.add("lit");pianoTone(PIANO[i][3],ms+300);setTimeout(()=>ks[i].classList.remove("lit"),ms-120)};
  const dots=()=>$("pnDots").querySelectorAll("i").forEach((d,k)=>d.className=k<at?"on":"");
  const play=(clip,cb)=>{busy=true;at=0;dots();$("pnMid").textContent="👂";$("pnK").classList.add("watch");
    sayseq(clip?[clip]:[],()=>{let k=0;const step=()=>{if(!L||L.q!==q)return;if(k>=q.seq.length){$("pnK").classList.remove("watch");$("pnMid").textContent="🎹";busy=false;sayseq(["w/LULU_SM_YOUR"],()=>{});cb&&cb();return}hit(q.seq[k++]);setTimeout(step,lvl()<=4?850:700)};setTimeout(step,400)})};
  ks.forEach(b=>b.onpointerdown=e=>{e.preventDefault();if(busy||q.done)return;const i=+b.dataset.i;hit(i,420);
    if(i===q.seq[at]){at++;dots();if(at===q.seq.length){busy=true;$("pnMid").textContent="🎉";gameWin(q,miss,$("pnK"))}}
    else{miss++;sfx.oops();$("pnK").classList.add("bump");setTimeout(()=>$("pnK").classList.remove("bump"),450);
      if(miss>=2){busy=true;setTimeout(()=>play(null,()=>{busy=true;gameLearn(q,"The notes were: "+q.seq.map(x=>PIANO[x][1]).join(" "))}),700)}
      else setTimeout(()=>play(null),800)}});
  window.__gSolve=()=>{let k=0;const t=()=>{if(busy)return setTimeout(t,300);if(k<q.seq.length){ks[q.seq[k++]].dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));setTimeout(t,150)}};t()};
  setTimeout(()=>{if(L&&L.q===q)play("w/PX_PIANO")},400);
}
