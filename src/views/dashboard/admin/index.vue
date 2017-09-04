<template>
    <div class="dashboard-admin-container">
      <el-row :gutter="20">
        <el-col>
          <pan-thumb image=""
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="15">
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
        'roles'
      ])
    }
  };
</script>

<style>
</style>
