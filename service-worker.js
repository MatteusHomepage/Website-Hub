const CACHE_NAME = 'matteus-hub-cache-v9';

const BASE_PATH = '/Website-Hub/';

const urlsToCache = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'favicon.ico',
  BASE_PATH + 'icon-192.png',
  BASE_PATH + 'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Only handle requests inside this app
  if (!event.request.url.startsWith(self.location.origin + BASE_PATH)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
