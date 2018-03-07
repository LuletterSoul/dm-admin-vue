<template>
  <div>
    <group-view-item v-if="groups.length" v-for="(group,index) in groups" :key="index" :group="group">
    </group-view-item>
    <em-placeholder v-else>
    </em-placeholder>
  </div>
</template>
<script>
  import GroupViewItem from './groupViewItem'

  export default {
    components: {GroupViewItem},
    props: {
      groups: {
        required: Array,
        default: []
      }
    },
    name: "group-view"
  }
</script>
<style scoped>
  .flip-list-move {
    transition: transform 1s;
  }
</style>
