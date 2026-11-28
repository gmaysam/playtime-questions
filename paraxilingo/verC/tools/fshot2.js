const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2],out=process.argv[3],W=+(process.argv[4]||390),H=+(process.argv[5]||844);
(async()=>{const b=await chromium.launch();
 for(const [age,cat,kind] of JSON.parse(process.env.G)){const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__go=(a,c,k)=>{S.age=a;S.day.d="";const q=k==="sky2"?qSky2(new Set()):k.startsWith("f_")?buildFormat(k,c):buildQ(c,k,new Set());q.cat=c;q.kind=k;if(k==="feel")q.style="cards";L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");nextQ()};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.woff2')?'font/woff2':undefined})});
  await p.goto('http://app.test/index.html');await p.waitForTimeout(500);await p.click('#introC').catch(()=>{});await p.waitForTimeout(600);
  await p.evaluate(([a,c,k])=>__go(a,c,k),[age,cat,kind]);await p.waitForTimeout(kind==="f_whack"||kind==="f_catch"?4500:1800);
  await p.screenshot({path:`${out}/f_${W}_${kind}_${cat}_${age}.png`});if(errs.length)console.log(kind,cat,errs.join(' | '));await p.close()}
 await b.close();console.log('done')})();
