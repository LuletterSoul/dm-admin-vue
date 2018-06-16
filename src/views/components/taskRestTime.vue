<template>
    <div @click="handleClick">
      <el-row>
        <el-col>
          <el-tooltip class="item" effect="dark" :content="_rest" placement="top">
            <el-progress :stroke-width="18"
                         text-inside
                         :percentage="_percent"
                         :color="_color">
            </el-progress>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  const moment = require('moment');
    export default {
        name: "task-rest-time",
        props:{
          beginTime:{
            required:String,
            default: () =>{
              return '';
            }
          },
          endTime:{
            required:String,
            default: () =>{
              return '';
            }
          }
        },
      methods:{
        handleClick() {
          this.$emit('click');
        } ,
      },
      computed:{
          _rest(){
            let now = moment();
            let end = moment(this.endTime);
            let rest = end.diff(now, 'days');
            if(rest<=0){
              rest = 0;
            }
            return '剩余 '+ rest + '   天';
          },
          _percent(){
            let now = moment();
            let begin = moment(this.beginTime);
            let end = moment(this.endTime);
            let total = end.diff(begin);
            let progress = now.diff(begin);
            if(progress > total){
              return 100;
            }
            else{
              return Math.ceil(progress / total * 100);
            }
          },
          _color(){
            let now = moment();
            let begin = moment(this.beginTime);
            let end = moment(this.endTime);
            let total = end.diff(begin);
            let progress = now.diff(begin);
            let p = Math.ceil(progress / total * 100);
            if(p >=100){
              p = 100;
            }
            if(p <= 20){
              return '#67c23a';

            }
            else if(p <=50){
              return '#409eff';
            }
            else if(p <=80){
              return '#f07def';
            }
            else{
              return '#f56c6c';
            }
          }
      }
    }
</script>

<style scoped>

</style>
