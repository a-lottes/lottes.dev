/* Article enhancements: copy buttons on code blocks and a reading-progress
   bar. Both no-op on pages without a .prose column. */
(function () {
    var prose = document.querySelector(".prose");
    if (!prose) return;

    var LABELS = {
        de: { copy: "Kopieren", copied: "Kopiert!" },
        fr: { copy: "Copier", copied: "Copié !" },
        en: { copy: "Copy", copied: "Copied!" }
    };
    var lang = (document.documentElement.lang || "en").slice(0, 2);
    var t = LABELS[lang] || LABELS.en;

    /* ---- Copy buttons ---- */
    function legacyCopy(text) {
        try {
            var area = document.createElement("textarea");
            area.value = text;
            area.setAttribute("readonly", "");
            area.style.position = "fixed";
            area.style.opacity = "0";
            document.body.appendChild(area);
            area.select();
            var ok = document.execCommand("copy");
            document.body.removeChild(area);
            return ok;
        } catch (e) {
            return false;
        }
    }

    var blocks = prose.querySelectorAll("pre");
    Array.prototype.forEach.call(blocks, function (pre) {
        var code = pre.querySelector("code") || pre;

        var wrap = document.createElement("div");
        wrap.className = "codeblock";
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);

        var button = document.createElement("button");
        button.type = "button";
        button.className = "code-copy";
        button.textContent = t.copy;
        button.setAttribute("aria-label", t.copy);
        wrap.appendChild(button);

        var timer;
        function flash() {
            button.textContent = t.copied;
            button.setAttribute("data-copied", "true");
            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                button.textContent = t.copy;
                button.removeAttribute("data-copied");
            }, 2000);
        }

        button.addEventListener("click", function () {
            var text = code.innerText.replace(/\n$/, "");
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(flash, function () {
                    // Async API rejected (e.g. document not focused): fall back.
                    if (legacyCopy(text)) flash();
                });
            } else if (legacyCopy(text)) {
                flash();
            }
        });
    });

    /* ---- Reading progress ---- */
    var bar = document.createElement("div");
    bar.className = "reading-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var ticking = false;
    function update() {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var ratio = docHeight > 0 ? window.scrollY / docHeight : 0;
        bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, ratio)) + ")";
        ticking = false;
    }
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
})();
