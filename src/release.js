export function releaseInfo(version = '1.0.0') {
  if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error('Version must have the form major.minor.patch');
  return { service: 'release-board', version, message: 'not ready' };
}
