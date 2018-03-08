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
        <Form :model="formItem" :label-width="80">
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.task.label')">
            <AutoComplete
              icon="ios-search"
              @on-select="handleTaskSelected"
              :placeholder="$t('p.group.divide.oneKey.taskForm.task.placeholder')">
              <div class="task-auto-complete-item" v-for="item in tasks">
                <div class="task-auto-complete-group">
                  <span>{{ item.title }}</span>
                  <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
                </div>
                <Option v-for="option in item.content" :value="option.taskName" :key="option.taskId">
                  <span class="demo-auto-complete-title">{{ option.taskName }} </span>
                  <span class="auto-complete-option">建立时间:{{ option.builtTime }}</span>
                </Option>
              </div>
              <a href="https://www.google.com/search?q=iView" target="_blank" class="demo-auto-complete-more">查看所有结果</a>
            </AutoComplete>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.ignore.label')">
            <i-switch v-model="config.isIgnoreArrangedTask"
                      @on-change="handleAddAll"
                      size="large">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.builder.label')">
            <Select>
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.timeRange.label')">
            <el-row>
              <!--<el-col :span="11">-->
                <!--<DatePicker type="datetime"-->
                            <!--@on-change="setBegin"-->
                            <!--:value="config.beginDate"-->
                            <!--style="width: 100%"-->
                            <!--format="yyyy-MM-dd HH:mm:ss"-->
                            <!--:placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.beginPlaceholder')">-->
                <!--</DatePicker>-->
              <!--</el-col>-->
              <!--<el-col :span="2" style="text-align: center">-->
                <!-- - -->
              <!--</el-col>-->
              <!--<el-col :span="11">-->
                <!--<DatePicker type="datetime"-->
                            <!--:value="config.endDate"-->
                            <!--format="yyyy-MM-dd HH:mm:ss"-->
                            <!--style="width: 100%"-->
                            <!--@on-change="setEnd"-->
                            <!--:placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.beginPlaceholder')">-->
                <!--</DatePicker>-->
              <!--</el-col>-->
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
          <el-row :gutter="30">
            <el-col :span="4">
              <FormItem>
                <Input v-model="studentQuery.studentId"
                       :placeholder="$t('p.group.divide.oneKey.taskForm.students.studentId')"
                       clearable>
                </Input>
              </FormItem>
            </el-col>
            <el-col :span="4">
              <Select v-model="studentQuery.className"
                      :placeholder="$t('p.group.divide.oneKey.taskForm.students.className')" clearable>
                <Option v-for="(item,index) in classNameOptions" :value="item" :key="index">{{ item }}</Option>
              </Select>
            </el-col>
            <el-col :span="4">
              <Select
                v-model="studentQuery.grade"
                :placeholder="$t('p.group.divide.oneKey.taskForm.students.grade')" clearable>
                <Option v-for="(item,index) in gradeOptions" :value="item" :key="index">{{ item }}</Option>
              </Select>
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
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.students.label')">
            <Transfer
              :data="_assignedStudents"
              :target-keys="config.specifiedDividingStudents"
              :list-style="listStyle"
              :not-found-text="$t('p.group.divide.oneKey.taskForm.students.placeholder')"
              @on-change="handleChange"
              :filter-method="filterStudents"
              :titles="['符合条件的学生', '候选学生']">
              <div :style="{float: 'right', margin: '5px'}">
                <Button type="ghost" size="small">重置</Button>
              </div>
            </Transfer>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.gradient.label')">
            <el-slider
              v-model="config.gradient"
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
        <Button type="primary" @click="handleSubmitDividingConfig" :loading="previewLoading" style="margin-top: 10px"
                long>{{
          $t('p.group.divide.oneKey.taskForm.submit.preview') }}
        </Button>
        <Button type="error" style="margin-top: 10px" long>{{ $t('p.group.divide.oneKey.taskForm.submit.reset') }}
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
      return {
        config: {
          taskId: '',
          beginDate: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
          gradient: 12,
          isIgnoreArrangedTask: false,
          specifiedDividingStudents: [],
          targetStudentIds: [],
          builderId: '',
          buildingKey: ''
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
        datePickerValue:[],
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
          beginDate:'',
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
          sort: ''
        },
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
      };
    },
    created() {
      this.$store.dispatch('SetStep', 1);
      this.getTasks();
      this.getStudents();
      this.getOptions();
    },
    methods: {
      resetStudentQuery() {
        this.studentQuery = {
          studentId: "",
          studentName: "",
          className: "",
          profession: "",
          grade: "",
          page: 0,
          size: 20,
          sort: "studentId,ASC",
          //默认查询一个月内不执行任何发掘任务的学生列表
          beginDate: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        this.getStudents();
      },
      resetDefaultQuery() {
        this.studentQuery = {
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
        };
        this.getStudents();
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
      handleSubmitDividingConfig() {
        let vm = this;
        vm.previewLoading = true;
        createGroupPreview(Object.assign({}, vm.config)).then(res => {
          vm.previewGroups = res;
          vm.$emit('on-group-preview', vm.previewGroups);
          vm.previewLoading = false;
          vm.$message({
            message: '创建预览分组成功',
            type: 'success',
            duration: 1500
          });
          //保存设置
          vm.$store.dispatch('SetSetting', vm.config);
          //保存预览分组
          vm.$store.dispatch('SetPreviewGroups', vm.previewGroups).then(() => {
            vm.$router.push(
              {
                path: 'preview',
              });
          });
        }).catch(error => {
          vm.previewLoading = false;
        })
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
      handleChange(newTargetStudentIds) {
        this.config.specifiedDividingStudents = newTargetStudentIds;
      },
      setBegin(begin) {
        this.config.beginDate = begin;
        this.studentQuery.beginDate = begin;
        this.getStudents();
      },
      setEnd(end) {
        this.config.endDate = end;
        this.studentQuery.endDate = end;
        this.getStudents();
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
      _assignedStudents() {
        return this.assignedStudents.map(s => {
          return {
            key: s.studentId,
            label: s.studentId + ' - ' + s.studentName + ' - ' + s.className
          };
        })
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
