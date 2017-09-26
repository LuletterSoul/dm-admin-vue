<template>
    <div id="slideUpBig">
      <transition ：class="false"
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @after-enter="afterEnter"
                  @before-leave="beforeLeave"
                  @leave="leave"
                  @after-leave="afterLeave"
                  @before-appear="beforeAppear"
                  @appear="appear">
        <slot></slot>
      </transition>
    </div>
</template>

<script type="text/javascript">
  export default {
    name: 'SlideUpBig',
    props: {
      fadeInDuration: {
        type: Number,
        default: 1200
      },
      fadeInDelay: {
        type: Number,
        default: 300
    },
      fadeOutDelay: {
        type: Number,
        default: 500
      },

    },
    data() {
      return {}
    },
    methods: {
      beforeEnter: function(el){
      },
      enter: function(el,done){
        let vm = this;
        Velocity(el, "transition.slideUpBigIn",
                      { duration:vm.fadeInDuration,
                        delay : vm.fadeInDelay,
                        complete:function () {
                          vm.$emit('sileInEnd');
                          console.log("Commit current transition component.");
                        }
                      },done);
      },
      afterEnter: function (el) {
        this.$emit('sileInEnd');
      },
      beforeLeave:function (el){
        let vm = this;
      },
      leave:function(el,done) {
        let vm = this;
        Velocity(el, "transition.slideUpBigOut"
          ,{
              duration: vm.fadeOutDuration,
              delay: vm.fadeOutDelay,
              complete:function () {
                vm.$emit('slideOutEnd');
              }
            },
          done
        );
      },
      afterLeave: function (el) {
//        this.$emit('slideOutEnd');
      },
      beforeAppear:function(el){
        el.style = 'display:none;';
      },
      appear:function (el,done) {
        let vm = this;
        Velocity(el, "transition.slideUpBigIn",
          { duration:vm.fadeInDuration,
            delay : vm.fadeInDelay},done);
      }
    }
  };
</script>
<style>
</style>
