
/* =================== Nov 10: GEOGRAPHY - continents, oceans and countries on a real world map (Natural Earth, public domain) =================== */
const GEO=__GEOMAP__,GEO_READY=__GEOVOICE__;
const CONT=[["AF","Africa","آفریقا","Africa has the most countries: 54 of them!"],["AS","Asia","آسیا","Asia is the biggest continent. Iran is in Asia!"],["EU","Europe","اروپا","Europe is small but has many countries, like France and Italy."],
 ["NA","North America","آمریکای شمالی","Canada, the United States and Mexico are in North America."],["SA","South America","آمریکای جنوبی","South America has the Amazon, the biggest rainforest."],
 ["OC","Oceania","اقیانوسیه","Kangaroos live in Australia, in Oceania."],["AN","Antarctica","جنوبگان","Antarctica is the coldest place on Earth. Penguins live there!"]];
const OCEANS=[["pacific","Pacific Ocean","The Pacific is the biggest and deepest ocean."],["atlantic","Atlantic Ocean","The Atlantic lies between the Americas, Europe and Africa."],["indian","Indian Ocean","The Indian Ocean is the warmest ocean."],
 ["arctic","Arctic Ocean","The Arctic Ocean is near the North Pole. Polar bears live there."],["southern","Southern Ocean","The Southern Ocean goes all the way around Antarctica."]];
const GV=n=>"w/PX_GEO_"+n;
function mapSVG(o={}){const cls=o.cls||"";let vb=o.vb||"0 0 800 400";
  if(o.cty!==undefined){const [x0,y0,x1,y1]=GEO.T[o.cty][1],cx=(x0+x1)/2,cy=(y0+y1)/2;let w=Math.max((x1-x0)*2.4,(y1-y0)*4.4,190);w=Math.min(w,800);const h=w/2;vb=`${Math.max(0,Math.min(800-w,cx-w/2)).toFixed(0)} ${Math.max(0,Math.min(400-h,cy-h/2)).toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}`}
  let g=`<path d="${GEO.sphere}" class="gsea"/>`;
  for(const [k] of CONT)g+=`<path d="${GEO.C[k]}" class="gland${o.hi===k?" hi":""}${o.tap?" tap":""}" data-c="${k}"/>`;
  if(o.cty!==undefined)g+=`<path d="${GEO.T[o.cty][0]}" class="gcty" vector-effect="non-scaling-stroke"/>`;
  if(o.ocean){const [x,y]=GEO.O[o.ocean];g+=`<circle cx="${x}" cy="${y}" r="44" class="gping"/><circle cx="${x}" cy="${y}" r="30" class="gmark"/><text x="${x}" y="${y+13}" text-anchor="middle" class="gq">?</text>`}
  return `<svg viewBox="${vb}" class="gmap ${cls}" role="img" aria-label="World map">${g}</svg>`}
function qGeo(k,used){
  if(k==="gcont"){const c=sh([...CONT.keys()]),r=c.find(i=>!used.has("gc"+i))??c[0];used.add("gc"+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,Math.min(3,DK()))]);
    return {gid:"geo.cont",voice:[GV("Q_CONT")],cap:"Which continent is coloured?",visual:mapSVG({hi:CONT[r][0]}),opts:o.map(i=>({h:`<b class="word">${CONT[i][1]}</b>`,say:[GV("N_"+CONT[i][0])]})),ans:o.indexOf(r),layout:"col",hint:"elim",
      why:{t:"",f:CONT[r][3],v:[GV("F_"+CONT[r][0])]},exp:{t:CONT[r][1],v:[GV("N_"+CONT[r][0])]}}}
  if(k==="gocean"){const c=sh([...OCEANS.keys()]),r=c.find(i=>!used.has("go"+i))??c[0];used.add("go"+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,Math.min(3,DK()))]);
    return {gid:"geo.ocean",voice:[GV("Q_OCEAN")],cap:"Which ocean is this?",visual:mapSVG({ocean:OCEANS[r][0]}),opts:o.map(i=>({h:`<b class="word">${OCEANS[i][1]}</b>`,say:[GV("N_"+OCEANS[i][0])]})),ans:o.indexOf(r),layout:"col",hint:"elim",
      why:{t:"",f:OCEANS[r][2],v:[GV("F_"+OCEANS[r][0])]},exp:{t:OCEANS[r][1],v:[GV("N_"+OCEANS[r][0])]}}}
  if(k==="gcty"){const c=sh([...COUNTRIES.keys()]),r=c.find(i=>!used.has("gy"+i))??c[0];used.add("gy"+r);const o=sh([r,...c.filter(i=>i!==r).slice(0,Math.min(2,DK()))]),nm=i=>COUNTRIES[i][0].replace(/^the /,"The ");
    return {gid:"geo.cty",voice:[GV("Q_CTY")],cap:"Which country is red?",visual:mapSVG({cty:r,cls:"zoom"}),opts:o.map(i=>({h:`<span class="oe">${COUNTRIES[i][1]}</span><small>${nm(i)}</small>`,say:ctySay(i)})),ans:o.indexOf(r),layout:"row3",hint:"elim",
      exp:{t:nm(r),v:ctySay(r)}}}
  /* gfind: tap the continent on the map */
  const c=sh([...CONT.keys()].filter(i=>lvl()>=6||!["EU","AN"].includes(CONT[i][0]))),r=c.find(i=>!used.has("gf"+i))??c[0];used.add("gf"+r);
  return {game:"mapfind",gid:"geo.find",t:r,voice:[GV("N_"+CONT[r][0]),GV("Q_FIND")],factT:CONT[r][3],factV:[GV("F_"+CONT[r][0])]}}
function mapFindQ(q){const R=CONT[q.t];let miss=0;
  gShow(`<div class="game">${gHead("🗺️","Map",`Find ${R[1]}!`)}<div class="gmwrap">${mapSVG({tap:true,vb:R[0]==="AN"?"0 0 800 400":"20 0 760 330"})}</div><p class="gmhint">Tap it on the map</p></div>`);gAsk(q);
  const els=$("qBody").querySelectorAll(".gland.tap"),svg=$("qBody").querySelector(".gmap");
  /* a tap near a continent counts too (Europe is small on a phone): nearest continent centre within reach */
  svg.onclick=e=>{if(q.done)return;let k=e.target.dataset&&e.target.dataset.c;if(!k){const m=svg.getScreenCTM();if(!m)return;const pt=new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse());let best=null,bd=70;
      for(const [c] of CONT){const [x,y]=GEO.cc[c],d=Math.hypot(x-pt.x,y-pt.y);if(d<bd){bd=d;best=c}}k=best}if(k)tapC(k)};
  const tapC=k=>{const p=[...els].find(e=>e.dataset.c===k);
    if(k===R[0]){p.classList.add("hi","ok");gameWin(q,miss,p.closest("svg"),[])}
    else{miss++;sfx.oops();p.classList.add("no");setTimeout(()=>p.classList.remove("no"),700);const i=CONT.findIndex(x=>x[0]===k);sayseq([GV("N_"+k)],()=>{});toastHint(`That's ${CONT[i][1]}!`);
      if(miss>=3){const t=[...els].find(e=>e.dataset.c===R[0]);t.classList.add("hi");gameLearn(q,`${R[1]} is here!`,[GV("N_"+R[0])])}}};
  window.__gSolve=()=>tapC(R[0])}
GAMES.mapfind=mapFindQ;
