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
                    <Col span="7">
                      <Alert type="success" show-icon>
                        <Icon type="ios-eye-outline" slot="icon"></Icon>
                        内容图
                        <template slot="desc">内容图是用户输入的原图，用以获取风格图的风格。</template>
                      </Alert>
                      <template v-if="_content_img.source== null">
                        <div style="width: 512px;height: 512px">
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
                            <div style="top: 50%">
                              <Icon type="ios-eye-outline" @click.native="selectFromContentLib"></Icon>
                              <Icon type="ios-trash-outline" @click.native="handleRemove"></Icon>
                            </div>
                          </div>
                        </div>
                      </template>
                    </Col>
                    <Col offset="1" span="7">
                      <Alert type="info" show-icon>
                        <Icon type="ios-eye-outline" slot="icon"></Icon>
                        风格图
                        <template slot="desc">风格图提供图片合成所需的风格。</template>
                      </Alert>
                      <template v-if="_style_img.source== null">
                        <div style="width: 512px;height: 512px">
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
                              <transition name="fade">
                                <Progress v-if="show_progress2" style="margin-top: 20px"
                                          :percent="progress2"></Progress>
                              </transition>
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
                      <div class="demo-upload-list">
                        <img
                          src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1027022371,2237485812&fm=26&gp=0.jpg"
                          width="256">
                        <div class="demo-upload-list-cover">
                          <div style="top: 50%">
                            <Icon type="ios-upload-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row style="margin-top: 20px">
                    <transition name="fade">
                      <template v-if="synthesis_loading">
                        <Progress :percent="synthesis_progress" :stroke-width="20" status="active"/>
                      </template>
                    </transition>
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
        <Row>
          <Col span="24">
            <Form ref="config" :model='config' :rules="ruleValidate" :label-width="80">
              <FormItem label="算法类型" prop="alg">
                <!--                <Input v-model="config.user_id" placeholder="请输入用户名"></Input>-->
                <label>
                  <Select v-model="config.alg">
                    <Option v-for="item in alg_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </label>
              </FormItem>
            </Form>
          </Col>
        </Row>
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
  components: {videoPlayer, Timer, ImgViewer, AxiosUpload},
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
      thumbnail_width: 200,
      thumbnail_height: 300,
      src_w: 512,
      src_h: 512,
      allImages: [genImages(), genImages(), genImages()],
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
      progress: 0,
      progress2: 0,
      show_progress: false,
      show_progress2: false,
      synthesis_progress: 0,
      stop_disable: true,
      synthesis_loading: false,
      ruleValidate: {
        user_id: [
          {validator: validateUserId, required: true, trigger: 'blur'}
        ]
      },
      alg_options: [{
        value: 'MAST',
        label: 'MAST'
      }, {
        value: 'CAST',
        label: 'CAST'
      }],
      config: {
        user_id: '',
        alg: 'MAST'
      },
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
    onSynthesisCompleted: function (msg) {
      console.log(msg)
      this.$Message.success('合成成功!');
      this.synthesis_loading = false
    },
    onSynthesising: function (msg) {
      this.synthesis_progress = msg.percent
    }
  },
  mounted() {

  },
  computed: {
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
    _style_img() {
      if (this.style_id !== -1) {
        // from user upload
        return {
          thumbnail: `${process.env.SERVER_API}/styles/${this.style_id}?width=${this.thumbnail_width}&height=${this.thumbnail_height}`,
          source: `${process.env.SERVER_API}/styles/${this.style_id}?width=${this.src_w}&height=${this.src_h}`,
          id: this.style_id
        }
      } else if (this.style_index !== -1) {
        // from user select from library
        return this._style_imgs[this.style_index]
      } else {
        return {
          thumbnail: null,
          source: null,
          id: null
        }
      }
    },
    _content_id() {
      if (this.content_id !== -1) {
        return this.content_id
      } else if (this.content_index !== -1) {
        return this.content_ids[this.content_index]
      }
    },
    _style_id() {
      if (this.style_id !== -1) {
        return this.style_id
      } else if (this.style_index !== -1) {
        return this.style_ids[this.style_index]
      } else {
        return -1
      }
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
  methods: {
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
      this.resetScore(this._default_scores);
      this.scores = [];
      this.pos = 0;
      this.showResetConfirm = false;
      this.$Message.success('中止成功！');
      this.synthesis_loading = false
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
      let vm = this;
      // let resultId = this.resultList[0].resultId;
      vm.file_tree_loading = true;
      this.handleSpinShow();
      return new Promise((resolve, reject) => {
        api.contents.gets(this.pages).then(res => {
          if (res !== undefined) {
            vm.content_ids = res.content_ids;
            // vm.content_index = 0
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
    requestStyleImages() {
      let vm = this;
      // let resultId = this.resultList[0].resultId;
      vm.file_tree_loading = true;
      this.handleSpinShow();
      return new Promise((resolve, reject) => {
        api.styles.gets(this.pages).then(res => {
          if (res !== undefined) {
            vm.style_ids = res.style_ids;
            vm.style_id = -1
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
        api.stylizations.post(this._content_id, this._style_id, this.config.alg).then(res => {
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  margin-right: 4px;
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
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
