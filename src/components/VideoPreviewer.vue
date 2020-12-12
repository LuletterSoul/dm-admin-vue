<template>
  <div>
    <div class="bar-image">
      <!--      top bar-->
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
      <!-- <div class="top-bar">
        <template>
        </template>
      </div> -->
      <!--    结果展示div-->
      <div class="video-div">
        <div class="video">
          <transition name="van-fade" mode="out-in">
            <video-player
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="_playerOptions"
            ></video-player>
          </transition>
        </div>
      </div>
      <!--      bottom bar-->
    </div>
  </div>
</template>

<style>
/* .bar-image {
        width: 100vw;
        height: 140vw;
        background-color: rgba(0, 0, 0, 0.85)
    } */

.top-bar {
  width: 100vw;
  height: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-div {
  width: 100vw;
  height: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video {
  width: 95%;
  box-shadow: 10px 5px 5px black;
  border-radius: 5px;
}

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

.video-js .vjs-big-play-button {
  font-size: 5vw;
  line-height: 10vw;
  height: 10vw;
  width: 20vw;
  position: absolute;
  top: 40%;
  left: 40%;
  /*width: 20% !important;*/
  /*height: 20% !important;*/
  /*display: flex !important;*/
  /*justify-content: center !important;*/
  /*align-items: center !important;*/
}

/*.video-js .vjs-big-play-button .vjs-icon-placeholder{*/
/*      align-items: center;*/
/*}*/

/*.vjs-icon-play:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before, .video-js .vjs-play-control .vjs-icon-placeholder:before {*/
/*    content: "\f101";*/
/*    font-size: 8vw;*/
/*    text-align: center;*/
/*}*/
</style>

<script>
import axios from "axios";
import { saveAs } from "file-saver";

export default {
  name: "VideoPreviewer",
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
          source: "",
        };
      },
    },
    stylizedInfo: {
      type: Object,
      default: () => {
        return {
          video:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          thumbnail: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
          source: "",
        };
      },
    },
  },
  data() {
    return {
      viewRes: false,
    };
  },
  watch: {
    stylizedInfo() {
      this.viewRes = true;
    },
  },
  computed: {
    _showVideoUrl() {
      return this.completed && this.viewRes
        ? this.stylizedInfo.video
        : this.oriInfo.video;
    },
    _showPoster() {
      return this.completed && this.viewRes
        ? this.stylizedInfo.thumbnail
        : this.oriInfo.thumbnail;
    },
    _eyeOpened() {
      return this.completed && this.viewRes;
    },
    _playerOptions() {
      return {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: this._showVideoUrl, // 路径
            type: "video/mp4", // 类型
          },
        ],
        poster: this._showPoster, //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true, //全屏按钮
        },
      };
    },
  },
  methods: {
    onChangeEye() {
      if (this.completed) {
        // this.$emit("onChangeView");
        this.viewRes = !this.viewRes;
      } else {
        this.$toast.fail("视频尚未渲染完成!");
      }
    },
    onClose() {
      // this.$router.back();
      this.$emit("onCloseStyle");
    },
    handleFullscreen() {},
    onDownload() {
      axios({
        method: "get",
        url: this._showVideoUrl,
        responseType: "blob",
      })
        .then((res) => {
          var timestamp = Date.parse(new Date());
          var filename = timestamp + ".mp4";
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
    // onDownload() {
    //     this.$toast.fail('视频暂不支持下载!')
    // },
  },
};
</script>
