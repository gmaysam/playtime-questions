
/* =====================================================================================================
   v18 (Nov 13, owner's notes from a play-through):
   - time answers show a clock face, not dots (Domi's radio "What time was it?")
   - the fizzy volcano erupts like the real baking soda + vinegar experiment; the rhythm drum looks real
   - every game where the child picks between named things reads the names, lighting each one up
   - no game twice in a day; letter-hunting games stop at 5
   - "Say it!": Lulu says a word, the child says it back, the phone's speech recognition checks it
   ===================================================================================================== */
const G10_READY=__G10VOICE__,G10=n=>"w/PX_G10_"+n;

/* ---------- 1. clock faces for time answers ---------- */
const _qSt10=qStory;qStory=function(si,k){const q=_qSt10(si,k);try{if(/\btime\b/i.test(q.cap||"")&&q.opts&&q.opts.every(o=>/class="num"/.test(o.h))){
    const v=q.opts.map(o=>+o.h.replace(/<[^>]*>/g,"").replace(/\D+/g,"")),r=v[q.ans];
    /* times are 1-12: swap any impossible hour (0, 13...) for a near one */
    const ok=v.map(x=>x>=1&&x<=12?x:null),used=new Set(ok.filter(x=>x!==null));for(let i=0;i<ok.length;i++)if(ok[i]===null){let c=[r+2,r-2,r+3,r-3,r+4,r-4].map(x=>((x-1+12)%12)+1).find(x=>!used.has(x));ok[i]=c;used.add(c)}
    q.opts=ok.map(h=>({h:`<span class="oclk">${clockSVG(h,0)}</span><b class="num t">${h}:00</b>`,say:["w/PX_RC_CLOCK",N(h)]}));q.layout="row3"}}catch(e){}return q};

