<template>
  <div style="margin-left: 20px;margin-top: 20px;">
    <el-row >
      <el-col :span="6">
        <Alert show-icon>
          Tips
          <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
          <template slot="desc">
            <p>你可以用以下条件筛选得到符合分组要求的学生信息</p>
            <li>特定时间段内无发掘任务的学生</li>
            <li>特定班级,专业,年级的学生</li>
            <p>当然,您可以直接勾选心仪的学生创建分组</p>
          </template>
        </Alert>
      </el-col>
      <el-col :offset="4" :span="14">
        <el-row>
          <el-col>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input @keyup.enter.native="handleFilter"  @change='handleFilter' class="btn-item"
                          placeholder="学号" v-model="listQuery.studentId">
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-select clearable  @change='handleFilter' class="btn-item" v-model="listQuery.grade"
                           placeholder="年级">
                  <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select clearable class="btn-item" @change='handleFilter'
                           v-model="listQuery.className"
                           placeholder="班级">
                  <el-option v-for="item in  classNameOptions" :key="item.key" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select @change='handleFilter' class="btn-item" v-model="listQuery.sort"
                           placeholder="排序">
                  <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="8">
                <Select v-model="isHasTask" :placeholder="'任务状态'">
                  <Option v-for="item in hasTaskOptions" :value="item.label" :key="item.label">{{ item.label }}</Option>
                </Select>
              </el-col>
              <el-col  :span="8">
                <DatePicker type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm" style="width: 100%"></DatePicker>
              </el-col>
              <el-col :span="8">
                <DatePicker type="datetime" placeholder="结点时间" format="yyyy-MM-dd HH:mm" style="width: 100%"></DatePicker>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px" :gutter="20">
              <el-col :span="3">
                <el-button class="btn-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">筛选</el-button>
              </el-col>
              <el-col :span="3">
                <el-button   @click="handleCreate" type="primary"
                             icon="el-icon-plus">
                  添加
                </el-button>
              </el-col>
              <el-col :span="3">
                <el-button  type="primary" icon="el-icon-document" @click="handleDownload">导出</el-button>
              </el-col>
              <el-col :span="3">
                <el-button  type="primary" icon="el-icon-delete" v-waves @click="handleBatchDelete"
                            :disabled="!multipleSelection.length">批量删除
                </el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="warning" icon="el-icon-star-on" v-waves @click="markFavoriteStudent"
                           v-if="multipleSelection.length">收藏
                </el-button>
              </el-col>
              <el-col :span="3">
                <el-button class="btn-item" type="warning" icon="el-icon-star-off" :plain="true" v-waves
                           @click="unMarkFavoriteStudent" v-if="multipleSelection.length">取消收藏
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col>
        <Table border size='default'
               :loading="listLoading"
               :Columns="studentColumns"
               :data="groupList"
               @on-selection-change="handleSelectionChange"
               class="student-list-container"
               :no-data-text="$t('table.empty')"
               stripe>
        </Table>
      </el-col>
    </el-row>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="fixPage"
                     background
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getGroupList,
    createGroupPreview,
    getGroupPreview,
    getGroup,
    deleteGroups,
    updateGroup,
    getMembers,
    updateLeader,
    configureMembers
  } from 'api/groups';

  export default {
    name: "resource",
    data() {
      return {
        isHasTask: '',
        hasTaskOptions: [{
          label: '有任务',
          value: 1
        }, {
          label: '无任务',
          value: 0
        }, {
          label: '全部',
          value: 2
        }],
        studentColumns: [
          {
            type: 'selection',
            align: 'center',
            width: 60,
          },
          {
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center'
          },
          {
            title: '学号',
            align: 'center',
            key: 'studentId'
          },
          {
            title: '姓名',
            align: 'center',
            key: 'studentName'
          },
          {
            title: '年级',
            align: 'center',
            key: 'grade'
          },
          {
            title: '专业',
            align: 'center',
            key: 'profession'
          },
          {
            title: '班级',
            align: 'center',
            key: 'className',
          },
          {
            title: '管理',
            key: 'manage',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'default'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
//                      this.handleCheck(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'default'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params.index)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'default'
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
        total: null,
        listLoading: false,
        table: {
          studentName: '学生姓名',
          className: '班级',
        },
        listQuery: {
//          studentId: "",
//          studentName: "",
//          className: "",
//          profession:"",
//          grade:"",
          page: 0,
          size: 10,
          sort: "groupId,ASC",
        },
        temp: {
          studentId: '',
          studentName: '',
          grade: '',
          className: '',
          profession: '',
          status: {
            statusId: 3,
            chineseValue: '空闲',
            englishValue: 'available',
          },
          favorite: {
            favoriteId: 0,
            chineseValue: '已收藏',
            englishValue: 'favorite'
          },
          finishedTaskCount: 0
        },
        groupList: [],
        queryTypeOptions: [
          '姓名',
          '学号'
        ],
        statusOptions: [{
          statusId: 0,
          chineseValue: '任务进行中',
          englishValue: 'executing',
        }, {
          statusId: 1,
          chineseValue: '锁定',
          englishValue: 'unavailable',
        }, {
          statusId: 2,
          chineseValue: '任务完成',
          englishValue: 'finished',
        }, {
          statusId: 3,
          chineseValue: '空闲',
          englishValue: 'available',
        }],
        sortOptions: [{label: '按学号升序', key: 'studentId,ASC'}, {label: '按学号降序', key: 'studentId,DESC'}],
        multipleSelection: [],
        isDisplayFavoriteColumn: false,
        gradeOptions: [
          '2012级',
          '2013级',
          '2014级',
          '2015级',
          '2016级',
          '2017级',
        ],
        professionOptions: [
          '软件工程',
          '计算机科学与技术',
          '人工智能',
          '网络工程'
        ],
        classNameOptions: [
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
      this.$store.dispatch('SetStep');
      this.getGroupList();
    },
    computed: {
      fixPage() {
        return this.listQuery.page + 1;
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleRowClicked(row, event, column) {
        let lable = column.label;
        if (lable === '操作' || lable === '算法配置') {
          return;
        }
        this.$refs.studentTable.toggleRowSelection(row);
        this.isDisplayFavoriteColumn = !this.isDisplayFavoriteColumn;
      },
      getGroupList() {
        let that = this;
        this.listLoading = true;
        getGroupList(Object.assign({}, this.listQuery)).then(response => {
          this.groupList = response.content;
          this.total = response.totalElements;
          this.listLoading = false;
        }).catch(error => {
          that.$message({
            type: 'error',
            message: error
          })
        })
      },
      handleImport() {

      },
      handleFilter() {
        this.getGroupList();
      },
      handleSizeChange(val) {
        if (this.listQuery.size === val) {
          return
        }
        this.listQuery.size = val;
        this.getGroupList();
      },
      handleCurrentChange(val) {
        if (this.listQuery.page === val - 1) {
          return
        }
        this.listQuery.page = val - 1;
        this.getGroupList();
      },
      handleBatchDelete() {
        let confirmMessage = '您将删除所有被选择学生的信息,是否继续?';
        let studentIds = this.multipleSelection.map(item => item.studentId);
        let that = this;
        this.$confirm(confirmMessage, '批量删除学生', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              //显示加载按钮
              instance.confirmButtonLoading = true;
              return new Promise((resolve, reject) => {
                //通过API发送批量删除请求
                deleteStudentBatch(studentIds).then(response => {
                  instance.confirmButtonLoading = false;
                  resolve(response);
                  done();
                }).catch(error => {
                  //捕获错误;
                  instance.confirmButtonLoading = false;
                  reject(error);
                  done();
                })
              })
            }
            //关闭确认框
            done();
          }
        }).then((message) => {
          //删除被选中的行
          that.groupList = that.groupList.filter(student =>
            !that.multipleSelection.some(row => row.studentId === student.studentId));
//          that.getGroupList();
          that.$message({
            message: '批量删除成功',
            type: 'success',
            duration: 1500
          });
          that.getGroupList();
        }).catch(() => {
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
        markStudent(studentIds).then(response => {
          favoriteStudents.forEach(student => {
            student.favorite = {key: '已收藏', value: true};
          });
          that.$message({
            type: 'success',
            message: '收藏成功'
          })
        })
      },
      unMarkFavoriteStudent() {
        let favoriteStudents = this.multipleSelection.filter(row => row.favorite.value);
        let studentIds = favoriteStudents.map(student => student.studentId);
        let that = this;
        markStudent(studentIds).then(response => {
          favoriteStudents.forEach(student => {
            student.favorite = {key: '未收藏', value: false};
          });
          that.$message({
            type: 'success',
            message: '已取消收藏'
          })
        })
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
//      handleDelete(row) {
//        let confirmMessage = '您将删除学号为\'' + row.studentId + '\' '
//          + row.studentName + ' 的所有信息,是否继续?';
//        let that =this;
//        let feedbackMessage = '';
//        this.$confirm(confirmMessage,'删除学生',{
//          confirmButtonText:'确定',
//          cancelButtonText:'取消',
//          type:'warning',
//          beforeClose: (action,instance,done) =>{
//            if(action==='confirm'){
//              instance.confirmButtonLoading = true;
//              return new Promise((resolve, reject) => {
//                let studentIds = [];
//                studentIds.push(row.studentId);
//                deleteStudentBatch(studentIds).then((response) => {
//                  instance.confirmButtonLoading = false;
//                  this.$message({
//                    message: '删除成功',
//                    type: 'success',
//                    duration: 1500
//                  });
//                  done();
//                  resolve(response);
//                }).catch(error => {
//                  instance.confirmButtonLoading = false;
//                  done();
//                  this.$message({
//                    message: error,
//                    type: 'error',
//                    duration: 1500
//                  });
//                })
//              });
//            }
//            done();
//          }
//        }).then(() =>{
//          const index = that.groupList.indexOf(row);
//          that.groupList.splice(index, 1);
//        }).catch(() =>{
//          that.$message({
//            type:'info',
//            message:'取消删除'
//          })
//        });
//      },
      handleDelete(index) {
        let row = this.groupList[index];
        let confirmMessage = '您将删除学号为\'' + row.studentId + '\' '
          + row.studentName + ' 的所有信息,是否继续?';
        let that = this;
        let feedbackMessage = '';
        this.$confirm(confirmMessage, '删除学生', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              return new Promise((resolve, reject) => {
                let studentIds = [];
                studentIds.push(row.studentId);
                deleteStudentBatch(studentIds).then((response) => {
                  instance.confirmButtonLoading = false;
                  this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1500
                  });
                  done();
                  resolve(response);
                }).catch(error => {
                  instance.confirmButtonLoading = false;
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
        }).then(() => {
          that.groupList.splice(index, 1);
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '取消删除'
          })
        });
      },
      create() {
        createStudent(this.temp).then(response => {
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 1500
          });
//          this.groupList.unshift(this.temp);
          this.dialogFormVisible = false;
        });
      },
      update() {
        updateStudent(this.temp).then(response => {
          for (const v of this.groupList) {
            if (v.studentId === this.temp.studentId) {
              const index = this.groupList.indexOf(v);
//              this.groupList.splice(index, 1, this.temp);
              break;
            }
          }
          this.$message({
            type: 'success',
            message: '更新成功'
          });
        });
        this.dialogFormVisible = false;
      },
      resetTemp() {
        this.temp = {
          studentId: '',
          studentName: '',
          grade: '',
          className: '',
          profession: '',
          status: {
            statusId: 3,
            chineseValue: '空闲',
            englishValue: 'available',
          },
          favorite: {
            favoriteId: 0,
            chineseValue: '已收藏',
            englishValue: 'favorite'
          },
          finishedTaskCount: 0
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
          const {export_json_to_excel} = require('vendor/Export2Excel');
          const tHeader = ['学号', '姓名', '年级', '专业', '班级', '参与任务数'];
          const filterVal = ['studentId', 'studentName', 'grade', 'profession', 'className', 'finishedTaskCount'];
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

<style scoped>

</style>
