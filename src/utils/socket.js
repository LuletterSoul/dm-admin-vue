import * as SockJS from 'sockjs-client'
import * as Stomp from '@stomp/stompjs'

let stompClient = null;

function initWebSocket(userId){ //初始化weosocket
  //ws地址
  const wsuri = process.env.WS_API;
  let websock = new SockJS(wsuri);
  stompClient = Stomp.over(websock);
  let headers = {
    userId: userId
  };
  stompClient.connect(headers, onConnected,onError);
}

function onError(frame) {
  console.log("Error :", frame);
}

function onConnected(){
  console.log("连接成功");
  let topic = "/topic/messages";
  stompClient.subscribe(topic, this.onMessage);
  let msg = {
    from: "Vue",
    text: "I am Vue",
    time: ''
  };
  sendMsg('/app/chat', {}, JSON.stringify(msg));
}

function subscribe(topic, callback) {
  console.log("订阅推送地址:", topic);
  return stompClient.subscribe(topic, callback);
}

function sendMsg(des,headers,msg) {
  console.log("发送消息:", msg);
  stompClient.send(des,headers,msg)
}

export {
  subscribe,
  sendMsg,
  initWebSocket
};
