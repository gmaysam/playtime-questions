/* ================= v45 =================
   - Reading speed 1× to 2×.
   - Where you are: every line you have heard gets a green "✓ heard"; a bar on top shows how far you are and takes you
     back to the next line you have not heard. It is kept in the notes store (and on this device), so it is the same on
     the phone and the Mac.
   - "Edited by Claude" tab: each line I changed for you, before and after, with its old and new voice.
   - Offline: if the notes store cannot be reached, notes are kept on this device; "Copy notes" takes them along. */
$("spd45").value=String(RATE);if(!$("spd45").value){$("spd45").value="1";RATE=1}
$("spd45").onchange=()=>{RATE=+$("spd45").value||1;try{localStorage.setItem("qc_rate",String(RATE))}catch(e){}};
let OFF45=false,ORDER45=null;const POS45=new Map();
const ord45=()=>{if(!ORDER45){ORDER45=ITEMS.filter(i=>i.tab==="fa").sort((x,y)=>(BASE.has(x.id)?0:1)-(BASE.has(y.id)?0:1)).map(i=>i.id);ORDER45.forEach((x,k)=>POS45.set(x,k))}return ORDER45};
const posOf=id=>{ord45();return POS45.has(id)?POS45.get(id):-1};
let LAST45="fa:"+FA45.last;const SESS45=new Set();const ONE45=new Set();
try{const v=localStorage.getItem("qc_fa_last");if(v&&posOf(v)>posOf(LAST45))LAST45=v;JSON.parse(localStorage.getItem("qc_fa_one")||"[]").forEach(x=>ONE45.add(x))}catch(e){}
const heard45=id=>{const p=posOf(id);return p>=0&&(p<=posOf(LAST45)||ONE45.has(id))};
let sv45=0,svT45=null;
function save45(now){try{localStorage.setItem("qc_fa_last",LAST45);localStorage.setItem("qc_fa_one",JSON.stringify([...ONE45].slice(-1500)))}catch(e){}
  if(!db)return;const go=()=>{svT45=null;sv45=Date.now();try{db.collection("qc").doc("_progress").set({kind:"progress",last:LAST45,one:[...ONE45].slice(-800),at:new Date().toISOString()})}catch(e){}};
  if(now){if(svT45)clearTimeout(svT45);go();return}if(!svT45)svT45=setTimeout(go,Math.max(0,20000-(Date.now()-sv45)))}
function mark45(id){const p=posOf(id);if(p<0)return;SESS45.add(id);const L=posOf(LAST45);
  if(p===L+1){LAST45=id;let k=p+1;const O=ord45();while(k<O.length&&ONE45.has(O[k])){ONE45.delete(O[k]);LAST45=O[k];k++}}else if(p>L)ONE45.add(id);
  save45(false);const el=document.getElementById("it-"+id);if(el)paintOne45(el);bar45()}
function prog45Load(snap){try{const d=snap.docs.find(d=>d.id==="_progress"||((d.data()||{}).kind==="progress"));if(!d)return;const v=d.data();
  let ch=false;if(v.last&&posOf(v.last)>posOf(LAST45)){LAST45=v.last;ch=true}(v.one||[]).forEach(x=>{if(!ONE45.has(x)&&posOf(x)>posOf(LAST45)){ONE45.add(x);ch=true}});
  if(ch){save45(false);paint45()}}catch(e){}}
function paintOne45(el){const id=el.dataset.id;if(!el.classList.contains("fa")||el.closest('[data-tab45="ed"]'))return;const h=heard45(id);el.classList.toggle("heard",h);el.classList.toggle("lastheard",id===LAST45);
  let t=el.querySelector(".heardtag");if(h&&!t){el.insertAdjacentHTML("afterbegin",'<span class="heardtag">✓ heard</span>')}else if(!h&&t)t.remove()}
