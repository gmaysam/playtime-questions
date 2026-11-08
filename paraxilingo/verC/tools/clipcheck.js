const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={buildQ:(c,k,u)=>buildQ(c,k,u),kindsFor:c=>kindsFor(c),CATS:()=>CATS,setAge:a=>{S.age=a;S.diff=1}};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);
 const res=await p.evaluate(()=>{const clips=new Set(),bad=[],cnt={};for(const c of __px.CATS()){if(["story","paint"].includes(c.id))continue;for(let a=3;a<=9;a++){__px.setAge(a);for(const k of __px.kindsFor(c.id))for(let n=0;n<30;n++){let q;try{q=__px.buildQ(c.id,k,new Set())}catch(e){bad.push(c.id+'/'+k+'/'+a+' '+e.message);break}
   if(!q)continue;(q.voice||[]).forEach(v=>v&&clips.add(v));(q.opts||[]).forEach(o=>(o.say||[]).forEach(v=>v&&clips.add(v)));((q.why||{}).v||[]).forEach(v=>clips.add(v));((q.exp||{}).v||[]).forEach(v=>v&&clips.add(v));(q.match||[]).forEach(m=>[...m.ps,...m.ws].forEach(v=>clips.add(v)));
   const key=a+':'+(q.opts?q.opts.length:'m');cnt[key]=(cnt[key]||0)+1}}}return {clips:[...clips],bad:[...new Set(bad)],cnt}});
 const miss=res.clips.filter(c=>c.startsWith('w/')&&!fs.existsSync(path.join(root,'audio',c+'.mp3')));
 console.log('clips',res.clips.length,'missing',miss.length,miss.slice(0,30).join(' '));console.log('errors',res.bad.slice(0,10).join(' | ')||'none',errs.join(' ')||'');
 console.log('choices per age',JSON.stringify(res.cnt));await b.close()})();
