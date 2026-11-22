
/* =====================================================================================================
   v34 (Nov 19): MORE GAMES WITH THE ANIMATIONS, BY AGE (img/gif/*.webp from Image/App_Gif_Updated).
   1. Find it! (ages 3-5)  - Lulu names a thing (Farsi, then English); three little movies play; tap the right one.
   2. Movie quiz (ages 4-12) - a movie plays, then a question about the same topic, picked for the child's age
      (a 4-year-old gets "Which one lays eggs?", a 10-year-old gets "What is it called when a liquid turns into a gas?").
      The questions are the app's own checked questions, with their own voices.
   ===================================================================================================== */
/* --- 1. FIND IT! --- target: [Farsi clip, English clip or "", movies, section(s)] */
const FIND34={
 butterfly:["PX_FA_BUTTERFLY","PX_EN_BUTTERFLY",["caterpillar-to-butterfly","caterpillar-yellow"],["animals"]],
 frog:["LULU_FA_AN8","LULU_WORD47",["tadpole-waterfall","tadpole-cycle"],["animals"]],
 chick:["PX_G32_O_CHICK","",["chick-basket","chick-nest","chick-sun"],["farm","animals"]],
 bee:["LULU_FA_AN9","LULU_WORD49",["bee-garden","bee-wildflowers"],["animals","farm"]],
 snail:["PX_FA_SNAIL","PX_EN_SNAIL",["snail-garden","snail-log"],["animals"]],
 octopus:["PX_AW_OCTOPUS","",["octopus-reef","octopus-swim"],["animals"]],
 penguin:["PX_AW_PENGUIN","",["penguin-pond","penguin-spin","penguin-belly","penguin-hill"],["animals"]],
 turtle:["PX_FA_TURTLE","PX_EN_TURTLE",["turtle-sand","turtle-seaweed"],["animals"]],
 ant:["PX_FA_ANT","PX_EN_ANT",["ant-stem"],["animals"]],
 crab:["PX_FA_CRAB","PX_EN_CRAB",["crab-water"],["animals"]],
 fish:["PX_OW2_GOLDFISH","PX_EN_FISH",["goldfish-plants","goldfish-window"],["animals"]],
 bird:["LULU_FA_AN0","LULU_WORD0",["hummingbird-garden","hummingbird-yellow"],["animals"]],
 magnet:["PX_OW3_MAGNET","",["magnet-chain","magnet-jar"],["world"]],
 moon:["LULU_FA_SKY1","PX_EN_MOON",["moon-stars","moon-sun"],["sky"]],
 volcano:["PX_SW_A_VOLCANO","",["volcano-ash","volcano-classic"],["world"]],
 mushroom:["PX_G32_O_MUSH","",["mushroom-forest","mushroom-meadow"],["world"]],
 rainbow:["LULU_FA_SKY5","LULU_WORD4",["rain-rainbow-garden","rain-rainbow-hill","rain-rainbow-house"],["sky"]],
 snowman:["PX_G8_O_SNOWMAN","PX_EW_SNOWMAN",["snowman-park","snowman-yard"],["sky"]],
 rocket:["LULU_FA_SKY8","PX_EN_ROCKET",["rocket-launch","rocket-red","rocket-sunset"],["sky"]]};
const NOPAIR34={turtle:["octopus","fish","crab"],octopus:["turtle","fish","crab"],fish:["octopus","turtle","bird"],crab:["octopus","turtle"],bird:["chick","penguin","fish"],chick:["bird"],penguin:["bird"],moon:["rocket"],rocket:["moon"]};  /* a movie that also shows the thing is never a wrong choice */   /* (the day-night movies start in daylight, so "moon" is left out) */
const VOICED34=__VOICED34__, GIFS34=__GIFS34__;
const ok34=k=>{const t=FIND34[k];return VOICED34.includes(t[0])&&t[2].some(n=>GIFS34.includes(n))};
const mov34=k=>pickOne(FIND34[k][2].filter(n=>GIFS34.includes(n)));
function findPool34(cat){return Object.keys(FIND34).filter(k=>ok34(k)&&FIND34[k][3].includes(cat))}
function qFind34(cat){const P=findPool34(cat);if(!P.length)return null;const a=lvl(),n=a<=3?2:3,R=a<=4?3:4;
  const all=Object.keys(FIND34).filter(ok34);const rounds=[];let last=null;
  for(let i=0;i<R;i++){const pool=P.length>1?P.filter(k=>k!==last):P;const t=pickOne(pool);last=t;
    const others=sh(all.filter(k=>k!==t&&!(NOPAIR34[t]||[]).includes(k))).slice(0,n-1);
    rounds.push({t,opts:sh([t,...others]).map(k=>({k,n:mov34(k)}))})}
  return {game:"find34",gid:"g:find34",cat,rounds,voice:["w/PX_G_SPY"],factT:"Looking carefully helps us find things.",factV:[]}}
