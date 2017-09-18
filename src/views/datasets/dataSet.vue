<template>
  <div id="app" class="app-container">

    <div id="title">数据集展示</div>


    <div class="information">

      <div style="font-size:32px">title</div>
      <div class="updown">
        <Button type="ghost"><a href="">下载数据集</a></Button>
        <Button type="ghost"><a href="">下载数据集描述信息</a></Button>
      </div>

      <Card :bordered="false" class="a">
        <p slot="title">abstract</p>
        <p >{{ abstract }}</p>
      </Card>

      <template>
        <h3 class="updown">Information：</h3>
        <Table :columns="columns1" :data="data1"></Table>
        <Table :columns="columns2" :data="data2"></Table>
        <Table :columns="columns3" :data="data3"></Table>
      </template>

      <Card :bordered="false" class="a"
            v-for="todo in todos"
            v-bind:key="todo.id"
            v-bind:title="todo.title">
        <p slot="title">{{ todo.title }}</p>
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
        columns1: [
          {
            title: 'Data Set Characteristics',
            key: 'characteristics'
          },
          {
            title: 'Attribute Characteristics',
            key: 'attributeType'
          },
          {
            title: 'Associated Tasks',
            key: 'associatedTasks'
          }
        ],
        data1: [
          {
            characteristics: 'N/A',
            attributeType: 'Integer',
            associatedTasks: 'Classification, Regression'
          }
        ],
        columns2: [
          {
            title: 'Number of Instances',
            key: 'instances'
          },
//          {
//            title: 'Number of Attributes',
//            key: 'numOfAtt'
//          },
          {
            title: 'Missing Values?',
            key: 'enableMissing'
          }
        ],
        data2: [
          {
            instances: 504,
//            numOfAtt: 20,
            enableMissing: 'N/A'
          }
        ],
        columns3: [
          {
            title: 'Area',
            key: 'area'
          },
          {
            title: 'Date Donated',
            key: 'dateDonated'
          },
//          {
//            title: 'Number of Web Hits',
//            key: 'numOfWebHits'
//          }
        ],
        data3: [
          {
            area: 'Business',
            dateDonated: '2017-07-23',
//            numOfWebHits: 16137
          }
        ],
        abstract:'19930330',
        todos: [
          {
            id: 1,
            title: 'Source:',
            info: 'S.Moro, P.Rita, J.Coelho (ISCTE-IUL)'
          },
          {
            id: 2,
            title:'Data Set Information:',
            info: '日光鼎盛如你身载风流光影 狂热与孤寂 重叠回忆 在无处落脚的人海里你的停靠成为岛屿 成为陆地 成为具体 ' +
            '爱你锋利的伤痕 爱你成熟的天真 多谢你如此精彩耀眼做我平淡岁月里星辰 即使都是片刻也留恋片刻的永恒 但愿这漫长渺小人生不负你每个光辉时分',
          },
          {
            id: 3,
            title: 'Attribute Information:',
            info: 'smh'
          },
          {
            id:4,
            title:'Relevant Papers:',
            info:'MINO'
          },
          {
            id:5,
            title:'Papers That Cite This Data Set:',
            info:'Mino'
          },
          {
            id: 6,
            title: 'Citation Request:',
            info: 'WINNER'
          }
        ]
      }
    }
  }
</script>

<style>
  div{
    background-color:transparent;
    margin:0px auto;
  }
  #title{
    width:20%;
    font:bold 36px 微软雅黑;
  }
  .updown{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .information{
    width:60%;
  }
  .a{
    background-color: transparent;
  }
</style>
