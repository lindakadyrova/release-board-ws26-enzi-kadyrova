import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const dir = mkdtempSync(join(tmpdir(), 'delivery-red-green-'));
try {
  for (const item of ['src','test','package.json']) cpSync(item,join(dir,item),{recursive:true});
  const file=join(dir,'src/release.js');
  const original=readFileSync(file,'utf8');
  if (!original.includes('Ready for delivery')) throw new Error('Expected demonstration message is missing');
  writeFileSync(file,original.replace('Ready for delivery','Not ready'));
  const red=spawnSync(process.execPath,['--test'],{cwd:dir,stdio:'inherit'});
  if (red.status === 0 || red.status === null) throw new Error('Expected a failing test run');
  writeFileSync(file,original);
  const green=spawnSync(process.execPath,['--test'],{cwd:dir,stdio:'inherit'});
  if (green.status !== 0) throw new Error('Repair did not restore the passing run');
  console.log('Verified: failing implementation stops tests; repaired implementation passes.');
} finally { rmSync(dir,{recursive:true,force:true}); }
