<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  import { getSystemStatistics } from 'api/dashboard';
  require('echarts/theme/macarons'); // echarts 主题
  import { debounce } from 'utils';
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
      autoResize: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chart: null,
        statistics:null,
        currentWeekTraffic:null,
        studentWeekTraffic:null,
        teacherWeekTraffic:null,

      };
    },
    computed: {
      xStudentAxisData() {
        let xAxisData = null;
        let map = this.studentWeekTraffic.dayTrafficMap;
        for (var key in map) {
          xAxisData.push(key.substring(0, 3));
          return xAxisData;
        }
      },
      yStudentAxisData() {
        let yAxisData = null;
          let map = this.studentWeekTraffic;
        for (let i=0;i<map.length;i++) {
          yAxisData.push(map[i]);
        }
          return yAxisData;
        },
      xTeacherAxisData() {
        let xAxisData = null;
        let map = this.teacherWeekTraffic.dayTrafficMap;
        for (var key in map) {
          xAxisData.push(key.substring(0, 3));
          return xAxisData;
        }
      },
      yTeacherAxisData() {
        let yAxisData = null;
        let map = this.studentWeekTraffic;
        for (let i=0;i<map.length;i++) {
          yAxisData.push(map[i]);
        }
        return yAxisData;
      }
    },
    created() {
      this.fetchStatisctis();
    },
    mounted() {
      this.initChart();
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100);
        window.addEventListener('resize', this.__resizeHanlder)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder);

      this.chart.dispose();
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');

        this.chart.setOption({
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false
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
          yAxis: {},
          series: [{
            name: 'Teacher Traffic',
            itemStyle: {
              normal: {
                areaStyle: {}
              }
            },
            smooth: true,
            type: 'line',
            data: [100, 120, 161, 134, 105, 160, 165],
            animationDuration: 2600,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'buyers',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: 'rgba(2, 197, 233, 0.2)',
                lineStyle: {
                  color: 'rgba(2, 197, 233, 0.2)'
                },
                areaStyle: {
                  color: 'rgba(99,194,255, 0.6)'
                }
              }
            },
            data: [120, 82, 91, 154, 162, 140, 130],
            animationDuration: 2000,
            animationEasing: 'quadraticOut'
          }]
        })
      },
      extractWeekStatistic() {

      },
      exractXAxisData(){

      },
      fetchStatisctis() {
        let vm = this;
        getSystemStatistics().then(response => {
          vm.statistics = response.statistics;
          vm.currentWeekTraffic = vm.statistics.currentWeekTraffic;
          vm.studentWeekTraffic = vm.currentWeekTraffic.student;
          vm.teacherWeekTraffic = vm.currentWeekTraffic.teacher;
        })
      }
    }
}
</script>
