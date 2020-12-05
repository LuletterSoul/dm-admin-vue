<template>
  <div>
    <!-- <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button> -->
    <!--&lt;!&ndash;    导航栏&ndash;&gt;-->
    <!--    <van-nav-bar title="Aristagram" left-text="返回" fixed="true" left-arrow @click-left="onClickLeft" @click-right="onClickRight">-->
    <!--      <template #right>-->
    <!--        <van-popover-->
    <!--          v-model="showPopover"-->
    <!--          trigger="click"-->
    <!--          :actions="actions"-->
    <!--          @select="onSelect"-->
    <!--        >-->
    <!--          <template #reference>-->
    <!--            <van-icon name="bars" size="18" />-->
    <!--          </template>-->
    <!--        </van-popover>-->
    <!--      </template>-->
    <!--    </van-nav-bar>-->
    <div class="bar-image">
      <!--      top bar-->
      <div class="top-bar">
        <template>
          <!--          <van-switch v-model="checked" active-color="black" inactive-color="blue" size="100px"/>-->
        </template>
      </div>
      <!--    结果展示div-->
      <div class="image-div">
        <div class="image">
          <van-image v-bind:src="showImagePath" style="width: 100%; height: 100%;">
          </van-image>
        </div>
      </div>
      <!--      bottom bar-->
      <div class="bottom-bar">
        <van-icon name="close" class="icon-background" color="white" size="100px" style="margin-left: 30px"
                  @click="onClose"/>
        <!--        <van-icon class="icon-background" name="clear" color="black" size="100px" style="margin-left: 30px"/>-->
        <!--        <van-icon class="icon-background" name="browsing-history" color="black" size="100px"/>-->
        <!--        <van-icon class="icon-background" name="checked" color="black" size="100px" style="margin-right: 30px" />-->
        <van-icon v-if="eyeOpened" name="eye-o" class="icon-background" color="white" size="100px"
                  @click="onChangeEye"/>
        <van-icon v-else name="closed-eye" class="icon-background" color="white" size="100px" @click="onChangeEye"/>

        <van-icon name="passed" class="icon-background" color="white" size="100px" style="margin-right: 30px"
                  @click="onDownload"/>
      </div>
    </div>
  </div>
</template>

<style>
  .bar-image {
    width: 100vw;
    height: 140vw;
    background-color: rgba(0, 0, 0, 0.85)
  }

  .top-bar {
    width: 100vw;
    height: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-div {
    width: 100vw;
    height: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image {
    width: 95%;
    height: 95%;
    box-shadow: 10px 5px 5px black;
    border-radius: 5px;
  }

  .bottom-bar {
    width: 100vw;
    height: 20vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon-background {
    /*background-color: white;*/
    /*border-radius: 50%;*/
    /*box-shadow: 10px 5px 5px black;*/
  }

</style>

<script>

  export default {
    data() {
      return {
        showPopover: false,
        // 通过 actions 属性来定义菜单选项
        actions: [{text: '上传'}, {text: '下载'}, {text: '重置'}],
        checked: true,
        eyeOpened: false,
        oriImagePath: 'https://s3.ax1x.com/2020/12/04/DH4AFU.jpg',
        resImagePath: 'https://s3.ax1x.com/2020/12/04/DbJAsI.png',
        showImagePath: 'https://s3.ax1x.com/2020/12/04/DH4AFU.jpg'
      };
    },
    methods: {
      onClickLeft() {
        console.log('返回');
      },
      onClickRight() {
        console.log('按钮');
      },
      onSelect(action) {
        Toast(action.text);
      },
      onChangeEye() {
        this.eyeOpened = !this.eyeOpened
        if (this.eyeOpened) {
          this.showImagePath = this.resImagePath
        } else {
          this.showImagePath = this.oriImagePath
        }
      },
      onClose() {
        alert('关闭页面')
      },
      onDownload() {
        console.log('开始下载')
        this.$axios({
          method: "get",
          url: "http://221.226.81.54:1212/api/contents",
          params: {
            page: 1,
            size: 1,
            category: 'COCO'
          }
        }).then(res => {
          let content_id = res.data.content_ids[1]
          // console.log(content_id)
          this.$axios({
            method: "get",
            url: "http://221.226.81.54:1212/api/contents/" + content_id,
            responseType: 'arraybuffer',
            params: {
              asAttachment: false,
              width: 512,
              height: 512,
              category: 'COCO',
            }
          }).then(res => {
            // console.log(res)
            // saveAs(res.data, 'abc.png')
            var src='data:image/jpg;base64,'+ btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            var link = document.createElement('a');
            link.href = src;
            link.download = "qrCode.jpg";
            link.click();
            this.$toast.success('已保存')
          })
        })
      },
    },
  };
</script>


