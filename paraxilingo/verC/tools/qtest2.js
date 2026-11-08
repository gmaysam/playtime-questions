const {chromium,devices}=require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs'),path=require('path');const root=process.argv[2],age=+(process.argv[3]||6);
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
 const errs=[],missing=new Set();p.on('pageerror',e=>errs.push('PE '+e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);
   if(!fs.existsSync(fp)){missing.add(f);return r.fulfill({status:404,body:''})}
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={get L(){return L},get S(){return S},openMound:(i)=>openMound(i),dayPlan:()=>dayPlan(),setAge:a=>{S.age=a;S.day.d="";save()}};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.svg')?'image/svg+xml':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);
 await p.screenshot({path:root+'/../shots/q_intro.png'});
 await p.evaluate(a=>__px.setAge(a),age);
 await p.click('#introC');await p.waitForTimeout(1500);
 const plan=await p.evaluate(()=>__px.dayPlan());console.log(JSON.stringify(plan));
 let shot=0;
 for(let i=0;i<plan.length;i++){
   await p.evaluate(i=>__px.openMound(i),i);await p.waitForTimeout(700);
   let wrongDone=false;
   for(let k=0;k<40;k++){
     const st=await p.evaluate(()=>{const L=__px.L;if(!L)return 'none';if(!document.getElementById('qResult').hidden)return 'result';if(document.getElementById('qSheet').classList.contains('show'))return 'sheet';if(document.getElementById('rDone'))return 'radio';if(document.getElementById('pCanvas'))return 'paint';return L.q&&!L.q.locked?'q':'wait'});
     if(st==='result'||st==='none')break;
     if(st==='sheet'){if(shot<40){await p.screenshot({path:root+`/../shots/q_${String(shot++).padStart(2,'0')}_sheet.png`})}await p.click('#qNext');await p.waitForTimeout(500);continue}
     if(st==='radio'){await p.screenshot({path:root+`/../shots/q_${String(shot++).padStart(2,'0')}_radio.png`});await p.evaluate(()=>{document.getElementById('rDone').disabled=false});await p.click('#rDone');await p.waitForTimeout(600);continue}
     if(st==='paint'){await p.screenshot({path:root+'/../shots/q_paint0.png'});const rg=await p.$$('#pCanvas .rg');const pots=await p.$$('.pot');for(let r=0;r<rg.length;r++){await pots[r%pots.length].click({force:true});await rg[r].dispatchEvent('click');}await p.waitForTimeout(300);await p.screenshot({path:root+'/../shots/q_paint1.png'});await p.click('#pDone',{force:true});await p.waitForTimeout(800);continue}
     if(st==='wait'){await p.waitForTimeout(400);continue}
     if(await p.$('#qBody .mboard')){const ids=await p.evaluate(()=>[...document.querySelectorAll('.mc.pic:not(.ok)')].map(b=>b.dataset.id));for(const id of ids){await p.click(`.mc.pic[data-id="${id}"]`,{force:true});await p.click(`.mc.wrd[data-id="${id}"]`,{force:true});await p.waitForTimeout(300)}await p.waitForTimeout(1200);continue}
     const info=await p.evaluate(()=>({ans:__px.L.q.ans,n:__px.L.q.opts.length,kind:__px.L.q.kind,cat:__px.L.cat,tries:__px.L.q.tries}));
     if(shot<40&&info.tries===0)await p.screenshot({path:root+`/../shots/q_${String(shot++).padStart(2,'0')}_${info.cat}_${info.kind}.png`});
     const opts=await p.$$('#qBody .qo:not(.faded)');
     if(!wrongDone&&i%2===0){ // try wrong twice on the first question of every other mound
       const w=[];for(const o of opts){const j=+(await o.getAttribute('data-j'));if(j!==info.ans)w.push(o)}
       if(w.length){await w[0].click({force:true});await p.waitForTimeout(info.tries===0?300:900);
         if(info.tries===0){await p.waitForTimeout(2500);if(shot<40)await p.screenshot({path:root+`/../shots/q_${String(shot++).padStart(2,'0')}_hint.png`})}
         else wrongDone=true;continue}
     }
     for(const o of opts){if(+(await o.getAttribute('data-j'))===info.ans){await o.click({force:true});break}}
     await p.waitForTimeout(700);
   }
   if(i===0)await p.screenshot({path:root+'/../shots/q_result.png'});
   const rb=await p.$('#resBtn');if(rb)await rb.click({force:true});await p.waitForTimeout(2500);
   const rv=await p.$('#rvOk');if(rv){await rv.click({force:true});await p.waitForTimeout(600)}
 }
 console.log('S',JSON.stringify(await p.evaluate(()=>{const S=__px.S;return {a:S.acorns,w:S.wood,st:S.stickers.length,done:S.day.done,h:S.day.house}})));
 console.log('missing',[...missing].join(' '));console.log(errs.join('\n')||'no errors');await b.close();})();
