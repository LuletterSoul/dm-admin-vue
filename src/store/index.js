import Vue from "vue";
import Vuex from "vuex";

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
  },
  mutations: {
    changeNavStatus(state, status) {
      state.showNav = status;
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
