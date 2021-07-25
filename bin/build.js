#!/usr/bin/env node
"use strict";

const path = require('path');
const appRoot = path.resolve(__dirname, '..');
const config = require(path.resolve(appRoot, 'config.json'));

const Handlebars = require('HandlebarsExtended')({
  appRoot : appRoot,
  ...config.paths
});

Handlebars.buildSite(config)