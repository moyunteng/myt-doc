---
slug: /MYTOS/sshlianjie
---
## SSH连接

从 Windows 10 版本开始，Windows 操作系统已经内置了一个 SSH 客户端，称为 OpenSSH 客户端。 这意味着你可以直接在 Windows 上使用命令行来进行 SSH 连接和操作，而无需安装额外的 SSH 客户端软件。  

 **ssh 登录 账号 user  密码 myt** 

**root 用户 密码 myt**

-----------------------

强烈建议更改密码

-----------------------

Windows 10 使用方法  搜索栏--输入CMD--打开 命令提示符 控制台 

![img](/img/ssh1.png) 

控制台中输入 ssh user@ip地址 -- 回车--yes

 ![img](/img/ssh2.png)  

输入密码 myt 

![img](/img/ssh3.png)  现在就已经进入了底层控制台 

---------------------------------------------------

当前状态是user用户模式 还没有最高权限 如果需要最高权限 输入su--再次输入密码 myt 

![img](/img/ssh4.png)