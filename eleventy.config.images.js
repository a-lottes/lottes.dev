const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
// Warning: Avif can be resource-intensive so take care!
const getOptions = widths => {
    return {
        widths: widths || ["auto"],
        formats: ["avif", "webp", "auto"],
    }
};

const getImageAttributes = (cls, alt, sizes) => {
    // No class of our own: every call site wraps the image in a styled container
    // (`.card__img`, `.featured__media`, `.post-media__img`) that sizes it.
    const attributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    };

    if (cls) {
        attributes.class = cls;
    }

    return attributes;
};

const relativeToInputPath = (inputPath, relativeFilePath) => {
    let split = inputPath.split("/");
    split.pop();
    return path.resolve(split.join(path.sep), relativeFilePath);
}

module.exports = eleventyConfig => {
    // Eleventy Image shortcodes
    // https://www.11ty.dev/docs/plugins/image/
    eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, sizes, cls = "") {
        let file = relativeToInputPath(this.page.inputPath, src);
        const options = getOptions(widths);
        options["outputDir"] = path.join(eleventyConfig.dir.output, "img"); // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
        let metadata = await eleventyImage(file, options);

        // TODO loading=eager and fetchpriority=high
        return eleventyImage.generateHTML(metadata, getImageAttributes(cls, alt, sizes));
    });

    eleventyConfig.addAsyncShortcode("imageContent", async function imageContentShortcode(src, alt, widths, sizes, cls = "") {
        let file = relativeToInputPath(this.page.inputPath, src);
        const options = getOptions(widths);
        options["outputDir"] = path.join(eleventyConfig.dir.output, "img"); // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
        let metadata = await eleventyImage(file, options);

        return `
<figure class="post-media" role="group" aria-label="${alt}">
    <div class="post-media__img">
        ${eleventyImage.generateHTML(metadata, getImageAttributes(cls, alt, sizes))}
    </div>
    <figcaption class="post-media__caption">${alt}</figcaption>
</figure>\n`;
    });

    // Synchronous method for Nunjucks macros
    eleventyConfig.addNunjucksShortcode("imageSync", function imageShortcode(src, alt, widths, sizes, cls = "") {
        let file = relativeToInputPath(this.page.inputPath, src);
        const options = getOptions(widths);
        options["outputDir"] = path.join(eleventyConfig.dir.output, "img"); // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
        // generate images, while this is async we don’t wait
        eleventyImage(file, options);

        // get metadata even if the images are not fully generated yet
        let metadata = eleventyImage.statsSync(file, options);
        return eleventyImage.generateHTML(metadata, getImageAttributes(cls, alt, sizes));
    });

    eleventyConfig.addFilter("resolvePath", (imagePath, page) => {
        return imagePath ? path.resolve(page.inputPath, "..", imagePath) : undefined;
    });
};
