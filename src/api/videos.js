import fetch from '@/utils/fetch';

const VIDEOS = '/videos';

function get(date, channel, v_id) {
  return fetch({
    url: `${VIDEOS}/${date}/${channel}/${v_id}`,
    method: 'get'
  })
}


export {
  get
}
