<template>
  <div class="calendar-list-container test">
    <el-row>
      <el-col :offset="10" :span="14">
        <el-row>
          <el-col>
            <el-row :gutter="20">
              <el-col :span="6">
                  <el-autocomplete
                    size="medium"
                    v-model="listQuery.groupName"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入队名"
                  ></el-autocomplete>
              </el-col>
              <el-col  :span="6">
                <el-select size="medium"
                           clearable
                           class="btn-item" v-model="listQuery.grade"
                           placeholder="年级">
                  <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select size="medium"
                           clearable class="btn-item"
                           v-model="listQuery.className"
                           placeholder="班级">
                  <el-option v-for="item in  classNameOptions" :key="item.key" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select size="medium"
                           v-model="listQuery.sort"
                           placeholder="排序">
                  <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
                  </el-option>
                </el-select>
              </el-col>
              <el-col>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="6">
                <el-select
                  size="medium"
                  v-model="listQuery.taskStatus">
                  <el-option
                    v-for="item in hasTaskOptions"
                    :value="item.value"
                    :key="item.label"
                    :label="item.label">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="14">
                <el-date-picker
                  size="medium"
                  style="width: 100%"
                  v-model="value7"
                  @change="handTimeFilter"
                  type="daterange"
                  unlink-panels
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  :start-placeholder="$t('p.group.list.filter.beginDate')"
                  :end-placeholder="$t('p.group.list.filter.endDate')"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-col>
              <el-col :span="1">
                <Button style="margin-top: 2px" type="primary" shape="circle" icon="ios-search"></Button>
              </el-col>
              <el-col :span="1">
                <el-button size="medium"
                           class="btn-item" type="danger"
                           plain
                           round
                           icon="el-icon-circle-close-outline"
                           @click="handleBatchDelete"
                           :disabled="!_selectionIds.length">批量删除
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <Table border size='default'
             :loading="listLoading"
             :columns="groupColumns"
             :data="groupList"
             @on-selection-change="handleSelectionChange"
             stripe></Table>
    </el-row>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     background
                     size='large'
                     @current-change="handleCurrentChange"
                     :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {parseTime, deleteEmptyProperty} from 'utils';
  import {
    getGroupList,
    getLeisureStudents,
    createGroupPreview,
    getGroupPreview,
    getGroup,
    deleteGroups,
    updateGroup,
    getMembers,
    updateLeader,
    configureMembers,
    getGroupNames
  } from 'api/groups';


  export default {
    name: 'StudentTable',
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',
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
        suggestedGroupNames:[],
        groupColumns: [
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
            title: '队名',
            align: 'center',
            key: 'groupName'
          },
          {
            title: '分组编号',
            align: 'center',
            key: 'arrangementId'
          },
          {
            title: '建立时间',
            align: 'center',
            key: 'builtTime'
          },
          {
            title: '组长',
            align: 'center',
            render: function (h, params) {
              return h('span', {}, params.row.groupLeader.studentName)
            }
          },
          {
            title: '任务',
            align: 'center',
            render: function (h, params) {
              return h('span', {}, params.row.dataMiningTask.taskName)
            }
          },
          {
            title: '组员',
            align: 'center',
          },
          {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleCheck(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params.row);
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
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
          groupName: "",
          beginDate:'',
          endDate:'',
          page: 0,
          size: 10,
          taskStatus:2,
          sort: "builtTime,ASC",
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
        selectionIds: [],
        selectedGroups:[],
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
        sortOptions:
          [{label: '按建立时间升序', key: 'builtTime,ASC'},
            {label: '按建立时间降序', key: 'builtTime,DESC'}],
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
        dialogPvVisible: false,
        pvData: [],
        tableKey: 0
      };
    },
    created() {
      this.getGroupList();
      this.getSuggestedGroupNames();
    },
    methods: {
      getSuggestedGroupNames() {
        let vm =this;
        getGroupNames().then(res =>{
          vm.suggestedGroupNames = res.map(r =>{
            return {
              value:r,
              name:r
            }
          });
        })
      },
      querySearch(queryString, cb) {
        var suggestedGroupNames = this.suggestedGroupNames;
        var results = queryString ? suggestedGroupNames.filter(this.createFilter(queryString)) : suggestedGroupNames;
        cb(results);
      },
      createFilter(queryString) {
        return (suggestedGroupName) => {
          return (suggestedGroupName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
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
      handleSizeChange(val) {
        if (this.listQuery.size === val) {
          return
        }
        this.listQuery.size= val;
        this.getGroupList();
      },
      handleCurrentChange(val) {
        if (this.listQuery.page === val - 1) {
          return
        }
        this.listQuery.page = val - 1;
        this.getGroupList();
      },
      handleSelectionChange(selections) {
        this.selectedGroups = selections;
      },
      handTimeFilter(val) {
        this.listQuery.beginDate = val[0];
        this.listQuery.endDate = val[1];
      },
      handleFilter() {

      },
      handleCheck(index) {
        this.initDetail = true;
        this.detailTargetIndex = index;
        this.getMembers(this._currentPageGroups[index].groupId, index);
        let el = document.getElementById("group-view");
        el.scrollIntoView();
      },
      handleDelete(group) {
        let vm = this;
        let wrapGroups = [];
        wrapGroups.push(group.groupId);
        this.$confirm('此操作将删除名为 ' + group.groupName + ' 的分组信息, 是否继续?', '确定删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGroups(wrapGroups).then(() => {
            vm.$message.success('删除成功');
            vm.groupList.splice(group, 1);
          }).catch(error => {
          })
        }).catch(() => {
          this.$message.info('取消删除');
        });
      },
      handleBatchDelete() {
        let vm = this;
        this.$confirm('此操作将删除已完成分组信息, 是否继续?', '确定删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGroups(this._selectionIds).then(() => {
            vm.$message.success('删除成功');
            this.getGroupList();
          }).catch(error => {
          })
        })
      },
      getMembers(groupId, index) {
        let vm = this;
        getMembers(groupId).then(res => {
          vm.$set(vm._currentPageGroups[index], 'groupMembers', res);
        }).catch(error => {
        })
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
    },
    computed: {
      fixPage() {
        return this.listQuery.page + 1;
      },
      _selectionIds() {
        return this.selectedGroups.map(selection => selection.groupId);
      },
      _suggestedGroupNames() {
        this.suggestedGroupNames.map( s =>{
          return {
            value : s,
            groupName:s
          }
        })
      }
    },
  }
</script>

<style lang="scss">
  .group-list-container {
    margin-top: 90px;
  }

  ,
  .btn-import-container {
    padding-right: 20px;
    float: right;
    .btn-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
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
</style>
