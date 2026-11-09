const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs'),path=require('path');const root=process.argv[2],out=process.argv[3]||root+'/../shots9',W=+(process.argv[4]||390),H=+(process.argv[5]||844);
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:1});
 const errs=[];p.on('pageerror',e=>errs.push('PE '+e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);
   if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={get L(){return L},get S(){return S},openMound:(i)=>openMound(i),bq:(c,k)=>{const q=buildQ(c,k,new Set());q.cat=c;q.kind=k;return q},setAge:a=>{S.age=a;S.day.d="";save()}};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.svg')?'image/svg+xml':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);
 await p.click('#introC');await p.waitForTimeout(1200);
 for(const [age,cat,kind] of JSON.parse(process.env.G||"[]")){
   await p.evaluate(([a,c,k])=>{__px.setAge(a);__px.openMound(0);__px.L.queue=[__px.bq(c,k)];__px.L.total=1},[age,cat,kind]);
   await p.waitForTimeout(2600);await p.screenshot({path:`${out}/g_${kind}_${age}.png`});
   await p.evaluate(()=>window.__gSolve());await p.waitForTimeout(kind==="simon"||kind==="piano"?11000:3500);
   const st=await p.evaluate(()=>({sheet:document.getElementById('qSheet').className,sk:Object.keys(__px.S.sk||{}).slice(-1)[0]}));console.log(kind,age,JSON.stringify(st));
   if(kind==="pizza"&&age===8)await p.screenshot({path:`${out}/g_${kind}_win.png`});
   await p.evaluate(()=>{const c=document.getElementById('lClose');c&&c.click()});await p.waitForTimeout(500);
 }
 console.log(errs.join('\n')||'no errors');await b.close();})();
