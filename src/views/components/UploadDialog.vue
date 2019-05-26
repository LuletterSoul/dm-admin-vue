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
        :accept="format"
        :multiple="multiple"
        :auto-upload="false"
        :on-change="handleChange"
        :on-preview="handleFilePreview"
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
    props: {
      fileName: {
        type: String,
        default: 'file'
      },
      format: {
        type: String,
        default: 'image/*'
      },
      uploadReq: {
        type: Function,
        default: null
      },
      text: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '标题'
      },
      message: {
        type: String,
        default: '上传成功'
      },
      toVisible: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isUploading: false,
        visible: this.toVisible,
        fileList: [],
        counter: 0,
        fileLength: 0,
      }
    },
    methods: {
      handleCancel() {
        this.$emit('onClosed');
        this.visible = false;
      },
      handleBeforeClose(done) {
        done();
        this.$emit('onClosed');
        this.visible = false;
      },
      handleFileRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handleFilePreview(file) {
        // this.fileList.push(file);
      },
      beforeFileRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      submit() {
        this.$emit('onSubmit');
        this.fileLength = this.fileList.length;
        this.$refs.uploadDialog.submit();
      },
      handleChange(file, fileList) {
        this.$emit('onChange', fileList);
        // this.fileList = fileList;
      },
      // handleSuccess()
      handleBeforeUpload(file) {
        let vm = this;
        if (this.uploadReq == null) {
          vm.visible = false;
          return;
        }
        //新建一个Form data 类型的文件
        let fd = new FormData();
        let fileName = this.fileName;
        // if (this.multiple) {
        //   this.fileList.forEach(f => {
        //     fd.append('files', f);
        //   });
        // } else {
        fd.append('file', file);
        // }
        this.isUploading = true;
        this.uploadReq(fd).then((res) => {
          vm.$emit('onUploaded', res);
          vm.counter = vm.counter + 1;
          // console.log('Counter ',vm.counter);
          // console.log('FileList ', vm.fileLength);
          if (vm.counter === vm.fileLength) {
            vm.$message({
              type: 'success',
              message: vm.message
            });
            vm.counter = 0;
            vm.visible = false;
            vm.$emit('onSuccess');
         }
          vm.isUploading = false;
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
