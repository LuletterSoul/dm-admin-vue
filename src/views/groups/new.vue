<template>
    <div style="margin: 20px">
      <div class="title">新增分组</div>
      <el-row>
        <el-col  :span="23">
          <Table
            :no-data-text="$t('table.empty')"
                  size='large'
                 :row-class-name="rowClassName"
                 :columns="newGroupsTableColumns"
                 :data="_currentPageGroups">
          </Table>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :offset="17" :span="2">
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
    </div>
</template>

<script type="text/javascript">
    export default {
        props:{
          toNewGroups:[]
        },
        name: 'new-groups',
        data() {
            return {
              newGroupsTableColumns: [
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
              ],
              listQuery: {
                studentId: "",
                studentName: "",
                className: "",
                profession: "",
                grade: "",
                sort: "studentId,ASC",
              },
              newGroups:this._newGroups,
              page: 1,
              size: 10,
            }
        },
      methods: {
        rowClassName (row, index) {
          if (index %2 === 0) {
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
      },
        computed:{
          _length() {
            return this.$store.state.group.newGroups.length;
          },
          _newGroups() {
            let groups = this.$store.state.group.newGroup;
            console.log(this._length);
            if(!this._length){
              groups = this.toNewGroups;
            }
            return groups;
          },
          _currentPageGroups() {
            if(!this._length){
              return [];
            }
            let begin = (this.page-1) * this.size;
            let end = this.page * this.size;
            if(end>this._length) {
              end =this. _length;
            }
            return this._newGroups.slice(begin, end);
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

  .title{
    margin-top: 20px;
    margin-bottom: 20px;
    font:bold 36px 微软雅黑;
    text-align: center;
  }
</style>
