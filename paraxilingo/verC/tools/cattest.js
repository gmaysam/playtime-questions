const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs'),path=require('path');const root=process.argv[2],age=+(process.argv[3]||6);
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
 const errs=[],missing=new Set();p.on('pageerror',e=>errs.push('PE '+e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);
   if(!fs.existsSync(fp)){missing.add(f);return r.fulfill({status:404,body:''})}
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={get L(){return L},get S(){return S},openMound:(i)=>openMound(i),dayPlan:()=>dayPlan(),setAge:a=>{S.age=a;save()}};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.svg')?'image/svg+xml':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);await p.click('#introC');await p.waitForTimeout(1200);
 await p.evaluate(a=>__px.setAge(a),age);
 for(const cat of ['count','add','money','clock','farm','shapes','sky','people','letters','animals']){
   await p.evaluate(c=>{__px.dayPlan();__px.S.day.plan[0]={cat:c,count:5};},cat);
   await p.evaluate(()=>__px.openMound(0));await p.waitForTimeout(700);
   for(let k=0;k<12;k++){
     const st=await p.evaluate(()=>{const L=__px.L;if(!L)return 'none';if(!document.getElementById('qResult').hidden)return 'result';if(document.getElementById('qSheet').classList.contains('show'))return 'sheet';return L.q&&!L.q.locked?'q':'wait'});
     if(st==='result'||st==='none')break;
     if(st==='sheet'){await p.click('#qNext');await p.waitForTimeout(400);continue}
     if(st==='wait'){await p.waitForTimeout(400);continue}
     if(await p.$('#qBody .mboard')){const ids=await p.evaluate(()=>[...document.querySelectorAll('.mc.pic:not(.ok)')].map(b=>b.dataset.id));for(const id of ids){await p.click(`.mc.pic[data-id="${id}"]`,{force:true});await p.click(`.mc.wrd[data-id="${id}"]`,{force:true});await p.waitForTimeout(300)}await p.waitForTimeout(1200);continue}
     const info=await p.evaluate(()=>({ans:__px.L.q.ans,kind:__px.L.q.kind,say:__px.L.q.opts.map(o=>(o.say||[]).filter(Boolean).length)}));
     await p.screenshot({path:root+`/../shots/c_${cat}_${k}.png`});console.log(cat,info.kind,'say',JSON.stringify(info.say));
     await p.click(`#qBody .qo[data-j="${info.ans}"]`,{force:true});await p.waitForTimeout(500);
   }
   const rb=await p.$('#resBtn');if(rb)await rb.click({force:true});await p.waitForTimeout(1500);
 }
 console.log('missing',[...missing].join(' '));console.log(errs.join('\n')||'no errors');await b.close();})();
