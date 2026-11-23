/* ================= v40 (parent, Nov 22): 2 x 2 answers, bigger pictures, a 4th answer, star counters,
   learning focus (six pillars donut), a stronger "Say it!" (English and Farsi), one speaker button ================= */
(function(){const st=document.createElement("style");st.textContent=`
/* four answers are always 2 x 2, never 3 + 1 */
.qopts.o4{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.qopts.o4 .qo[data-j]{grid-column:auto!important;width:auto!important}
.q31-o.o4{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}
.q31-o.o3:not(.col):not(.yn){display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}
.q31-o.o3:not(.col):not(.yn)>.q31-b:nth-child(3){grid-column:1 / 3;justify-self:center;width:calc(50% - 5px)}
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
  if(hasFa&&!hasEn)q.opts.forEach((o,i)=>o.say=fa[i])}catch(e){}return q}
const _qw40=qWatcher;qWatcher=function(cat,used){const q=_qw40(cat,used);if(q&&!q.game){pad40(q,cat,"w");same40(q,"w");voiceFact40(q)}return q};
const _bq40=buildQ;buildQ=function(cat,k,used){const q=_bq40(cat,k,used);if(q&&!q.game){pad40(q,cat,k);same40(q,k);voiceFact40(q)}return q};

/* ---------- 2. the screen helper: 4 answers = 2 x 2 (also on older iPads), and "x / y" counters become stars ---------- */
function tidy40(root){(root||document).querySelectorAll(".qopts,.q31-o").forEach(g=>{const n=[...g.children].filter(b=>b.tagName==="BUTTON"&&!b.hidden).length;g.classList.toggle("o4",n===4);g.classList.toggle("o3",n===3)});
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
  if(!window.EN40_DONE)b=b.filter(k=>!/^f_(fish|shuttle)$/.test(k));  /* back when the missing English words are recorded */
  return b.filter(k=>{if(!/^f_(race|beat|show|wtrain)$/.test(k))return true;const kk=key+"|"+k;if(FP40[kk]===undefined){let n=0;for(let t=0;t<8;t++){try{if(buildFormat(k,cat))n++}catch(e){}}FP40[kk]=n>=8}return FP40[kk]})};
