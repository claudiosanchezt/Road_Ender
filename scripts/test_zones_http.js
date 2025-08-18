const http = require('http');
const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 'user-2', email: 'client1@example.com', userType: 'client' }, 'supersecret', { expiresIn: '1h' });
console.log('token:', token);

const options = {
  hostname: '127.0.0.1',
  port: 4000,
  path: '/api/zones',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  },
  timeout: 10000,
};

const req = http.request(options, (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', res.headers);
  let data = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('BODY:', data);
  });
});

req.on('timeout', () => {
  console.error('Request timed out');
  req.destroy();
});

req.on('error', (e) => {
  console.error('Request error', e.message);
  console.error(e);
});

req.end();
