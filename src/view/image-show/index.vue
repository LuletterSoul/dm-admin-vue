<template>
    <div>
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
                    <van-image v-bind:src="_showImageUrl" style="width: 100%; height: 100%;">
                    </van-image>
                </div>
            </div>
            <!--      bottom bar-->
            <div class="bottom-bar">
                <van-icon name="close" class="icon-background" color="white" size="50px" style="margin-left: 30px"
                          @click="onClose"/>
                <van-icon v-if="_eyeOpened" name="eye-o" class="icon-background" color="white" size="50px"
                          @click="onChangeEye"/>
                <van-icon v-else name="closed-eye" class="icon-background" color="white" size="50px"
                          @click="onChangeEye"/>

                <van-icon name="passed" class="icon-background" color="white" size="50px" style="margin-right: 30px"
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
        name: 'ImagePreviewer',
        props: {
            image_info: {
                type: Object,
                default: () => {
                    return {
                        completed: false,
                        viewRes: true,
                        oriInfo: {
                            video: '',
                            thumbnail: '',
                            source: 'https://s3.ax1x.com/2020/12/04/DH4AFU.jpg'
                        },
                        stylizedInfo: {
                            video: '',
                            thumbnail: '',
                            source: 'https://s3.ax1x.com/2020/12/04/DbJAsI.png'
                        }
                    }
                }
            }
        },
        data() {
            return {

            }
        },
        computed: {
            _showImageUrl(){
                return (this.image_info.completed && this.image_info.viewRes) ? this.image_info.stylizedInfo.source : this.image_info.oriInfo.source
            },
            _eyeOpened(){
                return this.image_info.completed && this.image_info.viewRes
            }

        },
        methods: {
            onChangeEye() {
                if (this.image_info.completed) {
                    this.$emit('onChangeView')
                } else {
                    this.$toast.fail('图片尚未渲染完成!')
                }
            },
            onClose() {
                alert('关闭页面')
            },
            onDownload() {
                this.$axios({
                    method: "get",
                    url: this._showImageUrl,
                    responseType: 'arraybuffer',
                    params: {
                        asAttachment: false,
                        width: 512,
                        height: 512,
                        category: 'COCO',
                    }
                }).then(res => {
                    var src = 'data:image/jpg;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                    var link = document.createElement('a');
                    link.href = src;
                    var timestamp = Date.parse(new Date())
                    link.download = timestamp + '.jpg';
                    link.click();
                    this.$toast.success('已保存')
                })
            },
        },
    };
</script>


