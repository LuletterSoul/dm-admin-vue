import fetch from '@/utils/fetch';

const PROC = '/proc/';

function get(query) {
  return fetch({
    url: PROC,
    method: 'get',
    params: query
  })
}

function post(srcImg) {
  return fetch({
    url: PROC,
    method: 'post',
    headers: {"Content-Type": "multipart/form-data"},

    data: srcImg
  })
}

export {
  get, post
}
