<template>
  <div id="singleTransition">
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @before-appear="beforeAppear"
      @appear="appear"
    >
      <slot> </slot>
    </transition>
  </div>
</template>

<script type="text/javascript">
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";

export default {
  name: "SingleTransition",
  props: {
    duration: {
      type: Number,
      default: 300,
    },
    delay: {
      type: Number,
      default: 0,
    },
    inStyle: {
      type: String,
      default: "transition.slideUpBigIn",
    },
    outStyle: {
      type: String,
      default: "transition.slideUpBigOut",
    },
    linkIndex: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    beforeEnter: function(el) {
      el.style = "display:none";
    },
    enter: function(el, done) {
      let vm = this;
      Velocity(
        el,
        vm.inStyle,
        {
          duration: vm.duration,
          delay: vm.delay,
          complete: function() {
            vm.$emit("InEnd");
          },
        },
        done
      );
    },
    afterEnter: function() {
      this.$emit("InEnd");
    },
    beforeLeave: function() {},
    leave: function(el, done) {
      let vm = this;
      Velocity(
        el,
        vm.outStyle,
        {
          duration: vm.duration,
          delay: vm.delay,
          complete: function() {
            vm.$emit("OutEnd");
          },
        },
        done
      );
    },
    afterLeave: function() {
      //        this.$emit('slideOutEnd');
    },
    beforeAppear: function(el) {
      el.style = "display:none";
    },
    appear: function(el, done) {
      let vm = this;
      Velocity(
        el,
        vm.inStyle,
        { duration: vm.duration, delay: vm.delay },
        done
      );
    },
  },
};
</script>
<style></style>
