var CACHE_NAME = 'cache-v2';
var urlsToPrefetch = [
'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css',
'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
'https://use.fontawesome.com/releases/v5.0.10/css/brands.css',
'https://use.fontawesome.com/releases/v5.0.10/css/fontawesome.css'
];

//isntall all dependencies
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
           return new Request(urlToPrefetch, { mode: 'no-cors' });
        })).then(function() {
          console.log('All resources have been fetched and cached.');
        });
      })
  );
});
/*
// https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
// Stale-while-revalidate strategy
var fetchRequest = null;
self.addEventListener('fetch', function(event) {
  fetchRequest = event.request.clone();
  console.log("fetch")
  console.dir(event.request)
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {

      return cache.match(fetchRequest).then(function(response) {
        var fetchPromise = fetch(fetchRequest).then(function(networkResponse) {

          if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
          }
          var responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(fetchRequest, responseToCache);
          });
          return networkResponse;
        })

        return response || fetchPromise;
      })
    })
  );
});
/*
/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
*/
