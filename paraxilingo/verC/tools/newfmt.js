const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const errs=[];
for(const [w,h,nm] of [[390,844,'phone'],[820,1180,'air']]){
 const p=await b.newPage({viewport:{width:w,height:h},hasTouch:true,isMobile:true,deviceScaleFactor:1});p.on('pageerror',e=>errs.push(nm+' '+e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().split('@media (min-width:560px) and (min-height:720px)').join('@media (min-width:560px) and (min-height:720px) and (hover:hover) and (pointer:fine)').replace('let L=null;','let L=null;window.__px={buildQ:(c,k,u)=>buildQ(c,k,u),setAge:a=>{S.age=a;S.diff=1},WQ:()=>WQ};window.__ans=()=>{const q=L.q;document.querySelectorAll(".qo")[q.ans].click()};window.__go=(q,c)=>{q.cat=c;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,t0:Date.now(),queue:[q],total:1};$("lesson").classList.add("open");$("qDots").innerHTML="<i></i>";nextQ()};');
  r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.svg')?'image/svg+xml':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);await p.click('#introC').catch(()=>{});await p.waitForTimeout(1000);
 const shot=async n=>{await p.waitForTimeout(700);await p.screenshot({path:`shots/N_${nm}_${n}.png`})};
 for(const [c,k,n] of [['letters','match','match_wd'],['farm','match','match_an'],['shapes','match','match_sh'],['letters','listen','grid'],['clock','after','days']]){
   await p.evaluate(([c,k])=>{__px.setAge(7);__go(__px.buildQ(c,k,new Set()),c)},[c,k]);await shot(n)}
 // planets grid
 await p.evaluate(()=>{__px.setAge(6);let q;for(let i=0;i<40;i++){q=__px.buildQ('sky','w',new Set());if(q.layout==='grid4')break}__go(q,'sky')});await shot('planets');
 // match: play it right through
 await p.evaluate(()=>{__px.setAge(6);__go(__px.buildQ('farm','match',new Set()),'farm')});await p.waitForTimeout(500);
 for(let k=0;k<4;k++){const id=await p.evaluate(()=>{const b=[...document.querySelectorAll('.mc.pic:not(.ok)')][0];return b&&b.dataset.id});if(!id)break;
   await p.click(`.mc.pic[data-id="${id}"]`);await p.click(`.mc.wrd[data-id="${id}"]`);await p.waitForTimeout(400)}
 await shot('match_done');
 // true/false with the why card
 await p.evaluate(()=>{const w=__px.WQ().find(x=>x.i==='a18');__px.setAge(6);let q;for(let i=0;i<300;i++){q=__px.buildQ('animals','w',new Set());if(q.tf&&/whale/.test(q.cap))break}__go(q,'animals')});
 await p.waitForTimeout(500);await p.evaluate(()=>__ans());await shot('tf_why');
 await p.close()}
console.log(errs.join('\n')||'no errors');await b.close()})();
