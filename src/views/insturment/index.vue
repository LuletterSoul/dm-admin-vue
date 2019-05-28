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
                仪表识别
              </MenuItem>
              <MenuItem name="statistics">
                <Icon type="ios-pulse"></Icon>
                统计分析
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
                  <Tooltip content="加载仪表模板" placement="top">
                    <Button type="primary" shape="circle" size="large" icon="load-b"
                            @click="uploadTemplate=true"></Button>
                  </Tooltip>
                </Col>
                <Col span="1">
                  <Tooltip content="加载仪表配置" placement="top">
                    <Button type="warning" shape="circle" icon="document" @click="uploadConfig=true"></Button>
                  </Tooltip>
                </Col>
                <Col span="1">
                  <Tooltip content="加载仪表图像集" placement="top">
                    <Button type="success" shape="circle" icon="folder" @click="uploadSrcImg=true"></Button>
                  </Tooltip>
                </Col>
                <Col span="1">
                  <Tooltip content="批量识别" placement="top">
                    <Button type="error" ghost shape="circle" icon="ios-speedometer-outline"
                            @click="showBatchModel = true"></Button>
                  </Tooltip>
                </Col>
                <!--                  <Tooltip content="显示识别过程" placement="top">-->
                <!--                    <Button type="error" shape="circle" icon="folder" :disabled="!isUploadedSrc"-->
                <!--                            @click="handleFetchAlgImg"></Button>-->
                <!--                  </Tooltip>-->
              </Row>
              <Row type="flex" justify="center" style="margin-top: 20px">
                <Col span="3">
                  <Select v-model="pointerAlgType">
                    <Option v-for="item in pointerAlgOptions" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </Col>
                <Col offset="1" span="3">
                  <el-switch
                    :width="40"
                    v-model="enableFitting"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="启用拟合"
                    inactive-text="禁用拟合"></el-switch>
                </Col>
              </Row>
              <transition name="fade">
                <Content v-if="activeRegName==='reg'" :style="{padding: '20px'}">
                  <Row style="margin-top: 20px" :gutter="12">
                    <Col span="12">
                      <Card style="min-height: 600pt">
                        <em-placeholder :width="'400px'" :height="600" font-size="45px" :show="srcImages.length ===0">
                          <Icon :type="srcImages.length ? 'happy-outline' : 'outlet'"></Icon>
                          <p>仪表图像未加载</p>
                        </em-placeholder>
                        <div v-if="srcImages.length">
                          <Row style="margin-top: 20px">
                            <Form :label-width="60" inline>
                              <Col span="4">
                                <FormItem label="真值">
                                  <Input v-model="_res.realValue" readonly></Input>
                                </FormItem>
                              </Col>
                              <Col span="4">
                                <FormItem label="识别值">
                                  <Input v-model="_res.value" readonly>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="4">
                                <FormItem label="绝对误差">
                                  <Input v-model="_res.absoluteError" readonly>
                                    <span slot="append">%</span>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="4">
                                <FormItem label="相对误差">
                                  <Input v-model="_res.relativeError" readonly>
                                    <span slot="append">%</span>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="4">
                                <FormItem label="耗时">
                                  <Input v-model="_res.timeConsumption" readonly>
                                    <span slot="append">s</span>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="2">
                                <FormItem>
                                  <Button type="primary" @click="handleReading" :loading="isReading">{{ _readingText
                                    }}
                                  </Button>
                                </FormItem>
                              </Col>
                            </Form>
                          </Row>
                          <Row style="margin-top: 20px" type="flex" justify="center">
                            <Page :total="_meterList.length" :page-size="1" :current="srcIndex" simple
                                  @on-change="onChangeSrcImg"></Page>
                          </Row>
                          <Row style="margin-top: 20px">
                            <transition name="fade">
                              <img v-if="meterShow" width="100%" :src="_currentSrcUrl">
                            </transition>
                          </Row>
                        </div>
                      </Card>
                    </Col>
                    <Col span="12">
                      <Card style="min-height: 600pt">
                        <em-placeholder v-if="_res.proc.length === 0" :width="'400px'" :height="600" font-size="45px"
                                        :show="_res.proc.length ===0">
                          <Icon :type="'outlet'"></Icon>
                          <p>仪表图像未识别</p>
                        </em-placeholder>
                        <transition name="fade">
                          <vue-preview style="width: 100%;height: 300px" :slides="_res.proc" @close="handleClose">
                          </vue-preview>
                        </transition>
                      </Card>
                    </Col>
                    <!--                  <Col offset="1" span="11">-->
                    <!--                    <transition name="fade">-->
                    <!--                      <Carousel v-if="isFetched" v-model="value1" :height="600" loop>-->
                    <!--                      <CarouselItem>-->
                    <!--                        <div class="demo-carousel">1</div>-->
                    <!--                      </CarouselItem>-->
                    <!--                      <CarouselItem>-->
                    <!--                        <div class="demo-carousel">2</div>-->
                    <!--                      </CarouselItem>-->
                    <!--                      <CarouselItem>-->
                    <!--                        <div class="demo-carousel">3</div>-->
                    <!--                      </CarouselItem>-->
                    <!--                      <CarouselItem>-->
                    <!--                        <div class="demo-carousel">4</div>-->
                    <!--                      </CarouselItem>-->
                    <!--                      </Carousel>-->
                    <!--                    </transition>-->

                    <!--                  </Col>-->
                  </Row>
                </Content>
              </transition>
              <transition name='fade'>
                <Content v-if="activeRegName==='statistics'" :style="{padding: '20px'}">
                  <stat :stat="statistics" :display="display" :all-stat="allStat"></stat>
                </Content>
              </transition>
            </Layout>
          </Content>
        </div>
      </Row>
      <Modal
        v-model="showBatchModel"
        title="批量识别"
        :loading="batchReading"
        @on-ok="handleBatchReg">
        <p>批量识别所有样张需要等待较长时间。</p>
      </Modal>
      <upload-dialog :title="'加载仪表模板'"
                     :format="'image/jpg,image/jpg,image/jpeg'"
                     :message="'上传成功'"
                     :multiple="true"
                     :text="'上传仪表的模板，作为读数的先验'"
                     :upload-req="uploadTemplateReq"
                     @onUploaded="onTemplateUploaded"
                     @onFailed="uploadTemplate=false"
                     @onClosed="uploadTemplate =false"
                     :to-visible="uploadTemplate"
      ></upload-dialog>
      <upload-dialog :title="'加载仪表配置'"
                     :format="'.json'"
                     :message="'上传成功'"
                     :multiple="true"
                     :upload-req="uploadConfigReq"
                     :text="'上传仪表规格和算法配置'"
                     @onUploaded="onConfigUploaded"
                     @onFailed="uploadConfig=false"
                     @onClosed="uploadConfig=false"
                     :to-visible="uploadConfig"
      ></upload-dialog>

      <upload-dialog :title="'上传仪表图像集'"
                     :message="'上传成功'"
                     :format="'image/jpg,image/jpg,image/jpeg'"
                     :multiple="true"
                     :upload-req="uploadSrcReq"
                     :text="'上传一张需要读数的图片'"
                     @onUploaded="onInsUpload"
                     @onChange="handleSrcImageList"
                     @onSubmit="handleSrcImageSubmit"
                     @onFailed="uploadSrcImg=false"
                     @onClosed="uploadSrcImg=false"
                     :to-visible="uploadSrcImg"
      ></upload-dialog>

      <!--      <Content :style="{margin: '88px 20px 0', background: '#fff',minHeight: '1000px'}">-->

      <!--      </Content>-->
      <!--      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>-->
    </Layout>
  </div>
