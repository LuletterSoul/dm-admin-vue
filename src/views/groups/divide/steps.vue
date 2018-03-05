<template>
  <el-row>
    <el-col style="margin-top: 20px" :span="22" :offset="2">
      <Steps :current="_step">
        <Step title="填写分组参数" :content="$t('p.group.divide.oneKey.process.step1')">
        </Step>
        <Step title="预览分组信息" :content="$t('p.group.divide.oneKey.process.step2')">
        </Step>
        <Step title="手动调优" :content="$t('p.group.divide.oneKey.process.step3')">
        </Step>
        <Step title="确认分组" :content="$t('p.group.divide.oneKey.process.step4')">
        </Step>
      </Steps>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "steps",
    computed: {
      _step() {
        return this.$store.state.group.divide.step;
      }
    }
  }
</script>

<style scoped>

</style>
