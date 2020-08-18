import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store';
// import {Notification} from 'element-ui';
// import NProgress from 'nprogress'

const _import = require('./_import_' + process.env.NODE_ENV);
import StyleTransfer from '../views/sast/index'
import Annotator from '../views/Annotator'
import PageNotFound from "../views/PageNotFound";


Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  // {path: '/login', component: _import('login/index'), hidden: true},
  // {path: '/register', component: _import('register/index'), hidden: true},
  {
    path: '/',
    redirect: '/sast'
  },
  {
    path: '/sast',
    component: StyleTransfer,
    name: 'sast'
  },
  {
    path: '/annotate/:identifier',
    name: "annotate",
    component: Annotator,
    props: route => ({identifier: route.params.identifier, img_type: route.query.type, category: route.query.category})
  },
  {path: "*", component: PageNotFound}
];

export default new Router({
  mode: 'history', //后端支持可开
  // base: '/sast',
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {},
  {path: '*', redirect: '/404', hidden: true}
];
