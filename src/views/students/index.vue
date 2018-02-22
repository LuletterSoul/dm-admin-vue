<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include='cachedViews'>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script type="text/javascript">
    export default {
        name: 'app',
        data() {
            return {}
        }
    }
</script>

<style>
</style>
