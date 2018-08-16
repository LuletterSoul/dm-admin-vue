<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
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
