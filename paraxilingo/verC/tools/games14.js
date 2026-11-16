
/* =====================================================================================================
   v23 (Nov 14): talking Domi at the start, two prizes again (acorns = parents' prizes, wood = friends and
   stickers), pick your friend (beaver, unicorn, dino), sticker book by kind, seasonal house, player delete,
   skill list behind the radar.
   ===================================================================================================== */
const G14V=new Set(__G14V__),G14=n=>G14V.has("PX_G14_"+n)?["w/PX_G14_"+n]:[];
/* ---------- 1. talking Domi on the first screen ---------- */
const CHARS={dino:{n:"Dino",img:"img/e3/1f995.webp",price:40},robot:{n:"Robot",img:"img/e3/1f916.webp",price:40},bike:{n:"Bicycle",img:"img/e3/1f6b2.webp",price:40}};
const charOf=()=>{try{return curPlayer().domi||1}catch(e){return 1}};
domiSrc=function(){const d=charOf();return CHARS[d]?CHARS[d].img:`img/domi_${d}.svg`};
paintDomi=function(){document.querySelectorAll(".bv img").forEach(i=>i.src=domiSrc())};
/* the first screen: a small video of Domi talking (muted, so every browser plays it) and Lulu's hello.
   If the browser blocks sound before the first tap, Domi waits for a tap and then says hello. */
let introWait=false,introAfter=null;
function introTalk(on){const v=document.querySelector("#introC video.talk"),im=document.querySelector("#introC img.g14char"),d=charOf();
  if(CHARS[d]){if(v)v.hidden=true;if(im){im.hidden=false;im.src=CHARS[d].img;im.classList.toggle("bob",on)}return}
  if(im)im.hidden=true;if(!v)return;v.hidden=false;try{if(on){v.currentTime=0;const p=v.play();p&&p.catch(()=>{})}else v.pause()}catch(e){}}
function introHello(list,after){introAfter=after;if(!S.voice||!list.length){after();return}
  const a=new Audio("audio/"+list[0]+".mp3");a.playbackRate=.92;
  let ok=false;const fin=()=>{if(!ok)return;introTalk(false);after()};
  a.onended=()=>{if(list.length>1)sayseq(list.slice(1),fin);else fin()};a.onerror=()=>{ok=true;fin()};
  introTalk(true);const p=a.play();
  if(p&&p.then)p.then(()=>{ok=true;voice=a}).catch(()=>{
    /* the browser blocks sound until the first touch: Domi keeps talking (no sound), the app goes on by itself,
       and Lulu says hello at the child's first touch, unless something else starts talking then */
    setTimeout(after,1800);const once=()=>{document.removeEventListener("pointerdown",once,true);
      setTimeout(()=>{if(S.voice&&!(voice&&!voice.paused))sayseq(introList,()=>{})},450)};document.addEventListener("pointerdown",once,true)})}
function introTap(){if(!introWait)return false;introWait=false;const t=$("inTap");if(t)t.hidden=true;sfx.tap();introTalk(true);
  sayseq(introList,()=>{introTalk(false);introAfter&&introAfter()});return true}
let introList=[];
introTalk(false);
/* ---------- 2. two prizes: acorns for the parents' prize, wood for friends and stickers ---------- */
woodMig=function(){};
try{const s=$("sWood");s.hidden=false;s.style.display="";s.setAttribute("aria-label","Wood")}catch(e){}
const STK={unicorn:{n:"Unicorn",e:"🦄",c:"#FFE3F1",items:["🦄","🌈","🧁","🎠","💖","🍭","🌟","🎀","🪄","🌸","👑","✨"]},
 mermaid:{n:"Mermaid",e:"🧜‍♀️",c:"#DDF4FF",items:["🧜‍♀️","🐚","🐠","🐬","🐙","🦀","🐳","🫧","🪸","🐡","🌊","🦭"]},
 dino:{n:"Dino",e:"🦕",c:"#E6F8DC",items:["🦕","🦖","🥚","🌋","🦴","🐊","🦎","🐢","🌴","🪨","🐉","🐲"]},
 vehicles:{n:"Vehicles",e:"🚗",c:"#FFF3D6",items:["🚗","🚌","🚒","🚓","🚑","🚜","🚂","✈️","🚁","🚤","🏍️","🚀"]},
 robot:{n:"Robots",e:"🤖",c:"#ECE8FF",items:["🤖","⚙️","🔧","🔩","🛸","🔋","💡","🦾","🧲","📡","🕹️","🛰️"]}};
const stkPrice=i=>4+2*Math.floor(i/3);
const stkHave=()=>S.stk||(S.stk=[]),charsHave=()=>S.chars||(S.chars=[]);
const W14={mound:3,house:6};
openHouse=function(){if(S.day.house)return;S.day.house=true;S.acorns+=5;S.wood=(S.wood||0)+W14.house;save();say("w/LULU_BD_PRIZE_IS");
  const rv=reveal("🪵","Today's prize!",`+${W14.house} 🪵 wood and +5 🌰 acorns! Use wood to unlock new friends and stickers.`,()=>{renderMap();checkRealPrizes()});
  const gc=goalCard();if(gc)rv.querySelector("p").insertAdjacentHTML("afterend",gc)};
/* ---------- 3. pick your friend: Domi the beaver (5 colours) or a unicorn or dino bought with wood ---------- */
domiPicker=function(){const cur=charOf(),have=charsHave(),w=S.wood||0;
  return `<p class="dh">Pick your Domi <span class="g14w">🪵 ${w}</span></p><div class="domis g14domis">`+`<button class="dpick ${cur===1?"on":""}" data-domi="1" aria-label="Domi the beaver"><img src="img/domi_1.svg" alt=""></button>`
    +Object.entries(CHARS).map(([k,c])=>{const own=have.includes(k);return `<button class="dpick g14c ${k===cur?"on":""} ${own?"":"lock"}" data-domi="${k}" aria-label="${c.n}"><img src="${c.img}" alt="">${own?"":`<span class="g14lk"><b>🔒</b>${c.price} 🪵</span>`}</button>`}).join("")+`</div>`};
