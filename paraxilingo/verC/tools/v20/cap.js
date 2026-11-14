const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');
const APP=process.argv[2],L=JSON.parse(fs.readFileSync(process.argv[3])),W=+process.argv[4],N=+process.argv[5],OUT=process.argv[6];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const res={};
await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(APP,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});r.fulfill({body:fs.readFileSync(fp),contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
await p.goto('http://app.test/index.html#qc=tf:0');await p.waitForTimeout(900);await p.click("#introC").catch(()=>{});await p.waitForTimeout(900);
await p.evaluate(()=>{const s=document.createElement("style");s.textContent=".qc-band{display:none!important}*{animation-duration:0s!important;transition:none!important}";document.head.appendChild(s)});
for(let i=W;i<L.length;i+=N){const it=L[i];let r;try{r=await p.evaluate(a=>window.__qcShow(...a),it.a)}catch(e){r={err:String(e.message)}}
  await p.waitForTimeout(it.game?2200:700);const f=OUT+"/"+i+".png";try{await p.screenshot({path:f})}catch(e){}
  res[it.id]=r}
fs.writeFileSync(OUT+"/res_"+W+".json",JSON.stringify(res));await b.close();console.log("done",W)})();
