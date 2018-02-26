var path = require('path');

var dest = path.join(__dirname, '/data');

module.exports = {
  restPath: dest,
  uiPath: '/',
  title: 'AWS API mock server',
  version: 1,
  urlBase: 'http://localhost:3001',
  urlPath: '',
  port: 3001,
  contentType: 'application/json',
  
  accessControlExposeHeaders: 'X-Total-Count',
  accessControlAllowOrigin: '*',
  accessControlAllowMethods: 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
  accessControlAllowHeaders: 'origin, x-requested-with, content-type, authorization',

  open: true,
  dirName: __dirname,
  optionsFallbackPath: __dirname + '/data/_fallbacks/#/OPTIONS/'
};