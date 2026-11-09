window.__qc=()=>{const bad=[],FORBID=["💅","⏳"],PL=["mercury","venus","jupiter","uranus","neptune","mars"];let n=0;
 const strip=h=>String(h||"").replace(/<[^>]+>/g," ");
 const chk=(q,tag)=>{n++;const t=(q.cap||"")+" "+(q.visual||"")+" "+(q.opts||[]).map(o=>o.h).join(" ");
  if(q.opts&&!q.match&&!q.robot&&!q.game){if(q.ans<0||q.ans>=q.opts.length)bad.push(tag+": answer index out of range");const hs=q.opts.map(o=>o.h);if(new Set(hs).size!==hs.length)bad.push(tag+": repeated option");}
  for(const f of FORBID)if(t.includes(f))bad.push(tag+": wrong emoji "+f+" in "+(q.cap||""));
  const words=(q.cap||"")+" "+(q.opts||[]).map(o=>strip(o.h)).join(" ");
  if(t.includes("🪐")&&PL.some(x=>new RegExp("\\b"+x+"\\b","i").test(words)))bad.push(tag+": ringed (Saturn) emoji next to another planet: "+q.cap);
  (q.opts||[]).forEach(o=>{const lab=strip(o.h).trim().toLowerCase();if(PL.includes(lab)&&!String(o.h).includes("pl_")&&/oe|img/.test(o.h))bad.push(tag+": planet "+lab+" without its picture")});
  if(!(q.voice||[]).length&&!q.game&&!q.match)bad.push(tag+": no voice for "+(q.cap||""));
  if(q.opts&&!q.game&&!q.match&&!q.robot&&!q.why&&!factFor(q))bad.push(tag+": no fact after the answer: "+(q.cap||""));};
 WQ.forEach(w=>{window.__fw=w.i;const c=/^[sp]/.test(w.i)?"sky":/^[ax]/.test(w.i)?"animals":"world";const R=Math.random;Math.random=()=>.9;
   try{const q=qWatcher(c,new Set());q.cat=c;q.kind="w";chk(q,w.i)}catch(e){bad.push(w.i+": "+e.message)}Math.random=R;window.__fw=null});
 for(let k=0;k<16;k++){const u=new Set([...Array(16).keys()].filter(i=>i!==k).map(i=>"tf"+i));const R=Math.random;Math.random=()=>.1;const q=qWatcher("sky",u);Math.random=R;chk(q,"skytf"+k)}
 for(const c of CATS){if(["story","paint"].includes(c.id))continue;for(const a of [3,5,7,9]){S.age=a;S.diff=1;for(const k of kindsFor(c.id))for(let i=0;i<6;i++){let q;
   try{q=buildQ(c.id,k,new Set())}catch(e){bad.push(c.id+"/"+k+": "+e.message);continue}if(!q)continue;q.cat=c.id;q.kind=k;chk(q,c.id+"/"+k+"@"+a)}}}
 for(const c of CATS){for(const a of [3,5,7,9]){S.age=a;S.diff=1;for(const k of formatsFor(c.id))for(let i=0;i<5;i++){let q;try{q=k.startsWith("f_")?buildFormat(k,c.id):buildQ(c.id,k,new Set())}catch(e){bad.push(c.id+"/"+k+"@"+a+": "+e.message);continue}n++;
   if(!q){bad.push(c.id+"/"+k+": not built");continue}if(!(q.voice||[]).filter(Boolean).length)bad.push(c.id+"/"+k+": no voice");if(!q.factT&&k.startsWith("f_"))bad.push(c.id+"/"+k+": no fact");
   if(q.items&&q.items.some(x=>!x||(Array.isArray(x)&&!x[0])))bad.push(c.id+"/"+k+": empty item");if(q.cards&&q.cards.some(x=>!x[0]))bad.push(c.id+"/"+k+": empty card")}}}
 return {n,bad:[...new Set(bad)]}};
