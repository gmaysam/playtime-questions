window.__aa=()=>{window.__allfmt=1;const uses={},odd=[],nov=[];let n=0;
 const add=(x,tag,cap)=>{if(x==null||x==="")return;if(typeof x==="string"){(uses[x]=uses[x]||[]).length<2&&uses[x].push(tag+" | "+cap);return}if(Array.isArray(x)){x.forEach(y=>add(y,tag,cap));return}odd.push(tag+" | "+cap+" | "+JSON.stringify(x).slice(0,120))};
 const walk=(o,tag,cap,d)=>{if(!o||typeof o!=="object"||d>5)return;for(const k in o){const v=o[k];if(["voice","say","v","sayQ","vq","clips"].includes(k))add(v,tag,cap);else if(v&&typeof v==="object")walk(v,tag,cap,d+1)}};
 const chk=(q,tag)=>{n++;const cap=String(q.cap||"").replace(/<[^>]+>/g," ").slice(0,70);walk(q,tag,cap,0);
   if(!(q.voice||[]).filter(Boolean).length&&!q.match)nov.push(tag+" | "+cap);
   if(q.opts&&!q.game)q.opts.forEach((o,i)=>{(window.__OP=window.__OP||{})[tag.replace(/@\d+/,"")+" | "+cap+" | "+String(o.h).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()]=(o.say||[]).filter(Boolean).join(" ")+(q.tf?" #TF":"");if(!(o.say||[]).filter(Boolean).length)nov.push(tag+" opt"+i+" silent | "+cap+" | "+String(o.h).replace(/<[^>]+>/g," ").slice(0,40))});
   try{const f=factFor(q);if(f)walk({v:f.v||f.voice||f.say},tag+" fact",cap,0)}catch(e){}};
 WQ.forEach(w=>{window.__fw=w.i;const c=/^[sp]/.test(w.i)?"sky":/^[ax]/.test(w.i)?"animals":"world";for(const r of [.9,.1,.5]){const R=Math.random;Math.random=()=>r;try{const q=qWatcher(c,new Set());chk(q,"W "+w.i)}catch(e){}Math.random=R}window.__fw=null});
 for(const c of CATS){if(["story","paint"].includes(c.id))continue;for(const a of [3,4,5,6,7,8,9,10]){S.age=a;S.diff=1;for(const k of kindsFor(c.id))for(let i=0;i<20;i++){let q;try{q=buildQ(c.id,k,new Set())}catch(e){continue}if(q)chk(q,c.id+"/"+k+"@"+a)}
   try{for(const k of formatsFor(c.id))for(let i=0;i<8;i++){let q;try{q=k.startsWith("f_")?buildFormat(k,c.id):buildQ(c.id,k,new Set())}catch(e){continue}if(q)chk(q,c.id+"/"+k+"@"+a)}}catch(e){}}}
 return {op:window.__OP,n,uses,odd:odd.slice(0,200),nodd:odd.length,nov}};
