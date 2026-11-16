
/* =====================================================================================================
   v16 (Nov 12): GRADE 4-5 FOR AGES 9-10 (and ahead-of-age kids up to level 12)
   - read the question and then each answer, lighting up the answer being read (little story, feelings detective)
   - baby games stop at age 6-7; any game outside its age window is swapped for a question
   - easy question types retire from level 10; new types: factors, multiples, prime numbers, time units,
     angles, parallel/perpendicular lines, lines of symmetry, dictionary order, compound words
   - fixed Grade 4-5 questions for Farm, People, Clock and Shapes (px208+)
   ===================================================================================================== */
const G8_READY=__G8VOICE__,G8=n=>"w/PX_G8_"+n;

/* ---------- read a list of answers one by one, lighting each one up while it is read ---------- */
function gReadList(q,lead,items){if(!items.length||items.some(x=>!x.c||!x.c.length))return false;const tok={};window.__optTok=tok;
  const all=items.map(x=>x.b),lit=b=>all.forEach(x=>x.classList.toggle("saying",x===b));const list=[{c:lead||[]},...items];let i=0;
  const step=()=>{if(window.__optTok!==tok||!L||L.q!==q||q.done){lit(null);return}if(i>=list.length){lit(null);return}const x=list[i++];lit(x.b||null);
    if(!x.c.length){step();return}sayseq(x.c,()=>setTimeout(step,x.b?150:250))};step();return true}

/* little story: words for the answers */
const TS_OPT={"ice cream":[G8("O_ICECREAM")],chick:[G8("O_CHICK")],puppy:[G8("O_PUPPY")],snowman:[G8("O_SNOWMAN")],"on the ice":[G8("O_ONICE")],"in the desert":[G8("O_DESERT")],two:[N(2)],five:[N(5)]};
const tsSay=l=>TS_OPT[l]||both(l);
/* feelings detective: words for the answers */
const _gro8=gReadOpts;gReadOpts=function(q){
  if(G8_READY&&q&&q.game==="emo"){const bs=[...$("qBody").querySelectorAll(".em-o")];
    const items=bs.map(b=>{const x=q.o[+b.dataset.j];if(q.mode==="help"){const hi=EMO_H.indexOf(q.h),oi=q.h[2].indexOf(x);return {b,c:[G8("EH"+(hi+1)+"_"+oi)]}}return {b,c:feelSay(EMO_I[x])}});
    if(gReadList(q,q.voice,items))return true}
  return _gro8(q)};

/* ---------- 1. age windows for games: baby games stop at 6-7 ---------- */
Object.assign(FMAX,{f_pump:6,f_cheer:6,f_emomatch:6,f_mirror:6,f_rocket:6,f_tcount:6,f_myday:6,f_feed:6,f_sil:6,f_shapes:6,f_post:6,
  f_calm:7,f_basket:7,f_dance:7,f_move:7,f_simon2:7,f_hop:7,f_parade:7,f_climb:7,f_beam:7,f_run:7,f_kind:7,f_emo:7,f_tapall:7,f_catch:7,f_seasons:7,f_plate:7,
  f_rhythm:7,f_mix:7,f_traffic:7,f_paint:7,f_trace:7,f_cups:7,f_fishfood:7,f_grow:7,f_tshow:7,
  f_bottle:8,f_sand:8,f_drum:8,f_weather:8,f_whack:8,f_sort:8,f_swipe:8,f_spy:8,f_recycle:8,f_mag2:8,f_sym:8,f_quilt:8,f_shop:8,f_ice:9});
/* a last check when a mound opens: nothing outside its age window gets through */
const _om8=openMound;openMound=function(i){_om8(i);try{if(!L||!L.queue)return;const cat=L.cat;
  L.queue=L.queue.map(q=>{const k=q&&q.kind;if(!k||!String(k).startsWith("f_")||ageOK(k))return q;const ks=kindsFor(cat).filter(x=>!x.startsWith("f_")&&!GAMEK.includes(x));
    if(!ks.length)return q;const n=buildQ(cat,pickOne(ks),new Set());n.cat=cat;n.kind=n.kind||k;return n})}catch(e){}};

