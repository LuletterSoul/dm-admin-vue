<template>
  <div id="app" class="app-container">

    <div class="information">

      <div class="dataSetTitle">{{ collectionName }}</div>

      <div class="updown">
        <Button type="ghost"><a href="">下载数据集</a></Button>
        <Button type="ghost"><a href="">下载数据集描述信息</a></Button>
      </div>

      <Card :bordered="false" class="dataSetCard">
        <p slot="title" style="font-size: 16px">描述摘要:</p>
        <p >{{ abstractInfo }}</p>
      </Card>

      <template>
        <h3 class="updown">描述信息:</h3>
        <Table :columns="columns1" :data="data1"></Table>
        <Table :columns="columns2" :data="data2"></Table>
        <Table :columns="columns3" :data="data3"></Table>
      </template>

      <Card :bordered="false" class="dataSetCard"
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
        collectionName:'PM2.5 Data of Five Chinese Cities Data Set ',
        abstractInfo:'This hourly data set contains the PM2.5 data in Beijing, Shanghai, Guangzhou, Chengdu and Shenyang.' +
        ' Meanwhile, meteorological data for each city are also included.',
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
            characteristics: 'Multivariate, Time-Series',
            attributeTypes: 'Integer, Real',
            associatedTasks: 'Regression'
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
            instances: 52854,
            enableMissing: 'Yes'
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
            area: 'Physical',
            dateDonated: '2017-07-18',
            hits:6558
          }
        ],
        todos: [
          {
            id: 1,
            title: '来源:',
            info: 'Song Xi Chen, csx \'@\' gsm.pku.edu.cn, Guanghua School of Management, ' +
            'Center for Statistical Science, Peking University.'
          },
          {
            id:4,
            title:'相关论文:',
            info:'Liang, X., S. Li, S. Zhang, H. Huang, and S. X. Chen (2016), PM2.5 data reliability, ' +
            'consistency, and air quality assessment in five Chinese cities, J. Geophys. Res. Atmos., 121, 10220â€“10236.'
          },
        ]
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
  .dataSetTitle{
    margin-top: 20px;
    margin-bottom: 20px;
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
  .dataSetCard{
    background-color: transparent;
    font-size:16px;
  }
</style>
