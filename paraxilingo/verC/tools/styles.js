const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [w,h,nm] of [[390,844,'phone'],[820,1180,'ipad']]){
 const p=await b.newPage({viewport:{width:w,height:h},hasTouch:true,isMobile:true});p.on('pageerror',e=>errs.push(e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={buildQ:(c,k,u)=>buildQ(c,k,u),setAge:a=>{S.age=a;S.diff=1}};window.__ans=()=>L.q.ans;window.__go=(q,c)=>{q.cat=c;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,t0:Date.now(),queue:[q],total:1};$("lesson").classList.add("open");$("qDots").innerHTML="<i></i>";nextQ()};');
  r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.svg')?'image/svg+xml':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);await p.click('#introC',{force:true}).catch(()=>{});await p.waitForTimeout(800);
 for(const [c,k,a,st,n] of [['shapes','pattern',6,'cards','pattern'],['animals','w',6,'balloon','balloon'],['count','find',4,'fish','fish'],['shapes','robot',6,null,'robot']]){
   await p.evaluate(([c,k,a,st])=>{__px.setAge(a);let q;for(let i=0;i<50;i++){q=__px.buildQ(c,k,new Set());if(q.opts&&q.opts.length===4||q.robot)break}if(st)q.style=st;__go(q,c)},[c,k,a,st]);
   await p.waitForTimeout(2200);await p.screenshot({path:`shots/S_${nm}_${n}.png`})}
 // right answer -> fact card
 await p.evaluate(()=>{__px.setAge(6);const q=__px.buildQ('count','skip',new Set());q.style='cards';__go(q,'count')});await p.waitForTimeout(800);
 await p.evaluate(()=>{document.querySelectorAll(".qo")[__ans()].click();document.getElementById("qCheck").click()});await p.waitForTimeout(1500);await p.screenshot({path:`shots/S_${nm}_fact.png`});
 await p.close()}
 console.log(errs.join('\n')||'no errors');await b.close()})();
