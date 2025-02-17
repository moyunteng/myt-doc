---
slug: /android/frp
---
## [网络相关] 使用frp穿透工具实现魔云腾公网访问使用

### 服务端

Debian 12.5 64位 X86 安装**frps**服务端教程 下载固件包

下载amd64架构的frp固件包

```
wget https://github.com/fatedier/frp/releases/download/v0.61.1/frp_0.61.1_linux_amd64.tar.gz
```

```
tar -zxvf frp_0.61.1_linux_amd64.tar.gz
mv frp_0.61.1_linux_amd64 frp
mv frp /usr/local
chmod -R 777 /usr/local/frp
```

编辑frps.toml文件

```
# 服务端绑定的端口，用于客户端与服务端通信的核心端口。需要确保该端口对外网开放。
bindPort = 7000
 
# HTTP 代理的虚拟主机端口。用于通过域名访问客户端的 HTTP 服务，需配置 DNS。
vhostHTTPPort = 80
 
# HTTPS 代理的虚拟主机端口。用于通过域名访问客户端的 HTTPS 服务，需配置 DNS。
vhostHTTPSPort = 443
 
# 密钥，是自定义的，想怎么填写就怎么填写，但客户端和服务端必须保持一致，确保安全通信。
auth.token = "xxxxxxx"
```

编辑service

```
sudo vim /etc/systemd/system/frps.service
```

输入以下内容

```
[Unit]
Description=FRP Server
After=network-online.target
Wants=network-online.target
[Service]
User=frp
WorkingDirectory=/usr/local/frp
ExecStart=/usr/local/frp/frps -c /usr/local/frp/frps.toml
Environment=FRP_LOG_LEVEL=info
Restart=always
RestartSec=5s
StandardOutput=journal
StandardError=journal
[Install]
WantedBy=multi-user.target
```

```
# 重载配置使其生效
systemctl daemon-reload
# 启动 frps 服务
systemctl start frps.service
# 设置开机自启
systemctl enable frps.service
```



### 客户端

MYTOS下配置frpc客户端教程

使用ssh工具登录魔云腾

ssh账号密码

```
普通用户名：user
普通用户密码：myt
ROOT用户密码：myt
```

下载arm64架构的frp固件包

```
wget https://github.com/fatedier/frp/releases/download/v0.61.1/frp_0.61.1_linux_arm64.tar.gz
```

注意此处架构不同，和服务端处下载内容不同

```
tar -zxvf frp_0.61.1_linux_arm64.tar.gz
mv frp_0.61.1_linux_arm64 frp
mv frp /usr/local
chmod -R 777 /usr/local/frp
```

编辑frpc.toml文件

```
serverAddr = "192.168.xxx.xxx"
serverPort = 7000 # 服务端口
auth.method = "token" # 密钥，需要和服务端 frps 配置一致
auth.token = "xxxxxxx"

#frpc日志，可以自行定义路径但是文件名为frpc.log
log.to = "/path/to/frpc.log"
log.level = "info"
log.maxDays = 3
# disable log colors when log.to is console, default is false
log.disablePrintColor = false
       
#配置每个内网服务
[[proxies]]
name = "myt-tcp"
type = "tcp"
localIP = "192.168.xxx.xxx" #映射ip地址
localPort = 8003 #家用服务器上暴露的端口
remotePort = 1234 #外网服务器上暴露的端口，ssh时候，使用外网 IP 和这个端口可以远程访问家里的服务
```

编辑service

```
sudo vim /etc/systemd/system/frps.service
```

输入以下内容

```
[Unit]
Description=FRP Server
After=network-online.target
Wants=network-online.target
[Service]
User=frp
WorkingDirectory=/usr/local/frp
ExecStart=/usr/local/frp/frps -c /usr/local/frp/frps.toml
Environment=FRP_LOG_LEVEL=info
Restart=always
RestartSec=5s
StandardOutput=journal
StandardError=journal
[Install]
WantedBy=multi-user.target
```

```
# 重载配置使其生效
systemctl daemon-reload
# 启动 frps 服务
systemctl start frps.service
# 设置开机自启
systemctl enable frps.service
```

