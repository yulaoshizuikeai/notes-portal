const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const portalIconSvg = fs.readFileSync(path.join(__dirname, 'portal_icon.svg'), 'utf8');
const faviconSvg = fs.readFileSync(path.join(__dirname, 'favicon.svg'), 'utf8');

const robotsTxt = "# Robots.txt for note.yunet.cfd\nUser-agent: *\nAllow: /\n\nSitemap: https://note.yunet.cfd/sitemap.xml\n";
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://note.yunet.cfd/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

const workerCode = `addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const HTML_CONTENT = ${JSON.stringify(html)};
const PORTAL_ICON_SVG = ${JSON.stringify(portalIconSvg)};
const FAVICON_SVG = ${JSON.stringify(faviconSvg)};
const ROBOTS_TXT = ${JSON.stringify(robotsTxt)};
const SITEMAP_XML = ${JSON.stringify(sitemapXml)};

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 1. Robots.txt
  if (path === '/robots.txt') {
    return new Response(ROBOTS_TXT, {
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        'cache-control': 'public, max-age=86400'
      }
    });
  }

  // 2. Sitemap.xml & variants
  if (path === '/sitemap.xml' || path === '/sitemap' || path === '/sitemap_index.xml' || path === '/sitemap-index.xml') {
    return new Response(SITEMAP_XML, {
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'cache-control': 'public, max-age=3600',
        'x-content-type-options': 'nosniff',
        'access-control-allow-origin': '*'
      }
    });
  }

  // 3. Dynamic Google Site Verification HTML Files
  if (/^\\/google[a-zA-Z0-9_-]+\\.html$/.test(path)) {
    const filename = path.slice(1);
    return new Response('google-site-verification: ' + filename, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'public, max-age=86400'
      }
    });
  }

  // 4. Icons & Favicon
  if (path === '/images/icon.svg' || path === '/icon.svg') {
    return new Response(PORTAL_ICON_SVG, {
      headers: {
        'content-type': 'image/svg+xml; charset=utf-8',
        'cache-control': 'public, max-age=60, s-maxage=60',
        'x-content-type-options': 'nosniff',
        'access-control-allow-origin': '*'
      }
    });
  }

  if (path === '/favicon.ico' || path === '/favicon.svg') {
    return new Response(FAVICON_SVG, {
      headers: {
        'content-type': 'image/svg+xml; charset=utf-8',
        'cache-control': 'public, max-age=60, s-maxage=60',
        'x-content-type-options': 'nosniff',
        'access-control-allow-origin': '*'
      }
    });
  }

  // 5. Canonical Redirect for /index.html
  if (path === '/index.html') {
    return Response.redirect('https://note.yunet.cfd/', 301);
  }

  // 6. Subject Subdomain 301 Redirects
  if (path === '/physics' || path.startsWith('/physics/')) {
    const target = path.replace(/^\\/physics/, '') || '/';
    return Response.redirect('https://physics.yunet.cfd' + target, 301);
  }

  if (path === '/english' || path.startsWith('/english/')) {
    const target = path.replace(/^\\/english/, '') || '/';
    return Response.redirect('https://english.yunet.cfd' + target, 301);
  }

  if (path === '/biology' || path.startsWith('/biology/')) {
    const target = path.replace(/^\\/biology/, '') || '/';
    return Response.redirect('https://biology.yunet.cfd' + target, 301);
  }

  if (path === '/chemistry' || path.startsWith('/chemistry/')) {
    const target = path.replace(/^\\/chemistry/, '') || '/';
    return Response.redirect('https://chemistry-note.seeridia.top' + target, 301);
  }

  // 7. Root Portal Response with Enhanced SEO Headers
  return new Response(HTML_CONTENT, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
      'x-robots-tag': 'all, max-image-preview:large, max-snippet:-1',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'strict-origin-when-cross-origin'
    }
  });
}
`;

fs.writeFileSync(path.join(__dirname, 'worker.js'), workerCode, 'utf8');
console.log('Worker.js built successfully! Size:', workerCode.length);
