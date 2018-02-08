import fetch from '@/utils/fetch';
import token from '@/utils/token';
import {getUsername} from "../utils/auth";
export function login(email, password) {
  return fetch({
    url: '/users/login',
    method: 'post',

    data: {
      email,
      password,
    }
  });
}

export function getToken(username) {
  return token({
    url:'/users/'+username+'/token',
    method:'get'
  })
}


export function getPublicSalt(username) {
  return token({
    url:'/users/'+username+'/public_salt',
    method:'get'
  })
}

export function getUserInfo(username) {
  return fetch({
    url:'/users/'+username,
    method:'get'
  })
}

export function getUserRoles(username) {
  return fetch({
    url:'/users/'+username+'/roles',
    method:'get'
  })
}

export function logout() {
  return fetch({
    url: '/users/logout',
    method: 'post'
  });
}



