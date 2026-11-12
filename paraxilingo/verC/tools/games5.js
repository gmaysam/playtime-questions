
/* =====================================================================================================
   Nov 11b: variety, growing difficulty, word games for 6+, acorns only
   ===================================================================================================== */
var G5_READY=__G5VOICE__;
/* ---- 1. acorns only: wood becomes acorns (1 wood was worth about 2 acorns) ---- */
function woodMig(){try{if(!S)return;let ch=false;if(S.wood){S.acorns=(S.acorns||0)+S.wood*2;S.wood=0;ch=true}
  (S.real||[]).forEach(r=>{if(r.w){r.a=(r.a||0)+r.w*2;r.w=0;ch=true}});if(ch)save()}catch(e){}}
try{const _ls5=loadState;loadState=function(){const r=_ls5.apply(this,arguments);woodMig();return r}}catch(e){}
woodMig();

/* ---- 2. difficulty grows with each game: 4 of the last 5 right first time -> one step harder, 7 of 8 -> two steps;
        two misses in the last three -> one step easier. Never more than 2 steps above the child's age. ---- */
function gidGuess(k,cat){if(k.startsWith("f_"))return "g:"+k.slice(2);if(cat==="memory"||cat==="robot")return k==="robot"?"robot":"g:"+k;return cat+"."+k}
function boostFor(gid){try{const ev=(S.ev||[]).filter(e=>e[1]===gid).slice(-8);if(ev.length<4)return 0;const r=ev.map(e=>e[2]),l5=r.slice(-5),l3=r.slice(-3);
  if(l3.filter(x=>x===0).length>=2)return S.age>3?-1:0;if(ev.length>=8&&r.filter(x=>x===2).length>=7)return 2;if(l5.filter(x=>x===2).length>=4)return 1;return 0}catch(e){return 0}}
const _bf5=buildFormat;buildFormat=function(kind,cat){window.__bst=boostFor(gidGuess(kind,cat));try{const q=_bf5(kind,cat);if(q&&window.__bst)q.boost=window.__bst;return q}finally{window.__bst=0}};
const _bq5=buildQ;buildQ=function(cat,k,used){window.__bst=boostFor(gidGuess(k||"",cat));try{return _bq5(cat,k,used)}finally{window.__bst=0}};

/* ---- 3. no more than 2 of the same kind of game in a round. "Put the pieces together" games count as one family
        (only 1 per round), and "help it get there" games (robot, robot walk, maze) count as one family. ---- */
const FAMILY={f_puzzle:"piece",f_quilt:"piece",f_dragpat:"piece",robot:"path",f_robowalk:"path",f_maze:"path"},FAMCAP={piece:1,path:2};
/* across the whole day (all sections): puzzle-type games at most 2, any one game at most 3, path games at most 4 */
const DAYCAP={piece:2,path:2},GAMEK=["robot","simon","piano","pairs","match"];
function dayUse(){const d=new Date().toDateString();if(!S.dayUse||S.dayUse.d!==d)S.dayUse={d,c:{}};return S.dayUse.c}
const ALLF=()=>{const o=new Set();for(const c of ["count","add","clock","animals","world","sky","farm","shapes","people","flags","robot","memory","letters","read"]){try{(formatsFor(c)||[]).forEach(k=>{if(k.startsWith("f_"))o.add(k)})}catch(e){}}return [...o]};
function capRound(p,cat){if(!p)return p;const fam=k=>FAMILY[k]||k,du=dayUse(),dcap=k=>DAYCAP[fam(k)]||((k.startsWith("f_")||GAMEK.includes(k))?2:99),n={};
  const cap=k=>Math.min(FAMCAP[fam(k)]||(k==="w"?4:(k.startsWith("f_")||GAMEK.includes(k))?1:2),dcap(k)-(du[fam(k)]||0));
  let pool=[];try{pool=sh([...new Set([...(formatsFor(cat)||[]),...(kindsFor(cat)||[])])])}catch(e){}
  const out=[];for(const k of p){const f=fam(k);if((n[f]||0)<cap(k)){n[f]=(n[f]||0)+1;out.push(k);continue}
    const alt=pool.find(x=>(n[fam(x)]||0)<cap(x)&&x!==out[out.length-1]);if(alt){n[fam(alt)]=(n[fam(alt)]||0)+1;out.push(alt)}else{const ks=(kindsFor(cat)||[]).filter(x=>!x.startsWith("f_")&&!GAMEK.includes(x)),any=sh(ALLF()).find(x=>(n[fam(x)]||0)<cap(x)&&x!==out[out.length-1]);
      const pick=any||(ks.length?pickOne(ks):null);if(pick){n[fam(pick)]=(n[fam(pick)]||0)+1;out.push(pick)}}}
  /* never the same kind of question twice in a row */
  for(let i=1;i<out.length;i++)if(fam(out[i])===fam(out[i-1])){const j=out.findIndex((x,jj)=>jj>i&&fam(x)!==fam(out[i-1])&&(jj+1>=out.length||fam(out[jj+1])!==fam(out[i]))&&fam(out[jj-1])!==fam(out[i]));if(j>0)[out[i],out[j]]=[out[j],out[i]]}
  if(!window.__noDayCount){for(const k of out)du[fam(k)]=(du[fam(k)]||0)+1;try{save()}catch(e){}}
  return out}
/* capRound is applied last, in games6 (after every module has added its games) */

