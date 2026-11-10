window.__fe=()=>{const F=new Map(),add=(t,src,voiced)=>{t=String(t||"").replace(/<[^>]+>/g,"").trim();if(t.length<8)return;const o=F.get(t)||{t,src,voiced:false,n:0};o.n++;if(voiced)o.voiced=true;F.set(t,o)};
 const take=(q,tag)=>{if(!q)return;if(q.factT){add(q.factT,tag,false);return}if(!q.opts||q.match||q.robot||q.game)return;
   let why=q.why?Object.assign({},q.why):null;if(!why&&q.fact&&q.exp&&q.exp.t)why={t:q.exp.t,v:[]};
   const lab=((q.opts[q.ans]||{}).h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().toLowerCase(),fe=factFor(q);
   if(fe){if(!why){const et=String(q.exp&&q.exp.t||"").trim();why={t:et.length>2&&et.toLowerCase()!==lab&&!fe.includes(et)?et:"",v:[]}}if(!why.f&&!(why.t||"").includes(fe))why.f=fe}
   if(why){const v=(why.v||[]).filter(c=>c&&!/LULU_ANS_IS/.test(c));if(why.t)add(why.t,tag+":t",v.length>0);if(why.f)add(why.f,tag+":f",false)}else add(q.exp&&q.exp.t,tag+":exp",false)};
 WQ.forEach(w=>{window.__fw=w.i;const c=/^[sp]/.test(w.i)?"sky":/^[ax]/.test(w.i)?"animals":"world";const R=Math.random;Math.random=()=>.9;try{const q=qWatcher(c,new Set());q.cat=c;q.kind="w";take(q,"w")}catch(e){}Math.random=R;window.__fw=null});
 for(let k=0;k<16;k++){const u=new Set([...Array(16).keys()].filter(i=>i!==k).map(i=>"tf"+i));const R=Math.random;Math.random=()=>.1;const q=qWatcher("sky",u);Math.random=R;take(q,"skytf")}
 for(const c of CATS){if(["story","paint"].includes(c.id))continue;for(const a of [3,5,7,9]){S.age=a;S.diff=1;for(const k of kindsFor(c.id))for(let i=0;i<25;i++){let q;try{q=buildQ(c.id,k,new Set())}catch(e){continue}if(!q)continue;q.cat=c.id;q.kind=k;take(q,c.id+"/"+k)}
   for(const k of formatsFor(c.id))if(k.startsWith("f_"))for(let i=0;i<25;i++){let q;try{q=buildFormat(k,c.id)}catch(e){continue}take(q,c.id+"/"+k)}}}
 for(let i=0;i<200;i++){const q=qSky2(new Set());if(q)take(q,"sky2")}
 return [...F.values()]};
