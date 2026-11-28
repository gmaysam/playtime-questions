window.__said=[];
window.__norm=async(ages,reps)=>{say=function(name,onEnd){window.__said.push(name);setTimeout(()=>{onEnd&&onEnd()},3)};const out=[];const _st=window.__st||(window.__st=window.setTimeout);window.setTimeout=(f,ms,...a)=>_st(f,Math.min(ms||0,12),...a);const wait=ms=>new Promise(r=>_st(r,ms));
 const content=()=>{const b=$("qBody");if(!b)return "";const c=b.cloneNode(true);c.querySelectorAll("button,.qkick,.qhint2,.cm-dots").forEach(x=>x.remove());return c.textContent.replace(/\s+/g," ").trim().slice(0,160)};
 const btns=()=>{const b=$("qBody");return b?[...b.querySelectorAll("button")].filter(x=>!/qspk|qcheck|gspk|spk/i.test(x.className+" "+x.id)&&x.offsetParent!==null&&!x.hidden).map(x=>x.textContent.replace(/\s+/g," ").trim()).filter(Boolean):[]};
 const run=async(q,cat,tag)=>{if(!q)return;q.cat=q.cat||cat;window.__said=[];L={g:0,cat,correct:0,first:0,acorns:0,k:0,queue:[q],total:1};
   try{nextQ()}catch(e){out.push({tag,err:String(e)});return}await wait(350);
   const said=window.__said.slice();hush();
   const bl=btns();const optSay=new Set([...(q.opts||[]).flatMap(o=>(o.say||[]).filter(Boolean)),...bl.flatMap(t=>{try{return both(t.replace(/[^\p{L}\p{N}' ]/gu,"").trim().toLowerCase())}catch(e){return []}})]);
   out.push({tag,game:q.game||"",cap:q.cap||"",content:content(),btns:btns(),said,nopt:(q.opts||[]).length,optSaid:said.filter(c=>optSay.has(c)&&!(q.voice||[]).includes(c)).length})};
 for(const c of CATS){if(["story","paint"].includes(c.id))continue;
  for(const a of ages){S.age=a;S.diff=1;let ks=[];try{ks=[...new Set([...kindsFor(c.id),...formatsFor(c.id)])]}catch(e){}
   for(const k of ks)for(let i=0;i<reps;i++){let q=null;try{q=k.startsWith("f_")?buildFormat(k,c.id):buildQ(c.id,k,new Set())}catch(e){continue}await run(q,c.id,c.id+"/"+k+"@"+a)}}}
 return out};