function nextUnheard45(){const O=ord45();for(let k=posOf(LAST45)+1;k<O.length;k++)if(!ONE45.has(O[k]))return O[k];return null}
function bar45(){const b=$("prog45");if(!b)return;const O=ord45(),n=O.filter(heard45).length,nx=nextUnheard45(),lt=ITEMS.find(i=>i.id===LAST45&&i.tab==="fa");
  const lastTxt=lt?(FA.find(r=>"fa:"+r[0]===LAST45)||[])[2]:"";
  b.innerHTML=`<div class="row"><b>Heard ${n.toLocaleString()} of ${O.length.toLocaleString()} lines</b><span class="note">${Math.round(n*100/O.length)}% · ${(O.length-n).toLocaleString()} to go</span></div><div class="bar"><i style="width:${(n*100/O.length).toFixed(1)}%"></i></div>
   <div class="row"><span class="note">Last one you heard:</span><span class="last">${esc(faText(LAST45.slice(3),lastTxt||""))}</span><span class="note">(${esc(LAST45.slice(3))})</span></div>
   <div class="row">${nx?`<button class="btn" id="cont45">▶ Go on from the next line</button>`:"<b>All heard 🎉</b>"}<button class="btn ghost" id="where45">Show me where I stopped</button></div>`;
  const c=$("cont45");if(c)c.onclick=()=>go45(true);$("where45").onclick=()=>go45(false)}
function go45(play){const nx=play?nextUnheard45():LAST45;if(!nx)return;let L=filtered(),k=L.findIndex(i=>i.id===nx);
  if(k<0){$("fSec").value="";$("fQ").value="";$("fNote").value="";L=filtered();k=L.findIndex(i=>i.id===nx)}if(k<0)return;
  while(k>=shown)shown+=60;render();const el=document.getElementById("it-"+nx);if(el)el.scrollIntoView({block:"center",behavior:"smooth"});if(play){faStop();faFrom(k)}}
function paint45(){if(tab==="fa"){if(!$("prog45"))$("list").insertAdjacentHTML("afterbegin",'<div class="prog45" id="prog45"></div>');bar45();
  document.querySelectorAll("#list .item.fa").forEach(paintOne45);
  if(!$("faAll").dataset.on){const k=filtered().findIndex(i=>i.id===LAST45);if(k>=0){faPos=k;faLabel()}}}}
const _rd45=render;render=function(){_rd45.apply(this,arguments);try{if(tab==="ed")$("list").setAttribute("data-tab45","ed");else $("list").removeAttribute("data-tab45");paint45()}catch(e){console.log(e)}};
/* heard: while playing all, and when one line is played */
document.addEventListener("click",e=>{const b=e.target.closest(".item.fa .play");if(!b||b.closest('[data-tab45="ed"]'))return;mark45(b.closest(".item").dataset.id)});
window.addEventListener("pagehide",()=>save45(true));document.addEventListener("visibilitychange",()=>{if(document.hidden)save45(true)});
$("faAll").addEventListener("click",()=>setTimeout(()=>{if(!$("faAll").dataset.on)save45(true)},50));
/* ---------- Edited by Claude ---------- */
const NOTE_OF={};Object.entries(FA45.noteRow).forEach(([n,c])=>NOTE_OF[c]=n);
const KIND45={q:"Question",fact:"Fact after a question",ans:"Answer word",did:"Did you know?",story:"Story",talk:"Family talk",game:"Game line",math:"Adding & taking away"};
const GRP45={};FA.forEach(r=>GRP45[r[0]]=r[1]);
function noteLine45(c){const n=NOTES["fa:"+c]||NOTES[NOTE_OF[c]];if(!n)return "";return `<div class="edmeta">Your note: ${esc(n.note||"")}${n.fix&&n.fix!=="(no text on file)"?` · you wrote: <span class="fa">${esc(n.fix)}</span>`:""}</div>`}
const rv45=id=>`<div class="rv farv" data-id="${esc(id)}"><div class="fa-btns"><button class="btn ghost sm" data-ok>✓ Sounds right</button><button class="btn ghost sm" data-fixopen>✗ Fix it</button><button class="btn ghost sm" data-clear hidden>Clear</button><span class="saved" data-st></span></div>
   <div class="fa-edit" hidden><input data-f="fix" dir="rtl" placeholder="Write it the way Lulu should say it (Farsi)"><input data-f="note" placeholder="Note (optional)"><div><button class="btn sm" data-save>Save</button></div></div></div>`;
