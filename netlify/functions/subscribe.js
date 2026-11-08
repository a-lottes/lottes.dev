// Newsletter signup → Brevo double opt-in.
//
// One shared contact list per language, so campaigns can be sent per locale
// without needing a custom Brevo contact attribute. All IDs and the API key
// live in Netlify environment variables (Site settings → Environment
// variables) — never in this file or in git.
//
// Required env vars:
//   BREVO_API_KEY
//   BREVO_LIST_ID_DE / BREVO_LIST_ID_EN / BREVO_LIST_ID_FR
//   BREVO_DOI_TEMPLATE_ID_DE / BREVO_DOI_TEMPLATE_ID_EN / BREVO_DOI_TEMPLATE_ID_FR

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONFIRMATION_SLUG = {
    de: "/de/newsletter-bestaetigt/",
    en: "/en/newsletter-confirmed/",
    fr: "/fr/newsletter-confirme/",
};

const langConfig = (lang) => ({
    listId: process.env[`BREVO_LIST_ID_${lang.toUpperCase()}`],
    templateId: process.env[`BREVO_DOI_TEMPLATE_ID_${lang.toUpperCase()}`],
});

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {statusCode: 405, body: "Method Not Allowed"};
    }

    let payload;
    try {
        payload = JSON.parse(event.body || "{}");
    } catch (e) {
        return {statusCode: 400, body: JSON.stringify({error: "invalid_json"})};
    }

    const email = (payload.email || "").trim();
    const consent = payload.consent === true;
    const honeypot = (payload.company || "").trim();
    const lang = CONFIRMATION_SLUG[payload.lang] ? payload.lang : "de";

    // Bots fill every field, including the hidden one. Pretend success and drop.
    if (honeypot) {
        return {statusCode: 200, body: JSON.stringify({ok: true})};
    }

    if (!EMAIL_PATTERN.test(email)) {
        return {statusCode: 400, body: JSON.stringify({error: "invalid_email"})};
    }

    if (!consent) {
        return {statusCode: 400, body: JSON.stringify({error: "consent_required"})};
    }

    const {listId, templateId} = langConfig(lang);
    if (!process.env.BREVO_API_KEY || !listId || !templateId) {
        console.error("Newsletter signup misconfigured: missing Brevo env vars for lang", lang);
        return {statusCode: 500, body: JSON.stringify({error: "server_misconfigured"})};
    }

    const siteUrl = process.env.URL || "https://www.lottes.dev";

    try {
        const response = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
                email,
                includeListIds: [Number(listId)],
                templateId: Number(templateId),
                redirectionUrl: siteUrl + CONFIRMATION_SLUG[lang],
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Brevo DOI request failed", response.status, errorBody);
            return {statusCode: 502, body: JSON.stringify({error: "brevo_error"})};
        }

        return {statusCode: 200, body: JSON.stringify({ok: true})};
    } catch (e) {
        console.error("Brevo DOI request threw", e.message);
        return {statusCode: 502, body: JSON.stringify({error: "brevo_error"})};
    }
};
