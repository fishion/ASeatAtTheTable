#!/usr/bin/env node
"use strict";

const path = require('path');
const config = require('../config.json');
const Handlebars = require('../../HandlebarsExtended/index')({
  appRoot : path.resolve(__dirname, '..')
});

Handlebars.buildSite(config)