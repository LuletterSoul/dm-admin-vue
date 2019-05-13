<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  import {debounce} from 'utils';

  require('echarts/theme/macarons'); // echarts 主题
  // import { getSystemStatistics } from '../../../api/dashboard.js';
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      legend: {
        type: Array,
        default: function () {
          return [];
        }
      },
      xAxisData: {
        type: Array,
        default: function () {
          return [];
        }
      },
      series: {
        type: Array,
        default: function () {
          return [];
        }
      },
      title:{
        type: String,
        default: ''
      },
      autoResize: {
        type: Boolean,
        default: true
      }
    },
    data() {
      let that = this;
      return {
        chart: null,
        studentWeekTraffic: null,
        teacherWeekTraffic: null,
        options: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          legend: {
            data: ['绝对误差', '平均绝对误差']
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {
            type: 'value'
          },
          // series: [{
          //   data: [820, 932, 901, 934, 1290, 1330, 1320],
          //   type: 'line',
          //   itemStyle: that.seriesItemStyle,
          //   smooth: false
          // }]
          // series: [{
          //   name: '教师访问量',
          //   itemStyle: {
          //     normal: {
          //       areaStyle: {}
          //     }
          //   },
          //   smooth: true,
          //   type: 'line',
          //   data : [],
          //   animationDuration: 2600,
          //   animationEasing: 'cubicInOut'
          // },
          //   {
          //     name: '学生访问量',
          //     smooth: true,
          //     type: 'line',
          //     itemStyle: {
          //       normal: {
          //         color: 'rgba(2, 197, 233, 0.2)',
          //         lineStyle: {
          //           color: 'rgba(2, 197, 233, 0.2)'
          //         },
          //         areaStyle: {
          //           color: 'rgba(99,194,255, 0.6)'
          //         }
          //       }
          //     },
          //     data: [],
          //     animationDuration: 2000,
          //     animationEasing: 'quadraticOut'
          //   }]
        }
      };
    },
    created() {
      // this.chart.setOption(this.options);
    },
    mounted() {
      this.initChart();
      // this.fetchStatistics();
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100);
        // window.onload=function(){
        //   window.addEventListener('resize', this.__resizeHanlder)
        // }
      }
      // 监听侧边栏的变化
      this.chart.setOption(this._options);
      // const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      // sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      // if (this.autoResize) {
      //   window.removeEventListener('resize', this.__resizeHanlder)
      // }
      //
      // const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      // sidebarElm.removeEventListener('transitionend', this.__resizeHanlder);

      this.chart.dispose();
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');
      },
      fetchStatistics() {
        let vm = this;
        return new Promise((resolve, reject) => {
          getSystemStatistics().then(response => {
            vm.studentWeekTraffic = response.studentWeekTraffic;
            vm.teacherWeekTraffic = response.teacherWeekTraffic;
            vm.updateOptions();
            resolve(response);
          }).catch(error => {
            reject(error);
          })
        })
      },
      updateOptions() {
        // this.options.xAxis.data = this.xAxisData;
        // this.options.series[1].data = this.yStudentAxisData;
        // this.options.series[0].data = this.yTeacherAxisData;
        // }
      }
    },
    computed: {
      _options() {
        return {
          title:{
            text: this.title
          },
          xAxis: {
            axisLabel:{
              rotate: 45,
              interval: 0
            },
            type: 'category',
            data: this.xAxisData
          },
          legend: {
            data: this.legend
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {
            type: 'value'
          },
          series: this.series
        };
      }
    }
  }
</script>
