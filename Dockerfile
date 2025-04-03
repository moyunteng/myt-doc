# 使用 Nginx 作为生产环境镜像（第二阶段）
FROM nginx:alpine

# 移除默认的 Nginx 配置
RUN rm -rf /usr/share/nginx/html/*

# 复制构建好的静态文件到 Nginx 目录
COPY ./build /usr/share/nginx/html/myt-doc/

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]