const fs = require('fs');
const path = require('path');
const axios = require('axios');

const base = 'http://localhost:4000/api';
const outPath = path.join(__dirname, 'http-smoke-out.json');

async function callWithRetry(url, opts = {}) {
  let lastErr = null;
  for (let attempt = 1; attempt <= 8; attempt++) {
    try {
      const res = await axios(Object.assign({ url, timeout: 3000 }, opts));
      return { status: res.status, data: res.data };
    } catch (err) {
      lastErr = err;
      // on network errors wait progressively longer
      await new Promise(r => setTimeout(r, attempt * 300));
    }
  }
  // throw last for caller to capture
  throw lastErr;
}

async function run() {
  const out = { timestamp: new Date().toISOString() };
  try {
    const loginUrl = base + '/auth/login';
    try {
      const loginRes = await callWithRetry(loginUrl, { method: 'post', data: { username: 'admin', password: 'admin123' } });
      out.login = loginRes;
    } catch (loginErr) {
      out.loginError = {
        message: loginErr.message,
        code: loginErr.code || null,
        isAxiosError: loginErr.isAxiosError || false,
        stack: loginErr.stack || null,
        config: loginErr.config ? { url: loginErr.config.url, method: loginErr.config.method } : null,
        response: loginErr.response ? { status: loginErr.response.status, data: loginErr.response.data } : null
      };
      // still continue to try other endpoints without auth
    }

    const token = out.login && out.login.data && out.login.data.token ? out.login.data.token : null;
    const headers = token ? { Authorization: 'Bearer ' + token } : {};
    const endpoints = ['/zones','/tourist-places','/specialties','/languages','/guides','/bookings','/guides/1/specialties'];
    out.endpoints = {};
    for (const ep of endpoints) {
      const url = base + ep;
      try {
        const r = await callWithRetry(url, { method: 'get', headers });
        out.endpoints[ep] = r;
      } catch (err) {
        out.endpoints[ep] = {
          error: err.message,
          code: err.code || null,
          isAxiosError: err.isAxiosError || false,
          stack: err.stack || null,
          response: err.response ? { status: err.response.status, data: err.response.data } : null
        };
      }
    }
  } catch (err) {
    out.unhandled = { message: err.message, stack: err.stack };
  }

  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('Wrote', outPath);
}

run().catch(e => { console.error('SMOKE-CRASH', e); process.exit(1) });
