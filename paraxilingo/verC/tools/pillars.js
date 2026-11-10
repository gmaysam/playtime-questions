
/* =====================================================================================================
   Nov 10: SIX LEARNING PILLARS - one central map from every game to the pillars and skills it develops,
   an activity log, a transparent score, and the parents' dashboard (radar first, details on demand).
   ===================================================================================================== */
const PILLARS=[
 {id:"cog",name:"Thinking & Understanding",full:"Cognitive Development",e:"🧠",c:"#5B8DEF",
  d:"How your child reasons, solves problems, works with numbers and patterns, remembers and pays attention.",
  sk:[["logic","Logic & problem-solving"],["math","Mathematics & patterns"],["memory","Memory & attention"],["curiosity","Curiosity & critical thinking"]]},
 {id:"lang",name:"Language & Communication",full:"Language & Communication",e:"💬",c:"#FF8A5B",
  d:"Listening, words, stories, reading and writing - the building blocks of communication.",
  sk:[["listen","Speaking & listening"],["vocab","Vocabulary & storytelling"],["read","Reading & writing"],["express","Expressing ideas & asking questions"]]},
 {id:"soc",name:"Social & Emotional",full:"Social & Emotional Development",e:"🤝",c:"#EC6FA0",
  d:"Recognising feelings, caring for others, sharing, and growing confidence.",
  sk:[["emotions","Understanding emotions"],["empathy","Empathy & cooperation"],["sharing","Sharing & communication"],["confidence","Confidence & independence"]]},
 {id:"phys",name:"Physical Development",full:"Physical Development",e:"🤸",c:"#2EB8A6",
  d:"Moving, hand control, coordination, and knowing how to keep the body healthy.",
  sk:[["gross","Gross motor skills"],["fine","Fine motor skills"],["coord","Coordination & balance"],["body","Body awareness & healthy habits"]]},
 {id:"cre",name:"Creativity & Exploration",full:"Creativity & Exploration",e:"🔭",c:"#F4A62A",
  d:"Art and music, discovering nature and science, experimenting, and building new things.",
  sk:[["art","Art, music & imagination"],["science","Science & nature"],["experiment","Experimentation"],["invent","Inventing & building"]]},
 {id:"life",name:"Practical Life Skills",full:"Practical Life Skills & Independence",e:"🧭",c:"#8E6FD8",
  d:"Everyday know-how: time and routines, staying safe, making decisions and taking care of oneself.",
  sk:[["decide","Making decisions"],["respons","Taking responsibility"],["everyday","Everyday problem-solving"],["selfcare","Self-care & organisation"]]}];
const PIL=Object.fromEntries(PILLARS.map(p=>[p.id,p]));
const skillName=(p,s)=>((PIL[p]||{}).sk||[]).find(x=>x[0]===s)?.[1]||s;

/* ---- the central game -> pillar map. key: game id. p = primary [pillar,skill], s = secondary list, o = objective,
   m = learning method (Play / Explore / Create / Practice / Reflect). Every game the app can show MUST resolve here;
   the release check fails otherwise. ---- */
