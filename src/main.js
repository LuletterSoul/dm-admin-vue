import Vue from "vue";
import App from "./App";
import { router } from "./router";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";

import * as api from "./api";

Vue.prototype.api = api;

Vue.use(Vant);

new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
});
