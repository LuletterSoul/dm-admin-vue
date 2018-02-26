<template>
  <div class="step-wrap">
    <div class="step-container">
      <Steps  :current="1">
        <Step title="填写分组参数" content="填写分组参数:如分组梯度,分组限制,给该分组分配的任务">
            <Form :model="formItem" :label-width="80" class="task-param-form-container">
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
                    <Option v-for="option in item.content" :value="option.taskName"  :key="option.taskId">
                      <span class="demo-auto-complete-title">{{ option.taskName }} </span>
                      <span class="auto-complete-option">建立时间:{{ option.builtTime }}</span>
                      <span class="auto-complete-option">任务状态:{{ option.status.description }}</span>

                    </Option>
                  </div>
                  <a href="https://www.google.com/search?q=iView" target="_blank" class="demo-auto-complete-more">查看所有结果</a>
                </AutoComplete>
              </FormItem>
              <FormItem :label="$t('p.group.divide.oneKey.taskForm.timeRange.label')">
                <Row>
                  <Col span="11">
                  <DatePicker type="datetime"
                              @on-change="setBegin"
                              :value="config.beginDate"
                              format="yyyy-MM-dd HH:mm:ss"
                              :placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.beginPlaceholder')">
                  </DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                  <DatePicker type="datetime"
                              :value="config.endDate"
                              format="yyyy-MM-dd HH:mm:ss"
                              @on-change="setEnd"
                              :placeholder="$t('p.group.divide.oneKey.taskForm.timeRange.beginPlaceholder')">
                  </DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem :label="$t('p.group.divide.oneKey.taskForm.ignore.label')">
                <i-switch v-model="config.isIgnoreArrangedTask" size="large">
                  <span slot="open">On</span>
                  <span slot="close">Off</span>
                </i-switch>
              </FormItem>
              <FormItem :label="$t('p.group.divide.oneKey.taskForm.builder.label')">
                <Select v-model="formItem.select">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
              <FormItem :label="$t('p.group.divide.oneKey.taskForm.students.label')">
                  <Transfer
                    :data="assignedStudents"
                    :selected-keys="selectedStudents"
                    :list-style="listStyle"
                    label="studentId"
                    :filter-method="filterStudents"
                    :render-format="studentRender">
                    <div :style="{float: 'right', margin: '5px'}">
                      <Button type="ghost" size="small" @click="reloadMockData">重置</Button>
                    </div>
                  </Transfer>
              </FormItem>
              <FormItem :label="$t('p.group.divide.oneKey.taskForm.gradient.label')">
                <Slider v-model="config.gradient" show-input></Slider>
              </FormItem>
              <FormItem :label="$t('p.group.divide.oneKey.taskForm.operationCode.label')">
                <Input v-model="formItem.textarea"
                       :placeholder="$t('p.group.divide.oneKey.taskForm.operationCode.placeholder')"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" style="margin-top: 10px" long>{{ $t('p.group.divide.oneKey.taskForm.submit.complete') }}</Button>
                <Button type="error" style="margin-top: 10px" long>{{ $t('p.group.divide.oneKey.taskForm.submit.reset') }}</Button>
                <Button type="ghost" style="margin-top: 10px" long>{{ $t('p.group.divide.oneKey.taskForm.submit.cancel') }}</Button>
              </FormItem>
            </Form>
            <Alert type="success" show-icon class="one-key-tips-container">
              分组参数
              <template slot="desc">
                <p>{{ $t('p.group.divide.tips.task.header') }}</p>
                <li v-for="item in $t('p.group.divide.tips.task.content')">{{ item }}</li>
                </template>
            </Alert>

        </Step>
        <Step title="预览分组信息" content="这里是该步骤的描述信息"></Step>
        <Step title="手动调优" content="这里是该步骤的描述信息"></Step>
        <Step title="确认分组" content="这里是该步骤的描述信息"></Step>
      </Steps>
    </div>
  </div>

