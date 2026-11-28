window.__c3=()=>{const r={};const words=new Set(WORDS.map(w=>w.w));r.pz={};for(const c of Object.keys(PZ_SET)){const s=PZ_SET[c];r.pz[c]=s?s.filter(w=>words.has(w)).length:WORDS.filter(w=>w.w.length<=6).length}r.pz.sky=8;r.pz.shapes=12;
 r.mazeThemes=[...new Set(Object.values(MAZES).flat().map(x=>x[0]+x[1]))].length;
 const lay=new Set();for(let i=0;i<4000;i++){for(const a of [4,7]){S.age=a;const q=qBlocks("shapes");if(q)lay.add(q.k+q.rt+":"+q.gx+":"+q.rows+(q.turn?"t":""))}}r.blocks=lay.size;
 r.wordsAll=WORDS.length;return r};
