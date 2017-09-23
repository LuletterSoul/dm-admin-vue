<template>
  <div id="app" class="app-container">

    <div id="title">数据集展示</div>

    <div class="information">

      <div style="font-size:32px">{{ title }}</div>
      <div class="updown">
        <Button type="ghost"><a href="">下载数据集</a></Button>
        <Button type="ghost"><a href="">下载数据集描述信息</a></Button>
      </div>

      <Card :bordered="false" class="card">
        <p slot="title" style="font-size: 16px">描述摘要:</p>
        <p >{{ abstractInfo }}</p>
      </Card>

      <template>
        <h3 class="updown">描述信息:</h3>
        <Table :columns="columns1" :data="data1"></Table>
        <Table :columns="columns2" :data="data2"></Table>
        <Table :columns="columns3" :data="data3"></Table>
      </template>

      <Card :bordered="false" class="card"
            v-for="todo in todos"
            v-bind:key="todo.id"
            v-bind:title="todo.title">
        <p slot="title" style="font-size:16px;">{{ todo.title }}</p>
        <p >{{ todo.info }}</p>
      </Card>

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
        abstractInfo:'19930330',
        columns1: [
          {
            title: '特征',
            key: 'characteristics'
          },
          {
            title: '属性类型',
            key: 'attributeTypes'
          },
          {
            title: '相关任务',
            key: 'associatedTasks'
          }
        ],
        data1: [
          {
            characteristics: 'N/A',
            attributeTypes: 'Integer',
            associatedTasks: 'Classification, Regression'
          }
        ],
        columns2: [
          {
            title: '实例数',
            key: 'instances'
          },
          {
            title: '允许缺省?',
            key: 'enableMissing'
          }
        ],
        data2: [
          {
            instances: 504,
            enableMissing: 'N/A'
          }
        ],
        columns3: [
          {
            title: '来自地区',
            key: 'area'
          },
          {
            title: '捐赠时间',
            key: 'dateDonated'
          },
          {
            title: 'Number of Web Hits',
            key: 'hits'
          }
        ],
        data3: [
          {
            area: 'Business',
            dateDonated: '2017-07-23',
            hits:0
          }
        ],

        todos: [
          {
            id: 1,
            title: '来源:',
            info: 'providerId'
          },
          {
            id:4,
            title:'相关论文:',
            info:'MINO'
          },
        ],
        title:'data set title',
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
  .updown{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size:16px;
  }
  .information{
    width:60%;
  }
  .card{
    background-color: transparent;
    font-size:16px;
  }
</style>
