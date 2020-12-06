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
    process: [],
    undo: [],
    dataset: "",
  },
  mutations: {},
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
