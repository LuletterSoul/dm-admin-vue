<template>
    <div>
      <el-row>
        <el-dialog
          v-loading="loading"
          element-loading-text="正在加载数据"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :before-close="handleBeforeClose"
          :title="'挖掘结果'"
          :visible.sync="innerVisible"
          :center="true"
          width="80%">
          <el-row>
            <el-col :offset="18" :span="1">
              <el-tooltip class="item" effect="dark" content="下载本阶段的挖掘结果" placement="top-end">
                <el-button size="small" type="primary" icon="el-icon-download" circle></el-button>
              </el-tooltip>
            </el-col>
            <el-col  :span="3">
              <el-select
                prefix-icon="el-icon-search"
                size="small"
                v-model="selection"
                @change="handleFilter"
                placeholder="请选择">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.description"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col style="margin-top: 20px" :offset="2" :span="20">
              <Table border
                     :loading="loading"
                     :columns="columns"
                     :data="results"
                     size='default'
                     stripe></Table>
            </el-col>
            <el-col style="margin-top: 20px" :offset="10" :span="12">
              <el-pagination @size-change="handleSizeChange"
                             background
                             small
                             @current-change="handleCurrentChange"
                             :page-sizes="[8,16,32,64]"
                             :page-size="listQuery.size"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="total">
              </el-pagination>
            </el-col>
          </el-row>
        </el-dialog>
      </el-row>
    </div>
</template>

<script>
  import {
    getResults,
    createResult,
    uploadResult,
    downloadResult,
    findResultRecords
  } from 'api/results';
  import FileSaver from 'file-saver'
  import {
    createStage,
    getResultsByStageId,
  } from 'api/stages';
    export default {
        name: "result",
        props:{
          visible:{
            type:Boolean,
            default:false
          },
          total:{
            required:true,
            default: 0
          },
          stateOptions:{
            type:Array,
            required:true,
            default:[]
          },
          loading:{
            type:Boolean,
            default:false
          },
          results:{
            type: Array,
            required:true,
            default: []
          }
        },
        data(){
          let vm = this;
          return {
            innerVisible:this.visible,
            listQuery:{
              size: 8,
              page:1,
            },
            selection:'',
            columns: [
              {
                title: '学号',
                align: 'center',
                key:'submitterId'
              },
              {
                title: '姓名',
                align: 'center',
                key:'submitterName'
              },
              {
                title: '状态',
                align: 'center',
                render: function (h, params) {
                  return h('Tag', {
                    props: vm.renderTaskStatusTag(params.row.state)
                  }, vm.findStatus(params.row.state));
                }
              },
              {
                title:'结果',
                align:'center',
                render:function (h, params) {
                  return h('Button', {
                    props: vm.switcher(params.row.state),
                    on: {
                      click: () => {
                        //默认下载最新的记录
                        vm.handleDownload(params.row.records[0].recordId);
                      }
                    }
                  })
                }
              }
              ]
          }
        },
        watch: {
          visible: function (val) {
            this.innerVisible = val;
            this.listQuery.size = 8;
            this.listQuery.page = 1;
            this.selection = '';
          }
        },
        created() {

        },
        methods:{
          switcher(status){
            if(status === 1){
              return {
                type: 'ghost',
                shape: 'circle',
                icon: 'ios-cloud-download-outline',
                disabled:true
              }
            }
            else if(status === 2){
              return {
                type: 'primary',
                shape: 'circle',
                icon: 'ios-cloud-download-outline',
              }
            }
            else if(status === 3){
              return {
                type: 'success',
                shape: 'circle',
                icon: 'ios-cloud-download-outline',
              }
            }
          },
          handleFilter(val){
            this.listQuery.size = 8;
            this.listQuery.page = 1;
            this.$emit('state-filter-changed', val);
          },
          handleSizeChange(val){
            this.$emit('size-changed', val);
          },
          handleCurrentChange(val){
            this.$emit('page-changed', val - 1);
          },
          handleBeforeClose(done) {
            this.$emit('onClosed');
            done();
          },
          handleDownloadProgress(event){
            console.log(event);
          },
          handleDownload(recordId){
            let recordIds = [];
            recordIds.push(recordId);
            downloadResult(recordIds,this.handleDownloadProgress).then((res) => {
              const effectiveFileName = res.headers['x-suggested-filename'];
              FileSaver.saveAs(res.data, effectiveFileName);
            }).catch(error => {
              console.log(error);
            });
          },
          findStatus(value){
            for(let i = 0;i< this.stateOptions.length;i++){
              if (this.stateOptions[i].value === value)
                return this.stateOptions[i].description;
            }
          },
          renderTaskStatusTag(progressStatus) {
            let tagColor = '';
            switch (progressStatus) {
              case 1:
                tagColor = 'yellow';
                break;
              case 2:
                tagColor = '#EF6AFF';
                break;
              case 3:
                tagColor = 'green';
                break;
              case 4:
                tagColor = 'blue';
                break;
              case 5:
                tagColor = 'red';
                break;
              case 6:
                tagColor = '#25dc72';
                break;
              default:
                tagColor = 'blue';
                break;
            }
            return {
              type: 'dot',
              color: tagColor
            };
          }
        },
        computed:{
          _submitted() {
            return {
              type: 'success',
              shape: 'circle',
              icon: 'ios-cloud-download-outline',
            }
          }
        }
    }
</script>

<style scoped>

</style>
