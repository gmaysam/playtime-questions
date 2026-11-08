const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={buildQ:(c,k,u)=>buildQ(c,k,u),kindsFor:c=>kindsFor(c),CATS:()=>CATS,setAge:a=>{S.age=a;S.diff=1},STORIES:typeof STORIES!=="undefined"?STORIES:[],radio:typeof radioQ};');r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(800);
 const res=await p.evaluate(()=>{const tok=h=>{const t=new Set();(h||"").replace(/src="([^"]+)"/g,(m,x)=>t.add(x));(h||"").replace(/<[^>]+>/g," ").match(/\p{Extended_Pictographic}(️|‍\p{Extended_Pictographic})*/gu)?.forEach(x=>t.add(x));return t};
  const out={};for(const c of __px.CATS()){if(["story","paint"].includes(c.id))continue;for(const a of [3,5,6,8]){__px.setAge(a);for(const k of __px.kindsFor(c.id))for(let n=0;n<25;n++){let q;try{q=__px.buildQ(c.id,k,new Set())}catch(e){continue}
   if(!q||!q.opts||q.ans<0)continue;const v=tok(q.visual),at=tok(q.opts[q.ans].h);const others=q.opts.filter((o,i)=>i!==q.ans).map(o=>tok(o.h));
   for(const x of at){if(v.has(x)&&!others.every(o=>o.has(x))){const key=c.id+'/'+k;out[key]=(out[key]||0)+1;if(!out[key+'#ex'])out[key+'#ex']=(q.cap||'')+' :: '+x;break}}}}}return out});
 console.log(JSON.stringify(res,null,1));await b.close()})();
