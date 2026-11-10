
/* =====================================================================================================
   Nov 10d: LEARN WITH LULU - for the youngest (age 3, and half of each round at age 4): show & tell first,
   then do it together (count, say the letters, name things), and only a gentle "your turn" now and then.
   Nothing can be wrong here: a wrong tap just shows the right one.
   ===================================================================================================== */
const LRN_READY=__LRNVOICE__,LV=n=>"w/PX_LRN_"+n;
const BIGPIC=(h,cls="")=>`<span class="lr-pic ${cls}">${h}</span>`;
const CNT_OBJ=["🍎","🐥","⭐","🎈","🐟","🌸","🚗","🍓"];
/* things to show, by section: {p: picture html, n: name, say: clips, f: fact text} */
function lrThings(cat){const a=S.age,F=n=>FACT_EN[n]||"";
  if(cat==="count"||cat==="add"||cat==="clock"){const top=a<=3?5:10;return Array.from({length:top},(_,i)=>{const n=i+1,o=CNT_OBJ[n%CNT_OBJ.length];
    return {p:`<b class="lr-num">${n}</b><span class="lr-row">${o.repeat(n)}</span>`,n:String(n),say:both(n),f:"",obj:o,num:n}})}
  if(cat==="letters"||cat==="read"){const ab="ABCDEFGHIJKLMNOPRSTW".split("");return ab.map(L=>{const w=WORDS.find(x=>x.w[0].toUpperCase()===L&&x.w.length<=6);
    return w?{p:`<b class="lr-let">${L}<small>${L.toLowerCase()}</small></b><img src="img/w/wd_${w.i}.png" alt="">`,n:`${L} is for ${cap1(w.w)}`,say:[...lSay(L),LV("LIKE"),...wSay(w)],f:"",L}:null}).filter(Boolean)}
  if(cat==="animals"||cat==="farm")return AN.map(([n,e])=>({p:`<span class="lr-emo">${e}</span>`,n:cap1(n),say:anSay(n),f:F(n)}));
  if(cat==="sky")return SKYN.slice(0,11).map((n,i)=>({p:`<img src="img/w/sky_${i}.png" alt="">`,n:cap1(n),say:skySay(n),f:F(n)})).filter(x=>x.say.length);
  if(cat==="shapes")return [0,1,2,3,4,5].map(i=>({p:`<img src="img/w/shape_${i}.png" alt="">`,n:SHAPES[i],say:shSay(i),f:""}));
  if(cat==="people")return JOBS.slice(0,10).map(([n,e],i)=>({p:`<span class="lr-emo">${e}</span>`,n,say:jobSay(i),f:""}));
  if(cat==="flags")return COUNTRIES.map(([n,e],i)=>({p:`<span class="lr-emo">${e}</span>`,n:n.replace(/^the /,"The "),say:ctySay(i),f:""}));
  if(cat==="world")return WORDS.filter(w=>FACT_EN[w.w]).slice(0,30).map(w=>({p:`<img src="img/w/wd_${w.i}.png" alt="">`,n:cap1(w.w),say:wSay(w),f:F(w.w)}));
  return null}
const LRN_CATS=["count","add","clock","letters","read","animals","farm","sky","shapes","people","flags","world"];
const lrOn=cat=>LRN_READY&&S.age<=4&&LRN_CATS.includes(cat);
/* the round: age 3 = 4 show & tell, 2 together, 1 gentle "your turn"; age 4 = half of the usual round */
const _pr0=planRound;
planRound=function(cat,count){if(!lrOn(cat))return _pr0(cat,count);
  const learn=S.age<=3?["f_lshow","f_ltog","f_lshow","f_lfind","f_lshow","f_ltog","f_lshow"]:["f_lshow","f_ltog","f_lfind"];
  if(S.age<=3)return learn.slice(0,count).concat(Array(Math.max(0,count-learn.length)).fill("f_lshow"));
  const base=_pr0(cat,count)||Array.from({length:count},()=>pickOne(kindsFor(cat)));const out=base.slice();
  [0,2,4].forEach((pos,j)=>{if(pos<out.length)out[pos]=learn[j]});return out};