wireDomi=function(){document.querySelectorAll("[data-domi]").forEach(b=>b.onclick=e=>{e.stopPropagation();const k=b.dataset.domi,c=CHARS[k];
  if(c&&!charsHave().includes(k)){const w=S.wood||0;if(w<c.price){sfx.bad&&sfx.bad();toast(`You need ${c.price-w} more 🪵 wood for the ${c.n}. Finish mounds to get wood!`);return}
    S.wood=w-c.price;charsHave().push(k);save();renderStats();closeDrop();sfx.unlock&&sfx.unlock();hush();sayseq(G14("CHAR"),()=>{});
    reveal(`<img class="g14rv" src="${c.img}" alt="">`,`${c.n} is your new friend!`,`${c.n} will walk with you on the path.`,()=>{const p=curPlayer();p.domi=k;savePlayers();paintDomi();showMap()},"🎁");return}
  const p=curPlayer();p.domi=c?k:+k;savePlayers();sfx.tap();document.querySelectorAll("[data-domi]").forEach(x=>x.classList.toggle("on",x===b));paintDomi()})};
/* ---------- 4. prizes page: acorns (with a bar to the parents' prize), wood, one sticker book ---------- */
let stkTab=null;
const STKD=__STKD__,stkInfo=(cat,i)=>STKD.find(x=>x.cat===cat&&x.i===i);
function stkMigrate(){if(S.stkMig)return;const have=stkHave(),more=[];(S.stickers||[]).forEach(s=>{let hit=null;for(const [k,c] of Object.entries(STK)){const i=c.items.indexOf(s.e);if(i>=0){hit=k+":"+i;break}}
  if(hit){if(!have.includes(hit))have.push(hit)}else if(!more.includes(s.e))more.push(s.e)});S.stkMore=more;S.stkMig=1;save()}
function stkShow(e,name,fact,clip,bg){const old=document.querySelector(".g15show");if(old)old.remove();
  const d=document.createElement("div");d.className="g15show";d.style.setProperty("--bg",bg||"#FFF3BF");
  d.innerHTML=`<div class="g15rays"></div><button class="g15x" aria-label="Close">✕</button>
    <button class="g15big" aria-label="Make it dance"><span class="g15e">${e}</span></button>
    <h2 class="g15n">${name}</h2>${fact?`<p class="g15f">${fact}</p>`:""}
    <div class="g15btns">${clip?`<button class="g15hear">🔊 Hear it</button>`:""}<button class="g15dance">✨ Make it dance!</button></div>`;
  document.body.appendChild(d);sfx.good&&sfx.good();
  const big=d.querySelector(".g15big"),tricks=["spin","jump","wiggle","grow","flip"];let t=0;
  const burst=()=>{for(let k=0;k<10;k++){const p=document.createElement("span");p.className="g15p";p.innerHTML=e;const a=k/10*Math.PI*2+Math.random()*.4,r=110+Math.random()*70;
      p.style.setProperty("--dx",Math.cos(a)*r+"px");p.style.setProperty("--dy",Math.sin(a)*r+"px");p.style.setProperty("--rt",(Math.random()*540-270)+"deg");big.appendChild(p);setTimeout(()=>p.remove(),1000)}};
  const dance=()=>{const c=tricks[t++%tricks.length];big.classList.remove(...tricks);void big.offsetWidth;big.classList.add(c);burst();try{tone([[523,0,.12,"triangle",.08],[659,.1,.12,"triangle",.08],[784,.2,.2,"triangle",.08]])}catch(_){}};
  const hear=()=>{if(clip){hush();sayseq([clip],()=>{})}};
  big.onclick=dance;d.querySelector(".g15dance").onclick=dance;const h=d.querySelector(".g15hear");if(h)h.onclick=hear;
  const close=()=>{hush();d.classList.add("out");setTimeout(()=>d.remove(),250)};d.querySelector(".g15x").onclick=close;d.onclick=ev=>{if(ev.target===d)close()};
  setTimeout(()=>{burst();hear()},350)}
showPrizes=function(){hidePanels();$("pPrizes").hidden=false;$("map").hidden=true;stkMigrate();
  const have=stkHave(),w=S.wood||0,more=S.stkMore||[],tabs=Object.entries(STK).concat(more.length?[["more",{n:"More",e:"✨",c:"#FFF9DB",items:more}]]:[]),tab=(stkTab&&tabs.some(x=>x[0]===stkTab))?stkTab:tabs[0][0],T=tabs.find(x=>x[0]===tab)[1];
  $("pPrizes").innerHTML=`<button class="back" id="prBack"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>Back</button>
    <div class="prz prz2"><div class="g16bank"><div class="g16t a"><span class="g16i">🌰</span><b>${S.acorns}</b><small>Acorns</small><em>for my prize</em></div>
      <div class="g16t w"><span class="g16i">🪵</span><b>${w}</b><small>Wood</small><em>for friends and stickers</em></div></div>
    <h3 class="pz-h">🎁 ${S.real.length>1?"My prizes":"My prize"}</h3>
    ${S.real.length?"":`<button class="pz-card g16empty" id="g16Pick"><span class="pz-ph g16ph"><span>🎁</span></span><b class="pz-name">Prize</b><small class="g15left">Grown-ups: tap to choose the prize and its picture</small></button>`}
    ${S.real.map(r=>{const ok=S.acorns>=r.a,f=Math.min(1,S.acorns/r.a),left=Math.max(0,r.a-S.acorns);
      return `<button class="pz-card ${ok?"ready":""}" data-rp="${r.id}"><span class="pz-ph">${pzI(r)}${ok?`<span class="pz-burst">🎉</span>`:""}</span>
        <b class="pz-name">${r.name}</b>${ok?`<span class="pz-ready">Ready! Go and tell a grown-up 🎉</span>`:""}
        <span class="g15bar ${ok?"full":""}"><i style="width:${Math.max(6,Math.round(f*100))}%"></i><b>🌰 ${Math.min(S.acorns,r.a)} / ${r.a}</b></span>
        <small class="g15left">${ok?"The jar is full!":`${left} more 🌰 to go`}</small></button>`}).join("")}
    <div class="pz-how"><span><b>🌰</b>right answer</span><span><b>🪵×${W14.mound}</b>finished mound</span><span><b>🪵×${W14.house}</b>Domi's house</span></div>
    <h3 class="pz-h">📒 My sticker book</h3>
    <div class="g14tabs" style="grid-template-columns:repeat(${tabs.length},1fr)">${tabs.map(([k,c])=>`<button data-tab="${k}" aria-pressed="${k===tab}" style="--tc:${c.c}"><i>${c.e}</i><small>${c.n}</small><em>${k==="more"?c.items.length:c.items.filter((_,i)=>have.includes(k+":"+i)).length+"/12"}</em></button>`).join("")}</div>
    <div class="g14book" style="--bc:${T.c}">${T.items.map((e,i)=>{const id=tab+":"+i,own=tab==="more"||have.includes(id),pr=stkPrice(i);
      return `<button class="g14s ${own?"own":"lock"} ${!own&&w>=pr?"can":""}" data-sk="${i}" style="--r:${((i*37)%13)-6}deg"><span class="g14e">${e}</span>${own?"":`<span class="g14p">${pr} 🪵</span>`}</button>`}).join("")}</div>
    <p class="g15tip">Tap a sticker you have to meet it! ✨</p>
    ${S.paintings.length?`<h3 class="pz-h">🎨 My paintings</h3><div class="pz-gal">${S.paintings.slice().reverse().map(pp=>`<span class="pz-frame">${paintSVG(pp.p,pp.f)}</span>`).join("")}</div>`:""}</div>`;
  $("prBack").onclick=()=>{sfx.tap();showMap()};
  const pk=$("g16Pick");if(pk)pk.onclick=()=>{sfx.tap();window.__goPrize=1;askParents()};
  $("pPrizes").querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{sfx.tap();stkTab=b.dataset.tab;const y=$("pPrizes").scrollTop;showPrizes();$("pPrizes").scrollTop=y});
  $("pPrizes").querySelectorAll("[data-sk]").forEach(b=>b.onclick=()=>{const i=+b.dataset.sk,id=tab+":"+i,e=T.items[i];
    if(tab==="more"){stkShow(e,"My sticker","A sticker from Domi's house.",null,T.c);return}
    const inf=stkInfo(tab,i);
    if(have.includes(id)){stkShow(e,inf?inf.n:"My sticker",inf?inf.f:"",inf&&inf.clip?"w/"+inf.clip:null,T.c);return}
    const pr=stkPrice(i),w2=S.wood||0;if(w2<pr){sfx.bad&&sfx.bad();toast(`You need ${pr-w2} more 🪵 wood for this sticker`);return}
    S.wood=w2-pr;have.push(id);save();renderStats();const y=$("pPrizes").scrollTop;showPrizes();$("pPrizes").scrollTop=y;
    stkShow(e,inf?inf.n:"New sticker!",(inf?inf.f+" ":"")+`(You used ${pr} 🪵)`,inf&&inf.clip?"w/"+inf.clip:G14("STICKER")[0],T.c)});
  $("pPrizes").querySelectorAll("[data-rp]").forEach(b=>b.onclick=()=>{const r=S.real.find(x=>x.id===b.dataset.rp),ok=S.acorns>=r.a;
    reveal(pzI(r,"big"),r.name,ok?"Ready! Ask a grown-up for your prize 🎉":`${Math.max(0,r.a-S.acorns)} more 🌰 to go!`,null,ok?"🎁":"🔒")})};
