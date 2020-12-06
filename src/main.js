import Vue from "vue";
import App from "./App";
import { router } from "./router";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";

import * as api from "./api";

Vue.prototype.api = api;

Vue.use(Vant);

import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

import vueMiniPlayer from 'vue-mini-player'
import 'vue-mini-player/lib/vue-mini-player.css'
Vue.use(vueMiniPlayer)

new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
});
