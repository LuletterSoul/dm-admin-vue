<template>
  <div class="calendar-list-container test">
    <el-row>
      <el-col :offset="9" :span="14">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-date-picker
              clearable
              size="medium"
              style="width: 100%"
              v-model="builtTimeRange"
              type="daterange"
              unlink-panels
              format="yyyy 年 MM 月 dd 日 HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              :start-placeholder="$t('p.task.list.filter.builtTimeBegin')"
              :end-placeholder="$t('p.task.list.filter.builtTimeEnd')"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
          <el-col :span="12">
            <el-date-picker
              clearable
              size="medium"
              style="width: 100%"
              v-model="plannedTimeRange"
              type="daterange"
              unlink-panels
              format="yyyy 年 MM 月 dd 日 HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              :start-placeholder="$t('p.task.list.filter.plannedBeginDate')"
              :end-placeholder="$t('p.task.list.filter.plannedEndDate')"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col>
            <el-row :gutter="20">
              <el-col :span="9">
                <el-autocomplete
                  size="medium"
                  style="width: 100%"
                  v-model="listQuery.taskName"
                  suffix-icon="el-icon-edit"
                  :fetch-suggestions="taskNameSearch"
                  select-when-unmatched
                  :placeholder="$t('p.task.list.filter.taskName')">
                </el-autocomplete>
              </el-col>
              <el-col :span="9">
                <el-autocomplete
                  size="medium"
                  style="width: 100%"
                  suffix-icon="el-icon-zoom-in"
                  v-model="wrappedSuggestedGroupLeader"
                  :fetch-suggestions="taskLeaderSearch"
                  @select="handleLeaderFilter"
                  select-when-unmatched>
                </el-autocomplete>
                <!--:placeholder="$t('p.task.list.filter.leader')"-->
              </el-col>
              <el-col :span="6">
                <el-select size="medium"
                           clearable
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
              <el-col :span="9">
                <el-select
                  size="medium"
                  clearable
                  :placeholder="$t('p.task.list.filter.progressStatus')"
                  style="width: 100%"
                  v-model="listQuery.taskStatus">
                  <el-option
                    v-for="item in statusOptions"
                    :value="item.value"
                    :key="item.value"
                    :label="item.description">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span=9>
                <el-slider
                  v-model="maxAndMin"
                  range
                  show-stops
                  :format-tooltip="formatTooltip"
                  :label="'多少队以上'"
                  :max="max">
                </el-slider>
              </el-col>
              <el-col :span="1">
                <Button style="margin-top: 2px"
                        type="primary"
                        shape="circle"
                        icon="ios-search"
                        @click="handleFilter"></Button>
              </el-col>
              <el-col :span="1">
                <el-button size="medium"
                           style="margin-left: 8px"
                           type="danger"
                           plain
                           round
                           icon="el-icon-circle-close-outline"
                           @click="handleBatchDelete"
                           :disabled="!_selectionIds.length">批量删除
                </el-button>
              </el-col>
              <el-col  :offset="3" :span="1" style="margin-top: 5px">
                <i-switch v-model="showTime"></i-switch>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col>
        <Table border
               :loading="listLoading"
               :columns="_taskColumns"
               :data="taskList"
               size='default'
               @on-selection-change="handleSelectionChange"
               stripe></Table>
      </el-col>

    </el-row>
    <el-row style="float:right;margin-top: 20px">
      <el-col>
        <el-pagination @size-change="handleSizeChange"
                       background
                       size='large'
                       @current-change="handleCurrentChange"
                       :page-sizes="[10,20,30, 50]"
                       :page-size="listQuery.size"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-row id="task-view" style="margin-top: 60px">
      <el-col>
        <transition
          mode="out-in"
          name="custom-classes-transition"
          enter-active-class="animated bounceIn"
          leave-active-class="animated bounceOutRight">
          <!--<task-view-->
          <!--v-if="_wrappedDetailTarget" :tasks="_wrappedDetailTarget" :key="this._wrappedDetailTarget[0].taskId">-->
          <!--</task-view>-->
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {parseTime, deleteEmptyProperty} from 'utils';
  import {fetchStudentList} from 'api/students';
  import  GroupAvatar from '../components/groupAvatar';
  import  TaskStage from '../components/taskStage';
  import {
    fetchTaskStatusOptions,
    fetchTaskList,
    deleteTask,
    createTask,
    deleteTaskBatch,
    getByTaskId,
    updateTask,
    getRefGroups,
    getRefCollections,
    involveGroups,
    removeGroups,
    configAlgorithms,
    arrangeMiningTasks,
    deleteAllRefCollections,
    fetchConfiguredAlgortithms,
    fetchMaxAndMinGroupsNum,
    findAllTaskNames,
    deleteBatchTask
  } from 'api/tasks';
  export default {
    name: 'task-list',
    components: {GroupAvatar,TaskStage},
    data() {
      let vm = this;
      return {
        allStudents: [],
        taskModel: {
          taskName: '',
          taskLeader: {
            studentId: '',
            studentName: '',
            className: '',
          },
          progressStatus: '',
          taskMembers: [],
        },
        showTime:false,
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
        showEditModal: false,
        statusOptions: [],
        suggestedTaskNames: [],
        suggestedGroupLeaders: [],
        wrappedSuggestedGroupLeader: '',
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
            title: '任务阶段',
            align: 'center',
            width: 300,
            render:(h,params) =>{
              let vm = this;
              let stages = params.row.stages;
              if(stages ===undefined || !stages.length) {
                return [];
              }
              return h(TaskStage,{
                props:{
                  toStages:stages
                }
              });
            }
          },
          {
            title: '关联队伍',
            align: 'center',
            width: 200,
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
            render: function (h, params) {
              return h('Tag', {
                props: vm.renderTaskStatusTag(params.row.progressStatus)
              }, findStatusde(params.row.progressStatus));
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
        total: null,
        listLoading: false,
        builtTimeRange: [],
        plannedTimeRange: [],
        listQuery: {
          taskName: "",
          builtTimeBegin: '',
          builtTimeEnd: '',
          plannedBeginDate: '',
          plannedEndDate: '',
          upperBound: 666666666,
          lowBound: -1,
          page: 0,
          size: 20,
          progressStatus: '',
          sort: "builtTime,ASC",
        },
        detailTargetIndex: null,
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
        maxAndMin: [-1, 0],
        max: 10,
        selectionIds: [],
        selectedGroups: [],
        taskList: [],
        sortOptions:
          [{label: '按建立时间升序', key: 'builtTime,ASC'},
            {label: '按建立时间降序', key: 'builtTime,DESC'}],
        multipleSelection: [],
        gradeOptions: [],
        professionOptions: [],
        classNameOptions: [],
      };
    },
    created() {
      this.getTaskList();
      this.getMinAndMax();
      this.getSuggestedTaskNames();
      this.getTaskProgressStatus();
      this.getAllStudents();
    },
    watch: {
      builtTimeRange: function (val) {
        if (val) {
          this.listQuery.builtTimeBegin = val[0];
          this.listQuery.builtTimeEnd = val[1];
        }
        else {
          this.listQuery.builtTimeBegin = '';
          this.listQuery.builtTimeEnd = '';
        }
      },
      plannedTimeRange: function (val) {
        if (val) {
          this.listQuery.plannedBeginDate = val[0];
          this.listQuery.plannedEndDate = val[1];
        }
        else {
          this.listQuery.plannedBeginDate = '';
          this.listQuery.plannedEndDate = '';
        }
      },
      maxAndMin: function (val) {
        this.listQuery.lowBound = val[0];
        this.listQuery.upperBound = val[1];
      }
    },
    methods: {
      getMinAndMax() {
        let vm = this;
        fetchMaxAndMinGroupsNum().then(res => {
          vm.max = res[0];
          vm.maxAndMin = res;
        }).catch(error => {

        });
      },

      getAllStudents() {
        let vm = this;
        fetchStudentList({fetch: true}).then(res => {
          vm.allStudents = res.content;
        }).catch(error => {
        });
      },
      handleClosed() {
        this.showEditModal = false;
      },
      getSuggestedTaskNames() {
        let vm = this;
        findAllTaskNames().then(res => {
          vm.suggestedTaskNames = res.map(r => {
            return {
              value: r,
              name: r
            }
          });
        })
      },
      getTaskProgressStatus() {
        let vm = this;
        fetchTaskStatusOptions().then((res) => {
          vm.statusOptions = res;
        }).catch(error => {
        });
      },
      taskNameSearch(queryString, cb) {
        var suggestedTaskNames = this.suggestedTaskNames;
        var results = queryString ? suggestedTaskNames.filter(this.createFilter(queryString)) : suggestedTaskNames;
        cb(results);
      },
      createFilter(queryString) {
        return (s) => {
          var reg = new RegExp(queryString.toLowerCase());
          return s.value.toLowerCase().match(reg);
        };
      },
      taskLeaderSearch(queryString, cb) {
        var suggestedGroupLeaders = this.suggestedGroupLeaders;
        var results = queryString ? suggestedGroupLeaders.filter(this.createFilter(queryString)) : suggestedGroupLeaders;
        cb(results);
      },
      handleLeaderFilter(item) {
        this.listQuery.leaderStudentId = item.info.studentId;
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
        getGroupPeeks() {
        let vm = this;
        getRefGroups(this._currentTaskIds).then(res => {
          vm.taskList.forEach(t => {
            vm.$set(t, 'groupPeeks', res[t.taskId]);
          })
        }).catch(error => {

        });
      },
      getTaskList() {
        let vm = this;
        this.listLoading = true;
        fetchTaskList(Object.assign({}, this.listQuery)).then(response => {
          this.taskList = response.content;
          this.total = response.totalElements;
          this.listLoading = false;
        }).then(() =>{
          //组装分组数据准备渲染
          vm.getGroupPeeks();
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
        this.detailTargetIndex = null;
        this.listQuery.size = val;
        this.getTaskList();
      },
      handleCurrentChange(val) {
        if (this.listQuery.page === val - 1) {
          return
        }
        this.detailTargetIndex = null;
        this.listQuery.page = val - 1;
        this.getTaskList();
      },
      handleSelectionChange(selections) {
        this.selectedGroups = selections;
      },
      handTimeFilter(val) {
        this.listQuery.beginDate = val[0];
        this.listQuery.endDate = val[1];
      },
      handleFilter() {
        this.getTaskList();
      },
      handleGroupLeaderFilter() {
        this.listQuery.leaderStudentId = '';
      },
      handleEdit(index) {
        this.detailTargetIndex = index;
        this.getMembers(this.taskList[index].taskId, index);
        this.showEditModal = true;
      },
      handleCheck(index) {
        let vm = this;
        this.detailTargetIndex = index;
        this.$router.push({
          path: '/tasks/detail',
          query: {
            taskId: vm.taskList[index].taskId
          }
        });
      },
      handleDelete(task, index) {
        let vm = this;
        let wrapTasks = [];
        wrapTasks.push(task.taskId);
        this.$notify({
          title: '警告',
          message: '删除任务操作会影响分组及其分组成员当前的任务状态！谨慎操作！',
          type: 'warning'
        });
        this.$confirm('此操作将删除名为 ' + task.taskName + ' 的任务信息, 是否继续?', '确定删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBatchTask(wrapTasks).then(() => {
            vm.$message.success('删除成功');
            vm.taskList.splice(index, 1);
          }).catch(error => {
          })
        }).catch(() => {
          this.$message.info('取消删除');
        });
      },
      handleBatchDelete() {
        let vm = this;
        this.$confirm('此操作将删除已完成任务信息, 是否继续?', '确定删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBatchTask(this._selectionIds).then(() => {
            vm.$message.success('删除成功');
            this.getTaskList();
          }).catch(error => {
          })
        })
      },
      handleUpdateConfirm(taskDto) {
        let vm = this;
        updateGroup(taskDto).then(res => {
          vm.taskList.splice(vm.detailTargetIndex, 1, res);
          vm.$message({
            showClose: true,
            message: '更新任务信息成功',
            type: 'success'
          });
          vm.detailTargetIndex = null;
        }).catch(error => {

        });
      },
      getMembers(taskId, index) {
        let vm = this;
        let current = vm.taskList[index];
        if (current.taskMembers === undefined) {
          getMembers(taskId).then(res => {
            vm.$set(current, 'taskMembers', res);
          }).catch(error => {
          })
        }
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
      findStatus(value){
        for(let i = 0;i< this.statusOptions.length;i++){
          if (this.statusOptions[i].value === value)
            return this.statusOptions[i].description;
          }
        },
      renderTask(task) {
        if (task === undefined) {
          return '无';
        }
        else {
          return task.taskName;
        }
      },
      formatTooltip(val) {
        return '关联分组数 : ' + val;
      },
      renderTaskStatusTag(progressStatus) {
        let tagColor = '';
        switch (progressStatus) {
          case 1:
            tagColor = 'yellow';
            break;
          case 2:
            tagColor = '#EF6AFF';
            break;
          case 3:
            tagColor = 'green';
            break;
          case 4:
            tagColor = 'blue';
            break;
          case 5:
            tagColor = 'red';
            break;
          case 6:
            tagColor = '#25dc72';
            break;
          default:
            tagColor = 'blue';
            break;
        }
        return {
          type: 'dot',
          color: tagColor
        };
      }
    },
    computed: {
      fixPage() {
        return this.listQuery.page + 1;
      },
      _currentTaskIds() {
        return this.taskList.map(t => t.taskId);
      },
      _length() {
        return this.taskList.length;
      },
      _selectionIds() {
        return this.selectedGroups.map(selection => selection.taskId);
      },
      _wrappedDetailTarget() {
        if (!this._length || this.detailTargetIndex === null) {
          return null;
        }
        let wrap = [];
        wrap.push(this.taskList[this.detailTargetIndex]);
        return wrap;
      },
      _updatingTargetGroup() {
        return this._wrappedDetailTarget ? Object.assign({}, this._wrappedDetailTarget[0]) : this.taskModel;
      },
      _taskColumns(){
        let vm = this;
        let taskColumns = [];
        taskColumns.push({
          type: 'selection',
          width: 60,
          align: 'center'
        });
        taskColumns.push({
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        });
        taskColumns.push({
          title: '任务名称',
          align: 'center',
          key: 'taskName'
        });
        taskColumns.push({
          title: '任务编号',
          align: 'center',
          width: 100,
          key: 'arrangementId'
        });
        if(this.showTime){
          taskColumns.push({
            title: '建立时间',
            align: 'center',
            fixed: 'right',
            width:150,
            key: 'builtTime'
          });
          taskColumns.push({
            title: '计划开始时间',
            align: 'center',
            fixed: 'right',
            width:150,
            key: 'plannedStartTime'
          });
          taskColumns.push({
            title: '计划结束时间',
            align: 'center',
            fixed: 'right',
            width:150,
            key: 'plannedFinishTime'
          });
        }
        taskColumns.push({
          title: '任务里程碑',
          align: 'center',
          width: 300,
          render: (h, params) => {
            let vm = this;
            let stages = params.row.stages;
            if (stages === undefined || !stages.length) {
              return [];
            }
            return h(TaskStage, {
              props: {
                toStages: stages
              }
            });
          }
        });
        taskColumns.push({
          title: '关联队伍',
          align: 'center',
          width: 200,
          render: (h, params) => {
            let hArray = [];
            let groupPeeks = params.row.groupPeeks;
            //防止因为分组的异步数据未获取到而导致的undefine问题
            if (groupPeeks === undefined) {
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
        });
        taskColumns.push({
          title: '任务状态',
          align: 'center',
          width:200,
          render: function (h, params) {
            return h('Tag', {
              props: vm.renderTaskStatusTag(params.row.progressStatus)
            }, vm.findStatus(params.row.progressStatus));
          }
        });
        taskColumns.push({
          title: '操作',
          align: 'center',
          width:200,
          render: (h, params) => {
            return h('ButtonGroup', [
              h('Button', {
                props: {
                  icon: 'ios-search',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.handleCheck(params.index)
                  }
                }
              }),
              h('Button', {
                props: {
                  icon: 'android-delete',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.handleDelete(params.row, params.index);
                  }
                }
              }),
              h('Button', {
                props: {
                  icon: 'edit',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.handleEdit(params.index)
                  }
                }
              })
            ]);
          }
        });
        return taskColumns;
      }
    },
  }
</script>

<style lang="scss">
  .task-list-container {
    margin-top: 90px;
  }
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
