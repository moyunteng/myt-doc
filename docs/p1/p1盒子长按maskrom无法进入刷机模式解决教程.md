---
slug: /p1/wufashuaji
---
ssh到p1盒子

```
ssh user@ip
```

切换到root权限

```
su
```

输入以下命令

```
dd if=/dev/zero of=dev/nvme0n1 bs=1M count=1
```

![img](/img/p1/wufashuaji.png)

断电，即可按刷机教程给p1盒子正常刷机

![wufashuaji1](/img/p1/wufashuaji1.png)