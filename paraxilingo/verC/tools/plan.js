/* Automatic question check, run before every release:
   - every answer is among the options and options are not repeated
   - a planet named in a question or answer is shown with its own picture (never the ringed emoji for a non-Saturn planet)
   - known wrong emoji never appear (nail polish for nails, hourglass for sand, ...)
   - moving answers (balloons/fish) only for answers without pictures
   - every right answer has a short fact; every question has a voice */
const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;'+fs.readFileSync(path.join(__dirname,'plan_inject.js'),'utf8'));r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);
 const r=await p.evaluate(()=>__plan());console.log(r.join('\n'));await b.close()})();
