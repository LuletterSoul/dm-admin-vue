import fetch from '@/utils/fetch';

const baseURL = '/annotations';

function get(content_id) {
  return fetch({
    url: `${baseURL}/${content_id}`,
    method: 'get'
  })
}


function gets(pages) {
  return fetch({
    url: `${baseURL}/`,
    method: 'get',
    params: {
      ...pages
    }
  })
}

function post(annotation) {
  return fetch({
    url: `${baseURL}/`,
    method: 'post',
    data: {
      ...annotation
    }
  })
}

export {
  get, gets, post
}
