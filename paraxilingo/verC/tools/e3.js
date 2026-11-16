
/* ===== Nov 11: 3D pictures (Microsoft Fluent Emoji 3D, MIT licence) replace flat emoji everywhere on screen ===== */
const E3=__E3MAP__;
const E3RE=new RegExp(Object.keys(E3).sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|"),"g");
function e3Node(t){const s=t.nodeValue;if(!s||!/[←-⯿\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}⃣]/u.test(s))return;const p=t.parentNode;if(!p||p.closest&&p.closest("svg,textarea,input,.noe3,title"))return;
  E3RE.lastIndex=0;if(!E3RE.test(s))return;E3RE.lastIndex=0;const f=document.createDocumentFragment();let i=0,m;
  while((m=E3RE.exec(s))){if(m.index>i)f.appendChild(document.createTextNode(s.slice(i,m.index)));const im=document.createElement("img");im.className="e3";im.alt=m[0];im.draggable=false;im.src="img/e3/"+E3[m[0]]+".webp";f.appendChild(im);i=m.index+m[0].length}
  if(i<s.length)f.appendChild(document.createTextNode(s.slice(i)));p.replaceChild(f,t)}
function e3Walk(n){if(n.nodeType===3)return e3Node(n);if(n.nodeType!==1||n.closest&&n.closest("svg,.noe3"))return;const w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT),a=[];while(w.nextNode())a.push(w.currentNode);a.forEach(e3Node)}
try{new MutationObserver(ms=>{for(const m of ms){if(m.type==="characterData")e3Node(m.target);else m.addedNodes.forEach(e3Walk)}}).observe(document.body,{childList:true,subtree:true,characterData:true});e3Walk(document.body)}catch(e){}
