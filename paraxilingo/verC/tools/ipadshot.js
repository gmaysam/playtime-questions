const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:820,height:1180},hasTouch:true,isMobile:true,deviceScaleFactor:1});
 const errs=[];p.on('pageerror',e=>errs.push('PE '+e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);
   if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});r.fulfill({body:fs.readFileSync(fp),contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(700);await p.screenshot({path:root+'/../../../shots/i1.png'});
 await p.tap('#inGo');await p.waitForTimeout(1500);await p.screenshot({path:root+'/../../../shots/i2.png'});
 await p.tap('.pop .btn');await p.waitForTimeout(1200);await p.screenshot({path:root+'/../../../shots/i3.png'});
 console.log(errs.join('\n')||'no errors');await b.close();})();
