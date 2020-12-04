<template>
  <div>
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="photo-o">图片艺术</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频艺术</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from "vant";

export default {
  // components: {
  //   [Card.name]: Card,
  //   [Checkbox.name]: Checkbox,
  //   [SubmitBar.name]: SubmitBar,
  //   [CheckboxGroup.name]: CheckboxGroup,
  // },
  name: "main",
  data() {
    return {
      tab_options: [
        {
          label: "首页",
          icon: "home-0",
        },
        {
          label: "图像艺术",
          icon: "photo-o",
        },
        {
          label: "视频艺术",
          icon: "video-o",
        },
      ],
      active: 0,
    };
  },

  computed: {},

  methods: {},
};
</script>

<style lang="less">
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
</style>
