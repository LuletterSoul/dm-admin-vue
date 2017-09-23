<template>
  <div class="page">

    <div class="title">
      <i class="el-icon-upload2"></i>新建任务
    </div>

    <div>
      <div class="form1">
        <el-form ref="form" :label-position="labelPosition" :model="temp" >
        <el-form-item label="任务编号">
          <el-input style="width: 200px;" v-model="temp.taskId">
          </el-input>
        </el-form-item>

        <el-form-item label="数据集编号">
          <el-checkbox-group  v-model="temp.selectionId">
            <el-checkbox-button v-for="dataSet in dataSets" :label="dataSet" :key="dataSet">{{dataSet}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="算法编号">
          <el-select style="width: 450px;" v-model="temp.algorithmId" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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
  const dataSetOptions = ['01','02','03','04','05','06','07','08','09'];
  export default {
    name: 'app',
    data () {
      return {
        labelPosition:'top',
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
        }],
        temp:{
          taskId: '',
          selectionId: [],
          algorithmId: [],
          startTime:'',
          finishTime:''
        },
        dataSets: dataSetOptions
      }
    },
    methods:{
      create() {
        createTask(this.temp).then(response => {
          let message = response.message;
          this.$message({
            message:message,
            type:'success',
            duration:1500
          });
          this.taskList.unshift(this.temp);
        });
      },
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
  .form2{
    width:450px;
    height: 100%;
    padding: 30px;
    float: left;
    font-size: 16px;
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
</style>
