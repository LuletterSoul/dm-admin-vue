import Vue from "vue";
import Vuex from "vuex";
import { Toast } from "vant";

import photo from "./photo";
import video from "./video";

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    photo,
    video,
  },
  state: {
    showNav: true,
    process: [],
    undo: [],
    dataset: "",
    msg: {},
    sid: "",
    stylization: {
      synthesis_loading: false,
      synthesis_progress: 0,
      stylized_category: "original",
      stylized_timestamp: 0,
      stylization_id: -1,
    },
  },
  mutations: {
    changeNavStatus(state, status) {
      state.showNav = status;
    },
    clearStyle(state, val) {
      state.stylization.stylization_id = val;
    },
    setSynthesisLoading(state, status) {
      state.stylization.synthesis_loading = status;
    },
    SOCKET_connect() {
      console.log("建立Socket连接");
    },
    SOCKET_onConnected(state, msg) {
      state.sid = msg.sid;
    },
    SOCKET_onSynthesisCompleted(state, msg) {
      if (msg.sid !== state.sid) {
        return;
      }
      Toast.success({ message: "合成成功!" });
      state.stylization.synthesis_loading = false;
      state.stylization.stylization_id = msg.stylization_id;
      state.stylization.synthesis_progress = 0;
      state.stylization.stylized_timestamp = msg.timestamp;
      state.stylization.stylized_category = "original";
    },
    SOCKET_onSynthesisFailed(state, msg) {
      if (msg.sid !== state.sid) {
        return;
      }
      Toast.fail({ message: "合成失败!" });
      state.stylization.synthesis_loading = false;
      state.stylization.synthesis_progress = 0;
      state.stylization.stylized_timestamp = msg.timestamp;
      state.stylization.stylized_category = "original";
    },
    SOCKET_onSynthesising(state, msg) {
      if (msg.sid !== state.sid) {
        return;
      }
      // console.log(msg.percent);
      if (msg.percent <= 100) {
        state.stylization.synthesis_progress = msg.percent;
      } else {
        state.stylization.synthesis_progress = 100;
      }
    },
    SOCKET_onSynthesisingFetch(state, msg) {
      if (msg.sid !== state.sid) {
        return;
      }
      state.stylization.synthesis_progress = msg.percent;
      state.stylization.stylization_id = msg.stylization_id;
      state.stylization.stylized_timestamp = msg.timestamp;
      state.stylization.stylized_category = msg.category;
      state.msg = msg;
    },
  },
  actions: {},
});

export default store;
// export default new Vuex.Store({
//   modules: {
//     photo,
//   },
//   state: {
//     process: [],
//     undo: [],
//     dataset: "",
//   },
//   mutations: {},
//   actions: {},
// });
