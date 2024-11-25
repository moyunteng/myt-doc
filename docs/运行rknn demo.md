## 运行rknn demo

+++

（此处需要两个不同架构的Linux环境`x86_64`和`aarch64`（魔云腾主机架构），请仔细看此文档内容）

### 1 准备开发环境

下载 `RKNN` 相关仓库  

安装`RKNN-Toolkit2` 环境  

安装编译工具  

检查 `RKNPU2` 环境 

#### 1.1 下载RKNN相关仓库

建议新建一个目录用来存放 RKNN 仓库，例如新建一个名称为` Projects` 的文件夹，并将 ` RKNN-Toolkit2` 和`RKNN Model Zo` 仓库存放至该目录下，参考命令如下： 

```
# 新建 Projects 文件夹  
mkdir Projects 
 
# 进入该目录 
cd Projects 
 
# 下载 RKNN-Toolkit2 仓库 
git clone https://github.com/airockchip/rknn-toolkit2.git --depth 1 
# 下载 RKNN Model Zoo 仓库 
git clone https://github.com/airockchip/rknn_model_zoo.git --depth 1 
# 注意： 
# 1.参数 --depth 1 表示只克隆最近一次 commit  
# 2.如果遇到 git clone 失败的情况，也可以直接在 github 中下载压缩包到本地，然后解压至该目录 
```

整体目录结构如下： 

```
Projects 
├── rknn-toolkit2 
│   ├── doc 
│   ├── rknn-toolkit2 
│   │   ├── packages 
│   │   ├── docker 
│   │   └── ... 
│   ├── rknpu2 
│   │   ├── runtime 
│   │   └── ... 
│   └── ... 
└── rknn_model_zoo 
    ├── datasets 
    ├── examples 
    └── ... 
```

#### 1.2 安装 RKNN-Toolkit2 环境

##### 1.2.1 安装 Python 

如果系统中没有安装 Python 3.8（建议版本），或者同时有多个版本的 Python 环境，建议 使用 Conda 创建新的 Python 3.8 环境。

###### 1.2.1.1 安装 Conda 

在终端窗口中执行以下命令，检查是否安装 Conda，若已安装则可省略此节步骤。

```
conda -V 
# 参考输出信息：conda 23.9.0 ，表示 conda 版本为 23.9.0 
# 如果提示 conda: command not found，则表示未安装 conda
```

如果没有安装 Conda，可以通过下面的链接下载 Conda 安装包：

```
wget -c https://mirrors.bfsu.edu.cn/anaconda/miniconda/Miniconda3-latest-Linux-x86_64.sh 
```

然后通过以下命令安装 Conda：

```
chmod 777 Miniconda3-latest-Linux-x86_64.sh 
bash Miniconda3-latest-Linux-x86_64.sh
```

###### 1.2.1.2 使用 Conda 创建 Python 环境 

在终端窗口中，执行以下命令进入 Conda base 环境：

```
source ~/miniconda3/bin/activate # miniconda3 安装的目录 
# 成功后，命令行提示符会变成以下形式：  
# (base) xxx@xxx:~$
```

通过以下命令创建名称为 toolkit2 的 Python 3.8 环境：

```
conda create -n toolkit2 python=3.8
```

激活 toolkit2 环境，后续将在此环境中安装 `RKNN-Toolkit2`：

```
conda activate toolkit2 
# 成功后，命令行提示符会变成以下形式： 
# (toolkit2) xxx@xxx:~$ 
```

##### 1.2.2 安装依赖库和 RKNN-Toolkit2 

激活 conda toolkit2 环境后，进入` rknn-toolkit2` 目录，根据 requirements_cpxx.txt 安装依赖 库，并通过 wheel 包安装` RKNN-Toolkit2`，参考命令如下： 

```
#请在x86_64架构下安装此安装包
# 进入 rknn-toolkit2 目录 
cd Projects/rknn-toolkit2/rknn-toolkit2 
 
# 请根据不同的 python 版本，选择不同的 requirements 文件 
# 例如 python3.8 对应 requirements_cp38.txt  
pip install -r doc/requirements_cpxx.txt 
 
# 安装 RKNN-Toolkit2 
# 请根据不同的 python 版本及处理器架构，选择不同的 wheel 安装包文件： 
# 其中 x.x.x 是 RKNN-Toolkit2 版本号，xxxxxxxx 是提交号，cpxx 是 python 版本号，请根据实际数值进行替换 
pip install packages/rknn_toolkit2-x.x.x+xxxxxxxx-cpxx-cpxx-linux_x86_64.whl

#并在aaech64架构下安装此安装包
# 进入 rknn-toolkit_lite2 目录 
cd Projects/rknn-toolkit2/rknn-toolkit_lite2 
 
# 请根据不同的 python 版本，选择不同的 requirements 文件 
# 例如 python3.8 对应 requirements_cp38.txt  
pip install -r doc/requirements_cpxx.txt 
 
# 安装 RKNN-Toolkit_lite2 
# 请根据不同的 python 版本及处理器架构，选择不同的 wheel 安装包文件： 
# 其中 x.x.x 是 RKNN-Toolkit2 版本号，xxxxxxxx 是提交号，cpxx 是 python 版本号，请根据实际数值进行替换
pip install packages/rknn_toolkit_lite2-x.x.x+xxxxxxxx-cpxx-cpxx-linux_aarch64.whl
```

