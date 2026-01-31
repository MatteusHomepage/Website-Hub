const CACHE_NAME = 'matteus-hub-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/icon-192.png',
  '/package.json',
  '/manifest.json',
  '/password.json',
  '/server.js',
  '/service-worker.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});
