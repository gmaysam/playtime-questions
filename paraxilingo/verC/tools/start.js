const {chromium,devices}=require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({...devices['iPhone 13']});
 const errs=[];p.on('pageerror',e=>errs.push('PE '+e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);
   if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   r.fulfill({body:fs.readFileSync(fp),contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);await p.tap('#inGo');await p.waitForTimeout(1500);
 await p.screenshot({path:root+'/../shots/s1.png'});
 const btn=await p.$('.pop .btn');console.log('pop btn',!!btn, btn&&JSON.stringify(await btn.boundingBox()));
 try{await p.tap('.pop .btn',{timeout:3000})}catch(e){console.log('tap fail',e.message.split('\n')[0])}
 await p.waitForTimeout(1000);console.log('lesson open',await p.evaluate(()=>document.getElementById('lesson').classList.contains('open')));
 await p.screenshot({path:root+'/../shots/s2.png'});console.log(errs.join('\n')||'no errors');await b.close();})();
