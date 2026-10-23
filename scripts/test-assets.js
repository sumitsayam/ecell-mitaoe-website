const http = require('http');

const assets = [
  '/images/hero-collage-perfect.png',
  '/images/card-brand-battle-hires.png',
  '/images/card-workshop-hires.png',
  '/images/card-showcase-hires.png'
];

async function checkAsset(urlPath) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      console.log(`Asset ${urlPath} -> Status: ${res.statusCode}, Content-Type: ${res.headers['content-type']}, Content-Length: ${res.headers['content-length']}`);
      if (res.statusCode === 200) resolve(true);
      else reject(new Error(`Failed with ${res.statusCode}`));
    }).on('error', reject);
  });
}

async function run() {
  for (const a of assets) {
    await checkAsset(a);
  }
  console.log('ALL ASSETS VERIFIED!');
}

run().catch(console.error);
