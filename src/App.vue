<template>
  <div id="app" class="app-container">
    <transition>
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      cachedViews: ['StyleTransfer']
    }
  }
};
</script>
<style>
@import "./assets/tagsStyle.css";
@import "./assets/tooltip.css";
</style>
