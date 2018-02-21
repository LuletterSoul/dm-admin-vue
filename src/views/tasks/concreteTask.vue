<template>
  <div id="app">

    <div class="taskTitle">任务信息</div>

    <div class="details-container">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="团队信息" name="1">

          <div v-for="group in groups">

            <div style="float: left;width: 23%;margin-right: 10px;">
            <el-card class="taskCard">
              <p slot="header" class="clearfix" style="font-weight: bold;">
                <balloon :balloon-count="5"></balloon>
                组号
              </p>
              <p class="text">
                <balloon :balloon-count="3"></balloon>
                {{ group.groupId }}
              </p>
            </el-card>

            <el-card class="taskCard">
              <p slot="header" class="clearfix" style="font-weight: bold;">
                <balloon :balloon-count="5">
                </balloon>
                组名
              </p>
              <p class="text">
                <balloon :balloon-count="3">
                </balloon>
                {{ group.groupName }}
              </p>
            </el-card>

            <el-card class="taskCard">
              <p slot="header" class="clearfix" style="font-weight: bold;">
                <balloon :balloon-count="5">
                </balloon>
                组长
              </p>
              <p class="text">
                <balloon :balloon-count="3">
                </balloon>
                {{ group.groupLeader.studentId }}
                {{ group.groupLeader.studentName }}
              </p>
            </el-card>
            </div>

            <el-card class="memberCard">
              <div slot="header" class="clearfix" style="font-weight: bold;">
                <balloon :balloon-count="5">
                </balloon>
                组员
              </div>
              <div class="text" v-for="(item ,index) in group.groupMembers">
                <balloon :balloon-count="1">
                </balloon>
                {{ item.studentId }}
                {{ item.studentName }}
              </div>
            </el-card>
        </div>

        </el-collapse-item>


        <el-collapse-item title="使用数据集" name="2">
          <div v-for="value in collection">
                {{ value }}
          </div>
        </el-collapse-item>

        <el-collapse-item title="采用算法" name="3">
          <div>聚类算法</div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script type="text/javascript">
  import ElCol from "element-ui/packages/col/src/col";
  import Balloon from 'components/balloon';

  export default {
  name: 'app',
  components:{
    ElCol,
    Balloon
  },
      data () {
    return {
      dataSet:{
      collectionName: 'PM2.5 Data of Five Chinese Cities Data Set '
      },
      groups:[
        {
          groupId:'01',
          groupName:'软一01',
          groupLeader:{
            studentId:'915106870106',
            studentName:'嘉宝'
          },
          groupMembers:[{
              studentId:'915106870305',
              studentName:'龚秀英',
            },{
              studentId:'915106870306',
              studentName:'林明',
            },{
              studentId:'915106870307',
              studentName:'雷刚',
            },{
              studentId:'915106870308',
              studentName:'林芳丽',
            },{
            studentId:'915106870322',
            studentName:'沈超',
          },{
            studentId:'915106870344',
            studentName:'付细细',
          },{
            studentId:'915106870312',
            studentName:'刘柱子',
          },{
            studentId:'915106870350',
            studentName:'李锤子',
          },]
        },
        {
          groupId:'02',
          groupName:'软二01',
          groupLeader:{
            studentId:'915106820144',
            studentName:'姜允'
          },
          groupMembers:[{
            studentId:'915106820141',
            studentName:'姜胜',
          },{
            studentId:'915106820414',
            studentName:'宋浩',
          },{
            studentId:'915106820754',
            studentName:'李勋',
          },{
            studentId:'915106820123',
            studentName:'金宇',
          }]
        },
      ],
      activeNames: ['1','2','3'],
      title:'data set title'
    }
  }
  }
</script>

<style scoped>
  div{
    background-color:transparent;
    margin:0px auto;
    font-size:16px;
  }
  .taskTitle{
    margin-top: 20px;
    margin-bottom: 20px;
    width:20%;
    font:bold 36px 微软雅黑;
  }
  .details-container{
    margin-top: 20px;
    margin-bottom: 20px;
    width:80%;
  }
  .taskCard{
    background-color: transparent;
    margin: 10px;
    height: 160px;
  }
  .memberCard{
    background-color: transparent;
    width: 23%;
    float: left;
    margin: 10px;
    height: 500px;
  }

  .text{
    background-color: rgba(255, 255, 255, 0.55);
    color: #1f2d3d;
    font-size: 16px;
    text-align: center;
    padding: 6px;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
    display: block;
    break-inside: avoid;
    overflow: hidden;
    box-shadow: 1px 1px 2px #93aac4;
  }
</style>
