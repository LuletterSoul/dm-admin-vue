import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');

/* dashboard */
const Dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('404');

/* demo page */
const Form = _import('page/form');
const Table = _import('table/index');

Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: Err404, hidden: true },
   {
     path: '/',
     component: Layout,Dashboard,
     redirect: '/home/index',
     icon: 'home',
     noDropdown:true,
     children:[
       {
         path:'home/index',component:_import('dashboard/index'),name: 'Home'
       }
     ]
   }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/dataSet',
    component: Layout,
    redirect: '/dataSet/index',
    name: 'Data Sets',
    icon: 'data' ,
    children:[
    {
      path: 'index', component: _import('datasets/index'),name: '摘要',icon: 'survey'
    },
    {
      path: 'upload', component: _import('datasets/upload'),name: '上传',icon:'folder'
    },
      {
        path: 'edit', component: _import('datasets/edit'),name: '编辑',icon:'color-filling'
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    hidden: true,
    children:[
      {
        path: 'index',component: _import('user/index'),name: '用户'
      },
      {
        path: 'update',component:_import('user/update'),name: '资料更新'
      }
    ]
  },
  {
    path:'/students',
    component: Layout,
    redirect: '/students/index',
    name: 'Students',
    icon: 'bussinessman',
    children:[
      {
        path: 'index',component: _import('students/index'),name: '概览',icon:'survey1'
      },
      {
        path:'list',component:_import('students/list'),name: '学生列表',icon:'group'
      }
    ]
  },
  {
    path: '/tasks',
    component: Layout,
    redirect: '/tasks/index',
    name:"Data Mining Tasks",
    icon: 'task-management',
    children: [
      {
        path: 'index',component: _import('tasks/index')
      }
    ]
  },
  {
    path:'/algorithm',
    component: Layout,
    redirect:'/algorithm/index',
    name:"Algorithm Stock",
    icon:'raw',
    children:[
      {
        path:'index',component:_import('algorithm/index'),name:'算法列表',icon:'Calculator'
      }
    ]
  },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/index',
  //   name: 'Table',
  //   icon: 'tubiaoleixingzhengchang',
  //   noDropdown: true,
  //   children: [{ path: 'index', component: Table, name: 'Table', meta: { role: ['admin'] } }]
  // },
  { path: '*', redirect: '/404', hidden: true }
];
