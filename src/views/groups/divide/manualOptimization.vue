<template>
  <div>
        <editable-group-view v-for="(group,index) in groups"  :to-group="group" :key="group.arrangementId">
        </editable-group-view>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import EditableGroupView from '../../components/editableGroupView'
export default {
  name: 'ManualOptimization',
  components: {
    EditableGroupView
  },
  props: {
    toGroups:{
      required: Array,
      default: []
    }
  },
  data() {
    return {
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      groups: this.toGroups,
      fromIndex: 0,
      sortable: null,
      oldList: [],
      newList: []
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.groups[0] = response.data.items;
        this.groups[1]=this.list[0].slice();
        this.total = response.data.total
        this.listLoading = false;
        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      const els = document.querySelectorAll('.el-table__body-wrapper > table > tbody');
      els.forEach( (el,_index) =>{
        Sortable.create(el, {
          group: {
            name:'groups',
            pull:true,
            put:true},
          animation:150,
          ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
          setData: function (dataTransfer) {
            dataTransfer.setData('Text', '')
          },
          onStart: evt =>{
            this.fromIndex = _index;
          },
          onAdd: evt => {
            const targetRow = this.groups[this.fromIndex].splice(evt.oldIndex, 1)[0];
            this.groups[_index].splice(evt.newIndex, 0, targetRow);
          }
        });
      })
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
</style>
