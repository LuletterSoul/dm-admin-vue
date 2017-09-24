<template>
  <div class="calendar-list-container test">

    <div class="title">
      任务信息管理
    </div>

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="编号" v-model="listQuery.taskId">
      </el-input>

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">筛选</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="plus"><router-link to="create">添加</router-link></el-button>-->
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
      <el-button class="filter-item" type="primary" icon="delete" v-waves @click="handleBatchDelete" :disabled="!multipleSelection.length">批量删除</el-button>
    </div>

    <el-table :key='tableKey' :data="taskList"
              ref="taskTable"
              v-loading.body="listLoading"
              border fit
              highlight-current-row style="width: 100%"
              @selection-change="handleSelectionChange"
              @row-click="handleRowClicked">
      <el-table-column v-if="multipleSelection.length" type="selection" width="55"></el-table-column>

      <el-table-column align="center" label="任务编号" width="100px">
        <template scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.taskId" placement="top-start">
            <span>{{scope.row.taskId}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="数据集编号" width="120px">
        <template scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.collectionId" placement="top-start">
            <span>{{scope.row.collectionId}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="算法编号" width="120px">
        <template scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.algorithmId" placement="top-start">
            <span>{{scope.row.algorithmId}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学生组号" width="100px">
        <template scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.groupId" placement="top-start">
            <span>{{scope.row.groupId}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center"  label="任务状态" width="150">
        <template scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
          <span>
              {{ scope.row.status.value }}
              </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开始时间" width="180px">
        <template scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.startTime" placement="top-start">
            <span>{{scope.row.startTime}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="截止时间" width="180px">
        <template scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.finishTime" placement="top-start">
            <span>{{scope.row.finishTime}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="操作" min-width="200px">
        <template scope="scope">
          <el-button size="small" icon="edit"  type = "success" @click="handleUpdate(scope.row)">更新</el-button>
          <el-button size="small" icon="delete" type = "danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="small" icon="plus" type="primary" @click="handleAddStudent">添加分组</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="任务编号" label-width="85px">
          <el-input v-model="temp.taskId">
          </el-input>
        </el-form-item>

        <el-form-item label="任务名称" label-width="85px">
          <el-input v-model="temp.taskName">
          </el-input>
        </el-form-item>

        <el-form-item label="数据集编号" label-width="85px">
          <el-input v-model="temp.collectionId">
          </el-input>
        </el-form-item>

        <el-form-item label="算法编号" label-width="85px">
          <el-input v-model="temp.algorithmId">
          </el-input>
        </el-form-item>

        <el-form-item label="学生组号" label-width="85px">
          <el-input v-model="temp.groupId">
          </el-input>
        </el-form-item>

        <el-form-item label="开始时间" label-width="85px">
          <el-input v-model="temp.startTime">
          </el-input>
        </el-form-item>

        <el-form-item label="截止时间" label-width="85px">
          <el-input v-model="temp.finishTime">
          </el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="addStudentTitle" :visible.sync="dialogFormVisible2">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px">
        <p style="margin-bottom: 20px;">选择分组</p>
        <el-transfer
          :titles="['所有分组','已选分组']"
          v-model="value2"
          :data="data2">
        </el-transfer>
      </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="addStudent">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
//  import { parseTime } from 'utils';
//  import { fetchTaskList,
//    deleteTask ,
//    createTask,
//    updateTask,
//    deleteTaskBatch} from 'api/tasks';

  export default {
    name: 'TaskTable',
    data() {
      const generateData2 = _ => {
        const data = [];
        const students = ['姜昇润','宋旻浩','李昇勋','金秦禹'];
        students.forEach((student, index) => {
          data.push({
            label: student,
            key: index,
          });
        });
        return data;
      };
      return {
        total: null,
        listLoading: true,
        listQuery: {
//          taskId: undefined,
//          collectionId: undefined,
//          algorithmId: undefined,
//          groupId:undefined,
//          studentId:[],
//          startTime:undefined,
//          finishTime:undefined,
          page: 1,
          limit: 20,
          sort: 'taskName'
        },
        temp: {
          taskId: '',
          taskName:'',
          collectionId: '',
          algorithmId: '',
          groupId:'',
          studentId:[],
          startTime:'',
          finishTime:'',
          status:{},
        },
        taskList: [],
        queryTypeOptions:[
          '数据集编号',
          '算法编号',
          '学生组号'
        ],
        sortOptions: [{label: '按编号升序', key: '+id'}, {label: '按编号降序', key: '-id'}],
        multipleSelection:[],
        isDisplayFavoriteColumn:false,
        dataSetOptions:[
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10'
        ],
        algorithmOptions:[
          '01',
          '02',
          '03',
          '04'
        ],
        groupOptions:[
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07'
        ],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        pvData: [],
        tableKey: 0,
        dialogFormVisible2: false,
        addStudentTitle:'添加学生',
        data2: generateData2(),
        value2: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    },
    created() {
      this.getTaskList();
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleRowClicked(row,event,column) {
        let lable = column.label;
        if(lable==='操作'||lable==='姓名'){
          return;
        }
        this.$refs.taskTable.toggleRowSelection(row);
        this.isDisplayFavoriteColumn = !this.isDisplayFavoriteColumn;
      },
      getTaskList() {
        let that = this;
        this.listLoading = true;
        fetchTaskList(this.listQuery).then(response => {
          this.taskList = response.tasks;
          this.total = response.total;
          this.listLoading = false;
        }).catch(error =>{
          that.$message({
            type: 'error',
            message:error
          })
        })
      },
      handleFilter() {
        this.getTaskList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getTaskList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getTaskList();
      },
      handleBatchDelete() {
        let confirmMessage = '您将删除所选任务,是否继续?';
        let feedbackMessage = '';
        let taskIds = this.multipleSelection.map(item => item.taskId);
        let that =this;
        this.$confirm(confirmMessage,'批量删除任务',{
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          beforeClose: (action,instance,done) =>{
            if(action ==='confirm'){
              //显示加载按钮
              instance.confirmButtonLoading = true;
              return new Promise((resolve,reject) =>{
                //通过API发送批量删除请求
                deleteTaskBatch(taskIds).then(response =>{
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
//          that.taskList = that.taskList.filter(task =>
//          !that.multipleSelection.some(row => row.taskId === task.taskId));
          that.getTaskList();
          that.$message({
            message: that.feedbackMessage,
            type: 'success',
            duration: 1500
          });
        }).catch(() =>{
          this.$message({
            message: '取消批量删除操作',
            type: 'info',
            duration: 1500
          });
        })
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        row.status = status;
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(row) {
        let confirmMessage = '您将删除编号为\'' + row.taskId + '\' 的所有信息,是否继续?';
        let that =this;
        let feedbackMessage = '';
        this.$confirm(confirmMessage,'删除学生',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning',
          beforeClose: (action,instance,done) =>{
            if(action==='confirm'){
              instance.confirmButtonLoading = true;
              return new Promise((resolve, reject) => {
                deleteTask(row.taskId).then((response) => {
                  feedbackMessage = response.message;
                  instance.confirmButtonLoading = false;
                  this.$message({
                    message: feedbackMessage,
                    type: 'success',
                    duration: 1500
                  });
                  done();
                  resolve(response);
                }).catch(error => {
                  done();
                  this.$message({
                    message: error,
                    type: 'error',
                    duration: 1500
                  });
                })
              });
            }
            done();
          }
        }).then(() =>{
          const index = that.taskList.indexOf(row);
          that.taskList.splice(index, 1);
        }).catch(() =>{
          that.$message({
            type:'info',
            message:'取消删除'
          })
        });
      },
      create() {
        createTask(this.temp).then(response => {
          let message = response.message;
          this.$message({
            message:message,
            type:'success',
            duration:1500
          });
          this.taskList.unshift(this.temp);
          this.dialogFormVisible = false;
        });
      },
      update() {
        updateTask(this.temp).then(response =>{
          let message = response.message;
          for (const v of this.taskList) {
            if (v.taskId === this.temp.taskId) {
              const index = this.taskList.indexOf(v);
              this.taskList.splice(index, 1, this.temp);
              break;
            }
          }
          this.$message({
            type: 'success',
            message:message
          });
        });
        this.dialogFormVisible = false;
      },
      addStudent(){
        createTask(this.value2).then(response => {
          let message = response.message;
          this.$message({
            message:message,
            type:'success',
            duration:1500
          });
          this.taskList.unshift(this.value2);
          this.dialogFormVisible2 = false;
        });
      },
      resetTemp() {
        this.temp = {
          taskId: '',
          dataSetId: '',
          algorithmId: '',
          groupId:'',
          startTime:'',
          finishTime:'',
          status:{},
        };
      },
      handleAddStudent(){
        this.dialogFormVisible2 = true;
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData;
          this.dialogPvVisible = true;
        })
      },
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['任务编号', '数据集编号', '算法编号', '学生组号', '开始时间','截止时间'];
          const filterVal = ['taskId',  'collectionId', 'algorithmId', 'groupId', 'startTime', 'finishTime'];
          const data = this.formatJson(filterVal, this.list);
          export_json_to_excel(tHeader, data, '任务基本信息表');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
    }
  }
</script>

<style lang="scss">
  .filter-container {
    padding-bottom: 10px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
  .test{
    padding: 20px;
  }
  .title{
    margin-bottom: 20px;
    width:22%;
    font:bold 36px 微软雅黑;
  }
</style>
