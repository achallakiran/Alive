# ALIVE — One Minute

A cinematic 2.5D voxel adventure adapted from the ALIVE story. Play as an intelligence anchored to Ravi's home computer, connecting to a robot, drone and EV.

## Chapter one
Parcel delivery, carrying and unboxing, robot assembly and activation, family dialogue, autonomous training, robot/drone transport puzzle, and a short EV checkpoint drive. Later story chapters are planned, not included in this release.

## Build

Node.js 22 or newer:

```
npm ci
npm run check
npm run build
```

`dist/index.html` is the hosted game. `dist/ALIVE-Offline.html` is a self-contained file that needs no network or web server. The GitHub Actions workflow builds and publishes `dist` to GitHub Pages on pushes to `main`.

## Controls

- Click/tap labelled objects to interact or connect.
- Arrows / WASD: robot movement, drone movement or driving.
- R / F or RISE / LOWER: drone height.
- E / ACT: attach, release or interact.
- Q: connect to an available labelled device.
- Escape: pause. Space: advance dialogue.
- Pointer or touch-drag over the scene: restrained parallax. Optional device tilt is enabled in Settings.

For the drone puzzle, align above the robot at approximately 1.06 units height to attach. Carry to the shelf at x=-2.5, z=-1.2, height=3.42 and release. The objective text confirms alignment. The drone carries a fixed clamp attachment with a hanging robot pose.

## Rendering and audio

Three.js is bundled locally. Detailed voxel characters use instanced geometry for head/hair features. A Canvas software projection fallback renders the same scene graph when WebGL cannot initialize; it has simpler lighting and no GPU shadows. Music/effects are synthesized locally after user interaction. No live LLM service or runtime CDN is used; authored stage reflections preserve the story.

Checkpoint saves and preferences use browser storage when available. They remain optional: blocked storage does not stop play. Mobile file opening depends on the host app exposing the HTML to a browser with JavaScript enabled.

## Landscape revision (v0.3)
Landscape-only interaction with a rotating-phone overlay. Portrait suspends simulation and audio independently of manual pause. Upright bold text, illuminated title, shared garage camera and layout, consistent EV/robot/adult/workbench scale, permanent puzzle furniture, visible robot dismount and drone approach. Version 3 checkpoints include entity transforms, robot attachment and training progress; older checkpoints use safe stage entry defaults.

## Reference-based opening (v0.4)
Rounded articulated character models follow the supplied voxel HTML while retaining ALIVE clothing. The fixed garage now includes a chair, a forward-facing charging EV with cable/plug, and a shelf-mounted dormant toy drone. The opening stages the OTP exchange, handover, carrying, unpacking and seated assembly. Drone takeoff starts at its shelf; EV movement is gated on stowing the charger. See `docs/scene-layout.md` for positions and continuity. Run `node tests/scene.mjs` for physical scale and prop-state checks.
