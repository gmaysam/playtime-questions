
/* =====================================================================================================
   v23 (Nov 14): talking Domi at the start, two prizes again (acorns = parents' prizes, wood = friends and
   stickers), pick your friend (beaver, unicorn, dino), sticker book by kind, seasonal house, player delete,
   skill list behind the radar.
   ===================================================================================================== */
const G14V=new Set(__G14V__),G14=n=>G14V.has("PX_G14_"+n)?["w/PX_G14_"+n]:[];
/* ---------- 1. talking Domi on the first screen ---------- */
const CHARS={uni:{n:"Unicorn",img:"img/e3/1f984.webp",price:40},dino:{n:"Dino",img:"img/e3/1f995.webp",price:40}};
const charOf=()=>{try{return curPlayer().domi||1}catch(e){return 1}};
domiSrc=function(){const d=charOf();return CHARS[d]?CHARS[d].img:`img/domi_${d}.svg`};
paintDomi=function(){document.querySelectorAll(".bv img").forEach(i=>i.src=domiSrc())};
function introTalk(on){const im=document.querySelector("#introC img.talk");if(!im)return;const d=charOf();
  if(CHARS[d]){im.src=CHARS[d].img;im.classList.add("g14char");im.classList.toggle("bob",on);return}
  im.src=on?"img/domi_talk.webp":"img/domi_talk0.webp"}
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
  return `<p class="dh">Pick your Domi <span class="g14w">🪵 ${w}</span></p><div class="domis g14domis">`+DOMIS.map(([n,i])=>`<button class="dpick ${i===cur?"on":""}" data-domi="${i}" aria-label="Domi ${n}"><img src="img/domi_${i}.svg" alt=""></button>`).join("")
    +Object.entries(CHARS).map(([k,c])=>{const own=have.includes(k);return `<button class="dpick g14c ${k===cur?"on":""} ${own?"":"lock"}" data-domi="${k}" aria-label="${c.n}"><img src="${c.img}" alt="">${own?"":`<span class="g14lk"><b>🔒</b>${c.price} 🪵</span>`}</button>`}).join("")+`</div>`};
wireDomi=function(){document.querySelectorAll("[data-domi]").forEach(b=>b.onclick=e=>{e.stopPropagation();const k=b.dataset.domi,c=CHARS[k];
  if(c&&!charsHave().includes(k)){const w=S.wood||0;if(w<c.price){sfx.bad&&sfx.bad();toast(`You need ${c.price-w} more 🪵 wood for the ${c.n}. Finish mounds to get wood!`);return}
    S.wood=w-c.price;charsHave().push(k);save();renderStats();closeDrop();sfx.unlock&&sfx.unlock();hush();sayseq(G14("CHAR"),()=>{});
    reveal(`<img class="g14rv" src="${c.img}" alt="">`,`${c.n} is your new friend!`,`${c.n} will walk with you on the path.`,()=>{const p=curPlayer();p.domi=k;savePlayers();paintDomi();showMap()},"🎁");return}
  const p=curPlayer();p.domi=c?k:+k;savePlayers();sfx.tap();document.querySelectorAll("[data-domi]").forEach(x=>x.classList.toggle("on",x===b));paintDomi()})};
