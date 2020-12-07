<!--<script src="../../router.js"></script>-->
<template>
    <div>
        <image-previewer v-if="_showType==='photo'" v-bind:oriInfo="_oriInfo" v-bind:stylizedInfo="_stylizedInfo"
                         v-bind:completed="_completed" v-bind:viewRes="viewRes"
                         @onChangeView="onChangeView"></image-previewer>
        <VideoPreviewer v-if="_showType==='video'" v-bind:oriInfo="_oriInfo" v-bind:stylizedInfo="_stylizedInfo"
                        v-bind:completed="_completed" v-bind:viewRes="viewRes"
                        @onChangeView="onChangeView"></VideoPreviewer>
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
        props: {
            showType: {
                type: String,
                default: 'photo'
            },
            completed: {
                type: Boolean,
                default: false
            },
            oriInfo: {
                type: Object,
                default: () => {
                    return {
                        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
        computed: {
            _showType() {
                return this.showType
                // return this.$route.query.showType
            },
            _completed(){
                return this.completed
                // return this.$route.query.completed==='true'
            },
            _oriInfo() {
                return this.oriInfo
                // return this.$route.query.oriInfo
            },
            _stylizedInfo() {
                return this.stylizedInfo
                // return this.$route.query.stylizedInfo
            },
        },
        data() {
            return {
                viewRes: false,
                // stylizedInfo: {
                //     video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                //     thumbnail: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                //     source: 'https://s3.ax1x.com/2020/12/04/DbJAsI.png'
                // },
                // oriInfo: {
                //     video: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                //     thumbnail: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                //     source: 'https://s3.ax1x.com/2020/12/04/DH4AFU.jpg'
                // },
            }
        },
        methods: {
            onChangeView() {
                this.viewRes = !this.viewRes
            }
        }

    }
</script>