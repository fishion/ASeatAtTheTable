
const path = require('path');
module.exports = {
  entry: './templates/script/site.js',
  // mode: 'development', devtool: false,
  mode: 'production',
  target: 'node',
  output: {
    filename: 'site.js',
    path: path.join(__dirname, 'docs/script'),
    //libraryTarget: 'commonjs'
  }
}