// Service worker de "La Cadena"
// 1) Habilita OneSignal (notificaciones push reales)
// 2) Cumple el requisito mínimo de Chrome/Android para que la app sea instalable

importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDKWorker.js');

const CACHE_NAME = 'la-cadena-v1';
const ASSETS = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => cached))
  );
});
