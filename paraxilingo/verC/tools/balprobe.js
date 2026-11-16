const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:375,height:667},isMobile:true,hasTouch:true});
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('</head>','</head>').replace('let L=null;','let L=null;window.__go=()=>{S.age=6;let q=buildQ("read","balloon",new Set());q.style="balloon";q.cat="read";q.kind="balloon";L={g:0,cat:"read",correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");nextQ();hush()};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);await p.click('#introC').catch(()=>{});await p.waitForTimeout(800);
 await p.evaluate(()=>__go());await p.waitForTimeout(2500);await p.screenshot({path:root+'/../shots9/bal_se.png'});
 console.log(JSON.stringify(await p.evaluate(()=>{const g=document.querySelector('.qopts');const gs=getComputedStyle(g);return {grid:[gs.gridTemplateRows,gs.gridTemplateColumns,g.getBoundingClientRect().height,gs.display,gs.alignItems],
   qo:[...g.querySelectorAll('.qo')].map(e=>{const c=getComputedStyle(e),r=e.getBoundingClientRect();return [Math.round(r.top),Math.round(r.height),c.marginTop,c.transform,c.alignSelf,c.gridRowStart,c.gridColumnStart,c.position,c.top]}),hint:document.querySelector('.qhint2').getBoundingClientRect().top}})));
 await b.close()})();
