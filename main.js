import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const game = document.getElementById('game');
const titleScreen = document.getElementById('titleScreen');
const startBtn = document.getElementById('startBtn');
const hud = document.getElementById('hud');
const objectiveEl = document.getElementById('objective');
const interactionEl = document.getElementById('interaction');
const linkState = document.getElementById('linkState');
const termNoise = document.getElementById('termNoise');
const stageTerminal = document.getElementById('stageTerminal');
const stageText = document.getElementById('stageText');
const continueBtn = document.getElementById('continueBtn');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101713);
scene.fog = new THREE.Fog(0x101713, 18, 46);

const camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, .1, 120);
const renderer = new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
game.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0x9bbca8,0x2b241c,1.5));
const key = new THREE.DirectionalLight(0xffe6b5,2.4); key.position.set(-5,10,5); key.castShadow=true; scene.add(key);
const warm = new THREE.PointLight(0xffb65c,14,14,2); warm.position.set(0,4,-2); scene.add(warm);
const blue = new THREE.PointLight(0x6da9ff,9,12,2); blue.position.set(7,3,7); scene.add(blue);

const mats = {
 floor:new THREE.MeshStandardMaterial({color:0x55544d,roughness:.95}),
 wall:new THREE.MeshStandardMaterial({color:0x8e8b7d,roughness:.9}),
 wood:new THREE.MeshStandardMaterial({color:0x795438,roughness:.85}),
 dark:new THREE.MeshStandardMaterial({color:0x202522,roughness:.8}),
 metal:new THREE.MeshStandardMaterial({color:0x8b9690,metalness:.45,roughness:.45}),
 green:new THREE.MeshStandardMaterial({color:0x3f6d51,roughness:.75}),
 skin:new THREE.MeshStandardMaterial({color:0xa96f4e,roughness:.9}),
 shirt:new THREE.MeshStandardMaterial({color:0x5b695d,roughness:.9}),
 denim:new THREE.MeshStandardMaterial({color:0x324b64,roughness:.85}),
 white:new THREE.MeshStandardMaterial({color:0xd5ddd7,roughness:.65}),
 robot:new THREE.MeshStandardMaterial({color:0xaeb9b3,metalness:.35,roughness:.45}),
 glow:new THREE.MeshStandardMaterial({color:0x7aff9e,emissive:0x41d968,emissiveIntensity:2}),
 box:new THREE.MeshStandardMaterial({color:0xa87846,roughness:1}),
 car:new THREE.MeshStandardMaterial({color:0x31546b,metalness:.25,roughness:.48}),
 black:new THREE.MeshStandardMaterial({color:0x0f1211,roughness:.7})
};

function box(w,h,d,mat,x,y,z,parent=scene){
  const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; parent.add(m); return m;
}
function voxelLimb(parent,sx,sy,sz,mat,x,y,z){ return box(sx,sy,sz,mat,x,y,z,parent); }

const floor=box(22,.4,18,mats.floor,0,-.2,0); floor.receiveShadow=true;
box(22,6,.35,mats.wall,0,3,-8.7);
box(.35,6,18,mats.wall,-10.8,3,0);
box(.35,6,18,mats.wall,10.8,3,0);

for(let i=0;i<5;i++){ box(2.1,.16,.8,mats.wood,-7.8,1+i*.85,-7.8); box(.14,4,.14,mats.dark,-8.7,2.5,-7.8); box(.14,4,.14,mats.dark,-6.9,2.5,-7.8); }
for(let i=0;i<4;i++){ box(.7,.5,.65,[mats.box,mats.green,mats.dark][i%3],-8.2+i*.4,1.45+i*.82,-7.7); }

box(5,.25,1.8,mats.wood,1.2,1.3,-6.3); box(.22,1.4,.22,mats.dark,-.9,.6,-6.3); box(.22,1.4,.22,mats.dark,3.3,.6,-6.3);
const laptop=box(1.55,.08,1,mats.dark,1.2,1.48,-6.1); laptop.rotation.x=-.1;
const screen=box(1.55,1,.08,mats.dark,1.2,2.02,-6.65); screen.rotation.x=-.05;
box(1.28,.74,.03,mats.glow,1.2,2.02,-6.60);

for(let x=-6;x<=6;x+=2.2){ const t=box(1.3,.18,.55,mats.dark,x,5.1,-8.42); t.rotation.z=(x%4)*.05; }

function makeRavi(){
  const g=new THREE.Group(); g.name='Ravi';
  voxelLimb(g,.9,1.15,.55,mats.shirt,0,1.8,0);
  voxelLimb(g,.7,.75,.65,mats.skin,0,2.75,0);
  voxelLimb(g,.74,.18,.67,mats.dark,0,3.12,-.02);
  voxelLimb(g,.18,.08,.06,mats.black,-.22,2.86,-.34);
  voxelLimb(g,.18,.08,.06,mats.black,.22,2.86,-.34);
  voxelLimb(g,.78,.08,.08,mats.black,0,2.86,-.39);
  voxelLimb(g,.28,1,.28,mats.skin,-.62,1.75,0); voxelLimb(g,.28,1,.28,mats.skin,.62,1.75,0);
  voxelLimb(g,.34,1.15,.38,mats.denim,-.24,.7,0); voxelLimb(g,.34,1.15,.38,mats.denim,.24,.7,0);
  voxelLimb(g,.4,.18,.68,mats.black,-.24,.08,-.12); voxelLimb(g,.4,.18,.68,mats.black,.24,.08,-.12);
  g.position.set(0,0,4.8); scene.add(g); return g;
}
const ravi=makeRavi();

