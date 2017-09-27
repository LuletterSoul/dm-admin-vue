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
  import {
    fetchOptions,
    getCollection,
    fetchCollectionList,
  } from 'api/datasets';
  export default {
    components: {ElCol},
    props:{
      dataSet: {
        type: Object,
        default:function() {
          return {
            loading :true,
            collectionName: '',
            abstractInfo: '',
            instances: 0,
            enableMissing: '',
            dateDonated: null,
            hits: 0,
            relevantPapers: '',
            characteristics: [],
            associatedTasks: [],
            attributeTypes: [],
            area: []
          }
        }
      }
    },
    name: 'DataSet',
    created() {
      let collectionId = this.$route.query.collectionId;
      if(collectionId&&this.dataSet.collectionName==='') {
        this.getCollectionById(collectionId);
      }
    },
//    mounted(){
//      console.log(this.$router.query);
//    },
    data () {
      return {
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
        todos: [
          {
            id: 1,
            title: '来源:',
            info: 'Song Xi Chen, csx \'@\' gsm.pku.edu.cn, Guanghua School of Management, ' +
            'Center for Statistical Science, Peking University.'
          },
          {
            id: 4,
            title: '相关论文:',
            info: 'Liang, X., S. Li, S. Zhang, H. Huang, and S. X. Chen (2016), PM2.5 data reliability, ' +
            'consistency, and air quality assessment in five Chinese cities, J. Geophys. Res. Atmos., 121, 10220â€“10236.'
          },
        ],
      };
    },
    methods:{
      getCollectionById(collectionId) {
        let that =this;
        this.loading = true;
        getCollection(collectionId).then(response =>{
          that.dataSet = response;
          that.loading = false;
        }).catch(error =>{
          console.log(error);
        })
      },
    },
    computed:{
      collectionName(){
        return this.dataSet.collectionName;
      },
      abstractInfo(){
        return this.dataSet.abstractInfo;
      },
      dataSetInfo(){
        return this.dataSet;
      },
      data1(){
        return [
          {
            characteristics: this.dataSet.characteristics.map(char => char.englishName).join(),
            attributeTypes: this.dataSet.attributeTypes.map(attr =>attr.englishName).join(),
            associatedTasks: this.dataSet.associatedTasks.map(task => task.englishName).join()
          }
          ]
      },
      data2(){
        return [{
            instances: this.dataSet.instances,
            enableMissing: this.dataSet.enableMissing
          }]
      } ,
      data3(){
        return  [
          {
            area: this.dataSet.area.englishName,
            dateDonated: this.dataSet.dateDonated,
            hits: 6558
          }
        ]
      },
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
