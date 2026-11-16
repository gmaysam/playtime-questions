const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:820,height:1180}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(process.argv[2],'index.html'));await p.waitForTimeout(1500);
await p.evaluate(()=>{const i=document.getElementById('introC');i&&i.classList.add('gone')});await p.waitForTimeout(300);
await p.click('#tbCourse');await p.waitForTimeout(400);await p.screenshot({path:'shots/domi_menu.png'});
await p.click('[data-domi="4"]');await p.waitForTimeout(300);
const src=await p.evaluate(()=>[document.querySelector('.dpick.on').dataset.domi,document.querySelector('img.talk').getAttribute('src'),JSON.parse(localStorage.getItem('paraxilingo-players')).list[0].domi]);
await p.screenshot({path:'shots/domi_menu2.png'});console.log(src,errs.length?errs:'no errors');await b.close()})();
