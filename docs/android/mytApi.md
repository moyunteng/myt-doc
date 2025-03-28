---
slug: /android/mytapi
---
# MytOS API 接口文档

## 目录

1. [设置应用Root权限](#1-设置应用root权限)
2. [设置云手机设备信息](#2-设置云手机设备信息)
3. [导出设备信息](#3-导出设备信息)
4. [导入设备信息](#4-导入设备信息)
5. [隐藏应用信息](#5-隐藏应用信息)
6. [获取视频流地址](#6-获取视频流地址)
7. [设置视频流地址](#7-设置视频流地址)
8. [获取文件列表](#8-获取文件列表)
9. [下载文件](#9-下载文件)
10. [随机设备信息](#10-随机设备信息)
11. [异步随机设备信息](#11-异步随机设备信息)
12. [设置语言](#12-设置语言)
13. [设置语言和国家](#13-设置语言和国家)
14. [设置地理位置](#14-设置地理位置)
15. [设置音频资源](#15-设置音频资源)
16. [设置自定义设备信息](#16-设置自定义设备信息)
17. [获取剪贴板内容](#17-获取剪贴板内容)
18. [设置剪贴板内容](#18-设置剪贴板内容)
19. [查询S5代理状态](#19-查询S5代理状态)
20. [设置S5代理](#20-设置S5代理)
21. [停止S5代理](#21-停止S5代理)
22. [设置S5域名过滤](#22-设置S5域名过滤)
23. [设置运动传感器灵敏度](#23-设置运动传感器灵敏度)
24. [设置摇一摇状态](#24-设置摇一摇状态)
25. [设置应用权限](#25-设置应用权限)
26. [设置分辨率感知过滤](#26-设置分辨率感知过滤)
27. [更新设备信息](#27-更新设备信息)
28. [切换默认输入法](#28-切换默认输入法)
29. [旋转摄像头](#29-旋转摄像头)
30. [发送短信](#30-发送短信)
31. [设置全球域名加速](#31-设置全球域名加速)
32. [上传Google证书](#32-上传Google证书)
33. [更新指纹信息](#33-更新指纹信息)
34. [执行ADB命令](#34-执行ADB命令)
35. [获取截图](#35-获取截图)
## 接口详情

**ip**: 为安卓手机实例对应的安卓api ip

**port**: 为安卓手机实例对应的安卓api端口

如果在安卓内部访问该接口统一使用 http://127.0.0.1:9082/

### 1. 设置应用Root权限

**接口说明**: 为指定的应用设置root权限

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=10&pkg={package}&root=true`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| ip | 是 | string | 设备IP地址 |
| port | 是 | int | 安卓设备端口号 |
| cmd | 是 | int | 固定值：10 |
| pkg | 是 | string | 应用包名 |
| root | 是 | boolean | 是否启用root权限，固定值 true |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=10&pkg=com.example.app&root=true
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "ok"
}
```

### 2. 设置云手机设备信息

**接口说明**: 设置云手机的设备信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=1&data={encoded_text}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| ip | 是 | string | 设备IP地址 |
| port | 是 | int | 安卓设备端口号 |
| cmd | 是 | int | 固定值：1 |
| data | 是 | string | Base64编码的设备信息JSON字符串 |

**data参数说明**: 
- 设备信息JSON需要先转换成字符串
- 然后进行Base64编码
- 最后进行URL安全编码

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=1&data=eyJkZXZpY2VfaWQiOiJhYmMxMjMifQ==
```

**返回示例**:
```json
{
    "code": 202,
    "reason": "OK"
}
```

### 3. 导出设备信息

**接口说明**: 导出当前设备的信息到指定文件

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=8`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：2 |

**返回参数**:

| 参数名 |  类型 | 说明 |
|--------|------|------|
| ret |  string | 导出设备信息内容 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=8
```

**返回示例**:
```json
{
    "code": 200,
    "ret": "xxxxxx"
}
```

### 4. 导入设备信息

**接口说明**: 从文件导入设备信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=9&data={encoded_text}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：3 |
| data | 是 | string | 设备信息，注意需要传参的时候,进行URL编码 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=9&data=eyJkZXZpY2VfaWQiOiJhYmMxMjMifQ%3D%3D
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "ok"
}
```

### 5. 隐藏应用信息

**接口说明**: 隐藏指定的应用

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=3&data=WyJjb20uYW5kcm9pZC5ibHVldG9vdGgiXQ==`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：3 |
| data | 是 | string | Base64 URL安全编码的应用信息JSON字符串 |

**data参数格式**:
```json
{
    "app1": "com.example.app1",
    "app2": "com.example.app2"
}
```

**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码(200:成功) |
| msg | string | 返回消息 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=3&data=WyJjb20uYW5kcm9pZC5ibHVldG9vdGgiXQ==
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "ok"
}
```

**错误码**:
| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 其他 | 隐藏失败 |

**注意事项**:
1. 应用包名必须正确,比如传入的app列表是'["com.android.bluetooth"]'进行编码后传就是示例的WyJjb20uYW5kcm9pZC5ibHVldG9vdGgiXQ==
2. JSON字符串需要先进行Base64编码，然后进行URL安全编码
3. 隐藏后的应用在系统中将不可见

### 6. 获取视频流地址

**接口说明**: 获取当前设备的视频流地址

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=5`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：5 |

**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码(200:成功) |
| addr | string | 视频流地址 |
| type | int | 视频流类型 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=5
```

**返回示例**:
```json
{
    "code": 200,
    "path": "",
    "type": ""
}
```

**错误码**:
| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 其他 | 获取失败 |

### 7. 设置视频流地址

**接口说明**: 设置设备的视频流地址和类型

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=4&type={type}&path={addr}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：4 |
| type | 是 | string | 视频流类型 video webrtc image |
| path | 是 | string | 视频流地址 |

**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码(200:成功) |
| msg | string | 返回消息 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=4&type=video&path=rtmp://server/live
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

**注意事项**:
1. 设置视频流后，如果需要同时设置分辨率，需要发起一个额外的请求(cmd=6)来设置分辨率
通过请求接口
http://192.168.30.2:10008/modifydev?cmd=6&cmdline=setprop+persist.lg.resolution+{xx}
成功响应
```json
    {
        "code": 200,
        "ret": " "
    }
``` 
2. 分辨率设置通过 persist.lg.resolution 属性进行控制


### 8. 获取文件列表

**接口说明**: 获取指定目录下的文件列表，支持获取Android实例中的文件列表

**请求 URL**: `http://{ip}:{port}/files?list={path}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| list | 是 | string | 要获取文件列表的目录路径 |

**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码 |
| files | array | 文件列表数组 |
| files[].file | string | 文件完整路径 |
| files[].flag | boolean | 是否为文件夹(true:是/false:否) |
| files[].length | int | 文件大小(字节) |
| files[].name | string | 文件名称 |

**请求示例**:
```
GET http://192.168.30.2:10008/files?list=/sdcard
```

**返回示例**:
```json
{
    "code": 200,
    "files": [
        {
            "file": "/sdcard/Notifications",
            "flag": true,
            "length": 4096,
            "name": "Notifications"
        },
        {
            "file": "/sdcard/Download",
            "flag": true,
            "length": 4096,
            "name": "Download"
        }
    ]
}
```

**错误码**:
| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 其他 | 获取失败 |

**注意事项**:
1. 该接口可用于获取Android实例中的文件列表
2. 返回的文件大小对于文件夹固定为4096字节
3. 建议使用绝对路径访问文件，以避免路径解析错误

### 9. 下载文件

**接口说明**: 从设备下载指定文件到本地

**请求 URL**: `http://{ip}:{port}/download?path={filepath}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| path | 是 | string | 要下载的文件路径 |


**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码 |
| msg | string | 返回消息 |

**请求示例**:
```
GET http://192.168.30.2:10008/download?path=/data/prop.txt
```

**返回示例**:
返回文件
![alt text](/img/android/api1.png.jpg)

**错误码**:
| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 1 | 主机不通 |
| 2 | 获取容器API接口失败 |
| 3 | 文件下载错误 |
| 4 | 本地文件已存在 |
| 8000 | 未知错误 |

**注意事项**:
1. 文件下载采用流式传输，支持大文件下载
2. 下载过程中会显示下载进度
3. 下载成功后会自动保存到指定的本地路径
4. 如果本地文件已存在，需要先删除或重命名后再下载
5. 建议使用绝对路径访问文件，以避免路径解析错误

### 10. 随机设备信息
### 11. 异步随机设备信息
**接口说明**: 随机更换设备信息，支持同步和异步两种方式

**请求 URL**: 
- 同步方式: `http://{ip}:{port}/modifydev?cmd=2`
- 异步方式: `http://{ip}:{port}/modifydev?cmd=2&isasync=true`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值2，表示随机设备信息 |
| modifymac |否| boolean |修改mac地址|
|random_abroad| 否 | boolean | 默认为false  随机海外机型|
|userip|否|string|使用给定的ip进行区域匹配随机信息|
|isasync|否|boolean|使用异步的方式进行请求 使用该参数后 会立刻返回结果 并给一个唯一ID作为查询请求的参数
|isSpecifiedModel|否|boolean|表示指定机型随机
|modelId|否|int|机型参数列表  只有当isSpecifiedModel=true 时生效

//机型字典表
```
{
    "samsung": {
        "SM-S901U": 97,
        "SM-G986N": 98,
        "SM-F926B": 99,
        "SM-S9010": 100,
        "SM-X906N": 101,
        "SM-G998U": 102,
        "SM-M536S": 103,
        "SM-G990E": 104,
        "SM-S906U": 105,
        "SM-F707N": 106,
        "SM-F9360": 107,
        "SM-A536N": 108,
        "SM-T976N": 109,
        "SM-G998N": 110,
        "SM-A336N": 111,
        "SM-G988N": 112,
        "SM-N970F": 113,
        "SM-T875N": 114,
        "SM-F926N": 115,
        "SM-F916U": 116,
        "SM-S906N": 117,
        "SM-A325F": 118,
        "SM-F916N": 119,
        "SM-S908N": 120,
        "SM-G991N": 121,
        "SM-F711U": 122,
        "SM-S908U": 123,
        "SM-F711B": 124,
        "SM-A326B": 125,
        "SM-X906B": 126,
        "SM-S906B": 127,
        "SM-A5360": 128,
        "SM-X806N": 129,
        "SM-A536V": 130,
        "SM-N981N": 131,
        "SM-G996N": 132,
        "SM-S901N": 133,
        "SM-G781N": 134,
        "SM-G981N": 135,
        "SM-A125F": 136,
        "SM-A346N": 137,
        "SM-A336E": 138,
        "SM-F926U": 139,
        "SM-G9910": 140,
        "SM-X706N": 141,
        "SM-S908B": 142,
        "SM-S901B": 143,
        "SM-F936U": 144,
        "SM-A325N": 145,
        "SM-G991B": 146,
        "SM-T875": 147,
        "SM-F711N": 148,
        "SM-F936B": 149,
        "SM-X706B": 150,
        "SM-A715F": 166,
        "SM-M127F": 167,
        "SM-N976N": 168,
        "SM-G977N": 169,
        "SM-A135N": 170,
        "SM-G985F": 171,
        "SM-N770F": 172,
        "SM-G973F": 173,
        "SM-N985F": 174,
        "SM-A725F": 175,
        "SM-A515F": 176,
        "SM-N971N": 177,
        "SM-N980F": 178,
        "SM-G970F": 179,
        "SM-F700F": 180,
        "SM-G988B": 181,
        "SM-G975F": 182,
        "SM-A826S": 183,
        "SM-A127F": 184,
        "SM-E625F": 185,
        "SM-G780F": 186,
        "SM-E5260": 188,
        "SM-T865": 189,
        "SM-F900F": 192,
        "SM-A546S": 193,
        "SM-A546B": 194,
        "SM-A546E": 195,
        "SM-A136S": 196,
        "SM-A137F": 197,
        "SM-A528N": 198,
        "SM-A426N": 199,
        "SM-A226L": 200,
        "SM-A245N": 201,
        "SM-A235N": 202,
        "SM-A736B": 203,
        "SM-A505F": 204,
        "SM-A705F": 205,
        "SM-A315G": 206,
        "SM-S918U": 207,
        "SM-S911N": 208,
        "SM-G960F": 209,
        "SM-F731U": 210,
        "SM-F946U": 211,
        "SM-F721U": 212,
        "SM-M236L": 213,
        "SM-E225F": 214,
        "SM-M515F": 215,
        "SM-N975F": 216,
        "SM-N960F": 217,
        "SM-X916N": 218,
        "SM-X910": 219,
        "SM-X810": 220,
        "SM-X816N": 221,
        "SM-X716N": 222,
        "SM-X710": 223,
        "SM-T736N": 224,
        "SM-T735": 225,
        "SM-X800": 226,
        "SM-X900": 227,
        "SM-T725": 228,
        "SM-T970": 229,
        "SM-T835": 230,
        "SM-S916U": 231,
        "SM-G998U1": 232,
        "SM-S928U1": 235,
        "SM-G988U1": 260,
        "SM-N970U1": 261
    },
    "realme": {
        "RMX3370": 163
    },
    "Xiaomi": {
        "MI 8": 7,
        "MI 5X": 10,
        "MI 9": 11,
        "MI CC 9": 44,
        "2112123AG": 153,
        "2201123G": 154,
        "M2101K9G": 155,
        "Redmi K30 5G": 247,
        "Mi9 Pro 5G": 248,
        "Redmi 5 Plus": 249,
        "Redmi 7A": 250,
        "Redmi K20": 251,
        "MIX 3": 252,
        "MI 6": 253,
        "Redmi Note 4X": 254,
        "MI 10": 255,
        "Mi Note 3": 256,
        "MI MAX": 257,
        "2312DRAABC": 258,
        "23077RABDC": 259
    },
    "Meizu": {
        "PRO 7 Plus": 12,
        "PRO 7-S": 14,
        "Meizu S6": 15
    },
    "Sony": {
        "J9110": 187
    },
    "OPPO": {
        "PBAM00": 20,
        "PBEM00": 21,
        "OPPO A73": 22,
        "PACT00": 23,
        "PBCM30": 46,
        "PCGM00": 47,
        "PDCM00": 49,
        "PCLM10": 62,
        "PDVM00": 65,
        "PEFM00": 66,
        "PGIM10": 156,
        "CPH2145": 157,
        "CPH2201": 158,
        "CPH2009": 159
    },
    "Redmi": {
        "Redmi 4X": 8,
        "Redmi 6": 26,
        "Redmi Note 7": 43,
        "M2010J19SC": 45,
        "M2003J15SC": 59,
        "2201116SG": 162
    },
    "OnePlus": {
        "ONEPLUS A3000": 29,
        "ONEPLUS A6000": 61,
        "PGKM10": 161
    },
    "vivo": {
        "vivo X21A": 30,
        "V1936A": 31,
        "V2005A": 40,
        "V2020A": 41,
        "V1986A": 50,
        "V2054A": 63,
        "V1821A": 76,
        "V1836A": 77,
        "V1901A": 78,
        "V1914A": 79,
        "V1921A": 80,
        "V1932A": 81,
        "V1950A": 82,
        "V1962A": 83,
        "V1965A": 84,
        "V1990A": 86,
        "V2001A": 87,
        "V2002A": 88,
        "V2012A": 89,
        "V2031A": 90,
        "V2034A": 91,
        "V2057A": 92,
        "V2061A": 93,
        "V2141A": 95
    },
    "HUAWEI": {
        "VTR-AL00": 32,
        "EVR-AN00": 33,
        "SLA-AL00": 35,
        "DVC-AN00": 54,
        "PCT-AL10": 64
    },
    "google": {
        "Pixel 3": 67,
        "Pixel 3a": 241,
        "Pixel 3XL": 242,
        "Pixel 4": 243,
        "Pixel 4a": 244,
        "Pixel 6": 245,
        "Pixel 6 Pro": 246,
        "Pixel 5": 236,
        "Pixel 8": 237,
        "Pixel 8 Pro": 238,
        "Pixel 7": 239,
        "Pixel 7 Pro": 240
    },
    "HONOR": {
        "BND-AL10": 37,
        "AKA-AL10": 39,
        "KOZ-AL00": 42,
        "ALA-AN70": 51,
        "AQM-AL10": 52,
        "COL-AL10": 53,
        "EBG-AN10": 55,
        "HJC-AN90": 56,
        "HLK-AL10": 57,
        "KOZ-AL40": 58,
        "TEL-AN00a": 74,
        "TNNH-AN00": 75,
        "YAL-AL50": 94,
        "ELZ-AN00": 151,
        "LGE-AN10": 152
    },
    "TECNO": {
        "TECNO-LG8n": 233
    },
    "INFINIX": {
        "X676B-GL": 234
    }
}
```

**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码 |
| msg | string | 返回消息 |

**请求示例**:

同步请求，随机国内设备信息
GET http://192.168.30.2:10008/modifydev?cmd=2&modifymac=true

异步请求，指定设备型号和语言
GET http://192.168.30.2:10008/modifydev?cmd=2&isSpecifiedModel=true&modelId=xiaomi&language=en&isasync=true


**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

**错误码**:
| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |

**注意事项**:
异步请求返回 请求ID
```
{"code":200,"msg":"185b66ab-1031-4c68-8423-345f8f013927"}
```
然后可以每隔1s  在去查询改任务是否执行成功  由于这里会重置网卡 所以在请求时一定要设置超时处理
//查询异步请求的任务结果
modifydev?cmd=2&query=185b66ab-1031-4c68-8423-345f8f013927
//返回成功
```
{"code":200,"msg":"OK"} 
```
//任务正在执行中...
```
{"code":201,"reason":"busy"}
```
//任务失败超时
```
{"code":202,"reason":"time out"}
```
注意: 任务返回成功后就不在被记录  在此请求则返回任务不存在
```
{"code":202,"reason":"no this task"}
http://192.168.30.2:10008/query=id
{"code": 200,"msg": "2"}
```
### 12. 设置语言

**接口说明**: 设置设备语言，同时会自动更新相关的区域设置和系统环境

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=12`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：12 |
| lang | 是 | string | 语言代码(如：en_US, zh_CN, ja_JP) |
| user_ip | 否 | string | 用户IP，用于确定地理位置相关的设置 |

**请求示例**:
```
# 设置为英语（美国）
GET http://192.168.30.2:10008/modifydev?cmd=11&lang=en_US

# 设置为中文（中国）
GET http://192.168.30.2:10008/modifydev?cmd=11&lang=zh_CN

# 设置为日语（日本），并指定用户IP
GET http://192.168.30.2:10008/modifydev?cmd=11&lang=ja_JP&user_ip=1.2.3.4
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

**错误码**:
| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 1 | 主机不通 |
| 2 | 获取容器API接口失败 |
| 3 | 语言设置失败 |
| 4 | 无效的语言代码 |
| 8000 | 未知错误 |

**注意事项**:
1. 语言设置会影响系统的显示语言、键盘输入法、时间格式等
2. 设置语言后需要等待几秒钟才能完全生效
3. 某些应用可能需要重启才能应用新的语言设置
4. 建议在设置语言后检查系统语言是否已正确更新
5. 支持的语言代码遵循ISO 639-1标准和ISO 3166-1标准的组合
6. 如果设置了user_ip，系统会根据IP自动调整相关的区域设置

### 13. 设置语言和国家

**接口说明**: 设置设备语言和国家

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=13`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：13 |
| language | 是 | string | 语言代码 |
| country | 是 | string | 国家代码 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=13&language=zh_CN&country=US
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 14. 设置经纬度

**接口说明**: 设置设备的地理位置信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=12`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：12 |
| lat | 是 | float | 纬度 |
| lng | 是 | float | 经度 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=12&lat=39.9042&lng=116.4074
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 15. 设置音频资源

**接口说明**: 设置音频资源和播放状态

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=14`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：14 |
| type | 是 | string | 音频类型 （media/webrtc/rtmp/camera）|
| source | 是 | string | 音频资源路径 |
| act | 是 | string | 动作(play/stop) |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=14&type=rtmp&source=/sdcard/music.mp3&act=play
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 16. 设置自定义设备信息

**接口说明**: 设置自定义设备信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=15`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：15 |
| dev_data | 是 | string | 设备信息url编译后的JSON字符串 |
| custom | 是 | string | 指纹信息url编译后的JSON字符串 |


**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=15&dev_data=%7B%27xx%27%3A%27xx%27%7D&custom=%7B%27xx%27%3A%27xx%27%7D
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "ok"
}
```

### 17. 获取剪贴板内容

**接口说明**: 获取设备剪贴板内容

**请求 URL**: `http://{ip}:{port}/clipboard`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| ip | 是 | string | ip |
| port | 是 | string | port |

**请求示例**:
```
GET http://192.168.30.2:10008/clipboard
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "query success",
    "data": {
        "text": ""
    }
}
```

### 18. 设置剪贴板内容

**接口说明**: 设置设备剪贴板内容

**请求 URL**: `http://{ip}:{port}/clipboard`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：2 |
| text | 是 | string | 要设置的文本内容 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=2&text=text
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 19. 查询S5代理状态

**接口说明**: 查询S5代理连接状态

**请求 URL**: `http://{ip}:{port}/proxy`

**请求方式**: GET

**请求参数**: 无

**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码 |
| data | object | 返回数据对象 |
| data.status | string | 查询结果 |
| data.statusText | string | 提示信息 |
| data.addr | string | 代理地址 |
| data.type | int | 代理类型 |
**请求示例**:
```
GET http://192.168.30.2:10008/proxy
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "query success",
    "data": {
        "status": 1,
        "statusText": "已启动",
        "addr": "socks5://user:myt@192.168.30.2:10008",
        "type": 1
    }
}
```

### 20. 设置S5代理

**接口说明**: 设置S5代理连接信息

**请求 URL**: `http://{ip}:{port}/proxy?cmd=2`

**请求方式**: GET

**请求参数**:
| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：2 |
| ip | 是 | string | s5服务器地址 |
| port | 是 | int | s5服务器端口 |
| usr | 是 | string | s5用户名 |
| pwd | 是 | string | s5密码 |
| type | 否 | int | s5域名模式(0:不启用 1:启用 2:默认) |

**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码 |
| msg | string | 返回消息 |

**请求示例**:
```
GET http://192.168.30.2:10008/proxy?cmd=2&ip=192.168.30.2&port=10008&usr=user&pwd=password&type=1
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "start success"
}
```

### 21. 停止S5代理

**接口说明**: 停止S5代理连接

**请求 URL**: `http://{ip}:{port}/proxy?cmd=3`

**请求方式**: GET

**请求参数**:
| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：3 |

**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码 |
| msg | string | 返回消息 |

**请求示例**:
```
GET http://192.168.30.2:10008/proxy?cmd=3
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "stop success"
}
```

### 22. 设置S5域名过滤

**接口说明**: 设置S5代理的域名过滤规则

**请求 URL**: `http://{ip}:{port}/proxy?cmd=4`

**请求方式**: POST

**请求参数**:
| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：4 |

**请求体**: 
直接传入域名列表文本，多个域名用换行符分隔

**返回参数**:
| 参数名 | 类型 | 说明 |
|--------|------|------|
| code | int | 状态码 |
| msg | string | 返回消息 |

**请求示例**:
```
POST http://192.168.30.2:10008/proxy?cmd=4
body
[
    {"key1": "value1"},
    {"key2": "value2"}
]
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "set success"
}
```

**注意事项**:
1. S5代理相关参数也可以在创建和更新安卓容器时进行设置，相关参数如下：
   - s5ip: string - S5服务器地址
   - s5port: int - S5服务器端口
   - s5user: string - S5用户名
   - s5pwd: string - S5密码
   - dnstcp_mode: int - 是否使用dnstcp模式(0:不使用 1:使用)

2. 在使用S5代理时，建议先检查代理服务器的可用性
3. 域名过滤规则的变更会立即生效
4. 如果需要临时禁用S5代理，可以使用停止S5代理接口
5. S5代理的设置会影响所有网络请求的路由

### 23. 设置运动传感器灵敏度

**接口说明**: 设置设备运动传感器的灵敏度

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=20`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：20 |
| factor | 是 | float | 灵敏度系数(0.1-10.0) |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=20&factor=1.5
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 24. 设置摇一摇状态

**接口说明**: 设置设备摇一摇功能的状态

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=17`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：17 |
| shake | 是 | int | 是否启用摇一摇1开启0关闭 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=17&shake=true
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 25. 设置应用权限

**接口说明**: 设置指定应用的权限

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=18`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：18 |
| pkg | 是 | string | 应用包名 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=18&pkg=com.example.app
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "ok"
}
```

### 26. 设置分辨率感知过滤

**接口说明**: 设置应用的分辨率感知过滤

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=19`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：19 |
| pkg | 是 | string | 应用包名 |
| enable | 是 | boolean | 是否启用过滤 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=19&pkg=com.android.mtp&enable=true
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 27. 更新设备信息

**接口说明**: 更新设备的基本信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=21`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：21 |
| data | 是 | string | 设备信息JSON字符串 |

**data参数格式**:
```json
[
    {
        "xx": "xx",
        "xx": "xx"
    }
]
```

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=21&data=[
{"xx": "xx","xx": "xx"}]
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 28. 切换默认输入法

**接口说明**: 切换系统默认输入法

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=20`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：20 |
| input_pkg | 是 | string | 输入法包名 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=20&input_pkg=com.android.gmime/com.android.GmIme
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 29. 旋转摄像头

**接口说明**: 设置摄像头旋转角度和方向

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=22`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：22 |
| rot | 是 | int | 旋转角度(0/90/180/270) |
| face | 否 | int | 前后摄像头(0:后置/1:前置) |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=22&rot=90&face=1
```

**返回示例**:
```json
{
    "code": 200,
    "reason": "rot is limit",
    "msg": "OK"
}
```

### 30. 发送短信

**接口说明**: 发送短信消息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=4`

**请求方式**: POST

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：4 |
| data | 是 | string | 接收号码 |
| content | 是 | string | 短信内容 |
| scaddress | 否 | string | 短信中心号码 |

**请求示例**:
```
POST http://192.168.30.2:10008/sms
请求头 headers = {"Content-Type": "application/json"}
请求体 body = {
    "address": "phone",
    "body": "content",
    "scaddress": "scaddress"
}
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "add inbox success",
    "data": {
        "status": 0
    }
}
```

### 31. 设置全球域名加速

**接口说明**: 启用或禁用全球域名加速功能

**请求 URL**: `http://{ip}:{port}/modifydev?sethost={host}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| host | 是 | string | 是否启用加速 |

**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?sethost=fig.moyunteng.net
```

**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 32. 上传Google证书

**接口说明**: 上传Google服务框架证书

**请求 URL**: `http://{ip}:{port}/uploadkeybox`

**请求方式**: POST

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：29 |
| file_path | 是 | string | 证书文件路径 |

**请求示例**:
```
POST http://192.168.30.2:10008/uploadkeybox
请求体 
form_data 上传文件 
{'fileToUpload': 文件}
```

**返回示例**:
```json
导入完成permissionabc
selinux123
```

### 33. 更新指纹信息

**接口说明**: 更新设备指纹信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=7&data=xx`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：7 |
| data | 是 | string | 设备信息JSON字符串 |

**data参数格式**:
```json
{
    "lac": "12345",
    "cid": "67890",
    "lat": "39.9042",
    "lon": "116.4074",
    "mcc": "460",
    "mnc": "01",
    "phonenumber": "13800138000",
    "country": "CN",
    "language": "zh",
    "timezone": "GMT+8",
    "opercode": "46001",
    "opername": "中国联通",
    "iccid": "89860123456789012345",
    "imsi": "460012345678901",
    "imei": "123456789012345",
    "gaid": "abc123def456"
}
```
**请求示例**:
```
GET http://192.168.30.2:10008/modifydev?cmd=7&data=xx
```
**注意data参数需要转化为json字符串**
**返回示例**:
```json
{
    "code": 200,
    "msg": "OK"
}
```

### 34. 执行ADB命令

**接口说明**: 在设备上执行ADB命令

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=6&cmdline=ls`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明 |
|--------|------|------|------|
| cmd | 是 | int | 固定值：32 |
| adb_cmd | 是 | string | 要执行的ADB命令 |
| timeout | 否 | int | 命令执行超时时间(秒)，默认30秒 |

**请求示例**:
```
# 获取设备属性
GET http://192.168.30.2:10008/modifydev?cmd=6&cmdline=emulator-5554 device
```

**返回示例**:
```json
{
    "code": 200,
    "ret": ""
}
```
### 35. 获取截图

**接口说明**: 在设备上执行ADB命令

**请求 URL**: `http://{ip}:{port}/task=snap&level=2`

**请求方式**: GET

**请求示例**:
```
# 获取设备属性
GET http://192.168.30.2:10008/task=snap&level=2
```

**返回示例**:
![alt text](/img/android/api2.png.jpg)
