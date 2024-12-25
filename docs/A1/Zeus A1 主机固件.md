---
slug: /A1/A1zhujigujian
---
## Zeus A1 主机固件

2024.06.17（稳定版）

1.修复CPU性能异常占用问题

2.增加数百项硬件仿真

3.优化编解码性能

4.增加磁盘节点对齐

5.增加内核级系统时间校准



下载地址：

百度云，链接: https://pan.baidu.com/s/1yB5iEaCO09TIT7kOvsTQSw 提取码: nr8i   [点击打开](https://pan.baidu.com/s/1yB5iEaCO09TIT7kOvsTQSw)

123pan，链接：https://www.123pan.com/s/MnV7Vv-nwL0h.html 提取码:uapD  [点击打开](https://www.123pan.com/s/MnV7Vv-nwL0h.html)



---------------------------------
刷写教程

1. 安装驱动

①打开电脑设备管理器

②盒子断电，按住刷机按钮，通电

③保持按住按钮，用Type-C线连接电脑

④观察设备管理器，发现新设备后，可以松开刷机按钮

 注意：发现这样的情况说明有驱动了，可以进行下一步操作

  ![img](/img/A1/1.png)

⑤选择未知设备，右键属性

![img](/img/A1/2.png) 

![img](/img/A1/3.png)

⑥选择“更新驱动程序”->“浏览我的电脑查找驱动程序”->“让我从计算机上可用的驱动程序列表中获取”

![img](/img/A1/4.png) 

![img](/img/A1/5.png)

⑦选择“显示所有设备”->“下一步”

![img](/img/A1/6.png)

⑦选择从“从磁盘安装”-> “浏览”， 进入驱动目录， 选择“android_winusb.inf”文件->“打开”

![img](/img/A1/7.png)

⑧选择“Android Bootloader Interface”->下一步->“是”

![img](/img/A1/8.png)

⑨出现这个界面表示安装成功，“关闭”即可

![img](/img/A1/9.png)



2. 开始刷机

注意：如果接着上一步，不需要把设备断电，直接继续，否则还要重新识别设备

①打开刷机工具

![img](/img/A1/10.png)

②等待识别设备，不行重新进行第一部分的操作

③识别到设备后，等待刷写成功，重新开机即可

![img](/img/A1/11.png)