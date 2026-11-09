const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__d=()=>{const o=[];WQ.forEach(w=>{const v=w.k==="tf"?wEmoji(w):(w.p&&PIC_E[w.p])||"";o.push([w.i,w.t,w.a,w.k,(QFIX[w.i]||{}).q||w.q,((QFIX[w.i]||{}).o||w.o||[]).map((x,j)=>(j===w.n?"*":"")+x+(optE(x)?"["+optE(x)+"]":"")).join(" / "),w.x,"pic:"+(w.p||"")+" "+v])});SKY_TF_T.forEach((t,k)=>o.push(["skytf"+k,"sky",0,"tf",t,SKY_TF[k]?"*True":"*Not true",SKY_TF_X[k],SKY_TF_E[k]]));return o};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);
 const r=await p.evaluate(()=>__d());for(const x of r)console.log(x.join(" | "));await b.close()})();
