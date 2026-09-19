const MONTHS_FR = ["janvier","fÃ©vrier","mars","avril","mai","juin","juillet","aoÃ»t","septembre","octobre","novembre","dÃ©cembre"];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  eleventyConfig.addFilter("dateFr", (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d)) return value;
    return `${d.getUTCDate()} ${MONTHS_FR[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });

  eleventyConfig.addCollection("agenda", (api) => {
    return api.getFilteredByGlob("src/content/agenda/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
  });

  eleventyConfig.addCollection("nouveautes", (api) => {
    return api.getFilteredByGlob("src/content/nouveautes/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
