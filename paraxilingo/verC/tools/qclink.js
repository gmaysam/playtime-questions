
/* =====================================================================================================
   v20 (Nov 13): QUESTION CHECK LINKS. The parents' Question Check page opens one exact question or game here:
     #qc=w:<id>            a fixed question (px.., a01..)        #qc=tf:<k>        a sky true / not true
     #qc=st:<story>:<q>    a story question                      #qc=g:<cat>:<kind>:<age>   a generated type
     #qc=f:<game>:<cat>:<age>   a game
   Nothing is saved on this device while a check link is open (no acorns, no progress, no logs).
   ===================================================================================================== */
const QC_RE=/^#qc=([a-z]+):([^:]+)(?::([^:]+))?(?::([^:]+))?$/i;
const QCM=(location.hash||"").match(QC_RE);
if(QCM){try{Storage.prototype.setItem=function(){}}catch(e){}}
function qcSec(w){if(w.i.startsWith("px")){if(PX8[w.t])return PX8[w.t][0];return w.t==="animals"?"animals":w.t==="sky"?"sky":"world"}return {a:"animals",x:"animals",b:"world",n:"world",s:"sky",p:"sky"}[w.i[0]]||"world"}
function qcTF(k){return {gid:"skytf",tf:true,why:{t:SKY_TF_X[k],v:[]},voice:["w/LULU_TF"+k],cap:SKY_TF_T[k],visual:`<div class="bigpic">${SKY_TF_PIC(k)}</div>`,
  opts:[{h:"<span class='yn'>"+YES_B+"</span><small>True</small>",say:["w/LULU_SK_YES"]},{h:"<span class='yn'>"+NO_B+"</span><small>Not true</small>",say:["w/LULU_SK_NO"]}],ans:SKY_TF[k]?0:1,layout:"yn",hint:"again",
  exp:{t:SKY_TF_T[k]+(SKY_TF[k]?" ✅ True!":" ❌ Not true."),v:["w/LULU_ANS_IS"]}}}
/* build the question a link names; returns [question, section] */
function qcBuild(t,a,b,c){t=t.toLowerCase();
  if(t==="w"){const w=WQ.find(x=>x.i===a);if(!w)return null;S.age=Math.max(3,Math.min(12,w.a));const cat=qcSec(w);window.__fw=a;try{return [qWatcher(cat,new Set()),cat]}finally{window.__fw=null}}
  if(t==="tf")return [qcTF(+a),"sky"];
  if(t==="st"){S.age=Math.max(S.age||5,5);const si=+a,st=STORIES[si],x=st&&(st.q||[])[+b];if(!x)return null;return [qStory(si,x.k!==undefined?x.k:+b),"story"]}
  if(t==="g"){S.age=+c||S.age;return [buildQ(a,b,new Set()),a]}
  if(t==="f"){S.age=+c||S.age;return [a.startsWith("f_")?buildFormat(a,b):buildQ(b,a,new Set()),b]}
  return null}
function qcOpen(){if(!QCM)return;let r=null;try{r=qcBuild(QCM[1],decodeURIComponent(QCM[2]||""),decodeURIComponent(QCM[3]||""),decodeURIComponent(QCM[4]||""))}catch(e){r=null}
  if(!r||!r[0]){toastHint("This question could not be opened");return}
  const [q,cat]=r;q.cat=cat;L={g:0,cat,correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");$("lesson").setAttribute("aria-hidden","false");nextQ();
  if(!$("qcBand")){const d=document.createElement("div");d.id="qcBand";d.className="qc-band";d.textContent="Question check · not saved";document.body.appendChild(d)}}
window.__qcOpen=qcOpen;
/* for the Question Check page's pictures: open one question and hand back what it holds */
window.__qcShow=(t,a,b,c)=>{try{closeLesson()}catch(e){}L=null;let r=null;try{r=qcBuild(t,a,b,c)}catch(e){return {err:String(e&&e.message||e)}}if(!r||!r[0])return {err:"not built"};
  const [q,cat]=r;q.cat=cat;L={g:0,cat,correct:0,first:0,acorns:0,k:0,queue:[q],total:1};$("lesson").classList.add("open");$("lesson").setAttribute("aria-hidden","false");nextQ();hush();
  return {age:S.age,gid:q.gid||"",game:q.game||"",cap:q.cap||"",voice:q.voice||[],ans:q.ans,opts:(q.opts||[]).map(o=>({t:String(o.h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim(),say:o.say||[]})),
    why:q.why?{t:q.why.t,v:q.why.v||[]}:null,exp:q.exp?{t:q.exp.t,v:q.exp.v||[]}:null,factT:q.factT||"",factV:q.factV||[],tf:!!q.tf,match:q.match?q.match.map(m=>({t:m.word,say:[...(m.ps||[]),...(m.ws||[])]})):null}};window.__qcBuild=qcBuild;
if(QCM){const ic=$("introC");
  const go=()=>setTimeout(qcOpen,500);
  if(ic&&!ic.hidden&&!ic.classList.contains("gone"))ic.addEventListener("pointerdown",go,{once:true});
  else{const b=document.createElement("button");b.className="qc-start";b.textContent="▶ Start";b.onclick=()=>{b.remove();qcOpen()};document.body.appendChild(b)}
  window.addEventListener("hashchange",()=>location.reload())}
