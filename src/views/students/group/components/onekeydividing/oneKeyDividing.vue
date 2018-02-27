<template>
  <div class="step-wrap">
    <div class="step-container">
      <Steps  :current="current">
        <Step title="填写分组参数" content="填写分组参数:如分组梯度,分组限制,给该分组分配的任务">
          <dividing-form @on-group-preview="handleGroupPreview"> </dividing-form>
        </Step>
        <Step title="预览分组信息" content="这里是该步骤的描述信息"></Step>
        <Step title="手动调优" content="这里是该步骤的描述信息"></Step>
        <Step title="确认分组" content="这里是该步骤的描述信息"></Step>
      </Steps>
    </div>
  </div>
</template>

<script>
  import DividingForm from './groupDividingConfigForm'
export default {
  components:{DividingForm},
  props: {

  },
  name: 'OneKeyDividing',
  data () {
    return {
      dataMiningGroups:[],
      queryKey:'',
      current:0
    };
  },
  methods:{
    handleGroupPreview(groupPreview) {
      this.dataMiningGroups = groupPreview.dataMiningGroups;
      this.queryKey = groupPreview.queryKey;
    }
  }
}
</script>
<style>

  .task-auto-complete-group span{
    color: #666;
    font-weight: bold;
  }
  .task-auto-complete-group a{
    float: right;
  }

  .step-wrap{
    position: absolute;
    /*left: 50%;*/
  }

  .step-container{
    position: relative;
    width: 1500px;
    /*height: 40px;*/
    margin-left: 100px;
    /*margin-top: -20px;*/
  }
</style>
