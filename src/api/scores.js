import { axios_server } from "./base";
const SCORES = "/scores";

function get_score_types() {
  return axios_server({
    url: "/score_types",
    method: "get",
  });
}

function post(user_id, scores) {
  return axios_server({
    url: `${SCORES}`,
    method: "post",
    data: {
      user_id: user_id,
      scores: scores,
    },
  });
}

export { post, get_score_types };