const MOVE45=new Set(FA45.move||[]);
for(const [c,[nc,nt]] of Object.entries(FA45.ed)){const id="fa:"+c,ot=FA_OLD[c]||"";if(!MOVE45.has(c))BASE.add(id);
  ITEMS.push({id,tab:"ed",cat:"",age:0,ed:1,edcls:1,search:(c+" "+nt+" "+ot).toLowerCase(),mute:false,html:()=>`<div class="edmeta"><b>${esc(KIND45[GRP45[c]]||"Line")}</b> · ${esc(c)}${FA45.round&&FA45.round[c]?" · <b>"+FA45.round[c]+"</b>":""}</div>
   <div class="ed45"><span class="lab">Now</span><button class="play" data-play='${esc(JSON.stringify([nc]))}' aria-label="Play the new one">${PLAY}</button><div class="fa-t">${esc(nt)}</div>
   <span class="lab">Before</span><button class="play" data-play='${esc(JSON.stringify([c]))}' aria-label="Play the old one">${PLAY}</button><div class="fa-t was">${esc(ot)||"<span class='miss'>(no text on file)</span>"}</div></div>
   ${noteLine45(c)}<div class="edmeta">What I did: ${esc(FA45.reply["fa:"+c]||FA45.reply[NOTE_OF[c]]||"Re-recorded it.")}</div>${rv45(id)}`})}
for(const c of FA45.del){const id="fa:"+c;BASE.add(id);
  ITEMS.push({id,tab:"ed",cat:"",age:0,ed:1,edcls:1,search:(c+" "+(FA_OLD[c]||"")+" removed").toLowerCase(),mute:false,html:()=>`<div class="edmeta"><b>Removed</b> · ${esc(c)}${FA45.round&&FA45.round[c]?" · <b>"+FA45.round[c]+"</b>":""}</div>
   <div class="ed45"><span class="lab">Before</span><button class="play" data-play='${esc(JSON.stringify([c]))}' aria-label="Play the old one">${PLAY}</button><div class="fa-t was">${esc(FA_OLD[c])||"<span class='miss'>(no text on file)</span>"}</div><span class="lab">Now</span><span></span><div class="edmeta">Taken out of the app and off this list.</div></div>
   ${noteLine45(c)}<div class="edmeta">What I did: ${esc(FA45.reply["fa:"+c]||"Removed.")}</div>`})}
for(const [c,t] of Object.entries(FA45.txt)){if(FA45.ed[c])continue;const id="fa:"+c;
  ITEMS.push({id,tab:"ed",cat:"",age:0,ed:1,edcls:1,search:(c+" "+t).toLowerCase(),mute:false,html:()=>`<div class="edmeta"><b>Words added</b> · ${esc(c)}${FA45.round&&FA45.round[c]?" · <b>"+FA45.round[c]+"</b>":""}</div>
   <div class="ed45"><span class="lab">Now</span><button class="play" data-play='${esc(JSON.stringify([c]))}' aria-label="Play">${PLAY}</button><div class="fa-t">${esc(t)}</div></div>
   ${noteLine45(c)}<div class="edmeta">What I did: ${esc(FA45.reply["fa:"+c]||"Wrote down the words Lulu says (her voice did not change).")}</div>${rv45(id)}`})}
