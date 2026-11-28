const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:+process.argv[3],height:+process.argv[4]}});
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});let body=fs.readFileSync(fp);
  if(f==='index.html')body=body.toString().replace('function fitScreen(bigId,btnId){','function fitScreen(bigId,btnId){window.__fitlog=[];').replace('let w=g.getBoundingClientRect().width,k=0;','let w=g.getBoundingClientRect().width,k=0;window.__fitlog.push([w,b.getBoundingClientRect().bottom,lim,les.getBoundingClientRect().bottom,innerHeight]);').replace('let L=null;','let L=null;window.__go=(a,c,k)=>{S.age=a;const q=buildQ(c,k,new Set());q.cat=c;q.kind=k;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");nextQ()};');
  r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(500);await p.click('#introC').catch(()=>{});await p.waitForTimeout(600);
 await p.evaluate(()=>__go(7,"robot","robot"));await p.waitForTimeout(1500);
 console.log(JSON.stringify(await p.evaluate(()=>({log:window.__fitlog,grid:document.getElementById("rbGrid").getBoundingClientRect().width,go:document.getElementById("rbGo").getBoundingClientRect().bottom,qb:[document.getElementById("qBody").scrollHeight,document.getElementById("qBody").clientHeight]}))));
 await p.screenshot({path:process.argv[5]});await b.close()})();
