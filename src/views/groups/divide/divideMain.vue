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
    name: 'DivideMain',
    data() {
      return {
        dataMiningGroups: [],
        dataMiningTask: {},
        queryKey: '',
        current: 2
      };
    },
    methods: {
      handleGroupPreview(groupPreview) {
        this.dataMiningGroups = groupPreview.dataMiningGroups;
        this.queryKey = groupPreview.queryKey;
        this.dataMiningTask = groupPreview.dataMiningTask;
        this.current++;
      },
      preStep() {
        this.$store.dispatch('SetStep', this._step - 1);
      },
      nextStep() {
        this.$store.dispatch('SetStep', this._step + 1);
      }
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews.join();
      },
      _step() {
        return this.$store.state.group.divide.step;
      }
    }
  }
</script>
