<template>
  <el-row>
    <el-col style="margin-top: 20px" :span="22" :offset="2">
      <Steps :current="_step">
        <Step :title="$t('p.group.divide.oneKey.process.title0')" :content="$t('p.group.divide.oneKey.process.step0')">
        </Step>
        <Step :title="$t('p.group.divide.oneKey.process.title1')" :content="$t('p.group.divide.oneKey.process.step1')">
        </Step>
        <Step :title="$t('p.group.divide.oneKey.process.title2')" :content="$t('p.group.divide.oneKey.process.step2')">
        </Step>
        <Step :title="$t('p.group.divide.oneKey.process.title3')" :content="$t('p.group.divide.oneKey.process.step3')">
        </Step>
        <Step :title="$t('p.group.divide.oneKey.process.title4')" :content="$t('p.group.divide.oneKey.process.step4')">
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
