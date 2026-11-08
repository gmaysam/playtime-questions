// screenshots of the PUBLISHED build (ios Web folder = what the site serves), real device sizes
const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const root=process.argv[2];const out=process.argv[3]||'W';
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [w,h,nm] of JSON.parse(process.env.VP||'[[390,844,"phone"],[820,1180,"ipad"],[1180,820,"ipadL"]]')){
 const p=await b.newPage({viewport:{width:w,height:h},hasTouch:true,isMobile:true});p.on('pageerror',e=>errs.push(e.message));
 await p.route('http://app.test/**',r=>{let f=decodeURIComponent(new URL(r.request().url()).pathname.slice(1));const fp=path.join(root,f);if(!fs.existsSync(fp))return r.fulfill({status:404,body:''});
  let body=fs.readFileSync(fp);if(f==='index.html'){body=body.toString();const m=body.match(/let ([A-Za-z_$][\w$]*)=null;/);}r.fulfill({body,contentType:f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.js')?'text/javascript':f.endsWith('.svg')?'image/svg+xml':f.endsWith('.css')?'text/css':undefined})});
 await p.goto('http://app.test/index.html');await p.waitForTimeout(1500);await p.click('#introC',{force:true}).catch(()=>{});await p.waitForTimeout(1500);
 // open the first mound of the day like a child would
 const m=await p.$$('.mound,.mnd,[data-mound]');if(m.length)await m[0].click({force:true});await p.waitForTimeout(800);
 await p.getByText(/LET.S GO/i).first().click({force:true}).catch(e=>errs.push('go '+e.message));
 for(let i=0;i<4;i++){await p.waitForTimeout(3500);await p.screenshot({path:`shots/${out}_${nm}_${i}.png`});
   const ans=await p.$$('#qBody .qo');if(ans.length)await ans[0].click({force:true}).catch(()=>{});await p.waitForTimeout(600);const a2=await p.$$('#qBody .qo:not(.faded):not(.wrong)');for(const a of a2){await a.click({force:true}).catch(()=>{});await p.waitForTimeout(400)}await p.waitForTimeout(6000)}await p.close()}
 console.log(errs.join('\n')||'no errors');await b.close()})();
