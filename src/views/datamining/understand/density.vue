<template>
  <div>
    <el-row>
      <full-page ref="fullpage" :options="pageOptions">
        <div class="section">
          <el-row style="margin-top: 20px">
            <el-col :offset="20" :span="3">
              <el-select size="medium"
                         clearable
                         v-model="xName"
                         placeholder="排序">
                <el-option v-for="item in xOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <scatter :height="'940px'" :option="_histogramOption">
              </scatter>
            </el-col>
          </el-row>
        </div>
        <div class="section">
          <el-row style="margin-top: 20px">
            <el-col :offset="20" :span="3">
              <el-select size="medium"
                         clearable
                         v-model="xName"
                         placeholder="排序">
                <el-option v-for="item in xOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <scatter :height="'960px'" :option="_boxOption">
              </scatter>
            </el-col>
          </el-row>
        </div>
      </full-page>
    </el-row>
  </div>
</template>

<script>
  import Scatter from '@/components/Charts/scatter'
  import EchartStat from 'echarts-stat'
  import dataTool from 'echarts/dist/extension/dataTool'
  import { Loading } from 'element-ui';
  import echarts from 'echarts';

  var CATEGORY_DIM_COUNT = 6;
  var GAP = 1;
  var BASE_LEFT = 5;
  var BASE_TOP = 10;
  // var GRID_WIDTH = 220;
  // var GRID_HEIGHT = 220;
  var GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP;
  var GRID_HEIGHT = (100 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP;
  var CATEGORY_DIM = 7;
  var SYMBOL_SIZE = 3;
  export default {
    name: "density",
    components: {
      Scatter
    },
    props: {
      setName: {
        type: String,
        default: 'Linear Regression'
      }
    },
    beforeRouteEnter (to, from, next) {
      Loading.service({
        lock: true,
        text: '正在生成视图,请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      next(vm => {})
    },
    mounted: function () {
      let vm = this;
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        Loading.service({
          lock: true,
          text: '正在生成视图,请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        }).close();
      });
    },
    data() {
      return {
        xOptions: [{
          key: '1',
          label: '1',
        },
          {
            key: '2',
            label: '2',
          },
          {
            key: '3',
            label: '3',
          },
          {
            key: '4',
            label: '4',
          }],
        yOptions: [{
          key: '1',
          label: '1',
        },
          {
            key: '2',
            label: '2',
          },
          {
            key: '3',
            label: '3',
          },
          {
            key: '4',
            label: '4',
          }],
        pageOptions: {
          licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
          menu: true,
          navigation: true,
        },
        xName: 'x属性',
        yName: 'y属性',
        girth: [8.3, 8.6, 8.8, 10.5, 10.7, 10.8, 11.0, 11.0, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12.0, 12.9, 12.9, 13.3, 13.7, 13.8, 14.0, 14.2, 14.5, 16.0, 16.3, 17.3, 17.5, 17.9, 18.0, 18.0, 20.6]
      }
    },
    methods: {
      formatter(param) {
        return [
          'Experiment ' + param.name + ': ',
          'upper: ' + param.data[0],
          'Q1: ' + param.data[1],
          'median: ' + param.data[2],
          'Q3: ' + param.data[3],
          'lower: ' + param.data[4]
        ].join('<br/>')
      }
    },
    computed: {
      _histogramReg() {
        let regression = EchartStat.histogram(this.girth);
        return regression;
      },
      _histogramOption() {
        return {
          title: {
            text: 'Girths of Black Cherry Trees',
            left: 'center',
          },
          color: ['rgb(25, 183, 207)'],
          grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'value',
            scale: true, //这个一定要设，不然barWidth和bins对应不上
          }],
          yAxis: [{
            type: 'value',
          }],
          series: [{
            name: 'height',
            type: 'bar',
            barWidth: '99.3%',
            label: {
              normal: {
                show: true,
                position: 'insideTop',
                formatter: function (params) {
                  return params.value[1];
                }
              }
            },
            data: this._histogramReg.data
          }]
        }
      },
      _boxOption() {
        return {
          title: {
            text: 'Multiple Categories',
            left: 'center',
          },
          legend: {
            y: '10%',
            data: ['category0', 'category1', 'category2', 'category3']
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '10%',
            top: '20%',
            right: '10%',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            data: this._boxData[0].axisData,
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
              show: true
            },
            axisLabel: {
              formatter: 'expr {value}'
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            name: 'Value',
            min: -400,
            max: 600,
            splitArea: {
              show: false
            }
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 20
            },
            {
              show: true,
              height: 20,
              type: 'slider',
              top: '90%',
              xAxisIndex: [0],
              start: 0,
              end: 20
            }
          ],
          series: [
            {
              name: 'category0',
              type: 'boxplot',
              data: this._boxData[0].boxData,
              tooltip: {formatter: this.formatter}
            },
            {
              name: 'category1',
              type: 'boxplot',
              data: this._boxData[1].boxData,
              tooltip: {formatter: this.formatter}
            },
            {
              name: 'category2',
              type: 'boxplot',
              data: this._boxData[2].boxData,
              tooltip: {formatter: this.formatter}
            },
            {
              name: 'outlier',
              type: 'pictorialBar',
              symbolPosition: 'end',
              symbolSize: 8,
              data: this._boxData[0].outliers
            },
            {
              name: 'outlier',
              type: 'pictorialBar',
              symbolPosition: 'end',
              symbolSize: 8,
              data: this._boxData[1].outliers
            },
            {
              name: 'outlier',
              type: 'pictorialBar',
              symbolPosition: 'end',
              symbolSize: 8,
              barGap: '30%',
              data: this._boxData[2].outliers
            }
          ]
        }
      },
      _boxData() {
        let data = [];
        for (let seriesIndex = 0; seriesIndex < 5; seriesIndex++) {
          let seriesData = [];
          for (let i = 0; i < 18; i++) {
            let cate = [];
            for (let j = 0; j < 90; j++) {
              cate.push(Math.random() * 200);
            }
            for (let j = 0; j < 10; j++) {
              cate.push(Math.random() * 400);
            }
            seriesData.push(cate);
          }
          data.push(dataTool.prepareBoxplotData(seriesData));
        }
        return data;
      }
    }
  }
</script>

<style scoped>

</style>
