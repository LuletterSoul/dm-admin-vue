<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
      <!-- <van-list
        v-model="file_tree_loading"
        :finished="finished"
        finished-text="没有更多内容了"
        @load="onLoad"
      >
      </van-list> -->
      <load-more
        @onLoad="onLoad"
        :data-loading="file_tree_loading"
        :finished="finished"
      >
        <img-content
          @onClickImg="onClickImg"
          :imgs="_content_srcs"
          :width="'100%'"
          :height="'100%'"
        >
        </img-content>
      </load-more>
    </van-pull-refresh>
  </div>
</template>

<script>
import ImgContent from "@/components/ImgContent.vue";
import LoadMore from "@/components/LoadMore";
export default {
  name: "PhotoLib",
  components: { ImgContent, LoadMore },
  props: {
    algName: {
      type: String,
      default: "MAST",
    },
    category: {
      type: String,
      default: "COCO",
    },
  },
  data() {
    return {
      fileList: [],
      refreshing: false,
      finished: false,
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
        category: this.category,
        auto_trigger: true,
        videoType: "video",
      },
      pages: {
        page: 0,
        size: 15,
      },
      content_imgs: [],
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
    _content_srcs() {
      return this._content_imgs.map((c) => {
        return c.source;
      });
    },
  },
  methods: {
    onClickImg(index) {
      let current_content_img = this._content_imgs[index];
      let completed = false;
      let showType = "photo";
      this.$router.push({
        name: "style",
        params: {
          showType: showType,
          completed: completed,
          alg: this.algName,
          oriInfo: current_content_img,
          stylizedInfo: {
            video: "",
            thumbnail: "",
            source: "",
          },
          contentId: this.content_ids[index],
          contentCategory: this.config.category,
        },
      });
    },
    onLoad() {
      this.pages.page = this.pages.page + 1;
      this.file_tree_loading = true;
      this.requestContentImages(true);
    },
    requestContentImages(loadNextPage = false) {
      // // // if (this._content_imgs.length > 0) {
      // //   return;
      // }
      let vm = this;
      // let resultId = this.resultList[0].resultId;
      // this.$toast({
      //   message: "加载中...",
      //   forbidClick: true,
      // });
      return new Promise((resolve, reject) => {
        this.api.contents
          .gets(this.pages, this.config.category)
          .then((res) => {
            if (res !== undefined) {
              if (loadNextPage) {
                for (let i = 0; i < res.content_ids.length; i++) {
                  vm.content_ids.push(res.content_ids[i]);
                }
              } else {
                vm.content_ids = res.content_ids;
              }
              // this.$toast.success({
              //   message: "加载成功",
              //   forbidClick: true,
              // });
              if (this.content_ids.length === res.total) {
                vm.finished = true;
              }
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
            this.$toast.fail({
              message: "内容图加载失败，请刷新重试！",
              forbidClick: true,
            });
            return reject(error);
          })
          .finally(() => {
            vm.refreshing = false;
            vm.file_tree_loading = false;
          });
      });
    },
    onRefresh() {
      for (let i = 0; i < this.content_ids.length; i++) {
        this.$set(this.content_ids, i, this.content_ids[i]);
      }
      this.refreshing = false;
      this.$toast.success({
        message: "刷新成功",
        forbidClick: true,
      });
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
