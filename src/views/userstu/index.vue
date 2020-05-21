<template>
  <div>
    <Layout>
      <Header>
        <Row type="flex" justify="center">
          <Menu mode="horizontal" theme="dark" :active-name=activeRegName @on-select="onMenuItemSelect">
            <!--          <div class="layout-logo"></div>-->
            <div>
              <MenuItem name="reg">
                <Icon type="ios-speedometer-outline"></Icon>
                User Study
              </MenuItem>
            </div>
          </Menu>
        </Row>
      </Header>

      <Row>
        <div class="layout">
          <Content :style="{padding: '24px 0', minHeight: '920pt'}">

            <Layout>
              <!--              <Row type="flex" justify="center" style="margin-top: 20px" v-if="activeRegName === 'reg'">-->
              <!--                <Col span="1">-->
              <!--                  <Tooltip content="归为正样本" placement="top">-->
              <!--                    <Button type="primary" shape="circle" size="large" icon="plus" :disabled="check_files.length <=0"-->
              <!--                            @click="showPlusConfirm=true"></Button>-->
              <!--                  </Tooltip>-->
              <!--                </Col>-->
              <!--                <Col span="1">-->
              <!--                  <Tooltip content="归为负样本" placement="top">-->
              <!--                    <Button type="warning" size="large" shape="circle" icon="minus" :disabled="check_files.length <=0"-->
              <!--                            @click="showResetConfirm=true"></Button>-->
              <!--                  </Tooltip>-->
              <!--                </Col>-->
              <!--              </Row>-->
              <transition name="fade">
                <Content v-if="activeRegName==='reg'" :style="{padding: '20px'}">
                  <Row>
                    <Col offset="1" :span="23">
                      <Progress :percent="_percent"></Progress>
                    </Col>
                  </Row>
                  <Row v-show="this.pos < this.file_tree.length" style="margin-left: 50px;margin-top: 40px">
                    <Col offset="10" span="1">
                      <Input v-model="this.pos+1" readonly></Input>
                    </Col>
                    <Col style="margin-left: 20px" span="1">
                      <div style="font-size: 24px">
                        /
                      </div>
                    </Col>
                    <Col style="margin-left: -50px" span="1">
                      <Input v-model="this.file_tree.length" readonly></Input>
                      <!--                      <InputNumber v-model="this.file_tree.length" readonly></InputNumber>-->
                    </Col>
                  </Row>
                  <Row style="margin-left: 200px;margin-top: 40px">
                    <Col span="5" v-for="(url,index) of _src_photos_url">
                      <Card>
                        <div style="text-align:center">
                          <img :src="url" width="256">
                        </div>
                      </Card>
                    </Col>
                  </Row>
                  <Row style="margin-left: 280px;margin-top: 40px">
                    <Col span="4">
                      <Tooltip content="指夸张的是否合理是否夸大了人物的主要特征">
                        <Tag type="dot" color="blue" style="font-size: 24px">夸张质量</Tag>
                      </Tooltip>
                    </Col>
                    <Col v-for="(score,index) of score_list" span="1" style="margin-left: 10px">
                      <Button shape="circle" size="large" :type="ex_button_status[index]"
                              @click="onClickShapeRating(index,score)">
                        {{score}}
                      </Button>
                    </Col>
                  </Row>
                  <Row style="margin-left: 280px;margin-top: 40px">
                    <Col span="4">
                      <Tooltip content="指生成图的纹理风格是否接近真实漫画">
                        <Tag type="dot" color="green" style="font-size: 24px">纹理质量</Tag>
                      </Tooltip>
                    </Col>
                    <Col v-for="(score,index) of score_list" span="1" style="margin-left: 10px">
                      <Button shape="circle" size="large" :type="visual_button_status[index]"
                              @click="onClickVisualRating(index,score)">
                        {{score}}
                      </Button>
                    </Col>
                  </Row>
                  <Row style="margin-left: 400px;margin-top: 40px">
                    <Col offset="6" span="2" size="large">
                      <Button type="primary" @click="onClickPre" :disabled="this.pos ===0">上一步</Button>
                    </Col>
                    <Col offset="1" span="2" size="large">
                      <Button type="primary" @click="onClickNext" :disabled="this.pos === this.file_tree.length">下一步
                      </Button>
                    </Col>
                  </Row>
                  <Row style="margin-left: 400px;margin-top: 40px">
                    <Col span="16">
                      <Button type="success" long :disabled="_submitable" @click="showSubmitConfirm=true">提交</Button>
                    </Col>
                  </Row>
                  <Row style="margin-left: 400px;margin-top: 20px">
                    <Col span="16">
                      <Button type="error" long @click="showResetConfirm = true">重置</Button>
                    </Col>
                  </Row>
                </Content>
              </transition>
              <transition name='fade'>
                <Content v-if="activeRegName==='statistics'" :style="{padding: '20px'}">
                  <Row>
                    <Col span="24">
                      <Card>
                        <video-player :options="_playerOptions"></video-player>
                      </Card>
                    </Col>
                  </Row>
                </Content>
              </transition>
            </Layout>
          </Content>
        </div>
      </Row>
      <Modal
        v-model="showSubmitConfirm"
        title="确认评分"
        :loading="submitLoading"
        @on-ok="submitRating('pos')">
        <Row>
          <Col span="24">
            <Input v-model="user_id" placeholder="请输入用户ID"></Input>
          </Col>
        </Row>
      </Modal>

      <Modal
        v-model="showResetConfirm"
        title="确认重置"
        @on-ok="onReset()">
        <p>重置会清空所有评分数据，是否确认重置？</p>
      </Modal>

    </Layout>
  </div>