const G=(name,p,s,o,m)=>({name,p,s:s||[],o,m});
const FM=[["cre","science"]],FIN=["phys","fine"];
const GMAP={
 "count.find":G("Counting objects",["cog","math"],0,"Count a group of pictures and choose how many.","Practice"),
 "count.more":G("More or fewer",["cog","math"],0,"Compare two groups and find the one with more.","Practice"),
 "count.less":G("More or fewer",["cog","math"],0,"Compare two groups and find the one with fewer.","Practice"),
 "count.long":G("Longer or shorter",["cog","math"],[["cog","logic"]],"Compare lengths by measuring with blocks.","Practice"),
 "count.missing":G("Missing number",["cog","math"],[["cog","logic"]],"Find the number that is missing in a counting line.","Practice"),
 "count.after":G("Number after",["cog","math"],0,"Say which number comes next.","Practice"),
 "count.before":G("Number before",["cog","math"],0,"Say which number comes before.","Practice"),
 "count.skip":G("Skip counting",["cog","math"],0,"Count in 2s, 5s and 10s.","Practice"),
 "count.graph":G("Reading a chart",["cog","math"],[["cog","logic"]],"Read a bar chart and compare amounts.","Practice"),
 "count.order":G("Numbers in order",["cog","math"],[["cog","logic"]],"Tap number balloons from smallest to biggest.","Play"),
 "add.addPic":G("Adding with pictures",["cog","math"],0,"Put two groups together and count them.","Practice"),
 "add.sum":G("Adding",["cog","math"],0,"Add two numbers.","Practice"),
 "add.big":G("Bigger sums",["cog","math"],0,"Add larger numbers.","Practice"),
 "add.carry":G("Adding with carrying",["cog","math"],[["cog","logic"]],"Add two-digit numbers, carrying a ten.","Practice"),
 "add.subPic":G("Taking away with pictures",["cog","math"],0,"Take some away and count what is left.","Practice"),
 "add.minus":G("Taking away",["cog","math"],0,"Subtract numbers.","Practice"),
 "add.left":G("How many are left",["cog","math"],0,"Solve a little take-away story.","Practice"),
 "add.share":G("Sharing equally",["cog","math"],0,"Split things fairly between friends (early division).","Practice"),
 "add.groups":G("Equal groups",["cog","math"],0,"Count equal groups (early multiplication).","Practice"),
 "add.teach":G("Is Domi right?",["cog","math"],[["cog","curiosity"]],"Check someone else's answer - thinking critically.","Reflect"),
 "add.pizza":G("Pizza fractions",["cog","math"],0,"Colour a half, a quarter or three quarters.","Play"),
 "clock.routine":G("Daily routine",["life","selfcare"],0,"Know what we do at each part of the day.","Explore"),
 "clock.oclock":G("Telling time",["cog","math"],[["life","everyday"]],"Read the time on a clock.","Practice"),
 "clock.half":G("Telling time",["cog","math"],[["life","everyday"]],"Read half past on a clock.","Practice"),
 "clock.quarter":G("Telling time",["cog","math"],[["life","everyday"]],"Read quarter past and quarter to.","Practice"),
 "clock.minutes":G("Telling time",["cog","math"],[["life","everyday"]],"Read minutes on a clock.","Practice"),
 "clock.season":G("Seasons",["cre","science"],0,"Know the seasons and what happens in each.","Explore"),
 "clock.nowseason":G("Seasons",["cre","science"],0,"Know which season it is now.","Explore"),
 "clock.today":G("Days & months",["life","selfcare"],[["cog","memory"]],"Know the days of the week.","Practice"),
 "clock.tomorrow":G("Days & months",["life","selfcare"],[["cog","memory"]],"Know which day comes tomorrow.","Practice"),
 "clock.yesterday":G("Days & months",["life","selfcare"],[["cog","memory"]],"Know which day was yesterday.","Practice"),
 "clock.week":G("Days & months",["life","selfcare"],[["cog","memory"]],"Know how a week is organised.","Practice"),
 "clock.after":G("Days & months",["life","selfcare"],[["cog","memory"]],"Know which day comes next.","Practice"),
 "clock.before":G("Days & months",["life","selfcare"],[["cog","memory"]],"Know which day came before.","Practice"),
 "clock.months":G("Days & months",["life","selfcare"],[["cog","memory"]],"Know the months of the year.","Practice"),
 "clock.monthafter":G("Days & months",["life","selfcare"],[["cog","memory"]],"Know which month comes next.","Practice"),
 "letters.abc":G("Letters A-Z",["lang","read"],0,"Recognise the letters of the alphabet.","Practice"),
 "letters.listen":G("Hear the word",["lang","listen"],[["lang","vocab"]],"Listen to an English word and find its picture.","Practice"),
 "letters.match":G("Word & picture",["lang","vocab"],[["lang","read"]],"Match a word with its picture.","Practice"),
 "letters.rhyme":G("Rhyming words",["lang","listen"],0,"Hear which words end with the same sound.","Play"),
 "letters.first":G("First sounds",["lang","read"],[["lang","listen"]],"Find the letter a word starts with.","Practice"),
 "letters.whatis":G("Read the word",["lang","read"],[["lang","vocab"]],"Read a short word and pick its picture.","Practice"),
 "letters.lafter":G("Alphabet order",["lang","read"],0,"Know which letter comes next.","Practice"),
 "letters.lbefore":G("Alphabet order",["lang","read"],0,"Know which letter comes before.","Practice"),
 "letters.build":G("Build the word",["lang","read"],0,"Spell a word by tapping its letters in order.","Play"),
 "read.balloon":G("Sight words",["lang","read"],0,"Recognise common words by sight.","Practice"),
 "read.flash":G("Quick-look words",["lang","read"],[["cog","memory"]],"Remember a word seen for a moment.","Play"),
 "read.sentence":G("Finish the sentence",["lang","read"],[["lang","vocab"]],"Read a sentence and choose the missing word.","Practice"),
 "farm.home":G("Animal homes",["cre","science"],0,"Know where animals live.","Explore"),
 "farm.fly":G("Animals that fly",["cre","science"],0,"Know which animals can fly.","Explore"),
 "farm.water":G("Animals in water",["cre","science"],0,"Know which animals live in water.","Explore"),
 "farm.food":G("What animals eat",["cre","science"],0,"Know what animals eat.","Explore"),
 "farm.sound":G("Animal sounds",["cre","science"],[["lang","listen"]],"Match an animal with its sound.","Explore"),
 "farm.match":G("Matching pairs",["lang","vocab"],FM,"Match animal pictures with their names.","Play"),
 "match:an":G("Matching pairs",["lang","vocab"],FM,"Match animal pictures with their names.","Play"),
 "match:pl":G("Matching planets",["cre","science"],[["lang","vocab"]],"Match planets with their names.","Play"),
 "match:wd":G("Matching words",["lang","vocab"],[["lang","read"]],"Match pictures with written words.","Play"),
 "match:sh":G("Matching shapes",["cog","math"],[["lang","vocab"]],"Match shapes with their names.","Play"),
 "shapes.shape":G("Shape names",["cog","math"],0,"Recognise and name shapes.","Practice"),
 "shapes.sides":G("Sides and corners",["cog","math"],0,"Count the sides of a shape.","Practice"),
 "shapes.bigsmall":G("Big and small",["cog","math"],0,"Compare sizes.","Practice"),
 "shapes.color":G("Colours",["lang","vocab"],[["cre","art"]],"Name colours.","Practice"),
 "shapes.pattern":G("Patterns",["cog","math"],[["cog","logic"]],"Find what comes next in a pattern.","Play"),
 "shapes.both":G("Two clues",["cog","logic"],[["cog","math"]],"Find the one that fits two clues at once.","Play"),
 "shapes.match":G("Matching shapes",["cog","math"],[["lang","vocab"]],"Match shapes with their names.","Play"),
 "robot":G("Robot path (coding)",["cog","logic"],[["cre","invent"]],"Plan the steps that take the robot to the flag - first coding.","Play"),
 "g:simon":G("Simon colours",["cog","memory"],0,"Watch a colour sequence and repeat it.","Play"),
 "g:piano":G("Piano notes",["cog","memory"],[["cre","art"]],"Listen to notes and play them back.","Play"),
 "g:pairs":G("Memory pairs",["cog","memory"],0,"Flip cards and remember where the pairs are.","Play"),
 "g:order":G("Numbers in order",["cog","math"],[["cog","logic"]],"Tap number balloons from smallest to biggest.","Play"),
 "g:pizza":G("Pizza fractions",["cog","math"],0,"Colour a half, a quarter or three quarters.","Play"),
 "g:build":G("Build the word",["lang","read"],0,"Spell a word by tapping its letters in order.","Play"),
 "people.feel":G("Feelings",["soc","emotions"],0,"Recognise how someone feels from their face.","Explore"),
 "people.job":G("Jobs",["cog","curiosity"],0,"Learn who does which job in our community.","Explore"),
 "people.job2":G("Jobs",["cog","curiosity"],0,"Learn what people do in their jobs.","Explore"),
 "flags.flag":G("Flags of the world",["cog","curiosity"],[["cog","memory"]],"Recognise countries' flags.","Explore"),
 "flags.flag2":G("Flags of the world",["cog","curiosity"],[["cog","memory"]],"Recognise countries' flags.","Explore"),
 "w:a":G("Animal facts",["cre","science"],[["cog","curiosity"]],"Questions about animals and how they live.","Explore"),
 "w:d":G("Dinosaurs",["cre","science"],[["cog","curiosity"]],"Questions about dinosaurs.","Explore"),
 "w:e":G("Our Earth",["cre","science"],[["cog","curiosity"]],"Seas, deserts, volcanoes and more.","Explore"),
 "w:n":G("Plants & nature",["cre","science"],[["cog","curiosity"]],"How plants and trees grow.","Explore"),
 "w:p":G("Planets",["cre","science"],[["cog","curiosity"]],"Questions about the planets and space.","Explore"),
 "w:s":G("Sky & weather",["cre","science"],[["cog","curiosity"]],"Rain, sun, stars and weather.","Explore"),
 "w:b":G("My body",["phys","body"],[["cre","science"]],"Know the body and healthy habits.","Explore"),
 "w:f":G("Food",["phys","body"],[["cre","science"]],"Know where food comes from and healthy eating.","Explore"),
 "w:l":G("Everyday life & safety",["life","everyday"],[["soc","sharing"]],"Road safety, helpers, sharing and caring.","Explore"),
 "w:m":G("Numbers & shapes quiz",["cog","math"],0,"Quick questions about numbers and shapes.","Practice"),
 "w:w":G("What is this?",["lang","vocab"],0,"Name things from their picture.","Practice"),
 "w:x":G("Little experiments",["cre","experiment"],[["cre","science"]],"What floats, what melts, what a magnet picks up.","Explore"),
 "skytf":G("Sky: true or not?",["cre","science"],[["cog","curiosity"]],"Decide if a sentence about the sky is true.","Explore"),
 "skypic":G("Sky pictures",["cre","science"],[["lang","vocab"]],"Name things we see in the sky.","Explore"),
 "planet":G("Planet names",["cre","science"],[["lang","vocab"]],"Recognise the planets.","Explore"),
 "sky2":G("Space questions",["cre","science"],[["cog","curiosity"]],"Bigger questions about planets, stars and space.","Explore"),
 "story":G("Domi's Radio stories",["lang","listen"],[["lang","vocab"],["cog","memory"]],"Listen to a story and remember what happened.","Explore"),
 "paint":G("Colouring pages",["cre","art"],[FIN],"Colour a picture freely.","Create"),
 /* new formats; the secondary pillar follows the content of each round */
 "g:sort":G("Sort into baskets",["cog","logic"],[FIN],"Sort things into two groups by a rule.","Play"),
 "g:tapall":G("Find them all",["cog","memory"],0,"Find every item that fits - careful looking.","Play"),
 "g:tcount":G("Tap to count",["cog","math"],0,"Count by touching each object, then show it in a ten-frame.","Practice"),
 "g:tshow":G("Show the number",["cog","math"],0,"Show a number in a ten-frame.","Practice"),
 "g:swipe":G("Yes or no",["cog","logic"],0,"Decide quickly if each card fits a rule.","Play"),
 "g:feed":G("Feed the animal",["cre","science"],[FIN],"Drag the right food to the animal.","Play"),
 "g:setclock":G("Set the clock",["cog","math"],[["life","everyday"],FIN],"Turn the clock hands to show a time.","Practice"),
 "g:seq":G("Put in order",["cog","logic"],[FIN],"Put steps of a process in order.","Play"),
 "g:dragpat":G("Finish the pattern",["cog","math"],[["cog","logic"],FIN],"Drag the missing piece into a pattern.","Play"),
 "g:balance":G("Balance scale",["cog","math"],[["cog","logic"]],"Make both sides equal (early equations).","Play"),
 "g:spy":G("I spy",["cog","memory"],[["lang","vocab"]],"Find a named thing in a busy picture.","Play"),
 "g:trace":G("Trace it",["lang","read"],[FIN],"Trace a letter with a finger (early writing).","Create"),
 "g:trace:num":G("Trace a number",["cog","math"],[FIN],"Trace a number with a finger.","Create"),
 "g:whack":G("Quick eyes",["cog","memory"],[["phys","coord"]],"Tap only the right one before it hides.","Play"),
 "g:catch":G("Catch!",["phys","coord"],[["cog","memory"]],"Move the basket to catch only the right things.","Play"),
 "g:paint":G("Colour by instruction",["cre","art"],[["lang","listen"]],"Follow spoken steps to colour shapes.","Create")};
