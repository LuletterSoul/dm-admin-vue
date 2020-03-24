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
                江豚筛选
              </MenuItem>
              <MenuItem name="statistics">
                <Icon type="ios-pulse"></Icon>
                流监控
              </MenuItem>
            </div>
          </Menu>
        </Row>
      </Header>

      <Row>
        <div class="layout">
          <Content :style="{padding: '24px 0', minHeight: '920pt'}">

            <Layout>
              <Row type="flex" justify="center" style="margin-top: 20px">

                <Col span="1">
                  <Tooltip content="归为正样本" placement="top">
                    <Button type="primary" shape="circle" size="large" icon="plus" :disabled="check_files.length <=0"
                            @click="showPlusConfirm=true"></Button>
                  </Tooltip>
                </Col>
                <Col span="1">
                  <Tooltip content="归为负样本" placement="top">
                    <Button type="warning" size="large" shape="circle" icon="minus" :disabled="check_files.length <=0"
                            @click="showMinusConfirm=true"></Button>
                  </Tooltip>
                </Col>
              </Row>
              <transition name="fade">
                <Content v-if="activeRegName==='reg'" :style="{padding: '20px'}">
                  <Row style="margin-top: 20px" :gutter="12">
                    <Col span="12">
                      <Card>
                        <!--                        <em-placeholder :width="'400px'" :height="600" font-size="45px" :show="srcImages.length ===0">-->
                        <!--                          <Icon :type="srcImages.length ? 'happy-outline' : 'outlet'"></Icon>-->
                        <!--                          <p>仪表图像未加载</p>-->
                        <!--                        </em-placeholder>-->
                        <Spin size="large" fix v-if="file_tree_loading || filenames_loading">
                          <!--                          <svg class="circular" viewBox="25 25 50 50">-->
                          <!--                          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>-->
                          <!--                          </svg>-->
                          <!--                          <div>正在加载文件列表...</div>-->
                        </Spin>

                        <Row>
                          <Col span="24">
                            <Cascader :data="file_tree" v-model="selectFolder"
                                      @on-change="handleSelectFolders"></Cascader>
                          </Col>
                        </Row>
                        <Row style="margin-top: 20px">
                          <Col span="24">
                            <Page :total="_files.length" :current="page" :page-size="pageSize" @on-change="onPageChange"
                                  @on-page-size-change="onPageSizeChange" show-sizer
                                  show-elevator size="small"></Page>
                          </Col>
                        </Row>
                        <Row style="margin-top: 20px">
                          <CheckboxGroup v-model="check_files">
                            <Row v-for="(file,index) of _pageDate">
                              <Col span="12">
                                <Checkbox size="large" :label="file.name"></Checkbox>
                              </Col>
                              <Col offset="10" span="1">
                                <Button type="primary" shape="circle" icon="ios-search"
                                        @click="handleVideoView(file.url)"></Button>
                              </Col>
                            </Row>
                          </CheckboxGroup>
                        </Row>
                      </Card>
                    </Col>
                    <Col span="12">
                      <Card>
                        <video-player :options="_playerOptions"></video-player>
                      </Card>
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
        v-model="showPlusConfirm"
        title="确认分类"
        :loading="classifying"
        @on-ok="postCheckedFiles('pos')">
        <p>是否将 {{check_files.length}} 个视频分为江豚正样本？</p>
      </Modal>

      <Modal
        v-model="showMinusConfirm"
        title="确认分类"
        :loading="classifying"
        @on-ok="postCheckedFiles('neg')">
        <p>是否将 {{check_files.length}} 个视频分为江豚负样本？</p>
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
                video_url: 'http://221.226.81.54:1211/video/03240047/8/0324004726_0.mp4',
                file_tree: [],
                check_files: [],
                file_tree_loading: true,
                filenames_loading: false,
                pageSize: 10,
                page: 1,
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
                classifying: true,
                showPlusConfirm: false,
                meterShow: false,
                selectFolder: [],
                display: 1,
                uploadTemplate: false,
                showMinusConfirm: false,
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
            }
        },
        mounted() {
            this.requestFileTree()
        },
        computed: {
            _playerOptions() {
                return {
                    fluid: true,
                    preload: 'auto',
                    sources: [{
                        type: 'video/mp4',
                        src: this.video_url
                    }],
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
            }

        },
        methods: {
            onPageSizeChange(val) {
                this.pageSize = val;
            },
            onPageChange(index) {
                this.page = index;
                let that = this;
                that.file_tree_loading = true;
                setTimeout(() => {
                    that.file_tree_loading = false;
                }, 500);
            },
            postCheckedFiles: function (type) {
                let vm = this;
                vm.classifying = true;
                return new Promise((resolve, reject) => {
                    api.files.post(vm.selectFolder[0], vm.selectFolder[1], vm.selectFolder[2],
                        vm.check_files, type).then(res => {
                        vm.classifying = false
                    }).catch(error => {
                        reject(error);
                    });
                });
            },
            handleSelectFolders: function (value) {
                let vm = this
                vm.filenames_loading = true
                return new Promise((resolve, reject) => {
                    api.files.filenames(value[0], value[1], value[2]).then(res => {
                        vm.files = res;
                        vm.filenames_loading = false;
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    });
                });
            },
            handleVideoView: function (url) {
                this.video_url = url
            },
            loadImage: function (url, name) {
                let res = [];
                let absolute_url = process.env.BASE_API + '/' + url;
                let image = new Image();
                image.src = absolute_url;
                image.onload = function () {
                    res.push({
                        src: absolute_url,
                        msrc: absolute_url,
                        alt: name,
                        title: name,
                        w: this.width,
                        h: this.height,
                    })
                };
                return res;
            },
            onMenuItemSelect(name) {
                // console.log(name);
                this.activeRegName = name;
            },
            requestFileTree() {
                let vm = this;
                // let resultId = this.resultList[0].resultId;
                vm.file_tree_loading = true
                return new Promise((resolve, reject) => {
                    api.files.get().then(res => {
                        vm.file_tree = res;
                        vm.selectFolder = [res[0]['value'], res[0]['children'][0]['value']];
                        vm.file_tree_loading = false;
                        resolve(res);
                    }).catch(error => {
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
