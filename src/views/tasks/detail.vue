<template>
  <div id="app">
    <div v-if="showHeader" class="taskTitle">任务信息</div>
    <el-row style="margin: 20px">
      <el-col>
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item name="1">
            <template slot="title">
              <div class="title-container">
                <icon-svg icon-class="svggrouppeople">
                </icon-svg>
                <span style="margin-left: 5px">
                    执行任务的分组
                </span>
              </div>
            </template>
            <el-row>
              <el-col>
                <div>
                  <div class="group-container">
                    <transition
                      mode="out-in"
                      name="custom-classes-transition"
                      enter-active-class="animated bounceIn"
                      leave-active-class="animated bounceOutRight">
                      <group-view :groups="currentPageGroups" :key="pagination.page">
                      </group-view>
                    </transition>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-pagination style="float: right;margin-right: 20px"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="pagination.page"
                             :page-sizes="[2,4,6]"
                             :page-size="pagination.size"
                             layout="total, sizes, prev, pager, next, jumper"
                             background
                             :total="totalElements">
              </el-pagination>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <div class="title-container">
                <icon-svg icon-class="data">
                </icon-svg>
                <span style="margin-left: 5px">
                  分配的数据集
                </span>
              </div>
            </template>
            <div>
              <set-detail v-for="(collection,index) in sets" :to-collection="collection" :key="index" :read-only="true">
              </set-detail>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <div class="title-container">
                <icon-svg icon-class="libra">
                </icon-svg>
                <span style="margin-left: 5px">
                  采用的算法
                </span>
              </div>
            </template>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import GroupViewItem from '../components/groupViewItem';
  import GroupView from '../components/groupView';
  import SetDetail from '../datasets/detail'
  import {
    getRefCollections,
    getRefGroups, fetchConfiguredAlgortithms
  } from 'api/tasks';
  import {getMembers} from 'api/groups'

  export default {
    name: 'app',
    components: {
      GroupView,
      GroupViewItem,
      SetDetail
    },
    props: {
      toTaskId: '',
      showHeader: true,
      toGroups: {
        default: function () {
          return [];
        }
      },
      toSets: {
        default: function () {
          return [];
        }
      },
      toAlgorithms: {
        default: function () {
          return [];
        }
      }
    },
    created() {
      //约定从route中传入查询参数taskId,利用taskId从后台加载数据
      let _taskId = this.$route.query.taskId;
      //如果props提供taskId,则不需要查询参数
      console.log(_taskId);
      if (_taskId || this.taskId) {
        if (_taskId) {
          this.taskId = _taskId;
        }
        this.getRefAlgorithms();
        //如果当前的分组信息未由父组件传入,则认为需要从后台拉取信息
        if (!this.groups.length) {
          this.getGroups();
        }
        this.getCollections();
      }
      //否则依赖prop传入的值
      else {
        this.groups = this.toGroups;
        this.sets = this.toSets;
        this.algorithms = this.toAlgorithms;
      }
    },
    data() {
      return {
        dataSet: {
          collectionName: 'PM2.5 Data of Five Chinese Cities Data Set '
        },
        algorithms: this.toAlgorithms,
        sets: this.toSets,
        groups: this.toGroups,
        taskId: this.toTaskId,
        activeNames: ['1'],
        title: 'data set title',
        pagination: {
          page: 1,
          size: 2
        },
      };
    },
    methods: {
      handleSizeChange(val) {
        if (this.pagination.size === val) {
          return
        }
        this.pagination.size = val;
      },
      handleCurrentChange(val) {
        this.pagination.page = val;
      },
      getCollections() {
        let vm = this;
        getRefCollections(this.taskId).then(sets => {
          vm.sets = sets;
        }).catch(error => {
        });
      },
      getRefAlgorithms() {
        let vm = this;
        fetchConfiguredAlgortithms(this.taskId).then(configAlgorithms => {
          vm.algorithms = configAlgorithms;
        }).catch(error => {
        });
      },
      getGroups() {
        let vm = this;
        console.log(this.taskId);
        getRefGroups(this.taskId).then(groups => {
          vm.groups = groups;
          vm.groups.forEach(g => {
            getMembers(g.groupId).then(res => {
              vm.$set(g, 'groupMembers', res);
            }).catch(error => {
            })
          })
        }).catch(error => {
        });
      }
    },
    computed: {
      currentPageGroups() {
        let begin = (this.pagination.page - 1) * this.pagination.size;
        let end = this.pagination.page * this.pagination.size;
        if (end > this.totalElements) {
          end = this.totalElements;
        }
        return this.groups.slice(begin, end);
      },
      totalElements() {
        return this.groups.length;
      }
    }
  };
</script>

<style scoped>
  div {
    background-color: transparent;
    margin: 0px auto;
    font-size: 16px;
  }

  .title-container {
    margin-left: 20px;
    font-weight: bold;
  }

  .taskTitle {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 20%;
    font: bold 36px 微软雅黑;
  }

  .details-container {
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
