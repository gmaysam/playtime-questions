const {chromium}=require('/opt/npm-tools/node_modules/playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+path.resolve(process.argv[2],'index.html'));await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const o={};for(const set of ["wd","sh","pl","an"]){let n=0,bad=[];for(let t=0;t<40;t++){const q=__qm(set);q.match.forEach(x=>{n++;if(!x.ps.length)bad.push(x.word)})}o[set]={n,bad:[...new Set(bad)]}}return o});
console.log(JSON.stringify(r));await b.close()})();
