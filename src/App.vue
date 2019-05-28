<template>
  <div id="app" class="app-container">
    <BackToTop></BackToTop>
    <router-view></router-view>
  </div>
</template>

<script>
  import BackToTop from "./components/BackToTop/index";

  export default {
    components: {BackToTop},
    name: 'app'
  };
</script>
<style lang="scss">

</style>
