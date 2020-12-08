<template>
  <div>
    <div class="vr_container">
      <transition name="van-fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import SingleTransition from "@/components/SingleTransition.vue";
export default {
  name: "VideoStylizationHome",
  data() {
    return {};
  },
  computed: {
    ...mapState("video", ["titleName"]),
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
