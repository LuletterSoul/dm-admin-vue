import { axios_server } from "./base";
const VIDEOS = "/videos";

function get(date, channel, v_id) {
  return axios_server({
    url: `${VIDEOS}/${date}/${channel}/${v_id}`,
    method: "get",
  });
}

export { get };
