/*! Zad. Copyright (c) 2026 Mohammad Farmani. All rights reserved. */
/* The app moved to app/. This retires the old offline cache that used to sit at this address, so the download page shows instead. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const ks = await caches.keys();
    await Promise.all(ks.filter((k) => k.startsWith("zad-1.2")).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const cs = await self.clients.matchAll({ type: "window" });
    cs.forEach((c) => { if (!new URL(c.url).pathname.includes("/app/")) c.navigate(c.url); });
  })());
});
