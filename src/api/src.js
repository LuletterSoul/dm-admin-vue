import fetch from '@/utils/fetch';

const SRC= '/src/';

function get() {
  return fetch({
    url:SRC,
    method: 'get'
  })
}

function post(srcImg) {
  return fetch({
    url:SRC,
    method: 'post',
    headers: {"Content-Type": "multipart/form-data"},
    data: srcImg
  })
}

export {
  get,post
}
