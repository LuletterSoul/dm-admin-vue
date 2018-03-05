<template>
  <div style="margin: 50px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row>
          <el-card class="taskCard">
            <p slot="header" style="font-weight: bold;font-size: 16px">
              <balloon :balloon-count="5">
              </balloon>
              分组编号
            </p>
            <p class="text">
              <balloon :balloon-count="5">
              </balloon>
              {{ group.arrangementId }}
            </p>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="taskCard">
            <p slot="header" class="clearfix" style="font-weight: bold;font-size: 16px">
              <balloon :balloon-count="10">
              </balloon>
              组名
            </p>
            <p class="text">
              <balloon :balloon-count="5">
              </balloon>
              <span style="margin-right: 5px">
                <icon-svg icon-class="svggrouppeople">
              </icon-svg>
              </span>
              {{ group.groupName }}
            </p>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="taskCard">
            <p slot="header" class="clearfix" style="font-weight: bold;font-size: 16px">
              <balloon :balloon-count="5">
              </balloon>
              组长
            </p>
            <p class="text">
              <balloon :balloon-count="5">
              </balloon>
              <span style="margin-right: 5px">
                <icon-svg icon-class="bussinessman">
              </icon-svg>
              </span>
              <span>
                {{ group.groupLeader.studentId }}
              </span>
              <span>
                {{ group.groupLeader.studentName }}
              </span>
            </p>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-card class="memberCard">
          <div slot="header" class="clearfix" style="font-weight: bold;font-size: 16px">
            <balloon :balloon-count="10">
            </balloon>
            组员
          </div>
          <div class="text" v-for="(item ,index) in group.groupMembers">
            <balloon :balloon-count="10">
            </balloon>
            <span style="margin-right: 5px">
            <Icon type="person"></Icon>
          </span>
            {{ item.studentId }}
            {{ item.className }}
            {{ item.studentName }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {
      group: {},
    },
    name: "group-view-item"
  };
</script>

<style scoped>
  .taskCard {
    background-color: transparent;
    margin: 10px;
  }

  .memberCard {
    background-color: transparent;
    margin: 10px;
  }

  .text {
    background-color: rgba(255, 255, 255, 0.55);
    color: #1f2d3d;
    font-size: 16px !important;
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
