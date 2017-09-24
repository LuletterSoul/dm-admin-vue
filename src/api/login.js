import fetch from '@/utils/fetch';
import token from '@/utils/token';
import {getUsername} from "../utils/auth";
export function login(email, password) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      email,
      password,
    }
  });
}

export function getToken(username) {
  return token({
    url:'/user/'+username+'/token',
    method:'get'
  })
}

// export function getInfo(token) {
//   return fetch({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   });
// }

export function getPublicSalt(username) {
  return token({
    url:'/user/'+username+'/publicSalt',
    method:'get'
  })
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

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  });
}



