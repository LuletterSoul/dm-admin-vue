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
                Style Transfer
              </MenuItem>
            </div>
          </Menu>
        </Row>
      </Header>
      <Row>
        <div class="layout">
          <Content :style="{padding: '24px 0', minHeight: '920pt'}">
            <Layout style="margin-left: 80px">
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

                <Content>
                  <Row>
                    <Col span=3>
                      <Form ref="config" :model='config' :rules="ruleValidate" :label-width="80">
                        <FormItem label="数据集" prop="category">
                          <label>
                            <Select v-model="config.category" @on-change="handleCategoryChange"
                                    :disabled="category_disabled">
                              <Option v-for="item in dataset_options" :value="item.value" :key="item.value">{{
                                  item.label
                                }}
                              </Option>
                            </Select>
                          </label>
                        </FormItem>
                      </Form>
                    </Col>
                    <Col span="2">
                      <Form ref="config" :model='config' :rules="ruleValidate" :label-width="80">
                        <FormItem label="算法类型" prop="alg">
                          <label>
                            <Select v-model="config.alg" :disabled="alg_disabled" @on-change="handleAlgChange">
                              <Option v-for="item in alg_options" :value="item.value" :key="item.value">{{
                                  item.label
                                }}
                              </Option>
                            </Select>
                          </label>
                        </FormItem>
                      </Form>
                    </Col>
                    <Col span=2>
                      <Form ref="config" :model='config' :rules="ruleValidate" :label-width="80">
                        <FormItem label="自动触发" prop="auto_trigger">
                          <Switch v-model="config.auto_trigger" size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                          </Switch>
                        </FormItem>
                      </Form>
                    </Col>

                  </Row>
                  <Row>

                  </Row>
                  <Row>
                    <Col span="7">
                      <Alert type="success" show-icon>
                        <Icon type="ios-eye-outline" slot="icon"></Icon>
                        内容图
                        <template slot="desc">内容图是用户输入的原图，用以获取风格图的风格。</template>
                      </Alert>
                      <Slider v-model="slide_content_index" :step="1" :max="_content_imgs.length"
                              :disabled="this.synthesis_loading"
                              @on-change="handleContentSlider"></Slider>
                      <template v-if="_content_img.source== null">
                        <div class="photo-box">
                          <div class="vertical-element">
                            <template>
                              <Upload
                                ref="content_upload"
                                :show-upload-list="false"
                                :on-success="handleSuccess"
                                :on-progress="handleProgress"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                type="drag"
                                :action="_upload_action_content"
                              >
                                <div style="padding: 20px 0">
                                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                  <p>拖拽或点击上传内容图</p>
                                </div>
                              </Upload>
                              <transition name="fade">
                                <Progress v-if="show_progress" style="margin-top: 20px"
                                          :percent="progress"></Progress>
                              </transition>
                              <Button style="width: 100%; margin-top: 20px" type="primary" ghost shape="circle"
                                      size="large"
                                      @click="selectFromContentLib">从库内选择内容图
                              </Button>
                            </template>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="demo-upload-list">
                          <img
                            :src="_content_img.source"
                            :width="src_w" :height="src_h">
                          <div class="demo-upload-list-cover">
                            <div>
                              <Icon type="ios-eye-outline" @click.native="selectFromContentLib"></Icon>
                              <Icon type="ios-trash-outline" @click.native="handleRemove"></Icon>
                              <Icon type="ios-cog-outline" @click.native="handleContentEdit"></Icon>
                            </div>
                          </div>
                        </div>
                      </template>
                    </Col>

                    <Col offset="1" span="7">
                      <Alert type="warning" show-icon>
                        <Icon type="ios-eye-outline" slot="icon"></Icon>
                        合成图
                        <template slot="desc">合成图尽可能保持原图内容结构，并融合风格图的风格。</template>
                      </Alert>
                      <Progress :percent="synthesis_progress" :stroke-width="20" status="active"
                                style="margin-bottom: 5px"/>
                      <template v-if="_stylization_img.source== null">
                        <div class="photo-box">
                          <div class="vertical-element">
                            <em-placeholder font-size="32px" :show="_stylization_img.source === null">
                              <Icon :type="_stylization_img.source === null ? 'happy-outline' : 'outlet'"></Icon>
                              <p>未合成</p>
                            </em-placeholder>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <transition name="fade">
                          <img
                            :src="_stylization_img.source"
                            :width="src_w" :height="src_h">
                        </transition>
                      </template>
                    </Col>
                    <Col offset="1" span="7">
                      <Alert type="info" show-icon>
                        <Icon type="ios-eye-outline" slot="icon"></Icon>
                        风格图
                        <template slot="desc">风格图提供图片合成所需的风格。</template>
                      </Alert>
                      <Slider v-model="slide_style_index" :step="1" :max="_style_imgs.length"
                              @on-change="handleStyleSlider" :disabled="synthesis_loading"></Slider>
                      <template v-if="_style_img.source== null">
                        <div class="photo-box">
                          <div class="vertical-element">
                            <template>
                              <Upload
                                ref="content_upload"
                                :show-upload-list="false"
                                :on-success="handleSuccess2"
                                :on-progress="handleProgress2"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="handleFormatError2"
                                :on-exceeded-size="handleMaxSize2"
                                :before-upload="handleBeforeUpload2"
                                multiple
                                type="drag"
                                :action="_upload_action_style"
                              >
                                <div style="padding: 20px 0">
                                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                  <p>拖拽或点击上传风格图</p>
                                </div>
                              </Upload>

                              <Button style="width: 100%; margin-top: 20px" type="primary" ghost shape="circle"
                                      size="large"
                                      @click="selectFromStyleLib">从库内选择风格图
                              </Button>
                            </template>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="demo-upload-list">
                          <img
                            :src="_style_img.source"
                            :width="src_w" :height="src_h">
                          <div class="demo-upload-list-cover">
                            <div style="top: 50%">
                              <Icon type="ios-eye-outline" @click.native="selectFromStyleLib"></Icon>
                              <Icon type="ios-trash-outline" @click.native="handleRemove2"></Icon>
                              <Icon type="ios-cog-outline" @click.native="handleStyleEdit"></Icon>
                            </div>
                          </div>
                        </div>
                      </template>
                    </Col>

                  </Row>
                  <Row style="margin-top: 20px">
                    <!--                    <transition name="fade">-->
                    <!--                      <template v-if="synthesis_loading">-->
                    <!--                      </template>-->
                    <!--                    </transition>-->
                  </Row>
                  <Row style="margin-left: 400px;margin-top: 40px">
                    <Col span="16">
                      <Button type="success" long :loading="synthesis_loading" :disabled="_synthesis_disable"
                              @click="showSubmitConfirm=true">
                        <span v-if="synthesis_loading">正在合成</span>
                        <span v-else>合成</span>
                      </Button>
                    </Col>
                  </Row>
                  <Row style="margin-left: 400px;margin-top: 20px">
                    <Col span="16">
                      <Button type="error" long :disabled="!synthesis_loading" @click="showResetConfirm = true">中止
                      </Button>
                    </Col>
                  </Row>
                </Content>
              </transition>
            </Layout>
          </Content>
        </div>
      </Row>
      <img-viewer ref="viewer" @onViewed="detail => {this.content_index = detail.index}"/>
      <img-viewer ref="viewer2" @onViewed="detail => {this.style_index = detail.index}"/>
      <Modal
        v-model="showSubmitConfirm"
        title="提交合成请求"
        @on-ok="requestStylizaitons">
        用 {{ config.alg }} 算法生成风格图
      </Modal>

      <Modal
        v-model="showResetConfirm"
        title="确认中止"
        @on-ok="onReset()">
        <p>中止会清空当前合成进度，是否确认中止？</p>
      </Modal>

    </Layout>
  </div>
