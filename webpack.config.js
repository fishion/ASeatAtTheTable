
const path = require('path');
module.exports = {
  entry: {
    site : './templates/script/site.js',
    formevents : './templates/script/formevents.js',
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