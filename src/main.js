// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import '@/assets/iconfont/iconfont'
import 'animate.css'
import vueWaves from './directive/waves';// 水波纹指令
import Velocity from 'velocity-animate/velocity'
import VelocityUI from 'velocity-animate/velocity.ui'
import IconSvg from '@/components/Icon-svg/index.vue'
import {getToken} from '@/utils/auth'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
// var Velocity = require('velocity-animate');
// require('velocity-animate/velocity.ui');
window.Velocity = window.velocity = Velocity;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component('icon-svg', IconSvg);
Vue.component('sweet-modal', SweetModal);
Vue.component('sweet-modal-tab', SweetModalTab);
Vue.use(vueWaves);

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'});
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.userProfile.roles;
          store.dispatch('GenerateRoutes', {roles}).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({...to});
          })
        })
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