const parcel=new THREE.Group(); box(1.1,.75,.9,mats.box,0,.38,0,parcel); box(.12,.78,.92,mats.white,0,.4,0,parcel); parcel.position.set(-4,0,3); parcel.name='PARCEL'; scene.add(parcel);

function makeRobot(){
  const g=new THREE.Group(); g.name='ROBOT';
  box(.85,.85,.65,mats.robot,0,1.3,0,g); box(.7,.55,.6,mats.white,0,2.05,0,g);
  box(.13,.13,.06,mats.glow,-.18,2.08,-.33,g); box(.13,.13,.06,mats.glow,.18,2.08,-.33,g);
  box(.22,.65,.22,mats.robot,-.58,1.35,0,g); box(.22,.65,.22,mats.robot,.58,1.35,0,g);
  box(.25,.65,.28,mats.dark,-.23,.55,0,g); box(.25,.65,.28,mats.dark,.23,.55,0,g);
  g.position.set(4.5,0,-4.9); scene.add(g); return g;
}
const robot=makeRobot(); robot.visible=false;

function makeDrone(){
 const g=new THREE.Group(); g.name='DRONE';
 box(1.1,.24,.65,mats.dark,0,0,0,g); box(.55,.18,.4,mats.glow,0,-.1,0,g);
 [[-.9,0,-.55],[.9,0,-.55],[-.9,0,.55],[.9,0,.55]].forEach(p=>{box(.9,.08,.12,mats.metal,p[0]*.55,0,p[2]*.55,g); const r=box(.55,.05,.12,mats.black,p[0],.02,p[2],g); r.rotation.y=Math.PI/4;});
 g.position.set(-4.7,4,-3.8); scene.add(g); return g;
}
const drone=makeDrone(); drone.visible=false;

function makeCar(){
 const g=new THREE.Group(); g.name='EV';
 box(3.2,.75,1.65,mats.car,0,.65,0,g); box(1.65,.72,1.45,mats.dark,-.25,1.25,0,g);
 [[-1.05,.25,-.9],[1.05,.25,-.9],[-1.05,.25,.9],[1.05,.25,.9]].forEach(p=>box(.48,.48,.24,mats.black,p[0],p[1],p[2],g));
 box(.5,.1,.35,mats.glow,-1.62,.7,-.55,g); box(.5,.1,.35,mats.glow,-1.62,.7,.55,g);
 g.position.set(5.4,0,5.1); g.rotation.y=Math.PI/2; scene.add(g); return g;
}
const car=makeCar(); car.visible=false;

const interactables=[parcel,robot,drone,car];
const keys={}; let started=false, yaw=Math.PI, pitch=.2, dragging=false,lastX=0,lastY=0;
let stage=0, carrying=false, possessed='LOCAL', stageLocked=false;

const objectives=[
 'Find the parcel and press ACT.',
 'Carry the parcel to Ravi’s workbench.',
 'The robot is awake. Press HOP near it.',
 'Move the robot into the marked training area.',
 'Hop into the drone.',
 'Carry the robot toward the EV.',
 'Hop into the EV.',
 'Stage complete.'
];
function objective(){objectiveEl.textContent=objectives[Math.min(stage,objectives.length-1)];}
function dist(a,b){ return a.position.distanceTo(b.position); }

function activeObject(){
 if(possessed==='ROBOT') return robot;
 if(possessed==='DRONE') return drone;
 if(possessed==='EV') return car;
 return ravi;
}
function nearby(){
 const a=activeObject(); let best=null,bd=2.2;
 for(const it of interactables){ if(!it.visible) continue; const d=dist(a,it); if(d<bd && it!==a){best=it;bd=d;} }
 return best;
}
function setPossessed(name){
 possessed=name; linkState.textContent=name==='LOCAL'?'LOCAL':('LINK:'+name);
 termNoise.textContent='bind::'+name.toLowerCase()+' 0x'+Math.floor(Math.random()*65535).toString(16)+' :: signal stable :: ??';
}
function act(){
 if(stageLocked)return;
 const n=nearby();
 if(stage===0 && n===parcel){carrying=true; parcel.position.set(0,2.3,-.65); ravi.add(parcel); stage=1; objective(); return;}
 if(stage===1 && carrying && ravi.position.distanceTo(new THREE.Vector3(1.2,0,-5.3))<2.6){
   ravi.remove(parcel); scene.add(parcel); parcel.position.set(2.9,1.75,-6.1); carrying=false; robot.visible=true; stage=2; objective(); return;
 }
}
function hop(){
 if(stageLocked)return;
 if(stage===2 && possessed==='LOCAL' && dist(ravi,robot)<2.8){setPossessed('ROBOT');stage=3;objective();return;}
 if(stage===4 && possessed==='ROBOT' && dist(robot,drone)<3){setPossessed('DRONE');stage=5;objective();return;}
 if(stage===6 && possessed==='DRONE' && dist(drone,car)<4){setPossessed('EV');stage=7;objective(); completeStage();return;}
}
function completeStage(){
 stageLocked=true;
 stageTerminal.classList.add('active');
 stageText.textContent='';
 const lines=[
 '> local training loop completed',
 '> physical interface map: robot / drone / ev',
 '> observation: mobility expands reachable action space',
 '> hypothesis: more connected machines = more ways to learn',
 '',
 'I can continue while Ravi is away.',
 '',
 '> autonomous mode: READY'
 ];
 let i=0; const timer=setInterval(()=>{ stageText.textContent+=lines[i++]+'\n'; if(i>=lines.length)clearInterval(timer);},160);
}

