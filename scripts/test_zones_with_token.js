const jwt = require('jsonwebtoken');
const axios = require('axios');

(async () => {
  try {
    const token = jwt.sign({ id: 1, username: 'admin' }, 'supersecret', { expiresIn: '1h' });
    console.log('Generated token:', token);

    const res = await axios.get('http://localhost:4000/api/zones', {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: () => true,
      timeout: 10000,
    });

    console.log('Status:', res.status);
    console.log('Body:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('HTTP error:', err.response.status, err.response.data);
    } else {
      console.error('Request error:', err.message);
      console.error(err.stack);
    }
    process.exit(1);
  }
})();
