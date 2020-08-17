import fetch from '@/utils/fetch';

const baseURL = '/category';

function get(content_id) {
  return fetch({
    url: `${baseURL}/${content_id}`,
    method: 'get'
  })
}


function gets() {
  return fetch({
    url: `${baseURL}/`,
    method: 'get',
  })
}


export {
  get, gets
}
