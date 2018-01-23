import fetch from '@/utils/fetch';


export function update(newProfile) {
  return fetch({
    url: '/user',
    method: 'put',
    data: newProfile
  });
}

export function getUserInfo(username) {
  return fetch({
    url:'/user/'+username,
    method:'get'
  })
}

export function getUserRoles(username) {
  return fetch({
    url:'/user/'+username+'/roles',
    method:'get'
  })
}
