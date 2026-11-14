
/* =====================================================================================================
   v20 (Nov 13): SPACE RUN - fly the rocket through the gate with the right answer.
   The gates hold the answers to the section's own questions (same questions, same voices as the classic ones).
   Steer by dragging (or the arrow keys), dodge the rocks, collect stars. Faster, with more lanes and rocks, as the child grows.
   ===================================================================================================== */
const G11_READY=__G11VOICE__,G11=n=>"w/PX_G11_"+n;
/* a gate question: a classic question of this section whose answers are short and all spoken */
function shGate(cat,used){const ks=sh(kindsFor(cat));
  for(let t=0;t<24;t++){const k=ks[t%ks.length];let q=null;try{q=buildQ(cat,k,used)}catch(e){q=null}
    if(!q||q.game||q.match||q.flash||!q.opts||q.opts.length<2||!(q.ans>=0)||q.layout==="match")continue;
    if(q.opts.some(o=>!o.say||!o.say.length||!o.h||o.h.length>420))continue;
    if(!q.voice||!q.voice.length)continue;
    const key=q.wid||q.cap;if(used.has(key))continue;used.add(key);q.kind=k;return q}
  return null}
function qShuttle(cat){if(!G11_READY)return null;const a=lvl(),used=new Set(),n=a<=6?3:4,gates=[];
  for(let i=0;i<n;i++){const g=shGate(cat,used);if(!g)break;gates.push(g)}
  if(gates.length<2)return null;
  const lanes=a<=5?2:a<=8?3:4;
  return {game:"shuttle",gid:"g:shuttle",gates,lanes,cat,
    travel:a<=5?9000:a<=7?7500:a<=9?6000:4800,       /* ms for a gate to reach the rocket */
    rockEvery:a<=5?0:a<=7?2600:a<=9?1900:1400,        /* the youngest children get no rocks */
    voice:[G11("ROCKET")],factT:"Rockets need a lot of power to fly into space.",factV:["w/PX_FY_188"]}}
