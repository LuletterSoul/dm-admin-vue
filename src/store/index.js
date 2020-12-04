import Vue from "vue";
import Vuex from "vuex";

import photo from "./photo";

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    photo,
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