const say34=k=>["w/"+FIND34[k][0],...(FIND34[k][1]&&VOICED34.includes(FIND34[k][1])?["w/"+FIND34[k][1]]:[])];
GAMES.find34=q=>{let ri=0,miss=0;
  gShow(`<div class="game">${gHead("🔎","Find it!","Listen, then tap the right movie")}
    <div class="v34-say"><button class="v34-ear" id="v34e" aria-label="Hear it again">🔊</button></div><div class="v34-grid" id="v34g"></div></div>`);
  let cur=null;
  const round=(first)=>{cur=q.rounds[ri++];q._t=cur.t;let tries=0;
    $("v34g").className="v34-grid n"+cur.opts.length;
    $("v34g").innerHTML=cur.opts.map((o,i)=>`<button class="v34-m" data-i="${i}">${gifImg32(o.n,"v34-gif")}</button>`).join("");
    const bs=[...$("v34g").querySelectorAll(".v34-m")];
    hush();sayseq([...(first?q.voice:[]),...say34(cur.t)],()=>{});
    bs.forEach(b=>b.onclick=()=>{if(q.done||b.classList.contains("no")||b.classList.contains("ok"))return;hush();const o=cur.opts[+b.dataset.i];
      if(o.k===cur.t){sfx.good();window.movieFx39&&movieFx39(o.n);b.classList.add("ok");burstAt(b,14);sayseq(say34(cur.t),()=>{});
        setTimeout(()=>{if(q.done||!L||L.q!==q)return;if(ri<q.rounds.length)round(false);else gameWin(q,miss>1?1:0,b)},1800)}
      else{sfx.oops();miss++;tries++;b.classList.add("no");bounce(b);sayseq(say34(cur.t),()=>{});
        if(tries>=2){const r=bs[cur.opts.findIndex(x=>x.k===cur.t)];r.classList.add("hint")}}})};
  $("v34e").onclick=()=>{if(cur&&!q.done){hush();sayseq(say34(cur.t),()=>{})}};
  round(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;const i=cur.opts.findIndex(x=>x.k===cur.t);const b=$("v34g").querySelectorAll(".v34-m")[i];if(b&&!b.classList.contains("ok"))b.click();setTimeout(go,900)};go()}};

