const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs'),path=require('path');
const root=process.argv[2];
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 const errs=[];p.on('pageerror',e=>errs.push('PE '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push('CE '+m.text())});
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1))||'index.html';const fp=path.join(root,f);
   if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={get L(){return L},get S(){return S},openMound:(i)=>openMound(i),dayPlan:()=>dayPlan(),showParents:()=>showParents(),showPrizes:()=>showPrizes(),openHouse:()=>openHouse()};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(1200);
 await p.screenshot({path:root+'/../shots/c_intro.png'});
 await p.click('#inGo');await p.waitForTimeout(1500);
 await p.screenshot({path:root+'/../shots/c_map.png'});
 console.log('plan',JSON.stringify(await p.evaluate(()=>__px.dayPlan())));
 // play each mound by answering correctly where possible / random clicks
 const n=(await p.evaluate(()=>__px.dayPlan().length));
 for(let i=0;i<n;i++){
   await p.evaluate(i=>__px.openMound(i),i);await p.waitForTimeout(700);
   for(let k=0;k<40;k++){
     const st=await p.evaluate(()=>{const L=__px.L;if(!L)return 'none';if(!document.getElementById('result').hidden)return 'result';return L.ex?L.ex.type:'?'});
     if(st==='result'||st==='none')break;
     if(k<3)await p.screenshot({path:root+`/../shots/c_m${i}_${k}.png`});
     // try skip button path: use fb flow
     const fbShown=await p.evaluate(()=>document.getElementById('fb').classList.contains('show'));
     if(fbShown){await p.click('#fbBtn').catch(()=>{});await p.waitForTimeout(500);continue}
     if(st==='radio'){await p.evaluate(()=>{document.getElementById('rDone').disabled=false});await p.click('#rDone');await p.waitForTimeout(600);continue}
     const btn=await p.$('#lBody .ans:not([disabled])');
     if(btn){await btn.click();await p.waitForTimeout(400);const ck=await p.$('#lCheck:not([disabled])');if(ck&&await ck.isVisible()){await ck.click()}await p.waitForTimeout(900);continue}
     const sk=await p.$('#lSkip');if(sk&&await sk.isVisible()){await sk.click();await p.waitForTimeout(900);continue}
     await p.waitForTimeout(800);
   }
   await p.screenshot({path:root+`/../shots/c_res${i}.png`});
   const rb=await p.$('#resBtn');if(rb)await rb.click();await p.waitForTimeout(2600);
   const rv=await p.$('#rvOk');if(rv){await p.waitForTimeout(2200);await p.screenshot({path:root+`/../shots/c_reveal${i}.png`});await rv.click();await p.waitForTimeout(800)}
 }
 await p.screenshot({path:root+'/../shots/c_mapdone.png'});
 console.log('S',JSON.stringify(await p.evaluate(()=>{const S=__px.S;return {a:S.acorns,w:S.wood,st:S.stickers,day:{d:S.day.done,h:S.day.house}}})));
 await p.click('#tbPrizes');await p.waitForTimeout(500);await p.screenshot({path:root+'/../shots/c_prizes.png',fullPage:false});
 await p.evaluate(()=>__px.showParents());await p.waitForTimeout(500);await p.screenshot({path:root+'/../shots/c_parents.png'});
 console.log(errs.join('\n')||'no errors');await b.close();
})();
