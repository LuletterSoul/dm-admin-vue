<template>
    <div class="dashboard-admin-container">
      <sweet-modal ref="modal" icon="warning" title="登出">
        确认退出系统吗?
        <el-button type="info" slot="button" @click="logout">确认</el-button>
        <el-button :plain="true" type="success" slot="button" @click="$refs.modal.close()">取消</el-button>
      </sweet-modal>
      <el-row>
        <el-col :span="6">
          <el-card class="user-profile-content">
            <balloon :balloon-count="10">
            </balloon>
            <div slot="header">
              <colorful-button :link="'/user/update'"
                               :button-style="{float: 'right',marginRight:'-7px'}">
                更新
              </colorful-button>
              <colorful-button :link="'/user'"
                               @click="$refs.modal.open();"
                               :color="'light-blue-btn'"
                               :button-style="{float: 'right',marginRight:'5px'}">
                详情
              </colorful-button>
              <span style="line-height: 36px;">用户信息</span>
            </div>
            <div>
              <p>用户名: {{  userProfile.name }}</p>
              <p>个性签名: {{  userProfile.introduction }}</p>
              <p>上一次登录时间:  {{ userProfile.lastLoginTime }}</p>
              <p>管理状态: {{  userProfile.status }}</p>
            </div>
            <!--<div v-for="o in 4" :key="o" class="text item">-->
            <!--{{'列表内容 ' + o }}-->
            <!--</div>-->
          </el-card>
        </el-col>
        <el-col :span="10" :offset="1">
          <div class="todoList-container">
            <todo-list></todo-list>
          </div>

        </el-col>
        <el-col :span="6" :offset="1">
          <el-card class="box-card">
            <div slot="header" class="box-card-header">
              <pan-thumb class="panThumb" :image="avatar">
                Pain and pleasure,like light and darkness,succeed each other.
              </pan-thumb>
            </div>
            <div class="user-card-content">
              <span class="display_name">{{name}}</span>
              <div class="info-user-item">
                <icon-svg :icon-class="'browse'" ></icon-svg>
                <countTo class="info-item-num" :startVal='0' :endVal='statisticsData.permissionCount' :duration='3400'></countTo>
                <span class="info-item-text">权限数</span>
              </div>
              <div class="info-user-item">
                <icon-svg :icon-class="'operation'"></icon-svg>
                <countTo class="info-item-num" :startVal='0' :endVal='statisticsData.operationCount' :duration='3600'></countTo>
                <span class="info-item-text">操作数</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <line-chart></line-chart>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
//  import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
  import lineChart from './lineChart';
  import PanThumb from 'components/PanThumb';
  import countTo from 'vue-count-to';
  import ElRow from "element-ui/packages/row/src/row";
//  import PanThumb from "../../../components/PanThumb/update.vue";
  import Balloon from 'components/balloon';
  import ColorfulButton from 'components/button';
  import TodoList from 'components/TodoList'
  export default {
    name: 'app',
    components: {
      PanThumb,
      countTo,
      ElRow,
      lineChart,
      Balloon,
      ColorfulButton,
      TodoList
    },
    data() {
      return {
        statisticsData: {
          permissionCount: 10,
          comment_count: 102400,
          latest_article: [],
          month_article_count: 28,
          operationCount: 1024
        }
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload();  // 为了重新实例化vue-router对象 避免bug
        });
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles',
        'status',
        'userProfile'
      ])
    }
  };
</script>

<style scoped>
  .box-card{
    width: 100%;
    /*margin: 20px auto;*/
  }

  .display_name{
    font-size: 30px;
    display: block;
  }

  .box-card-header {
    position: relative;
    height: 160px;
  }
  .panThumb {
    z-index: 100;
    height: 150px;
    width: 150px;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
  }
  .info-user-item {
    margin-top: 12px;
  }
  .user-profile-content{
    height: 300px;
  }
  .user-card-content{
    position: relative;
    left: 50%;
    margin-left: -55px;
  }

 .todoList-container{
   height: 300px;
 }
</style>