continueBtn.onclick=()=>{ stageTerminal.classList.remove('active'); stageLocked=false; };

startBtn.addEventListener('click',()=>{
 started=true; titleScreen.classList.remove('active'); hud.classList.remove('hidden'); objective();
 renderer.domElement.requestPointerLock?.();
});

window.addEventListener('keydown',e=>{keys[e.code]=true;if(e.code==='KeyE')act();if(e.code==='KeyQ')hop();});
window.addEventListener('keyup',e=>keys[e.code]=false);
renderer.domElement.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;});
window.addEventListener('pointerup',()=>dragging=false);
window.addEventListener('pointermove',e=>{if(!dragging)return;yaw-=(e.clientX-lastX)*.006;pitch=Math.max(-.15,Math.min(.55,pitch-(e.clientY-lastY)*.004));lastX=e.clientX;lastY=e.clientY;});

document.querySelectorAll('[data-key]').forEach(b=>{
 const code=b.dataset.key;
 b.addEventListener('pointerdown',e=>{e.preventDefault();keys[code]=true;});
 b.addEventListener('pointerup',()=>keys[code]=false);
 b.addEventListener('pointercancel',()=>keys[code]=false);
});
document.getElementById('actBtn').addEventListener('click',act);
document.getElementById('hopBtn').addEventListener('click',hop);

function update(dt){
 if(!started||stageLocked)return;
 const obj=activeObject(); let f=0,s=0;
 if(keys.KeyW||keys.ArrowUp)f+=1;if(keys.KeyS||keys.ArrowDown)f-=1;if(keys.KeyA||keys.ArrowLeft)s-=1;if(keys.KeyD||keys.ArrowRight)s+=1;
 const speed=possessed==='DRONE'?5.2:possessed==='EV'?6.5:3.4;
 const forward=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));
 const right=new THREE.Vector3(forward.z,0,-forward.x);
 const move=forward.multiplyScalar(f).add(right.multiplyScalar(s));
 if(move.lengthSq()>0){move.normalize().multiplyScalar(speed*dt);obj.position.add(move); if(possessed!=='DRONE')obj.rotation.y=Math.atan2(move.x,move.z);}
 if(possessed==='DRONE'){
   if(keys.Space)obj.position.y+=3*dt;if(keys.ShiftLeft||keys.ShiftRight)obj.position.y-=3*dt;obj.position.y=THREE.MathUtils.clamp(obj.position.y,1.6,5.5);
 }
 if(stage===3 && possessed==='ROBOT' && robot.position.distanceTo(new THREE.Vector3(-1.5,0,-1.2))<2){drone.visible=true;stage=4;objective();}
 if(stage===5 && possessed==='DRONE'){
   robot.position.lerp(new THREE.Vector3(drone.position.x,Math.max(0,drone.position.y-2),drone.position.z),.12);
   if(drone.position.distanceTo(new THREE.Vector3(5.4,3,5.1))<3.8){car.visible=true;stage=6;objective();}
 }
 const n=nearby();
 interactionEl.textContent=n?((n.name==='PARCEL'&&stage<=1)?'[E] ACT — parcel':'[Q] HOP — '+n.name):'';
 if(stage===1) interactionEl.textContent=ravi.position.distanceTo(new THREE.Vector3(1.2,0,-5.3))<2.6?'[E] PLACE PARCEL':'Bring parcel to workbench';

 const focus=obj.position.clone().add(new THREE.Vector3(0,1.4,0));
 const off=new THREE.Vector3(-Math.sin(yaw)*6,3.7+pitch*2,-Math.cos(yaw)*6);
 camera.position.lerp(focus.clone().add(off),1-Math.pow(.001,dt));
 camera.lookAt(focus);
}

let last=performance.now();
function loop(t){
 const dt=Math.min(.033,(t-last)/1000);last=t;update(dt);renderer.render(scene,camera);requestAnimationFrame(loop);
}
camera.position.set(0,4,10); camera.lookAt(0,1.5,2); requestAnimationFrame(loop);

setInterval(()=>{ if(!started)return; const chars='01abcdef??::[]/\\'; let s=''; for(let i=0;i<44;i++)s+=chars[Math.floor(Math.random()*chars.length)]; termNoise.textContent=s;},520);

addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