/* ---------- 2a. the fizzy volcano: a real-looking model volcano, the powder and the liquid poured in, then foam that bubbles up and runs down the sides ---------- */
volcQ=function(q){let pot=[],miss=0;const shelf=sh(VOLC6.slice());
  gShow(`<div class="game">${gHead("🌋","Fizzy volcano","Which two make it erupt?")}<div class="vc2" id="vcV">
    <svg viewBox="0 0 240 170" class="vc2-m" aria-hidden="true"><defs><linearGradient id="vcg" x1="0" x2="1"><stop offset="0" stop-color="#8A5A3B"/><stop offset=".55" stop-color="#B07A52"/><stop offset="1" stop-color="#6E4329"/></linearGradient>
      <linearGradient id="vcb" x1="0" x2="1"><stop offset="0" stop-color="#cfe9ff" stop-opacity=".9"/><stop offset=".5" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#b9dcff" stop-opacity=".9"/></linearGradient></defs>
      <ellipse cx="120" cy="164" rx="112" ry="6" fill="#000" opacity=".12"/><rect x="6" y="152" width="228" height="12" rx="4" fill="#C9A26B"/>
      <path d="M22 154 C52 140 70 96 96 52 L144 52 C170 96 188 140 218 154Z" fill="url(#vcg)"/>
      <path d="M50 150 C70 128 82 104 96 80" stroke="#5E3A22" stroke-width="3" fill="none" opacity=".45"/><path d="M190 150 C172 126 160 104 148 84" stroke="#5E3A22" stroke-width="3" fill="none" opacity=".45"/>
      <circle cx="74" cy="128" r="5" fill="#7A4C30"/><circle cx="168" cy="120" r="4" fill="#7A4C30"/><circle cx="150" cy="140" r="6" fill="#7A4C30"/><path d="M96 52 L144 52 L138 62 L102 62Z" fill="#4A2D1A"/>
      <rect x="107" y="30" width="26" height="30" rx="5" fill="url(#vcb)" stroke="#8fbfe6" stroke-width="2"/><rect x="113" y="22" width="14" height="10" rx="2" fill="url(#vcb)" stroke="#8fbfe6" stroke-width="2"/></svg>
    <canvas class="vc2-c" id="vcC" width="480" height="340"></canvas><span class="vc-in" id="vcI"></span></div>
    <div class="mx-pots">${shelf.map((x,j)=>`<button class="mx-p vc-p" data-j="${j}"><span class="vc-e">${x[0]}</span><small>${cap1(x[1])}</small></button>`).join("")}</div></div>`);gAsk(q);
  const cv=$("vcC"),cx=cv.getContext("2d");let parts=[],raf=0,t0=0,mode="";
  const run=ts=>{if(!cx||!L||L.q!==q&&!q.done){cancelAnimationFrame(raf);return}const t=(ts-t0)/1000;cx.clearRect(0,0,480,340);
    const rate=mode==="boom"?(t<1.6?26:t<3.2?10:t<4.2?3:0):(t<.5?3:0);
    for(let i=0;i<rate;i++){const side=Math.random()<.5?-1:1;parts.push({x:240+(Math.random()-.5)*24,y:60,vx:side*(.6+Math.random()*2.2)*(mode==="boom"?1:.3),vy:-(mode==="boom"?3+Math.random()*4:1+Math.random()),r:4+Math.random()*9,life:0,flow:false})}
    for(const p of parts){p.life+=1/60;if(!p.flow){p.vy+=.18;p.x+=p.vx;p.y+=p.vy;if(p.y>64&&p.vy>0){p.flow=true;p.vx=(p.x<240?-1:1)*(.9+Math.random()*.8);p.vy=0}}
      else{p.x+=p.vx;const dx=Math.abs(p.x-240),slopeY=64+Math.max(0,dx-24)*1.62;p.y=Math.min(300,slopeY-p.r*.6);p.vx*=.995}
      const a=Math.max(0,1-p.life/5.5);cx.globalAlpha=a;const g=cx.createRadialGradient(p.x-p.r*.3,p.y-p.r*.3,1,p.x,p.y,p.r);g.addColorStop(0,"#fff");g.addColorStop(.6,mode==="boom"?"#FFE8E8":"#F1F3F5");g.addColorStop(1,mode==="boom"?"#FF8FA3":"#CED4DA");
      cx.fillStyle=g;cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();if(Math.random()<.02)p.r*=.92}
    cx.globalAlpha=1;parts=parts.filter(p=>p.life<5.5&&p.r>1.5);if(parts.length||rate)raf=requestAnimationFrame(run)};
  const fizz=()=>{try{if(!S.fx)return;const c=dac(),n=c.sampleRate*2.2,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(Math.random()<.08?1:.25)*Math.exp(-i/n*1.6);
    const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=b;f.type="highpass";f.frequency.value=2400;g.gain.value=.35;s.connect(f);f.connect(g);g.connect(c.destination);s.start()}catch(e){}};
  const go=()=>{const ok=pot.every(x=>x[2]);mode=ok?"boom":"meh";parts=[];t0=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(run);if(ok)fizz();else g6tone(300,.3,"sawtooth",.06);
    setTimeout(()=>{if(ok)gameWin(q,miss,$("vcV"),[]);else{miss++;toastHint(`${cap1(pot[0][1])} and ${pot[1][1]} don't fizz. Try others!`);pot=[];$("vcI").textContent="";$("qBody").querySelectorAll(".vc-p").forEach(b=>b.disabled=false);if(miss>=3){q.done=true;gameLearn(q,"Baking soda + vinegar = FIZZ!",[])}}},ok?3200:1500)};
  $("qBody").querySelectorAll(".vc-p").forEach(b=>{const add=()=>{if(q.done||pot.length>=2||b.disabled)return;pot.push(shelf[+b.dataset.j]);b.disabled=true;sfx.tap();
    const I=$("vcI");I.textContent=pot.map(x=>x[0]).join(" ");I.classList.remove("pour");void I.offsetWidth;I.classList.add("pour");if(pot.length===2)setTimeout(go,700)};dragify(b,()=>[$("vcV")],add,add)});
  window.__gSolve=()=>{pot=VOLC6.slice(0,2);go()}};

