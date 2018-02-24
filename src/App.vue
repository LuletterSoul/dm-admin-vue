<template>
  <div id="app" class="app-container global-background">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>
<style lang="scss">
  .global-background{
    background: url("./assets/5.jpg") repeat-y;
    background-size: 100%;
  }
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
