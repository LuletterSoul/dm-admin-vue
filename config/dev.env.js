var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '" https://easy-mock.com/mock/59ad3f52e0dc6633419c18f5/dm-admin"'
  BASE_API: '"http://118.24.62.94:8080"',
  API_VERSION:'"/api/v1"',
  SERVER_API:'"http://118.24.62.94:8080/api/v1"',
  WS_API:'"http://localhost:8085/socket"'
});
