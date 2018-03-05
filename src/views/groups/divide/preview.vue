<template>
  <div style="margin: 30px">
    <el-row>
      <el-col>
        <Table border
               size='large'
               :row-class-name="rowClassName"
               :loading="listLoading"
               :columns="groupColumns"
               :data="_groups"
               :highlight-row="true"
               :no-data-text="$t('table.empty')"
               @on-selection-change="handleSelectionChange"
               stripe></Table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <task-detail :to-task-id="_task.taskId" :to-groups="_groups">
        </task-detail>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="21" :span="1">
        <Button type="success" style="margin-top: 10px" @click="handleSubmitDivideDirectly">完成</Button>
      </el-col>
      <el-col :span="1">
        <Button type="primary" style="margin-top: 10px" @click="handleMutual">
          手动调整
        </Button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import GroupView from '../../components/groupViewItem';
  import TaskDetail from 'src/views/tasks/detail';
  import {createGroupsByKey} from 'api/groups'

  export default {
    name: "preview",
    components: {
      TaskDetail,
      GroupView
    },
    props: {
      groupList: [],
      task: []
    },
    created() {
      this.$store.dispatch('SetStep', 2);
    },
    data() {
      return {
        showDetails: false,
        groupColumns: [
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
              return h('span', {
                style: {
                  color: '#0f79dc'
                }
              }, params.row.groupLeader.studentName)
            }
          },
          {
            title: '任务',
            align: 'center',
            render: function (h, params) {
              return h('span', {
                style: {
                  color: '#25dc72'
                }
              }, params.row.dataMiningTask.taskName)
            }
          },
          {
            title: '组员',
            align: 'center',
          },
//           {
//             title: '管理',
//             key: 'manage',
//             width: 300,
//             align: 'center',
//             render: (h, params) => {
//               return h('div', [
//                 h('Button', {
//                   props: {
//                     type: 'primary',
//                     size: 'default'
//                   },
//                   style: {
//                     marginRight: '5px'
//                   },
//                   on: {
//                     click: () => {
// //                      this.handleCheck(params.index)
//                     }
//                   }
//                 }, '查看'),
//                 h('Button', {
//                   props: {
//                     type: 'error',
//                     size: 'default'
//                   },
//                   style: {
//                     marginRight: '5px'
//                   },
//                   on: {
//                     click: () => {
//                       this.handleDelete(params.index)
//                     }
//                   }
//                 }, '删除'),
//                 h('Button', {
//                   props: {
//                     type: 'info',
//                     size: 'default'
//                   },
//                   on: {
//                     click: () => {
//                       this.handleUpdate(params.index)
//                     }
//                   }
//                 }, '修改')
//               ]);
//             }
//           }
        ],
        listLoading: false
      }
    },
    methods: {
      handleSubmitDivideDirectly() {
        let vm = this;
        createGroupsByKey(this._key).then(res => {
          vm.$store.dispatch('SetNewGroups', res)
            .then(() => {
              vm.$store.dispatch('ResetDivideInfo');
              vm.$router.push({path: '/groups/new'});
              vm.$message.success("分组成功.");
            }).catch(error => {
          });
        }).catch(error => {
        })
      },
      handleMutual() {
        this.$router.push({path: 'manual'});
      },
      handleSelectionChange() {

      },
      rowClassName(row, index) {
        // if (index === 1) {
        //   return 'demo-table-info-row';
        // } else if (index === 3) {
        //   return 'demo-table-error-row';
        // }
        return 'group-details-container';
      }
    },
    computed: {
      _groupInfos() {
        return this.$store.state.group.divide.previewGroups;
      },
      _task() {
        return this.$store.state.group.divide.previewGroups.dataMiningTask;
      },
      _groups() {
        return this.$store.state.group.divide.previewGroups.dataMiningGroups;
      },
      _key() {
        return this.$store.state.group.divide.previewGroups.queryKey;
      }
    }
  };
</script>

<style scoped>
  div {
    background-color: transparent;
  }

  .group-details-container {
    transition: all .28s ease-out;
  }
</style>
