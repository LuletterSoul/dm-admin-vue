<template>
  <div ref="__container_id">
    <van-row
      type="flex"
      class="content_row"
      justify="space-between"
      gutter="10"
      v-for="(row, row_index) in _img_matrix"
      :key="'__row_index_' + row_index"
    >
      <van-col :span="_span" v-for="(img, col_index) in row" :key="col_index">
        <single-transition
          :in-style="'transition.fadeIn'"
          :out-style="'transition.fadeOut'"
        >
          <div
            class="auto_img"
            :ref="'__col_id_' + (col * row_index + col_index)"
          >
            <van-image
              fit="cover"
              :width="width"
              :src="img"
              @click="onClick(col * row_index + col_index)"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
        </single-transition>
      </van-col>
    </van-row>
  </div>
</template>

<script>
// import AnimateTransition from "@/components/AnimateTransition";
import SingleTransition from "@/components/SingleTransition";
export default {
  name: "ImgContent",
  components: {
    SingleTransition,
  },
  props: {
    imgs: {
      type: Array,
      default: () => {
        return [];
      },
    },
    width: {
      type: [Number, String],
      default: "100%",
    },
    height: {
      type: [Number, String],
      default: "100%",
    },
    col: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      containerWidth: 0,
    };
  },

  mounted() {},

  computed: {
    _span() {
      return Math.floor(24 / this.col);
    },
    _img_matrix() {
      let len = this.imgs.length;
      let matrix = [];
      if (len) {
        let row = Math.floor(len / this.col);
        for (let i = 0; i < row; i++) {
          let row = [];
          for (let j = 0; j < this.col; j++) {
            row.push(this.imgs[i * this.col + j]);
          }
          matrix.push(row);
        }
        if (row * this.col < len) {
          matrix.push(this.imgs.slice(this.col * row));
        }
        return matrix;
      }
      return [];
    },
  },

  methods: {
    onLoad(index) {
      console.log(index);
    },
    onClick(index) {
      this.$emit("onClickImg", index);
    },
  },
};
</script>

<style lang="less">
.content_row {
  margin-top: 10px;
}

.img_container {
  margin: 1px;
}

.autoimg {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}
.autoimg img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
