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
  </div>
</template>

<script>
  import TaskRestTime from '../components/taskRestTime'
  import {
    fetchTaskList,
    deleteTask,
    createTask,
    updateTask,
    deleteTaskBatch
  } from 'api/tasks';

  export default {
    name: "task-tracking",
    components: {TaskRestTime},
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
            key: 'comment'
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
            title: '挖掘结果',
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: 'margin:10px'
              }, [h('Button', {
                props: vm._submitted,
                on: {
                  click: () => {

                  }
                }
              })])
            }
          }
        ],
        taskList: [],
        multipleSelection: []
      };
    },
    computed: {
      _stages() {
        this.toStages.map(s => {
        })
      },
      _submitted() {
        return {
          type: 'warning',
          shape: 'circle',
          icon: 'ios-cloud-download-outline',
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
  }
</script>

<style scoped>

</style>