/* content-dependent extra pillars for the new formats */
const GSET={sort:{fly:FM,fruit:FM,hot:FM,farm:FM,sky:FM,num:[["cog","math"]],letter:[["lang","read"]],shape:[["cog","math"]]},
 tapall:{wings:FM,water:FM,fruit:FM,red:[["lang","vocab"]],even:[["cog","math"]],shape:[["cog","math"]],letter:[["lang","read"]],planets:FM},
 swipe:{fruit:FM,fly:FM,water:FM,planet:FM,corner:[["cog","math"]],big:[["cog","math"]],flag:[["cog","curiosity"]]},
 seq:{plant:FM,chick:FM,butterfly:FM,life:FM,day:[["life","selfcare"]],week:[["life","selfcare"]],months:[["life","selfcare"]],size:[["cog","math"]],planets:FM,psize:FM},
 spy:{sky:FM,flags:[["cog","curiosity"]],map:[["cog","curiosity"]],town:[["cog","curiosity"]],kitchen:FM,paper:[["cog","math"]],farm:FM,sound:[["lang","listen"]]},
 whack:{letter:[["lang","read"]],num:[["cog","math"]],animal:FM},catch:{fruit:FM,big:[["cog","math"]],letter:[["lang","read"]]}};

/* which game was this question? */
function gidOf(q,cat){cat=q.cat||cat||(L&&L.cat)||"";
  if(q.gid)return q.gid;if(q.robot)return "robot";if(q.match)return "match:"+(q.mset||"an");if(q.wid)return "w:"+q.wid.replace(/\d+$/,"");
  if(q.game){if(q.game==="trace"&&/^\d$/.test(q.ch||""))return "g:trace:num";return "g:"+q.game}
  if(cat==="story")return "story";if(cat==="memory"||cat==="robot")return q.kind==="robot"?"robot":"g:"+q.kind;
  return cat+"."+(q.kind||"")}