/* --- 2. MOVIE QUIZ --- movies -> the app's questions on the same topic (the age of each question decides who gets it) */
const GQ34=[
 {g:["caterpillar-to-butterfly","caterpillar-yellow"],s:["animals"],ids:["a17","px350","px133"]},
 {g:["tadpole-waterfall","tadpole-cycle"],s:["animals"],ids:["a04","a22","px369","px121","px116"]},
 {g:["chick-basket","chick-nest","chick-sun"],s:["farm","animals"],ids:["a12","f06","px08","px61","px320","px224"]},
 {g:["seed-daisy","seed-rose","seed-sunflower","seed-tulip"],s:["world"],ids:["n01","n06","n02","n10","px176","px470"]},
 {g:["day-night-house","day-night-tree"],s:["sky","clock"],ids:["s04","s07","px30","px346","e08","p12","px196"]},
 {g:["rain-rainbow-garden","rain-rainbow-hill","rain-rainbow-house"],s:["sky"],ids:["s01","s03","px78","s10","px199"]},
 {g:["volcano-ash","volcano-classic"],s:["world"],ids:["e07","px365","px165"]},
 {g:["water-cycle-ocean","water-cycle-puddle"],s:["sky","world"],ids:["x05","px364","px182","px199","px201"]},
 {g:["snowman-park","snowman-yard"],s:["sky"],ids:["s06","n08","px55"]},
 {g:["snowflake-sky","snowflake-village"],s:["sky"],ids:["px29","s06","n07","s12"]},
 {g:["rocket-launch","rocket-red","rocket-sunset"],s:["sky"],ids:["p01","px104","p06","px175","px194","px195"]},
 {g:["apple-four-seasons","maple-four-seasons"],s:["clock","world"],ids:["n05","n07","px55","px97","s13"]},
 {g:["octopus-reef","octopus-swim"],s:["animals"],ids:["px62","a28","px125"]},
 {g:["mushroom-forest","mushroom-meadow"],s:["world"],ids:["n14","px221"]},
 {g:["snail-garden","snail-log"],s:["animals"],ids:["px10"]},
 {g:["kite-beach","kite-sunset"],s:["sky"],ids:["s08","px79"]},
 {g:["bee-garden","bee-wildflowers"],s:["animals","farm"],ids:["a05","px73","px12","px326","n09","a24","px211","px127"]},
 {g:["penguin-pond","penguin-spin","penguin-belly","penguin-hill"],s:["animals"],ids:["a20","px345","px113","px459"]},
 {g:["turtle-sand","turtle-seaweed"],s:["animals"],ids:["px60","px455"]},
 {g:["ice-rock","ice-table"],s:["world","sky"],ids:["n08","x02","px352","px174"]},
 {g:["magnet-chain","magnet-jar"],s:["world"],ids:["x01","px359"]},
 {g:["shadow-playground"],s:["world","sky"],ids:["x07"]},
 {g:["moon-stars","moon-sun"],s:["sky"],ids:["p04","p12","px346","px196","px396"]},
 {g:["star-forest","star-mountains"],s:["sky"],ids:["s04","px329","px339","px367","px193"]},
 {g:["goldfish-plants","goldfish-window","seahorse-bubbles","seahorse-coral"],s:["animals"],ids:["a03","px95","px324","px119","px458"]},
 {g:["hummingbird-garden","hummingbird-yellow"],s:["animals"],ids:["a02","px13","px338"]},
 {g:["ant-stem"],s:["animals"],ids:["a27","px112"]},
 {g:["dandelion-meadow","dandelion-pond"],s:["world"],ids:["n06","px54","px347","px219","px301"]},
 /* v38: new movies */
 {g:["apple-fall-orchard","apple-fall-tree"],s:["world"],ids:["px175","px373","px545","px205"]},
 {g:["earth-day-city","earth-day-space","earth-day-sun"],s:["sky","clock"],ids:["e08","px191","px387","px536","px555"]},
 {g:["sugar-spoon","sugar-tea"],s:["world"],ids:["px186"]},
 {g:["earth-seasons-garden","earth-seasons-mountain","earth-seasons-pond"],s:["sky","clock"],ids:["px358","px532","px190","px197","s14"]},
 {g:["rainbow-form-garden","rainbow-form-pond"],s:["sky"],ids:["s03","px78","s10","px527"]},
 {g:["sink-float-glass","sink-float-lake"],s:["world"],ids:["x03"]},
 {g:["plant-sun-field"],s:["world","farm"],ids:["n01","px52","px328","n10","px176","px214"]},
 {g:["steam-mug","steam-window"],s:["world"],ids:["x05","px364","px182","px385","px401","px480"]},
 {g:["solar-system"],s:["sky"],ids:["p02","px351","p03","p05","p07","p09","p13","px363","px375","px383","px192"]},
 {g:["leaf-food-garden","leaf-food-pot","leaf-food-tree"],s:["world","farm"],ids:["n03","n10","px538","px381","px176","px214","px306"]},
 {g:["puddle-freeze-garden","puddle-freeze-sidewalk"],s:["world","sky"],ids:["n08","px539","px174","px385"]},
 {g:["prism-reflect"],s:["sky","world"],ids:["px527","s10"]}];
const wqA34=id=>{const w=WQ.find(x=>x.i===id);return w?w.a:null};
/* the questions a child of this age can get: at most 4 years below, never above */
function gqFit34(G){const a=S.age||6;const ids=G.ids.filter(id=>{const qa=wqA34(id);return qa!==null&&qa<=a&&VOICED.has(id)});  /* v35: only questions Lulu can read aloud */const near=ids.filter(id=>wqA34(id)>=a-4);return near.length?near:ids}
function gqPool34(cat){return GQ34.filter(G=>G.s.includes(cat)&&G.g.some(n=>GIFS34.includes(n))&&gqFit34(G).length)}
function gqBuild34(id){const keep=S.age,w=WQ.find(x=>x.i===id);if(!w)return null;
  for(let t=0;t<10;t++){let r=null;try{r=window.__qcBuild?window.__qcBuild("w",id):null}catch(e){r=null}S.age=keep;
    const q=r&&r[0];  /* v35: it must be this very question, with its own recorded voice */
    if(q&&q.cap===w.q&&q.opts&&q.opts.length>=2&&q.ans>=0&&q.voice&&String(q.voice[0]).startsWith("w/")&&!q.opts.some(o=>!o.h))return q}
  return null}
function qGq34(cat){const P=gqPool34(cat);if(!P.length)return null;const a=lvl(),n=a<=5?2:3,rounds=[];
  for(const G of sh(P)){if(rounds.length>=n)break;const ids=sh(gqFit34(G));for(const id of ids){const q=gqBuild34(id);if(q){rounds.push({n:pickOne(G.g.filter(x=>GIFS34.includes(x))),q,id});break}}}
  if(!rounds.length)return null;
  return {game:"gq34",gid:"g:gq34",cat,rounds,voice:[G32("WATCH")],factT:"Watching carefully helps us learn how the world works.",factV:[]}}
