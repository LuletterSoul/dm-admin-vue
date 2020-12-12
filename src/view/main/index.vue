<template>
  <div>
    <head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
    </head>
    <div class="title">
      <img
        src="@/image/title_2.png"
        class="animate__animated animate__jello"
        style="margin: 0 auto;"
      />
    </div>

    <div class="card">
      <img src="@/image/first.png" alt="Avatar" style="width:90%" />
    </div>

    <div class="card_2">
      <img src="@/image/second.jpg" alt="Avatar" style="width:90%" />
    </div>

    <div class="card_3">
      <img src="@/image/third_2.png" alt="Avatar" style="width:90%" />
    </div>

    <div class="card_4">
      <img src="@/image/fourth.png" alt="Avatar" style="width:90%" />
    </div>

    <!-- <van-swipe class="my-swipe" :autoplay="3000" >
      <van-swipe-item class="swipe_item_1"><img src="@/image/first.png" /></van-swipe-item>
      <van-swipe-item class="swipe_item_2"><img src="@/image/second.jpg" /></van-swipe-item>
      <van-swipe-item class="swipe_item_3"><img src="@/image/third.png" /></van-swipe-item>
    </van-swipe> -->
  </div>
</template>

<script>
// import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from "vant";
// import SingleTransition from "@/components/SingleTransition";
// import FuncCard from "./components/func_card.vue";

export default {
  // components: {
  //   [Card.name]: Card,
  //   [Checkbox.name]: Checkbox,
  //   [SubmitBar.name]: SubmitBar,
  //   [CheckboxGroup.name]: CheckboxGroup,
  // },
  name: "Home",
  // components: {
  //   SingleTransition,
  // },
  components: {
    // FuncCard,
  },
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

      // brief_options: [
      // {
      //     icon: "user-o",
      //     spanStyle: {
      //       backgroundColor: "rgb(228,246,249)",
      //       fontColor: "#000",
      //     },
      //   },
      //   {
      //     icon: "fire-o",
      //     spanStyle: {
      //       backgroundColor: "rgb(227,227,240)",
      //       fontColor: "#000",
      //     },
      //   },
      //   {
      //     icon: "flower-o",
      //     spanStyle: {
      //       backgroundColor: "rgb(242,234,219)",
      //       fontColor: "#000",
      //     },
      //   },

      // ],
      // active: 0,
    };
  },

  computed: {},

  methods: {},
};
</script>

<style lang="less">
.title {
  /* padding-bottom: 56%; */
  width: 100%;
  position: relative;
  margin: auto;
  padding-left: 15%;
  padding-bottom: 10px;
}
.title img {
  width: 70%;
  height: auto;
  position: relative;
  margin: auto;
}
/* .card {
    padding-left: 5%;
  } */
.card img {
  padding-left: 5%;
  margin-bottom: auto;
}
.card_3 img {
  padding-left: 5%;
  margin-bottom: auto;
}
.card_2 img {
  padding-left: 5%;
  margin-bottom: auto;
}
.card_4 img {
  padding-left: 5%;
  margin-bottom: auto;
}

.my-swipe {
  width: 100%;
  position: relative;
}
.swipe_item_1 img {
  width: 100%;
  height: auto;
  /* position: relative; */
  margin: auto;
}
.swipe_item_2 {
  width: 100%;
  height: auto;
  /* position: relative; */
  margin: auto;
}
.swipe_item_3 {
  width: 100%;
  height: auto;
  /* position: relative; */
  margin: auto;
}

/* .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 90%;
    border-radius: 5px;
    padding-left: 5%;
}

  .card_2 {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 90%;
    border-radius: 5px;
    padding-left: 5%;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.card_2:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
    border-radius: 5px 5px 0 0;
} */
</style>
