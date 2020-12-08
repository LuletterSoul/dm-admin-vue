import { axios_server } from "./base";
const baseURL = "/stylizations";

function get(stylized_id) {
  return axios_server({
    url: `${baseURL}/${stylized_id}`,
    method: "get",
  });
}

function post(
  content_id,
  style_id,
  alg,
  sid,
  content_category,
  style_category,
  content_mask = null,
  style_mask = null,
  width = 512,
  height = 512
) {
  // let form = new FormData()
  // form.append('content_mask', content_mask)
  // form.append('style_mask', style_mask)
  return axios_server({
    url: `${baseURL}/`,
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    // params: {
    // },
    data: {
      content_id: content_id,
      style_id: style_id,
      alg: alg,
      content_mask: content_mask,
      style_mask: style_mask,
      width: width,
      height: height,
      sid: sid,
      style_category: style_category,
      content_category: content_category,
    },
    method: "post",
  });
}

export { get, post };
