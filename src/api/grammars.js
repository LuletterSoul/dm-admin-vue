import fetch from '@/utils/fetch';

export function fetchGrammars() {
  return fetch({
    url:'/grammars',
    method:'get'
  })
}
