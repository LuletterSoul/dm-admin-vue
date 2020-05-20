import fetch from '@/utils/fetch';

const SCORES = '/scores';

function get() {
  return fetch({
    url: SCORES,
    method: 'get'
  })
}

function post(user_id, scores) {
  return fetch({
    url: `${SCORES}`,
    method: 'post',
    data: {
      user_id: user_id,
      scores: scores
    }
  })
}

export {
  post
}
