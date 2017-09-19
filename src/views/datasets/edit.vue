<template>
    <div id="app" class="app-container">

      <div id="title">
         数据集库管理
      </div>

      <div class="upload">
        <Button type="ghost"><router-link to="upload">上传数据集</router-link></Button>
        <Button type="ghost"  @click="delrow">删除</Button>
      </div>


      <div style="margin-top:60px;clear:right;">
        <template>
          <Table border :columns="dataSetTable1" :data="dataSet1" @on-selection-change="change" stripe ></Table>
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

       <Modal
        v-model="dataSetModel"
        title="修改"
        @on-ok="ok"
        @on-cancel="cancel">

         <Form :model="temp" :label-width="80">
           <FormItem label="Name">
             <Input v-model="temp.setName" placeholder="请输入"></Input>
           </FormItem>
           <FormItem label="Data Types">
             <CheckboxGroup v-model="temp.dataTypes">
               <Checkbox label="Multivariate"></Checkbox>
               <Checkbox label="Univariate"></Checkbox>
               <Checkbox label="Sequential"></Checkbox>
               <Checkbox label="Time-Series"></Checkbox>
               <Checkbox label="Text"></Checkbox>
               <Checkbox label="Domain-Theory"></Checkbox>
               <Checkbox label="Other"></Checkbox>
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
           <FormItem label="Attribute Types">
             <CheckboxGroup v-model="temp.attributeType">
               <Checkbox label="Categorical"></Checkbox>
               <Checkbox label="Integer"></Checkbox>
               <Checkbox label="Real"></Checkbox>
             </CheckboxGroup>
           </FormItem>
             <FormItem label="#instances">
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
  import { fetchDataSetList,
    deleteDataSet ,
    createDataSet,
    updateDataSet,
    deleteDataSetsBatch} from 'api/datasets';

  const calendarTypeOptions = [
    { key: 'CN', display_name: '中国' },
    { key: 'US', display_name: '美国' },
    { key: 'JP', display_name: '日本' },
    { key: 'EU', display_name: '欧元区' }
  ];

  // arr to obj
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name;
    return acc
  }, {});

  export default {
        name: 'app',
        data () {
        return {
          dataSetTable1: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '编号',
              key: 'dataSetId',
              sortable: true
            },
            {
              title: '名称',
              key: 'setName',
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
              key: 'attributeType',
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
                        this.remove(params.index)
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
                        this.edit(params.index)
                      }
                    }
                  }, '修改')
                ]);
              }
            }
          ],
          dataSet1: [
            {
              dataSetId:'111',
              setName:'mino',
              characteristics:'roro',
              associatedTasks:'hoony',
              attributeType:'yoon',
              instances:0,
              dateDonated:'jinu'
            }
          ],
          listQuery: {
            dataSetId: undefined,
            setName: undefined,
            characteristics:undefined,
            associatedTasks:undefined,
            attributeType:undefined,
            instances:0,
            dateDonated:undefined,
            page: 1,
            limit: 20,
            sort: '+id'
          },
          temp:{
            dataSetId:'',
            setName:'',
            characteristics:'',
            associatedTasks:'',
            attributeType:'',
            instances:0,
            dateDonated:''
          },
          dataSetModel: false,
          listLoading: true,
          datasetList:[],
          total:null,
          selection:[],
        }
      },
      created() {
        this.getDatasetList();
      },
      filters: {
        statusFilter(status) {
          const statusMap = {
            published: 'success',
            draft: 'gray',
            deleted: 'danger'
          };
          return statusMap[status]
        },
        typeFilter(type) {
          return calendarTypeKeyValue[type]
        }
      },
      methods: {
        getDatasetList() {
          let that = this;
          fetchDatasetsList(this.listQuery).then(response => {
            this.datasetList = response.dataset;
            this.total = response.total;
          }).catch(error =>{
            this.$Message.info('出错');
          })
        },
        handleFilter() {
          this.getStudentList();
        },
        timeFilter(time) {
          if (!time[0]) {
            this.listQuery.start = undefined;
            this.listQuery.end = undefined;
            return;
          }
          this.listQuery.start = parseInt(+time[0] / 1000);
          this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000);
        },
        show (index) {
          this.$Modal.info({
            title: 'information',
            content: `编号：${this.dataSet1[index].dataSetId}<br>名称：${this.dataSet1[index].setName}<br>数据特征：${this.dataSet1[index].characteristics}
                    <br>相关任务：${this.dataSet1[index].associatedTasks}<br>属性类型：${this.dataSet1[index].attributeType}<br>实例数：${this.dataSet1[index].attributeType}
                    <br>捐赠时间：${this.dataSet1[index].dateDonated}`
          })
        },
        remove (index) {
          let confirmMessage = '您将删除序号为\'' + index.dataSetId + '\' '
            + index.setName + ' 的所有信息,是否继续?';
          let that =this;
          let feedbackMessage = '';
          this.$confirm(confirmMessage,'删除数据集',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            type:'warning',
            beforeClose: (action,instance,done) =>{
              if(action==='confirm'){
                instance.confirmButtonLoading = true;
                return new Promise((resolve, reject) => {
                  deleteDataset(row.dataSetId).then((response) => {
                    feedbackMessage = response.message;
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
            const index = that.datasetList.indexOf(index);
            that.datasetList.splice(index, 1);
          }).catch(() =>{
            this.$Message.info('取消删除');
          });
        },
        edit (index){
          this.temp = Object.assign({}, index);
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
              if (v.dataSetId === this.temp.dataSetId) {
                const index = this.datasetList.indexOf(v);
                this.datasetList.splice(index, 1, this.temp);
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
        delrow(){
          let confirmMessage = '您将删除所选数据集,是否继续?';
          let feedbackMessage = '';
          let dataSetId = this.selection.map(item => item.dataSetId);
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
                  deleteDatasetBatch(dataSetIds).then(response =>{
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
              done();
            }
          }).then((message) =>{
            //删除被选中的行
            that.getDatasetList();
            this.$Message.info('批量删除成功');
          }).catch(() =>{
            this.$Message.info('取消批量删除');
          })
        },
//        showdata(){
//          this.$Modal.info({
//            title: 'information2',
//            content: `a：${this.selection[0].setName}<br>年龄：${this.selection.length}`
//          })
//        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
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
    width:22%;
    font:bold 36px 微软雅黑;
  }
  .upload{
    margin-top:20px;
    float:right;
  }
</style>
