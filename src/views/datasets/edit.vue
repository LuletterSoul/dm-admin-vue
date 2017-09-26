<template>
    <div id="app" class="app-container">

      <div class="dataSetTabletitle">
         数据集库管理
      </div>

      <!--<div class="upload">-->

      <!--</div>-->
      <Row>
        <Col span="1" offset="20">
        <Button type="ghost"><router-link to="upload">上传数据集</router-link></Button>
        </Col>
        <Col span="2" offset="1">
         <Button type="error"  @click="handleDeleteBatch" :disabled="selectionIds.length===0">批量删除</Button>
        </Col>
      </Row>



      <div style="margin-top:20px;clear:right;padding: 20px;">
        <template>
          <Table :loading="loading" border :columns="dataSetTable1" :data="dataSetInfo" @on-selection-change="handleSelectionChange" stripe ></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="totalElements" :current="1"
                      :page-size-opts="[10, 20, 30, 40]"
                      @on-change="handlePageChange"
                      @on-page-size-change="handleSizeChange"
                      show-sizer></Page>
              </div>
            </div>
        </template>
      </div>

       <Modal
        v-model="dataSetModel"
        title="修改"
        @on-ok="ok"
        @on-cancel="cancel">

         <Form :model="temp" :label-width="80">
           <FormItem label="Name">
             <Input v-model="temp.collectionName" placeholder="请输入"></Input>
           </FormItem>
           <FormItem label="Data Types">
             <CheckboxGroup v-model="temp.characteristics">
               <Checkbox label="Multivariate"></Checkbox>
               <Checkbox label="Univariate"></Checkbox>
               <Checkbox label="Sequential"></Checkbox>
               <Checkbox label="Time-Series"></Checkbox>
               <Checkbox label="Text"></Checkbox>
               <Checkbox label="Domain-Theory"></Checkbox>
               <Checkbox label="Other"></Checkbox>
             </CheckboxGroup>
           </FormItem>
           <FormItem label="Attribute Types">
             <CheckboxGroup v-model="temp.attributeTypes">
               <Checkbox label="Categorical"></Checkbox>
               <Checkbox label="Integer"></Checkbox>
               <Checkbox label="Real"></Checkbox>
             </CheckboxGroup>
           </FormItem>
           <FormItem label="Default Task">
             <CheckboxGroup v-model="temp.associatedTasks">
               <Checkbox label="Classification"></Checkbox>
               <Checkbox label="Regression"></Checkbox>
               <Checkbox label="Clustering"></Checkbox>
               <Checkbox label="Other"></Checkbox>
             </CheckboxGroup>
           </FormItem>
           <FormItem label="instances">
              <Input v-model="temp.instances" placeholder="请输入"></Input>
           </FormItem>
           <FormItem label="Date Donated">
             <Row>
               <Col span="10">
                 <DatePicker type="date" placeholder="选择日期" v-model="temp.dateDonated"></DatePicker>
               </Col>
             </Row>
           </FormItem>
         </Form>
      </Modal>
    </div>
</template>

