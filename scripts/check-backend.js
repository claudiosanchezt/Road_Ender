const http = require('http');

function request(path) {
  return new Promise((resolve) => {
  const opts = { hostname: '127.0.0.1', port: 3000, path, method: 'GET', timeout: 5000 };
    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', (err) => resolve({ error: String(err) }));
    req.on('timeout', () => { req.abort(); resolve({ error: 'timeout' }); });
    req.end();
  });
}

(async () => {
  console.log('Checking /api/health...');
  console.log(await request('/api/health'));
  console.log('Checking /api/home/stats...');
  console.log(await request('/api/home/stats'));
})();
