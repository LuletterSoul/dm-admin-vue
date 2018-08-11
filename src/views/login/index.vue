<template>
  <div id="loginContainer">
    <template>
      <login-form @login-success="isLoadingModuleActive = false"
                  @login-loading="isLoadingModuleActive = true">
      </login-form>
    </template>
  </div>
</template>
<script>
  import LoginForm from './loginForm'
  export default {
    name: 'login',
    data() {
      return{

      }
    },
    methods: {
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
    },
    components: {
      LoginForm
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
  .login-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #324157;
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
