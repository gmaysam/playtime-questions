/* ================= v40 (parent, Nov 22): 2 x 2 answers, bigger pictures, a 4th answer, star counters,
   learning focus (six pillars donut), a stronger "Say it!" (English and Farsi), one speaker button ================= */
(function(){const st=document.createElement("style");st.textContent=`
/* four answers are always 2 x 2, never 3 + 1 */
.qopts.o4{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.qopts.o4 .qo[data-j]{grid-column:auto!important;width:auto!important}
.q31-o.o4{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}
.q31-o.o3:not(.yn){display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important}  /* only 3 can exist (> < =): one row, never 2 + 1 */
.q31-o.o3:not(.yn)>.q31-b{width:auto!important}
.qopts.o3:not(.yn),#qBody .qopts.o3:not(.yn).st-cards,#qBody .qopts.o3:not(.yn).row3{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.qopts.o3 .qo[data-j]{grid-column:auto!important;width:auto!important}
.qopts.o4 .qo{min-height:104px}
.sq-cards.o4{display:grid!important;grid-template-columns:repeat(2,auto);justify-content:center;gap:12px}
.sq-cards.o4 .sq-c,.sq-cards.o3 .sq-c{width:clamp(110px,34vw,150px);font-size:clamp(48px,13vw,66px)}
.sq-cards.o3{flex-wrap:nowrap}
/* bigger pictures in the game answers (Beat the clock, Quiz race, the movie games...) */
.q31-o:not(.col)>.q31-b{flex-direction:column!important;justify-content:center!important;align-items:center!important;text-align:center!important;gap:4px!important;min-height:112px;padding:8px 6px!important}
.q31-o:not(.col)>.q31-b .oe{font-size:54px!important;line-height:1.05}
.q31-o:not(.col)>.q31-b img.e3{width:64px!important;height:64px!important}
.q31-o:not(.col)>.q31-b small{font-size:16px!important}
.q31-o:not(.col)>.q31-b .wp{width:72px!important;height:72px!important}
.q31-o:not(.col)>.q31-b>span:first-child{font-size:44px}
@media (max-height:700px){.q31-o:not(.col)>.q31-b{min-height:92px}.q31-o:not(.col)>.q31-b .oe{font-size:44px!important}.q31-o:not(.col)>.q31-b img.e3{width:52px!important;height:52px!important}}
/* one speaker button: the extra "Again" buttons are gone (the big speaker at the top plays it again) */
.g39-again,.t38-again{display:none!important}
/* x of y as stars that fill up */
.pp40{display:flex;flex-wrap:wrap;gap:4px;align-items:center;justify-content:center}
.pp40 i{width:22px;height:22px;display:grid;place-items:center;font-style:normal;font-size:15px;line-height:1;border-radius:50%;background:#EEF1F6;box-shadow:inset 0 -2px 0 rgba(0,0,0,.06);color:transparent;transition:transform .25s}
.pp40 i.on{background:#FFD43B;color:#fff;box-shadow:inset 0 -2px 0 #E8A800;transform:scale(1.12)}
.pp40 i.on::before{content:"★";color:#fff;font-size:14px;text-shadow:0 1px 0 #C98A00}
.pp40 i.pop{animation:pp40 .45s ease-out}
@keyframes pp40{0%{transform:scale(.6)}60%{transform:scale(1.35)}100%{transform:scale(1.12)}}
.pp40h{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap}
.b31-sc+.pp40 i{width:18px;height:18px}
.pp40c{background:rgba(255,255,255,.85)!important;padding:5px 8px!important;border-radius:999px!important}.rn-cnt.pp40c .pp40 i{width:18px;height:18px}
/* the learning-focus donut on the parents' page */
.fo40{display:flex;flex-direction:column;gap:12px}
.fo40 .fd{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:center}
.fo40 svg{width:180px;height:180px;flex:none}
.fo40 .fl{display:flex;flex-direction:column;gap:6px;flex:1;min-width:230px}
.fo40 .fr{display:flex;align-items:center;gap:8px}
.fo40 .fr i{font-style:normal;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;font-size:17px;flex:none}
.fo40 .fr b{flex:1;font:700 14px "Nunito",sans-serif;color:#3C3C3C}
.fo40 .fr button{width:30px;height:30px;border-radius:50%;border:2px solid #E5E5E5;background:#fff;font:900 17px/1 "Nunito",sans-serif;color:#777;cursor:pointer}
.fo40 .fr em{font-style:normal;font:800 12px "Nunito",sans-serif;width:52px;text-align:center;color:#777}
.fo40 .fnote{font:600 13px "Nunito",sans-serif;color:#777;margin:0}
.fo40 .freset{align-self:flex-start;border:0;background:#EEF4FF;color:#2A5EA8;border-radius:12px;padding:7px 12px;font:800 13px "Nunito",sans-serif;cursor:pointer}
/* Say it: a live ear */
.sy-mic.on{animation:sy40 1s ease-in-out infinite}
@keyframes sy40{0%,100%{box-shadow:0 0 0 0 rgba(255,75,75,.45)}50%{box-shadow:0 0 0 16px rgba(255,75,75,0)}}
.sy-live{min-height:22px;font:700 15px "Nunito",sans-serif;color:#1CB0F6;text-align:center}
.sy-lang{display:inline-block;margin-top:4px;padding:3px 10px;border-radius:999px;background:#FFF4D6;color:#9A6A00;font:800 13px "Nunito",sans-serif}
.sy-w.fa{font-family:"Vazirmatn","Tahoma",sans-serif;direction:rtl}`;document.head.appendChild(st)})();

/* ---------- 1. a 4th answer where a question has only 3 (a thing from another world: never a second right answer) ---------- */
const OBJ40=["Sock","Spoon","Key","Chair","Drum","Kite","Guitar","Cup","Ball","Hat","Clock","Umbrella","Pencil","Teddy bear","Car","Book"];
const AN40=["Frog","Duck","Cat","Dog","Cow","Pig","Bee","Fish","Bird","Fox","Snake","Hen","Rabbit","Turtle"];
const NOPAD40=/\bnot\b|n't|\bodd one|different|doesn't belong|\bexcept\b|\bwrong\b|\ball of\b|\bboth\b/i;
const NUMCMP40=/big|small|more|less|most|least|large|long|short|tall|first|last|odd|even|before|after|next|missing|compare|order/i;
const word40=h=>String(h||"").replace(/<[^>]+>/g," ").replace(/[●]/g,"").replace(/\s+/g," ").trim();
const ok40=w=>{try{return !!optE(w)&&faSay(w).length>0&&enSay(w).length>0}catch(e){return false}};
function pad40(q,cat,k){try{
  if(!q||q.game||q.match||q.robot||q.tf||q.flash||q.padded||!q.opts||q.opts.length!==3||!(q.ans>=0))return q;
  if(["yn","bars","match"].includes(q.layout))return q;
  if(/^(letters|read|flags|shapes|clock)$/.test(cat||q.cat||""))return q;
  const text=((q.cap||"")+" "+word40(q.visual)+" "+((q.exp&&q.exp.t)||"")+" "+((q.why&&q.why.t)||"")).toLowerCase();
  if(NOPAD40.test(q.cap||""))return q;
  const ws=q.opts.map(o=>word40(o.h));let add=null;
  if(ws.some(w=>w.split(" ").length>3||w.length>18))return q;  /* sentence answers: a silly 4th would look odd */
  if(q.wid&&(WQI40[q.wid]||{}).t==="english")return q;
  if(q.opts.every(o=>/class="num"/.test(o.h||""))){if(NUMCMP40.test(q.cap||""))return q;
    const v=ws.map(x=>parseInt(x,10)).filter(x=>!isNaN(x));if(v.length!==3)return q;const lo=Math.max(1,Math.min(...v)-2),hi=Math.max(...v)+3;
    const c=sh(Array.from({length:hi-lo+1},(x,i)=>lo+i)).find(x=>!v.includes(x));if(c===undefined)return q;add=numOpt(c)}
  else if(q.opts.every(o=>/class="oe"/.test(o.h||"")&&/<small>/.test(o.h||""))){if(((q.wid&&(WQI40[q.wid]||{}).a)||q.age||S.age||6)>6)return q;  /* a silly 4th picture is for the youngest only */
    const emo0=q.opts.map(o=>(String(o.h).match(/class="oe">([^<]*)</)||[])[1]||"");
    const anim=e=>{const c=e.codePointAt(0)||0;return (c>=0x1F400&&c<=0x1F43F)||(c>=0x1F980&&c<=0x1F9AE)||(c>=0x1FAB0&&c<=0x1FABF)||c===0x1F577||c===0x1F578||c===0x1F54A||c===0x1F9A0};
    const na=emo0.filter(anim).length;if(na>0&&na<3)return q;  /* animals mixed with things: no 4th */
    const isAn=na===3;
    const emo=q.opts.map(o=>(String(o.h).match(/class="oe">([^<]*)</)||[])[1]);const pool=sh(isAn?OBJ40:AN40).filter(w=>ok40(w)&&!emo.includes(optE(w))&&!ws.some(x=>x.toLowerCase()===w.toLowerCase())&&!text.includes(w.toLowerCase())&&!text.includes(w.toLowerCase().replace(/s$/,"")));
    const w=pool[0];if(!w)return q;add={h:`<span class="oe">${optE(w)}</span><small>${w}</small>`,say:both(w)}}
  else return q;
  const at=ri(0,3);q.opts.splice(at,0,add);if(at<=q.ans)q.ans++;q.padded=true;
  if(q.layout==="row3"||q.layout==="col"||!q.layout)q.layout="grid4";
}catch(e){}return q}
/* a fact or answer that has no voice: Lulu says "the answer is ..." and the answer itself */
function voiceFact40(q){try{if(!q||!q.opts||!(q.ans>=0))return q;const a=q.opts[q.ans]||{},sv=(a.say||[]).filter(Boolean);if(!sv.length)return q;
  for(const key of ["exp","why"]){const x=q[key];if(x&&x.t&&!(x.v||[]).filter(c=>c&&!/LULU_ANS_IS/.test(c)).length)x.v=["w/LULU_ANS_IS",...sv]}
  if(!q.exp&&!q.why)q.exp={t:word40(a.h),v:["w/LULU_ANS_IS",...sv]}}catch(e){}return q}
/* every answer of a question is read the same way: Farsi + English when all have both, otherwise Farsi only.
   English-word questions (opposites, plurals, past tense, ABC order...) read only the English words. */
const EN40=new Set(Object.values(EN_SAY).map(c=>"w/"+c)),isEN40=c=>EN40.has(c)||/^w\/(LULU_EN\d+|PX_E\d+_|LULU_PL\d)/.test(c);
const WQI40=Object.fromEntries(WQ.map(w=>[w.i,w]));const ENQ40=/^(wopp|wsyn|wplu|wpast|aorder|compound|rhyme)$/;
function same40(q,k){try{if(!q||!q.opts||q.opts.length<2||q.tf||q.layout==="yn")return q;const S0=q.opts.map(o=>(o.say||[]).filter(Boolean));
  if(ENQ40.test(k||"")||(q.wid&&(WQI40[q.wid]||{}).t==="english")){const en=S0.map(x=>x.filter(isEN40));q.opts.forEach((o,i)=>o.say=en.every(x=>x.length)?en[i]:[]);return q}  /* never a Farsi word for an English spelling ("cates" is not "cat") */
  if(S0.some(x=>!x.length))return q;const fa=S0.map(x=>x.filter(c=>!isEN40(c)||/LULU_PL\d/.test(c))),hasFa=fa.every(x=>x.length),hasEn=S0.every(x=>x.some(isEN40));
  const fk=fa.map(x=>x.join("|"));if(hasFa&&hasEn&&new Set(fk).size<fk.length){q.opts.forEach((o,i)=>o.say=S0[i].filter(isEN40));return q}  /* Farsi words collide (herd/flock = گله): read English only */
  if(hasFa&&!hasEn)q.opts.forEach((o,i)=>o.say=fa[i])}catch(e){}return q}
const _qw40=qWatcher;qWatcher=function(cat,used){const q=_qw40(cat,used);if(q&&!q.game){pad40(q,cat,"w");same40(q,"w");voiceFact40(q)}return q};
const _bq40=buildQ;buildQ=function(cat,k,used){const q=_bq40(cat,k,used);if(q&&!q.game){pad40(q,cat,k);same40(q,k);voiceFact40(q)}return q};

/* ---------- 2. the screen helper: 4 answers = 2 x 2 (also on older iPads), and "x / y" counters become stars ---------- */
function tidy40(root){(root||document).querySelectorAll(".qopts,.q31-o,.sq-cards").forEach(g=>{const n=[...g.children].filter(b=>(b.tagName==="BUTTON"||b.classList.contains("sq-c"))&&!b.hidden).length;g.classList.toggle("o4",n===4);g.classList.toggle("o3",n===3)});
  const pips=(x,y,old)=>Array.from({length:y},(z,i)=>`<i class="${i<x?"on":""}${i<x&&i>=old?" pop":""}"></i>`).join("");
  /* Beat the clock keeps its own number element: the stars go next to it */
  (root||document).querySelectorAll(".b31-sc").forEach(c=>{const m=/(\d+)\s*\/\s*(\d+)/.exec(c.textContent||"");if(!m)return;const x=+m[1],y=+m[2];if(y<2||y>12)return;
    c.classList.add("pp40h");let p=c.nextElementSibling;if(!p||!p.classList||!p.classList.contains("pp40")){p=document.createElement("span");p.className="pp40";c.after(p)}
    if(p.dataset.v===x+"/"+y)return;const old=+(p.dataset.v||"0/0").split("/")[0];p.dataset.v=x+"/"+y;p.setAttribute("aria-label",`${x} of ${y}`);p.innerHTML=pips(x,y,old)});
  /* the other counters ("0 / 6") become stars in place */
  (root||document).querySelectorAll(".mg-cnt,.rn-cnt").forEach(c=>{const txt=(c.textContent||"").trim();if(c.dataset.pv===txt)return;const m=/^(\d+)\s*\/\s*(\d+)$/.exec(txt);if(!m)return;const x=+m[1],y=+m[2];if(y<2||y>12)return;
    const old=+(c.dataset.px||0);c.dataset.pv=txt;c.dataset.px=x;c.classList.add("pp40c");c.innerHTML=`<span class="pp40">${pips(x,y,old)}</span><span class="pp40h">${txt}</span>`})}
let tid40=0;try{new MutationObserver(()=>{if(tid40)return;tid40=requestAnimationFrame(()=>{tid40=0;tidy40()})}).observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){}

/* ---------- 3. learning focus: the parent chooses how much of each of the six pillars (donut + steps) ---------- */
const FOCUS_L=["Off","Less","Normal","More","Most"],FOCUS_X=[0,.5,1,2,3];
const focusOf=id=>{const f=S.focus||{};return f[id]===undefined?2:f[id]};
const _fF40=formatsFor;formatsFor=function(cat){const f=_fF40(cat);if(!S.focus||!f||!f.length)return f;const out=[];
  for(const k of f){const g=GMAP[gidGuess(k,cat)],p=g&&g.p&&g.p[0],x=FOCUS_X[p?focusOf(p):2];
    if(x>=1)for(let i=0;i<x;i++)out.push(k);else if(x>0&&Math.random()<x)out.push(k)}
  return out.length?out:f};
