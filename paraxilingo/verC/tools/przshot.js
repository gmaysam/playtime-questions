const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2],out=process.argv[3];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});let body=fs.readFileSync(fp);
  if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={get S(){return S},showPrizes:()=>showPrizes(),paint:i=>{L={g:0,cat:"paint",correct:0,first:0,acorns:0,k:0,queue:[],total:1};$("lesson").classList.add("open");paintGame(i)},spy:()=>{S.age=6;const q=buildFormat("f_spy","people");L={g:0,cat:"people",correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");nextQ()}};');
  r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(500);await p.click('#introC').catch(()=>{});await p.waitForTimeout(600);
 await p.evaluate(()=>{const S=__px.S;S.acorns=140;S.wood=9;S.real=[{id:"r1",e:"🎁",img:"",name:"Lego car",a:200,w:20},{id:"r2",e:"🧸",img:"",name:"Teddy bear",a:100,w:5}];S.stickers=[{e:"🦄",d:"x"},{e:"🚀",d:"x"},{e:"🐬",d:"x"},{e:"🌈",d:"x"},{e:"🦖",d:"x"}];S.paintings=[{p:0,f:["#FF4B4B","#FFC800","#58CC02"],d:"x"},{p:1,f:["#1CB0F6"],d:"x"}];__px.showPrizes()});
 await p.waitForTimeout(500);const h=await p.evaluate(()=>document.getElementById('pPrizes').scrollHeight);await p.setViewportSize({width:390,height:h+80});await p.waitForTimeout(300);await p.screenshot({path:out+'/prizes.png'});await p.setViewportSize({width:390,height:844});
 await p.evaluate(()=>__px.paint(1));await p.waitForTimeout(800);
 for(const k of [0,1,2,3,4,5]){await p.evaluate(k=>{const r=document.querySelectorAll('#pCanvas .rg')[k];r&&r.dispatchEvent(new MouseEvent('click',{bubbles:true}))},k);await p.waitForTimeout(150)}
 await p.waitForTimeout(500);await p.screenshot({path:out+'/paint.png'});
 await p.evaluate(()=>__px.spy());await p.waitForTimeout(1200);await p.screenshot({path:out+'/spy.png'});
 console.log(errs.join('\n')||'no errors');await b.close()})();
