<template>
    <div id="app">

      <div id="title">
        数据集库展示
      </div>


      <div style="margin-top:20px ;padding: 20px;">
        <template>
          <Table :columns="dataSetTable0" :data="dataSet0" stripe></Table>
            <div style="margin: 10px;overflow: hidden">
               <div style="float: right;">
                 <Page :total="total" :current="1"
                       :page-size-opts="[10, 20, 30, 40]"
                       @on-page-size-change="handleSizeChange"
                       show-sizer></Page>
               </div>
            </div>
        </template>
      </div>


    </div>
</template>

<script>
    import ElCol from "element-ui/packages/col/src/col";

    export default {
      components: {ElCol},
      name: 'app',
      data () {
        return {
          dataSetTable0: [
//            {
//              title: '编号',
//              key: 'collectionId',
//              sortable: true
//            },
            {
              title: '名称',
              key: 'collectionName',
              sortable: true
            },
            {
              title: '数据特征',
              key: 'characteristics',
              sortable: true
            },
            {
              title: '相关任务',
              key: 'associatedTasks',
              sortable: true
            },
            {
              title: '属性类型',
              key: 'attributeTypes',
              sortable: true
            },
//            {
//              title: '实例数',
//              key: 'instances',
//              sortable: true
//            },
            {
              title: '捐赠时间',
              key: 'dateDonated',
              sortable: true
            },
          ],
          dataSet0: [
            {
              collectionId: '111',
              collectionName: 'mino',
              characteristics: 'roro',
              associatedTasks: 'hoony',
              attributeTypes: 'yoon',
              instances: 0,
              dateDonated: 'jinu'
            }
          ]
        }
      },
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        }
      }
    };
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
    width:22%;
    font:bold 36px 微软雅黑;
  }
</style>
