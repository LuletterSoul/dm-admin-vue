<template>
    <div>
      <el-row :gutter="32" style="margin:10px">
        <el-col :span="11">
          <div class="chart-wrapper">
            <pie-chart :option="_percentOption">
            </pie-chart>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="chart-wrapper>">
            <bar-chart :height="'350px'" :option="_trackingOption">
            </bar-chart>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import PieChart from  '../components/PieChart'
  import LineChart from '../components/LineChart'
  import BarChart from '../components/BarChart'
  const animationDuration = 6000;
    export default {
        components:{PieChart,LineChart,BarChart},
        name: "task-data",
        props:{
          toStages:{
            required:[],
            default:()=>{
              return [];
            }
          }
        },
        data(){
          return{

          }
        },
        computed:{
          _stageX(){
           return this.toStages.map(s =>{
              return '第' + s.orderId + '阶段';
            })
          },
          _stageType(){
            return this.toStages.map(s =>{
              return {
                value: 10,
                name: '第' + s.orderId + '阶段'
              };
            })
          },
          _percentOption(){
            let vm = this;
            return {
              title: {
                text: '时间统计',
                left: 'center',
                textStyle: {
                  color: '#ffc883'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}天 (占计划时间的{d}%)'
              },
              legend: {
                left: 'center',
                bottom: '10',
                data: vm._stageX
              },
              calculable: true,
              series: [
                {
                  name: '时间占比',
                  type: 'pie',
                  roseType: 'radius',
                  radius: [15, 95],
                  center: ['50%', '38%'],
                  data: vm._stageType,
                  animationEasing: 'cubicInOut',
                  animationDuration: 2600
                }
              ]
            };
          },
          _trackingOption() {
            let vm = this;
            return {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  top: 10,
                  left: '2%',
                  right: '2%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: [{
                  type: 'category',
                  data: vm._stageX,
                  axisTick: {
                    alignWithLabel: true
                  }
                }],
                yAxis: [{
                  type: 'value',
                  axisTick: {
                    show: false
                  }
                }],
                series: [{
                  name: '已提交',
                  type: 'bar',
                  stack: 'vistors',
                  barWidth: '60%',
                  data: [79, 52,40],
                  animationDuration
                }, {
                  name: '未提交',
                  type: 'bar',
                  stack: 'vistors',
                  barWidth: '60%',
                  data: [80, 52,10],
                  animationDuration
                },{
                  name:'待领取',
                  type: 'bar',
                  stack: 'vistors',
                  barWidth: '60%',
                  data: [80, 52,2],
                  animationDuration
                }]
              }
            }
        }
    }
</script>

<style scoped>
  .chart-wrapper {
    background: #fff;
    padding: 20px 20px 0;
  }
</style>
