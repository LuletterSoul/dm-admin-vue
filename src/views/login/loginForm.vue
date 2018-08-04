<template>
  <div id="loginModuleContainer">
    <fade-transition :fade-out-duration="1000" :fade-out-only="true" :is-active="isLoginModuleActive" @fadeOutEnd="switchLoadingContainer">
      <div class="login-wrap">
        <divide-animation></divide-animation>
        <single-transition  @OutEnd="closeLoginModuleContainer">
          <div class="login-form-container" v-if="isLoginFormDisplay">
            <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
                     class="card-box login-form">
              <img src="../../assets/logo@2x.png" class="logo-align" height="300" width="300">
              <h3 class="title">数据挖掘</h3>
              <h3 class="title">实践教学平台</h3>
              <el-form-item prop="email">
                <span class="svg-container">
                <icon-svg icon-class="accountfilling"></icon-svg>
                </span>
                <el-input name="email" type="text" v-model="loginForm.username" autoComplete="on" placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <span class="svg-container">
                <icon-svg icon-class="password" ></icon-svg>
                </span>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                          placeholder="密码"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-button type="primary" style="width:95%;height: 40px;" :loading="loading" @click.native.prevent="handleLogin">
                    登录
                  </el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="success" style="width:95%;height: 40px;"  @click.native.prevent="handleRegister">
                    注册
                  </el-button>
                </el-col>
              </el-row>

              <!--</el-form-item>-->
            </el-form>
          </div>
        </single-transition>
      </div>
    </fade-transition>
  </div>
</template>

<script>
  import { isWscnEmail } from '@/utils/validate';
  import DivideAnimation from '@/components/animate_svg/DivideAnimation';
  import Loading from '@/components/animate_svg/Loading';
  import AnimateTransition from '@/components/transition/AnimateTransition';
  import SingleTransition from '@/components/transition/SingleTransition.vue';
  import FadeTransition from '@/components/transition/FadeTransition';
  const validateEmail = (rule, value, callback) => {
    if (false) {
      callback(new Error('请输入正确的合法邮箱'));
    } else {
      callback();
    }
  };
  const validatePass = (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码不能小于6位'));
    } else {
      callback();
    }
  };
    export default {
        name: "login-form",
        components:{
          DivideAnimation,
          Loading,
          AnimateTransition,
          SingleTransition,
          FadeTransition
        },
        data(){
          return{
            closeLoginModuleContainer: false,
            loginForm: {
              username: 'qq313700046',
              password: 'liuxiangde'
            },
            loginRules: {
              username: [
                {required: true, trigger: 'blur', validator: validateEmail}
              ],
              password: [
                {required: true, trigger: 'blur', validator: validatePass}
              ]
            },
            loading: false,
            isDivideAnimated: true,
            isLoginFormDisplay: true,
            isLoginModuleActive: true,
            isLoadingModuleActive:false,
          }
        },
        methods: {
          switchLoadingContainer:function () {
            this.isLoadingModuleActive = !this.isLoadingModuleActive;
          },
          handleRegister(){
            this.$router.push({path: '/register'});
          },
          handleLogin() {
            var vm = this;
            this.$refs.loginForm.validate(valid => {
              if (valid) {
                this.loading = true;
                this.$store.dispatch('Login', this.loginForm).then(() => {
                  vm.$store.dispatch('GetToken', this.loginForm.username).then(() => {
                    this.isLoginFormDisplay = false;
                    vm.$router.push({path: '/'});
                    vm.$message.success("登录成功.");
                  }).catch(error =>{
                    this.loading = false;
                    this.isLoginFormDisplay = true;
                  });
                }).catch((error) =>{
                  this.loading = false;
                  this.isLoginFormDisplay = true;
                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
        }
    }
</script>

<style scoped>

</style>
