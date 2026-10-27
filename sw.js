// std0 Desk service worker: app shell cached for instant Home Screen launch.
const CACHE = 'std0-desk-v1';
const SHELL = ['./', './index.html', './manifest.json', './live_markets.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  // Live APIs (Polymarket, Kalshi, exchanges) and non-GET pass straight through. WebSockets never hit the SW.
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  // Network-first for the page and market snapshot (fresh daily), cache fallback offline.
  if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('live_markets.json')) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req)));
});
