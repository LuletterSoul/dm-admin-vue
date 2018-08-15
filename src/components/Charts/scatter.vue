<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  require('echarts/theme/infographic') // echarts theme
  require('echarts/theme/roma') // echarts theme
  require('echarts/theme/shine') // echarts theme
  require('echarts/theme/dark') // echarts theme
  import { debounce } from '@/utils'
    export default {
      props: {
        name:'scatter',
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
          default: '920px'
        },
        option:{
          required:Object,
          default:() =>{
            return {};
          }
        }
      },
      watch: {
        option:function (val) {
          this.chart.setOption(val);
        }
      },
      data() {
        return {
          chart: null
        }
      },
      mounted() {
        this.initChart();
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100);
        window.addEventListener('resize', this.__resizeHanlder)
      },
      beforeDestroy() {
        if (!this.chart) {
          return
        }
        window.removeEventListener('resize', this.__resizeHanlder)
        this.chart.dispose();
        this.chart = null
      },
      methods: {
        initChart() {
          this.chart = echarts.init(this.$el, 'shine');
          this.chart.setOption(this.option);
        }
      }
    }
</script>

<style scoped>

</style>