##### 1.2.3 验证是否安装成功

`x86_64`架构下执行以下命令，若没有报错，则代表` RKNN-Toolkit2` 环境安装成功。

```
# 进入 Python 交互模式 
python 
 
# 导入 RKNN 类  
from rknn.api import RKNN
```

`aarch64`架构下执行以下命令，若没有报错，则代表 `RKNN-Toolkit_lite2` 环境安装成功。

```
# 进入 Python 交互模式 
python 
 
# 导入 RKNN 类  
from rknnlite.api import RKNNLite
```

如果安装失败，请查阅 《Rockchip_RKNPU_User_Guide_RKNN_SDK_V1.6.0_CN.pdf》文档中的第 10.2 章节 “工具安装问题”，其中详细介绍了 `RKNN-Toolkit2` 环境安装失败的解决方法。

#### 1.3安装编译工具

##### 1.3.1 安装 CMake

在终端中，执行以下命令：

```
# 更新包列表 
sudo apt update 
 
# 安装 cmake 
sudo apt install cmake 
```

##### 1.3.2 安装编译器 

1.GCC 下载地址  

 板端为 64 位系统：`https://releases.linaro.org/components/toolchain/binaries/6.3 2017.05/aarch64-linux-gnu/gcc-linaro-6.3.1-2017.05-x86_64_aarch64-linux-gnu.tar.xz  `

2.解压软件包

建议将 GCC 软件包解压到 `Projects` 的文件夹中。以板端为 64 位系统的 GCC  软件 包为例，存放位置如下：

```
Projects 
├── rknn-toolkit2 
├── rknn_model_zoo 
└── gcc-linaro-6.3.1-2017.05-x86_64_aarch64-linux-gnu # 此路径在后面编译RKNN C Demo时会用到
```

此时， GCC 编译器的路径是 `Projects/gcc-linaro-6.3.1-2017.05-x86_64_ aarch64-linux-gnu/bin/aarch64-linux-gnu `

#### 1.4 确认 RKNPU2 驱动版本 

可以在板端执行以下命令查询 RKNPU2 驱动版本： 

```
dmesg | grep -i rknpu
```

Rockchip 开发板的官方固件均自带 RKNPU2 驱动。若以上命令查询不到 NPU 驱动版本， 则可能使用的是第三方固件，其中可能没有安装NPU驱动。可以在 kernel  config 中将 CONFIG_ROCKCHIP_RKNPU 选项的值改成 y 以集成 NPU 驱动，然后重新编译 内核驱动并烧录。建议 RKNPU2 驱动版本 >= 0.9.2。 

### 2 运行示例程序 

#### 2.1 RKNN Model Zoo 介绍 

RKNN Model Zoo 提供了示例代码，旨在帮助用户快速在 Rockchip 的开发板上运行各种常 用模型，整个工程的目录结构如下：

```
rknn_model_zoo 
├── 3rdparty # 第三方库 
├── datasets # 数据集 
├── examples # 示例代码 
├── utils # 常用方法，如文件操作，画图等 
├── build-android.sh # 用于目标为 Android 系统开发板的编译脚本 
├── build-linux.sh # 用于目标为Linux 系统开发板的编译脚本 
└── ... 
```

其中，examples 目录包括了一些常用模型的示例，例如 MobileNet 和 YOLO 等。每个模 型示例提供了 Python 和 C/C++ 两个版本的示例代码（为了方便描述，后续用 RKNN Python  Demo 和 RKNN C Demo 来表示）。以 YOLOv5 模型为例，其目录结构如下：

```
rknn_model_zoo 
├── examples 
│   └── yolov5 
│       ├── cpp # C/C++ 版本的示例代码 
│       ├── model # 模型、测试图片等文件 
│       ├── python # 模型转换脚本和Python版本的示例代码 
│       └── README.md 
└── ... 
```

#### 2.2 RKNN C Demo 使用方法 

下面以 YOLOv5 模型为例，介绍 RKNN C Demo 的使用方法。  注：不同的 RKNN C Demo 用法存在差异，请按照各自目录下 README.md 中的步骤运行。

##### 2.2.1 准备模型

此步骤请在`x86_64`架构下进行

