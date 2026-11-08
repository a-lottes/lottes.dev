(() => {
    const FORM_SELECTOR = ".newsletter__form";
    const STATUS_SELECTOR = ".newsletter__status";
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setStatus = (form, text, variant) => {
        const status = form.querySelector(STATUS_SELECTOR);
        status.textContent = text;
        status.hidden = false;
        status.classList.remove("newsletter__status--success", "newsletter__status--error");
        if (variant) status.classList.add(`newsletter__status--${variant}`);
    };

    const submitForm = async (form) => {
        const data = new FormData(form);
        const email = (data.get("email") || "").trim();

        if (!EMAIL_PATTERN.test(email)) {
            setStatus(form, form.dataset.invalidEmail, "error");
            return;
        }

        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email,
                    lang: data.get("lang"),
                    consent: data.get("consent") === "on",
                    company: data.get("company") || "",
                }),
            });

            if (response.ok) {
                setStatus(form, form.dataset.success, "success");
                form.reset();
            } else {
                setStatus(form, form.dataset.error, "error");
            }
        } catch (e) {
            setStatus(form, form.dataset.error, "error");
        } finally {
            submitButton.disabled = false;
        }
    };

    document.querySelectorAll(FORM_SELECTOR).forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            submitForm(form);
        });
    });
})();
