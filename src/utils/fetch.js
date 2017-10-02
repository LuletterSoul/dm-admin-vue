import axios from 'axios';
import {Message} from 'element-ui';
import store from '../store';
// import {getToken} from '@/utils/auth';
import {getUsername} from "./auth";
import { clientDigest } from "./compute"
import { getToken } from  "@/api/login"
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 20000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    const username = store.getters.username;
    //每次请求发送前都需要申请一次token认证服务;
    return new Promise((resolve, reject) => {
      return store.dispatch('GetToken', username).then((certificate) => {
      config.headers['X-timestamp'] = new Date().Format('yyyy-MM-dd HH:mm:ss');
      config.headers['Username'] = username;
      config.headers['X-ApiKey'] = certificate.apiKey;
      if (config.params === undefined) {
        config['params'] = {};
      }
      config.params['username'] = username;
      config.params['clientDigest'] = clientDigest(store.getters.password, certificate.token, config.params);
      resolve(config);
    }).catch(error =>{
        reject(error);
      });
  });
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.data,
    //     type: 'error',
    //     duration:2 * 1000
    //   });
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload();// 为了重新实例化vue-router对象 避免bug
    //       });
    //     })
    //   }
    //   return Promise.reject('error');
    // } else {
    return response.data;
    // }
  },
  error => {
    console.log('err' + error);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

export default service;
