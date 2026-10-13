/* Shared UI: chrome (ticker, nav, footer), motion helpers and the chart/block renderer. */
(function () {
  "use strict";
  var SITE = window.SITE, MARKET = window.MARKET;
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- helpers */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmt(n, dec) {
    dec = dec || 0;
    return Number(n).toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function fmtBy(kind, v) {
    if (kind === "pct") return fmt(v, 1) + "%";
    if (kind === "1") return fmt(v, 1);
    if (kind === "2") return fmt(v, 2);
    return fmt(v, 0);
  }
  function h(tag, attrs, html) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") el.className = attrs[k];
      else if (k === "style") el.setAttribute("style", attrs[k]);
      else el.setAttribute(k, attrs[k]);
    });
    if (html != null) el.innerHTML = html;
    return el;
  }
  function seriesStats(key) {
    var s = MARKET.series[key]; if (!s) return null;
    var o = s.ohlc, last = o[o.length - 1][3], prev = o[o.length - 2][3];
    var first = o[0][3];
    return { last: last, prev: prev, chg: (last - prev) / prev * 100, yr: (last - first) / first * 100, label: s.label, name: s.name };
  }
  function isIndex(key) { return key === "NIFTY" || key === "SENSEX"; }
  function signCls(v) { return v > 0.0001 ? "up" : v < -0.0001 ? "down" : "flat"; }
  function signTxt(v, d) { return (v > 0 ? "+" : v < 0 ? "−" : "") + fmt(Math.abs(v), d == null ? 2 : d) + "%"; }

  var ICON = {
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    arrowUR: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 11l6-6M6 5h5v5"/></svg>',
    down: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v8M4.5 7.5L8 11l3.5-3.5M3 13.5h10"/></svg>',
    pdf: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.5 1.5H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5L9.5 1.5z"/><path d="M9.5 1.5V5H13"/></svg>',
    mail: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1.5" y="3" width="13" height="10" rx="1.5"/><path d="M2 4l6 5 6-5"/></svg>',
    copy: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M11 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2"/></svg>',
    li: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M3.6 5.6H1.2V14h2.4V5.6zM2.4 1.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8zM14.8 9.2c0-2.3-1.2-3.8-3.3-3.8-1.1 0-1.9.6-2.2 1.2V5.6H7V14h2.4V9.7c0-1.1.4-1.9 1.4-1.9.9 0 1.4.7 1.4 1.9V14h2.6V9.2z"/></svg>',
    back: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 8H3M7 4L3 8l4 4"/></svg>'
  };

  /* ---------------------------------------------------------------- chrome */
  var NAV = [["about", "About"], ["experience", "Experience"], ["research", "Research"], ["blog", "Blog"], ["skills", "Skills"], ["credentials", "Credentials"], ["contact", "Contact"]];

  function tickerHTML() {
    var items = SITE.ticker.map(function (t) {
      if (t.kind === "stock") {
        // Snapshot values; js/live.js replaces price and change with live NSE quotes when available.
        var s = seriesStats(t.series);
        var cur = isIndex(t.series) ? "" : "₹";
        var up = t.tp ? (t.tp - s.last) / s.last * 100 : 0;
        return '<div class="ticker-item" data-q="' + t.series + '"' + (t.tp ? ' data-tp="' + t.tp + '"' : "") + ' title="' + esc(MARKET.series[t.series].name) + '"><span class="sym">' + esc(t.label || s.label) + '</span><span class="px">' + cur + fmt(s.last) + '</span><span class="chg ' + signCls(s.chg) + '">1W ' + signTxt(s.chg) + "</span>" +
          (t.rating ? '<span class="rt rt-' + t.rating + '">' + t.rating + '</span><span class="tp">' + t.tpLabel + " ₹" + fmt(t.tp) + ' <span class="tpu ' + signCls(up) + '">(' + signTxt(up, 1) + ")</span></span>" : "") + "</div>";
      }
      return '<div class="ticker-item"><span class="sym">' + esc(t.a) + '</span><span class="px">' + esc(t.b) + "</span></div>";
    }).join("");
    return '<div class="ticker" role="marquee" aria-label="Coverage and credentials">' +
      '<div class="ticker-label" id="tickerLabel" title="Saved prices as of the last snapshot"><span class="dot"></span><span class="lbl">' + esc(MARKET.asOf.toUpperCase()) + " CLOSE · SAVED</span></div>" +
      '<div class="ticker-viewport"><div class="ticker-track">' + items + items + "</div></div></div>";
  }

  function renderChrome(page) {
    var home = page === "home";
    var base = home ? "" : "index.html";
    var P = SITE.profile;
    var top = h("div", null);
    top.innerHTML = tickerHTML() +
      '<header class="nav" id="nav"><div class="wrap">' +
      '<a class="brand" href="' + (home ? "#top" : "index.html") + '" aria-label="Home"><span class="brand-mark">PS</span><span class="brand-name"><b>PRATIK</b> SAHOO</span></a>' +
      '<nav class="nav-links" aria-label="Sections">' + NAV.map(function (n) { return '<a href="' + base + "#" + n[0] + '" data-sec="' + n[0] + '">' + n[1] + "</a>"; }).join("") + "</nav>" +
      '<div class="nav-cta"><a class="btn btn-sm btn-primary" href="' + P.cv + '" target="_blank" rel="noopener">' + ICON.down + "CV</a></div>" +
      '<button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<div class="progress" id="progress"></div></div></header>';
    var frag = document.createDocumentFragment();
    while (top.firstChild) frag.appendChild(top.firstChild);
    document.body.insertBefore(frag, document.body.firstChild);

    var foot = h("footer", { class: "footer" },
      '<div class="wrap"><p>Independent, illustrative research for educational purposes — not investment advice and not issued by a SEBI-registered entity. Ratings, targets and estimates are as of each report’s date. The price band shows NSE quotes via Yahoo Finance (may be delayed); charts use weekly data to ' + esc(MARKET.asOf) + " (INDmoney).</p>" +
      '<p>© 2026 ' + esc(P.name) + ' · <a href="mailto:' + P.email + '">' + esc(P.email) + '</a> · <a href="' + P.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></p></div>');
    document.body.appendChild(foot);
    document.body.appendChild(h("div", { class: "toast", id: "toast", role: "status", "aria-live": "polite" }));
    var tip = h("div", { id: "tip", style: "position:fixed;left:0;top:0;z-index:120;pointer-events:none;opacity:0;transition:opacity .15s;background:rgba(9,11,13,.94);border:1px solid #27313a;border-radius:10px;padding:9px 12px;font:12px/1.6 'JetBrains Mono',monospace;color:#e9ebed;max-width:360px;backdrop-filter:blur(8px)" });
    document.body.appendChild(tip);

    // nav behaviour
    var nav = document.getElementById("nav");
    var prog = document.getElementById("progress");
    var toggle = nav.querySelector(".nav-toggle");
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) { a.addEventListener("click", function () { document.body.classList.remove("nav-open"); }); });
    function onScroll() {
      var y = window.scrollY;
      nav.classList.toggle("scrolled", y > 20);
      var max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (home) {
      var links = {};
      nav.querySelectorAll("[data-sec]").forEach(function (a) { links[a.dataset.sec] = a; });
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            Object.keys(links).forEach(function (k) { links[k].classList.toggle("active", k === e.target.id); });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      NAV.forEach(function (n) { var s = document.getElementById(n[0]); if (s) io.observe(s); });
    }
  }

  function toast(msg) {
    var t = document.getElementById("toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }
  function copyText(text) {
    function done() { toast("Copied " + text); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
    function fallback() {
      var ta = h("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast(text); }
      ta.remove();
    }
  }

  /* ---------------------------------------------------------------- motion */
  function splitWords(el) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = "1";
    var i = 0;
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            var outer = h("span", { class: "split-word" });
            var inner = h("span", { style: "transition-delay:" + (i++ * 0.045).toFixed(3) + "s" });
            inner.textContent = w; outer.appendChild(inner); frag.appendChild(outer);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    }
    walk(el);
  }

  var observer = null;
  function observe(root) {
    root = root || document;
    root.querySelectorAll("[data-split]").forEach(splitWords);
    var els = root.querySelectorAll(".reveal, .io");
    if (REDUCED || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      root.querySelectorAll("[data-count]").forEach(function (e) { e.textContent = e.dataset.final || e.dataset.count; });
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          e.target.querySelectorAll && e.target.querySelectorAll("[data-count]").forEach(countUp);
          if (e.target.hasAttribute("data-count")) countUp(e.target);
          observer.unobserve(e.target);
        });
      }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });
    }
    els.forEach(function (e) { observer.observe(e); });
  }
  function countUp(el) {
    if (el.dataset.counted) return; el.dataset.counted = "1";
    var to = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || "0", 10), dur = 1600, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(to * e, dec);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function interactions() {
    // spotlight on cards
    document.addEventListener("pointermove", function (e) {
      var c = e.target.closest && e.target.closest(".card, .rcard");
      if (!c) return;
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", (e.clientX - r.left) + "px");
      c.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
    if (REDUCED) return;
    // 3D tilt
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      var max = parseFloat(el.dataset.tilt) || 8;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(1000px) rotateY(" + (x * max) + "deg) rotateX(" + (-y * max) + "deg)";
        el.style.setProperty("--shine", (x * 120) + "%");
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; el.style.setProperty("--shine", "-60%"); });
    });
    // magnetic buttons
    document.querySelectorAll(".btn-primary").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.12) + "px," + ((e.clientY - r.top - r.height / 2) * 0.18 - 2) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------------- charts */
  // Price line chart (SVG) with target line and last-price marker
  function priceChart(el, opt) {
    var o = opt.ohlc, n = o.length, W = 600, H = 300, PL = 6, PR = 64, PT = 18, PB = 26;
    var closes = o.map(function (c) { return c[3]; });
    var lo = Math.min.apply(null, o.map(function (c) { return c[2]; })), hi = Math.max.apply(null, o.map(function (c) { return c[1]; }));
    if (opt.tp) { lo = Math.min(lo, opt.tp); hi = Math.max(hi, opt.tp); }
    var pad = (hi - lo) * 0.08; lo -= pad; hi += pad;
    function X(i) { return PL + i / (n - 1) * (W - PL - PR); }
    function Y(v) { return PT + (1 - (v - lo) / (hi - lo)) * (H - PT - PB); }
    var d = closes.map(function (c, i) { return (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(c).toFixed(1); }).join(" ");
    var area = d + " L" + X(n - 1).toFixed(1) + " " + (H - PB) + " L" + X(0) + " " + (H - PB) + " Z";
    var grid = "";
    for (var g = 0; g <= 3; g++) {
      var v = lo + (hi - lo) * (g / 3), y = Y(v);
      grid += '<line x1="' + PL + '" x2="' + (W - PR) + '" y1="' + y + '" y2="' + y + '"/><text class="lbl" x="' + (W - PR + 8) + '" y="' + (y + 4) + '">' + fmt(v) + "</text>";
    }
    var months = "", start = new Date(MARKET.firstWeek + "T00:00:00"), seen = {};
    for (var i = 0; i < n; i += 1) {
      var dt = new Date(start.getTime() + i * 7 * 864e5), m = dt.getMonth();
      if ((m % 3 === 0) && !seen[dt.getFullYear() + "-" + m] && dt.getDate() <= 7) {
        seen[dt.getFullYear() + "-" + m] = 1;
        months += '<text class="lbl" x="' + X(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + dt.toLocaleDateString("en-GB", { month: "short" }) + " " + String(dt.getFullYear()).slice(2) + "</text>";
      }
    }
    var last = closes[n - 1];
    var tpCol = opt.tp > last ? "#2bd47d" : "#ff5a5f";
    var tp = opt.tp ? '<line class="tp" x1="' + PL + '" x2="' + (W - PR) + '" y1="' + Y(opt.tp) + '" y2="' + Y(opt.tp) + '" stroke="' + tpCol + '"/><text class="lbl" x="' + (PL + 4) + '" y="' + (Y(opt.tp) - 7) + '" style="fill:' + tpCol + '">' + esc(opt.tpLabel || "TP") + " ₹" + fmt(opt.tp) + "</text>" : "";
    var gid = "gA" + Math.random().toString(36).slice(2, 7);
    el.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(opt.aria || "Weekly closing price, last 12 months") + '">' +
      '<defs><linearGradient id="' + gid + '" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ffb224" stop-opacity=".32"/><stop offset="1" stop-color="#ffb224" stop-opacity="0"/></linearGradient></defs>' +
      '<g class="grid">' + grid + "</g>" + months + tp +
      '<path class="area" d="' + area + '" style="fill:url(#' + gid + ')"/>' +
      '<path class="ln draw" d="' + d + '"/>' +
      '<circle class="pulse" cx="' + X(n - 1) + '" cy="' + Y(last) + '" r="5"/><circle class="dot" cx="' + X(n - 1) + '" cy="' + Y(last) + '" r="4"/>' +
      "</svg>";
    el.classList.add("io");
    var p = el.querySelector(".ln");
    try { p.style.setProperty("--len", Math.ceil(p.getTotalLength())); } catch (e) {}
  }

  // CSS 3D bar chart. b: {labels, values, actual, fmt, line:{values, fmt, label}, hiIdx, signed}
  function bars3d(el, b) {
    var vals = b.values, n = vals.length;
    var max = Math.max.apply(null, vals.map(Math.abs).concat([0]));
    var hasNeg = vals.some(function (v) { return v < 0; });
    var posMax = Math.max(0, Math.max.apply(null, vals)), negMax = Math.max(0, -Math.min.apply(null, vals));
    if (hasNeg) { // headroom on the smaller side; bars stay on one common scale
      var pm = posMax, nm = negMax;
      posMax = Math.max(pm, nm * 0.35); negMax = Math.max(nm, pm * 0.35);
    }
    var zero = hasNeg ? negMax / (posMax + negMax) * 100 : 0; // % from bottom
    var span = hasNeg ? (posMax + negMax) : max;
    var many = n > 8;
    var plotH = b.height || (n > 8 ? 300 : 280);
    var depth = Math.max(12, Math.min(30, 260 / n));
    var cols = vals.map(function (v, i) {
      var hpct = Math.abs(v) / span * 100;
      var cls = "b3d-col" + (b.actual != null && i >= b.actual ? " fc" : "") + (b.signed ? (v < 0 ? " neg" : " pos") : "") + (b.hiIdx === i ? " hi" : "") + ((i === 0 || i === n - 1) ? " show" : "");
      var pos = v < 0 ? "top:" + (100 - zero) + "%;" : "bottom:" + zero + "%;";
      var lbl = b.valueFmt ? b.valueFmt(v) : (b.fmt === "pctSigned" ? signTxt(v, 1) : fmtBy(b.fmt, v));
      return '<div class="' + cls + '"><div class="b3d-bar' + (v < 0 ? " neg" : "") + '" style="' + pos + "--h:" + Math.max(hpct, 0.6).toFixed(2) + "%;--d:" + (i * 0.07).toFixed(2) + 's"><i class="f"></i><i class="r"></i><i class="t"></i><span class="b3d-val">' + lbl + '</span></div><span class="b3d-lbl">' + esc(b.labels[i]) + "</span></div>";
    }).join("");
    var line = "";
    if (b.line) {
      var lv = b.line.values, lmin = Math.min.apply(null, lv), lmax = Math.max.apply(null, lv), lr = (lmax - lmin) || 1;
      var pts = lv.map(function (v, i) { return [(i + 0.5) / n * 100, 100 - (12 + (v - lmin) / lr * 70)]; });
      line = '<svg class="b3d-line" viewBox="0 0 100 100" preserveAspectRatio="none"><path class="draw" style="--len:400" d="' + pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(2) + " " + p[1].toFixed(2); }).join(" ") + '"/></svg>' +
        pts.map(function (p, i) { return '<span class="b3d-pt fade" style="left:' + p[0] + "%;top:" + p[1] + "%;--d:" + (0.9 + i * 0.06).toFixed(2) + 's"><em>' + fmtBy(b.line.fmt, lv[i]) + "</em></span>"; }).join("");
    }
    el.innerHTML = '<div class="b3d io' + (many ? " many" : "") + '" style="--depth:' + depth + "px;--plot-h:" + plotH + 'px">' +
      '<div class="b3d-scene"><div class="b3d-plot" style="gap:' + (n > 8 ? 10 : 16) + 'px"><div class="b3d-zero" style="bottom:' + zero + '%"></div>' + cols + line + "</div></div></div>" +
      (b.actual != null || b.line ? '<div class="b3d-legend">' + (b.actual != null && b.actual < n ? '<span><i style="background:linear-gradient(#ffc24f,#b86d00)"></i>Actual</span><span><i style="background:rgba(255,178,36,.3);outline:1px dashed #ffb224"></i>Forecast / scenario</span>' : "") + (b.line ? '<span><i style="background:#52c7ff;height:2px;vertical-align:3px"></i>' + esc(b.line.label) + "</span>" : "") + "</div>" : "");
    var wrap = el.querySelector(".b3d"), scene = el.querySelector(".b3d-scene");
    if (!REDUCED) {
      wrap.addEventListener("pointermove", function (e) {
        var r = wrap.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        scene.style.setProperty("--ry", (-24 + x * 22).toFixed(1) + "deg");
        scene.style.setProperty("--rx", (-14 - y * 12).toFixed(1) + "deg");
      });
      wrap.addEventListener("pointerleave", function () { scene.style.removeProperty("--ry"); scene.style.removeProperty("--rx"); });
    }
    return wrap;
  }

  function signedBars(el, b) {
    var W = 640, H = 260, PL = 8, PR = 8, PT = 24, PB = 30, n = b.values.length;
    var mx = Math.max.apply(null, b.values.map(Math.abs));
    var pos = Math.max(0, Math.max.apply(null, b.values)), neg = Math.max(0, -Math.min.apply(null, b.values));
    var tot = pos + neg || 1, zeroY = PT + pos / tot * (H - PT - PB);
    var bw = (W - PL - PR) / n * 0.56;
    var bars = b.values.map(function (v, i) {
      var cx = PL + (i + 0.5) * (W - PL - PR) / n, hh = Math.abs(v) / tot * (H - PT - PB);
      var y = v >= 0 ? zeroY - hh : zeroY, col = v >= 0 ? "#ff7a7e" : "#2bd47d";
      return '<rect class="grow" style="--d:' + (i * 0.08) + "s;transform-origin:" + (v >= 0 ? "bottom" : "top") + '" x="' + (cx - bw / 2) + '" y="' + y + '" width="' + bw + '" height="' + Math.max(hh, 1) + '" rx="3" fill="' + col + '" fill-opacity=".85"/>' +
        '<text class="fade" style="--d:' + (0.6 + i * 0.08) + 's" x="' + cx + '" y="' + (v >= 0 ? y - 7 : y + hh + 15) + '" text-anchor="middle" fill="#e9ebed">' + (v < 0 ? "(" + fmt(-v) + ")" : fmt(v)) + "</text>" +
        '<text x="' + cx + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(b.labels[i]) + "</text>";
    }).join("");
    el.innerHTML = '<div class="io"><svg class="svgc" viewBox="0 0 ' + W + " " + H + '"><line class="ax" x1="' + PL + '" x2="' + (W - PR) + '" y1="' + zeroY + '" y2="' + zeroY + '"/>' + bars + '</svg><div class="legend"><span><i style="background:#ff7a7e"></i>Net debt</span><span><i style="background:#2bd47d"></i>Net cash</span></div></div>';
    void mx;
  }

  function football(el, b) {
    var all = []; b.rows.forEach(function (r) { all.push(r.low, r.high); }); all.push(b.target, b.cmp);
    var lo = Math.min.apply(null, all), hi = Math.max.apply(null, all);
    var step = Math.pow(10, Math.floor(Math.log10(hi - lo))) / 2;
    lo = Math.floor(lo / step) * step; hi = Math.ceil(hi / step) * step;
    function P(v) { return (v - lo) / (hi - lo) * 100; }
    var rows = b.rows.map(function (r, i) {
      return '<div class="ff-row' + (r.ctx ? " ctx" : "") + '"><div class="ff-lbl">' + esc(r.label) + '</div><div class="ff-track"><div class="ff-bar" style="left:' + P(r.low) + "%;width:" + (P(r.high) - P(r.low)) + "%;transition-delay:" + (i * 0.09) + 's"><span class="lo">' + fmt(r.low) + '</span><span class="hi">' + fmt(r.high) + '</span></div></div><div class="ff-w">' + esc(r.weight) + "</div></div>";
    }).join("");
    var ticks = []; for (var t = 0; t <= 4; t++) ticks.push("<span>₹" + fmt(lo + (hi - lo) * t / 4) + "</span>");
    el.innerHTML = '<div class="ff io">' + rows +
      '<div class="ff-marks"><div><div class="ff-mark" style="left:' + P(b.target) + '%"><span>Target ₹' + fmt(b.target) + '</span></div><div class="ff-mark cmp" style="left:' + P(b.cmp) + '%"><span>CMP ₹' + fmt(b.cmp) + "</span></div></div></div>" +
      '<div class="ff-axis"><div>' + ticks.join("") + "</div></div></div>";
  }

  function scenarios(el, b) {
    el.innerHTML = '<div class="scen io">' + b.items.map(function (s, i) {
      var cls = s.name.toLowerCase();
      return '<div class="scen-card ' + cls + '" style="--d:' + (i * 0.12) + 's"><div class="nm">' + esc(s.name) + ' case</div><div class="val">₹' + fmt(s.value) + '</div><div class="chg ' + (s.chg.charAt(0) === "+" ? "up" : "down") + '">' + esc(s.chg) + " vs CMP ₹" + fmt(b.cmp) + "</div><p>" + esc(s.note) + '</p><div class="gauge"></div></div>';
    }).join("") + "</div>";
  }

  function sensGrid(el, b) {
    var head = "<tr><th>" + esc(b.corner) + "</th>" + b.cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr>";
    var body = b.rows.map(function (r, ri) {
      return "<tr><td>" + esc(r.h) + "</td>" + r.v.map(function (v, ci) {
        var d = (v - b.cmp) / b.cmp, a = Math.min(0.42, Math.abs(d) * 0.9 + 0.05);
        var bg = d >= 0 ? "rgba(43,212,125," + a + ")" : "rgba(255,90,95," + a + ")";
        var base = b.base && b.base[0] === ri && b.base[1] === ci;
        return '<td class="' + (base ? "base" : "") + '" style="background:' + bg + '">' + fmt(v) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    el.innerHTML = '<div class="tbl-wrap"><table class="tbl grid-tbl"><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>";
  }

  function hbars(el, b) {
    var vals = b.items.map(function (i) { return i.value; });
    var min = b.min != null ? b.min : 0, max = Math.max.apply(null, vals.concat(b.ref ? [b.ref.value] : [])) * 1.08;
    function W(v) { return Math.max(1, (v - min) / (max - min) * 100); }
    var ref = b.ref ? '<div class="hb-ref" style="left:' + W(b.ref.value) + '%"><span>' + esc(b.ref.label) + "</span></div>" : "";
    el.innerHTML = '<div class="hb io">' + b.items.map(function (it, i) {
      var w = W(it.value);
      var val = b.unit === "₹" ? "₹" + fmt(it.value) : b.unit === "$" ? "$" + fmt(it.value) : b.unit === "%" ? fmt(it.value, 2).replace(/0$/, "") + "%" : fmt(it.value, 2);
      return '<div class="hb-row' + (it.hi ? " hi" : "") + '"><div class="hb-lbl">' + esc(it.label) + '</div><div class="hb-track">' + (i === 0 ? ref : "") + '<div class="hb-bar" style="width:' + w + "%;--d:" + (i * 0.08) + 's"></div><span class="hb-val fade" style="--w:' + w + "%;--d:" + (0.7 + i * 0.08) + 's">' + val + "</span></div></div>";
    }).join("") + "</div>";
  }

  var MIX_COLORS = ["#ffb224", "#52c7ff", "#9b8cff", "#5fe3c0", "#ff7ab6", "#e9ebed"];
  function mix(el, b) {
    el.innerHTML = '<div class="mix io">' + b.rows.map(function (r) {
      return '<div class="mix-row"><span class="lb">' + esc(r.label) + '</span><div class="mix-bar">' + r.parts.map(function (p, i) {
        return '<i style="background:' + MIX_COLORS[i] + ';--w:' + p + '%" title="' + esc(b.keys[i]) + ": " + p + '%">' + (p >= 7 ? "<span>" + fmt(p, 1) + "%</span>" : "") + "</i>";
      }).join("") + "</div></div>";
    }).join("") + '</div><div class="legend">' + b.keys.map(function (k, i) { return '<span><i style="background:' + MIX_COLORS[i] + '"></i>' + esc(k) + "</span>"; }).join("") + "</div>";
    var m = el.querySelector(".mix");
    function grow() { m.querySelectorAll(".mix-bar i").forEach(function (i) { i.style.width = i.style.getPropertyValue("--w"); }); }
    if (REDUCED) grow(); else new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { grow(); o.disconnect(); } }, { threshold: 0.2 }).observe(m);
  }

  function stackedCols(el, b) {
    var W = 520, H = 300, PT = 20, PB = 34, n = b.cats.length;
    var tot = Math.max.apply(null, b.cats.map(function (c) { return c.parts.reduce(function (a, x) { return a + x; }, 0); })) * 1.08;
    var cw = 110, gap = (W - n * cw) / (n + 1), cols = ["#52c7ff", "#ff8a00"];
    var out = b.cats.map(function (c, i) {
      var x = gap + i * (cw + gap), y = H - PB, s = "";
      c.parts.forEach(function (p, j) {
        var hh = p / tot * (H - PT - PB); y -= hh;
        s += '<rect class="grow" style="--d:' + (i * 0.15 + j * 0.25) + 's" x="' + x + '" y="' + y + '" width="' + cw + '" height="' + hh + '" fill="' + cols[j] + '" fill-opacity=".88"/><text class="fade" style="--d:' + (0.9 + i * 0.15) + 's;fill:#050607;font-weight:600" x="' + (x + cw / 2) + '" y="' + (y + hh / 2 + 4) + '" text-anchor="middle">' + fmt(p) + "</text>";
      });
      return s + '<text x="' + (x + cw / 2) + '" y="' + (H - 10) + '" text-anchor="middle">' + esc(c.label) + "</text>";
    }).join("");
    el.innerHTML = '<div class="io"><svg class="svgc" viewBox="0 0 ' + W + " " + H + '"><line class="ax" x1="0" x2="' + W + '" y1="' + (H - PB) + '" y2="' + (H - PB) + '"/>' + out + '</svg><div class="legend">' + b.legend.map(function (l, i) { return '<span><i style="background:' + cols[i] + '"></i>' + esc(l) + "</span>"; }).join("") + "</div></div>";
  }

  function groupedCols(el, b) {
    var W = 600, H = 280, PT = 24, PB = 34, n = b.groups.length;
    var max = Math.max.apply(null, b.groups.map(function (g) { return Math.max(g.a, g.b); })) * 1.15;
    var gw = (W - 40) / n, bw = 46, cols = ["#56636f", "#ffb224"];
    var out = b.groups.map(function (g, i) {
      var cx = 20 + gw * (i + 0.5), s = "";
      [g.a, g.b].forEach(function (v, j) {
        var hh = v / max * (H - PT - PB), x = cx + (j ? 4 : -bw - 4), y = H - PB - hh;
        s += '<rect class="grow" style="--d:' + (i * 0.12 + j * 0.2) + 's" x="' + x + '" y="' + y + '" width="' + bw + '" height="' + hh + '" rx="3" fill="' + cols[j] + '"/><text class="fade" style="--d:' + (0.8 + i * 0.12) + 's" x="' + (x + bw / 2) + '" y="' + (y - 7) + '" text-anchor="middle" fill="#e9ebed">' + fmt(v, 2) + "%</text>";
      });
      return s + '<text x="' + cx + '" y="' + (H - 10) + '" text-anchor="middle">' + esc(g.label) + "</text>";
    }).join("");
    el.innerHTML = '<div class="io"><svg class="svgc" viewBox="0 0 ' + W + " " + H + '"><line class="ax" x1="0" x2="' + W + '" y1="' + (H - PB) + '" y2="' + (H - PB) + '"/>' + out + '</svg><div class="legend">' + b.legend.map(function (l, i) { return '<span><i style="background:' + cols[i] + '"></i>' + esc(l) + "</span>"; }).join("") + "</div></div>";
  }

  function linePts(el, b) {
    var W = 640, H = 280, PL = 40, PR = 30, PT = 30, PB = 40, n = b.points.length;
    var vals = b.points.map(function (p) { return p.value; });
    var lo = Math.min.apply(null, vals) * 0.85, hi = Math.max.apply(null, vals) * 1.08;
    function X(i) { return PL + i / (n - 1) * (W - PL - PR); }
    function Y(v) { return PT + (1 - (v - lo) / (hi - lo)) * (H - PT - PB); }
    var d = b.points.map(function (p, i) { return (i ? "L" : "M") + X(i) + " " + Y(p.value); }).join(" ");
    var gl = ""; for (var g = 0; g <= 3; g++) { var v = lo + (hi - lo) * g / 3; gl += '<line class="gl" x1="' + PL + '" x2="' + (W - PR) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text x="' + (PL - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end">$' + fmt(v) + "</text>"; }
    var dots = b.points.map(function (p, i) {
      return '<circle class="fade" style="--d:' + (0.3 + i * 0.25) + 's" cx="' + X(i) + '" cy="' + Y(p.value) + '" r="6" fill="#ff8a00" stroke="#050607" stroke-width="2"/><text class="fade" style="--d:' + (0.4 + i * 0.25) + 's" x="' + X(i) + '" y="' + (Y(p.value) - 13) + '" text-anchor="middle" fill="#e9ebed">$' + fmt(p.value) + '</text><text x="' + X(i) + '" y="' + (H - 12) + '" text-anchor="middle">' + esc(p.label) + "</text>";
    }).join("");
    el.innerHTML = '<div class="io"><svg class="svgc" viewBox="0 0 ' + W + " " + H + '">' + gl + '<path class="draw" style="--len:1200" d="' + d + '" fill="none" stroke="#52c7ff" stroke-width="2.5"/>' + dots + "</svg></div>";
  }

  /* ---------------------------------------------------------------- block renderer */
  function renderBlocks(container, blocks, ctx) {
    var toc = [];
    blocks.forEach(function (b, idx) {
      var el;
      switch (b.t) {
        case "h2":
          var id = "s-" + (b.code || "x").toLowerCase() + "-" + idx;
          el = h("h2", { class: "blk-h2 reveal", id: id }, (b.code ? '<span class="c">' + esc(b.code) + " &lt;GO&gt;</span>" : "") + "<span>" + esc(b.text) + "</span>");
          toc.push({ id: id, code: b.code || "", text: b.text });
          break;
        case "h3": el = h("h3", { class: "blk-h3 reveal" }, esc(b.text)); break;
        case "p": el = h("p", { class: "blk-p reveal" }, b.html); break;
        case "quote": el = h("div", { class: "blk-quote reveal" }, b.html); break;
        case "formula": el = h("div", { class: "blk-formula reveal" }, esc(b.text)); break;
        case "disclaimer": el = h("p", { class: "blk-disc" }, "<b>Disclaimer:</b> " + b.html); break;
        case "list":
          el = h("ul", { class: "blk-list reveal" + (b.ordered ? " ol" : "") }, b.items.map(function (i) { return "<li>" + i + "</li>"; }).join(""));
          break;
        case "kpis":
          el = h("div", { class: "reveal" }, (b.title ? '<p class="blk-title">' + esc(b.title) + "</p>" : "") + '<div class="kpis' + (b.small ? " small" : "") + '">' + b.items.map(function (k) {
            return '<div class="kpi ' + (k.tone || "") + '"><div class="k">' + esc(k.label) + '</div><div class="v">' + esc(k.value) + '</div><div class="n">' + esc(k.note || "") + "</div></div>";
          }).join("") + "</div>");
          break;
        case "table":
          var text = b.head.length <= 4 && b.rows.some(function (r) { return r.some(function (c) { return String(c).length > 38; }); });
          el = h("div", { class: "reveal" }, (b.title ? '<p class="blk-title">' + esc(b.title) + "</p>" : "") +
            '<div class="tbl-wrap"><table class="tbl' + (text ? " text" : "") + '"><thead><tr>' + b.head.map(function (x) { return "<th>" + esc(x) + "</th>"; }).join("") + "</tr></thead><tbody>" +
            b.rows.map(function (r, ri) {
              return '<tr class="' + (b.bold && b.bold.indexOf(ri) > -1 ? "b" : "") + '">' + r.map(function (c, ci) {
                var cls = "";
                if (b.tone && ci === r.length - 1) cls = String(c).charAt(0) === "+" ? "up" : String(c).charAt(0) === "−" ? "down" : "";
                return '<td class="' + cls + '">' + esc(c) + "</td>";
              }).join("") + "</tr>";
            }).join("") + "</tbody></table></div>" + (b.note ? '<p class="blk-note">' + esc(b.note) + "</p>" : ""));
          break;
        case "cards":
          el = h("div", { class: "cards reveal", style: "--cols:" + (b.cols || Math.min(3, b.items.length)) }, b.items.map(function (c, i) {
            return '<div class="card">' + (b.num ? '<div class="num">' + String(i + 1).padStart(2, "0") + "</div>" : "") + (c.kicker ? '<div class="kick">' + esc(c.kicker) + "</div>" : "") + "<h4>" + esc(c.title) + "</h4><p>" + esc(c.body) + "</p></div>";
          }).join(""));
          break;
        case "twocol":
          el = h("div", { class: "twocol reveal" + (b.neutral ? " neutral" : "") },
            '<div class="card"><h4>' + esc(b.left.title) + "</h4><ul>" + b.left.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>" +
            '<div class="card r"><h4>' + esc(b.right.title) + "</h4><ul>" + b.right.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>");
          break;
        case "timeline":
          el = h("div", { class: "tl reveal" }, b.items.map(function (i) { return '<div class="tl-item"><div class="w">' + esc(i.when) + "</div><div><h4>" + esc(i.title) + "</h4><p>" + esc(i.body) + "</p></div></div>"; }).join(""));
          break;
        case "model":
          el = h("div", { class: "reveal" }, '<div class="model">' + b.cols.map(function (c) {
            return '<div class="model-col"><h4>' + esc(c.title) + '</h4><div class="s">' + esc(c.sub) + "</div><ul>" + c.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";
          }).join("") + '</div><div class="model-mod"><b>MODERATORS ⟷</b>' + b.moderators.map(function (m) { return '<span class="chip">' + esc(m) + "</span>"; }).join("") + "</div>" + (b.note ? '<p class="blk-note">' + esc(b.note) + "</p>" : ""));
          break;
        case "sources":
          el = h("div", { class: "blk-src" }, "<h4>Sources</h4><ol>" + b.items.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>");
          break;
        case "pdf":
          var pdf = ctx.pdf;
          el = h("div", { class: "reveal", id: "s-pdf" }, '<h2 class="blk-h2"><span class="c">PDF &lt;GO&gt;</span><span>Full document</span></h2>' +
            '<div class="pdf-block"><div class="pdf-head"><b>' + esc(pdf.label) + '</b><div class="acts"><a class="btn btn-sm" href="' + pdf.href + '" target="_blank" rel="noopener">' + ICON.arrowUR + 'Open</a><a class="btn btn-sm btn-primary" href="' + pdf.href + '" download>' + ICON.down + "Download</a></div></div>" +
            '<iframe class="pdf-frame" loading="lazy" title="' + esc(pdf.label) + '" src="' + pdf.href + '#view=FitH"></iframe></div>');
          toc.push({ id: "s-pdf", code: "PDF", text: "Full document" });
          break;
        default:
          // chart blocks share a panel frame
          el = h("div", { class: "panel reveal" }, (b.title ? '<p class="blk-title">' + esc(b.title) + "</p>" : "") + (b.sub ? '<p class="blk-sub">' + esc(b.sub) + "</p>" : "") + '<div class="chart"></div>' + (b.note ? '<p class="blk-note">' + esc(b.note) + "</p>" : ""));
          var c = el.querySelector(".chart");
          if (b.t === "bars3d") bars3d(c, b);
          else if (b.t === "signed") signedBars(c, b);
          else if (b.t === "football") football(c, b);
          else if (b.t === "scenarios") { el.className = "reveal"; scenarios(c, b); }
          else if (b.t === "grid") { el.className = "reveal"; el.querySelector(".blk-title").style.marginBottom = "12px"; sensGrid(c, b); }
          else if (b.t === "hbars") hbars(c, b);
          else if (b.t === "mix") mix(c, b);
          else if (b.t === "stacked") stackedCols(c, b);
          else if (b.t === "grouped") groupedCols(c, b);
          else if (b.t === "linepts") linePts(c, b);
      }
      if (el) container.appendChild(el);
    });
    return toc;
  }

  function buildToc(nav, toc) {
    nav.innerHTML = toc.map(function (t) { return '<a href="#' + t.id + '"><span class="c">' + esc(t.code || "§") + "</span>" + esc(t.text) + "</a>"; }).join("");
    var links = nav.querySelectorAll("a");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    toc.forEach(function (t) { var s = document.getElementById(t.id); if (s) io.observe(s); });
  }

  function getParam(name) {
    try { return new URLSearchParams(window.location.search).get(name); } catch (e) { return null; }
  }

  window.UI = {
    esc: esc, fmt: fmt, h: h, ICON: ICON, REDUCED: REDUCED, seriesStats: seriesStats, signCls: signCls, signTxt: signTxt, isIndex: isIndex,
    renderChrome: renderChrome, observe: observe, interactions: interactions, toast: toast, copyText: copyText, countUp: countUp,
    priceChart: priceChart, bars3d: bars3d, renderBlocks: renderBlocks, buildToc: buildToc, getParam: getParam, splitWords: splitWords
  };
})();
