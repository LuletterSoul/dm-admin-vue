import { axios_server } from "./base";
const baseURL = "/annotations";

function get(content_id) {
  return axios_server({
    url: `${baseURL}/${content_id}`,
    method: "get",
  });
}

function gets(pages) {
  return axios_server({
    url: `${baseURL}/`,
    method: "get",
    params: {
      ...pages,
    },
  });
}

function post(annotation) {
  return axios_server({
    url: `${baseURL}/`,
    method: "post",
    data: {
      ...annotation,
    },
  });
}

export { get, gets, post };
