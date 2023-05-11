const { exec } = require('child_process');
const next = exec('npm run start-next');
const strapi = exec('npm run start-strapi');

next.stdout.on('data', (data) => {
  console.log(`[Next.js]: ${data}`);
});

next.stderr.on('data', (data) => {
  console.error(`[Next.js]: ${data}`);
});

strapi.stdout.on('data', (data) => {
  console.log(`[Strapi]: ${data}`);
});

strapi.stderr.on('data', (data) => {
  console.error(`[Strapi]: ${data}`);
});
