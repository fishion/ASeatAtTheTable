#!/usr/bin/env node
"use strict";

const fs = require('fs/promises')
const path = require('path');
const sass = require('sass');

const appRoot = path.resolve(__dirname, '..');
const config = require(path.resolve(appRoot, 'config.json'));

const Handlebars = require('HandlebarsExtended')({
  appRoot : appRoot,
  ...config.paths
});


// build html files with Handlebars
Handlebars.buildSite(config)

// build css files from SASS
config.paths.sassFiles && config.paths.sassFiles.forEach( async file => {
  const infile = path.resolve(appRoot, config.paths.sassInputPath, `${file}.scss`);
  const outfile = path.resolve(appRoot, config.paths.sassOutputPath, `${file}.css`);
  try {
    const result = sass.renderSync( {
      file: infile,
      outFile: outfile,
      outputStyle: 'compressed'
    } );
    await fs.writeFile(outfile, result.css)
  }
  catch (e){
    console.log(`failed to compile ${infile} : ${e}`)
  }
})
  
