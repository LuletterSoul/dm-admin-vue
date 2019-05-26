import axios from 'axios';
import {Message,MessageBox} from 'element-ui';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.SERVER_API, // api的base_url
  // timeout: 20000                  // 请求超时时间
});
// function wrapAccessCredentials(config, username) {
//   config.headers['X-Timestamp'] = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
//   config.headers['X-Username'] = username;
//   config.headers['X-Access-Token'] = getCookiesToken();
// }
//
// function wrapClientDigest(config, token) {
//   if (config.params === undefined) {
//     config['params'] = {};
//   }
//   config.headers['X-Client-Digest'] = clientDigest(getCookiesToken(), token, config.params);
// }

// request拦截器
service.interceptors.request.use(config => {
        // wrapAccessCredentials(config, store.getters.username);
        // wrapClientDigest(config, store.getters.disposableToken);
  return config;
}, error => {
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    // const res = response.data;
    // const suggestedFilename = response.headers['x-suggested-filename'];
    // updateDisposableToken(response,store);
    //   if(res.errorCode !== undefined) {
    //     if (res.errorCode === 30002) {
    //       Message.info(res.tip);
    //     }
    //   }
    //   if(suggestedFilename!==undefined&&suggestedFilename!=='') {
    //     return response;
    //   }
    return response.data;
  },
  error => {

  }
);
export default service;
