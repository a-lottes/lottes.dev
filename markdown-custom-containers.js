module.exports = {
    callout: md => {
        const re = /^callout(\s+.*)?$/;
        return {
            validate: (params) => {
                return params.trim().match(re);
            },

            render: (tokens, idx) => {
                const params = tokens[idx].info.trim().match(re);

                if (tokens[idx].nesting === 1) {
                    // opening tag
                    return `
<div class="callout">
    <h3 class="callout__title">${md.utils.escapeHtml(params?.[1]) || ""}</h3>
    <div class="callout__text">
`;
                } else {
                    // closing tag
                    return '</div></div>\n';
                }
            }
        }
    },
    highlight: () => {
        const re = /^highlight$/;
        return {
            validate: (params) => {
                return params.trim().match(re);
            },

            render: (tokens, idx) => {
                if (tokens[idx].nesting === 1) {
                    // opening tag
                    return `
<div class="highlight">
    <p>
`;
                } else {
                    // closing tag
                    return `
    </p>
</div>
\n`;
                }
            }
        }
    },
    quote: md => {
        const re = /^quote(\s+.*)?$/
        let params = undefined;
        return {
            validate: (params) => {
                return params.trim().match(re);
            },

            render: (tokens, idx) => {
                params = tokens[idx].info.trim().match(re) || params;

                if (tokens[idx].nesting === 1) {
                    // opening tag
                    return `
<figure class="quote">
  <blockquote>
`;
                } else {
                    // closing tag
                    const imageBlock = params && params[1] ? `
    <figcaption>
        <div class="quote__image">
            <img src="${md.utils.escapeHtml(params[1]) || ""}" alt="" />
        </div>
    </figcaption>` : undefined;
                    return `
    ${imageBlock || ""}
  </blockquote>
</figure>
<br>
\n`;
                }
            }
        }
    },
    alert: md => {
        const re = /^(info|warning|error|success)(\s+.*)?$/;
        return {
            validate: (params) => {
                return params.trim().match(re);
            },

            render: (tokens, idx) => {
                const params = tokens[idx].info.trim().match(re);
                const type = params?.[1];
                const title = md.utils.escapeHtml(params?.[2]) || '';

                if (tokens[idx].nesting === 1) {
                    const title_elem = title !== '' ? `<h3 class="alert__title">${title}</h3>` : '';
                    // opening tag
                    return `
<div class="alert alert--${type}">
    ${title_elem}
`;
                } else {
                    // closing tag
                    return '</div>\n';
                }
            }
        }
    },
    accordion: md => {
        const re = /^(accordionsgroup|.*)?$/;
        return {
            validate: (params) => {
                return params.trim().match(re);
            },

            render: (tokens, idx) => {
                const params = tokens[idx].info.trim().match(re);

                if (tokens[idx].nesting === 1) {
                    // opening tag
                    if (params?.[1] === "accordionsgroup") {
                        return `<div class="accordions-group">`;
                    } else {
                        return `
<details class="accordion">
    <summary class="accordion__title">${md.utils.escapeHtml(params?.[1]) || ""}</summary>
    <div class="accordion__body">
`;
                    }
                } else {
                    // closing tag
                    if (params?.[1] === "accordionsgroup") {
                        return `</div>`;
                    } else {
                        return '</div></details>\n';
                    }
                }
            },

            marker: "?"
        }
    }

}