/* ---------- 2. easy question types retire as the level grows (level = age + parent's level + how well the child does) ---------- */
const KMAX8={"count:after":7,"count:before":7,"count:missing":9,"count:skip":9,"clock:today":7,"clock:tomorrow":7,"clock:half":7,"clock:week":8,"clock:yesterday":8,
  "clock:after":9,"clock:before":9,"clock:months":9,"clock:monthafter":9,"clock:quarter":9,"shapes:bigsmall":7,"shapes:sides":9,"shapes:both":9,
  "letters:whatis":8,"letters:lafter":8,"letters:lbefore":8,"letters:whear":9,"read:whear":9,"farm:food":9,"farm:water":9,"people:feel":8,"people:job":9,"people:job2":11,
  "add:minus":8,"add:groups":9,"add:half":9,"add:numline":9,"add:carry":10,"add:big":10};

/* ---------- 3. new question types ---------- */
const nOpt=x=>({h:`<b class="num">${x}</b>`,say:NV(x)});
const nOpts=(r,c)=>{const o=sh([r,...sh([...new Set(c.filter(x=>x!==r&&x>=0))]).slice(0,3)]);return {opts:o.map(nOpt),ans:o.indexOf(r)}};
const PRIMES=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97],isP=n=>PRIMES.includes(n);
const SV=(w,h,body)=>`<svg viewBox="0 0 ${w} ${h}" class="g8-svg" aria-hidden="true">${body}</svg>`;
const ANG=a=>{const r=70,x0=30,y0=95,rad=a*Math.PI/180,x=x0+r*Math.cos(rad),y=y0-r*Math.sin(rad),arc=a===90?`<path d="M${x0+16} ${y0} L${x0+16} ${y0-16} L${x0} ${y0-16}" fill="none" stroke="#F08C00" stroke-width="3"/>`:`<path d="M${x0+22} ${y0} A22 22 0 0 0 ${x0+22*Math.cos(rad)} ${y0-22*Math.sin(rad)}" fill="none" stroke="#F08C00" stroke-width="3"/>`;
  return SV(130,110,`<line x1="${x0}" y1="${y0}" x2="${x0+90}" y2="${y0}" stroke="#495057" stroke-width="5" stroke-linecap="round"/><line x1="${x0}" y1="${y0}" x2="${x}" y2="${y}" stroke="#495057" stroke-width="5" stroke-linecap="round"/>${arc}<circle cx="${x0}" cy="${y0}" r="4" fill="#495057"/>`)};
const LNS={P:`<line x1="10" y1="35" x2="120" y2="20" stroke="#1971C2" stroke-width="5" stroke-linecap="round"/><line x1="10" y1="85" x2="120" y2="70" stroke="#1971C2" stroke-width="5" stroke-linecap="round"/>`,
  X:`<line x1="65" y1="8" x2="65" y2="102" stroke="#1971C2" stroke-width="5" stroke-linecap="round"/><line x1="12" y1="60" x2="118" y2="60" stroke="#1971C2" stroke-width="5" stroke-linecap="round"/><path d="M65 48 L77 48 L77 60" fill="none" stroke="#F08C00" stroke-width="3"/>`,
  I:`<line x1="15" y1="95" x2="115" y2="20" stroke="#1971C2" stroke-width="5" stroke-linecap="round"/><line x1="15" y1="35" x2="115" y2="85" stroke="#1971C2" stroke-width="5" stroke-linecap="round"/>`};
const poly=(n,r=44,cx=65,cy=58,rot=-90)=>Array.from({length:n},(x,i)=>{const t=(rot+360*i/n)*Math.PI/180;return (cx+r*Math.cos(t)).toFixed(1)+","+(cy+r*Math.sin(t)).toFixed(1)}).join(" ");
const SYMS=[["square",4,`<rect x="22" y="15" width="86" height="86" rx="3"/>`],["rectangle",2,`<rect x="10" y="30" width="110" height="56" rx="3"/>`],["equilateral triangle",3,`<polygon points="${poly(3,52,65,66)}"/>`],
  ["regular pentagon",5,`<polygon points="${poly(5,50)}"/>`],["regular hexagon",6,`<polygon points="${poly(6,50,65,58,0)}"/>`],["isosceles triangle",1,`<polygon points="65,8 105,104 25,104"/>`],
  ["heart",1,`<path d="M65 100 C20 70 8 40 30 22 C48 8 62 20 65 32 C68 20 82 8 100 22 C122 40 110 70 65 100Z"/>`],["parallelogram",0,`<polygon points="35,25 120,25 95,95 10,95"/>`]];
