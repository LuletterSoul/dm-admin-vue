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
                  <span class="auto-complete-option">任务状态:{{ option.status.description }}</span>
                </Option>
              </div>
              <a href="https://www.google.com/search?q=iView" target="_blank" class="demo-auto-complete-more">查看所有结果</a>
            </AutoComplete>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.timeRange.label')">
            <el-row>
              <el-col :span="11">
                <DatePicker type="datetime"
                            @on-change="setBegin"
                            :value="config.beginDate"
                            style="width: 100%"
                            format="yyyy-MM-dd HH:mm:ss"
                            :placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.beginPlaceholder')">
                </DatePicker>
              </el-col>
              <el-col :span="2" style="text-align: center">
                -
              </el-col>
              <el-col :span="11">
                <DatePicker type="datetime"
                            :value="config.endDate"
                            format="yyyy-MM-dd HH:mm:ss"
                            style="width: 100%"
                            @on-change="setEnd"
                            :placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.beginPlaceholder')">
                </DatePicker>
              </el-col>
            </el-row>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.ignore.label')">
            <i-switch v-model="config.isIgnoreArrangedTask" size="large">
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
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.students.label')">
            <Transfer
              :data="_assignedStudents"
              :target-keys="config.specifiedDividingStudents"
              :selected-keys="selectedStudentIds"
              :list-style="listStyle"
              :not-found-text="$t('p.group.divide.oneKey.taskForm.students.placeholder')"
              @on-change="handleChange"
              @on-selected-change="handleSelectedChange"
              :filter-method="filterStudents"
              filterable>
              <div :style="{float: 'right', margin: '5px'}">
                <Button type="ghost" size="small">重置</Button>
              </div>
            </Transfer>
          </FormItem>
          <FormItem :label="$t('p.group.divide.oneKey.taskForm.gradient.label')">
            <Slider v-model="config.gradient" show-input></Slider>
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
        studentQuery: {
          //默认查询一个月内不执行任何发掘任务的学生列表
          beginDate: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
        taskQuery: {
          taskName: '',
          plannedBeginDate: '',
          plannedEndDate: '',
          builtTimeBegin: '',
          builtTimeEnd: '',
          taskStatus: '1',
          page: 0,
          size: 20,
          sort: ''
        },
        assignedStudents: [],
        selectedStudentIds: [],
        previewGroups: [],
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
      this.getTasks();
      this.getStudents();
    },
    methods: {
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
          console.log(vm.previewGroups);
          //保存设置
          vm.$store.dispatch('SetSetting', vm.config);
          //保存预览分组
          vm.$store.dispatch('SetPreviewGroups', vm.previewGroups);
          //更新step,进行下一步
          vm.$store.dispatch('SetStep',1);
          vm.$router.push(
            {
              path: 'preview',
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
      handleSelectedChange(sourceSelectedStudents, targetSelectedStudents) {

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
          vm.assignedStudents = res.content;
        }).catch(error => {
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
      _assignedStudents() {
        return this.assignedStudents.map(s => {
          return {
            key: s.studentId,
            label: s.studentId + ' - ' + s.studentName + ' - ' + s.className
          };
        })
      },
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
