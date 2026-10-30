import {build} from 'esbuild';
import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await build({entryPoints:['src/game.js'],bundle:true,format:'iife',target:['safari15','chrome100'],outfile:'dist/game.js',minify:true,legalComments:'eof'});
const html=await readFile('index.html','utf8'),css=await readFile('style.css','utf8'),js=await readFile('dist/game.js','utf8');
await copyFile('index.html','dist/index.html');await copyFile('style.css','dist/style.css');
const offline=html.replace('<link rel="stylesheet" href="style.css">',()=>`<style>${css}</style>`).replace('<script src="game.js" defer></script>',()=>`<script>${js.replaceAll('</script','<\\/script')}</script>`);
await writeFile('dist/ALIVE-Offline.html',offline);await writeFile('dist/.nojekyll','');
console.log('Built hosted game and self-contained ALIVE-Offline.html');
