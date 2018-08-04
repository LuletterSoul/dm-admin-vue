import fetch from '@/utils/fetch';
function fetchAlgorithms() {
  return fetch({
    url:'/algorithms',
    method:'get'
  })
}

export {
  fetchAlgorithms
}
