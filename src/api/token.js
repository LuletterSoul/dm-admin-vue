import token from '@/utils/token';

export function getToken(username) {
  return token({
    url:'/tokens/'+username,
    method:'get'
  })
}


export function getPublicSalt(username) {
  return token({
    url:'/public_salts/'+username,
    method:'get'
  })
}

export function deleteToken() {
  return token({
    url: '/tokens/',
    method: 'delete'
  });
}

export function createStuAccount(student) {
  return token({
    url:'/stu_accounts',
    method:'post',
    data:student
  })
}

export function createStuUsername(username) {
  return token({
    url:'/stu_accounts',
    method:'get',
    params:{username:username}
  })
}
