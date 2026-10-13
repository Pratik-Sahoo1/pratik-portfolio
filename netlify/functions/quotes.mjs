// Netlify Function: live NSE quotes for the site's price band, served at /api/quotes.
// Browsers can't call Yahoo Finance directly (no CORS headers), so this fetches it server-side.
// Netlify's CDN caches the response for ~20 s, so visitors share one upstream call.

const SYMBOLS = {
  NIFTY: "^NSEI",
  SENSEX: "^BSESN",
  BHARTIARTL: "BHARTIARTL.NS",
  SUNPHARMA: "SUNPHARMA.NS",
  WAAREEENER: "WAAREEENER.NS",
  WAAREERTL: "WAAREERTL.NS",
  SCHNEIDER: "SCHNEIDER.NS",
};

async function fetchQuote(key, symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (portfolio price band)" } });
  if (!res.ok) throw new Error(`${symbol}: HTTP ${res.status}`);
  const meta = (await res.json())?.chart?.result?.[0]?.meta;
  if (!meta || typeof meta.regularMarketPrice !== "number") throw new Error(`${symbol}: no price`);

  const price = meta.regularMarketPrice;
  const prevClose = meta.chartPreviousClose ?? meta.previousClose;
  const session = meta.currentTradingPeriod?.regular;
  const now = Date.now() / 1000;
  return [key, {
    price,
    prevClose,
    change: price - prevClose,
    changePct: ((price - prevClose) / prevClose) * 100,
    time: meta.regularMarketTime,
    marketOpen: session ? now >= session.start && now < session.end : null,
  }];
}

export default async () => {
  const settled = await Promise.allSettled(
    Object.entries(SYMBOLS).map(([key, symbol]) => fetchQuote(key, symbol))
  );
  const quotes = {};
  const errors = [];
  for (const r of settled) {
    if (r.status === "fulfilled") quotes[r.value[0]] = r.value[1];
    else errors.push(String(r.reason?.message || r.reason));
  }
  const ok = Object.keys(quotes).length > 0;
  return new Response(JSON.stringify({ source: "Yahoo Finance (NSE)", fetchedAt: Date.now(), quotes, errors }), {
    status: ok ? 200 : 502,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
      "netlify-cdn-cache-control": ok ? "public, durable, max-age=20, stale-while-revalidate=60" : "no-store",
    },
  });
};

export const config = { path: "/api/quotes" };
