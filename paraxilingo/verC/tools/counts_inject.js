window.__cnt=()=>{const r={};r.wq=WQ.length;r.sky2=(typeof SKY2!=="undefined"?SKY2.length:0);r.skytf=(typeof SKY_TF!=="undefined"?SKY_TF.length:0);
 r.cats={};const allK=new Set(),allF=new Set();for(const c of CATS){const ks=new Set();for(const a of [3,5,7,9,10]){S.age=a;kindsFor(c.id).forEach(k=>{ks.add(k);allK.add(c.id+"."+k)});formatsFor0(c.id).forEach(k=>{if(k.startsWith("f_"))allF.add(k)})}r.cats[c.id]=[...ks].length}
 r.kinds=allK.size;r.formats=[...allF].sort();r.games=Object.keys(GAMES).sort();
 r.stories=(typeof STORIES!=="undefined"?STORIES.length:0);r.storyQ=(typeof STORIES!=="undefined"?STORIES.reduce((a,s)=>a+((s.q||s.qs||[]).length||0),0):0);
 r.words=WORDS.length;r.sents=POOL.sents.length;r.countries=COUNTRIES.length;r.jobs=JOBS.length;r.an=AN.length;r.paint=PAGES.length;return r};
