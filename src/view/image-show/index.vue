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
                    <van-image v-bind:src="_showImageUrl" fit="contain" width="100%" height="100%">
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
    import axios from 'axios'
    import { saveAs } from 'file-saver'

    export default {
        name: 'ImagePreviewer',
        props: {
            completed: {
                type: Boolean,
                default: false
            },
            viewRes: {
                type: Boolean,
                default: false
            },
            oriInfo: {
                type: Object,
                default: () => {
                    return {
                        video: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                        thumbnail: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                        source: 'https://s3.ax1x.com/2020/12/04/DH4AFU.jpg'
                    }
                }
            },
            stylizedInfo: {
                type: Object,
                default: () => {
                    return {
                        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        thumbnail: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                        source: 'https://s3.ax1x.com/2020/12/04/DbJAsI.png'
                    }
                }
            },
        },
        data() {
            return {}
        },
        computed: {
            _showImageUrl() {
                return (this.completed && this.viewRes) ? this.stylizedInfo.source : this.oriInfo.source
            },
            _eyeOpened() {
                return this.completed && this.viewRes
            }

        },
        methods: {
            onChangeEye() {
                if (this.completed) {
                    this.$emit('onChangeView')
                } else {
                    this.$toast.fail('图片尚未渲染完成!')
                }
            },
            onClose() {
                this.$router.back()
            },
            onDownload() {
                axios({
                    method: "get",
                    url: this._showImageUrl,
                    responseType: 'blob'
                }).then(res => {
                    var timestamp = Date.parse(new Date())
                    var filename = timestamp + '.jpg'
                    saveAs(res.data, filename)
                }).catch((error)=>{
                    console.log(error)
                    this.$toast.fail({
                        message: '下载失败!',
                        forbidClick: true
                    })
                }).finally(()=>{
                    this.$toast.success({
                        message: '下载成功!',
                        forbidClick: true
                    })
                })
            }
        },
    };
</script>


