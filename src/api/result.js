import fetch from '@/utils/fetch';

const RESULT = '/results/';

function get() {
  return fetch({
    url: RESULT,
    method:'get'
  })
}

function post(srcId) {
  return fetch({
    url:RESULT,
    method:'post',
    data:{
      srcId:srcId
    }
  })
}

export {
  get,post
}
