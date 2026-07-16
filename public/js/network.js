/* Hero constellation: every blog post is a node, and two posts are wired
   together when they share a topic. Ambient dust fills the space around them.
   Purely decorative — the same posts are listed further down the page — so the
   canvas stays aria-hidden and this is a progressive enhancement.
   Pauses when scrolled away or hidden; renders one static frame under
   prefers-reduced-motion. */
(function () {
    var canvas = document.getElementById("hero-canvas");
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var hero = canvas.closest(".hero") || canvas.parentElement;
    var tooltip = document.getElementById("hero-tooltip");
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    var posts = [];
    try {
        var raw = document.getElementById("hero-posts");
        if (raw) posts = JSON.parse(raw.textContent) || [];
    } catch (e) {
        posts = [];
    }

    var DUST_COUNT = 55;
    var DUST_LINK = 95;
    var POST_RADIUS = 4.5;
    var HIT_RADIUS = 16;
    var SPEED = 0.13;

    var nodes = [];
    var postNodes = [];
    var width = 0;
    var height = 0;
    var frame = null;
    var visible = false;
    var hovered = null;
    var pointer = { x: null, y: null };
    var colors = { node: "#4f46e5", line: "#8b8b83", text: "#1a1a18" };
    // `radius` shapes the ambient fade; `ring` is where the posts live and has
    // to fit inside the hero box, which is far wider than it is tall.
    var focal = { x: 0, y: 0, radius: 1, ring: 1 };

    function readColors() {
        var styles = getComputedStyle(document.documentElement);
        var node = styles.getPropertyValue("--network-node").trim();
        var line = styles.getPropertyValue("--network-line").trim();
        if (node) colors.node = node;
        if (line) colors.line = line;
    }

    /* 1 at the focal centre, 0 at its edge — keeps the composition dense on the
       open side of the hero and dissolved behind the copy. */
    function weightAt(x, y) {
        var dx = x - focal.x;
        var dy = (y - focal.y) * 1.35;
        var d = Math.sqrt(dx * dx + dy * dy) / focal.radius;
        if (d >= 1) return 0;
        var t = 1 - d;
        return t * t;
    }

    function sharesTag(a, b) {
        for (var i = 0; i < a.tags.length; i++) {
            if (b.tags.indexOf(a.tags[i]) !== -1) return true;
        }
        return false;
    }

    function seed() {
        nodes = [];
        postNodes = [];

        // Posts ring the focal centre so they stay clear of the headline.
        var ringR = focal.ring;
        posts.forEach(function (post, i) {
            var angle = (i / Math.max(posts.length, 1)) * Math.PI * 2 - Math.PI / 2;
            var jitter = 0.72 + Math.random() * 0.5;
            postNodes.push({
                post: post,
                tags: post.tags || [],
                x: focal.x + Math.cos(angle) * ringR * jitter,
                y: focal.y + Math.sin(angle) * ringR * jitter * 0.8,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
                r: POST_RADIUS,
                w: 1,
                isPost: true,
            });
        });

        var count = Math.round(DUST_COUNT * Math.min(1.4, Math.max(0.5, (width * height) / 900000)));
        for (var i = 0; i < count; i++) {
            var x = Math.random() * width;
            var y = Math.random() * height;
            nodes.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
                r: Math.random() * 1.2 + 0.6,
                w: weightAt(x, y),
                isPost: false,
            });
        }
    }

    function resize() {
        var rect = hero.getBoundingClientRect();
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        if (!width || !height) return;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var wide = width > 900;
        focal.x = width * (wide ? 0.76 : 0.82);
        focal.y = height * (wide ? 0.5 : 0.08);
        focal.radius = Math.max(width, height) * (wide ? 0.46 : 0.38);
        // Keep the ring inside the box: the hero is a wide, short band, and on
        // narrow screens the focal centre sits near the top edge.
        focal.ring = Math.min(
            focal.radius * 0.5,
            width * 0.2,
            wide ? height * 0.34 : height * 0.14
        );

        seed();
        if (!running()) draw();
    }

    function step() {
        var i, n;

        for (i = 0; i < nodes.length; i++) {
            n = nodes[i];
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0) n.x += width;
            if (n.x > width) n.x -= width;
            if (n.y < 0) n.y += height;
            if (n.y > height) n.y -= height;
            n.w = weightAt(n.x, n.y);
        }

        // Posts drift but are tethered: a spring pulls them back once they
        // wander past the ring, so they never drift onto the headline.
        for (i = 0; i < postNodes.length; i++) {
            n = postNodes[i];
            n.x += n.vx;
            n.y += n.vy;

            var dx = n.x - focal.x;
            var dy = n.y - focal.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            var limit = focal.ring * 1.3;
            if (d > limit) {
                n.vx -= (dx / d) * 0.006;
                n.vy -= (dy / d) * 0.006;
            }

            if (pointer.x !== null) {
                var px = n.x - pointer.x;
                var py = n.y - pointer.y;
                var pd = Math.sqrt(px * px + py * py);
                if (pd < 120 && pd > 0.01 && n !== hovered) {
                    var push = (1 - pd / 120) * 0.35;
                    n.x += (px / pd) * push;
                    n.y += (py / pd) * push;
                }
            }

            n.vx = Math.max(-0.4, Math.min(0.4, n.vx));
            n.vy = Math.max(-0.4, Math.min(0.4, n.vy));
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        var i, j;

        // Ambient dust links
        ctx.lineWidth = 1;
        for (i = 0; i < nodes.length; i++) {
            for (j = i + 1; j < nodes.length; j++) {
                var dx = nodes[i].x - nodes[j].x;
                var dy = nodes[i].y - nodes[j].y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d > DUST_LINK) continue;
                var lw = (nodes[i].w + nodes[j].w) * 0.5;
                if (lw < 0.02) continue;
                ctx.strokeStyle = colors.line;
                ctx.globalAlpha = (1 - d / DUST_LINK) * lw * 0.5;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }

        // Topic links: the actual meaning of the picture
        ctx.strokeStyle = colors.node;
        for (i = 0; i < postNodes.length; i++) {
            for (j = i + 1; j < postNodes.length; j++) {
                if (!sharesTag(postNodes[i], postNodes[j])) continue;
                var lit = hovered === postNodes[i] || hovered === postNodes[j];
                ctx.globalAlpha = lit ? 0.75 : 0.22;
                ctx.lineWidth = lit ? 1.4 : 1;
                ctx.beginPath();
                ctx.moveTo(postNodes[i].x, postNodes[i].y);
                ctx.lineTo(postNodes[j].x, postNodes[j].y);
                ctx.stroke();
            }
        }

        // Dust
        ctx.fillStyle = colors.node;
        for (i = 0; i < nodes.length; i++) {
            if (nodes[i].w < 0.02) continue;
            ctx.globalAlpha = 0.15 + nodes[i].w * 0.45;
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Posts
        for (i = 0; i < postNodes.length; i++) {
            var n = postNodes[i];
            var on = hovered === n;
            ctx.globalAlpha = on ? 0.28 : 0.14;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * (on ? 3.4 : 2.6), 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(n.x, n.y, on ? n.r * 1.35 : n.r, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;
    }

    function hitTest() {
        if (pointer.x === null) return null;
        var best = null;
        var bestD = HIT_RADIUS;
        for (var i = 0; i < postNodes.length; i++) {
            var dx = postNodes[i].x - pointer.x;
            var dy = postNodes[i].y - pointer.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < bestD) {
                bestD = d;
                best = postNodes[i];
            }
        }
        return best;
    }

    function renderTooltip() {
        if (!tooltip) return;
        if (!hovered) {
            tooltip.hidden = true;
            return;
        }
        tooltip.textContent = hovered.post.title;
        tooltip.hidden = false;
        var tw = tooltip.offsetWidth;
        var left = Math.max(8, Math.min(width - tw - 8, hovered.x - tw / 2));
        tooltip.style.transform = "translate(" + Math.round(left) + "px," + Math.round(hovered.y + 16) + "px)";
    }

    function updateHover() {
        var next = hitTest();
        if (next === hovered) return;
        hovered = next;
        // The canvas is pointer-events:none, so the hero carries the cursor.
        hero.classList.toggle("hero--has-target", !!hovered);
        renderTooltip();
        if (!running()) draw();
    }

    function tick() {
        step();
        updateHover();
        if (hovered) renderTooltip();
        draw();
        frame = requestAnimationFrame(tick);
    }

    function running() {
        return frame !== null;
    }

    function start() {
        if (running() || motion.matches || document.hidden || !visible) return;
        frame = requestAnimationFrame(tick);
    }

    function stop() {
        if (!running()) return;
        cancelAnimationFrame(frame);
        frame = null;
    }

    readColors();
    resize();

    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            visible ? start() : stop();
        }).observe(hero);
    } else {
        visible = true;
        start();
    }

    if ("ResizeObserver" in window) {
        new ResizeObserver(resize).observe(hero);
    } else {
        window.addEventListener("resize", resize);
    }

    document.addEventListener("visibilitychange", function () {
        document.hidden ? stop() : start();
    });

    hero.addEventListener("pointermove", function (event) {
        var rect = hero.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
        if (!running()) updateHover();
    });

    hero.addEventListener("pointerleave", function () {
        pointer.x = null;
        pointer.y = null;
        updateHover();
    });

    // The canvas sits behind the copy, so the hero owns the click.
    hero.addEventListener("click", function () {
        if (hovered) window.location.href = hovered.post.url;
    });

    motion.addEventListener("change", function () {
        if (motion.matches) {
            stop();
            draw();
        } else {
            start();
        }
    });

    document.addEventListener("themechange", function () {
        readColors();
        if (!running()) draw();
    });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        readColors();
        if (!running()) draw();
    });
})();
