<template>
  <div>
    <div class="vr_container">
      <transition name="van-fade" mode="out-in">
        <!-- <router-view></router-view> -->
        <van-empty description="访问人数过多！系统受限，请稍后重试。" />
      </transition>
    </div>
  </div>
</template>

<script>
// import SingleTransition from "@/components/SingleTransition.vue";
export default {
  name: "VideoStylizationHome",
  data() {
    return {};
  },
  // components: { SingleTransition },
  components: {},
  methods: {},
};
</script>

<style lang="less">
.vr_container {
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
