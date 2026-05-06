/**
 * DarkFlow service worker — Web Push handler (added 2026-05-06).
 *
 * Registered by dashboard.html on first signed-in visit. Receives encrypted
 * push payloads from the darkflow-gate Worker, decrypts via the browser's
 * built-in machinery (we just read .data.json()), and shows an OS
 * notification. Click → opens the dashboard scrolled to the signal's card.
 */

self.addEventListener("install", (event) => {
  // Activate immediately on first install -- no waiting for tabs to close.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control of clients on activation so the first push works
  // without requiring a page reload.
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  // Payload was encrypted server-side via aes128gcm; the browser's push
  // service decrypts before delivering, so event.data.json() works.
  let payload = {};
  try {
    if (event.data) payload = event.data.json();
  } catch (_) {
    // Fallback: if no payload (some providers send empty wakeups), show a
    // generic notification that prompts a dashboard fetch.
    payload = { headline: "New signal fired", body: "Tap to view dashboard." };
  }

  const title = payload.headline || `${payload.ticker || ""} ${payload.direction || ""}`.trim() || "DarkFlow signal";
  const body =
    payload.body ||
    [
      payload.option_type && payload.strike ? `${payload.option_type} $${payload.strike}` : "",
      payload.exp ? `exp ${payload.exp}` : "",
      payload.conviction_label ? `Conviction ${payload.conviction_label}` : "",
    ]
      .filter(Boolean)
      .join(" · ") || "Tap for full thesis";

  const tag = payload.ticker ? `signal-${payload.ticker}` : "signal";

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,                              // collapses repeated notifications for the same ticker
      renotify: false,                  // silent replace; don't re-buzz
      icon: "/favicon-32.png",
      badge: "/favicon-32.png",
      data: {
        url: payload.url || "https://darkflowsignals.com/dashboard.html",
        ticker: payload.ticker || null,
        ts: Date.now(),
      },
      // requireInteraction: true makes desktop sticky; left default for now so
      // the notification dismisses naturally on phone.
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "https://darkflowsignals.com/dashboard.html";
  // Focus an existing dashboard tab if one is open; otherwise open a new one.
  event.waitUntil(
    (async () => {
      const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const c of all) {
        if (c.url.startsWith("https://darkflowsignals.com")) {
          await c.focus();
          // If a ticker is in the data, ask the page to scroll to it.
          if (event.notification.data && event.notification.data.ticker) {
            c.postMessage({ type: "scroll-to-ticker", ticker: event.notification.data.ticker });
          }
          return;
        }
      }
      await self.clients.openWindow(target);
    })()
  );
});
