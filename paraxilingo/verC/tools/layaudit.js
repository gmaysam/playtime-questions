// renders every question kind of every category at several screen sizes and checks the layout
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs'),path=require('path');const root=process.argv[2];const N=+(process.argv[3]||4);
const VP=process.env.VP?JSON.parse(process.env.VP):[[390,844,'phone'],[844,390,'phoneL'],[768,1024,'ipad'],[1024,768,'ipadL'],[820,1180,'air'],[1180,820,'airL']];
(async()=>{
 const b=await chromium.launch();const errs=[];const probs={};let shots=0;
 for(const [w,h,nm] of VP){
 const p=await b.newPage({viewport:{width:w,height:h},hasTouch:true,isMobile:true,deviceScaleFactor:1});p.on('pageerror',e=>errs.push(nm+' '+e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);
   if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().split('@media (min-width:560px) and (min-height:720px)').join('@media (min-width:560px) and (min-height:720px) and (hover:hover) and (pointer:fine)').replace('let L=null;','let L=null;window.__px={buildQ:(c,k,u)=>buildQ(c,k,u),kindsFor:c=>kindsFor(c),CATS:()=>CATS,setAge:a=>{S.age=a;S.diff=1}};window.__render=q=>{L={g:0,cat:q.cat,correct:0,first:0,acorns:0,k:0,t0:Date.now(),queue:[q],total:1};$("lesson").classList.add("open");$("qDots").innerHTML="<i></i>";nextQ();askTok++;hush()};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.svg')?'image/svg+xml':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(600);await p.click('#introC').catch(()=>{});await p.waitForTimeout(1200);
 const list=await p.evaluate(()=>{const o=[];for(const c of __px.CATS()){if(["story","paint"].includes(c.id))continue;for(const a of [4,6,9]){__px.setAge(a);for(const k of __px.kindsFor(c.id))o.push([c.id,k,a])}}return o});
 const seen=new Set();
 for(const [c,k,a] of list){const key=c+k;if(seen.has(key+a))continue;seen.add(key+a);
  for(let n=0;n<N;n++){
   const r=await p.evaluate(([c,k,a])=>{__px.setAge(a);const q=__px.buildQ(c,k,new Set());if(!q||!q.opts)return null;q.cat=c;q.kind=k;window.__q=q;return true},[c,k,a]);
   if(!r)continue;
   await p.evaluate(()=>window.__render(window.__q)).catch(e=>errs.push('render '+e.message));
   await p.waitForTimeout(650);
   const bad=await p.evaluate(()=>{const B=document.getElementById('qBody');const out=[];const vw=innerWidth;
     const els=[...B.querySelectorAll('.qkick,.qtop,.qvis,.qopts')];
     for(let i=0;i<els.length;i++)for(let j=i+1;j<els.length;j++){const a=els[i].getBoundingClientRect(),b=els[j].getBoundingClientRect();if(a.bottom>b.top+2&&b.bottom>a.top+2&&a.right>b.left&&b.right>a.left)out.push('overlap '+els[i].className.split(' ')[0]+'/'+els[j].className.split(' ')[0])}
     for(const e of B.querySelectorAll('.qo,.qvis,.qtop')){const r=e.getBoundingClientRect();if(r.right>vw+1||r.left<-1)out.push('offscreen '+e.className.split(' ')[0]);
       for(const ch of e.querySelectorAll('*')){const cr=ch.getBoundingClientRect();if(cr.width&&(cr.right>r.right+3||cr.left<r.left-3||cr.bottom>r.bottom+3||cr.top<r.top-3)&&getComputedStyle(ch).position!=='absolute'&&!ch.closest('svg')){out.push('spill '+e.className.split(' ')[0]+'>'+(ch.className&&ch.className.baseVal===undefined?ch.className:ch.tagName));break}}}
     const sc=B.scrollHeight>B.clientHeight+4;if(sc)out.push('scrolls');return [...new Set(out)]});
   if(bad.length){const id=`${c}/${k}/age${a}`;for(const x of bad){const kk=nm+' | '+x;(probs[kk]=probs[kk]||new Set()).add(id)}
     if(shots<60&&!fs.existsSync(root+`/../shots/L_${nm}_${c}_${k}.png`)){await p.screenshot({path:root+`/../shots/L_${nm}_${c}_${k}.png`});shots++}}
  }}
 await p.close()}
 for(const [k,v] of Object.entries(probs).sort())console.log(k,'::',[...v].join(' '));console.log(errs.slice(0,10).join('\n')||'no errors');await b.close()})();
