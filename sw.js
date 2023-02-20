// nombre y version de cache

const CACHE_NAME = 'v1_cache_jiovanny_PWA';

// ficheros a cachear en la app
var urlToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];

// install
// instalacion de service worker y guardar en cache los recursos estaticos de la aplicacion
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
            return cache.addAll(urlToCache)
            .then(()=>{
                self.skipWaiting();
            });
        })
        .catch(err => console.log('no se ha registrado  el cache', err))
    );
});
// activate
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cachesNames => {
            return Promise.all(
                cachesNames.map(cacheName => {

                    if(cacheWhitelist.indexOf(cacheName) === -1 ){
                        // borrar cache inecesaria
                        return caches.delete(cacheName);

                    }
                })
            );
        })
        .then(()=>{
            self.clients.claim();
        })
    );
});
// fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});