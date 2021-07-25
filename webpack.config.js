
const path = require('path');
module.exports = {
  entry: {
    site : './src/script/site.js',
    formevents : './src/script/formevents.js',
  },
  mode: 'development', devtool: false,
  //mode: 'production',
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'docs/script'),
    //libraryTarget: 'commonjs'
  }
}