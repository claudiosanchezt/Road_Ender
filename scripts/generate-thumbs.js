const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const placesDir = path.join(__dirname, '..', 'public', 'images', 'places');
const thumbsDir = path.join(__dirname, '..', 'public', 'images', 'thumbnails', 'places');

if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });

(async function(){
  const ids = fs.readdirSync(placesDir).filter(d=> fs.statSync(path.join(placesDir,d)).isDirectory());
  for (const id of ids) {
    const files = fs.readdirSync(path.join(placesDir, id));
    const main = files.find(f => f.toLowerCase().startsWith('main.')) || files[0];
    if (!main) continue;
    const src = path.join(placesDir, id, main);
    const base = main.split('.').slice(0,-1).join('.');

    try {
      const outWebp = path.join(thumbsDir, `${id}_${base}_thumb.webp`);
      const outPng = path.join(thumbsDir, `${id}_${base}_thumb.png`);
      await sharp(src)
        .resize(400, 260, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(outWebp);
      await sharp(src)
        .resize(400, 260, { fit: 'cover' })
        .png({ quality: 80 })
        .toFile(outPng);
      console.log(`Generated thumbs for ${id}: ${outWebp}, ${outPng}`);
    } catch (e) {
      console.error('Failed for', id, e.message);
    }
  }
})();
