const { readFileSync, writeFileSync } = require('fs');
const { minify } = require('terser');
writeFileSync(
  './dist/scripts-loader.js',
  `/*!
 * Scripts-Loader JavaScript Library v${require('./package.json').version || '1.0.0'}
 * https://github.com/Mubarrat/scripts-loader/
 * 
 * Released under the MIT license
 * https://github.com/Mubarrat/scripts-loader/blob/main/LICENSE
 */
${readFileSync('./dist/scripts-loader.js')}`
),
minify(String(readFileSync('./dist/scripts-loader.js')),
  {
    sourceMap: {
      filename: "scripts-loader.min.js",
      content: readFileSync('./dist/scripts-loader.js.map', 'utf-8'),
      includeSources: true,
      root: "./src/"
    }
  }).then(x => (writeFileSync('./dist/scripts-loader.min.js', x.code + "\n//# sourceMappingURL=scripts-loader.min.js.map"), writeFileSync('./dist/scripts-loader.min.js.map', x.map)))