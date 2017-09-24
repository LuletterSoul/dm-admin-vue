import HMAC_SHA256 from "crypto-js/hmac-sha256"
import SHA256 from "crypto-js/sha256"
import DecodeBase64 from "crypto-js/enc-base64";

//hash加密
export function computeEncryptPassword(submitPlain, publicSalt) {
  let encryptPassword = submitPlain + publicSalt;
    for(let i = 0;i<1000;i++) {
      encryptPassword = SHA256(encryptPassword);
    }
  return DecodeBase64.stringify(encryptPassword);
}

//生成消息摘要
export function digest(message,params) {
  let paramString = '';
  for(let i =0;i<params.length;++i) {
    paramString+=params[i];
  }
  return DecodeBase64.stringify(HMAC_SHA256(message, paramString));
}

export function clientDigest(encryptPassword,token,params) {
  let clientDigest = digest(token + encryptPassword, params);
  for(let i =0;i<1000;i++) {
    clientDigest = SHA256(clientDigest);
  }

  return DecodeBase64.stringify(clientDigest);
}
