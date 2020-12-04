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
    name: "photo",
    path: "/photo",
    component: () => import("./view/photo"),
    meta: {
      title: "图片艺术创作",
    },
  },
  {
    name: "video",
    path: "/video",
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

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export { router };
