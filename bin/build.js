#!/usr/bin/env node
"use strict";

const path = require('path');
const appRoot = path.resolve(__dirname, '..');
const Handlebars = require('HandlebarsExtended')({
  appRoot : appRoot
});

const config = require(path.resolve(appRoot, 'config.json'));
Handlebars.buildSite(config)