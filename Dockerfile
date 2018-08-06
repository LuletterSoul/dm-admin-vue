FROM node:6.14.3-slim as build-vue
MAINTAINER XiangDe Liu <qq313700046@icloud.com>
VOLUME /tmp
WORKDIR /build/vue
COPY . /build/vue
RUN  npm install \
    && npm run build

FROM tomcat as dm-ui
MAINTAINER XiangDe Liu <qq313700046@icloud.com>
VOLUME /tmp
COPY --from=build-vue /build/vue/dist /usr/local/tomcat/webapps/data_mining_platform
EXPOSE 8080

