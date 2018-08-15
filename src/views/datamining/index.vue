<template>
  <div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {}
    },
    computed: {
      _cachedViews() {
        return this.$store.getters.cachedViews;
      }
    }
  }
</script>

<style scoped>

</style>
