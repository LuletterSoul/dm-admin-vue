<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
    <div>
      <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
        <van-tabbar-item icon="home-o" to="/home">{{
          tab_options[0].label
        }}</van-tabbar-item>
        <van-tabbar-item icon="photo-o" to="/pr">{{
          tab_options[1].label
        }}</van-tabbar-item>
        <van-tabbar-item icon="video-o" to="/vr">{{
          tab_options[2].label
        }}</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
// import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from "vant";

import { Toast } from "vant";

export default {
  // components: {
  //   [Card.name]: Card,
  //   [Checkbox.name]: Checkbox,
  //   [SubmitBar.name]: SubmitBar,
  //   [CheckboxGroup.name]: CheckboxGroup,
  // },

  name: "Home",
  data() {
    return {
      tab_options: [
        {
          label: "首页",
          icon: "home-0",
          path: "/main",
        },
        {
          label: "图像艺术",
          icon: "photo-o",
          path: "/photo",
        },
        {
          label: "视频艺术",
          icon: "video-o",
          path: "/video",
        },
      ],
      active: 0,
      transitionName: "slide-right",
    };
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth <= fromDepth ? "slide-right" : "slide-left";
      console.log("111111");
    },
  },

  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
  },
  computed: {},
};
</script>

<style lang="less">
body {
  font-size: 24px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