const _bf2=buildFormat;
buildFormat=function(kind,cat){if(kind==="f_lshow")return qLShow(cat);if(kind==="f_ltog")return qLTog(cat);if(kind==="f_lfind")return qLFind(cat);return _bf2(kind,cat)};
function qLShow(cat){const T=lrThings(cat);if(!T)return null;const used=L&&L.lrUsed||(L&&(L.lrUsed=new Set()))||new Set();
  let pool=T.filter(t=>!used.has(t.n));if(pool.length<3)pool=T;
  const pick=cat==="count"||cat==="add"||cat==="clock"?(()=>{const s=ri(0,Math.max(0,pool.length-3));return pool.slice(s,s+3)})():sh(pool).slice(0,3);pick.forEach(t=>used.add(t.n));
  return {game:"lshow",items:pick,voice:[LV("LOOK")],gid:"learn.show",factT:"You learned: "+pick.map(t=>t.n.replace(/ is for .*/,"")).join(", ")+"!"}}
function qLTog(cat){const T=lrThings(cat);if(!T)return null;
  if(cat==="count"||cat==="add"||cat==="clock"){const n=ri(3,S.age<=3?5:8);return {game:"ltog",mode:"count",n,o:pickOne(CNT_OBJ),voice:[LV("COUNT")],gid:"learn.count",factT:`We counted to ${n}!`}}
  if(cat==="letters"||cat==="read"){const ab="ABCDEFGHIJKLMNOPQRSTUVWXYZ",s=ri(0,ab.length-5);return {game:"ltog",mode:"abc",ls:ab.slice(s,s+5).split(""),voice:[LV("ABC")],gid:"learn.abc",factT:ab.slice(s,s+5).split("").join(", ")+"!"}}
  if(cat==="shapes"){const c=sh(PAINT_COLORS.filter(x=>!["black","white","brown"].includes(x[0]))).slice(0,4);return {game:"ltog",mode:"color",c,voice:[LV("COLOR")],gid:"learn.names",factT:c.map(x=>cap1(x[0])).join(", ")+"!"}}
  const it=sh(T).slice(0,4);return {game:"ltog",mode:"names",items:it,voice:[LV("NAMES")],gid:"learn.names",factT:it.map(t=>t.n).join(", ")+"!"}}
function qLFind(cat){const T=lrThings(cat);if(!T||T.length<2)return null;const [t,o]=sh(T).slice(0,2),pair=sh([t,o]);
  return {game:"lfind",t,pair,voice:[...t.say,LV("FIND")],gid:"learn.find",factT:t.f||"That is the "+t.n+"!"}}
/* ---- show & tell: one thing at a time, tap to hear again, then next ---- */
function lshowQ(q){let k=0;
  const draw=()=>{const t=q.items[k];gShow(`<div class="game lrn">${gHead("👀","Look and listen","Look and listen!")}<button class="lr-card" id="lrC">${BIGPIC(t.p)}<b class="lr-name">${t.n}</b>${t.f?`<span class="lr-fact">💡 ${t.f}</span>`:""}</button>
    <div class="lr-dots">${q.items.map((_,j)=>`<i class="${j<k?"done":j===k?"on":""}"></i>`).join("")}</div><button class="lr-next" id="lrN" disabled>➜</button></div>`);
    const play=()=>{hush();$("lrN").disabled=true;sayseq([LV("LOOK"),...t.say,...factV(t.f)],()=>{if($("lrN"))$("lrN").disabled=false})};
    $("lrC").onclick=()=>{sfx.tap();$("lrC").classList.remove("pulse");void $("lrC").offsetWidth;$("lrC").classList.add("pulse");play()};
    $("lrN").onclick=()=>{sfx.tap();hush();k++;if(k<q.items.length)draw();else gameWin(q,0,$("lrC"),[])};setTimeout(()=>{if(L&&L.q===q)play()},350)};
  draw();window.__gSolve=()=>{k=q.items.length-1;hush();gameWin(q,0,$("lrC"),[])}}
