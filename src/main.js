import Vue from "vue";
import App from "./App";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import { router } from "./router";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";

import * as api from "./api";

const socket = io(process.env.VUE_APP_SOCKET_URL);

Vue.prototype.api = api;

Vue.use(Vant);

Vue.use(VueSocketIOExt, socket);

new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
});
