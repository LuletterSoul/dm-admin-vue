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
                  <Tooltip content="仪表读数" placement="top">
                    <Button type="success" shape="circle" icon="folder" @click="uploadSrcImg=true"></Button>
                  </Tooltip>
                </Col>
                <!--                  <Tooltip content="显示识别过程" placement="top">-->
                <!--                    <Button type="error" shape="circle" icon="folder" :disabled="!isUploadedSrc"-->
                <!--                            @click="handleFetchAlgImg"></Button>-->
                <!--                  </Tooltip>-->
              </Row>
              <transition name="fade">
                <Content v-if="activeRegName==='reg'" :style="{padding: '20px'}">
                  <Row style="margin-top: 20px" :gutter="12">
                    <Col span="12">
                      <Row type="flex" justify="center">
                        <Card style="height: 600pt">
                          <Row>
                            <img width="100%" :src="_currentSrcUrl">
                          </Row>
                          <Row style="margin-top: 20px" type="flex" justify="center">
                            <Page :total="_meterList.length" :page-size="1" :current="srcIndex" simple
                                  @on-change="onChangeSrcImg"></Page>
                          </Row>
                          <Row style="margin-top: 20px">
                            <Form :label-width="60" inline>
                              <Col span="4">
                                <FormItem label="真值">
                                  <Input v-model="_realValue" readonly></Input>
                                </FormItem>
                              </Col>
                              <Col span="4">
                                <FormItem label="识别值">
                                  <Input v-model="_readingValue" readonly>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="4">
                                <FormItem label="绝对误差">
                                  <Input v-model="_absoluteError" readonly>
                                    <span slot="append">%</span>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="4">
                                <FormItem label="相对误差">
                                  <Input v-model="_relativeError" readonly>
                                    <span slot="append">%</span>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="4">
                                <FormItem label="耗时">
                                  <Input v-model="_timeConsumption" readonly>
                                    <span slot="append">s</span>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="2">
                                <FormItem>
                                  <Button type="primary" @click="handleReading" :loading="isReading">{{ _readingText }}
                                  </Button>
                                </FormItem>
                              </Col>
                            </Form>
                          </Row>
                        </Card>
                      </Row>
                    </Col>
                    <Col span="12">
                      <Card style="height: 600pt">
                        <vue-preview style="width: 100%;height: 300px" :slides="_slide" @close="handleClose">
                        </vue-preview>
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
                  <stat :stat="statistics"></stat>
                </Content>
              </transition>
            </Layout>
          </Content>

        </div>
      </Row>

      <upload-dialog :title="'加载仪表模板'"
                     :format="'image/jpg,image/jpg,image/jpeg'"
                     :message="'上传成功'"
                     :multiple="true"
                     :upload-req="importFuc"
                     :text="'上传仪表的模板，作为读数的先验'"
                     @onUploaded="handleImported"
                     @onFailed="uploadTemplate=false"
                     @onClosed="uploadTemplate =false"
                     @onChange="handleTemplateFileList"
                     :to-visible="uploadTemplate"
      ></upload-dialog>
      <upload-dialog :title="'加载仪表配置'"
                     :format="'.png'"
                     :message="'上传成功'"
                     :upload-req="importFuc"
                     :text="'上传仪表规格和算法配置'"
                     @onUploaded="onTemplateUploaded"
                     @onFailed="uploadConfig=false"
                     @onClosed="uploadConfig=false"
                     @onChange="handleSrcImageList"
                     :to-visible="uploadConfig"
      ></upload-dialog>

      <upload-dialog :title="'仪表读数'"
                     :message="'上传成功'"
                     :format="'image/jpg,image/jpg,image/jpeg'"
                     :text="'上传一张需要读数的图片'"
                     @onUploaded="handleUpload"
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

  export default {
    name: 'Instrument',
    components: {Stat},
    data() {
      return {
        value1: 0,
        uploadTemplate: false,
        uploadConfig: false,
        uploadSrcImg: false,
        activeRegName: 'statistics',
        isFetched: false,
        isUploadedSrc: false,
        isReading: false,
        realValue: null,
        readingValue: null,
        selectedFilename: '1-1.jpg',
        srcIndex: 1,
        srcParentDir: 'images',
        srcImages: [],
        srcImagesFileList: [],
        templateFileList: [],
        statistics: [
          {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 2.239,
            'relativeError': -1,
            'timeConsumption': 0.480
          },
          {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 0.239,
            'relativeError': 1.243,
            'timeConsumption': 0.480
          },
          {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 1.239,
            'relativeError': 2.234,
            'timeConsumption': 0.480
          }, {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 2.439,
            'relativeError': 0.12,
            'timeConsumption': 0.480
          },
          {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 2.239,
            'relativeError': -1,
            'timeConsumption': 0.480
          },
          {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 0.239,
            'relativeError': 1.243,
            'timeConsumption': 0.480
          },
          {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 1.239,
            'relativeError': 2.234,
            'timeConsumption': 0.480
          }, {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 2.439,
            'relativeError': 0.12,
            'timeConsumption': 0.480
          },
          {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 2.239,
            'relativeError': -1,
            'timeConsumption': 0.480
          },
          {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 0.239,
            'relativeError': 1.243,
            'timeConsumption': 0.480
          },
          {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 1.239,
            'relativeError': 2.234,
            'timeConsumption': 0.480
          }, {
            'type': '1-1_1',
            'realValue': 0,
            'readingValue': 6.878,
            'absoluteError': 2.439,
            'relativeError': 0.12,
            'timeConsumption': 0.480
          }

        ],
        res: {
          '1-1.jpg': {
            realValue: 1.59,
            readingValue: 1.49,
            absoluteError: '1.1',
            relativeError: '1.2',
            timeConsumption: '1.23',
            proc:
              [
                {
                  src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                  msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                  // msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                  alt: 'picture1',
                  title: 'Image Caption 1',
                  w: 1920,
                  h: 1080
                },
                {
                  src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                  msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                  alt: 'picture2',
                  title: 'Image Caption 2',
                  w: 1200,
                  h: 900
                },
                {
                  src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                  msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                  alt: 'picture1',
                  title: 'Image Caption 1',
                  w: 600,
                  h: 400
                },
                {
                  src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                  msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                  alt: 'picture1',
                  title: 'Image Caption 1',
                  w: 600,
                  h: 400
                }]
          },
          '2-1.jpg': {
            realValue: 1.20,
            readingValue: 1.24,
            absoluteError: '1.1',
            relativeError: '1.2',
            timeConsumption: '1.43',
            proc: [
              {
                url: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                // msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                alt: 'picture1',
                title: 'Image Caption 1',
                w: 1920,
                h: 1080
              },
              {
                url: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                alt: 'picture2',
                title: 'Image Caption 2',
                w: 1200,
                h: 900
              },
              {
                url: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                alt: 'picture1',
                title: 'Image Caption 1',
                w: 600,
                h: 400
              },
              {
                src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                alt: 'picture1',
                title: 'Image Caption 1',
                w: 600,
                h: 400
              },
              {
                src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                alt: 'picture1',
                title: 'Image Caption 1',
                w: 600,
                h: 400
              }
            ]
          }
        },

        slide1: [
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            // msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 1920,
            h: 1080
          },
          {
            src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
            msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
            alt: 'picture2',
            title: 'Image Caption 2',
            w: 1200,
            h: 900
          },
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          }
        ],
        slide2: [
          {
            url: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            // msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 1920,
            h: 1080
          },
          {
            url: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
            msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
            alt: 'picture2',
            title: 'Image Caption 2',
            w: 1200,
            h: 900
          },
          {
            url: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          }
        ]
      }
    },
    computed: {
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
      _realValue() {
        if (!this._meterList.length) {
          return null;
        }
        if (this.res === undefined || this.res === null) {
          return null;
        }
        let realValue = this.res[this._meterList[this.srcIndex - 1]].realValue;
        if (realValue === undefined) {
          return null;
        }
        return realValue;
      },
      _readingValue() {
        if (!this._meterList.length) {
          return null;
        }
        if (this.res === undefined || this.res === null) {
          return null;
        }
        let readingValue = this.res[this._meterList[this.srcIndex - 1]].readingValue;
        if (readingValue === undefined) {
          return null;
        }
        return readingValue;
      },
      _absoluteError() {
        if (!this._meterList.length) {
          return null;
        }
        if (this.res === undefined || this.res === null) {
          return null;
        }
        let absoulte = this.res[this._meterList[this.srcIndex - 1]].absoluteError;
        if (absoulte === undefined) {
          return null;
        }
        return absoulte;
      },
      _relativeError() {
        if (!this._meterList.length) {
          return null;
        }
        if (this.res === undefined || this.res === null) {
          return null;
        }
        let relative = this.res[this._meterList[this.srcIndex - 1]].relativeError;
        if (relative === undefined) {
          return null;
        }
        return relative;
      },
      _timeConsumption() {
        if (!this._meterList.length) {
          return null;
        }
        if (this.res === undefined || this.res === null) {
          return null;
        }
        let time = this.res[this._meterList[this.srcIndex - 1]].timeConsumption;
        if (time === undefined) {
          return null;
        }
        return time;
      },
      _readingText() {
        if (this.isReading) {
          return '识别中';
        } else {
          return '开始识别';
        }
      },
      _slide() {
        if (!this._meterList.length) {
          return null;
        }
        if (this.res === undefined || this.res === null) {
          return null;
        }
        let proc = this.res[this._meterList[this.srcIndex - 1]].proc;
        if (proc === undefined) {
          return null;
        }
        return proc;
      }
    },
    methods: {
      handleEnterRealValue() {
        this.realValue
      },
      handleFetchAlgImg() {
        // console.log('Fetched');
        this.isFetched = true
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
      importFuc(fd) {
        //let vm = this;
        return new Promise((resolve, reject) => {

        });
      },
      handleTemplateFileList(fileList) {
        // console.log(fileList);
        this.templateFileList = [];
        this.constructSlides(fileList, this.templateFileList);
        // this.templateFileList = fileList;
      },
      handleSrcImageList(fileList) {
        this.srcImagesFileList= fileList;
        // this.constructSlides(fileList, this.srcImages);
        // console.log(this.srcImages);
      },
      constructSlides(fileList, slides) {
        fileList.forEach(fd => {
          let reader = new FileReader();
          reader.readAsDataURL(fd.raw);
          reader.onload = function (ev) {
            // console.log(ev.target.result);
            let image = new Image();
            image.src = ev.target.result;
            image.onload = function () {
              console.log(fd.name);
              slides.push({
                url: ev.target.result,
                alt: '',
                title: fd.name.toLowerCase(),
                w: this.width,
                h: this.height
              });
            };
          };
        });
        // console.log('Slides', slides);
      },
      handleSrcImageSubmit() {
        this.uploadSrcImg = false;
        this.constructSlides(this.srcImagesFileList, this.srcImages);
      },
      handleClose() {
        console.log('close event')
      },
      onChangeSrcImg(index) {
        this.srcIndex = index;
      },
      handleReading() {
        let that = this;
        that.isReading = true;
        setTimeout(() => {
          that.isReading = false;
        }, 2000)
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
