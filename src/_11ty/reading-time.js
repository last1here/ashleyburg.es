// simplified version of https://github.com/johanbrook/eleventy-plugin-reading-time
const readingTime = function readingTime(postOrContent, { speed = 300 } = {}) {
  const htmlContent =
    typeof postOrContent === 'string'
      ? postOrContent
      : postOrContent.templateContent;

  if (!htmlContent) {
    return ``;
  }

  const content = htmlContent.replace(/(<([^>]+)>)/gi, '');
  const matches = content.match(/[\u0400-\u04FF]+|\S+\s*/g);
  const count = matches !== null ? matches.length : 0;

  const min = Math.ceil(count / speed);
  return min + ' min' + (min === 1 ? '' : 's');
};

module.exports = function (eleventyConfig, pluginNamespace) {
  eleventyConfig.namespace(pluginNamespace, () => {
    eleventyConfig.addNunjucksFilter('readingTime', readingTime);
  });
};