function donut40(){const W=PILLARS.map(P=>FOCUS_X[focusOf(P.id)]),T=W.reduce((a,b)=>a+b,0)||1,R=70,r=44,cx=90,cy=90;let a0=-Math.PI/2,seg="";
  PILLARS.forEach((P,i)=>{const w=W[i]/T;if(w<=0)return;const a1=a0+w*Math.PI*2-(w<1?.03:0),lg=a1-a0>Math.PI?1:0,p=(rr,a)=>[cx+rr*Math.cos(a),cy+rr*Math.sin(a)].map(v=>v.toFixed(1)).join(",");
    seg+=w>=.999?`<circle cx="${cx}" cy="${cy}" r="${(R+r)/2}" fill="none" stroke="${P.c}" stroke-width="${R-r}"/>`:`<path d="M${p(R,a0)} A${R},${R} 0 ${lg} 1 ${p(R,a1)} L${p(r,a1)} A${r},${r} 0 ${lg} 0 ${p(r,a0)} Z" fill="${P.c}"><title>${P.name}: ${Math.round(w*100)}%</title></path>`;
    const am=(a0+a1)/2;seg+=`<text x="${(cx+(R+r)/2*Math.cos(am)).toFixed(1)}" y="${(cy+(R+r)/2*Math.sin(am)+6).toFixed(1)}" text-anchor="middle" font-size="17">${w>.07?P.e:""}</text>`;a0+=w*Math.PI*2});
  const bal=PILLARS.every(P=>focusOf(P.id)===2),top=PILLARS.slice().sort((a,b)=>focusOf(b.id)-focusOf(a.id))[0];
  return `<svg viewBox="0 0 180 180" role="img" aria-label="Learning focus">${seg}<text x="90" y="86" text-anchor="middle" font-size="12" font-weight="800" fill="#777">${bal?"Balanced":"Focus"}</text><text x="90" y="104" text-anchor="middle" font-size="20">${bal?"⚖️":top.e}</text></svg>`}
function focusHTML(){return `<div class="dcard fo40" id="fo40"><h3>Learning focus</h3><p class="fnote">Choose what Paraxilingo should practise more. The donut shows each pillar's share of the games.</p>
  <div class="fd">${donut40()}<div class="fl">${PILLARS.map(P=>`<div class="fr"><i style="background:${P.c}22">${P.e}</i><b>${P.name}</b><button data-fo="${P.id}" data-d="-1" aria-label="Less ${P.name}">−</button><em>${FOCUS_L[focusOf(P.id)]}</em><button data-fo="${P.id}" data-d="1" aria-label="More ${P.name}">+</button></div>`).join("")}</div></div>
  <button class="freset" id="foR">↺ Back to balanced</button></div>`}
function wireFocus(){const c=$("fo40");if(!c)return;const re=()=>{c.outerHTML=focusHTML();wireFocus()};
  c.querySelectorAll("[data-fo]").forEach(b=>b.onclick=()=>{const id=b.dataset.fo,v=Math.max(0,Math.min(4,focusOf(id)+ +b.dataset.d));S.focus=Object.assign({},S.focus||{},{[id]:v});
    if(PILLARS.every(P=>focusOf(P.id)===0))S.focus[id]=1;  /* never all off */
    if(PILLARS.every(P=>focusOf(P.id)===2))delete S.focus;try{save()}catch(e){}try{sfx.tap()}catch(e){}re()});
  const r=$("foR");if(r)r.onclick=()=>{delete S.focus;try{save()}catch(e){}try{sfx.tap()}catch(e){}re()}}
const _dh40=dashHTML;dashHTML=function(pn){const h=_dh40(pn);const i=h.indexOf('<div class="dcard"><h3>In short');return i<0?h+focusHTML():h.slice(0,i)+focusHTML()+h.slice(i)};
const _wd40=wireDash;wireDash=function(pn){_wd40(pn);wireFocus()};

