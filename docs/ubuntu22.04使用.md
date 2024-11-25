---
sidebar_position: 2
---

# ubuntu22.04基本使用



## 编译ubuntu22.04文件系统镜像

### 1 安装依赖软件

```
#安装依赖软件
sudo apt-get install git ssh make gcc libssl-dev liblz4-tool  expect g++ patchelf chrpath gawk texinfo chrpath diffstat binfmt-support qemu-user-static live-build bison flex fakeroot cmake gcc-multilib g++-multilib unzip device-tree-compiler ncurses-dev  python-is-python3 python-dev-is-python3 -y 
```

### 2 解压根文件系统

可在SDK中直接运行`build_ubuntu.sh`脚本 可直接将ubuntu22.04文件系统编译完成，如果需要自行编辑内核模块请参照[2.8安装开发板驱动](#2.8安装开发板驱动)进行内容的修改

