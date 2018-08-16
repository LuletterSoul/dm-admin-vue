import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import tagsView from './modules/tagsView';
import group from './modules/group';
import task from './modules/task';
import student from './modules/student';
import getters from './getters';
import socket from './modules/socket'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission,
    group,
    task,
    socket,
    student
  },
  getters
});

export default store
