const { readFileSync, writeFileSync } = require('fs')
const compiledJS = readFileSync('./dist/scripts-loader.js', 'utf8')
writeFileSync(
  './dist/scripts-loader.js',
  `/*!
 * Scripts-Loader JavaScript Library v${require('./package.json').version || '1.0.0'}
 * https://github.com/Mubarrat/scripts-loader/
 * 
 * Released under the MIT license
 * https://github.com/Mubarrat/scripts-loader/blob/main/LICENSE
 */
${compiledJS}`,
  'utf8'
)