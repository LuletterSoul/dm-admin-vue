<template>
    <div>
        <image-previewer v-if="show_type==='image'" v-bind:image_info="show_info" @onChangeView="onChangeView"></image-previewer>
        <VideoPreviewer v-if="show_type==='video'" v-bind:video_info="show_info" @onChangeView="onChangeView"></VideoPreviewer>
    </div>
</template>

<script>
    import ImagePreviewer from "../image-show"
    import VideoPreviewer from "../video-show"

    export default {
        name: 'Stylization',
        // components: {ImagePreviewer},
        // components: {VideoPreviewer},
        components: {ImagePreviewer, VideoPreviewer},

        data() {
            return {
                show_type: 'video',
                show_info: {
                    completed: true,
                    viewRes: false,
                    oriInfo: {
                        video: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                        thumbnail: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                        source: 'https://s3.ax1x.com/2020/12/04/DH4AFU.jpg'
                    },
                    stylizedInfo: {
                        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        thumbnail: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                        source: 'https://s3.ax1x.com/2020/12/04/DbJAsI.png'
                    }
                }
            }
        },
        methods: {
            onChangeView(){
                this.show_info.viewRes = !this.show_info.viewRes
            }
        }

    }
</script>