### 启动frp

1. 使用以下命令启动服务器：`./frps -c ./frps.toml`。
2. 使用以下命令启动客户端：`./frpc -c ./frpc.toml`。

## 魔云趣联配置

![image-1](/img/android/frp1.jpg)![image-2](/img/android/frp2.jpg) ![image-3](/img/android/frp3.png) 

1. 打开魔云趣联，点击设备，如标号1，找到需要远程映射的设备点击设置，如标号2
2. 点击远程映射
3. 填写映射ip及端口



使用ssh工具登录魔云腾

ssh账号密码

```
ssh user@192.168.xxx.xxx
```

切换root权限

```
su 
#输入密码切换为root权限

#查看所需要的远程映射设备的端口
docker ps#输出如下图
```

![image-20250208182932733](/img/android/frp4.png)

### 将映射安卓10000端口的端口配置在客户端的frpc.toml配置文件中

```
#例如
#配置每个内网服务
[[proxies]]
name = "myt-tcp" #代理名称，随意编辑，需确保不与其他代理名称重复
type = "tcp" #如图类型为tcp
localIP = "192.168.xxx.xxx" #映射ip地址
localPort = 10003 #映射安卓10000端口的端口
remotePort = 1234 #随意填写在服务端映射的端口，需确保端口未被使用
```

### 同理将映射安卓10001端口的端口配置在客户端的frpc.toml配置文件中

```
#例如
#配置每个内网服务
[[proxies]]
name = "myt-udp" #代理名称，随意编辑，需确保不与其他代理名称重复
type = "udp" #如图类型为udp
localIP = "192.168.xxx.xxx" #映射ip地址
localPort = 10004 #映射安卓10001端口的端口
remotePort = 2345 #随意填写在服务端映射的端口，需确保端口未被使用
```

### 将映射安卓9082端口的端口配置在客户端的frpc.toml配置文件中

```
#例如
#配置每个内网服务
[[proxies]]
name = "myt-image" #代理名称，随意编辑，需确保不与其他代理名称重复
type = "udp" #如图类型为udp
localIP = "192.168.xxx.xxx" #映射ip地址
localPort = 10005 #映射安卓9082端口的端口
remotePort = 3456 #随意填写在服务端映射的端口，需确保端口未被使用
```

### 配置板卡docker端口

```
[[proxies]]
name = "myt-control" #代理名称，随意编辑，需确保不与其他代理名称重复
type = "tcp"
localIP = "192.168.xxx.xxx" #映射ip地址
localPort = 2375 #映射板卡的docker端口，这条请不要更改
remotePort = 4567 #随意填写在服务端映射的端口，需确保端口未被使用
```

### 配置示例

```
serverAddr = "192.168.xxx.xxx"
serverPort = 7000
auth.method = "token"
auth.token = "myt20250210"

log.to = "/usr/local/frp/frpc.log"
log.level = "info"
log.maxDays = 3
# disable log colors when log.to is console, default is false
log.disablePrintColor = false
                        
[[proxies]]
name = "myt-tcp"
type = "tcp"
localIP = "192.168.xxx.xxx"
localPort = 10003
remotePort = 1234

[[proxies]]
name = "myt-udp"
type = "udp"
localIP = "192.168.xxx.xxx"
localPort = 10004
remotePort = 2345

[[proxies]]
name = "myt-image"
type = "tcp"
localIP = "192.168.xxx.xxx"
localPort = 10005
remotePort = 3456

[[proxies]]
name = "myt-control"
type = "tcp"
localIP = "192.168.xxx.xxx"
localPort = 2375
remotePort = 4567
```

### 填写映射ip及端口示例

![image-1](/img/android/frp5.jpg)

1、服务端ip   

2、3、4、5、如上述步骤中填写对应的remotePort



客户端frpc.toml文档参考[frpc_full_example.toml](https://github.com/fatedier/frp/blob/dev/conf/frpc_full_example.toml)

服务端frps.toml文档参考[frps_full_example.toml](https://github.com/fatedier/frp/blob/dev/conf/frps_full_example.toml)

frp官方文档[文档 | frp](https://gofrp.org/zh-cn/docs/)