<template>
  <div>
    <van-nav-bar
      :title="this.titleName"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content_container" ref="__container_id">
      <div class='func'>
      <func-card :icon="'user-o'" :func="'漫画生成'"> </func-card>
      </div>
      <div class='func'>
      <func-card :icon="'flower-o'" :func="'场景转换'"> </func-card>
      </div>
      <div class='func'>
      <func-card :icon="'fire-o'" :func="'纹理迁移'"> </func-card>
      </div>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import Content from "./content.vue";
import FuncCard from "./func_card.vue";

export default {
  name: "Photo",
  components: { Content, FuncCard },
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

  computed: {
    ...mapState("photo", ["titleName"]),
  },

  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickUpload() {
      this.$refs.img_uploader.$refs.input.click();
    },
  },
};
</script>

<style lang="less">
.content_container {
  margin: 20px;
}

.func{
  margin-top: 20px;
}
// .select_button {

//   margin: 15px;
// }
</style>
