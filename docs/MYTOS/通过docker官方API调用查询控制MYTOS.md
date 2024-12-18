魔云腾自研**安卓智能计算节点**中，docker作为控制管理容器安卓的中间件起着重要作用

我们选择docker主要原因 是其生态完善 

省去了很多开发周期 

我带大家进一步了解docker 



1. 我们要知道盒子的IP地址

2. 默认情况下我们已经打开了 2375端口 

​	该端口是docker api 默认的  



上述条件都满足后可以通过 docker api查询或者控制容器了

 docker api 官方文档：https://docs.docker.com/engine/api/v1.41/ 

1.41 是盒子内运行的docker版本 后续发布新的固件会足部升级

举例：

- **查询盒子内docker版本信息等等 http://ip:2375/version**   

 ![img](/img/zskp/da1.png)

- **查询盒子内运行容器详细信息等等 http://ip:2375/containers/json**       

 ![img](/img/zskp/da2.png)


**更多接口查询docker官方API文档即可实现**

**魔云腾所有客户端均可以通过docker官方API实现无第三方修改定制**