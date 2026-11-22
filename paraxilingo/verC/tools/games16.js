/* =====================================================================================================
   v32 (Nov 19): GAMES WITH THE NEW ANIMATIONS (img/gif/*.webp, made from Image/App_Gif_Updated, 540x304, 6 s loops).
   1. What comes next?  - 3-4 still moments of one animation, shuffled; tap them in order; then the animation plays.
   2. Watch and answer  - an animation plays, then Lulu asks one question about it.
   3. Existing games get a short animation before the win card: Grow a plant (seed), Four seasons (tree),
      Fizzy volcano (volcano), Rocket countdown (rocket).
   ===================================================================================================== */
const G32=n=>"w/PX_G32_"+n;
const GIF32=n=>"img/gif/"+n+".webp", STL32=(n,k)=>"img/gif/s/"+n+"_"+k+".webp";
/* stills cut from each animation: name -> [section, number of moments] */
const SEQ32=__SEQ32__;
/* option helpers: [emoji, English label, Farsi clip] */
const O32=(e,t,fa)=>({e,t,fa});
const WQ32=[
 {g:["caterpillar-to-butterfly","caterpillar-yellow"],s:"animals",q:["w/a17_q_lulu"],cap:"What did the caterpillar turn into?",x:["w/px350_e_lulu"],xt:"A caterpillar makes a chrysalis and turns into a butterfly.",o:[O32("🦋","Butterfly","PX_FA_BUTTERFLY"),O32("🐝","Bee","LULU_FA_AN9"),O32("🐦","Bird","LULU_FA_AN0")]},
 {g:["tadpole-waterfall","tadpole-cycle"],s:"animals",q:[G32("TAD_Q")],cap:"What did the tadpole turn into?",x:["w/px369_e_lulu"],xt:"A tadpole slowly grows legs and becomes a frog.",o:[O32("🐸","Frog","LULU_FA_AN8"),O32("🐟","Fish","LULU_FA_FOOD4"),O32("🦆","Duck","LULU_FA_AN2")]},
 {g:["chick-basket","chick-nest","chick-sun"],s:"farm",q:[G32("CHICK_Q")],cap:"What came out of the egg?",x:["w/PX_FY_021"],xt:"A chick grows inside the egg for about three weeks, then hatches.",o:[O32("🐤","Chick","PX_G32_O_CHICK"),O32("🐟","Fish","LULU_FA_FOOD4"),O32("🐱","Cat","LULU_FA_AN11")]},
 {g:["seed-daisy","seed-rose","seed-sunflower","seed-tulip"],s:"world",q:["w/px470_q_lulu"],cap:"What did the seed grow into?",x:["w/px470_e_lulu"],xt:"With water and light, a seed grows into a plant.",o:[O32("🌸","Flower","LULU_FA_FOOD6"),O32("🪨","Rock","LULU_FA_HOME10"),O32("🎂","Cake","LULU_FAW18")]},
 {g:["day-night-house","day-night-tree"],s:"sky",q:["w/LULU_SK_NIGHT"],cap:"What do we see in the sky at night?",x:["w/LULU_IF_PATTERN_0"],xt:"Day and night come again every day. That is a pattern.",o:[O32("🌙","Moon","LULU_FA_SKY1"),O32("☀️","Sun","LULU_FA_PL0"),O32("🌈","Rainbow","LULU_FA_SKY5")]},
 {g:["rain-rainbow-garden","rain-rainbow-hill","rain-rainbow-house"],s:"sky",q:[G32("RAIN_Q")],cap:"What came after the rain?",x:["w/LULU_IF_PLANETS_2"],xt:"A rainbow appears when sunlight shines through raindrops.",o:[O32("🌈","Rainbow","LULU_FA_SKY5"),O32("❄️","Snow","LULU_FA_SKY7"),O32("🌙","Moon","LULU_FA_SKY1")]},
 {g:["volcano-ash","volcano-classic"],s:"world",q:[G32("VOLC_Q")],cap:"What came out of the volcano?",x:["w/PX_STK_DINO_03"],xt:"A volcano is a mountain that can pour out hot lava.",o:[O32("🌋","Lava","PX_FA_W_LAVA"),O32("💧","Water","PX_FA_WATER"),O32("🥛","Milk","PX_FA_MILK")]},
 {g:["snowman-park","snowman-yard"],s:"sky",q:[G32("SNOW_Q")],cap:"Why did the snowman melt?",x:["w/PX_FY_221"],xt:"Ice and snow melt when they get warm.",o:[O32("☀️","Sun","LULU_FA_PL0"),O32("🌧️","Rain","LULU_FA_SKY4"),O32("🌬️","Wind","PX_OW2_WIND")]},
 {g:["water-cycle-ocean","water-cycle-puddle"],s:"sky",q:[G32("WATER_Q")],cap:"What fell from the cloud?",x:["w/px199_e_lulu"],xt:"Water goes up as vapour, makes clouds, and falls again as rain. That is the water cycle.",o:[O32("🌧️","Rain","LULU_FA_SKY4"),O32("🏖️","Sand","PX_FA_SAND"),O32("🍂","Leaves","LULU_FA_FOOD7")]},
 {g:["rocket-launch","rocket-red","rocket-sunset"],s:"sky",q:[G32("ROCK_Q")],cap:"Where did the rocket go?",x:["w/PX_FX_92"],xt:"Astronauts fly to space in rockets.",o:[O32("🌙","Moon","LULU_FA_SKY1"),O32("🌊","Sea","LULU_FA_HOME9"),O32("🚜","Farm","PX_AW_FARM")]},
 {g:["octopus-reef","octopus-swim"],s:"animals",q:[G32("OCT_Q")],cap:"What did the octopus change?",x:[G32("OCT_E")],xt:"An octopus can change its colour to hide.",o:[O32("🎨","Its colour","PX_G32_O_COLOUR"),O32("🐙","Its arms","PX_G32_O_ARMS"),O32("🏠","Its home","PX_G32_O_HOME")]},
 {g:["jellyfish-coral","jellyfish-deep"],s:"animals",q:[G32("JELLY_Q")],cap:"Where does the jellyfish live?",x:[G32("JELLY_E")],xt:"Jellyfish live in the sea and have no bones.",o:[O32("🌊","Sea","LULU_FA_HOME9"),O32("🌳","Tree","PX_FA_W_TREE"),O32("🏖️","Sand","PX_FA_SAND")]},
 {g:["mushroom-forest","mushroom-meadow"],s:"world",q:[G32("MUSH_Q")],cap:"What grew in the forest?",x:[G32("MUSH_E")],xt:"A mushroom is not a plant. It grows in damp, shady places.",o:[O32("🍄","Mushroom","PX_G32_O_MUSH"),O32("🥕","Carrot","PX_OW_CARROT"),O32("🎂","Cake","LULU_FAW18")]},
 {g:["snail-garden","snail-log"],s:"animals",q:[G32("SNAIL_Q")],cap:"What does the snail carry on its back?",x:[G32("SNAIL_E")],xt:"A snail carries its shell everywhere, like a little house.",o:[O32("🐚","Shell","PX_G32_O_SHELL"),O32("👜","Bag","PX_G32_O_BAG"),O32("🎩","Hat","PX_G32_O_HAT")]},
 {g:["firefly-garden","firefly-meadow"],s:"animals",q:[G32("FIRE_Q")],cap:"What do fireflies do at night?",x:[G32("FIRE_E")],xt:"A firefly is an insect whose body makes light.",o:[O32("✨","They glow","PX_G32_O_GLOW"),O32("🏊","They swim","PX_G32_O_SWIM"),O32("🎤","They sing","PX_G32_O_SING")]},
 {g:["balloon-fields","balloon-mountains","balloon-sunrise","balloon-village"],s:"sky",q:[G32("BALL_Q")],cap:"Where did the hot air balloon go?",x:[G32("BALL_E")],xt:"Hot air is lighter, so the balloon goes up.",o:[O32("⬆️","Up","PX_G32_O_UP"),O32("⬇️","Down","PX_G32_O_DOWN")]},
 {g:["snowflake-sky","snowflake-village"],s:"sky",q:[G32("FLAKE_Q")],cap:"What is a snowflake made of?",x:[G32("FLAKE_E")],xt:"A snowflake is frozen water (ice) and usually has six arms.",o:[O32("💧","Water","PX_FA_WATER"),O32("🍬","Sugar","PX_OW_SUGAR"),O32("📄","Paper","PX_G32_O_PAPER")]},
 {g:["kite-beach","kite-sunset"],s:"sky",q:["w/px79_q_lulu"],cap:"What makes a kite fly?",x:["w/px79_e_lulu"],xt:"The wind pushes the kite up into the sky.",o:[O32("🌬️","Wind","PX_OW2_WIND"),O32("🌧️","Rain","LULU_FA_SKY4"),O32("☀️","Sun","LULU_FA_PL0")]},
 {g:["bee-garden","bee-wildflowers"],s:"animals",q:["w/ST_S0_Q2"],cap:"What does the bee love?",x:["w/ST_S0_L4"],xt:"Bees love flowers: they drink their nectar and carry pollen.",o:[O32("🌸","Flowers","LULU_FA_FOOD6"),O32("❄️","Snow","LULU_FA_SKY7"),O32("🐟","Fish","LULU_FA_FOOD4")]},
 {g:["penguin-pond","penguin-spin","penguin-belly","penguin-hill"],s:"animals",q:["w/PX_TD_Q_penguin"],cap:"Where does the penguin live?",x:["w/PX_FY_072"],xt:"Many penguins live in the cold south, like Antarctica.",o:[O32("🧊","Ice","PX_AW_ICE"),O32("🏜️","Desert","PX_FA_SAND"),O32("🚜","Farm","PX_AW_FARM")]}];
