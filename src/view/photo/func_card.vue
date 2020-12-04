<template>
<div :style='spanStyle' class='btn'>
  <van-button :icon="icon" type="primary" round size="large">{{func}}</van-button>
</div>
</template>

<script>
export default {
  name: "FuncCard",
  props: {
    icon :{
      type: String,
      default: 'flower-o'
    },
    func:{
      type: String,
      default: ''
    },
    background: {
      type: Object,
      default: () =>{
        return {
          'color': '#fff'
        }
      } 
    }
  },
  data() {
    return {
      containerWidth: 0,
      spanStyle: {
                "backgroundColor": "#07c160",
                "fontColor": "#FFF"
       },
    };
  },

  mounted() {
    // this.$nextTick(this.getContainerWidth);
  },

  computed: {},

  methods: {},
};
</script>

<style lang="less">

.my-card {
  background: aquamarine;
  color: rgba(175, 36, 82, 0.267);
  width: 100%;
  height: 100pt;
  border-radius: 20pt;
}

.btn .van-button--large{
  height: 150px;
}

.btn .van-button--round{
  border-radius: 10px;
}

.btn .van-button{
  font-size: 32px;
}

.btn .van-button--primary{
  // background-color: var(--backgroundColor);
  // border: var(--backgroundColor);
}
</style>
