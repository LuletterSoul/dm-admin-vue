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
      <Content :content_imgs="_content_imgs" :width="'100%'" :height="'100%'">
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
      src_w: 512,
      src_h: 512,
      thumbnail_width: 512,
      thumbnail_height: 512,
      file_tree_loading: false,
      content_ids: [],
      content_index: -1,
      content_id: -1,
      config: {
        user_id: "",
        alg: this.algName,
        category: "COCO",
        auto_trigger: true,
        videoType: "video",
      },
      pages: {
        page: 0,
        size: 10,
      },
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
  mounted() {
    this.requestContentImages();
  },
  computed: {
    _content_imgs() {
      if (this.content_ids.length) {
        return this.content_ids.map((c) => {
          return {
            thumbnail: `${process.env.VUE_APP_API_URL}/contents/${c}?width=${this.thumbnail_width}&height=${this.thumbnail_height}&category=${this.config.category}&videoType=preview`,
            source: `${process.env.VUE_APP_API_URL}/contents/${c}?width=${this.src_w}&height=${this.src_h}&category=${this.config.category}&videoType=preview`,
            video: `${process.env.VUE_APP_API_URL}/contents/${c}?width=${this.src_w}&height=${this.src_h}&category=${this.config.category}&videoType=video`,
          };
        });
      } else {
        return [];
      }
    },
  },
  methods: {
    requestContentImages() {
      if (this._content_imgs.length > 0) {
        return;
      }
      let vm = this;
      // let resultId = this.resultList[0].resultId;
      vm.file_tree_loading = true;
      this.$toast({
        message: "加载中...",
        forbidClick: true,
      });
      return new Promise((resolve, reject) => {
        this.api.contents
          .gets(this.pages, this.config.category)
          .then((res) => {
            if (res !== undefined) {
              vm.content_ids = res.content_ids;
              vm.content_index = 0;
              vm.content_id = -1;
            } else {
              this.$toast.fail({
                message: "内容图加载失败，请刷新重试！",
                forbidClick: true,
              });
            }
            return resolve(res);
          })
          .catch((error) => {
            return reject(error);
          })
          .finally(() => {
            // vm.handleSpinHide();
            vm.file_tree_loading = false;
          });
      });
    },
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
