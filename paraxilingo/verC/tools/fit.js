
/* =====================================================================================================
   Nov 11d: every question looks the same and fits the screen.
   - the "hear it again" speaker sits in the top row (right of the section name) for every question and game
   - if anything would fall below the screen, the picture shrinks first, then the whole question, until the
     answers and the CHECK / GO button are visible (uses the visible screen height, also inside in-app browsers)
   ===================================================================================================== */
(function(){
  const vh=()=>Math.round(window.visualViewport?visualViewport.height:innerHeight);
  const parts=b=>{const kids=[...b.children];const g=kids.find(e=>e.classList.contains("game"));const pool=g?[...g.children]:kids;
    const body=pool.filter(e=>!e.matches(".qkick,.qtitle,svg[width='0']")&&getComputedStyle(e).position!=="absolute");
    const vis=body.filter(e=>e.matches(".qtop2,.qvis,.listen,.bigpic")||(!e.matches("button,.qopts,.qcheck,.kd-btns,.bm-btns,.sc-tog,.mx-row,.dc-pad,.mv-cards,.pd-o,.qu-t,.mx-pots,.ch-items,.em-os,.gr-opts,.bk-pad,.rbpad")&&e.getBoundingClientRect().height>120));
    return {body,vis}};
  const bottom=b=>{let m=0;b.querySelectorAll(":scope > *, :scope > .game > *").forEach(e=>{if(e.offsetParent===null||e.matches(".game"))return;const r=e.getBoundingClientRect();if(r.height>0)m=Math.max(m,r.bottom)});return m};
  const limit=b=>{const br=b.getBoundingClientRect();return Math.min(br.bottom,vh())-6};
  let busy=false;
  function fit(reset){const b=document.getElementById("qBody");if(!b||busy)return;busy=true;try{
    const kick=b.querySelector(".qkick"),sp=b.querySelector("#qSpk");if(kick&&sp&&sp.parentNode!==kick){sp.classList.add("inkick");kick.appendChild(sp)}
    b.querySelectorAll(".qtop2").forEach(t=>{t.style.display=t.children.length?"":"none"});
    const {body,vis}=parts(b);body.forEach(e=>e.style.zoom="");
    const over=()=>bottom(b)>limit(b)+1;if(!over())return;
    for(let z=.92;z>=.38&&over();z-=.06)vis.forEach(e=>e.style.zoom=z.toFixed(2));          /* 1. shrink the picture */
    for(let z=.95;z>=.75&&over();z-=.05)body.filter(e=>!vis.includes(e)).forEach(e=>e.style.zoom=z.toFixed(2));  /* 2. then the rest */
  }finally{busy=false}}
  window.pxFit=fit;
  let t=null;const soon=(r,d)=>{clearTimeout(t);t=setTimeout(()=>requestAnimationFrame(()=>fit(r)),d||60)};
  function hook(){const b=document.getElementById("qBody");if(!b||b.__fit)return;b.__fit=1;
    new MutationObserver(ms=>{const fresh=ms.some(m=>m.target===b&&m.addedNodes.length);soon(fresh,fresh?30:150);if(fresh){setTimeout(()=>fit(false),450);setTimeout(()=>fit(false),1300)}}).observe(b,{childList:true,subtree:true});
    b.addEventListener("load",()=>soon(false,80),true)}
  try{hook();new MutationObserver(hook).observe(document.body,{childList:true,subtree:false})}catch(e){}
  addEventListener("resize",()=>soon(true,120));if(window.visualViewport)visualViewport.addEventListener("resize",()=>soon(true,120));
})();
