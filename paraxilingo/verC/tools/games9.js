
/* =====================================================================================================
   v17 (Nov 13): EVERY QUESTION TYPE HAS A SCHOOL GRADE, taken from the owner's two references:
   Khan Academy Kids (preschool - grade 2, Head Start + Common Core), PBS KIDS math framework / learning goals
   (ages 2-8), and Khan Academy grades 3-5 for older children.
   grade: -2 = age 3-4 (preschool) · -1 = age 4-5 (pre-K) · 0 = kindergarten (5-6) · 1 = grade 1 (6-7) ... 5 = grade 5 (10-11) · 6 = grade 6 (stretch)
   child's grade = level - 5   (level = age + parent's 🐢/🐇/🚀 setting + how well the child does)
   a type is shown from its grade [lo] until [hi] (usually one or two grades of practice after it is taught)
   ===================================================================================================== */
const GRADE={
 count:{find:[-2,0],more:[-2,0],less:[-2,0],long:[-2,0],order:[-1,1],measure:[0,1],after:[0,1],before:[0,1],missing:[0,2],skip:[0,2],compare:[1,2],oddeven:[1,3],graph:[1,3],place:[2,5],round:[2,5],multiple:[3,5],factor:[4,6],prime:[4,6]},
 add:{addPic:[-2,0],subPic:[-1,0],share:[-1,1],left:[0,1],sum:[0,1],minus:[0,1],bond:[0,1],make10:[0,1],teach:[0,2],pizza:[1,2],double:[1,2],half:[1,2],numline:[1,2],carry:[2,3],groups:[2,3],big:[2,3],change:[2,5],
  times:[3,5],divide:[3,5],fraccmp:[3,5],fracof:[3,5],story:[3,5],big3:[3,5],mul2:[4,6],decimal:[4,6],neg:[6,6],percent:[6,6]},
 clock:{routine:[-2,0],season:[-1,1],nowseason:[-1,1],oclock:[0,1],today:[0,1],tomorrow:[0,1],yesterday:[0,1],week:[0,1],half:[1,2],after:[1,2],before:[1,2],months:[1,2],monthafter:[1,2],quarter:[2,3],minutes:[2,3],elapsed:[3,5],convert:[4,5],w:[4,6]},
 letters:{abc:[-2,0],match:[-2,0],listen:[-1,0],rhyme:[-1,0],first:[-1,0],whatis:[-1,0],lafter:[-1,0],lbefore:[0,1],whear:[0,1],build:[0,1],wspell:[0,2],wopp:[0,2],wplu:[1,3],wpast:[2,3],aorder:[2,3],compound:[2,3],wsyn:[2,4],w:[3,6]},
 read:{balloon:[-1,0],flash:[0,1],whear:[0,1],sentence:[0,2],wspell:[0,2],wopp:[0,2],wplu:[1,3],wpast:[2,3],aorder:[2,3],wsyn:[2,4],w:[3,6]},
 farm:{sound:[-2,-1],home:[-2,0],fly:[-2,0],match:[-2,0],food:[-1,1],water:[-1,1],w:[3,6]},
 shapes:{color:[-2,-1],shape:[-2,0],match:[-2,0],bigsmall:[-2,0],pattern:[-1,2],sides:[0,1],both:[0,2],area:[3,4],angle:[4,5],lines:[4,5],symm:[4,5],w:[4,6]},
 people:{feel:[-2,0],job:[-1,1],job2:[0,2],w:[3,6]}};