/* ---------- 2b. the rhythm drum: a real snare drum with two sticks that strike on every tap ---------- */
const realDrum=()=>`<svg viewBox="0 0 140 130" class="rd" aria-hidden="true"><defs>
  <linearGradient id="rdS" x1="0" x2="1"><stop offset="0" stop-color="#A61E2E"/><stop offset=".45" stop-color="#E63946"/><stop offset=".55" stop-color="#F25C67"/><stop offset="1" stop-color="#8F1724"/></linearGradient>
  <linearGradient id="rdM" x1="0" x2="1"><stop offset="0" stop-color="#9AA5B1"/><stop offset=".5" stop-color="#F1F3F5"/><stop offset="1" stop-color="#7B8794"/></linearGradient>
  <radialGradient id="rdH" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#F3EFE6"/><stop offset="1" stop-color="#D9D2C3"/></radialGradient></defs>
  <ellipse cx="70" cy="122" rx="56" ry="6" fill="#000" opacity=".15"/>
  <path d="M16 56 L16 104 A54 16 0 0 0 124 104 L124 56Z" fill="url(#rdS)"/>
  ${[24,42,60,80,98,116].map(x=>`<rect x="${x-3}" y="62" width="6" height="36" rx="3" fill="url(#rdM)"/>`).join("")}
  <path d="M16 100 A54 16 0 0 0 124 100 L124 107 A54 16 0 0 1 16 107Z" fill="url(#rdM)"/>
  <ellipse cx="70" cy="56" rx="54" ry="16" fill="url(#rdM)"/><ellipse cx="70" cy="56" rx="49" ry="13" fill="url(#rdH)"/>
  <ellipse class="rd-rip" cx="70" cy="56" rx="10" ry="3" fill="none" stroke="#C9BFA8" stroke-width="1.5"/>
  <g class="rd-st l"><line x1="22" y1="2" x2="52" y2="46" stroke="#D9A066" stroke-width="5" stroke-linecap="round"/><circle cx="52" cy="46" r="4" fill="#F2D3A0"/></g>
  <g class="rd-st r"><line x1="118" y1="2" x2="88" y2="46" stroke="#D9A066" stroke-width="5" stroke-linecap="round"/><circle cx="88" cy="46" r="4" fill="#F2D3A0"/></g></svg>`;
function snare(){try{if(!S.fx)return;const c=dac(),t=c.currentTime,o=c.createOscillator(),og=c.createGain();o.type="triangle";o.frequency.setValueAtTime(190,t);o.frequency.exponentialRampToValueAtTime(110,t+.12);og.gain.setValueAtTime(.7,t);og.gain.exponentialRampToValueAtTime(.001,t+.18);o.connect(og);og.connect(c.destination);o.start(t);o.stop(t+.2);
  const n=c.sampleRate*.25,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=b;f.type="highpass";f.frequency.value=1500;g.gain.setValueAtTime(.55,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);s.connect(f);f.connect(g);g.connect(c.destination);s.start(t);s.stop(t+.25)}catch(e){}}
rhythmQ=function(q){let hit=0,miss=0,side=0;
  gShow(`<div class="game">${gHead("🥁","Rhythm drums","Tap the drum when the star reaches it!")}<div class="rh rh2" id="rhL"><span class="rh-t" id="rhT">${realDrum()}</span></div><div class="mg-cnt" id="rhC">0 / ${q.need}</div></div>`);gAsk(q);
  const L2=$("rhL"),T=$("rhT"),notes=[];
  const tap=()=>{if(q.done)return;snare();side^=1;T.classList.remove("hitl","hitr");void T.offsetWidth;T.classList.add(side?"hitl":"hitr");const tr=T.getBoundingClientRect(),c=tr.left+tr.width/2;
    const n=notes.find(o=>!o.dataset.d&&Math.abs(o.getBoundingClientRect().left+o.offsetWidth/2-c)<tr.width*.6);
    if(n){n.dataset.d=1;n.classList.add("got");hit++;$("rhC").textContent=hit+" / "+q.need;if(hit>=q.need){q.done=true;setTimeout(()=>gameWin(q,miss>3?1:0,T,[]),400)}}else miss++};
  L2.addEventListener("pointerdown",e=>{e.preventDefault();tap()});
  let k=0;const spawn=()=>{if(!L||L.q!==q||q.done)return;if(k>=q.n+3&&hit<q.need){k=0}k++;const o=document.createElement("span");o.className="rh-n";o.textContent="⭐";o.style.animationDuration=q.sp+"s";L2.appendChild(o);notes.push(o);o.addEventListener("animationend",()=>{o.remove();notes.splice(notes.indexOf(o),1)});setTimeout(spawn,q.sp*1000*.55)};
  setTimeout(spawn,2200);window.__gSolve=()=>{q.done=true;gameWin(q,0,T,[])}};
