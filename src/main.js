// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/styles/index.scss'

import iView from 'iview';
import VueI18n from 'vue-i18n'
import enLocale from './locale/en'
import zhLocale from './locale/zh-CN'
import zhLocaleIView from 'iview/dist/locale/zh-CN'
import enLocaleIView from 'iview/dist/locale/en-US'
import VueLocalStorage from 'vue-ls'


import NProgress from 'nprogress'
NProgress.configure({showSpinner: false})// NProgress Configuration
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import '@/assets/iconfont/iconfont'
import 'animate.css'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'


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
Vue.use(VueI18n);
Vue.use(VueLocalStorage, {namespace: '_dm_platform'});

const i18n = new VueI18n({
  locale: Vue.ls.get('locale') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      ...zhLocaleIView,
      ...zhLocale
    },
    'en': {
      ...enLocaleIView,
      ...enLocale
    }
  }
});

Vue.use(iView, {
  i18n: function (path, options) {
    let value = i18n.t(path, options);
    if (value !== null && value !== undefined) return value;
    return ''
  }
});


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
  i18n,
  template: '<App/>',
  components: {App}
});
