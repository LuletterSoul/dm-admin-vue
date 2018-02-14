import axios from 'axios';
import {Message} from 'element-ui';
import store from '../store';
import {formatDate} from "./compute"
import { getCookiesToken,
  setCookiesToken,
  removeCookiesToken,
  wrapApplyToken,
  wrapAccessCredentials,
  wrapClientDigest,
  updateDisposableToken
} from '@/utils/auth';
import {getUsername} from "./auth";

var decodeBase64 = require("crypto-js/enc-base64");

//单独提供令牌申请服务
const tokenService = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 5000
});

// function wrapApplyToken(config) {
//   config.headers['X-timestamp'] = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
//   config.headers['X-Username'] = store.getters.username;
//   config.headers['X-Apply-Credential'] = store.getters.applyCredential;
// }

// request拦截器
tokenService.interceptors.request.use(config => {
  wrapApplyToken(config,store);
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
});

// response拦截器
tokenService.interceptors.response.use(
  response => {
    updateDisposableToken(response,store);
    const res = response.data;
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
        Message.error(errorRes.tip);
      }
      else if (errorRes.errorCode === 50000) {
        Message.warning(errorRes.tip);
      }
      else if(errorRes.errorCode ===60001) {
        location.reload();
        Message.error(errorRes.tip);
      }
      return Promise.reject(errorRes);
    }
  }
);
export default tokenService;
