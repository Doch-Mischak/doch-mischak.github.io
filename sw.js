// רשת קודם (כדי שעדכונים יגיעו מיד), ומטמון כגיבוי כשאין קליטה
var CACHE='doch-mischak-v1';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith(fetch(r).then(function(res){
    if(res&&res.ok){var copy=res.clone();caches.open(CACHE).then(function(c){c.put(r,copy)})}
    return res;
  }).catch(function(){return caches.match(r).then(function(m){return m||caches.match('./')})}));
});
