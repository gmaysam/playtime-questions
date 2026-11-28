import json
Q='/home/claude/qcpub'
s=open('/home/claude/qc45/index.before_v45.html').read()
F=json.load(open('/home/claude/qc45/fa45.json'))
F['reply']=json.load(open('/home/claude/qc45/replies.json'))
F['qchg']=json.load(open('/home/claude/qc45/qchanges.json'))
dec=json.JSONDecoder()
def rep(a,b,cnt=1):
    global s
    assert s.count(a)>=1,a[:80];s=s.replace(a,b,cnt)
# audio index for the new pack
i=s.index('const AU=')+9;AU,e=dec.raw_decode(s,i);AU['idx'].update(F['idx'])
s=s[:i]+json.dumps(AU,ensure_ascii=False,separators=(',',':'))+s[e:]
css='''
/* v45: progress, speed, edited lines, offline */
.prog45{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}
.prog45 .bar{height:8px;border-radius:99px;background:var(--soft);overflow:hidden}.prog45 .bar i{display:block;height:100%;background:var(--ok)}
.prog45 .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.prog45 .last{font:600 15px/1.5 var(--fa);direction:rtl}
.heardtag{grid-column:1/-1;justify-self:start;font:800 11px/1 var(--font);letter-spacing:.04em;padding:4px 7px;border-radius:999px;background:var(--ok-bg);color:var(--ok)}
.item.fa.heard{background:color-mix(in srgb,var(--ok-bg) 35%,var(--card))}
.item.fa.lastheard{outline:3px dashed var(--ok);outline-offset:-3px}
.edtag{grid-column:1/-1;justify-self:start;font:800 11px/1 var(--font);padding:4px 7px;border-radius:999px;background:var(--warn-bg);color:var(--warn)}
.ed45{display:grid;grid-template-columns:auto auto minmax(0,1fr);gap:6px 10px;align-items:center}
.ed45 .fa-t{font-size:16px}.ed45 .was{opacity:.75;text-decoration:line-through;text-decoration-color:var(--bad)}
.ed45 .lab{min-width:0}
.edmeta{font-size:13px;color:var(--mute)}.edmeta b{color:var(--ink)}
.item.edit{display:block;padding:12px 14px}
.item.edit .rv{margin-top:8px}
#spd45{font:700 14px var(--font)}
@media (max-width:700px){header{position:static}}
#mini45{position:fixed;left:0;right:0;bottom:0;z-index:20;display:flex;gap:8px;align-items:center;background:var(--card);border-top:1px solid var(--line);
  padding:8px max(12px,env(safe-area-inset-right,0px)) calc(8px + env(safe-area-inset-bottom,0px)) max(12px,env(safe-area-inset-left,0px));box-shadow:0 -4px 14px rgba(40,30,80,.08)}
#mini45[hidden]{display:none}#mini45 .btn{padding:9px 14px;font-size:15px}#mTxt45{font-size:13px;color:var(--mute);margin-left:auto}
main .wrap{padding-bottom:90px}
.off45{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13px;color:var(--mute)}
.off45 textarea{width:100%;min-height:80px;font:13px/1.4 ui-monospace,monospace;border:1px solid var(--line);border-radius:10px;padding:8px;background:var(--card);color:var(--ink)}
'''
rep('</style>\n\n<header>',css+'</style>\n\n<header>')
# speed in every play
rep('await seek(a,x[1]);await a.play();await wait(x[2]*1000+40);a.pause()','await seek(a,x[1]);a.playbackRate=RATE;try{a.preservesPitch=true;a.webkitPreservesPitch=true}catch(_){}await a.play();await wait(x[2]*1000/RATE+40);a.pause()')
rep('    await wait(120)}\n  if(my===tok)','    await wait(120/RATE)}\n  if(my===tok)')
rep('const AUD={};let tok=0,curBtn=null;','const AUD={};let tok=0,curBtn=null,RATE=1;try{RATE=+(localStorage.getItem("qc_rate")||1)||1}catch(e){}')
# filter: speed + not heard
rep('<option value="checked">Checked, looks good</option></select>','<option value="checked">Checked, looks good</option><option value="unheard">Not heard yet</option><option value="edited">Edited by Claude</option></select>\n    <label>Speed <select id="spd45" aria-label="Reading speed"><option value="1">1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label>')
# data changes to the Farsi rows, before the items are made
data='/* v45 data: removed lines, edited lines (new voice + new words), missing words, new lines at the end */\nconst FA45='+json.dumps(F,ensure_ascii=False,separators=(',',':'))+''';
const FA_OLD={};FA.forEach(r=>FA_OLD[r[0]]=r[2]);
{const del=new Set(FA45.del);for(let k=FA.length-1;k>=0;k--)if(del.has(FA[k][0]))FA.splice(k,1);
 FA.forEach(r=>{if(FA45.txt[r[0]])r[2]=FA45.txt[r[0]]});FA45.add.forEach(r=>{FA.push(r);if(!(r[0] in FA_OLD))FA_OLD[r[0]]=r[2]});(FA45.move||[]).forEach(c=>{const k=FA.findIndex(r=>r[0]===c);if(k>=0)FA.push(FA.splice(k,1)[0])})}
const faClip=c=>FA45.ed[c]?FA45.ed[c][0]:c;
const faText=(c,t)=>FA45.ed[c]?FA45.ed[c][1]:t;
'''
rep('/* v43 Farsi voice tab */\nconst FA_G=',data+'/* v43 Farsi voice tab */\nconst FA_G=')
rep('''for(const [c,g,t] of FA){const id="fa:"+c;if(g!=="math")BASE.add(id);ITEMS.push({id,tab:"fa",cat:g,age:0,fa:1,search:(c+" "+t).toLowerCase(),mute:false,
  html:()=>`<button class="play" data-play='${esc(JSON.stringify([c]))}' aria-label="Play">${PLAY}</button><div class="fa-t">${t?esc(t):"<span class='miss'>(no text on file)</span>"}</div>''',
'''const ADD45=new Set(FA45.add.map(r=>r[0]).concat(FA45.move||[]));
for(const [c,g,t0] of FA){const id="fa:"+c,t=faText(c,t0),ed=!!FA45.ed[c];if(g!=="math"&&!ADD45.has(c))BASE.add(id);ITEMS.push({id,tab:"fa",cat:g,age:0,fa:1,ed,search:(c+" "+t+" "+(ed?FA_OLD[c]:"")).toLowerCase(),mute:false,
  html:()=>`${ed?'<span class="edtag">✏️ Edited: new voice'+(FA_OLD[c]!==t?" and new words":"")+'</span>':""}<button class="play" data-play='${esc(JSON.stringify([faClip(c)]))}' aria-label="Play">${PLAY}</button><div class="fa-t">${t?esc(t):"<span class='miss'>(no text on file)</span>"}</div>''')
