const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2],[W,H]=[+process.argv[3],+process.argv[4]];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H},isMobile:true,hasTouch:true});
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__go=(c,k,st,a)=>{S.age=a;let q=buildQ(c,k,new Set());q.style=st;q.cat=c;q.kind=k;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");nextQ();hush()};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.woff2')?'font/woff2':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);await p.click('#introC').catch(()=>{});await p.waitForTimeout(800);
 let i=0;for(const [c,k,st,a] of [["letters","lafter","cards",7],["count","skip","cards",7],["add","share","cards",5],["read","sentence","fish",7],["add","share","balloon",5],["clock","oclock","cards",5]]){
  await p.evaluate(([c,k,st,a])=>__go(c,k,st,a),[c,k,st,a]);await p.waitForTimeout(2200);await p.screenshot({path:`${root}/../shots9/cp_${W}_${i++}.png`})}
 await b.close()})();
