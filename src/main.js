import Vue from "vue";
import App from "./App";

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import { router } from "./router";
import store from "./store";

import Vant from "vant";
import { Lazyload } from "vant";
import "vant/lib/index.css";

import * as api from "./api";

import VideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";

Vue.use(VideoPlayer);

Vue.prototype.api = api;

Vue.use(Vant);
Vue.use(Lazyload, {
  lazyComponent: true,
  listenEvents: [
    "scroll",
    "wheel",
    "mousewheel",
    "resize",
    "animationend",
    "transitionend",
  ],
});

// const socket = io(process.env.VUE_APP_SOCKET_URL);

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(process.env.VUE_APP_SOCKET_URL), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
});
