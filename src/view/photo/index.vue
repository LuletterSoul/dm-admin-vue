<template>
  <div>
    <div class="pr_container">
      <!-- <single-transition
        :in-style="'transition.fadeIn'"
        :out-style="'transition.fadeOut'"
      >
        <router-view></router-view>
      </single-transition> -->
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
  name: "PhotoStylizationHome",
  data() {
    return {};
  },

  computed: {
    ...mapState(),
  },
  components: {},
  methods: {},
};
</script>

<style lang="less">
.pr_container {
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
