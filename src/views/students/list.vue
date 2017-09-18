<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="学号" v-model="listQuery.studentId">
      </el-input>

      <el-select clearable style="width: 100px" class="filter-item" v-model="listQuery.grade" placeholder="年级">
        <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.className" placeholder="班级">
        <el-option v-for="item in  classNameOptions" :key="item.key" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">筛选</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="plus">添加</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
      <el-button class="filter-item" type="primary" icon="delete" v-waves @click="handleBatchDelete" :disabled="!multipleSelection.length">批量删除</el-button>
      <el-button class="filter-item" type="warning" icon="star-on" v-waves @click="markFavoriteStudent" v-if="multipleSelection.length" >收藏</el-button>
      <el-button class="filter-item" type="warning" icon="star-off" :plain="true" v-waves @click="unMarkFavoriteStudent" v-if="multipleSelection.length" >取消收藏</el-button>
    </div>
    <el-table :key='tableKey' :data="studentList"
              ref="studentTable"
              v-loading.body="listLoading"
              border fit
              highlight-current-row style="width: 100%"
              @selection-change="handleSelectionChange"
              @row-click="handleRowClicked">
      <el-table-column v-if="multipleSelection.length" type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="学号" width="180px">
        <template scope="scope">
          <el-tooltip class="item" effect="light" :content="scope.row.studentId" placement="top-start">
            <span>{{scope.row.studentId}}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="姓名">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" content="信息明细" placement="top">
            <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.studentName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <!--<el-table-column min-width="300px" label="标题">-->
      <!--<template scope="scope">-->
      <!--<span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>-->
      <!--<el-tag>{{scope.row.type | typeFilter}}</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column width="110px" align="center" label="年级">
        <template scope="scope">
          <span>{{scope.row.grade}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="专业">
        <template scope="scope">
          <span>{{scope.row.profession}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="班级">
        <template scope="scope">
          <span>{{ scope.row.className }}</span>
        </template>
      </el-table-column>


      <!--<el-table-column width="110px" v-if='showAuditor' align="center" label="审核人">-->
      <!--<template scope="scope">-->
      <!--<span style='color:red;'>{{scope.row.auditor}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column width="80px" label="重要性">-->
      <!--<template scope="scope">-->
      <!--<icon-svg v-for="n in +scope.row.importance" icon-class="wujiaoxing" class="meta-item__icon" :key="n"></icon-svg>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="参与任务数" width="120px">
        <template scope="scope">
          <span>
            {{ scope.row.finishedTaskCount }}
          </span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center"  label="任务状态" width="180">
        <template scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
          <span>
              {{ scope.row.status.value }}
              </span>
        </template>
      </el-table-column>

      <el-table-column  align="center" class-name="status-col" label="标记" width="100px">
        <template scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
          <el-tag v-if="scope.row.favorite.value" type="warning">
            {{ scope.row.favorite.key }}
          </el-tag>
          <el-tag v-else>
            {{ scope.row.favorite.key }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="操作" min-width="200px">
        <template scope="scope">
          <el-button size="small" icon="edit"  type = "success" @click="handleUpdate(scope.row)">更新</el-button>
          <el-button size="small" icon="delete" type = "danger" @click="handleDelete(scope.row)">删除</el-button>
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
        <el-form-item label="学号" label-width="85px">
          <el-input v-model="temp.studentId">
          </el-input>
        </el-form-item>

        <el-form-item label="姓名" label-width="85px">
          <el-input v-model="temp.studentName">
          </el-input>
        </el-form-item>

        <el-form-item label="年级" label-width="85px">
          <el-select class="filter-item" v-model="temp.grade">
            <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专业" label-width="85px">
          <el-select class="filter-item" v-model="temp.profession">
            <el-option v-for="item in professionOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级" label-width="85px">
          <el-select class="filter-item" v-model="temp.className">
            <el-option v-for="item in classNameOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="参与任务数" label-width="85px">
          <el-input v-model="temp.finishedTaskCount" :disabled="dialogStatus!=='create'">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, fetchPv } from 'api/article_table';
  import { parseTime } from 'utils';
  import { fetchStudentList,
           deleteStudent ,
          createStudent,
          updateStudent,
          deleteStudentBatch,
          markStudent,
          unMakrStudent} from 'api/students';

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
    name: 'StudentTable',
    data() {
      return {
        total: null,
        listLoading: true,
        listQuery: {
          studentId: undefined,
          studentName: undefined,
          className: undefined,
          profession:undefined,
          grade:undefined,
          page: 1,
          limit: 20,
          sort: '+id'
        },
        temp: {
          studentId:'',
          studentName:'',
          grade:'',
          className:'',
          profession:'',
          status:{},
          favorite:{},
          finishedTaskCount:0
        },
        studentList: [],
        queryTypeOptions:[
          '姓名',
          '学号'
        ],
        sortOptions: [{label: '按学号升序', key: '+id'}, {label: '按学号降序', key: '-id'}],
        multipleSelection:[],
        isDisplayFavoriteColumn:false,
        gradeOptions:[
          '2012级',
          '2013级',
          '2014级',
          '2015级',
          '2016级',
          '2017级',
        ],
        professionOptions:[
          '软件工程',
          '计算机科学与技术',
          '人工智能',
          '网络工程'
        ],
        classNameOptions:[
          '计科一班',
          '计科二班',
          '软工一班',
          '软工二班',
          '网工一班',
          '网工二班',
          '智能实验班'
        ],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        pvData: [],
        tableKey: 0
      };
    },
    created() {
//      this.getList();
      this.getStudentList();
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleRowClicked(row,event,column) {
        let lable = column.label;
        if(lable==='操作'||lable==='姓名'){
          return;
        }
        this.$refs.studentTable.toggleRowSelection(row);
        this.isDisplayFavoriteColumn = !this.isDisplayFavoriteColumn;
      },
      getStudentList() {
        let that = this;
        this.listLoading = true;
        fetchStudentList(this.listQuery).then(response => {
          this.studentList = response.students;
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
        this.getStudentList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getStudentList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getStudentList();
      },
      handleBatchDelete() {
        let confirmMessage = '您将删除所有被选择学生的信息,是否继续?';
        let feedbackMessage = '';
        let studentIds = this.multipleSelection.map(item => item.studentId);
        let that =this;
        this.$confirm(confirmMessage,'批量删除学生',{
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          beforeClose: (action,instance,done) =>{
            if(action ==='confirm'){
              //显示加载按钮
              instance.confirmButtonLoading = true;
              return new Promise((resolve,reject) =>{
                //通过API发送批量删除请求
                deleteStudentBatch(studentIds).then(response =>{
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
//          that.studentList = that.studentList.filter(student =>
//          !that.multipleSelection.some(row => row.studentId === student.studentId));
          that.getStudentList();
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
      markFavoriteStudent() {
        let favoriteStudents = this.multipleSelection.filter(row => !row.favorite.value);
        let studentIds = favoriteStudents.map(student => student.studentId);
        let that = this;
          markStudent(studentIds).then(response =>{
            favoriteStudents.forEach(student => {
              student.favorite = {key: '已收藏', value: true};
            });
            that.$message({
              type:'success',
              message:'收藏成功'
            })
          })
      },
      unMarkFavoriteStudent() {
        let favoriteStudents = this.multipleSelection.filter(row => row.favorite.value);
        let studentIds = favoriteStudents.map(student => student.studentId);
        let that = this;
        console.log(studentIds);
        markStudent(studentIds).then(response =>{
          favoriteStudents.forEach(student => {
            student.favorite = {key: '未收藏', value: false};
          });
          that.$message({
            type:'success',
            message:'已取消收藏'
          })
        })
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
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        row.status = status;
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(row) {
        let confirmMessage = '您将删除学号为\'' + row.studentId + '\' '
          + row.studentName + ' 的所有信息,是否继续?';
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
                deleteStudent(row.studentId).then((response) => {
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
          const index = that.studentList.indexOf(row);
          that.studentList.splice(index, 1);
        }).catch(() =>{
          that.$message({
            type:'info',
            message:'取消删除'
          })
        });
      },
      create() {
        createStudent(this.temp).then(response => {
          let message = response.message;
          this.$message({
            message:message,
            type:'success',
            duration:1500
          });
          this.studentList.unshift(this.temp);
          this.dialogFormVisible = false;
        });
      },
      update() {
        updateStudent(this.temp).then(response =>{
          let message = response.message;
          for (const v of this.studentList) {
            if (v.studentId === this.temp.studentId) {
              const index = this.studentList.indexOf(v);
              this.studentList.splice(index, 1, this.temp);
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
      resetTemp() {
        this.temp = {
          studentId:'',
          studentName:'',
          grade:'',
          className:'',
          profession:'',
          status:{},
          favorite:{},
          finishedTaskCount:0
        };
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
          const tHeader = ['学号', '姓名', '年级', '专业', '班级','参与任务数'];
          const filterVal = ['studentId', 'studentName', 'grade', 'profession', 'className','finishedTaskCount'];
          const data = this.formatJson(filterVal, this.list);
          export_json_to_excel(tHeader, data, '学生基本信息表');
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
</style>
