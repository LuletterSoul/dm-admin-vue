<template>
  <div>
    <div class="title">
      <i class="el-icon-upload2"></i>导入数据
    </div>
    <div v-if="isSubmit==='no'">
    <el-row :gutter="20" style="margin: 20px;">
      <el-col :offset="2" :span="22">
        <el-form ref="importDataSets"
                 size="medium"
                 label-width="80px"
                 :label-position="'left'"
                 :model="importDataSets">
          <el-row :gutter="20">
            <div class="name">选择数据集</div>
            <el-col :span="20">
                <el-button
                  size="medium"
                  @click="handleUpload"
                  style="margin: 10px 0px;">
                  上传新数据集
                </el-button>
                <upload-dialog :title="'上传新数据集'"
                             :message="'上传成功'"
                             :format="''"
                             :upload-req="uploadRes"
                             :file-name="'resultFile'"
                             @onFailed="uploadDialogVisible =false"
                             @onClosed="handleCanceled"
                             :to-visible="uploadDialogVisible"
                ></upload-dialog>
                <el-form-item
                  :label="'选择库内数据集'"
                  :rules="{
      required: true, message: '发掘任务至少要关联一个数据集', trigger: 'blur'}"
                >
                  <Transfer
                    :data="_candidateCollections"
                    :target-keys="importDataSets.collectionIds"
                    :list-style="listStyle"
                    :not-found-text="'无数据集数据'"
                    @on-change="handleCollectionsChange"
                    :filter-method="filterCollections"
                    :titles="['库内数据集', '选择分析的数据集']">
                  </Transfer>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row :gutter="20">
          <el-col :span="10" :push="9">
            <el-button
              type="primary"
              size="medium"
              @click="isSubmit = 'yes'">
              提交
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    </div>

    <div v-if="isSubmit === 'yes'">
    <el-row :gutter="20" style="margin: 20px;">
      <el-col :offset="2" :span="20">
        <div>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix" style="font: bold 22px 微软雅黑;">
            <span>当前关联</span>
          </div>
          <div  v-for="current in currents"
                v-bind:key="current.id"
                class="text item">
            <p>{{ current.title }}{{ current.info }}</p>
          </div>
        </el-card>
        <el-row :gutter="20">
          <el-col :span="9" style="margin-top: 20px">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix" style="font: bold 22px 微软雅黑;">
                <span>属性</span>
              </div>
              <el-table
                ref="multipleTable"
                :data="attributes"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="编号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称"
                  width="180">
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="toggleSelection()">取消选择</el-button>
                <el-button >删除属性</el-button>
                <el-button >确认</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :span="15" style="margin-top: 20px">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix" style="font: bold 22px 微软雅黑;">
                <span>所选属性</span>
                <el-select v-model="selectedAttributeName" placeholder="请选择属性" style="float: right; padding: 3px 0">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div v-for="selectedAttribute in selectedAttributes"
                   v-bind:key="selectedAttribute.id"
                   class="text item">
                <el-row :gutter="20">
                <el-col :span="6">
                  <p style="margin-bottom: 20px">{{ selectedAttribute.title }}{{ selectedAttribute.info }}</p>
                </el-col>
                </el-row>
              </div>
              <el-table
                ref="multipleTable"
                :data="selectedAttributeData"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  prop="statistic"
                  label="统计">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="数值">
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-button >可视化全部</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :push="10">
            <el-button
              type="primary"
              size="medium"
              @click="isSubmit = 'no'"
              style="margin: 20px">
              返回
            </el-button>
          </el-col>
        </el-row>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import UploadDialog from '../components/UploadDialog'
  import {
    createTask,
    fetchTaskStatusOptions
  } from 'api/tasks';

  import {
    fetchAlgorithms
  } from 'api/algorithms'

  import {
    fetchGrammars
  } from 'api/grammars'

  import {
    fetchCollectionList,
    fetchOptions
  } from 'api/datasets';

  import {
    getGroupList
  } from 'api/groups'

  export default {
    name: 'CreateTask',
    created() {
      this.getCollectionList();
    },
    data() {
      return {
        uploadDialogVisible:false,
        collectionIds:[],
        collectionList: [],
        dataSetCharOptions: [],
        listStyle: {
          fontSize: 16+'px',
          width: '43%',
          height: '500px'
        },
        importDataSets: {
          collectionIds: [],
        },
        isSubmit: 'no',
        currents: [
          {
            id: 1,
            title: '数据集名称:',
            info: '测试数据集1'
//            key:collectionName
          },
          {
            id: 2,
            title: '属性:',
            info: '13',
//            key:attributeCharIds
          },
          {
            id: 3,
            title: '实例数:',
            info: '43824',
//            key:numberOfInstances
          },
          {
            id: 4,
            title: '总宽度:',
            info: '43824',
//            key:sumOfWeights
          },
        ],
        attributes: [{
          id: '1',
          name: 'year',
        }, {
          id: '2',
          name: 'month',
        }, {
          id: '3',
          name: 'day',
        }, {
          id: '4',
          name: 'hour',
        }, {
          id: '5',
          name: 'pm2.5',
        },],
        multipleSelection: [],
        selectedAttributes: [
          {
            id: 1,
            title: '属性名称:',
            info: 'year'
          },
          {
            id: 2,
            title: '种类:',
            info: 'Numeric',
          },
          {
            id: 3,
            title: '是否缺省:',
            info: '否',
          },
          {
            id: 4,
            title: '确切数值:',
            info: '5',
          }
        ],
        selectedAttributeData: [{
          statistic: '最小值',
          value: '2010',
        }, {
          statistic: '最大值',
          value: '2014',
        }, {
          statistic: '平均值',
          value: '2012',
        }, {
          statistic: 'StdDev',
          value: '1.414',
        }],
        options: [{
          value: 'year',
          label: 'year'
        },{
          value: 'month',
          label: 'month'
        }],
        selectedAttributeName:'year'
      };
    },
    watch: {
      _collectionIds:function (val) {
        if(val ===undefined) {
          this.importDataSets.collectionIds = [];
        }
        this.importDataSets.collectionIds = val;
      }
    },
    methods: {
      resetTemp() {
        this.importDataSets = {
          collectionIds: [],
        }
      },
      handleCollectionsChange(targetKeys, direction, moveKeys){
        this.importDataSets.collectionIds = targetKeys;
      },
      filterGroups() {
        return true;
      },
      filterCollections() {
        return true;
      },
      getCollectionList() {
        let that = this;
        this.loading = true;
        fetchCollectionList(Object.assign({}, this.listQuery)).then(response => {
          that.collectionList = response.content;
          that.totalElements = response.totalElements;
          that.loading = false;
        }).catch(error => {
          console.log(error);
        })
      },
      submit() {
        this.$refs['importDataSets'].validate((valid) => {
          if (valid) {
            this.handleCreate();
          } else {
            return false;
          }
        });
      },
      reset() {

      },

      handleCreate() {
        let vm = this;
        vm.creating = true;
        createTask(Object.assign({},this.newTask)).then(response => {
          vm.createting = false;
          this.$message({
            message: '创建成功',
            type: 'success',
            duration: 1500
          });
          this.resetTemp();
          this.$router.push({path: '/tasks'});
        });
      },
      handleMapping(multiple, name) {
        return multiple.map(m => {
          let option =
            this.collectionList.map(set => {
              let tasks = set[name];
              for (let i = 0; i < tasks.length; ++i) {
                if (tasks[i].englishName === m.englishName) {
                  return {
                    value: set.collectionId,
                    label: set.collectionName
                  }
                }
              }
              return null;
            }).filter(o => o !== null);
          if (option.length) {
            return {
              value: m.englishName,
              label: m.chineseName,
              children: option
            }
          }
          else {
            return {
              value: m.englishName,
              label: m.chineseName,
            }
          }
        })
      },
      handlesubmit(){
        isSubmit = 'yes';
      },
      handleback(){
        isSubmit = 'no';
      },
      handleUpload(){
        this.uploadDialogVisible = true;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    computed: {
      _candidateCollections() {
        return this.collectionList.map( c=>{
          return {
            key: c.collectionId,
            label: c.collectionName
          };
        })
      },
      //数据集分类器
      miningTaskTypesCascade() {
        return this.handleMapping(this.associatedTaskOptions, 'associatedTasks');
      },
      attributeTypesCascade() {
        return this.handleMapping(this.attrCharOptions, 'attributeCharacteristics');
      },
      characteristicsCascade() {
        return this.handleMapping(this.dataSetCharOptions, 'dataSetCharacteristics');
      },
      _collectionIds() {
        let ids = this.domains.map(domain => domain.selections[2]);
        let containedNull = false;
        ids.forEach(i => {
          if (i === undefined || !i) {
            containedNull = true;
          }
        });
        return containedNull ? [] : ids;
      },

    }
  }
</script>

<style>
  .title {
    margin-bottom: 20px;
    font: bold 36px 微软雅黑;
  }

  div {
    background-color: transparent;
    margin: 0px auto;
  }
  .name{
    margin-bottom: 20px;
    font: bold 20px 微软雅黑;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    background-color: transparent;
    font-size:16px;
  }

  .form1 {
    width: 50%;
    height: 100%;
    padding: 30px;
  }

  .page {
    padding: 20px;
  }

  .button {
    clear: both;
    margin-top: 40px;
    margin-bottom: 20px;
    width: 40%;
  }

  .add {
    position: absolute;
    top: 357px;
    left: 862px;
  }
</style>
