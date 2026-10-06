import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
mkdirSync('reports', {recursive:true});
const result = spawnSync(process.execPath, ['--test','--test-reporter=spec','--test-reporter-destination=stdout','--test-reporter=junit','--test-reporter-destination=reports/junit.xml','test/release.test.js','test/server.test.js'], {stdio:'inherit'});
process.exit(result.status ?? 1);
