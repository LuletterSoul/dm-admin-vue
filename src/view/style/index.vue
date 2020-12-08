<template>
  <div>
    <van-overlay :show="_synthesis_loading">
      <div class="loading_wrapper">
        <van-loading size="24px" vertical
          >合成中 {{ this._synthesis_progress }}%...</van-loading
        >
      </div>
    </van-overlay>
    <div class="previewer">
      <image-previewer
        @onCloseStyle="onCloseStyle"
        v-if="_showType === 'photo'"
        v-bind:oriInfo="_oriInfo"
        v-bind:stylizedInfo="_stylizedInfo"
        v-bind:completed="_completed"
      ></image-previewer>
      <video-previewer
        @onCloseStyle="onCloseStyle"
        v-if="_showType === 'video'"
        v-bind:oriInfo="_oriInfo"
        v-bind:stylizedInfo="_stylizedInfo"
        v-bind:completed="_completed"
      ></video-previewer>
    </div>
    <div class="box">
      <van-tabs
        @click="onClick"
        v-model="config.category"
        animated
        :border="true"
      >
        <van-tab
          v-for="(option, index) in dataset_options"
          :key="index"
          :title="option.label"
          :name="option.label"
        >
          <div class="lateral-sliding">
            <div
              class="lateral-sliding-item"
              v-for="(item, index) in _style_imgs"
              :key="index"
            >
              <div class="image_hover">
                <van-image
                  :src="item.source"
                  fit="cover"
                  :width="128"
                  :height="128"
                  :radius="10"
                  @click="onStyleClick(index)"
                >
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                </van-image>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- </div> -->

    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";

// import AnimateTransition from "@/components/AnimateTransition";
import ImagePreviewer from "@/components/ImagePreviewer";
import VideoPreviewer from "@/components/VideoPreviewer";

