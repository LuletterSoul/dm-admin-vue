<template>
  <div>
    <div class="bar-image">
      <!--      bottom bar-->
      <div class="bottom-bar">
        <van-icon
          name="close"
          class="icon-background"
          color="white"
          size="30px"
          style="margin-left: 10px"
          @click="onClose"
        />
        <van-icon
          v-if="_eyeOpened"
          name="eye-o"
          class="icon-background"
          color="white"
          size="30px"
          @click="onChangeEye"
        />
        <van-icon
          v-else
          name="closed-eye"
          class="icon-background"
          color="white"
          size="30px"
          @click="onChangeEye"
        />

        <van-icon
          name="passed"
          class="icon-background"
          color="white"
          size="30px"
          style="margin-right: 10px"
          @click="onDownload"
        />
      </div>
      <!--      top bar-->
      <!-- <div class="top-bar">
        <template>
        </template>
      </div> -->
      <!--    结果展示div-->
      <div class="image-div">
        <div class="image">
          <single-transition
            :in-style="'transition.fadeIn'"
            :out-style="'transition.fadeOut'"
          >
            <van-image
              v-bind:src="_showImageUrl"
              fit="contain"
              width="100%"
              height="100%"
              lazy-load
              @load="onImgLoadDone"
              @error="onImgLoadError"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </single-transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* .bar-image {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
} */

/* .bar-image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
} */

.top-bar {
  width: 100vw;
  height: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-div {
  /* width: 100vw; */
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 95%;
  height: 95%;
  /* box-shadow: 10px 5px 5px black; */
  border-radius: 5px;
}

/* .image .van-image {
  background-color: rgba(0, 0, 0, 0.85);
} */

.bottom-bar {
  width: 100vw;
  height: 20vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-background {
  /*background-color: white;*/
  /*border-radius: 50%;*/
  /*box-shadow: 10px 5px 5px black;*/
}
</style>

<script>
import axios from "axios";
import { saveAs } from "file-saver";
import SingleTransition from "./SingleTransition.vue";

export default {
  components: { SingleTransition },
  name: "ImagePreviewer",
  props: {
    completed: {
      type: Boolean,
      default: false,
    },
    oriInfo: {
      type: Object,
      default: () => {
        return {
          video:
            "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
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
  },
  data() {
    return {
      viewRes: false,
      loadDone: false,
    };
  },

  computed: {
    _showImageUrl() {
      if (this.completed && this.viewRes) {
        return this.stylizedInfo.source;
      } else {
        return this.oriInfo.source;
      }
      // return this.completed && this.viewRes && this.loadDone
      // ? this.stylizedInfo.source
      // : this.oriInfo.source;
    },
    _eyeOpened() {
      return this.completed && this.viewRes;
    },
  },
  watch: {
    stylizedInfo() {
      this.viewRes = true;
    },
  },
  methods: {
    onImgLoadError() {
      this.$toast.error({ message: "图片加载失败！" });
    },

    onImgLoadDone() {
      this.loadDone = true;
    },

    onChangeEye() {
      if (this.completed) {
        // this.$emit("onChangeView");
        this.viewRes = !this.viewRes;
      } else {
        this.$toast.fail("图片尚未渲染完成!");
      }
    },
    onClose() {
      // this.$router.back();
      this.$emit("onCloseStyle");
    },
    onDownload() {
      axios({
        method: "get",
        url: this._showImageUrl,
        responseType: "blob",
      })
        .then((res) => {
          var timestamp = Date.parse(new Date());
          var filename = timestamp + ".jpg";
          saveAs(res.data, filename);
        })
        .catch((error) => {
          console.log(error);
          this.$toast.fail({
            message: "下载失败!",
            forbidClick: true,
          });
        })
        .finally(() => {
          this.$toast.success({
            message: "下载成功!",
            forbidClick: true,
          });
        });
    },
  },
};
</script>
