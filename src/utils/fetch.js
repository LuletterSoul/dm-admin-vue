import axios from 'axios';
import {Message,MessageBox} from 'element-ui';
import store from '../store';
import { getCookiesToken,
          setCookiesToken,
          removeCookiesToken,
          wrapApplyToken,
          wrapAccessCredentials,
          wrapClientDigest,
          updateDisposableToken
       } from '@/utils/auth';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.SERVER_API, // api的base_url
  // timeout: 20000                  // 请求超时时间
});
let requestCount = 1;
let awaitNewDisposableToken = false;
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
        wrapAccessCredentials(config, store.getters.username);
        wrapClientDigest(config, store.getters.disposableToken);
        console.log("Send request:",requestCount,"Disposable Token:",store.getters.disposableToken,)
  return config;
}, error => {
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
      if(res.errorCode !== undefined) {
        if(res.errorCode=== 50004 || res.errorCode === 50010) {
          Message.error(res.tip);
        }
        else if(res.errorCode === 50005){
          Message.error(res.tip);
          return new Promise((resolve,reject) =>{
            reject(res.errorCode);
          })
        }
        else if(res.errorCode === 50006) {
          store.dispatch('LogOut').then(() => {
            location.reload();
            Message.warning(res.tip,);
          });
        }
        else if(res.errorCode ===50000) {
          Message.warning(res.tip);
        }
      }
      console.log("Receive repose :",requestCount,". Receive new token:",response.headers['x-disposable-token']);
    requestCount++;
    updateDisposableToken(response,store);
    return response.data;
  },
  error => {
    let errorRes = error.response.data;
    console.log(errorRes);
    if (errorRes.errorCode !== undefined) {
      if (errorRes.errorCode === 50002) {
        Message.confirm(errorRes.tip, '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        })
      }
      else if (errorRes.errorCode === 50004 || errorRes.errorCode === 50010 || errorRes.errorCode === 50005) {
        Message.error(errorRes.tip);
      }
      else if (errorRes.errorCode === 50006) {
        store.dispatch('LogOut').then(() => {
          location.reload();
          Message.warning({message:errorRes.tip,showClose: true,duration:0});
        });
      }
      else if(errorRes.errorCode === 50011){
        location.reload();
        Message.warning(errorRes.tip);
      }
      else if (errorRes.errorCode === 50000) {
        Message.warning(errorRes.tip);
      }
      return Promise.reject(errorRes);
    }
  }
);
export default service;
