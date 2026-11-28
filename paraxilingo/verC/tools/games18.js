
/* ================= v38: FAMILY TALK =================
   Sara, Arash, Mom and Dad talk (each in their own voice, with speech bubbles),
   then Lulu asks one question about what they said. Ages 5-10. */
const TALK38=__TALK38__;
const WHO38={sara:{e:"👧",n:"Sara"},arash:{e:"👦",n:"Arash"},mom:{e:"👩",n:"Mom"},dad:{e:"👨",n:"Dad"}};
(function(){const st=document.createElement("style");st.textContent=`
.t38-stage{display:flex;flex-direction:column;gap:8px;margin:6px auto 10px;max-width:560px;width:100%}
.t38-row{display:flex;align-items:flex-end;gap:8px;opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s}
.t38-row.on{opacity:1;transform:none}.t38-row.r{flex-direction:row-reverse}
.t38-av{flex:0 0 auto;width:46px;height:46px;border-radius:50%;background:#fff6e0;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 2px 0 rgba(0,0,0,.12);transition:transform .2s}
.t38-row.talk .t38-av{transform:scale(1.15);box-shadow:0 0 0 4px #ffd34d}
.t38-bub{background:#fff;border-radius:16px;padding:8px 12px;font-size:17px;line-height:1.3;box-shadow:0 2px 0 rgba(0,0,0,.1);max-width:78%;color:#333}
.t38-bub b{display:block;font-size:12px;color:#9a7b3c;margin-bottom:2px}
.t38-row.talk .t38-bub{background:#fffbe8}
.t38-again{display:block;margin:0 auto 8px;border:0;border-radius:14px;background:#e9f3ff;color:#2a5ea8;font-size:15px;padding:6px 14px;cursor:pointer}
.t38-o .q31-b{display:flex;align-items:center;justify-content:center;gap:6px}.t38-o .q31-b span{font-size:28px}`;document.head.appendChild(st)})();
const tkFit38=t=>{const a=S.age||6;return a>=t.a[0]&&a<=t.a[1]};
function tkPool38(cat){const P=TALK38.filter(t=>(cat==="story"||t.s===cat));const f=P.filter(tkFit38);return f}
function qTalk38(cat){const P=tkPool38(cat);if(!P.length)return null;const n=Math.min(2,P.length);
  const rounds=sh(P).slice(0,n).map(t=>{const idx=sh(t.o.map((o,i)=>i));return {t,opts:idx.map(i=>({h:`<span>${t.o[i][0]}</span>${t.o[i][1]}`,say:["w/"+t.o[i][3]],i})),ans:idx.indexOf(t.n)}});
  return {game:"talk38",gid:"g:talk38",cat,rounds,voice:rounds[0].t.l.map((_,j)=>"w/"+(rounds[0].t.p||"TK38")+"_"+rounds[0].t.id+"_"+j),factT:"Listening carefully helps us understand our family and friends.",factV:[]}}
