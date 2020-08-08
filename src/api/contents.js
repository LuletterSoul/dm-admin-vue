import fetch from '@/utils/fetch';

const baseURL = '/contents';

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

function post(content_img, progress) {
  let form = new FormData()
  form.append('content_img', content_img)
  return fetch({
    url: `${baseURL}`,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    method: 'post',
    onUploadProgress: progress
  })
}

export {
  get, gets, post
}
