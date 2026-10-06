import test from 'node:test';
import assert from 'node:assert/strict';
import { releaseInfo } from '../src/release.js';
test('release exposes the approved message and version', () => {
  assert.deepEqual(releaseInfo('1.2.3'), {service:'release-board',version:'1.2.3',message:'Ready for delivery'});
});
test('invalid versions are rejected', () => {
  for (const version of ['', 'latest', '1.0', '1.0.0"']) assert.throws(() => releaseInfo(version), /Version/);
});
