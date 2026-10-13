/* Research report and blog post pages: one template, driven by SITE data. */
(function () {
  "use strict";
  var SITE = window.SITE, MARKET = window.MARKET, UI = window.UI, Scenes = window.Scenes;
  var esc = UI.esc, fmt = UI.fmt;
  var isPost = document.body.getAttribute("data-kind") === "post";
  var list = isPost ? SITE.posts : SITE.research;

  UI.renderChrome("detail");

  var id = UI.getParam("id");
  if (!id) {
    var m = window.location.pathname.match(isPost ? /blog\/([^/.]+)/ : /research\/([^/.]+)/);
    id = m && m[1];
  }
  var idx = -1;
  list.forEach(function (x, i) { if (x.id === id) idx = i; });
  var page = document.getElementById("page");

  if (idx < 0) {
    page.innerHTML = '<section class="nf"><div><h1>404</h1><p>&gt; ' + (isPost ? "article" : "report") + ' not found</p><a class="btn btn-primary" href="index.html#' + (isPost ? "blog" : "research") + '">' + UI.ICON.back + " Back to " + (isPost ? "articles" : "research") + "</a></div></section>";
    return;
  }
  var r = list[idx];
  document.title = (isPost ? r.title : r.title) + " | Pratik Sahoo";
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", isPost ? r.dek : (r.headline + " — " + r.title));

  /* ---------------------------------------------------------------- hero */
  var strip = "", hud = "";
  if (isPost) {
    strip = r.stats.map(function (s) { return '<div><div class="k">' + esc(s[0]) + '</div><div class="v">' + esc(s[1]) + '</div><div class="k" style="text-transform:none;letter-spacing:0;font-size:11px;margin-top:2px">' + esc(s[2]) + "</div></div>"; }).join("");
  } else if (r.kind === "equity") {
    strip = '<div><div class="k">Rating</div><div class="v"><span class="rating ' + r.rating + '">' + r.rating + "</span></div></div>" +
      '<div><div class="k">' + esc(r.targetLabel) + '</div><div class="v">₹' + fmt(r.target) + "</div></div>" +
      '<div><div class="k">' + esc(r.cmpLabel) + '</div><div class="v">₹' + fmt(r.cmp) + "</div></div>" +
      '<div><div class="k">' + esc(r.moveLabel) + '</div><div class="v ' + (r.move.charAt(0) === "+" ? "up" : "down") + '">' + esc(r.move) + "</div></div>" +
      r.extra.map(function (e) { return '<div><div class="k">' + esc(e[0]) + '</div><div class="v" style="font-size:18px">' + esc(e[1]) + "</div></div>"; }).join("");
    var st = UI.seriesStats(r.series);
    hud = "3D · 52 WEEKLY CANDLES · <b>" + esc(MARKET.series[r.series].label) + "</b><br>" + esc(r.targetLabel.toUpperCase()) + " PLANE ₹" + fmt(r.target) + " · LAST ₹" + fmt(st.last) + " (" + esc(MARKET.asOf) + ")<br>MOVE THE MOUSE TO TILT · HOVER A CANDLE";
  } else {
    strip = r.metrics.map(function (m) { return '<div><div class="k">' + esc(m[0]) + '</div><div class="v">' + esc(m[1]) + "</div></div>"; }).join("");
  }

  var crumbs = isPost ? '<a class="back" href="index.html#blog">' + UI.ICON.back.replace("<svg", '<svg width="14" height="14"') + "All articles</a>" : '<a class="back" href="index.html#research">' + UI.ICON.back.replace("<svg", '<svg width="14" height="14"') + "All research</a>";
  var meta = isPost
    ? "By Pratik Priyaranjan Sahoo, CFA Level II Candidate · " + esc(r.date) + " · " + esc(r.read)
    : (r.kind === "equity" ? esc(r.title) + " · Published " + esc(r.date) + " · Analyst: Pratik Priyaranjan Sahoo" : esc(r.subtitle));
  var tags = isPost ? r.tags : (r.keywords || []);

  page.innerHTML =
    '<section class="d-hero" id="dHero"><canvas class="d-canvas" id="dCanvas" aria-hidden="true"></canvas><div class="wrap">' +
    '<div class="disclaimer-bar">Independent, illustrative research for educational purposes — not investment advice and not issued by a SEBI-registered entity.</div><br>' +
    crumbs +
    '<div class="d-kicker">' + esc(isPost ? r.topic : r.kicker) + "</div>" +
    '<h1 class="d-title io" data-split>' + esc(isPost ? r.title : r.headline) + "</h1>" +
    (isPost ? '<p class="d-sub">' + esc(r.dek) + "</p>" : '<p class="d-sub">' + esc(r.company) + (r.kind === "equity" ? " · " + esc(r.subtitle) : "") + "</p>") +
    '<p class="d-meta">' + meta + "</p>" +
    (tags.length ? '<div class="d-tags">' + tags.map(function (t) { return '<span class="pill">' + esc(t) + "</span>"; }).join("") + "</div>" : "") +
    '<div class="d-strip">' + strip + "</div>" +
    "</div>" + (hud ? '<div class="d-hud">' + hud + "</div>" : "") + "</section>" +
    '<div class="wrap d-layout"><nav class="d-toc" id="toc" aria-label="On this page"></nav><article class="d-body" id="body"></article></div>';

  /* ---------------------------------------------------------------- body */
  var body = document.getElementById("body");
  var toc = UI.renderBlocks(body, r.blocks, { pdf: isPost ? null : r.pdf });

  if (isPost) {
    body.appendChild(UI.h("div", { class: "reveal", style: "margin-top:34px" }, '<a class="btn btn-primary" href="' + r.pdf + '" target="_blank" rel="noopener">' + UI.ICON.down + "Download as PDF</a>"));
  }
  var next = list[(idx + 1) % list.length];
  if (next && next !== r) {
    body.appendChild(UI.h("a", { class: "next-post reveal", href: (isPost ? "post.html?id=" : "research.html?id=") + next.id },
      '<div class="k">' + (isPost ? "NEXT ARTICLE" : "NEXT REPORT") + ' →</div><div class="t">' + esc(isPost ? next.title : next.company + " — " + next.headline) + "</div>"));
  }
  UI.buildToc(document.getElementById("toc"), toc.length ? toc : []);

  /* ---------------------------------------------------------------- 3D hero */
  var canvas = document.getElementById("dCanvas"), hero = document.getElementById("dHero");
  var seriesKey = isPost ? r.series : (r.kind === "equity" ? r.series : null);
  if (seriesKey) {
    var s = MARKET.series[seriesKey];
    Scenes.CandleCity(canvas, {
      mode: "single",
      series: [{ key: seriesKey, label: s.label, ohlc: s.ohlc }],
      tp: isPost ? null : r.target,
      tpLabel: isPost ? null : (r.targetLabel === "Fair value" ? "FV " : "TP ") + "₹" + fmt(r.target),
      tpColor: isPost ? null : (r.target >= UI.seriesStats(seriesKey).last ? "#2bd47d" : "#ff5a5f"),
      lastLabel: "LAST " + fmt(UI.seriesStats(seriesKey).last),
      tooltip: document.getElementById("tip"), hoverTarget: hero, firstWeek: MARKET.firstWeek,
      hoverFilter: function (e) { return !(e.target.closest && e.target.closest(".d-strip, .d-title, .back, .disclaimer-bar, .d-sub, .d-tags, .nav, .ticker")); }
    });
  } else {
    Scenes.Surface(canvas, { color: isPost ? (idx % 2 ? 0x52c7ff : 0xffb224) : 0x9b8cff });
  }

  UI.observe(document);
  UI.interactions();
})();
