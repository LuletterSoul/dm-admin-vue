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
      <AnnimateTransition> </AnnimateTransition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SingleTransition from "@/components/SingleTransition.vue";
import AnnimateTransition from "@/components/AnimateTransition.vue";
export default {
  name: "PhotoStylizationHome",
  data() {
    return {
      transitionName: "slide-right",
    };
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth <= fromDepth ? "slide-right" : "slide-left";
    },
  },

  computed: {
    ...mapState("photo", ["titleName"]),
  },
  components: { SingleTransition, AnnimateTransition },
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
