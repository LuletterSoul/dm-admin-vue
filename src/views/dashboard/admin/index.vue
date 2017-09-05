<template>
    <div class="dashboard-admin-container">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-card class="box-card">
            <div slot="header" class="box-card-header">
              <pan-thumb class="panThumb" :image="avatar"> 你的权限:
                <span class="pan-info-roles" :key='item' v-for="item in roles">{{item}}</span>
              </pan-thumb>
            </div>
            <span class="display_name">{{name}}</span>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <line-chart></line-chart>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import lineChart from './lineChart';
  import panThumb from 'components/PanThumb';
  import ElRow from "element-ui/packages/row/src/row";
  import PanThumb from "../../../components/PanThumb/index.vue";

  export default {
    name: 'app',
    components: {
      PanThumb,
      ElRow,
      lineChart},
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    }
  };
</script>

<style scoped>
  .box-card{
    width: 200px;
    margin: 20px auto;
  }
  .display_name{
    font-size: 30px;
    display: block;
    text-align: center;
  }
</style>
