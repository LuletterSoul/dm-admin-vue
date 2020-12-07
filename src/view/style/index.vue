<template>
  <div>
    <!-- <div style="height: 470px;"></div> -->
    <!-- <van-row type="flex" justify="space-between">
      <van-col span="24">

      </van-col>
    </van-row> -->
    <!-- <div class="tab_box"> -->
    <!-- <div class="box"> -->
    <!-- <div class="tab_box"> -->
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
              class="lateral-sliding-item c-preview"
              v-for="(item, index) in _style_imgs"
              :key="index"
            >
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
export default {
  name: "Style",
  prop: {
    alg: {
      type: String,
      default: "MAST",
    },
  },
  data() {
    return {
      config: {
        user_id: "",
        alg: this.algName,
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
    };
  },

  mounted() {
    this.changeNavStatus(false);
    this.requestDatasetCategory();
  },

  computed: {
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
    ...mapMutations(["changeNavStatus"]),
    onClick() {
      this.requestStyleImages(this._category);
    },
    onStyleClick(index) {
      console.log(this._style_imgs[index]);
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
      // // // if (this._style_imgs.length > 0) {
      // //   return;
      // }
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
              if (!this.dataset[vm.config.category]) {
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
  },
};
</script>

<style lang="less">
.lateral-sliding {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
}

.lateral-sliding-item {
  display: flex;
  margin: 5px;
  /* background-color: red; */
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

.c-preview {
  background: #000;
  background: -moz-linear-gradient(
    -45deg,
    #000000 0%,
    #000000 25%,
    #1e539e 50%,
    #ff3083 75%,
    #7800a8 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    #000000 0%,
    #000000 25%,
    #1e539e 50%,
    #ff3083 75%,
    #7800a8 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    #000000 0%,
    #000000 25%,
    #1e539e 50%,
    #ff3083 75%,
    #7800a8 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  background-size: 400% 400%;
  background-repeat: no-repeat;
  display: flex;
  // width: 500px;
  // height: 500px;
  max-width: 100vw;
  max-height: 100vh;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  cursor: pointer;
  transition: 0.5s all;

  &__img {
    position: absolute;
    left: 0;
    top: 0;
    background: #000
      url(https://images.unsplash.com/photo-1466657718950-8f9346c04f8f?dpr=1&auto=format&fit=crop&w=800&h=800&q=80&cs=tinysrgb)
      no-repeat center center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.5;
    mix-blend-mode: screen;
  }

  &__title {
    position: relative;
    z-index: 10;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &:hover {
    background-position: 100% 100%;

    &__title {
      text-shadow: 0 0 20px rgba(0, 0, 0, 1);
    }
  }
}
</style>
