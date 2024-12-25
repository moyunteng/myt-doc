---
slug: /zeus-c8/Zeus C8 windowssjwjxtjc
---
## Zeus C8 Windows刷机文件系统教程

注意事项：刷写此版本固件会清空老版的配置信息，请注意！
全新Debian系统固件去掉了老版固件的OpenWRT，刷机完成后`eth0`口接入网线，注意C8上两个网口不可同时接入网络，待C8机器右边OLED屏幕上显示出IP，
在浏览中输入此IP即可进入C8管理页面。

开始刷机前请先下载下方的刷机工具和Debian固件，然后根据下方教程文件进行刷机

C8刷写固件工具: [立即下载](https://pan.baidu.com/s/1LlykQzxeh_1sBAUfW07Kig?pwd=dchx)

C8-Debian系统固件: [立即下载](https://pan.baidu.com/s/1iwcctjbLOu_KR0veu3S9pQ?pwd=6bdj)



**准备工作：**

**MYT Zeus C8、取卡针或者牙签、USB公头转USB公头数据线、Windows电脑、刷机工具RKDevTool 2.86资源包**

Usb公头数据线：

![xitong1](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong1.png)



1. 安装驱动（首次需要）

   ![xitong2](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong2.png)

   ![xitong3](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong3.png)

   ![xitong4](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong4.png)

2. 启动刷机工具

   ![xitong5](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong5.png)

3. MYT Zeus C8进入刷机模式

C8服务器正面如图所示

![xitong6](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong6.png)

C8服务器背面如图所示

![xitong7](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong7.png)

1.  开始前请先关闭C8电源，把C8移动至电脑附近，确保C8能通过**USB双公头**数据线连接正面USB标识的靠底部的USB接口。 

2. 刷机接口为C8正面的USB口（**靠底部**的USB），请把**USB双公头数据线**连接电脑和此端口

   ![xitong8](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong8.png)

3. 请用如牙签、取卡针等顶住Recovery按钮，同时接通电源，同时观察第二步打开的刷机工具是否出现“发现一个LOADER设备”或者“发现一个MASKROM设备”，识别到设备即可，否则请重试安装驱动及进入刷机等前面的步骤。

4.  开始刷机

   

### 1. Windows上给C8刷写Debian系统教程

![xitong10](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong10.png)

 刷机工具请选择“升级固件”，并确保如图上选择的 update 的刷机包

 确保识别到设备后点击“升级”开始刷机

![xitong11](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong11.png)

![xitong12](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong12.png)

 出现下图表示刷写成功

![xitong13](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong13.png)

### 2. Windows上给C8刷写IStoreOS系统教程

![xitong9](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong9.png)

刷机工具请勾选“强制按地址写”，并确保如图上选择的两条下载内容

确保无误后点击“执行开始刷机”

![xitong14](C:\Users\27907\Desktop\魔云腾主机介绍图片\c8\xitong14.png)

出现上图表示刷写成功