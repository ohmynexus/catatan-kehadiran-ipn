/* IPN NAMATOTA — cache update policy */
const CACHE='ipn-attendance-shell-v9';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k.startsWith('ipn-attendance-shell-')&&k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;

  // HTML/navigation: prefer newest server response; cached copy is offline fallback.
  if(req.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('index.html')){
    event.respondWith(fetch(req,{cache:'no-store'}).then(resp=>{
      if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));}
      return resp;
    }).catch(()=>caches.match('./index.html').then(hit=>hit||caches.match('./'))));
    return;
  }

  // Static shell resources: cache first, fetch and update if not cached.
  event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(resp=>{
    if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(req,copy));}
    return resp;
  })));
});