/* where each grade comes from (shown in the parents' table) */
const GRADE_SRC={"count:find":"PBS KIDS math 2-4: count objects to 10","count:after":"PBS KIDS 5-6: count on from a number; Khan Kindergarten","count:skip":"PBS KIDS 5-6: count by 2s, 5s, 10s","count:compare":"Khan 1st grade: compare numbers","count:oddeven":"PBS KIDS grade 1: odd and even","count:graph":"PBS KIDS grade 1: bar and picture graphs","count:place":"Khan 2nd-4th grade: place value","count:round":"PBS KIDS grade 2 / Khan 4th grade: rounding","count:multiple":"Khan 3rd-4th grade: multiplication, multiples","count:factor":"Khan 4th grade: factors and multiples","count:prime":"Khan 4th grade: factors, multiples, primes",
 "add:make10":"PBS KIDS 5-6: partners that make 10","add:groups":"PBS KIDS grade 2: equal-group multiplication","add:carry":"Khan 2nd grade: add within 100","add:times":"Khan 3rd grade: multiplication and division","add:fracof":"Khan 3rd-4th grade: fractions","add:big3":"Khan 4th grade: multi-digit adding","add:mul2":"Khan 4th grade: multi-digit multiplication","add:decimal":"Khan 4th-5th grade: decimals","add:neg":"Khan 6th grade: negative numbers","add:percent":"Khan 6th grade: percent",
 "clock:routine":"PBS KIDS 4-5: morning, afternoon, night","clock:yesterday":"PBS KIDS grade 1: today, tomorrow, yesterday","clock:oclock":"Khan 1st grade: time to the hour","clock:quarter":"PBS KIDS grade 2: quarter hours","clock:minutes":"PBS KIDS grade 2: nearest 5 minutes","clock:elapsed":"Khan 3rd grade: time","clock:convert":"Khan 4th grade: units of measurement",
 "letters:abc":"Khan Kids preschool-K: alphabet knowledge","letters:lafter":"Khan Kids K: letter recognition","letters:wopp":"Khan Kids language: opposites","letters:wpast":"Common Core grade 2 (Khan Kids grade 2 path)","letters:aorder":"Grade 2: beginning dictionaries","letters:compound":"Grade 2: compound words","letters:wsyn":"Grade 2-4: word meanings","letters:w":"Grade 3-5 language: prefixes and suffixes, words that sound alike, idioms, similes and metaphors, kinds of words","read:w":"Grade 3-5 reading: clues, main idea, the lesson of a story","farm:w":"Grade 3-5 science: plants, food chains and webs, soil, resources","people:w":"Grade 3-5: honesty, community, jobs, money, responsibility",
 "farm:food":"PBS KIDS science PK-K: what animals need","shapes:shape":"PBS KIDS 2-4: circle, square, triangle","shapes:sides":"PBS KIDS 5-6: count sides and corners","shapes:area":"Khan 3rd grade: area and perimeter","shapes:angle":"Khan 4th grade: angles","shapes:symm":"Khan 4th grade: lines of symmetry",
 "people:feel":"Khan Kids / PBS KIDS social-emotional PK-K","people:job":"PBS KIDS social studies PK-K"};
const kGrade=()=>lvl()-5;
const kOK=k=>{if(G8GEN[k])return G8_READY;if(M2GEN[k]||LGEN[k])return V15_READY;if(typeof MQGEN!=="undefined"&&MQGEN[k])return MQ_READY;return true};
const _kf9g=kindsFor;kindsFor=function(cat){const orig=_kf9g(cat),G=GRADE[cat];if(!G)return orig;const g=kGrade();
  const ok=k=>kOK(k)&&(k!=="w"||wPool(cat).length>=4);
  /* types outside the table (e.g. animal facts) keep their own windows */
  let out=[...new Set([...Object.keys(G).filter(k=>ok(k)&&G[k][0]<=g&&g<=G[k][1]),...orig.filter(k=>!G[k])])];
  /* thin section: borrow from at most 1 grade below or above (never baby questions for a big child) */
  if(out.length<3){const near=Object.keys(G).filter(k=>ok(k)&&!out.includes(k)&&G[k][1]>=g-1&&G[k][0]<=g+1).sort((a,b)=>Math.min(Math.abs(G[a][1]-g),Math.abs(G[a][0]-g))-Math.min(Math.abs(G[b][1]-g),Math.abs(G[b][0]-g))||(G[b][1]-G[a][1]));
    for(const k of near){if(out.length>=3)break;out.push(k)}}
  /* nothing near (e.g. a 🚀 child above the top of a section): the hardest types the section has */
  if(!out.length)out=Object.keys(G).filter(ok).sort((a,b)=>G[b][1]-G[a][1]).slice(0,3);
  return out.length?out:orig};
const _bq9=buildQ;buildQ=function(cat,k,used){const q=_bq9(cat,k,used);if(q&&k==="teach"&&!q.why&&q.exp&&q.exp.t)q.why={t:q.exp.t,v:(q.exp.v||[]).slice()};return q};
window.__gradeTable=()=>Object.entries(GRADE).flatMap(([c,o])=>Object.entries(o).map(([k,[lo,hi]])=>({cat:c,kind:k,lo,hi,src:GRADE_SRC[c+":"+k]||"",name:(GMAP[c+"."+k]||{}).n||(GMAP[c+"."+k]||{}).name||""})));
