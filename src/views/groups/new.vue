<template>
  <div style="margin: 20px">
    <div class="title">新增分组</div>
    <el-row>
      <el-col :offset="20">
        <el-button class="btn-item" type="danger"
                   plain
                   round
                   icon="el-icon-circle-close-outline"
                   @click="handleBatchDelete"
                   :disabled="!_selectionIds.length">批量删除
        </el-button>
        <el-button class="btn-item" type="warning"
                   plain
                   icon="el-icon-circle-close-outline"
                   @click="handleCancelImport"
                   :disabled="!_length">撤销
        </el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <Table
          :no-data-text="$t('table.empty')"
          size='default'
          :row-class-name="rowClassName"
          :columns="newGroupsTableColumns"
          @on-selection-change="handleSelectionChange"
          :data="_currentPageGroups">
        </Table>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;float: right">
      <el-col>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="page"
                       :page-sizes="[10,20,30, 50]"
                       :page-size="size"
                       background
                       layout="total, sizes, prev, pager, next, jumper" :total="_length">
        </el-pagination>
      </el-col>
    </el-row>
    <el-row id="group-view">
      <transition
        mode="out-in"
        name="custom-classes-transition"
        enter-active-class="animated bounceIn"
        leave-active-class="animated bounceOutRight">
        <group-view
          v-if="_length&&initDetail" :groups="_detailTarget" :key="this._detailTarget[0].groupId">
        </group-view>
      </transition>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import GroupView from '../components/groupView';
  import {getMembers, deleteGroups} from 'api/groups'

  export default {
    components: {GroupView},
    props: {
      toNewGroups: []
    },
    name: 'new-groups',
    data() {
      return {
        initDetail: false,
        detailTargetIndex: 0,
        newGroupsTableColumns: [
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
                      this.handleRemoveCollection(params.index)
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
        selectionIds: [],
        selectedGroups:[],
        listQuery: {
          studentId: "",
          studentName: "",
          className: "",
          profession: "",
          grade: "",
          sort: "studentId,ASC",
        },
        newGroups: this._newGroups,
        page: 1,
        size: 10,
      }
    },
    methods: {
      handleCancelImport() {
        let groupIds = this._newGroups.map(g => g.groupId);
        let vm = this;
        this.$confirm('此操作将撤销已完成分组操作, 是否继续?', '确定撤销', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGroups(groupIds).then(() => {
            vm.$message.success('撤销成功');
            vm.$store.dispatch('SetNewGroups',[]);
          }).catch(error => {
          })
        })
      },
      rowClassName(row, index) {
        if (index % 2 === 0) {
          return 'demo-table-info-row';
        } else {
          return 'demo-table-error-row';
        }
//        return '';
      },
      handleSizeChange(val) {
        if (this.size === val) {
          return
        }
        this.size = val;
      },
      handleCurrentChange(val) {
        if (this.page === val - 1) {
          return
        }
        this.page = val - 1;
      },
      handleSelectionChange(selections) {
        this.selectedGroups = selections;
      },
      handleCheck(index) {
        this.initDetail = true;
        this.detailTargetIndex = index;
        this.getMembers(this._currentPageGroups[index].groupId, index);
        let el = document.getElementById("group-view");
        el.scrollIntoView();
      },
      handleDelete(groupId) {

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
            this.selectedGroups.forEach( g =>{
              vm._newGroups.splice(g, 1);
            })
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
      handleEdit(groupId) {

      }
    },
    computed: {
      _length() {
        return this.$store.state.group.newGroups.length;
      },
      _newGroups() {
        let groups = this.$store.state.group.newGroups;
        if (!this._length) {
          groups = this.toNewGroups;
        }
        return groups;
      },
      _currentPageGroups() {
        if (!this._length) {
          return [];
        }
        let begin = (this.page - 1) * this.size;
        let end = this.page * this.size;
        if (end > this._length) {
          end = this._length;
        }
        return this._newGroups.slice(begin, end);
      },
      _detailTarget() {
        if (!this._length) {
          return null;
        }
        let wrap = [];
        wrap.push(this._currentPageGroups[this.detailTargetIndex]);
        return wrap;
      },
      _selectionIds() {
        return this.selectedGroups.map(selection => selection.groupId);
      }
    }
  }
</script>

<style>
  .ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
    color: #fff;
  }

  .ivu-table .demo-table-error-row td {
    background-color: #42b983;
    color: #fff;
  }

  .title {
    margin-top: 20px;
    margin-bottom: 20px;
    font: bold 36px 微软雅黑;
    text-align: center;
  }
</style>