</template>
<script>
    import * as api from '../../api/index'
    import VueVideoPlayer from 'vue-video-player'
    import 'video.js/dist/video-js.css'

    import {videoPlayer} from 'vue-video-player'


    export default {
        name: 'DolphinView',
        components: {videoPlayer},
        data() {
            return {
                user_id: '',
                video_url: '',
                file_tree: [],
                check_files: [],
                file_tree_loading: true,
                filenames_loading: false,
                pageSize: 10,
                page: 1,
                score_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                ex_button_status: ['ghost', 'ghost', 'ghost', 'ghost', 'primary', 'ghost', 'ghost', 'ghost', 'ghost', 'ghost'],
                visual_button_status: ['ghost', 'ghost', 'ghost', 'ghost', 'success', 'ghost', 'ghost', 'ghost', 'ghost', 'ghost'],
                folders: [{
                    value: '03201823',
                    label: '03201823',
                    children: [
                        {
                            value: 'original',
                            label: '原始视频'
                        },
                        {
                            value: 'render',
                            label: '渲染视频'
                        }
                    ]
                }, {
                    value: '03201824',
                    label: '03201824',
                    children: [
                        {
                            value: 'original',
                            label: '原始视频'
                        },
                        {
                            value: 'render',
                            label: '渲染视频'
                        }
                    ]
                }],
                files: [],
                selectFile: '',
                submitLoading: true,
                showSubmitConfirm: false,
                meterShow: false,
                selectFolder: [],
                display: 1,
                uploadTemplate: false,
                showResetConfirm: false,
                uploadSrcImg: false,
                uploadBatch: false,
                // activeRegName: 'statistics',
                activeRegName: 'reg',
                isFetched: false,
                isUploadedSrc: false,
                isReading: false,
                realValue: null,
                readingValue: null,
                selectedFilename: '1-1.jpg',
                srcIndex: 0,
                srcIds: [],
                batchRegResults: [],
                srcParentDir: 'images',
                //local display
                srcImages: [],
                srcResult: [],
                srcImagesFileList: [],
                templateFileList: [],
                statistics: [],
                allStat: [],
                res: {},
                hostImgMap: {},
                DEFAULT_SHAPE_SCORE: 5,
                DEFAULT_VISUAL_SCORE: 5,
                shape_score: 5,
                visual_score: 5,
                pointerAlgOptions: [{
                    value: 0,
                    label: '径向直线积分'
                },
                    {
                        value: 1,
                        label: '区域点搜索'
                    }],
                pointerAlgType: 0,
                enableFitting: false,
                pos: 0,
                scores: []
            }
        },
        mounted() {
            this.requestFileTree();
        },
        computed: {
            _percent() {
                if (this.file_tree.length) {
                    return Math.floor(this.pos / (this.file_tree.length) * 100)
                } else {
                    return 0
                }
            },
            _submitable() {
                return this.pos < this.file_tree.length || this.pos === 0
            },
            _playerOptions() {
                return {
                    fluid: true,
                    preload: 'auto',
                    sources: [{
                        type: 'video/mp4',
                        src: this.video_url
                    }],
                    notSupportedMessage: '此视频暂时无法播放，请稍后重试',
                    loop: true,
                    autoplay: true,
                    controls: true,
                }
            },

            _files() {
                return this.files.map(f => {
                    return {
                        name: f,
                        url: `${process.env.SERVER_API}/video/${this.selectFolder[0]}/${this.selectFolder[1]}/${this.selectFolder[2]}/${f}`
                    }
                })
            },

            _pageDate() {
                return this._files.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
            },
            _navigate() {
                if (this.selectFolder.length) {

                    return this.selectFolder[0] + ' / ' + this.selectFolder[1] + ' / ' + this.selectFolder[2] +
                        ' / ' + this.selectFile;
                } else {
                    return ''
                }
            },
            _current_content() {
                if (this.file_tree.length && this.pos <= this.file_tree.length - 1) {
                    return this.file_tree[this.pos]['content']
                } else {
                    return this.file_tree[this.file_tree.length - 1]['content']
                }
            },
            _src_photos_url() {
                if (this.file_tree.length && this.pos <= this.file_tree.length - 1) {
                    return this.file_tree[this.pos]['filenames'].map(f =>
                        `${process.env.SERVER_API}/photos/${this.file_tree[this.pos]['content']}/${f}`);
                } else {
                    return []
                }
            }

        },
        methods: {
            onPageSizeChange() {

            },
            handleSpinShow() {
                this.$Spin.show();
            },
            handleSpinHide() {
                this.$Spin.hide();
            },
            onReset() {
                this.resetScore(this.DEFAULT_SHAPE_SCORE, this.DEFAULT_VISUAL_SCORE);
                this.scores = [];
                this.pos = 0;
                this.showResetConfirm = false;
                this.$Message.success('重置成功！');
            },
            resetScore: function (shape_score, visual_score) {
                this.shape_score = shape_score;
                this.visual_score = visual_score;
                this.resetExRatingButton(this.shape_score - 1);
                this.resetVisualRatingButton(this.visual_score - 1);
            }, onClickPre() {
                // this.scores.pop();
                this.saveCurrentScore();
                if (this.pos >= 1) {
                    this.pos -= 1;
                } else {
                    this.pos = 0
                }
                if (this.scores.length) {
                    this.resetScore(this.scores[this.pos]['shape_score'], this.scores[this.pos]['visual_score']);
                } else {
                    this.resetScore(this.DEFAULT_SHAPE_SCORE, this.DEFAULT_VISUAL_SCORE);
                }
                // this.ex_button_status = ['ghost', 'ghost', 'ghost', 'ghost', 'ghost', 'ghost', 'ghost', 'primary', 'ghost', 'ghost'];
                // this.visual_button_status = ['ghost', 'ghost', 'ghost', 'ghost', 'ghost', 'ghost', 'ghost', 'success', 'ghost', 'ghost'];
            },
            saveCurrentScore: function () {
                if (this.pos === this.scores.length) {
                    this.scores.push({
                        'content': this._current_content,
                        'shape_score': this.shape_score,
                        'visual_score': this.visual_score
                    });
                } else {
                    this.$set(this.scores, this.pos, {
                        'content': this._current_content,
                        'shape_score': this.shape_score,
                        'visual_score': this.visual_score
                    });
                }
            }, loadNextScore: function () {
                if (this.pos <= this.scores.length - 1) {
                    this.shape_score = this.scores[this.pos]['shape_score'];
                    this.visual_score = this.scores[this.pos]['visual_score'];
                } else {
                    this.shape_score = this.DEFAULT_SHAPE_SCORE;
                    this.visual_score = this.DEFAULT_VISUAL_SCORE;
                }
            }, onClickNext() {
                this.saveCurrentScore();
                if (this.pos <= this.file_tree.length - 1) {
                    this.pos += 1;

                } else {
                    this.pos = this.file_tree.length
                }
                this.loadNextScore();
                this.resetVisualRatingButton(this.visual_score - 1);
                this.resetExRatingButton(this.shape_score - 1);
            },

            onPageChange(index) {
                this.page = index;
                this.check_files = [];
                let that = this;
                that.file_tree_loading = true;
                setTimeout(() => {
                    that.file_tree_loading = false;
                }, 500);
            },

            submitRating: function (type) {
                let vm = this;
                vm.submitLoading = true;
                return new Promise((resolve, reject) => {
                    api.scores.post(this.user_id, this.scores).then(res => {
                        if (res === 'success') {
                            vm.$Message.success('提交成功，感谢参与，祝您生活愉快！');

                        } else {
                            vm.$Message.error('提交失败，请再次提交！');
                        }
                        vm.submitLoading = false;
                        vm.showSubmitConfirm = false;
                        vm.showMiConfirm = false;
                        vm.check_files = []
                    }).catch(error => {
                        vm.showSubmitConfirm = false;
                        vm.showMiConfirm = false;
                        vm.$Message.error('提交失败！');
                        reject(error);
                    });
                });
            },
            handleSelectFolders: function (value) {
                let vm = this;
                vm.filenames_loading = true;
                this.selectFolder = value;
                return new Promise((resolve, reject) => {
                    api.files.filenames(value[0], value[1], value[2]).then(res => {
                        vm.files = res;
                        vm.filenames_loading = false;
                        vm.page = 1;
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    });
                });
            },
            resetExRatingButton: function (index) {
                for (let i = 0; i < this.ex_button_status.length; i++) {
                    if (i !== index) {
                        this.$set(this.ex_button_status, i, 'ghost');
                        // this.ex_button_status[i] = 'ghost'
                    } else {
                        this.$set(this.ex_button_status, i, 'primary');
                    }
                }
            }, onClickShapeRating: function (index, score) {
                this.resetExRatingButton(index);
                this.shape_score = score
            },
            resetVisualRatingButton: function (index) {
                for (let i = 0; i < this.visual_button_status.length; i++) {
                    if (i !== index) {
                        this.$set(this.visual_button_status, i, 'ghost');
                        // this.ex_button_status[i] = 'ghost'
                    } else {
                        this.$set(this.visual_button_status, i, 'success');
                    }
                }
            }, onClickVisualRating: function (index, score) {
                this.resetVisualRatingButton(index);
                this.visual_score = score
            },
            handleRefresh: function () {
                let vm = this;
                vm.filenames_loading = true;
                return new Promise((resolve, reject) => {
                    api.files.filenames(this.selectFolder[0], this.selectFolder[1], this.selectFolder[2]).then(res => {
                        vm.files = res;
                        vm.filenames_loading = false;
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    });
                });
            },
            handleVideoView: function (file) {
                this.video_url = file.url;
                this.selectFile = file.name;
            },
            onMenuItemSelect(name) {
                // console.log(name);
                this.activeRegName = name;
            },
            requestFileTree() {
                let vm = this;
                // let resultId = this.resultList[0].resultId;
                vm.file_tree_loading = true;
                this.handleSpinShow();
                return new Promise((resolve, reject) => {
                    api.files.user_study().then(res => {
                        if (res !== undefined) {
                            vm.file_tree = res;
                        } else {
                            vm.$Message.error('图片加载失败，请刷新重试！');
                        }
                        vm.handleSpinHide();
                        vm.file_tree_loading = false;
                        resolve(res);
                    }).catch(error => {
                        vm.handleSpinHide();
                        reject(error);
                    });
                });
            }
        }
    }
</script>

<style>
  .layout {
    border: 1px solid #d7dde4;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    background: url("../../assets/5.jpg");
  }

  .my-gallery figure {
    margin: 5px;
    display: inline-block;
    /*box-shadow: 0 0 10px #CCCCCC;*/
  }

  .my-gallery figure img {
    width: 210px;
    vertical-align: middle;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
  }

  .layout-footer-center {
    text-align: center;
  }

  .photo-box {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  center {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
