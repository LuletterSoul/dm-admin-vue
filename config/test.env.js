var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  BASE_API: '"http://10.196.122.94:8080"',
  API_VERSION: "/api/v1",
  SERVER_API: '"http://192.168.0.28:8085"'
});
