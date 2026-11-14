const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={buildQ:(c,k,u)=>buildQ(c,k,u),kindsFor:c=>kindsFor(c),CATS:()=>CATS,setAge:a=>{S.age=a;S.diff=1},story:(s,k)=>qStory(s,k),NS:()=>STORIES.length,SQ:s=>STORIES[s].q.map(x=>x.k)};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);
 const res=await p.evaluate(()=>{const out={},cnt={};
  const toks=h=>{const t=new Set();(h||"").replace(/src="([^"]+)"/g,(m,x)=>{t.add(x);return""});const txt=(h||"").replace(/<[^>]+>/g," ");for(const ch of txt.match(/\p{Extended_Pictographic}(‍\p{Extended_Pictographic}|️)*/gu)||[])t.add(ch);return t};
  const chk=(id,q)=>{if(!q||!q.opts)return;cnt[q.opts.length]=(cnt[q.opts.length]||0)+1;if(q.opts.length===3)cnt["3:"+id]=1;if(!q.opts[q.ans]){out["BADANS "+id]=(out["BADANS "+id]||"")+" "+q.ans+"/"+q.opts.length;return}const v=q.visual||"";if(/^<div class="listen/.test(v)&&!/radio/.test(v))return;const vt=toks(v),at=toks(q.opts[q.ans].h);
    const hit=[...at].filter(x=>vt.has(x)&&!q.opts.every(o=>toks(o.h).has(x)));if(hit.length)out[id]=(out[id]||"")+" "+hit.join("")};
  for(const c of __px.CATS()){if(["story","paint"].includes(c.id))continue;for(const a of [3,5,7,9]){__px.setAge(a);for(const k of __px.kindsFor(c.id))for(let n=0;n<25;n++)chk(c.id+"/"+k,__px.buildQ(c.id,k,new Set()))}}
  __px.setAge(6);for(let s=0;s<__px.NS();s++)for(const k of __px.SQ(s))chk("story"+s+"/"+k,__px.story(s,k));
  return {out,cnt}});
 for(const [k,v] of Object.entries(res.out))console.log('REVEAL',k,[...new Set([...v.replace(/ /g,'')])].join('').slice(0,40));
 console.log('answers per question',JSON.stringify(res.cnt));console.log(errs.join(' ')||'no errors');await b.close()})();
