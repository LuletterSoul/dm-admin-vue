<template>
    <div id="app">
      <div class="data-set-table-title">
        数据集信息
      </div>
      <div style="margin-top:20px ;padding: 20px;">
        <template>
            <Table :loading="loading" :columns="dataSetTable0" :data="dataSetInfo" stripe></Table>
            <div style="margin: 10px;overflow: hidden">
               <div style="float: right;">
                 <Page :total="totalElements" :current="1"
                       :page-size-opts="[10, 20, 30, 40]"
                       @on-change="handlePageChange"
                       @on-page-size-change="handleSizeChange"
                       show-sizer>
                 </Page>
               </div>
            </div>
        </template>
      </div>
    </div>
</template>
<script>
    import {
      fetchOptions,
      fetchCollectionList,
      deleteCollection,
      createCollection,
      updateCollection,
      deleteCollectionsBatch,
      getDataSetContainer,
      getRelFilePath,
      createDataSetContainer,
      uploadDataSetiContainer,
      downloadContianerFile,
      updateDataSetContainer,
      deleteDataSetContainer,
      deleteBatchDataSetContainers
    } from 'api/datasets';
    export default {
      name: 'DataSetIndex',
      created(){
        this.getCollectionList();
      },
      data () {
        return {
          loading:true,
          dataSetCollectionList:[],
          listQuery: {
            page: 0,
            size: 10,
            sort: 'collectionName'
          },
          dataSetTable0: [
            {
              title: '名称',
              key: 'collectionName',
              sortable: true
            },
            {
              title: '数据特征',
              key: 'dataSetChars',
              sortable: true
            },
            {
              title: '属性类型',
              key: 'attributeChars',
              sortable: true
            },
            {
              title: '相关任务',
              key: 'associatedTasks',
              sortable: true
            },
            {
              title: '实例数',
              key: 'instances',
              sortable: true
            },
            {
              title: '捐赠时间',
              key: 'dateDonated',
              sortable: true
            },
            {
              title: '操作',
              key: 'action',
              width: 200,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.handleCheck(params.index)
                      }
                    }
                  }, '详情')
                ]);
              }
            }
          ],

//          dataSets: [
//            {
//              collectionId: '111',
//              collectionName: 'mino',
//              dataSetChars: 'roro',
//              associatedTasks: 'hoony',
//              attributeChars: 'yoon',
//              dateDonated: 'jinu'
//            }
//          ],
          totalElements:1,
        }
      },
      methods: {
        handleCheck(index){
          this.$router.push({path: '/collection/set_detail', query: { collectionId: this.dataSetCollectionList[index].collectionId }});
        },
        handleSizeChange(val) {
          this.listQuery.size = val;
          this.getCollectionList();
        },
        handlePageChange(val){
          this.listQuery.page = val-1;
          this.getCollectionList();
        },

        handleRemoveCollection (index) {
          this.dataSetCollectionList.splice(index, 1);
        },
        getCollectionList() {
          let that =this;
          this.loading = true;
          fetchCollectionList(Object.assign({}, this.listQuery)).then(response =>{
            that.dataSetCollectionList = response.content;
            that.totalElements = response.totalElements;
            that.loading = false;
          }).catch(error =>{
            console.log(error);
          })
        },
      },
      computed:{
        dataSetInfo(){
          return this.dataSetCollectionList.map(set => {
            let newFormattedSet = Object.assign({}, set);
            newFormattedSet.dataSetChars = set.dataSetCharacteristics.map(char => char.englishName).join();
            newFormattedSet.associatedTasks = set.associatedTasks.map(task => task.englishName).join();
            newFormattedSet.attributeChars=set.attributeCharacteristics.map(attr =>attr.englishName).join();
            newFormattedSet['numberOfInstances'] =Math.ceil(Math.random() * 100000);
            return newFormattedSet;
          })
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
  .data-set-table-title{
    margin-top: 20px;
    margin-bottom: 20px;
    width:20%;
    font:bold 36px 微软雅黑;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-30px);
  }
</style>