for(const x of FA45.qchg){ITEMS.push({id:"qchg:"+x.id,tab:"ed",cat:"",age:0,ed:1,edcls:1,search:(x.id+" "+x.what+" "+x.before+" "+x.after).toLowerCase(),mute:false,html:()=>`<div class="edmeta"><b>${esc(x.what)}</b> · question ${esc(x.id)}</div>
   <div class="ed45"><span class="lab">Now</span><span></span><div>${esc(x.after)}</div><span class="lab">Before</span><span></span><div class="was">${esc(x.before)}</div></div>`});BASE.add("qchg:"+x.id)}
/* ---------- offline ---------- */
function localDB45(){let L={};try{L=JSON.parse(localStorage.getItem("qc_local_notes")||"{}")}catch(e){}const fs=[];
  const keep=()=>{try{localStorage.setItem("qc_local_notes",JSON.stringify(L))}catch(e){}},emit=()=>{const snap={docs:Object.entries(L).map(([id,x])=>({id,data:()=>x}))};fs.forEach(f=>{try{f(snap)}catch(e){}})};
  return {collection:()=>({doc:id=>({set:async v=>{L[id]=v;keep();emit()},delete:async()=>{delete L[id];keep();emit()}}),onSnapshot:f=>{fs.push(f);setTimeout(emit,0);return()=>{}}})}}
function exportText45(){let L={};try{L=JSON.parse(localStorage.getItem("qc_local_notes")||"{}")}catch(e){}delete L._progress;return JSON.stringify({qcNotes:45,last:LAST45,one:[...ONE45],notes:L})}
function offBar45(){if($("off45"))return;$("dbst").insertAdjacentHTML("afterend",`<span class="off45" id="off45"><button class="btn ghost sm" id="cp45">Copy my notes</button><span id="cpst45"></span></span>`);
  $("cp45").onclick=()=>{const t=exportText45(),n=Object.keys(JSON.parse(t).notes).length;const ok=()=>$("cpst45").textContent=`Copied (${n} notes). When you are online, paste them in the QC page → “Bring in notes from the offline copy”, or paste them to Claude.`;
    try{navigator.clipboard.writeText(t).then(ok,()=>show45(t))}catch(e){show45(t)}};
  if("caches" in window&&/(github\.io|^localhost)$/.test(location.hostname))saveBtn45()}
function show45(t){$("cpst45").innerHTML='<textarea readonly style="width:100%;min-height:60px"></textarea>';const a=$("cpst45").querySelector("textarea");a.value=t;a.select()}
/* the page on GitHub Pages: keep everything for offline use */
function saveBtn45(){$("off45").insertAdjacentHTML("beforeend",'<button class="btn ghost sm" id="sv45">⤓ Keep all voices for offline</button><span id="svst45"></span>');
  $("sv45").onclick=async()=>{const packs=[...new Set(Object.values(AU.idx).map(x=>x[0]))].sort((a,b)=>(/^fa/.test(b)?1:0)-(/^fa/.test(a)?1:0)).map(p=>"aud/"+p+".mp3");$("sv45").disabled=true;let k=0;
    if(!navigator.serviceWorker||!navigator.serviceWorker.controller){$("svst45").textContent=" Getting ready… open this page once more, then tap again.";$("sv45").disabled=false;return}
    try{let miss=0;for(const u of packs){let r;try{r=await fetch(u)}catch(e){throw 0}if(r.ok)await r.arrayBuffer();else miss++;k++;$("svst45").textContent=` ${k} of ${packs.length} saved`}
      $("svst45").textContent=" ✓ All voices saved. This page now works without internet."}catch(e){$("svst45").textContent=" Stopped at "+k+" of "+packs.length+" (no internet?). Tap again later to go on."}$("sv45").disabled=false}}
