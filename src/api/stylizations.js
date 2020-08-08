import fetch from '@/utils/fetch';

const baseURL = '/styles';

function get(stylized_id) {
  return fetch({
    url: `${baseURL}/${stylized_id}`,
    method: 'get'
  })
}


function post(content_id, style_id, content_mask, style_mask) {
  let form = new FormData()
  form.append('content_mask', content_mask)
  form.append('style_mask', style_mask)
  return fetch({
    url: `${baseURL}`,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: {
      content_id: content_id,
      style_id: style_id
    },
    method: 'post',
  })
}

export {
  get, post
}
