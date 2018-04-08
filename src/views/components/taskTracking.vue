<template>
    <div>
      <el-row style="margin: 10px">
        <el-col >
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
        name: "task-tracking",
        props:{
          toStages:{
            required:[],
            default:()=>{
              return [];
            }
          }
        },
        data(){
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
                key:'comment'
              },
              {
                title: '计划开始时间',
                align: 'center',
                key:'begin'
              },
              {
                title: '计划结束时间',
                align: 'center',
                key:'end'
              },
              {
                title:'剩余天数',
                align: 'center',
              },
              {
                title: '状态',
                align: 'center'
              },
              {
                title: '挖掘结果',
                align: 'center'
              }
            ],
            taskList: [],
            multipleSelection: []
          };
        },
        components:{},
        computed:{
          _stages(){
            this.toStages.map( s =>{})
          }
        },
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
