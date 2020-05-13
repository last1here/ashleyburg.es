const fs = require('fs');
const workbox = require('workbox-build');
const shimmer = require('shimmer');

const swBuild = async (options, outputDir) => {
  appId = 'eleventy-plugin-pwa';
  defaultOptions = {
    cacheId: appId,
    skipWaiting: true,
    clientsClaim: true,
    swDest: `${outputDir}/sw.js`,
    globDirectory: outputDir,
    globPatterns: [
      '**/*.{html,css,jpg,png,gif,webp,ico,svg,woff2,woff,eot,ttf,otf,ttc,json}',
    ],
    runtimeCaching: [
      {
        urlPattern: /^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
        handler: `StaleWhileRevalidate`,
      },
    ],
  };

  const opts = Object.assign({}, defaultOptions, options);
  let files;
  try {
    files = fs.readdirSync(opts.globDirectory);
    if (files && files.length == 0)
      throw new Error(
        `No files that can be cached on '${opts.globDirectory}', ignoring.`,
      );
  } catch (e) {
    return e.message;
  }
  const genSW = await workbox.generateSW(opts);
  const size = (genSW.size / 1048576).toFixed(2);
  return `${genSW.count} files will be precached, totaling ${size} MB.`;
};

module.exports = {
  configFunction: (__, options = {}) => {
    function postBuild() {
      const Eleventy = require('@11ty/eleventy/src/Eleventy');
      shimmer.wrap(Eleventy.prototype, 'finish', function (orig) {
        const outputDir = new Eleventy().outputDir;
        process.on('unhandledRejection', (reason) => {
          console.log('Reason: ' + reason);
        });
        return function () {
          swBuild(options, outputDir).then((res) => console.log(res));
          return orig.apply(this);
        };
      });
    }
    setImmediate(postBuild);
  },
};
