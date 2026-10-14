// Static prerender: renders every route to HTML so crawlers and slow devices get real content,
// then writes sitemap.xml, robots.txt and a real 404.html. Runs after the client + SSR builds.
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const serverDir = join(root, 'dist-server');

const env = { ...loadEnv('production', root, 'VITE_'), ...process.env };
const siteUrl = (env.VITE_SITE_URL || 'https://kaayraherbals.example').replace(/\/$/, '');
if (!env.VITE_SITE_URL) console.warn('[prerender] VITE_SITE_URL not set; using placeholder', siteUrl);

const routes = JSON.parse(await readFile(join(root, 'shared/routes.json'), 'utf8'));
const template = await readFile(join(dist, 'index.html'), 'utf8');
const { render } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(route, html, { noindex = false } = {}) {
  const url = siteUrl + (route.path === '/' ? '/' : route.path);
  let out = template
    .replace('<!--app-html-->', html)
    .replace(/<title>.*?<\/title>/s, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${siteUrl}/og-image.png$2`);
  if (!noindex) {
    const graph =
      route.path === '/'
        ? { '@context': 'https://schema.org', '@type': 'Organization', name: 'Kaayra Herbals', url: siteUrl + '/' }
        : route.type === 'article'
          ? {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: route.title.split(' | ')[0],
              description: route.description,
              datePublished: route.date,
              mainEntityOfPage: url,
              author: { '@type': 'Organization', name: 'Kaayra Herbals' },
              publisher: { '@type': 'Organization', name: 'Kaayra Herbals' },
            }
          : null;
    if (graph) out = out.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>\n  </head>`);
  }
  if (noindex) out = out.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>').replace(/<link rel="canonical"[^>]*>\s*/, '');
  return out;
}

for (const route of routes) {
  const file = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path.slice(1), 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(route, render(route.path)));
}

await writeFile(
  join(dist, '404.html'),
  page({ path: '/404', title: 'Page not found | Kaayra Herbals', description: 'This page does not exist.' }, render('/404'), { noindex: true }),
);

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .map((r) => `  <url><loc>${siteUrl}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

const robots = (await readFile(join(dist, 'robots.txt'), 'utf8')).replace('__SITE_URL__', siteUrl);
await writeFile(join(dist, 'robots.txt'), robots);

await rm(serverDir, { recursive: true, force: true });
console.log(`[prerender] ${routes.length} routes + 404, sitemap and robots written for ${siteUrl}`);
