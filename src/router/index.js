import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import {Notification} from 'element-ui';
import NProgress from 'nprogress'

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

Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path:'/register',component: _import('register/index'),hidden:true},
  {path: '/404', component: Err404, hidden: true},
  {
    path: '/',
    component: Layout, Dashboard,
    redirect: '/home/index',
    icon: 'home',
    noDropdown: true,
    children: [
      {
        path: 'home/index', component: _import('dashboard/index'), name: '主页'
      }
    ]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  base:'/data_mining_platform/',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/collection',
    component: Layout,
    redirect: '/collection/digest',
    name: '数据管理模块',
    icon: 'folder',
    children: [
      {
        path: 'digest', component: _import('datasets/digest'), name: '集合摘要', icon: 'survey',meta:{role:['admin','teacher','student']}
      },
      {
        path: 'new', component: _import('datasets/upload'), name: '新增集合', icon: 'folder',meta:{role:['admin','teacher']}
      },
      {
        path: 'management', component: _import('datasets/edit'), name: '集合管理', icon: 'color-filling',meta:{role:['admin','teacher']}
      },
      {
        path: 'set_detail', component: _import('datasets/detail'), name: '数据集详情', icon: 'survey1', hidden: true,meta:{role:['admin','teacher']}
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    hidden: true,
    children: [
      {
        path: 'index', component: _import('user/index'), name: '用户'
      },
      {
        path: 'update', component: _import('user/update'), name: '资料更新'
      }
    ],
    meta:{role:['admin','teacher','student']}
  },
  {
    path: '/students',
    component: Layout,
    redirect: '/students/index',
    name: '学生管理模块',
    icon: 'bussinessman',
    children: [
      // {
      //   path: 'index',component: _import('students/index'),name: '概览',icon:'survey1'
      // },
      {
        path: 'list',
        component: _import('students/list'),
        name: '学生概要',
        icon: 'group'
      },
      {
        path: 'import', component: _import('students/import'), name: 'Excel导入', icon: 'exl'
      }
    ],
    meta:{role:['admin','teacher']}
  },
  {
    path: '/groups',
    component: Layout,
    redirect: '/groups/index',
    name: '分组管理模块',
    icon: 'group',
    children: [
      {
        path: 'list',
        component: _import('groups/list'),
        name: '分组概要',
        icon: 'information'
      },
      {
        path: 'details',
        component: _import('groups/details'),
        name: '队伍详情',
        icon: 'more',
      },
      {
        //注意此种写法,使用相对路由的写法会导致到跨路由跳跃时的404,应该补全前一级路由
        path: '/groups/divide',
        component: _import('groups/divide/divideLayout'),
        redirect: '/groups/divide/resource',
        name: '一键分组',
        icon: 'addpeople',
        children: [
          {
            path: 'resource',
            component: _import('groups/divide/resource'),
            name: '人力资源',
            icon: 'icon41',
          },
          {
            path: 'setting',
            component: _import('groups/divide/setting'),
            name: '分组配置',
            icon: 'icon42',
            beforeEnter: (to, from, next) => {
              const t = store.getters.previewGroups.dataMiningGroups;
              if (t !== undefined &&t.length) {
                Notification({
                  title: '历史',
                  message: '你有历史的‘一键分组’操作未完成,使用本页面功能会覆盖之前的记录。',
                  type: 'info'
                });
              }
              next();
              NProgress.done();
            },
          },
          {
            path: 'preview',
            component: _import('groups/divide/preview'),
            name: '分组预览',
            icon: 'icon43',
            beforeEnter: (to, from, next) => {
              if (store.getters.previewGroups.dataMiningTask === ''
                  &&!store.getters.previewGroups.dataMiningGroups.length) {
                Notification({
                  title: '无效预览',
                  message: '请先填写分组参数,执行‘预览’操作。',
                  type: 'warning'
                });
                next('/groups/divide/setting');
              }else{
                next();
              }
              NProgress.done();
            }
          },
          {
            path: 'manual',
            component: _import('groups/divide/manualOptimization'),
            name: '手动调优',
            icon: 'icon44',
          }
        ]
      },
      {
        path:'new',
        component:_import('groups/new'),
        name:'新增历史',
        icon:'history'
      }
    ],
    meta:{role:['admin','teacher']}
  },
  {
    path: '/tasks',
    component: Layout,
    redirect: '/tasks/list',
    name: "任务管理模块",
    icon: 'task-management',
    children: [
      {
        path:'list',component:_import('tasks/list'),name:'任务概要',icon: 'survey1',meta:{role:['admin','teacher']}
      },
      {
        path: 'create', component: _import('tasks/create'), name: '新建任务', icon: 'home',meta:{role:['admin','teacher']}
      },
      {
        path: 'tracking', component: _import('tasks/tracking'), name: '任务追踪', icon: 'home',hidden: true,meta:{role:['admin','teacher']}
      },
      {
        path: 'detail', component: _import('tasks/detail'), name: '任务信息', icon: 'home',hidden:true,meta:{role:['admin','teacher']}
      },
      {
        path: 'stulist', component: _import('tasks/stulist'), name: '任务概要', icon: 'home',meta:{role:['student']}
      },
      {
        path: 'stutask', component: _import('tasks/stutask'), name: '任务信息', icon: 'home',hidden:true,meta:{role:['student']}
      }
    ]
  },
  {
    path: '/dm',
    component: Layout,
    redirect: '/dm/index',
    name: "数据挖掘模块",
    icon: 'machinery',
    children: [
      {
        path:'index',component:_import('datamining/index'),name:'导入数据',icon: 'exl',meta:{role:['admin','teacher','student']}
      },
      {
        path:'/dm/understand',component:_import('datamining/understand/index'),name:'数据理解',icon: 'lights',
        redirect: '/dm/understand/reg',
        children: [
          {
            path:'density',component:_import('datamining/understand/density'),name:'密度分析',icon: 'libra',meta:{role:['admin','teacher','student']}
          },
          {
            path:'reg',component:_import('datamining/understand/regression'),name:'回归分析',icon: 'data', meta:{role:['admin','teacher','student']}
          },
          {
            path:'corr',component:_import('datamining/understand/corr'),name:'关联分析',icon: 'process', meta:{role:['admin','teacher','student']}
          },
        ],
        meta:{role:['admin','teacher','student']
        }
      },
    ],
    meta:{role:['admin','teacher','student']}
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
  {path: '*', redirect: '/404', hidden: true}
];