function gsub(q){const g=q.game;if(!g)return "";return g==="sort"||g==="spy"?(q.set||q.bg||""):g==="tapall"?String(q.set||"").split(":")[0]:g==="swipe"?q.deck:g==="seq"?(q.s&&q.s.k):g==="whack"?(/^[A-Z]$/.test(q.t)?"letter":/^\d$/.test(q.t)?"num":"animal"):g==="catch"?(q.lbl==="fruit"?"fruit":/bigger/.test(q.lbl)?"big":"letter"):""}
function gameInfo(gid,sub){const m=GMAP[gid];if(!m)return null;const g=gid.startsWith("g:")?gid.slice(2):"",extra=(GSET[g]||{})[sub]||[];
  const s=[...m.s,...extra].filter((x,i,a)=>!(x[0]===m.p[0]&&x[1]===m.p[1])&&a.findIndex(y=>y[0]===x[0]&&y[1]===x[1])===i);return Object.assign({},m,{s})}

/* ---- activity log: one small record per answer. [day, game id, result 2=right first time / 1=right after trying again / 0=not yet, level 0-2, age, sub] ---- */
const evDay=(d=new Date())=>Math.floor((d.getTime()-d.getTimezoneOffset()*6e4)/864e5);
function logEv(q,ok){try{if(!S.ev)S.ev=[];const gid=gidOf(q);S.ev.push([evDay(),gid,ok?(q.tries?1:2):0,S.diff,S.age,gsub(q)||""]);if(S.ev.length>4000)S.ev.splice(0,S.ev.length-4000)}catch(e){}}
/* data recorded before the log existed: the per-skill history kept since Nov 8 (real answers; their exact days are not known, so they count on the last day each skill was played) */
function migrateEv(){if(S.evMig)return;S.evMig=1;if(!S.ev)S.ev=[];const sk=S.sk||{};
  for(const [k,r] of Object.entries(sk)){const [cat,name]=k.split("|");let kind=null;
    for(const kk of Object.keys(GMAP))if(kk.startsWith(cat+".")&&skName(cat,kk.slice(cat.length+1))===name){kind=kk;break}
    const gid=kind||(cat==="story"?"story":null);if(!gid||!r.d)continue;const dd=new Date(r.d+"T12:00:00"),day=isNaN(dd)?evDay():evDay(dd);
    (r.h||"").split("").forEach(c=>S.ev.push([day,gid,c==="1"?2:1,1,S.age,""]))}
  (S.paintings||[]).forEach(p=>{const dd=new Date((p.d||today())+"T12:00:00");S.ev.push([isNaN(dd)?evDay():evDay(dd),"paint",2,1,S.age,""])});
  S.ev.sort((a,b)=>a[0]-b[0]);save()}

/* ---- scoring (transparent):
   - each answer counts for its game's main skill (weight 1) and for its secondary skills (weight 0.5)
   - a skill's score = how often the answer was right on the FIRST try in its last 30 answers, with a small
     smoothing (+1 right, +2 tries) and harder levels counting a bit more (easy 0.85, normal 1, hard 1.2)
   - stages: Exploring (fewer than 6 answers) -> Practising (6+ answers on 2+ days) -> Showing progress (score 70+ with 10+ answers)
   - a pillar shows a score only when it has 10+ answers in skills with enough data; otherwise "Not enough data"
   - the score never counts how long or how often a child played, only how they answered ---- */
const LVW=[.85,1,1.2],MIN_SKILL=6,MIN_PIL=10;
function evsUntil(day){return (S.ev||[]).filter(e=>e[0]<=day)}
function scoreAll(day=evDay(),evs){evs=evs||evsUntil(day);const sk={};
  for(const e of evs){const m=gameInfo(e[1],e[5]);if(!m)continue;
    [[m.p,1],...m.s.map(x=>[x,.5])].forEach(([[p,s],w])=>{const k=p+"."+s,r=sk[k]||(sk[k]={p,s,list:[],days:new Set(),n:0});r.list.push([e[2],w*LVW[e[3]??1]]);r.days.add(e[0]);r.n+=w})}
  for(const r of Object.values(sk)){const last=r.list.slice(-30);let h=0,t=0;for(const [res,w] of last){t+=w;if(res===2)h+=w}
    r.score=Math.round((h+1)/(t+2)*100);r.cnt=r.list.length;r.stage=r.cnt<MIN_SKILL?"exploring":r.days.size<2?"exploring":r.score>=70&&r.cnt>=10?"progress":"practising";r.ok=r.cnt>=MIN_SKILL}
  const pil={};for(const P of PILLARS){const rs=Object.values(sk).filter(r=>r.p===P.id),okr=rs.filter(r=>r.ok),n=okr.reduce((a,r)=>a+r.n,0),all=rs.reduce((a,r)=>a+r.n,0);
    pil[P.id]={n:all,score:n>=MIN_PIL&&okr.length?Math.round(okr.reduce((a,r)=>a+r.score*Math.sqrt(r.n),0)/okr.reduce((a,r)=>a+Math.sqrt(r.n),0)):null,skills:rs}}
  return {sk,pil}}

/* ===================================== parents' dashboard ===================================== */
const PSHORT={cog:"Thinking",lang:"Language",soc:"Social",phys:"Physical",cre:"Creativity",life:"Life skills"};
const AGE_CTX=[[0,2,"sensory exploration, movement and first words"],[2,4,"play, copying others, new words and discovery"],[4,6,"imagination, stories, early maths and getting along with others"],[6,8,"reading, writing, logic and step-by-step problem-solving"],[8,99,"critical thinking, creativity, deeper understanding and independence"]];
const STAGE={exploring:["Exploring","🌱"],practising:["Practising","🌿"],progress:["Showing progress","🌳"]};
const PER={week:[7,"This week","last 7 days"],month:[30,"This month","last 30 days"],all:[1e5,"All time","since the start"]};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const dayDate=d=>new Date(d*864e5);
const fmtDay=d=>dayDate(d).toLocaleDateString("en-GB",{day:"numeric",month:"short",timeZone:"UTC"});
const ago=d=>{const k=evDay()-d;return k<=0?"today":k===1?"yesterday":k<7?k+" days ago":fmtDay(d)};
const perEv=()=>{const n=PER[S.dPer||"week"][0],t=evDay();return (S.ev||[]).filter(e=>e[0]>t-n)};
function histOK(day){const r=scoreAll(day);return Object.values(r.pil).filter(p=>p.score!==null).length>=3?r:null}
function gamesFor(pid,sid){const out=new Map();for(const m of Object.values(GMAP)){const main=m.p[0]===pid&&(!sid||m.p[1]===sid),also=m.s.some(x=>x[0]===pid&&(!sid||x[1]===sid));
  if(main||also){const o=out.get(m.name);if(!o||main&&o.role!=="main")out.set(m.name,{name:m.name,role:main?"main":"also",m:m.m})}}return [...out.values()]}

