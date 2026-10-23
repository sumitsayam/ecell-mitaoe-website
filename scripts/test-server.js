const http = require('http');

const routesToTest = [
  { path: '/', title: 'Home', check: 'IDEAS' },
  { path: '/about', title: 'About', check: 'Mission' },
  { path: '/initiatives', title: 'Initiatives', check: 'Incubation' },
  { path: '/events', title: 'Events Directory', check: 'Events' },
  { path: '/events/brand-battle', title: 'Event Detail', check: 'Brand Battle' },
  { path: '/team', title: 'Our Team', check: 'Leadership' },
  { path: '/achievements', title: 'Achievements', check: 'Milestones' },
  { path: '/resources', title: 'Resources', check: 'Playbook' },
  { path: '/join', title: 'Join Recruitment', check: 'Recruitment' },
  { path: '/admin', title: 'Admin Overview', check: 'Overview' },
  { path: '/admin/login', title: 'Admin Login', check: 'Portal' },
  { path: '/admin/members', title: 'Admin Members', check: 'Member' },
  { path: '/admin/events', title: 'Admin Events', check: 'CMS' },
  { path: '/admin/participants', title: 'Admin Participants', check: 'Attendance' },
  { path: '/admin/recruitment', title: 'Admin Recruitment', check: 'Pipeline' },
  { path: '/admin/records', title: 'Admin Records', check: 'MOUs' },
  { path: '/admin/analytics', title: 'Admin Analytics', check: 'Analytics' },
  { path: '/admin/settings', title: 'Admin Settings', check: 'Settings' }
];

async function testRoute(route) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + route.path, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const contains = data.toLowerCase().includes(route.check.toLowerCase());
        console.log(`Route [${route.path}] (${route.title}) -> Status: ${res.statusCode}, Contains "${route.check}": ${contains}`);
        if (res.statusCode === 200 && contains) {
          resolve(true);
        } else {
          reject(new Error(`Failed route ${route.path} - status ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

async function runAll() {
  console.log('Testing all public and management portal routes...');
  for (const r of routesToTest) {
    await testRoute(r);
  }
  console.log('ALL ROUTES TESTED SUCCESSFULLY!');
}

runAll().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
