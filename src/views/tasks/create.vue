<template>
  <div class="page">

    <div class="title">
      <i class="el-icon-upload2"></i>新建任务
    </div>

    <div>
      <div class="form1">
        <el-form ref="form" :label-position="labelPosition" :model="temp" >
        <el-form-item label="任务名称">
          <el-input style="width: 200px;" v-model="temp.taskName">
          </el-input>
        </el-form-item>

          <el-form-item label="任务描述">
            <el-row>
              <el-col :span="20">
              <el-input style="width: 200px;" v-model="temp.taskDescription"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

        <el-form-item
          v-for="(domain, index) in domains"
          :key="domain.key"
          :label="'选择数据集' + index">
          <el-cascader
            :options="dataSetOptions"
            v-model="domain.selections"
            @change="">
          </el-cascader>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
          <el-button @click="addDomain" class="add">关联数据集</el-button>


        <el-form-item label="算法配置">
          <el-select style="width: 450px;" v-model="temp.algorithmIds" multiple placeholder="请选择">
            <el-option
              v-for="item in algorithms"
              :key="item.algorithmId"
              :label="item.algorithmName"
              :value="item.algorithmId">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="开始时间">
           <el-date-picker type="date" placeholder="选择日期" v-model="temp.startTime">
           </el-date-picker>
        </el-form-item>

        <el-form-item label="截止时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="temp.finishTime">
          </el-date-picker>
        </el-form-item>


        <el-form-item class="button">
          <el-button type="primary" @click="create">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { fetchTaskList,
    deleteTask ,
    createTask,
    updateTask,
    deleteTaskBatch} from 'api/tasks';

  import {
    fetchAlgorithms
  } from  'api/algorithms'

  import {
    fetchCollectionList,
    fetchOptions
  } from 'api/datasets';
  export default {
    name: 'app',
    created(){
      this.getTaskList();
      this.getCollectionList();
      this.fetchOptionals();
      this.getAlgorithms();
    },
    data () {
      return {
        labelPosition: 'top',
        taskList:[],
        algorithms:[],
        collectionList:[],
        selectedOptions: [],
        associatedTaskOptions:[],
        dataSetCharOptions:[],
        attrCharOptions:[],
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
        temp: {
          taskName:'',
          taskDescription:'',
          startTime: '',
          finishTime: '',
//          groupIds:[],
          collectionIds:[],
          algorithmIds:[]
        },
        domains: [{
          selections:[],
          key: Date.now()
        }],
      };
    },
    methods:{
      resetTemp(){
        this.temp =  {
          taskName:'',
          taskDescription:'',
          startTime: '',
          finishTime: '',
          groupIds:[],
          collectionIds:[],
          algorithmIds:[]
        }
      },
      fetchOptionals() {
        fetchOptions().then(response =>{
          this.dataSetCharOptions = response.dataSetCharOptions;
          this.associatedTaskOptions = response.associatedTaskOptions;
          this.attrCharOptions = response.attrCharOptions;
        }).catch(error =>{
          console.error(error);
        });
      },
      getAlgorithms() {
        fetchAlgorithms().then(response => {
          this.algorithms = response;
        }).catch(error =>{
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
        }).catch(error =>{
          that.$message({
            type: 'error',
            message:error
          })
        })
      },
      getCollectionList() {
        let that =this;
        this.loading = true;
        fetchCollectionList(Object.assign({}, this.listQuery)).then(response =>{
          that.collectionList = response.content;
          that.totalElements = response.totalElements;
          that.loading = false;
        }).catch(error =>{
          console.log(error);
        })
      },
      create() {
        this.temp.collectionIds = this.computedCollectionIds;
        createTask(this.temp).then(response => {
          this.$message({
            message:'创建成功',
            type:'success',
            duration:1500
          });
          this.resetTemp();
          this.$router.push({path:'/tasks'});
        });
      },
      removeDomain(item) {
        var index = this.domains.indexOf(item)
        if (index !== -1) {
          this.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.domains.push({
          selections:[],
          key: Date.now()
        });
      },
      handleMapping(multiple,name) {
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
    computed:{
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
            children:this.attributeTypesCascade
          }, {
            value: 'associatedTasks',
            label: '相关任务',
            children:this.miningTaskTypesCascade
          }
        ]
      },
      charsCascade(){
        return this.dataSetCharOptions.map(char => {
          return {
            value: char.englishName,
            label: char.chineseName
          }
        })
      },
      //数据集分类器
      miningTaskTypesCascade(){
        return this.handleMapping(this.associatedTaskOptions, 'associatedTasks');
      },
      attributeTypesCascade(){
        return this.handleMapping(this.attrCharOptions, 'attributeChars');
      },
      characteristicsCascade(){
        return this.handleMapping(this.dataSetCharOptions, 'dataSetChars');
      },
      computedCollectionIds() {
        return this.domains.map(domain => domain.selections[2]);
      }
    }
  }
</script>

<style>
  .title{
    margin-bottom: 20px;
    width:20%;
    font:bold 36px 微软雅黑;
  }
  div{
    background-color:transparent;
    margin:0px auto;
  }
  .form1{
    width: 50%;
    height: 100%;
    padding: 30px;
  }
  .page{
    padding:20px;
  }
  .button{
    clear: both;
    margin-top: 40px;
    margin-bottom: 20px;
    width:40%;
  }
  .add{
    position:absolute;
    top:357px;
    left:862px;
  }
</style>
