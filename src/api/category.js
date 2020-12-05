import { axios_server } from "./base";

const baseURL = "/category";

function get(content_id) {
  return axios_server({
    url: `${baseURL}/${content_id}`,
    method: "get",
  });
}

function gets() {
  return axios_server({
    url: `${baseURL}/`,
    method: "get",
  });
}

export { get, gets };
