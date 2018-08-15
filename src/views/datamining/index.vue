<template>
    <div>
      <transition name="fade" mode="out-in">
        <keep-alive :include='cachedViews'>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
</template>

<script>
    export default {
      name: "index",
      data() {
        return {
          cachedViews() {
            return this.$store.state.tagsView.cachedViews.join();
          }
        }
      }
    }
</script>

<style scoped>

</style>
