
<template>
    <div>
      <div style="height: 470px;">
      </div>
        <div>
          <van-tabs  @click="onClick" animated>
            <van-tab title="油画">
              <div class="lateral-sliding">
                <div palcement="top" class="lateral-sliding-item1" v-for="(item,index) in items" :key="index">
                  <div class="each-img"></div>
                </div>
              </div>
            </van-tab>
            <van-tab title="漫画">
              <div class="lateral-sliding">
                <div class="lateral-sliding-item2" v-for="(item,index) in items" :key="index">
                  <div class="each-img"></div>
                </div>
              </div>
            </van-tab>
            <van-tab title="水墨画">
              <div class="lateral-sliding">
                <div class="lateral-sliding-item3" v-for="(item,index) in items" :key="index">
                  <div class="each-img"></div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
    </div>
  </template>
  
  <script>
  export default {
  name: "Style",
  prop: {
      alg: {
          type: String,
          default: 'MAST'
      },
  },
  data() {
    return {
        config: {
            user_id: "",
            alg: this.algName,
            category: 'COCO',
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
      items: 10
    };
  },

  mounted() {
    this.requestStyleImages();
  },
  
  computed: {
    _style_imgs() {
      if (this.style_ids.length) {
        return this.style_ids.map((c) => {
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
    onLoad() {
      this.pages.page = this.pages.page + 1;
      this.file_tree_loading = true;
      this.requestStyleImages(true);
    },
    requestStyleImages(loadNextPage = false) {
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
          .gets(this.pages, this.config.category)
          .then((res) => {
            if (res !== undefined) {
              if (loadNextPage) {
                for (let i = 0; i < res.style_ids.length; i++) {
                  vm.style_ids.push(res.style_ids[i]);
                }
              } else {
                vm.style_ids = res.style_ids;
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
  
  <style lang="less"></style>
  <style scoped>
  .lateral-sliding {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .lateral-sliding-item1 {
    display: flex;
    margin-right: 8px;
    background-color: yellow;
  }
  .lateral-sliding-item2 {
    display: flex;
    margin-right: 8px;
    background-color: blue;
  }
  .lateral-sliding-item3 {
    display: flex;
    margin-right: 8px;
    background-color:red;
  }
  .each-img {
    width: 150px;
    height: 88px;
  }
   
  </style>
  
  