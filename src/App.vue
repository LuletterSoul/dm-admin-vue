<template>
  <div>
    <van-nav-bar
      :title="this.titleName"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
      v-if="showNav"
    />
    <div id="app" class="app_container">
      <div>
        <single-transition
          :in-style="'transition.fadeIn'"
          :out-style="'transition.fadeOut'"
        >
          <router-view></router-view>
        </single-transition>
      </div>
    </div>
    <div>
      <transition name="fade">
        <div class="nav" v-show="show" v-if="showNav">
          <van-tabbar
            v-model="active"
            active-color="#ee0a24"
            inactive-color="#000"
          >
            <van-tabbar-item
              v-for="(tab_option, index) in tab_options"
              :icon="tab_option.icon"
              :to="tab_option.path"
              :name="tab_option.path"
              :key="index"
              >{{ tab_option.label }}</van-tabbar-item
            >

            <!-- <van-tabbar-item icon="home-o" to="/home">{{
            tab_options[0].label
          }}</van-tabbar-item>
          <van-tabbar-item icon="photo-o" :to="tab_options[]">{{
            tab_options[1].label
          }}</van-tabbar-item>
          <van-tabbar-item icon="video-o" to="/vr">{{
            tab_options[2].label
          }}</van-tabbar-item> -->
          </van-tabbar>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from "vant";

import SingleTransition from "@/components/SingleTransition.vue";
import { mapState } from "vuex";

export default {
  components: {
    SingleTransition,
  },

  name: "Home",
  data() {
    return {
      tab_options: [
        {
          label: "首页",
          icon: "home-o",
          path: "/home",
        },
        {
          label: "图像艺术",
          icon: "photo-o",
          path: "/pr",
        },
        {
          label: "视频艺术",
          icon: "video-o",
          path: "/vr",
        },
      ],
      active: 0,
      show: true,
      transitionName: "slide-right",
      titleName: "",
    };
  },

  mounted() {
    //核心开始------------------------------------
    let oldTop = 0; //旧数据，初始为0
    // 将自定义方法绑定到窗口滚动条事件
    window.onscroll = () => {
      let top = document.scrollingElement.scrollTop; //触发滚动条，记录数值
      //旧数据大于当前位置，表示滚动条top向上滚动
      if (oldTop > top) {
        this.show = true;
        // console.log("↑");
      } else {
        //相反...
        this.show = false;
        // console.log("↓");
      }
      oldTop = top; //更新旧的位置
    };
  },

  watch: {
    $route(to) {
      this.titleName = to.meta.title;
      let toDepth = to.path.split("/");
      this.active = `/${toDepth[1]}`;
    },
  },

  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
  computed: {
    ...mapState(["showNav"]),
  },
};
</script>

<style lang="less">
body {
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
}

.tab_nav {
  position: absolute;
  margin-top: 10px;
}

a {
  color: #fff;
  text-decoration: none;
  padding: 2px 5px;
}
.active {
  position: relative;
  &::after {
    @size: 3px;
    content: "";
    position: absolute;
    display: inline-block;
    bottom: -5px;
    left: 50%;
    width: @size;
    height: @size;
    background: rgb(255, 255, 81);
    border-radius: 100%;
  }
}

.app_container {
  // position: absolute;
  // margin: 20px;
}

.status {
  position: fixed;
  left: 100px;
  top: 100px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
}
</style>
