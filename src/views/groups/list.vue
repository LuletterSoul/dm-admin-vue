<template>
  <div class="calendar-list-container test">
    <group-modal :to-group="_updatingTargetGroup"
                 @on-closed="handleClosed"
                 @on-confirm="handleUpdateConfirm"
                 :to-show="showEditModal"
                 :to-candidates="allStudents"
                 :to-group-members="_updatingTargetGroup.groupMembers"
                 :to-task-status="taskStatusOptions">
    </group-modal>
    <el-row>
      <el-col :offset="9" :span="14">
        <el-row>
          <el-col>
            <el-row :gutter="20">
              <el-col :span="9">
                <el-autocomplete
                  size="medium"
                  style="width: 100%"
                  v-model="listQuery.groupName"
                  suffix-icon="el-icon-edit"
                  :fetch-suggestions="groupNameSearch"
                  select-when-unmatched
                  :placeholder="$t('p.group.list.filter.groupName')">
                </el-autocomplete>
              </el-col>
              <el-col :span="9">
                <el-autocomplete
                  size="medium"
                  style="width: 100%"
                  suffix-icon="el-icon-zoom-in"
                  v-model="wrappedSuggestedGroupLeader"
                  :fetch-suggestions="groupLeaderSearch"
                  @select="handleLeaderFilter"
                  select-when-unmatched
                  :placeholder="$t('p.group.list.filter.leader')">
                </el-autocomplete>
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
              <el-col :span="6">
                <el-select
                  size="medium"
                  clearable
                  v-model="listQuery.taskStatus">
                  <el-option
                    v-for="item in taskStatusOptions"
                    :value="item.value"
                    :key="item.value"
                    :label="item.description">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="14">
                <el-date-picker
                  clearable
                  size="medium"
                  style="width: 100%"
                  v-model="value7"
                  @change="handTimeFilter"
                  type="daterange"
                  unlink-panels
                  format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  :start-placeholder="$t('p.group.list.filter.beginDate')"
                  :end-placeholder="$t('p.group.list.filter.endDate')"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-col>
              <el-col :span="1">
                <Button style="margin-top: 2px" type="primary" shape="circle" icon="ios-search"
                        @click="handleFilter"></Button>
              </el-col>
              <el-col :span="1" style="margin-left: 10px">
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
      <Table border
             :loading="listLoading"
             :columns="groupColumns"
             :data="groupList"
             size='large'
             @on-selection-change="handleSelectionChange"
             stripe></Table>
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
    <el-row id="group-view" style="margin-top: 60px">
      <el-col>
        <transition
          mode="out-in"
          name="custom-classes-transition"
          enter-active-class="animated bounceIn"
          leave-active-class="animated bounceOutRight">
          <group-view
            v-if="_wrappedDetailTarget"
            :to-stages="stages"
            :task-id="_wrappedDetailTarget[0].taskId"
            :groups="_wrappedDetailTarget"
            :key="this._wrappedDetailTarget[0].groupId">
          </group-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {parseTime, deleteEmptyProperty} from 'utils';
  import {fetchStudentList} from 'api/students';
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
    getGroupNames,
    getGroupLeaders,
    getTaskStatus
  } from 'api/groups';

  import {
    getRefCollections,
    getRefStages,
    getRefGroups, fetchConfiguredAlgortithms
  } from 'api/tasks';

  import GroupView from '../components/groupView';
  import GroupModal from '../components/groupModal';

  export default {
    name: 'group-list',
    components: {GroupView, GroupModal},

    data() {
      let vm = this;
      return {
        allStudents: [],
        groupModel:{
          groupName:'',
          groupLeader:{
            studentId:'',
            studentName:'',
            className:'',
          },
          taskStatus:'',
          groupMembers:[],
        },
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
        taskStatusOptions: [],
        suggestedGroupNames: [],
        suggestedGroupLeaders: [],
        wrappedSuggestedGroupLeader: '',
        stages: [],
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
            width: 150,
            key: 'arrangementId'
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
              return h('span', {}, vm.renderTask(params.row.dataMiningTask.taskName))
            }
          },
          {
            title: '建队时间',
            align: 'center',
            key: 'builtTime'
          },
          {
            title: '组员数',
            align: 'center',
            key:'memberSize'
          },
          {
            title: '任务状态',
            align: 'center',
            render: function (h, params) {
              return h('Tag', {
                props: vm.renderTaskStatusTag(params.row.taskStatus)
              }, vm.findStatus(params.row.taskStatus));
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
                      this.handleDelete(params.row,params.index);
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
          },
        ],
        total: null,
        listLoading: false,
        listQuery: {
          groupName: "",
          beginDate: '',
          endDate: '',
          leaderStudentId: '',
          page: 0,
          size: 20,
          taskStatus: '',
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
        selectionIds: [],
        selectedGroups: [],
        groupList: [],
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
      this.getGroupList();
      this.getSuggestedGroupNames();
      this.getSuggestedGroupLeaders();
      this.getTaskStatusOptions();
      this.getAllStudents();
    },
    methods: {
      getAllStudents() {
        let vm = this;
        fetchStudentList({fetch: true}).then(res => {
          vm.allStudents = res.content;
        }).catch(error => {
        });
      },
      findStatus(value){
        for(let i = 0;i< this.taskStatusOptions.length;i++){
          if (this.taskStatusOptions[i].value === value)
            return this.taskStatusOptions[i].description;
        }
      },
      handleClosed(){
        this.showEditModal = false;
      },
      getSuggestedGroupNames() {
        let vm = this;
        getGroupNames().then(res => {
          vm.suggestedGroupNames = res.map(r => {
            return {
              value: r,
              name: r
            }
          });
        })
      },
      getSuggestedGroupLeaders() {
        let vm = this;
        getGroupLeaders().then(res => {
          vm.suggestedGroupLeaders = res.map(r => {
            return {
              value: r.studentId + ' - ' + r.studentName + ' - ' + r.className + ' - ' + r.profession,
              info: r
            }
          });
        }).catch(error => {
        });
      },
      getTaskStatusOptions() {
        let vm = this;
        getTaskStatus().then((res) => {
          vm.taskStatusOptions = res;
        }).catch(error => {
        });
      },
      groupNameSearch(queryString, cb) {
        var suggestedGroupNames = this.suggestedGroupNames;
        var results = queryString ? suggestedGroupNames.filter(this.createFilter(queryString)) : suggestedGroupNames;
        cb(results);
      },
      createFilter(queryString) {
        return (s) => {
          var reg = new RegExp(queryString.toLowerCase());
          return s.value.toLowerCase().match(reg);
        };
      },
      groupLeaderSearch(queryString, cb) {
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
        this.detailTargetIndex = null;
        this.listQuery.size = val;
        this.getGroupList();
      },
      handleCurrentChange(val) {
        if (this.listQuery.page === val - 1) {
          return
        }
        this.detailTargetIndex = null;
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
        this.getGroupList();
      },
      handleGroupLeaderFilter() {
        this.listQuery.leaderStudentId = '';
      },
      handleEdit(index) {
        this.detailTargetIndex = index;
        //this.getRefStages(this.groupList[index].dataMiningTask.taskId);
        this.getMembers(this.groupList[index].groupId, index);
        this.showEditModal = true;
      },
      handleCheck(index) {
        this.detailTargetIndex = index;
        this.getRefStages(this.groupList[index].dataMiningTask.taskId);
        this.getMembers(this.groupList[index].groupId, index);
        let el = document.getElementById("group-view");
        el.scrollIntoView();
      },
      handleDelete(group,index) {
        let vm = this;
        let wrapGroups = [];
        wrapGroups.push(group.groupId);
        this.$confirm('此操作将删除名为 ' + group.groupName + ' 的分组信息, 是否继续?', '确定删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = vm.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          deleteGroups(wrapGroups).then(() => {
            vm.$message.success('删除成功');
            vm.groupList.splice(index, 1);
            loading.close();
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
          const loading = vm.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          deleteGroups(this._selectionIds).then(() => {
            vm.$message.success('删除成功');
            loading.close();
            this.getGroupList();
          }).catch(error => {
          })
        })
      },
      handleUpdateConfirm(groupDto) {
        let vm = this;
        updateGroup(groupDto).then(res => {
          vm.groupList.splice(vm.detailTargetIndex,1, res);
          vm.$message({
            showClose: true,
            message: '更新分组信息成功',
            type: 'success'
          });
          vm.detailTargetIndex = null;
        }).catch(error => {

        });
      },
      getMembers(groupId, index) {
        let vm = this;
        let current = vm.groupList[index];
        if(current.groupMembers ===undefined) {
          getMembers(groupId).then(res => {
            vm.$set(current, 'groupMembers', res);
          }).catch(error => {
          })
        }
      },
      getRefStages(taskId){
        let vm = this;
        getRefStages(taskId).then(stages => {
          vm.stages = stages;
        }).catch(error => {
        });
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
      renderTask(taskName) {
        if (taskName === undefined || taskName === '') {
          return '无';
        }
        else {
          return taskName;
        }
      },
      renderTaskStatusTag(taskStatus) {
        let tagColor = '';
        switch (taskStatus) {
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
      _length() {
        return this.groupList.length;
      },
      _selectionIds() {
        return this.selectedGroups.map(selection => selection.groupId);
      },
      _wrappedDetailTarget() {
        if (!this._length || this.detailTargetIndex === null) {
          return null;
        }
        let wrap = [];
        wrap.push(this.groupList[this.detailTargetIndex]);
        return wrap;
      },
      _updatingTargetGroup() {
        return this._wrappedDetailTarget ? Object.assign({},this._wrappedDetailTarget[0]) : this.groupModel;
      },

    },
  }
</script>

<style lang="scss">
  .group-list-container {
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
