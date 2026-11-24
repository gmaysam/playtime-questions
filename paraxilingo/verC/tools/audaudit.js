const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;'+fs.readFileSync(path.join(__dirname,'audaudit_inject.js'),'utf8'));r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(1000);
 const r=await p.evaluate(()=>__aa());const miss=Object.keys(r.uses).filter(k=>!fs.existsSync(path.join(root,'audio',k+'.mp3')));
 fs.writeFileSync('/tmp/aa.json',JSON.stringify({n:r.n,names:Object.keys(r.uses).length,miss:miss.map(k=>[k,r.uses[k]]),odd:r.odd,nodd:r.nodd,nov:r.nov,op:r.op}));
 console.log('questions',r.n,'clips',Object.keys(r.uses).length,'missing',miss.length,'nonclip',r.nodd,'silent',r.nov.length);await b.close()})();
