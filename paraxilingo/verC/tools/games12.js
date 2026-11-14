
/* =====================================================================================================
   v21 (Nov 14): ANSWER OUT LOUD (age 6+). The phone's own speech recognition (Safari / Chrome) turns what the child says into text;
   nothing is recorded or kept by the app. Parents choose English or Farsi answers (🎤 in the parents' settings).
   1. any question with short spoken answers gets a 🎤 button: say the answer instead of tapping it
   2. "Rocket fuel": answer 5 questions out loud (no choices shown) to fill the rocket and launch it
   3. Space run: say an answer and the rocket flies to that gate
   ===================================================================================================== */
const G12_READY=__G12VOICE__,G12=n=>"w/PX_G12_"+n,FA_T=__FA_TEXT__;
const voiceOK=()=>!!SR&&G12_READY&&S.mic!==false&&(S.age||0)>=6;
const vLang=()=>S.vlang==="fa"?"fa-IR":"en-US";
const vNorm=s=>String(s||"").toLowerCase().replace(/ي/g,"ی").replace(/ك/g,"ک").replace(/[ً-ْٰ]/g,"").replace(/[‌‍‏]/g," ")
  .replace(/[۰-۹]/g,d=>"۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/(\d)[:.](\d)/g,"$1 $2").replace(/[^a-z0-9؀-ۿ' ]/g," ").replace(/\s+/g," ").trim();
/* numbers said in words, English and Farsi ("forty two", "چهل و دو") */
const EN_N={zero:0,oh:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100,to:2,too:2,for:4,won:1,ate:8};
const SOUNDALIKE={to:1,too:1,for:1,won:1,ate:1,oh:1};
const FA_N={"صفر":0,"یک":1,"یه":1,"دو":2,"سه":3,"چهار":4,"پنج":5,"شش":6,"شیش":6,"هفت":7,"هشت":8,"نه":9,"ده":10,"یازده":11,"دوازده":12,"سیزده":13,"چهارده":14,"پانزده":15,"پونزده":15,"شانزده":16,"شونزده":16,"هفده":17,"هیفده":17,"هجده":18,"هیجده":18,"نوزده":19,"بیست":20,"سی":30,"چهل":40,"پنجاه":50,"شصت":60,"هفتاد":70,"هشتاد":80,"نود":90,"صد":100};
function vNums(a){const w=a.split(" "),out=[];let cur=null;
  const push=()=>{if(cur!==null){out.push(cur);cur=null}};
  for(let i=0;i<w.length;i++){const t=w[i];let v=null;
    if(/^\d+$/.test(t))v=+t;else if(t in EN_N&&(!SOUNDALIKE[t]||w.length===1))v=EN_N[t];else if(t in FA_N)v=FA_N[t];else if((t==="thousand"||t==="هزار")&&cur!==null){cur*=1000;continue}
    if(v===null){if((t==="و"||t==="and")&&cur!==null)continue;push();continue}
    if(v===100&&cur!==null&&cur<10){cur*=100;continue}
    if(cur!==null&&cur>=20&&cur%10===0&&v<10&&cur<100){cur+=v;continue}
    if(cur!==null&&cur>=100&&v<100){cur+=v;continue}
    push();cur=v}
  push();return out}
/* a clock time like "6:15": "six fifteen", "quarter past six", "half past", "شش و ربع", "یه ربع به هفت" */
function vTime(a,h,m){const n=vNums(a),has=x=>n.includes(x),h2=h%12+1;
  if(m===0)return has(h)&&!n.some(x=>x!==h&&x!==0);
  if(has(h)&&has(m))return true;
  if(m===30)return has(h)&&/half|نیم/.test(a);
  if(m===15)return has(h)&&/quarter|ربع/.test(a)&&!/\bto\b|به/.test(a);
  if(m===45)return has(h2)&&/quarter|ربع/.test(a)&&/\bto\b|به/.test(a);
  return false}
/* what counts as saying each answer */
function vItem(o){const lab=String(o.h||"").replace(/<[^>]+>/g," ").replace(/&[a-z]+;/g," ").replace(/[\u{1F000}-\u{1FFFF}☀-➿️‍]/gu," ").replace(/\s+/g," ").trim();
  const n=vNorm(lab);const it={lab,en:[],fa:[],num:null,time:null};
  const tm=lab.match(/^(\d{1,2}):(\d{2})$/);if(tm){it.time=[+tm[1],+tm[2]];return it}
  if(/^\d+$/.test(n.replace(/ /g,""))){it.num=+n.replace(/ /g,"");return it}
  if(n){const words=n.split(" ");it.en.push(n);if(words.length>1)it.en.push(words[words.length-1]);
    if(/^[a-z]{2} [a-z]{4,}$/.test(n))it.en.push(words[1]); /* "Tu Tuesday" */
    if(/(s|es)$/.test(n)&&n.length>4)it.en.push(n.replace(/(es|s)$/,""))}
  const fc=(o.say||[]).find(c=>FA_T[c.slice(2)]);if(fc){const f=vNorm(FA_T[fc.slice(2)]);if(f&&f.length<=24)it.fa.push(f)}
  return it}
function vHit(it,a){const sg=w=>w.length>4?w.replace(/ies$/,"y").replace(/(ches|shes|xes|ses)$/,m=>m.slice(0,-2)).replace(/([^s])s$/,"$1"):w;const a0=a;a=a+" "+a.split(" ").map(sg).join(" ");const p=" "+a+" ",ws=a.split(" ");
  if(it.time)return vTime(a0,it.time[0],it.time[1]);
  if(it.num!==null&&vNums(a0).includes(it.num))return true;
  for(const c of [...it.en,...it.fa]){if(!c)continue;if(p.includes(" "+c+" "))return true;if(c.length>=5&&!c.includes(" ")&&ws.some(w=>w.length>=4&&lev(w,c)<=1))return true}
  return false}
/* which answer was said: its index, -1 (none) or -2 (more than one) */
function vMatch(alts,items){for(const s of alts){const a=vNorm(s);if(!a)continue;const h=items.map((it,i)=>vHit(it,a)?i:-1).filter(i=>i>=0);if(h.length===1)return h[0];if(h.length>1)return -2}return -1}
const vSpeakable=items=>items.length>=2&&items.every(it=>it.time||it.num!==null||(it.lab&&it.lab.split(" ").length<=3&&it.lab.length<=24&&/[a-z]/i.test(it.lab)))&&new Set(items.map(i=>i.lab.toLowerCase())).size===items.length;
/* listen once: the 🎤 button lights while listening */
function vListen(btn,onAlts,onFail){let rec=null,busy=true;hush();
  try{rec=new SR();rec.lang=vLang();rec.interimResults=false;rec.maxAlternatives=5}catch(e){onFail("none");return null}
  btn.classList.add("on");
  rec.onresult=e=>{busy=false;btn.classList.remove("on");onAlts([...e.results[0]].map(r=>r.transcript))};
  rec.onerror=e=>{busy=false;btn.classList.remove("on");onFail(e.error==="not-allowed"||e.error==="service-not-allowed"?"off":"quiet")};
  rec.onend=()=>{if(busy){busy=false;btn.classList.remove("on");onFail("quiet")}};
  try{rec.start()}catch(e){busy=false;btn.classList.remove("on");onFail("none")}
  return rec}
const vFailText=w=>w==="off"?"The microphone is off - ask a grown-up, or tap.":w==="none"?"Talking isn't available here - tap your answer.":"I didn't hear you. Tap 🎤 and say it again!";

/* ---------- 1. a 🎤 button on ordinary questions ---------- */
let vHintSaid=false;
const _nq12=nextQ;nextQ=function(){_nq12();try{vAttach()}catch(e){}};
function vAttach(){if(!voiceOK()||!L||!L.q)return;const q=L.q;if(q.game||q.match||q.robot||q.radio!==undefined||!q.opts||q.flash)return;
  const box=$("qBody"),bs=[...box.querySelectorAll(".qo")];if(bs.length!==q.opts.length)return;
  const items=q.opts.map(vItem);if(!vSpeakable(items))return;
  const m=document.createElement("button");m.className="qmic";m.id="qMic";m.innerHTML=`<span class="qmic-i">🎤</span><span class="qmic-t">Say it</span>`;m.setAttribute("aria-label","Say your answer");
  const chk=$("qCheck");(chk&&!chk.hidden?chk:box.querySelector(".qopts")).insertAdjacentElement(chk&&!chk.hidden?"beforebegin":"afterend",m);
  if(!vHintSaid){vHintSaid=true;q.voice=[G12("VOICE_HINT"),...(q.voice||[])]}
  let rec=null;
  m.onclick=()=>{if(q.done||q.locked||m.classList.contains("on"))return;sfx.tap();m.querySelector(".qmic-t").textContent="Listening…";
    rec=vListen(m,alts=>{m.querySelector(".qmic-t").textContent="Say it";const j=vMatch(alts,items);
      if(j<0){toastHint(alts[0]?`I heard “${alts[0]}”. Say it again, or tap.`:vFailText("quiet"));sayseq([G12("VOICE_AGAIN")],()=>{});return}
      const b=bs[j];if(!b||b.classList.contains("faded")){toastHint("You already tried that one!");return}
      b.onclick&&b.onclick();if(q.style==="cards")setTimeout(()=>{if(L&&L.q===q&&!q.done&&chk&&!chk.disabled)chk.click()},700)},
     w=>{m.querySelector(".qmic-t").textContent="Say it";toastHint(vFailText(w));if(w==="quiet")sayseq([G12("VOICE_AGAIN")],()=>{})})}}

/* ---------- 2. Rocket fuel: answer out loud, no choices shown ---------- */
const FUEL_SKIP=/^find\b|^tap\b|spell|opposite|plural|past tense|dictionary|same\?|which sign|missing word|find the|is domi|smaller words|matching|tap|pattern|which one|both|odd one|coloured|is red/i;
function fuelItem(cat,used){const ks=sh(kindsFor(cat));
  for(let t=0;t<30;t++){const k=ks[t%ks.length];let q=null;try{q=buildQ(cat,k,used)}catch(e){q=null}
    if(!q||q.game||q.match||q.flash||!q.opts||!(q.ans>=0)||q.layout==="match"||q.tf||!q.voice||!q.voice.length)continue;
    if(FUEL_SKIP.test(q.cap||"")||!(q.cap||"").trim())continue;
    const items=q.opts.map(vItem);if(!vSpeakable(items))continue;if(items.some(it=>it.lab.toLowerCase()==="yes"||it.lab.toLowerCase()==="no"))continue;
    if(!(q.opts[q.ans].say||[]).length)continue;
    const key=q.cap+"|"+items[q.ans].lab;if(used.has(key))continue;used.add(key);q.kind=k;q._items=items;return q}
  return null}
function qFuel(cat){if(!G12_READY||!voiceOK())return null;const used=new Set(),list=[];
  for(let i=0;i<5;i++){const x=fuelItem(cat,used);if(!x)break;list.push(x)}
  if(list.length<4)return null;
  return {game:"fuel",gid:"g:fuel",list,cat,voice:[G12("FUEL_INTRO")],factT:"Rockets burn a lot of fuel to push up into space.",factV:["w/PX_FY_188"]}}
function fuelQ(q){const n=q.list.length;let i=0,miss=0,tries=0,cur=null,rec=null,chips=false;
  gShow(`<div class="game">${gHead("🎤","Rocket fuel","Say the answers out loud")}
    <div class="fu"><div class="fu-pad"><div class="fu-rk" id="fuR"><span>🚀</span><i class="fu-fl"></i></div><div class="fu-tank"><div class="fu-liq" id="fuL"></div><b id="fuP">0%</b></div></div>
     <div class="fu-card"><div class="fu-dots" id="fuD"></div><div class="fu-cap" id="fuC"></div><div class="fu-vis" id="fuV"></div>
      <div class="fu-row"><button class="hr-play sm" id="fuS" aria-label="Hear it again">🔊</button><button class="sy-mic fu-mic" id="fuM" aria-label="Say your answer">🎤</button></div>
      <div class="sy-h" id="fuH">Tap 🎤 and say the answer</div><div class="fu-ch" id="fuCh" hidden></div></div></div></div>`);
  const M=$("fuM"),H=$("fuH"),CH=$("fuCh");
  const dots=()=>{$("fuD").innerHTML=q.list.map((x,k)=>`<i class="${k<i?"ok":k===i?"now":""}"></i>`).join("")};
  const fill=()=>{const p=Math.round(i/n*100);$("fuL").style.height=p+"%";$("fuP").textContent=p+"%"};
  const show=()=>{cur=q.list[i];tries=0;waiting=false;chips=false;CH.hidden=true;CH.innerHTML="";dots();
    $("fuC").textContent=cur.cap;$("fuV").innerHTML=cur.visual&&cur.visual.length<3000?cur.visual:"";H.textContent="Tap 🎤 and say the answer";
    hush();sayseq(i===0?[G12("FUEL_INTRO"),...cur.voice]:cur.voice,()=>{})};
  let stepTok=0;const nextOnce=()=>{const my=++stepTok;let gone=false;const go=()=>{if(gone||my!==stepTok)return;gone=true;next()};setTimeout(go,4500);return go};
  const next=()=>{i++;fill();if(i>=n){dots();launch();return}setTimeout(()=>{if(L&&L.q===q&&!q.done)show()},500)};
  const right=()=>{sfx.good();burstAt($("fuL"),20);H.textContent="✅ "+cur._items[cur.ans].lab+"!";$("fuR").classList.remove("puff");void $("fuR").offsetWidth;$("fuR").classList.add("puff");
    hush();const go=nextOnce();sayseq([pickOne(PRAISE_CLIPS),...(cur.opts[cur.ans].say||[])],()=>setTimeout(go,300))};
  /* after the first miss the choices appear, read aloud one by one */
  const showChips=()=>{chips=true;CH.hidden=false;CH.innerHTML=cur.opts.map((o,k)=>`<button class="fu-c" data-k="${k}">${esc2(cur._items[k].lab)}</button>`).join("");
    const bs=[...CH.children];bs.forEach(b=>b.onclick=()=>{if(q.done)return;sfx.tap();judge(+b.dataset.k)});
    let k=0;const tok={};window.__optTok=tok;const step=()=>{if(window.__optTok!==tok||!L||L.q!==q||q.done||k>=bs.length){bs.forEach(b=>b.classList.remove("saying"));return}
      bs.forEach((b,j)=>b.classList.toggle("saying",j===k));sayseq(cur.opts[k++].say||[],()=>setTimeout(step,150))};
    sayseq([G12("FUEL_CHIPS")],()=>step())};
  let waiting=false;const judge=j=>{if(waiting||q.done)return;if(j===cur.ans){waiting=true;right();return}
    tries++;miss++;sfx.oops();bounce($("fuR"));const b=CH.querySelector(`[data-k="${j}"]`);if(b)b.classList.add("no");
    if(tries>=2){waiting=true;H.textContent="It was "+cur._items[cur.ans].lab;const cb=CH.querySelector(`[data-k="${cur.ans}"]`);if(cb)cb.classList.add("ok");hush();const go=nextOnce();sayseq([...(cur.why&&cur.why.v&&cur.why.v.length?cur.why.v:cur.opts[cur.ans].say||[])],()=>setTimeout(go,600));return}
    H.textContent="Not quite - look at these!";hush();sayseq([G12("VOICE_TRY")],()=>showChips())};
  M.onclick=()=>{if(q.done||M.classList.contains("on"))return;sfx.tap();H.textContent="Listening…";
    rec=vListen(M,alts=>{const j=vMatch(alts,cur._items);
      /* an answer that is not one of the choices (it may still be right!) is not a miss: the choices appear */
      if(j===-1||j===-2){H.textContent=alts[0]?`I heard “${alts[0]}”. Let's look at the choices!`:"I didn't hear you";if(alts[0]&&!chips)showChips();else sayseq([G12("VOICE_AGAIN")],()=>{});return}
      judge(j)},w=>{H.textContent=vFailText(w);if(w!=="quiet"&&!chips)showChips();else sayseq([G12("VOICE_AGAIN")],()=>{})})};
  $("fuS").onclick=()=>{sfx.tap();hush();sayseq(cur.voice,()=>{})};
  const launch=()=>{H.textContent="Full! 3, 2, 1...";CH.hidden=true;M.disabled=true;hush();sayseq([G12("FUEL_FULL")],()=>{});
    setTimeout(()=>{$("fuR").classList.add("away")},2600);setTimeout(()=>{if(L&&L.q===q)gameWin(q,miss>2?1:0,$("fuR"),[])},3600)};
  q._read=()=>{if(cur&&!q.done){hush();sayseq(cur.voice,()=>{})}};
  window.__fuelAns=()=>cur&&!q.done?cur._items[cur.ans].lab:"";
  fill();show();
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;if(i>=n)return;judge(cur.ans);setTimeout(go,2500)};go()}}
const esc2=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
GAMES.fuel=fuelQ;
if(typeof gReadOpts==="function"){const _gro12=gReadOpts;gReadOpts=function(q){if(q&&q.game==="fuel"){if(q._read)q._read();return true}return _gro12(q)}}
const _bf12=buildFormat;buildFormat=function(kind,cat){if(kind==="f_fuel")return qFuel(cat);return _bf12(kind,cat)};
FMIN.f_fuel=6;
const FUEL_CATS=["count","add","clock","animals","farm","world","sky"],FUEL_OK={};
const _ff12=formatsFor0;formatsFor0=function(cat){const b=_ff12(cat);if(!(voiceOK()&&FUEL_CATS.includes(cat)&&ageOK("f_fuel")))return b;
  const kk=cat+"|"+S.age+"|"+lvl();if(FUEL_OK[kk]===undefined){let ok=false;for(let t=0;t<3&&!ok;t++){try{ok=!!qFuel(cat)}catch(e){}}FUEL_OK[kk]=ok}return FUEL_OK[kk]?[...b,"f_fuel"]:b};
Object.assign(GMAP,{"g:fuel":G("Rocket fuel",["lang","think"],[["lang","speak"],["think","recall"]],"Lulu asks this section's questions with no choices shown; the child says each answer out loud to fill the rocket with fuel, then it launches. After one miss the choices appear (read aloud) to tap or say. Age 6+.","Practice")});
window.__vtest={vNorm,vNums,vItem,vMatch,vTime};
