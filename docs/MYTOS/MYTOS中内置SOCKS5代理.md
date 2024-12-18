MYTOS中内置了tun2socks go版本SOCKS5客户端

可通过HTTP接口GET方式调用查询

从MYTOS-12-v23.4版本开始支持

网桥模式:

每个安卓接口端口固定9082

非网桥模式请遵循以下规则请求端口：

当Android共享ip时 ip为当前主机ip port为动态计算得出

计算方法为: 第一个Android容器实例 10005 第二个 10008 第三个 10011 .... 以此类推 公式为 (索引下标-1) *3 + 10005


查询：

```
curl "http://127.0.0.1:9082/proxy?cmd=1"
```

停止：

```
curl "http://127.0.0.1:9082/proxy?cmd=3"
```

:::warning

curl执行该命令必须把url加**上英文双引号**！

:::

**增加**：

域名支持

```
curl "http://127.0.0.1:9082/proxy?cmd=2&type=2&ip=192.168.31.186&port=7890&usr=&pwd="
```



**从23.5.5开始支持：**

不代理cip.cc域名

```
curl "http://127.0.0.1:9082/proxy?cmd=4" -X POST -d "["cip.cc"]"
```

恢复默认(代理全部)

```
curl "http://127.0.0.1:9082/proxy?cmd=4" -X POST -d "[]"
```

通过docker创建按照的时候设置代理

创建配置

androidboot.s5 type=2

androidboot.s5 ip=192.168.3.2

androidboot.s5 port=1080

androidboot.s5 usr=zhanghao

androidboot.s5 pwd=mima



