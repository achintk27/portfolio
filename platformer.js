(() => {
'use strict';
const canvas = document.getElementById('platformer'), ctx = canvas.getContext('2d');
const welcome = document.getElementById('game-welcome'), dialog = document.getElementById('world-dialog');
const enter = document.getElementById('enter-world'), mode = document.getElementById('mode-toggle');
const stops = [{x:330,id:'about',name:'ABOUT ME'},{x:1050,id:'education',name:'EDUCATION'},{x:1770,id:'experience',name:'EXPERIENCE'},{x:2490,id:'projects',name:'PROJECTS'}];
const worldWidth = 2880, floor = 400, keys = new Set(), visited = new Set();
let player = {x:70,y:floor-52,w:30,h:52,vx:0,vy:0,ground:true},camera=0,started=false,near=null,coins=0,last=0,frame=0;
let tiles=null,character=null,activeWorld=null;
const touchPointers=new Map();
function clearInput(){keys.clear();touchPointers.clear();}
document.addEventListener("visibilitychange",()=>{if(document.hidden)clearInput();});
const platforms=[{x:510,y:320,w:128,h:32},{x:730,y:265,w:96,h:32},{x:1240,y:320,w:128,h:32},{x:1460,y:260,w:96,h:32},{x:1980,y:320,w:128,h:32},{x:2190,y:265,w:96,h:32}];
const collectibles = [170,230,560,605,760,800,920,1170,1290,1335,1490,1530,1660,1880,2030,2075,2220,2260,2380,2630,2690].map(x=>({x,y:platforms.find(p=>x>p.x&&x<p.x+p.w)?.y-40||335,taken:false}));
function start(){started=true;welcome.hidden=true;canvas.focus({preventScroll:true});}
function reset(){player={x:70,y:floor-52,w:30,h:52,vx:0,vy:0,ground:true};camera=0;coins=0;visited.clear();collectibles.forEach(c=>c.taken=false);document.getElementById('coin-count').textContent='00';document.getElementById('visit-count').textContent='0 / 4';document.querySelectorAll('[data-world]').forEach(b=>{b.classList.remove('explored');b.setAttribute('aria-label',b.textContent);});start();}
function openWorld(id){activeWorld=id;player.vx=0;player.vy=0;const source=document.getElementById(id);if(!source)return;keys.clear();near=null;enter.hidden=true;document.getElementById('world-content').replaceChildren(source.cloneNode(true));document.querySelectorAll('#world-content [id]').forEach(n=>n.removeAttribute('id'));document.getElementById('world-dialog-title').textContent=id==='contact'?'LET’S CONNECT':`WORLD ${stops.findIndex(s=>s.id===id)+1} · ${id.toUpperCase()}`;if(stops.some(s=>s.id===id)){visited.add(id);document.getElementById('visit-count').textContent=`${visited.size} / 4`;}document.querySelectorAll('[data-world]').forEach(b=>{b.classList.toggle('explored',visited.has(b.dataset.world));b.setAttribute('aria-label',`${b.textContent}${visited.has(b.dataset.world)?', explored':''}`);});const index=stops.findIndex(s=>s.id===id);document.getElementById('previous-world').disabled=index<=0;document.getElementById('next-world').disabled=index<0||index===stops.length-1;if(!dialog.open)dialog.showModal();dialog.scrollTop=0;}
function closeWorld(){dialog.close();keys.clear();canvas.focus({preventScroll:true});}
document.getElementById('start-game').addEventListener('click',start);document.getElementById('reset-game').addEventListener('click',reset);document.getElementById('close-world').addEventListener('click',closeWorld);dialog.addEventListener('close',()=>keys.clear());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeWorld();}});
document.getElementById('previous-world').addEventListener('click',()=>stepWorld(-1));document.getElementById('next-world').addEventListener('click',()=>stepWorld(1));
function stepWorld(direction){const target=stops[stops.findIndex(s=>s.id===activeWorld)+direction];if(target){player.x=target.x-70;player.y=floor-player.h;openWorld(target.id);}}
canvas.addEventListener('click',event=>{if(!started||dialog.open)return;const r=canvas.getBoundingClientRect();const x=(event.clientX-r.left)*canvas.width/r.width+camera;const y=(event.clientY-r.top)*canvas.height/r.height;const stop=stops.find(s=>x>s.x-60&&x<s.x+130&&y>185&&y<floor);if(stop){player.x=stop.x-70;player.y=floor-player.h;openWorld(stop.id);}});
enter.addEventListener('click',()=>{if(near)openWorld(near.id)});
document.querySelectorAll('[data-world]').forEach(b=>b.addEventListener('click',()=>{start();player.x=stops.find(s=>s.id===b.dataset.world).x-70;player.y=floor-player.h;openWorld(b.dataset.world)}));
document.querySelector('.skip').addEventListener('click',()=>{document.body.classList.remove('game-mode');mode.textContent='Play portfolio';keys.clear();});
mode.addEventListener('click',()=>{const game=document.body.classList.toggle('game-mode');mode.textContent=game?'Read portfolio':'Play portfolio';keys.clear();if(game)canvas.focus({preventScroll:true});else document.getElementById('home').scrollIntoView({behavior:'instant'});});
document.querySelectorAll('header a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{if(!document.body.classList.contains('game-mode'))return;e.preventDefault();const id=a.getAttribute('href').slice(1);if(id==='home'){welcome.hidden=false;started=false;keys.clear();}else openWorld(id);}));
window.addEventListener('keydown',e=>{if(!document.body.classList.contains('game-mode')||dialog.open||!started||['BUTTON','A','INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;const k=e.key.toLowerCase();if(['arrowleft','arrowright','arrowup',' ','a','d','w','e','enter'].includes(k)){e.preventDefault();keys.add(k);if([' ','w','arrowup'].includes(k)&&!e.repeat)jump();if((k==='e'||k==='enter')&&near&&!e.repeat)openWorld(near.id);}});window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',clearInput);
function jump(){if(player.ground){player.vy=-11.8;player.ground=false;}}
document.querySelectorAll('[data-control]').forEach(b=>{
 const key=b.dataset.control==='left'?'a':'d';
 b.addEventListener('pointerdown',e=>{e.preventDefault();if(dialog.open)return;if(!started)start();b.setPointerCapture(e.pointerId);if(b.dataset.control==='jump')jump();else{touchPointers.set(e.pointerId,key);keys.add(key);}});
 const release=e=>{touchPointers.delete(e.pointerId);if(![...touchPointers.values()].includes(key))keys.delete(key);};
 ['pointerup','pointercancel','lostpointercapture'].forEach(type=>b.addEventListener(type,release));
});
function update(dt){if(!started||dialog.open||!document.body.classList.contains('game-mode'))return;player.vx=(keys.has('d')||keys.has('arrowright')?4.2:0)-(keys.has('a')||keys.has('arrowleft')?4.2:0);const prevBottom=player.y+player.h;player.x=Math.max(0,Math.min(worldWidth-player.w,player.x+player.vx*dt));player.vy+=.56*dt;player.y+=player.vy*dt;player.ground=false;if(player.y+player.h>=floor){player.y=floor-player.h;player.vy=0;player.ground=true;}for(const p of platforms){if(player.vy>=0&&prevBottom<=p.y+3&&player.y+player.h>=p.y&&player.x+player.w>p.x&&player.x<p.x+p.w){player.y=p.y-player.h;player.vy=0;player.ground=true;}}
for(const c of collectibles){if(!c.taken&&Math.abs(player.x+15-c.x)<26&&Math.abs(player.y+20-c.y)<32){c.taken=true;coins++;document.getElementById('coin-count').textContent=String(coins).padStart(2,'0');}}
const next=stops.find(s=>Math.abs(player.x-s.x)<95);if(next!==near){near=next;enter.hidden=!near;if(near){enter.textContent=`EXPLORE ${near.name} ↗`;document.getElementById('game-announcement').textContent=`${near.name}. Press E or Enter, or tap the flag to explore.`;}}}
function text(t,x,y,size=14,color='#fff'){ctx.fillStyle=color;ctx.font=`bold ${size}px monospace`;ctx.textAlign='center';ctx.fillText(t,x,y);}
function tile(index,x,y,size=32){if(tiles){const cols=20;ctx.drawImage(tiles,(index%cols)*18,Math.floor(index/cols)*18,18,18,Math.round(x),Math.round(y),size,size);}else{ctx.fillStyle='#c47131';ctx.fillRect(x,y,size,size);ctx.strokeStyle='#854424';ctx.strokeRect(x,y,size,size);}}
function draw(){const small=canvas.clientWidth<650;const width=small?520:960;if(canvas.width!==width)canvas.width=width;ctx.imageSmoothingEnabled=false;camera=Math.max(0,Math.min(worldWidth-width,player.x-width*.32));ctx.fillStyle='#5c94fc';ctx.fillRect(0,0,width,480);
// Background scenery is supplied by the open-license sprite sheet.
if(tiles){for(let x=100;x<worldWidth;x+=350){tile(153,x-camera*.45,65,64);tile(154,x+64-camera*.45,65,64);tile(155,x+128-camera*.45,65,64);} }
ctx.save();ctx.translate(-Math.round(camera),0);
for(let x=0;x<worldWidth;x+=32){tile(1,x,floor);tile(4,x,floor+32);tile(4,x,floor+64);}for(const p of platforms){for(let x=p.x;x<p.x+p.w;x+=32)tile(10,x,p.y);}
for(const c of collectibles)if(!c.taken){if(tiles)tile(151,c.x-12,c.y-12,24);else{ctx.fillStyle='#ffdb42';ctx.fillRect(c.x-7,c.y-10,14,20);}}
for(let i=0;i<stops.length;i++){const s=stops[i],done=visited.has(s.id);ctx.fillStyle='#152645';ctx.fillRect(s.x+28,205,5,195);ctx.fillStyle=done?'#36af58':['#dc332b','#f4bf31','#2d69ce','#7535b7'][i];ctx.fillRect(s.x+33,208,90,45);text(String(i+1).padStart(2,'0'),s.x+74,238,24);ctx.fillStyle='#fffdf4';ctx.fillRect(s.x-48,292,150,40);ctx.strokeStyle='#142645';ctx.lineWidth=3;ctx.strokeRect(s.x-48,292,150,40);text(s.name,s.x+27,317,15,'#142645');if(done)text('EXPLORED',s.x+28,280,12,'#fff6a6');}
if(character){const walking=player.vx!==0&&player.ground;const sprite=walking?Math.floor(frame/9)%2:0;ctx.save();if(player.vx<0){ctx.translate(player.x+player.w,player.y);ctx.scale(-1,1);}else ctx.translate(player.x,player.y);// Articulated legs use two source regions of the same avatar, preserving its appearance.
const stride=walking?Math.sin(frame*.23)*.48:0;
const airborne=!player.ground;
const bounce=walking?-Math.abs(Math.sin(frame*.23))*1.8:0;
ctx.translate(0,bounce);
function leg(sx,sw,pivot,angle){ctx.save();ctx.translate(pivot,25);ctx.rotate(angle);ctx.drawImage(character,sx,800,sw,513,-6,-1,13,28);ctx.restore();}
leg(568,239,21,airborne?-.42:-stride);
leg(361,207,8,airborne?.38:stride);
ctx.drawImage(character,361,86,446,735,2,-14,26,40);
ctx.restore();}else{ctx.fillStyle='#e93028';ctx.fillRect(player.x,player.y,player.w,player.h);text('A',player.x+15,player.y+27,20);}
text('ACHINT',player.x+15,player.y-15,11,'#fff');ctx.restore();}
function tick(t){const dt=Math.min((t-last)/16.67,2)||1;last=t;if(!document.hidden){frame++;update(dt);draw();}requestAnimationFrame(tick);}requestAnimationFrame(tick);
const sheet=new Image();sheet.onload=()=>tiles=sheet;sheet.src='assets/tilemap.png';const hero=new Image();hero.onload=()=>character=hero;hero.src='assets/boy-sprite.png';
})();
