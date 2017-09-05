<template>
    <div class="dashboard-admin-container">
      <el-row>
        <el-col :span="4" :offset="20">
          <el-card class="box-card">
            <div slot="header" class="box-card-header">
              <pan-thumb class="panThumb" :image="avatar">
                Pain and pleasure,like light and darkness,succeed each other.
              </pan-thumb>
            </div>
            <span class="display_name">{{name}}</span>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
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
      lineChart
    },
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
    width: 100%;
    margin: 20px auto;
  }
  .display_name{
    font-size: 30px;
    display: block;
    text-align: center;
  }

  .box-card-header {
    position: relative;
    height: 160px;
  }
  .panThumb {
    z-index: 100;
    height: 150px;
    width: 150px;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
  }
</style>
