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
        component: () => import("./view/photo/plib.vue"),
        props: (route) => {
          return {
            query: { algName: route.query.algName },
          };
        },
      },
    ],
  },

  {
    name: "photo_stylization",
    path: "/vr",
    component: () => import("./view/video"),
    meta: {
      title: "视频艺术创作",
    },
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
