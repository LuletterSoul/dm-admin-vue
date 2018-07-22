<template>
  <div style="margin-left: 20px;margin-top: 20px;">
    <el-row>
      <el-col :offset="2" :span="21">
        <Alert type="success" show-icon>
          分组参数
          <template slot="desc">
            <p>{{ $t('p.group.divide.tips.task.header') }}</p>
            <li v-for="item in $t('p.group.divide.tips.task.content')">{{ item }}</li>
          </template>
        </Alert>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="1" :span="22">
        <Form ref="configForm" :model="config" :label-width="80" :rules="ruleValidate">
          <el-row>
            <el-col>
              <FormItem :label="$t('p.group.divide.oneKey.taskForm.strategy')" prop="strategyId">
                <Select v-model="config.strategyId">
                <Option v-for="strategy in strategies"
                :value="strategy.value"
                :key="strategy.value">{{ strategy.label }}</Option>
                </Select>
              </FormItem>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <transition name="fade" mode="out-in">
                <FormItem v-if="selectMode" prop="specifiedTasks" :label="$t('p.group.divide.oneKey.taskForm.task.label')">
                  <label>
                    <Select
                      v-if="selectMode"
                      multiple
                      icon="ios-search"
                      v-model="config.specifiedTasks"
                      @on-select="handleTaskSelected"
                      :placeholder="$t('p.group.divide.oneKey.taskForm.task.placeholder')">
                      <OptionGroup v-for="option in tasks" :label="option.title" :key="option.title">
                        <Option v-for="item in option.content" :value="item.taskId" :key="item.taskId">
                          <span class="demo-auto-complete-title">{{ item.taskName }} </span>
                          <span class="auto-complete-option">建立时间:{{ item.builtTime }}</span>
                        </Option>
                      </OptionGroup>
                    </Select>
                  </label>
                </FormItem>
                <FormItem v-else  prop="specifiedTasks" :label="$t('p.group.divide.oneKey.taskForm.task.label')">
                  <Transfer
                    :data="_tasks"
                    :target-keys="config.specifiedTasks"
                    :list-style="listStyle"
                    :not-found-text="$t('p.group.divide.oneKey.taskForm.task.label')"
                    @on-change="handleTaskChange"
                    :filter-method="filterStudents"
                    :titles="['全部任务', '待分配任务']">
                    <div :style="{float: 'right', margin: '5px'}">
                      <Button type="ghost" size="small">重置</Button>
                    </div>
                  </Transfer>
                </FormItem>
              </transition>
            </el-col>
            <el-col style="margin-left: 30px" :span="1">
              <el-button
                type="primary"
                size="small"
                :loading="taskFetching"
                @click="selectMode = !selectMode">
                {{ this._switchModeTip }}
              </el-button>
            </el-col>
          </el-row>
          <FormItem prop="isIgnoreArrangedTask" :label="$t('p.group.divide.oneKey.taskForm.ignore.label')">
            <i-switch v-model="config.isIgnoreArrangedTask"
                      @on-change="handleAddAll(config.isIgnoreArrangedTask)"
                      size="large">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.builder.label')">
            <el-select v-model="_userProfile.username"
                       size="small"
                       style="width: 50%"
                       disabled placeholder="请选择">
            </el-select>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.timeRange.label')">
            <el-row>
              <el-col :span="14">
                <el-date-picker
                  clearable
                  size="small"
                  style="width: 100%"
                  v-model="datePickerValue"
                  @change="handTimeFilter"
                  type="daterange"
                  unlink-panels
                  format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  :start-placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.beginPlaceholder')"
                  :end-placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.endPlaceholder')"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-col>
            </el-row>
          </FormItem>
            <el-row  v-if="!config.isIgnoreArrangedTask" :gutter="30">
              <el-col :span="4">
                <transition name="fade" mode="out-in">
                  <FormItem>
                    <Input v-model="studentQuery.studentId"
                           :placeholder="$t('p.group.divide.oneKey.taskForm.students.studentId')"
                           clearable>
                    </Input>
                  </FormItem>
                </transition>
              </el-col>
              <el-col :span="4">
                <transition name="fade" mode="out-in">
                  <Select  v-model="studentQuery.className"
                          :placeholder="$t('p.group.divide.oneKey.taskForm.students.className')" clearable>
                    <Option v-for="(item,index) in classNameOptions" :value="item" :key="index">{{ item }}</Option>
                  </Select>
                </transition>
              </el-col>
              <el-col :span="4">
                <transition name="fade" mode="out-in">
                    <Select
                      v-model="studentQuery.grade"
                      :placeholder="$t('p.group.divide.oneKey.taskForm.students.grade')" clearable>
                      <Option v-for="(item,index) in gradeOptions" :value="item" :key="index">{{ item }}</Option>
                    </Select>
                </transition>
              </el-col>
              <el-col :span="4">
                <Select
                  v-model="studentQuery.profession"
                  :placeholder="$t('p.group.divide.oneKey.taskForm.students.profession')" clearable>
                  <Option v-for="(item,index) in professionOptions" :value="item" :key="index">{{ item }}</Option>
                </Select>
              </el-col>
              <Button type="primary" shape="circle" icon="ios-search" @click="handleFilter"></Button>
            </el-row>

          <transition name="fade" mode="out-in">
            <FormItem  v-if="!config.isIgnoreArrangedTask"
                       prop="specifiedDividingStudents"
                       :label="$t('p.group.divide.oneKey.taskForm.students.label')">
              <Transfer
                :data="_assignedStudents"
                :target-keys="config.specifiedDividingStudents"
                :list-style="listStyle"
                :not-found-text="$t('p.group.divide.oneKey.taskForm.students.placeholder')"
                @on-change="handleStuChange"
                :filter-method="filterStudents"
                :titles="['符合条件的学生', '候选学生']">
                <div :style="{float: 'right', margin: '5px'}">
                  <Button type="ghost" size="small">重置</Button>
                </div>
              </Transfer>
            </FormItem>
          </transition>

          <FormItem :label="$t('p.group.divide.oneKey.taskForm.gradient.label')">
            <el-slider
              range
              :max="100"
              :min="1"
              v-model="maxAndMin"
              show-input>
            </el-slider>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.operationCode.label')">
            <Input v-model="config.buildingKey"
                   :placeholder="$t('p.group.divide.oneKey.taskForm.operationCode.placeholder')">
            </Input>
          </FormItem>
        </Form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="4" :span="16">
        <Button type="primary" @click="handleSubmitDividingConfig('configForm')" :loading="previewLoading" style="margin-top: 10px"
                long>{{
          $t('p.group.divide.oneKey.taskForm.submit.preview') }}
        </Button>
        <Button type="error" @click="handleReset('configForm')" style="margin-top: 10px" long>{{ $t('p.group.divide.oneKey.taskForm.submit.reset') }}
        </Button>
        <Button type="ghost" style="margin-top: 10px" long>{{ $t('p.group.divide.oneKey.taskForm.submit.cancel') }}
        </Button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {fetchTaskList} from 'api/tasks';
  import {getLeisureStudents, createGroupPreview} from 'api/groups';
  import {fetchOptions} from 'api/students';

  const moment = require('moment');
  export default {
    name: "setting",
    data() {
      const validateTasks = (rule, value, callback) => {
        if (!value.length) {
          callback(new Error('必须指定需要被分配的任务'));
        } else {
          callback();
        }
      };
      const validateStus = (rule, value, callback) => {
        if (!value.length) {
          callback(new Error('必须指定需要分组的学生'));
        } else {
          callback();
        }
      };
      return {
        selectMode: true,
        taskFetching: false,
        strategies:[
          {
            value:1,
            label:'简单分组策略',
          },{
            value:2,
            label:'随机分组策略',
          },{
            value:3,
            label:'严格分组策略'
          }
        ],
        config: {
          strategyId:1,
          specifiedTasks: [],
          beginDate: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
          gradient: 12,
          lowerBound: 1,
          upperBound: 12,
          isIgnoreArrangedTask: false,
          specifiedDividingStudents: [],
          builderId: this.$store.getters.currentUserId,
          buildingKey: ''
        },
        ruleValidate: {
          specifiedTasks: [
            { required:true,validator: validateTasks, trigger: 'blur' },
          ],
          specifiedDividingStudents: [
            { required: true, validator:validateStus, trigger: 'blur' }
          ]
        },
        previewLoading: false,
        tasks: [
          {
            title: '7天内',
            content: []
          },
          {
            title: '7天之前~一个月内',
            content: []
          },
          {
            title: '一个月前~三个月内',
            content: []
          }
        ],
        allTasks: undefined,
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
        datePickerValue: [],
        studentQuery: {
          studentId: "",
          studentName: "",
          className: "",
          profession: "",
          grade: "",
          page: 0,
          size: 20,
          sort: "studentId,ASC",
          //默认查询一个月内不执行任何发掘任务的学生列表
          beginDate: '',
          endDate: '',
        },
        classNameOptions: [],
        professionOptions: [],
        gradeOptions: [],
        taskQuery: {
          taskName: '',
          plannedBeginDate: '',
          plannedEndDate: '',
          builtTimeBegin: '',
          builtTimeEnd: '',
          page: 0,
          size: 20,
          sort: '',
          fetch: false,
        },
        maxAndMin: [1, 12],
        assignedStudents: [],
        previewGroups: [],
        selectedKeys: this._selectedKeys,
        value4: '',
        listStyle: {
          width: '46%',
          height: '500px'
        },
        data4: [
          {
            title: '7天内',
            children: [
              {
                title: 'iView',
                count: 10000,
              },
              {
                title: 'iView UI',
                count: 10600,
              }
            ]
          },
          {
            title: '一个月内',
            children: [
              {
                title: 'iView UI 有多好',
                count: 60100,

              },
              {
                title: 'iView 是啥',
                count: 30010,

              }
            ]
          },
          {
            title: '三个月内',
            children: [
              {
                title: 'iView 是一个设计语言',
                count: 100000,

              }
            ]
          }
        ],
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      }
    },
    created() {
      this.$store.dispatch('SetStep', 1);
      this.getTasks();
      this.getAllTasks();
      this.getStudents();
      this.getOptions();
    },
    methods: {
      handleReset(name){
          this.$refs[name].resetFields();
      },
      handleAddAll(isAddAll) {
        if (isAddAll) {
          this.studentQuery.beginDate = '';
          this.studentQuery.endDate = '';
          this.config.beginDate = '';
          this.config.endDate = '';
        } else {
          this.studentQuery.beginDate = moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss')
          this.studentQuery.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
          this.config.beginDate = this.studentQuery.beginDate;
          this.config.endDate = this.studentQuery.endDate;
        }
        this.getStudents();
      },
      handleFilter() {
        this.getStudents();
      },
      handTimeFilter(val) {
        this.studentQuery.beginDate = val[0];
        this.studentQuery.endDate = val[1];
        this.getStudents();
      },
      handleSubmitDividingConfig(name) {
        let vm = this;
        this.$refs[name].validate((valid) => {
          if (!valid) {
            this.$message.error('请求参数不合法！');
          }
          else{
            vm.previewLoading = true;
            vm.config.lowerBound = this.maxAndMin[0];
            vm.config.upperBound = this.maxAndMin[1];
            createGroupPreview(Object.assign({}, vm.config)).then(res => {
              vm.previewGroups = res;
              vm.$emit('on-group-preview', vm.previewGroups);
              vm.previewLoading = false;
              //保存设置
              vm.$store.dispatch('SetSetting', vm.config);
              //保存预览分组
              vm.$store.dispatch('SetPreviewGroups', vm.previewGroups).then(() => {
                vm.$message({
                  message: '创建预览分组成功',
                  type: 'success',
                  duration: 1500
                });
                vm.$router.push(
                  {
                    path: 'preview',
                  });
              });
            }).catch(error => {
              vm.previewLoading = false;
            })
          }
        });
      },
      handleTaskSelected(taskName) {
        this.tasks.forEach(t => {
          t.content.forEach(c => {
            if (c.taskName === taskName) {
              this.config.taskId = c.taskId;
            }
          })
        });
      },
      handleStuChange(newTargetStudentIds) {
        this.config.specifiedDividingStudents = newTargetStudentIds;
      },
      handleTaskChange(newTargetTaskIds) {
        this.config.specifiedTasks = newTargetTaskIds;
      },
      getStudents() {
        let vm = this;
        getLeisureStudents(Object.assign({}, this.studentQuery)).then((res) => {
          vm.assignedStudents = res;
        }).catch(error => {
        });
      },
      getOptions() {
        let vm = this;
        fetchOptions().then(res => {
          vm.classNameOptions = res.classNameOptions;
          vm.professionOptions = res.professionOptions;
          vm.gradeOptions = res.gradeOptions;
        })
      },
      getAllTasks(){
        this.taskQuery.builtTimeBegin = '';
        this.taskQuery.builtTimeEnd = '';
        this.taskQuery.fetch = true;
        let vm = this;
        this.taskFetching = true;
        fetchTaskList(Object.assign({}, this.taskQuery)).then(res => {
          vm.allTasks = res.content;
          vm.taskFetching = false;
        }).catch(error =>{
          console.log(error);
        });
      },
      async getTasks() {
        let vm = this;
        this.setTimeXDay(7);
        fetchTaskList(Object.assign({}, this.taskQuery)).then(res => {
          vm.tasks[0].content = res.content;
        });
        this.setTimeRangeTask(7, 30);
        fetchTaskList(Object.assign({}, this.taskQuery)).then(res => {
          vm.tasks[1].content = res.content;
        });
        this.setTimeRangeTask(30, 90);
        fetchTaskList(Object.assign({}, this.taskQuery)).then(res => {
          vm.tasks[2].content = res.content;
        });
      },
      setTimeXDay(day) {
        this.taskQuery.builtTimeBegin = moment().subtract(day, 'days').format('YYYY-MM-DD HH:mm:ss');
        this.taskQuery.builtTimeEnd = moment().format('YYYY-MM-DD HH:mm:ss');
      },
      //before天前,after天内
      setTimeRangeTask(before, after) {
        this.taskQuery.builtTimeBegin = moment().subtract(after, 'days').format('YYYY-MM-DD HH:mm:ss');
        this.taskQuery.builtTimeEnd = moment().subtract(before, 'days').format('YYYY-MM-DD HH:mm:ss');
      },
      filterStudents(data, query) {
        return true;
      },
    },
    computed: {
      _switchModeTip(){
        return this.selectMode ? "显示全部" : "显示部分";
      },
      _tasks(){
        return this.allTasks.map(t =>{
          return {
            key: t.taskId,
            label: t.taskName + '  ' + '建立时间:' + t.builtTime
          }
        })
      },
      _assignedStudents() {
        return this.assignedStudents.map(s => {
          return {
            key: s.studentId,
            label: s.studentId + ' - ' + s.studentName + ' - ' + s.className
          };
        })
      },
      _userProfile() {
        return this.$store.getters.userProfile;
      },
      _selectedKeys() {
        return this.assignedStudents.map(s => s.studentId);
      }
    }
  }
</script>

<style scoped>
  .task-auto-complete-item {
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
  }

  .task-auto-complete-group {
    font-size: 12px;
    padding: 4px 6px;
  }

  .auto-complete-option {
    float: right;
    margin-right: 20px;
    color: #999;
  }
</style>
