<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="12">
        <Page :total="_length" :current="page" :page-size="pageSize" @on-change="onPageChange"
              @on-page-size-change="onPageSizeChange" show-sizer
              show-elevator></Page>
      </Col>
      <Col span="4">
        <Select v-model="displayItem">
          <Option v-for="item in displayOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="row-top">
      <Col :span="18">
        <Table :columns="statColumn" :data="_statistics" :loading="loading"></Table>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="row-top">
      <Col :span="9">
        <line-chart :height="'400px'" :title="'绝对误差分布图'" :series="_absoluteSeries" :x-axis-data="_absoluteAxisDate"
                    :legend="legendAbsolute"></line-chart>
      </Col>
      <Col :span="9">
        <line-chart :height="'400px'" :title="'相对误差分布图'" :series="_relativeSeries" :x-axis-data="_relativeAxisDate"
                    :legend="legendRelative"></line-chart>
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
      display: {
        required: Number,
        default: 1,
      },
      stat: {
        required: Array,
        default: () => {
          return []
        }
      },
      allStat: {
        required: Array,
        default: () => {
          return [];

        }
      }
    },
    data() {
      let vm = this;
      return {
        displayOptions: [{
          value: 1,
          label: '加载全部'
        }, {
          value: 2,
          label: '加载当前结果'
        }],
        loading: false,
        statColumn: [
          {
            type: 'index',
            width: 60,
            title: '序号',
            align: 'center'
          },
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
                    slides: params.row.template
                  }
                })
              ]);
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
                    slides: params.row.src
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
        page: 1,
        displayItem: 1,
      }
    },
    methods: {
      // sleep(time) {
      //   return new Promise(resolve => setTimeout(resolve, time));
      //
      // },
      onPageSizeChange(val) {
        this.pageSize = val;
      },
      loadImage: function (url, name) {
        let res = [];
        let absolute_url = process.env.BASE_API + '/' + url;
        res.push({
          src: absolute_url,
          msrc: absolute_url,
          alt: name,
          title: name,
          w: 1920,
          h: 1080
        });
        return res;
      },
      onPageChange(index) {
        this.page = index;
        let that = this;
        that.loading = true;
        setTimeout(() => {
          that.loading = false;
        }, 500);
      }
    },
    watch: {
      display(val) {
        this.displayItem = val;
      }
    },
    asyncComputed: {},
    computed: {
      _pageData() {
        if (this.displayItem === 1) {
          return this.allStat.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        } else {
          return this.stat.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        }
      },
      _length() {
        if (this.displayItem === 1) {
          return this.allStat.length;
        } else {
          return this.stat.length;
        }
      },
      _stat() {
        if (this.displayItem === 1) {
          return this.allStat;
        } else {
          return this.stat;
        }
      },
      _relativeAxisDate() {
        let filter = [];
        this._statistics.map(s => {
          if (s.relativeError !== -1) {
            filter.push(s.type);
            return s.type;
          }
        });
        return filter;
      },
      _relativeError() {
        let relative = [];
        this._statistics.map(s => {
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
          let cal = 0;
          this._relativeError.map(r => {
            if (r < 50) {
              total += r;
              cal++;
            }
          });
          let avg = total / cal;
          avg = avg.toFixed(3);
          return this._relativeError.map(s => avg);
        }
        return 0;
      },
      _statistics() {
        if (!this._pageData.length) {
          return [];
        }
        return this._pageData.map(res => {
            let url = res.src;
            let index = url.lastIndexOf("\/");
            let type = url.substring(index + 1, url.length);
            let src = this.loadImage(res.src, type);
            let template = this.loadImage(res.template, type);
            return {
              'type': type,
              'realValue': res.realValue,
              'readingValue': res.value,
              'absoluteError': res.absoluteError,
              'relativeError': res.relativeError,
              'timeConsumption': res.timeConsumption,
              'template': template,
              'src': src,
            }
          }
        );
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
      }
      ,
      _absoluteAxisDate() {
        return this._statistics.map(s => {
          return s.type;
        });
      }
      ,
      _absoluteError() {
        return this._statistics.map(s => s.absoluteError);
      },
      _avgAbsolute() {
        if (this._absoluteError.length) {
          let total = 0;
          let cal = 0;
          this._absoluteError.map(s => {
            if (s <= 50) {
              total += s;
              cal++;
            }
          });
          // console.log(this._statistics.length);
          // console.log('Total', total);
          let avg = total / cal;
          avg = avg.toFixed(3);
          return this._absoluteError.map(s => avg);
        }
        return 0;
      }
      ,
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

  .row-bottom {
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
