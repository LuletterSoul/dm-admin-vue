<template>
  <div class="step-wrap">
    <div class="step-container">
    </div>
    <div>
      <Row>
        <Col>
        <transition name="fade" mode="out-in">
          <transition name="fade">
            <keep-alive>
              <setting v-if="current===0" @on-group-preview="handleGroupPreview"> </setting>
            </keep-alive>
          </transition>
        </transition>
        </Col>
      </Row>
      <Row>
        <Col :span="23">
        <transition name="fade" mode="out-in">
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
      <Row>
        <transition name="fade" mode="out-in">
          <manual-optimization v-if="current===2" :to-groups="dataMiningGroups"> </manual-optimization>
        </transition>
      </Row>
    </div>
  </div>
</template>

<script>
  import Setting from './setting'
  import Preview from './preview';
  import ManualOptimization from './manualOptimization';
export default {
  components:{Setting,Preview,ManualOptimization},
  props: {

  },
  name: 'OneKeyDividing',
  data () {
    return {
      dataMiningGroups:[],
      dataMiningTask:{},
      queryKey:'',
      current:2
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
