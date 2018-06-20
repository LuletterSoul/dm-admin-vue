var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  BASE_API: '"http://localhost:8085"',
  API_VERSION:"/api/v1",
  SERVER_API:'"http://localhost:8085/api/v1"'
});