GAMES.volc=volcQ;GAMES.rhythm=rhythmQ;

/* ---------- 3. read the names in every game where the child chooses between named things ---------- */
Object.assign(OPTREAD,{lab:".gr-o,.mg-it,.mx-o",ice:".ic-c",sand:".g7-g",sci:".gr-o,.sc-t",tapall:".ta-it",move:".mv-c"});
const optSay=l=>{l=l.toLowerCase().trim();if(/^[a-z]$/.test(l))return ["w/LULU_LN_"+l.toUpperCase()];return both(l)};
const _gro10=gReadOpts;gReadOpts=function(q){const sel=q&&OPTREAD[q.game];if(sel&&q.game!=="emo"){const bs=[...$("qBody").querySelectorAll(sel)].filter(b=>!b.disabled);
    if(bs.length>=2){const items=bs.map(b=>({b,c:optSay(optLabel(b))})).filter(x=>x.c.length);if(items.length===bs.length&&gReadList(q,q.voice||[],items))return true}}
  return _gro10(q)};

/* ---------- 4. no game twice in a day; letter hunting stops at 5 ---------- */
const SUBMAX={"tapall:letter":5,"catch:letter":5,"whack:letter":5,"sort:letter":5,"swipe:letter":5};
const _bf10=buildFormat;buildFormat=function(kind,cat){let q=null;for(let t=0;t<12;t++){q=_bf10(kind,cat);if(!q)return q;const sub=(q.game||"")+":"+(gsub(q)||"");if((S.age||6)<=(SUBMAX[sub]||99))return q}return null};
/* a game whose only content is now too young for the child is not offered at all */
const FPROBE={};const _ff10p=formatsFor0;formatsFor0=function(cat){const b=_ff10p(cat),key=cat+"|"+(S.age||6)+"|"+lvl();
  return b.filter(k=>{if(!/^f_(tapall|catch|whack|sort|swipe)$/.test(k))return true;const kk=key+"|"+k;if(FPROBE[kk]===undefined){let ok=false;for(let t=0;t<8&&!ok;t++){try{ok=!!buildFormat(k,cat)}catch(e){}}FPROBE[kk]=ok}return FPROBE[kk]})};

/* ---------- 5. Say it! the child repeats a word; the phone's speech recognition checks it ---------- */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const sayOK=()=>!!SR&&G10_READY&&S.mic!==false;
const SAYW=()=>{const a=lvl();
  if(a<=6)return WORDS.filter(x=>x.w.length<=4).map(x=>({w:x.w,pic:PIC("wd_"+x.i,"wp"),say:wSay(x)}));
  const L3=[...new Set([...Object.values(LW).flat(2),...CPW])].filter(w=>/^[a-z]{4,11}$/.test(w)&&!/^(sheep|fish|mice|men|feet|teeth|geese)$/.test(w));
  return L3.filter(w=>a>=9||w.length<=7).map(w=>({w,pic:"",say:EW(w)}))};
