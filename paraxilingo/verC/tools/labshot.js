const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2],out=process.argv[3];
(async()=>{const b=await chromium.launch();const res=[];
 for(const [age,cat,kind,lab] of JSON.parse(process.env.G)){const p=await b.newPage({viewport:{width:375,height:667}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});let body=fs.readFileSync(fp);
   if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__go=(a,c,k)=>{S.age=a;const q=buildFormat(k,c);if(!q)return "null";q.cat=c;q.kind=k;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");nextQ();return "ok"};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
  await p.goto('http://app.test/index.html');await p.waitForTimeout(400);await p.click('#introC').catch(()=>{});await p.waitForTimeout(400);
  const r0=await p.evaluate(([a,c,k,l])=>{window.__lab=l||null;return __go(a,c,k)},[age,cat,kind,lab]);await p.waitForTimeout(1300);
  const tag=`${kind}_${lab||cat}_${age}`;await p.screenshot({path:`${out}/L_${tag}.png`});
  const fit=await p.evaluate(()=>{const les=document.getElementById('lesson').getBoundingClientRect(),o=[];document.querySelectorAll('#qBody button,#qBody .bk,#qBody .ss,#qBody .mx').forEach(e=>{const x=e.getBoundingClientRect();if(!x.width)return;if(x.right>les.right+1||x.bottom>Math.min(les.bottom,innerHeight)+1)o.push(e.className)});return o.slice(0,3)});
  await p.evaluate(()=>window.__gSolve&&window.__gSolve()).catch(e=>errs.push(e.message));await p.waitForTimeout(1500);
  const won=await p.evaluate(()=>document.getElementById('qSheet').className);res.push(`${tag} ${r0} won:${/good/.test(won)} fit:${fit.join('|')||'ok'} ${errs.join('|')}`);await p.close()}
 await b.close();console.log(res.join('\n'))})();
