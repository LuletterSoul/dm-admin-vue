<template>
  <div style="margin: 10px">
    <el-row style="margin: 10px">
      <el-col>
        <el-alert
          :closable="false"
          title="任务追踪"
          type="success"
          center>
        </el-alert>
      </el-col>
    </el-row>

    <el-row style="margin: 10px">
      <el-col>
        <Table border
               :loading="listLoading"
               :columns="stageColumns"
               :data="toStages"
               size='default'
               stripe></Table>
      </el-col>
    </el-row>
    <upload-dialog :title="'上传结果'"
                   :message="'上传成功'"
                   :format="''"
                   :upload-req="uploadRes"
                   :file-name="'resultFile'"
                   @onFailed="uploadDialogVisible =false"
                   @onClosed="handleCanceled"
                   :to-visible="uploadDialogVisible"
    ></upload-dialog>

  </div>
</template>

<script>
  import TaskRestTime from '../components/taskRestTime'
  import UploadDialog from '../components/UploadDialog'
  import * as api from '../../api/index'

  export default {
    name: "student-task-tracking",
    components: {TaskRestTime,UploadDialog},
    props: {
      toStages: {
        required: [],
        default: () => {
          return [];
        }
      },
      taskId:{
        required:'',
        default:''
      },
    },
    data() {
      let vm = this;
      return {
        listLoading: false,
        stages: this.toStages,
        stageColumns: [
          {
            title: '里程碑',
            align: 'center',
            render: (h, params) => {
              return h('p', '第 ' + params.row.orderId + ' 阶段');
            }
          },
          {
            title: '任务描述',
            align: 'center',
            render: (h, params) => {
              return h('ButtonGroup', [
                h('Button', {
                  props: {
                    icon:'ios-compose-outline',
                    size:'small'
                  },
                  on: {
                    click: () => {
                      this.handleCheck(params.index);
                    }
                  }
                })
              ]);
            }
          },
          {
            title: '计划开始时间',
            align: 'center',
            key: 'begin'
          },
          {
            title: '计划结束时间',
            align: 'center',
            key: 'end'
          },
          {
            title: '已进行时间',
            align: 'center',
            render: (h, params) => {
              return h(TaskRestTime, {
                props: {
                  beginTime: params.row.begin,
                  endTime: params.row.end
                }
              }, '');
            }
          },
          {
            title: '状态',
            align: 'center',
          },
          {
            title: '上传结果',
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: 'margin:10px'
              }, [h('Button', {
                props: vm._submitted,
                on: {
                  click: () => {
                    this.handleUpload(params.row.stageId);
                  }
                }
              })])
            }
          }
        ],
        resultList: [],
        multipleSelection: [],
        uploadDialogVisible: false,
        resQuery:{
          taskId:this.taskId,
          stageId:'',
          state:'',
          all:'',
          submitterIds:[]
        },
        list:{
        },
        resultId:''
      };
    },
    computed: {
      _stages() {
        this.toStages.map(s => {
        })
      },
      _submitted() {
        return {
          type: 'success',
          shape: 'circle',
          icon: 'ios-cloud-upload-outline',
        }
      },
      _userProfile(){
        return this.$store.getters.userProfile;
      },
    },
    created() {
      this.getTaskList();
    },
    methods: {
      getTaskList() {
        let that = this;
        this.listLoading = true;
        api.task.fetchTaskList(Object.assign({}, this.list)).then(response => {
          this.taskList = response.content;
          this.totalElements = response.totalElements;
          this.listLoading = false;
        }).catch(error => {
          that.$message({
            type: 'error',
            message: error
          })
        })
      },
      getResultList() {
        let that = this;
        let query = Object.assign({}, this.resQuery);
        query.submitterIds = this._userProfile.userId;
        api.result.getResults(Object.assign({}, query)).then(response => {
          this.resultList = response.content;
        }).catch(error => {
          that.$message({
            type: 'error',
            message: error
          })
        })
      },
      handleCheck(index) {
        let vm = this;
        this.detailTargetIndex = index;
        this.$Modal.info({
          title: '详细分组描述',
          content: `显示具体分组任务`
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCanceled(){
        this.uploadDialogVisible = false;
      },
      handleUpload(stageId){
        this.resQuery.stageId = stageId;
        this.getResultList();
        this.uploadDialogVisible = true;
      },
      uploadRes(fd){
        let vm = this;
        if(!this.resultList.length){
          return;
        }
        let resultId= this.resultList[0].resultId;
        return new Promise((resolve, reject) => {
          api.result.uploadResult(resultId,fd).then(res => {
            this.uploadDialogVisible = false;
            resolve(res);
          }).catch(error => {
            reject(error);
          });
        });
      }
    }
  }
</script>

<style scoped>

  .btn-item {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
  }
</style>