<script type="text/javascript">

  import { parseTime } from 'utils';
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
        name: 'app',
        data () {
        return {
          loading:true,
          dataSetTable1: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '数据集名称',
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
                        this.show(params.index)
                      }
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.handleRemoveCollection(params.index)
                      }
                    }
                  }, '删除'),
                  h('Button', {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.handleUpdate(params.index)
                      }
                    }
                  }, '修改')
                ]);
              }
            }
          ],
          dataSet1: [
            {
              collectionId:'111',
              collectionName:'mino',
              characteristics:'roro',
              associatedTasks:'hoony',
              attributeTypes:'yoon',
              instances:0,
              dateDonated:'jinu'
            }
          ],

          listQuery: {
//            collectionId: undefined,
//            collectionName: undefined,
//            characteristics:undefined,
//            associatedTasks:undefined,
//            attributeTypes:undefined,
//            instances:0,
//            dateDonated:undefined,
            page: 1,
            size: 10,
            sort: 'collectionName'
          },
          temp:{
            collectionId:'',
            collectionName:'',
            characteristics:[],
            associatedTasks:[],
            attributeTypes:[],
            instances:0,
            dateDonated:''
          },
          dataSetModel: false,
          dataSetList:[],
          totalElements:null,
          selectionIds:[],
        }
      },
      created() {
        this.getCollectionList();
      },
      methods: {
        getCollectionList() {
          let that =this;
          this.loading = true;
          fetchCollectionList(Object.assign({}, this.listQuery)).then(response =>{
            that.dataSetList = response.content;
            that.totalElements = response.totalElements;
            that.loading = false;
          }).catch(error =>{
            console.log(error);
          })
        },
        show (index) {
          this.$Modal.info({
            title: 'information',
            content: `数据集名称：${this.dataSet1[index].collectionName}<br>数据特征：${this.dataSet1[index].characteristics}
                    <br>相关任务：${this.dataSet1[index].associatedTasks}<br>属性类型：${this.dataSet1[index].attributeTypes}<br>
                    实例数：${this.dataSet1[index].attributeTypes}<br>捐赠时间：${this.dataSet1[index].dateDonated}`
          })
        },
        handleRemoveCollection (index) {
          let confirmMessage = '您将数据集 ' + this.dataSetList[index].collectionName + ' 的所有信息,是否继续?';
          let that =this;
          this.$confirm(confirmMessage,'删除数据集',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning',
            beforeClose: (action,instance,done) =>{
              if(action==='confirm'){
                instance.confirmButtonLoading = true;
                return new Promise((resolve, reject) => {
                  deleteCollection(this.dataSetList[index].collectionId).then((response) => {
                    instance.confirmButtonLoading = false;
                    this.$Message.info('删除成功');
                    done();
                    resolve(response);
                  }).catch(error => {
                    done();
                    this.$Message.info('删除失败');
                  })
                });
              }
              done();
            }
          }).then(() =>{
            const index = that.dataSetList.indexOf(index);
            that.dataSetList.splice(index, 1);
          }).catch(() =>{
            this.$Message.info('取消删除');
          });
        },
        handleSelectionChange(selections) {
          this.selectionIds = selections.map(selection => selection.collectionId);
        },
        handleUpdate (index){
          this.temp = Object.assign({}, this.dataSetList[index]);
          this.dataSetModel = true;
        },
        ok () {
          this.$Message.info('确定修改');
          updata();
        },
        update() {
          updateDatasets(this.temp).then(response =>{
            let message = response.message;
            for (const v of this.datasetsList) {
              if (v.collectionId === this.temp.collectionId) {
                const index = this.dataSetList.indexOf(v);
                this.dataSetList.splice(index, 1, this.temp);
                break;
              }
            }
            this.$message({
              type: 'success',
              message:message
            });
          });
          this.dataSetModel = false;
        },
        cancel () {
          this.$Message.info('取消修改');
          dataSetModel = false;
        },
        change(selection) {
          this.selection = selection;
        },
        handleDeleteBatch(){
          let confirmMessage = '您将删除所选数据集,是否继续?';
          let that =this;
          this.$confirm(confirmMessage,'批量删除数据集',{
            confirmButtonText:'确认',
            cancelButtonText:'取消',
            beforeClose: (action,instance,done) =>{
              if(action ==='confirm'){
                //显示加载按钮
                instance.confirmButtonLoading = true;
                return new Promise((resolve,reject) =>{
                  //通过API发送批量删除请求
                  deleteCollectionsBatch(that.selectionIds).then(response =>{
                    instance.confirmButtonLoading=false;
                    that.feedbackMessage = response.message;
                    resolve(response);
                    done();
                  }).catch(error =>{
                    //捕获错误;
                    reject(error);
                    done();
                  })
                })
              }
              //关闭确认框
              instance.confirmButtonLoading=false;
              done();
            }
          }).then((message) =>{
            //删除被选中的行
            that.getCollectionList();
            this.$Message.info('批量删除成功');
            that.selectionIds =[] ;
          }).catch(() =>{
            this.$Message.info('取消批量删除');
          })
        },
        handleSizeChange(val) {
          this.listQuery.size = val;
          this.getCollectionList();
        },
        handlePageChange(val){
          this.listQuery.page = val;
          this.getCollectionList();
        }
      },
    computed:{
      dataSetInfo(){
        return this.dataSetList.map(set => {
          let newFormattedSet = Object.assign({}, set);
          newFormattedSet.characteristics = set.characteristics.map(char => char.englishName).join();
          newFormattedSet.associatedTasks = set.associatedTasks.map(task => task.englishName).join();
          newFormattedSet.attributeTypes=set.attributeTypes.map(attr =>attr.englishName).join();
          newFormattedSet['instances'] =Math.ceil(Math.random() * 100000);
          return newFormattedSet;
        })
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
  .dataSetTabletitle{
    margin-top: 20px;
    margin-bottom: 20px;
    width:22%;
    font:bold 36px 微软雅黑;
  }
  .upload{
    padding-right: 20px;
    margin-top:20px;
    float:right;
  }

</style>
