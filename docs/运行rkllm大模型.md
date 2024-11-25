## 运行rkllm大模型

+++

### 1 使用SSH链接进魔云腾主机

接入usb接口，使用串口查看主机内容，使用刚才设置的用户名，以及密码登录ubuntu。

查看魔云腾主机ip

```
ifconfig
```

![ubuntu22.04二.1.png](/img/ubuntu22.04二.1.png)

```
 ssh <username>@<ip>                                    #username为用户名，ip为刚才查看的ip
```

输入密码后可直接链接进入



### 2 安装docker

检查卸载老版本Docker

```
sudo apt-get remove docker docker-engine docker.io containerd runc
```

更新软件包

```
sudo apt-get update
sudo apt-get upgrade -y
```

安装docker依赖

```
sudo apt-get install ca-certificates curl gnupg lsb-release -y
```

添加docker密钥

```
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

添加阿里云docker软件源

```
sudo apt install software-properties-common -y
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt-get update
```

安装docker

```
apt-get install docker-ce docker-ce-cli containerd.i -y
```

ubuntu 22.04默认使用nftables作为防火墙，而非iptables。此处需要将nfttables改为iptables

```
sudo update-alternatives --set iptables /usr/sbin/iptables-legacy
```

使用清华大学的docker镜像源

打开 Docker 的配置文件 `/etc/docker/daemon.json`（如果文件不存在则需要创建），添加以下内容：

```
{
  "registry-mirrors": ["https://docker.mirrors.tuna.tsinghua.edu.cn"]
}
```

### 3 切换到su权限下

```
su
```

输入密码，切换到su权限下（ubuntu系统下输入密码时并无任何提示，输入密码后直接回车即可）

### 4 拉取docker镜像运行rkllm大模型

运行以下命令

```
docker run -itd --pull=always -v /dev/mali0:/dev/mali0 \
--device /dev/dri -p 8080:8080 --cap-add=CAP_SYS_ADMIN \
--device /dev/mali0 --name rkllm \
registry.cn-hangzhou.aliyuncs.com/mytrkllm/mytllm:v2-20240614 \
/root/run.sh
```

:::tip

请确保`g610`版本兼容，且确保`/usr/lib/firmware`目录下有`mali_csffw.bin`固件，否则运行时会出现固件报错

:::

### 5 打开主机IP+：8080端口，访问demo控制台

如下图：

![ubuntu22.04二.2.png](/img/ubuntu22.04二.2.png)