function shuttleQ(q){const N=q.lanes;
  gShow(`<div class="game">${gHead("🚀","Space run",`Fly through the right answer`)}
    <div class="shu-top"><div class="shu-q" id="shQ"></div><div class="shu-sc"><span id="shG"></span><span class="shu-st">⭐ <b id="shS">0</b></span></div></div>
    <div class="shu-f" id="shF"><div class="shu-sky"></div><div class="shu-sky b"></div><div class="shu-gate" id="shGate"></div><div class="shu-r" id="shR"><span>🚀</span><i class="shu-fl"></i></div></div></div>`);
  const F=$("shF"),R=$("shR"),GT=$("shGate");let gi=0,miss=0,gmiss=0,stars=0,rx=50,ty=50,gy=-30,moving=false,raf=0,lastT=0,rockT=0,starT=0,objs=[],hitT=0,cur=null,lanes=[];
  F.style.touchAction="none";
  const laneX=i=>(i+.5)*100/N,myLane=()=>Math.max(0,Math.min(N-1,Math.floor(rx/100*N)));
  const setR=()=>{R.style.left=rx+"%";R.style.transform=`translateX(-50%) rotate(${Math.max(-18,Math.min(18,(ty-rx)*.6))}deg)`};
  const mv=e=>{const r=F.getBoundingClientRect();ty=Math.max(6,Math.min(94,(e.clientX-r.left)/r.width*100))};
  F.onpointerdown=e=>{e.preventDefault();mv(e);try{F.setPointerCapture(e.pointerId)}catch(_){}};F.onpointermove=e=>{if(e.buttons||e.pointerType==="touch")mv(e)};
  const key=e=>{if(!L||L.q!==q||q.done){document.removeEventListener("keydown",key);return}if(e.key==="ArrowLeft")ty=laneX(Math.max(0,myLane()-1));if(e.key==="ArrowRight")ty=laneX(Math.min(N-1,myLane()+1))};
  document.addEventListener("keydown",key);
  const upd=()=>{$("shG").textContent=q.gates.map((x,i)=>i<gi?"🟢":i===gi?"🟡":"⚪").join("")};
  /* show one gate: the question on top, its answers in the lanes */
  const showGate=(again)=>{cur=q.gates[gi];const o=cur.opts.map((x,i)=>({x,i})),ok=o[cur.ans],rest=sh(o.filter(y=>y.i!==cur.ans)).slice(0,N-1);
    lanes=sh([ok,...rest]);while(lanes.length<N)lanes.push(null);
    $("shQ").innerHTML=`<div class="shu-cap">${cur.cap||""}</div>${cur.visual&&cur.visual.length<1800&&cur.visual.replace(/<[^>]*>/g,"").replace(/\s/g,"").length<=4?`<div class="shu-vis">${cur.visual}</div>`:""}`;
    GT.innerHTML=lanes.map((l,i)=>`<div class="shu-l${l?"":" empty"}" data-i="${i}">${l?`<div class="opt shu-o">${l.x.h}</div>`:"☄️"}</div>`).join("");
    GT.style.gridTemplateColumns=`repeat(${N},1fr)`;gy=4;GT.style.top=gy+"%";GT.classList.remove("pass","bad");moving=false;upd();
    read(again)};
  /* read the question, then every answer with its gate lit; the gate starts flying when the reading is done */
  const read=(again)=>{hush();const tok={};window.__optTok=tok;const boxes=[...GT.querySelectorAll(".shu-l")];
    const list=[{c:again?[]:(gi===0?[G11("ROCKET"),...cur.voice]:cur.voice)},...lanes.map((l,i)=>l?{c:l.x.say,b:boxes[i]}:null).filter(Boolean)];let i=0;
    const lit=b=>boxes.forEach(x=>x.classList.toggle("saying",x===b));
    const step=()=>{if(window.__optTok!==tok||!L||L.q!==q||q.done){lit(null);return}if(i>=list.length){lit(null);moving=true;return}const x=list[i++];lit(x.b||null);
      if(!x.c.length){step();return}sayseq(x.c,()=>setTimeout(step,x.b?150:250))};step()};
  q._read=()=>{if(cur&&!q.done&&gy<60){moving=false;gy=4;GT.style.top=gy+"%";read(false)}};
  const spawn=(kind)=>{const el=document.createElement("div");el.className="shu-ob "+kind;el.textContent=kind==="rock"?pickOne(["🪨","☄️"]):"⭐";
    const x=kind==="rock"?(Math.random()<.5?ty:ri(8,92)):ri(8,92);el.style.left=x+"%";F.appendChild(el);objs.push({el,kind,x,y:-8,s:kind==="rock"?ri(80,130)/100:1})};
  const pass=()=>{if(!cur)return;const C=cur;cur=null;const li=myLane(),l=lanes[li],good=l&&l.i===C.ans,boxes=GT.querySelectorAll(".shu-l");moving=false;
    if(good){sfx.good();GT.classList.add("pass");boxes[li].classList.add("ok");burstAt(boxes[li],18);gi++;gmiss=0;
      if(gi>=q.gates.length){upd();cancelAnimationFrame(raf);R.classList.add("away");setTimeout(()=>{if(L&&L.q===q)gameWin(q,miss>1?1:0,R,[G11("ROCKET_WIN")])},700);return}
      setTimeout(()=>{if(L&&L.q===q&&!q.done)showGate(false)},900)}
    else{sfx.oops();miss++;gmiss++;GT.classList.add("bad");if(boxes[li])boxes[li].classList.add("no");bounce(R);
      if(gmiss>=2){const ci=lanes.findIndex(x=>x&&x.i===C.ans);boxes[ci].classList.add("ok");hush();sayseq(C.exp&&C.exp.v&&C.exp.v.length?C.exp.v:lanes[ci].x.say,()=>{});
        toastHint("This was the right one!");gi++;gmiss=0;
        if(gi>=q.gates.length){upd();cancelAnimationFrame(raf);setTimeout(()=>{if(L&&L.q===q)gameWin(q,1,R,[G11("ROCKET_WIN")])},2600);return}
        setTimeout(()=>{if(L&&L.q===q&&!q.done)showGate(false)},2600)}
      else{toastHint(l?"Not that gate - try again!":"Fly into a gate with an answer!");setTimeout(()=>{if(L&&L.q===q&&!q.done)showGate(true)},900)}}};
  const tick=t=>{if(!L||L.q!==q||q.done){cancelAnimationFrame(raf);return}const dt=Math.min(50,t-(lastT||t));lastT=t;
    rx+=(ty-rx)*Math.min(1,dt/90);setR();
    if(moving&&cur){gy+=dt/q.travel*76;GT.style.top=gy+"%";if(gy>=74)pass();
      if(q.rockEvery&&t-rockT>q.rockEvery&&gy<52){rockT=t;spawn("rock")}
      if(t-starT>1700){starT=t;spawn("star")}}
    objs=objs.filter(o=>{o.y+=dt/q.travel*95*o.s;o.el.style.top=o.y+"%";
      if(o.y>74&&o.y<90&&Math.abs(o.x-rx)<8){if(o.kind==="star"){stars++;$("shS").textContent=stars;sfx.tap();o.el.remove();return false}
        if(t-hitT>900){hitT=t;R.classList.remove("hit");void R.offsetWidth;R.classList.add("hit");sfx.oops();if(stars>0){stars--;$("shS").textContent=stars}gy=Math.max(4,gy-6)}o.el.remove();return false}
      if(o.y>104){o.el.remove();return false}return true});
    raf=requestAnimationFrame(tick)};
  setR();showGate(false);raf=requestAnimationFrame(tick);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;if(!cur){setTimeout(go,200);return}if(!moving){window.__optTok={};moving=true}const ci=lanes.findIndex(x=>x&&x.i===cur.ans);ty=rx=laneX(ci);gy=73.9;setTimeout(go,300)};go()}}
GAMES.shuttle=shuttleQ;
if(typeof gReadOpts==="function"){const _gro11=gReadOpts;gReadOpts=function(q){if(q&&q.game==="shuttle"){if(q._read)q._read();return true}return _gro11(q)}}
const _bf11=buildFormat;buildFormat=function(kind,cat){if(kind==="f_shuttle")return qShuttle(cat);return _bf11(kind,cat)};
FMIN.f_shuttle=4;
const SHU_OK={};const SHU_CATS=["count","add","letters","read","farm","animals","world","sky","shapes","clock","people","flags"];
const _ff11=formatsFor0;formatsFor0=function(cat){const b=_ff11(cat);if(!(G11_READY&&SHU_CATS.includes(cat)&&ageOK("f_shuttle")))return b;const kk=cat+"|"+(S.age||6)+"|"+lvl();if(SHU_OK[kk]===undefined){let ok=false;for(let t=0;t<4&&!ok;t++){try{ok=!!qShuttle(cat)}catch(e){}}SHU_OK[kk]=ok}return SHU_OK[kk]?[...b,"f_shuttle"]:b};
Object.assign(GMAP,{"g:shuttle":G("Space run",["think","move"],[["think","recall"]],"The child steers a rocket through the gate with the right answer to this section's questions, dodging rocks and collecting stars. Faster, with more gates and rocks, as the child grows.","Practice")});
