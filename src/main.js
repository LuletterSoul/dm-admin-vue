// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/styles/index.scss'
// import VueSocketIO from "vue-socket.io";
import ViewUI from 'view-design';
import 'viewerjs/dist/viewer.css'


import NProgress from 'nprogress'

NProgress.configure({showSpinner: false})// NProgress Configuration
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import 'view-design/dist/styles/iview.css';
import '@/assets/iconfont/iconfont'
import Viewer from 'v-viewer'

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io(process.env.SOCKET_API);

Vue.use(VueSocketIOExt, socket);

Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    "inline": true,
    "button": true,
    "navbar": true,
    "title": true,
    "toolbar": true,
    "tooltip": true,
    "movable": true,
    "zoomable": true,
    "rotatable": true,
    "scalable": true,
    "transition": true,
    "fullscreen": true,
    "keyboard": true,
    "url": "data-source"
  }
});

Vue.config.productionTip = false;
// Vue.use(VueI18n);
// Vue.use(VueLocalStorage, {namespace: '_dm_platform'});
//
// const i18n = new VueI18n({
//   locale: Vue.ls.get('locale') || 'zh-CN',
//   fallbackLocale: 'zh-CN',
//   messages: {
//     'zh-CN': {
//       ...zhLocaleIView,
//       ...zhLocale
//     },
//     'en': {
//       ...enLocaleIView,
//       ...enLocale
//     }
//   }
// });

// Vue.use(ViewUI, {
//   i18n: function (path, options) {
//     let value = i18n.t(path, options);
//     if (value !== null && value !== undefined) return value;
//     return ''
//   }
// });

// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     connection: process.env.SOCKET_API
//   })
// );


Vue.use(ViewUI)


Vue.mixin({
  data() {
    return {
      pageAnimated: false
    }
  },
  mounted() {
    this.pageAnimated = true
  }
});
const whiteList = ['/login', '/register'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  template: '<App/>',
  components: {App}
});
