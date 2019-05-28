import fetch from '@/utils/fetch';

const RESULT = '/results/';

function get() {
  return fetch({
    url: RESULT,
    method: 'get'
  })
}

function post(srcId, srcIds, ptRegAlgType, enableFitting) {
  return fetch({
    url: RESULT,
    method: 'post',
    data: {
      ptRegAlgType: ptRegAlgType,
      enableFitting: enableFitting,
      srcId: srcId,
      srcIds: srcIds
    }
  })
}

export {
  get, post
}