const CPW=["sunflower","rainbow","football","snowman","toothbrush","cupcake","bedroom","pancake","raincoat","popcorn","starfish","goldfish","sunshine","homework","notebook","butterfly"],
  CPX=["banana","yellow","apple","orange","doctor","flower","water","tomato","elephant","giraffe","purple","dinosaur","carrot","pencil","rabbit","window","garden","tiger","monkey","table"];
const LW_ALL=new Set(Object.values(LW).flat(2));const AOW=()=>[...new Set([...Object.values(LW).flat(2),...CPW,...CPX])].filter(w=>(LW_ALL.has(w)||CPW.includes(w)||enSay(w).length)&&/^[a-z]{3,10}$/.test(w)&&!/^(sheep|fish|mice|men|feet|teeth|geese)$/.test(w));
const G8GEN={
 factor(){const n=pickOne([12,15,16,18,20,21,24,27,28,30,32,35,36,40,42,45,48,54,56,60,63,64,72,81]),fs=[];for(let d=3;d<n;d++)if(n%d===0)fs.push(d);const r=pickOne(fs),c=[];for(let d=3;d<Math.min(n,20);d++)if(n%d!==0)c.push(d);
  return Object.assign({voice:[G8("FAC_A"),...NV(n),G8("FAC_B")],cap:`${n} can be divided exactly by…`,visual:`<div class="eq"><span>${n}</span><b>÷</b><span class="q">?</span></div>`,layout:"row3",hint:"elim",exp:{t:`${n} ÷ ${r} = ${n/r}`,v:[...NV(n),M2("DIV"),...NV(r),"w/LULU_EQUALS",...NV(n/r)]}},nOpts(r,sh(c)))},
 multiple(){const b=ri(3,lvl()>=11?12:9),k=ri(3,lvl()>=11?12:9),r=b*k,c=[r+1,r-1,r+2,r+b-1,r-b+1,r+3].filter(x=>x%b!==0);
  return Object.assign({voice:[G8("MUL_A"),...NV(b),G8("MUL_B")],cap:`Which number is in the ${b} times table?`,visual:`<div class="eq"><span>${b}</span><b>×</b><span class="q">?</span></div>`,layout:"row3",hint:"elim",exp:{t:`${b} × ${k} = ${r}`,v:[...NV(b),"w/PX_RC_TIMES",...NV(k),"w/LULU_EQUALS",...NV(r)]}},nOpts(r,c))},
 prime(){const r=pickOne(PRIMES.filter(p=>p>10)),c=sh([9,15,21,25,27,33,35,39,45,49,51,55,57,63,65,69,77,81,85,87,91,93].filter(x=>Math.abs(x-r)<30));
  return Object.assign({voice:[G8("PRI")],cap:"Which number is prime? (only 1 and itself divide it)",layout:"row3",hint:"elim",exp:{t:`${r} can only be divided by 1 and ${r}.`,v:[...NV(r),G8("PRI_E")]}},nOpts(r,c))},
 convert(){const T=[["H2M",ri(2,5),60,"hours","minutes"],["M2H",ri(2,6)*60,1/60,"minutes","hours"],["D2H",ri(2,4),24,"days","hours"],["W2D",ri(2,9),7,"weeks","days"],["Y2M",ri(2,6),12,"years","months"],["M2S",ri(2,5),60,"minutes","seconds"],["H2D",ri(2,4)*24,1/24,"hours","days"]],
  [k,n,f,u1,u2]=pickOne(T),r=Math.round(n*f);const step=f<1?Math.round(1/f):f;
  return Object.assign({voice:[...NV(n),G8("CV_"+k)],cap:`${n} ${u1} = ? ${u2}`,visual:`<div class="eq"><span>${n} ${u1}</span><b>=</b><span class="q">?</span><span>${u2}</span></div>`,layout:"row3",hint:"elim",
   exp:{t:f<1?`${n} ÷ ${step} = ${r}`:`${n} × ${step} = ${r}`,v:f<1?[...NV(n),M2("DIV"),...NV(step),"w/LULU_EQUALS",...NV(r)]:[...NV(n),"w/PX_RC_TIMES",...NV(step),"w/LULU_EQUALS",...NV(r)]}},nOpts(r,[r+step,r-step,n,r*2,r+10].filter(x=>x>0)))},
 angle(){const t=pickOne(["A","R","O"]),a=t==="A"?ri(25,70):t==="R"?90:ri(110,160),L3=[["A","acute"],["R","right angle"],["O","obtuse"]];
  return {voice:[G8("ANG_Q")],cap:"What kind of angle is this?",visual:ANG(a),layout:"col",hint:"elim",opts:L3.map(([k,l])=>({h:`<b class="word">${l}</b>`,say:[G8("ANG_"+k)]})),ans:L3.findIndex(x=>x[0]===t),why:{t:{A:"An acute angle is less than 90°.",R:"A right angle is exactly 90°.",O:"An obtuse angle is more than 90°."}[t],v:[G8("ANG_"+t+"E")]},_o3:true}},
 lines(){const t=pickOne(["P","X","I"]),L3=[["P","parallel"],["X","perpendicular"],["I","intersecting"]];
  return {voice:[G8("LN_Q")],cap:"How do these two lines go?",visual:SV(130,110,LNS[t]),layout:"col",hint:"elim",opts:L3.map(([k,l])=>({h:`<b class="word">${l}</b>`,say:[G8("LN_"+k)]})),ans:L3.findIndex(x=>x[0]===t),why:{t:{P:"Parallel lines never meet.",X:"Perpendicular lines meet at a right angle.",I:"Intersecting lines cross each other."}[t],v:[G8("LN_"+t+"E")]},_o3:true}},
 symm(){const s=pickOne(SYMS),r=s[1];
  return Object.assign({voice:[G8("SYM_Q")],cap:"How many lines of symmetry does this shape have?",visual:SV(130,116,`<g fill="#B2F2BB" stroke="#2B8A3E" stroke-width="4" stroke-linejoin="round">${s[2]}</g>`),layout:"row3",hint:"elim",exp:{t:`A ${s[0]} has ${r} line${r===1?"":"s"} of symmetry.`,v:[...NV(r),G8("SYM_E")]}},nOpts(r,[0,1,2,3,4,5,6].filter(x=>x!==r)))},
 aorder(){const W=AOW();let o=[];for(let t=0;t<40;t++){const a=pickOne(W),same=lvl()>=11&&Math.random()<.6,pool=W.filter(w=>w!==a&&(same?w[0]===a[0]&&w[1]!==a[1]:w[0]!==a[0]));if(pool.length<2)continue;o=[a,...sh(pool).slice(0,2)];if(new Set(o.map(w=>same?w[1]:w[0])).size===3)break;o=[]}
  if(!o.length)o=["apple","banana","orange"];const r=[...o].sort()[0],oo=sh(o);
  return {voice:[G8("AO_Q")],cap:"Which word comes first in the dictionary?",layout:"col",hint:"elim",opts:oo.map(w=>({h:`<b class="word">${w}</b>`,say:EW(w)})),ans:oo.indexOf(r),why:{t:`${[...o].sort().join(", ")}`,v:[G8("AO_E")]}}},
 compound(){const r=pickOne(CPW),x=sh([...new Set(CPX)].filter(w=>enSay(w).length)).slice(0,2),o=sh([r,...x]);
  return {voice:[G8("CP_Q")],cap:"Which word is made of two smaller words?",layout:"col",hint:"elim",opts:o.map(w=>({h:`<b class="word">${w}</b>`,say:EW(w)})),ans:o.indexOf(r),why:{t:`${r}: two words joined together`,v:[G8("CP_E")]}}}};
