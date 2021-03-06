self.addEventListener('install', function(event) {
  //perform install steps
  event.waitUntil(
    //wait until the following is cached - then install is complete
    caches.open('static-v1').then(function(cache) {
      //open the cache add all elements below
      return cache.addAll([
        './',
        './index.html',
        './restaurant.html',
        './css/styles.css',
        './js/main.js',
        './js/restaurant_info.js',
        './js/dbhelper.js',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
      ]);
    })
  );
});

//fetch the cache when required
self.addEventListener('fetch',function(event) {
  event.respondWith(
    //reposind to the request with the following
    caches.match(event.request)
    .then(function(response) {
    return response || fetch(event.request).then(function (response) {
      return caches.open('static-v1').then(function (cache) {
        cache.put(event.request, response.clone());
        return response;
      });
    });
  })
);
});