</template>

<script>
  import {fetchTaskList} from 'api/tasks';
  import {getLeisureStudents} from 'api/groups';
  import Moment from 'moment';
  const moment = require('moment');
export default {
  props: {

  },
  name: 'OneKeyDividing',
  data () {
    return {
      config:{
        taskId:'',
        beginDate:moment().subtract(30,'days').format('YYYY-MM-DD HH:mm:ss'),
        endDate:moment().format('YYYY-MM-DD HH:mm:ss'),
        gradient:12,
        isIgnoreArrangedTask:false,
        specifiedDividingStudents:[],
        builderId:''
      },
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
      studentQuery:{
        //默认查询一个月内不执行任何发掘任务的学生列表
        beginDate:moment().subtract(30,'days').format('YYYY-MM-DD HH:mm:ss'),
        endDate:moment().format('YYYY-MM-DD HH:mm:ss'),
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
      selectedStudents:[],
      value4: '',
      data3: this.getMockData(),
      selectedStudentInfo: this.getSelectedStudents(),
      listStyle: {
        width: '300px',
        height: '300px'
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
  created(){
    this.getTasks();
    this.getStudents();
  },
  methods: {
    handleTaskSelected(taskName){
      this.tasks.forEach(t => {
        t.content.forEach(c => {
          if (c.taskName === taskName) {
            this.config.taskId = c.taskId;
          }
        })
      });
    },
    setBegin(begin) {
      this.config.beginDate = begin;
      this.studentQuery.beginDate = begin;
      this.getStudent();
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
    getMockData () {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: 'Content ' + i,
          description: 'The desc of content  ' + i,
          disabled: Math.random() * 3 < 1
        });
      }
      return mockData;
    },
    getTasks() {
      let vm = this;
      this.getTimeRangeTask(7);
      fetchTaskList(Object.assign({}, this.taskQuery)).then(res =>{
        vm.tasks[0].content = res.content;
      });
      this.getTimeRangeTask(30);
      fetchTaskList(Object.assign({}, this.taskQuery)).then(res =>{
        vm.tasks[1].content = res.content;
      });
      this.getTimeRangeTask(90);
      fetchTaskList(Object.assign({}, this.taskQuery)).then(res =>{
        vm.tasks[2].content = res.content;
      });
    },
    getTimeRangeTask(day) {
//      const moment = require('moment');
      this.taskQuery.builtTimeBegin = moment().subtract(day,'days').format('YYYY-MM-DD HH:mm:ss');
      this.taskQuery.builtTimeEnd = moment().format('YYYY-MM-DD HH:mm:ss');
    },
    getSelectedStudents() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map(item => item.key);
    },
    filterStudents(data, query) {
      return true;
    },
    handleChange3 (newTargetKeys) {
      this.selectedStudentInfo = newTargetKeys;
    },
    studentRender (item) {
      return item.studentId + ' - ' + item.studentName + ' - '+item.className;
    },
    reloadMockData () {
      // this.data3 = this.getMockData();
      this.getStudents();
    }
  },
  computed:{

  }
}
</script>

<style>
  .task-auto-complete-item{
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
  }
  .task-auto-complete-group{
    font-size: 12px;
    padding: 4px 6px;
  }
  .task-auto-complete-group span{
    color: #666;
    font-weight: bold;
  }
  .task-auto-complete-group a{
    float: right;
  }
  .auto-complete-option {
    float: right;
    margin-right: 20px;
    color: #999;
  }

  .task-param-form-container{
    margin-top: 40px;
    width: 750px;
  }
  .step-wrap{
    position: absolute;
    /*left: 50%;*/
  }
  .one-key-tips-container{
    position: relative;
    left: 219%;
    margin-top: -142%;
    width: 500px;
    height: auto;
  }
  .step-container{
    position: relative;
    width: 1500px;
    /*height: 40px;*/
    margin-left: 100px;
    /*margin-top: -20px;*/
  }
</style>
