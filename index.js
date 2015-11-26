'use strict';

require('babel-core/register');

var App = require('./src').default;

var app = new App();

return app.run();