/* ---- do it together: every tap lights the next one and Lulu says it ---- */
function ltogQ(q){let k=0;const m=q.mode;
  const items=m==="count"?Array.from({length:q.n},()=>`<span class="lr-emo sm">${q.o}</span>`):m==="abc"?q.ls.map(l=>`<b class="lr-let sm">${l}</b>`):m==="color"?q.c.map(c=>`<span class="lr-blob" style="--c:${c[1]}"></span>`):q.items.map(t=>BIGPIC(t.p,"sm"));
  const sayK=j=>m==="count"?both(j+1):m==="abc"?lSay(q.ls[j]):m==="color"?both(q.c[j][0]):q.items[j].say;
  const lab=j=>m==="count"?j+1:m==="abc"?q.ls[j]:m==="color"?q.c[j][0]:q.items[j].n;
  gShow(`<div class="game lrn">${gHead("🤝","Together",{count:"Let's count together!",abc:"Let's say the letters!",color:"Let's name the colours!",names:"Let's say their names!"}[m])}
    <div class="lr-tog ${m}">${items.map((h,j)=>`<button class="lr-t" data-j="${j}">${h}<small></small></button>`).join("")}</div><div class="lr-big" id="lrBig"></div></div>`);
  gAsk(q);const B=[...$("qBody").querySelectorAll(".lr-t")];let hintT=null;
  const hint=()=>{clearTimeout(hintT);B.forEach((b,j)=>b.classList.toggle("next",j===k));hintT=setTimeout(()=>{if(L&&L.q===q&&!q.done&&B[k])B[k].classList.add("wig")},3200)};
  const tap=j=>{if(q.done)return;if(j!==k){B[k].classList.add("wig");return}const b=B[k];b.classList.add("lit");b.querySelector("small").textContent=lab(k);$("lrBig").textContent=m==="count"?k+1:"";sfx.tap();hush();
    const last=k===B.length-1;sayseq(sayK(k),()=>{if(last&&!q.done){q.done=true;clearTimeout(hintT);sayseq(m==="count"?[LV("ALL"),...both(q.n)]:[LV("DONE")],()=>gameWin(q,0,$("lrBig"),[]))}});k++;if(!last)hint()};
  B.forEach((b,j)=>b.onclick=()=>tap(j));setTimeout(hint,1600);
  window.__gSolve=()=>{q.done=true;gameWin(q,0,$("lrBig"),[])}}
/* ---- gentle "your turn": two big pictures, a wrong tap simply shows the right one ---- */
function lfindQ(q){let miss=0;
  gShow(`<div class="game lrn">${gHead("🙋","Your turn",`Can you find the ${q.t.n.replace(/ is for .*/,"")}?`)}<div class="lr-two">${q.pair.map((t,j)=>`<button class="lr-p" data-j="${j}">${BIGPIC(t.p)}<b>${t.n}</b></button>`).join("")}</div></div>`);
  gAsk(q);const B=[...$("qBody").querySelectorAll(".lr-p")];
  B.forEach(b=>b.onclick=()=>{if(q.done)return;const t=q.pair[+b.dataset.j];
    if(t===q.t){b.classList.add("ok");gameWin(q,miss,b,[])}
    else{miss++;q.done=true;hush();b.classList.add("soft");const r=B.find(x=>q.pair[+x.dataset.j]===q.t);
      sayseq([LV("THATS"),...t.say],()=>{r.classList.add("ok","show");sayseq([...q.t.say,LV("HERE")],()=>{q.done=false;gameWin(q,1,r,[])})})}});
  window.__gSolve=()=>B.find(x=>q.pair[+x.dataset.j]===q.t).click()}
Object.assign(GAMES,{lshow:lshowQ,ltog:ltogQ,lfind:lfindQ});
const _ff1=formatsFor0;formatsFor0=function(cat){const b=_ff1(cat);return lrOn(cat)?[...b,"f_lshow","f_ltog","f_lfind"]:b};
