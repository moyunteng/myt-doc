---
slug: /MYTOS/yxrkmpp
---
## 运行rkmpp demo

+++

### 1 下载rkmpp

新建rkmpp文件夹

```
mkdir mpp
cd mpp
```

使用git克隆rkmpp

```
git clone https://github.com/rockchip-linux/mpp.git
```

### 2 交叉编译MPP库

```
cd build/linux/aarch64
vim arm.linux.cross.cmake
```

查看是否是对应aarch64架构的交叉编译工具，如图所示：



![ubuntu22.04.4.1.png](/img/ubuntu22.04.4.1.png)

进行编译

```
./arm.linux.cross.cmake && make
```

### 3 检查编译结果

编译之后，动态库在mpp目录下

![ubuntu22.04.4.2.png](/img/ubuntu22.04.4.2.png)

测试工具在test目录下

![ubuntu22.04.4.3.png](/img/ubuntu22.04.4.3.png)

### 4 安装库文件

在mpp目录下

```
sudo make install
```

### 5 设置打印日志

```
export mpi_debug=1
export mpp_debug=1
export h264d_debug=1
export mpp_syslog_perror=1
```

### 6 运行并查看日志

例如运行`mpi_dec_test`

```
./mpi_dec_test
```

有以下日志输出：

![ubuntu22.04.4.4.png](/img/ubuntu22.04.4.4.png)