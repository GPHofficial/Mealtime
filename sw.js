var CACHE_NAME = 'cache-v2-fix';
var urlsToPrefetch = [
'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css',
'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
'https://use.fontawesome.com/releases/v5.0.10/css/brands.css',
'https://use.fontawesome.com/releases/v5.0.10/css/fontawesome.css'
];
console.log("does this log");
//isntall all dependencies
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        cache.addAll(urlsToPrefetch).then(function(res){
          console.log('All resources have been fetched and cached. (install)');
        });
      })
  );
});

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
