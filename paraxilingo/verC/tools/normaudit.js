const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;'+fs.readFileSync(path.join(__dirname,'normaudit_inject.js'),'utf8'));r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(1500);
 const r=await p.evaluate(a=>__norm(a[0],a[1]),[JSON.parse(process.argv[3]||'[4,6,8,10]'),+(process.argv[4]||3)]);
 fs.writeFileSync('/tmp/norm.json',JSON.stringify(r));console.log('runs',r.length);await b.close()})();
