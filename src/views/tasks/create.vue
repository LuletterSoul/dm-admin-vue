<template>
  <div>
    <div class="title">
      <i class="el-icon-upload2"></i>新建任务
    </div>
    <el-row :gutter="20" style="margin: 20px;">
      <el-col :offset="2" :span="22">
        <el-form ref="newTask"
                 size="medium"
                 label-width="80px"
                 :label-position="'left'"
                 :model="newTask">
          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="任务名称"
                            :rules="{
                required: true, message: '任务应该指定任务名称', trigger: 'blur'}"
                            prop="taskName">
                <el-input
                  placeholder="输入任务名称"
                  size="medium"
                  style="width: 100%"
                  v-model="newTask.taskName">
                </el-input>

              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="任务描述">
                <el-input
                  :rows="4"
                  style="width:100%;"
                  type="textarea"
                  v-model="newTask.taskDescription"
                  placeholder="输入任务的描述,介绍任务的内容、要求、目标">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="任务编号"
                            :rules="{
      required: true, message: '必须指定任务编号', trigger: 'blur'}"
                            prop="arrangementId"
              >
                <el-input
                  placeholder="输入任务编号"
                  size="medium"
                  style="width: 100%"
                  v-model="newTask.arrangementId">
                </el-input>

              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="算法配置">
                <el-select style="width: 100%;"
                           v-model="newTask.algorithmIds"
                           multiple
                           placeholder="建议算法">
                  <el-option
                    v-for="item in algorithms"
                    :key="item.algorithmId"
                    :label="item.algorithmName"
                    :value="item.algorithmId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
              <el-col :span="20">
                <transition name="fade" mode="out-in">
                  <el-form-item
                    v-if="selectMode"
                    :rules="{
      required: true, message: '发掘任务至少要关联一个数据集', trigger: 'blur'}"
                    v-for="(domain, index) in domains"
                    :key="domain.key"
                    :label="'数据集合'"
                    prop="collectionIds">
                    <el-cascader
                      style="width: 100%"
                      clearable
                      :options="dataSetOptions"
                      v-model="domain.selections">
                    </el-cascader>
                  </el-form-item>
                  <el-form-item
                    v-else
                    :label="'数据集合'"
                    :rules="{
      required: true, message: '发掘任务至少要关联一个数据集', trigger: 'blur'}"
                  >
                    <Transfer
                      :data="_candidateCollections"
                      :target-keys="newTask.collectionIds"
                      :list-style="listStyle"
                      :not-found-text="'无数据集数据'"
                      @on-change="handleCollectionsChange"
                      :filter-method="filterCollections"
                      :titles="['库内数据集', '关联此任务的数据集']">
                    </Transfer>
                  </el-form-item>
                </transition>
              </el-col>
            <el-col :span="1">
              <el-button
                type="primary"
                size="medium"
                @click="selectMode = !selectMode">
                {{ this.switchModeTip }}
              </el-button>
            </el-col>
            <el-col :span="22">
              <el-form-item label="任务状态">
                <el-select style="width: 100%;"
                           v-model="newTask.statusValue"
                           :disabled="true"
                           placeholder="默认的任务状态">
                  <el-option
                    v-for="item in progressStatusOptions"
                    :key="item.value"
                    :label="item.description"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item
                label="计划时间"
                :required="true"
                prop="plannedTimeRange"
                :rules="{
      required: true, message: '任务的计划时间不能为空', trigger: 'blur'
    }"
              >
                <el-date-picker
                  clearable
                  size="medium"
                  style="width:100%"
                  v-model="newTask.plannedTimeRange"
                  type="daterange"
                  unlink-panels
                  format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  :start-placeholder="$t('p.task.list.filter.plannedBeginDate')"
                  :end-placeholder="$t('p.task.list.filter.plannedEndDate')"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-row>
                <el-col :span="22">
                  <transition-group name="fade" mode="out-in">
                    <el-form-item
                      v-for="(stage, index) in newTask.stages"
                      :label="'阶段 ' + (index+1)"
                      :key="stage.orderId"
                      :prop="'stages.' + index + '.comment'"
                      :rules="{
                 required: true, message: '任务阶段的描述不能为空', trigger: 'blur'}">
                      <el-row>
                        <el-col :span="22">
                          <el-input  placeholder="对这个任务阶段要达成的目标、需要提交的结果做简单描述" v-model="stage.comment"></el-input>
                        </el-col>
                        <el-col :span="1" style="margin-left: 20px">
                          <el-button v-if="newTask.stages.length > 1" @click.prevent="removeStage(stage)">删除</el-button>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </transition-group>
                </el-col>
                <el-col :offset="1" :span="1" style="margin-top: 3px">
                  <Button type="primary" shape="circle" icon="plus-round" @click.prevent="addStage"></Button>
                </el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-form-item label="分派任务">
                <Transfer
                  :data="_candidateGroups"
                  :target-keys="newTask.arrangeGroupIds"
                  :list-style="listStyle"
                  :not-found-text="'没有找到空闲的分组,您可以尝试建立新的分组'"
                  @on-change="handleGroupChange"
                  :filter-method="filterGroups"
                  :titles="['空闲的队伍', '被分配任务的队伍']">
                </Transfer>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item>
                <Button size="large"
                        type="success"
                        long
                        :loading="creating"
                        @click="submit">创建
                </Button>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item>
                <Button size="large"
                        type="error"
                        long
                        @click="reset">重置
                </Button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  import {
    createTask,
    fetchTaskStatusOptions
  } from 'api/tasks';

  import {
    fetchAlgorithms
  } from 'api/algorithms'

  import {
    fetchCollectionList,
    fetchOptions
  } from 'api/datasets';

  import {
    getGroupList
  } from 'api/groups'

  export default {
    name: 'CreateTask',
    created() {
      this.getCollectionList();
      this.fetchOptionals();
      this.getAlgorithms();
      this.getCandidateGroups();
    },
    data() {
      return {
        creating:false,
        selectMode:true,
        groups:[],
        collectionIds:[],
        plannedTimeRange: [],
        pickerOptions: {
          shortcuts: [{
            text: '一周内',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '一个月内',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '三个月内',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '半年内',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '一年内',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 360);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        labelPosition: 'top',
        taskList: [],
        algorithms: [],
        collectionList: [],
        selectedOptions: [],
        progressStatusOptions: [],
        associatedTaskOptions: [],
        dataSetCharOptions: [],
        attrCharOptions: [],
        options: [{
          value: '选项1',
          label: '01'
        }, {
          value: '选项2',
          label: '02'
        }, {
          value: '选项3',
          label: '03'
        }, {
          value: '选项4',
          label: '04'
        }, {
          value: '选项5',
          label: '05'
        }
        ],
        listStyle: {
          fontSize: 16+'px',
          width: '43%',
          height: '500px'
        },
        newTask: {
          taskName: '',
          arrangementId:null,
          taskDescription: '',
          arrangeGroupIds: [],
          collectionIds: [],
          algorithmIds: [],
          plannedTimeRange: [],
          statusValue: 7,
          stages:[
            {
              orderId:1,
              comment:''
            }
          ]
        },
        currentStageOrder:1,
        defaultStatus: 7,
        assignedStatus: {
          value: 8,
          status: "ASSIGNED",
          description: "任务被分发"
        },
        domains: [{
          selections: [],
          key: Date.now()
        }],
      };
    },
    watch: {
      _collectionIds:function (val) {
        if(val ===undefined) {
          this.newTask.collectionIds = [];
        }
        this.newTask.collectionIds = val;
      }
    },
    methods: {
      resetTemp() {
        this.newTask = {
          taskName: '',
          arrangementId:null,
          taskDescription: '',
          collectionIds: [],
          algorithmIds: [],
          plannedTimeRange: [],
          statusValue: 7,
          arrangeGroupIds: []
        }
      },
      handleGroupChange(targetKeys, direction, moveKeys){
        this.newTask.arrangeGroupIds = targetKeys;
      },
      handleCollectionsChange(targetKeys, direction, moveKeys){
        this.newTask.collectionIds = targetKeys;
      },
      filterGroups() {
        return true;
      },
      filterCollections() {
        return true;
      },
      addStage(){
        this.newTask.stages.push({
          comment: '',
          orderId: this.currentStageOrder
        });
        ++this.currentStageOrder;
      },
      removeStage(item) {
        let index = this.newTask.stages.indexOf(item);
        if (index !== -1) {
          this.newTask.stages.splice(index, 1)
        }
        --this.currentStageOrder;
      },
      fetchOptionals() {
        let vm = this;
        fetchOptions().then(response => {
          vm.dataSetCharOptions = response.dataSetCharOptions;
          vm.associatedTaskOptions = response.associatedTaskOptions;
          vm.attrCharOptions = response.attrCharOptions;
        }).catch(error => {
          console.error(error);
        });
        fetchTaskStatusOptions().then(res => {
          vm.progressStatusOptions = res;
        })
      },
      getAlgorithms() {
        fetchAlgorithms().then(response => {
          this.algorithms = response;
        }).catch(error => {
          console.log(error);
        })
      },
      getTaskList() {
        let that = this;
        this.listLoading = true;
        fetchTaskList(Object.assign({}, this.listQuery)).then(response => {
          this.taskList = response.content;
          this.totalElements = response.totalElements;
          this.listLoading = false;
        }).catch(error => {
          that.$message({
            type: 'error',
            message: error
          })
        })
      },
      getCollectionList() {
        let that = this;
        this.loading = true;
        fetchCollectionList(Object.assign({}, this.listQuery)).then(response => {
          that.collectionList = response.content;
          that.totalElements = response.totalElements;
          that.loading = false;
        }).catch(error => {
          console.log(error);
        })
      },
      submit() {
        this.$refs['newTask'].validate((valid) => {
          if (valid) {
            this.handleCreate();
          } else {
            return false;
          }
        });
      },
      reset() {

      },
      getCandidateGroups() {
        let vm = this;
        //获取全部未被分配任务的分组
        getGroupList({fetch: true,taskStatus:1}).then(res =>{
          vm.groups = res.content;
        })
      },
      handleCreate() {
        let vm = this;
        vm.creating = true;
        createTask(Object.assign({},this.newTask)).then(response => {
          vm.createting = false;
          this.$message({
            message: '创建成功',
            type: 'success',
            duration: 1500
          });
          this.resetTemp();
          this.$router.push({path: '/tasks'});
        });
      },
      handleMapping(multiple, name) {
        return multiple.map(m => {
          let option =
            this.collectionList.map(set => {
              let tasks = set[name];
              for (let i = 0; i < tasks.length; ++i) {
                if (tasks[i].englishName === m.englishName) {
                  return {
                    value: set.collectionId,
                    label: set.collectionName
                  }
                }
              }
              return null;
            }).filter(o => o !== null);
          if (option.length) {
            return {
              value: m.englishName,
              label: m.chineseName,
              children: option
            }
          }
          else {
            return {
              value: m.englishName,
              label: m.chineseName,
            }
          }
        })
      }
    },
    computed: {
      _candidateGroups() {
        return this.groups.map(g => {
          return {
            key: g.groupId,
            label: g.groupName + ' / ' + '建立时间: '+g.builtTime
          };
        })
      },
      _candidateCollections() {
        return this.collectionList.map( c=>{
          return {
            key: c.collectionId,
            label: c.collectionName
          };
        })
      },
      dataSetOptions() {
        return [
          {
            value: 'dataSetChars',
            label: '数据特征',
            children: this.characteristicsCascade
          },
          {
            value: 'attributeChars',
            label: '属性类型',
            children: this.attributeTypesCascade
          }, {
            value: 'associatedTasks',
            label: '相关任务',
            children: this.miningTaskTypesCascade
          }
        ]
      },
      charsCascade() {
        return this.dataSetCharOptions.map(char => {
          return {
            value: char.englishName,
            label: char.chineseName
          }
        })
      },
      //数据集分类器
      miningTaskTypesCascade() {
        return this.handleMapping(this.associatedTaskOptions, 'associatedTasks');
      },
      attributeTypesCascade() {
        return this.handleMapping(this.attrCharOptions, 'attributeCharacteristics');
      },
      characteristicsCascade() {
        return this.handleMapping(this.dataSetCharOptions, 'dataSetCharacteristics');
      },
      _collectionIds() {
        let ids = this.domains.map(domain => domain.selections[2]);
        let containedNull = false;
        ids.forEach(i => {
          if (i === undefined || !i) {
            containedNull = true;
          }
        });
        return containedNull ? [] : ids;

      },
      switchModeTip() {
        return this.selectMode ? '直接勾选' : '分类勾选'
      }
    }
  }
</script>

<style>
  .title {
    margin-bottom: 20px;
    font: bold 36px 微软雅黑;
  }

  div {
    background-color: transparent;
    margin: 0px auto;
  }

  .form1 {
    width: 50%;
    height: 100%;
    padding: 30px;
  }

  .page {
    padding: 20px;
  }

  .button {
    clear: both;
    margin-top: 40px;
    margin-bottom: 20px;
    width: 40%;
  }

  .add {
    position: absolute;
    top: 357px;
    left: 862px;
  }
</style>
