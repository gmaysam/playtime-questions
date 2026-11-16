const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});r.fulfill({body:fs.readFileSync(fp),contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.svg')?'image/svg+xml':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);await p.screenshot({path:root+'/../shots/n_intro.png'});
 await p.waitForTimeout(9500);await p.screenshot({path:root+'/../shots/n_map.png'});
 console.log(errs.join('\n')||'no errors');await b.close()})();
