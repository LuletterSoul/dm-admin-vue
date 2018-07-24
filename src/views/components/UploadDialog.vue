<template>
  <div>
    <el-dialog
      :before-close="handleBeforeClose"
      :title="title"
      :visible.sync="visible"
      width="30%">
      <el-upload
        class="upload-container"
        drag
        action="null"
        ref="uploadDialog"
        accept=".xlsx"
        :multiple="multiple"
        :auto-upload="false"
        :on-remove="handleFileRemove"
        :before-remove="beforeFileRemove"
        :before-upload="handleBeforeUpload"
        :file-list="fileList">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">{{ text }}</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
         <el-button type="primary" @click="submit" :loading="isUploading">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "upload-dialog",
        props:{
          format:{
            type:String,
            default:'image/*'
          },
          uploadReq:{
            type:Function,
            default: () => {

            }
          },
          text:{
            type:String,
            default:'在这里输入提示信息'
          },
          title:{
            type:String,
            default:'标题'
          },
          message:{
            type:String,
            default:'上传成功'
          },
          toVisible: {
            type:Boolean,
            default: false
          },
          multiple:{
            type:Boolean,
            default:false
          }
        },
        data(){
          return{
            isUploading: false,
            visible:this.toVisible,
            fileList: []
          }
        },
        methods:{
          handleCancel(){
            this.$emit('onClosed');
            this.visible = false;
          },
          handleBeforeClose(done){
            done();
            this.$emit('onClosed');
            this.visible = false;
          },
          handleFileRemove(file, fileList) {
            console.log(file, fileList);
          },
          handleFilePreview(file) {
            console.log(file);
          },
          beforeFileRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
          },
          submit(){
            this.$refs.uploadDialog.submit();
          },
          handleBeforeUpload(file) {
            let vm = this;
            //新建一个Form data 类型的文件
            let fd = new FormData();
            fd.append('file', file);
            this.isUploading = true;
            this.uploadReq(fd).then((res) => {
              //将导入的成功的数据同步
              vm.studentList = res;
              vm.$emit('onUploaded', res);
              vm.$message({
                type: 'success',
                message: vm.message
              });
              vm.isUploading = false;
              vm.visible = false;
            }).catch(error => {
              vm.$emit('onFailed');
              vm.isUploading = false;
              vm.visible = false;
            });
          },
        },
        watch: {
        toVisible: function (val) {
          this.visible = val;
        }
      }
    }
</script>

<style scoped>
  .upload-container {
    margin-left: 20px;
  }
</style>
