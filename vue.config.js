module.exports = {
  outputDir: "dist",
  publicPath: process.env.NODE_ENV === "production" ? "dm-admin-vue/" : "/",
  devServer: {
    port: 9527,
    public: "http://221.226.81.54/:1211",
    watchOptions: {
      poll: true,
    },
  },
};
