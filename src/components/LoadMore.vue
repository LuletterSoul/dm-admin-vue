<template>
  <div
    class="load-more-wrapper"
    @touchstart="touchStart($event)"
    @touchend="touchEnd($event)"
  >
    <div class="inner">
      <slot></slot>
      <div class="load-more" v-show="!finished && dataLoading">
        <van-loading>加载中...</van-loading>
      </div>
      <div class="load-end" v-show="finished">{{ finishedText }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoadMore",
  props: {
    dataLoading: {
      type: Boolean,
      default: false,
    },
    finishedText: {
      type: String,
      default: "没有更多内容了",
    },
    finished: {
      type: Boolean,
      default: false,
    },
    onLoadMore: {
      type: Function,
      default: undefined,
      require: false,
    },
  },
  data() {
    return {
      loadMoreText: "上拉加载更多",
      startX: 0,
      startY: 0,
      isLoading: false,
    };
  },
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
      this.startX = e.targetTouches[0].pageX;
    },
    scrollToEnd() {
      let scrollHeight = this.$el.scrollHeight;
      let clientHeight = this.$el.clientHeight;
      let scrollTop = this.$el.scrollTop;
      console.log("ENd");

      if (scrollTop + clientHeight >= scrollHeight) {
        this.doLoadMore();
      }
    },
    touchEnd(e) {
      //   if (this.isLoading) {
      //     return;
      //   }

      let endX = e.changedTouches[0].pageX,
        endY = e.changedTouches[0].pageY,
        dy = this.startY - endY,
        dx = endX - this.startX;
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return;
      }
      if (endY < this.startY) {
        this.scrollToEnd(e);
      }
    },
    doLoadMore() {
      this.isLoading = true;
      this.$emit("onLoad");
      //   this.loadMoreText = "加载中...";
      //   this.onLoadMore(this.loadDone);
    },
    loadDone() {
      this.isLoading = false;
      this.loadMoreText = "上拉加载更多";
    },
  },
};
</script>

<style lang="less" scoped>
.load-more-wrapper {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition-duration: 300ms;
  .load-more,
  .load-end {
    color: #aea699;
    margin: 0.3rem 0;
    font-size: 16px;
    text-align: center;
  }
}
</style>
