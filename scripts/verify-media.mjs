import fs from 'node:fs';
const source=fs.readFileSync('src/lib/content.ts','utf8');
const names=[...source.matchAll(/media\("([^"]+)"\)/g)].map(m=>m[1]);
for(const name of names){const path='public/media/'+name;if(!fs.existsSync(path)||!fs.statSync(path).size)throw new Error('Missing media '+path);if(name.endsWith('.mp4')){const fd=fs.openSync(path,'r');const header=Buffer.alloc(12);fs.readSync(fd,header,0,12,0);fs.closeSync(fd);if(header.toString('ascii',4,8)!=='ftyp')throw new Error('Invalid MP4 '+name);}}
console.log('Verified '+names.length+' media references and '+names.filter(n=>n.endsWith('.mp4')).length+' MP4 containers.');