进入` rknn_model_zoo/examples/yolov5/model `目录，运行` download_model.sh` 脚本，该脚本 将下载一个可用的 YOLOv5 ONNX 模型，并存放在当前 model 目录下，参考命令如下：

```
# 进入 rknn_model_zoo/examples/yolov5/model 目录 
cd Projects/rknn_model_zoo/examples/yolov5/model 
 
# 运行 download_model.sh 脚本，下载 yolov5 onnx 模型 
# 例如，下载好的 onnx 模型存放路径为 model/yolov5s_relu.onnx 
./download_model.sh 
```

##### 2.2.2 模型转换

进入` rknn_model_zoo/examples/yolov5/python` 目录，运行` convert.py` 脚本，该脚本将原始的ONNX 模型转成 RKNN 模型，参考命令如下：

```
# 进入 rknn_model_zoo/examples/yolov5/python 目录 
cd Projects/rknn_model_zoo/examples/yolov5/python 
 
# 运行 convert.py 脚本，将原始的 ONNX 模型转成 RKNN 模型 
# 用法: python convert.py model_path [rk3566|rk3588|rk3562] [i8/fp] 
[output_path] 
python convert.py ../model/yolov5s_relu.onnx rk3588 i8 ../model/yolov5s_relu.rknn 
```

##### 2.2.3 运行 RKNN C Demo 

###### 2.2.3.1 编译

完整运行一个 RKNN C Demo，需要先将 C/C++ 源代码编译成可执行文件，然后将可执行 文件、模型文件、测试图片等相关文件推送到板端上，最后在板端运行可执行文件。

需要使用 rknn_model_zoo 目录下的  build-linux.sh 脚本进行编译。在运行 build-linux.sh 脚本之前，需要指定编译器的路径  GCC_COMPILER 为本地的GCC 编译器路径。即在 build-linux.sh 脚本中，需要加入以下命令：

```
# 添加到 build-linux.sh 脚本的开头位置即可 
GCC_COMPILER=Projects/gcc-linaro-6.3.1-2017.05-x86_64_aarch64-linux-gnu/bin/aarch64-linux-gnu
```

然后在` rknn_model_zoo` 目录下，运行` build-linux.sh` 脚本，参考命令如下：

```
# 进入 rknn_model_zoo 目录 
cd Projects/rknn_model_zoo 
 
# 运行 build-linux.sh 脚本 
# 用法:./build-linux.sh -t <target> -a <arch> -d <build_demo_name> [-b <build_type>] [-m] 
# -t : target (rk356x/rk3588) # 平台类型，rk3568/rk3566 都统一为rk356x 
# -a : arch (aarch64/armhf) # 板端系统架构 
# -d : demo name # 对应 examples 目录下子文件夹的名称，如yolov5、mobilenet 
# -b : build_type(Debug/Release) 
# -m : enable address sanitizer, build_type need set to Debug 
./build-linux.sh -t rk3588 -a aarch64 -d yolov5
```

###### 2.2.3.2 推送文件到魔云腾主机 

编译完成后，会在 rknn_model_zoo 目录下产生 install 文件夹， 其中有编译好的可执行文 件，以及测试图片等相关文件。参考目录结构如下：

```
install 
├── rk356x_linux_aarch64 # rk356x 平台 
└── rk3588_android_arm64-v8a # rk3588平台 
    └── rknn_yolov5_demo  
        ├── lib # 依赖库 
        ├── model # 存放模型、测试图片等文件 
        └── rknn_yolov5_demo # 可执行文件 
```

###### 2.2.3.3 魔云腾主机运行Demo

此步骤请在魔云腾主机中的`aarch64`架构环境中进行

```
# 进入 rknn_yolov5_demo 目录 
cd /data/rknn_yolov5_demo/  
# 设置依赖库环境 
export LD_LIBRARY_PATH=./lib 
# 运行可执行文件 
# 用法: ./rknn_yolov5_demo <model_path> <input_path> 
./rknn_yolov5_demo model/yolov5s_relu.rknn model/bus.jpg
```

###### 2.3.3.4 查看结果

脚本运行成功后输出信息如下，其中，class 字段代表预测的类别，score 为得分，(xmin,  ymin) 是检测框的左上角坐标，(xmax, ymax) 是检测框的右下角坐标。

```
# class @ （xmin, ymin, xmax, ymax）score 
person @ (209 244 286 506) 0.884 
person @ (478 238 559 526) 0.868 
person @ (110 238 230 534) 0.825 
bus     @ (94 129 553 468) 0.705 
person @ (79 354 122 516) 0.339
```

默认情况下，输出图片保存路径为` rknn_yolov5_demo/out.png`，可以从魔云腾拉取到本地查看。

输出图片如下所示：

![ubuntu22.04三.1.png](/img/ubuntu22.04三.1.png)