/* ---------- 4. prizes page: acorns, wood, sticker book by kind ---------- */
let stkTab=null;
showPrizes=function(){hidePanels();$("pPrizes").hidden=false;$("map").hidden=true;
  const have=stkHave(),w=S.wood||0,tab=stkTab||Object.keys(STK)[0],T=STK[tab],old=S.stickers||[];
  const jar=(hv,need)=>{const f=Math.min(1,hv/need),left=Math.max(0,need-hv);return `<div class="jar a${f>=1?" full":""}"><div class="jar-g"><i class="jar-f" style="height:${Math.round(f*100)}%"></i><span class="jar-e">🌰</span></div><b class="jar-n">${f>=1?"✓":left}</b><small>${f>=1?"full!":"more"}</small></div>`};
  $("pPrizes").innerHTML=`<button class="back" id="prBack"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>Back</button>
    <div class="prz prz2"><div class="pz-hero"><span class="pz-chest">🧰</span><h2>My treasure</h2>
      <div class="pz-cnt"><span class="pzc a"><i>🌰</i><b>${S.acorns}</b></span><span class="pzc w"><i>🪵</i><b>${w}</b></span></div></div>
    <div class="g14two"><div><b>🌰 Acorns</b><small>for the prize your grown-up picked</small></div><div><b>🪵 Wood</b><small>to unlock new friends and stickers</small></div></div>
    ${S.real.length?`<h3 class="pz-h">🎁 My big prizes</h3>`:`<div class="pz-none"><span>🎁</span><b>No big prize yet</b><small>Ask a grown-up to add one in the parents' corner 👨‍👩‍👧</small></div>`}
    ${S.real.map(r=>{const ok=S.acorns>=r.a,f=Math.min(1,S.acorns/r.a);
      return `<button class="pz-card ${ok?"ready":""}" data-rp="${r.id}"><span class="pz-ph">${pzI(r)}${ok?`<span class="pz-burst">🎉</span>`:""}</span>
        <b class="pz-name">${r.name}</b>${ok?`<span class="pz-ready">Ready! Go and tell a grown-up 🎉</span>`:`<span class="pz-road"><i style="width:${Math.round(f*100)}%"></i><span class="pz-walker" style="left:${Math.round(f*100)}%"><img class="g14wk" src="${domiSrc()}" alt=""></span><span class="pz-goal">🎁</span></span>`}
        <span class="pz-jars">${jar(S.acorns,r.a)}</span></button>`}).join("")}
    <div class="pz-how"><span><b>🌰</b>right answer</span><span><b>🪵×${W14.mound}</b>finished mound</span><span><b>🪵×${W14.house}</b>Domi's house</span></div>
    <button class="g14friends" id="g14Fr"><span class="g14fi">${Object.values(CHARS).map(c=>`<img src="${c.img}" alt="">`).join("")}<img src="img/domi_1.svg" alt=""></span><span><b>My friends</b><small>Unlock a unicorn or a dino with 🪵 wood</small></span><span class="chev">›</span></button>
    <h3 class="pz-h">📒 My sticker book</h3>
    <div class="g14tabs">${Object.entries(STK).map(([k,c])=>`<button data-tab="${k}" aria-pressed="${k===tab}" style="--tc:${c.c}"><i>${c.e}</i><small>${c.n}</small><em>${c.items.filter((_,i)=>have.includes(k+":"+i)).length}/12</em></button>`).join("")}</div>
    <div class="g14book" style="--bc:${T.c}">${T.items.map((e,i)=>{const id=tab+":"+i,own=have.includes(id),pr=stkPrice(i);
      return `<button class="g14s ${own?"own":"lock"} ${!own&&w>=pr?"can":""}" data-sk="${i}" style="--r:${((i*37)%13)-6}deg"><span class="g14e">${e}</span>${own?"":`<span class="g14p">${pr} 🪵</span>`}</button>`}).join("")}</div>
    ${old.length?`<h3 class="pz-h">✨ Stickers I won before</h3><div class="pz-book">${old.map((s,k)=>`<button data-st="${k}" aria-label="Sticker" style="--r:${((k*37)%17)-8}deg">${s.e}</button>`).join("")}</div>`:""}
    ${S.paintings.length?`<h3 class="pz-h">🎨 My paintings</h3><div class="pz-gal">${S.paintings.slice().reverse().map(pp=>`<span class="pz-frame">${paintSVG(pp.p,pp.f)}</span>`).join("")}</div>`:""}</div>`;
  $("prBack").onclick=()=>{sfx.tap();showMap()};
  $("g14Fr").onclick=()=>{sfx.tap();showMap();setTimeout(openDrop,250)};
  $("pPrizes").querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{sfx.tap();stkTab=b.dataset.tab;const y=$("pPrizes").scrollTop;showPrizes();$("pPrizes").scrollTop=y});
  $("pPrizes").querySelectorAll("[data-sk]").forEach(b=>b.onclick=()=>{const i=+b.dataset.sk,id=tab+":"+i,e=T.items[i];
    if(have.includes(id)){reveal(e,"My sticker",`${T.n} sticker`,null,"✨");return}
    const pr=stkPrice(i),w2=S.wood||0;if(w2<pr){sfx.bad&&sfx.bad();toast(`You need ${pr-w2} more 🪵 wood for this sticker`);return}
    S.wood=w2-pr;have.push(id);save();renderStats();hush();sayseq(G14("STICKER"),()=>{});
    reveal(e,"New sticker!",`You used ${pr} 🪵 wood.`,()=>{const y=$("pPrizes").scrollTop;showPrizes();$("pPrizes").scrollTop=y},"🎁")});
  $("pPrizes").querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>{const s=old[+b.dataset.st];reveal(s.e,"My sticker",`Won on ${s.d}`,null,"✨")});
  $("pPrizes").querySelectorAll("[data-rp]").forEach(b=>b.onclick=()=>{const r=S.real.find(x=>x.id===b.dataset.rp),ok=S.acorns>=r.a;
    reveal(pzI(r,"big"),r.name,ok?"Ready! Ask a grown-up for your prize 🎉":`${Math.max(0,r.a-S.acorns)} more 🌰 to go!`,null,ok?"🎁":"🔒")})};
$("tbPrizes").onclick=()=>{sfx.tap();showPrizes()};
/* ---------- 5. the map follows the date by itself; the house dresses up for the season or the holiday ---------- */
const _ls14=loadState;loadState=function(){const r=_ls14.apply(this,arguments);try{S.mapMonth="auto"}catch(e){}return r};
try{S.mapMonth="auto"}catch(e){}
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
