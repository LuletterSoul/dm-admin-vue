<template>
  <div>
    <div class="content_container" ref="__container_id">
      <van-nav-bar
        :title="this.titleName"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
      />
      <single-transition>
        <router-view></router-view>
      </single-transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SingleTransition from "@/components/SingleTransition.vue";
export default {
  name: "VideoStylizationHome",
  data() {
    return {};
  },

  // watch: {
  //   $route(to, from) {
  //     const toDepth = to.path.split("/").length;
  //     const fromDepth = from.path.split("/").length;
  //     this.transitionName = toDepth <= fromDepth ? "slide-right" : "slide-left";
  //   },
  // },

  computed: {
    ...mapState("video", ["titleName"]),
  },
  components: { SingleTransition },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less">
.content_container {
  margin: 20px;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
