<template>
  <div class="btn">
    <van-button
      :style="spanStyle"
      :icon="icon"
      type="primary"
      round
      size="large"
      @click="onTo"
      >{{ func }}</van-button
    >
  </div>
</template>

<script>
export default {
  name: "FuncCard",
  props: {
    icon: {
      type: String,
      default: "flower-o",
    },
    func: {
      type: String,
      default: "",
    },
    algName: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    background: {
      type: Object,
      default: () => {
        return {
          color: "#fff",
        };
      },
    },
    spanStyle: {
      type: Object,
      default: () => {
        return {
          backgroundColor: "green",
          fontColor: "#FFF",
        };
      },
    },
    to: {
      type: String,
      require: true,
    },

    func_params: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      containerWidth: 0,
    };
  },

  mounted() {
    // this.$nextTick(this.getContainerWidth);
  },

  computed: {},

  methods: {
    onTo() {
      this.$router.push({
        name: this.to,
        query: { algName: this.algName, category: this.category },
      });
    },
  },
};
</script>

<style lang="less">
.btn .van-button--large {
  height: 150px;
}

.btn .van-button--round {
  border-radius: 10px;
}

.btn .van-button {
  font-size: 24px;
}

.btn .van-button--primary {
  background-color: var(--backgroundColor);
  border: var(--backgroundColor);
  color: var(--fontColor);
}

.btn .van-button__text,
.van-button__loading + .van-button__text,
.van-button__text + .van-button__icon,
.van-button__text + .van-button__loading {
  margin-left: 30px;
}
</style>
