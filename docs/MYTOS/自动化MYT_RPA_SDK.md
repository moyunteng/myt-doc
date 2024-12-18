**自动化控制 SDK 接口概述**

本SDK 提供了一套在Android 之外的一套控制输入等相关功能的接口,通过TCP与Android 系统通信 实现指令下发.

**SDK和Demo下载:**

- MYT_RPA_SDK  [下载地址](http://d.moyunteng.com/sdk/MYT_RPA_SDK_v8.0_20241109.zip) 版本:v8.0 更新时间:20241109

**基础功能**

- *takeCaptrue(获取当前屏幕原始的RGBA数据)*
- takeCaptrueCompress(获取屏幕截图PNG or JPG)
- touchDown(触摸按下事件)
- touchUp(触摸弹起事件)
- touchMove(触摸滑动)
- touchClick(单次点击事件)
- keyPress(按键事件)
- sendText(输入文字)
- openApp(运行指定的app)
- stopApp(停止指定的app)
- dumpNodeXml(导出节点xml)
- getDisplayRotate(获取当前屏幕旋转状态)
- execCmd(执行shell 命令 v20版本开始支持)
- 增加节点查找的逻辑处理

**接入说明:**

桥接网络模式下连接通过Android容器实例的ip 和端口号 (默认9083)

接入流程

openDevice()

相关操作 .....

closeDevice()

**坐标说明:所有的坐标都是以当前屏幕左上角为0点**

- **特别说明:**
- 在测试Demo过程,填入ip 和端口时,一定要注意当前的IP为Android云机的IP 端口为辅助控制的端口,具体的数值可以在客户端上的API详情里面获取如下图:
- ![img](/img/zskp/zdh.png)