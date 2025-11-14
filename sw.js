const CACHE_NAME = 'azeem-chicken-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html',
  '/style.css',
  '/script.js',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/splash-640x1136.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