const VOICED32=__VOICED32__;   /* clips that exist in this build */
const ok32=w=>[...w.q,...w.x,...w.o.map(o=>"w/"+o.fa)].every(c=>VOICED32.includes(c.replace(/^w\//,"")));
const optSay32=o=>["w/"+o.fa,...(typeof enSay==="function"?enSay(o.t.replace(/^(Its|They) /,"").toLowerCase()):[])];
const gifImg32=(n,cls)=>`<img class="${cls||"v32-gif"}" src="${GIF32(n)}" alt="" decoding="async">`;
/* the sections (by pillar): life cycles and animals in Animals/Farm, plants and the earth in Our world, weather and space in Sky, day/seasons in Time */
function seqPool32(cat){return Object.keys(SEQ32).filter(n=>SEQ32[n][0]===cat)}
function watchPool32(cat){return WQ32.filter(w=>(w.s===cat||(cat==="farm"&&w.s==="animals"&&/chick|bee/.test(w.g[0])))&&ok32(w))}

/* ================= 1. WHAT COMES NEXT? ================= */
function qSeq32(cat){const P=seqPool32(cat);if(!P.length)return null;const a=lvl(),rounds=a>=6?2:1;
  const pick=sh(P).slice(0,rounds).map(n=>{const max=SEQ32[n][1],k=a<=5?Math.min(3,max):max;const idx=k===max?[...Array(max).keys()]:(max===4?[0,2,3]:[0,1,2]);return {n,idx}});
  return {game:"seq32",gid:"g:seq32",cat,rounds:pick,voice:[G32("SEQ")],factT:"Things happen in an order: first, next, then, last.",factV:[]}}
GAMES.seq32=q=>{let ri=0,miss=0;
  gShow(`<div class="game">${gHead("🎞️","What comes next?","Tap the pictures in order: first, next, last")}
    <div class="v32-slots" id="v32s"></div><div class="v32-cards" id="v32c"></div><div class="v32-play" id="v32p" hidden></div></div>`);
  const round=(first)=>{const R=q.rounds[ri++];let step=0;const N=R.idx.length;
    $("v32p").hidden=true;$("v32p").innerHTML="";
    $("v32s").innerHTML=R.idx.map((_,i)=>`<div class="v32-slot"><b>${i+1}</b></div>`).join("");
    const order=sh(R.idx.map((f,i)=>({f,i})));
    $("v32c").innerHTML=order.map(o=>`<button class="v32-card" data-i="${o.i}"><img src="${STL32(R.n,o.f)}" alt=""></button>`).join("");
    $("v32c").hidden=false;
    $("v32c").querySelectorAll(".v32-card").forEach(b=>b.onclick=()=>{if(q.done||b.disabled)return;
      if(+b.dataset.i===step){sfx.good();b.disabled=true;b.classList.add("used");const sl=$("v32s").children[step];sl.innerHTML=`<img src="${b.querySelector("img").src}" alt=""><b>${step+1}</b>`;sl.classList.add("full");step++;
        if(step>=N){setTimeout(()=>{if(q.done||!L||L.q!==q)return;$("v32c").hidden=true;$("v32p").hidden=false;$("v32p").innerHTML=gifImg32(R.n);window.movieFx39&&movieFx39(R.n);hush();sayseq([G32("SEQOK")],()=>{});
          setTimeout(()=>{if(q.done||!L||L.q!==q)return;if(ri<q.rounds.length)round(false);else gameWin(q,miss>2?1:0,$("v32p"))},6400)},500)}}
      else{sfx.oops();miss++;bounce(b);b.classList.add("no");setTimeout(()=>b.classList.remove("no"),500);if(miss%2===0){const h=[...$("v32c").querySelectorAll(".v32-card:not(.used)")].find(x=>+x.dataset.i===step);if(h){h.classList.add("hint");setTimeout(()=>h.classList.remove("hint"),1300)}}}});
    if(first){hush();sayseq(q.voice,()=>{})}};
  round(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;const cs=[...$("v32c").querySelectorAll(".v32-card:not(.used)")];if(!$("v32c").hidden&&cs.length){const filled=$("v32s").querySelectorAll(".full").length;const b=cs.find(x=>+x.dataset.i===filled);if(b)b.click();setTimeout(go,350)}else setTimeout(go,1500)};go()}};

/* ================= 2. WATCH AND ANSWER ================= */
function qWatch32(cat){const P=watchPool32(cat);if(!P.length)return null;const a=lvl(),k=a<=4?1:Math.min(2,P.length);
  const rounds=sh(P).slice(0,k).map(w=>({w,n:pickOne(w.g)}));
  return {game:"watch32",gid:"g:watch32",cat,rounds,voice:[G32("WATCH")],factT:"Watching carefully helps us learn how the world works.",factV:[]}}
GAMES.watch32=q=>{let ri=0,miss=0;
  gShow(`<div class="game">${gHead("👀","Watch and answer","Watch the movie, then answer")}
    <div class="v32-play" id="v32w"></div><div class="v32-bar"><i id="v32t"></i></div><div class="q31" id="v32q"></div></div>`);
  const round=(first)=>{const R=q.rounds[ri++],W=R.w;let tries=0;$("v32q").innerHTML="";
    $("v32w").innerHTML=gifImg32(R.n);window.movieFx39&&movieFx39(R.n);const T=$("v32t");T.style.transition="none";T.style.width="0%";
    requestAnimationFrame(()=>requestAnimationFrame(()=>{T.style.transition="width 6s linear";T.style.width="100%"}));
    hush();if(first)sayseq(q.voice,()=>{});
    setTimeout(()=>{if(q.done||!L||L.q!==q)return;const opts=sh(W.o.map((o,i)=>({o,i})));const cur={voice:W.q,opts:opts.map(x=>({say:optSay32(x.o)})),ans:opts.findIndex(x=>x.i===0)};
      $("v32q").innerHTML=`<div class="q31-cap">${W.cap}</div><div class="q31-o">${opts.map((x,i)=>`<button class="opt q31-b" data-i="${i}"><span class="oe">${x.o.e}</span><small>${x.o.t}</small></button>`).join("")}</div>`;
      if(typeof e3fix==="function")e3fix($("v32q"));
      const bs=[...$("v32q").querySelectorAll(".q31-b")];
      bs.forEach(b=>b.onclick=()=>{if(q.done||b.classList.contains("no")||b.classList.contains("ok"))return;window.__optTok={};hush();const i=+b.dataset.i;
        if(i===cur.ans){sfx.good();b.classList.add("ok");burstAt(b,12);sayseq(W.x,()=>{});setTimeout(()=>{if(q.done||!L||L.q!==q)return;if(ri<q.rounds.length)round(false);else gameWin(q,miss>1?1:0,b)},3600)}
        else{sfx.oops();miss++;tries++;b.classList.add("no");bounce(b);if(tries>=2){bs[cur.ans].classList.add("hint")}toastHint("Look again!")}});
      rd31(q,cur,bs,null,()=>{});
    },6300)};
  round(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;const b=$("v32q").querySelector(".q31-b");if(b){const all=[...$("v32q").querySelectorAll(".q31-b")];const W=q.rounds[ri-1].w;const r=all.find(x=>x.querySelector("small").textContent===W.o[0].t);if(r&&!r.classList.contains("ok"))r.click()}setTimeout(go,1200)};go()}};

/* ================= 3. the animations as a reward in four games we already have ================= */
const WINGIF32={};  /* v35: no movie after other games; the movies live in their own games */
const _gw32=gameWin;gameWin=function(q,...rest){const list=q&&WINGIF32[q.game];
  if(!list||q._gif32)return _gw32(q,...rest);q._gif32=1;
  const o=document.createElement("div");o.className="v32-over";o.innerHTML=`${gifImg32(pickOne(list),"v32-gif big")}<div class="v32-skip">Tap to continue</div>`;document.body.appendChild(o);
  let done=false;const fin=()=>{if(done)return;done=true;o.remove();_gw32(q,...rest)};o.onclick=fin;setTimeout(fin,6300)};

/* --- wiring --- */
if(typeof gReadOpts==="function"){const _gro32=gReadOpts;gReadOpts=function(q){if(q&&(q.game==="seq32"||q.game==="watch32")){hush();sayseq(q.voice,()=>{});return true}return _gro32(q)}}
const B32={f_seq32:qSeq32,f_watch32:qWatch32};
Object.assign(FMIN,{f_seq32:4,f_watch32:3});Object.assign(FMAX,{f_seq32:9,f_watch32:9});
const _bf32=buildFormat;buildFormat=function(kind,cat){if(B32[kind])return B32[kind](cat);return _bf32(kind,cat)};
const _ff32=formatsFor0;formatsFor0=function(cat){const b=_ff32(cat),add=[];
  if(seqPool32(cat).length&&ageOK("f_seq32"))add.push("f_seq32");
  if(watchPool32(cat).length&&ageOK("f_watch32"))add.push("f_watch32");
  return [...b,...add.filter(f=>!b.includes(f))]};
Object.assign(GMAP,{
 "g:seq32":G("What comes next?",["cog","logic"],[["cre","science"]],"Moments from a short movie (a chick hatching, a seed growing, a rocket launching...) are mixed up; the child taps them in order, then watches the whole movie.","Practice"),
 "g:watch32":G("Watch and answer",["cre","science"],[["lang","listen"]],"A short movie plays (a caterpillar becoming a butterfly, rain then a rainbow, a snowman melting...), then Lulu asks one question about it.","Practice")});
window.__w32=()=>WQ32.map(w=>w.g[0]+":"+(ok32(w)?"ok":"NO "+[...w.q,...w.x,...w.o.map(o=>"w/"+o.fa)].filter(c=>!VOICED32.includes(c.replace(/^w\//,""))).join(",")));