export default {
  name: "Style",
  props: {
    alg: {
      type: String,
      default: "MAST",
    },
    showType: {
      type: String,
      default: "photo",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    oriInfo: {
      type: Object,
      default: () => {
        return {
          video:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          thumbnail: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
          source: "https://s3.ax1x.com/2020/12/04/DH4AFU.jpg",
        };
      },
    },
    stylizedInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    contentId: {
      type: String,
      default: "",
    },
    contentCategory: {
      type: String,
      default: "",
    },
  },

  components: {
    ImagePreviewer,
    VideoPreviewer,
  },
  data() {
    return {
      showStylizationProcessing: false,
      config: {
        user_id: "",
        alg: this.alg,
        category: "WebCaricature",
        auto_trigger: true,
        videoType: "video",
      },
      pages: {
        page: 0,
        size: 15,
      },
      style_ids: [],
      style_index: 0,
      style_id: -1,
      items: 10,
      dataset_options: [],
      src_w: 512,
      src_h: 512,
      thumbnail_width: 512,
      thumbnail_height: 512,
      dataset: {},
      // stylization_id: -1,
      synthesis_progress: 100,
      stylized_timestamp: 0,
      stylized_category: "original",
      content_mask: [],
      style_mask: [],
    };
  },

  // sockets: {
  //   //这里是监听connect事件
  //   connect: function() {
  //     console.log("建立连接");
  //   },
  //   disconnect: function() {
  //     console.log("断开连接");
  //   },
  //   reconnect: function() {
  //     console.log("重新连接");
  //   },
  //   onConnected: function(msg) {
  //     this.sid = msg.sid;
  //     console.log("Server sid", this.sid);
  //   },
  //   onSynthesisCompleted: function(msg) {
  //     if (msg.sid !== this.sid) {
  //       return;
  //     }
  //     this.view_content = false;
  //     this.$toast.success({ message: "合成成功" });
  //     this.synthesis_loading = false;
  //     this.stylization_id = msg.stylization_id;
  //     this.synthesis_progress = 100;
  //     this.stylized_timestamp = msg.timestamp;
  //     this.stylized_category = "original";
  //   },
  //   onSynthesisFailed: function(msg) {
  //     if (msg.sid !== this.sid) {
  //       return;
  //     }
  //     this.$toast.success({ message: "合成失败" });
  //     this.synthesis_loading = false;
  //     this.synthesis_progress = 0;
  //     this.stylized_category = "original";
  //   },
  //   onSynthesising: function(msg) {
  //     if (msg.sid !== this.sid) {
  //       return;
  //     }
  //     console.log(msg);
  //     if (msg.percent <= 1) {
  //       this.synthesis_progress = msg.percent;
  //     } else {
  //       this.synthesis_progress = 1;
  //     }
  //   },
  //   onSynthesisingFetch: function(msg) {
  //     if (msg.sid !== this.sid) {
  //       return;
  //     }
  //     this.synthesis_progress = msg.percent;
  //     this.stylization_id = msg.stylization_id;
  //     this.stylized_timestamp = msg.timestamp;
  //     this.stylized_category = msg.category;
  //   },
  // },

  // beforeRouteEnter(to, from, next) {
  // this.changeNavStatus(false);
  // next();
  // },

  beforeRouteLeave(to, from, next) {
    this.changeNavStatus(true);
    next();
  },
  mounted() {
    this.requestDatasetCategory();
    this.changeNavStatus(false);
  },

  computed: {
    ...mapState(["stylization", "sid"]),

    _stylization_id() {
      return this.stylization.stylization_id;
    },

    _stylized_category() {
      return this.stylization.stylized_category;
    },

    _stylized_timestamp() {
      return this.stylization.stylized_timestamp;
    },

    _synthesis_loading() {
      return this.stylization.synthesis_loading;
    },

    _synthesis_progress() {
      return this.stylization.synthesis_progress;
    },

    _showType() {
      return this.showType;
      // return this.$route.query.showType
    },
    _completed() {
      return this._stylization_id !== -1;
      // return this.$route.query.completed==='true'
    },
    _oriInfo() {
      return this.oriInfo;
      // return this.$route.query.oriInfo
    },
    _stylizedInfo() {
      if (this._stylization_id !== -1) {
        // from user upload
        return {
          thumbnail: `${process.env.VUE_APP_API_URL}/stylizations/${this._stylization_id}?width=${this.thumbnail_width}&height=${this.thumbnail_height}&timestamp=${this._stylized_timestamp}&category=${this._stylized_category}`,
          source: `${process.env.VUE_APP_API_URL}/stylizations/${this._stylization_id}?width=${this.src_w}&height=${this.src_h}&timestamp=${this.stylized_timestamp}&category=${this._stylized_category}`,
          video: `${process.env.VUE_APP_API_URL}/stylizations/${this._stylization_id}?width=${this.src_w}&height=${this.src_h}&timestamp=${this.stylized_timestamp}&category=${this._stylized_category}`,
        };
      } else {
        return {
          thumbnail: null,
          source: null,
        };
      }
      // return this.$route.query.stylizedInfo
    },
    _category() {
      return this.config.category;
    },
    _style_ids() {
      if (this.dataset[`${this._category}`]) {
        return this.dataset[this._category];
      } else {
        return [];
      }
    },
    _style_imgs() {
      if (this._style_ids.length) {
        return this._style_ids.map((c) => {
          return {
            thumbnail: `${process.env.VUE_APP_API_URL}/styles/${c}?width=${this.thumbnail_width}&height=${this.thumbnail_height}&category=${this.config.category}&videoType=preview`,
            source: `${process.env.VUE_APP_API_URL}/styles/${c}?width=${this.src_w}&height=${this.src_h}&category=${this.config.category}&videoType=preview`,
            video: `${process.env.VUE_APP_API_URL}/styles/${c}?width=${this.src_w}&height=${this.src_h}&category=${this.config.category}&videoType=video`,
          };
        });
      } else {
        return [];
      }
    },
    _style_srcs() {
      return this._style_imgs.map((c) => {
        return c.source;
      });
    },
  },
  methods: {
    ...mapMutations(["changeNavStatus", "setSynthesisLoading", "clearStyle"]),
    onCloseStyle() {
      this.$router.back();
      this.clearStyle(-1);
    },
    onClick() {
      this.requestStyleImages(this._category);
    },
    onStyleClick(index) {
      // console.log(this._style_imgs[index]);
      this.showStylizationProcessing = true;
      this.requestStylizaitons(this._style_ids[index]);
    },
    requestDatasetCategory() {
      return new Promise(() => {
        this.api.category.gets().then((res) => {
          // this.config.alg = res.alg_default;
          // this.config.category = res.category_default;
          // this.alg_options = res.alg_options;
          this.dataset_options = res.category_options;
          this.config.category = this.dataset_options[0].label;
          this.config = Object.assign({}, this.config);
          for (let i = 0; i < this.dataset_options.length; i++) {
            // this.dataset = Object.assign(this.dataset, {
            //   [this.dataset_options[i].label]: [],
            // });
            this.requestStyleImages(this.dataset_options[i].label);
          }
          // this.alg_compatible_map = res.alg_compatible_map;
          // this.dataset_compatible_map = res.dataset_compatible_map;
        });
      });
    },
    requestStyleImages(category, loadNextPage = false) {
      if (this.dataset[category] > 0) {
        return;
      }
      let vm = this;
      // let resultId = this.resultList[0].resultId;
      // this.$toast({
      //   message: "加载中...",
      //   forbidClick: true,

      // });
      return new Promise((resolve, reject) => {
        this.api.styles
          .gets(this.pages, category)
          .then((res) => {
            if (res !== undefined) {
              if (!this.dataset[category]) {
                vm.dataset = Object.assign({}, vm.dataset, {
                  [category]: [],
                });
              }
              if (loadNextPage) {
                for (let i = 0; i < res.style_ids.length; i++) {
                  vm.dataset[category].push(res.style_ids[i]);
                }
              } else {
                vm.dataset = Object.assign({}, vm.dataset, {
                  [category]: res.style_ids,
                });
              }
              // this.$toast.success({
              //   message: "加载成功",
              //   forbidClick: true,
              // });
              if (this.style_ids.length === res.total) {
                vm.finished = true;
              }
              vm.style_index = 0;
              vm.style_id = -1;
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
    onChangeView() {
      this.viewRes = !this.viewRes;
    },

    requestStylizaitons(style_id) {
      let vm = this;
      this.setSynthesisLoading(true);
      return new Promise((resolve, reject) => {
        this.api.stylizations
          .post(
            this.contentId,
            style_id,
            this.config.alg,
            this.sid,
            this.contentCategory,
            this.config.category,
            this.content_mask,
            this.style_mask,
            this.src_w,
            this.src_h
          )
          .then((res) => {
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
  },
};
</script>

<style lang="less">
.previewer {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  position: absolute;
}

.lateral-sliding {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
}

.lateral-sliding-item {
  display: flex;
  margin: 5px;
  z-index: 1;
  /* background-color: red; */
}

.loading_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.each-img {
  width: 150px;
  height: 88px;
}

.box {
  position: fixed;
  bottom: 0;
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
}

.image_hover img {
  filter: blur(0px);
  -webkit-filter: blur(0px);
  // filter: grayscale(0%);
  // -webkit-filter: grayscale(0%);
  -webkit-transition: all 0.5s ease;
}

.image_hover img:hover {
  filter: blur(3px);
  -webkit-filter: blur(3px);
  transition: 0.5s ease;
}
</style>
