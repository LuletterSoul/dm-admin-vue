<template>
  <div id="app">
    <router-view />
    <div>
      <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
        <van-tabbar-item icon="home-o" to="/home">{{
          tab_options[0].label
        }}</van-tabbar-item>
        <van-tabbar-item icon="photo-o" to="/photo">{{
          tab_options[1].label
        }}</van-tabbar-item>
        <van-tabbar-item icon="video-o" to="/video">{{
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
    };
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

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
