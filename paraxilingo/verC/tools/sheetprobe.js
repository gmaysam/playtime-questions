const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();
 for(const [age,cat,kind] of JSON.parse(process.env.G)){const p=await b.newPage({viewport:{width:390,height:844}});
  await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__go=(a,c,k)=>{S.age=a;S.day.d="";const q=buildQ(c,k,new Set());q.cat=c;q.kind=k;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,queue:[q,buildQ(c,k,new Set())],total:2};$("lesson").classList.add("open");nextQ()};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
  await p.goto('http://app.test/index.html');await p.waitForTimeout(500);await p.click('#introC').catch(()=>{});await p.waitForTimeout(600);
  await p.evaluate(([a,c,k])=>__go(a,c,k),[age,cat,kind]);await p.waitForTimeout(1500);await p.evaluate(()=>window.__gSolve());await p.waitForTimeout(2500);
  const r=await p.evaluate(()=>{const n=document.getElementById('qNext'),s=document.getElementById('qSheet'),R=x=>x?JSON.stringify(x.getBoundingClientRect()).slice(0,90):'-';return {next:R(n),sheet:R(s),bodyH:document.getElementById('qBody').scrollHeight,lesson:R(document.getElementById('lesson')),docH:document.documentElement.scrollHeight}});
  console.log(kind,JSON.stringify(r));await p.screenshot({path:`${root}/../shots11/sheet_${kind}.png`});await p.close()}
 await b.close()})();
