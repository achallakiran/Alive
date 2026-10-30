import * as T from 'three';
import {block,group} from './models.js';
export const HOME={parking:{x:-.3,y:0,z:-2.1},drone:{x:-4.03,y:2.0,z:-2.95},seat:{x:2.75,y:0,z:1.35}};
export function garageProps(world){
 const chair=group(world,HOME.seat.x,0,HOME.seat.z);block(chair,0,.5,0,.65,.13,.65,'#3b4e5c');block(chair,0,.88,.3,.65,.7,.12,'#4b5e69');block(chair,0,.25,0,.07,.4,.07,'#89979c');for(const x of[-1,1])for(const z of[-1,1]){block(chair,x*.22,.075,z*.22,.45,.05,.06,'#6a7f87');block(chair,x*.3,.06,z*.3,.08,.09,.1,'#1a2732');}
 const shelf=group(world,HOME.drone.x,0,HOME.drone.z);block(shelf,0,1.7,0,1.5,.1,.85,'#7d7968');block(shelf,0,1.77,0,.85,.025,.6,'#3a5364');block(shelf,0,1.78,.43,.65,.07,.02,'#bca77b');
 const charger=group(world,-2.35,0,-4.75);block(charger,0,1.16,0,.38,.64,.15,'#b8c4c9');block(charger,0,1.25,.09,.22,.16,.025,'#203c4c');const indicator=block(charger,0,1.25,.11,.06,.06,.015,'#77d6a4',true);block(world,-1.18,.73,-2.8,.08,.16,.2,'#1b3545');
 const cable=group(world),plug=group(world,-1.23,.73,-2.8);block(plug,0,0,0,.19,.1,.14,'#27343e');block(plug,-.1,-.045,0,.07,.18,.08,'#182f3b');
 function segment(a,b){const va=new T.Vector3(...a),vb=new T.Vector3(...b),delta=vb.clone().sub(va);const m=block(cable,...va.clone().add(vb).multiplyScalar(.5).toArray(),.035,delta.length(),.035,'#172b36');m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());}
 function charging(connected){cable.clear();const path=connected?[[-2.35,1,-4.65],[-2.35,.08,-4.2],[-1.9,.055,-3.9],[-1.3,.06,-3.4],[-1.23,.25,-3],[-1.23,.73,-2.8]]:[[-2.35,1,-4.65],[-2.57,.8,-4.6],[-2.56,.42,-4.6],[-2.2,.4,-4.6],[-2.16,.8,-4.6],[-2.35,.95,-4.58]];for(let i=1;i<path.length;i++)segment(path[i-1],path[i]);plug.position.set(...(connected?[-1.23,.73,-2.8]:[-2.35,.95,-4.58]));indicator.material.emissiveIntensity=connected?1.6:.15;}
 charging(true);
 const gate=group(world,-4.6,0,5.6);for(const x of[-1.1,1.1])block(gate,x,.8,0,.16,1.6,.2,'#a89477');for(let x=-1;x<=1;x+=.25)block(gate,x,.65,0,.035,1.15,.04,'#485a5b');block(gate,0,1.25,0,2.2,.06,.08,'#485a5b');
 const bike=group(world,-4.5,0,6.3);for(const z of[-.65,.65]){block(bike,0,.3,z,.17,.6,.6,'#18252d');block(bike,.1,.3,z,.02,.35,.35,'#81959e');}block(bike,0,.65,-.1,.4,.32,.75,'#4d5351');block(bike,0,.9,-.25,.42,.12,.7,'#262d32');block(bike,0,1,.53,.7,.06,.08,'#7d919d');block(bike,0,.85,.7,.28,.26,.12,'#dfdbc5',true);
 const manual=group(world,1.75,1.03,.15);block(manual,0,0,0,.52,.025,.44,'#d3c9a8');for(let i=0;i<4;i++)block(manual,0,.018,-.14+i*.08,.38,.006,.012,'#6b746d');
 const packing=group(world,2.1,1.07,.35);for(let i=0;i<20;i++)block(packing,(i%5)*.07-.14,.025,Math.floor(i/5)*.07-.1,.055,.04,.055,'#d5dcd5');packing.visible=false;
 return {chair,shelf,charger,cable,plug,gate,bike,manual,packing,charging};
}
