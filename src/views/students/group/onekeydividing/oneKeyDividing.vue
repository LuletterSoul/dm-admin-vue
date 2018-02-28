<template>
  <div class="step-wrap">
    <div class="step-container">
      <Row>
        <Col>
        <Steps :current="current">
          <Step  title="填写分组参数" content="填写分组参数:如分组梯度,分组限制,给该分组分配的任务">
          </Step>
          <Step  title="预览分组信息" content="这里是该步骤的描述信息">
          </Step>
          <Step title="手动调优" content="这里是该步骤的描述信息"></Step>
          <Step title="确认分组" content="这里是该步骤的描述信息"></Step>
        </Steps>
        </Col>
      </Row>
    </div>
    <div>
      <Row>
        <Col>
        <transition name="fade">
          <transition name="fade">
            <keep-alive>
              <dividing-form v-if="current===0" @on-group-preview="handleGroupPreview"> </dividing-form>
            </keep-alive>
          </transition>
        </transition>
        </Col>
      </Row>
      <Row>
        <Col :span="23">
        <transition name="fade" :duration="1500">
          <preview v-if="current===1" :group-list="dataMiningGroups" :task="dataMiningTask"> </preview>
        </transition>
        </Col>
      </Row>
      <Row>
        <Col :offset="21" :span="1">
           <Button v-if="current" type="ghost" style="margin-top: 10px" @click="current = current -1">上一步</Button>
        </Col>
        <Col  :span="1">
          <Button v-if="current" type="primary" style="margin-top: 10px" @click ="current = current +1">下一步</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import DividingForm from './groupDividingConfigForm'
  import Preview from './preview';
export default {
  components:{DividingForm,Preview},
  props: {

  },
  name: 'OneKeyDividing',
  data () {
    return {
      dataMiningGroups:[],
      dataMiningTask:{},
      queryKey:'',
      current:0
    };
  },
  methods:{
    handleGroupPreview(groupPreview) {
      this.dataMiningGroups = groupPreview.dataMiningGroups;
      this.queryKey = groupPreview.queryKey;
      this.dataMiningTask = groupPreview.dataMiningTask;
      this.current++;
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

  }

  .step-container{
    /*height: 40px;*/
    margin-left: 100px;
    margin-bottom: 20px;
    /*margin-top: -20px;*/
  }
</style>
