<template>
  <div style="margin: 10px">
    <result :results="stageResults"
                :state-options="stateOptions"
                :visible="resultVisible"
                :loading="resultLoading"
                :total="total"
                @size-changed="handleSizeChange"
                @page-changed="handlePageChange"
                @state-filter-changed="handleStateChange"
                @onClosed="resultVisible = false"
                >
        </result>
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
    <el-row style="margin: 10px;">
      <el-col :span="1" style="margin-bottom: 10px">
        <el-tooltip class="item" effect="dark" content="下载全部最新的挖掘结果" placement="top-end">
          <el-button @click="handleDownloadAll" :loading="downloading" size="small" type="primary" icon="el-icon-download" circle></el-button>
        </el-tooltip>
      </el-col>
      <el-col style="margin-top: 8px" :offset="1" :span="22">
        <transition name="fade" mode="out-in">
          <el-progress v-if="downloading"  :text-inside="true" :stroke-width="18" :percentage="_percent" status="exception"></el-progress>
        </transition>
      </el-col>
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
  import Result from './result'
  import {
    fetchTaskList,
    deleteTask,
    createTask,
    updateTask,
    deleteTaskBatch,
    findResultRecords,
    findStatistics
  } from 'api/tasks';

  import {
    getResults,
    createResult,
    uploadResult,
    downloadResult,
  } from 'api/results';

  import {
    createStage,
    getResultsByStageId,
  } from 'api/stages';

  import FileSaver from 'file-saver'

  export default {
    name: "task-tracking",
    components: {TaskRestTime,Result},
    props: {
      toStages: {
        required: [],
        default: () => {
          return [];
        }
      },
      toTaskId:{
        required:true,
        default: ''
      }
    },
    data() {
      let vm = this;
      return {
        listLoading: false,
        resultLoading:false,
        stages: this.toStages,
        downloading:false,
        resultVisible: false,
        total: 0,
        recordIds:undefined,
        loaded:0,
        totalSize:100,
        query:{
          taskId:this.toTaskId,
          stageId:-1,
          state: '',
          submitterIds:[],
          all:false,
          page: 0,
          size: 20,
          sort: "resultId,ASC",
        },
        stateOptions:[
          {
            value:'',
            description: '全部'
          },
          {
            value:1,
            description:'未提交'
          },
          {
            value:2,
            description:'新提交'
          },
          {
            value:3,
            description:'已下载'
          }
        ],
        stageResults:[],
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
                    vm.handleResultViewClicked(params.row.stageId);
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
          type: 'ghost',
          shape: 'circle',
          icon: 'ios-more',
        }
      },
      _percent(){
        return Math.ceil(this.loaded / this.totalSize * 100);
      },
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
      handleSizeChange(val){
        this.query.size = val;
      },
      handlePageChange(val){
        this.query.page = val;
        this.fetchResults();
      },
      handleStateChange(val){
        this.query.state = val;
        this.query.page = 0;
        this.query.size = 8;
        this.fetchResults();
      },
      handleDownloadProgress(event){
        this.downloading = true;
        this.loaded = event.loaded;
        this.totalSize = event.total;
        if(event.loaded === event.total){
          this.downloading = false;
        }
      },
      async handleDownloadAll(){
        if(this.recordIds ===undefined){
          try{
            const res = await findResultRecords(this.toTaskId, {all:true});
            this.recordIds  = res.content.map(r=>r.recordId);
          }catch (e) {
            return;
          }
        }
        this.downloading = true;
        downloadResult(this.recordIds,this.handleDownloadProgress).then((res) => {
          this.downloading = false;
          const effectiveFileName = res.headers['x-suggested-filename'];
          FileSaver.saveAs(res.data, effectiveFileName);
        }).catch(error => {
          this.downloading = false;
        });
      },
      fetchResults(){
        let vm = this;
        vm.resultLoading = true;
        getResults(Object.assign({}, this.query)).then(res => {
          vm.stageResults = res.content;
          vm.total = res.totalElements;
          vm.resultLoading = false;
        }).catch(error => {
          vm.resultLoading = false;
        });
      },
      handleResultViewClicked(stageId){
        this.query.page = 0;
        this.query.size = 8;
        this.query.state = '';
        this.query.stageId = stageId;
        this.query.taskId = this.toTaskId;
        this.resultVisible = true;
        this.fetchResults();
      }
    }
  }
</script>

<style scoped>

</style>
