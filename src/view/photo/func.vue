<template>
  <div>
    <div class="func" v-for="(func_option, index) in func_options" :key="index">
      <func-card
        :icon="func_option.icon"
        :func="func_option.func_des"
        :spanStyle="func_option.spanStyle"
        :to="func_option.to"
        :algName="func_option.algName"
      >
      </func-card>
    </div>
  </div>
</template>

<script>
import FuncCard from "./components/func_card.vue";
export default {
  name: "PhotoStyleFunc",
  components: {
    FuncCard,
  },
  data() {
    return {
      func_options: [
        {
          icon: "user-o",
          func_des: "漫画生成",
          spanStyle: {
            backgroundColor: "rgb(228,246,249)",
            fontColor: "#000",
          },
          to: "pr_lib",
          algName: "CAST",
        },
        {
          icon: "fire-o",
          func_des: "场景转换",
          spanStyle: {
            backgroundColor: "rgb(227,227,240)",
            fontColor: "#000",
          },
          to: "pr_lib",
          algName: "MAST",
        },
        {
          icon: "flower-o",
          func_des: "纹理迁移",
          spanStyle: {
            backgroundColor: "rgb(242,234,219)",
            fontColor: "#000",
          },
          to: "pr_lib",
          algName: "MAST",
        },
      ],
    };
  },
  props: {},
};
</script>

<style lang="less">
.func {
  margin-top: 20px;
}
</style>
