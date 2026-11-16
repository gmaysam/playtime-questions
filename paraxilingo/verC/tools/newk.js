const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const errs=[],miss=new Set();
 const p=await b.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:1});p.on('pageerror',e=>errs.push(e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp)){if(f.includes('audio'))miss.add(f);return r.fulfill({status:404,body:''})}
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().split('@media (min-width:560px) and (min-height:720px)').join('@media (min-width:560px) and (min-height:720px) and (hover:hover) and (pointer:fine)').replace('let L=null;','let L=null;window.__px={buildQ:(c,k,u)=>buildQ(c,k,u),setAge:a=>{S.age=a;S.diff=1}};window.__go=(q,c)=>{q.cat=c;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,t0:Date.now(),queue:[q],total:1};$("lesson").classList.add("open");$("qDots").innerHTML="<i></i>";nextQ()};');
  r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.svg')?'image/svg+xml':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);await p.click('#introC').catch(()=>{});await p.waitForTimeout(800);
 const K=JSON.parse(process.env.K);
 for(const [c,k,a] of K){for(let n=0;n<6;n++){await p.evaluate(([c,k,a])=>{__px.setAge(a);__go(__px.buildQ(c,k,new Set()),c)},[c,k,a]);await p.waitForTimeout(n?120:2600)}await p.waitForTimeout(1500);
   await p.screenshot({path:`shots/K_${c}_${k}_${a}.png`})}
 console.log('missing audio:',[...miss].join(' ')||'none');console.log(errs.join('\n')||'no errors');await b.close()})();
