# ALIVE opening continuity — v0.4

The comic pages govern costumes, props, relationships and dialogue. The supplied Diwali HTML governs rounded voxel heads, eyes, layered hair and articulated character construction. Party attire is excluded.

Garage entrance faces +Z. The EV's forward axis is +Z while parked; it leaves forward. Furniture never changes position between shots.

| Object | Fixed world position | Initial state |
| --- | --- | --- |
| EV | (-0.3, 0, -2.1) | Facing entrance, charging |
| Charger | (-2.35, 0, -4.75) | Green status, plug connected |
| Car charging port | (-1.18, 0.73, -2.8) | Plug inserted |
| Chair | (2.75, 0, 1.35) | At desk, seat at 0.5 |
| Workbench | (3.25, 0, 0.2) | Top at approximately 1.0 |
| Laptop | (3.7, 1.015, 0.13) | Fixed desk position |
| Toy drone | (-4.03, 2.0, -2.95) | Resting on shelf pad; rotors stopped |
| Drone shelf pad | (-4.03, 1.77, -2.95) | Present from title onward |
| Robot landing shelf | (-2.5, 1.37, -1.2) | Fixed furniture and latch |
| Delivery exchange | Around (-2.4, 0, 4.5) | Courier holds parcel beside gate and bike |

Opening: courier dialogue → show OTP → animated handover → Ravi carries kit → box opens → Ravi sits → assembly → laptop tests → evening instructions → stand and leave. Packaging stays aside on the workbench.

Robot: desk dismount → floor training → reach attempt at the actual door → identify shelf toy → terminal explanation → connect → rotor spin and lift from shelf → rendezvous → attachment puzzle. Drone is never introduced by appearing in midair.

EV: finish latch puzzle → robot approaches plug → cable stows at charger → EV control unlocks → forward exit animation → family car cutscene → road stage. The EV cannot move while charging.

Save version 4 preserves transforms and parcel ownership, training progress, attachment, charger connection, drone activation and seated state. Older versions use valid canonical stage entries.
