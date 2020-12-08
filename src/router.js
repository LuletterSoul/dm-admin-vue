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
      title: "Aristagram - AI艺幻创客",
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
          title: "艺术图像创作",
        },
        component: () => import("./view/photo/func.vue"),
      },
      {
        name: "pr_lib",
        path: "lib",
        meta: {
          title: "图像素材库",
        },
        component: () => import("./view/photo/lib.vue"),
        props: (route) => {
          return {
            algName: route.query.algName,
            category: route.query.category,
          };
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
          title: "视频素材库",
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
  {
    name: "style",
    path: "/style",
    component: () => import("./view/style"),
    meta: {
      title: "AI艺术化",
    },
    props: (route) => {
      return {
        showType: route.params.showType,
        completed: route.params.completed,
        alg: route.params.alg,
        oriInfo: route.params.oriInfo,
        stylizedInfo: route.params.stylizedInfo,
        contentId: route.params.contentId,
        contentCategory: route.params.contentCategory,
      };
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
