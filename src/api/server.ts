import app from './app';
import { connectMongo } from '../database/mongo';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 4000;
const repoRoot = path.resolve(__dirname, '..', '..');
const readyFile = path.join(repoRoot, 'server.ready');

// remove stale ready sentinel if exists
try { if (fs.existsSync(readyFile)) { fs.unlinkSync(readyFile); } } catch (e) { /* ignore */ }

connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
    try {
      fs.writeFileSync(readyFile, `ready ${new Date().toISOString()}`);
      console.log(`Wrote ready sentinel: ${readyFile}`);
    } catch (e) {
      console.error('Failed to write ready sentinel', e);
    }
  });
});
