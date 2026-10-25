const CACHE_NAME = 'pwa-booking-workspace-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './offline.html',
    './css/style.css',
    './js/main.js'
];

// 'install' event: Pre-caches critical app shell components
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Service Worker: Pre-caching static app shell');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// 'activate' event: Clears outdated iterations of cache storage
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing legacy cache data store');
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 'fetch' event: Intercepts assets, attempts network first, falls back to offline files
self.addEventListener('fetch', event => {
    // Only intercept standard HTTP/HTTPS schemes (ignore chrome-extension assets)
    if (!(event.request.url.startsWith('http'))) return;

    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }
                // If checking an unknown deep route while disconnected, supply standalone error screen
                if (event.request.mode === 'navigate') {
                    return caches.match('./offline.html');
                }
            });
        })
    );
});
