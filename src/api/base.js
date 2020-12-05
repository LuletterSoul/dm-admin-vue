import axios from "axios";
// 创建axios实例

console.log(process.env.VUE_APP_API_URL);

const axios_server = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // api的base_url
  // timeout: 20000                  // 请求超时时间
});
axios_server.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// respone拦截器
axios_server.interceptors.response.use((response) => {
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
});
export { axios_server };
