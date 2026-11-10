const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2],out=process.argv[3],W=+(process.argv[4]||390),H=+(process.argv[5]||844);
(async()=>{const b=await chromium.launch();const res=[];
 for(const [age,cat,kind] of JSON.parse(process.env.G)){const p=await b.newPage({viewport:{width:W,height:H},hasTouch:false});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__go=(a,c,k)=>{S.age=a;S.day.d="";const q=buildFormat(k,c);if(!q)return "null";q.cat=c;q.kind=k;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");nextQ();return "ok"};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.woff2')?'font/woff2':undefined})});
  await p.goto('http://app.test/index.html');await p.waitForTimeout(500);await p.click('#introC').catch(()=>{});await p.waitForTimeout(500);
  const r0=await p.evaluate(([a,c,k])=>__go(a,c,k),[age,cat,kind]);await p.waitForTimeout(kind==="f_parade"?2500:1500);
  const tag=`${W}_${kind}_${cat}_${age}`;await p.screenshot({path:`${out}/g_${tag}.png`});
  const fit=await p.evaluate(()=>{const les=document.getElementById('lesson').getBoundingClientRect(),o=[];document.querySelectorAll('#qBody button,#qBody .pz-p,#qBody .lab-it,#qBody .mz,#qBody .ws,#qBody .bk').forEach(e=>{const x=e.getBoundingClientRect();if(!x.width)return;if(x.right>les.right+1||x.bottom>Math.min(les.bottom,innerHeight)+1||x.left<les.left-1)o.push(e.className+' '+Math.round(x.bottom))});return o.slice(0,4)});
  await p.evaluate(()=>window.__gSolve&&window.__gSolve()).catch(e=>errs.push('solve '+e.message));await p.waitForTimeout(1500);
  const won=await p.evaluate(()=>{const s=document.getElementById('qSheet');return s?s.className:'none'});
  await p.screenshot({path:`${out}/w_${tag}.png`});res.push(`${tag} ${r0} won:${/good/.test(won)} fit:${fit.join('|')||'ok'} ${errs.join('|')}`);await p.close()}
 await b.close();console.log(res.join('\n'))})();
