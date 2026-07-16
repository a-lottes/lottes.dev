/* Theme toggle: cycles light -> dark -> system.
   The stored key stays 'scheme' so preferences set by the previous DSFR
   build survive. 'system' is written explicitly for the same reason. */
(function () {
    var button = document.getElementById("theme-toggle");
    if (!button) return;

    var root = document.documentElement;
    var order = ["light", "dark", "system"];
    var media = window.matchMedia("(prefers-color-scheme: dark)");

    function stored() {
        try {
            var value = localStorage.getItem("scheme");
            return order.indexOf(value) === -1 ? "system" : value;
        } catch (e) {
            return "system";
        }
    }

    function apply(scheme) {
        if (scheme === "system") {
            root.removeAttribute("data-theme");
        } else {
            root.setAttribute("data-theme", scheme);
        }
        try {
            localStorage.setItem("scheme", scheme);
        } catch (e) {
            /* private mode: theme still applies for this page view */
        }
        render(scheme);
        document.dispatchEvent(new CustomEvent("themechange", { detail: { scheme: scheme } }));
    }

    function render(scheme) {
        var icons = button.querySelectorAll("[data-scheme-icon]");
        for (var i = 0; i < icons.length; i++) {
            icons[i].hidden = icons[i].getAttribute("data-scheme-icon") !== scheme;
        }
        button.setAttribute("aria-label", button.getAttribute("data-label-" + scheme) || "");
        button.setAttribute("title", button.getAttribute("data-label-" + scheme) || "");
    }

    button.addEventListener("click", function () {
        apply(order[(order.indexOf(stored()) + 1) % order.length]);
    });

    // Keep the icon honest when the OS flips while we are in system mode.
    media.addEventListener("change", function () {
        if (stored() === "system") render("system");
    });

    render(stored());
})();
