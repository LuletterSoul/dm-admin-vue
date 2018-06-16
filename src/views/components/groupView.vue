<template>
  <div>
    <!--<el-row>-->
      <!--<el-col :offset="3" :span="18">-->
        <!--<group-new-actions>-->
        <!--</group-new-actions>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <el-row>
      <el-col>
        <task-tacking :to-stages="toStages">
        </task-tacking>
      </el-col>
    </el-row>
    <el-row style="margin-top: 50px">
      <el-col>
        <group-view-item v-if="groups.length" v-for="(group,index) in groups" :key="index" :group="group">
        </group-view-item>
      </el-col>
    </el-row>

    <!--<em-placeholder v-else>-->
    <!--</em-placeholder>-->
  </div>
</template>
<script>
  import GroupViewItem from './groupViewItem'
  import GroupNewActions from './groupNewActions'
  import TaskTacking from './taskTracking'
  export default {
    components: {GroupViewItem,GroupNewActions,TaskTacking},
    props: {
      groups: {
        required: Array,
        default: []
      },
      toStages:{
        required:Array,
        default:[]
      },
      taskId:{
        required:String,
        default:''
      },
    },
    name: "group-view"
  }
</script>
<style scoped>
  .flip-list-move {
    transition: transform 1s;
  }


</style>
