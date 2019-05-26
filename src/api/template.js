import fetch from '@/utils/fetch';

const TEMPLATE = '/templates/';

function get() {
  return fetch({
    url: TEMPLATE,
    method: 'get'
  })
}

function post(template) {
  return fetch({
    url: TEMPLATE,
    method: 'post',
    headers: {"Content-Type": "multipart/form-data"},
    data: template
  })
}

export {
  get, post
}
