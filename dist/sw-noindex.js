// Service worker to add noindex headers to tag pages
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// Add X-Robots-Tag: noindex header to all responses in the /tag/ path
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/tag/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const newHeaders = new Headers(response.headers);
          newHeaders.set("X-Robots-Tag", "noindex, nofollow");

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
        })
        .catch(() => {
          // If fetch fails, redirect to homepage
          return Response.redirect("https://blog.lckhp.org/", 302);
        })
    );
  }
});
