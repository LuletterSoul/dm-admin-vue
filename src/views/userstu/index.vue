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
                <Content v-if="activeRegName==='reg'" :style="{padding: '20px'}">
                  <Row>
                    <Col offset="1" :span="23">
                      <Progress :percent="_percent"></Progress>
                    </Col>
                  </Row>
                  <Row v-show="this.pos < this.file_tree.length" style="margin-left: 50px;margin-top: 20px">
                    <Col offset="10" span="1">
                      <Input v-model="this.pos+1" readonly></Input>
                    </Col>
                    <Col style="margin-left: 10px" span="1">
                      <div style="font-size:24px">
                        /
                      </div>
                    </Col>
                    <Col style="margin-left: -50px" span="1">
                      <Input v-model="this.file_tree.length" readonly></Input>
                      <!--                      <InputNumber v-model="this.file_tree.length" readonly></InputNumber>-->
                    </Col>
                  </Row>
                  <Row style="margin-left: -60px;margin-top: 30px;">
                    <Col offset="11" span="4">
                      <div style="font-size: 16px">
                        <timer :auto-start="true" :stop="stopTimer"></timer>
                      </div>
                    </Col>
                  </Row>
                  <Row style="margin-left: 20px;margin-top: 40px">
                    <div class="card-window">
                         <Col span="3" v-for="(url,index) of _src_photos_url" :key="index">
                      <!-- <Card v-for="(url,index) of _src_photos_url" :key="index" style="position: absolute; width: 100px"> -->
                      <Card >
                        <div style="text-align:center">
                          <img :src="url" width="100%" height="100%">
                        </div>
                      </Card>
                      <template v-if="index===0">
                        <div
                          style="font-size:24px;margin-top: 20px;position: absolute; left: 50%; transform: translateX(-50%);">
                          <!--<Button shape="circle"  :type="button_type" >{{index}}</Button>-->
                          内容图
                        </div>
                      </template>
                      <template v-else-if="index===1">
                        <div
                          style="font-size:24px;margin-top: 20px;position: absolute; left: 50%; transform: translateX(-50%);">
                          <!--<Button shape="circle"  :type="button_type" >{{index}}</Button>-->
                          风格图
                        </div>
                      </template>
                      <template v-else>
                        <div
                          style="font-size:24px;margin-top: 20px;position: absolute; left: 50%; transform: translateX(-50%);">
                          <!--<Button shape="circle"  :type="button_type" >{{index}}</Button>-->
                          {{index - 1}}
                        </div>
                      </template>
                    </Col>
                    </div>
                 
                  </Row>
                  <div style="margin-top: 80px;"></div>
                  <Row v-for="(score_type,index) of current_scores" style="margin-left: 200px;margin-top: 40px" :key="index">
                    <Col span="5">
                      <Tooltip :content="score_type['des']">
                        <Tag type="dot" :color="score_type['tag_color']" style="font-size: 24px">{{ score_type['tag'] }}
                        </Tag>
                      </Tooltip>
                    </Col>
                    <Col v-for="(button_type,s_idx) of score_view[index]['button_type']" span="1"
                         style="margin-left: 60px" :key="s_idx">
                      <Button shape="circle" size="large" :type="button_type"
                              @click="onClickRatingButton(index,s_idx,score_view[index]['rank_list'][s_idx])"
                              :disabled="button_states[index][s_idx]">
                        {{ score_view[index]['rank_list'][s_idx] }}
                      </Button>
                    </Col>
                  </Row>

                  <!--                  <Row style="margin-left: 280px;margin-top: 40px">-->
                  <!--                    <Col span="4">-->
                  <!--                      <Tooltip content="指生成图的纹理风格是否接近真实漫画">-->
                  <!--                        <Tag type="dot" color="green" style="font-size: 24px">纹理质量</Tag>-->
                  <!--                      </Tooltip>-->
                  <!--                    </Col>-->
                  <!--                    <Col v-for="(score,index) of score_list" span="1" style="margin-left: 10px">-->
                  <!--                      <Button shape="circle" size="large" :type="visual_button_status[index]"-->
                  <!--                              @click="onClickVisualRating(index,score)">-->
                  <!--                        {{score}}-->
                  <!--                      </Button>-->
                  <!--                    </Col>-->
                  <!--                  </Row>-->
                  <Row style="margin-left: 400px;margin-top: 30px">
                    <Col offset="6" span="2" size="large">
                      <Button type="primary" @click="onClickPre" :disabled="this.pos ===0">上一步</Button>
                    </Col>
                    <Col offset="1" span="2" size="large">
                      <Button type="primary" @click="onClickNext" :disabled="_nextable">下一步
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
                  <!--<Row style="margin-left: 400px;margin-top: 20px"-->
                  <!--v-if="this.file_index+1 < this._data_keys.length && this.pos === this.file_tree.length">-->
                  <!--<Col span="16">-->
                  <!--<Button type="success" long @click="showNextTaskConfirm=true">下个任务</Button>-->
                  <!--</Col>-->
                  <!--</Row>-->
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
        title="确认评分 (提交时点确定，不要回车！)"
        :loading="submitLoading"
        @on-ok="submitRating('pos')">
        <Row>
          <Col span="24">
            <Form ref="user" :model='user' :rules="ruleValidate" :label-width="80">
              <FormItem label="用户名" prop="user_id">
                <Input v-model="user.user_id" placeholder="请输入用户名" @on-enter="console.log('Enter')"></Input>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </Modal>

      <Modal
        v-model="showResetConfirm"
        title="确认重置"
        @on-ok="onReset()">
        <p>重置会清空所有评分数据，是否确认重置？</p>
      </Modal>

      <Modal
        v-model="showNextTaskConfirm"
        title="下一个任务"
        @on-ok="submitNextTask">
        <p>进入下一个任务？</p>
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


  export default {
    name: 'DolphinView',
    components: {videoPlayer, Timer},
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
        ruleValidate: {
          user_id: [
            {validator: validateUserId, required: true, trigger: 'blur'}
          ]
        },
        user: {
          user_id: '',
        },
        video_url: '',
        // file_tree: [],
        file_trees: {},
        file_index: 0,
        score_types: [],
        current_scores: {},
        check_files: [],
        file_tree_loading: true,
        filenames_loading: false,
        pageSize: 10,
        page: 1,
        score_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        score_view: [],
        button_states: [],
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
        showNextTaskConfirm: false,
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
        scores: [],
        score_res: {},
        final: []
      }
    },
    mounted() {
      this.requestFileTree();
      this.requestScoreTypes();
    },
    computed: {
      _data_keys() {
        // console.log(Object.keys(this.file_trees))
        return Object.keys(this.file_trees)
      },
      _data_key() {

        return this._data_keys[this.file_index]
      },
      _next_data_key() {
        if (this._data_keys.length) {
          if (this.file_index + 1 < this._data_keys.length) {
            return this._data_keys[this.file_index + 1]
          } else {
            return this._data_keys[this.file_index]
          }
        } else {
          return ''
        }
      },
      file_tree() {
        if (JSON.stringify(this.file_trees) !== '{}') {
          // return this.file_trees[this._data_key]
          return this.file_trees
        } else {
          return []
        }
      },
      _percent() {
        if (this.file_tree.length) {
          return Math.floor((this.pos) / (this.file_tree.length) * 100)
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
          // alert(this.scores[this.pos])
          return this.scores[this.pos];
        } else {
          return this._default_scores;
        }
      },
      _nextable() {
        if (this.pos === this.file_tree.length) {
          return true;
        } else {
          // alert(this.current_scores.length)
          for (let i = 0; i < this.current_scores.length; i++) {
            if (this.current_scores[i]['value'] === undefined) {
              return true;
            }
          }
          return false;
        }
      },
      // _submitable() {
      //   if (this.pos < this.file_tree.length || this.pos === 0 || this.file_index + 1 < this._data_keys.length) {
      //     this.stopTimer = false;
      //     return true
      //   } else {
      //     this.stopTimer = true;
      //     return false
      //   }
      // },
      _submitable() {
        if (this.pos === this.file_tree.length) {
          this.stopTimer = true;
          return false
        } else {
          this.stopTimer = false;
          return true
        }
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
          return this.file_trees[this.pos]['filenames'].map(f =>
            `${process.env.SERVER_API}/photos/${this.file_tree[this.pos]['content']}/${f}`);
        } else {
          return []
        }
      }

    },
    methods: {
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
        this.$Message.success('重置成功！');
      },
      resetScore: function (scores) {
        for (let i = 0; i < this.current_scores.length; i++) {
          let old_score = this.current_scores[i];
          old_score['value'] = scores[old_score['score_type']];
          this.$set(this.current_scores, i, old_score);
          // alert(old_score['value'])
          this.resetRatingButton(i, old_score['value']);
        }
      },
      onClickPre() {
        this.saveCurrentScore();

        if (this.pos >= 1) {
          this.pos -= 1;
        } else {
          this.pos = 0
        }
        // for(let i=0;i<this.button_states.length;i++){
        //     for(let j=0;j<this.button_states[i].length;j++){
        //       this.button_states[i][j] = false
        //     }
        //   }
        // alert(this.pos)
        if (this.scores.length) {
          // this.resetScore(this.scores[this.pos]['shape_score'], this.scores[this.pos]['visual_score']);
          this.resetScore(this._pos_score);

        } else {
          this.resetScore(this._default_scores)
          // this.resetScore(this.DEFAULT_SHAPE_SCORE, this.DEFAULT_VISUAL_SCORE);
        }
      },
      saveCurrentScore: function () {
        if (this.pos < this.file_tree.length) {
          this.$set(this.scores, this.pos, this._current_score);
        }
        // alert(this.scores[this.pos]);
      },
      onClickNext() {
        this.saveCurrentScore();
        for (let i = 0; i < this.button_states.length; i++) {
          for (let j = 0; j < this.button_states[i].length; j++) {
            this.button_states[i][j] = false
          }
        }
        if (this.pos <= this.file_tree.length - 1) {
          this.pos += 1;
          this.resetScore(this._pos_score);

          if (this.pos === this.file_tree.length) {
            this.$Message.success('谢谢您，已完成所有任务评分！');
            // this.file_index = this.file_index + 1
            this.showSubmitConfirm = true
          }
        } else {
          this.resetScore(this._default_scores);
          this.pos = this.file_tree.length
        }
      },

      submitRating: function () {
        if (this.user.user_id === '' || !this.isValidUserName(this.user.user_id)) {
          this.submitLoading = false;
          this.$Message.error('提交失败，用户名不合法！');
          return
        }
        let vm = this;
        vm.submitLoading = true;

        for (let i = 0; i < this.scores.length; i++) {
          let temfinish = {};
          // console.log(this.scores[i]);
          temfinish['content'] = this.scores[i]['content'];
          for (let j = 0; j < this.current_scores.length; j++) {
            console.log()
            // console.log(this.scores[i][this.current_scores[j]]);
            temfinish[this.current_scores[j]['score_type']] = this.file_tree[i]['filenames'][this.scores[i][this.current_scores[j]['score_type']] + 1];
          }
          vm.final.push(temfinish);
        }
        vm.score_res[this._next_data_key] = vm.final;
        // vm.score_res[this._next_data_key] = this.scores;
        return new Promise((resolve, reject) => {
          api.scores.post(this.user.user_id, this.score_res).then(res => {
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
      submitNextTask() {
        this.score_res[this._data_key] = this.scores
        this.file_index = this.file_index + 1
        this.resetScore(this._default_scores)
        this.pos = 0
        this.scores = [];
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
        // console.log(score_type_idx);
        // alert(b_idx);

        // if (score_type_idx === 0 || score_type_idx === 2) {
        //   let i = score_type_idx + 1
        //   for (let j = 0; j < this.button_states[i].length; j++) {
        //     this.button_states[i][j] = false;
        //   }
        //   this.button_states[i][b_idx] = true;
        // }
        // if (score_type_idx === 1 || score_type_idx === 3) {
        //   let i = score_type_idx - 1
        //   for (let j = 0; j < this.button_states[i].length; j++) {
        //     this.button_states[i][j] = false;
        //   }
        //   this.button_states[i][b_idx] = true;
        // }
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
        // console.log("123")
        return new Promise((resolve, reject) => {
          api.files.user_study().then(res => {
            // console.log(res)
            if (res !== undefined) {
              vm.file_trees = res;
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
            // console.log(res)
            for (let i = 0; i < vm.current_scores.length; i++) {
              let cb = [];
              let score_rank = [];
              let button_state_row = [];
              for (let j = 0; j < vm.current_scores[i]['rank']; j++) {
                if (j + 1 === vm.current_scores[i]['value']) {
                  cb.push(vm.current_scores[i]['bt_type']);
                } else {
                  cb.push('ghost')
                }
                button_state_row.push(false);
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
              vm.button_states.push(button_state_row);
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

  .card-window .ivu-col-span-3{
        width: 10.5%;
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