</template>
<script>
import * as api from '../../api/index'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import EmPlaceholder from '../components/placeholder'

import {videoPlayer} from 'vue-video-player'
import Timer from './timer'

import ImgViewer from "../components/ImgViewer";
import AxiosUpload from "../components/AxiosUpload"

function genImages() {
  const sourceImages = [];
  const base = Math.floor(Math.random() * 60, 10) + 10;
  for (let i = 0; i < 100; i++) {
    sourceImages.push({
      thumbnail: `https://picsum.photos/id/${base + i}/300/200`,
      source: `https://picsum.photos/id/${base + i}/600/400`
    });
  }
  return sourceImages;
}

export default {
  name: 'StyleTransfer',
  components: {videoPlayer, Timer, ImgViewer, AxiosUpload, EmPlaceholder},
  data() {
    const validateUserId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else if (!isValidUserName(value)) {
        callback(new Error('不合法的用户名！请重新输入'));
      } else {
        callback();
      }
    };
    const isValidUserName = (user_id) => {
      return /^\w+$/.test(user_id);
    };
    return {
      sid: '',
      thumbnail_width: 200,
      thumbnail_height: 300,
      stylized_timestamp: 0,
      stylized_category: 'original',
      src_w: 512,
      src_h: 512,
      slide_content_index: 0,
      slide_style_index: 0,
      content_index: -1,
      content_id: -1,
      style_index: -1,
      style_id: -1,
      content_ids: [],
      style_ids: [],
      style_imgs: [],
      content: {
        url: null,
        file: []
      },
      style: {
        url: '',
        file: []
      },
      stylized: {
        url: '',
        file: []
      },
      pages: {
        page: 0,
        size: 10
      },
      stylization_id: -1,
      progress: 0,
      progress2: 0,
      show_progress: false,
      show_progress2: false,
      synthesis_progress: 0,
      stop_disable: true,
      synthesis_loading: false,
      ruleValidate: {
        user_id: []
      },
      alg_options: [{
        value: 'MAST',
        label: 'MAST'
      }, {
        value: 'CAST',
        label: 'CAST'
      }],
      dataset_options: [
        {
          value: 'WebCaricature',
          label: 'WebCaricature'
        },
        {
          value: 'COCO',
          label: 'COCO'
        },
      ],
      config: {
        user_id: '',
        alg: 'MAST',
        category: 'COCO',
        auto_trigger: true
      },
      alg_disabled: false,
      category_disabled: false,
      content_mask_annotation: {},
      style_mask_annotation: {},
      video_url: '',
      file_tree: [],
      score_types: [],
      current_scores: {},
      check_files: [],
      file_tree_loading: true,
      filenames_loading: false,
      pageSize: 10,
      page: 1,
      score_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      score_view: [],
      button_status: [],
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
      stopTimer: false,
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
      DEFAULT_SCORE: 5,
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
  sockets: {
    //这里是监听connect事件
    connect: function () {
      // this.id = this.$socket.id
      console.log('建立连接')
    },
    disconnect: function () {
      console.log('断开连接')
    },
    reconnect: function () {
      console.log('重新连接')
    },
    onConnected: function (msg) {
      this.sid = msg.sid
      console.log('Server sid', this.sid)
    },
    onSynthesisCompleted: function (msg) {
      if (msg.sid !== this.sid) {
        return
      }
      this.$Message.success('合成成功!');
      this.synthesis_loading = false
      this.stylization_id = msg.stylization_id
      this.synthesis_progress = 100
      this.stylized_timestamp = msg.timestamp
      this.stylized_category = 'original'
    },
    onSynthesisFailed: function (msg) {
      if (msg.sid !== this.sid) {
        return
      }
      this.$Message.error('合成失败!');
      this.synthesis_loading = false
      this.synthesis_progress = 0
      this.stylized_category = 'original'
    },
    onSynthesising: function (msg) {
      if (msg.sid !== this.sid) {
        return
      }
      this.synthesis_progress = msg.percent
    },
    onSynthesisingFetch: function (msg) {
      if (msg.sid !== this.sid) {
        return
      }
      this.synthesis_progress = msg.percent
      this.stylization_id = msg.stylization_id
      this.stylized_timestamp = msg.timestamp
      this.stylized_category = msg.category
    }
  },
  mounted() {
    this.requestContentImages()
    this.requestStyleImages()
    this.requestDatasetCategory()
  },
  computed: {
    _content_mask() {
      let categories = this.content_mask_annotation.categories
      if (categories === undefined) {
        return []
      } else {
        let children = categories[0].annotations[0].compoundPath[1].children
        return children.map(c => {
          return c[1].segments
        })
      }
    },
    _style_mask() {
      let categories = this.style_mask_annotation.categories
      if (categories === undefined) {
        return []
      } else {
        let children = categories[0].annotations[0].compoundPath[1].children
        return children.map(c => {
          return c[1].segments
        })
      }
    },
    _upload_action_content() {
      return `${process.env.SERVER_API}/contents/`
    },
    _upload_action_style() {
      return `${process.env.SERVER_API}/styles/`
    },
    _content_imgs() {
      if (this.content_ids.length) {
        return this.content_ids.map(c => {
          return {
            thumbnail: `${process.env.SERVER_API}/contents/${c}?width=${this.thumbnail_width}&height=${this.thumbnail_height}`,
            source: `${process.env.SERVER_API}/contents/${c}?width=${this.src_w}&height=${this.src_h}`,
          }
        })
      } else {
        return []
      }
    },
    _style_imgs() {
      if (this.style_ids.length) {
        return this.style_ids.map(s => {
          return {
            thumbnail: `${process.env.SERVER_API}/styles/${s}?width=${this.thumbnail_width}&height=${this.thumbnail_height}`,
            source: `${process.env.SERVER_API}/styles/${s}?width=${this.src_w}&height=${this.src_h}`,
          }
        })
      } else {
        return []
      }
    },
    _content_img() {
      if (this.content_id !== -1) {
        // from user upload
        return {
          thumbnail: `${process.env.SERVER_API}/contents/${this.content_id}?width=${this.thumbnail_width}&height=${this.thumbnail_height}`,
          source: `${process.env.SERVER_API}/contents/${this.content_id}?width=${this.src_w}&height=${this.src_h}`,
        }
      } else if (this.content_index !== -1) {
        // from user select from library
        return this._content_imgs[this.content_index]
      } else {
        return {
          thumbnail: null,
          source: null,
        }
      }
    },
    _stylization_img() {
      if (this.stylization_id !== -1) {
        // from user upload
        return {
          thumbnail: `${process.env.SERVER_API}/stylizations/${this.stylization_id}?width=${this.thumbnail_width}&height=${this.thumbnail_height}&timestamp=${this.stylized_timestamp}&category=${this.stylized_category}`,
          source: `${process.env.SERVER_API}/stylizations/${this.stylization_id}?width=${this.src_w}&height=${this.src_h}&timestamp=${this.stylized_timestamp}&category=${this.stylized_category}`,
        }
      } else {
        return {
          thumbnail: null,
          source: null,
        }
      }
    }, _style_img() {
      if (this.style_id !== -1) {
        // from user upload
        return {
          thumbnail: `${process.env.SERVER_API}/styles/${this.style_id}?width=${this.thumbnail_width}&height=${this.thumbnail_height}`,
          source: `${process.env.SERVER_API}/styles/${this.style_id}?width=${this.src_w}&height=${this.src_h}`,
        }
      } else if (this.style_index !== -1) {
        // from user select from library
        return this._style_imgs[this.style_index]
      } else {
        return {
          thumbnail: null,
          source: null,
        }
      }
    },
    _content_id() {
      if (this.content_id !== -1) {
        return this.content_id
      } else if (this.content_index !== -1) {
        return this.content_ids[this.content_index]
      }
      this.content_mask_annotation = {}
    },
    _style_id() {
      if (this.style_id !== -1) {
        return this.style_id
      } else if (this.style_index !== -1) {
        return this.style_ids[this.style_index]
      } else {
        return -1
      }
      this.style_mask_annotation = {}
    },
    _percent() {
      if (this.file_tree.length) {
        return Math.floor(this.pos / (this.file_tree.length) * 100)
      } else {
        return 0
      }
    },
    _default_scores() {
      let default_scores = {};
      for (let i = 0; i < this.current_scores.length; i++) {
        default_scores[this.current_scores[i]['score_type']] = this.current_scores[i]['default_value'];
      }
      return default_scores
    },
    _current_score() {
      let score_res = {'content': this._current_content};
      for (let i = 0; i < this.current_scores.length; i++) {
        score_res[this.current_scores[i]['score_type']] = this.current_scores[i]['value']
      }
      return score_res
    },
    _pos_score() {
      if (this.pos <= this.scores.length - 1) {
        return this.scores[this.pos];
      } else {
        return this._default_scores;
      }
    },
    _synthesis_disable() {
      return this._content_img.source === null || this._style_img.source === null
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

    _src_photos_url() {
      if (this.file_tree.length && this.pos <= this.file_tree.length - 1) {
        return this.file_tree[this.pos]['filenames'].map(f =>
          `${process.env.SERVER_API}/photos/${this.file_tree[this.pos]['content']}/${f}`);
      } else {
        return []
      }
    }

  },
  activated() {
    let annotation = this.$route.params.annotation
    let type = this.$route.params.type
    if (annotation !== undefined) {
      if (type === 'contents') {
        this.content_mask_annotation = annotation
      } else if (type === 'styles') {
        this.style_mask_annotation = annotation
      }
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   console.log()
  //   if (from.annotation === undefined) {
  //     next(vm => {
  //       vm.getQueryList()
  //     })
  //   }
  // },
  methods: {
    resetData() {
      this.content_ids = []
      this.style_ids = []
      this.requestStyleImages()
      this.requestContentImages()
      this.stylization_id = -1
      this.slide_content_index = 0
      this.slide_style_index = 0
      this.progress = 0
      this.progress2 = 0
      this.synthesis_progress = 0
    },
    handleAlgChange(value) {
      if (value === 'CAST') {
        this.config.category = 'WebCaricature'
        this.category_disabled = true
      } else {
        this.category_disabled = false
      }
      this.resetData()
    },
    handleCategoryChange(value) {
      if (value === 'COCO') {
        this.config.alg = 'MAST'
        this.alg_disabled = true
      } else {
        this.alg_disabled = false
      }
      this.resetData()
    },

    handleContentSlider(value) {
      if (value >= 0 && value <= this._content_imgs.length - 1) {
        this.content_index = value
        if (this.config.auto_trigger) {
          this.requestStylizaitons()
        }
      }
    },
    handleStyleSlider(value) {
      if (value >= 0 && value <= this._style_imgs.length - 1) {
        this.style_index = value
        if (this.config.auto_trigger) {
          this.requestStylizaitons()
        }
      }
    },
    handleSocket() {
      this.$socket.client.emit('synthesis');
      console.log('点击触发')
    },
    selectFromContentLib() {
      let vm = this
      new Promise(((resolve, reject) => {
        let res = this.requestContentImages()
        resolve(res)
      })).then((res) => {
        if (vm.content_index !== -1) {
          vm.$refs.viewer.show(
            vm._content_imgs,
            vm.content_index
          );
        } else {
          vm.$refs.viewer.show(
            vm._content_imgs
          );
        }
      }).catch(error => {
        console.log(error)
      })
    },
    selectFromStyleLib() {
      let vm = this
      new Promise(((resolve, reject) => {
        let res = this.requestStyleImages()
        resolve(res)
      })).then((res) => {
        if (vm.style_index !== -1) {
          vm.$refs.viewer2.show(
            vm._style_imgs,
            vm.style_index
          );
        } else {
          vm.$refs.viewer2.show(
            vm._style_imgs
          );
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove() {
      this.content_index = -1
      this.content_id = -1
      this.stylization_id = -1
    },
    handleContentEdit() {
      this.$router.push({name: "annotate", params: {identifier: this._content_id}, query: {type: 'contents'}})
    },
    handleStyleEdit() {
      this.$router.push({name: "annotate", params: {identifier: this._style_id}, query: {type: 'styles'}})
    },
    handleSuccess(res, file) {
      // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      this.content_id = res
      this.show_progress = false
      this.content_index = -1
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '图片格式不正确',
        desc: '《' + file.name + '》格式不正确, 请上传.jpg或.png格式的图片'
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '图片' + file.name + '过大，不能超过2M.'
      });
    },
    handleProgress(progressEvent) {
      this.show_progress = true
      this.progress = progressEvent.loaded / progressEvent.total * 100 | 0
    },
    handleBeforeUpload(file) {
      return true;
    },
    handleView2(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove2() {
      this.style_index = -1
      this.style_id = -1
      this.stylization_id = -1
    },
    handleSuccess2(res, file) {
      // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      this.style_id = res
      this.show_progress2 = false
      this.style_index = -1
    },
    handleFormatError2(file) {
      this.$Notice.warning({
        title: '图片格式不正确',
        desc: '《' + file.name + '》格式不正确, 请上传.jpg或.png格式的图片'
      });
    },
    handleMaxSize2(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '图片' + file.name + '过大，不能超过2M.'
      });
    },
    handleProgress2(progressEvent) {
      this.show_progress2 = true
      this.progress2 = progressEvent.loaded / progressEvent.total * 100 | 0
    },
    handleBeforeUpload2(file) {
      return true;
    },
    onPageSizeChange() {

    },
    isValidUserName(user_id) {
      return /^\w+$/.test(user_id);
    },
    handleSpinShow() {
      this.$Spin.show();
    },
    handleSpinHide() {
      this.$Spin.hide();
    },
    onReset() {
      this.showResetConfirm = false;
      this.$Message.success('中止成功！');
      this.synthesis_loading = false
      this.synthesis_progress = 0
    },
    resetScore: function (scores) {
      for (let i = 0; i < this.current_scores.length; i++) {
        let old_score = this.current_scores[i];
        old_score['value'] = scores[old_score['score_type']];
        this.$set(this.current_scores, i, old_score);
        this.resetRatingButton(i, old_score['value']);
      }
    }, onClickPre() {
      this.saveCurrentScore();
      if (this.pos >= 1) {
        this.pos -= 1;
      } else {
        this.pos = 0
      }
      if (this.scores.length) {
        // this.resetScore(this.scores[this.pos]['shape_score'], this.scores[this.pos]['visual_score']);
        this.resetScore(this._pos_score);

      } else {
        this.resetScore(this._default_scores)
        // this.resetScore(this.DEFAULT_SHAPE_SCORE, this.DEFAULT_VISUAL_SCORE);
      }
    },
    saveCurrentScore: function () {
      if (this.pos === this.scores.length) {
        this.scores.push(this._current_score);
      } else {
        this.$set(this.scores, this.pos, this._current_score);
      }
    }, onClickNext() {
      this.saveCurrentScore();
      if (this.pos <= this.file_tree.length - 1) {
        this.pos += 1;
        this.resetScore(this._pos_score);
      } else {
        this.resetScore(this._default_scores);
        this.pos = this.file_tree.length
      }
    },
    submitRating: function () {
      if (this.config.user_id === '' || !this.isValidUserName(this.config.user_id)) {
        this.submitLoading = false;
        this.$Message.error('提交失败，用户名不合法！');
        return
      }
      let vm = this;
      vm.submitLoading = true;
      return new Promise((resolve, reject) => {
        api.scores.post(this.config.user_id, this.scores).then(res => {
          if (res === 'success') {
            vm.$Message.success('提交成功，感谢参与，祝您生活愉快！');
            setInterval(function () {
              window.location.reload();
            }, 2000)
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
    resetRatingButton: function (score_type_idx, score_value) {
      let button = this.score_view[score_type_idx]['button_type'];
      for (let i = 0; i < button.length; i++) {
        if (i + 1 !== score_value) {
          this.$set(button, i, 'ghost');
          // this.ex_button_status[i] = 'ghost'
        } else {
          this.$set(button, i, this.current_scores[score_type_idx]['bt_type']);
        }
      }
    },
    onClickRatingButton: function (score_type_idx, b_idx, score_value) {
      let score = this.current_scores[score_type_idx];
      score['value'] = score_value;
      this.resetRatingButton(score_type_idx, score_value);
      this.$set(this.current_scores, score_type_idx, score);
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
    requestContentImages() {
      if (this._content_imgs.length > 0) {
        return
      }
      let vm = this;
      // let resultId = this.resultList[0].resultId;
      vm.file_tree_loading = true;
      this.handleSpinShow();
      return new Promise((resolve, reject) => {
        api.contents.gets(this.pages, this.config.category).then(res => {
          if (res !== undefined) {
            vm.content_ids = res.content_ids;
            vm.content_index = 0
            vm.content_id = -1
          } else {
            vm.$Message.error('内容图加载失败，请刷新重试！');
          }
          return resolve(res);
        }).catch(error => {
          return reject(error);
        }).finally(() => {
          vm.handleSpinHide();
          vm.file_tree_loading = false;
        });
      });
    },
    requestDatasetCategory() {
      return new Promise((resolve, reject) => {
        api.category.gets().then(res => {
          this.dataset_options = res
        })
      })
    },
    requestStyleImages() {
      if (this._style_imgs.length > 0) {
        return
      }
      let vm = this;
      // let resultId = this.resultList[0].resultId;
      vm.file_tree_loading = true;
      this.handleSpinShow();
      return new Promise((resolve, reject) => {
        api.styles.gets(this.pages, this.config.category).then(res => {
          if (res !== undefined) {
            vm.style_ids = res.style_ids;
            vm.style_id = -1
            vm.style_index = 0
          } else {
            vm.$Message.error('风格图加载失败，请刷新重试！');
          }
          return resolve(res);
        }).catch(error => {
          return reject(error);
        }).finally(() => {
          vm.handleSpinHide();
          vm.file_tree_loading = false;
        });
      });
    },
    requestStylizaitons() {
      let vm = this;
      this.synthesis_loading = true
      return new Promise((resolve, reject) => {
        api.stylizations.post(this._content_id, this._style_id, this.config.alg, this.sid, this._content_mask, this._style_mask, this.src_w, this.src_h).then(res => {
          return resolve(res);
        }).catch(error => {
          return reject(error);
        }).finally(() => {
          vm.handleSpinHide();
          vm.file_tree_loading = false;
        });
      });
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
    },
    requestScoreTypes() {
      let vm = this;
      return new Promise((resolve, reject) => {
        api.scores.get_score_types().then(res => {
          vm.current_scores = res;
          for (let i = 0; i < vm.current_scores.length; i++) {
            let cb = [];
            let score_rank = [];
            for (let j = 0; j < vm.current_scores[i]['rank']; j++) {
              if (j + 1 === vm.current_scores[i]['value']) {
                cb.push(vm.current_scores[i]['bt_type']);
              } else {
                cb.push('ghost')
              }
            }
            for (let k = 0; k < vm.current_scores[i]['rank']; k++) {
              score_rank.push(k + 1)
            }
            // vm.button_status.push(cb);
            // vm.score_list.push(score_rank)
            vm.score_view.push({
              'button_type': cb,
              'rank_list': score_rank
            })
          }
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
.demo-upload-list {
  display: inline-block;
  width: 512px;
  height: 512px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  /*box-shadow: 0 1px 1px rgba(0, 0, 0, .2);*/
}

.img-block {
  width: 512px;
  height: 512px;
  text-align: center;
  line-height: 60px;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  /*box-shadow: 0 1px 1px rgba(0, 0, 0, .2);*/
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

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

.vertical-element {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 20px;
}


.photo-box {
  width: 100%;
  height: 512px;
  border: 1px solid #515a6e;
  border-radius: 20px;
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
