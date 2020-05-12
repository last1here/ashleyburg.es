const { DateTime } = require('luxon');
const fs = require('fs');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItImsize = require('markdown-it-imsize');
const Terser = require('terser');
const CleanCSS = require('clean-css');
const readingTime = require('./src/_11ty/reading-time.js');

var env = process.env.ELEVENTY_ENV;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy',
    );
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter('cssmin', function (code) {
    if (env.trim() === 'dev') {
      return code;
    }

    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter('jsmin', function (code) {
    if (env.trim() === 'dev') {
      return code;
    }

    let minified = Terser.minify(code, { mangle: true, toplevel: true });
    if (minified.error) {
      return code;
    }

    return minified.code;
  });

  eleventyConfig.addFilter('orphanWrap', function (text) {
    if (!text) return;
    let splitSpace = text.split(' ');
    let after = '';
    if (splitSpace.length > 2) {
      after += ' ';
      let lastWord = splitSpace.pop();
      let secondLastWord = splitSpace.pop();
      after += `${secondLastWord}&nbsp;${lastWord}`;
    }
    return splitSpace.join(' ') + after;
  });

  eleventyConfig.addCollection('tagList', require('./src/_11ty/getTagList'));

  function getPosts(collectionApi) {
    return collectionApi.getFilteredByGlob('src/posts/*.md').reverse();
  }

  eleventyConfig.addCollection('posts', function (collection) {
    return getPosts(collection);
  });

  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/manifest.json');
  eleventyConfig.addPassthroughCopy('src/browserconfig.xml');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy({ 'src/admin/config.yml': true });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
  })
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: 'direct-link',
      permalinkSymbol: '#',
    })
    .use(markdownItImsize);

  eleventyConfig.setLibrary('md', markdownLibrary);

  if (env.trim() !== 'dev') {
    eleventyConfig.addTransform(
      'htmlmin',
      require('./src/_11ty/minify-html.js'),
    );
  } else {
    eleventyConfig.addFilter('debug', (dateObj) => {
      return JSON.stringify(dateObj);
    });

    // Browsersync Overrides
    eleventyConfig.setBrowserSyncConfig({
      callbacks: {
        ready: function (err, browserSync) {
          const content_404 = fs.readFileSync('_site/404.html');

          browserSync.addMiddleware('*', (req, res) => {
            // Provides the 404 content without redirect.
            res.write(content_404);
            res.end();
          });
        },
      },
      ui: false,
      ghostMode: false,
    });
  }

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    // passthroughFileCopy: true,

    // These are all optional, defaults are shown:
    dir: {
      input: './src',
      // includes: "_includes",
      // data: "_data",
      output: '_site',
    },
  };
};
