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
                      show-sizer>
                </Page>
              </div>
            </div>
        </template>
      </div>

       <Modal
        v-model="dataSetModel"
        title="修改"
        @on-ok="update"
        @on-cancel="cancel">
         <Form :model="temp" :label-width="80">
           <FormItem label="Name">
             <Input v-model="temp.collectionName" placeholder="请输入"></Input>
           </FormItem>
           <FormItem label="数据特征" prop="dataSetChars">
             <CheckboxGroup v-model="temp.dataSetChars" >
               <transition-group name="list">
                 <Checkbox v-for="item in dataSetCharOptions" :key="item" :label="item.charId">
                   {{ item.englishName }}-{{ item.chineseName }}
                 </Checkbox>
               </transition-group>
             </CheckboxGroup>
           </FormItem>
           <!--<FormItem label="Data Types">-->
             <!--<CheckboxGroup v-model="temp.dataSetChars">-->
               <!--<Checkbox label="Multivariate"></Checkbox>-->
               <!--<Checkbox label="Univariate"></Checkbox>-->
               <!--<Checkbox label="Sequential"></Checkbox>-->
               <!--<Checkbox label="Time-Series"></Checkbox>-->
               <!--<Checkbox label="Text"></Checkbox>-->
               <!--<Checkbox label="Domain-Theory"></Checkbox>-->
               <!--<Checkbox label="Other"></Checkbox>-->
             <!--</CheckboxGroup>-->
           <!--</FormItem>-->
           <FormItem label="属性类型" prop="attributeCharIds">
             <CheckboxGroup v-model="temp.attributeCharIds">
               <transition-group name="list">
                 <Checkbox v-for="item in attrCharOptions" :key="item" :label="item.typeId">
                   {{ item.englishName }}
                 </Checkbox>
               </transition-group>
               <!--<Checkbox style="font-size: 16px;" label="Categorical"></Checkbox>-->
               <!--<Checkbox style="font-size: 16px;" label="Integer"></Checkbox>-->
               <!--<Checkbox style="font-size: 16px;" label="Real"></Checkbox>-->
             </CheckboxGroup>
           </FormItem>
           <FormItem label="相关任务" prop="associatedTaskIds">
             <CheckboxGroup v-model="temp.associatedTaskIds">
               <transition-group name="list">
                 <Checkbox v-for="item in associatedTaskOptions" :key="item" :label="item.typeId">
                   {{ item.englishName }}
                 </Checkbox>
               </transition-group>
               <!--<Checkbox style="font-size: 16px;" label="Classification"></Checkbox>-->
               <!--<Checkbox style="font-size: 16px;" label="Regression"></Checkbox>-->
               <!--<Checkbox style="font-size: 16px;" label="Clustering"></Checkbox>-->
               <!--<Checkbox style="font-size: 16px;" label="Other"></Checkbox>-->
             </CheckboxGroup>
           </FormItem>
           <FormItem label="实例数">
              <Input v-model="temp.numberOfInstances" placeholder="请输入"></Input>
           </FormItem>
           <FormItem label="捐赠日期">
             <Row>
               <Col span="10">
                 <DatePicker type="date" placeholder="选择日期" v-model="temp.dateDonated"></DatePicker>
               </Col>
             </Row>
           </FormItem>
           <FormItem label="描述摘要" >
             <Input v-model="temp.abstractInfo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
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
              sortable: true,
            },
            {
              title: '数据特征',
              key: 'dataSetChars',
              sortable: true
            },
            {
              title: '相关任务',
              key: 'associatedTasks',
              sortable: true
            },
            {
              title: '属性类型',
              key: 'attributeChars',
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
              numberOfInstances:0,
              dateDonated:'jinu'
            }
          ],

          listQuery: {
            page: 0,
            size: 10,
            direction:'DESC',
          },
          temp:{
            collectionId:'',
            collectionName:'',
            numberOfInstances:0,
            areaId:1111,
            dateDonated:new Date(),
            dataSetCharIds: [0],
            associatedTaskIds:[0],
            attributeCharIds:[0],
            abstractInfo:'',
          },
          dataSetModel: false,
          dataSetList:[],
          totalElements:null,
          selectionIds:[],
          associatedTaskOptions:[],
          areaTypeOptions:[],
          dataSetCharOptions:[],
          attrCharOptions:[],
        }
      },
      created() {
        this.getCollectionList();
        this.fetchOptionals();
      },
      methods: {
        fetchOptionals() {
          fetchOptions().then(response =>{
            this.dataSetCharOptions = response.dataSetCharOptions;
            this.associatedTaskOptions = response.associatedTaskOptions;
            this.attrCharOptions = response.attrCharOptions;
            this.areaTypeOptions = response.areaTypeOptions;
          }).catch(error =>{
            console.error(error);
          })
        },
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
        handleCheck (index) {
          this.$Modal.info({
            title: 'information',
            content: `数据集名称：${this.dataSetInfo[index].collectionName}<br>数据特征：${this.dataSetInfo[index].dataSetChars}
                    <br>相关任务：${this.dataSetInfo[index].associatedTasks}<br>属性类型：${this.dataSetInfo[index].attributeChars}<br>
                    实例数：${this.dataSetInfo[index].attributeChars}<br>捐赠时间：${this.dataSetInfo[index].dateDonated}
                   <br>摘要： ${this.dataSetInfo[index].abstractInfo}`
          })
        },
        handleRemoveCollection (index) {
          let confirmMessage = '您将删除数据集 ' + this.dataSetList[index].collectionName + ' 的所有信息,是否继续?';
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
                    instance.confirmButtonLoading = false;
                    this.$Message.info('删除失败');
                  })
                });
              }
              done();
            }
          }).then(() =>{
//            const index = that.dataSetList.indexOf(index);
            that.dataSetList.splice(index, 1);
          }).catch(() =>{
            this.$Message.info('取消删除');
          });
        },
        handleSelectionChange(selections) {
          this.selectionIds = selections.map(selection => selection.collectionId);
        },
        resetTemp() {
          this.temp = {
            collectionId: '',
            collectionName: '',
            instances: 0,
            areaId: 1111,
            dateDonated: new Date(),
            characteristicIds: [0],
            associatedTaskIds: [0],
            attributeTypeIds: [0],
            abstractInfo: '',
          }
        },
        handleUpdate (index){
          let set = this.dataSetList[index];
          this.resetTemp();
          this.temp.collectionId = set.collectionId;
          this.temp.collectionName =set.collectionName;
          this.temp.numberOfInstances = Math.ceil(Math.random() * 10000);
//          this.temp.areaId = set.area.areaId;
          this.temp.dateDonated = set.dateDonated;
          this.temp.dataSetChars = set.dataSetCharacteristics.map(char => char.charId);
          this.temp.associatedTaskIds = set.associatedTasks.map(task => task.typeId);
          this.temp.attributeCharIds = set.attributeCharacteristics.map(attr => attr.charId);
          this.abstractInfo = set.abstractInfo;
          this.dataSetModel = true;
        },
        confirmUpdate () {
          this.$Message.info('确定修改');
          this.update();
        },
        update(index) {
          updateCollection(this.temp).then(result =>{
            let newCollection = result;
//            for (const v of this.datasetsList) {
//              if (v.collectionId === this.temp.collectionId) {
//                const index = this.dataSetList.indexOf(v);
//
//                break;
//              }
//            }
            this.dataSetList.splice(index, 1, newCollection);
            this.$message({
              type: 'success',
              message:'更新成功'
            });
          }).catch(error =>{
            console.log(error);
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
          this.listQuery.page = val-1;
          this.getCollectionList();
        }
      },

    computed:{
      dataSetInfo(){
        return this.dataSetList.map(set => {
          let newFormattedSet = Object.assign({}, set);
          newFormattedSet.dataSetChars = set.dataSetCharacteristics.map(char => char.englishName).join();
          newFormattedSet.associatedTasks = set.associatedTasks.map(task => task.englishName).join();
          newFormattedSet.attributeChars=set.attributeCharacteristics.map(attr =>attr.englishName).join();
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
