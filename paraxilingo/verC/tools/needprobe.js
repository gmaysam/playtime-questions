const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={faSay:w=>faSay(w),enSay:w=>enSay(w),enx:w=>!!EN_SAY[String(w).toLowerCase().trim()]};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);
 const N=JSON.parse(fs.readFileSync('/tmp/need.json'));
 console.log(JSON.stringify(await p.evaluate(N=>({fa:Object.keys(N.fa).map(w=>[w,__px.faSay(w).length,__px.enSay(w).length]),en:Object.keys(N.en).map(w=>[w,__px.enSay(w).length,__px.enx(w)])}),N)));await b.close()})();
