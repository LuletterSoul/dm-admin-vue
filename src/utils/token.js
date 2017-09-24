import axios from 'axios';
import {Message} from 'element-ui';
import store from '../store';
import {getUsername} from "./auth";

var decodeBase64 = require("crypto-js/enc-base64");

//单独提供令牌申请服务
const tokenService = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 5000
});

// request拦截器
tokenService.interceptors.request.use(config => {
  config.headers['X-timestamp'] = new Date().Format('yyyy-MM-dd hh:mm:ss');
  config.headers['Username'] = store.getters.username;
  return config;
}, error => {
  Promise.reject(error);
});

// response拦截器
tokenService.interceptors.response.use(
  response => {
    const res = response.data;
    return response.data;
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

export default tokenService;
