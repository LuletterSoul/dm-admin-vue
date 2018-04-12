var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  BASE_API: '"http://118.24.62.94:8080"',
  API_VERSION:"/api/v1",
  SERVER_API:'"http://118.24.62.94:8080/api/v1"'
});
