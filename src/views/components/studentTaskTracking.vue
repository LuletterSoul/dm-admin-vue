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
                   :upload-req="importFuc"
                   @onUploaded="handleImported"
                   @onFailed="uploadDialogVisible =false"
                   @onClosed="handleCanceled"
                   :to-visible="uploadDialogVisible"
    ></upload-dialog>

  </div>
</template>

<script>
  import TaskRestTime from '../components/taskRestTime'
  import UploadDialog from '../components/UploadDialog'
  import {
    fetchTaskList,
    deleteTask,
    createTask,
    updateTask,
    deleteTaskBatch
  } from 'api/tasks';

  export default {
    name: "student-task-tracking",
    components: {TaskRestTime,UploadDialog},
    props: {
      toStages: {
        required: [],
        default: () => {
          return [];
        }
      }
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
                    this.handleUpload();
                  }
                }
              })])
            }
          }
        ],
        taskList: [],
        multipleSelection: [],
        uploadDialogVisible: false
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
      }
    },
    created() {
      this.getTaskList();
    },
    methods: {
      getTaskList() {
        let that = this;
        this.listLoading = true;
        fetchTaskList(Object.assign({}, this.listQuery)).then(response => {
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
      handleImported(res){
        this.$store.dispatch('SetNewStudents',res);
        this.uploadDialogVisible = false;
      },
      handleCanceled(){
        this.uploadDialogVisible = false;
      },
      handleUpload(){
        this.uploadDialogVisible = true;
      },
      importFuc(fd){
        //let vm = this;
        return new Promise((resolve, reject) => {
          importFromExcel(fd).then(res => {
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
