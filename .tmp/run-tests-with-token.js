const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'supersecret';
const payload = { id: 'test-user-automation', email: 'automation@local', role: 'admin' };
const token = jwt.sign(payload, secret, { expiresIn: '7d' });

console.log('Generated token (prefix):', token.slice(0, 40) + '...');

const TEST_FILE = path.join(__dirname, '..', 'src', 'tests', 'api-tests.js');
const TEMP_TEST = path.join(__dirname, 'api-tests-temp.js');

if (!fs.existsSync(TEST_FILE)) {
  console.error('Test file not found at', TEST_FILE);
  process.exit(2);
}

let original = fs.readFileSync(TEST_FILE, 'utf8');

// Replace base URL
original = original.replace(/const API_BASE_URL = [^;]+;/, "const API_BASE_URL = 'http://127.0.0.1:4000/api';");

// Inject token into accessToken initial value
original = original.replace(/let accessToken = '';/, `let accessToken = '${token}';`);

fs.writeFileSync(TEMP_TEST, original, 'utf8');
console.log('Temporary test file written to', TEMP_TEST);

try {
  execSync(`node "${TEMP_TEST}"`, { stdio: 'inherit' });
} catch (err) {
  console.log('Test runner exited with code', err.status || err.message);
  process.exit(err.status || 1);
}
