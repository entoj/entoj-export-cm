'use strict';

/**
 * Configure path
 */
const path = require('path');
global.CM_SOURCE = path.resolve(__dirname + '/../source');
global.CM_FIXTURES = path.resolve(__dirname + '/__fixtures__');
global.CM_TEST = __dirname;


/**
 * Configure chai
 */
const chai = require('chai');
chai.config.includeStack = true;
global.expect = chai.expect;
