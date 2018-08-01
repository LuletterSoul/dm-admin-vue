import fetch from '@/utils/fetch';
const RESULT_BASE_PATH = '/results';
export function getResults(query) {
  return fetch({
    url:RESULT_BASE_PATH,
    method:'get',
    params:query
  })
}

export function createResult(result) {
  return fetch({
    url:RESULT_BASE_PATH,
    method:'post',
    data:result
  })
}

export function uploadResult(resultId,file) {
  return fetch({
    url:RESULT_BASE_PATH.concat('/').concat(resultId).concat('/records'),
    method:'post',
    headers:{"Content-Type":"multipart/form-data"},
    data: file
  })
}


export function downloadResult(recordIds,callback) {
  return fetch({
    url:RESULT_BASE_PATH.concat('/records'),
    method:'post',
    data:recordIds,
    responseType:'blob',
    onDownloadProgress: function (progressEvent) {
      if(progressEvent.lengthComputable){
        //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
        //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
        callback(progressEvent);
      }
    },
  })
}





