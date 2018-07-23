<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <el-dialog
          :show-close="false"
          :title="$t('p.group.list.update.placeholder')"
          :visible.sync="_show"
          width="70%">
          <el-row>
            <el-col :offset="1">
              <el-form ref="group"
                       size="medium"
                       label-width="80px"
                       :label-position="'left'"
                       :model="group">
                <el-row>
                  <el-col :span="22">
                    <el-form-item
                      :label="$t('p.group.modal.groupName')"
                      prop="groupName"
                      :rules="{required: true, message: '分组名称不能为空', trigger: 'blur'}">
                      <el-input
                        placeholder="输入分组名称"
                        size="medium"
                        style="width: 100%"
                        v-model="group.groupName">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item :label="$t('p.group.modal.arrangementId')"
                                  prop="arrangementId"
                                  :rules="{required: true, message: '分组编号不能为空', trigger: 'blur'}">
                      <el-input
                        placeholder="输入分组编号"
                        size="medium"
                        style="width: 100%"
                        v-model="group.arrangementId">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item :label="$t('p.group.modal.groupLeader')"
                                  prop="groupLeader.studentId"
                                  :rules="{required: true, message: '分组必须被分配一个组长', trigger: 'blur'}">
                      <el-select
                        size="medium"
                        style="width: 100%"
                        v-model="group.groupLeader.studentId"
                        placeholder="请选择">
                        <el-option
                          v-for="item in _leaderOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :disabled="item.disabled">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="22">
                    <el-form-item :label="'执行任务'">
                      <el-autocomplete
                        size="medium"
                        style="width: 100%"
                        suffix-icon="el-icon-zoom-in"
                        v-model="taskDisplay"
                        :fetch-suggestions="taskSearch"
                        @select="handleTaskSelect"
                        select-when-unmatched
                        :placeholder="$t('p.group.list.update.taskPlaceholder')">
                      </el-autocomplete>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item :label="$t('p.group.modal.taskStatus')">
                      <el-select
                        size="medium"
                        clearable
                        v-model="group.taskStatus">
                        <el-option
                          v-for="item in toTaskStatus"
                          :value="item.value"
                          :key="item.value"
                          :label="item.description">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item :label="$t('p.group.modal.groupMembers')">
                      <Transfer
                        :data="_candidates"
                        :operations="['移出分组','加入分组']"
                        :target-keys="newMemberIds"
                        :selected-keys="selectedMemberIds"
                        :list-style="listStyle"
                        :not-found-text="$t('p.group.divide.oneKey.taskForm.students.placeholder')"
                        @on-change="handleChange"
                        :filter-method="filterStudents"
                        :titles="['除当前组内的其他学生', '当前组员']">
                      </Transfer>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
         <el-button @click="handleCancel">取 消</el-button>
         <el-button type="primary" @click="submit">确 定</el-button>
           </span>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {fetchTaskList} from 'api/tasks';

  export default {
    name: "group-modal",
    props: {
      toGroup: {
        required: Object,
        default: {}
      },
      toGroupMembers: {
        required: Array,
        default: () => {
          return [];
        }
      },
      toCandidates: {
        required: Array,
        default: () => {
          return []
        }
      },
      toTaskStatus: {
        required: Array,
        default: () => {
          return [];
        }
      },
      toShow: false
    },
    data() {
      return {
        tasks: [],
        show: this.toShow,
        group: Object.assign({}, this.toGroup),
        newMemberIds: this.toGroupMembers.map(m => m.studentId),
        newGroupMembers: this.toGroupMembers,
        listStyle: {
          width: '42%',
          height: '500px'
        },
        taskDisplay: '',
        taskId: '',
        selectedMemberIds: [],
        candidates: this.toCandidates
      };
    },
    created() {
      this.getCandidateTasks();
    },
    methods: {
      buildGroupDto() {
        return {
          groupId: this.group.groupId,
          builtTime: this.group.builtTime,
          groupName: this.group.groupName,
          arrangementId: this.group.arrangementId,
          memberIds: this.newMemberIds,
          taskId: this._taskId,
          builderId: this._userId,
          leaderId: this._leader.studentId,
          taskStatus: this.group.taskStatus,
        }
      },
      submit() {
        this.$refs['group'].validate((valid) => {
          if (valid) {
            this.handleConfirm();
          } else {
            return false;
          }
        });
      },
      taskSearch(queryString, cb) {
        var tasks = this.tasks;
        var results = queryString ? tasks.filter(this.createFilter(queryString)) : tasks;
        cb(results);
      },
      createFilter(queryString) {
        return (s) => {
          var reg = new RegExp(queryString.toLowerCase());
          return s.regx.toLowerCase().match(reg);
        };
      },
      handleTaskSelect(item) {
        this.taskId = item.taskId;
      },
      buildTaskRender(task) {
        return task.arrangementId + ' / ' + task.taskName + ' / 建立时间: [ '
          + task.builtTime + ' ] / 任务计划: [ ' + task.plannedStartTime + '——' + task.plannedFinishTime + ' ]';
      },
      buildMemberRender(member) {
        if (member.studentId === this._leader.studentId) {
          return '[★组长] :' + this.buildCommonMemberRender(member);
        }
        return this.buildCommonMemberRender(member);
      },
      buildCommonMemberRender(member) {
        return member.studentId + ' / ' + member.studentName + ' / ' + member.className + ' / ' + member.grade + ' / ' + member.profession;
      },
      getCandidateTasks() {
        let vm = this;
        fetchTaskList({fetch: true}).then(res => {
          vm.tasks = res.content.map(t => {
            return {
              value: vm.buildTaskRender(t),
              taskId: t.taskId,
              regx: t.taskName + t.arrangementId
            };
          });
        }).catch(error => {
        });
      },
      handleLeaderRender(member) {
        if (member.studentId !== this._leader.studentId) {
          return member.studentId + ' - ' + member.studentName + ' - ' + member.className;
        }
        else {
          return "组长: " + member.studentId + ' - ' + member.studentName + ' - ' + member.className;
        }
      },
      handleConfirm() {
        let vm = this;
        this.$emit('on-confirm', vm.buildGroupDto());
        this.$emit('on-closed');
      },
      filterStudents(data, query) {
        return true;
      },
      handleCancel() {
        this.$emit('on-closed');
      },
      handleChange(targetKeys, direction, moveKeys) {
        let vm = this;
        vm.newMemberIds = targetKeys;
        if (direction === 'right') {
          vm.toCandidates.forEach(c => moveKeys.forEach(m => {
            if (m === c.studentId) {
              vm.newGroupMembers.push(c);
            }
          }));
        } else {
          let removing = [];
          vm.newGroupMembers.forEach(n => {
            moveKeys.forEach(m => {
              if (m === n.studentId) {
                removing.push(n);
              }
            })
          });
          removing.forEach(r => {
            let index = vm.newGroupMembers.indexOf(r);
            vm.newGroupMembers.splice(index, 1);
          });
        }
      },
    },
    watch: {
      toGroup: function (val) {
        this.group = Object.assign({}, val);
        if (this.toGroup.dataMiningTask !== undefined) {
          this.taskDisplay = this.buildTaskRender(this.toGroup.dataMiningTask);
        } else {
          this.taskDisplay = '';
        }
      },
      toGroupMembers: function (val) {
        this.newGroupMembers = val.slice();
        this.newMemberIds = val.map(m => m.studentId);
        this.candidates = this.toCandidates.slice();
      }
    },
    computed: {
      _length() {
        return this.toGroupMembers.length;
      },
      _leader() {
        if (this.group.groupLeader === undefined) {
          return {studentId: ''};
        }
        return this.group.groupLeader;
      },
      _show: {
        get() {
          return this.toShow;
        },
       set(val){
          this.show = val;
       }
      },
      _task() {
        if (this.toGroup.dataMiningTask === undefined) {
          return {taskId: ''};
        }
        return this.toGroup.dataMiningTask;
      },
      _leaderOptions() {
        let vm = this;
        return this.newGroupMembers.map(m => {
          return {
            value: m.studentId,
            label: this.buildMemberRender(m),
            disabled: m.studentId === vm._leader.studentId
          };
        })
      },
      _taskId() {
        if (this.taskId !== '') {
          return this.taskId;
        }
        return this._task.taskId;
      },
      _userId() {
        return this.$store.getters.currentUserId;
      },
      _candidates: {
        get() {
          let vm = this;
          return this.candidates.map(s => {
            return {
              key: s.studentId,
              disabled: vm._leader.studentId === s.studentId,
              label: vm.handleLeaderRender(s)
            };
          })
        }
      }
    },
  }
</script>

<style scoped>
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

  .ivu-modal {
    top: 0;
  }

  }
</style>