$("tbPrizes").onclick=()=>{sfx.tap();showPrizes()};
/* ---------- 5. the map follows the date by itself; the house dresses up for the season or the holiday ---------- */
const _ls14=loadState;loadState=function(){const r=_ls14.apply(this,arguments);try{S.mapMonth="auto";charMig()}catch(e){}return r};
function charMig(){if(S.chars&&S.chars.includes("uni")){S.chars=S.chars.filter(x=>x!=="uni");S.wood=(S.wood||0)+40;save()}try{const p=curPlayer();if(p.domi==="uni"||[2,3,4,5].includes(p.domi)){p.domi=1;savePlayers()}}catch(e){}}
try{S.mapMonth="auto";charMig()}catch(e){}
function seasonKey(d=new Date()){const ev=eventNow(d);if(ev)return ev.id;const m=d.getMonth();return m===11||m<=1?"winter":m<=4?"spring":m<=7?"summer":"autumn"}
const SEAS14={
 winter:`<path d="M27 112 C30 64 62 33 100 33 C138 33 170 64 173 112 C160 98 150 106 138 94 C124 104 112 92 100 101 C88 92 76 104 62 94 C50 106 40 98 27 112Z" fill="#fff"/><ellipse cx="100" cy="152" rx="98" ry="14" fill="#fff"/><g fill="#fff"><circle cx="16" cy="40" r="3"/><circle cx="186" cy="30" r="3.5"/><circle cx="40" cy="12" r="2.5"/><circle cx="160" cy="8" r="2.5"/><circle cx="190" cy="80" r="2.5"/><circle cx="8" cy="90" r="2.5"/></g><g transform="translate(176 118)"><circle cy="20" r="13" fill="#fff" stroke="#D0EBFF" stroke-width="2"/><circle cy="0" r="9" fill="#fff" stroke="#D0EBFF" stroke-width="2"/><path d="M0 1 l7 2 -7 2z" fill="#FD7E14"/><circle cx="-3" cy="-2" r="1.3" fill="#343A40"/><circle cx="3" cy="-2" r="1.3" fill="#343A40"/></g>`,
 spring:`<ellipse cx="100" cy="152" rx="98" ry="14" fill="#8CE99A"/><g>${[[14,146,"#F783AC"],[34,152,"#FFD43B"],[58,150,"#B197FC"],[142,150,"#F783AC"],[166,152,"#FFD43B"],[188,146,"#74C0FC"]].map(([x,y,c])=>`<g transform="translate(${x} ${y})"><circle r="4" cx="-4" fill="${c}"/><circle r="4" cx="4" fill="${c}"/><circle r="4" cy="-4" fill="${c}"/><circle r="4" cy="4" fill="${c}"/><circle r="3" fill="#FFF3BF"/></g>`).join("")}</g><text x="168" y="40" font-size="22">🦋</text><path d="M60 52 Q70 40 82 46" stroke="#69DB7C" stroke-width="4" fill="none"/><circle cx="84" cy="45" r="5" fill="#FCC2D7"/>`,
 summer:`<g transform="translate(176 22)"><circle r="16" fill="#FFD43B"/><g stroke="#FFD43B" stroke-width="4" stroke-linecap="round">${[0,45,90,135,180,225,270,315].map(a=>`<path d="M0 -22 V-28" transform="rotate(${a})"/>`).join("")}</g></g><ellipse cx="100" cy="152" rx="98" ry="14" fill="#8CE99A"/><g transform="translate(26 140)"><circle r="12" fill="#fff"/><path d="M-12 0 A12 12 0 0 1 0 -12 V0Z" fill="#FF6B6B"/><path d="M0 -12 A12 12 0 0 1 12 0 H0Z" fill="#4DABF7"/><path d="M12 0 A12 12 0 0 1 0 12 V0Z" fill="#FFD43B"/></g>`,
 autumn:`<ellipse cx="100" cy="152" rx="98" ry="14" fill="#FFD8A8"/>${[[30,70,"#F76707",20],[60,44,"#FAB005",-30],[140,46,"#E8590C",40],[168,82,"#F59F00",-10],[20,148,"#E8590C",60],[176,146,"#F76707",-40],[120,156,"#FAB005",10]].map(([x,y,c,r])=>`<path transform="translate(${x} ${y}) rotate(${r})" d="M0 -9 C7 -6 9 2 0 9 C-9 2 -7 -6 0 -9Z" fill="${c}"/>`).join("")}`,
 christmas:`<path d="M27 112 C30 64 62 33 100 33 C138 33 170 64 173 112 C160 98 150 106 138 94 C124 104 112 92 100 101 C88 92 76 104 62 94 C50 106 40 98 27 112Z" fill="#fff"/><path d="M30 100 Q100 60 170 100" stroke="#2B8A3E" stroke-width="2" fill="none"/>${[40,58,76,94,112,130,148,164].map((x,i)=>`<circle cx="${x}" cy="${100-Math.sin((x-30)/140*Math.PI)*30}" r="4" fill="${["#FA5252","#FFD43B","#4DABF7","#69DB7C"][i%4]}"/>`).join("")}<g transform="translate(178 104)"><path d="M0 -40 L18 0 H-18Z" fill="#2B8A3E"/><path d="M0 -26 L22 14 H-22Z" fill="#2F9E44"/><rect x="-4" y="14" width="8" height="10" fill="#8B5A2B"/><path d="M0 -50 l3 7 h7 l-6 4 2 7 -6 -4 -6 4 2 -7 -6 -4 h7z" fill="#FFD43B"/></g><ellipse cx="100" cy="152" rx="98" ry="14" fill="#fff"/>`,
 halloween:`<ellipse cx="100" cy="152" rx="98" ry="14" fill="#FFD8A8"/>${[[52,140],[150,140]].map(([x,y])=>`<g transform="translate(${x} ${y})"><ellipse rx="15" ry="12" fill="#FD7E14"/><ellipse rx="6" ry="12" fill="#F76707"/><rect x="-2" y="-16" width="4" height="6" fill="#2B8A3E"/><path d="M-8 -3 l3 -4 3 4z M2 -3 l3 -4 3 4z M-7 4 q7 5 14 0" fill="#5C2B00"/></g>`).join("")}<text x="10" y="40" font-size="20">🦇</text><text x="168" y="30" font-size="18">🦇</text>`,
 yalda:`<ellipse cx="100" cy="152" rx="98" ry="14" fill="#E5DBFF"/><g transform="translate(40 146)"><path d="M-18 0 A18 18 0 0 0 18 0Z" fill="#2F9E44"/><path d="M-15 0 A15 15 0 0 0 15 0Z" fill="#FF6B6B"/><g fill="#212529"><circle cx="-6" cy="5" r="1.4"/><circle cx="4" cy="7" r="1.4"/><circle cx="0" cy="3" r="1.4"/></g></g><g transform="translate(160 142)"><circle r="11" fill="#C92A2A"/><path d="M-3 -11 l3 -5 3 5z" fill="#C92A2A"/></g><text x="170" y="40" font-size="20">🕯️</text><circle cx="30" cy="28" r="10" fill="#FFF3BF"/><circle cx="34" cy="25" r="9" fill="#BFE0F5"/>`,
 nowruz:`<ellipse cx="100" cy="152" rx="98" ry="14" fill="#8CE99A"/><g transform="translate(36 140)"><rect x="-14" y="-4" width="28" height="12" rx="4" fill="#DEE2E6"/><path d="M-12 -4 q2 -14 4 0 q2 -16 4 0 q2 -14 4 0 q2 -16 4 0 q2 -14 4 0 q2 -12 4 0" fill="#51CF66"/></g><g transform="translate(164 136)"><circle r="13" fill="#D0EBFF" stroke="#74C0FC" stroke-width="2"/><path d="M-6 2 q6 -8 10 0 q-4 6 -10 0z M4 2 l5 -4 v8z" fill="#FD7E14"/></g><path d="M150 40 Q170 30 186 44" stroke="#8B5A2B" stroke-width="3" fill="none"/>${[[160,34],[172,36],[182,42]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#FCC2D7"/>`).join("")}`,
 valentine:`<ellipse cx="100" cy="152" rx="98" ry="14" fill="#FFDEEB"/>${[[24,40,1],[176,36,1.2],[30,128,.9],[172,126,1]].map(([x,y,s])=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0 6 C-14 -4 -8 -14 0 -7 C8 -14 14 -4 0 6Z" fill="#F06595"/>`).join("")}`,
 thanks:`<ellipse cx="100" cy="152" rx="98" ry="14" fill="#FFD8A8"/>${[[30,70,"#F76707",20],[168,82,"#F59F00",-10],[20,148,"#E8590C",60]].map(([x,y,c,r])=>`<path transform="translate(${x} ${y}) rotate(${r})" d="M0 -9 C7 -6 9 2 0 9 C-9 2 -7 -6 0 -9Z" fill="${c}"/>`).join("")}<g transform="translate(160 146)"><path d="M-16 0 A16 8 0 0 0 16 0Z" fill="#E8590C"/><ellipse rx="16" ry="5" fill="#FFC078"/></g>`};
const _rm14=renderMap;renderMap=function(){const r=_rm14.apply(this,arguments);try{const k=seasonKey(),lg=houseEl&&houseEl.querySelector("svg.lodge");
  if(lg&&lg.dataset.seas!==k){lg.querySelectorAll(".g14s").forEach(g=>g.remove());(lg.firstElementChild||lg).insertAdjacentHTML("afterend",`<g class="g14s g14back">${(SEAS14[k]||"").match(/<ellipse cx="100" cy="152"[^>]*\/>/)?.[0]||""}</g>`);
    lg.insertAdjacentHTML("beforeend",`<g class="g14s">${(SEAS14[k]||"").replace(/<ellipse cx="100" cy="152"[^>]*\/>/,"")}</g>`);lg.dataset.seas=k}}catch(e){}return r};
/* ---------- 6. parents: no month map picker and no sticker picker; players can be removed ---------- */
const _sp14=showParents;showParents=function(){const r=_sp14.apply(this,arguments);try{const root=$("pSettings");
  root.querySelectorAll(".psec").forEach(s=>{const t=s.textContent.trim();if(/^🗺️?\s*Map$/.test(t)||/Map$/.test(t)&&s.nextElementSibling&&s.nextElementSibling.classList.contains("pmonths")||s.nextElementSibling&&s.nextElementSibling.querySelector&&s.nextElementSibling.querySelector("[data-rw]")){s.nextElementSibling.remove();s.remove()}});
  const snd=[...root.querySelectorAll(".psec")].find(s=>/Sound/.test(s.textContent));
  const pl=document.createElement("div");pl.innerHTML=`<div class="psec"><span>👧</span>Players</div><p class="pnote">Each child has their own progress, acorns, wood and stickers.</p>
    <div class="g14pl">${P.list.map(p=>{const st=p.id===P.cur?S:peek(p.id);return `<div class="g14pr"><span class="ci" style="background:${p.color}">${esc(p.name.trim()[0].toUpperCase())}</span><span class="g14pn"><b>${esc(p.name)}</b><small>Age ${st.age||"-"} · 🌰 ${st.acorns||0} · 🪵 ${st.wood||0}${p.id===P.cur?" · playing now":""}</small></span>${P.list.length>1?`<button class="g14del" data-pdel="${p.id}" aria-label="Delete ${esc(p.name)}">Delete</button>`:""}</div>`}).join("")}</div>
    <div class="addpl g14add"><input id="g14Name" maxlength="16" placeholder="New player's name" aria-label="New player's name"><button class="btn green" id="g14Add">Add</button></div>`;
  if(snd)snd.before(...pl.childNodes);else root.appendChild(pl);
  root.querySelectorAll("[data-pdel]").forEach(b=>b.onclick=()=>{const id=b.dataset.pdel,p=P.list.find(x=>x.id===id);if(!p)return;
    modal(`<div style="font-size:48px;line-height:1">🗑️</div><h3>Delete ${esc(p.name)}?</h3><p>All of ${esc(p.name)}'s progress, acorns, wood and stickers will be erased. This cannot be undone.</p>`,
      [{label:"Delete",cls:"red",go:()=>{const y=root.scrollTop;if(P.cur===id){save();const o=P.list.find(x=>x.id!==id);P.cur=o.id;savePlayers();loadState()}
        P.list=P.list.filter(x=>x.id!==id);savePlayers();try{localStorage.removeItem(keyFor(id))}catch(e){}paintDomi();landEl=null;renderStats();showParents();root.scrollTop=y;toast(`${p.name} was deleted`)}},{label:"Cancel",cls:"ghost"}])});
  $("g14Add").onclick=()=>{const n=$("g14Name").value.trim();if(!n){$("g14Name").focus();return}const id="p"+Date.now();P.list.push({id,name:n,color:PCOLORS[P.list.length%PCOLORS.length]});savePlayers();
    try{const st=fresh();st.seen=true;localStorage.setItem(keyFor(id),JSON.stringify(st))}catch(e){}const y=root.scrollTop;sfx.tap();showParents();root.scrollTop=y;toast(`${n} was added - switch players with the button at the top left`)};
}catch(e){console.warn(e)}return r};
/* ---------- 7. parents: the radar on top; the six areas and their scores on their own page ---------- */
const _dh14=dashHTML;dashHTML=function(pn){const h=_dh14(pn);try{const t=document.createElement("template");t.innerHTML=h;const R=t.content.querySelector(".dradar");
  if(R){R.querySelectorAll(".rcap,.rleg,.plist").forEach(x=>x.remove());R.classList.add("g14open");R.insertAdjacentHTML("beforeend",`<button class="g14more" id="g14Sk">See the scores for each area <span class="chev">›</span></button>`)}
  return t.innerHTML}catch(e){return h}};
function skillsHTML(pn){const t=document.createElement("template");t.innerHTML=_dh14(pn);const R=t.content.querySelector(".dradar");
  return `<div class="dash pdet"><button class="dback" id="dBack">‹ Back</button>${R?R.outerHTML:""}</div>`}
const _wd14=wireDash;wireDash=function(pn){_wd14(pn);try{const root=$("pSettings"),R=root.querySelector(".dradar.g14open");if(!R)return;
  const go=e=>{e.stopPropagation();e.preventDefault();sfx.tap();root.innerHTML=skillsHTML(pn);root.scrollTop=0;$("dBack").onclick=()=>{sfx.tap();showParents()};_wd14(pn)};
  R.addEventListener("click",go,true)}catch(e){}};
/* ---------- v24: the flag game shows where the country is on a world map ---------- */
const WMAP=__WORLD__;
const mapOf=n=>{const c=WMAP.c[n];if(!c)return "";const small=c.d.length<900;
  return `<span class="g15map"><svg viewBox="0 0 ${WMAP.W} ${WMAP.H}" aria-label="${n} on the world map"><image href="img/world.svg" width="${WMAP.W}" height="${WMAP.H}"/><path d="${c.d}" fill="#FF922B" stroke="#D9480F" stroke-width=".8"/>${small?`<circle class="g15pin" cx="${c.x}" cy="${c.y}" r="9" fill="none" stroke="#E8590C" stroke-width="2.2"/>`:""}</svg></span>`};
const _qsw15=qSwipe;qSwipe=function(cat){const q=_qsw15(cat);try{if(q&&q.deck==="flag")q.cards.forEach(c=>{const n=String(c[1]).replace(/\?$/,"");if(WMAP.c[n])c[1]=`${c[1]}${mapOf(n)}`})}catch(e){}return q};
/* ---------- v24: the prizes button is the trophy again ---------- */
const _rs15=renderStats;renderStats=function(){const r=_rs15.apply(this,arguments);try{const b=$("tbPrizes"),dot=$("prDot"),h=dot?dot.hidden:true;b.classList.remove("hasg");b.innerHTML=`🏆<span class="dotn" id="prDot"${h?" hidden":""}>!</span>`}catch(e){}return r};
try{renderStats()}catch(e){}
/* ---------- v24: parents' level: three clear examples side by side ---------- */
const SK_EX=[["2 + 1","4 + 1"],["6 + 3","4 + 5"],["9 − 4","7 + 2"],["14 + 5","18 − 6"],["35 − 12","5 × 4"],["72 + 19","6 × 7"],["56 ÷ 8","9 × 7"],["11 × 12","450 + 380"]];
const SK_T=["Adding to 5","Adding to 10","+ and − to 10","+ and − to 20","To 50, first × tables","To 100, × to 6","× and ÷ to 10","× and ÷ to 12, numbers to 1000"];
const CNT_T=a=>a<=3?"counts to 5":a<=4?"counts to 10":a<=5?"counts to 20":a<=6?"counts to 50":a<=7?"counts to 100":"big numbers, place value";
const RD_T=a=>a<=4?"finds letters":a<=5?"first sounds":a<=6?"reads short words":a<=8?"reads sentences":"reads short stories";
const _sp15=showParents;showParents=function(){const r=_sp15.apply(this,arguments);if(window.__goPrize){window.__goPrize=0;setTimeout(()=>{const P2=$("pSettings"),h=[...P2.querySelectorAll(".psec")].find(x=>/Prize/.test(x.textContent));if(h)P2.scrollTop=h.getBoundingClientRect().top+P2.scrollTop-80},60)}try{const ps=$("pSettings").querySelector(".psample");if(ps){
  const a=S.age||5;ps.outerHTML=`<div class="g15lv">${[["🐢","Easier",0],["🐇","Just right",1],["🚀","Harder",2]].map(([e,t,d])=>{const sk=skillFor(a,d),la=Math.max(3,Math.min(12,a+d-1));
    return `<button class="g15lc ${S.diff===d?"on":""}" data-diff15="${d}"><i>${e}</i><b>${t}</b></button>`}).join("")}</div>`;
  $("pSettings").querySelectorAll("[data-diff15]").forEach(b=>b.onclick=()=>{const y=$("pSettings").scrollTop;const t=$("pSettings").querySelector(`[data-diff="${b.dataset.diff15}"]`);if(t)t.click();setTimeout(()=>{$("pSettings").scrollTop=y},0)})}}catch(e){console.warn(e)}return r};

/* ---------- v25b: the first screen: Domi's talking video and Lulu's hello start together and stop together ---------- */
/* the first screen shows the parent's own GIF, untouched; nothing is swapped or restarted, so nothing blinks */
let introSet=false;
introTalk=function(on){if(introSet)return;introSet=true;const g=document.querySelector("#introC img.g17gif"),im=document.querySelector("#introC img.g14char"),d=charOf();
  if(CHARS[d]){if(g)g.style.display="none";if(im){im.hidden=false;im.src=CHARS[d].img;im.classList.add("bob")}}else if(im)im.hidden=true};
introHello=function(list,after){introAfter=after;after()};   /* no voice on the first screen (parent, Nov 15): the dancing Domi is enough */
introTalk(false);
/* ---------- v25: voices start without a wait: clips are kept ready, and the next ones load while one plays ---------- */
const CLIPC=new Map();
const clipEl=name=>{let a=CLIPC.get(name);if(!a){a=new Audio("audio/"+name+".mp3");a.preload="auto";try{a.load()}catch(e){}CLIPC.set(name,a);if(CLIPC.size>120){const k=CLIPC.keys().next().value;CLIPC.delete(k)}}return a};
window.__pre=list=>{(list||[]).filter(Boolean).forEach(n=>{if(typeof n==="string")clipEl(n)})};
say=function(name,onEnd,rate=.92){
  if(voice){voice.onended=null;voice.onerror=null;try{voice.pause()}catch(e){}voice=null}
  speakBtns(false);if(!S.voice){onEnd&&onEnd();return}
  let a=clipEl(name);if(!a.paused||a.ended===false&&a.currentTime>0){try{a.pause()}catch(e){}}
  try{a.currentTime=0}catch(e){}voice=a;a.playbackRate=rate;try{a.preservesPitch=true;a.webkitPreservesPitch=true}catch(e){}
  if(name.startsWith("q_"))speakBtns(true);
  const end=()=>{a.onended=null;a.onerror=null;speakBtns(false);onEnd&&onEnd()};a.onended=end;a.onerror=()=>{CLIPC.delete(name);end()};
  const p=a.play();p&&p.catch&&p.catch(()=>speakBtns(false))};
sayseq=function(list,onEnd){const id=++seqId,l=list.filter(Boolean);let i=0;window.__pre(l);
  const next=()=>{if(id!==seqId)return;if(i>=l.length){speaking(false);onEnd&&onEnd();return}say(l[i++],()=>{if(i<l.length)setTimeout(next,110);else next()})};
  speaking(true);next()};
/* get the next question's voice ready while the child is still on the map or the answer screen */
const _gs16=gShow;gShow=function(){const r=_gs16.apply(this,arguments);try{const q=window.__curQ;if(q){window.__pre(q.voice);(q.opts||[]).forEach(o=>window.__pre(o.say))}}catch(e){}return r};
/* ---------- v25: more speaking games for 5 to 8: name it, read it, say the sentence (the phone checks the words) ---------- */
const SENTS=__SENTS__,G16V=new Set(__G16V__),G16=n=>G16V.has("PX_G16_"+n)?["w/PX_G16_"+n]:[];
/* English sentences: Lulu's recording when it is there, otherwise the device's own English voice */
const enTTS=t=>{try{const u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=.8;u.pitch=1.15;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}};
const sentSay=s=>s.has?["w/"+s.clip]:[];
Object.assign(FMIN,{f_say:4,f_sayname:5,f_readit:5,f_saysent:5});Object.assign(FMAX,{f_say:8,f_sayname:8,f_readit:8,f_saysent:8});
const normW=s=>String(s).toLowerCase().replace(/[^a-z' ]/g," ").replace(/\s+/g," ").trim();
/* one tap on the mic: listen once, give back what was heard (several guesses) */
function micListen(M,H,onAlts){if(M.dataset.busy==="1")return;hush();let rec;try{rec=new SR()}catch(e){H.textContent="Speaking isn't available here - tap Skip.";return}
  rec.lang="en-US";rec.interimResults=false;rec.maxAlternatives=5;M.dataset.busy="1";M.classList.add("on");H.textContent="Listening…";
  const stop=()=>{M.dataset.busy="";M.classList.remove("on")};
  rec.onresult=e=>{stop();onAlts([...e.results[0]].map(r=>r.transcript))};
  rec.onerror=e=>{stop();H.textContent=(e.error==="not-allowed"||e.error==="service-not-allowed")?"The microphone is off - ask a grown-up, or tap Skip.":"I didn't hear it. Try again!"};
  rec.onend=()=>{if(M.dataset.busy==="1"){stop();H.textContent="I didn't hear it. Try again!"}};try{rec.start()}catch(e){stop()}
  return rec}
const wordHit=(alts,t)=>alts.some(s=>normW(s).split(" ").some(x=>x===t||x===t+"s"||t===x+"s"||(t.length>=4&&lev(x,t)<=1))||normW(s).replace(/ /g,"")===t);
/* a speaking round: shows the thing, listens up to 3 times, then shows and says the answer */
/* a speaking game is 5 rounds: say 5 things, then the game is done (parent, Nov 15) */
const ROUNDS16=5;
function speakRounds(q,mk){const items=q.items;let i=0,good=0,rec=null,tries=0,busyNext=false;
  const dots=()=>`<div class="g16dots">${items.map((_,k)=>`<i class="${k<i?"done":k===i?"now":""}"></i>`).join("")}</div>`;
  const finish=()=>{if(q.done)return;const M=$("syM");if(good>=Math.ceil(items.length/2))gameWin(q,Math.min(2,items.length-good),M,[]);else{q.done=true;gameLearn(q,"Great practice! Let's say more next time.",[])}};
  const next=d=>{busyNext=true;setTimeout(()=>{busyNext=false;i++;if(i>=items.length)finish();else round()},d)};
  const round=()=>{const o=mk(items[i],i);tries=0;
    gShow(`<div class="game">${gHead(o.icon,o.title,o.sub)}${dots()}<div class="sy g16sy">${o.body}
      ${o.listen?`<button class="hr-play sm" id="syL" aria-label="Listen again">🔊</button>`:""}<button class="sy-mic" id="syM" aria-label="Say it">🎤</button><div class="sy-h" id="syH">${o.hint}</div><button class="mv-skip" id="syS">Skip</button></div></div>`);
    if(i===0)gAsk(q);else{hush();sayseq(o.voice||[],()=>{})}
    const H=$("syH"),M=$("syM");if(o.tts)setTimeout(()=>enTTS(o.tts),(o.voice||[]).length?1800:300);
    const got=alts=>{if(busyNext||q.done)return;const r=o.check(alts);
      if(r.ok){good++;H.textContent="✅ "+o.answer;try{sfx.good&&sfx.good()}catch(e){}sayseq([G10("SAY_GOOD")],()=>{});const d=document.querySelector(".g16dots i.now");if(d)d.classList.add("ok");next(1600);return}
      tries++;H.textContent=alts[0]?`I heard “${alts[0]}”. Try again!`:"I didn't hear it. Try again!";
      if(tries>=3){o.reveal&&o.reveal();H.textContent="Let's say it together: "+o.answer;sayseq([G10("SAY_LAST"),...o.answerSay],()=>{if(o.tts)enTTS(o.tts);next(o.tts?2600:900)})}
      else sayseq([G10("SAY_AGAIN"),...(o.again||[])],()=>{if(o.tts)enTTS(o.tts)})};
    M.onclick=()=>{if(!q.done&&!busyNext)rec=micListen(M,H,got)};
    const L=$("syL");if(L)L.onclick=()=>{sfx.tap();hush();if(o.tts)enTTS(o.tts);else sayseq(o.answerSay,()=>{})};
    $("syS").onclick=()=>{if(q.done||busyNext)return;try{rec&&rec.abort()}catch(e){}o.reveal&&o.reveal();sayseq(o.answerSay,()=>{});next(1400)};
    window.__gSolve=()=>got([o.answer])};
  round()}
const pick5=a=>sh(a).slice(0,ROUNDS16);
/* Name it! Lulu asks "what is it? say it in English", then says the name; the child says it */
const NUMW=/^(one|two|three|four|five|six|seven|eight|nine|ten|zero)$/;const nameWords=()=>{const a=lvl();return WORDS.filter(x=>!NUMW.test(x.w)&&(a>=7?x.w.length<=8:x.w.length<=5)).map(x=>({w:x.w,pic:PIC("wd_"+x.i,"wp"),say:wSay(x)}))};
const NAMEQ=()=>G16("NAME_Q").length?G16("NAME_Q"):[G10("SAY_Q")];
function qSayName(){const items=pick5(nameWords());return {game:"sayname",items,w:items[0],voice:[...NAMEQ(),...items[0].say],gid:"g:sayname",factT:"Naming things out loud builds your English words."}}
GAMES.sayname=q=>speakRounds(q,x=>({icon:"🗣️",title:"Name it!",sub:"What is it? Say it in English",listen:true,again:x.say,voice:[...NAMEQ(),...x.say],
  body:`<div class="sy-pic g16pic">${x.pic}</div><div class="sy-w">${x.w}</div>`,hint:"Tap 🎤 and say its name",answer:x.w,answerSay:x.say,check:alts=>({ok:wordHit(alts,x.w)})}));
/* Read it! a word in big letters; the child reads it out loud, then Lulu says it */
const readWords=()=>{const a=lvl(),pool=WORDS.map(x=>({w:x.w,say:wSay(x)}));
  return a<=5?pool.filter(x=>x.w.length===3):a<=6?pool.filter(x=>x.w.length<=4):pool.filter(x=>x.w.length>=4)};
const READQ=()=>G16("READ_Q").length?G16("READ_Q"):[G10("SAY_Q")];
function qReadIt(){const items=pick5(readWords());return {game:"readit",items,w:items[0],voice:READQ(),gid:"g:readit",factT:"Reading out loud makes you a stronger reader."}}
GAMES.readit=q=>speakRounds(q,(x,i)=>({icon:"📖",title:"Read it!",sub:"Read the word out loud",voice:i?[]:READQ(),
  body:`<div class="sy-w g16big">${x.w.split("").map(c=>`<i>${c}</i>`).join("")}</div>`,hint:"Tap 🎤 and read the word",answer:x.w,answerSay:x.say,check:alts=>({ok:wordHit(alts,x.w)})}));
/* Say the sentence: Lulu says a short English sentence; the child says it back; each word lights up when heard */
const SENTQ=()=>G16("SENT_Q").length?G16("SENT_Q"):[G10("SAY_Q")];
function qSaySent(){const a=lvl(),pool=SENTS.filter(s=>a<=6?s.a<=5:s.a>=7);const items=pick5(pool.length?pool:SENTS);
  return {game:"saysent",items,s:items[0],voice:[...SENTQ(),...sentSay(items[0])],gid:"g:saysent",factT:"Saying whole sentences helps you speak English."}}
GAMES.saysent=q=>speakRounds(q,(s,i)=>{const words=normW(s.s).split(" ");return {icon:"💬",title:"Say the sentence",sub:"Listen, then say it",listen:true,voice:i?sentSay(s):[...SENTQ(),...sentSay(s)],
  body:`<div class="sy-pic g16pic"><span class="g16e">${s.e}</span></div><div class="g16sent">${s.s.split(" ").map((x,k)=>`<span data-k="${k}">${x}</span>`).join(" ")}</div>`,
  hint:"Tap 🎤 and say the sentence",answer:s.s,answerSay:sentSay(s),again:sentSay(s),tts:s.has?null:s.s,
  check:alts=>{let best=0,bestSet=[];alts.forEach(al=>{const h=normW(al).split(" ");const set=words.map(t=>h.some(x=>x===t||(t.length>=4&&lev(x,t)<=1)));const n=set.filter(Boolean).length;if(n>best){best=n;bestSet=set}});
    bestSet.forEach((v,k)=>{const e=document.querySelector(`.g16sent [data-k="${k}"]`);if(e)e.classList.toggle("ok",v)});
    return {ok:best>=Math.ceil(words.length*.75)}}}});
/* Say it! (the first speaking game) is 5 words too */
const _qSay16=qSay;qSay=function(cat){const items=pick5(SAYW());return {game:"say",items,w:items[0],voice:[G10("SAY_Q"),...items[0].say],gid:"g:say",factT:"Saying words out loud helps you remember them."}};
GAMES.say=q=>{if(!q.items)q.items=[q.w];speakRounds(q,(x,i)=>({icon:"🎤",title:"Say it!",sub:"Listen, then say it",listen:true,again:x.say,voice:i?x.say:[G10("SAY_Q"),...x.say],
  body:`${x.pic?`<div class="sy-pic">${x.pic}</div>`:""}<div class="sy-w">${x.w}</div>`,hint:"Tap 🎤 and say the word",answer:x.w,answerSay:x.say,check:alts=>({ok:wordHit(alts,x.w)})}))};
const _bf16=buildFormat;buildFormat=function(kind,cat){if(kind==="f_sayname")return sayOK()?qSayName():null;if(kind==="f_readit")return sayOK()?qReadIt():null;if(kind==="f_saysent")return sayOK()&&(SENTS.some(s=>s.has)||"speechSynthesis" in window)?qSaySent():null;return _bf16(kind,cat)};
const SPK16={f_say:["letters","read","animals","farm","people"],f_sayname:["animals","farm","world","people","letters"],f_readit:["letters","read"],f_saysent:["read","letters","people","farm","world"]};
const _ff16=formatsFor0;formatsFor0=function(cat){let b=_ff16(cat).filter(k=>k!=="f_say");if(!sayOK())return b;
  Object.entries(SPK16).forEach(([k,cs])=>{if(cs.includes(cat)&&ageOK(k)&&!b.includes(k))b=[...b,k]});return b};
Object.assign(GMAP,{"g:sayname":G("Name it!",["lang","listen"],[["lang","vocab"]],"A picture appears and the child says its English name; the phone checks the word.","Practice"),
  "g:readit":G("Read it!",["lang","listen"],[["lang","vocab"]],"The child reads a word out loud; the phone checks it, then Lulu says it.","Practice"),
  "g:saysent":G("Say the sentence",["lang","listen"],[["lang","vocab"]],"Lulu says a short English sentence and the child repeats it; each word lights up when the phone hears it.","Practice")});
/* ---------- v26: the parent's new land picture (Land_Beaver): 7 mounds on one path, the big house at the top ---------- */
const LAND26={src:"img/w/land_beaver.webp",h:1920,
  holes:[[71.6,69.9],[27.5,60.4],[72.5,51.4],[29,43.4],[72,35.6],[29,29.3],[69.4,24]],   /* on the sign above each mound */
  stand:[[48,85],[50,74.5],[48,64.5],[51,55.5],[48,47.5],[52,39.5],[49,33]],start:[44,95],house:[50,19]};
for(let z=0;z<HOLES.length;z++){HOLES[z]=LAND26.holes.map(p=>p.slice());MOUNDS[z]=LAND26.stand.map(p=>p.slice());TILE_H[z]=LAND26.h}
try{STARTS.length=0;TOTAL=0;HOLES.forEach((h,z)=>{STARTS[z]=TOTAL;TOTAL+=h.length})}catch(e){}
const LAND_SRC=z=>LAND26.src;
const _dp26=dayPlan;dayPlan=function(){try{if(S.day&&S.day.plan&&S.day.plan.length!==HOLES[landIdx()].length)S.day.v=0}catch(e){}return _dp26()};
landEl=null;
/* the big house is in the picture now: the old drawn house becomes an invisible door over it */
const _bm26=buildMap;buildMap=function(){_bm26();try{houseEl.classList.add("g26house");landEl.appendChild(houseEl)}catch(e){}};
/* Domi starts at the beginning of the path and walks to the first mound when the map opens */
let walkedIn26=false;
const _pb26=placeBeaver;placeBeaver=function(animate){const n=HOLES[landIdx()].length,done=S.day.done;
  if(!landEl)return _pb26(animate);if(beaver.parentNode!==landEl)landEl.appendChild(beaver);
  const W=64,H=58,at=([x,y])=>({left:x/100*landEl.offsetWidth-W/2,top:y/100*landEl.offsetHeight-H+10});
  const go=(p,anim)=>{const q=at(p);if(!anim){beaver.style.transition="none";beaver.style.left=q.left+"px";beaver.style.top=q.top+"px";void beaver.offsetWidth;beaver.style.transition="";return}
    beaver.classList.add("walking");beaver.style.left=q.left+"px";beaver.style.top=q.top+"px";let k=0;const t=setInterval(()=>{sfx.step();if(++k>3)clearInterval(t)},260);
    setTimeout(()=>{beaver.classList.remove("walking");void beaver.offsetWidth;beaver.classList.add("popin");sfx.pop()},1150)};
  if(done>=n){go(LAND26.house,animate);return}
  if(done===0&&!walkedIn26){walkedIn26=true;go(LAND26.start,false);setTimeout(()=>{if(S.day.done===0&&!$("map").hidden)go(LAND26.stand[0],true)},900);return}
  go(LAND26.stand[done],animate)};
const _sc26=scrollToCurrent;scrollToCurrent=function(smooth){try{const n=HOLES[landIdx()].length,map=$("map");const y=S.day.done>=n?0:landEl.offsetTop+LAND26.stand[S.day.done][1]/100*landEl.offsetHeight;
  map.scrollTo({top:Math.max(0,journey.offsetTop+y-map.clientHeight/2),behavior:smooth?"smooth":"auto"})}catch(e){_sc26(smooth)}};
