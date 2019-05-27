import fetch from '@/utils/fetch';

const RESULT = '/results/';

function get() {
  return fetch({
    url: RESULT,
    method: 'get'
  })
}

function post(srcId, srcIds) {
  return fetch({
    url: RESULT,
    method: 'post',
    data: {
      srcId: srcId,
      srcIds: srcIds
    }
  })
}

export {
  get, post
}