/* ---- 4. Pattern Detective: check every puzzle before it is shown ---- */
const _qpd5=qPDet;qPDet=function(cat){for(let t=0;t<20;t++){const q=_qpd5(cat);const nn=q.seq.filter(x=>!x).length,v=q.opts[q.ans];
  if(q.seq.length!==(q.kind==="grid"?9:6)||nn!==1||!v)continue;
  if(q.kind==="num"){const h=q.seq.indexOf(null),vals=q.seq.map((x,i)=>x?x[2]:v[2]),d=vals[1]-vals[0];if(!vals.every((x,i)=>x===vals[0]+d*i))continue;if(q.opts.filter(o=>o[2]===v[2]).length!==1)continue}
  return q}return _qpd5(cat)};

/* ---- 5. words for 6 and up: hear a word and pick it from 3 look-alike words; pick the word spelled right ---- */
const simW=(a,b)=>(a.length===b.length?2:0)+[...a].filter((c,i)=>b[i]===c).length+(a[0]===b[0]?1:0)+[...new Set(a)].filter(c=>b.includes(c)).length*.5;
function lookAlikes(x,n){const P=WORDS.filter(y=>y.i!==x.i&&y.w!==x.w);const best=sh(P).sort((a,b)=>simW(x.w,b.w)-simW(x.w,a.w));return best.slice(0,n)}
const REALW=new Set("cab can cap car cat cot cut cub cup bad bag ban bat bed beg bet bib bid big bin bit bog box boy bud bug bun bus but dad dam den dig dim dip dog dot dug fan fat fed fig fin fit fix fog fox fun fur gap gas get got gum gun gut had ham has hat hen her hid him hip his hit hog hop hot hug hum hut jam jar jet jig job jog jot jug kid kit lab lad lap leg let lid lip lit log lot mad man map mat men met mix mob mom mop mud mug nab nag nap net nod not nut pad pan pat peg pen pet pig pin pit pod pop pot pub pup put rag ram ran rap rat red rib rid rig rim rip rob rod rot rub rug run rut sad sat set sip sit six sob sod sun tab tag tan tap ten tin tip top tot tub tug van vat vet wag web wed wet wig win wit yak yam yes yet zip cow kow saw sew sow tow bow now how row low new few dew".split(" "));
function misspell(w){const V="aeiou",C="bcdfghlmnprstvw",out=new Set();const sw=w.length>2?w[0]+w[2]+w[1]+w.slice(3):w.split("").reverse().join("");if(sw!==w&&!REALW.has(sw))out.add(sw);
  for(let t=0;t<40&&out.size<5;t++){const i=ri(0,w.length-1),c=w[i],r=V.includes(c)?pickOne(V.replace(c,"").split("")):pickOne(C.replace(c,"").split(""));const m=w.slice(0,i)+r+w.slice(i+1);if(m!==w&&!WORDS.some(y=>y.w===m)&&!REALW.has(m))out.add(m)}
  if(w[0]==="c"&&!REALW.has("k"+w.slice(1)))out.add("k"+w.slice(1));return sh([...out]).slice(0,3)}
function qWords6(k,used){const x=sh(WORDS.filter(y=>y.w.length>=3&&y.w.length<=5)).find(y=>!used.has("wd"+y.i))||WORDS[0];used.add("wd"+x.i);
  if(k==="whear"){const o=sh([x,...lookAlikes(x,3)]);return {voice:["w/LULU_W_LISTEN",...wSay(x)],cap:"Listen! Which word is it?",visual:`<div class="listen">👂</div>`,opts:o.map(y=>({h:`<b class="word">${y.w}</b>`})),ans:o.indexOf(x),layout:"col",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x),...faSay(x.w)]}}}
  if(k==="wspell"){const o=sh([x.w,...misspell(x.w)]);return {voice:[G5_READY?"w/PX_G5_SPELL":"w/LULU_SK_WHICH"],cap:"Which word is spelled right?",visual:PIC("wd_"+x.i,"wp big"),opts:o.map(w=>({h:`<b class="word">${w}</b>`})),ans:o.indexOf(x.w),layout:"col",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x)]}}}
  /* whatis, harder: the other words look alike */
  const o=sh([x,...lookAlikes(x,3)]);return {voice:["w/LULU_SK_WHICH"],cap:"What is it?",visual:PIC("wd_"+x.i,"wp big"),opts:o.map(y=>({h:`<b class="word">${y.w}</b>`,say:wSay(y)})),ans:o.indexOf(x),layout:"col",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x)]}}}
const _ql5=qLetters;qLetters=function(k,used){if(k==="whear"||k==="wspell"||(k==="whatis"&&lvl()>=6))return qWords6(k,used);return _ql5(k,used)};
const _qr5=qRead;qRead=function(k,used){if(k==="whear"||k==="wspell")return qWords6(k,used);return _qr5(k,used)};
const _kf5=kindsFor;kindsFor=function(cat){const a=lvl();
  if(cat==="letters"&&a>=6)return a>=7?["whear","wspell","whatis","first","lafter","lbefore","build"]:["whear","wspell","whatis","first","lafter","rhyme","build"];
  if(cat==="read"&&a>=6)return ["balloon","flash","sentence","whear","wspell"];return _kf5(cat)};
Object.assign(GMAP,{"letters.whear":G("Hear the word",["lang","read"],[["lang","listen"]],"Hear an English word and pick it from three look-alike words.","Practice"),
 "letters.wspell":G("Spelled right?",["lang","read"],[["cog","memory"]],"Look at the picture and pick the word that is spelled right.","Practice"),
 "read.whear":G("Hear the word",["lang","read"],[["lang","listen"]],"Hear an English word and pick it from three look-alike words.","Practice"),
 "read.wspell":G("Spelled right?",["lang","read"],[["cog","memory"]],"Look at the picture and pick the word that is spelled right.","Practice")});