/* ---------- 4. Say it! - English or Farsi, listens live, forgives a child's pronunciation ---------- */
const FA_TXT40=__FATXT__;
const faNorm=s=>String(s||"").replace(/[ً-ٰٟـ]/g,"").replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(/ة/g,"ه").replace(/[أإآ]/g,"ا").replace(/‌/g,"").replace(/[^؀-ۿ ]/g," ").replace(/\s+/g," ").trim();
const HOMO40={two:["to","too","2"],to:["two","too"],four:["for","4"],eight:["ate","8"],one:["won","1"],sun:["son"],bee:["be","b"],pear:["pair","pare"],ant:["aunt"],eye:["i","aye"],sea:["see","c"],tea:["t","tee"],hair:["hare"],flower:["flour"],night:["knight"],deer:["dear"],bear:["bare"],tail:["tale"],knot:["not"],rose:["rows"],plane:["plain"],meat:["meet"],nose:["knows"],sail:["sale"],cell:["sell"],road:["rode"],blue:["blew"],red:["read"],ate:["eight"],week:["weak"],hour:["our"],whale:["wail"],bean:["been"],pea:["p","pee"],jay:["j"],owl:["al"],ice:["eyes"],cat:["kat","cut"],dog:["dug","doug"],pen:["pan","pin"],hen:["hand","ten"],bus:["boss"],fish:["fist"],duck:["doc","dock"],cow:["cal","ciao"]};
const skel=w=>w.replace(/(.)\1+/g,"$1").replace(/^([a-z])|[aeiouy]+/g,(m,f)=>f||"").replace(/ph/g,"f").replace(/ck/g,"k");
function enHit40(alts,t){t=t.toLowerCase();const forms=new Set([t,t+"s",t+"es",t.replace(/s$/,""),...(HOMO40[t]||[])]);
  return alts.some(s=>{s=String(s).toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\b(a|an|the|it's|its|is|it|um|uh)\b/g," ").replace(/\s+/g," ").trim();if(!s)return false;
    if(forms.has(s.replace(/\s+/g,"")))return true;
    return s.split(" ").some(x=>forms.has(x)||(t.length>=4&&lev(x,t)<=1)||(t.length>=7&&lev(x,t)<=2)||(t.length>=4&&x.length>=3&&skel(x)===skel(t)))})}
function faHit40(alts,t){t=faNorm(t);const tn=t.replace(/ /g,"");return alts.some(s=>{s=faNorm(s);if(!s)return false;const sn=s.replace(/ /g,"");
  if(sn.includes(tn))return true;return s.split(" ").some(x=>x===t||(tn.length>=3&&lev(x,tn)<=1)||(tn.length>=6&&lev(x,tn)<=2))})}
const _qSay40=qSay;qSay=function(cat){const q=_qSay40(cat);try{const ww=q.w.w.toLowerCase(),fa=FA_TXT40[ww]||FA_TXT40[ww.replace(/s$/,"")];
  if(fa&&Math.random()<((S.age||6)<=5?.5:.35)){const c=faSay(ww).filter(Boolean);if(c.length){q.lang="fa";q.faT=fa;q.voice=[G10("SAY_Q"),...c];q.faSay=c}}}catch(e){}return q};
GAMES.say=function(q){let tries=0,rec=null,busy=false,timer=0;const fa=q.lang==="fa",w=q.w.w,target=fa?q.faT:w,sayW=fa?q.faSay:q.w.say;
  gShow(`<div class="game">${gHead("🎤","Say it!",fa?"Listen, then say it in Farsi":"Listen, then say it in English")}<div class="sy">${q.w.pic?`<div class="sy-pic">${q.w.pic}</div>`:""}<div class="sy-w${fa?" fa":""}">${fa?esc(q.faT):w}</div>
    <span class="sy-lang">${fa?"🇮🇷 فارسی":"🇬🇧 English"}</span>
    <button class="sy-mic" id="syM" aria-label="Say it">🎤</button><div class="sy-live" id="syV"></div><div class="sy-h" id="syH">Tap 🎤 and say the word</div><button class="mv-skip" id="syS">Skip</button></div></div>`);gAsk(q);
  const H=$("syH"),M=$("syM"),V=$("syV");
  const done=ok=>{if(q.done)return;if(ok){q.done=true;let ww=false;const win=()=>{if(ww)return;ww=true;q.done=false;gameWin(q,tries>1?1:0,M,[])};setTimeout(win,4200);sayseq([G10("SAY_GOOD")],win)}else{q.done=true;gameLearn(q,w,sayW)}};
  const stop=()=>{clearTimeout(timer);busy=false;M.classList.remove("on");try{rec&&rec.stop()}catch(e){}};
  const hit=alts=>fa?faHit40(alts,target):enHit40(alts,target);
  const miss=alts=>{tries++;V.textContent="";H.textContent=alts[0]?`I heard “${alts[0]}”. Try again!`:"I didn't hear it. Try again!";
    if(tries>=3){sayseq([G10("SAY_LAST"),...sayW],()=>{});done(false)}else sayseq([G10("SAY_AGAIN"),...sayW],()=>{})};
  M.onclick=()=>{if(q.done||busy)return;hush();let heard=[],ok=false;
    try{rec=new SR();rec.lang=fa?"fa-IR":"en-US";rec.interimResults=true;rec.continuous=false;rec.maxAlternatives=10;busy=true;M.classList.add("on");H.textContent="Listening…";V.textContent="";
      rec.onresult=e=>{for(let i=e.resultIndex;i<e.results.length;i++){const alts=[...e.results[i]].map(r=>r.transcript);heard=alts.concat(heard);V.textContent=alts[0]||"";
          if(!ok&&hit(alts)){ok=true;stop();H.textContent="✅ "+(fa?q.faT:w)+"!";done(true);return}}};
      rec.onerror=e=>{const was=busy;stop();if(e.error==="not-allowed"||e.error==="service-not-allowed"){H.textContent="The microphone is off - ask a grown-up, or tap Skip."}else if(e.error==="language-not-supported"){H.textContent="This phone can't listen in Farsi - tap Skip."}else if(was&&!ok&&e.error!=="aborted")miss(heard)};
      rec.onend=()=>{if(ok)return;const was=busy;stop();if(was)miss(heard)};
      timer=setTimeout(()=>{try{rec.stop()}catch(e){}},7000);rec.start()}catch(e){stop();H.textContent="Speaking isn't available here - tap Skip."}};
  $("syS").onclick=()=>{if(q.done)return;try{rec&&rec.abort()}catch(e){}q.done=true;gameLearn(q,w,sayW)};
  window.__gSolve=()=>{if(hit([target])){done(true)}}};

/* ---------- 5. the v39 game answers are read like every other answer: Farsi, then English ---------- */
try{for(const k of Object.keys(MK39)){const f=MK39[k];MK39[k]=function(R,q,first){const P=f(R,q,first);if(P&&P.opts&&P.opts.length===3&&(k==="rid39"||k==="kind39")){try{const L0=k==="rid39"?D39.rid:D39.kind,cur=P.opts.map(o=>word40(o.h).toLowerCase());
  const c=sh(L0.filter(x=>x!==R).flatMap(x=>x[3].slice(1))).find(o=>!cur.some(w=>w.includes(String(o[1]).toLowerCase()))&&!P.opts.some(p=>p.h.includes(o[0])));
  if(c){const at=ri(0,3);P.opts.splice(at,0,eo39(c[0],c[1],c[2]));if(at<=P.ans)P.ans++}}catch(e){}}
if(P&&P.opts&&!P.yn)P.opts.forEach(o=>{const w=word40(o.h);if(!w||/^\d+$/.test(w))return;const b=both(w);if(b.length>=2&&faSay(w).length&&enSay(w).length)o.say=b});return P}}}catch(e){}
/* English sections: a quiz game is offered only if it can be made from questions whose answers are all spoken */
const FP40={};const _ff40=formatsFor0;formatsFor0=function(cat){let b=_ff40(cat);if(!/^(letters|read)$/.test(cat))return b;const key=cat+"|"+(S.age||6)+"|"+lvl();
  return b.filter(k=>{if(!/^f_(race|beat|show|wtrain)$/.test(k))return true;const kk=key+"|"+k;if(FP40[kk]===undefined){let n=0;for(let t=0;t<8;t++){try{if(buildFormat(k,cat))n++}catch(e){}}FP40[kk]=n>=8}return FP40[kk]})};
/* v41 grown-up gate: the parents' page asks a sum that a grown-up reads in words (e.g. "seven times thirteen"), typed on the number pad.
   A young child cannot pass it by tapping; once passed it stays open for 5 minutes. */
const GG41={u:0},NW41=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
askParents=function(){if(Date.now()-GG41.u<300000){showParents();return}
  const a=6+Math.floor(Math.random()*4),b=12+Math.floor(Math.random()*8),ans=String(a*b);let typed="";
  $("mCard").innerHTML=`<div style="font-size:56px;line-height:1">👨‍👩‍👧</div><h3>Grown-ups only</h3><p>To open the parents' page, type the answer:</p>
    <p style="font-size:22px;font-weight:700;margin:6px 0 2px">${NW41[a]} times ${NW41[b]}</p><div class="pindots" id="pinDots" aria-live="polite"></div>
    <div class="pinpad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button data-p="${n}">${n}</button>`).join("")}<span></span><button data-p="0">0</button><button data-p="del" aria-label="Delete">⌫</button></div>
    <button class="btn ghost" id="pinCancel">Cancel</button>`;
  const dots=()=>{$("pinDots").innerHTML=typed?`<b style="font-size:26px;letter-spacing:4px">${typed}</b>`:"<i></i>"};dots();
  $("mCard").querySelectorAll("[data-p]").forEach(el=>el.onclick=()=>{sfx.tap();const k=el.dataset.p;typed=k==="del"?typed.slice(0,-1):typed+k;dots();
    if(typed===ans){GG41.u=Date.now();$("modal").classList.remove("show");setTimeout(showParents,200)}
    else if(typed.length>=ans.length){const c=$("pinDots");c.classList.remove("shake");void c.offsetWidth;c.classList.add("shake");sfx.bad();setTimeout(()=>{typed="";dots()},500)}});
  $("pinCancel").onclick=()=>{sfx.tap();$("modal").classList.remove("show")};
  $("modal").classList.add("show")};
/* ================= v42 (parent, Nov 22 night) ================= */
(function(){const st=document.createElement("style");st.textContent=`
/* Space run: every answer fits in its gate; the word the question is about is shown big */
.shu-gate{left:2%;right:2%;gap:6px}
.shu-l{min-width:0;padding:3px}
.shu-o{width:100%;padding:4px 4px;overflow:hidden}
.shu-o .word,.shu-o b{font-size:clamp(13px,4.3vw,22px)!important;line-height:1.1;overflow-wrap:anywhere;text-align:center;white-space:normal}
.shu-o small{font-size:12px;overflow-wrap:anywhere;text-align:center}
/* number answers: just the number, no dots under it (parent) */
button .dots,.opt .dots,.qo .dots,.q31-b .dots{display:none!important}
.t31-pic{position:relative;align-items:center;gap:14px}
.t31-say{width:58px;height:58px;border-radius:16px;border:0;background:#58A7FF;color:#fff;font-size:28px;box-shadow:0 4px 0 #2F7FD8;flex:0 0 auto;cursor:pointer}
.t31-say:active{transform:translateY(3px);box-shadow:0 1px 0 #2F7FD8}
.hp{background:#fff!important;border:3px solid #E5E5E5;box-shadow:0 4px 0 #E5E5E5}
.shu-q{flex-wrap:wrap;row-gap:4px}
.shu-cap{flex:1 1 150px;min-width:0}
.shu-word{font:900 clamp(24px,7vw,34px)/1 "Nunito",sans-serif;color:#1A1446;background:#fff;border-radius:12px;padding:6px 12px;flex:0 0 auto}
`;document.head.appendChild(st)})();
/* v42 parents: (1) the first time, a hard sum; inside, the parent can set their own password, which the gate asks for from then on
   ("Forgot it?" falls back to the sum). (2) "This week" - one sentence per pillar: what the child practised and how it went. */
const askSum41=askParents;
function askPw42(){let typed="";const pw=String(P.ppw);
  $("mCard").innerHTML=`<div style="font-size:56px;line-height:1">🔒</div><h3>Grown-ups only</h3><p>Enter the parent password</p><div class="pindots" id="pinDots"></div>
    <div class="pinpad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button data-p="${n}">${n}</button>`).join("")}<span></span><button data-p="0">0</button><button data-p="del" aria-label="Delete">⌫</button></div>
    <button class="btn ghost" id="pinForgot" style="margin-bottom:6px">Forgot it?</button><button class="btn ghost" id="pinCancel">Cancel</button>`;
  const dots=()=>{$("pinDots").innerHTML="<i></i>".repeat(typed.length)||"&nbsp;"};dots();
  $("mCard").querySelectorAll("[data-p]").forEach(el=>el.onclick=()=>{sfx.tap();const k=el.dataset.p;typed=k==="del"?typed.slice(0,-1):typed+k;dots();
    if(typed===pw){GG41.u=Date.now();$("modal").classList.remove("show");setTimeout(showParents,200)}
    else if(typed.length>=pw.length){const c=$("pinDots");c.classList.remove("shake");void c.offsetWidth;c.classList.add("shake");sfx.bad();setTimeout(()=>{typed="";dots()},500)}});
  $("pinForgot").onclick=()=>{sfx.tap();askSum41()};
  $("pinCancel").onclick=()=>{sfx.tap();$("modal").classList.remove("show")};
  $("modal").classList.add("show")}
askParents=function(){if(Date.now()-GG41.u<300000){showParents();return}if(P.ppw)askPw42();else askSum41()};
function week42(pn){try{const from=evDay(weekStart()),ev=(S.ev||[]).filter(e=>e[0]>=from),by={};
  for(const e of ev){const m=gameInfo(e[1],e[5]);if(!m||!m.p)continue;const [p,s]=m.p,r=by[p]||(by[p]={n:0,ok:0,sk:{}});r.n++;if(e[2]>0)r.ok++;r.sk[s]=(r.sk[s]||0)+1}
  const due=Object.values(S.rev||{}).filter(r=>r.b===0).length;
  const rows=PILLARS.map(P0=>{const r=by[P0.id];if(!r)return `<li><b>${P0.e} ${P0.name}:</b> not practised yet this week.</li>`;
    const pct=Math.round(r.ok/r.n*100),top=Object.entries(r.sk).sort((a,b)=>b[1]-a[1])[0][0];
    const how=pct>=85?"going really well":pct>=65?"doing well":pct>=45?"still learning":"finding it hard - a good one to practise together";
    return `<li><b>${P0.e} ${P0.name}:</b> ${r.n} answer${r.n===1?"":"s"}, mostly <i>${skillName(P0.id,top)}</i> - ${how} (${pct}% right).</li>`}).join("");
  return `<div class="wk42"><h3>📅 What did ${pn} learn this week?</h3><ul>${rows}</ul>${due?`<p>🔁 ${due} question${due===1?"":"s"} ${pn} got wrong will come back in the next few days to practise again.</p>`:""}</div>`}catch(e){return ""}}
function pw42HTML(){return `<div class="psec"><span>🔒</span>Parent password</div><div class="pw42">${P.ppw?`<p>A password is set. The parents' page asks for it (or for a sum if you forget it).</p><div class="pw42r"><button class="btn ghost" id="pwChg">Change</button><button class="btn ghost" id="pwDel">Remove</button></div>`:""}
  <div class="pw42r" id="pwNew" ${P.ppw?"hidden":""}><input id="pwIn" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder="4 to 6 digits" aria-label="New parent password"><button class="btn green" id="pwSave">Save</button></div>
  ${P.ppw?"":`<p class="pnote">Until you set one, the page asks a sum written in words.</p>`}</div>`}
const _sp42=showParents;showParents=function(){const r=_sp42.apply(this,arguments);try{const root=$("pSettings");
  const back=root.querySelector("#closeSettings");if(back&&!root.querySelector(".wk42"))back.insertAdjacentHTML("afterend",week42(curPlayer().name));
  const snd=[...root.querySelectorAll(".psec")].find(x=>/Sound/.test(x.textContent));if(snd&&!root.querySelector(".pw42"))snd.insertAdjacentHTML("beforebegin",pw42HTML());
  const y=()=>root.scrollTop,redraw=()=>{const s=y();showParents();root.scrollTop=s};
  const sv=$("pwSave");if(sv)sv.onclick=()=>{const v=($("pwIn").value||"").replace(/\D/g,"");if(v.length<4){toast("Please use 4 to 6 digits");return}P.ppw=v;savePlayers();sfx.good();toast("Password saved 🔒");redraw()};
  const ch=$("pwChg");if(ch)ch.onclick=()=>{sfx.tap();$("pwNew").hidden=false;$("pwIn").focus()};
  const dl=$("pwDel");if(dl)dl.onclick=()=>{delete P.ppw;savePlayers();sfx.tap();toast("Password removed");redraw()};
}catch(e){console.log(e)}return r};
(function(){const st=document.createElement("style");st.textContent=`
.wk42{background:#F3F8FF;border:2px solid #D6E6FF;border-radius:18px;padding:12px 14px;margin:8px 0 14px}
.wk42 h3{margin:0 0 6px;font-size:18px}
.wk42 ul{margin:0;padding-left:4px;list-style:none;display:grid;gap:6px;font-size:14px;line-height:1.35}
.wk42 p{margin:8px 0 0;font-size:14px}
.pw42{margin:0 0 10px}.pw42 p{font-size:14px;margin:4px 0 8px}
.pw42r{display:flex;gap:8px;align-items:center}
.pw42r input{flex:1;min-width:0;font-size:20px;padding:10px 12px;border-radius:14px;border:2px solid #E5E5E5;letter-spacing:4px}
`;document.head.appendChild(st)})();
/* v42 holiday map pictures (parent's Beaver_Land_Farsi set): big holidays (Thanksgiving, Christmas, New Year, Nowruz, Halloween) start
   two weeks before the day, the others one week before; the nearest coming holiday wins; otherwise the usual picture.
   Iranian dates are the usual Gregorian days (they can move by a day in some years). Christmas uses the winter picture. */
const HOLI_FIX={chinese:{2026:"2-17",2027:"2-6",2028:"1-26",2029:"2-13",2030:"2-3",2031:"1-23",2032:"2-11"},diwali:{2026:"11-8",2027:"10-29",2028:"10-17",2029:"11-5",2030:"10-26",2031:"11-14",2032:"11-2"}};
function holiList42(y){const D=(m,d)=>new Date(y,m-1,d),thx=(()=>{const f=new Date(y,10,1).getDay();return D(11,1+((4-f+7)%7)+21)})();
  const lastTue=(()=>{const d=D(3,19);while(d.getDay()!==2)d.setDate(d.getDate()-1);return d})();
  const fx=k=>{const s=(HOLI_FIX[k]||{})[y];if(!s)return null;const [m,d]=s.split("-").map(Number);return D(m,d)};
  return [["thanksgiving",thx,14,0],["christmas",D(12,25),14,0],["newyear",D(1,1),14,0],["nowruz",D(3,20),14,5],["halloween",D(10,31),14,0],
    ["yalda",D(12,21),7,0],["chsuri",lastTue,7,0],["bedar13",D(4,2),7,0],["chinese",fx("chinese"),7,0],["diwali",fx("diwali"),7,0],["valentine",D(2,14),7,0],
    ["sepand",D(2,24),7,0],["mehregan",D(10,8),7,0],["tirgan",D(7,4),7,0],["khwarizmi",D(7,13),7,0],["ferdowsi",D(5,15),7,0],["khayyam",D(5,18),7,0],
    ["ibnsina",D(8,23),7,0],["autumn",D(9,23),7,0]].filter(x=>x[1])}
function holiday42(now=new Date()){const t=new Date(now.getFullYear(),now.getMonth(),now.getDate()),y=t.getFullYear();let best=null;
  for(const yy of [y-1,y,y+1])for(const [id,day,before,after] of holiList42(yy)){const dd=Math.round((day-t)/864e5);
    if(dd<=before&&dd>=-after){const k=Math.max(0,dd);if(!best||k<best.k||(k===best.k&&before>best.b))best={id,k,b:before}}}
  return best&&best.id}
function HOLI42(){try{if(S&&S.holiOff)return null;const id=window.__holi||holiday42();return id?"img/w/land_"+id+".webp":null}catch(e){return null}}
/* v42: Space run - a long word shrinks to fit its gate instead of breaking in the middle */
function fitShu42(){document.querySelectorAll(".shu-o:not([data-fit])").forEach(o=>{o.dataset.fit=1;const t=o.querySelector("b,small");if(!t)return;t.style.whiteSpace="nowrap";t.style.overflowWrap="normal";
  let s=parseFloat(getComputedStyle(t).fontSize)||18;while(s>10&&o.scrollWidth>o.clientWidth+1){s-=1;t.style.setProperty("font-size",s+"px","important")}
  if(o.scrollWidth>o.clientWidth+1){t.style.whiteSpace="normal"}})}
try{new MutationObserver(()=>{if(document.querySelector(".shu-o:not([data-fit])"))requestAnimationFrame(fitShu42)}).observe(document.body,{childList:true,subtree:true})}catch(e){}

/* v43: + and − said as one smooth sentence ("دو به‌علاوه‌ی پنج می‌شه چند؟") instead of 4 stitched clips; answers up to 10 too */
const M43=new Set(["PX_M43_AQ_1_1", "PX_M43_AA_1_1", "PX_M43_AQ_1_2", "PX_M43_AA_1_2", "PX_M43_AQ_2_1", "PX_M43_AA_2_1", "PX_M43_AQ_1_3", "PX_M43_AA_1_3", "PX_M43_AQ_2_2", "PX_M43_AA_2_2", "PX_M43_AQ_3_1", "PX_M43_AA_3_1", "PX_M43_AQ_1_4", "PX_M43_AA_1_4", "PX_M43_AQ_2_3", "PX_M43_AA_2_3", "PX_M43_AQ_3_2", "PX_M43_AA_3_2", "PX_M43_AQ_4_1", "PX_M43_AA_4_1", "PX_M43_AQ_1_5", "PX_M43_AA_1_5", "PX_M43_AQ_2_4", "PX_M43_AA_2_4", "PX_M43_AQ_3_3", "PX_M43_AA_3_3", "PX_M43_AQ_4_2", "PX_M43_AA_4_2", "PX_M43_AQ_5_1", "PX_M43_AA_5_1", "PX_M43_AQ_1_6", "PX_M43_AA_1_6", "PX_M43_AQ_2_5", "PX_M43_AA_2_5", "PX_M43_AQ_3_4", "PX_M43_AA_3_4", "PX_M43_AQ_4_3", "PX_M43_AA_4_3", "PX_M43_AQ_5_2", "PX_M43_AA_5_2", "PX_M43_AQ_6_1", "PX_M43_AA_6_1", "PX_M43_AQ_1_7", "PX_M43_AA_1_7", "PX_M43_AQ_2_6", "PX_M43_AA_2_6", "PX_M43_AQ_3_5", "PX_M43_AA_3_5", "PX_M43_AQ_4_4", "PX_M43_AA_4_4", "PX_M43_AQ_5_3", "PX_M43_AA_5_3", "PX_M43_AQ_6_2", "PX_M43_AA_6_2", "PX_M43_AQ_7_1", "PX_M43_AA_7_1", "PX_M43_AQ_1_8", "PX_M43_AA_1_8", "PX_M43_AQ_2_7", "PX_M43_AA_2_7", "PX_M43_AQ_3_6", "PX_M43_AA_3_6", "PX_M43_AQ_4_5", "PX_M43_AA_4_5", "PX_M43_AQ_5_4", "PX_M43_AA_5_4", "PX_M43_AQ_6_3", "PX_M43_AA_6_3", "PX_M43_AQ_7_2", "PX_M43_AA_7_2", "PX_M43_AQ_8_1", "PX_M43_AA_8_1", "PX_M43_AQ_1_9", "PX_M43_AA_1_9", "PX_M43_AQ_2_8", "PX_M43_AA_2_8", "PX_M43_AQ_3_7", "PX_M43_AA_3_7", "PX_M43_AQ_4_6", "PX_M43_AA_4_6", "PX_M43_AQ_5_5", "PX_M43_AA_5_5", "PX_M43_AQ_6_4", "PX_M43_AA_6_4", "PX_M43_AQ_7_3", "PX_M43_AA_7_3", "PX_M43_AQ_8_2", "PX_M43_AA_8_2", "PX_M43_AQ_9_1", "PX_M43_AA_9_1", "PX_M43_AQ_1_10", "PX_M43_AQ_2_9", "PX_M43_AQ_3_8", "PX_M43_AQ_4_7", "PX_M43_AQ_5_6", "PX_M43_AQ_6_5", "PX_M43_AQ_7_4", "PX_M43_AQ_8_3", "PX_M43_AQ_9_2", "PX_M43_AQ_10_1", "PX_M43_AQ_1_11", "PX_M43_AQ_2_10", "PX_M43_AQ_3_9", "PX_M43_AQ_4_8", "PX_M43_AQ_5_7", "PX_M43_AQ_6_6", "PX_M43_AQ_7_5", "PX_M43_AQ_8_4", "PX_M43_AQ_9_3", "PX_M43_AQ_10_2", "PX_M43_AQ_11_1", "PX_M43_AQ_1_12", "PX_M43_AQ_2_11", "PX_M43_AQ_3_10", "PX_M43_AQ_4_9", "PX_M43_AQ_5_8", "PX_M43_AQ_6_7", "PX_M43_AQ_7_6", "PX_M43_AQ_8_5", "PX_M43_AQ_9_4", "PX_M43_AQ_10_3", "PX_M43_AQ_11_2", "PX_M43_AQ_12_1", "PX_M43_AQ_1_13", "PX_M43_AQ_2_12", "PX_M43_AQ_3_11", "PX_M43_AQ_4_10", "PX_M43_AQ_5_9", "PX_M43_AQ_6_8", "PX_M43_AQ_7_7", "PX_M43_AQ_8_6", "PX_M43_AQ_9_5", "PX_M43_AQ_10_4", "PX_M43_AQ_11_3", "PX_M43_AQ_12_2", "PX_M43_AQ_13_1", "PX_M43_AQ_1_14", "PX_M43_AQ_2_13", "PX_M43_AQ_3_12", "PX_M43_AQ_4_11", "PX_M43_AQ_5_10", "PX_M43_AQ_6_9", "PX_M43_AQ_7_8", "PX_M43_AQ_8_7", "PX_M43_AQ_9_6", "PX_M43_AQ_10_5", "PX_M43_AQ_11_4", "PX_M43_AQ_12_3", "PX_M43_AQ_13_2", "PX_M43_AQ_14_1", "PX_M43_AQ_1_15", "PX_M43_AQ_2_14", "PX_M43_AQ_3_13", "PX_M43_AQ_4_12", "PX_M43_AQ_5_11", "PX_M43_AQ_6_10", "PX_M43_AQ_7_9", "PX_M43_AQ_8_8", "PX_M43_AQ_9_7", "PX_M43_AQ_10_6", "PX_M43_AQ_11_5", "PX_M43_AQ_12_4", "PX_M43_AQ_13_3", "PX_M43_AQ_14_2", "PX_M43_AQ_15_1", "PX_M43_AQ_1_16", "PX_M43_AQ_2_15", "PX_M43_AQ_3_14", "PX_M43_AQ_4_13", "PX_M43_AQ_5_12", "PX_M43_AQ_6_11", "PX_M43_AQ_7_10", "PX_M43_AQ_8_9", "PX_M43_AQ_9_8", "PX_M43_AQ_10_7", "PX_M43_AQ_11_6", "PX_M43_AQ_12_5", "PX_M43_AQ_13_4", "PX_M43_AQ_14_3", "PX_M43_AQ_15_2", "PX_M43_AQ_16_1", "PX_M43_AQ_1_17", "PX_M43_AQ_2_16", "PX_M43_AQ_3_15", "PX_M43_AQ_4_14", "PX_M43_AQ_5_13", "PX_M43_AQ_6_12", "PX_M43_AQ_7_11", "PX_M43_AQ_8_10", "PX_M43_AQ_9_9", "PX_M43_AQ_10_8", "PX_M43_AQ_11_7", "PX_M43_AQ_12_6", "PX_M43_AQ_13_5", "PX_M43_AQ_14_4", "PX_M43_AQ_15_3", "PX_M43_AQ_16_2", "PX_M43_AQ_17_1", "PX_M43_AQ_1_18", "PX_M43_AQ_2_17", "PX_M43_AQ_3_16", "PX_M43_AQ_4_15", "PX_M43_AQ_5_14", "PX_M43_AQ_6_13", "PX_M43_AQ_7_12", "PX_M43_AQ_8_11", "PX_M43_AQ_9_10", "PX_M43_AQ_10_9", "PX_M43_AQ_11_8", "PX_M43_AQ_12_7", "PX_M43_AQ_13_6", "PX_M43_AQ_14_5", "PX_M43_AQ_15_4", "PX_M43_AQ_16_3", "PX_M43_AQ_17_2", "PX_M43_AQ_18_1", "PX_M43_AQ_1_19", "PX_M43_AQ_2_18", "PX_M43_AQ_3_17", "PX_M43_AQ_4_16", "PX_M43_AQ_5_15", "PX_M43_AQ_6_14", "PX_M43_AQ_7_13", "PX_M43_AQ_8_12", "PX_M43_AQ_9_11", "PX_M43_AQ_10_10", "PX_M43_AQ_11_9", "PX_M43_AQ_12_8", "PX_M43_AQ_13_7", "PX_M43_AQ_14_6", "PX_M43_AQ_15_5", "PX_M43_AQ_16_4", "PX_M43_AQ_17_3", "PX_M43_AQ_18_2", "PX_M43_AQ_19_1", "PX_M43_SQ_2_1", "PX_M43_SA_2_1", "PX_M43_SQ_3_1", "PX_M43_SA_3_1", "PX_M43_SQ_3_2", "PX_M43_SA_3_2", "PX_M43_SQ_4_1", "PX_M43_SA_4_1", "PX_M43_SQ_4_2", "PX_M43_SA_4_2", "PX_M43_SQ_4_3", "PX_M43_SA_4_3", "PX_M43_SQ_5_1", "PX_M43_SA_5_1", "PX_M43_SQ_5_2", "PX_M43_SA_5_2", "PX_M43_SQ_5_3", "PX_M43_SA_5_3", "PX_M43_SQ_5_4", "PX_M43_SA_5_4", "PX_M43_SQ_6_1", "PX_M43_SA_6_1", "PX_M43_SQ_6_2", "PX_M43_SA_6_2", "PX_M43_SQ_6_3", "PX_M43_SA_6_3", "PX_M43_SQ_6_4", "PX_M43_SA_6_4", "PX_M43_SQ_6_5", "PX_M43_SA_6_5", "PX_M43_SQ_7_1", "PX_M43_SA_7_1", "PX_M43_SQ_7_2", "PX_M43_SA_7_2", "PX_M43_SQ_7_3", "PX_M43_SA_7_3", "PX_M43_SQ_7_4", "PX_M43_SA_7_4", "PX_M43_SQ_7_5", "PX_M43_SA_7_5", "PX_M43_SQ_7_6", "PX_M43_SA_7_6", "PX_M43_SQ_8_1", "PX_M43_SA_8_1", "PX_M43_SQ_8_2", "PX_M43_SA_8_2", "PX_M43_SQ_8_3", "PX_M43_SA_8_3", "PX_M43_SQ_8_4", "PX_M43_SA_8_4", "PX_M43_SQ_8_5", "PX_M43_SA_8_5", "PX_M43_SQ_8_6", "PX_M43_SA_8_6", "PX_M43_SQ_8_7", "PX_M43_SA_8_7", "PX_M43_SQ_9_1", "PX_M43_SA_9_1", "PX_M43_SQ_9_2", "PX_M43_SA_9_2", "PX_M43_SQ_9_3", "PX_M43_SA_9_3", "PX_M43_SQ_9_4", "PX_M43_SA_9_4", "PX_M43_SQ_9_5", "PX_M43_SA_9_5", "PX_M43_SQ_9_6", "PX_M43_SA_9_6", "PX_M43_SQ_9_7", "PX_M43_SA_9_7", "PX_M43_SQ_9_8", "PX_M43_SA_9_8", "PX_M43_SQ_10_1", "PX_M43_SA_10_1", "PX_M43_SQ_10_2", "PX_M43_SA_10_2", "PX_M43_SQ_10_3", "PX_M43_SA_10_3", "PX_M43_SQ_10_4", "PX_M43_SA_10_4", "PX_M43_SQ_10_5", "PX_M43_SA_10_5", "PX_M43_SQ_10_6", "PX_M43_SA_10_6", "PX_M43_SQ_10_7", "PX_M43_SA_10_7", "PX_M43_SQ_10_8", "PX_M43_SA_10_8", "PX_M43_SQ_10_9", "PX_M43_SA_10_9", "PX_M43_SQ_11_1", "PX_M43_SQ_11_2", "PX_M43_SQ_11_3", "PX_M43_SQ_11_4", "PX_M43_SQ_11_5", "PX_M43_SQ_11_6", "PX_M43_SQ_11_7", "PX_M43_SQ_11_8", "PX_M43_SQ_11_9", "PX_M43_SQ_11_10", "PX_M43_SQ_12_1", "PX_M43_SQ_12_2", "PX_M43_SQ_12_3", "PX_M43_SQ_12_4", "PX_M43_SQ_12_5", "PX_M43_SQ_12_6", "PX_M43_SQ_12_7", "PX_M43_SQ_12_8", "PX_M43_SQ_12_9", "PX_M43_SQ_12_10", "PX_M43_SQ_12_11", "PX_M43_SQ_13_1", "PX_M43_SQ_13_2", "PX_M43_SQ_13_3", "PX_M43_SQ_13_4", "PX_M43_SQ_13_5", "PX_M43_SQ_13_6", "PX_M43_SQ_13_7", "PX_M43_SQ_13_8", "PX_M43_SQ_13_9", "PX_M43_SQ_13_10", "PX_M43_SQ_13_11", "PX_M43_SQ_13_12", "PX_M43_SQ_14_1", "PX_M43_SQ_14_2", "PX_M43_SQ_14_3", "PX_M43_SQ_14_4", "PX_M43_SQ_14_5", "PX_M43_SQ_14_6", "PX_M43_SQ_14_7", "PX_M43_SQ_14_8", "PX_M43_SQ_14_9", "PX_M43_SQ_14_10", "PX_M43_SQ_14_11", "PX_M43_SQ_14_12", "PX_M43_SQ_14_13", "PX_M43_SQ_15_1", "PX_M43_SQ_15_2", "PX_M43_SQ_15_3", "PX_M43_SQ_15_4", "PX_M43_SQ_15_5", "PX_M43_SQ_15_6", "PX_M43_SQ_15_7", "PX_M43_SQ_15_8", "PX_M43_SQ_15_9", "PX_M43_SQ_15_10", "PX_M43_SQ_15_11", "PX_M43_SQ_15_12", "PX_M43_SQ_15_13", "PX_M43_SQ_15_14", "PX_M43_SQ_16_1", "PX_M43_SQ_16_2", "PX_M43_SQ_16_3", "PX_M43_SQ_16_4", "PX_M43_SQ_16_5", "PX_M43_SQ_16_6", "PX_M43_SQ_16_7", "PX_M43_SQ_16_8", "PX_M43_SQ_16_9", "PX_M43_SQ_16_10", "PX_M43_SQ_16_11", "PX_M43_SQ_16_12", "PX_M43_SQ_16_13", "PX_M43_SQ_16_14", "PX_M43_SQ_16_15", "PX_M43_SQ_17_1", "PX_M43_SQ_17_2", "PX_M43_SQ_17_3", "PX_M43_SQ_17_4", "PX_M43_SQ_17_5", "PX_M43_SQ_17_6", "PX_M43_SQ_17_7", "PX_M43_SQ_17_8", "PX_M43_SQ_17_9", "PX_M43_SQ_17_10", "PX_M43_SQ_17_11", "PX_M43_SQ_17_12", "PX_M43_SQ_17_13", "PX_M43_SQ_17_14", "PX_M43_SQ_17_15", "PX_M43_SQ_17_16", "PX_M43_SQ_18_1", "PX_M43_SQ_18_2", "PX_M43_SQ_18_3", "PX_M43_SQ_18_4", "PX_M43_SQ_18_5", "PX_M43_SQ_18_6", "PX_M43_SQ_18_7", "PX_M43_SQ_18_8", "PX_M43_SQ_18_9", "PX_M43_SQ_18_10", "PX_M43_SQ_18_11", "PX_M43_SQ_18_12", "PX_M43_SQ_18_13", "PX_M43_SQ_18_14", "PX_M43_SQ_18_15", "PX_M43_SQ_18_16", "PX_M43_SQ_18_17", "PX_M43_SQ_19_1", "PX_M43_SQ_19_2", "PX_M43_SQ_19_3", "PX_M43_SQ_19_4", "PX_M43_SQ_19_5", "PX_M43_SQ_19_6", "PX_M43_SQ_19_7", "PX_M43_SQ_19_8", "PX_M43_SQ_19_9", "PX_M43_SQ_19_10", "PX_M43_SQ_19_11", "PX_M43_SQ_19_12", "PX_M43_SQ_19_13", "PX_M43_SQ_19_14", "PX_M43_SQ_19_15", "PX_M43_SQ_19_16", "PX_M43_SQ_19_17", "PX_M43_SQ_19_18", "PX_M43_SQ_20_1", "PX_M43_SQ_20_2", "PX_M43_SQ_20_3", "PX_M43_SQ_20_4", "PX_M43_SQ_20_5", "PX_M43_SQ_20_6", "PX_M43_SQ_20_7", "PX_M43_SQ_20_8", "PX_M43_SQ_20_9", "PX_M43_SQ_20_10", "PX_M43_SQ_20_11", "PX_M43_SQ_20_12", "PX_M43_SQ_20_13", "PX_M43_SQ_20_14", "PX_M43_SQ_20_15", "PX_M43_SQ_20_16", "PX_M43_SQ_20_17", "PX_M43_SQ_20_18", "PX_M43_SQ_20_19", "PX_M43_AA_1_10", "PX_M43_AA_2_9", "PX_M43_AA_3_8", "PX_M43_AA_4_7", "PX_M43_AA_5_6", "PX_M43_AA_6_5", "PX_M43_AA_7_4", "PX_M43_AA_8_3", "PX_M43_AA_9_2", "PX_M43_AA_10_1", "PX_M43_AA_1_11", "PX_M43_AA_2_10", "PX_M43_AA_3_9", "PX_M43_AA_4_8", "PX_M43_AA_5_7", "PX_M43_AA_6_6", "PX_M43_AA_7_5", "PX_M43_AA_8_4", "PX_M43_AA_9_3", "PX_M43_AA_10_2", "PX_M43_AA_11_1", "PX_M43_AA_1_12", "PX_M43_AA_2_11", "PX_M43_AA_3_10", "PX_M43_AA_4_9", "PX_M43_AA_5_8", "PX_M43_AA_6_7", "PX_M43_AA_7_6", "PX_M43_AA_8_5", "PX_M43_AA_9_4", "PX_M43_AA_10_3", "PX_M43_AA_11_2", "PX_M43_AA_12_1", "PX_M43_AA_1_13", "PX_M43_AA_2_12", "PX_M43_AA_3_11", "PX_M43_AA_4_10", "PX_M43_AA_5_9", "PX_M43_AA_6_8", "PX_M43_AA_7_7", "PX_M43_AA_8_6", "PX_M43_AA_9_5", "PX_M43_AA_10_4", "PX_M43_AA_11_3", "PX_M43_AA_12_2", "PX_M43_AA_13_1", "PX_M43_AA_1_14", "PX_M43_AA_2_13", "PX_M43_AA_3_12", "PX_M43_AA_4_11", "PX_M43_AA_5_10", "PX_M43_AA_6_9", "PX_M43_AA_7_8", "PX_M43_AA_8_7", "PX_M43_AA_9_6", "PX_M43_AA_10_5", "PX_M43_AA_11_4", "PX_M43_AA_12_3", "PX_M43_AA_13_2", "PX_M43_AA_14_1", "PX_M43_AA_1_15", "PX_M43_AA_2_14", "PX_M43_AA_3_13", "PX_M43_AA_4_12", "PX_M43_AA_5_11", "PX_M43_AA_6_10", "PX_M43_AA_7_9", "PX_M43_AA_8_8", "PX_M43_AA_9_7", "PX_M43_AA_10_6", "PX_M43_AA_11_5", "PX_M43_AA_12_4", "PX_M43_AA_13_3", "PX_M43_AA_14_2", "PX_M43_AA_15_1", "PX_M43_AA_1_16", "PX_M43_AA_2_15", "PX_M43_AA_3_14", "PX_M43_AA_4_13", "PX_M43_AA_5_12", "PX_M43_AA_6_11", "PX_M43_AA_7_10", "PX_M43_AA_8_9", "PX_M43_AA_9_8", "PX_M43_AA_10_7", "PX_M43_AA_11_6", "PX_M43_AA_12_5", "PX_M43_AA_13_4", "PX_M43_AA_14_3", "PX_M43_AA_15_2", "PX_M43_AA_16_1", "PX_M43_AA_1_17", "PX_M43_AA_2_16", "PX_M43_AA_3_15", "PX_M43_AA_4_14", "PX_M43_AA_5_13", "PX_M43_AA_6_12", "PX_M43_AA_7_11", "PX_M43_AA_8_10", "PX_M43_AA_9_9", "PX_M43_AA_10_8", "PX_M43_AA_11_7", "PX_M43_AA_12_6", "PX_M43_AA_13_5", "PX_M43_AA_14_4", "PX_M43_AA_15_3", "PX_M43_AA_16_2", "PX_M43_AA_17_1", "PX_M43_AA_1_18", "PX_M43_AA_2_17", "PX_M43_AA_3_16", "PX_M43_AA_4_15", "PX_M43_AA_5_14", "PX_M43_AA_6_13", "PX_M43_AA_7_12", "PX_M43_AA_8_11", "PX_M43_AA_9_10", "PX_M43_AA_10_9", "PX_M43_AA_11_8", "PX_M43_AA_12_7", "PX_M43_AA_13_6", "PX_M43_AA_14_5", "PX_M43_AA_15_4", "PX_M43_AA_16_3", "PX_M43_AA_17_2", "PX_M43_AA_18_1", "PX_M43_AA_1_19", "PX_M43_AA_2_18", "PX_M43_AA_3_17", "PX_M43_AA_4_16", "PX_M43_AA_5_15", "PX_M43_AA_6_14", "PX_M43_AA_7_13", "PX_M43_AA_8_12", "PX_M43_AA_9_11", "PX_M43_AA_10_10", "PX_M43_AA_11_9", "PX_M43_AA_12_8", "PX_M43_AA_13_7", "PX_M43_AA_14_6", "PX_M43_AA_15_5", "PX_M43_AA_16_4", "PX_M43_AA_17_3", "PX_M43_AA_18_2", "PX_M43_AA_19_1", "PX_M43_SA_11_1", "PX_M43_SA_11_2", "PX_M43_SA_11_3", "PX_M43_SA_11_4", "PX_M43_SA_11_5", "PX_M43_SA_11_6", "PX_M43_SA_11_7", "PX_M43_SA_11_8", "PX_M43_SA_11_9", "PX_M43_SA_11_10", "PX_M43_SA_12_1", "PX_M43_SA_12_2", "PX_M43_SA_12_3", "PX_M43_SA_12_4", "PX_M43_SA_12_5", "PX_M43_SA_12_6", "PX_M43_SA_12_7", "PX_M43_SA_12_8", "PX_M43_SA_12_9", "PX_M43_SA_12_10", "PX_M43_SA_12_11", "PX_M43_SA_13_1", "PX_M43_SA_13_2", "PX_M43_SA_13_3", "PX_M43_SA_13_4", "PX_M43_SA_13_5", "PX_M43_SA_13_6", "PX_M43_SA_13_7", "PX_M43_SA_13_8", "PX_M43_SA_13_9", "PX_M43_SA_13_10", "PX_M43_SA_13_11", "PX_M43_SA_13_12", "PX_M43_SA_14_1", "PX_M43_SA_14_2", "PX_M43_SA_14_3", "PX_M43_SA_14_4", "PX_M43_SA_14_5", "PX_M43_SA_14_6", "PX_M43_SA_14_7", "PX_M43_SA_14_8", "PX_M43_SA_14_9", "PX_M43_SA_14_10", "PX_M43_SA_14_11", "PX_M43_SA_14_12", "PX_M43_SA_14_13", "PX_M43_SA_15_1", "PX_M43_SA_15_2", "PX_M43_SA_15_3", "PX_M43_SA_15_4", "PX_M43_SA_15_5", "PX_M43_SA_15_6", "PX_M43_SA_15_7", "PX_M43_SA_15_8", "PX_M43_SA_15_9", "PX_M43_SA_15_10", "PX_M43_SA_15_11", "PX_M43_SA_15_12", "PX_M43_SA_15_13", "PX_M43_SA_15_14", "PX_M43_SA_16_1", "PX_M43_SA_16_2", "PX_M43_SA_16_3", "PX_M43_SA_16_4", "PX_M43_SA_16_5", "PX_M43_SA_16_6", "PX_M43_SA_16_7", "PX_M43_SA_16_8", "PX_M43_SA_16_9", "PX_M43_SA_16_10", "PX_M43_SA_16_11", "PX_M43_SA_16_12", "PX_M43_SA_16_13", "PX_M43_SA_16_14", "PX_M43_SA_16_15", "PX_M43_SA_17_1", "PX_M43_SA_17_2", "PX_M43_SA_17_3", "PX_M43_SA_17_4", "PX_M43_SA_17_5", "PX_M43_SA_17_6", "PX_M43_SA_17_7", "PX_M43_SA_17_8", "PX_M43_SA_17_9", "PX_M43_SA_17_10", "PX_M43_SA_17_11", "PX_M43_SA_17_12", "PX_M43_SA_17_13", "PX_M43_SA_17_14", "PX_M43_SA_17_15", "PX_M43_SA_17_16", "PX_M43_SA_18_1", "PX_M43_SA_18_2", "PX_M43_SA_18_3", "PX_M43_SA_18_4", "PX_M43_SA_18_5", "PX_M43_SA_18_6", "PX_M43_SA_18_7", "PX_M43_SA_18_8", "PX_M43_SA_18_9", "PX_M43_SA_18_10", "PX_M43_SA_18_11", "PX_M43_SA_18_12", "PX_M43_SA_18_13", "PX_M43_SA_18_14", "PX_M43_SA_18_15", "PX_M43_SA_18_16", "PX_M43_SA_18_17", "PX_M43_SA_19_1", "PX_M43_SA_19_2", "PX_M43_SA_19_3", "PX_M43_SA_19_4", "PX_M43_SA_19_5", "PX_M43_SA_19_6", "PX_M43_SA_19_7", "PX_M43_SA_19_8", "PX_M43_SA_19_9", "PX_M43_SA_19_10", "PX_M43_SA_19_11", "PX_M43_SA_19_12", "PX_M43_SA_19_13", "PX_M43_SA_19_14", "PX_M43_SA_19_15", "PX_M43_SA_19_16", "PX_M43_SA_19_17", "PX_M43_SA_19_18", "PX_M43_SA_20_1", "PX_M43_SA_20_2", "PX_M43_SA_20_3", "PX_M43_SA_20_4", "PX_M43_SA_20_5", "PX_M43_SA_20_6", "PX_M43_SA_20_7", "PX_M43_SA_20_8", "PX_M43_SA_20_9", "PX_M43_SA_20_10", "PX_M43_SA_20_11", "PX_M43_SA_20_12", "PX_M43_SA_20_13", "PX_M43_SA_20_14", "PX_M43_SA_20_15", "PX_M43_SA_20_16", "PX_M43_SA_20_17", "PX_M43_SA_20_18", "PX_M43_SA_20_19"]);
function m43(v){if(!Array.isArray(v))return v;const s=v.map(x=>typeof x==="string"?x:"");
  for(let i=0;i+3<s.length;i++){const a=s[i].match(/^w\/LULU_N(\d+)$/),op=s[i+1],b=s[i+2].match(/^w\/LULU_N(\d+)$/);
    if(!a||!b||s[i+3]!=="w/LULU_EQUALS"||(op!=="w/LULU_PLUS"&&op!=="w/LULU_MINUS"))continue;
    const k=op==="w/LULU_PLUS"?"A":"S",A=+a[1],B=+b[1],r=(s[i+4]||"").match(/^w\/LULU_N(\d+)$/);
    if(r){if((k==="A"?A+B:A-B)===+r[1]&&M43.has(`PX_M43_${k}A_${A}_${B}`))return [...v.slice(0,i),`w/PX_M43_${k}A_${A}_${B}`,...v.slice(i+5)];continue}
    if(M43.has(`PX_M43_${k}Q_${A}_${B}`))return [...v.slice(0,i),`w/PX_M43_${k}Q_${A}_${B}`,...v.slice(i+4)]}
  return v}
const _sayseq43=sayseq;sayseq=function(list,onEnd){return _sayseq43(m43(list),onEnd)};
const _bq43=buildQ;buildQ=function(){const q=_bq43.apply(this,arguments);try{if(q){if(q.voice)q.voice=m43(q.voice);if(q.exp&&q.exp.v)q.exp.v=m43(q.exp.v);if(q.why&&q.why.v)q.why.v=m43(q.why.v)}}catch(e){}return q};

/* ---------- v44: every answer is read; numbers above 100; true / false answers are not read ---------- */
Object.assign(FA_SAY,{"wash hands": "PX_F44_WASH_HANDS", "pencil": "PX_F44_PENCIL", "soup": "PX_F44_SOUP", "toast": "PX_F44_TOAST", "in the sky": "PX_F44_IN_THE_SKY", "on a tree": "PX_F44_ON_A_TREE", "in the sea": "PX_F44_IN_THE_SEA", "a shoe": "PX_F44_A_SHOE", "cereal": "PX_F44_CEREAL", "pillow": "PX_F44_PILLOW", "coconut": "PX_F44_COCONUT", "plate": "PX_F44_PLATE", "break toys": "PX_F44_BREAK_TOYS", "share your toys": "PX_F44_SHARE_YOUR_TOYS", "grab toys": "PX_F44_GRAB_TOYS", "school bus": "PX_F44_SCHOOL_BUS", "kite": "PX_F44_KITE", "ribs": "PX_F44_RIBS", "tendons": "PX_F44_TENDONS", "veins": "PX_F44_VEINS", "nerves": "PX_F44_NERVES", "to see better": "PX_F44_TO_SEE_BETTER", "to grow hair": "PX_F44_TO_GROW_HAIR", "our body is mostly water": "PX_F44_OUR_BODY_IS_MOSTLY_WATER", "air bubbles only": "PX_F44_AIR_BUBBLES_ONLY", "oxygen and food": "PX_F44_OXYGEN_AND_FOOD", "liver": "PX_F44_LIVER", "mouth": "PX_F44_MOUTH", "small intestine": "PX_F44_SMALL_INTESTINE", "vitamins": "PX_F44_VITAMINS", "carbohydrates": "PX_F44_CARBOHYDRATES", "mount damavand": "PX_F44_MOUNT_DAMAVAND", "mount everest": "PX_F44_MOUNT_EVEREST", "rome": "PX_F44_ROME", "paris": "PX_F44_PARIS", "full of water": "PX_F44_FULL_OF_WATER", "flood": "PX_F44_FLOOD", "earthquake": "PX_F44_EARTHQUAKE", "tornado": "PX_F44_TORNADO", "borders": "PX_F44_BORDERS", "latitude lines": "PX_F44_LATITUDE_LINES", "russia": "PX_F44_RUSSIA", "the great wall": "PX_F44_THE_GREAT_WALL", "the great pyramid": "PX_F44_THE_GREAT_PYRAMID", "big ben": "PX_F44_BIG_BEN", "the chinese empire": "PX_F44_THE_CHINESE_EMPIRE", "the achaemenid empire": "PX_F44_THE_ACHAEMENID_EMPIRE", "the roman empire": "PX_F44_THE_ROMAN_EMPIRE", "solar energy": "PX_F44_SOLAR_ENERGY", "they make oxygen": "PX_F44_THEY_MAKE_OXYGEN", "they make smoke": "PX_F44_THEY_MAKE_SMOKE", "they make noise": "PX_F44_THEY_MAKE_NOISE", "fossil fuel": "PX_F44_FOSSIL_FUEL", "renewable energy": "PX_F44_RENEWABLE_ENERGY", "gases that trap heat": "PX_F44_GASES_THAT_TRAP_HEAT", "too many rainbows": "PX_F44_TOO_MANY_RAINBOWS", "rain, snow and wind": "PX_F44_RAIN_SNOW_AND_WIND", "hot, warm and cold": "PX_F44_HOT_WARM_AND_COLD", "ice, water and steam": "PX_F44_ICE_WATER_AND_STEAM", "copper": "PX_F44_COPPER", "atoms": "PX_F44_ATOMS", "a force": "PX_F44_A_FORCE", "a sound": "PX_F44_A_SOUND", "a colour": "PX_F44_A_COLOUR", "they are the same": "PX_F44_THEY_ARE_THE_SAME", "temperature": "PX_F44_TEMPERATURE", "weight": "PX_F44_WEIGHT", "length": "PX_F44_LENGTH", "freezing": "PX_F44_FREEZING", "evaporation": "PX_F44_EVAPORATION", "melting": "PX_F44_MELTING", "pulley": "PX_F44_PULLEY", "inclined plane": "PX_F44_INCLINED_PLANE", "diamond": "PX_F44_DIAMOND", "gold": "PX_F44_GOLD", "a solid": "PX_F44_A_SOLID", "a solution": "PX_F44_A_SOLUTION", "a puddle": "PX_F44_A_PUDDLE", "electricity": "PX_F44_ELECTRICITY", "3 in the morning": "PX_F44_3_IN_THE_MORNING", "3 in the afternoon": "PX_F44_3_IN_THE_AFTERNOON", "5 in the afternoon": "PX_F44_5_IN_THE_AFTERNOON", "esfand": "PX_F44_ESFAND", "mehr": "PX_F44_MEHR", "farvardin": "PX_F44_FARVARDIN", "clocks are broken": "PX_F44_CLOCKS_ARE_BROKEN", "countries choose at random": "PX_F44_COUNTRIES_CHOOSE_AT_RANDOM", "the earth spins, so the sun rises at different times": "PX_F44_THE_EARTH_SPINS_SO_THE_SUN_RISES_AT_DIFF"});
Object.assign(EN_SAY,{"wash hands": "PX_E44_WASH_HANDS", "pencil": "PX_E44_PENCIL", "soup": "PX_E44_SOUP", "toast": "PX_E44_TOAST", "in the sky": "PX_E44_IN_THE_SKY", "on a tree": "PX_E44_ON_A_TREE", "in the sea": "PX_E44_IN_THE_SEA", "a shoe": "PX_E44_A_SHOE", "cereal": "PX_E44_CEREAL", "pillow": "PX_E44_PILLOW", "coconut": "PX_E44_COCONUT", "plate": "PX_E44_PLATE", "break toys": "PX_E44_BREAK_TOYS", "share your toys": "PX_E44_SHARE_YOUR_TOYS", "grab toys": "PX_E44_GRAB_TOYS", "school bus": "PX_E44_SCHOOL_BUS", "kite": "PX_E44_KITE", "ribs": "PX_E44_RIBS", "tendons": "PX_E44_TENDONS", "veins": "PX_E44_VEINS", "nerves": "PX_E44_NERVES", "to see better": "PX_E44_TO_SEE_BETTER", "to grow hair": "PX_E44_TO_GROW_HAIR", "our body is mostly water": "PX_E44_OUR_BODY_IS_MOSTLY_WATER", "air bubbles only": "PX_E44_AIR_BUBBLES_ONLY", "oxygen and food": "PX_E44_OXYGEN_AND_FOOD", "liver": "PX_E44_LIVER", "mouth": "PX_E44_MOUTH", "small intestine": "PX_E44_SMALL_INTESTINE", "vitamins": "PX_E44_VITAMINS", "carbohydrates": "PX_E44_CARBOHYDRATES", "mount damavand": "PX_E44_MOUNT_DAMAVAND", "mount everest": "PX_E44_MOUNT_EVEREST", "rome": "PX_E44_ROME", "paris": "PX_E44_PARIS", "full of water": "PX_E44_FULL_OF_WATER", "flood": "PX_E44_FLOOD", "earthquake": "PX_E44_EARTHQUAKE", "tornado": "PX_E44_TORNADO", "borders": "PX_E44_BORDERS", "latitude lines": "PX_E44_LATITUDE_LINES", "russia": "PX_E44_RUSSIA", "the great wall": "PX_E44_THE_GREAT_WALL", "the great pyramid": "PX_E44_THE_GREAT_PYRAMID", "big ben": "PX_E44_BIG_BEN", "the chinese empire": "PX_E44_THE_CHINESE_EMPIRE", "the achaemenid empire": "PX_E44_THE_ACHAEMENID_EMPIRE", "the roman empire": "PX_E44_THE_ROMAN_EMPIRE", "solar energy": "PX_E44_SOLAR_ENERGY", "they make oxygen": "PX_E44_THEY_MAKE_OXYGEN", "they make smoke": "PX_E44_THEY_MAKE_SMOKE", "they make noise": "PX_E44_THEY_MAKE_NOISE", "fossil fuel": "PX_E44_FOSSIL_FUEL", "renewable energy": "PX_E44_RENEWABLE_ENERGY", "gases that trap heat": "PX_E44_GASES_THAT_TRAP_HEAT", "too many rainbows": "PX_E44_TOO_MANY_RAINBOWS", "rain, snow and wind": "PX_E44_RAIN_SNOW_AND_WIND", "hot, warm and cold": "PX_E44_HOT_WARM_AND_COLD", "ice, water and steam": "PX_E44_ICE_WATER_AND_STEAM", "copper": "PX_E44_COPPER", "atoms": "PX_E44_ATOMS", "a force": "PX_E44_A_FORCE", "a sound": "PX_E44_A_SOUND", "a colour": "PX_E44_A_COLOUR", "they are the same": "PX_E44_THEY_ARE_THE_SAME", "temperature": "PX_E44_TEMPERATURE", "weight": "PX_E44_WEIGHT", "length": "PX_E44_LENGTH", "freezing": "PX_E44_FREEZING", "evaporation": "PX_E44_EVAPORATION", "melting": "PX_E44_MELTING", "pulley": "PX_E44_PULLEY", "inclined plane": "PX_E44_INCLINED_PLANE", "diamond": "PX_E44_DIAMOND", "gold": "PX_E44_GOLD", "a solid": "PX_E44_A_SOLID", "a solution": "PX_E44_A_SOLUTION", "a puddle": "PX_E44_A_PUDDLE", "electricity": "PX_E44_ELECTRICITY", "3 in the morning": "PX_E44_3_IN_THE_MORNING", "3 in the afternoon": "PX_E44_3_IN_THE_AFTERNOON", "5 in the afternoon": "PX_E44_5_IN_THE_AFTERNOON", "esfand": "PX_E44_ESFAND", "mehr": "PX_E44_MEHR", "farvardin": "PX_E44_FARVARDIN", "clocks are broken": "PX_E44_CLOCKS_ARE_BROKEN", "countries choose at random": "PX_E44_COUNTRIES_CHOOSE_AT_RANDOM", "the earth spins, so the sun rises at different times": "PX_E44_THE_EARTH_SPINS_SO_THE_SUN_RISES_AT_DIFF", "caring again": "PX_E44_CARING_AGAIN", "without care": "PX_E44_WITHOUT_CARE", "full of care": "PX_E44_FULL_OF_CARE", "full of help": "PX_E44_FULL_OF_HELP", "without help": "PX_E44_WITHOUT_HELP", "helping again": "PX_E44_HELPING_AGAIN", "see again": "PX_E44_SEE_AGAIN", "not see": "PX_E44_NOT_SEE", "see before": "PX_E44_SEE_BEFORE", "agree a lot": "PX_E44_AGREE_A_LOT", "agree again": "PX_E44_AGREE_AGAIN", "not agree": "PX_E44_NOT_AGREE", "spell wrongly": "PX_E44_SPELL_WRONGLY", "spell again": "PX_E44_SPELL_AGAIN", "spell quickly": "PX_E44_SPELL_QUICKLY", "very angry": "PX_E44_VERY_ANGRY", "easily broken": "PX_E44_EASILY_BROKEN", "very heavy": "PX_E44_VERY_HEAVY", "very strong": "PX_E44_VERY_STRONG", "lazy": "PX_E44_LAZY", "courageous": "PX_E44_COURAGEOUS", "selfish": "PX_E44_SELFISH", "kind": "PX_E44_KIND", "rich": "PX_E44_RICH", "talk": "PX_E44_TALK", "invite": "PX_E44_INVITE", "add": "PX_E44_ADD", "leave out": "PX_E44_LEAVE_OUT", "it's a little cloudy": "PX_E44_IT_S_A_LITTLE_CLOUDY", "it's raining very hard": "PX_E44_IT_S_RAINING_VERY_HARD", "animals are falling": "PX_E44_ANIMALS_ARE_FALLING", "it's very easy": "PX_E44_IT_S_VERY_EASY", "it's tasty": "PX_E44_IT_S_TASTY", "it's very hard": "PX_E44_IT_S_VERY_HARD", "i'm very happy": "PX_E44_I_M_VERY_HAPPY", "i'm outside": "PX_E44_I_M_OUTSIDE", "i feel a bit sick": "PX_E44_I_FEEL_A_BIT_SICK", "don't lose the cat": "PX_E44_DON_T_LOSE_THE_CAT", "don't tell the secret": "PX_E44_DON_T_TELL_THE_SECRET", "don't open the bag": "PX_E44_DON_T_OPEN_THE_BAG", "make it colder": "PX_E44_MAKE_IT_COLDER", "start talking so everyone feels friendly": "PX_E44_START_TALKING_SO_EVERYONE_FEELS_FRIENDLY", "smash some ice": "PX_E44_SMASH_SOME_ICE", "she runs fast.": "PX_E44_SHE_RUNS_FAST", "she is the wind.": "PX_E44_SHE_IS_THE_WIND", "she runs as fast as the wind.": "PX_E44_SHE_RUNS_AS_FAST_AS_THE_WIND", "the classroom was noisy.": "PX_E44_THE_CLASSROOM_WAS_NOISY", "the classroom was like a zoo.": "PX_E44_THE_CLASSROOM_WAS_LIKE_A_ZOO", "the classroom was a zoo.": "PX_E44_THE_CLASSROOM_WAS_A_ZOO", "adjective (describing a thing)": "PX_E44_ADJECTIVE_DESCRIBING_A_THING", "adverb (how it is done)": "PX_E44_ADVERB_HOW_IT_IS_DONE", "it had no water": "PX_E44_IT_HAD_NO_WATER", "it was a toy": "PX_E44_IT_WAS_A_TOY", "it was too cold": "PX_E44_IT_WAS_TOO_COLD", "flowers smell nice": "PX_E44_FLOWERS_SMELL_NICE", "bees are yellow": "PX_E44_BEES_ARE_YELLOW", "bees help flowers while getting food": "PX_E44_BEES_HELP_FLOWERS_WHILE_GETTING_FOOD", "concerts are long": "PX_E44_CONCERTS_ARE_LONG", "pianos are big": "PX_E44_PIANOS_ARE_BIG", "practice helps us improve": "PX_E44_PRACTICE_HELPS_US_IMPROVE", "sun": "PX_E44_SUN", "gone": "PX_E44_GONE", "very small": "PX_E44_VERY_SMALL", "very fast": "PX_E44_VERY_FAST", "very big": "PX_E44_VERY_BIG", "stop": "PX_E44_STOP", "historic": "PX_E44_HISTORIC"});
const FAH44=n=>n===1?"w/PX_FA_100":"w/PX_F44_H"+(n*100);
function faBig44(n){const o=[];if(n>=1000){o.push("w/PX_FA_1000");n-=1000;if(n)o.push("w/PX_VA")}const h=Math.floor(n/100),r=n%100;if(h){o.push(FAH44(h));if(r)o.push("w/PX_VA")}if(r)o.push(...faNum(r));return o}
function enBig44(n){const o=[];if(n>=1000){o.push("w/PX_E44_T1000");n-=1000}const h=Math.floor(n/100),r=n%100;if(h)o.push("w/PX_E44_H"+(h*100));if(r)o.push("w/LULU_EN"+r);return o}
const _fa44=faSay;faSay=function(w){const s=String(w).trim();if(/^\d+$/.test(s)&&+s>100&&+s<2000)return faBig44(+s);return _fa44(w)};
const _en44=enSay;enSay=function(w){const s=String(w).trim();if(/^\d+$/.test(s)&&+s>100&&+s<2000)return enBig44(+s);return _en44(w)};
const isTF44=q=>!!(q&&q.opts&&(q.tf||q.yn||q.opts.some(o=>(o.say||[]).some(c=>/LULU_SK_(YES|NO)$/.test(c)))));
const tf44=q=>{try{if(isTF44(q))q.opts.forEach(o=>o.say=[])}catch(e){}return q};
const _bq44=buildQ;buildQ=function(){return tf44(_bq44.apply(this,arguments))};
const _qw44=qWatcher;qWatcher=function(){return tf44(_qw44.apply(this,arguments))};
const _ask44=ask;ask=function(q,done){tf44(q);return _ask44(q,done)};
/* v44: the English words recorded for the reading questions (EN31) and the new ones count as English, so those questions read their answers again */
try{Object.values(EN31).forEach(c=>EN40.add(c));Object.values(EN_SAY).forEach(c=>EN40.add("w/"+c));"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(l=>EN40.add("w/LULU_LN_"+l))}catch(e){}
/* v44.1 owner's rule: when there are only 2 answers (true/false, yes/no, kind/unkind, this or that) read the question, not the answers */
const two44=q=>{try{if(q&&q.opts&&q.opts.length===2)q.opts.forEach(o=>o.say=[])}catch(e){}return q};
const _ask441=ask;ask=function(q,done){two44(q);return _ask441(q,done)};
const _grl441=gReadList;gReadList=function(q,lead,items){if(items&&items.length===2){sayseq(lead||q.voice||[],()=>{});return true}return _grl441(q,lead,items)};
const _gro441=gReadOpts;gReadOpts=function(q){try{const sel=q&&OPTREAD[q.game];if(sel){const bs=[...$("qBody").querySelectorAll(sel)].filter(b=>!b.disabled&&!b.hidden);if(bs.length===2){sayseq(q.voice||[],()=>{});return true}}}catch(e){}return _gro441(q)};
const _rd441=rd31;rd31=function(q,cur,boxes,first,onDone){const n=(boxes||[]).filter(b=>b&&!b.hidden).length;if(n===2&&cur&&cur.opts)cur={...cur,opts:cur.opts.map(o=>({...o,say:[]}))};return _rd441(q,cur,boxes,first,onDone)};
/* v44.1 the thing each game asks about is read, not only the general instruction */
Object.assign(FA_SAY,{"sledge":"PX_F441_SEA_SLEDGE","very cold day":"PX_F441_SEA_COLD","nowruz":"PX_F441_SEA_NOWRUZ","baby birds":"PX_F441_SEA_BIRDS","very hot day":"PX_F441_SEA_HOT","falling leaves":"PX_F441_SEA_LEAVES","pumpkin":"PX_F441_SEA_PUMPKIN","light blue":"PX_F441_LIGHT_BLUE"});
Object.assign(EN_SAY,{"sledge":"PX_E441_SLEDGE","very cold day":"PX_E441_VERY_COLD_DAY","nowruz":"PX_E441_NOWRUZ","baby birds":"PX_E441_BABY_BIRDS","very hot day":"PX_E441_VERY_HOT_DAY","falling leaves":"PX_E441_FALLING_LEAVES","pumpkin":"PX_E441_PUMPKIN","light blue":"PX_E441_LIGHT_BLUE"});
try{["PX_E441_SLEDGE","PX_E441_VERY_COLD_DAY","PX_E441_NOWRUZ","PX_E441_BABY_BIRDS","PX_E441_VERY_HOT_DAY","PX_E441_FALLING_LEAVES","PX_E441_PUMPKIN","PX_E441_LIGHT_BLUE"].forEach(c=>EN40.add("w/"+c))}catch(e){}
const SEQV441={butterfly:"BUTTERFLY",chick:"CHICK",day:"DAY",life:"LIFE",months:"MONTHS",planets:"PLANETS",plant:"PLANT",week:"WEEK"};
const ROBOV441={robot:"ROBOT",car:"CAR",bunny:"BUNNY",bee:"BEE"};
Object.assign(FA_SAY,{"newspaper":"PX_F441_REC_NEWSPAPER","bottle":"PX_F441_REC_BOTTLE","jar":"PX_F441_REC_JAR","glass bottle":"PX_F441_REC_GLASS_BOTTLE"});
Object.assign(EN_SAY,{"newspaper":"PX_E441_NEWSPAPER","bottle":"PX_E441_BOTTLE","jar":"PX_E441_JAR","glass bottle":"PX_E441_GLASS_BOTTLE"});
try{["NEWSPAPER","BOTTLE","JAR","GLASS_BOTTLE"].forEach(c=>EN40.add("w/PX_E441_"+c))}catch(e){}
Object.assign(ROBOV441,{rocket:"ROCKET",turtle:"TURTLE",dog:"DOG",bus:"BUS"});
const fix441=q=>{try{if(!q||q._v441)return q;q._v441=1;const v=q.voice||[];
  if(q.game==="swipe"&&q.deck!=="flag"&&q.cards&&q.cards[0]){const c=q.cards[0];q.voice=[...v,...(c[1]?sayIf(c[1].toLowerCase()):sayIf(String(c[0])))]}
  else if((q.game==="seasons"||q.game==="recycle")&&q.items&&q.items[0])q.voice=[...v,...sayIf(q.items[0][0].toLowerCase())];
  else if(q.game==="mix"&&q.m)q.voice=[...v,...sayIf(q.m[0])];
  else if(q.game==="seq"&&q.s&&SEQV441[q.s.k])q.voice=["w/PX_F441_SEQ_"+SEQV441[q.s.k]];
  else if(v[0]==="w/PX_BOTH"){const m=/that is (\w+) and a (\w+)/i.exec(q.cap||"");if(m)q.voice=["w/PX_BOTH",...sayIf(m[1].toLowerCase()),...sayIf(m[2].toLowerCase())]}
  else if(v[0]==="w/LULU_SH_SIDES"){const m=/does an? ([\w ]+) have/i.exec(q.cap||"");if(m)q.voice=[...v,...sayIf(m[1].toLowerCase())]}
  if(q.robot&&ROBOV441[q.robot.th])q.voice=["w/PX_F441_ROBO_"+ROBOV441[q.robot.th],"w/PX_TD_GOAL2"]}catch(e){}return q};
const _bf441=buildFormat;buildFormat=function(){return fix441(_bf441.apply(this,arguments))};
const _bq441=buildQ;buildQ=function(){return fix441(_bq441.apply(this,arguments))};

/* v44.3 owner's note (a14): 31 older questions had the answers inside the question recording, then the answers were read again
   (and the screen now has 4 answers, the recording 3). They now use a recording of the question only. */
const Q443={"w/a01_q_lulu": "w/PX_Q443_A01", "w/a02_q_lulu": "w/PX_Q443_A02", "w/a05_q_lulu": "w/PX_Q443_A05", "w/a07_q_lulu": "w/PX_Q443_A07", "w/a08_q_lulu": "w/PX_Q443_A08", "w/a10_q_lulu": "w/PX_Q443_A10", "w/a12_q_lulu": "w/PX_Q443_A12", "w/a14_q_lulu": "w/PX_Q443_A14", "w/a15_q_lulu": "w/PX_Q443_A15", "w/a17_q_lulu": "w/PX_Q443_A17", "w/a19_q_lulu": "w/PX_Q443_A19", "w/a21_q_lulu": "w/PX_Q443_A21", "w/a23_q_lulu": "w/PX_Q443_A23", "w/a25_q_lulu": "w/PX_Q443_A25", "w/a27_q_lulu": "w/PX_Q443_A27", "w/b01_q_lulu": "w/PX_Q443_B01", "w/b02_q_lulu": "w/PX_Q443_B02", "w/b04_q_lulu": "w/PX_Q443_B04", "w/b06_q_lulu": "w/PX_Q443_B06", "w/b08_q_lulu": "w/PX_Q443_B08", "w/b10_q_lulu": "w/PX_Q443_B10", "w/b12_q_lulu": "w/PX_Q443_B12", "w/b14_q_lulu": "w/PX_Q443_B14", "w/n01_q_lulu": "w/PX_Q443_N01", "w/n03_q_lulu": "w/PX_Q443_N03", "w/n05_q_lulu": "w/PX_Q443_N05", "w/n07_q_lulu": "w/PX_Q443_N07", "w/n09_q_lulu": "w/PX_Q443_N09", "w/n11_q_lulu": "w/PX_Q443_N11", "w/n13_q_lulu": "w/PX_Q443_N13", "w/p01_q_lulu": "w/PX_Q443_P01"};
const _sq443=sayseq;sayseq=function(list,onEnd){return _sq443((list||[]).map(c=>Q443[c]||c),onEnd)};
const _qw443=qWatcher;qWatcher=function(){const q=_qw443.apply(this,arguments);try{if(q&&q.voice)q.voice=q.voice.map(c=>Q443[c]||c)}catch(e){}return q};

/* ================= v45: re-recorded Farsi lines, removed questions, new wrong answers, units (metric / imperial) ================= */
(function(){
const R45={"LULU_FA_CTY11": "PX_R45_LULU_FA_CTY11", "LULU_FA_DAY6": "PX_R45_LULU_FA_DAY6", "LULU_FA_MON0": "PX_R45_LULU_FA_MON0", "LULU_FA_MON1": "PX_R45_LULU_FA_MON1", "LULU_FA_MON2": "PX_R45_LULU_FA_MON2", "LULU_FA_MON3": "PX_R45_LULU_FA_MON3", "LULU_FA_MON4": "PX_R45_LULU_FA_MON4", "LULU_FA_MON5": "PX_R45_LULU_FA_MON5", "LULU_FA_MON6": "PX_R45_LULU_FA_MON6", "LULU_FA_MON7": "PX_R45_LULU_FA_MON7", "PX_AW_CAMEL": "PX_R45_PX_AW_CAMEL", "PX_AW_EAGLE": "PX_R45_PX_AW_EAGLE", "PX_AW_GIRAFFE": "PX_R45_PX_AW_GIRAFFE", "PX_AW_GOAT": "PX_R45_PX_AW_GOAT", "PX_AW_KANGAROO": "PX_R45_PX_AW_KANGAROO", "PX_AW_MONKEY": "PX_R45_PX_AW_MONKEY", "PX_AW_OWL": "PX_R45_PX_AW_OWL", "PX_AW_PANDA": "PX_R45_PX_AW_PANDA", "PX_AW_PARROT": "PX_R45_PX_AW_PARROT", "PX_AW_RABBIT": "PX_R45_PX_AW_RABBIT", "PX_AW_TIGER": "PX_R45_PX_AW_TIGER", "PX_AW_WOLF": "PX_R45_PX_AW_WOLF", "PX_AW_ZEBRA": "PX_R45_PX_AW_ZEBRA", "PX_F44_BIG_BEN": "PX_R45_PX_F44_BIG_BEN", "PX_FA_BEAR": "PX_R45_PX_FA_BEAR", "PX_FA_W_RICE": "PX_R45_PX_FA_W_RICE", "PX_O38_FOG": "PX_R45_PX_O38_FOG", "PX_O40_BLAME_SOMEONE_ELSE": "PX_R45_PX_O40_BLAME_SOMEONE_ELSE", "PX_O40_DON_T_TELL_AND_TELL_A_GROWN_UP": "PX_R45_PX_O40_DON_T_TELL_AND_TELL_A_GROWN_UP", "PX_O40_HERD": "PX_R45_PX_O40_HERD", "PX_O40_KITTEN": "PX_R45_PX_O40_KITTEN", "PX_O41_FLOCK": "PX_R45_PX_O41_FLOCK", "PX_O41_OIL": "PX_R45_PX_O41_OIL", "PX_O41_ONE": "PX_R45_PX_O41_ONE", "PX_O41_SOME_POSTS_ARE_FALSE_OR_MADE_UP": "PX_R45_PX_O41_SOME_POSTS_ARE_FALSE_OR_MADE_UP", "PX_O41_THE_BIG_DIPPER": "PX_R45_PX_O41_THE_BIG_DIPPER", "PX_OW2_ASIA": "PX_R45_PX_OW2_ASIA", "PX_OW2_BABY_CAT": "PX_R45_PX_OW2_BABY_CAT", "PX_OW2_CARBON_DIOXIDE": "PX_R45_PX_OW2_CARBON_DIOXIDE", "PX_OW2_CHEESE": "PX_R45_PX_OW2_CHEESE", "PX_OW2_CLOUDS_MOVING": "PX_R45_PX_OW2_CLOUDS_MOVING", "PX_OW2_FEET": "PX_R45_PX_OW2_FEET", "PX_OW2_HOT_COLD_WARM": "PX_R45_PX_OW2_HOT_COLD_WARM", "PX_OW2_IT_MELTS": "PX_R45_PX_OW2_IT_MELTS", "PX_OW2_NAILS": "PX_R45_PX_OW2_NAILS", "PX_OW2_NIGHT": "PX_R45_PX_OW2_NIGHT", "PX_OW2_NILE": "PX_R45_PX_OW2_NILE", "PX_OW2_NOSE": "PX_R45_PX_OW2_NOSE", "PX_OW2_SHIRT": "PX_R45_PX_OW2_SHIRT", "PX_OW2_SKIN": "PX_R45_PX_OW2_SKIN", "PX_OW2_SKULL": "PX_R45_PX_OW2_SKULL", "PX_OW2_TELEPHONE": "PX_R45_PX_OW2_TELEPHONE", "PX_OW2_TOYS": "PX_R45_PX_OW2_TOYS", "PX_OW2_TO_SLEEP": "PX_R45_PX_OW2_TO_SLEEP", "PX_OW2_WATER": "PX_R45_PX_OW2_WATER", "PX_OW2_WIND": "PX_R45_PX_OW2_WIND", "PX_OW2_YOGURT": "PX_R45_PX_OW2_YOGURT", "PX_OW3_ALBERT_EINSTEIN": "PX_R45_PX_OW3_ALBERT_EINSTEIN", "PX_OW3_WITH_GILLS": "PX_R45_PX_OW3_WITH_GILLS", "PX_OW3_WITH_LUNGS": "PX_R45_PX_OW3_WITH_LUNGS", "PX_OW_AFTERNOON": "PX_R45_PX_OW_AFTERNOON", "PX_OW_AIR": "PX_R45_PX_OW_AIR", "PX_OW_BROCCOLI": "PX_R45_PX_OW_BROCCOLI", "PX_OW_CRAYON": "PX_R45_PX_OW_CRAYON", "PX_OW_CUCUMBER": "PX_R45_PX_OW_CUCUMBER", "PX_OW_LOLLIPOP": "PX_R45_PX_OW_LOLLIPOP", "PX_OW_MAKE_FUN_OF_THEM": "PX_R45_PX_OW_MAKE_FUN_OF_THEM", "PX_OW_PEAR": "PX_R45_PX_OW_PEAR", "PX_OW_SUNNY_WINDOW": "PX_R45_PX_OW_SUNNY_WINDOW", "PX_Q443_A17": "PX_R45_PX_Q443_A17", "PX_Q443_A21": "PX_R45_PX_Q443_A21", "a03_e_lulu": "PX_R45_a03_e_lulu", "a11_e_lulu": "PX_R45_a11_e_lulu", "a21_e_lulu": "PX_R45_a21_e_lulu", "a28_e_lulu": "PX_R45_a28_e_lulu", "PX_FIX_A28_Q": "PX_R45_PX_FIX_A28_Q", "b03_e_lulu": "PX_R45_b03_e_lulu", "d02_q_lulu": "PX_R45_d02_q_lulu", "d04_q_lulu": "PX_R45_d04_q_lulu", "d06_q_lulu": "PX_R45_d06_q_lulu", "e04_e_lulu": "PX_R45_e04_e_lulu", "l02_e_lulu": "PX_R45_l02_e_lulu", "l04_q_lulu": "PX_R45_l04_q_lulu", "l06_e_lulu": "PX_R45_l06_e_lulu", "m03_q_lulu": "PX_R45_m03_q_lulu", "m11_q_lulu": "PX_R45_m11_q_lulu", "n02_q_lulu": "PX_R45_n02_q_lulu", "n04_q_lulu": "PX_R45_n04_q_lulu", "n11_e_lulu": "PX_R45_n11_e_lulu", "n12_q_lulu": "PX_R45_n12_q_lulu", "px101_q_lulu": "PX_R45_px101_q_lulu", "px112_e_lulu": "PX_R45_px112_e_lulu", "px11_q_lulu": "PX_R45_px11_q_lulu", "px121_e_lulu": "PX_R45_px121_e_lulu", "px125_e_lulu": "PX_R45_px125_e_lulu", "px137_e_lulu": "PX_R45_px137_e_lulu", "px145_q_lulu": "PX_R45_px145_q_lulu", "px169_e_lulu": "PX_R45_px169_e_lulu", "px169_q_lulu": "PX_R45_px169_q_lulu", "px170_e_lulu": "PX_R45_px170_e_lulu", "px171_q_lulu": "PX_R45_px171_q_lulu", "px178_q_lulu": "PX_R45_px178_q_lulu", "px186_q_lulu": "PX_R45_px186_q_lulu", "px191_q_lulu": "PX_R45_px191_q_lulu", "px197_e_lulu": "PX_R45_px197_e_lulu", "px200_e_lulu": "PX_R45_px200_e_lulu", "px201_e_lulu": "PX_R45_px201_e_lulu", "px204_e_lulu": "PX_R45_px204_e_lulu", "px218_e_lulu": "PX_R45_px218_e_lulu", "px228_q_lulu": "PX_R45_px228_q_lulu", "px22_e_lulu": "PX_R45_px22_e_lulu", "px234_q_lulu": "PX_R45_px234_q_lulu", "px238_q_lulu": "PX_R45_px238_q_lulu", "px255_e_lulu": "PX_R45_px255_e_lulu", "px258_e_lulu": "PX_R45_px258_e_lulu", "px263_e_lulu": "PX_R45_px263_e_lulu", "px264_e_lulu": "PX_R45_px264_e_lulu", "px31_e_lulu": "PX_R45_px31_e_lulu", "px320_q_lulu": "PX_R45_px320_q_lulu", "px32_e_lulu": "PX_R45_px32_e_lulu", "px347_q_lulu": "PX_R45_px347_q_lulu", "px34_q_lulu": "PX_R45_px34_q_lulu", "px361_e_lulu": "PX_R45_px361_e_lulu", "px371_e_lulu": "PX_R45_px371_e_lulu", "px379_e_lulu": "PX_R45_px379_e_lulu", "px385_e_lulu": "PX_R45_px385_e_lulu", "px39_e_lulu": "PX_R45_px39_e_lulu", "px410_q_lulu": "PX_R45_px410_q_lulu", "px428_q_lulu": "PX_R45_px428_q_lulu", "px497_q_lulu": "PX_R45_px497_q_lulu", "px50_e_lulu": "PX_R45_px50_e_lulu", "px525_q_lulu": "PX_R45_px525_q_lulu", "px541_q_lulu": "PX_R45_px541_q_lulu", "px58_e_lulu": "PX_R45_px58_e_lulu", "px58_q_lulu": "PX_R45_px58_q_lulu", "px82_e_lulu": "PX_R45_px82_e_lulu"};
/* clips of the imperial readings that are already in the app (the rest wait, and their question stays metric until then) */
const U45_HAVE=new Set(["PX_U45_E_0", "PX_U45_E_100", "PX_U45_E_212", "PX_U45_E_32", "PX_U45_E_400", "PX_U45_E_50", "PX_U45_FY_293", "PX_U45_IF_COMPARE_10", "PX_U45_IF_COMPARE_7", "PX_U45_IF_COMPARE_8", "PX_U45_MX39_03", "PX_U45_MX39_03_E", "PX_U45_O_212", "PX_U45_O_32", "PX_U45_O_400", "PX_U45_PX148_E", "PX_U45_PX154_E", "PX_U45_PX155_E", "PX_U45_PX168_E", "PX_U45_PX174_E", "PX_U45_PX174_Q", "PX_U45_PX203_E", "PX_U45_PX204_E", "PX_U45_PX344_E", "PX_U45_PX393_E", "PX_U45_PX401_E", "PX_U45_PX401_Q", "PX_U45_PX413_E", "PX_U45_PX480_E", "PX_U45_PX480_Q"]);
let U45_ON=false;const U45A={};
const _A45=window.Audio;
function remap45(src){try{const m=/^audio\/(w\/)?([^\/]+)\.mp3$/.exec(src);if(!m)return src;let n=m[2];if(U45_ON&&U45A[n])n=U45A[n];if(R45[n])n=R45[n];return "audio/"+(m[1]||"")+n+".mp3"}catch(e){return src}}
function A45(src){return arguments.length?new _A45(remap45(String(src))):new _A45()}
A45.prototype=_A45.prototype;try{window.Audio=A45}catch(e){}
/* wording that follows the new Farsi recordings */
const W=id=>WQ.find(w=>w.i===id);
try{const n12=W("n12");if(n12)n12.q="A cactus needs lots of water.";const a11=W("a11");if(a11)a11.x="Ducks' feet work like paddles."}catch(e){}
/* removed questions */
["b05","px158","px163","px230","px256","px356","px442","px459","px494","px548","px584","px592","px596","x08"].forEach(id=>{const k=WQ.findIndex(w=>w.i===id);if(k>=0)WQ.splice(k,1)});
/* silly wrong answers swapped for real ones */
try{const a=W("px171");if(a){const j=a.o.indexOf("Cheese power");if(j>=0){a.o[j]="Coal";if(a.oe)a.oe[j]="⚫"}}
  const b=W("px201");if(b){const j=b.o.indexOf("Water turns into candy");if(j>=0){b.o[j]="Water disappears forever";if(b.oe)b.oe[j]="💨"}}
  Object.assign(FA_SAY,{"coal":"PX_F45_COAL","water disappears forever":"PX_F45_WATER_DISAPPEARS"});
  Object.assign(EN_SAY,{"coal":"PX_E45_COAL","water disappears forever":"PX_E45_WATER_DISAPPEARS"});
  Object.assign(FA_TXT40,{"coal":"زغال‌سنگ","water disappears forever":"آب برای همیشه ناپدید می‌شه"});
  if(typeof EN40!=="undefined"&&EN40.add)["PX_E45_COAL","PX_E45_WATER_DISAPPEARS"].forEach(c=>EN40.add(c));}catch(e){}
/* ---- units: parents pick metric (SI) or imperial ---- */
Object.assign(FA_SAY,{"0°f":"PX_OW3_0C","32°f":"PX_U45_O_32","50°f":"PX_OW3_50C","212°f":"PX_U45_O_212","400°f":"PX_U45_O_400","100°f":"PX_OW3_100C"});
Object.assign(EN_SAY,{"0°f":"PX_U45_E_0","32°f":"PX_U45_E_32","50°f":"PX_U45_E_50","212°f":"PX_U45_E_212","400°f":"PX_U45_E_400","100°f":"PX_U45_E_100"});
try{if(typeof EN40!=="undefined"&&EN40.add)["0","32","50","100","212","400"].forEach(n=>EN40.add("PX_U45_E_"+n))}catch(e){}
/* [question id, imperial changes, clips swapped: old -> new] */
const UQ=[
 ["px148",{x:"The small intestine is about 20 feet long, folded up inside you!"},{px148_e_lulu:"PX_U45_PX148_E"}],
 ["px154",{x:"Mount Everest is in the Himalayas, about 29,000 feet high."},{px154_e_lulu:"PX_U45_PX154_E"}],
 ["px155",{x:"Damavand is a volcano, about 18,400 feet high."},{px155_e_lulu:"PX_U45_PX155_E"}],
 ["px168",{x:"A running tap can waste gallons of water every minute."},{px168_e_lulu:"PX_U45_PX168_E"}],
 ["px174",{q:"At what temperature does water freeze, in Fahrenheit?",o:["0°F","32°F","50°F","212°F"],n:1,x:"Water freezes at 32 °F and boils at 212 °F."},{px174_q_lulu:"PX_U45_PX174_Q",px174_e_lulu:"PX_U45_PX174_E",PX_U45_O_32:"PX_U45_O_32",PX_U45_O_212:"PX_U45_O_212"}],
 ["px203",{x:"One light-year is about 6 trillion miles."},{px203_e_lulu:"PX_U45_PX203_E"}],
 ["px204",{x:"Tornado winds can spin faster than 180 miles an hour."},{px204_e_lulu:"PX_U45_PX204_E"}],
 ["px344",{x:"Mountains can be thousands of feet tall."},{px344_e_lulu:"PX_U45_PX344_E"}],
 ["px393",{x:"Everest is about 29,000 feet tall."},{px393_e_lulu:"PX_U45_PX393_E"}],
 ["px401",{q:"Water boils at 212 degrees Fahrenheit at sea level.",x:"At sea level, water boils at 212 °F."},{px401_q_lulu:"PX_U45_PX401_Q",px401_e_lulu:"PX_U45_PX401_E"}],
 ["px405",{x:"A light-year is a distance: about 6 trillion miles."},{}],
 ["px413",{x:"Sunlight travels about 93 million miles in about 8 minutes."},{px413_e_lulu:"PX_U45_PX413_E"}],
 ["px480",{q:"What is the boiling point of water at sea level, in Fahrenheit?",o:["400°F","100°F","32°F","212°F"],n:3,x:"Water boils at 212°F and freezes at 32°F."},{px480_q_lulu:"PX_U45_PX480_Q",px480_e_lulu:"PX_U45_PX480_E",PX_U45_O_32:"PX_U45_O_32",PX_U45_O_212:"PX_U45_O_212",PX_U45_O_400:"PX_U45_O_400"}]];
const UF=[["COMPARE",0,"LULU_IF_COMPARE_7","اورست بلندترین کوهه، تقریباً بیست و نُه هزار فوت ارتفاع داره.","PX_U45_IF_COMPARE_7"],
 ["COMPARE",0,"LULU_IF_COMPARE_8","دماوند، بلندترین کوهِ ایران، بیشتر از هیجده هزار فوت ارتفاع داره.","PX_U45_IF_COMPARE_8"],
 ["COMPARE",0,"LULU_IF_COMPARE_10","یه پوند پَر با یه پوند سنگ هم‌وزنه!","PX_U45_IF_COMPARE_10"]];
const ready=m=>Object.values(m).every(c=>U45_HAVE.has(c));
const ORIG={};UQ.forEach(([id])=>{const w=W(id);if(w)ORIG[id]=JSON.parse(JSON.stringify({q:w.q,o:w.o,oe:w.oe,n:w.n,x:w.x}))});
const IFO={};UF.forEach(([k,,c])=>{const L=IFACTS[k]||[];const r=L.find(x=>x[0]===c);if(r)IFO[c]=r[1]});
const lion0="A lion's roar can be heard 8 km away.",lion1="A lion's roar can be heard 5 miles away.";
const mx=()=>{try{return (D39.mix||[]).find(r=>r[0]==="MX39_03")}catch(e){return null}};let MXO=null;
window.applyUnits45=function(){const imp=P.units==="imp";U45_ON=imp;for(const k in U45A)delete U45A[k];
  UQ.forEach(([id,f,clips])=>{const w=W(id),o=ORIG[id];if(!w||!o)return;const on=imp&&ready(clips);
    Object.assign(w,JSON.parse(JSON.stringify(o)));if(on){Object.assign(w,JSON.parse(JSON.stringify(f)));if(f.o&&w.oe){const E={0:"🥶",32:"🧊",50:"🌡️",100:"🌡️",212:"♨️",400:"🔥"};w.oe=f.o.map(x=>E[parseInt(x,10)]||"🌡️")}Object.assign(U45A,clips)}});
  UF.forEach(([k,,c,t,nc])=>{const r=(IFACTS[k]||[]).find(x=>x[0]===c);if(!r)return;const on=imp&&U45_HAVE.has(nc);r[1]=on?t:IFO[c];if(on)U45A[c]=nc});
  try{const on=imp&&U45_HAVE.has("PX_U45_FY_293");FACT_EN.lion=on?lion1:lion0;FACT_V[lion1]="PX_FY_293";if(on)U45A.PX_FY_293="PX_U45_FY_293"}catch(e){}
  try{const r=mx();if(r&&!MXO)MXO=[r[2],r[3]];const on=imp&&U45_HAVE.has("PX_U45_MX39_03")&&U45_HAVE.has("PX_U45_MX39_03_E");if(r&&MXO){r[2]=on?"Water freezes at 32 degrees!":MXO[0];r[3]=on?"Right! Water freezes at 32 degrees Fahrenheit.":MXO[1]}if(on){U45A.MX39_03="PX_U45_MX39_03";U45A.MX39_03_E="PX_U45_MX39_03_E"}}catch(e){}};
try{applyUnits45()}catch(e){console.log(e)}
window.U45_PENDING=()=>{const all=new Set();UQ.forEach(x=>Object.values(x[2]).forEach(c=>all.add(c)));UF.forEach(x=>all.add(x[4]));["PX_U45_FY_293","PX_U45_MX39_03","PX_U45_MX39_03_E"].forEach(c=>all.add(c));return [...all].filter(c=>!U45_HAVE.has(c)).length};
function unitsHTML(){const imp=P.units==="imp",pend=U45_PENDING();return `<div class="psec"><span>📏</span>Units</div><div class="u45">
  <p>Lengths, distances and temperatures in the questions and facts.</p>
  <div class="u45r"><button class="btn ${imp?"ghost":"green"}" id="u45si" aria-pressed="${!imp}">Metric (SI)<small>metres, km, °C</small></button><button class="btn ${imp?"green":"ghost"}" id="u45imp" aria-pressed="${imp}">Imperial<small>feet, miles, °F</small></button></div>
  ${imp&&pend?`<p class="pnote">Lulu is still recording some imperial lines. Until they are in, those few stay in metric.</p>`:""}</div>`}
const _sp45=showParents;showParents=function(){const r=_sp45.apply(this,arguments);try{const root=$("pSettings");
  const snd=[...root.querySelectorAll(".psec")].find(x=>/Sound/.test(x.textContent));if(snd&&!root.querySelector(".u45"))snd.insertAdjacentHTML("beforebegin",unitsHTML());
  const set=u=>{const s=root.scrollTop;P.units=u;savePlayers();applyUnits45();sfx.tap();toast(u==="imp"?"Imperial units 📏":"Metric units 📏");showParents();root.scrollTop=s};
  const a=$("u45si"),b=$("u45imp");if(a)a.onclick=()=>set("si");if(b)b.onclick=()=>set("imp");
}catch(e){console.log(e)}return r};
(function(){const st=document.createElement("style");st.textContent=`.u45{margin:0 0 10px}.u45 p{font-size:14px;margin:4px 0 8px}
.u45r{display:grid;grid-template-columns:1fr 1fr;gap:8px}.u45r .btn{display:flex;flex-direction:column;align-items:center;gap:2px}.u45r small{font-size:12px;font-weight:600;opacity:.8}`;document.head.appendChild(st)})();
})();

/* ================= v46: owner's offline QC notes (63): re-recorded lines, a fact removed ================= */
(function(){
const R46={"KD39_O_WANT_TO_SHARE_MINE": "PX_R46_KD39_O_WANT_TO_SHARE_MINE", "LULU_IF_CALENDAR_5": "PX_R46_LULU_IF_CALENDAR_5", "LULU_IF_CALENDAR_6": "PX_R46_LULU_IF_CALENDAR_6", "LULU_IF_COMPARE_6": "PX_R46_LULU_IF_COMPARE_6", "LULU_IF_PIZZA_4": "PX_R46_LULU_IF_PIZZA_4", "LULU_IF_SHAPES_5": "PX_R46_LULU_IF_SHAPES_5", "LULU_IF_WORDS_10": "PX_R46_LULU_IF_WORDS_10", "MX39_09": "PX_R46_MX39_09", "MX39_09_E": "PX_R46_MX39_09_E", "MX39_13_E": "PX_R46_MX39_13_E", "MX39_21": "PX_R46_MX39_21", "MX39_23": "PX_R46_MX39_23", "NX39_PUDDLE": "PX_R46_NX39_PUDDLE", "PX_FX_17": "PX_R46_PX_FX_17", "PX_FX_24": "PX_R46_PX_FX_24", "PX_FX_46": "PX_R46_PX_FX_46", "PX_FY_032": "PX_R46_PX_FY_032", "PX_FY_034": "PX_R46_PX_FY_034", "PX_FY_035": "PX_R46_PX_FY_035", "PX_FY_056": "PX_R46_PX_FY_056", "PX_FY_059": "PX_R46_PX_FY_059", "PX_FY_066": "PX_R46_PX_FY_066", "PX_FY_100": "PX_R46_PX_FY_100", "PX_FY_103": "PX_R46_PX_FY_103", "PX_FY_221": "PX_R46_PX_FY_221", "PX_FY_293": "PX_R46_PX_FY_293", "PX_U45_FY_293": "PX_R46_PX_U45_FY_293", "RD39_02": "PX_R46_RD39_02", "ST_S104_L3": "PX_R46_ST_S104_L3", "ST_S106_L1": "PX_R46_ST_S106_L1", "ST_S106_Q2": "PX_R46_ST_S106_Q2", "PX_FY_023": "PX_R46_PX_FY_023", "PX_FY_113": "PX_R46_PX_FY_113", "PX_FY_114": "PX_R46_PX_FY_114", "PX_FY_115": "PX_R46_PX_FY_115", "PX_FY_220": "PX_R46_PX_FY_220", "ST_S107_L2": "PX_R46_ST_S107_L2", "ST_S4_L4": "PX_R46_ST_S4_L4", "ST_S6_L2": "PX_R46_ST_S6_L2", "TK38_t03_0": "PX_R46_TK38_t03_0", "px408_e_lulu": "PX_R46_px408_e_lulu", "px483_e_lulu": "PX_R46_px483_e_lulu", "px484_e_lulu": "PX_R46_px484_e_lulu", "px497_e_lulu": "PX_R46_px497_e_lulu", "px516_e_lulu": "PX_R46_px516_e_lulu", "px553_e_lulu": "PX_R46_px553_e_lulu", "px571_e_lulu": "PX_R46_px571_e_lulu", "px579_e_lulu": "PX_R46_px579_e_lulu", "px594_e_lulu": "PX_R46_px594_e_lulu", "PX_TD_S_hen": "PX_R46_PX_TD_S_hen"};
const D46={"KD39_O_WANT_TO_SHARE_MINE": "می‌خوای از این بخوری؟", "LULU_IF_CALENDAR_5": "تولدت سالی یه بار میاد.", "LULU_IF_CALENDAR_6": "جولای و آگوست هر دو سی و یک روز دارن.", "LULU_IF_COMPARE_6": "توی علامتِ بزرگ‌تر، طرفِ باز رو به عددِ بزرگ‌تره و نوکِ تیزش رو به عددِ کوچیک‌تر؛ مثلِ پنج بزرگ‌تر از دو.", "LULU_IF_PIZZA_4": "اگه یه ساندویچ رو گوشه به گوشه بِبُری، دو تا مثلث می‌شه.", "LULU_IF_SHAPES_5": "تاس، مکعبه؛ شیش تا وجهِ مربعی داره.", "LULU_IF_WORDS_10": "حرفِ E (ای) پرکاربردترین حرفِ انگلیسیه.", "MX39_09": "یه هفته، هفت روزه!", "MX39_09_E": "درسته! یه هفته، هفت روزه.", "MX39_13_E": "درسته! سه ضربدر سه می‌شه نُه.", "MX39_21": "یخ، روی آب شناور می‌مونه!", "MX39_23": "دماوند، بلندترین کوهِ ایرانه!", "NX39_PUDDLE": "آبِ چاله، توی سرما چی می‌شه؟", "PX_FX_17": "ماهی‌ها با آبشُش زیرِ آب نفس می‌کشن.", "PX_FX_24": "توت‌فرنگی و گیلاس و ماشینِ آتش‌نشانی قِرمِزَن.", "PX_FX_46": "فلز برق رو رد می‌کنه، برای همین لامپ روشن می‌شه.", "PX_FY_032": "هر ساعَت شصت دقیقه‌ست.", "PX_FY_034": "وقتی ساعت و رُبعه، عقربه‌یِ بلند رویِ سه هست.", "PX_FY_035": "وقتی یه رُبع مونده، عقربه‌یِ بلند رویِ نُه هست.", "PX_FY_056": "پرچمِ هند وَسَطِش یه چرخِ آبی داره.", "PX_FY_059": "نوروز، سالِ نُویِ ایرانی، روزِ اولِ بهار شروع می‌شه.", "PX_FY_066": "پرچمِ برزیل سبزه و یه کُره‌یِ آبیِ پر از ستاره داره.", "PX_FY_100": "لوزی شکلِ یه الماسه.", "PX_FY_103": "تخم‌مرغ شکلِ بیضیه.", "PX_FY_221": "یخ وقتی گرم بشه دوباره آب می‌شه.", "PX_FY_293": "صدای غُرّشِ شیر رو از هشت کیلومتر دورتر هم می‌شه شنید.", "PX_U45_FY_293": "صدای غُرّشِ شیر رو از پنج مایل دورتر هم می‌شه شنید.", "RD39_02": "سفیدم و سردم، زمستون از آسمون میام. من چی‌ام؟", "ST_S104_L3": "دَمِ در یه کدو تنبلِ نارنجی با صورتِ خندون هست.", "ST_S106_L1": "مامان سفره‌ی هَفت‌سین رو چیده.", "ST_S106_Q2": "کی بود که عیدی داد؟", "PX_FY_023": "ماهی‌ها با آبشُش زیرِ آب نفس می‌کشن. نهنگ‌ها و دلفین‌ها میان بالا تا هوا نفس بکشن.", "PX_FY_113": "عطارد، زهره، زمین، مریخ، مشتری، زُحَل، اورانوس و نپتون: هشت تا سیاره، به ترتیب از خورشید.", "PX_FY_114": "ماهواره‌ها دورِ زمین می‌چرخن و به تلفن، تلویزیون و نقشه کمک می‌کنن.", "PX_FY_115": "دنباله‌دارها توپ‌هایِ بزرگی از یخ و خاکَن، ستاره نیستن.", "PX_FY_220": "آهن‌ربا چیزهایِ آهنی رو، مثلِ میخ، به طَرَفِ خودش می‌کِشه.", "ST_S107_L2": "مامان می‌گه: اول کِرِمِ ضدِ آفتاب بزنید!", "ST_S4_L4": "توی ژاپن، قطارهای خیلی خیلی سریع هست!", "ST_S6_L2": "آبِ دریا شوره. ماهی‌ها با آبشُش توی آب نفس می‌کشن.", "TK38_t03_0": "سارا، می‌شه منم با توپِت بازی کنم؟", "px408_e_lulu": "خیلی از باکتری‌ها مفیدن، مثلِ باکتری‌های روده‌یِ ما و یا باکتری‌های ماست.", "px483_e_lulu": "ما اکسیژن رو تو می‌دیم و دی‌اکسیدِ کربن رو بیرون.", "px484_e_lulu": "هسته، داغ‌ترین و عمیق‌ترین قسمتِ زمینه.", "px497_e_lulu": "نُه ضربدرِ شش می‌شه پنجاه و چهار.", "px516_e_lulu": "اسکلت، بدنمون رو سرِپا نگه می‌داره و از اعضای داخلی محافظت می‌کنه.", "px553_e_lulu": "یه سال دوازده ماه هست.", "px571_e_lulu": "نَوَد نُه تا دَه‌تایی داره، پس از همه بزرگ‌تره.", "px579_e_lulu": "Run یعنی دویدن.", "px594_e_lulu": "چرخ‌ها می‌غَلتَن، برای همین هل دادنِ گاری راحته.", "PX_TD_S_hen": "مرغه روی لونه‌ش نشست. ترق! یه جوجه‌ی زرد کوچولو اومد بیرون. جیک جیک!"};
const _A46=window.Audio;
function rm46(src){try{const m=/^audio\/(w\/)?([^\/]+)\.mp3$/.exec(src);if(!m)return src;let n=m[2];if(n==="PX_FY_293"&&typeof P!=="undefined"&&P.units==="imp")n="PX_U45_FY_293";/* imperial lion fact: the v45 swap runs after this one */if(!R46[n])return src;return "audio/"+(m[1]||"")+R46[n]+".mp3"}catch(e){return src}}
function A46(src){return arguments.length?new _A46(rm46(String(src))):new _A46()}
A46.prototype=_A46.prototype;try{window.Audio=A46}catch(e){}
/* Farsi words shown with the voice follow the new recordings */
try{for(const k in D46)if(FA_T[k]!==undefined)FA_T[k]=D46[k]}catch(e){}
try{const L=IFACTS.COMPARE||[];const r=L.find(x=>x[0]==="LULU_IF_COMPARE_6");if(r)r[1]=D46.LULU_IF_COMPARE_6;
  const w=(IFACTS.WORDS||[]).find(x=>x[0]==="LULU_IF_WORDS_10");if(w)w[1]=D46.LULU_IF_WORDS_10}catch(e){}
/* owner: "China has the most people" is no longer true (India passed China in 2023): replaced by a flag fact */
try{FLAG_F.china="China's flag is red with five yellow stars.";FACT_V["China's flag is red with five yellow stars."]="PX_F46_CHINA";delete FACT_V["China has the most people of any country."]}catch(e){}
})();
