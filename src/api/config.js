import fetch from '@/utils/fetch';

const CONFIG= '/configs/';

function get() {
  return fetch({
    url:CONFIG,
    method: 'get'
  })
}

function post(config) {
  return fetch({
    url: CONFIG,
    method: 'post',
    headers: {"Content-Type": "multipart/form-data"},
    data: config
  })
}

export {
  get,post
}
