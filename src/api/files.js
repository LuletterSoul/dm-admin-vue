import { axios_server } from "./base";
const FILES = "/files";

export const get = function get() {
  return axios_server({
    url: FILES,
    method: "get",
  });
};

export const user_study = function user_study() {
  return axios_server({
    url: `/user_study`,
    method: "get",
  });
};

export const photos = function photos(content, filename) {
  return axios_server({
    url: `/photos`,
    method: "get",
    params: {
      content: content,
      filename: filename,
    },
  });
};

// export { get, user_study, photos };
