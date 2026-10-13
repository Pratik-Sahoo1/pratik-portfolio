/* 3D scenes built with Three.js (r128, global THREE).
   - CandleCity: real weekly OHLC candles as glowing 3D towers, one row per instrument.
   - Surface: an animated wireframe "volatility surface". */
(function () {
  "use strict";
  var THREE = window.THREE;
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hasWebGL() {
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  }

  function makeRenderer(canvas) {
    var r = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    r.setClearColor(0x000000, 0);
    return r;
  }

  /* Run `frame` every animation frame, but only while the canvas is on screen. */
  function loopWhenVisible(canvas, frame) {
    var visible = true, running = false;
    var io = new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible && !running) start();
    }, { rootMargin: "120px" });
    io.observe(canvas);
    function tick(t) {
      if (!visible || document.hidden) { running = false; return; }
      frame(t);
      requestAnimationFrame(tick);
    }
    function start() { running = true; requestAnimationFrame(tick); }
    document.addEventListener("visibilitychange", function () { if (!document.hidden && visible && !running) start(); });
    start();
  }

  function fitRenderer(renderer, camera, canvas) {
    var w = canvas.clientWidth || canvas.parentNode.clientWidth;
    var h = canvas.clientHeight || canvas.parentNode.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  /* Material whose emissive glow follows each instance's colour. */
  function glowMaterial(opts) {
    var o = Object.assign({}, opts || {});
    var glow = { value: o.glow || 0.42 };
    delete o.glow;
    var m = new THREE.MeshStandardMaterial(Object.assign({ color: 0xffffff, roughness: 0.38, metalness: 0.2 }, o));
    m.onBeforeCompile = function (shader) {
      shader.uniforms.uGlow = glow;
      shader.fragmentShader = "uniform float uGlow;\n" + shader.fragmentShader.replace(
        "#include <emissivemap_fragment>",
        "#include <emissivemap_fragment>\n#if defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n totalEmissiveRadiance += vColor * uGlow;\n#endif"
      );
    };
    m.userData.glow = glow;
    return m;
  }

  function textSprite(text, color, opts) {
    opts = opts || {};
    var size = opts.size || 44;
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    var font = (opts.weight || 600) + " " + size + "px 'JetBrains Mono', ui-monospace, monospace";
    ctx.font = font;
    var w = Math.ceil(ctx.measureText(text).width) + 24;
    c.width = w; c.height = size + 20;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.shadowColor = color; ctx.shadowBlur = 12;
    ctx.fillText(text, 12, c.height / 2);
    var tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    var mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: opts.opacity == null ? 0.95 : opts.opacity });
    var s = new THREE.Sprite(mat);
    var scale = opts.scale || 0.012;
    s.scale.set(c.width * scale, c.height * scale, 1);
    s.center.set(opts.anchorRight ? 1 : 0, 0.5);
    return s;
  }

  var UP = new THREE.Color(0x2bd47d), DOWN = new THREE.Color(0xff5a5f);
  var ROW_COLORS = { NIFTY: "#ffb224", BHARTIARTL: "#52c7ff", SUNPHARMA: "#9b8cff", WAAREEENER: "#5fe3c0", SCHNEIDER: "#ff7ab6" };

  function easeOut(x) { return 1 - Math.pow(1 - x, 3); }

  /* ------------------------------------------------------------------ CandleCity */
  function CandleCity(canvas, options) {
    if (!THREE || !hasWebGL()) return null;
    options = options || {};
    var single = options.mode === "single";
    var series = options.series; // [{key, label, ohlc}]
    var R = series.length;
    var N = series[0].ohlc.length;
    var SX = single ? 0.5 : 0.46;        // spacing along time
    var ROW = 2.05;                       // spacing between rows
    var H = single ? 6.2 : 4.6;           // max candle-field height
    var BW = single ? 0.32 : 0.28;        // body width
    var X0 = -((N - 1) * SX) / 2;

    var renderer = makeRenderer(canvas);
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050607, single ? 0.034 : 0.04);
    var camera = new THREE.PerspectiveCamera(single ? 38 : 40, 1, 0.1, 200);

    scene.add(new THREE.HemisphereLight(0xfff1d6, 0x0a0c10, 0.9));
    var key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(-6, 14, 10); scene.add(key);
    var rim = new THREE.DirectionalLight(0xffb224, 0.55); rim.position.set(10, 6, -12); scene.add(rim);

    // Normalise each row into [0.15, H]
    var rows = series.map(function (s, ri) {
      var lo = Infinity, hi = -Infinity;
      s.ohlc.forEach(function (c) { lo = Math.min(lo, c[2]); hi = Math.max(hi, c[1]); });
      if (single && options.tp) { lo = Math.min(lo, options.tp); hi = Math.max(hi, options.tp); }
      var pad = (hi - lo) * 0.06; lo -= pad; hi += pad;
      var z = single ? 0 : (ri - (R - 1) / 2) * ROW;
      return { key: s.key, label: s.label || s.key, ohlc: s.ohlc, lo: lo, hi: hi, z: z, y: function (v) { return 0.15 + ((v - lo) / (hi - lo)) * H; } };
    });

    var total = R * N;
    var box = new THREE.BoxGeometry(1, 1, 1);
    var bodyMat = glowMaterial({ glow: 0.45 });
    var wickMat = glowMaterial({ glow: 0.6, roughness: 0.6 });
    var bodies = new THREE.InstancedMesh(box, bodyMat, total);
    var wicks = new THREE.InstancedMesh(box, wickMat, total);
    bodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    wicks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(bodies, wicks);

    // Mirror copy for a glossy floor reflection
    var refl = new THREE.Group(); refl.scale.y = -1; scene.add(refl);
    var reflMatB = glowMaterial({ glow: 0.35, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide });
    var reflB = new THREE.InstancedMesh(box, reflMatB, total);
    var reflW = new THREE.InstancedMesh(box, reflMatB, total);
    refl.add(reflB, reflW);
    // Instances span the whole field, so the default origin-based culling would hide them.
    [bodies, wicks, reflB, reflW].forEach(function (m) { m.frustumCulled = false; });

    var cand = []; // per instance data
    var tmpM = new THREE.Matrix4(), tmpC = new THREE.Color();
    rows.forEach(function (row, ri) {
      row.ohlc.forEach(function (c, i) {
        var o = c[0], h = c[1], l = c[2], cl = c[3];
        var yo = row.y(o), yc = row.y(cl), yh = row.y(h), yl = row.y(l);
        cand.push({
          ri: ri, i: i, up: cl >= o, x: X0 + i * SX, z: row.z,
          bTop: Math.max(yo, yc), bBot: Math.min(yo, yc), wTop: yh, wBot: yl,
          delay: (single ? 0 : ri * 140) + i * (single ? 22 : 16), ohlc: c
        });
      });
    });

    var dim = rows.map(function () { return 1; });
    var dimTarget = rows.map(function () { return 1; });

    function writeColors() {
      cand.forEach(function (d, k) {
        tmpC.copy(d.up ? UP : DOWN).multiplyScalar(0.12 + 0.88 * dim[d.ri]);
        bodies.setColorAt(k, tmpC); wicks.setColorAt(k, tmpC);
      });
      bodies.instanceColor.needsUpdate = true; wicks.instanceColor.needsUpdate = true;
      reflB.instanceColor = bodies.instanceColor; reflW.instanceColor = wicks.instanceColor;
    }

    function writeMatrices(p) {
      cand.forEach(function (d, k) {
        var e = p == null ? 1 : easeOut(Math.min(1, Math.max(0, (p - d.delay) / 900)));
        var s = Math.max(e, 0.0001);
        var bh = Math.max(d.bTop - d.bBot, 0.035) * s;
        var bc = (d.bBot + (d.bTop - d.bBot) / 2) * s;
        tmpM.makeScale(BW, bh, BW); tmpM.setPosition(d.x, bc, d.z); bodies.setMatrixAt(k, tmpM);
        var wh = Math.max(d.wTop - d.wBot, 0.02) * s;
        var wc = (d.wBot + (d.wTop - d.wBot) / 2) * s;
        tmpM.makeScale(0.045, wh, 0.045); tmpM.setPosition(d.x, wc, d.z); wicks.setMatrixAt(k, tmpM);
      });
      bodies.instanceMatrix.needsUpdate = true; wicks.instanceMatrix.needsUpdate = true;
      reflB.instanceMatrix = bodies.instanceMatrix; reflW.instanceMatrix = wicks.instanceMatrix;
    }
    // Init colour buffers
    tmpC.set(0xffffff);
    for (var k0 = 0; k0 < total; k0++) { bodies.setColorAt(k0, tmpC); wicks.setColorAt(k0, tmpC); }
    writeColors();
    writeMatrices(REDUCED ? null : 0);

    // Floor (semi-transparent so reflections show through) + grid
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(140, 140), new THREE.MeshBasicMaterial({ color: 0x050607, transparent: true, opacity: 0.74, depthWrite: false }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = 0.001; floor.renderOrder = 1; scene.add(floor);
    var grid = new THREE.GridHelper(140, 140, 0x3a2a0a, 0x15191d);
    grid.position.y = 0.004; grid.material.transparent = true; grid.material.opacity = 0.75; scene.add(grid);

    // Row base strips + labels
    var labels = [];
    rows.forEach(function (row) {
      var col = new THREE.Color(ROW_COLORS[row.key] || "#ffb224");
      var strip = new THREE.Mesh(new THREE.BoxGeometry((N - 1) * SX + 1.2, 0.03, 0.06), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55 }));
      strip.position.set(0, 0.02, row.z + BW * 0.9); scene.add(strip);
      if (!single) {
        var sp = textSprite(row.label, ROW_COLORS[row.key] || "#ffb224", { size: 40, scale: 0.0105, anchorRight: true });
        sp.position.set(X0 - 0.7, 0.55, row.z); scene.add(sp); labels.push(sp);
      }
    });

    // Target-price plane (single mode)
    if (single && options.tp) {
      var r0 = rows[0], ty = r0.y(options.tp);
      var tpCol = new THREE.Color(options.tpColor || "#ffb224");
      var tpPlane = new THREE.Mesh(new THREE.PlaneGeometry((N - 1) * SX + 3, 2.4), new THREE.MeshBasicMaterial({ color: tpCol, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false }));
      tpPlane.rotation.x = -Math.PI / 2; tpPlane.position.set(0.6, ty, 0); scene.add(tpPlane);
      var tpLine = new THREE.Mesh(new THREE.BoxGeometry((N - 1) * SX + 3, 0.025, 0.025), new THREE.MeshBasicMaterial({ color: tpCol }));
      tpLine.position.set(0.6, ty, 1.2); scene.add(tpLine);
      var tpLbl = textSprite(options.tpLabel || "TARGET", options.tpColor || "#ffb224", { size: 40, scale: 0.012 });
      tpLbl.position.set(X0 + (N - 1) * SX + 2.3, ty + 0.05, 1.2); scene.add(tpLbl);
      var last = r0.ohlc[N - 1][3];
      var lastLbl = textSprite(options.lastLabel || ("LAST " + last), "#e9ebed", { size: 34, scale: 0.0105, opacity: 0.85 });
      lastLbl.position.set(X0 + (N - 1) * SX + 0.5, r0.y(last) + 0.55, 0); scene.add(lastLbl);
    }

    // Glowing ribbon through closes (Nifty in hero; the stock in single mode)
    var ribbonRow = single ? rows[0] : rows[0];
    var pts = ribbonRow.ohlc.map(function (c, i) {
      return new THREE.Vector3(X0 + i * SX, single ? ribbonRow.y(c[3]) : ribbonRow.y(c[3]) * 0.55 + H + 1.6, single ? -0.9 : rows[0].z - 1.6);
    });
    var curve = new THREE.CatmullRomCurve3(pts);
    var tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 300, single ? 0.03 : 0.035, 6, false), new THREE.MeshBasicMaterial({ color: 0xffb224, transparent: true, opacity: single ? 0.55 : 0.85 }));
    scene.add(tube);
    var runner = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffe2a0 }));
    var runLight = new THREE.PointLight(0xffb224, 2.2, 9, 2);
    runner.add(runLight); scene.add(runner);
    var halo = textSprite("●", "#ffb224", { size: 60, scale: 0.02, opacity: 0.35 }); halo.center.set(0.5, 0.5); runner.add(halo);

    // Data dust
    var PCOUNT = single ? 380 : 750;
    var pGeo = new THREE.BufferGeometry();
    var pPos = new Float32Array(PCOUNT * 3), pSpd = new Float32Array(PCOUNT);
    for (var p = 0; p < PCOUNT; p++) {
      pPos[p * 3] = (Math.random() - 0.5) * 40;
      pPos[p * 3 + 1] = Math.random() * 12;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 22;
      pSpd[p] = 0.002 + Math.random() * 0.006;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    var dust = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xffc35a, size: 0.045, transparent: true, opacity: 0.55, depthWrite: false }));
    scene.add(dust);

    // Camera rig
    // Wide screens frame the field to the right of the copy; narrow (portrait) screens pull back and centre it.
    var RIGS = single
      ? { wide: { pos: new THREE.Vector3(-4.5, 5.6, 12.5), look: new THREE.Vector3(3.2, 2.9, 0) }, narrow: { pos: new THREE.Vector3(2, 7.5, 24), look: new THREE.Vector3(4.5, 2.2, 0) } }
      : { wide: { pos: new THREE.Vector3(-3.2, 9.2, 19.5), look: new THREE.Vector3(2.0, 2.0, 0) }, narrow: { pos: new THREE.Vector3(1.5, 12, 34), look: new THREE.Vector3(3, -1.5, 0) } };
    var base = RIGS.wide;
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    var scroll = 0;
    camera.position.copy(base.pos); camera.lookAt(base.look);

    function onMove(e) {
      var r = canvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }
    window.addEventListener("pointermove", onMove, { passive: true });

    // Tooltip via raycast
    var ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
    var tip = options.tooltip || null, hoverEl = options.hoverTarget || canvas;
    var startDate = options.firstWeek ? new Date(options.firstWeek + "T00:00:00") : null;
    function fmtDate(i) {
      if (!startDate) return "";
      var d = new Date(startDate.getTime() + i * 7 * 864e5);
      return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
    }
    if (tip) {
      hoverEl.addEventListener("pointermove", function (e) {
        if (options.hoverFilter && !options.hoverFilter(e)) {
          tip.style.opacity = 0;
          return;
        }
        var r = canvas.getBoundingClientRect();
        ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        ray.setFromCamera(ndc, camera);
        var hit = ray.intersectObject(bodies);
        if (hit.length && hit[0].instanceId != null) {
          var d = cand[hit[0].instanceId];
          var row = rows[d.ri], c = d.ohlc;
          var chg = ((c[3] - c[0]) / c[0] * 100);
          tip.innerHTML = "<b style='color:" + (ROW_COLORS[row.key] || "#ffb224") + "'>" + row.label + "</b> · wk of " + fmtDate(d.i) +
            "<br>O " + c[0].toLocaleString("en-IN") + " · H " + c[1].toLocaleString("en-IN") + " · L " + c[2].toLocaleString("en-IN") + " · C " + c[3].toLocaleString("en-IN") +
            " <span style='color:" + (chg >= 0 ? "#2bd47d" : "#ff5a5f") + "'>" + (chg >= 0 ? "+" : "") + chg.toFixed(2) + "%</span>";
          tip.style.opacity = 1;
          tip.style.transform = "translate(" + (e.clientX + 16) + "px," + (e.clientY + 16) + "px)";
          if (!single && options.onHoverRow) options.onHoverRow(d.ri);
        } else {
          tip.style.opacity = 0;
          if (!single && options.onHoverRow) options.onHoverRow(null);
        }
      }, { passive: true });
      hoverEl.addEventListener("pointerleave", function () { tip.style.opacity = 0; if (options.onHoverRow) options.onHoverRow(null); });
    }

    var t0 = null, introDone = REDUCED;
    function frame(t) {
      if (t0 == null) t0 = t;
      var el = t - t0;
      if (!introDone) {
        writeMatrices(el);
        if (el > cand[cand.length - 1].delay + 950) { introDone = true; writeMatrices(null); }
      }
      // highlight easing
      var changed = false;
      for (var i = 0; i < R; i++) {
        var dlt = dimTarget[i] - dim[i];
        if (Math.abs(dlt) > 0.004) { dim[i] += dlt * 0.12; changed = true; }
      }
      if (changed) writeColors();

      mouse.x += (mouse.tx - mouse.x) * 0.045; mouse.y += (mouse.ty - mouse.y) * 0.045;
      var sway = REDUCED ? 0 : Math.sin(el * 0.00012) * 1.4;
      var sp = scroll;
      camera.position.set(
        base.pos.x + mouse.x * 2.4 + sway + sp * 3,
        base.pos.y - mouse.y * 1.3 + sp * (single ? 1.5 : -3.2),
        base.pos.z - sp * (single ? 2 : 6)
      );
      var look = base.look.clone(); look.x += mouse.x * 0.6 + sp * 1.5; look.y += sp * 0.6;
      camera.lookAt(look);

      // runner along ribbon
      var u = REDUCED ? 1 : ((el * 0.00006) % 1);
      runner.position.copy(curve.getPointAt(u));
      halo.material.opacity = 0.25 + Math.sin(el * 0.006) * 0.12;

      // dust drift
      if (!REDUCED) {
        var arr = pGeo.attributes.position.array;
        for (var q = 0; q < PCOUNT; q++) {
          arr[q * 3 + 1] += pSpd[q];
          if (arr[q * 3 + 1] > 12) arr[q * 3 + 1] = 0;
        }
        pGeo.attributes.position.needsUpdate = true;
      }
      renderer.render(scene, camera);
    }

    function resize() {
      fitRenderer(renderer, camera, canvas);
      base = camera.aspect < 1 ? RIGS.narrow : RIGS.wide;
      if (REDUCED || introDone) renderer.render(scene, camera);
    }
    window.addEventListener("resize", resize);
    resize();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { /* labels drawn with fallback font if not ready */ });
    loopWhenVisible(canvas, frame);

    return {
      highlight: function (ri) { for (var i = 0; i < R; i++) dimTarget[i] = (ri == null || ri === i) ? 1 : 0.0; },
      setScroll: function (s) { scroll = Math.max(0, Math.min(1, s)); },
      rowColors: ROW_COLORS
    };
  }

  /* ------------------------------------------------------------------ Surface */
  function Surface(canvas, options) {
    if (!THREE || !hasWebGL()) return null;
    options = options || {};
    var renderer = makeRenderer(canvas);
    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050607, 10, 34);
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 7.5, 15); camera.lookAt(0, 0, 0);

    var geo = new THREE.PlaneGeometry(46, 26, 92, 52);
    geo.rotateX(-Math.PI / 2);
    var pos = geo.attributes.position;
    var baseXZ = new Float32Array(pos.count * 2);
    for (var i = 0; i < pos.count; i++) { baseXZ[i * 2] = pos.getX(i); baseXZ[i * 2 + 1] = pos.getZ(i); }
    var colorHex = options.color || 0xffb224;
    var wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true, transparent: true, opacity: 0.09 }));
    var pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: colorHex, size: 0.06, transparent: true, opacity: 0.75 }));
    scene.add(wire, pts);

    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener("pointermove", function (e) {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function displace(t) {
      for (var i = 0; i < pos.count; i++) {
        var x = baseXZ[i * 2], z = baseXZ[i * 2 + 1];
        var y = Math.sin(x * 0.24 + t) * Math.cos(z * 0.3 + t * 0.8) * 1.15 + Math.sin((x + z) * 0.13 + t * 1.3) * 0.55;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }
    displace(0);

    function frame(t) {
      var s = REDUCED ? 0 : t * 0.00045;
      if (!REDUCED) displace(s);
      mouse.x += (mouse.tx - mouse.x) * 0.04; mouse.y += (mouse.ty - mouse.y) * 0.04;
      camera.position.x = mouse.x * 2.5;
      camera.position.y = 7.5 - mouse.y * 1.2;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    function resize() { fitRenderer(renderer, camera, canvas); renderer.render(scene, camera); }
    window.addEventListener("resize", resize);
    resize();
    loopWhenVisible(canvas, frame);
    return {};
  }

  window.Scenes = { CandleCity: CandleCity, Surface: Surface, ROW_COLORS: ROW_COLORS, REDUCED: REDUCED };
})();
