import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { releaseInfo } from './release.js';

export function createServer(version = process.env.APP_VERSION ?? '1.0.0') {
  const release = releaseInfo(version);
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (req.method !== 'GET') { res.writeHead(405, { Allow: 'GET' }); res.end(JSON.stringify({error:'Method not allowed'})); return; }
    if (req.url === '/health') { res.end(JSON.stringify({status:'ok'})); return; }
    if (req.url === '/api/release') { res.end(JSON.stringify(release)); return; }
    res.statusCode = 404;
    res.end(JSON.stringify({error:'Not found'}));
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createServer();
  const port = Number(process.env.PORT ?? 3000);
  server.listen(port, '0.0.0.0', () => console.log(`Release Board listening on ${port}`));
  for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close());
}
