# Ubuntu使用

该文件系统基于ubuntu22.04版本构建，使用方法与ubuntu22.04相同

### 1.系统默认配置

:::tip[登入系统的用户名和密码]


ssh用户名：**myt**

密码：**123456**


:::

### 2.ssh方法
```
ssh <用户名>@<主机ip地址>
例如： ssh myt@192.168.xxx.xxx
```


:::tip[获取ip]

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="oled" label="oled(推荐)" default>
    通过查看oled获取主机ip地址
  </TabItem>
  <TabItem value="chuankou" label="串口">
    通过串口调试，进入并登录后使用ifconfig获取主机ip地址
  </TabItem>
</Tabs>
:::


如果是第一次登录远程主机，系统会给出下面提示：
```
The authenticity of host 192.168.xxx.xxx(192.168.xxx.xxx)'can't be established.
ECDSA key fingerprint is SHA256:FFobshqrG0achj7Xp4LsJ9+xkNBlyy0e8ZIP17K+qQI.
Are you sure you want to continue connecting(yes/no)?
```
请直接输入yes。

### 3.添加新用户

:::tip[注意：]

请登录到root用户

:::

```
adduser <用户名>
```

修改 /etc/sudoers 文件，用于控制哪些用户可以以超级管理员（root）的身份执行特定的命令。

```
# 编辑 /etc/sudoers 
vim /etc/sudoers
```

在`root      ALL=(ALL:ALL) ALL`下添加以下内容

```
<用户名>      ALL=(ALL:ALL) ALL
```

### 4.挂载硬盘，并开机自动挂载

#### 挂载硬盘

```
df -h #查看磁盘是否挂载
lsblk #观察磁盘分区状态
```

对比查看未挂载的硬盘。

```
mkfs.ext4 /dev/nvme0xxx 将硬盘格式化为ext4格式

#运行命令行代码后，会显示以下内容确认
/dev/nvme0xxx contains a ext4 file system
        last mounted on /mmc on Thu Jan  1 00:00:12 1970
Proceed anyway? (y,N)
#输入y并回车，完成硬盘格式化
```

将格式化后的硬盘挂载到指定目录下

```
mount /dev/nvme0xxx <指定目录>
```

再次查看磁盘是否挂载

```
df -h
```

#### 设置开机自动挂载

```
blkid #查看硬盘的UUID
```

![UUID](/img/UUID.png)




```
# 进入 fstab 修改配置
sudo vim /etc/fstab
```

 在文件尾部添加

```
UUID=2fd18098-xxxx-xxxx-xxxx-xxxxxxxxxxx  /app  ext4  defaults  0  0
```

wq 保存退出

**`sudo reboot`  重启电脑**

**`df -h`  查看挂载情况**

### 5.docker 迁移挂载到新的磁盘分区

当Docker默认的数据目录`/var/lib/docker`在固态盘空间不足时，可以通过以下步骤将其迁移到机械盘：

1. 查看docker默认目录的方法

   ```
   docker info
   # Docker Root Dir: /var/lib/docker
   ```

   

2. 停止docker服务并移动原有docker文件到新目录

   ```
   # 这里会有个socket存在, 需要把socket也关闭
   systemctl stop docker.service
   
   # 移动docker的数据到新的地方 
   # ps: 挂在的新硬盘的格式需要为 aufs格式, 否则无法正常启动容器
   # mount -t aufs ...
   mv /var/lib/docker <迁移目录>
   ```

   

3. 重新设置 Docker Root Dir

   两种方式任选其一

   更改配置文件

   ```
   vi /usr/lib/systemd/system/docker.service
   # 在 ExecStart=/usr/bin/dockerd 后追加 --data-root=<迁移目录>, 注意如果本来后面有其他参数不要搞乱了
   # 示例如下
   ExecStart=/usr/bin/dockerd --data-root=<迁移目录> -H fd:// --containerd=/run/containerd/containerd.sock
   
   ```

   更改daemon.json

   ```
   # 没有可以手动创建
   /etc/docker/daemon.json
   
   # 个人配置如下
   {
       "data-root":"<迁移目录>",
       
   }
   ```

   

4. 重新加载配置启动服务

   ```
   systemctl daemon-reload
   systemctl start docker.service
   ```

### 6.设置静态ip

1. 打开终端并输入以下命令以编辑网络配置文件：

```
sudo vim /etc/network/interfaces
```

2. 找到你要配置的网络接口（通常是 `eth0` 或 `ens33` 等），然后添加以下内容：

```
# Example for eth0 interface
auto eth0
iface eth0 inet static
    address 192.168.xxx.xxx      # 设置静态 IP 地址
    netmask 255.255.255.0      # 设置子网掩码
    gateway 192.168.xxx.1       # 设置网关
    dns-nameservers 8.8.8.8 8.8.4.4  # 设置 DNS 服务器

```

3. 保存并关闭文件后，重启网络服务以应用配置：

```
sudo systemctl restart networking
```

或者使用 `ifdown` 和 `ifup` 命令：

```
sudo ifdown eth0 && sudo ifup eth0
```

4. 使用`ifconfig` 命令来验证配置是否正确应用：

```
ifconfig
```



