---
slug: /zeus-q/jingtaiip
---

## 修改静态ip

1. 使用type-C接口数据线连接边缘服务器

2. 通过串口工具打开

   ```
   用户名：user
   密码：myt
   root权限密码：myt
   ```

3. 查看当前使用网段和网关

   查看名称

   ```
   nmcli dev                               #查看当前网络在networking管理下的名称
   ```

   输出例如：

   ```
   DEVICE       TYPE      STATE      CONNECTION
   eth0         ethernet  connected  Wired connection 1
   ```

   查看网段和网关

   ```
    nmcli con show "Wired connection 1"
   ```

   例如：

   ```
   GENERAL.NAME:                           Wired connection 1 #请以自行查看内容为准
   
   IP4.ADDRESS[1]:                         10.10.xx.xx/16 #请以自行查看内容为准
   IP4.GATEWAY:                            10.10.0.1 #请以自行查看内容为准
   ```

4. 修改为静态ip

   命令行修改

   ```
   nmcli con modify <GENERAL.NAME> ipv4.method manual ipv4.addresses <自行设置在当前网段下的ip> ipv4.gateway <IP4.GATEWAY>
   ```

   例如：

   ```
   nmcli con modify "Wired connection 1" ipv4.method manual ipv4.addresses 10.10.2.200 ipv4.gateway 10.10.0.1
   ```

5. 重启网络连接应用设置

   ```
   nmcli con down <GENERAL.NAME>
   nmcli con up <GENERAL.NAME>
   ```

   
### 修改静态ip为动态ip

```
nmtui
```

依次选择

```
Edit a connection

<GENERAL.NAME>                  #例如 Wired connection 1

将IPv4 CONFIGURATION 中<Manual>改选为<Automatic>
将Addresses <remove> #选中<remove>后回车

下选到<ok>回车完成设置

<Back>
<Quit>
```

重启网络连接应用设置

```
nmcli con down <GENERAL.NAME>
nmcli con up <GENERAL.NAME>
```


