const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={faSay:w=>faSay(w),enSay:w=>enSay(w),WQ:()=>WQ};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);
 const words=JSON.parse(process.argv[3]);
 console.log(JSON.stringify(await p.evaluate(ws=>{const all=[...new Set([...__px.WQ().filter(w=>w.k==='c').flatMap(w=>w.o),...ws])];return all.filter(w=>!/^\d+$/.test(w)).map(w=>[w,__px.faSay(w).length,__px.enSay(w).length]).filter(x=>!x[1]||!x[2])},words)));await b.close()})();
