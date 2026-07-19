// Service worker for Al-Salaam Islamic Centre PWA
const CACHE_NAME = "alsalaam-v1";

const PRECACHE_URLS = ["/", "/manifest.json", "/data/info.json"];

// Precache core assets on install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
  self.skipWaiting();
});

// Clean old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

// Network-first for navigations, cache-first for static assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Skip Chrome DevTools requests
  if (request.cache === "only-if-cached" && request.mode !== "same-origin")
    return;

  // Cache-first for static assets (JS, CSS, images, fonts, icons, data)
  if (
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|json|txt)$/.test(url.pathname) ||
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/data/") ||
    url.pathname.startsWith("/api/images/")
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((response) => {
              if (response.ok) cache.put(request, response.clone());
              return response;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        }),
      ),
    );
    return;
  }

  // Network-first for navigations and API calls
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});
