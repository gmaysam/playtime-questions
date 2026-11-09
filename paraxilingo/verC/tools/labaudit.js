const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={buildQ:(c,k,u)=>buildQ(c,k,u),kindsFor:c=>kindsFor(c),CATS:()=>CATS,setAge:a=>{S.age=a;S.diff=1},FE:()=>FACT_EN,FF:q=>typeof factFor==="function"?factFor(q):"-"};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);
 const r=await p.evaluate(()=>{const out=[];
  for(const c of __px.CATS()){if(["story","paint"].includes(c.id))continue;for(const a of [4,7]){__px.setAge(a);for(const k of __px.kindsFor(c.id))for(let n=0;n<2;n++){let q;try{q=__px.buildQ(c.id,k,new Set())}catch(e){continue}if(!q||!q.opts||q.game||q.match||q.robot)continue;q.cat=c.id;q.kind=k;
   const lab=((q.opts[q.ans]||{}).h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();out.push([c.id+"/"+k,a,q.cap,lab.slice(0,40),String(q.exp&&q.exp.t||"").slice(0,50),__px.FF(q)])}}}
  return out});
 for(const x of r)console.log(x.join(" | "));await b.close()})();
