import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token';

const Username = "username";

const TimeOutToken = "timeOutToken";

const EncryptPassword = "encryptPassword";

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAccountInfo(accountInfo) {
  Cookies.set(Username, accountInfo);
}

export function getAccountInfo() {
  Cookies.get(Username)
}

export function setUsername(username) {
  Cookies.set(Username, username);
}

export function getUsername() {
  let username =Cookies.get(Username);
  if(username===undefined){
    return null;
  }
  return username;
}

export function setTimeOutToken(timeOutToken) {
  Cookies.set(TimeOutToken, timeOutToken);
}

export function getTimeOutToken() {
  Cookies.get(TimeOutToken);
}

export function setEncryptPassword(encryptPassword) {
  Cookies.set(EncryptPassword, encryptPassword);
}
export function getEncryptPassword() {
  Cookies.get(EncryptPassword);
}


