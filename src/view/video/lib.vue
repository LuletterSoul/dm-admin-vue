<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-row>
                <van-col span="24">
                    <van-button
                            size="small"
                            round
                            type="info"
                            block
                            plain
                            @click="onClickUpload"
                    >从相册上传
                    </van-button
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

            <load-more
                    @onLoad="onLoad"
                    :data-loading="file_tree_loading"
                    :finished="finished"
            >
                <img-content @onClickImg="onClickImg" :imgs="_video_previews" :width="'100%'" :height="'100%'">
                </img-content>
            </load-more>
        </van-pull-refresh>
    </div>
</template>

<script>
    import ImgContent from "@/components/ImgContent.vue";
    import LoadMore from "@/components/LoadMore";

    export default {
        name: "VideoLib",
        components: {ImgContent, LoadMore},
        props: {
            algName: {
                type: String,
                default: "DIST",
            },
            category: {
                type: String,
                default: "Video",
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
                    category: "Video",
                    auto_trigger: true,
                    videoType: "preview",
                },
                pages: {
                    page: 0,
                    size: 15,
                },
                content_imgs: [],
            };
        },
        mounted() {
            this.requesVideoPreviewImgs();
        },
        computed: {
            _videos() {
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
            _video_srcs() {
                return this._videos.map((v) => {
                    return v.video;
                });
            },
            _video_previews() {
                return this._videos.map((v) => {
                    return v.thumbnail;
                });
            },
        },
        methods: {
            onClickImg(index) {
                console.log(index)
                let video = this._videos[index];
                let completed = false;
                let showType = 'video';
                this.$router.push({
                    name: 'style',
                    params: {
                        showType: showType,
                        completed: completed,
                        oriInfo: video,
                        stylizedInfo: {
                            video: '',
                            thumbnail: '',
                            source: ''
                        }

                    }
                })
            },
            onLoad() {
                this.pages.page = this.pages.page + 1;
                this.file_tree_loading = true;
                this.requesVideoPreviewImgs(true);
            },
            requesVideoPreviewImgs(loadNextPage = false) {
                // // // if (this._videos.length > 0) {
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
