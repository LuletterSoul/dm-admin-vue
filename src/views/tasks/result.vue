<template>
    <div>
      <el-dialog
        :before-close="handleBeforeClose"
        :title="title"
        :visible.sync="visible"
        width="30%">
        <el-row style="margin-top: 20px">
          <el-col>
            <Table border
                   :loading="loading"
                   :columns="columns"
                   :data="data"
                   size='default'
                   stripe></Table>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "result",
        props:{
          visible:{
            type:Boolean,
            default:false
          },
          loading:{
            type:Boolean,
            default:false
          },
          data:{
            type:Object,
            required:true
          }
        },
        data(){
          return {
            innerVisible:this.visible,
            columns: [
              {
                title: '学号',
                align: 'center'
              },
              {
                title: '姓名',
                align: 'center'
              },
              {
                title: '状态',
                align: 'center',
              },
              {
                title:'结果',
                align:'center'
              }
              ]
          }
        },
        watch: {
          visible: function (val) {
            this.innerVisible = val;
          }
        },
        created() {

        },
        methods:{
          handleBeforeClose(done) {
            this.$emit('onClosed');
            done();
          }
        }
    }
</script>

<style scoped>

</style>
