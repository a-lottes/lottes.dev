(() => {
    const RESULTS_PER_PAGE = 10;

    // The header search form submits this query parameter natively.
    const SEARCH_PARAM = "term";

    const SEARCH_TERM_SELECTOR = "#search-term";
    const RESULT_COUNT_SELECTOR = "#result-count";
    const SEARCH_RESULTS_SELECTOR = "#search-results";

    const searchTermText = document.querySelector(SEARCH_TERM_SELECTOR);
    const resultCounter = document.querySelector(RESULT_COUNT_SELECTOR);
    const searchResultList = document.querySelector(SEARCH_RESULTS_SELECTOR);

    const getSearchResults = async () => {
        const pagefind = await import(PAGEFIND_URL);
        const queryParams = new URLSearchParams(window.location.search);
        const searchTerm = queryParams.get(SEARCH_PARAM);
        searchTermText.textContent = searchTerm;
        pagefind.init();
        const search = await pagefind.search(searchTerm);
        return search.results;
    }

    const getHitHtml = (title, excerpt, url) => {
        return `
<h2 class="search-hit__title"><a href="${url}">${title}</a></h2>
<p>${excerpt}</p>`;
    }

    const populateSearchResults = async (paginatedResults) => {
        paginatedResults.forEach(result => {
            const hit = document.createElement("article");
            hit.className = "search-hit";
            hit.innerHTML = getHitHtml(result.meta.title, result.excerpt, result.url)
            searchResultList.appendChild(hit);
        });
    }

    const bottomIsReached = () => {
        return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;
    }

    getSearchResults().then(async searchResults => {
        resultCounter.innerText = searchResults.length;

        let start = 0;
        let paginatedResults = await Promise.all(searchResults
            .slice(start, start + RESULTS_PER_PAGE)
            .map(r => r.data())
        );

        await populateSearchResults(paginatedResults);

        window.addEventListener('scroll', async () => {
            if (bottomIsReached()) {
                start += RESULTS_PER_PAGE;
                paginatedResults = await Promise.all(searchResults
                    .slice(start, start + RESULTS_PER_PAGE)
                    .map(r => r.data())
                );
                await populateSearchResults(paginatedResults);
            }
        })
    });
})();
