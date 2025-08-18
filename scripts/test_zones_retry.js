const http = require('http');
const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 'user-2', email: 'client1@example.com', userType: 'client' }, 'supersecret', { expiresIn: '1h' });
console.log('token:', token);

function callOnce() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 4000,
      path: '/api/zones',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      timeout: 5000,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });

    req.on('error', (e) => reject(e));
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.end();
  });
}

(async () => {
  for (let i = 0; i < 5; i++) {
    try {
      const r = await callOnce();
      console.log('Attempt', i+1, 'status', r.status);
      console.log('Body', r.body);
      return;
    } catch (e) {
      console.error('Attempt', i+1, 'failed:', e.message);
      await new Promise(res => setTimeout(res, 1000));
    }
  }
  console.error('All attempts failed');
})();
