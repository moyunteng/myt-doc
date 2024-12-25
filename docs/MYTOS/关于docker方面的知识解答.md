---
slug: /MYTOS/dockerjd
---
很多同学在收到货以后都在群里问怎么控制容器的开启 关闭 和数据备份等相关问题.那么我就把我们魔云腾Zeus 系列 关于主机docker 这一块的文档给大家说明下.   

​ ![img](/img/zskp/d1.png)

Android远程控制管理软件软件对Android实例容器的创建都是通过[docker API](https://docs.docker.com/engine/api/v1.42/) 创建的,上图为当前管理端软件的 结构示意图,如果大家需要实现对android 实例的管理 以及资源的管理进行相关操作的话 都可以通过调用docker api 来实现,包括针对android容器实例 映射特殊的端口 文件夹等 同时也可以ssh 登录到主机 通过docker 命令行来操作.

Android远程控制管理软件只提供了一个通用的方法创建了Android实例, 映射了一个控制Android的端口到主机上,其他的参数大家都可以自行通过API或者命令行来自定义.

下面就介绍一下docker 中具体的操作:

1 创建Android容器

使用命令行创建Android 容器(此命令与群控端上创建的方式完全相同)

```
docker run -itd --rm --privileged \         #以特权模式运行 
--pull always \                     #重启主机后docker容器自动启动 
-v /mmc/docker/myt_data1/data:/data \         #映射 主机的/mmc/docker/myt_data1/data 到 Android /data目录 
-v /dev/net/tun:/dev/tun \              #vpn需要用到 
-v /dev/mali0:/dev/mali0 \              #显卡节点 
-p 5501:5555 \                     #将adb端口映射到主机的5501端口 
-p 10000:10000 \                    #群控端使用
-p 10001:10001/udp \                  #群控端使用 
-p 10002:9082  \                   #群控端使用 
--name 1001 \                      #容器的名称 
registry.cn-hangzhou.aliyuncs.com/whsyf/dobox:rk3588-202303011 #容器的镜像地址
```

上述命令就可以成功的创建创建了一个android 容器实例 并立即运行

执行上述命令后可以在 终端中输入  

```
docker ps #查看当前运行中的容器

docker ps -a #查看当前所有的容器 包括运行和停止的容器
```

[docker api](https://docs.docker.com/engine/api/v1.42/#tag/Container/operation/ContainerList)

![img](/img/zskp/d2.png)

```
docker stop <容器实例名称>
```

是停止运行中的容器 例如下述命令就是讲上面创建的1001容器停止

```
#停止容器
docker stop 1001
#再此启动容器
docker start 1001
#删除容器   该命令只能删除已经停止了的容器
docker rm 1001
```

对应的docker api: 

[start](https://docs.docker.com/engine/api/v1.42/#tag/Container/operation/ContainerStart)

[stop](https://docs.docker.com/engine/api/v1.42/#tag/Container/operation/ContainerStop)

[rm](https://docs.docker.com/engine/api/v1.42/#tag/Container/operation/ContainerDelete)(貌似官方删除了此方法)

[restart](https://docs.docker.com/engine/api/v1.42/#tag/Container/operation/ContainerRestart) 

容器处于停止状态时是不会消耗主机系统资源的,所以可以根据具体的业务场景来动态的调度Android容器实例

上述所有的命令都可以通过docker api 实现调度 对于各位脚本大神来说 就已经明白Android 容器的使用方法了吧 可以自己通过api 来自由的调度Android 容器实例了

更多的方法可以直接访问 docker [官方文档](https://docs.docker.com/engine/api/v1.42/#tag/Container/o2) Android 容器中数据的存储

上面已经介绍了Andorid 容器实例的相关操作,这里在介绍一下数据的处理. 

Android容器中所有的用户操作的数据都存放在/data 目录 也就是上面我们映射过的主机-v /mmc/docker/myt_data1/data:/data

你就可以理解成 Android容器实际是计算和存储是分离的两部分, 所有的android系统的数据都存放在/mmc/docker/myt_data1/data 这个目录 

当你把主机容器关闭后可以将该目录下的数据做冷备份,迁移,打包压缩到云盘等操作都可以, 等你需要使用该Android数据的时候 只需要解压出来然后启动android容器时重新映射到Android /data 目录下即可 这样就实现了Android容器的全息备份