GAMES.talk38=q=>{let ri=0,miss=0;
  gShow(`<div class="game">${gHead("💬","Family talk","Listen to the family, then answer")}
    <div class="t38-stage" id="t38s"></div><div class="q31" id="t38q"></div></div>`);
  const alive=()=>!q.done&&L&&L.q===q&&$("t38s");
  const play=(R,done)=>{const rows=[...$("t38s").querySelectorAll(".t38-row")];let j=0;hush();
    const step=()=>{if(!alive())return;rows.forEach(r=>r.classList.remove("talk"));if(j>=rows.length){done&&done();return}
      const r=rows[j];r.classList.add("on","talk");const c=["w/"+(R.t.p||"TK38")+"_"+R.t.id+"_"+j];j++;let gone=false;const go=()=>{if(gone)return;gone=true;clearTimeout(to);setTimeout(step,250)};const to=setTimeout(()=>{if(alive()&&r.classList.contains("talk"))go()},S.voice?9000:1500);sayseq(c,go)};step()};  /* a clip that never ends must not stop the talk */
  const ask=R=>{if(!alive())return;let tries=0;const t=R.t;
    $("t38q").innerHTML=`<button class="t38-again" id="t38a">🔁 Listen again</button><div class="q31-cap">${t.q}</div><div class="q31-o t38-o">${R.opts.map((o,i)=>`<button class="opt q31-b" data-i="${i}">${o.h}</button>`).join("")}</div>`;
    const bs=[...$("t38q").querySelectorAll(".q31-b")];
    $("t38a").onclick=()=>{window.__optTok={};play(R,()=>rd31(q,{voice:["w/"+(t.p||"TK38")+"_"+t.id+"_Q"],opts:R.opts},bs,null,()=>{}))};
    bs.forEach(b=>b.onclick=()=>{if(q.done||b.classList.contains("no")||b.classList.contains("ok"))return;window.__optTok={};hush();const i=+b.dataset.i;
      if(i===R.ans){sfx.good();b.classList.add("ok");burstAt(b,12);sayseq(["w/"+(t.p||"TK38")+"_"+t.id+"_E"],()=>{});
        setTimeout(()=>{if(!alive())return;if(ri<q.rounds.length)round();else gameWin(q,miss>1?1:0,b)},4600)}
      else{sfx.oops();miss++;tries++;b.classList.add("no");bounce(b);
        if(tries<2){toastHint("Not quite - try again!");sayseq(["w/LULU_TRY_ONCE"],()=>{})}  /* the answer is shown only after a second wrong try */
        else{bs[R.ans].classList.add("hint");toastHint("Look again!")}}});
    rd31(q,{voice:["w/"+(t.p||"TK38")+"_"+t.id+"_Q"],opts:R.opts},bs,null,()=>{})};
  const round=()=>{const R=q.rounds[ri++];q._r=R;$("t38q").innerHTML="";
    const first=R.t.l[0][0];
    $("t38s").innerHTML=R.t.l.map(([w,en])=>{const W=WHO38[w]||{e:"🙂",n:w};return `<div class="t38-row${w===first?"":" r"}"><div class="t38-av">${W.e}</div><div class="t38-bub"><b>${W.n}</b>${en}</div></div>`}).join("");
    setTimeout(()=>play(R,()=>setTimeout(()=>ask(R),400)),500)};
  round();
  window.__gSolve=()=>{const go=()=>{if(!alive())return;const bs=$("t38q").querySelectorAll(".q31-b");const R=q._r;if(R&&bs.length&&!bs[R.ans].classList.contains("ok"))bs[R.ans].click();setTimeout(go,1200)};go()}};
if(typeof gReadOpts==="function"){const _gro38=gReadOpts;gReadOpts=function(q){if(q&&q.game==="talk38"){const b=$("t38a");if(b)b.click();return true}return _gro38(q)}}
const B38={f_talk38:qTalk38};
Object.assign(FMIN,{f_talk38:5});Object.assign(FMAX,{f_talk38:10});
const _bf38=buildFormat;buildFormat=function(kind,cat){if(B38[kind])return B38[kind](cat);return _bf38(kind,cat)};
const _ff38=formatsFor0;formatsFor0=function(cat){const b=_ff38(cat);if(cat!=="story"&&tkPool38(cat).length&&ageOK("f_talk38")&&!b.includes("f_talk38"))return [...b,"f_talk38"];return b};
/* Domi's Radio (story section): after the radio story, a family talk too */
const _om38=openMound;openMound=function(i){_om38(i);try{if(!L||L.cat!=="story"||!ageOK("f_talk38")||L.queue.some(x=>x.game==="talk38"))return;
  const q=qTalk38("story");if(!q)return;q.cat="story";q.kind="f_talk38";L.queue.push(q);L.total=L.queue.filter(x=>!x.radio).length}catch(e){}};
Object.assign(GMAP,{"g:talk38":G("Family talk",["lang","listen"],[["lang","vocab"],["cog","memory"]],"Sara, Arash, Mom and Dad talk in their own voices (rain, Grandma's birthday, sharing, the Moon...), then Lulu asks a question about what they said.","Practice")});
window.__g38=()=>{const q=L&&L.q;return q&&q.rounds&&q.game==="talk38"?q.rounds.map(r=>r.t.id):null};