</template>
<script>
  import Stat from '../insturment/stat';
  import EmPlaceholder from '../../components/placeholder';
  import * as api from '../../api/index'
  import BackToTop from "../../components/BackToTop/index";

  export default {
    name: 'Instrument',
    components: {BackToTop, Stat, EmPlaceholder},
    data() {
      return {
        batchReading: true,
        showBatchModel: false,
        meterShow: false,
        value1: 0,
        display: 1,
        uploadTemplate: false,
        uploadConfig: false,
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
      api.ins_result.get().then(res => {
        this.allStat = res;
      });
    },
    computed: {
      _srcId() {
        return this.hostImgMap[this.srcIndex];
      },
      _meterList() {
        if (this.srcImages.length) {
          return this.srcImages.map(s => s.title);
        } else {
          return [];
        }
      },
      _currentSrcUrl() {
        if (this._meterList.length) {
          return this.srcImages[this.srcIndex - 1].url;
        }
        return '';
      },
      _currentImgName() {
        return this._meterList[this.srcIndex - 1];
      },

      _res() {
        let res = this.res[this._currentImgName];
        if (res === undefined) {
          return {
            realValue: null,
            readingValue: null,
            absoluteError: null,
            relativeError: null,
            timeConsumption: null,
            proc: []
          }
        }
        res.proc.sort(function (a, b) {
          return a.order - b.order;
        });
        return res;
      },
      _readingText() {
        if (this.isReading) {
          return '识别中';
        } else {
          return '开始识别';
        }
      },
    },
    methods: {
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
      onTemplateUploaded(fd) {
        this.isUploadedSrc = true;
      },
      handleImported(res) {
        this.uploadTemplate = false;
      },
      onInsUpload() {

      },
      handleTemplateFileList(fileList) {
        // console.log(fileList);
        this.templateFileList = [];
        // this.constructSlides(fileList, this.templateFileList);
        // this.templateFileList = fileList;
      },
      handleSrcImageList(fileList) {
        this.srcImagesFileList = fileList;
        // update index if user uploads meter image
        if (this.srcImagesFileList.length) {
          this.srcIndex = 1;
        }
        // this.constructSlides(fileList, this.srcImages);
        // console.log(this.srcImages);
      }, regReq(fd) {
        let vm = this;
        // let resultId = this.resultList[0].resultId;
        return new Promise((resolve, reject) => {
          api.ins_result.post(srcId).then(res => {
            vm.uploadSrcImg = false;
            //this.getFileNames();
            resolve(res);
          }).catch(error => {
            reject(error);
          });
        });
      },
      handleBatchReg() {
        this.activeRegName = 'statistics';
        this.display = 2;
        if (this.activeRegName !== 'statistics') {
        }
        if (!this.srcImages.length) {
          this.$message({
            type: 'error',
            message: '未加载任何仪表图像'
          });
          this.showBatchModel = false;
        } else {
          let that = this;
          api.ins_result.post(null, this.srcIds, this.pointerAlgType, this.enableFitting).then(results => {
            that.statistics = results;
            that.showBatchModel = false;
          });
        }
      },
      uploadSrcReq(fd, file) {
        let vm = this;
        return new Promise((resolve, reject) => {
          api.ins_src.post(fd).then(res => {
            vm.uploadSrcImg = false;
            vm.srcIds.push(res.id);
            // vm.hostImgMap[vm.srcIds.length] = res.id;
            console.log(res);
            vm.constructSlide(file, vm.srcImages, res.id);
            // console.log(res);
            resolve(res);
          }).catch(error => {
            reject(error);
          });
        });
      },
      uploadTemplateReq(fd) {
        let vm = this;
        return new Promise((resolve, reject) => {
          api.ins_template.post(fd).then(res => {
            vm.uploadTemplate = false;
            resolve(res);
          }).catch(error => {
            reject(error);
          });
        });
      },
      uploadConfigReq(fd) {
        let vm = this;
        return new Promise((resolve, reject) => {
          api.ins_config.post(fd).then(res => {
            vm.uploadConfig = false;
            resolve(res);
          }).catch(error => {
            reject(error);
          });
        });
      },
      constructSlides(fileList, slides) {
        let that = this;
        fileList.forEach(fd => {
          that.constructSlide(fd, slides);
        })
        // console.log('Slides', slides);
      },
      constructSlide(fd, slides, srcId) {
        let that = this;
        let reader = new FileReader();
        // console.log(fd.raw);
        reader.readAsDataURL(fd);
        reader.onload = function (ev) {
          // console.log(ev.target.result);
          let image = new Image();
          image.src = ev.target.result;
          console.log(fd);
          image.onload = function () {
            // console.log(fd.name);
            slides.push({
              url: ev.target.result,
              alt: fd.name.toLowerCase(),
              title: fd.name.toLowerCase(),
              w: this.width,
              h: this.height
            });
            that.hostImgMap[slides.length] = srcId;
          };
        };
      },
      handleSrcImageSubmit() {
        // trigger animation for first loading
        this.meterShow = true;
        this.uploadSrcImg = false;
        // this.constructSlides(this.srcImagesFileList, this.srcImages);
      },
      handleClose() {
        console.log('close event')
      },
      onChangeSrcImg(index) {
        let that = this;
        this.srcIndex = index;
        // slides animation
        this.meterShow = false;
        setTimeout(() => {
          that.meterShow = true;
        }, 500);
      },
      onConfigUploaded(fd) {

      },
      handleReading() {
        let vm = this;
        vm.isReading = true;
        api.ins_result.post(this._srcId, null, this.pointerAlgType, this.enableFitting).then(res => {
          api.ins_proc.get({
            resultId: res.id
          }).then(proc => {
            let procs = [];
            proc.forEach(p => {
              let fdurl = process.env.BASE_API + '/' + p.proc;
              let image = new Image();
              image.src = fdurl;
              image.onload = function () {
                procs.push({
                  src: fdurl,
                  msrc: fdurl,
                  alt: vm._currentImgName.toLowerCase(),
                  title: vm._currentImgName.toLowerCase(),
                  w: this.width,
                  h: this.height,
                  order: p.order
                })
              }
            });
            Object.assign(res, {
              'proc': procs
            });
            vm.$set(vm.res, vm._currentImgName, res);
            vm.isReading = false;
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
