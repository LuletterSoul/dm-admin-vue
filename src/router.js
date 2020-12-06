import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "*",
    redirect: "/home",
  },
  {
    name: "home",
    path: "/home",
    component: () => import("./view/main"),
    meta: {
      title: "Aristagram",
    },
  },
  {
    name: "photo_stylization",
    path: "/pr",
    component: () => import("./view/photo"),
    meta: {
      title: "图片艺术创作",
    },
    redirect: "/pr/func",
    children: [
      {
        name: "pr_func",
        path: "func",
        meta: {
          title: "风格迁移功能",
        },
        component: () => import("./view/photo/func.vue"),
      },
      {
        name: "pr_lib",
        path: "lib",
        meta: {
          title: "图像库",
        },
        component: () => import("./view/photo/lib.vue"),
        props: (route) => {
          return {
            algName: route.query.algName,
            category: route.query.category,
          };
        },
      },
      {
        name: "style",
        path: "/style",
        component: () => import("./view/style"),
        meta: {
          title: "风格化",
        },
      },
    ],
  },

  {
    name: "video_stylization",
    path: "/vr",
    component: () => import("./view/video"),
    redirect: "/vr/lib",
    meta: {
      title: "视频艺术创作",
    },
    children: [
      // {
      //   name: "vr_func",
      //   path: "func",
      //   meta: {
      //     title: "视频迁移功能",
      //   },
      //   component: () => import("./view/video/func.vue"),
      // },
      {
        name: "vr_lib",
        path: "lib",
        meta: {
          title: "视频库",
        },
        component: () => import("./view/video/lib.vue"),
        props: (route) => {
          return {
            algName: route.query.algName,
            category: route.query.category,
          };
        },
      },
    ],
  },
];

// add route path
routes.forEach((route) => {
  route.path = route.path || "/" + (route.name || "");
});

const router = new Router({
  mode: "history",
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export { router };
