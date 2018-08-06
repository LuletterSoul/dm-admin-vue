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

#建一个基于tomcat的界面服务器
#只包括静态资源的镜像
#see 对阶段构建 https://docs.docker.com/develop/develop-images/multistage-build/
#see 从零出发 https://docs.docker.com/develop/develop-images/baseimages/#create-a-simple-parent-image-using-scratch
FROM tomcat:7.0-slim as dm-ui
MAINTAINER XiangDe Liu <qq313700046@icloud.com>
VOLUME /tmp
#将打包的静态资源加入到tomcat启动目录
COPY --from=build-vue /build/vue/dist /usr/local/tomcat/webapps/data_mining_platform
EXPOSE 8080
CMD ["catalina.sh", "run"]



