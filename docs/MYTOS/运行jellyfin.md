---
slug: /MYTOS/yxjellyfin
---
## 运行jellyfin

+++

###  在Linux主机上配置

Jellyfin所需的`jellyfin-ffmpeg`deb包附带所有必要的用户模式Rockchip MPP和RGA驱动程序。

除此之外，只需安装 OpenCL 运行时 （libmali） 并配置设备权限

### 1 安装所需安装包

新建`jellyfin`文件夹

```
mkdir jrllyfin
cd jrllyfin
```

下载所需的`jellyfin-server`、`jellyfin-web`和`jellyfin-ffmpeg7`

```
wget https://repo.jellyfin.org/files/server/ubuntu/latest-stable/arm64/jellyfin-server_10.10.0+ubu2204_arm64.deb
```

```
wget https://repo.jellyfin.org/files/server/ubuntu/latest-stable/arm64/jellyfin-web_10.10.0+ubu2204_all.deb
```

```
wget https://repo.jellyfin.org/files/ffmpeg/ubuntu/latest-7.x/arm64/jellyfin-ffmpeg7_7.0.2-5-jammy_arm64.deb
```

如无法下载请自行在官网下载并传到魔云腾主机端

安装

```
dpkg -i jellyfin-ffmpeg7_7.0.2-5-jammy_arm64.deb
dpkg -i jellyfin-server_10.10.0+ubu2204_arm64.deb
dpkg -i jellyfin-web_10.10.0+ubu2204_all.deb
```

### 2 确保`dma_heap`、`dri`、`mpp_service`和`rga`存在于`/dev`中

```
ls -l /dev | grep -E "mpp|rga|dri|dma_heap"
```

![ubuntu22.04.6.1.png](/img/ubuntu22.04.6.1.png)

否则请将BSP内核升级到5.10LTS及更高版本

### 3 设置udev规则文件

将以下行添加到`/etc/udev/rules.d/99-rk-device-permissions.rules`，重新启动以使其生效

```
KERNEL=="mpp_service", MODE="0660", GROUP="video"
KERNEL=="rga", MODE="0660", GROUP="video"
KERNEL=="system", MODE="0666", GROUP="video"
KERNEL=="system-dma32", MODE="0666", GROUP="video"
KERNEL=="system-uncached", MODE="0666", GROUP="video"
KERNEL=="system-uncached-dma32", MODE="0666", GROUP="video" RUN+="/usr/bin/chmod a+rw /dev/dma_heap"
```

如无此文件，请自行创建

### 4 添加用户

将用户`jellfin`添加到`render`和`video`组，然后重新启动`jellyfin`服务

```
sudo usermod -aG render jellyfin
sudo usermod -aG video jellyfin
sudo systemctl restart jellyfin
```

### 5 在主机上安装 ARM Mali OpenCL 运行时 （libmali）：

```
wget https://github.com/tsukumijima/libmali-rockchip/releases/download/v1.9-1-2d267b0/libmali-valhall-g610-g13p0-gbm_1.9-1_arm64.deb
```

如无法下载请自行在官网下载并传到魔云腾主机端

安装

```
dpkg -i libmali-valhall-g610-g13p0-gbm_1.9-1_arm64.deb
```

### 6 检查OpenCL运行时状态

```
sudo /usr/lib/jellyfin-ffmpeg/ffmpeg -v debug -init_hw_device rkmpp=rk -init_hw_device opencl=ocl@rk

arm_release_ver: g13p0-01eac0, rk_so_ver: 10
[AVHWDeviceContext @ 0xaaaae8321360] 1 OpenCL platforms found.
[AVHWDeviceContext @ 0xaaaae8321360] 1 OpenCL devices found on platform "ARM Platform".
[AVHWDeviceContext @ 0xaaaae8321360] 0.0: ARM Platform / Mali-G610 r0p0
[AVHWDeviceContext @ 0xaaaae8321360] cl_arm_import_memory found as platform extension.
[AVHWDeviceContext @ 0xaaaae8321360] cl_khr_image2d_from_buffer found as platform extension.
[AVHWDeviceContext @ 0xaaaae8321360] DRM to OpenCL mapping on ARM function found (clImportMemoryARM).
...
```

### 7 设置jellyfin

#### 7.1登录jellyfin客户端

在浏览器输入`<魔云腾主机ip>+8096`进入jellyfin主机端

如下图所示：

![ubuntu22.04.6.2.png](/img/ubuntu22.04.6.2.png)

自行设置用户名和密码登录

#### 7.2 设置

在设置中启用RKMPP并取消选中不支持的编解码器

![ubuntu22.04.6.3.png](/img/ubuntu22.04.6.3.png)

:::tip

**设置完后请在最下面保存**

:::

### 8 在linux上验证

目前没有可靠的方法可以读取 Rockchip SoC 上 VPU 的占用情况。

但您仍然可以通过读取其他引擎来验证这一点，例如 RGA （2D hwaccel blitter）。

1. 在 Jellyfin Web 客户端播放视频，通过设置较低的分辨率或比特率触发视频转码。

2. 使用`sudo watch -n 1 cat /sys/kernel/debug/rkrga/load`命令检查 RGA 引擎的占用情况。

```
Every 1.0s: cat /sys/kernel/debug/rkrga/load
num of scheduler = 3
================= load ==================
scheduler[0]: rga3_core0
         load = 42%
-----------------------------------
scheduler[1]: rga3_core1
         load = 27%
-----------------------------------
scheduler[2]: rga2
         load = 0%
-----------------------------------
         process 17: pid = 217002, name: /usr/lib/jellyfin-ffmpeg/ffmpeg ... -init_hw_device rkmpp=rk -hwaccel rkmpp -hwaccel_output_format drm_prime ...
```



:::tip

测试此项目时会下载mali的其他版本，若在此项目后重新运行rkllm大模型则会导致出现firmware固件错误，解决方法为卸载此项目所安装的`libmali-valhall-g610-g13p0-gbm_1.9-1_arm64.deb`软件并将`/lib/firmware`下`g610`文件夹下固件文件cp到`/lib/firmware`下后重新运行

:::