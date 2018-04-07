<template>
    <div>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "group-new-actions"
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }


  .el-carousel__item:nth-child(2n) {
    opacity: 0.75;
    background-color: #d3dce6;
  }

  .el-carousel__item:nth-child(2n+1) {
    opacity: 0.75;
    background-color: #ffffff;
  }
</style>
