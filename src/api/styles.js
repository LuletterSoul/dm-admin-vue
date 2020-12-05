import { axios_server } from "./base";
const baseURL = "/styles";

function get(style_id) {
  return axios_server({
    url: `${baseURL}/${style_id}`,
    method: "get",
  });
}

function gets(pages, category) {
  return axios_server({
    url: `${baseURL}/`,
    method: "get",
    params: {
      ...pages,
      category: category,
    },
  });
}

function post(style_img) {
  let form = new FormData();
  form.append("style_img", style_img);
  return axios_server({
    url: `${baseURL}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "post",
  });
}

export { get, gets, post };
