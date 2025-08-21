// Temporal runner for API smoke tests — overrides base URL to local backend (port 4000)
const fs = require('fs');
const path = require('path');

// Read original tests file and replace base URL
const original = fs.readFileSync(path.join(__dirname, '..', 'src', 'tests', 'api-tests.js'), 'utf8');
const patched = original.replace("const API_BASE_URL = 'http://localhost:3001/api';", "const API_BASE_URL = 'http://127.0.0.1:4000/api';");

const outPath = path.join(__dirname, 'api-tests-run.js');
fs.writeFileSync(outPath, patched, 'utf8');

console.log('Written temporary test runner to', outPath);
console.log('Starting tests...');

// Spawn node to run the patched test file
const { spawn } = require('child_process');
const child = spawn(process.execPath, [outPath], { stdio: 'inherit' });
child.on('exit', (code) => {
  console.log('\nTest runner exited with code', code);
  process.exit(code);
});