GAMES.gq34=q=>{let ri=0,miss=0;
  gShow(`<div class="game">${gHead("🎬","Movie quiz","Watch the movie, then answer")}
    <div class="v32-play" id="v34w"></div><div class="v32-bar"><i id="v34t"></i></div><div class="q31" id="v34q"></div></div>`);
  const round=(first)=>{const R=q.rounds[ri++],Q=R.q;let tries=0;$("v34q").innerHTML="";
    $("v34w").innerHTML=gifImg32(R.n);window.movieFx39&&movieFx39(R.n);const T=$("v34t");T.style.transition="none";T.style.width="0%";
    requestAnimationFrame(()=>requestAnimationFrame(()=>{T.style.transition="width 6s linear";T.style.width="100%"}));
    hush();if(first)sayseq(q.voice,()=>{});
    setTimeout(()=>{if(q.done||!L||L.q!==q||!$("v34q"))return;  /* the child may have left */
      $("v34q").innerHTML=`<div class="q31-cap">${Q.cap||""}</div><div class="q31-o${Q.tf?" yn":""}">${Q.opts.map((o,i)=>`<button class="opt q31-b" data-i="${i}">${o.h}</button>`).join("")}</div>`;
      if(typeof e3fix==="function")e3fix($("v34q"));
      const bs=[...$("v34q").querySelectorAll(".q31-b")],ex=(Q.why&&Q.why.v&&Q.why.v.length?Q.why.v:(Q.exp&&Q.exp.v)||[]);
      bs.forEach(b=>b.onclick=()=>{if(q.done||b.classList.contains("no")||b.classList.contains("ok"))return;window.__optTok={};hush();const i=+b.dataset.i;
        if(i===Q.ans){sfx.good();b.classList.add("ok");burstAt(b,12);sayseq(ex,()=>{});setTimeout(()=>{if(q.done||!L||L.q!==q)return;if(ri<q.rounds.length)round(false);else gameWin(q,miss>1?1:0,b)},ex.length?4200:1600)}
        else{sfx.oops();miss++;tries++;b.classList.add("no");bounce(b);if(tries>=2)bs[Q.ans].classList.add("hint");toastHint("Look again!")}});
      rd31(q,{voice:Q.voice,opts:Q.opts},bs,null,()=>{});
    },6300)};
  round(true);
  window.__gSolve=()=>{const go=()=>{if(q.done||!L||L.q!==q)return;const R=q.rounds[ri-1];const bs=$("v34q").querySelectorAll(".q31-b");if(R&&bs.length&&!bs[R.q.ans].classList.contains("ok"))bs[R.q.ans].click();setTimeout(go,1200)};go()}};

/* --- wiring --- */
if(typeof gReadOpts==="function"){const _gro34=gReadOpts;gReadOpts=function(q){if(q&&q.game==="find34"){hush();if(q._t)sayseq(say34(q._t),()=>{});return true}if(q&&q.game==="gq34"){hush();sayseq(q.voice,()=>{});return true}return _gro34(q)}}
const B34={f_find34:qFind34,f_gq34:qGq34};
Object.assign(FMIN,{f_find34:3,f_gq34:4});Object.assign(FMAX,{f_find34:5});
const _bf34=buildFormat;buildFormat=function(kind,cat){if(B34[kind])return B34[kind](cat);return _bf34(kind,cat)};
const _ff34=formatsFor0;formatsFor0=function(cat){const b=_ff34(cat),add=[];
  if(findPool34(cat).length&&ageOK("f_find34"))add.push("f_find34");
  if(gqPool34(cat).length&&ageOK("f_gq34"))add.push("f_gq34");
  return [...b,...add.filter(f=>!b.includes(f))]};
Object.assign(GMAP,{
 "g:find34":G("Find it!",["lang","vocab"],[["lang","listen"]],"Lulu names a thing in Farsi and English (a butterfly, a rocket, a rainbow...); three little movies play and the child taps the one that shows it.","Practice"),
 "g:gq34":G("Movie quiz",["cre","science"],[["cog","curiosity"]],"A short movie plays (a tadpole becoming a frog, a volcano, the water cycle...), then a question on the same topic that fits the child's age.","Practice")});
window.__g34=(age)=>{const o={};if(age){const k=S.age;S.age=age;for(const c of ["animals","farm","world","sky","clock"])o[c]=formatsFor0(c).filter(x=>/3[24]$/.test(x));S.age=k;return o}const q=L&&L.q;return q&&q.rounds?q.rounds.map(r=>r.id?r.id+": "+r.q.cap:r.t+" / "+r.opts.map(x=>x.n).join(",")):null};
