---
slug: /MYTOS/anzhuanglibrga
---
## 安装librga库

+++

RGA (Raster Graphic Acceleration Unit)是一个独立的2D硬件加速器，可用于加速点/线绘制，执行图像缩放、旋转、bitBlt、alpha混合等常见的2D图形操作。本仓库代码实现了RGA用户空间驱动，并提供了一系列2D图形操作API。

### 1 下载librga

新建librga文件夹

```
mkdir librga
cd librga
```

使用git克隆rkmpp

```
git clone https://github.com/airockchip/librga.git
```

### 2 移动库文件

当前预编译仓库API版本：1.10.1

`libs`目录下存放了预编译的librga库，将他复制到`/usr/lib`目录下

```
cp libs/Linux/gcc-aaech64/librga.so /usr/lib
```

### 3 验证librga是否可用

#### 3.1 移动测试文件

`samples/sample_file`目录下存放着示例图片，使用示例图片时，Linux系统须将源图储存在设备/usr/data目录下。

```
cp ./samples/sample_file/in0w1280-h720-rgba8888.bin in1w1280-h720-rgba8888.bin /usr/data
```

如显示无此文件夹，可自行创建

```
cd /usr/
mkdir data
```

#### 3.2 运行im2d_api_demo

```
cd samples
```

##### 3.2.1 工具链修改

- **Linux（buildroot/debian）**

 参考librga源码目录下**toolchains/toolchain_linux.cmake**写法，修改工具链路径、名称。

| 工具链选项     | 描述       |
| -------------- | ---------- |
| TOOLCHAIN_HOME | 工具链目录 |
| TOOLCHAIN_NAME | 工具链名称 |

##### 3.2.2 编译脚本修改

 修改samples目录或需要编译的示例代码目录下**cmake_\*.sh**，指定toolchain路径。

| 编译选项       | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| TOOLCHAIN_PATH | toolchain的绝对路径，即《工具链修改》小节中修改后的toolchain_*.cmake文件的绝对路径 |
| LIBRGA_PATH    | 需要链接的librga.so的绝对路径，默认为librga cmake编译时的默认打包路径 |
| BUILD_DIR      | 编译生成文件存放的相对路径                                   |

##### 3.2.3 执行编译脚本

```
chmod +x ./cmake_linux.sh
./cmake_android.sh
```

##### 3.2.4 运行验证

所编译内容将出现在新建的build文件夹中

![ubuntu22.04.5.1.png](/img/ubuntu22.04.5.1.png)

运行rgaImDemo

```
./rgaImDemo --copy
```

运行后将打印出librga版本以及其他日志

![ubuntu22.04.5.1.png](/img/ubuntu22.04.5.2.png)