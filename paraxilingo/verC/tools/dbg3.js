const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>console.log('PE',e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={qStory:(s,k)=>qStory(s,k),setAge:a=>{S.age=a;S.diff=1}};window.__go=(q,c)=>{q.cat=c;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,t0:Date.now(),queue:[q],total:1};$("lesson").classList.add("open");$("qDots").innerHTML="<i></i>";nextQ()};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);await p.click('#introC').catch(()=>{});
 await p.evaluate(()=>{__px.setAge(6);__go(__px.qStory(2,0),'story')});await p.waitForTimeout(3000);
 console.log(await p.evaluate(()=>document.querySelector('#qBody').innerHTML.slice(0,900)));await b.close()})();
