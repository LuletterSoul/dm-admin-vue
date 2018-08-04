<template>
  <div id="loginContainer">
    <template>
      <divide-animation>
      </divide-animation>
      <register-form>
      </register-form>
    </template>
  </div>
</template>
<script>
  import { isWscnEmail } from '@/utils/validate';
  import DivideAnimation from '@/components/animate_svg/DivideAnimation';
  import Loading from '@/components/animate_svg/Loading';
  import AnimateTransition from '@/components/transition/AnimateTransition';
  import SingleTransition from '@/components/transition/SingleTransition.vue';
  import FadeTransition from '@/components/transition/FadeTransition';
  import RegisterForm from '../register/registerForm';
  export default {
    name: 'register',
    components: {
      RegisterForm,
      DivideAnimation,
      Loading,
      FadeTransition,
      SingleTransition,
    },
    data() {
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
      return {
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
      };
    },
    methods: {
      handleLogin() {
        var vm = this;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              vm.$store.dispatch('GetToken', this.loginForm.username).then(() => {
                this.isLoginFormDisplay = false;
                // setTimeout(function () {
                //
                // },500);
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
      enableAnimation: function () {

      },
      closeLoginModuleContainer:function () {
        this.isLoginModuleActive = false;
      },
      switchLoadingContainer:function () {
        this.isLoadingModuleActive = !this.isLoadingModuleActive;
      },
      redirect: function () {
        this.$router.push({path: '/'});
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  @import "src/styles/divide.scss";
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
  .register-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #f56c6c;
    /*text-align: center;*/
  }
  .dynamic-hidden {
    overflow: hidden;
  }
  .login-form-container {
    //      @include relative;
    /*position: absolute;*/
    /*float: left;*/
    position: relative;;
    left: 50%;
    top: 50%;
    input:-webkit-autofill {
         -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
         -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
         -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 40px;
    }
    .el-input {
      display: inline-block;
      height: 40px;
      width: 88%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
    }
    .title {
      font-size: 40px;
      font-weight: 400;
      color: #eeeeee;
      margin: 20px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      width: 400px;
      margin-left: -200px;
      margin-top: 20px;
      padding: 35px 35px 15px 35px;
      border-radius: 15px;
      border: 1px solid rgba(0, 0, 0, .12);
      background: rgba(0, 0, 0, .04);
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .forget-pwd {
      color: #fff;
    }
  }
</style>