function qSay(cat){const w=pickOne(SAYW());return {game:"say",w,voice:[G10("SAY_Q"),...w.say],gid:"g:say",factT:"Saying words out loud helps you remember them."}}
const lev=(a,b)=>{const m=a.length,n=b.length,d=Array.from({length:m+1},(x,i)=>[i,...Array(n).fill(0)]);for(let j=1;j<=n;j++)d[0][j]=j;for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]};
function sayQ(q){let tries=0,rec=null,busy=false;const w=q.w.w;
  gShow(`<div class="game">${gHead("🎤","Say it!","Listen, then say it")}<div class="sy">${q.w.pic?`<div class="sy-pic">${q.w.pic}</div>`:""}<div class="sy-w">${w}</div>
    <button class="hr-play sm" id="syL" aria-label="Listen again">🔊</button><button class="sy-mic" id="syM" aria-label="Say it">🎤</button><div class="sy-h" id="syH">Tap 🎤 and say the word</div><button class="mv-skip" id="syS">Skip</button></div></div>`);gAsk(q);
  const H=$("syH"),M=$("syM");
  const done=ok=>{if(q.done)return;if(ok){sayseq([G10("SAY_GOOD")],()=>{});gameWin(q,tries>1?1:0,M,[])}else{q.done=true;gameLearn(q,w,q.w.say)}};
  const check=alts=>{const t=w.toLowerCase(),hit=alts.some(s=>{s=s.toLowerCase().replace(/[^a-z ]/g," ").trim();return s.split(/\s+/).some(x=>x===t||(t.length>=5&&lev(x,t)<=1))||s.replace(/\s+/g,"")===t});
    if(hit){H.textContent="✅ "+w+"!";done(true)}else{tries++;H.textContent=alts[0]?`I heard “${alts[0]}”. Try again!`:"I didn't hear it. Try again!";
      if(tries>=3){sayseq([G10("SAY_LAST"),...q.w.say],()=>{});done(false)}else sayseq([G10("SAY_AGAIN"),...q.w.say],()=>{})}};
  M.onclick=()=>{if(q.done||busy)return;hush();try{rec=new SR();rec.lang="en-US";rec.interimResults=false;rec.maxAlternatives=5;busy=true;M.classList.add("on");H.textContent="Listening…";
      rec.onresult=e=>{const alts=[...e.results[0]].map(r=>r.transcript);busy=false;M.classList.remove("on");check(alts)};
      rec.onerror=e=>{busy=false;M.classList.remove("on");if(e.error==="not-allowed"||e.error==="service-not-allowed"){H.textContent="The microphone is off - ask a grown-up, or tap Skip.";}else H.textContent="I didn't hear it. Try again!"};
      rec.onend=()=>{if(busy){busy=false;M.classList.remove("on");H.textContent="I didn't hear it. Try again!"}};rec.start()}catch(e){busy=false;M.classList.remove("on");H.textContent="Speaking isn't available here - tap Skip."}};
  $("syL").onclick=()=>{sfx.tap();hush();sayseq(q.w.say,()=>{})};
  $("syS").onclick=()=>{if(q.done)return;try{rec&&rec.abort()}catch(e){}q.done=true;gameLearn(q,w,q.w.say)};
  window.__gSolve=()=>{check([w])}}
GAMES.say=sayQ;
const _bf10s=buildFormat;buildFormat=function(kind,cat){if(kind==="f_say")return sayOK()?qSay(cat):null;return _bf10s(kind,cat)};
FMIN.f_say=4;
const _ff10=formatsFor0;formatsFor0=function(cat){const b=_ff10(cat);return sayOK()&&["letters","read","animals","farm"].includes(cat)&&ageOK("f_say")?[...b,"f_say"]:b};
Object.assign(GMAP,{"g:say":G("Say it!",["lang","listen"],[["lang","vocab"]],"Lulu says a word and the child says it back; the phone checks the pronunciation.","Practice")});
/* puzzle-type and path-type games also at most once a day */
DAYCAP.piece=1;DAYCAP.path=1;
/* fixed questions already end with their own spoken fact: no extra unspoken one (e.g. "206 is an even number") */
const _ff10f=factFor;factFor=function(q){const f=_ff10f(q);if(f&&q&&q.wid&&/^px/.test(q.wid)&&!factV(f).length)return "";return f};
