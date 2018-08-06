#使用node.js对vue项目进行编译打包
FROM node:6.14.3-slim as build-vue
MAINTAINER XiangDe Liu <qq313700046@icloud.com>
VOLUME /tmp
WORKDIR /build/vue
#将工程代码负责进容器中
COPY . /build/vue
#先安装依赖,再进行打包
RUN  npm install \
    && npm run build

#建一个(最小的容器)
#只包括静态资源的镜像
#see 对阶段构建 https://docs.docker.com/develop/develop-images/multistage-build/
#see 从零出发 https://docs.docker.com/develop/develop-images/baseimages/#create-a-simple-parent-image-using-scratch
FROM scratch as dm-ui
MAINTAINER XiangDe Liu <qq313700046@icloud.com>
#将node.js打包生成的静态资源移进容器中
COPY --from=build-vue /build/vue/dist /ui

