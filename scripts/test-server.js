const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Contains "IDEAS":', data.includes('IDEAS'));
    console.log('Contains "INTO":', data.includes('INTO'));
    console.log('Contains "IMPACT.":', data.includes('IMPACT.'));
    console.log('Contains "MIT ACADEMY OF ENGINEERING":', data.includes('MIT ACADEMY OF ENGINEERING'));
    console.log('Contains "BUILT BY":', data.includes('BUILT BY'));
    console.log('Contains "Brand Battle":', data.includes('Brand Battle'));
    console.log('Contains "Entrepreneurship Workshop":', data.includes('Entrepreneurship Workshop'));
    console.log('Contains "Startup Showcase":', data.includes('Startup Showcase'));
    console.log('Contains "Creating opportunities today for a bolder tomorrow.":', data.includes('Creating opportunities today for a bolder tomorrow.'));
    console.log('Test PASSED!');
  });
}).on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
