/**
 * babel hook to use es6
 */
require('babel/register');

var Main = require('./main');

var main = new Main();

/*
 * main event loop
 */

return main.setup().then(function() {
  return main.run();
});
