/* Home page: renders every section from SITE data and wires the 3D + scroll motion. */
(function () {
  "use strict";
  var SITE = window.SITE, MARKET = window.MARKET, UI = window.UI, Scenes = window.Scenes;
  var esc = UI.esc, fmt = UI.fmt, P = SITE.profile, REDUCED = UI.REDUCED;
  var $ = function (id) { return document.getElementById(id); };

  UI.renderChrome("home");

  /* ---------------------------------------------------------------- boot */
  (function boot() {
    var el = $("boot"), seen = false;
    try { seen = sessionStorage.getItem("ps_boot") === "1"; sessionStorage.setItem("ps_boot", "1"); } catch (e) {}
    if (REDUCED || seen) { el.classList.add("done"); return; }
    var lines = [
      "<b>&gt;</b> connect market_data <span class='ok'>[INDmoney · " + esc(MARKET.asOf) + "]</span>",
      "<b>&gt;</b> load coverage <span class='ok'>BHARTIARTL SUNPHARMA WAAREEENER SEIL</span>",
      "<b>&gt;</b> build 3d_candles <span class='ok'>265 instances … ok</span>",
      "<b>&gt;</b> welcome, analyst."
    ];
    $("bootLines").innerHTML = lines.map(function (l, i) { return '<div class="boot-line" style="animation-delay:' + (i * 0.22) + 's">' + l + "</div>"; }).join("") + '<div class="boot-bar"><i></i></div>';
    setTimeout(function () { el.classList.add("done"); }, 1450);
  })();

  /* ---------------------------------------------------------------- hero */
  $("heroSub").textContent = P.subline;
  $("cvBtn").href = P.cv;

  // rotating focus word
  (function focus() {
    var el = $("focusWord"), i = 0, words = P.focus;
    if (REDUCED) return;
    setInterval(function () {
      i = (i + 1) % words.length;
      var w = words[i], k = 0;
      el.textContent = "";
      var t = setInterval(function () { el.textContent = w.slice(0, ++k); if (k >= w.length) clearInterval(t); }, 38);
    }, 2600);
  })();

  // stats
  $("stats").innerHTML = P.stats.map(function (s) {
    return '<div class="stat io"><div class="stat-v"><span data-count="' + s.value + '" data-dec="' + (s.decimals || 0) + '" data-final="' + fmt(s.value, s.decimals || 0) + '">0</span><span class="suf">' + esc(s.suffix) + '</span></div><div class="stat-l">' + esc(s.label) + '</div><div class="stat-n">' + esc(s.note) + "</div></div>";
  }).join("");

  // 3D candle city (hovering a candle lights up its row)
  var ORDER = ["NIFTY", "BHARTIARTL", "SUNPHARMA", "WAAREEENER", "SCHNEIDER"];
  var hero = $("home");
  var city = Scenes.CandleCity($("heroCanvas"), {
    series: ORDER.map(function (k) { return { key: k, label: MARKET.series[k].label, ohlc: MARKET.series[k].ohlc }; }),
    tooltip: $("tip"), hoverTarget: hero, firstWeek: MARKET.firstWeek,
    hoverFilter: function (e) { return !(e.target.closest && e.target.closest(".hero-copy, .hero-stats, .nav, .ticker")); },
    onHoverRow: function (i) { city && city.highlight(i); }
  });

  /* ---------------------------------------------------------------- marquee */
  var mq1 = ["Fund reporting", "NAV validation", "DCF valuation", "3-statement models", "US GAAP · ASC 820", "IFRS", "Equity research", "Reconciliations", "CFA Level II"];
  var mq2 = ["Bharti Airtel", "Sun Pharma", "Waaree Energies", "Schneider Electric Infra", "Gen Z finance", "US Treasuries", "Nifty 2036", "India’s urea paradox"];
  function mqHTML(arr, hl) { var s = arr.map(function (w, i) { return '<span class="' + (i % hl === 0 ? "hl" : "") + '">' + esc(w) + "</span>"; }).join(""); return s + s; }
  $("mq1").innerHTML = mqHTML(mq1, 3);
  $("mq2").innerHTML = mqHTML(mq2, 2);

  /* ---------------------------------------------------------------- about */
  $("aboutText").innerHTML = P.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  $("glance").innerHTML = P.glance.map(function (g) { return "<div><dt>" + esc(g[0]) + "</dt><dd>" + esc(g[1]) + "</dd></div>"; }).join("");
  (function idGraph() {
    var c = MARKET.series.NIFTY.ohlc.map(function (x) { return x[3]; });
    var lo = Math.min.apply(null, c), hi = Math.max.apply(null, c);
    var d = c.map(function (v, i) { return (i ? "L" : "M") + (i / (c.length - 1) * 300).toFixed(1) + " " + (90 - (v - lo) / (hi - lo) * 80).toFixed(1); }).join(" ");
    $("idGraph").innerHTML = '<defs><linearGradient id="idg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ffb224" stop-opacity=".35"/><stop offset="1" stop-color="#ffb224" stop-opacity="0"/></linearGradient></defs><path d="' + d + ' L300 100 L0 100Z" fill="url(#idg)"/><path d="' + d + '" fill="none" stroke="#ffb224" stroke-width="1.5" vector-effect="non-scaling-stroke"/>';
  })();

  /* ---------------------------------------------------------------- experience */
  var tl = $("timeline");
  SITE.experience.forEach(function (j) {
    var el = UI.h("article", { class: "job reveal" },
      '<span class="job-dot"></span>' +
      '<div class="job-head"><h3 class="job-org">' + esc(j.org) + ' <span>— ' + esc(j.role) + '</span></h3><div class="job-meta">' + esc(j.where) + " · " + esc(j.period) + "</div></div>" +
      (j.chips.length ? '<div class="job-chips">' + j.chips.map(function (c) { return '<div class="chip-metric"><b>' + esc(c[0]) + "</b><span>" + esc(c[1]) + "</span></div>"; }).join("") + "</div>" : "") +
      '<div class="job-groups' + (j.groups.length === 1 ? " one" : "") + '">' + j.groups.map(function (g) {
        return '<div class="job-group card">' + (g.title ? "<h4>" + esc(g.title) + "</h4>" : "") + "<ul>" + g.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul></div>";
      }).join("") + "</div>");
    tl.appendChild(el);
  });

  /* ---------------------------------------------------------------- coverage */
  var equities = SITE.research.filter(function (r) { return r.kind === "equity"; });
  var covMode = "upside";
  function covData() {
    return equities.map(function (r) {
      var s = UI.seriesStats(r.series);
      return { r: r, label: MARKET.series[r.series].label === "SCHNEIDER" ? "SEIL" : MARKET.series[r.series].label, up: (r.target - r.cmp) / r.cmp * 100, yr: s.yr };
    });
  }
  function renderCoverage() {
    var data = covData();
    $("covList").innerHTML = data.map(function (d, i) {
      var v = covMode === "upside" ? d.up : d.yr;
      return '<a class="cov-row" href="research.html?id=' + d.r.id + '" data-i="' + i + '"><span class="nm">' + esc(d.r.company) + '</span><span class="rating ' + d.r.rating + '">' + d.r.rating + '</span><span class="tp">' + (covMode === "upside" ? esc(d.r.targetLabel) + " ₹" + fmt(d.r.target) : "₹" + fmt(UI.seriesStats(d.r.series).last)) + '</span><span class="' + UI.signCls(v) + '">' + UI.signTxt(v, 1) + "</span></a>";
    }).join("");
    var wrap = UI.bars3d($("covChart"), {
      labels: data.map(function (d) { return d.label; }),
      values: data.map(function (d) { return covMode === "upside" ? d.up : d.yr; }),
      fmt: "pctSigned", signed: true, height: 320
    });
    UI.observe($("covChart"));
    var cols = wrap.querySelectorAll(".b3d-col");
    $("covList").querySelectorAll(".cov-row").forEach(function (row) {
      row.addEventListener("pointerenter", function () { cols.forEach(function (c, j) { c.style.opacity = j === +row.dataset.i ? 1 : 0.25; }); });
      row.addEventListener("pointerleave", function () { cols.forEach(function (c) { c.style.opacity = ""; }); });
    });
    cols.forEach(function (c) { c.style.transition = "opacity .3s"; });
  }
  renderCoverage();
  [["covA", "upside"], ["covB", "yr"]].forEach(function (b) {
    $(b[0]).addEventListener("click", function () {
      covMode = b[1];
      $("covA").classList.toggle("btn-primary", covMode === "upside"); $("covA").setAttribute("aria-selected", covMode === "upside");
      $("covB").classList.toggle("btn-primary", covMode === "yr"); $("covB").setAttribute("aria-selected", covMode === "yr");
      $("covLead").textContent = covMode === "upside"
        ? "Upside or downside to my target at publication. Hover a stock to light up its bar, or switch to trailing one-year price returns."
        : "Trailing one-year price return to " + MARKET.asOf + " (weekly closes, INDmoney). Hover a stock to light up its bar.";
      renderCoverage();
    });
  });

  /* ---------------------------------------------------------------- research stack */
  var stack = $("stack");
  SITE.research.forEach(function (r, i) {
    var href = "research.html?id=" + r.id;
    var metrics, viz;
    if (r.kind === "equity") {
      metrics = [["Rating", '<span class="rating ' + r.rating + '">' + r.rating + "</span>"], [r.targetLabel, "₹" + fmt(r.target)], ["CMP", "₹" + fmt(r.cmp)], [r.moveLabel, '<span class="' + (r.move.charAt(0) === "+" ? "up" : "down") + '">' + esc(r.move) + "</span>"]];
      var s = MARKET.series[r.series], st = UI.seriesStats(r.series);
      var hi52 = Math.max.apply(null, s.ohlc.map(function (c) { return c[1]; })), lo52 = Math.min.apply(null, s.ohlc.map(function (c) { return c[2]; }));
      viz = '<div class="viz-head"><span>WEEKLY CLOSE · 12M · ' + esc(s.label) + '</span><b data-q="' + r.series + '"><span class="px">₹' + fmt(st.last) + '</span> <span class="chg ' + UI.signCls(st.chg) + '">1W ' + UI.signTxt(st.chg) + "</span></b></div>" +
        '<div class="pchart" data-series="' + r.series + '"></div>' +
        '<div class="viz-foot"><div><div class="k">1Y return</div><div class="v ' + UI.signCls(st.yr) + '">' + UI.signTxt(st.yr, 1) + '</div></div><div><div class="k">52W high</div><div class="v">₹' + fmt(hi52) + '</div></div><div><div class="k">52W low</div><div class="v">₹' + fmt(lo52) + "</div></div></div>";
    } else {
      metrics = r.metrics.map(function (m) { return [m[0], m[1]]; }).concat([["Method", "Conceptual"]]);
      viz = '<div class="viz-head"><span>INTEGRATIVE MODEL · 15 CONSTRUCTS</span><b>P1–P6</b></div><div class="netviz" id="netviz"></div>';
    }
    var card = UI.h("article", { class: "rcard", style: "--i:" + i },
      '<div class="rcard-main">' +
      '<div class="rcard-top"><span class="no">' + String(i + 1).padStart(2, "0") + "</span><span>" + esc(r.kicker) + "</span></div>" +
      "<h3>" + esc(r.company) + "</h3>" +
      '<div class="rcard-sub">' + esc(r.headline) + "</div>" +
      '<div class="rcard-metrics">' + metrics.map(function (m) { return '<div><div class="k">' + esc(m[0]) + '</div><div class="v">' + m[1] + "</div></div>"; }).join("") + "</div>" +
      '<dl class="qa"><div><dt>The question</dt><dd>' + esc(r.card.question) + "</dd></div><div><dt>The work</dt><dd>" + esc(r.card.work) + '</dd></div><div class="call"><dt>The call</dt><dd>' + esc(r.card.call) + "</dd></div></dl>" +
      '<div class="rcard-actions"><a class="btn btn-primary" href="' + href + '">Read full analysis ' + UI.ICON.arrow + '</a><a class="btn" href="' + r.pdf.href + '" target="_blank" rel="noopener">' + UI.ICON.pdf + 'PDF</a><span class="date">Published ' + esc(r.date) + "</span></div>" +
      "</div>" +
      '<div class="rcard-viz">' + viz + "</div>");
    stack.appendChild(card);
    var pc = card.querySelector(".pchart");
    if (pc) UI.priceChart(pc, { ohlc: MARKET.series[r.series].ohlc, tp: r.target, tpLabel: r.targetLabel === "Fair value" ? "FV" : "TP", aria: r.company + " weekly close with target price" });
  });

  // Gen Z conceptual network
  (function netviz() {
    var host = $("netviz"); if (!host) return;
    var g = SITE.research.filter(function (r) { return r.id === "genz"; })[0].blocks.filter(function (b) { return b.t === "model"; })[0];
    var W = 420, H = 330, cols = g.cols, nodes = [];
    var xs = [70, 210, 350];
    cols.forEach(function (c, ci) {
      c.items.forEach(function (it, k) {
        var y = 30 + (k + 0.5) * ((H - 90) / c.items.length);
        nodes.push({ c: ci, x: xs[ci], y: y, label: it.replace(/ of Digital Tools| Investment Behaviour| Background| Consciousness| Intensity/g, "") });
      });
    });
    var edges = "";
    nodes.forEach(function (a) {
      nodes.forEach(function (b) {
        if (b.c === a.c + 1) edges += '<path class="edge" d="M' + a.x + " " + a.y + " C" + (a.x + 70) + " " + a.y + " " + (b.x - 70) + " " + b.y + " " + b.x + " " + b.y + '"/>';
      });
    });
    var nd = nodes.map(function (n) {
      var col = ["#52c7ff", "#ffb224", "#2bd47d"][n.c];
      return '<g><circle cx="' + n.x + '" cy="' + n.y + '" r="5.5" fill="' + col + '" style="filter:drop-shadow(0 0 6px ' + col + ')"/><text x="' + n.x + '" y="' + (n.y - 10) + '" text-anchor="middle">' + esc(n.label) + "</text></g>";
    }).join("");
    var mods = g.moderators.map(function (m, i) { return '<text x="' + (W / 2) + '" y="' + (H - 44 + i * 15) + '" text-anchor="middle" style="fill:#ff7ab6">◇ ' + esc(m) + "</text>"; }).join("");
    host.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Conceptual model: antecedents to mediators to outcomes">' + edges + nd + '<line x1="40" x2="' + (W - 40) + '" y1="' + (H - 64) + '" y2="' + (H - 64) + '" stroke="#ff7ab6" stroke-dasharray="3 5" stroke-opacity=".5"/>' + mods + "</svg>";
    if (REDUCED) return;
    var paths = host.querySelectorAll(".edge");
    setInterval(function () {
      paths.forEach(function (p) { p.classList.remove("lit"); });
      var pick = Math.floor(Math.random() * paths.length);
      for (var k = 0; k < 4; k++) paths[(pick + k * 7) % paths.length].classList.add("lit");
    }, 900);
  })();

  /* ---------------------------------------------------------------- blog */
  var grid = $("blogGrid");
  SITE.posts.forEach(function (p, i) {
    var href = "post.html?id=" + p.id;
    var feature = i === 0;
    var stats = '<div class="post-stats">' + p.stats.map(function (s) { return '<div><div class="k">' + esc(s[0]) + '</div><div class="v">' + esc(s[1]) + "</div></div>"; }).join("") + "</div>";
    var body = '<div class="post-topic">' + (feature ? '<span class="new">NEW</span>' : "") + esc(p.topic) + "</div>" +
      '<h3><a href="' + href + '">' + esc(p.title) + "</a></h3>" +
      '<div class="post-meta">' + esc(p.date) + " · " + esc(p.read) + "</div>" +
      "<p>" + esc(p.dek) + "</p>" + stats +
      '<div class="post-actions"><a class="btn btn-sm btn-primary" href="' + href + '">Read article ' + UI.ICON.arrow + '</a><a class="btn btn-sm" href="' + p.pdf + '" target="_blank" rel="noopener">' + UI.ICON.pdf + "PDF</a></div>";
    var card = UI.h("article", { class: "card post-card reveal" + (feature ? " feature" : ""), style: "transition-delay:" + (i % 2) * 0.08 + "s" }, feature ? "<div style='display:flex;flex-direction:column'>" + body + "</div><div class='feature-viz' id='featViz'></div>" : body);
    grid.appendChild(card);
    if (feature) {
      var chartBlock = p.blocks.filter(function (b) { return b.t === "linepts" || b.t === "stacked"; })[0];
      if (chartBlock) UI.renderBlocks($("featViz"), [chartBlock], {});
    }
  });

  /* ---------------------------------------------------------------- projects / skills / creds */
  $("projGrid").innerHTML = SITE.projects.map(function (p, i) {
    var tag = p.href ? "a" : "div";
    return "<" + tag + ' class="card proj-card reveal" style="transition-delay:' + i * 0.08 + 's"' + (p.href ? ' href="' + p.href + '"' : "") + '><div class="tag">' + esc(p.tag) + "</div><h3>" + esc(p.title) + "</h3><p>" + esc(p.body) + "</p>" + (p.href ? '<span class="arrow">' + UI.ICON.arrowUR.replace("<svg", '<svg width="18" height="18"') + "</span>" : "") + "</" + tag + ">";
  }).join("");

  $("skillsGrid").innerHTML = SITE.skills.map(function (g, i) {
    return '<div class="card skill-card reveal" style="transition-delay:' + (i % 2) * 0.08 + 's"><h3><span class="code">' + esc(g.code) + "</span>" + esc(g.title) + '</h3><div class="chips">' + g.items.map(function (s) {
      return s[1] ? '<a class="chip" href="' + s[1] + '">' + esc(s[0]) + "</a>" : '<span class="chip">' + esc(s[0]) + "</span>";
    }).join("") + "</div></div>";
  }).join("");

  $("eduList").innerHTML = SITE.education.map(function (e) {
    return '<div class="edu"><div class="edu-badge">' + esc(e.badge) + "</div><div><h3>" + esc(e.title) + '</h3><div class="org">' + esc(e.org) + '</div><div class="det">' + esc(e.detail) + "</div></div></div>";
  }).join("");
  $("certList").innerHTML = SITE.certs.map(function (c) { return "<li><b>" + esc(c[0]) + "</b><span>" + esc(c[1]) + "</span></li>"; }).join("");

  /* ---------------------------------------------------------------- contact */
  $("contactRows").innerHTML =
    '<div class="crow"><span class="k">EMAIL</span><a class="v" href="mailto:' + P.email + '">' + esc(P.email) + '</a><button class="btn btn-sm" id="copyEmail" type="button">' + UI.ICON.copy + "Copy</button></div>" +
    '<div class="crow"><span class="k">LINKEDIN</span><a class="v" href="' + P.linkedin + '" target="_blank" rel="noopener">' + esc(P.linkedinLabel) + '</a><a class="btn btn-sm" href="' + P.linkedin + '" target="_blank" rel="noopener" aria-label="Open LinkedIn">' + UI.ICON.li + "</a></div>" +
    '<div class="crow"><span class="k">LOCATION</span><span class="v">' + esc(P.location) + "</span><span></span></div>";
  $("copyEmail").addEventListener("click", function () { UI.copyText(P.email); });
  $("mailForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var n = $("fName").value.trim(), em = $("fEmail").value.trim(), m = $("fMsg").value.trim();
    if (!n || !em || !m) { UI.toast("Please fill in all three fields"); return; }
    var subject = "Portfolio enquiry from " + n;
    var body = m + "\n\n— " + n + " (" + em + ")";
    window.location.href = "mailto:" + P.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
  Scenes.Surface($("surfaceCanvas"), { color: 0xffb224 });

  /* ---------------------------------------------------------------- motion */
  UI.observe(document);
  UI.interactions();
  // The stats strip is part of the hero, so count up right after the intro rather than on scroll.
  setTimeout(function () {
    document.querySelectorAll("#stats .stat").forEach(function (s) { s.classList.add("in"); });
    document.querySelectorAll("#stats [data-count]").forEach(function (e) {
      if (REDUCED) e.textContent = e.dataset.final; else UI.countUp(e);
    });
  }, REDUCED ? 0 : 1500);

  // Hero title entrance
  var titleSpans = document.querySelectorAll(".hero h1 .line > span");
  if (window.gsap && !REDUCED) {
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    gsap.from(titleSpans, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.09, delay: 0.25 });

    // hero: camera dolly + copy parallax while scrolling out
    gsap.to({}, { scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true, onUpdate: function (st) { if (city) city.setScroll(st.progress); } } });
    gsap.to(".hero-copy", { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });

    // timeline rail draws with scroll
    gsap.to("#rail", { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#timeline", start: "top 70%", end: "bottom 60%", scrub: true } });

    // stacked research cards recede as the next one arrives
    var cards = gsap.utils.toArray(".rcard");
    if (window.matchMedia("(min-width: 1081px)").matches) {
      cards.forEach(function (c, i) {
        if (i === cards.length - 1) return;
        gsap.to(c, { scale: 0.94, filter: "brightness(.55)", ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top 92%", end: "top 25%", scrub: true } });
      });
    }
    // marquee rows drift with scroll for extra parallax
    gsap.to("#mq1", { xPercent: -6, ease: "none", scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to("#mq2", { xPercent: 6, ease: "none", scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: true } });
  } else {
    var rail = $("rail"); rail.style.transform = "scaleY(1)";
    window.addEventListener("scroll", function () {
      var r = hero.getBoundingClientRect();
      if (city) city.setScroll(Math.min(1, Math.max(0, -r.top / r.height)));
    }, { passive: true });
  }
})();
