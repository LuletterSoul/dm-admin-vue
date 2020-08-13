import fetch from '@/utils/fetch';

const baseURL = '/stylizations';

function get(stylized_id) {
  return fetch({
    url: `${baseURL}/${stylized_id}`,
    method: 'get'
  })
}


function post(content_id, style_id, alg, content_mask = null, style_mask = null) {
  // let form = new FormData()
  // form.append('content_mask', content_mask)
  // form.append('style_mask', style_mask)
  return fetch({
    url: `${baseURL}/`,
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    // params: {
    // },
    data: {
      content_id: content_id,
      style_id: style_id,
      alg: alg,
      content_mask: content_mask,
      style_mask: style_mask
    },
    method: 'post',
  })
}

export {
  get, post
}
