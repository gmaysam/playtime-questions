const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const fs=require('fs'),path=require('path');const root=process.argv[2];
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 const errs=[];p.on('pageerror',e=>errs.push('PE '+e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);
   if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
   let body=fs.readFileSync(fp);if(f==='index.html')body=body.toString().replace('let L=null;','let L=null;window.__px={buildQ:(c,k,u)=>buildQ(c,k,u),kindsFor:c=>kindsFor(c),CATS:()=>CATS,setAge:a=>{S.age=a;S.diff=1}};');
   r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(1500);
 const out=await p.evaluate(()=>{const res=[];const sig=h=>(h||"").replace(/<small[^>]*>.*?<\/small>/g,"").replace(/\s+/g," ").trim();const EN=/LULU_EN\d|LULU_EN_|PX_EN_|LULU_WORD\d|LULU_LN_|SIGHT|LULU_PL\d|LULU_COLOR\d|LULU_SK_YES|LULU_SK_NO/;
   for(const c of __px.CATS()){if(["story","paint"].includes(c.id))continue;
    for(let a=3;a<=10;a++){__px.setAge(a);for(const k of __px.kindsFor(c.id)){for(let n=0;n<25;n++){let q;try{q=__px.buildQ(c.id,k,new Set())}catch(e){res.push({c:c.id,k,err:String(e)});continue}
      if(!q||!q.opts)continue;{const sg=q.opts.map(o=>sig(o.h));if(new Set(sg).size<sg.length)res.push({c:c.id,k,dup:sg.join(" ~ ").slice(0,160)})}for(const o of q.opts){const s=(o.say||[]).filter(Boolean);const lab=(o.h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
        const kinds=s.map(x=>/YA$/.test(x)?"":EN.test(x)?"E":"F").filter(Boolean).join("");
        res.push({c:c.id,k,lab,kinds,s:s.join(" ")})}}}}}
   return res});
 const bad={};for(const r of out){if(r.dup){bad["DUP | "+r.c+"/"+r.k+" | "+r.dup]=1;continue}if(r.err){bad['ERR '+r.c+' '+r.k+' '+r.err]=1;continue}
   if(['read'].includes(r.c))continue;
   let why=null;if(r.kinds==='')why='silent';else if(r.kinds[0]==='E'&&r.kinds.includes('F'))why='EN first';else if(!r.kinds.includes('F'))why='EN only';else if(!r.kinds.includes('E'))why='FA only';
   if(why){const key=`${why} | ${r.c}/${r.k} | ${r.lab}`;bad[key]=r.s}}
 const ks=Object.keys(bad).sort();console.log(ks.length);for(const k of ks)console.log(k,'=>',bad[k]);console.log(errs.join('\n'));await b.close()})();
