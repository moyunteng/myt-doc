---
slug: /linux/yxredroid
---
# redroid-rk3588

*适用于瑞芯微RK3588系列SoC的redroid镜像。*

## 支持功能

- `GPU` (Mali-G610) 硬件加速 (软件渲染不可用)
- 预装`Gapps`
- 预装`Magisk Kitsune版`
- 去除`surfaceflinger`限制，可在App中输入密码（不会因安全限制而黑屏）
- `虚假 WiFi` （使App认为WiFi已连接）
- `scrcpy物理键鼠模拟`支持

## 系统要求

- 内核版本 `5.10`/`6.1` (需要自定义的6.1[内核](https://github.com/CNflysky/linux-rockchip))
- Mali CSF 内核驱动版本 `g18p0`
- Mali 固件，置于`/lib/firmware/`下
- `CONFIG_PSI=y`
- `CONFIG_ANDROID_BINDERFS=y`

你可以运行`envcheck.sh`来检查这些要求。

## 部署

:::tip

请确保自己的网络情况可以下载docker镜像，或自行配置代理

:::

#### 克隆项目：

```
git clone https://github.com/CNflysky/redroid-rk3588.git --depth 1
cd redroid-rk3588
```

#### 检查要求

```
./envcheck.sh
```

要求无误的情况如下图所示：

![image-20241217110007536](/img/redroid1.png)

### 使用docker-compose：

##### 使用docker-ce：

```
docker compose up -d
```

##### 使用docker.io：

```
sudo apt install docker-compose
docker-compose up -d
```

欲切换版本，请编辑 `docker-compose.yml` 文件，修改 `image` 后的 `tag` ，随后 `docker-compose down && docker-compose up -d` 即可。

**注意**: 不同版本（`Android 12`/`Android 13`）的`data`目录不能兼容，切换版本前请先备份重要数据或修改安卓容器内用户数据分区的映射目录。

### 手动运行：

```
docker run -d -p 5555:5555 -v ~/redroid-data:/data --restart unless-stopped --name redroid --privileged cnflysky/redroid-rk3588:lineage-20 androidboot.redroid_height=1920 androidboot.redroid_width=1080
```

其中，`-v` 参数值 `~/redroid-data:/data` 中冒号前的部分`~/redroid-data` 代表你要在宿主机的哪个位置存放安卓容器内的`用户数据`(也就是`/data`目录)，可以根据自己的需求更改。

### 下载实时投屏软件

在官网按需求下载对应版本QtScrcpy

[QtScrcpy 发行版 - Gitee.com](https://gitee.com/Barryda/QtScrcpy/releases)

![image-20241217110958482](/img/redroid2.png)

连接后会出现以下界面，此时云手机可使用

![image-20241217122018313](/img/redroid3.png)

## 参数

| 参数                                        | 描述                         | 默认值            |
| ------------------------------------------- | ---------------------------- | ----------------- |
| `androidboot.redroid_fps`                   | 设置刷新率, 取值范围 (1,120) | 60                |
| `androidboot.redroid_magisk`                | 是否启用 Magisk              | 0                 |
| `androidboot.redroid_fake_wifi`             | 是否启用虚假 WiFi            | 0                 |
| `androidboot.redroid_fake_wifi_ssid`        | 设置虚假 WiFi SSID           | FakeWiFi          |
| `androidboot.redroid_fake_wifi_bssid`       | 设置虚假 WiFi BSSID          | 66:55:44:33:22:11 |
| `androidboot.redroid_fake_wifi_mac`         | 设置虚假 WiFi MAC 地址       | 11:22:33:44:55:66 |
| `androidboot.redroid_fake_wifi_speed`       | 设置虚假 WiFi 速度(Mbps)     | 866               |
| `androidboot.redroid_adbd_bind_eth0`        | 是否绑定ADB Socket到eth0上   | 1                 |
| `ro.adb.secure`                             | 是否启用ADB调试授权认证      | 1                 |
| `androidboot.redroid_create_secure_display` | 是否创建安全显示器           | 1                 |
| `androidboot.redroid_enable_input_subsys`   | 是否启用input子系统          | 0                 |

（0代表禁用，1代表启用，留空则应用默认值）















