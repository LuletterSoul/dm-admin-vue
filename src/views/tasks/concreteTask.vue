<template>
  <div id="app">

    <div id="title">任务信息</div>

    <div class="information">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="团队信息" name="1">
          <el-card class="card"
                   v-for="todo in todos"
                   v-bind:key="todo.id"
                   v-bind:title="todo.title">
            <div slot="header" class="clearfix">
              {{ todo.title }}
            </div>
            <div class="text item">
              {{ todo.info }}
            </div>
          </el-card>
        </el-collapse-item>

        <el-collapse-item title="使用数据集" name="2">
          <div v-for="value in dataSet">
                {{ value }}
          </div>
        </el-collapse-item>

        <el-collapse-item title="采用算法" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script type="text/javascript">
  import ElCol from "element-ui/packages/col/src/col";

  export default {
  components: {ElCol},
  name: 'app',
    data () {
    return {
      dataSet:{
      collectionId: '124',
      collectionName: '5666'
      },
      group:[{
        groupId:'01',
        groupName:'lalala',
        groupLeaderId:'01010',
        studentId:['1111  ','2222']
      }],
      activeNames: ['1','2','3'],
      title:'data set title',
      todos: [
        {
          id: 1,
          title: '组号',
          info: '01'
        },
        {
          id:2,
          title:'组名',
          info:'lalla'
        },
        {
          id:3,
          title:'组长',
          info:'1234'
        },
        {
          id:4,
          title:'成员',
          info:'12345'
        }
      ],
    }
  }
  }
</script>

<style>
  div{
    background-color:transparent;
    margin:0px auto;
    font-size:16px;
  }
  #title{
    margin-top: 20px;
    margin-bottom: 20px;
    width:20%;
    font:bold 36px 微软雅黑;
  }
  .information{
    margin-top: 20px;
    margin-bottom: 20px;
    width:80%;
  }
  .card{
    background-color: transparent;
    width: 20%;
    float: left;
    margin: 20px;
  }
</style>
