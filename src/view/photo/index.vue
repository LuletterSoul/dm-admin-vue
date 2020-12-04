<template>
  <div>
    <van-nav-bar
      :title="this.titleName"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
// import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from "vant";
import { mapState } from "vuex";

export default {
  // components: {
  //   [Card.name]: Card,
  //   [Checkbox.name]: Checkbox,
  //   [SubmitBar.name]: SubmitBar,
  //   [CheckboxGroup.name]: CheckboxGroup,
  // },

  name: "Photo",
  data() {
    return {};
  },

  computed: {
    ...mapState("photo", ["titleName"]),
  },

  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less"></style>
