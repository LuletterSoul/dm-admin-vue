<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="select_button">
        <van-row>
          <van-col span="24">
            <van-button
              size="small"
              round
              type="info"
              block
              plain
              @click="onClickUpload"
              >从相册上传</van-button
            >
          </van-col>
          <van-uploader
            v-show="false"
            ref="img_uploader"
            v-model="fileList"
            multiple
            :max-count="2"
            :show-upload="true"
          >
          </van-uploader>
        </van-row>
      </div>
      <Content :content_imgs="content_imgs" :width="'100%'" :height="'100%'">
      </Content>
    </van-pull-refresh>
  </div>
</template>

<script>
import Content from "./components/content.vue";
export default {
  name: "PhotoLib",
  components: { Content },
  props: {
    algName: {
      type: String,
      default: "MAST",
    },
  },
  data() {
    return {
      fileList: [],
      isLoading: false,
      content_imgs: [
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/cat.jpeg" },
        { thumbnail: "https://img.yzcdn.cn/vant/apple-1.jpg" },
        { thumbnail: "https://img.yzcdn.cn/vant/apple-1.jpg" },
        { thumbnail: "https://img.yzcdn.cn/vant/apple-1.jpg" },
        { thumbnail: "https://img.yzcdn.cn/vant/apple-1.jpg" },
        { thumbnail: "https://img.yzcdn.cn/vant/apple-1.jpg" },
      ],
    };
  },
  mounted() {},

  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    onClickUpload() {
      this.$refs.img_uploader.$refs.input.click();
    },
  },
};
</script>

<style lang="less">
.select_button {
  margin-top: 20px;
}
</style>