const G8WIN={"count:factor":[10,12],"count:multiple":[9,12],"count:prime":[11,12],"clock:convert":[9,12],"shapes:angle":[9,12],"shapes:lines":[9,12],"shapes:symm":[10,12],"letters:aorder":[9,12],"read:aorder":[10,12],"letters:compound":[9,12]};
/* fixed Grade 4-5 questions: their own sections */
const PX8={farm:["farm"],people:["people"],time:["clock"],geo:["shapes"],english:["letters","read"]},PX8C=[...new Set(Object.values(PX8).flat())];
const _wp8=wPool;wPool=function(cat){
  if(PX8C.includes(cat)){const lv=lvl(),all=WQ.filter(w=>w.i.startsWith("px")&&(PX8[w.t]||[]).includes(cat)&&w.a<=Math.max(3,lv));for(const d of [2,3,4]){const f=all.filter(w=>w.a>=lv-d);if(f.length>=6)return f}return all}
  return _wp8(cat).filter(w=>!PX8[w.t])};
const _kf8=kindsFor;kindsFor=function(cat){let k=_kf8(cat);if(!G8_READY)return k;const l=lvl();
  const f=k.filter(x=>l<=(KMAX8[cat+":"+x]||99));
  const add=Object.keys(G8WIN).filter(x=>x.startsWith(cat+":")&&l>=G8WIN[x][0]&&l<=G8WIN[x][1]).map(x=>x.split(":")[1]);
  if(PX8C.includes(cat)&&l>=9&&!f.includes("w")&&wPool(cat).length>=4)add.push("w");
  const out=[...new Set([...f,...add])];return out.length?out:k};
