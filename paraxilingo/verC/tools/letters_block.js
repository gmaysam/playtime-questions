
/* ================= letters, words and reading (from the shared pool, 'in the games' only) ================= */
const POOL=__POOL__;
const WORD_FALLBACK="bird honey cow cake rainbow key baby salad sun star balloon bed duck socks ten tree chicken bus cab mad bag ham fan map web leg hen jet bib lid pig fin lip hit mix pod log mom mop hot fox tub mud mug gum cut dog frog box bee bug cat hat bat car snake truck net can cap pin ship nut".split(" ");
const WORDS=POOL.words.map(x=>({i:x.i,w:(x.w||WORD_FALLBACK[x.i]||"").toLowerCase()})).filter(x=>x.w&&!["mad","hit","mix","cut","mom"].includes(x.w));
const LET="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lSay=l=>["w/LULU_LN_"+l];
const wSay=x=>["w/LULU_WORD"+x.i];
function pickWord(used){const c=sh(WORDS);return c.find(x=>!used.has("wd"+x.i))||c[0]}
function qLetters(k,used){
  if(k==="abc"){const it=sh(POOL.abc).find(x=>!used.has("abc"+x.l))||POOL.abc[0];used.add("abc"+it.l);const o=sh([it.l,...sh(POOL.abc.map(x=>x.l).filter(l=>l!==it.l)).slice(0,2)]);
    return {voice:[...lSay(it.l),...enSay(it.w),...lSay(it.l)],cap:`${it.l} … ${it.w}! Where is ${it.l}?`,visual:`<div class="bigemo">${WORD_E[it.w]||optE(it.w)||"🔤"}</div>`,opts:o.map(l=>({h:`<b class="num letter">${l}</b>`,say:lSay(l)})),ans:o.indexOf(it.l),layout:"row3",hint:"elim",exp:{t:it.l,v:["w/LULU_ANS_IS",...lSay(it.l)]}}}
  if(k==="lafter"||k==="lbefore"){const i=k==="lafter"?ri(0,24):ri(1,25),r=LET[k==="lafter"?i+1:i-1],o=sh([r,...sh(LET.split("").filter(l=>l!==r&&l!==LET[i])).slice(0,2)]);
    return {voice:[k==="lafter"?"w/LULU_AB_AFTER":"w/LULU_AB_BEFORE",...lSay(LET[i])],cap:k==="lafter"?`${LET[i]} → ?`:`? → ${LET[i]}`,visual:`<div class="seq">${k==="lafter"?`<b class="bignum sm">${LET[i]}</b><span class="arr">➜</span><b class="bignum sm q">?</b>`:`<b class="bignum sm q">?</b><span class="arr">➜</span><b class="bignum sm">${LET[i]}</b>`}</div>`,opts:o.map(l=>({h:`<b class="num letter">${l}</b>`,say:lSay(l)})),ans:o.indexOf(r),layout:"row3",hint:"elim",exp:{t:r,v:["w/LULU_ANS_IS",...lSay(r)]}}}
  const x=pickWord(used);used.add("wd"+x.i);const o=sh([x,...sh(WORDS.filter(y=>y.i!==x.i)).slice(0,2)]);
  if(k==="listen")   /* hear the English word, tap its picture (the pictures are not named, that is the game) */
    return {voice:["w/PX_G11_W_LISTEN",...wSay(x)],cap:"Listen and find it!",visual:`<div class="listen">👂</div>`,opts:o.map(y=>({h:PIC("wd_"+y.i,"wp op")})),ans:o.indexOf(x),layout:"row3",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x)]}};
  if(k==="first"){const r=x.w[0].toUpperCase(),lo=sh([r,...sh(LET.split("").filter(l=>l!==r)).slice(0,2)]);
    return {voice:["w/LULU_W_FIRST",...wSay(x)],cap:`${x.w} starts with…?`,visual:PIC("wd_"+x.i,"wp big"),opts:lo.map(l=>({h:`<b class="num letter">${l}</b>`,say:lSay(l)})),ans:lo.indexOf(r),layout:"row3",hint:"elim",exp:{t:`${r} … ${x.w}`,v:["w/LULU_ANS_IS",...lSay(r),...wSay(x)]}}}
  return {voice:["w/LULU_SK_WHICH"],cap:"What is it?",visual:PIC("wd_"+x.i,"wp big"),opts:o.map(y=>({h:`<b class="word">${y.w}</b>`,say:wSay(y)})),ans:o.indexOf(x),layout:"col",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS",...wSay(x)]}};
}
/* reading: the answers are NOT read aloud, the child reads them */
function qRead(k,used){
  if(k==="sentence"){const st=sh(POOL.sents).find(x=>!used.has(x.id))||POOL.sents[0];used.add(st.id);const o=sh(st.o.slice());
    return {voice:["w/LULU_RD_SENTENCE"],cap:"",visual:`<div class="sent">${st.q.replace("___",'<span class="gap">?</span>')}</div>`,opts:o.map(w=>({h:`<b class="word">${w}</b>`})),ans:o.indexOf(st.a),layout:"row3",hint:"elim",exp:{t:st.q.replace("___",st.a),v:["w/LULU_ANS_IS"]}}}
  const pool=POOL.sight.slice(0,lvl()<=5?30:lvl()<=6?60:100),x=sh(pool).find(y=>!used.has("sw"+y.i))||pool[0];used.add("sw"+x.i);
  const o=sh([x,...sh(pool.filter(y=>y.i!==x.i&&y.w[0]!==x.w[0])).slice(0,2)]);
  if(k==="flash")return {voice:["w/LULU_RD_FLASH"],cap:"Look! Then find it.",visual:`<div class="flash"><b class="word big">${x.w}</b></div>`,opts:o.map(y=>({h:`<b class="word">${y.w}</b>`})),ans:o.indexOf(x),layout:"row3",hint:"elim",flash:true,exp:{t:x.w,v:["w/LULU_ANS_IS","w/LULU_SIGHT"+x.i]}};
  return {voice:["w/LULU_RD_BALLOON","w/LULU_SIGHT"+x.i],cap:"Pop the balloon!",visual:`<div class="listen">🎈</div>`,opts:o.map(y=>({h:`<span class="balloon"><b class="word">${y.w}</b></span>`})),ans:o.indexOf(x),layout:"row3",hint:"elim",exp:{t:x.w,v:["w/LULU_ANS_IS","w/LULU_SIGHT"+x.i]}};
}
