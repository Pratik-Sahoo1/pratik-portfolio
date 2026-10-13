/* Live NSE quotes for the price band (and research-card prices).
   Polls /api/quotes (netlify/functions/quotes.mjs) every 30 s while the market is open, every 5 min otherwise.
   If the endpoint is unavailable (e.g. local preview), the saved snapshot stays on screen, labelled as such. */
(function () {
  "use strict";
  var UI = window.UI, MARKET = window.MARKET;
  var ENDPOINT = "/api/quotes";
  var OPEN_MS = 30000, CLOSED_MS = 300000, FAIL_MS = 300000;
  var last = {}, timer = null, failures = 0;

  function fmtPrice(key, v) { return (UI.isIndex(key) ? "" : "₹") + UI.fmt(v, 2); }
  function istTime(unix) {
    try {
      return new Date(unix * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: false }).toUpperCase();
    } catch (e) { return ""; }
  }

  function setLabel(mode, text, title) {
    var el = document.getElementById("tickerLabel");
    if (!el) return;
    el.classList.toggle("is-live", mode === "live");
    el.classList.toggle("is-closed", mode === "closed");
    el.querySelector(".lbl").textContent = text;
    if (title) el.title = title;
  }

  function apply(data) {
    var quotes = (data && data.quotes) || {};
    var anyOpen = false, latest = 0;
    Object.keys(quotes).forEach(function (key) {
      var q = quotes[key];
      if (typeof q.price !== "number") return;
      if (q.marketOpen) anyOpen = true;
      if (q.time > latest) latest = q.time;
      var prev = last[key];
      var dir = prev == null ? 0 : q.price > prev ? 1 : q.price < prev ? -1 : 0;
      last[key] = q.price;
      document.querySelectorAll('[data-q="' + key + '"]').forEach(function (el) {
        var px = el.querySelector(".px"), chg = el.querySelector(".chg"), tpu = el.querySelector(".tpu");
        if (px) px.textContent = fmtPrice(key, q.price);
        if (chg) {
          chg.textContent = UI.signTxt(q.changePct);
          chg.className = "chg " + UI.signCls(q.changePct);
          chg.title = (q.change >= 0 ? "+" : "") + UI.fmt(q.change, 2) + " vs previous close " + UI.fmt(q.prevClose, 2);
        }
        if (tpu && el.dataset.tp) {
          var u = (parseFloat(el.dataset.tp) - q.price) / q.price * 100;
          tpu.textContent = "(" + UI.signTxt(u, 1) + ")";
          tpu.className = "tpu " + UI.signCls(u);
        }
        if (dir !== 0) {
          el.classList.remove("flash-up", "flash-down");
          void el.offsetWidth; // restart the animation
          el.classList.add(dir > 0 ? "flash-up" : "flash-down");
        }
      });
    });
    if (!latest) return false;
    if (anyOpen) setLabel("live", "LIVE · NSE", "Live NSE quotes via Yahoo Finance, refreshed every 30 seconds (may be delayed)");
    else setLabel("closed", "NSE CLOSED · " + istTime(latest) + " IST", "Last traded prices from the most recent NSE session (via Yahoo Finance)");
    return anyOpen;
  }

  function schedule(ms) {
    clearTimeout(timer);
    timer = setTimeout(poll, ms);
  }

  function poll() {
    if (document.hidden) { schedule(OPEN_MS); return; }
    fetch(ENDPOINT, { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        failures = 0;
        var open = apply(data);
        schedule(open ? OPEN_MS : CLOSED_MS);
      })
      .catch(function () {
        failures++;
        if (!Object.keys(last).length) setLabel("saved", MARKET.asOf.toUpperCase() + " CLOSE · SAVED", "Live quotes unavailable right now; showing saved prices");
        schedule(failures > 3 ? FAIL_MS * 2 : FAIL_MS);
      });
  }

  document.addEventListener("visibilitychange", function () { if (!document.hidden) poll(); });
  poll();
  window.LiveQuotes = { apply: apply, poll: poll };
})();
