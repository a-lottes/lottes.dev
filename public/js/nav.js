/* Generic disclosure controller for the mobile menu, nav submenus and the
   language switcher. Any button[aria-expanded][aria-controls] toggles the
   hidden state of the element it controls. */
(function () {
    var buttons = Array.prototype.slice.call(
        document.querySelectorAll("button[aria-expanded][aria-controls]")
    );
    if (!buttons.length) return;

    function panelOf(button) {
        return document.getElementById(button.getAttribute("aria-controls"));
    }

    function setOpen(button, open) {
        var panel = panelOf(button);
        if (!panel) return;
        button.setAttribute("aria-expanded", String(open));
        panel.hidden = !open;
    }

    function closeAll(except) {
        buttons.forEach(function (button) {
            if (button !== except) setOpen(button, false);
        });
    }

    buttons.forEach(function (button) {
        setOpen(button, false);

        button.addEventListener("click", function () {
            var open = button.getAttribute("aria-expanded") === "true";
            closeAll(button);
            setOpen(button, !open);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;
        var open = buttons.filter(function (button) {
            return button.getAttribute("aria-expanded") === "true";
        });
        if (!open.length) return;
        open.forEach(function (button) {
            setOpen(button, false);
        });
        open[0].focus();
    });

    document.addEventListener("click", function (event) {
        buttons.forEach(function (button) {
            if (button.getAttribute("aria-expanded") !== "true") return;
            var panel = panelOf(button);
            if (button.contains(event.target) || (panel && panel.contains(event.target))) return;
            setOpen(button, false);
        });
    });
})();
