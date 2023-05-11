const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const strapi = require('./../backend');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
console.log('test')
const server = createServer(async (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname.startsWith('/api')) {
    await strapi.middleware(req, res, () => {});
  } else {
    handle(req, res, parsedUrl);
  }
});

app.prepare().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
});
