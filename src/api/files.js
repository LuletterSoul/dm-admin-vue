import fetch from '@/utils/fetch';

const FILES = '/files';

function get() {
  return fetch({
    url: FILES,
    method: 'get'
  })
}

function user_study() {
  return fetch({
    url: `/user_study`,
    method: 'get'
  })
}

function photos(content, filename) {
  return fetch({
    url: `/photos`,
    method: 'get',
    params: {
      content: content,
      filename: filename
    }
  })
}


export {
  user_study, photos
}
