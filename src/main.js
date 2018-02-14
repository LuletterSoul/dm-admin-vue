// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import iViews from 'iview';
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
import 'iview/dist/styles/iview.css';    // 使用 CSS
import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
import { getCookiesToken, setCookiesToken, removeCookiesToken} from '@/utils/auth';
window.Velocity = window.velocity = Velocity;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(iViews);
Vue.component('icon-svg', IconSvg);
Vue.component('sweet-modal', SweetModal);
Vue.component('sweet-modal-tab', SweetModalTab);
Vue.use(vueWaves);

// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   if (getUsername()&&store.getters.password) {
//     if (to.path === '/login') {
//       next({path: '/'});
//     } else {
//       if (store.getters.roles.length === 0) {
//         store.dispatch('GetInfo',getUsername()).then(() => {
//           store.dispatch('GetUserRoles',getUsername()).then(result =>{
//             store.dispatch('GenerateRoutes', {roles: result}).then(() => {
//               router.addRoutes(store.getters.addRouters);
//               next({...to});
//           })
//           })
//         })
//       } else {
//         next();
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next('/login');
//       NProgress.done();
//     }
//   }
// });
const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  // removeCookiesToken();
  if (getCookiesToken()) {
    if (to.path === '/login') {
      next({path: '/'});
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then((res) => {
            store.dispatch('GenerateRoutes', {roles: res.roles}).then(() => {
              router.addRoutes(store.getters.addRouters);
              next({...to});
          })
        }).catch(err=>{
          // console.log(err);
        })
      }
      else {
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
