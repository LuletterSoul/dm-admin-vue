<template>
  <div id="app">
    <div class="title">
      分组情况
    </div>
    <el-card class="groupCard"
             v-for="group in groups"
             v-bind:key="group.groupId"
             v-bind:title="group.groupName">

      <div slot="header" style="font-weight: bold;font-size: 20px;text-align:center;">
        <balloon :balloon-count="5">
        </balloon>
        {{ group.groupName }}
      </div>
      <ul>
        <balloon :balloon-count="3">
        </balloon>
        <li class="text">组长：{{ group.groupLeaderName }}</li>
        <li class="text" v-for="(item ,index) in group.members"  >组员{{index+1}}：{{ item }}</li>
      </ul>
    </el-card>

  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'app',
    data () {
      return {
        groups: [
          {
            id: 1,
            groupName: '软一01',
            groupLeaderName: '嘉宝',
            members:['龚秀英','林明','雷刚','林芳丽','沈超','付细细','刘柱子','李锤子']
          },
          {
            id: 2,
            groupName: '软二01',
            groupLeaderName: '姜允',
            members:['姜胜','马静','史超','田家','宋浩','李勋','于娜','金宇','薛泽']
          },
          {
            id: 3,
            groupName: '计科01',
            groupLeaderName: '段磊',
            members:['益达','昭右','郑多慧','刘丽','邱君','刘洁','孙容','黄晓静','林霸']
          }
        ],
      }
    }
  }
</script>

<style scoped>
  div{
    background-color:transparent;
    margin:0px auto;
  }
  .groupCard{
    width: 30%;
    margin:20px;
    float: left;
    height: 625px;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }
  .text{
    background-color: rgba(220, 225, 231, 0.09);
    color: #8492A6;
    font-size: 16px;
    padding: 10px;
    width: 100%;
    margin-bottom: 15px;
    border-radius: 10px;
    display: block;
    break-inside: avoid;
    overflow: hidden;
    box-shadow: 1px 1px 2px #93aac4;
  }
  .title{
    width:20%;
    font:bold 36px 微软雅黑;
    padding: 20px;
  }
  .el-card{
    border-radius:10px;
  }
</style>