/* --- radar --- */
function radarSVG(cur,wk,mo,sel){const cx=180,cy=166,R=100,pt=(i,v)=>{const a=-Math.PI/2+i*Math.PI/3,r=R*v/100;return [cx+r*Math.cos(a),cy+r*Math.sin(a)]};
  let g="";for(const v of [25,50,75,100])g+=`<polygon points="${PILLARS.map((_,i)=>pt(i,v).join(",")).join(" ")}" class="rgrid${v===100?" out":""}"/>`;
  PILLARS.forEach((_,i)=>{const [x,y]=pt(i,100);g+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="raxis"/>`});
  g+=`<text x="${cx+4}" y="${cy-R/2-2}" class="rtick">50</text><text x="${cx+4}" y="${cy-R-2}" class="rtick">100</text>`;
  const shape=(sc,cls)=>{const ix=PILLARS.map((P,i)=>sc.pil[P.id].score!==null?i:-1).filter(i=>i>=0);if(ix.length<3)return "";
    return `<polygon points="${ix.map(i=>pt(i,sc.pil[PILLARS[i].id].score).join(",")).join(" ")}" class="${cls}"/>`};
  if(mo)g+=shape(mo,"rmo");if(wk)g+=shape(wk,"rwk");g+=shape(cur,"rnow");
  PILLARS.forEach((P,i)=>{const s=cur.pil[P.id].score;if(s===null){const [x,y]=pt(i,0);return}
    const [x,y]=pt(i,s);if(Object.values(cur.pil).filter(p=>p.score!==null).length<3){const [x0,y0]=pt(i,0);g+=`<line x1="${x0}" y1="${y0}" x2="${x}" y2="${y}" stroke="${P.c}" stroke-width="5" stroke-linecap="round"/>`}
    g+=`<circle cx="${x}" cy="${y}" r="${sel===P.id?7:5}" fill="${P.c}" stroke="#fff" stroke-width="2"/>`});
  PILLARS.forEach((P,i)=>{const s=cur.pil[P.id].score,[x,y]=pt(i,124),anc=Math.abs(x-cx)<8?"middle":x>cx?"start":"end",dy=y<cy-20?-8:y>cy+20?14:4;
    g+=`<g class="rlab${sel===P.id?" on":""}${s===null?" nd":""}" data-pil="${P.id}" tabindex="0" role="button" aria-label="${P.name}: ${s===null?"not enough data":s+" out of 100"}">
      <rect x="${anc==="middle"?x-58:anc==="start"?x-6:x-110}" y="${y+dy-26}" width="116" height="46" fill="transparent"/>
      <text x="${x}" y="${y+dy-6}" text-anchor="${anc}" class="rname">${P.e} ${PSHORT[P.id]}</text>
      <text x="${x}" y="${y+dy+12}" text-anchor="${anc}" class="rval" ${s===null?"":`fill="${P.c}"`}>${s===null?"No data yet":s}</text></g>`;
    const [hx,hy]=pt(i,100);g+=`<line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" class="rhit" data-pil="${P.id}"/>`});
  return `<svg viewBox="-36 0 432 336" class="radar" role="img" aria-label="Six learning pillars radar chart">${g}</svg>`}

/* --- line chart (overall + each pillar, or one pillar) --- */
function trendData(pid){const ev=S.ev||[];if(!ev.length)return [];const t=evDay(),first=ev[0][0],span=t-first;
  let days=[];if(span<21){const s=new Set(ev.map(e=>e[0]));days=[...s].sort((a,b)=>a-b).slice(-10)}else{for(let k=7;k>=0;k--)if(t-k*7>=first)days.push(t-k*7)}
  return days.map(d=>{const r=scoreAll(d),vals=Object.fromEntries(PILLARS.map(P=>[P.id,r.pil[P.id].score])),ok=Object.values(vals).filter(v=>v!==null);
    return {d,vals,all:ok.length?Math.round(ok.reduce((a,b)=>a+b,0)/ok.length):null}}).filter(x=>pid?x.vals[pid]!==null:x.all!==null)}
function lineSVG(pid){const D=trendData(pid);if(D.length<2)return `<div class="dempty">📈 The line appears once there are two ${(S.ev||[]).length&&evDay()-(S.ev[0][0])>=21?"weeks":"days"} with enough answers.</div>`;
  const W=340,H=170,l=30,r=10,t=12,b=26,X=i=>l+(W-l-r)*(D.length===1?.5:i/(D.length-1)),Y=v=>t+(H-t-b)*(1-v/100);
  let g="";for(const v of [0,50,100])g+=`<line x1="${l}" x2="${W-r}" y1="${Y(v)}" y2="${Y(v)}" class="lgrid"/><text x="${l-6}" y="${Y(v)+4}" text-anchor="end" class="ltick">${v}</text>`;
  const path=(get,cls,col)=>{let d="",pen=false;D.forEach((x,i)=>{const v=get(x);if(v===null){pen=false;return}d+=(pen?"L":"M")+X(i).toFixed(1)+","+Y(v).toFixed(1);pen=true});return `<path d="${d}" class="${cls}" ${col?`stroke="${col}"`:""}/>`};
  if(pid){const c=PIL[pid].c;g+=`<path d="M${X(0)},${Y(0)}${D.map((x,i)=>"L"+X(i)+","+Y(x.vals[pid])).join("")}L${X(D.length-1)},${Y(0)}Z" fill="${c}" opacity=".12"/>`+path(x=>x.vals[pid],"lmain",c);
    D.forEach((x,i)=>g+=`<circle cx="${X(i)}" cy="${Y(x.vals[pid])}" r="3.5" fill="${c}"><title>${fmtDay(x.d)}: ${x.vals[pid]}</title></circle>`)}
  else{PILLARS.forEach(P=>{if(D.some(x=>x.vals[P.id]!==null))g+=path(x=>x.vals[P.id],"lthin",P.c)});g+=path(x=>x.all,"lmain","#25324B");
    D.forEach((x,i)=>g+=`<circle cx="${X(i)}" cy="${Y(x.all)}" r="3.5" fill="#25324B"><title>${fmtDay(x.d)}: ${x.all}</title></circle>`)}
  const step=Math.ceil(D.length/5);D.forEach((x,i)=>{if(i%step===0||i===D.length-1)g+=`<text x="${X(i)}" y="${H-6}" text-anchor="${i===D.length-1?"end":i===0?"start":"middle"}" class="ltick">${fmtDay(x.d)}</text>`});
  return `<svg viewBox="0 0 ${W} ${H}" class="lchart" role="img" aria-label="Progress over time">${g}</svg>`+(pid?"":`<div class="llegend"><span><i style="background:#25324B"></i>Overall</span>${PILLARS.filter(P=>D.some(x=>x.vals[P.id]!==null)).map(P=>`<span><i style="background:${P.c}"></i>${PSHORT[P.id]}</span>`).join("")}</div>`)}

/* --- donut: what the child actually did in the period (each answer counted once, for its game's main pillar) --- */
function donutSVG(E){const cnt=Object.fromEntries(PILLARS.map(P=>[P.id,0]));E.forEach(e=>{const m=gameInfo(e[1],e[5]);if(m)cnt[m.p[0]]++});const tot=E.length;
  if(!tot)return `<div class="dempty">🍩 No activity in this period yet.</div>`;
  const C=2*Math.PI*52;let off=0,g=`<circle cx="70" cy="70" r="52" class="dbg"/>`;
  PILLARS.forEach(P=>{const f=cnt[P.id]/tot;if(!f)return;g+=`<circle cx="70" cy="70" r="52" stroke="${P.c}" stroke-dasharray="${(f*C-(f<1?2:0)).toFixed(2)} ${C}" stroke-dashoffset="${(-off*C).toFixed(2)}" class="dseg"><title>${P.name}: ${Math.round(f*100)}%</title></circle>`;off+=f});
  return `<div class="donut"><svg viewBox="0 0 140 140" role="img" aria-label="Activity by pillar">${g}<text x="70" y="68" text-anchor="middle" class="dnum">${tot}</text><text x="70" y="86" text-anchor="middle" class="dsub">answers</text></svg>
    <ul>${PILLARS.map(P=>`<li class="${cnt[P.id]?"":"z"}"><i style="background:${P.c}"></i>${PSHORT[P.id]}<b>${Math.round(cnt[P.id]/tot*100)}%</b></li>`).join("")}</ul></div>`}
function methodsHTML(E){const M=["Play","Explore","Create","Practice","Reflect"],c=Object.fromEntries(M.map(m=>[m,0]));E.forEach(e=>{const g=GMAP[e[1]];if(g)c[g.m]++});const t=E.length||1;
  return `<div class="mbar">${M.map((m,i)=>c[m]?`<span style="flex:${c[m]};background:${["#5B8DEF","#2EB8A6","#F4A62A","#8E6FD8","#EC6FA0"][i]}" title="${m} ${Math.round(c[m]/t*100)}%"></span>`:"").join("")}</div>
    <div class="mleg">${M.map((m,i)=>`<span class="${c[m]?"":"z"}"><i style="background:${["#5B8DEF","#2EB8A6","#F4A62A","#8E6FD8","#EC6FA0"][i]}"></i>${m} ${E.length?Math.round(c[m]/t*100):0}%</span>`).join("")}</div>`}

/* --- achievements, insights: only from real answers --- */
function achievements(E,pid){const n=PER[S.dPer||"week"][0],t=evDay(),now=scoreAll(t),then=scoreAll(t-n),out=[];
  for(const [k,r] of Object.entries(now.sk)){if(pid&&r.p!==pid)continue;const o=then.sk[k];
    if(r.stage==="progress"&&(!o||o.stage!=="progress"))out.push(["🌳",`Now showing progress in <b>${skillName(r.p,r.s)}</b>`,r.p]);
    else if(r.ok&&o&&o.ok&&r.score-o.score>=15)out.push(["📈",`Improved in <b>${skillName(r.p,r.s)}</b>: ${o.score} → ${r.score}`,r.p])}
  const inP=e=>{const m=gameInfo(e[1],e[5]);return !pid||m&&(m.p[0]===pid||m.s.some(x=>x[0]===pid))},F=E.filter(inP);
  const hard=F.filter(e=>e[3]===2&&e[2]===2).length;if(hard>=5)out.push(["🚀",`<b>${hard}</b> answers right first time on the hardest level`,"cog"]);
  const rob=F.filter(e=>e[1]==="robot"&&e[2]===2).length;if(rob>=3)out.push(["🤖",`Solved <b>${rob}</b> robot coding puzzles first time`,"cog"]);
  const mem=F.filter(e=>/^g:(simon|piano)$/.test(e[1])&&e[2]===2).length;if(mem>=3)out.push(["🎹",`Repeated <b>${mem}</b> colour or note sequences from memory`,"cog"]);
  const art=F.filter(e=>e[1]==="paint").length;if(art)out.push(["🎨",`Coloured <b>${art}</b> picture${art>1?"s":""} independently`,"cre"]);
  const st=F.filter(e=>e[1]==="story"&&e[2]===2).length;if(st>=3)out.push(["📻",`Remembered <b>${st}</b> story details after listening`,"lang"]);
  const dd=new Set(F.map(e=>e[0])).size;if(!pid&&dd>=4)out.push(["📅",`Learned on <b>${dd}</b> different days`,"life"]);
  return out.slice(0,pid?6:4)}
function insights(cur,wk,E){const out=[],sc=PILLARS.filter(P=>cur.pil[P.id].score!==null);
  if(!(S.ev||[]).length)return [["👋","Play a few rounds and this picture will start to fill in. Nothing here is a judgement - it only shows what the games have seen."]];
  if(sc.length){const b=sc.reduce((a,P)=>cur.pil[P.id].score>cur.pil[a.id].score?P:a);const g=topGames(b.id,E)[0];
    out.push(["⭐",`<b>Strongest right now: ${b.name}</b> (${cur.pil[b.id].score})${g?` - mostly from ${g}`:""}.`])}
  if(wk){let best=null,d=0;sc.forEach(P=>{const o=wk.pil[P.id].score;if(o!==null&&cur.pil[P.id].score-o>d){d=cur.pil[P.id].score-o;best=P}});if(best&&d>=5)out.push(["📈",`<b>Growing: ${best.name}</b>, up ${d} points since last week.`])}
  const cnt=Object.fromEntries(PILLARS.map(P=>[P.id,0]));E.forEach(e=>{const m=gameInfo(e[1],e[5]);if(m)cnt[m.p[0]]++});
  const low=PILLARS.filter(P=>cnt[P.id]<Math.max(3,E.length*.05));if(low.length){const P=low[0],gs=gamesFor(P.id).filter(x=>x.role==="main").slice(0,2).map(x=>x.name);
    out.push(["🧭",`<b>Less explored: ${low.map(p=>PSHORT[p.id]).join(", ")}</b>. That is not a weakness - there just isn't enough play to tell yet.${gs.length?` Try <i>${gs.join("</i> or <i>")}</i>.`:""}`])}
  return out.slice(0,3)}
function topGames(pid,E){const c={};E.forEach(e=>{const m=gameInfo(e[1],e[5]);if(m&&m.p[0]===pid)c[m.name]=(c[m.name]||0)+1});return Object.entries(c).sort((a,b)=>b[1]-a[1]).map(x=>x[0])}

const HOWTO=`<details class="dhow"><summary>ℹ️ How scores work</summary><ul>
  <li>Every game is linked to the pillar and skills it really practises (its <b>main</b> skill counts fully, <b>also</b> skills count half).</li>
  <li>A skill's score (0-100) is how often ${"the child"} answered <b>right on the first try</b> in their last 30 answers for that skill. Harder levels count a little more.</li>
  <li><b>🌱 Exploring</b>: fewer than 6 answers or only one day. <b>🌿 Practising</b>: 6+ answers on 2+ days. <b>🌳 Showing progress</b>: score 70+ with 10+ answers.</li>
  <li>A pillar gets a score once its skills have 10+ answers; until then it says <b>Not enough data</b>. Playing a lot does not raise the score - only how the answers go.</li>
  <li>Little play in an area means "not seen yet", never "can't do it". Every child learns at their own pace; the app never compares children.</li></ul></details>`;

function dashHTML(pn){migrateEv();const t=evDay(),cur=scoreAll(t),wk=histOK(t-7),mo=histOK(t-30),E=perEv(),per=PER[S.dPer||"week"];
  const cw=wk&&(S.ev[0][0]<=t-7)?wk:null,cm=mo&&(S.ev[0][0]<=t-30)?mo:null;
  const ctx=AGE_CTX.find(a=>S.age>=a[0]&&S.age<a[1])||AGE_CTX[4],days=new Set(E.map(e=>e[0])).size,npil=PILLARS.filter(P=>E.some(e=>{const m=gameInfo(e[1],e[5]);return m&&m.p[0]===P.id})).length;
  const ach=achievements(E);
  return `<div class="dash">
  <div class="dover"><span class="pav" style="background:${curPlayer().color}">${esc(pn.trim()[0].toUpperCase())}</span><div><b>${esc(pn)}</b><small>Age ${S.age} · ${per[1].toLowerCase()}: ${E.length} answers on ${days} day${days===1?"":"s"}, ${npil} of 6 pillars</small></div></div>
  <div class="dper" role="tablist">${Object.entries(PER).map(([k,v])=>`<button data-dper="${k}" aria-pressed="${(S.dPer||"week")===k}">${v[1]}</button>`).join("")}</div>
  <div class="dcard dradar"><h3>What ${esc(pn)} is learning</h3>
    ${radarSVG(cur,cw,cm,null)}
    <div class="rcap" id="rCap">Tap a pillar to see its score</div>
    <div class="rleg"><span><i class="lnow"></i>Now</span>${cw?`<span><i class="lwk"></i>Last week</span>`:""}${cm?`<span><i class="lmo"></i>Last month</span>`:""}<span class="nd">○ Not enough data yet</span></div>
    <div class="plist">${PILLARS.map(P=>{const p=cur.pil[P.id];return `<button class="prow" data-pil="${P.id}"><i style="background:${P.c}1f">${P.e}</i><span><b>${P.name}</b><span class="pbar"><span style="width:${p.score??0}%;background:${P.c}"></span></span></span><em class="${p.score===null?"nd":""}">${p.score===null?(p.n?"Exploring":"Not enough data"):p.score}</em><span class="chev">›</span></button>`}).join("")}</div></div>
  <div class="dcard"><h3>Key insights</h3>${insights(cur,cw,E).map(([e,t])=>`<p class="dins"><span>${e}</span><span>${t}</span></p>`).join("")}
    <p class="dage">🎂 At ${S.age}, learning often focuses on ${ctx[2]}. Every child moves at their own pace.</p></div>
  <div class="dcard"><h3>Progress over time</h3>${lineSVG()}</div>
  <div class="dgrid"><div class="dcard"><h3>Where the time went <small>${per[2]}</small></h3>${donutSVG(E)}</div>
    <div class="dcard"><h3>How ${esc(pn)} learned <small>${per[2]}</small></h3>${methodsHTML(E)}<p class="dnote">Play, explore, create, practise and reflect are <i>ways</i> of learning - all of them help children learn how to learn.</p></div></div>
  <div class="dcard"><h3>Recent achievements <small>${per[2]}</small></h3>${ach.length?ach.map(([e,t,p])=>`<p class="dach"><span style="background:${PIL[p].c}1f">${e}</span><span>${t}</span></p>`).join(""):`<div class="dempty">🏅 Achievements show up here as ${esc(pn)} plays - each one comes from real answers.</div>`}</div>
  <details class="dcard dmap"><summary><h3>Games &amp; the skills they build</h3></summary>${PILLARS.map(P=>`<div class="mapp"><b style="color:${P.c}">${P.e} ${P.name}</b><span>${gamesFor(P.id).filter(g=>g.role==="main").map(g=>g.name).join(" · ")||"<i>No game focuses on this yet</i>"}</span></div>`).join("")}</details>
  ${HOWTO}</div>`}

function pillarHTML(pid,pn){const P=PIL[pid],t=evDay(),cur=scoreAll(t),wk=histOK(t-7),p=cur.pil[pid],E=perEv(),all=S.ev||[];
  const ring=p.score===null?`<div class="dring nd"><b>?</b><small>Not enough data</small></div>`:`<div class="dring" style="--c:${P.c};--f:${p.score*3.6}deg"><b>${p.score}</b><small>of 100</small></div>`;
  const d=wk&&wk.pil[pid].score!==null&&p.score!==null?p.score-wk.pil[pid].score:null;
  const skills=P.sk.map(([sid,name])=>{const r=cur.sk[pid+"."+sid],gs=gamesFor(pid,sid);
    const st=!r?["Not enough data","○"]:STAGE[r.stage];
    return `<div class="sk"><div class="skh"><b>${name}</b><em class="st ${r?r.stage:"nd"}">${st[1]} ${st[0]}</em></div>
      ${r&&r.ok?`<span class="pbar"><span style="width:${r.score}%;background:${P.c}"></span></span><small>${r.score}/100 · ${r.cnt} answers</small>`:r?`<small>${r.cnt} answer${r.cnt>1?"s":""} so far - a score appears after 6</small>`:""}
      <small class="skg">${gs.length?"Games: "+gs.map(g=>g.name).join(", "):"⚑ No game in the app practises this yet - everyday play and talking at home build it."}</small></div>`}).join("");
  const by=new Map();for(const e of all){const m=gameInfo(e[1],e[5]);if(!m)continue;const role=m.p[0]===pid?"main":m.s.some(x=>x[0]===pid)?"also":null;if(!role)continue;
    const o=by.get(m.name)||{name:m.name,m:m.m,role,list:[]};if(role==="main")o.role="main";o.list.push(e);by.set(m.name,o)}
  const games=[...by.values()].sort((a,b)=>b.list.at(-1)[0]-a.list.at(-1)[0]||b.list.length-a.list.length);
  const gRows=games.map(g=>{const l10=g.list.slice(-10),p10=g.list.slice(-20,-10),f=x=>Math.round(x.filter(e=>e[2]===2).length/x.length*100),now=f(l10),tr=p10.length>=5?now-f(p10):null;
    return `<div class="grow"><div class="gh"><b>${g.name}</b><em class="role ${g.role}">${g.role==="main"?"Main":"Also"}</em><em class="meth">${g.m}</em></div>
      <div class="gd"><span class="dots">${l10.map(e=>`<i class="r${e[2]}"></i>`).join("")}</span><span>${l10.filter(e=>e[2]===2).length}/${l10.length} right first try${tr===null?"":tr>=10?' <b class="up">↑</b>':tr<=-10?' <b class="dn">↓</b>':""}</span><span class="glast">${g.list.length} total · ${ago(g.list.at(-1)[0])}</span></div></div>`}).join("");
  const rs=P.sk.map(([sid])=>cur.sk[pid+"."+sid]).filter(Boolean),strong=rs.filter(r=>r.ok&&r.score>=70),need=rs.filter(r=>r.ok&&r.score<50),nd=P.sk.filter(([sid])=>!(cur.sk[pid+"."+sid]||{}).ok);
  const ach=achievements(E,pid);
  return `<div class="dash pdet"><button class="dback" id="dBack">‹ Back to Overview</button>
  <div class="dcard dhead" style="--c:${P.c}"><div class="dht"><span class="dico" style="background:${P.c}1f">${P.e}</span><div><h2>${P.full}</h2><p>${P.d}</p></div></div>
    <div class="dhs">${ring}<div><b>${p.score===null?"Not enough data yet":STAGE[rs.some(r=>r.stage==="progress")?"progress":rs.some(r=>r.ok)?"practising":"exploring"][0]}</b><small>${Math.round(p.n)} answers so far${d===null?"":` · ${d>0?"+":""}${d} since last week`}</small></div></div></div>
  <div class="dcard"><h3>Skills</h3>${skills}</div>
  <div class="dcard"><h3>Progress over time</h3>${lineSVG(pid)}</div>
  <div class="dcard"><h3>Games that build these skills</h3>${gRows||`<div class="dempty">No games in this area have been played yet. Try: ${gamesFor(pid).filter(g=>g.role==="main").slice(0,3).map(g=>g.name).join(", ")||"-"}</div>`}
    ${gRows?`<p class="dnote"><i class="dk r2"></i>right first try <i class="dk r1"></i>right after trying again <i class="dk r0"></i>not yet</p>`:""}</div>
  <div class="dcard"><h3>Achievements <small>${PER[S.dPer||"week"][2]}</small></h3>${ach.length?ach.map(([e,t])=>`<p class="dach"><span style="background:${P.c}1f">${e}</span><span>${t}</span></p>`).join(""):`<div class="dempty">None yet in this period.</div>`}</div>
  <div class="dcard"><h3>At a glance</h3>
    <p class="dins"><span>💪</span><span><b>Going well:</b> ${strong.length?strong.map(r=>skillName(pid,r.s)).join(", "):"too early to say"}</span></p>
    <p class="dins"><span>🔁</span><span><b>Could use more practice:</b> ${need.length?need.map(r=>skillName(pid,r.s)).join(", "):"nothing stands out"}</span></p>
    <p class="dins"><span>○</span><span><b>Not enough data yet:</b> ${nd.length?nd.map(x=>x[1]).join(", "):"-"}</span></p></div>
  ${HOWTO}</div>`}

/* wiring: called by showParents after it has drawn the page */
function wireDash(pn){const root=$("pSettings");
  root.querySelectorAll("[data-dper]").forEach(b=>b.onclick=()=>{S.dPer=b.dataset.dper;save();sfx.tap();const y=root.scrollTop;showParents();root.scrollTop=y});
  const cap=$("rCap"),cur=scoreAll();
  const pick=id=>{const P=PIL[id],p=cur.pil[id];root.querySelectorAll(".rlab").forEach(g=>g.classList.toggle("on",g.dataset.pil===id));
    if(cap)cap.innerHTML=`<b style="color:${P.c}">${P.e} ${P.name}</b> ${p.score===null?"· Not enough data yet":"· "+p.score+" / 100"} <button class="rgo" data-go="${id}">View details ›</button>`;
    const g=cap&&cap.querySelector("[data-go]");if(g)g.onclick=()=>openPillar(id,pn)};
  root.querySelectorAll(".radar [data-pil]").forEach(g=>{g.onclick=()=>{sfx.tap();pick(g.dataset.pil)};g.onmouseenter=()=>pick(g.dataset.pil);g.onkeydown=e=>{if(e.key==="Enter")openPillar(g.dataset.pil,pn)}});
  root.querySelectorAll(".prow").forEach(b=>b.onclick=()=>openPillar(b.dataset.pil,pn))}
function openPillar(id,pn){sfx.tap();const root=$("pSettings");root.innerHTML=pillarHTML(id,pn);root.scrollTop=0;$("dBack").onclick=()=>{sfx.tap();showParents()}}
