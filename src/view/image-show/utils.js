import axios from "axios";

function get_content_ids(){
  axios({
    method: "get",
    url: "http://221.226.81.54:1212/api/contents",
    params: {
      page: 1,
      size: 1,
      category: 'COCO'
    }
  }).then(res=>{
    // console.log(res)
    return res.data.content_ids
  })
}

function get_img(content_id){
  axios({
    method: "get",
    url: "http://221.226.81.54:1212/api/contents/" + content_id,
    responseType: 'arraybuffer',
    params: {
      asAttachment: false,
      width: 512,
      height: 512,
      category: 'COCO',
    }
  }).then(res => {
    return res.data
  })
}

function download_img(data){
  var src='data:image/jpg;base64,'+ btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  var link = document.createElement('a');
  link.href = src;
  link.download = "qrCode.jpg";
  link.click();
}

function download(){
  alert('成功执行')
  var content_ids = get_content_ids()
  // var img_data = get_img(content_ids[0])
  // download_img(img_data)
}

export {
  download
}
