(()=>{const clean=q=>q?{cap:q.cap||"",visual:q.visual||"",opts:(q.opts||[]).map(o=>({h:o.h,say:(o.say||[])})),ans:q.ans,voice:q.voice||[],why:q.why?{t:q.why.t,v:q.why.v||[]}:null,exp:q.exp?{t:q.exp.t,v:q.exp.v||[]}:null,layout:q.layout||"",tf:!!q.tf,match:q.match?q.match.map(m=>({word:m.word,pic:m.pic,ps:m.ps,ws:m.ws})):null,game:q.game||""}:null;
const CATS=["count","add","clock","letters","read","farm","animals","world","sky","shapes","people","flags"];
const secOf=w=>{if(w.i.startsWith("px")){if(PX8[w.t])return PX8[w.t][0];return w.t==="animals"?"animals":w.t==="sky"?"sky":"world"}return {a:"animals",x:"animals",b:"world",n:"world",s:"sky",p:"sky"}[w.i[0]]||"world"};
const fixed=[];
for(const w of WQ){S.age=Math.max(3,Math.min(12,w.a));const cat=secOf(w);window.__fw=w.i;let q=null,err="";try{q=qWatcher(cat,new Set())}catch(e){err=e.message}window.__fw=null;
  fixed.push({id:w.i,src:w.i.startsWith("px")?"Paraxilingo":"Watcher pool",cat,age:w.a,topic:w.t,k:w.k,origOpts:w.o,origAns:w.n,x:w.x,q:clean(q),err,extraRandom:w.o.length===3&&!WQ_EXTRA[w.i]&&!w.oe})}
const tf=[];for(let k=0;k<16;k++){tf.push({id:"tf"+k,cat:"sky",cap:SKY_TF_T[k],ans:SKY_TF[k],x:SKY_TF_X[k],voice:["w/LULU_TF"+k]})}
const stories=[];STORIES.forEach((st,si)=>{(st.q||[]).forEach((x,k)=>{let q=null,err="";S.age=6;try{q=qStory(si,x.k!==undefined?x.k:k)}catch(e){err=e.message}stories.push({id:"st"+si+"_"+k,story:st.t||st.title||st.n||("Story "+(si+1)),q:clean(q),err})})});
const gen=[];for(const [cat,o] of Object.entries(GRADE))for(const [k,[lo,hi]] of Object.entries(o)){if(k==="w")continue;const ages=[...new Set([lo,Math.round((lo+hi)/2),hi].map(g=>Math.max(3,Math.min(12,g+5))))];const sm=[];let err="";
  for(let i=0;i<3;i++){S.age=ages[i%ages.length];let q=null;try{q=buildQ(cat,k,new Set())}catch(e){err=e.message}if(q)sm.push(Object.assign(clean(q),{age:S.age}))}
  const m=GMAP[cat+"."+k]||{};gen.push({cat,kind:k,lo,hi,src:GRADE_SRC[cat+":"+k]||"",name:m.name||k,desc:m.o||"",samples:sm,err})}
const games={};for(let a=3;a<=12;a++){S.age=a;for(const c of CATS){let fs=[];try{fs=formatsFor(c)}catch(e){}for(const f of fs){if(!f.startsWith("f_")&&!["robot","simon","piano","pairs"].includes(f))continue;const key=f;games[key]=games[key]||{f,cats:new Set(),ages:new Set(),gid:""};games[key].cats.add(c);games[key].ages.add(a);
  if(!games[key].gid){try{const q=f.startsWith("f_")?buildFormat(f,c):null;if(q)games[key].gid=q.gid||("g:"+q.game)}catch(e){}}}}}
const gl=Object.values(games).map(g=>{const m=GMAP[g.gid]||{};const ag=[...g.ages].sort((a,b)=>a-b);return {f:g.f,gid:g.gid,name:m.name||g.f.replace("f_",""),desc:m.o||"",cats:[...g.cats],amin:ag[0],amax:ag[ag.length-1]}});
return JSON.stringify({fixed,tf,stories,gen,games:gl})})()
