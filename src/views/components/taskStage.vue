<template>
    <div class="time-line">
      <Timeline>
        <TimelineItem v-for="(stage,index) in stages" :key="stage.orderId">
          <p class="stage-time">
            {{ splitDate(stage.begin) }} — {{splitDate(stage.end)}}
          </p>
          <p class="stage-content">
            {{stage.comment}}
          </p>
        </TimelineItem>
      </Timeline>
    </div>
</template>

<script>
    export default {
        name: "TaskStage",
        props:{
          toStages:{
            required:[],
            default:()=>{
              return [];
            }
          }
        },
        data(){
          return {
            stages: this.toStages
          };
        },
        methods:{
          splitDate(date){
            if(date ===undefined || date===''){
              return '';
            }
            return date.split(" ")[0];
          },
        }
    }
</script>

<style scoped>
  .time-line{
    margin: 20px;
  }
  .stage-time{
    font-size: 14px;
    font-weight: bold;
  }
  .stage-content{
    padding-left: 5px;
  }
</style>