if("serviceWorker" in navigator&&/(github\.io|^localhost)$/.test(location.hostname)){try{navigator.serviceWorker.register("sw.js").catch(()=>{})}catch(e){}}
/* in the online page: bring in notes made offline */
function importBar45(){if($("imp45")||OFF45||!db)return;$("dbst").insertAdjacentHTML("afterend",`<span class="off45" id="imp45"><button class="btn ghost sm" id="impb45">Bring in notes from the offline copy</button><a class="btn ghost sm" href="https://gmaysam.github.io/playtime-questions/qc/#fa" target="_blank" rel="noopener">📴 Offline copy ↗</a></span>`);
  $("impb45").onclick=()=>{if($("impbox45"))return;$("imp45").insertAdjacentHTML("beforeend",`<div id="impbox45" style="flex-basis:100%"><textarea id="impt45" placeholder="Paste what “Copy my notes” gave you"></textarea><button class="btn sm" id="impgo45">Add these notes</button> <span id="impst45"></span></div>`);
    $("impgo45").onclick=async()=>{let x;try{x=JSON.parse($("impt45").value)}catch(e){$("impst45").textContent="That does not look like copied notes.";return}if(!x||x.qcNotes!==45){$("impst45").textContent="That does not look like copied notes.";return}
      const ns=Object.entries(x.notes||{}).filter(([id,n])=>n&&n.item&&(!NOTES[n.item]||(n.at||n.checkedAt||"")>(NOTES[n.item].at||NOTES[n.item].checkedAt||"")));let k=0;
      for(const [id,n] of ns){try{await db.collection("qc").doc(id).set(n)}catch(e){}k++;$("impst45").textContent=`${k} of ${ns.length} added…`;await wait(400)}
      if(x.last&&posOf(x.last)>posOf(LAST45))LAST45=x.last;(x.one||[]).forEach(o=>{if(posOf(o)>posOf(LAST45))ONE45.add(o)});save45(true);paint45();$("impst45").textContent=`✓ ${ns.length} notes added`+(ns.length<Object.keys(x.notes||{}).length?" (the rest were already here)":"")}}}
setTimeout(function w45(){if(db&&!OFF45)importBar45();else if(!OFF45)setTimeout(w45,1500)},1500);
/* phone: the top bar scrolls away; a small bar at the bottom keeps Play / Stop and the speed at hand */
document.body.insertAdjacentHTML("beforeend",'<div id="mini45" hidden><button class="btn ghost" id="mBack45" aria-label="Back one line">⏮ Back</button><button class="btn" id="mPlay45">▶</button><button class="btn ghost" id="mSpd45">1×</button><span id="mTxt45"></span></div>');
$("mPlay45").onclick=()=>$("faAll").click();
/* ⏮ Back: hear the line before again and go on from there */
$("mBack45").onclick=()=>{const L=filtered();let k=faPos;if($("faAll").dataset.on)k=faPos-1;else if(k<0){k=L.findIndex(i=>i.id===LAST45)}k=Math.max(0,Math.min(k,L.length-1));faStop();faFrom(k)};
$("mSpd45").onclick=()=>{const S=["1","1.25","1.5","2"],i=(S.indexOf($("spd45").value)+1)%S.length;$("spd45").value=S[i];$("spd45").onchange()};
setInterval(()=>{const m=$("mini45");m.hidden=tab!=="fa";if(m.hidden)return;const on=!!$("faAll").dataset.on;$("mPlay45").textContent=on?"■ Stop":"▶ Go on";$("mSpd45").textContent=$("spd45").value+"×";
  const O=ord45(),n=O.filter(heard45).length;$("mTxt45").textContent=`${n.toLocaleString()} / ${O.length.toLocaleString()} heard`},600);
/* the Farsi list opens on the lines not heard yet (pick "All items" to see the rest) */
let first45=true;const _rt45=renderTabs;renderTabs=function(){const r=_rt45.apply(this,arguments);try{if(tab==="fa"&&first45&&!$("fNote").value){first45=false;$("fNote").value="unheard"}}catch(e){}return r};
