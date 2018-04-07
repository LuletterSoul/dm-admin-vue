<template>
    <div>
      <el-row>
        <el-col :offset="1" :span="22">
          <Table border
                 :loading="listLoading"
                 :columns="taskColumns"
                 :data="taskList"
                 size='default'
                 @on-selection-change="handleSelectionChange"
                 stripe></Table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { fetchTaskList,
    deleteTask ,
    createTask,
    updateTask,
    deleteTaskBatch} from 'api/tasks';
    export default {
        name: "tracking",
        data(){
          return{
            listLoading: false,
            taskColumns: [
              {
                type: 'selection',
                width: 60,
                align: 'center'
              },
              {
                title: '序号',
                type: 'index',
                width: 70,
                align: 'center'
              },
              {
                title: '任务名称',
                align: 'center',
                key: 'taskName'
              },
              {
                title: '任务编号',
                align: 'center',
                width: 100,
                key: 'arrangementId'
              },
              {
                title: '建立时间',
                align: 'center',
                key: 'builtTime'
              },
              {
                title: '计划开始时间',
                align: 'center',
                key: 'plannedStartTime'
              },
              {
                title: '计划结束时间',
                align: 'center',
                key: 'plannedFinishTime'
              },
              {
                title: '剩余天数',
                align: 'center',
              },
              {
                title:'阶段状态',
                align:'center'
              },
              {
                title:'阶段结果',
                align:'center'
              },
              {
                title: '关联队伍',
                align: 'center',
                render:(h,params) =>{
                  let hArray = [];
                  let groupPeeks = params.row.groupPeeks;
                  //防止因为分组的异步数据未获取到而导致的undefine问题
                  if(groupPeeks ===undefined){
                    return [];
                  }
                  groupPeeks.forEach(g => {
                    hArray.push(h(GroupAvatar, {
                      props: {
                        group: {
                          groupName: g.groupName,
                          groupId: g.groupId,
                          arrangementId: g.arrangementId
                        }
                      },
                      on: {
                        click: () => {
                          vm.$router.push({path: 'create'});
                        }
                      }
                    }));
                  });
                  return hArray;
                }
              },
              {
                title: '任务状态',
                align: 'center',
                width:'200px',
                render: function (h, params) {
                  return h('Tag', {
                    props: vm.renderTaskStatusTag(params.row.progressStatus)
                  }, params.row.progressStatus.description)
                }
              },
              {
                title: '操作',
                align: 'center',
                width: 200,
                render: (h, params) => {
                  return h('ButtonGroup', [
                    h('Button', {
                      props: {
                        icon:'ios-search',
                        size:'small'
                      },
                      on: {
                        click: () => {
                          this.handleCheck(params.index)
                        }
                      }
                    }),
                    h('Button', {
                      props: {
                        icon:'android-delete',
                        size:'small'
                      },
                      on: {
                        click: () => {
                          this.handleDelete(params.row, params.index);
                        }
                      }
                    }),
                    h('Button', {
                      props: {
                        icon:'edit',
                        size:'small'
                      },
                      on: {
                        click: () => {
                          this.handleEdit(params.index)
                        }
                      }
                    })
                  ]);
                }
              }
            ],
            taskList: [],
            multipleSelection:[]
          }
        },
        components:{},
        computed:{},
        created(){
          this.getTaskList();
        },
        methods:{
          getTaskList() {
            let that = this;
            this.listLoading = true;
            fetchTaskList(Object.assign({}, this.listQuery)).then(response => {
              this.taskList = response.content;
              this.totalElements = response.totalElements;
              this.listLoading = false;
            }).catch(error =>{
              that.$message({
                type: 'error',
                message:error
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
