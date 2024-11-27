# Ubuntu使用

该文件系统基于ubuntu22.04版本构建，使用方法与ubuntu22.04相同

### 系统默认配置

:::tip[登入系统的用户名和密码]


ssh用户名：**myt**

密码：**123456**


:::

### ssh方法
```
ssh <用户名>@<主机ip地址>
例如： ssh myt@192.168.xxx.xxx
```


:::tip[获取ip]

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="oled" label="oled(推荐)" default>
    通过查看oled获取主机ip地址
  </TabItem>
  <TabItem value="chuankou" label="串口">
    通过串口调试，进入并登录后使用ifconfig获取主机ip地址
  </TabItem>
</Tabs>
:::


如果是第一次登录远程主机，系统会给出下面提示：
```
The authenticity of host 192.168.xxx.xxx(192.168.xxx.xxx)'can't be established.
ECDSA key fingerprint is SHA256:FFobshqrG0achj7Xp4LsJ9+xkNBlyy0e8ZIP17K+qQI.
Are you sure you want to continue connecting(yes/no)?
```
请直接输入yes。
