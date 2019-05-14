<template>
  <div class="em-placeholder">
    <transition name="fade">
      <Row type="flex" justify="center">
        <Col span="24">
          <div :style="_placeholderStyle" v-show="visible">
            <slot></slot>
          </div>
        </Col>
      </Row>
    </transition>
  </div>
</template>

<style scoped>
  @import './index.css';
</style>

<script>
  export default {
    name: 'EmPlaceholder',
    props: {
      colSpan: {
        type: Number,
        default: 12
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: Number,
        default: 200
      },
      fontSize: {
        type: String,
        default: '22px'
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: false
      }
    },
    mounted() {
      this.handleVisible()
    },
    computed: {
      _placeholderStyle() {
        return {
          textAlign: 'center',
          fontSize: this.fontSize,
          color: '#d5d5d5',
          position: 'absolute',
          width: '100%',
          // width: this.width,
          // height: this.height,
          top: this.height / 2 +'px'
        }
      }
    },
    watch: {
      show: 'handleVisible'
    },
    methods: {
      handleVisible() {
        setTimeout(() => {
          this.visible = this.show
        }, 500)
      }
    }
  }
</script>
