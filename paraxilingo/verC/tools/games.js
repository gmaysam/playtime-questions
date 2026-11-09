
/* ================= Nov 9: Watcher-style play games (Simon, memory pairs, put in order, pizza, build the word) ================= */
/* what the child is learning: every answer is logged per skill for the parents' report */
const SKN={find:"Counting things",more:"More or less",less:"More or less",long:"Longer or shorter",missing:"Missing number",after:"What comes next",before:"What comes before",skip:"Skip counting",graph:"Reading a chart",order:"Putting numbers in order",
 addPic:"Adding with pictures",share:"Sharing equally",subPic:"Taking away with pictures",left:"How many are left",sum:"Adding numbers",minus:"Taking away numbers",teach:"Adding (story problems)",carry:"Adding bigger numbers",groups:"Equal groups",big:"Bigger sums",pizza:"Halves and quarters",
 routine:"Daily routine",oclock:"Time: o'clock",half:"Time: half past",quarter:"Time: quarter past / to",minutes:"Time: minutes",season:"Seasons",nowseason:"Seasons",today:"Days of the week",tomorrow:"Days of the week",week:"Days of the week",yesterday:"Days of the week",monthafter:"Months",months:"Months",
 abc:"Letters A to Z",listen:"English words by ear",match:"Matching words and pictures",rhyme:"Rhyming words",first:"First letter sounds",whatis:"Reading words",lafter:"Alphabet order",lbefore:"Alphabet order",build:"Spelling words",
 balloon:"Sight words",flash:"Sight words (quick look)",sentence:"Reading sentences",
 home:"Animal homes",sound:"Animal sounds",fly:"Animals that fly",food:"What animals eat",water:"Animals in water",pairs:"Memory (pairs)",
 shape:"Shape names",color:"Colours",pattern:"Patterns",robot:"Coding (robot path)",sides:"Sides of shapes",both:"Two clues",bigsmall:"Big and small",simon:"Memory (colours in order)",
 feel:"Feelings",job:"Jobs",job2:"Jobs",flag:"Flags",flag2:"Flags",w:"Facts about the world"};
const SKCAT={"clock.after":"What day comes next","clock.before":"What day came before","count.after":"What comes next","count.before":"What comes before"};
const AREA={count:["🔢","Numbers"],add:["➕","Adding & taking away"],clock:["🕒","Time & calendar"],letters:["🔤","Letters & words"],read:["📖","Reading"],farm:["🏡","Animals"],animals:["🐾","Animals"],world:["🌳","Our world"],sky:["🌙","Sky & space"],shapes:["🔷","Shapes & thinking"],people:["🚩","People & feelings"],story:["📻","Listening (stories)"]};
const skName=(cat,kind)=>SKCAT[cat+"."+kind]||(cat==="story"?"Listening to a story":SKN[kind])||(cat==="sky"?"Sky & space facts":cat==="animals"?"Animal facts":cat==="world"?"Facts about our world":"Other");
function logSk(q,ok){try{const cat=q.cat||(L&&L.cat)||"",k=cat+"|"+skName(cat,q.game||(q.match?"match":q.robot?"robot":q.kind)||"");if(!S.sk)S.sk={};const r=S.sk[k]||(S.sk[k]={n:0,r:0,f:0,d0:today(),d:"",h:""});
  r.n++;if(ok)r.r++;const first=ok&&!q.tries;if(first)r.f++;r.d=today();r.h=(r.h+(first?"1":"0")).slice(-10)}catch(e){}}
function skLevel(r){const ones=(r.h.match(/1/g)||[]).length,p=r.h.length?ones/r.h.length:0;return r.n<4?0:p>=.8&&r.n>=6?2:1}

/* shared bits for the play games */
const gHead=(e,kick,title)=>`<div class="qkick"><span class="qke">${e}</span>${kick}</div><h2 class="qtitle">${title}</h2>`;
function gShow(html){$("qBody").innerHTML=html;$("qBody").classList.remove("in");void $("qBody").offsetWidth;$("qBody").classList.add("in")}
function gameWin(q,miss,el,extra){q.done=q.locked=true;q.tries=miss?1:0;logSk(q,true);sfx.good();if(el)burstAt(el,40);L.correct++;if(!miss)L.first++;
  const n=miss?1:2;S.acorns+=n;L.acorns+=n;S.questions++;{const w=wkLog();w.q++;w.right++}save();renderStats();bump("sAcorns");setDot();L.row=(L.row||0)+1;
  setTimeout(()=>{sheet("good",pickOne(PRAISE_T),`+${n} 🌰`);let gone=false;const go=()=>{if(!gone){gone=true;nextQ()}};$("qNext").onclick=()=>{sfx.tap();go()};
    sayseq([...(extra||[]),pickOne(PRAISE_CLIPS)],()=>setTimeout(go,900))},extra&&extra.length?200:600)}
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
const GAMES={simon:simonQ,pairs:pairsQ,order:orderQ,pizza:pizzaQ,build:bldQ};
