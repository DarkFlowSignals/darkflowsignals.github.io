/**
 * DarkFlow service worker — Web Push handler (v2 polish, 2026-05-06).
 *
 * Receives encrypted push payloads from the darkflow-gate Worker, displays
 * a polished OS notification with hero image, action buttons, and tighter
 * title/body. Click → opens the dashboard scrolled to the signal's card.
 *
 * Polish over v1:
 *  - Title gets direction arrow + ticker + strength label (compact, glanceable)
 *  - Body uses dot-separator format that lock-screen-truncation handles well
 *  - "image" field shows DarkFlow brand hero on iOS expanded view + Android
 *  - Action buttons: "View on dashboard" + "Mute alerts" (Android renders;
 *    iOS shows none but they don't hurt)
 *  - Custom vibration pattern (Android) for branded buzz
 *  - Stays muted on tag-replace (no re-buzz on same-ticker continuation)
 */

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Map direction → arrow + emoji-ish symbol for the title.
function dirArrow(direction) {
  if (direction === "BULLISH") return "▲";
  if (direction === "BEARISH") return "▼";
  return "◆";
}

// Map server-side strength label → polished title-case word.
function strengthLabel(s) {
  if (!s) return "";
  s = String(s).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    if (event.data) payload = event.data.json();
  } catch (_) {
    payload = { ticker: "DarkFlow", body: "New signal fired. Tap to view dashboard." };
  }

  const ticker = payload.ticker || "DarkFlow";
  const arrow = dirArrow(payload.direction);
  const strength = strengthLabel(payload.strength || payload.conviction_label);

  // ---- TITLE ----
  // Glanceable on lock screen. Format:
  //   "▲ $MU · Strong"
  //   "▼ $SPY · Developing"
  //   "▲ $TEST · Test"
  // Falls back to payload.headline if explicitly provided.
  let title;
  if (payload.headline) {
    title = payload.headline;
  } else if (payload.type === "test") {
    title = `🔔 ${arrow} $${ticker} · Test`;
  } else {
    title = `${arrow} $${ticker}` + (strength ? ` · ${strength}` : "");
  }

  // ---- BODY ----
  // Two-line format optimized for iOS lock screen (which shows ~2 lines before
  // truncating). Line 1 = the trade spec. Line 2 = "tap for thesis" CTA.
  let body;
  if (payload.body) {
    body = payload.body;
  } else {
    const specBits = [];
    if (payload.option_type && payload.strike) {
      specBits.push(`${payload.option_type} $${payload.strike}`);
    }
    if (payload.exp) {
      specBits.push(payload.exp);
    }
    const spec = specBits.join(" · ");
    body = spec ? `${spec}\nTap for full thesis →` : "Tap for full thesis →";
  }

  // ---- TAG (collapse same-ticker notifications) ----
  const tag = ticker !== "DarkFlow" ? `signal-${ticker}` : "signal";

  // ---- ACTIONS ----
  // Android shows up to 2 buttons; iOS only shows them in expanded view if
  // the user 3D-touches/long-presses. They don't hurt elsewhere.
  const actions = [
    { action: "view", title: "View dashboard", icon: "/favicon-32.png" },
    { action: "mute", title: "Mute alerts" },
  ];

  // ---- HERO IMAGE ----
  // iOS shows this when the user pulls the notification down to expand.
  // Android shows it inline in the body when expanded. Falls back gracefully
  // when the asset isn't available (legacy clients just skip it).
  //
  // Per-signal chart preview added 2026-05-07: push_broadcast.py renders a
  // 30-day underlying-stock chart with entry-date marker and includes the
  // public URL as payload.image_url. Falls back to the brand og-image when
  // the chart generator failed (Alpaca/yfinance both unavailable, or render
  // exception). Test pushes can also pass image_url directly to override.
  const image = payload.image_url || "https://darkflowsignals.com/og-image.png";

  // ---- VIBRATION ----
  // [buzz, pause, buzz] = double-tap pattern. Android only; iOS uses default.
  const vibrate = [180, 80, 180];

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,
      renotify: false,            // tag-replace silently; don't re-buzz on same ticker
      icon: "/favicon-32.png",
      badge: "/favicon-32.png",
      image,
      vibrate,
      actions,
      // timestamp: explicit so iOS notification timestamp matches signal-fire time
      timestamp: payload.ts || Date.now(),
      data: {
        url: payload.url || "https://darkflowsignals.com/dashboard.html",
        ticker: payload.ticker || null,
        ts: Date.now(),
      },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  // Action button "mute" -> mark a flag in IDB and ack; the user can re-enable
  // from the dashboard later. For now we treat it as "close this one"; the
  // full mute-flow is Phase 2.
  if (event.action === "mute") {
    event.notification.close();
    return;
  }

  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "https://darkflowsignals.com/dashboard.html";
  event.waitUntil(
    (async () => {
      const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const c of all) {
        if (c.url.startsWith("https://darkflowsignals.com")) {
          await c.focus();
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
