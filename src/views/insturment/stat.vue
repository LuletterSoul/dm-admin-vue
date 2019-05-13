<template>
  <div>
    <Row type="flex" justify="center" >
      <Page :total="stat.length" :current="page" :page-size="pageSize" @on-change="onPageChange" show-sizer show-elevator></Page>
    </Row>
    <Row type="flex" justify="center" class="row-top">
      <Col :span="18">
        <Table :columns="statColumn" :data="_pageData" :loading="loading"></Table>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="row-top">
      <Col :span="9">
        <line-chart :height="'400px'" :title="'绝对误差分布图'" :series="_absoluteSeries" :x-axis-data="_absoluteAxisDate" :legend="legendAbsolute"></line-chart>
      </Col>
      <Col :span="9">
        <line-chart :height="'400px'" :title="'相对误差分布图'" :series="_relativeSeries" :x-axis-data="_relativeAxisDate" :legend="legendRelative"></line-chart>
      </Col>
    </Row>
  </div>
</template>

<script>
  import LineChart from '../insturment/lineChart'

  export default {
    name: "Stat",
    components: {LineChart},
    props: {
      stat: {
        required: Array,
        default: () => {
          return [{
            realValue: 1.59,
            readingValue: 1.49,
            absoluteError: '1.1',
            relativeError: '1.2',
            timeConsumption: '1.23',
          }];
        }
      }
    },
    data() {
      return {
        loading: false,
        statColumn: [
          {
            title: '类型',
            key: 'type',
            align: 'center',
            width: 100
          },
          {
            title: '模板',
            key: 'template',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('VuePreview', {
                  props: {
                    slides: [{
                      src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                      msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                      // msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                      alt: 'picture1',
                      title: 'Image Caption 1',
                      w: 1920,
                      h: 1080
                    }]
                  },
                })
              ])
            }
          },
          {
            title: '源图像',
            key: 'src',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('VuePreview', {
                  props: {
                    slides: [{
                      src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                      msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                      // msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                      alt: 'picture1',
                      title: 'Image Caption 1',
                      w: 1920,
                      h: 1080
                    }]
                  },
                })
              ])
            }
          },
          {
            title: '真值',
            key: 'realValue',
            align: 'center'
          },
          {
            title: '识别值',
            key: 'readingValue',
            className: 'blue',
            align: 'center'
          },
          {
            title: '绝对误差',
            key: 'absoluteError',
            className: 'orange',
            align: 'center'
          },
          {
            title: '相对误差',
            key: 'relativeError',
            align: 'center'
          },
          {
            title: '耗时',
            key: 'timeConsumption',
            align: 'center'
          }
        ],
        legendAbsolute: ['绝对误差', '平均绝对误差'],
        legendRelative: ['相对误差', '平均相对误差'],
        pageSize: 10,
        page: 1
      }
    },
    methods: {
      onPageChange(index) {
        this.page= index;
        let that = this;
        that.loading = true;
        setTimeout(() => {
          that.loading = false;
        },500);
      }
    },
    computed: {
      _pageData() {
        // console.log(this.stat.slice((this.page - 1) * this.pageSize, this.page * this.pageSize));
        return this.stat.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
      },
      _relativeAxisDate() {
        let filter = [];
        this.stat.map(s => {
          if (s.relativeError !== -1) {
            filter.push(s.type);
            return s.type;
          }
        });
        return filter;
      },
      _relativeError() {
        let relative = [];
        this.stat.map(s => {
          if (s.relativeError !== -1) {
            relative.push(s.relativeError);
          }
        });
        return relative;
      },
      _avgRelative() {
        let length = this._relativeError.length;
        if (length) {
          let total = 0;
          this._relativeError.map(r => total += r);
          let avg = total / length;
          avg = avg.toFixed(3);
          return this._relativeError.map(s => avg);
        }
        return 0;
      },
      _relativeSeries() {
        return [{
          name: this.legendRelative[0],
          data: this._relativeError,
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgb(233,67,45)',
              lineStyle: {
                color: 'rgb(233,67,45)'
              }
            }
          },
          smooth: false
        }, {
          name: this.legendRelative[1],
          data: this._avgRelative,
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgb(143,252,74)',
              lineStyle: {
                color: 'rgb(143,252,74)'
              }
            }
          },
          smooth: false
        }]
      },
      _absoluteAxisDate() {
        return this.stat.map(s => s.type);
      },
      _absoluteError() {
        return this.stat.map(s => s.absoluteError);
      },
      _avgAbsolute() {
        if (this.stat.length) {
          let total = 0;
          this.stat.map(s => total += s.absoluteError);
          let avg = total / this.stat.length;
          avg = avg.toFixed(3);
          return this.stat.map(s => avg);
        }
        return 0;
      },
      _absoluteSeries() {
        return [{
          name: this.legendAbsolute[0],
          data: this._absoluteError,
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgb(233,67,45)',
              lineStyle: {
                color: 'rgb(233,67,45)'
              }
            }
          },
          smooth: false
        }, {
          name: this.legendAbsolute[1],
          data: this._avgAbsolute,
          type: 'line',
          itemStyle: {
            normal: {
              color: 'rgb(143,252,74)',
              lineStyle: {
                color: 'rgb(143,252,74)'
              }
            }
          },
          smooth: false
        }]
      },

    }
  }
</script>

<style>
  .ivu-table td.blue {
    background-color: #2db7f5;
    color: #fff;
  }

  .row-top {
    margin-top: 20px;
  }

  .row-bottom{
    margin-bottom: 20px;
  }
  .ivu-table td.orange {
    background-color: #ff6600;
    color: #fff;
  }

  .ivu-table-cell .my-gallery figure img {
    width: 150px;
    vertical-align: middle;
  }
</style>
