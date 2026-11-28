const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2],out=root+'/../shots11';
(async()=>{const b=await chromium.launch();
 for(const [vw,vh,tag] of [[1440,900,'desk']]){
 const p=await b.newPage({viewport:{width:vw,height:vh},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push('PE '+e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={get S(){return S},showParents:()=>showParents(),evDay:()=>evDay(),GMAP:()=>GMAP};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.svg')?'image/svg+xml':f.endsWith('.woff2')?'font/woff2':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);await p.click('#introC');await p.waitForTimeout(900);
 await p.evaluate(()=>__px.showParents());await p.waitForTimeout(400);
 await p.screenshot({path:`${out}/${tag}_empty.png`,fullPage:false});
 /* TEST ONLY: simulated history, never shipped */
 await p.evaluate(()=>{const S=__px.S,t=__px.evDay(),G=Object.keys(__px.GMAP()).filter(k=>!/^(people|g:catch|g:whack)/.test(k));S.ev=[];S.evMig=1;
   for(let d=40;d>=0;d--){if(d%3===2)continue;const sk=0.45+0.4*(40-d)/40;for(let k=0;k<14;k++){const g=G[(d*7+k*5)%G.length];S.ev.push([t-d,g,Math.random()<sk?2:Math.random()<.6?1:0,1,6,""])}}});
 await p.evaluate(()=>__px.showParents());await p.waitForTimeout(400);
 const tall=async n=>{await p.evaluate(()=>{const e=document.getElementById('pSettings');e.dataset.h=e.scrollHeight});const h=await p.evaluate(()=>+document.getElementById('pSettings').dataset.h);await p.setViewportSize({width:vw,height:Math.min(h+120,9000)});await p.waitForTimeout(150);await p.screenshot({path:`${out}/${tag}_${n}.png`});await p.setViewportSize({width:vw,height:vh})};await tall('full');
 await p.evaluate(()=>document.querySelector('.donut').scrollIntoView());await p.waitForTimeout(200);await p.screenshot({path:`${out}/desk_donut.png`});await p.evaluate(()=>document.querySelector('.mbar').scrollIntoView());await p.waitForTimeout(200);await p.screenshot({path:`${out}/desk_methods.png`});await p.evaluate(()=>document.getElementById('pSettings').scrollTop=0);await p.click('.radar [data-pil="lang"] text');await p.waitForTimeout(200);await p.screenshot({path:`${out}/${tag}_tap.png`});
 await p.click('.prow[data-pil="cog"]');await p.waitForTimeout(300);await tall('cog');
 await p.click('#dBack');await p.waitForTimeout(200);await p.click('.prow[data-pil="phys"]');await p.waitForTimeout(300);await tall('phys');
 /* overlap audit on the dashboard */
 await p.click('#dBack');await p.waitForTimeout(200);
 const ov=await p.evaluate(()=>{const r=[];const W=document.documentElement.clientWidth;document.querySelectorAll('#pSettings .dash *').forEach(e=>{const b=e.getBoundingClientRect();if(b.width&&b.right>W+1)r.push(e.className+' '+Math.round(b.right))});return r.slice(0,10)});
 console.log(tag,'errors',errs,'overflow',ov);await p.close()}
 await b.close()})();
