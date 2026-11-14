// every question kind + format + game, at phone, small phone, desktop frame and iPad: everything tappable must be fully on screen, no scrolling needed
const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2],shots=process.argv[3];
const VP=process.env.VP?JSON.parse(process.env.VP):[[375,667,'se',0],[1440,900,'desk',0],[1024,1366,'ipad',1]];
(async()=>{const b=await chromium.launch();const bad=[];
 for(const [W,H,nm,ipad] of VP){const p=await b.newPage({viewport:{width:W,height:H},hasTouch:!!ipad});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   let body=fs.readFileSync(fp);if(f==='index.html'){body=body.toString().replace('</head>','<style>*,*::before,*::after{animation-duration:0s!important;transition:none!important}</style></head>');
     if(ipad){body=body.split('@media (min-width:560px) and (min-height:720px)').join('@media (min-width:560px) and (min-height:720px) and (hover:hover) and (pointer:fine)').replace(/@media (\([^{]*?) and \(max-height:719px\)\{/g,(m,a)=>`@media ${a} and (max-height:719px), ${a} and (hover:none){`)}
     body=body.replace('let L=null;','let L=null;window.__list=()=>{const o=[];for(const c of CATS){if(["story","paint"].includes(c.id))continue;for(const k of new Set([...kindsFor(c.id),...formatsFor(c.id)]))o.push([c.id,k])}return o};window.__go=(a,c,k)=>{S.age=a;S.day.d="";const q=k.startsWith("f_")?buildFormat(k,c):buildQ(c,k,new Set());if(!q)return false;q.cat=c;q.kind=k;L={g:0,cat:c,correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");nextQ();return true};')}
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.woff2')?'font/woff2':f.endsWith('.svg')?'image/svg+xml':undefined})});
  await p.goto('http://app.test/index.html');await p.waitForTimeout(500);await p.click('#introC').catch(()=>{});await p.waitForTimeout(600);
  const list=(await p.evaluate(()=>__list())).filter(x=>!process.env.CATS||process.env.CATS.split(',').includes(x[0]));
  for(const [c,k] of list)for(const a of [4,8]){const ok=await p.evaluate(([a,c,k])=>{try{return __go(a,c,k)}catch(e){return "ERR "+e.message}},[a,c,k]);if(ok!==true){if(ok)bad.push(`${nm} ${c}/${k}@${a}: ${ok}`);continue}
   await p.waitForTimeout(k==="f_whack"||k==="f_catch"?1500:700);
   const r=await p.evaluate(()=>{const les=document.getElementById('lesson'),lr=les.getBoundingClientRect(),vh=Math.min(lr.bottom,innerHeight),vw=Math.min(lr.right,innerWidth),out=[];
     les.querySelectorAll('button,[data-j],[data-k],.qo,.odb,.drop,.qcheck,#qNext').forEach(e=>{if(e.closest('.sheet')||e.closest('[hidden]')||e.closest('.st-balloon,.st-fish')||e.matches('.qhint2'))return;const s=getComputedStyle(e);if(s.visibility==='hidden'||s.display==='none'||+s.opacity===0)return;const x=e.getBoundingClientRect();if(!x.width||!x.height)return;
       if(x.left<lr.left-1||x.right>vw+1||x.bottom>vh+1||x.top<lr.top-1)out.push((e.id||e.className||e.tagName).toString().slice(0,30)+` [${Math.round(x.left)},${Math.round(x.top)},${Math.round(x.right)},${Math.round(x.bottom)}]`)});
     const qb=document.getElementById('qBody');return {out:[...new Set(out)].slice(0,4),scroll:qb&&qb.scrollHeight>qb.clientHeight+4?qb.scrollHeight-qb.clientHeight:0,vw,vh}});
   if(r.out.length||r.scroll>8){bad.push(`${nm} ${c}/${k}@${a}: ${r.out.join(' ')}${r.scroll?' scroll+'+r.scroll:''}`);if(shots)await p.screenshot({path:`${shots}/fit_${nm}_${c}_${k}_${a}.png`}).catch(()=>{})}}
  if(errs.length)bad.push(nm+' errors: '+[...new Set(errs)].slice(0,3).join(' | '));await p.close()}
 console.log(bad.length+' layout problems');bad.forEach(x=>console.log(' -',x));await b.close()})();
