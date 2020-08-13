import Vue from 'vue';
import Vuex from 'vuex';
// import app from './modules/app';
// import user from './modules/user';
// import permission from './modules/permission';
// import tagsView from './modules/tagsView';
// import group from './modules/group';
// import task from './modules/task';
// import student from './modules/student';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // app,
    // user,
    // tagsView,
    // permission,
    // group,
    // task,
    // student
  },
  state: {
    process: [],
    undo: [],
    dataset: ""
  },
  mutations: {
    setDataset(state, dataset) {
      state.dataset = dataset;
    },
    addProcess(state, process) {
      state.process.push(process);
    },
    removeProcess(state, process) {
      let index = state.process.indexOf(process);
      if (index > -1) {
        state.process.splice(index, 1);
      }
    },
    resetUndo(state) {
      state.undo = [];
    },
    addUndo(state, action) {
      state.undo.push(action);
    },
    undo(state) {
      let action = state.undo.pop();
      if (action != null) {
        action.undo();
      }
    },
    removeUndos(state, action) {
      state.undo = state.undo.filter(undo => undo.action !== action);
    }
  },
  actions: {},
  getters
});

export default store