# Play all uses the new voice of an edited line
rep('faSetPos(k);await playList([L[k].id.slice(3)],el.querySelector(".play"))','faSetPos(k);try{mark45(L[k].id)}catch(_){}await playList([faClip(L[k].id.slice(3))],el.querySelector(".play"))')
rep('const L=filtered();faFrom(faPos+1<L.length?faPos+1:0)};','if($("fNote").value==="unheard"){const L=filtered(),k=L.findIndex(i=>!heard45(i.id));faFrom(k<0?0:k);return}const L=filtered();faFrom(faPos+1<L.length?faPos+1:0)};')

# tabs
rep('["fa","Farsi voice"]];','["fa","Farsi voice"],["ed","Edited by Claude"]];')
# filters for heard / edited
rep('&&(!m||i.mute)&&(!n||(n==="new"?isNew(i)','&&(!m||i.mute)&&(!n||(n==="unheard"?(i.tab!=="fa"||(!heard45(i.id)||SESS45.has(i.id))):n==="edited"?(i.ed||i.tab==="ed"):n==="new"?isNew(i)')
js=open('/home/claude/qc45/page45.js').read()
rep('renderTabs();render();\n(async()=>{',js+'\nrenderTabs();render();\n(async()=>{')
# notes: offline store when the shared one is not here
rep('''  if(!db){clearTimeout(t);$("dbst").innerHTML='<span class="pill bad">Notes unavailable here</span>';render();return}''',
'''  if(!db){clearTimeout(t);db=localDB45();OFF45=true;$("dbst").innerHTML='<span class="pill warn">Offline · notes kept on this device</span>';offBar45()}''')
rep('''    $("dbst").innerHTML='<span class="pill ok">Notes saved for Claude</span>';''','''    if(!OFF45)$("dbst").innerHTML='<span class="pill ok">Notes saved for Claude</span>';prog45Load(snap);''')
rep('snap.docs.forEach(d=>{const x=d.data();if(x&&x.item)NOTES[x.item]=x});','snap.docs.forEach(d=>{const x=d.data();if(x&&x.item)NOTES[x.item]=x});')
rep('const faSetPos=k=>{faPos=k;try{localStorage.setItem("qc_fa_pos",String(k))}catch(e){}faLabel()};','const faSetPos=k=>{faPos=k;try{localStorage.setItem("qc_fa_pos",String(k))}catch(e){}faLabel()};')
rep('`<article class="item${i.fa?" fa":""}','`<article class="item${i.fa?" fa":""}${i.edcls?" edit":""}')
rep('if(ed&&n&&(n.fix||n.note))ed.hidden=false}','if(ed&&n&&(n.fix||n.note)&&n.status!=="done")ed.hidden=false}')
rep('.item.fa.playing{','.item.edit.done{opacity:1}.item.fa.playing{')
rep('const id=b.closest(".item").dataset.id,k=filtered().findIndex(x=>x.id===id);if(k<0)return;faStop();faFrom(k)},true);','const id=b.closest(".item").dataset.id,k=filtered().findIndex(x=>x.id===id);faStop();if(k<0){playList([faClip(id.slice(3))],b);return}faFrom(k)},true);')
rep('.sort((x,y)=>(BASE.has(x.id)?0:1)-(BASE.has(y.id)?0:1))}','.sort((x,y)=>tab==="ed"?0:(BASE.has(x.id)?0:1)-(BASE.has(y.id)?0:1))}')
open(Q+'/index.html','w').write(s);print('ok',len(s))
