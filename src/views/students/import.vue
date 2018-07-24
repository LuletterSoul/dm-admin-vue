<template>
  <div class="calendar-list-container test">
    <div class="title">
      导入学生
    </div>
    <upload-dialog :title="'学生导入'"
                   :format="'.xlsx'"
                   :message="'导入成功'"
                   :upload-req="importFuc"
                   :text="'只能上传符合模板的.xlsx文件'"
                   @onUploaded="handleImported"
                   @onFailed="uploadDialogVisible =false"
                   @onClosed="handleCanceled"
                   :to-visible="uploadDialogVisible"
    ></upload-dialog>
    <div class="btn-import-container">
      <el-button class="btn-item" type="warning"
                 plain
                 icon="el-icon-circle-close-outline"
                 @click="handleCancelImport"
                 :disabled="!_currentPageStudents.length">撤销
      </el-button>
      <el-button class="btn-item" type="primary" plain icon="el-icon-upload" @click="uploadDialogVisible =true">导入
      </el-button>
      <!--<el-dialog-->
        <!--title="导入"-->
        <!--:visible.sync="uploadDialogVisible"-->
        <!--width="30%">-->
        <!--<el-upload-->
          <!--class="upload-container"-->
          <!--drag-->
          <!--action="Deprecated"-->
          <!--ref="importExcel"-->
          <!--:accept="'.xlsx'"-->
          <!--:auto-upload="false"-->
          <!--:on-remove="handleFileRemove"-->
          <!--:before-remove="beforeFileRemove"-->
          <!--:before-upload="handleBeforeUpload"-->
          <!--:file-list="fileList"-->
          <!--multiple>-->
          <!--<i class="el-icon-upload"></i>-->
          <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
          <!--<div class="el-upload__tip" slot="tip">只能上传符合模板的.xlsx文件</div>-->
        <!--</el-upload>-->
        <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="uploadDialogVisible = false">取 消</el-button>-->
         <!--<el-button type="primary" @click="submitImport">确 定</el-button>-->
        <!--</span>-->
      <!--</el-dialog>-->
      <el-button class="btn-item" type="success" icon="el-icon-document" @click="handleDownload">下载模板</el-button>
    </div>
    <Table :loading="listLoading"
           :no-data-text="'你来到了没有数据的废墟...'"
           size='default'
           :row-class-name="rowClassName"
           :columns="studentTableColumns"
           :data="_currentPageStudents"
           class='import-table-container'></Table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     background
                     @current-change="handleCurrentChange"
                     :page-sizes="[10,20,30, 50]"
                     :page-size="size"
                     layout="total, sizes, prev, pager, next, jumper" :total="_length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import {parseTime, deleteEmptyProperty} from 'utils';
  import {downloadStudentExcelModule} from 'api/excel_modules'
  import {
    fetchStudentList,
    deleteStudent,
    createStudent,
    updateStudent,
    importFromExcel,
    deleteStudentBatch,
    markStudent,
    unMakrStudent
  } from 'api/students';

  export default {
    name: 'StudentTable',
    data() {
      return {
        studentTableColumns: [
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
          }
        ],
        fileList: [],
        total: null,
        listLoading: false,
        uploadDialogVisible: false,
        page: 1,
        size: 20,
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
        studentList: [],
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
      };
    },
    created() {
//      this.getList();
//      this.getStudentList();
    },
    computed: {
      _length() {
        return this.$store.getters.newStudents.length;
      },
      _currentPageStudents() {
        if (!this._length) {
          return [];
        }
        let begin = (this.page - 1) * this.size;
        let end = this.page * this.size;
        if (end > this._length) {
          end = this._length;
        }
        return this.$store.getters.newStudents.slice(begin, end);
      }
    },
    methods: {
      rowClassName (row, index) {
        if (index %2 === 0) {
          return 'demo-table-info-row';
        } else {
          return 'demo-table-error-row';
        }
      },
      handleImported(res){
        this.$store.dispatch('SetNewStudents',res);
        this.uploadDialogVisible = false;
      },
      handleCanceled(){
        this.uploadDialogVisible = false;
      },
      // handleFileRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      // handleFilePreview(file) {
      //   console.log(file);
      // },
      // beforeFileRemove(file, fileList) {
      //   return this.$confirm(`确定移除 ${ file.name }？`);
      // },
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
      handleCancelImport(){
        let vm = this;
        this.$confirm('此操作将撤销导入的学生信息, 是否继续?', '确定撤销', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let studentIds = vm.studentList.map(item => item.studentId);
          deleteStudentBatch(studentIds).then(response =>{
            vm.$message({
              type: 'success',
              message: '撤销成功'
            });
            vm.studentList = [];
          }).catch(error =>{
            console.log(error);
          })
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: '取消撤销'
          });
        });
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
      },
      // handleBeforeUpload(file) {
      //   let vm = this;
      //   //新建一个Form data 类型的文件
      //   let fd = new FormData();
      //   fd.append('file', file);
      //   //发起上传请求
      //   //生成一个上传进度查询key
      //   // const uuid_v1 = require('uuid/v1');
      //   // let progress_uuid = uuid_v1();
      //   this.listLoading = true;
      //   importFromExcel(fd).then((res) => {
      //     //将导入的成功的数据同步
      //     vm.studentList = res;
      //     vm.$message({
      //       type: 'success',
      //       message: '导入成功!'
      //     });
      //     vm.$store.dispatch('SetNewStudents',res);
      //     this.listLoading = false;
      //     vm.uploadDialogVisible = false;
      //   }).catch(error => {
      //     //console.log(error);
      //     vm.listLoading = false;
      //     vm.uploadDialogVisible = false;
      //   });
      // },
      submitImport() {
        this.$refs.importExcel.submit();
      },
      handleSizeChange(val) {
        if (this.size === val) {
          return
        }
        this.size = val;
      },
      handleCurrentChange(val) {
        //当以参数传入数据库时需要矫正
        //计算当前数组不需要矫正
        if (this.page === val) {
          return
        }
        this.page = val;
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
      create() {
        createStudent(this.temp).then(response => {
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 1500
          });
          this.studentList.unshift(this.temp);
          this.dialogFormVisible = false;
        });
      },
      update() {
        updateStudent(this.temp).then(response => {
          for (const v of this.studentList) {
            if (v.studentId === this.temp.studentId) {
              const index = this.studentList.indexOf(v);
              this.studentList.splice(index, 1, this.temp);
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
      handleDownload() {
        downloadStudentExcelModule().then(response => {
          const effectiveFileName = "student_module.xlsx";
          FileSaver.saveAs(response, effectiveFileName);
        }).catch((response) => {
          console.error("Could not download the Excel module from the backend.", response);
        });
      }
    }
  }
</script>

<style lang="scss">
  .upload-container {
    margin-left: 20px;
  }

  .btn-import-container {
    padding-right: 20px;
    float: right;
    .btn-item {
      display: inline-block;
      vertical-align: middle;
      margin-left: 5px;
    }
  }

  .test {
    padding: 20px;
  }

  .title {
    margin-bottom: 20px;
    width: 22%;
    font: bold 36px 微软雅黑;
  }

  div {
    background-color: transparent;
    margin: 0px auto;
  }

  .import-table-container{
    margin-top: 90px;
  }

  .ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
    color: #fff;
  }

  .ivu-table .demo-table-error-row td {
    background-color: #ff6600;
    color: #fff;
  }

  .ivu-table td.demo-table-info-column {
    background-color: #2db7f5;
    color: #fff;
  }

  .ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
  }

  .ivu-table .demo-table-info-cell-age {
    background-color: #187;
    color: #fff;
  }

  .ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
  }
</style>
