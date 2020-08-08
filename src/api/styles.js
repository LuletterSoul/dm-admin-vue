import fetch from '@/utils/fetch';

const baseURL = '/styles';

function get(style_id) {
  return fetch({
    url: `${baseURL}/${style_id}`,
    method: 'get'
  })
}

function gets(pages) {
  return fetch({
    url: `${baseURL}`,
    method: 'get',
    params: {
      ...pages
    }
  })
}

function post(style_img) {
  let form = new FormData()
  form.append('style_img', style_img)
  return fetch({
    url: `${baseURL}`,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    method: 'post',
  })
}

export {
  get, gets, post
}