const _bq8=buildQ;buildQ=function(cat,k,used){if(G8_READY&&k==="w"&&PX8C.includes(cat)){const q=qWatcher(cat,used||new Set());if(q){q.cat=cat;q.kind=q.kind||"w";return q}}if(G8_READY&&G8GEN[k]){const q=G8GEN[k]();if(q._o3){delete q._o3;const perm=sh([0,1,2]),r=q.opts[q.ans];q.opts=perm.map(i=>q.opts[i]);q.ans=q.opts.indexOf(r)}
  q.cat=cat;q.kind=k;if(!q.exp&&q.why)q.exp={t:q.why.t,v:q.why.v};if(!q.why&&q.exp)q.why={t:q.exp.t,v:q.exp.v||[]};return q}return _bq8(cat,k,used)};
const _ff8=factFor;factFor=function(q){const f=_ff8(q);if(f&&q&&G8GEN[q.kind]&&!factV(f).length)return "";return f};
Object.assign(GMAP,Object.fromEntries(Object.keys(G8WIN).map(x=>[x.replace(":","."),G({factor:"Factors",multiple:"Multiples",prime:"Prime numbers",convert:"Units of time",angle:"Angles",lines:"Parallel and perpendicular lines",symm:"Lines of symmetry",aorder:"Dictionary order",compound:"Compound words"}[x.split(":")[1]],
  x.startsWith("letters")||x.startsWith("read")?["lang","vocab"]:["cog","math"],[["cog","logic"]],"Grade 4-5 (ages 9-12, or children who are ahead).","Practice")])));
Object.assign(GMAP,{"farm.w":G("Plants and farms",["cre","science"],[["life","everyday"]],"Grade 4-5: plants, food chains and where our food comes from.","Practice"),
 "people.w":G("People and kindness",["soc","empathy"],[["life","everyday"]],"Grade 4-5: kind choices, jobs, money and staying safe online.","Practice"),
 "clock.w":G("Calendar and time",["cog","math"],[["life","everyday"]],"Grade 4-5: leap years, centuries and the 24-hour clock.","Practice"),
 "shapes.w":G("3D shapes and angles",["cog","math"],[["cog","logic"]],"Grade 4-5: faces, edges, corners and degrees.","Practice")});
Object.assign(GMAP,{"letters.w":G("English words (Grade 3-5)",["lang","vocab"],[["lang","read"]],"Prefixes and suffixes, words that sound alike, idioms, similes, kinds of words.","Practice"),
 "read.w":G("Reading (Grade 3-5)",["lang","read"],[["cog","logic"]],"Short texts: clues, main idea and the lesson of a story.","Practice")});
