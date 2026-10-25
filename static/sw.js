// static/sw.js

const CACHE_NAME = 'flask-pwa-v1';

// Mandatory assets to cache on first install
const PRECACHE_ASSETS = [
  '/',                          // Maps to the Flask home route
  '/static/css/style.css',      // Application layout styling
  '/static/js/main.js',        // Client-side execution script
  '/static/manifest.json',      // PWA Web Manifest configuration
  '/static/icons/icon-192.png', // Mobile device install icon
  '/templates/offline.html'     // Structural offline fallback screen
];

// 1. INSTALL EVENT: Cache essential static shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching application shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Forces immediate activation
  );
});

// 2. ACTIVATE EVENT: Clean up any old, legacy caches from previous versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache storage:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Takes control of open pages immediately
  );
});

// 3. FETCH EVENT: Network-First interceptor with custom offline fallback
self.addEventListener('fetch', (event) => {
  // Only intercept standard HTTP/HTTPS GET requests (ignores POST booking submissions)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    // Step A: Attempt to fetch the latest data live from the Flask server
    fetch(event.request)
      .then((networkResponse) => {
        // If the server returns a valid page, clone it and update the cache dynamically
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Step B: If network fails (Offline), attempt to match the request in local cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Step C: If the user requests a page route that isn't cached, serve the standalone offline screen
            if (event.request.mode === 'navigate') {
              return caches.match('/templates/offline.html');
            }
          });
      })
  );
});
