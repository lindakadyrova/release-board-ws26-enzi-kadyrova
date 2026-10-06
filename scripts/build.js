import { mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
mkdirSync('dist/src', {recursive:true});
for (const file of ['release.js','server.js']) copyFileSync(`src/${file}`, `dist/src/${file}`);
for (const file of ['package.json','package-lock.json']) copyFileSync(file,`dist/${file}`);
writeFileSync('dist/build.json', JSON.stringify({commit:process.env.CI_COMMIT_SHA ?? process.env.GITHUB_SHA ?? 'local',version:process.env.APP_VERSION ?? '1.0.0'},null,2)+'\n');
console.log('Runnable artifact: dist/src/server.js');
