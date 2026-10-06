import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from '../src/server.js';
test('HTTP release, health, missing route and unsupported method', async (t) => {
  const server = createServer('1.2.3');
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  assert.equal((await (await fetch(base+'/api/release')).json()).version, '1.2.3');
  assert.deepEqual(await (await fetch(base+'/health')).json(), {status:'ok'});
  assert.equal((await fetch(base+'/missing')).status, 404);
  assert.equal((await fetch(base+'/health',{method:'POST'})).status, 405);
});
