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
        <div
          class="img_container"
          :ref="'__col_id_' + (col * row_index + col_index)"
        >
          <van-image
            fit="cover"
            :width="width"
            :height="_height"
            :src="img.thumbnail"
            @click="onClick(img)"
          />
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: {
    content_imgs: {
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

  mounted() {
    this.$nextTick(this.getContainerWidth);
  },

  computed: {
    _height() {
      return Math.floor(this.containerWidth * 0.28) + "px";
    },
    _span() {
      return Math.floor(24 / this.col);
    },
    _img_matrix() {
      let len = this.content_imgs.length;
      let matrix = [];
      if (len) {
        let row = Math.floor(len / this.col);
        for (let i = 0; i < row; i++) {
          let row = [];
          for (let j = 0; j < this.col; j++) {
            row.push(this.content_imgs[i * this.col + j]);
          }
          matrix.push(row);
        }
        if (row * this.col < len) {
          matrix.push(this.content_imgs.slice(this.col * row));
        }
        return matrix;
      }
      return [];
    },
  },

  methods: {
    onClick(img) {
      console.log(img.thumbnail);
    },
    getContainerWidth() {
      if (this.$refs.__container_id.clientWidth) {
        this.containerWidth = this.$refs.__container_id.clientWidth;
      } else {
        this.containerWidth = 350;
      }
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
</style>
