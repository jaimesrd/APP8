var CACHE_NAME = 'Cache-Dominio';
var urlsToCache = [
  '/',
  '/index.html',
  '/Manifest.json',
  '/assets/js/main.js',
//  '/assets/js/util.js',
//  '/assets/js/breakpoints.min.js',
 // '/assets/js/browser.min.js',
  //'/assets/js/jquery.min.js',
 // '/assets/js/jquery.scrollex.min.js',
  //'/assets/js/jquery.scrolly.min.js',
  '/assets/css/main.css',
  //'/assets/css/font-awesome.min.css',
  //'/assets/css/noscript.css',
  '/images/BarraLogo.fw.png',
  //'/images/bg.jpg',
  '/images/IconoDominio.png',
  '/images/Like_BN.png',
  'https://api.myjson.com/bins/zucnc',
  '/images/Like_C.png'
];

//durante la fase de instalaciÃ³n, generalmente se almacena en cachÃ© los activos estÃ¡ticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexiÃ³n
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})




//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en cachÃ© o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la peticiÃ³n a la url
        return fetch(e.request);
          return res;
      } , function(error) {
        console.error('Fetching failed:', error);

        throw error;
      }   )
  )
})


