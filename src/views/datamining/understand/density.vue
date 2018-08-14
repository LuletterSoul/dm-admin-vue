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
      </full-page>
    </el-row>
  </div>
</template>

<script>
  import Scatter from '@/components/Charts/scatter'
  import EchartStat from 'echarts-stat'
  import echarts from 'echarts';

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
    methods: {},
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
      }
    }
  }
</script>

<style scoped>

</style>
