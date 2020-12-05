import { axios_server } from "./base";

const baseURL = "/contents";

export const get = (content_id) => {
  return axios_server({
    url: `${baseURL}/${content_id}`,
    method: "get",
  });
};

export const gets = (pages, category) => {
  return axios_server({
    url: `${baseURL}/`,
    method: "get",
    params: {
      ...pages,
      category,
    },
  });
};

export const post = (content_img, progress) => {
  let form = new FormData();
  form.append("content_img", content_img);
  return axios_server({
    url: `${baseURL}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "post",
    onUploadProgress: progress,
  });
};

// export { get, gets, post };
