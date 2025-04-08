---
slug: /android/mytapi
---

# MytOS API 接口文档

## 目录

1. [设置应用Root权限](#1-设置应用root权限)
2. [导出设备信息](#2-导出设备信息)
3. [导入设备信息](#3-导入设备信息)
4. [隐藏应用信息](#4-隐藏应用信息)
5. [获取视频流地址](#5-获取视频流地址)
6. [设置视频流地址](#6-设置视频流地址)
7. [获取文件列表](#7-获取文件列表)
8. [下载文件](#8-下载文件)
9. [随机设备信息](#9-随机设备信息)
10. [异步随机设备信息](#10-异步随机设备信息)
11. [设置语言](#11-设置语言)
12. [设置语言和国家](#12-设置语言和国家)
13. [设置地理位置](#13-设置地理位置)
14. [设置音频资源](#14-设置音频资源)
15. [设置自定义设备信息](#15-设置自定义设备信息)
16. [获取剪贴板内容](#16-获取剪贴板内容)
17. [设置剪贴板内容](#17-设置剪贴板内容)
18. [查询S5代理状态](#18-查询S5代理状态)
19. [设置S5代理](#19-设置S5代理)
20. [停止S5代理](#20-停止S5代理)
21. [设置S5域名过滤](#21-设置S5域名过滤)
22. [设置运动传感器灵敏度](#22-设置运动传感器灵敏度)
23. [设置摇一摇状态](#23-设置摇一摇状态)
24. [设置应用权限](#24-设置应用权限)
25. [设置分辨率感知过滤](#25-设置分辨率感知过滤)
26. [更新设备信息](#26-更新设备信息)
27. [切换默认输入法](#27-切换默认输入法)
28. [旋转摄像头](#28-旋转摄像头)
29. [发送短信](#29-发送短信)
30. [设置全球域名加速](#30-设置全球域名加速)
31. [上传Google证书](#31-上传Google证书)
32. [更新指纹信息](#32-更新指纹信息)
33. [执行ADB命令](#33-执行ADB命令)

## 接口详情

**ip**: 为安卓手机实例对应的安卓api ip
**port**: 为安卓手机实例对应的安卓api端口

### 1. 设置应用Root权限

**接口说明**: 为指定的应用设置root权限

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=10&pkg={package}&root=true`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型    | 说明             |
| ------ | ---- | ------- | ---------------- |
| cmd    | 是   | int     | 固定值：10       |
| pkg    | 是   | string  | 应用包名         |
| root   | 是   | boolean | 是否启用root权限 |

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
{   "code":201,
    "error":"错误原因"
}


失败:{"code":201,"error":"错误原因"}
```

### 2. 导出设备信息

**接口说明**: 导出当前设备的信息到指定文件

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=8`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明      |
| ------ | ---- | ---- | --------- |
| cmd    | 是   | int  | 固定值：8 |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=8
```

**返回示例**:

```json
成功
{
    "code": 200,
    "ret": "设备信息"
}
失败
{   "code":201,
    "error":"错误原因"
}
```

### 3. 导入设备信息

**接口说明**: 从文件导入设备信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=9&data={encoded_text}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明                  |
| ------ | ---- | ------ | --------------------- |
| cmd    | 是   | int    | 固定值：9             |
| data   | 是   | string | 设备信息，需要URL编码 |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=9&data=eyJkZXZpY2VfaWQiOiJhYmMxMjMifQ%3D%3D

python请求示例
file_path为导出的设备信息文件
url编码方式python举例如下
with open(file_path, "r", encoding='utf-8') as file:
    content = file.read()
url =  "http://192.168.30.2:10008/modifydev?cmd=9&data=" + quote(content)
response = urllib.request.urlopen(url, timeout= 20)  
```

**返回示例**:

```json
成功
{
    "code": 200,
    "msg": "ok"
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{   "code":201,
    "error":"异常原因"
}

```

### 4. 隐藏应用信息

**接口说明**: 隐藏指定的应用

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=3&data=WyJjb20uYW5kcm9pZC5ibHVldG9vdGgiXQ==`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明                                   |
| ------ | ---- | ------ | -------------------------------------- |
| cmd    | 是   | int    | 固定值：3                              |
| data   | 是   | string | Base64 URL安全编码的应用信息JSON字符串 |

**data参数格式**:

```json
'["com.example.app1", "com.example.app1"]'
```

**返回参数**:

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| code   | int    | 状态码(200:成功) |
| msg    | string | 返回消息         |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=3&data=WyJjb20uYW5kcm9pZC5ibHVldG9vdGgiXQ==
python请求示例
arr = '["com.example.app1", "com.example.app1"]'
json_str = json.dumps(arr)
encoded_text = base64.urlsafe_b64encode(app_json_str.encode("utf-8")).decode("utf-8")
url = "http://192.168.30.2:10008/modifydev?cmd=3&data=" + encoded_text
response = urllib.request.urlopen(url)
```

**返回示例**:

```json
成功
{
    "code": 200,
    "msg": "ok"
}
失败
{
    "code":202,
    "reason":"错误原因"
}
```

**错误码**:

| 错误码 | 说明     |
| ------ | -------- |
| 200    | 成功     |
| 其他   | 隐藏失败 |

**注意事项**:

1. 应用包名必须正确,比如传入的app列表是'["com.android.bluetooth"]'进行编码后传就是示例的WyJjb20uYW5kcm9pZC5ibHVldG9vdGgiXQ==
2. JSON字符串需要先进行Base64编码，然后进行URL安全编码

### 5. 获取视频流地址

**接口说明**: 获取当前设备的视频流地址

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=5`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明      |
| ------ | ---- | ---- | --------- |
| cmd    | 是   | int  | 固定值：5 |

**返回参数**:

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| code   | int    | 状态码(200:成功) |
| addr   | string | 视频流地址       |
| type   | int    | 视频流类型       |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=5
```

**返回示例**:

```json
成功
{
    "code":200,
    "path":"视频地址路径",
    "type":"webrtc|image|video"
}

```

**错误码**:

| 错误码 | 说明     |
| ------ | -------- |
| 200    | 成功     |
| 其他   | 获取失败 |

### 6. 设置摄像头视频流

**接口说明**: 设置摄像头视频流

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=4&type={type}&path={addr}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明                          |
| ------ | ---- | ------ | ----------------------------- |
| cmd    | 是   | int    | 固定值：4                     |
| type   | 是   | string | 视频流类型 video webrtc image |
| path   | 是   | string | 视频流地址                    |

**返回参数**:

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| code   | int    | 状态码(200:成功) |
| msg    | string | 返回消息         |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=4&type=video&path=rtmp://server/live
```

**返回示例**:

```json
成功
{
    "code": 200,
    "msg": "OK"
}
失败
{   "code":202,
    "reason":"错误原因"
}
```

### 7. 获取文件列表

**接口说明**: 获取指定目录下的文件列表，支持获取Android实例中的文件列表

**请求 URL**: `http://{ip}:{port}/files?list={path}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明                     |
| ------ | ---- | ------ | ------------------------ |
| list   | 是   | string | 要获取文件列表的目录路径 |

**返回参数**:

| 参数名         | 类型    | 说明                           |
| -------------- | ------- | ------------------------------ |
| code           | int     | 状态码                         |
| files          | array   | 文件列表数组                   |
| files[].file   | string  | 文件完整路径                   |
| files[].flag   | boolean | 是否为文件夹(true:是/false:否) |
| files[].length | int     | 文件大小(字节)                 |
| files[].name   | string  | 文件名称                       |

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

| 错误码 | 说明     |
| ------ | -------- |
| 200    | 成功     |
| 其他   | 获取失败 |

**注意事项**:

1. 该接口可用于获取Android实例中的文件列表
2. 返回的文件大小对于文件夹固定为4096字节
3. 建议使用绝对路径访问文件，以避免路径解析错误

### 8. 下载文件

**接口说明**: 从设备下载指定文件到本地

**请求 URL**: `http://{ip}:{port}/download?path={filepath}`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明             |
| ------ | ---- | ------ | ---------------- |
| path   | 是   | string | 要下载的文件路径 |


**返回参数**:

| 参数名 | 类型   | 说明     |
| ------ | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 返回消息 |

**请求示例**:

```
GET http://192.168.30.2:10008/download?path=/data/prop.txt
```

**返回示例**:
返回文件二进制数据

**错误码**:

| 错误码 | 说明 |
| ------ | ---- |
| 200    | 成功 |


**注意事项**:

1. 文件下载采用流式传输，支持大文件下载
2. 下载过程中会显示下载进度
3. 下载成功后会自动保存到指定的本地路径
4. 如果本地文件已存在，需要先删除或重命名后再下载
5. 建议使用绝对路径访问文件，以避免路径解析错误

### 9. 随机设备信息

### 10. 异步随机设备信息

**接口说明**: 随机更换设备信息，支持同步和异步两种方式

**请求 URL**: 

- 同步方式: `http://{ip}:{port}/modifydev?cmd=2`
- 异步方式: `http://{ip}:{port}/modifydev?cmd=2&isasync=true`

**请求方式**: GET

**请求参数**:

| 参数名           | 必选 | 类型    | 说明                                                         |
| ---------------- | ---- | ------- | ------------------------------------------------------------ |
| cmd              | 是   | int     | 固定值2，表示随机设备信息                                    |
| modifymac        | 否   | boolean | 修改mac地址                                                  |
| random_abroad    | 否   | boolean | 默认为false  随机海外机型                                    |
| userip           | 否   | string  | 使用给定的ip进行区域匹配随机信息                             |
| isasync          | 否   | boolean | 使用异步的方式进行请求 使用该参数后 会立刻返回结果 并给一个唯一ID作为查询请求的参数 |
| isSpecifiedModel | 否   | boolean | 表示指定机型随机                                             |
| modelId          | 否   | int     | 机型参数列表  只有当isSpecifiedModel=true 时生效             |

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

| 参数名 | 类型   | 说明     |
| ------ | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 返回消息 |

**请求示例**:

同步请求，随机国内设备信息
GET http://192.168.30.2:10008/modifydev?cmd=2&modifymac=true

异步请求，指定设备型号和语言
GET http://192.168.30.2:10008/modifydev?cmd=2&isSpecifiedModel=true&modelId=xiaomi&language=en&isasync=true


**返回示例**:

```json
成功
{
    "code": 200,
    "msg": "OK"
}
任务进行中
{
    "code":202,
    "reason":"busy"
} 
任务超时
{
    "code":202,
    "reason":"task timeout"
}  
{
    "code":202,
    "reason":"modify device timeout"
} 


```

**错误码**:

| 错误码 | 说明 |
| ------ | ---- |
| 200    | 成功 |

**注意事项**:
异步请求返回 请求ID

```
{"code":200,"msg":"185b66ab-1031-4c68-8423-345f8f013927"}
```

然后可以每隔1s  在去查询改任务是否执行成功  由于这里会重置网卡 所以在请求时一定要设置超时处理
//查询异步请求的任务结果
modifydev?cmd=2&query=185b66ab-1031-4c68-8423-345f8f013927

```
//返回成功
{"code":200,"msg":"OK"} 
//任务正在执行中...
{"code":201,"reason":"busy"}
//任务失败超时
{"code":202,"reason":"time out"}
注意: 任务返回成功后就不在被记录  在此请求则返回任务不存在
{"code":202,"reason":"no this task"}
http://192.168.30.2:10008/query=id
{"code": 200,"msg": "2"}
```

### 11. 设置语言

**接口说明**: 设置设备语言，同时会自动更新相关的区域设置和系统环境

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=11`

**请求方式**: GET

**请求参数**:

| 参数名  | 必选 | 类型   | 说明                               |
| ------- | ---- | ------ | ---------------------------------- |
| cmd     | 是   | int    | 固定值：11                         |
| lang    | 是   | string | 语言代码(如：en_US, zh_CN, ja_JP)  |
| user_ip | 否   | string | 用户IP，用于确定地理位置相关的设置 |

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

```json、
成功
{
    "code": 200,
    "msg": "OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{
    "code":201,
    "error":"异常原因"
}
```

**错误码**:

| 错误码 | 说明 |
| ------ | ---- |
| 200    | 成功 |

**注意事项**:

1. 语言设置会影响系统的显示语言、键盘输入法、时间格式等
2. 设置语言后需要等待几秒钟才能完全生效
3. 某些应用可能需要重启才能应用新的语言设置
4. 建议在设置语言后检查系统语言是否已正确更新
5. 支持的语言代码遵循ISO 639-1标准和ISO 3166-1标准的组合
6. 如果设置了user_ip，系统会根据IP自动调整相关的区域设置

### 12. 设置语言和国家

**接口说明**: 设置设备语言和国家

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=13`

**请求方式**: GET

**请求参数**:

| 参数名   | 必选 | 类型   | 说明       |
| -------- | ---- | ------ | ---------- |
| cmd      | 是   | int    | 固定值：13 |
| language | 是   | string | 语言代码   |
| country  | 是   | string | 国家代码   |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=13&language=zh_CN&country=US
```

**返回示例**:

```json
成功
{
    "code": 200,
    "msg": "OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{
    "code":201,
    "error":"异常原因"
}
```

### 13. 设置经纬度

**接口说明**: 设置设备的地理位置信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=12`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型  | 说明       |
| ------ | ---- | ----- | ---------- |
| cmd    | 是   | int   | 固定值：12 |
| lat    | 是   | float | 纬度       |
| lng    | 是   | float | 经度       |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=12&lat=39.9042&lng=116.4074
```

**返回示例**:

```json
成功
{
    "code": 200,
    "msg": "OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{
    "code":201,
    "error":"异常原因"
}
```

### 14. 设置音频资源

**接口说明**: 设置音频资源和播放状态

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=14`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明                                  |
| ------ | ---- | ------ | ------------------------------------- |
| cmd    | 是   | int    | 固定值：14                            |
| type   | 是   | string | 音频类型 （media/webrtc/rtmp/camera） |
| source | 是   | string | 音频资源路径                          |
| state  | 是   | string | 动作(play/stop)                       |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=14&type=rtmp&source=/sdcard/music.mp3&state=play
```

**返回示例**:

```json
成功
{
    "code": 200,
    "msg": "OK"
}
{
    "code":202,
    "reason":"失败原因"
}
```

### 15. 设置自定义设备信息

**接口说明**: 设置自定义设备信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=15`

**请求方式**: POST

**请求参数**:

| 参数名 | 必选 | 类型 | 说明       |
| ------ | ---- | ---- | ---------- |
| cmd    | 是   | int  | 固定值：15 |

**post 内容**
**请求示例**:

```
POST http://192.168.30.2:10008/modifydev?cmd=15
custom='{
    "androidId": "1234567890abcdef",
    "iccid": "89860112345678901234",
    "imei": "123456789012345",
    "imsi": "460011234567890",
    "seriesNum": "123456",
    "btaddr": "00:11:22:33:44:55",
    "btname": "MyDeviceBT",
    "wifiMac": "66:77:88:99:AA:BB",
    "wifiName": "MyWiFi",
    "oaid": "ABCDEFGHIJKLMNOP",
    "aaid": "123ABCDEF456GHIJK",
    "vaid": "XYZ1234567890ABC"
}',
dev_data='{"env":[{"id":0,"name":"GL_VERSION","description":7938,"value":"OpenGL ES-CM 1.1 v1.g18p0-01eac0.9e534f339477793d151cc7ab4c27f2c0"},{"id":0,"name":"GL_RENDERER","description":7937,"value":"ARM"},{"id":0,"name":"GL_VENDOR","description":7936,"value":"Mali-G610"},{"id":0,"name":"RADIO_VERSION","description":"ro.radio.noril","value":"N980FXXU5HWAC,N980FXXU5HWAC"},{"id":0,"name":"LCDX","description":"LCDX","value":"720"},{"id":0,"name":"LCDY","description":"LCDY","value":"1280"},{"id":0,"name":"LCDXdpi","description":"LCDXdpi","value":"320.0"},{"id":0,"name":"LCDYdpi","description":"LCDYdpi","value":"320.0"},{"id":0,"name":"density","description":"density","value":"2"},{"id":0,"name":"densityDpi","description":"densityDpi","value":"320"},{"id":0,"name":"WIDEVINE","description":"ID","value":"9c376aef9a5c4d2e95c8df3fc578a0fbad415dcc25474a679b30e2d1590bc849"},{"id":0,"name":"PropRw","description":"gsm.version.baseband","value":"N980FXXU5HWAC,N980FXXU5HWAC","gsm.version.baseband":"N980FXXU5HWAC,N980FXXU5HWAC"},{"id":0,"name":"PropRw","description":"ro.actionable_compatible_property.enabled","value":"true","ro.actionable_compatible_property.enabled":"true"},{"id":0,"name":"PropRw","description":"ro.allow.mock.location","value":"0","ro.allow.mock.location":"0"},{"id":0,"name":"PropRw","description":"ro.audio.monitorOrientation","value":"true","ro.audio.monitorOrientation":"true"},{"id":0,"name":"PropRw","description":"ro.baseband","value":"unknown","ro.baseband":"unknown"},{"id":0,"name":"PropRw","description":"ro.binary.type","value":"user","ro.binary.type":"user"},{"id":0,"name":"PropRw","description":"ro.board.platform","value":"universal990","ro.board.platform":"universal990"},{"id":0,"name":"PropRw","description":"ro.build.2ndbrand","value":"false","ro.build.2ndbrand":"false"},{"id":0,"name":"PropRw","description":"ro.build.PDA","value":"N980FXXU5HWAC","ro.build.PDA":"N980FXXU5HWAC"},{"id":0,"name":"PropRw","description":"ro.build.bsp","value":"","ro.build.bsp":""},{"id":0,"name":"PropRw","description":"ro.build.changelist","value":"25904559","ro.build.changelist":"25904559"},{"id":0,"name":"PropRw","description":"ro.build.characteristics","value":"phone","ro.build.characteristics":"phone"},{"id":0,"name":"PropRw","description":"ro.build.date","value":"Tue Jan 31 18:47:37 KST 2023","ro.build.date":"Tue Jan 31 18:47:37 KST 2023"},{"id":0,"name":"PropRw","description":"ro.build.date.utc","value":"1675158457","ro.build.date.utc":"1675158457"},{"id":0,"name":"PropRw","description":"ro.build.description","value":"c1sxx-user 13 TP1A.220624.014 N980FXXU5HWAC release-keys","ro.build.description":"c1sxx-user 13 TP1A.220624.014 N980FXXU5HWAC release-keys"},{"id":0,"name":"PropRw","description":"ro.build.display.id","value":"TP1A.220624.014.N980FXXU5HWAC","ro.build.display.id":"TP1A.220624.014.N980FXXU5HWAC"},{"id":0,"name":"PropRw","description":"ro.build.display_build_number","value":"true","ro.build.display_build_number":"true"},{"id":0,"name":"PropRw","description":"ro.build.fingerprint","value":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys","ro.build.fingerprint":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys"},{"id":0,"name":"PropRw","description":"ro.build.flavor","value":"c1sxx-user","ro.build.flavor":"c1sxx-user"},{"id":0,"name":"PropRw","description":"ro.build.host","value":"21DKG916","ro.build.host":"21DKG916"},{"id":0,"name":"PropRw","description":"ro.build.id","value":"TP1A.220624.014","ro.build.id":"TP1A.220624.014"},{"id":0,"name":"PropRw","description":"ro.build.official.developer","value":"false","ro.build.official.developer":"false"},{"id":0,"name":"PropRw","description":"ro.build.official.release","value":"true","ro.build.official.release":"true"},{"id":0,"name":"PropRw","description":"ro.build.product","value":"essi","ro.build.product":"essi"},{"id":0,"name":"PropRw","description":"ro.build.selinux","value":"1","ro.build.selinux":"1"},{"id":0,"name":"PropRw","description":"ro.build.selinux.enforce","value":"1","ro.build.selinux.enforce":"1"},{"id":0,"name":"PropRw","description":"ro.build.shutdown_timeout","value":"6","ro.build.shutdown_timeout":"6"},{"id":0,"name":"PropRw","description":"ro.build.system_root_image","value":"false","ro.build.system_root_image":"false"},{"id":0,"name":"PropRw","description":"ro.build.tags","value":"release-keys","ro.build.tags":"release-keys"},{"id":0,"name":"PropRw","description":"ro.build.type","value":"user","ro.build.type":"user"},{"id":0,"name":"PropRw","description":"ro.build.user","value":"dpi","ro.build.user":"dpi"},{"id":0,"name":"PropRw","description":"ro.build.version.all_codenames","value":"REL","ro.build.version.all_codenames":"REL"},{"id":0,"name":"PropRw","description":"ro.build.version.base_os","value":"","ro.build.version.base_os":""},{"id":0,"name":"PropRw","description":"ro.build.version.codename","value":"REL","ro.build.version.codename":"REL"},{"id":0,"name":"PropRw","description":"ro.build.version.incremental","value":"N980FXXU5HWAC","ro.build.version.incremental":"N980FXXU5HWAC"},{"id":0,"name":"PropRw","description":"ro.build.version.min_supported_target_sdk","value":"23","ro.build.version.min_supported_target_sdk":"23"},{"id":0,"name":"PropRw","description":"ro.build.version.oneui","value":"50100","ro.build.version.oneui":"50100"},{"id":0,"name":"PropRw","description":"ro.build.version.preview_sdk","value":"0","ro.build.version.preview_sdk":"0"},{"id":0,"name":"PropRw","description":"ro.build.version.preview_sdk_fingerprint","value":"REL","ro.build.version.preview_sdk_fingerprint":"REL"},{"id":0,"name":"PropRw","description":"ro.build.version.release","value":"12","ro.build.version.release":"12"},{"id":0,"name":"PropRw","description":"ro.build.version.release_or_codename","value":"12","ro.build.version.release_or_codename":"12"},{"id":0,"name":"PropRw","description":"ro.build.version.release_or_preview_display","value":"13","ro.build.version.release_or_preview_display":"13"},{"id":0,"name":"PropRw","description":"ro.build.version.security_index","value":"1","ro.build.version.security_index":"1"},{"id":0,"name":"PropRw","description":"ro.build.version.security_patch","value":"2023-02-01","ro.build.version.security_patch":"2023-02-01"},{"id":0,"name":"PropRw","description":"ro.build.version.sem","value":"3301","ro.build.version.sem":"3301"},{"id":0,"name":"PropRw","description":"ro.build.version.sep","value":"140100","ro.build.version.sep":"140100"},{"id":0,"name":"PropRw","description":"ro.camera.notify_nfc","value":"1","ro.camera.notify_nfc":"1"},{"id":0,"name":"PropRw","description":"ro.camerax.extensions.enabled","value":"true","ro.camerax.extensions.enabled":"true"},{"id":0,"name":"PropRw","description":"ro.carrier","value":"unknown","ro.carrier":"unknown"},{"id":0,"name":"PropRw","description":"ro.channel.officehubrow","value":"SAMSUNG_PRELOAD","ro.channel.officehubrow":"SAMSUNG_PRELOAD"},{"id":0,"name":"PropRw","description":"ro.com.android.dataroaming","value":"true","ro.com.android.dataroaming":"true"},{"id":0,"name":"PropRw","description":"ro.com.google.clientidbase","value":"android-samsung-ss","ro.com.google.clientidbase":"android-samsung-ss"},{"id":0,"name":"PropRw","description":"ro.com.google.clientidbase.ms","value":"android-samsung-gn-rev1","ro.com.google.clientidbase.ms":"android-samsung-gn-rev1"},{"id":0,"name":"PropRw","description":"ro.com.google.clientidbase.vs","value":"android-samsung-gn-rev1","ro.com.google.clientidbase.vs":"android-samsung-gn-rev1"},{"id":0,"name":"PropRw","description":"ro.com.google.gmsversion","value":"13_202211","ro.com.google.gmsversion":"13_202211"},{"id":0,"name":"PropRw","description":"ro.csc.country_code","value":"VIETNAM","ro.csc.country_code":"VIETNAM"},{"id":0,"name":"PropRw","description":"ro.csc.countryiso_code","value":"VN","ro.csc.countryiso_code":"VN"},{"id":0,"name":"PropRw","description":"ro.csc.facebook.partnerid","value":"samsung:dec1cc9c-1497-4aab-b953-cee702c2a481","ro.csc.facebook.partnerid":"samsung:dec1cc9c-1497-4aab-b953-cee702c2a481"},{"id":0,"name":"PropRw","description":"ro.csc.omcnw_code","value":"XXV","ro.csc.omcnw_code":"XXV"},{"id":0,"name":"PropRw","description":"ro.csc.omcnw_code2","value":"XXV","ro.csc.omcnw_code2":"XXV"},{"id":0,"name":"PropRw","description":"ro.csc.sales_code","value":"XXV","ro.csc.sales_code":"XXV"},{"id":0,"name":"PropRw","description":"ro.csc.spotify.music.partnerid","value":"samsung-mobile-preload","ro.csc.spotify.music.partnerid":"samsung-mobile-preload"},{"id":0,"name":"PropRw","description":"ro.csc.spotify.music.referrerid","value":"samsung-mobile-preload","ro.csc.spotify.music.referrerid":"samsung-mobile-preload"},{"id":0,"name":"PropRw","description":"ro.dalvik.vm.native.bridge","value":"0","ro.dalvik.vm.native.bridge":"0"},{"id":0,"name":"PropRw","description":"ro.debug_level","value":"0x494d","ro.debug_level":"0x494d"},{"id":0,"name":"PropRw","description":"ro.default.size","value":"100","ro.default.size":"100"},{"id":0,"name":"PropRw","description":"ro.device.type","value":"1","ro.device.type":"1"},{"id":0,"name":"PropRw","description":"ro.em.version","value":"20","ro.em.version":"20"},{"id":0,"name":"PropRw","description":"ro.factory.tool","value":"0","ro.factory.tool":"0"},{"id":0,"name":"PropRw","description":"ro.flash_img.enable","value":"false","ro.flash_img.enable":"false"},{"id":0,"name":"PropRw","description":"ro.gfx.driver.0","value":"com.samsung.gamedriver.ex990","ro.gfx.driver.0":"com.samsung.gamedriver.ex990"},{"id":0,"name":"PropRw","description":"ro.gfx.driver.1","value":"com.samsung.pregpudriver.ex990","ro.gfx.driver.1":"com.samsung.pregpudriver.ex990"},{"id":0,"name":"PropRw","description":"ro.gms.dck.eligible_wcc","value":"1","ro.gms.dck.eligible_wcc":"1"},{"id":0,"name":"PropRw","description":"ro.hardware","value":"exynos990","ro.hardware":"exynos990"},{"id":0,"name":"PropRw","description":"ro.hardware.audio.primary","value":"goldfish","ro.hardware.audio.primary":"goldfish"},{"id":0,"name":"PropRw","description":"ro.hardware.keystore","value":"mdfpp","ro.hardware.keystore":"mdfpp"},{"id":0,"name":"PropRw","description":"ro.hardware.keystore_desede","value":"true","ro.hardware.keystore_desede":"true"},{"id":0,"name":"PropRw","description":"ro.hardware.vulkan","value":"mali","ro.hardware.vulkan":"mali"},{"id":0,"name":"PropRw","description":"ro.hw.use_disable_composition_type_gles","value":"1","ro.hw.use_disable_composition_type_gles":"1"},{"id":0,"name":"PropRw","description":"ro.hw.use_hwc_services","value":"1","ro.hw.use_hwc_services":"1"},{"id":0,"name":"PropRw","description":"ro.hw.use_secure_encoder_only","value":"1","ro.hw.use_secure_encoder_only":"1"},{"id":0,"name":"PropRw","description":"ro.hw.use_virtual_display","value":"1","ro.hw.use_virtual_display":"1"},{"id":0,"name":"PropRw","description":"ro.hwui.use_vulkan","value":"","ro.hwui.use_vulkan":""},{"id":0,"name":"PropRw","description":"ro.iorapd.enable","value":"true","ro.iorapd.enable":"true"},{"id":0,"name":"PropRw","description":"ro.kernel.android.checkjni","value":"0","ro.kernel.android.checkjni":"0"},{"id":0,"name":"PropRw","description":"ro.kernel.qemu","value":"0","ro.kernel.qemu":"0"},{"id":0,"name":"PropRw","description":"ro.kernel.version","value":"4.19","ro.kernel.version":"4.19"},{"id":0,"name":"PropRw","description":"ro.linkedin.channel","value":"samsung_preload","ro.linkedin.channel":"samsung_preload"},{"id":0,"name":"PropRw","description":"ro.logd.auditd","value":"false","ro.logd.auditd":"false"},{"id":0,"name":"PropRw","description":"ro.logd.size.stats","value":"64K","ro.logd.size.stats":"64K"},{"id":0,"name":"PropRw","description":"ro.multisim.simslotcount","value":"2","ro.multisim.simslotcount":"2"},{"id":0,"name":"PropRw","description":"ro.netflix.channel","value":"2eb27aa0-3926-11e9-8c73-9b498cd1a550","ro.netflix.channel":"2eb27aa0-3926-11e9-8c73-9b498cd1a550"},{"id":0,"name":"PropRw","description":"ro.netflix.signup","value":"1","ro.netflix.signup":"1"},{"id":0,"name":"PropRw","description":"ro.odm.build.date","value":"Tue Jan 31 18:47:19 KST 2023","ro.odm.build.date":"Tue Jan 31 18:47:19 KST 2023"},{"id":0,"name":"PropRw","description":"ro.odm.build.date.utc","value":"1675158439","ro.odm.build.date.utc":"1675158439"},{"id":0,"name":"PropRw","description":"ro.odm.build.fingerprint","value":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys","ro.odm.build.fingerprint":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys"},{"id":0,"name":"PropRw","description":"ro.odm.build.version.incremental","value":"N980FXXU5HWAC","ro.odm.build.version.incremental":"N980FXXU5HWAC"},{"id":0,"name":"PropRw","description":"ro.odm_dlkm.build.fingerprint","value":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys","ro.odm_dlkm.build.fingerprint":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys"},{"id":0,"name":"PropRw","description":"ro.oem.key1","value":"XXV","ro.oem.key1":"XXV"},{"id":0,"name":"PropRw","description":"ro.omc.build.id","value":"61830694","ro.omc.build.id":"61830694"},{"id":0,"name":"PropRw","description":"ro.omc.build.version","value":"N980FOXM5HWAC","ro.omc.build.version":"N980FOXM5HWAC"},{"id":0,"name":"PropRw","description":"ro.omc.changetype","value":"DATA_RESET_ON,TRUE","ro.omc.changetype":"DATA_RESET_ON,TRUE"},{"id":0,"name":"PropRw","description":"ro.omc.disabler","value":"FALSE","ro.omc.disabler":"FALSE"},{"id":0,"name":"PropRw","description":"ro.omc.img_mount","value":"0","ro.omc.img_mount":"0"},{"id":0,"name":"PropRw","description":"ro.omc.multi_csc","value":"OXM","ro.omc.multi_csc":"OXM"},{"id":0,"name":"PropRw","description":"ro.opa.eligible_device","value":"true","ro.opa.eligible_device":"true"},{"id":0,"name":"PropRw","description":"ro.opengles.version","value":"196610","ro.opengles.version":"196610"},{"id":0,"name":"PropRw","description":"ro.postinstall.fstab.prefix","value":"\/system","ro.postinstall.fstab.prefix":"\/system"},{"id":0,"name":"PropRw","description":"ro.product.board","value":"exynos990","ro.product.board":"exynos990"},{"id":0,"name":"PropRw","description":"ro.product.brand","value":"samsung","ro.product.brand":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.build.date","value":"Tue Jan 31 18:47:37 KST 2023","ro.product.build.date":"Tue Jan 31 18:47:37 KST 2023"},{"id":0,"name":"PropRw","description":"ro.product.build.date.utc","value":"1675158457","ro.product.build.date.utc":"1675158457"},{"id":0,"name":"PropRw","description":"ro.product.build.fingerprint","value":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys","ro.product.build.fingerprint":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys"},{"id":0,"name":"PropRw","description":"ro.product.build.id","value":"TP1A.220624.014","ro.product.build.id":"TP1A.220624.014"},{"id":0,"name":"PropRw","description":"ro.product.build.tags","value":"release-keys","ro.product.build.tags":"release-keys"},{"id":0,"name":"PropRw","description":"ro.product.build.type","value":"user","ro.product.build.type":"user"},{"id":0,"name":"PropRw","description":"ro.product.build.version.incremental","value":"N980FXXU5HWAC","ro.product.build.version.incremental":"N980FXXU5HWAC"},{"id":0,"name":"PropRw","description":"ro.product.build.version.release","value":"12","ro.product.build.version.release":"12"},{"id":0,"name":"PropRw","description":"ro.product.build.version.release_or_codename","value":"12","ro.product.build.version.release_or_codename":"12"},{"id":0,"name":"PropRw","description":"ro.product.cpu.abi","value":"arm64-v8a","ro.product.cpu.abi":"arm64-v8a"},{"id":0,"name":"PropRw","description":"ro.product.device","value":"c1s","ro.product.device":"c1s"},{"id":0,"name":"PropRw","description":"ro.product.locale","value":"en-GB","ro.product.locale":"en-GB"},{"id":0,"name":"PropRw","description":"ro.product.manufacturer","value":"samsung","ro.product.manufacturer":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.model","value":"SM-N980F","ro.product.model":"SM-N980F"},{"id":0,"name":"PropRw","description":"ro.product.name","value":"c1sxx","ro.product.name":"c1sxx"},{"id":0,"name":"PropRw","description":"ro.product.odm.brand","value":"samsung","ro.product.odm.brand":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.odm.device","value":"c1s","ro.product.odm.device":"c1s"},{"id":0,"name":"PropRw","description":"ro.product.odm.manufacturer","value":"samsung","ro.product.odm.manufacturer":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.odm.model","value":"SM-N980F","ro.product.odm.model":"SM-N980F"},{"id":0,"name":"PropRw","description":"ro.product.odm.name","value":"c1sxx","ro.product.odm.name":"c1sxx"},{"id":0,"name":"PropRw","description":"ro.product.odm_dlkm.brand","value":"samsung","ro.product.odm_dlkm.brand":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.odm_dlkm.device","value":"c1s","ro.product.odm_dlkm.device":"c1s"},{"id":0,"name":"PropRw","description":"ro.product.odm_dlkm.manufacturer","value":"samsung","ro.product.odm_dlkm.manufacturer":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.odm_dlkm.model","value":"SM-N980F","ro.product.odm_dlkm.model":"SM-N980F"},{"id":0,"name":"PropRw","description":"ro.product.odm_dlkm.name","value":"c1sxx","ro.product.odm_dlkm.name":"c1sxx"},{"id":0,"name":"PropRw","description":"ro.product.product.brand","value":"samsung","ro.product.product.brand":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.product.device","value":"essi","ro.product.product.device":"essi"},{"id":0,"name":"PropRw","description":"ro.product.product.manufacturer","value":"samsung","ro.product.product.manufacturer":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.product.model","value":"SM-N980F","ro.product.product.model":"SM-N980F"},{"id":0,"name":"PropRw","description":"ro.product.product.name","value":"c1sxx","ro.product.product.name":"c1sxx"},{"id":0,"name":"PropRw","description":"ro.product.system.brand","value":"samsung","ro.product.system.brand":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.system.device","value":"c1s","ro.product.system.device":"c1s"},{"id":0,"name":"PropRw","description":"ro.product.system.manufacturer","value":"samsung","ro.product.system.manufacturer":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.system.model","value":"SM-N980F","ro.product.system.model":"SM-N980F"},{"id":0,"name":"PropRw","description":"ro.product.system.name","value":"c1sxx","ro.product.system.name":"c1sxx"},{"id":0,"name":"PropRw","description":"ro.product.system_ext.brand","value":"samsung","ro.product.system_ext.brand":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.system_ext.device","value":"c1s","ro.product.system_ext.device":"c1s"},{"id":0,"name":"PropRw","description":"ro.product.system_ext.manufacturer","value":"samsung","ro.product.system_ext.manufacturer":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.system_ext.model","value":"SM-N980F","ro.product.system_ext.model":"SM-N980F"},{"id":0,"name":"PropRw","description":"ro.product.system_ext.name","value":"c1sxx","ro.product.system_ext.name":"c1sxx"},{"id":0,"name":"PropRw","description":"ro.product.vendor.brand","value":"samsung","ro.product.vendor.brand":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.vendor.device","value":"c1s","ro.product.vendor.device":"c1s"},{"id":0,"name":"PropRw","description":"ro.product.vendor.manufacturer","value":"samsung","ro.product.vendor.manufacturer":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.vendor.model","value":"SM-N980F","ro.product.vendor.model":"SM-N980F"},{"id":0,"name":"PropRw","description":"ro.product.vendor.name","value":"c1sxx","ro.product.vendor.name":"c1sxx"},{"id":0,"name":"PropRw","description":"ro.product.vendor_dlkm.brand","value":"samsung","ro.product.vendor_dlkm.brand":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.vendor_dlkm.device","value":"c1s","ro.product.vendor_dlkm.device":"c1s"},{"id":0,"name":"PropRw","description":"ro.product.vendor_dlkm.manufacturer","value":"samsung","ro.product.vendor_dlkm.manufacturer":"samsung"},{"id":0,"name":"PropRw","description":"ro.product.vendor_dlkm.model","value":"SM-N980F","ro.product.vendor_dlkm.model":"SM-N980F"},{"id":0,"name":"PropRw","description":"ro.product.vendor_dlkm.name","value":"c1sxx","ro.product.vendor_dlkm.name":"c1sxx"},{"id":0,"name":"PropRw","description":"ro.product_ship","value":"true","ro.product_ship":"true"},{"id":0,"name":"PropRw","description":"ro.property_service.version","value":"2","ro.property_service.version":"2"},{"id":0,"name":"PropRw","description":"ro.ril.def_network_after_check_tdscdma","value":"9","ro.ril.def_network_after_check_tdscdma":"9"},{"id":0,"name":"PropRw","description":"ro.ril.ecclist","value":"112,911","ro.ril.ecclist":"112,911"},{"id":0,"name":"PropRw","description":"ro.ril.support_cdma","value":"false","ro.ril.support_cdma":"false"},{"id":0,"name":"PropRw","description":"ro.ril.svdo","value":"false","ro.ril.svdo":"false"},{"id":0,"name":"PropRw","description":"ro.ril.svlte1x","value":"false","ro.ril.svlte1x":"false"},{"id":0,"name":"PropRw","description":"ro.security.bapcheck","value":"2","ro.security.bapcheck":"2"},{"id":0,"name":"PropRw","description":"ro.security.bt.release","value":"1","ro.security.bt.release":"1"},{"id":0,"name":"PropRw","description":"ro.security.bt.ver","value":"1.0","ro.security.bt.ver":"1.0"},{"id":0,"name":"PropRw","description":"ro.security.cass.feature","value":"1","ro.security.cass.feature":"1"},{"id":0,"name":"PropRw","description":"ro.security.ese.cosname","value":"JCOP5.3U_00353152","ro.security.ese.cosname":"JCOP5.3U_00353152"},{"id":0,"name":"PropRw","description":"ro.security.esest","value":"NOT_OFFICIAL_00353144","ro.security.esest":"NOT_OFFICIAL_00353144"},{"id":0,"name":"PropRw","description":"ro.security.fips.ux","value":"Enabled","ro.security.fips.ux":"Enabled"},{"id":0,"name":"PropRw","description":"ro.security.fips_bssl.ver","value":"1.7","ro.security.fips_bssl.ver":"1.7"},{"id":0,"name":"PropRw","description":"ro.security.fips_fmp.ver","value":"2.0","ro.security.fips_fmp.ver":"2.0"},{"id":0,"name":"PropRw","description":"ro.security.fips_scrypto.ver","value":"2.5","ro.security.fips_scrypto.ver":"2.5"},{"id":0,"name":"PropRw","description":"ro.security.fips_skc.ver","value":"2.1","ro.security.fips_skc.ver":"2.1"},{"id":0,"name":"PropRw","description":"ro.security.keystore.keytype","value":"sakv2,gak,sgak","ro.security.keystore.keytype":"sakv2,gak,sgak"},{"id":0,"name":"PropRw","description":"ro.security.mdf.release","value":"1","ro.security.mdf.release":"1"},{"id":0,"name":"PropRw","description":"ro.security.mdf.ux","value":"Enabled","ro.security.mdf.ux":"Enabled"},{"id":0,"name":"PropRw","description":"ro.security.mdf.ver","value":"3.2","ro.security.mdf.ver":"3.2"},{"id":0,"name":"PropRw","description":"ro.security.reactive.version","value":"2.0.13","ro.security.reactive.version":"2.0.13"},{"id":0,"name":"PropRw","description":"ro.security.vpnpp.release","value":"1.0","ro.security.vpnpp.release":"1.0"},{"id":0,"name":"PropRw","description":"ro.security.vpnpp.ver","value":"2.4","ro.security.vpnpp.ver":"2.4"},{"id":0,"name":"PropRw","description":"ro.security.wlan.release","value":"2","ro.security.wlan.release":"2"},{"id":0,"name":"PropRw","description":"ro.security.wlan.ver","value":"1.0","ro.security.wlan.ver":"1.0"},{"id":0,"name":"PropRw","description":"ro.setupwizard.mode","value":"OPTIONAL","ro.setupwizard.mode":"OPTIONAL"},{"id":0,"name":"PropRw","description":"ro.setupwizard.rotation_locked","value":"false","ro.setupwizard.rotation_locked":"false"},{"id":0,"name":"PropRw","description":"ro.setupwizard.wifi_on_exit","value":"false","ro.setupwizard.wifi_on_exit":"false"},{"id":0,"name":"PropRw","description":"ro.simbased.changetype","value":"NO_DFLT_CSC,OMC","ro.simbased.changetype":"NO_DFLT_CSC,OMC"},{"id":0,"name":"PropRw","description":"ro.slmk.2nd.custom_sw_limit","value":"325","ro.slmk.2nd.custom_sw_limit":"325"},{"id":0,"name":"PropRw","description":"ro.slmk.2nd.dha_cached_max","value":"20","ro.slmk.2nd.dha_cached_max":"20"},{"id":0,"name":"PropRw","description":"ro.slmk.2nd.dha_cached_min","value":"3","ro.slmk.2nd.dha_cached_min":"3"},{"id":0,"name":"PropRw","description":"ro.slmk.2nd.dha_empty_max","value":"30","ro.slmk.2nd.dha_empty_max":"30"},{"id":0,"name":"PropRw","description":"ro.slmk.2nd.dha_empty_min","value":"8","ro.slmk.2nd.dha_empty_min":"8"},{"id":0,"name":"PropRw","description":"ro.slmk.2nd.freelimit_val","value":"13","ro.slmk.2nd.freelimit_val":"13"},{"id":0,"name":"PropRw","description":"ro.slmk.2nd.use_crikill_booster","value":"true","ro.slmk.2nd.use_crikill_booster":"true"},{"id":0,"name":"PropRw","description":"ro.slmk.2nd.use_drkill_boost","value":"true","ro.slmk.2nd.use_drkill_boost":"true"},{"id":0,"name":"PropRw","description":"ro.slmk.base_swaptotal","value":"2560","ro.slmk.base_swaptotal":"2560"},{"id":0,"name":"PropRw","description":"ro.slmk.cam_dha_ver","value":"3","ro.slmk.cam_dha_ver":"3"},{"id":0,"name":"PropRw","description":"ro.slmk.chimera_strategy_8gb","value":"2100,24,10,2550","ro.slmk.chimera_strategy_8gb":"2100,24,10,2550"},{"id":0,"name":"PropRw","description":"ro.slmk.custom_sw_limit","value":"325","ro.slmk.custom_sw_limit":"325"},{"id":0,"name":"PropRw","description":"ro.slmk.dha_2ndprop_thMB","value":"8192","ro.slmk.dha_2ndprop_thMB":"8192"},{"id":0,"name":"PropRw","description":"ro.slmk.dha_cached_max","value":"18","ro.slmk.dha_cached_max":"18"},{"id":0,"name":"PropRw","description":"ro.slmk.dha_cached_min","value":"4","ro.slmk.dha_cached_min":"4"},{"id":0,"name":"PropRw","description":"ro.slmk.dha_empty_max","value":"30","ro.slmk.dha_empty_max":"30"},{"id":0,"name":"PropRw","description":"ro.slmk.dha_empty_min","value":"8","ro.slmk.dha_empty_min":"8"},{"id":0,"name":"PropRw","description":"ro.slmk.dha_pwhl_key","value":"540","ro.slmk.dha_pwhl_key":"540"},{"id":0,"name":"PropRw","description":"ro.slmk.freelimit_val","value":"13","ro.slmk.freelimit_val":"13"},{"id":0,"name":"PropRw","description":"ro.slmk.psi_critical","value":"100","ro.slmk.psi_critical":"100"},{"id":0,"name":"PropRw","description":"ro.slmk.psi_medium","value":"70","ro.slmk.psi_medium":"70"},{"id":0,"name":"PropRw","description":"ro.slmk.use_crikill_booster","value":"true","ro.slmk.use_crikill_booster":"true"},{"id":0,"name":"PropRw","description":"ro.slmk.use_drkill_boost","value":"true","ro.slmk.use_drkill_boost":"true"},{"id":0,"name":"PropRw","description":"ro.soc.manufacturer","value":"samsung","ro.soc.manufacturer":"samsung"},{"id":0,"name":"PropRw","description":"ro.soc.model","value":"Exynos 990","ro.soc.model":"Exynos 990"},{"id":0,"name":"PropRw","description":"ro.storage.support.sdcard","value":"0","ro.storage.support.sdcard":"0"},{"id":0,"name":"PropRw","description":"ro.sts.property","value":"FALSE","ro.sts.property":"FALSE"},{"id":0,"name":"PropRw","description":"ro.system.build.date","value":"Tue Jan 31 18:47:37 KST 2023","ro.system.build.date":"Tue Jan 31 18:47:37 KST 2023"},{"id":0,"name":"PropRw","description":"ro.system.build.date.utc","value":"1675158457","ro.system.build.date.utc":"1675158457"},{"id":0,"name":"PropRw","description":"ro.system.build.fingerprint","value":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys","ro.system.build.fingerprint":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys"},{"id":0,"name":"PropRw","description":"ro.system.build.id","value":"TP1A.220624.014","ro.system.build.id":"TP1A.220624.014"},{"id":0,"name":"PropRw","description":"ro.system.build.tags","value":"release-keys","ro.system.build.tags":"release-keys"},{"id":0,"name":"PropRw","description":"ro.system.build.type","value":"user","ro.system.build.type":"user"},{"id":0,"name":"PropRw","description":"ro.system.build.version.incremental","value":"N980FXXU5HWAC","ro.system.build.version.incremental":"N980FXXU5HWAC"},{"id":0,"name":"PropRw","description":"ro.system.build.version.release","value":"12","ro.system.build.version.release":"12"},{"id":0,"name":"PropRw","description":"ro.system.build.version.release_or_codename","value":"12","ro.system.build.version.release_or_codename":"12"},{"id":0,"name":"PropRw","description":"ro.system.build.version.sehi","value":"3303","ro.system.build.version.sehi":"3303"},{"id":0,"name":"PropRw","description":"ro.system.qb.id","value":"61830694","ro.system.qb.id":"61830694"},{"id":0,"name":"PropRw","description":"ro.system_ext.build.date","value":"Tue Jan 31 18:47:37 KST 2023","ro.system_ext.build.date":"Tue Jan 31 18:47:37 KST 2023"},{"id":0,"name":"PropRw","description":"ro.system_ext.build.date.utc","value":"1675158457","ro.system_ext.build.date.utc":"1675158457"},{"id":0,"name":"PropRw","description":"ro.system_ext.build.fingerprint","value":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys","ro.system_ext.build.fingerprint":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys"},{"id":0,"name":"PropRw","description":"ro.system_ext.build.id","value":"TP1A.220624.014","ro.system_ext.build.id":"TP1A.220624.014"},{"id":0,"name":"PropRw","description":"ro.system_ext.build.tags","value":"release-keys","ro.system_ext.build.tags":"release-keys"},{"id":0,"name":"PropRw","description":"ro.system_ext.build.type","value":"user","ro.system_ext.build.type":"user"},{"id":0,"name":"PropRw","description":"ro.system_ext.build.version.incremental","value":"N980FXXU5HWAC","ro.system_ext.build.version.incremental":"N980FXXU5HWAC"},{"id":0,"name":"PropRw","description":"ro.system_ext.build.version.release","value":"12","ro.system_ext.build.version.release":"12"},{"id":0,"name":"PropRw","description":"ro.system_ext.build.version.release_or_codename","value":"12","ro.system_ext.build.version.release_or_codename":"12"},{"id":0,"name":"PropRw","description":"ro.target.product","value":"default","ro.target.product":"default"},{"id":0,"name":"PropRw","description":"ro.telephony.default_cdma_sub","value":"0","ro.telephony.default_cdma_sub":"0"},{"id":0,"name":"PropRw","description":"ro.telephony.default_network","value":"9","ro.telephony.default_network":"9"},{"id":0,"name":"PropRw","description":"ro.telephony.iwlan_operation_mode","value":"legacy","ro.telephony.iwlan_operation_mode":"legacy"},{"id":0,"name":"PropRw","description":"ro.tether.denied","value":"false","ro.tether.denied":"false"},{"id":0,"name":"PropRw","description":"ro.treble.enabled","value":"true","ro.treble.enabled":"true"},{"id":0,"name":"PropRw","description":"ro.vendor.build.date","value":"Tue Jan 31 18:47:19 KST 2023","ro.vendor.build.date":"Tue Jan 31 18:47:19 KST 2023"},{"id":0,"name":"PropRw","description":"ro.vendor.build.date.utc","value":"1675158439","ro.vendor.build.date.utc":"1675158439"},{"id":0,"name":"PropRw","description":"ro.vendor.build.fingerprint","value":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys","ro.vendor.build.fingerprint":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys"},{"id":0,"name":"PropRw","description":"ro.vendor.build.id","value":"RP1A.200720.012","ro.vendor.build.id":"RP1A.200720.012"},{"id":0,"name":"PropRw","description":"ro.vendor.build.tags","value":"release-keys","ro.vendor.build.tags":"release-keys"},{"id":0,"name":"PropRw","description":"ro.vendor.build.type","value":"user","ro.vendor.build.type":"user"},{"id":0,"name":"PropRw","description":"ro.vendor.build.version.incremental","value":"N980FXXU5HWAC","ro.vendor.build.version.incremental":"N980FXXU5HWAC"},{"id":0,"name":"PropRw","description":"ro.vendor.build.version.release","value":"12","ro.vendor.build.version.release":"12"},{"id":0,"name":"PropRw","description":"ro.vendor.build.version.release_or_codename","value":"12","ro.vendor.build.version.release_or_codename":"12"},{"id":0,"name":"PropRw","description":"ro.vendor.frameratelock","value":"true","ro.vendor.frameratelock":"true"},{"id":0,"name":"PropRw","description":"ro.vendor.mpp_buf_type","value":"1","ro.vendor.mpp_buf_type":"1"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.date","value":"Sun Mar 30 10:45:35 UTC 2025","ro.vendor_dlkm.build.date":"Sun Mar 30 10:45:35 UTC 2025"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.date.utc","value":"1743331535","ro.vendor_dlkm.build.date.utc":"1743331535"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.fingerprint","value":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys","ro.vendor_dlkm.build.fingerprint":"samsung\/c1sxx\/c1s:13\/TP1A.220624.014\/N980FXXU5HWAC:user\/release-keys"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.id","value":"SQ3A.220705.003.A1","ro.vendor_dlkm.build.id":"SQ3A.220705.003.A1"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.tags","value":"release-keys","ro.vendor_dlkm.build.tags":"release-keys"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.type","value":"user","ro.vendor_dlkm.build.type":"user"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.version.incremental","value":"104540","ro.vendor_dlkm.build.version.incremental":"104540"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.version.release","value":"12","ro.vendor_dlkm.build.version.release":"12"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.version.release_or_codename","value":"12","ro.vendor_dlkm.build.version.release_or_codename":"12"},{"id":0,"name":"PropRw","description":"ro.vendor_dlkm.build.version.sdk","value":"31","ro.vendor_dlkm.build.version.sdk":"31"},{"id":0,"name":"PropRw","description":"ro.wifi.channels","value":"","ro.wifi.channels":""},{"id":0,"name":"PropRw","description":"ro.wifi.sleep.power.down","value":"true","ro.wifi.sleep.power.down":"true"}],"sensors":[{"Name":"LSM6DSO Accelerometer","Vendor":"STM","StringType":"android.sensor.accelerometer","Version":15932,"Type":1,"MinDelay":2000,"FifoReservedEventCount":3000,"MaxDelay":180000,"Id":0,"MaxRange":78.45320129394531,"Resolution":0.002394201699644327,"Power":0.20000000298023224,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"LSM6DSO Gyroscope","Vendor":"STM","StringType":"android.sensor.gyroscope","Version":1,"Type":4,"MinDelay":2000,"FifoReservedEventCount":0,"MaxDelay":180000,"Id":0,"MaxRange":17.453031539916992,"Resolution":6.108652451075613E-4,"Power":0.30000001192092896,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"AK09918C Uncalibrated Magnetometer","Vendor":"AKM","StringType":"android.sensor.magnetic_field_uncalibrated","Version":1,"Type":14,"MinDelay":10000,"FifoReservedEventCount":600,"MaxDelay":200000,"Id":0,"MaxRange":1999.97998046875,"Resolution":0.05999999865889549,"Power":0.6000000238418579,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"AK09918C Magnetometer","Vendor":"AKM","StringType":"android.sensor.magnetic_field","Version":1,"Type":2,"MinDelay":10000,"FifoReservedEventCount":0,"MaxDelay":200000,"Id":0,"MaxRange":1999.97998046875,"Resolution":0.05999999865889549,"Power":0.6000000238418579,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"LPS22HHTR Barometer","Vendor":"STM","StringType":"android.sensor.pressure","Version":1,"Type":6,"MinDelay":100000,"FifoReservedEventCount":300,"MaxDelay":1000000,"Id":0,"MaxRange":1260,"Resolution":2.44140625E-4,"Power":0.019999999552965164,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"TMD4907 Proximity","Vendor":"AMS","StringType":"com.samsung.sensor.physical_proximity","Version":1001,"Type":65592,"MinDelay":0,"FifoReservedEventCount":300,"MaxDelay":0,"Id":0,"MaxRange":8,"Resolution":1,"Power":1.2000000476837158,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"TMD4907 Light","Vendor":"AMS","StringType":"com.samsung.sensor.autobrightness","Version":1,"Type":65601,"MinDelay":200000,"FifoReservedEventCount":0,"MaxDelay":200000,"Id":0,"MaxRange":60000,"Resolution":1,"Power":0.20000000298023224,"Flags":2,"RequiredPermission":"RequiredPermission"},{"Name":"TMD4907 Proximity Raw","Vendor":"AMS","StringType":"com.samsung.sensor.proximity_alert","Version":1,"Type":65582,"MinDelay":20000,"FifoReservedEventCount":0,"MaxDelay":60000,"Id":0,"MaxRange":10,"Resolution":10,"Power":1.2000000476837158,"Flags":2,"RequiredPermission":"RequiredPermission"},{"Name":"Step Detector Sensor","Vendor":"Samsung Electronics","StringType":"android.sensor.step_detector","Version":1,"Type":18,"MinDelay":0,"FifoReservedEventCount":150,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":6,"RequiredPermission":"RequiredPermission"},{"Name":"Significant Motion Sensor","Vendor":"Samsung Electronics","StringType":"android.sensor.significant_motion","Version":2,"Type":17,"MinDelay":-1,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":5,"RequiredPermission":"RequiredPermission"},{"Name":"LSM6DSO Uncalibrated Gyroscope","Vendor":"STM","StringType":"android.sensor.gyroscope_uncalibrated","Version":1,"Type":16,"MinDelay":2000,"FifoReservedEventCount":0,"MaxDelay":180000,"Id":0,"MaxRange":17.453031539916992,"Resolution":6.108652451075613E-4,"Power":0.30000001192092896,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"Game Rotation Vector","Vendor":"Samsung Electronics","StringType":"android.sensor.game_rotation_vector","Version":1,"Type":15,"MinDelay":10000,"FifoReservedEventCount":300,"MaxDelay":200000,"Id":0,"MaxRange":1,"Resolution":5.9604644775390625E-8,"Power":0.5,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"Samsung Rotation Vector","Vendor":"Samsung Electronics","StringType":"android.sensor.rotation_vector","Version":1,"Type":11,"MinDelay":10000,"FifoReservedEventCount":0,"MaxDelay":200000,"Id":0,"MaxRange":1,"Resolution":5.9604644775390625E-8,"Power":1.100000023841858,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"Step Counter Sensor","Vendor":"Samsung Electronics","StringType":"android.sensor.step_counter","Version":1,"Type":19,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":4294967296,"Resolution":1,"Power":0.30000001192092896,"Flags":2,"RequiredPermission":"RequiredPermission"},{"Name":"TMD4907 Light IR","Vendor":"AMS","StringType":"com.samsung.sensor.light_ir","Version":1,"Type":65578,"MinDelay":200000,"FifoReservedEventCount":0,"MaxDelay":200000,"Id":0,"MaxRange":60000,"Resolution":1,"Power":0.20000000298023224,"Flags":2,"RequiredPermission":"RequiredPermission"},{"Name":"LSM6DSO Interrupt Gyroscope","Vendor":"STM","StringType":"com.samsung.sensor.interrupt_gyro","Version":1,"Type":65579,"MinDelay":20000,"FifoReservedEventCount":0,"MaxDelay":20000,"Id":0,"MaxRange":17.453292846679688,"Resolution":0.0012217304902151227,"Power":0.061000000685453415,"Flags":2,"RequiredPermission":"RequiredPermission"},{"Name":"Tilt Detector","Vendor":"Samsung Electronics","StringType":"android.sensor.tilt_detector","Version":1,"Type":22,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":7,"RequiredPermission":"RequiredPermission"},{"Name":"Pick Up Gesture","Vendor":"Samsung Electronics","StringType":"android.sensor.pick_up_gesture","Version":1,"Type":25,"MinDelay":-1,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":5,"RequiredPermission":"RequiredPermission"},{"Name":"TMD4907 Light CCT","Vendor":"AMS","StringType":"com.samsung.sensor.light_cct","Version":1,"Type":65587,"MinDelay":200000,"FifoReservedEventCount":0,"MaxDelay":200000,"Id":0,"MaxRange":60000,"Resolution":1,"Power":0.20000000298023224,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"LSM6DSO Uncalibrated Accelerometer","Vendor":"STM","StringType":"android.sensor.accelerometer_uncalibrated","Version":1,"Type":35,"MinDelay":2000,"FifoReservedEventCount":3000,"MaxDelay":180000,"Id":0,"MaxRange":78.45320129394531,"Resolution":0.002394201699644327,"Power":0.20000000298023224,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"Thermistor Sensor","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.thermistor","Version":2,"Type":65588,"MinDelay":-1,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":5,"RequiredPermission":"RequiredPermission"},{"Name":"Wake Up Motion","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.wake_up_motion","Version":1,"Type":65590,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":7,"RequiredPermission":"RequiredPermission"},{"Name":"Move Nomove Detector","Vendor":"Samsung Eletronics","StringType":"com.samsung.sensor.move_detector","Version":1,"Type":65593,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"Call Gesture","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.call_gesture","Version":1,"Type":65594,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"Touch Proximity","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.touch_proximity","Version":1,"Type":65596,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.75,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"TMD4907 Uncalibrated Light","Vendor":"AMS","StringType":"android.sensor.light","Version":1,"Type":5,"MinDelay":200000,"FifoReservedEventCount":0,"MaxDelay":200000,"Id":0,"MaxRange":60000,"Resolution":1,"Power":0.20000000298023224,"Flags":2,"RequiredPermission":"RequiredPermission"},{"Name":"Pocket Mode","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.pocket_mode","Version":1,"Type":65605,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"Led Cover Event","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.led_cover_event","Version":1,"Type":65606,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"Tap Tracker","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.tap_tracker","Version":1,"Type":65611,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"Shake Tracker","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.shake_tracker","Version":1,"Type":65612,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"AutoRotation Sensor","Vendor":"Samsung Electronics","StringType":"android.sensor.device_orientation","Version":16,"Type":27,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":255,"Resolution":1,"Power":0.0010000000474974513,"Flags":2,"RequiredPermission":"RequiredPermission"},{"Name":"SarBackoffMotion Sensor","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.sar_backoff_motion","Version":1,"Type":65643,"MinDelay":-1,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":255,"Resolution":1,"Power":0.0010000000474974513,"Flags":5,"RequiredPermission":"RequiredPermission"},{"Name":"Pocket Position Mode","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.pocket_position","Version":1,"Type":65698,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"Hall IC","Vendor":"Samsung Electronics","StringType":"com.samsung.sensor.hallIC","Version":1,"Type":65600,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":1,"Resolution":1,"Power":0.30000001192092896,"Flags":2,"RequiredPermission":"RequiredPermission"},{"Name":"SContext","Vendor":"Samsung","StringType":"com.samsung.sensor.sensorhubs","Version":1,"Type":65586,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":200000,"Id":0,"MaxRange":1,"Resolution":0,"Power":0.0010000000474974513,"Flags":6,"RequiredPermission":"RequiredPermission"},{"Name":"SX9360 Grip sensor","Vendor":"SEMTECH","StringType":"com.samsung.sensor.grip","Version":1025,"Type":65560,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":200000,"Id":0,"MaxRange":5,"Resolution":5,"Power":0.75,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"Grip Notifier Sensor","Vendor":"Virtual","StringType":"com.samsung.sensor.grip_reset_notifer","Version":1,"Type":65645,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":5,"Resolution":5,"Power":0.75,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"TCS3407 Rear ALS","Vendor":"AMS","StringType":"com.samsung.sensor.bio_alc","Version":1,"Type":65577,"MinDelay":10000,"FifoReservedEventCount":0,"MaxDelay":10000,"Id":0,"MaxRange":65536,"Resolution":1,"Power":1,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"Palm Proximity Sensor version 2","Vendor":"Samsung","StringType":"android.sensor.proximity","Version":1000,"Type":8,"MinDelay":0,"FifoReservedEventCount":300,"MaxDelay":0,"Id":0,"MaxRange":5,"Resolution":1,"Power":1.2000000476837158,"Flags":3,"RequiredPermission":"RequiredPermission"},{"Name":"Motion Sensor","Vendor":"Samsung Electronics","StringType":"","Version":1,"Type":65559,"MinDelay":0,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":200,"Resolution":0,"Power":0,"Flags":2,"RequiredPermission":"RequiredPermission"},{"Name":"Gravity Sensor","Vendor":"Samsung Electronics","StringType":"android.sensor.gravity","Version":3,"Type":9,"MinDelay":10000,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":19.613300323486328,"Resolution":5.9604644775390625E-8,"Power":1.100000023841858,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"Linear Acceleration Sensor","Vendor":"Samsung Electronics","StringType":"android.sensor.linear_acceleration","Version":3,"Type":10,"MinDelay":10000,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":78.45320129394531,"Resolution":0.002394201699644327,"Power":1.100000023841858,"Flags":0,"RequiredPermission":"RequiredPermission"},{"Name":"Orientation Sensor","Vendor":"Samsung Electronics","StringType":"android.sensor.orientation","Version":1,"Type":3,"MinDelay":10000,"FifoReservedEventCount":0,"MaxDelay":0,"Id":0,"MaxRange":360,"Resolution":0.00390625,"Power":1.100000023841858,"Flags":0,"RequiredPermission":"RequiredPermission"}],"cpuinfo":"processor\t: 0\nBogoMIPS\t: 52.00\nFeatures\t: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm lrcpc dcpop asimddp\nCPU implementer\t: 0x41\nCPU architecture: 8\nCPU variant\t: 0x2\nCPU part\t: 0xd05\nCPU revision\t: 0\n\nprocessor\t: 1\nBogoMIPS\t: 52.00\nFeatures\t: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm lrcpc dcpop asimddp\nCPU implementer\t: 0x41\nCPU architecture: 8\nCPU variant\t: 0x2\nCPU part\t: 0xd05\nCPU revision\t: 0\n\nprocessor\t: 2\nBogoMIPS\t: 52.00\nFeatures\t: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm lrcpc dcpop asimddp\nCPU implementer\t: 0x41\nCPU architecture: 8\nCPU variant\t: 0x2\nCPU part\t: 0xd05\nCPU revision\t: 0\n\nprocessor\t: 3\nBogoMIPS\t: 52.00\nFeatures\t: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm lrcpc dcpop asimddp\nCPU implementer\t: 0x41\nCPU architecture: 8\nCPU variant\t: 0x2\nCPU part\t: 0xd05\nCPU revision\t: 0\n\nprocessor\t: 4\nBogoMIPS\t: 52.00\nFeatures\t: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm lrcpc dcpop asimddp\nCPU implementer\t: 0x41\nCPU architecture: 8\nCPU variant\t: 0x3\nCPU part\t: 0xd0b\nCPU revision\t: 1\n\nprocessor\t: 5\nBogoMIPS\t: 52.00\nFeatures\t: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm lrcpc dcpop asimddp\nCPU implementer\t: 0x41\nCPU architecture: 8\nCPU variant\t: 0x3\nCPU part\t: 0xd0b\nCPU revision\t: 1\n\nprocessor\t: 6\nBogoMIPS\t: 52.00\nFeatures\t: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm lrcpc dcpop asimddp\nCPU implementer\t: 0x53\nCPU architecture: 8\nCPU variant\t: 0x1\nCPU part\t: 0x004\nCPU revision\t: 0\n\nprocessor\t: 7\nBogoMIPS\t: 52.00\nFeatures\t: fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm lrcpc dcpop asimddp\nCPU implementer\t: 0x53\nCPU architecture: 8\nCPU variant\t: 0x1\nCPU part\t: 0x004\nCPU revision\t: 0\n\n\n","systemapps":[{"sourceDir":"\/system\/priv-app\/CarrierSetup\/CarrierSetup.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.google.android.carriersetup","label":"Carrier Setup","versionName":"11","uid":10033,"versionCode":30,"flags":545832517,"pkg":"com.google.android.carriersetup","firstInstallTime":1230768000000,"sign":["MIIDhjCCAm6gAwIBAgIUddwPoG0aoIEp9ydj0kbbsEVojDowDQYJKoZIhvcNAQELBQAwdDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC0dvb2dsZSBJbmMuMRAwDgYDVQQLEwdBbmRyb2lkMRAwDgYDVQQDEwdBbmRyb2lkMB4XDTE3MDQxOTAwNTAxNloXDTQ3MDQxOTAwNTAxNlowdDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC0dvb2dsZSBJbmMuMRAwDgYDVQQLEwdBbmRyb2lkMRAwDgYDVQQDEwdBbmRyb2lkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoGTy0c97JGWqUVl2fodPy6X+gxlWgK7Pib8qs3mZT3a1cOJdVfaAZ1Jjm2sdQm6ziaj9MZG0dtxkLpLRmAKuQw4myh7pJZ6ivXsHXd+4Sw6dFVaBjKdQZY\/dvlbtoy3g4jGhzZDqjqXCJVYKo0+JFPtSZFwXE5ywHX5vr9dzy66y\/x5cBpYtniJ5MwpwVyMSDqS9J2j3yowIi18yR1kX4d8qI9OHJlDCnBz6ovU61nvxLdBRzzU7xyC\/igtf7bqCts0TtqRAlNBiOHWA8ymzpSckuEhjRJ6Tr41xUmMw\/c+FRjxJ4WabzES\/WJ5yVShDLxsG9PLhE0WGtz7k5sZ9fQIDAQABoxAwDjAMBgNVHRMEBTADAQH\/MA0GCSqGSIb3DQEBCwUAA4IBAQCZtnjFAtqxcqAd9Z7H41R\/Ogg5WLOmtC2UvlmZFvDP62ejV1UQ4+mfL1ZlpoIBzUfCGPInN7wh9qHsJR2PEuieSbPE4IyqowFpgB1E8cX4sHslEJaoOkR\/v5UeQprGvwS6mIY25ajLVWIJ9GMHw+QRD8iHwtgS7zH4xOKGpG7B38oG6P0zH3hWYqh8B8qTunN9fI14poFPMtwMYs+jCYlu5seYP9S1iyFos7\/s8zZWxmH8Oaue\/+SXqeqdyCuIsUIn8bpoORiGG5qRjl1ybSsbm+86LAfIu18a0o0kCmqTvWqYTnW9n7\/5e\/48X6rOP6clM\/zu9hVAzL+jHrTcERoO"]},{"sourceDir":"\/system\/priv-app\/CtsShimPrivPrebuilt\/CtsShimPrivPrebuilt.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.cts.priv.ctsshim","label":"com.android.cts.priv.ctsshim","versionName":"12-7552332","uid":10028,"versionCode":31,"flags":-1601651135,"pkg":"com.android.cts.priv.ctsshim","firstInstallTime":1230768000000,"sign":["MIIEqDCCA5CgAwIBAgIJAJNurL4H8gHfMA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEQMA4GA1UEChMHQW5kcm9pZDEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbTAeFw0wODAyMjkwMTMzNDZaFw0zNTA3MTcwMTMzNDZaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEQMA4GA1UEChMHQW5kcm9pZDEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbTCCASAwDQYJKoZIhvcNAQEBBQADggENADCCAQgCggEBANaTGQTexgskse3HYuDZ2CU+Ps1s6x3i\/waMqOi8qM1r03hupwqnbOYOuw+ZNVn\/2T53qUPn6D1LZLjk\/qLT5lbx4meoG7+yMLV4wgRDvkxyGLhG9SEVhvA4oU6Jwr44f46+z4\/Kw9oe4zDJ6pPQp8PcSvNQIg1QCAcy4ICXF+5qBTNZ5qaU7Cyz8oSgpGbIepTYOzEJOmc3Li9kEsBubULxWBjf\/gOBzAzURNps3cO4JFgZSAGzJWQTT7\/emMkod0jb9WdqVA2BVMi7yge54kdVMxHEa5r3b97szI5p58ii0I54JiCUP5lyfTwE\/nKZHZnfm644oLIXf6MdW2r+6R8CAQOjgfwwgfkwHQYDVR0OBBYEFEhZAFY9JyxGrhGGBaR0GawJyowRMIHJBgNVHSMEgcEwgb6AFEhZAFY9JyxGrhGGBaR0GawJyowRoYGapIGXMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEQMA4GA1UEChMHQW5kcm9pZDEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbYIJAJNurL4H8gHfMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADggEBAHqvlozrUMRBBVEY0NqrrwFbinZaJ6cVosK0TyIUFf\/azgMJWr+kLfcHCHJsIGnlw27drgQAvilFLAhLwn62oX6snb4YLCBOsVMR9FXYJLZW2+TcIkCRLXWG\/oiVHQGo\/rWuWkJgU134NDEFJCJGjDbiLCpe+ZTWHdcwauTJ9pUbo8EvHRkU3cYfGmLaLfgn9gP+pWA7LFQNvXwBnDa6sppCccEX31I828XzgXpJ4O+mDL1\/dBd+ek8ZPUP0IgdyZm5MTYPhvVqGCHzzTy3sIeJFymwrsBbmg2OAUNLEMO6nwmocSdN2ClirfxqCzJOLSDE4QyS9BAH6EhY6UFcOaE0="]},{"sourceDir":"\/product\/overlay\/DisplayCutoutEmulationCorner\/DisplayCutoutEmulationCornerOverlay.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.display.cutout.emulation.corner","label":"边角刘海屏","versionName":"1.0","uid":10007,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.display.cutout.emulation.corner","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/GoogleExtServices\/GoogleExtServices.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.google.android.ext.services","label":"Android Services Library","versionName":"r_aml_300900700","uid":10019,"versionCode":300900700,"flags":550026821,"pkg":"com.google.android.ext.services","firstInstallTime":1230768000000,"sign":["MIIFxzCCA6+gAwIBAgIVANDTOBfCtQAGK1Rlr4mRfJk2dJVEMA0GCSqGSIb3DQEBCwUAMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDAeFw0xOTAyMDYyMjQ3MTBaFw00OTAyMDYyMjQ3MTBaMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAOLP951HIwfDYOpTZg9eeHwyInTezKEinhwShUi7eg7ZLGoRh+DJUCut\/JYrQ3++y0pioNOIGkdSZjZZTlZRTA92n1i5lceKfbw7K1zX762q9ttXDM7YCZplC1WZhghdbAZ1pRDPNDqSycL6gLwJVXlT9BU8MWdH6MsdRQNDsn\/U6Vi9JcGtlqyv8pmkd3iFh4ietqEFXU6ERN1C8dkpBYSkTZC+MMtGwwJ9FP1+AoLoPKeBX+lLxzlHqE5MPK+W5LHwzStTBe5KNpEzdaF+iADqeQ4QDRnyFdsIwgbvdExtq\/dGnPbc3iqshSuKKcFqftIeCNfmH4\/NZKgjsZvjj3zze5BftSPuaILfxGk0Ud4RQHSgD\/SGszKJAjyNwGSkDrL1nKhtB40Ld7q4Up875dIMLanGFaXJa+qSJIOFmZsVMFZ8KLCI5hPUySGstvQdlsaj0+jXn9T7QB7AzW89vapcvbtsRtGT2NKk9vgA5TVMyfh7n8\/miQCSd85yR49pGpwDoqHcHg7+ACcCcMpyqQJXj3OrZvdb0Wa7JngvpxZ1DWw6QgGfF+L1ICreR8ffLVi5j1PCzAAOBdli7ThvTRL\/awZJWAp\/xVNXucgYtcQa3br0GhVOlUoIqTTRS9pr+qZnBf3t4dVDleOZlDR0QZrlD7Pdn1\/oYuXJ0MIW18UlAgMBAAGjUDBOMAwGA1UdEwQFMAMBAf8wHQYDVR0OBBYEFMGUbIx02LLEp1dQhN\/S5M9hJjlRMB8GA1UdIwQYMBaAFMGUbIx02LLEp1dQhN\/S5M9hJjlRMA0GCSqGSIb3DQEBCwUAA4ICAQBieVXArEazZokBrl6905RSAifmlyIwK1qssLPX2WJHtEPwMct\/tkdxVdfZT0DYPK2NjhzBEq9pXwGCLPQpsQH9G3GzkjgYDUSFe555CJUpYzosxhw+D7bgSdDd3OrDKrcTvC58JcgiSbgPOlQ35LYL8VHXLO2epaL\/fzKKWUkJvmyQ1vXVScHJRaB1u4KMBuv1cSgZENLD8Icq0n4LIxlO8f+x+OqVFlXwZHQJOaG0S7mBn+ruB7MqhgdKYqV\/9VXsD\/2klx5dbcmAtmt0lbdgh74\/BRPrXpcwpt8eMVExbghg\/TTLvGxspr2ynIdbekWwxxZ20fF\/ClZrfAdrn6qYtoUNwjEsowo4KGXToh2Iu2cO4d0W9C8p51OBvwuqXfU6NPLUVEhE8ONhFcexvkPqFkAss3SAacQEdTiX0yXbj7em60v1hP0KV1oDx+PUMVDg3sHOMYSWIwRpz2WBNc1wT5MBmyJs4H26i9zBen9xBqBT9dZ1RVQyAd4pMTR44MN338Qb5VGgCRdweoPfwRwz0JR7UqH\/ulfnsiM4Zhep0ylaPITxmEnrT6ZEItUWfg7kbzYhX0mWzI6iuWUy1TW+8pcMfeiZMegQnovENvH5mH3hZJmq9jOkLLP2GVN77PbTRCe\/meCTxlm7N2Q9IvQDxvU0A7deX+r7S1RX6s30ng=="]},{"sourceDir":"\/product\/overlay\/DisplayCutoutEmulationDouble\/DisplayCutoutEmulationDoubleOverlay.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.display.cutout.emulation.double","label":"双刘海屏","versionName":"1.0","uid":10010,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.display.cutout.emulation.double","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/TelephonyProvider\/TelephonyProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.providers.telephony","label":"电话和短信存储","versionName":"12","uid":1001,"versionCode":31,"flags":1015791109,"pkg":"com.android.providers.telephony","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/DynamicSystemInstallationService\/DynamicSystemInstallationService.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.dynsystem","label":"Dynamic System Updates","versionName":"12","uid":1000,"versionCode":31,"flags":814235205,"pkg":"com.android.dynsystem","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/CalendarProvider\/CalendarProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.providers.calendar","label":"日历存储","versionName":"12","uid":10037,"versionCode":31,"flags":814235205,"pkg":"com.android.providers.calendar","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/MediaProviderLegacy\/MediaProviderLegacy.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.providers.media","label":"com.android.providers.media","versionName":"12","uid":10023,"versionCode":1024,"flags":952647237,"pkg":"com.android.providers.media","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUNMu142V76fXuZ7PUFPgp6HC+ZoIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM2sZbt8wo2kH8AorvuSJMo5e4BrLV1xIME5gQzQ7HmjT4B0Kvx\/eJS9LD75RTaUeZD5+NsHKZcKt8uqcvgly4IjUwjx+kaFXV0R1oUsAWqAhFldaS+8miZFVOtYr0ASEJEeSZtnB+n4U+muLTUJvASMtgcqDxbZllIYN+2ASCfTVK72yngz5f7nf8RLUtQJ5ebyucUrGwAbQHytz6qvQnku1rrw1m0A4OKRtSPDq8YHMlWN7XLWtObSlNDAHZrd2AoF73zgj4hn2WiAvrJNAaJx2JajcZGci9MHEK3aYge6oiVmKNJViK6ZbXzeYz2Bpu5mRs1ID1mxPVQxz\/YNB\/0CAwEAAaNTMFEwHQYDVR0OBBYEFNmzS1F9a1FzXzorY1jGcaMK6Q3IMB8GA1UdIwQYMBaAFNmzS1F9a1FzXzorY1jGcaMK6Q3IMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAFzjV\/OOU9mQQ9XZZLeDnD4wk7y\/IK71u2H4o3OA\/zHZozTv6cF2tPeRQEUOCff5A1n4\/Hi9b2KjBc0j+kH0sR6TB0cNjSqbo5e9utTp0YKa1OakvFZapMe9j06ieuFXypxhNz1hZE\/VwZluWsb5gaVIn08eY6QO06QLcl2TiGXTY86k1XFqwdFDXp7Zj8ymJcDGjaM3C\/lcGlLsdg2pjKkVFiA63eM7W0iWYP6v+XAZWja+HYCy54kgh4BGj\/x4bWlKnTZUHMB6GwVxX\/Le4Uiy5IxppyAs\/kvB\/HFkirL9qqRCQKlaDlGzmlZ2T\/L4\/os8sN7PYBf8dB75y51QtO0="]},{"sourceDir":"\/system\/app\/GoogleExtShared\/GoogleExtShared.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.google.android.ext.shared","label":"Android Shared Library","versionName":"1","uid":10051,"versionCode":1,"flags":814235205,"pkg":"com.google.android.ext.shared","firstInstallTime":1230768000000,"sign":["MIIDvzCCAqegAwIBAgIJAIIWe39EiZH0MA0GCSqGSIb3DQEBBQUAMHYxCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKDAtHb29nbGUgSW5jLjEQMA4GA1UECwwHQW5kcm9pZDESMBAGA1UEAwwJZXh0c2hhcmVkMB4XDTE2MDMwNDE5MTgyMloXDTQzMDcyMTE5MTgyMlowdjELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxFDASBgNVBAoMC0dvb2dsZSBJbmMuMRAwDgYDVQQLDAdBbmRyb2lkMRIwEAYDVQQDDAlleHRzaGFyZWQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUZQNBqM8ZFTVsMFqbs9SdppaMnkPQlZxqSglFL4JoYmnmWSDR6NJ3GuyShkL0LE8NNKOEQmbdAOgl6IU6NfgvWvcdamrfYZNgMGudYOyG0ZZuTDchQP4U1\/mMhmDn5tx2HFPtbtvLRElk350ZTxZVf3OivUzkV5FcRsZQrQe+LmOsZ67qjbeoM\/72WIVpVEN0HWcOfTG0+wEXFckf3bPJ2Tn3DV2UGGGyjtc4XSX5OpprEEkjetd3+Kq1fzjOMjhWH0Nsobw4dr2IroaN6IvgvufAArpET7PjxKxo08IlgPl8o+BKetQXrSBrg2uYAV8WysuUyx8KGnapC6ME70INAgMBAAGjUDBOMB0GA1UdDgQWBBTA5lsQS6iKdsWB0SRHlYXCPPOZ7zAfBgNVHSMEGDAWgBTA5lsQS6iKdsWB0SRHlYXCPPOZ7zAMBgNVHRMEBTADAQH\/MA0GCSqGSIb3DQEBBQUAA4IBAQA\/6Cx75d6kPkPJKw5gVr6v44\/q7OlqfnbR18ntIXxBr+um5cRLbWQLjB9oT4GSGl0TgpWHyMv6\/zX1mHmsLLdYphLA\/qNW3LsZbgXFuBmSzhdo3d\/2sF9ldzqM+PYF0HzwzXmAsDpQJKlT9b4htw4\/T6wnMRd+qMuylLfbswFMNyNC4yefw2p9WWfyP73pWJ0iS4VzphmEhBMuyRbKBUuRmyn6qDTPPpTJyTr1+THMpnChABQKMx+YNlqmZ972En98\/asKi0eMfmzUUUiUKk2bA7nAW7hxvyYDuj\/ezeq9Okd6PbwIxJYudozAJ3LOompGAyVrcoMERYo5iCISzTnJ"]},{"sourceDir":"\/product\/overlay\/NavigationBarModeGesturalWideBack\/NavigationBarModeGesturalOverlayWideBack.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.systemui.navbar.gestural_wide_back","label":"Gestural Navigation Bar","versionName":"1.0","uid":10002,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.systemui.navbar.gestural_wide_back","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system_ext\/app\/uimator\/uimator.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.uimator","label":"uimator","versionName":"1.0","uid":10095,"versionCode":1,"flags":952680005,"pkg":"com.android.uimator","firstInstallTime":1230768000000,"sign":["MIIDXzCCAkegAwIBAgIEcEyS5TANBgkqhkiG9w0BAQsFADBgMQ4wDAYDVQQGEwVodWFuZzEOMAwGA1UECBMFaHVhbmcxDjAMBgNVBAcTBWh1YW5nMQ4wDAYDVQQKEwVodWFuZzEOMAwGA1UECxMFaHVhbmcxDjAMBgNVBAMTBWh1YW5nMB4XDTIzMDYwMjA4MzI0NFoXDTQ4MDUyNjA4MzI0NFowYDEOMAwGA1UEBhMFaHVhbmcxDjAMBgNVBAgTBWh1YW5nMQ4wDAYDVQQHEwVodWFuZzEOMAwGA1UEChMFaHVhbmcxDjAMBgNVBAsTBWh1YW5nMQ4wDAYDVQQDEwVodWFuZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAPgxOXvtfbvEV7P7qp6dJUFLkVTgrvPMlr\/k7+xuEkXjHZANPe4SeuvYvrHxnbvNzZUPPqsha+9d6IVISeuQW1b5TjIBapwCF86EJ09z+cw0\/MAwjuYEpI2jNCGIhj5xy6YIthaA15W7+UOMffdKs4NTIWllMQ5Tw7\/p6DAHwiKyMfYR5qKw61uYCsG2g8cCBpuFVoCyg\/gs7\/oQ3yw4gvzmLmhCHlErI9M7Ms1MmkjoSPZFUkzPOLK\/rGHwtTA1e8Lm0pOGGBIAVthPu+bOnYXT\/s1g8AwT5T\/9siHWFfb7SjEdR3ZnMJlNziauc2DLHhNaiVUY3WOHBdL7HbjaUD0CAwEAAaMhMB8wHQYDVR0OBBYEFIuMVcL7X0pV0uB6a3IyxaBle9yCMA0GCSqGSIb3DQEBCwUAA4IBAQCzThohx2X12CILkZ\/6aKb3IAiyoxH6LdDwpcqKkyXOSrX4wVmqeAX9jk+uP1yirH6zqTR4fnICoR7eEpv8pwh4zZYjUSwNlHVGiieCN+V9xwX+1UFS1Bzik1LSXnKBn1v04ktx0Ox7o07kThVhYD14FEOMK4eudlnBsTq9I9Gml7xJMjIptI\/DGYgPDbYHiHEPobKKs87DK6ySfMn\/y8mC61iPKXsMt5B9wJ3iDTnKUZ54mCK4CFk6x0usKhrmo+BjSSy8KMK06O1npknm1ltSbSnoXxZ+tdUqMcUQT1fRAS2g5SehLh6Tqc5qt+qmlxqLbW3CocgkxYmwCwDvPMRn"]},{"sourceDir":"\/system\/app\/vivo\/vivo.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.vivo.vms","label":"vivo","versionName":"1.0","uid":10042,"versionCode":1,"flags":818462277,"pkg":"com.vivo.vms","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system_ext\/priv-app\/WallpaperCropper\/WallpaperCropper.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.wallpapercropper","label":"com.android.wallpapercropper","versionName":"12","uid":10084,"versionCode":31,"flags":815316549,"pkg":"com.android.wallpapercropper","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/DocumentsUI\/DocumentsUI.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.documentsui","label":"文件","versionName":"12","uid":10016,"versionCode":31,"flags":818527813,"pkg":"com.android.documentsui","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/ExternalStorageProvider\/ExternalStorageProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.externalstorage","label":"外部存储设备","versionName":"12","uid":10030,"versionCode":31,"flags":814267973,"pkg":"com.android.externalstorage","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/HTMLViewer\/HTMLViewer.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.htmlviewer","label":"HTML 查看程序","versionName":"12","uid":10052,"versionCode":31,"flags":818462277,"pkg":"com.android.htmlviewer","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/app\/CompanionDeviceManager\/CompanionDeviceManager.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.companiondevicemanager","label":"配套设备管理器","versionName":"12","uid":10049,"versionCode":31,"flags":818429509,"pkg":"com.android.companiondevicemanager","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/MmsService\/MmsService.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.mms.service","label":"MmsService","versionName":"12","uid":1001,"versionCode":31,"flags":948485701,"pkg":"com.android.mms.service","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/DownloadProvider\/DownloadProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.providers.downloads","label":"内容下载管理器","versionName":"12","uid":10023,"versionCode":31,"flags":952647237,"pkg":"com.android.providers.downloads","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUNMu142V76fXuZ7PUFPgp6HC+ZoIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM2sZbt8wo2kH8AorvuSJMo5e4BrLV1xIME5gQzQ7HmjT4B0Kvx\/eJS9LD75RTaUeZD5+NsHKZcKt8uqcvgly4IjUwjx+kaFXV0R1oUsAWqAhFldaS+8miZFVOtYr0ASEJEeSZtnB+n4U+muLTUJvASMtgcqDxbZllIYN+2ASCfTVK72yngz5f7nf8RLUtQJ5ebyucUrGwAbQHytz6qvQnku1rrw1m0A4OKRtSPDq8YHMlWN7XLWtObSlNDAHZrd2AoF73zgj4hn2WiAvrJNAaJx2JajcZGci9MHEK3aYge6oiVmKNJViK6ZbXzeYz2Bpu5mRs1ID1mxPVQxz\/YNB\/0CAwEAAaNTMFEwHQYDVR0OBBYEFNmzS1F9a1FzXzorY1jGcaMK6Q3IMB8GA1UdIwQYMBaAFNmzS1F9a1FzXzorY1jGcaMK6Q3IMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAFzjV\/OOU9mQQ9XZZLeDnD4wk7y\/IK71u2H4o3OA\/zHZozTv6cF2tPeRQEUOCff5A1n4\/Hi9b2KjBc0j+kH0sR6TB0cNjSqbo5e9utTp0YKa1OakvFZapMe9j06ieuFXypxhNz1hZE\/VwZluWsb5gaVIn08eY6QO06QLcl2TiGXTY86k1XFqwdFDXp7Zj8ymJcDGjaM3C\/lcGlLsdg2pjKkVFiA63eM7W0iWYP6v+XAZWja+HYCy54kgh4BGj\/x4bWlKnTZUHMB6GwVxX\/Le4Uiy5IxppyAs\/kvB\/HFkirL9qqRCQKlaDlGzmlZ2T\/L4\/os8sN7PYBf8dB75y51QtO0="]},{"sourceDir":"\/product\/app\/messaging\/messaging.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.messaging","label":"短信","versionName":"1.0.001","uid":10077,"versionCode":10001040,"flags":684211781,"pkg":"com.android.messaging","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/InProcessNetworkStack\/InProcessNetworkStack.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.networkstack.inprocess","label":"网络管理器","versionName":"12","uid":1000,"versionCode":31,"flags":680050245,"pkg":"com.android.networkstack.inprocess","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/overlay\/OneHandedModeGestural\/OneHandedModeGesturalOverlay.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.systemui.onehanded.gestural","label":"One Handed Mode","versionName":"1.0","uid":10000,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.systemui.onehanded.gestural","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/ConfigUpdater\/ConfigUpdater.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.google.android.configupdater","label":"ConfigUpdater","versionName":"11","uid":10034,"versionCode":30,"flags":545799749,"pkg":"com.google.android.configupdater","firstInstallTime":1230768000000,"sign":["MIIEQzCCAyugAwIBAgIJAMLgh0ZkSjCNMA0GCSqGSIb3DQEBBAUAMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDAeFw0wODA4MjEyMzEzMzRaFw0zNjAxMDcyMzEzMzRaMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDCCASAwDQYJKoZIhvcNAQEBBQADggENADCCAQgCggEBAKtWLgDYO6IIrgqWbxJOKdoR8qtW0I9Y4sypEwPpt1TTcvZApxsdyxMJZ2JORland2qSGT2y5b+3JKkedxiLDmpHpDsz2WCbdxgxRczfey5YZnTJ4VZbH0xqWVW\/8lGmPav5xVwnIiJS6HXk+BVKZF+JcWjAsb\/GEuq\/eFdpuzSqeYTcfi6idkyugwfYwXFU1+5fZKUaRKYCwkkFQVfcAs1fXA5V+++FGfvjJ\/CxURaSxaBvGdGDhfXE28LWuT9ozCl5xw4Yq5OGazvV24mZVSoOO0yZ31j7kYvtwYK6NeADwbSxDdJEqO4k\/\/0zOHKrUiGYXtqw\/A0LFFtqoZKFjnkCAQOjgdkwgdYwHQYDVR0OBBYEFMd9jMIhF1Ylmn\/Tgt9r45jk14alMIGmBgNVHSMEgZ4wgZuAFMd9jMIhF1Ylmn\/Tgt9r45jk14aloXikdjB0MQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLR29vZ2xlIEluYy4xEDAOBgNVBAsTB0FuZHJvaWQxEDAOBgNVBAMTB0FuZHJvaWSCCQDC4IdGZEowjTAMBgNVHRMEBTADAQH\/MA0GCSqGSIb3DQEBBAUAA4IBAQBt0lLO74UwLDYKqs6Tm8\/yzKkEu116FmH4rkaymUIE0P9KaMftGlMexFlaYjzmB2OxZyl6euNXEsQH8gjwyxCUKRJNexBiGcCEyj6z+a1fuHHvkiaai+KL8W1EyNmgjmyy8AW7P+LLlkR+ho5zEHatRbM\/YAnqGcFh5iZBqpknHf1SKMXFh4dd239FJ1jWYfbMDMy3NS5CTMQ2XFI1MvcyUTdZPErjQfTbQe3aDQsQcafEQPD+nqActifKZ0Np0IS9L9kR\/wbNvyz6ENwPiTrjV2KRkEjH78ZMcUQXg0L3BYHJ3lc69Vs5Ddf9uUGGMYldX3WfMBEmh\/9iFBDAaTCK"]},{"sourceDir":"\/system\/app\/SoundRecorder\/SoundRecorder.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.soundrecorder","label":"录音机","versionName":"12","uid":10040,"versionCode":31,"flags":814267973,"pkg":"com.android.soundrecorder","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/app\/oppo\/oppo.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.heytap.openid","label":"opeid","versionName":"1.0","uid":10063,"versionCode":1,"flags":818462277,"pkg":"com.heytap.openid","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/DownloadProviderUi\/DownloadProviderUi.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.providers.downloads.ui","label":"下载","versionName":"12","uid":10023,"versionCode":31,"flags":952680005,"pkg":"com.android.providers.downloads.ui","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUNMu142V76fXuZ7PUFPgp6HC+ZoIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM2sZbt8wo2kH8AorvuSJMo5e4BrLV1xIME5gQzQ7HmjT4B0Kvx\/eJS9LD75RTaUeZD5+NsHKZcKt8uqcvgly4IjUwjx+kaFXV0R1oUsAWqAhFldaS+8miZFVOtYr0ASEJEeSZtnB+n4U+muLTUJvASMtgcqDxbZllIYN+2ASCfTVK72yngz5f7nf8RLUtQJ5ebyucUrGwAbQHytz6qvQnku1rrw1m0A4OKRtSPDq8YHMlWN7XLWtObSlNDAHZrd2AoF73zgj4hn2WiAvrJNAaJx2JajcZGci9MHEK3aYge6oiVmKNJViK6ZbXzeYz2Bpu5mRs1ID1mxPVQxz\/YNB\/0CAwEAAaNTMFEwHQYDVR0OBBYEFNmzS1F9a1FzXzorY1jGcaMK6Q3IMB8GA1UdIwQYMBaAFNmzS1F9a1FzXzorY1jGcaMK6Q3IMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAFzjV\/OOU9mQQ9XZZLeDnD4wk7y\/IK71u2H4o3OA\/zHZozTv6cF2tPeRQEUOCff5A1n4\/Hi9b2KjBc0j+kH0sR6TB0cNjSqbo5e9utTp0YKa1OakvFZapMe9j06ieuFXypxhNz1hZE\/VwZluWsb5gaVIn08eY6QO06QLcl2TiGXTY86k1XFqwdFDXp7Zj8ymJcDGjaM3C\/lcGlLsdg2pjKkVFiA63eM7W0iWYP6v+XAZWja+HYCy54kgh4BGj\/x4bWlKnTZUHMB6GwVxX\/Le4Uiy5IxppyAs\/kvB\/HFkirL9qqRCQKlaDlGzmlZ2T\/L4\/os8sN7PYBf8dB75y51QtO0="]},{"sourceDir":"\/system\/priv-app\/Phonesky\/Phonesky.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.vending","label":"Google Play 商店","versionName":"32.2.16-21 [0] [PR] 472832506","uid":10024,"versionCode":83221610,"flags":952811077,"pkg":"com.android.vending","firstInstallTime":1230768000000,"sign":["MIIEQzCCAyugAwIBAgIJAMLgh0ZkSjCNMA0GCSqGSIb3DQEBBAUAMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDAeFw0wODA4MjEyMzEzMzRaFw0zNjAxMDcyMzEzMzRaMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDCCASAwDQYJKoZIhvcNAQEBBQADggENADCCAQgCggEBAKtWLgDYO6IIrgqWbxJOKdoR8qtW0I9Y4sypEwPpt1TTcvZApxsdyxMJZ2JORland2qSGT2y5b+3JKkedxiLDmpHpDsz2WCbdxgxRczfey5YZnTJ4VZbH0xqWVW\/8lGmPav5xVwnIiJS6HXk+BVKZF+JcWjAsb\/GEuq\/eFdpuzSqeYTcfi6idkyugwfYwXFU1+5fZKUaRKYCwkkFQVfcAs1fXA5V+++FGfvjJ\/CxURaSxaBvGdGDhfXE28LWuT9ozCl5xw4Yq5OGazvV24mZVSoOO0yZ31j7kYvtwYK6NeADwbSxDdJEqO4k\/\/0zOHKrUiGYXtqw\/A0LFFtqoZKFjnkCAQOjgdkwgdYwHQYDVR0OBBYEFMd9jMIhF1Ylmn\/Tgt9r45jk14alMIGmBgNVHSMEgZ4wgZuAFMd9jMIhF1Ylmn\/Tgt9r45jk14aloXikdjB0MQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLR29vZ2xlIEluYy4xEDAOBgNVBAsTB0FuZHJvaWQxEDAOBgNVBAMTB0FuZHJvaWSCCQDC4IdGZEowjTAMBgNVHRMEBTADAQH\/MA0GCSqGSIb3DQEBBAUAA4IBAQBt0lLO74UwLDYKqs6Tm8\/yzKkEu116FmH4rkaymUIE0P9KaMftGlMexFlaYjzmB2OxZyl6euNXEsQH8gjwyxCUKRJNexBiGcCEyj6z+a1fuHHvkiaai+KL8W1EyNmgjmyy8AW7P+LLlkR+ho5zEHatRbM\/YAnqGcFh5iZBqpknHf1SKMXFh4dd239FJ1jWYfbMDMy3NS5CTMQ2XFI1MvcyUTdZPErjQfTbQe3aDQsQcafEQPD+nqActifKZ0Np0IS9L9kR\/wbNvyz6ENwPiTrjV2KRkEjH78ZMcUQXg0L3BYHJ3lc69Vs5Ddf9uUGGMYldX3WfMBEmh\/9iFBDAaTCK"]},{"sourceDir":"\/system\/app\/PacProcessor\/PacProcessor.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.pacprocessor","label":"PacProcessor","versionName":"12","uid":10059,"versionCode":31,"flags":814267973,"pkg":"com.android.pacprocessor","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/SimAppDialog\/SimAppDialog.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.simappdialog","label":"Sim App Dialog","versionName":"12","uid":10045,"versionCode":31,"flags":814267973,"pkg":"com.android.simappdialog","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/apex\/com.android.tethering\/priv-app\/ServiceConnectivityResources\/ServiceConnectivityResources.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.connectivity.resources","label":"系统网络连接资源","versionName":"S-initial","uid":10098,"versionCode":1,"flags":545832513,"pkg":"com.android.connectivity.resources","firstInstallTime":1230768000000,"sign":["MIIGQzCCBCugAwIBAgIUZY8nxBMINp\/79sziXU77MLPpEXowDQYJKoZIhvcNAQELBQAwga8xCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1Nb3VudGFpbiBWaWV3MRAwDgYDVQQKDAdBbmRyb2lkMRAwDgYDVQQLDAdBbmRyb2lkMSswKQYDVQQDDCJjb20uYW5kcm9pZC5jb25uZWN0aXZpdHkucmVzb3VyY2VzMSIwIAYJKoZIhvcNAQkBFhNhbmRyb2lkQGFuZHJvaWQuY29tMCAXDTIxMDQyMjA3MjkxMFoYDzQ3NTkwMzE5MDcyOTEwWjCBrzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxEDAOBgNVBAoMB0FuZHJvaWQxEDAOBgNVBAsMB0FuZHJvaWQxKzApBgNVBAMMImNvbS5hbmRyb2lkLmNvbm5lY3Rpdml0eS5yZXNvdXJjZXMxIjAgBgkqhkiG9w0BCQEWE2FuZHJvaWRAYW5kcm9pZC5jb20wggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQC361NT9qSzh3uLcLBD67HNE1QX3ykwGyw8u7ExzqpsqLCzZsOCFRJQJY+CnrgNaAz0NXeNtx7DLpr9OCWWbG1KTQ\/ANlR8g6xCqlAk4xdixsAnIlBUJB90+RlkcWrliEY7OwcqIu3x\/qe+5UR3irIFZOApNHOm760PjRl7VWAnYZC\/PhkW0iKwnBuE96ddPIJc+KuiqCcPKflgF4\/jmbHTZ+5uvVV4qkfovc744HnQtQoCDoYR8WpsJv3YL5xrAv78o3WCRzx6xxB+eUlJpuyyfIee2lUCG4Ly4jgOsWaupnUglLDORnz\/L8fhhnpv83wLal7E0ShxsqvzZZbb1QLuwMWy++gfzdDvGWewES3BdSFp5NwYWXQGZWSkEEFbIiorKSurU1On9OwB0jT\/H2B\/CAFKYJQ2V+hQ4I7PG+z9p7ZFNR6GZbZuhEr+Dpq1CwtI3W45izr3RJgcc2IP6Oj7\/XC2MmKGMqZkybBWcvazdyAMHzk9EZIBT2Oru3dnOl3uVUUPeZRsxRzqaA0MAlyj+GJ9uziEr3W1j+U1CFEnNWtlD\/jqcTAwmaOsn1GhWyMAo1KOrJ\/oLcJvwk5P\/0XEyeli7\/DSUpGjYiAgWMHWCOn9s6aYw3YFb+A\/SgX3\/+FIDib\/vHTXi76JZfO0CfoKsbFDCH9KOMupHM9EO3ftQwIDAQABo1MwUTAdBgNVHQ4EFgQU\/KGggmMqXD5YOe5+B0W+YezN9LcwHwYDVR0jBBgwFoAU\/KGggmMqXD5YOe5+B0W+YezN9LcwDwYDVR0TAQH\/BAUwAwEB\/zANBgkqhkiG9w0BAQsFAAOCAgEAhr+AaNaIlRyMWKyJ+2Aa35fH5e44Xr\/xPpriM5HHxsj0evjMCODqCQ7kzfwSEmtXh5uZYYNKb\/JPZMDHIFcYi1QCvm6E6YOd+Qn9CVxrwaDhigJv7ylhVf8q201GTvHhJIU99yFIrzJQRNhxw+pNo7FYMZr3J7JZPAy60DN1KZvRV4FjZx5qiPUMyu4zVygzDkr0v5Ilncdpl9VVjOi7ocHyBKI+7RkXl97xN4SUe3vszwZQHCVyVopBw+YrMbDBCrknrQzUEgieBuI+kj5oOeiQ0P1i1K+UCCAjrLwhNyc9H02rKUtBHxa2AVjw7YpAJlBesb49Qvq+5L6JjHFVSSOEbIjboNib26zNackjbiefF74meSUbGVGfcJ1OdkZsXZWphmER8V7XWz3Z8JwOXW1RLPgcbjilHUR5g8pEmWBv4KrTCSg5IvOJr4w3pyyMBiiVI9NI5sB7g5Mi9v3ifPD1OHA4Y3wYCb26mMEpRb8ogOhMHcGNbdnL3QtIUg4cmXGqGSY\/LbpUnp0sIQDSjc46o79F0boPsLlaN3US5WZIu0nc9SHkjoNhd0CJQ5r9aEn4\/wNrZgxss8OEKsqcS7OsWiIE6nG51TMDsCuyRBrGedtSUyFFSVSpivpYIrPVNKKlHsJ\/o+NvUdb6dBjCraPvJB8binB1aojwya3MwRs="]},{"sourceDir":"\/product\/overlay\/DisplayCutoutEmulationHole\/DisplayCutoutEmulationHoleOverlay.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.display.cutout.emulation.hole","label":"打孔屏","versionName":"1.0","uid":10011,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.display.cutout.emulation.hole","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/product\/overlay\/DisplayCutoutEmulationTall\/DisplayCutoutEmulationTallOverlay.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.display.cutout.emulation.tall","label":"长型刘海屏","versionName":"1.0","uid":10004,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.display.cutout.emulation.tall","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/product\/app\/ModuleMetadata\/ModuleMetadata.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.modulemetadata","label":"Module Metadata","versionName":"12","uid":10080,"versionCode":31,"flags":814267969,"pkg":"com.android.modulemetadata","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/app\/CertInstaller\/CertInstaller.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.certinstaller","label":"证书安装程序","versionName":"12","uid":10068,"versionCode":31,"flags":814235205,"pkg":"com.android.certinstaller","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system_ext\/priv-app\/CarrierConfig\/CarrierConfig.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.carrierconfig","label":"com.android.carrierconfig","versionName":"1.0.0","uid":10085,"versionCode":1,"flags":814235205,"pkg":"com.android.carrierconfig","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/overlay\/NavigationBarMode3Button\/NavigationBarMode3ButtonOverlay.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.systemui.navbar.threebutton","label":"3 Button Navigation Bar","versionName":"1.0","uid":10012,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.systemui.navbar.threebutton","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/framework\/framework-res.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/system","label":"Android 系统","versionName":"12","uid":1000,"versionCode":31,"flags":818462217,"pkg":"android","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/priv-app\/Contacts\/Contacts.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.contacts","label":"通讯录","versionName":"1.7.33","uid":10073,"versionCode":10733,"flags":550026821,"pkg":"com.android.contacts","firstInstallTime":1230768000000,"sign":["MIID9jCCAt6gAwIBAgITZ18uqmkHa2xlfO9Q519TQ92c9zANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMCAXDTIzMDIyMTA0MDAzNFoYDzIwNTAwNzA5MDQwMDM0WjCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3UmDNoXsR\/SZ1X6QbhmwXTTCELkLKu02rAgj+p2c16eWk96nILZq3OQXxXffG5HK7T9N7pGYK0dIfdxDFI2SWUIekqJ67a3\/NRXZnCF\/QuXh6HfbSFT\/U9d+liJRU6+Lms21YL0WI+WdQ3VGnvtB5uFEmpg\/8kxOBLfphVbT730aU7\/5CDv0ZH3n\/XV8yIZ4gwVyCFu5izvJxckwfdKQRh+J9mGgk+X2UzI9WfopiiKVQeCKkAWJ3lWcb+bVmXNIdp1bEP3OXipvs\/tL3zjE9uQPjSk8R9HILrAHOTsOezWgu8Mlz688ghTMRQD18cOTtWzbF+hmb5n+G7+6L7epUwIDAQABo1MwUTAdBgNVHQ4EFgQUMXvvF4CDHoAGzjNB6+1w913MUcswHwYDVR0jBBgwFoAUMXvvF4CDHoAGzjNB6+1w913MUcswDwYDVR0TAQH\/BAUwAwEB\/zANBgkqhkiG9w0BAQsFAAOCAQEAnyjza5YUEyW36OSIOzCQAt9WmmUVnoth0RlV6i7dgRpRomuY4qSMVrs8VpLWOM6LCoGl3x9looVIdlzD2\/qe\/stzz7Ju5TqD\/OH6j088GcJpU8s4iP\/hU3ibju0cXOCdDK0WxZ6C5IqymFLYqCVuO1sJLDiKKmwQrhCrUXhDPdFeh9K9BbrpTxIJl+WynxTfbdXa1LtgN\/ORFl2GRxqTRGpC\/Z\/9+nBK3kP1N9i+8WLD6Wr5dRBYTmTNIbBf8vB4IPgS7rdaKqvTjcoaEiVrGE4zGle5QUzD+6EO0fr82zRMMGrz5rOKqropb32kaAUkkkBhynCCK6LeOHaJ9mBncw=="]},{"sourceDir":"\/system\/app\/Camera2\/Camera2.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.camera2","label":"相机","versionName":"rk_camera2_v1.0.18","uid":10061,"versionCode":20002000,"flags":551074885,"pkg":"com.android.camera2","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/EasterEgg\/EasterEgg.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.egg","label":"Android S Easter Egg","versionName":"1.0","uid":10043,"versionCode":12,"flags":814267973,"pkg":"com.android.egg","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/MtpService\/MtpService.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.mtp","label":"MTP 主机","versionName":"12","uid":10023,"versionCode":31,"flags":948452933,"pkg":"com.android.mtp","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUNMu142V76fXuZ7PUFPgp6HC+ZoIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM2sZbt8wo2kH8AorvuSJMo5e4BrLV1xIME5gQzQ7HmjT4B0Kvx\/eJS9LD75RTaUeZD5+NsHKZcKt8uqcvgly4IjUwjx+kaFXV0R1oUsAWqAhFldaS+8miZFVOtYr0ASEJEeSZtnB+n4U+muLTUJvASMtgcqDxbZllIYN+2ASCfTVK72yngz5f7nf8RLUtQJ5ebyucUrGwAbQHytz6qvQnku1rrw1m0A4OKRtSPDq8YHMlWN7XLWtObSlNDAHZrd2AoF73zgj4hn2WiAvrJNAaJx2JajcZGci9MHEK3aYge6oiVmKNJViK6ZbXzeYz2Bpu5mRs1ID1mxPVQxz\/YNB\/0CAwEAAaNTMFEwHQYDVR0OBBYEFNmzS1F9a1FzXzorY1jGcaMK6Q3IMB8GA1UdIwQYMBaAFNmzS1F9a1FzXzorY1jGcaMK6Q3IMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAFzjV\/OOU9mQQ9XZZLeDnD4wk7y\/IK71u2H4o3OA\/zHZozTv6cF2tPeRQEUOCff5A1n4\/Hi9b2KjBc0j+kH0sR6TB0cNjSqbo5e9utTp0YKa1OakvFZapMe9j06ieuFXypxhNz1hZE\/VwZluWsb5gaVIn08eY6QO06QLcl2TiGXTY86k1XFqwdFDXp7Zj8ymJcDGjaM3C\/lcGlLsdg2pjKkVFiA63eM7W0iWYP6v+XAZWja+HYCy54kgh4BGj\/x4bWlKnTZUHMB6GwVxX\/Le4Uiy5IxppyAs\/kvB\/HFkirL9qqRCQKlaDlGzmlZ2T\/L4\/os8sN7PYBf8dB75y51QtO0="]},{"sourceDir":"\/system\/priv-app\/ONS\/ONS.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.ons","label":"com.android.ons","versionName":"12","uid":1001,"versionCode":31,"flags":814267981,"pkg":"com.android.ons","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/Stk\/Stk.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.stk","label":"SIM 卡工具包","versionName":"12","uid":1001,"versionCode":31,"flags":814267973,"pkg":"com.android.stk","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system_ext\/priv-app\/Launcher3QuickStep\/Launcher3QuickStep.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.launcher3","label":"Quickstep","versionName":"12","uid":10088,"versionCode":31,"flags":617332293,"pkg":"com.android.launcher3","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/BackupRestoreConfirmation\/BackupRestoreConfirmation.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.backupconfirm","label":"com.android.backupconfirm","versionName":"12","uid":10032,"versionCode":31,"flags":814235141,"pkg":"com.android.backupconfirm","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system_ext\/priv-app\/Provision\/Provision.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.provision","label":"com.android.provision","versionName":"12","uid":10086,"versionCode":31,"flags":814267973,"pkg":"com.android.provision","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/StatementService\/StatementService.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.statementservice","label":"Intent Filter Verification Service","versionName":"1.0","uid":10025,"versionCode":1,"flags":814235205,"pkg":"com.android.statementservice","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/priv-app\/SettingsIntelligence\/SettingsIntelligence.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.settings.intelligence","label":"Settings Suggestions","versionName":"12","uid":10071,"versionCode":31,"flags":818462277,"pkg":"com.android.settings.intelligence","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/product\/app\/Calendar\/Calendar.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.calendar","label":"日历","versionName":"12","uid":10083,"versionCode":31,"flags":545898053,"pkg":"com.android.calendar","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/product\/overlay\/NavigationBarModeGesturalExtraWideBack\/NavigationBarModeGesturalOverlayExtraWideBack.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.systemui.navbar.gestural_extra_wide_back","label":"Gestural Navigation Bar","versionName":"1.0","uid":10008,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.systemui.navbar.gestural_extra_wide_back","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/SettingsProvider\/SettingsProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.providers.settings","label":"设置存储","versionName":"12","uid":1000,"versionCode":31,"flags":814398981,"pkg":"com.android.providers.settings","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/SharedStorageBackup\/SharedStorageBackup.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.sharedstoragebackup","label":"com.android.sharedstoragebackup","versionName":"12","uid":10031,"versionCode":31,"flags":814333445,"pkg":"com.android.sharedstoragebackup","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/PrintSpooler\/PrintSpooler.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.printspooler","label":"打印处理服务","versionName":"12","uid":10041,"versionCode":31,"flags":818462277,"pkg":"com.android.printspooler","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/app\/BasicDreams\/BasicDreams.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.dreams.basic","label":"基本互动屏保","versionName":"12","uid":10060,"versionCode":31,"flags":814267973,"pkg":"com.android.dreams.basic","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/app\/SecureElement\/SecureElement.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.se","label":"SecureElementApplication","versionName":"12","uid":1068,"versionCode":31,"flags":814267981,"pkg":"com.android.se","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/InputDevices\/InputDevices.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.inputdevices","label":"输入设备","versionName":"12","uid":1000,"versionCode":31,"flags":814267909,"pkg":"com.android.inputdevices","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/BuiltInPrintService\/BuiltInPrintService.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.bips","label":"默认打印服务","versionName":"12","uid":10014,"versionCode":31,"flags":818462277,"pkg":"com.android.bips","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/MusicFX\/MusicFX.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.musicfx","label":"MusicFX","versionName":"1.4","uid":10022,"versionCode":10400,"flags":814235205,"pkg":"com.android.musicfx","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/CellBroadcastLegacyApp\/CellBroadcastLegacyApp.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.cellbroadcastreceiver","label":"com.android.cellbroadcastreceiver","versionName":"R-initial","uid":10026,"versionCode":300000000,"flags":814267973,"pkg":"com.android.cellbroadcastreceiver","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/WebViewGoogle\/WebViewGoogle.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.google.android.webview","label":"Android System WebView","versionName":"114.0.5735.196","uid":10048,"versionCode":573519631,"flags":-1601651131,"pkg":"com.google.android.webview","firstInstallTime":1230768000000,"sign":["MIIDuzCCAqOgAwIBAgIJANi6DgBQG4ZTMA0GCSqGSIb3DQEBBQUAMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKDAtHb29nbGUgSW5jLjEQMA4GA1UECwwHQW5kcm9pZDEQMA4GA1UEAwwHd2VidmlldzAeFw0xNDA4MDgyMzIwMjBaFw00MTEyMjQyMzIwMjBaMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKDAtHb29nbGUgSW5jLjEQMA4GA1UECwwHQW5kcm9pZDEQMA4GA1UEAwwHd2VidmlldzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMbtaFX0r5aZJMAbPVMAgK1ZZ29dTn91VsGxXv2hqrQo7IpqEy2JmPvPnoMsSiuTAe+UcQy8oKDQ2aYVSAd1DGIy+nSRyFTt3LSIAdwSBkB1qT4a+OqkpsR6bSNXQXQ18lCQu9gREY3h3QlYBQAyzRxw4hRGlrXAzuSz1Ec4W+6x4nLG5DG61MAMR8ClF9XSqbmGB3kyZ70A0X9OPYYxiMWP1ExaYvpaVqjyZZcrPwr+vtW8oCuGBUtHpBUH3OoG+9s2YMcgLG7vCK9awKDqlPcJSpIAAj6uGs4gORmkqxZRMskLSTWbhP4p+3Ap8jYzTVB6Y1\/DMVmYTWRMcPW0macCAwEAAaNQME4wHQYDVR0OBBYEFJ6bAR6\/QVm4w9LRSGQiaR5Rhp3TMB8GA1UdIwQYMBaAFJ6bAR6\/QVm4w9LRSGQiaR5Rhp3TMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADggEBAEQu8QiVxax7\/diEiJrgKE1LwdXsIygJK\/KnaKdnYEkAQpeu\/QmrLiycm+OFbL1qHJIB7OuI\/PQBUtcaNSiJSCVgtwtEbZWWIdsynqG\/Nf4aGOndXegSQNRH54M05sRHLoeRycPrY7xQlEwGikNFR76+5UdwFBQI3Gn22g6puJnVukQm\/wXQ+ajoiS4QclrNlixoDQsZ4STLH4+Wju2wIWKFFArIhVEIlbamq+p6BghuzH3aIz\/Fy0YTQKi7SA+0fuNeCaqlSm5pYSt6p5CH89y1Fr+wFc5r3iLRnUwRcy08ESC7bZJnxV3d\/YQ5valTxBbzku\/dQbXVj\/xg69H8l8M="]},{"sourceDir":"\/system\/app\/ExtShared\/ExtShared.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/android.ext.shared","label":"Android Shared Library","versionName":"1","uid":10050,"versionCode":1,"flags":814235205,"pkg":"android.ext.shared","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/priv-app\/OneTimeInitializer\/OneTimeInitializer.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.onetimeinitializer","label":"One Time Init","versionName":"12","uid":10070,"versionCode":31,"flags":814267973,"pkg":"com.android.onetimeinitializer","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/Telecom\/Telecom.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.server.telecom","label":"电话","versionName":"12","uid":1000,"versionCode":31,"flags":818429509,"pkg":"com.android.server.telecom","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/GoogleContactsSyncAdapter\/GoogleContactsSyncAdapter.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.google.android.syncadapters.contacts","label":"Google通讯录同步","versionName":"12","uid":10062,"versionCode":31,"flags":545799749,"pkg":"com.google.android.syncadapters.contacts","firstInstallTime":1230768000000,"sign":["MIIEQzCCAyugAwIBAgIJAMLgh0ZkSjCNMA0GCSqGSIb3DQEBBAUAMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDAeFw0wODA4MjEyMzEzMzRaFw0zNjAxMDcyMzEzMzRaMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDCCASAwDQYJKoZIhvcNAQEBBQADggENADCCAQgCggEBAKtWLgDYO6IIrgqWbxJOKdoR8qtW0I9Y4sypEwPpt1TTcvZApxsdyxMJZ2JORland2qSGT2y5b+3JKkedxiLDmpHpDsz2WCbdxgxRczfey5YZnTJ4VZbH0xqWVW\/8lGmPav5xVwnIiJS6HXk+BVKZF+JcWjAsb\/GEuq\/eFdpuzSqeYTcfi6idkyugwfYwXFU1+5fZKUaRKYCwkkFQVfcAs1fXA5V+++FGfvjJ\/CxURaSxaBvGdGDhfXE28LWuT9ozCl5xw4Yq5OGazvV24mZVSoOO0yZ31j7kYvtwYK6NeADwbSxDdJEqO4k\/\/0zOHKrUiGYXtqw\/A0LFFtqoZKFjnkCAQOjgdkwgdYwHQYDVR0OBBYEFMd9jMIhF1Ylmn\/Tgt9r45jk14alMIGmBgNVHSMEgZ4wgZuAFMd9jMIhF1Ylmn\/Tgt9r45jk14aloXikdjB0MQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLR29vZ2xlIEluYy4xEDAOBgNVBAsTB0FuZHJvaWQxEDAOBgNVBAMTB0FuZHJvaWSCCQDC4IdGZEowjTAMBgNVHRMEBTADAQH\/MA0GCSqGSIb3DQEBBAUAA4IBAQBt0lLO74UwLDYKqs6Tm8\/yzKkEu116FmH4rkaymUIE0P9KaMftGlMexFlaYjzmB2OxZyl6euNXEsQH8gjwyxCUKRJNexBiGcCEyj6z+a1fuHHvkiaai+KL8W1EyNmgjmyy8AW7P+LLlkR+ho5zEHatRbM\/YAnqGcFh5iZBqpknHf1SKMXFh4dd239FJ1jWYfbMDMy3NS5CTMQ2XFI1MvcyUTdZPErjQfTbQe3aDQsQcafEQPD+nqActifKZ0Np0IS9L9kR\/wbNvyz6ENwPiTrjV2KRkEjH78ZMcUQXg0L3BYHJ3lc69Vs5Ddf9uUGGMYldX3WfMBEmh\/9iFBDAaTCK"]},{"sourceDir":"\/system\/priv-app\/CellBroadcastServiceModulePlatform\/CellBroadcastServiceModulePlatform.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.cellbroadcastservice","label":"Cell Broadcast Service","versionName":"12","uid":1001,"versionCode":31,"flags":814267981,"pkg":"com.android.cellbroadcastservice","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/KeyChain\/KeyChain.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.keychain","label":"密钥链","versionName":"12","uid":1000,"versionCode":31,"flags":814235205,"pkg":"com.android.keychain","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/app\/via\/via.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/mark.via","label":"Via","versionName":"4.6.0","uid":10081,"versionCode":20230403,"flags":952680005,"pkg":"mark.via","firstInstallTime":1230768000000,"sign":["MIIDKTCCAhGgAwIBAgIEPzsSGjANBgkqhkiG9w0BAQsFADBEMQswCQYDVQQGEwJDTjEPMA0GA1UECAwG5bm\/6KW\/MQ8wDQYDVQQHDAblub\/opb8xEzARBgNVBAMTClZhcmlvdXMgVHUwIBcNMTQwODI3MDUwMzI4WhgPMjExNDA4MDMwNTAzMjhaMEQxCzAJBgNVBAYTAkNOMQ8wDQYDVQQIDAblub\/opb8xDzANBgNVBAcMBuW5v+ilvzETMBEGA1UEAxMKVmFyaW91cyBUdTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANtJkJez565L8tHZ1VJOVilk7YBONZ9UCxuP0\/HfYs5flyvlaWcVo9hHfoT9hZLQ4jx2lE5ROBm60vk2lCngOrDhQ4xubQa44N0aX9MGAVeaw5oA8W53i+1iBtMTC6MyDAL8Xs5xO7qdXh\/jFCxYxysRc2NPc6CzUbxC0Q5bv3VSmkwZSBj0EgqAzDK\/2S5ahHFVyHSVTEiikLe5E24399N0oI4SHPnbiyLnKjAtl5hceMwBuSvWnPKFXWyhykrUNrFqVU15qafxfbtDGmJg2lYy\/ztqRBS5jHwOOOUjhBh+NffxzgCdO6g868wCCH5pMWcbW7h7JJv7ujExNXNsmDsCAwEAAaMhMB8wHQYDVR0OBBYEFIfteBFvo3bbTLtXs\/+wH11ftSV3MA0GCSqGSIb3DQEBCwUAA4IBAQAh4l7wR441w7SDqeokrDi9qDUOEtD5uUQoTEOgWv0KMWnvSEDOJ4Ij2iuZMWvbM9trfYMRVQIz6eCi2pa+W58kORuezJwgAfAVtHKBFASzYRnNBnw9HVO2Hv890nler5NkXqihNrQeR\/JGvDWJ6\/Igvu4K67dYpjQ3i2gwoQK7\/Ll\/zSjiQ5bBZMeB5GoAJysTKzwHoK6wh4KuXbkB9hcPE1dPd5iMRmdweB6sxLbS2FNf94AjnlxVRLnh9Tg18867egH93vDJQqeki+SJxvLDuPxanHIoV3OJSVV61rcZXgK2odmIKCTymTLB2P+rYCuZgRcYH77gAlARc1A688wd"]},{"sourceDir":"\/system\/app\/PrintRecommendationService\/PrintRecommendationService.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.printservice.recommendation","label":"Print Service Recommendation Service","versionName":"1.3.0","uid":10053,"versionCode":4,"flags":814235141,"pkg":"com.android.printservice.recommendation","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/product\/priv-app\/Dialer\/Dialer.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.dialer","label":"电话","versionName":"23.0","uid":10074,"versionCode":2900000,"flags":550026821,"pkg":"com.android.dialer","firstInstallTime":1230768000000,"sign":["MIID9jCCAt6gAwIBAgITZ18uqmkHa2xlfO9Q519TQ92c9zANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMCAXDTIzMDIyMTA0MDAzNFoYDzIwNTAwNzA5MDQwMDM0WjCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3UmDNoXsR\/SZ1X6QbhmwXTTCELkLKu02rAgj+p2c16eWk96nILZq3OQXxXffG5HK7T9N7pGYK0dIfdxDFI2SWUIekqJ67a3\/NRXZnCF\/QuXh6HfbSFT\/U9d+liJRU6+Lms21YL0WI+WdQ3VGnvtB5uFEmpg\/8kxOBLfphVbT730aU7\/5CDv0ZH3n\/XV8yIZ4gwVyCFu5izvJxckwfdKQRh+J9mGgk+X2UzI9WfopiiKVQeCKkAWJ3lWcb+bVmXNIdp1bEP3OXipvs\/tL3zjE9uQPjSk8R9HILrAHOTsOezWgu8Mlz688ghTMRQD18cOTtWzbF+hmb5n+G7+6L7epUwIDAQABo1MwUTAdBgNVHQ4EFgQUMXvvF4CDHoAGzjNB6+1w913MUcswHwYDVR0jBBgwFoAUMXvvF4CDHoAGzjNB6+1w913MUcswDwYDVR0TAQH\/BAUwAwEB\/zANBgkqhkiG9w0BAQsFAAOCAQEAnyjza5YUEyW36OSIOzCQAt9WmmUVnoth0RlV6i7dgRpRomuY4qSMVrs8VpLWOM6LCoGl3x9looVIdlzD2\/qe\/stzz7Ju5TqD\/OH6j088GcJpU8s4iP\/hU3ibju0cXOCdDK0WxZ6C5IqymFLYqCVuO1sJLDiKKmwQrhCrUXhDPdFeh9K9BbrpTxIJl+WynxTfbdXa1LtgN\/ORFl2GRxqTRGpC\/Z\/9+nBK3kP1N9i+8WLD6Wr5dRBYTmTNIbBf8vB4IPgS7rdaKqvTjcoaEiVrGE4zGle5QUzD+6EO0fr82zRMMGrz5rOKqropb32kaAUkkkBhynCCK6LeOHaJ9mBncw=="]},{"sourceDir":"\/product\/app\/Gallery2\/Gallery2.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.gallery3d","label":"图库","versionName":"1.1.40030","uid":10082,"versionCode":40030,"flags":819510341,"pkg":"com.android.gallery3d","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/PrebuiltGmsCore\/PrebuiltGmsCore.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.google.android.gms","label":"Google Play 服务","versionName":"24.41.34 (190400-685836814)","uid":10035,"versionCode":244134029,"flags":-1597325755,"pkg":"com.google.android.gms","firstInstallTime":1230768000000,"sign":["MIIFyDCCA7CgAwIBAgIUEIplCHP5L45R7UKkMjctakUZ62kwDQYJKoZIhvcNAQELBQAwdDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC0dvb2dsZSBJbmMuMRAwDgYDVQQLEwdBbmRyb2lkMRAwDgYDVQQDEwdBbmRyb2lkMCAXDTIwMDMwOTE5NTcwMVoYDzIwNTAwMzA5MTk1NzAxWjB0MQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLR29vZ2xlIEluYy4xEDAOBgNVBAsTB0FuZHJvaWQxEDAOBgNVBAMTB0FuZHJvaWQwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCzJZtTqtrygZN8lFLTtlokxIJLYCvEuTC035sdOccvIzKMV8uBFmEI2CtxNpWWoOSzn8Rh9iVqJVh3Pr1cMj3we5PZIwjei0FgNHpqFOHgqavbWZd+4KOQKBbgaKNzPdQMZqAH0HsMct+rCjFDebHs5LKSC3zLRjRKkdFpyQ5RHrrTnw\/xUEXMj\/aLDK65bOxtVElKGW3i3B7KenBUklLAjKemHcDNvxd1bB9SFXsJJCjETZzxPlKJzsumiqF+XqyPTeW07PGvagcjoUC8F4dCaPsyjKQmGiHyaJ6+Ja+xN4Iv4BlLG2ejZYg+KoXkT8tT6nuMsac+gEFJgzzK6\/i61WYzqAqjgmuZnFzX2cQUm3dTxcO+mclLICtJkOSX4dlNk9k9MvzppLo\/f3jIHj9ZyPtrE6TGqWNxxbxNtyR5mhFlkXUuVV5to+oi92p\/H\/VW9lCnz35n481nRC1b4i7K8lR78TxCX8q5XHHinGJ4FRvonTMdDMZF0VLUj9Ln6E1RgIdhvL12TIIbakta97kj5xYOnvO4Sn+7f0XCB6mwnRCuBqFlAmC3lczQBnn\/5c8eN35Pi4r93uWNtWtlmaKfYkg1pzd4RuFjb7OqzhqvLNoy4UT0Zdi5srrAy2VEGT7uSbFWXSAWiDfZIrvrgYTkS+nEMyCG+RzzVQnwbBpSnQIDAQABo1AwTjAMBgNVHRMEBTADAQH\/MB0GA1UdDgQWBBSW0BKpskOzbgMSMaTGX3u6+ANxOzAfBgNVHSMEGDAWgBSW0BKpskOzbgMSMaTGX3u6+ANxOzANBgkqhkiG9w0BAQsFAAOCAgEAq5uBsacoC0W5EYAnoIF+yesnw1qEIyNZ4WrUwWbd+B4C9G3J9ULbIuAV06WDNNnjzJXCMga9GaV2azuJWHYUv9hSzK+Xsynbjw4xQPRbqX02QKl1Bq7ke+NbJs855xn1im3XXg75qnuEbgNO3GeIc+QlgxCigzdrIbTe\/SHtAIVNTNRYIz04T5\/SzfVGozwYTudzuWDpSQzIa1X0YVQbXs77Q4usWU4x1DjsqGpidsN72mh74d8oJH7Qrfy0IQPCNM\/aQIiZYdEqo53fdt55nNaOeajCPyF76jlGff8THJrGEOWBVEBhL7Y3O2k\/f4e9o6vwYMrNACPLgu1oqeA4yKEOh69ONlmQhUagjo0YsbnCSH6c2iw2tSgzH2xiArhi\/qWZghR98Tm3WPnz6wxGy8yX+Kf4yPbiVpft0a13UuWhsTODrNhVWtFh9rHHGRdqiQ3Qm\/OabR2Bg0M66RvZHQRt812n1\/AIt08hpIhDRWWn+WT5ALLof6moWFQBCk8SOkUEoaACHTlefyvhkFySdjkcdRZuEvj0pO4VlyI8mWEf6aqmnZD9zw8kGc0VkwBfZVXRkLKQ9xHzWSsNMMJMa\/Kp4nwE2HSDCAa20vXCHRFGvSU5NFYUbnWNYnytbvUNHWfhXkOlIRG3fK13JGwTpi+3ZbaMXablTqEqpKPzKfA="]},{"sourceDir":"\/system\/priv-app\/GoogleServicesFramework\/GoogleServicesFramework.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.google.android.gsf","label":"Google 服务框架","versionName":"12","uid":10035,"versionCode":31,"flags":143146565,"pkg":"com.google.android.gsf","firstInstallTime":1230768000000,"sign":["MIIFyDCCA7CgAwIBAgIUEIplCHP5L45R7UKkMjctakUZ62kwDQYJKoZIhvcNAQELBQAwdDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC0dvb2dsZSBJbmMuMRAwDgYDVQQLEwdBbmRyb2lkMRAwDgYDVQQDEwdBbmRyb2lkMCAXDTIwMDMwOTE5NTcwMVoYDzIwNTAwMzA5MTk1NzAxWjB0MQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLR29vZ2xlIEluYy4xEDAOBgNVBAsTB0FuZHJvaWQxEDAOBgNVBAMTB0FuZHJvaWQwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCzJZtTqtrygZN8lFLTtlokxIJLYCvEuTC035sdOccvIzKMV8uBFmEI2CtxNpWWoOSzn8Rh9iVqJVh3Pr1cMj3we5PZIwjei0FgNHpqFOHgqavbWZd+4KOQKBbgaKNzPdQMZqAH0HsMct+rCjFDebHs5LKSC3zLRjRKkdFpyQ5RHrrTnw\/xUEXMj\/aLDK65bOxtVElKGW3i3B7KenBUklLAjKemHcDNvxd1bB9SFXsJJCjETZzxPlKJzsumiqF+XqyPTeW07PGvagcjoUC8F4dCaPsyjKQmGiHyaJ6+Ja+xN4Iv4BlLG2ejZYg+KoXkT8tT6nuMsac+gEFJgzzK6\/i61WYzqAqjgmuZnFzX2cQUm3dTxcO+mclLICtJkOSX4dlNk9k9MvzppLo\/f3jIHj9ZyPtrE6TGqWNxxbxNtyR5mhFlkXUuVV5to+oi92p\/H\/VW9lCnz35n481nRC1b4i7K8lR78TxCX8q5XHHinGJ4FRvonTMdDMZF0VLUj9Ln6E1RgIdhvL12TIIbakta97kj5xYOnvO4Sn+7f0XCB6mwnRCuBqFlAmC3lczQBnn\/5c8eN35Pi4r93uWNtWtlmaKfYkg1pzd4RuFjb7OqzhqvLNoy4UT0Zdi5srrAy2VEGT7uSbFWXSAWiDfZIrvrgYTkS+nEMyCG+RzzVQnwbBpSnQIDAQABo1AwTjAMBgNVHRMEBTADAQH\/MB0GA1UdDgQWBBSW0BKpskOzbgMSMaTGX3u6+ANxOzAfBgNVHSMEGDAWgBSW0BKpskOzbgMSMaTGX3u6+ANxOzANBgkqhkiG9w0BAQsFAAOCAgEAq5uBsacoC0W5EYAnoIF+yesnw1qEIyNZ4WrUwWbd+B4C9G3J9ULbIuAV06WDNNnjzJXCMga9GaV2azuJWHYUv9hSzK+Xsynbjw4xQPRbqX02QKl1Bq7ke+NbJs855xn1im3XXg75qnuEbgNO3GeIc+QlgxCigzdrIbTe\/SHtAIVNTNRYIz04T5\/SzfVGozwYTudzuWDpSQzIa1X0YVQbXs77Q4usWU4x1DjsqGpidsN72mh74d8oJH7Qrfy0IQPCNM\/aQIiZYdEqo53fdt55nNaOeajCPyF76jlGff8THJrGEOWBVEBhL7Y3O2k\/f4e9o6vwYMrNACPLgu1oqeA4yKEOh69ONlmQhUagjo0YsbnCSH6c2iw2tSgzH2xiArhi\/qWZghR98Tm3WPnz6wxGy8yX+Kf4yPbiVpft0a13UuWhsTODrNhVWtFh9rHHGRdqiQ3Qm\/OabR2Bg0M66RvZHQRt812n1\/AIt08hpIhDRWWn+WT5ALLof6moWFQBCk8SOkUEoaACHTlefyvhkFySdjkcdRZuEvj0pO4VlyI8mWEf6aqmnZD9zw8kGc0VkwBfZVXRkLKQ9xHzWSsNMMJMa\/Kp4nwE2HSDCAa20vXCHRFGvSU5NFYUbnWNYnytbvUNHWfhXkOlIRG3fK13JGwTpi+3ZbaMXablTqEqpKPzKfA="]},{"sourceDir":"\/apex\/com.android.extservices\/priv-app\/ExtServices\/ExtServices.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/android.ext.services","label":"Android Services Library","versionName":"2019-09","uid":10101,"versionCode":309999900,"flags":550026821,"pkg":"android.ext.services","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/apex\/com.android.wifi\/priv-app\/ServiceWifiResources\/ServiceWifiResources.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.wifi.resources","label":"系统 WLAN 资源","versionName":"R-initial","uid":10096,"versionCode":1,"flags":680050241,"pkg":"com.android.wifi.resources","firstInstallTime":1230768000000,"sign":["MIIGJzCCBA+gAwIBAgIUYJCfWCLIVw8RN9EmWeX78BvlReMwDQYJKoZIhvcNAQELBQAwgaExCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1Nb3VudGFpbiBWaWV3MRAwDgYDVQQKDAdBbmRyb2lkMRAwDgYDVQQLDAdBbmRyb2lkMR0wGwYDVQQDDBRTZXJ2aWNlV2lmaVJlc291cmNlczEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbTAgFw0yMDAzMjUwMzA0MDFaGA80NzU4MDIxOTAzMDQwMVowgaExCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1Nb3VudGFpbiBWaWV3MRAwDgYDVQQKDAdBbmRyb2lkMRAwDgYDVQQLDAdBbmRyb2lkMR0wGwYDVQQDDBRTZXJ2aWNlV2lmaVJlc291cmNlczEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAOqOCNZuwS5nIEg5wUPop40+WSAZEQ5SL\/uSNU1dnGMSxkD5QqZQ3eWKlLSvP1FXtbQPTojXn2fa8w2P39dUAe33NXgpSHZVk18DMgeepNCAbynJfciqYCMjnT3G1scIZP8HCxAXsuoynqLSms7IyombgM4iePVKKKwRpe3F3BmWgjgzRatW6C2CJLHc4KgCD53b4w9XHrQ8l3L1c3bgIwjaDSd0VxKIa41KtHHWp3LuvxX54wz6tbBNW5ZMNDEfvF7CGmTCkdbMAYkWcJxZxA57E2tpxXd+2TnEDo6HL7Yq28jGr8jN6U63zRsKHLMi+Dtyei0w1nBxtTf5KsWI7B5Cxavl+V+tCsnNfq5Gu+vjJnlL0kpFcBixG\/TPv7H+NgyO5D7joAyGSctfMkTPWdSRD\/FNTs30yil+hxUIu4mFYtXO+c6yIm11OBmGz1IoqetgbBhQiUwy+p8oqge2NtFDaIJ3dkd5cmNUF\/EXI89aUhu0o\/Vo2coUpR\/cYZTgexfk2RKcH3RkuG69HXofrC9SGY0RI7GgmaG0e1inBjVrOydP1XXJmF3DV8yy8NmkJklbljsGD52XuBC6VQ0eIh7cLKWjgMCJFFNkNgU0syZ3+bma28FWvzJzd3ii5seWqePGgcrfdgjxblNzQEKWw0Me9Wn\/S0OKOz\/5OAM9Z7RDAgMBAAGjUzBRMB0GA1UdDgQWBBQjYEU0cbWxEO42h68+ttN5+wDSITAfBgNVHSMEGDAWgBQjYEU0cbWxEO42h68+ttN5+wDSITAPBgNVHRMBAf8EBTADAQH\/MA0GCSqGSIb3DQEBCwUAA4ICAQCatnV7MZsIQTPo3AbbvmSPfyFM4\/ncRDao+hxxvDKwMMWw6O2ruKPIbdj3xcH4vwvM2v3Kg+YCNrRgTTG23QHXNzHgXM75o1q7djGEiuOaZ6lwGh0GKD0B1xnYVRKqpacoP7SJ2MLWpum1i6c12P3s4JLBIiU4OtHKOozai37YMFM1IwlaQsGwgXyScRPs091aGe0G4eC0\/10skHW0ASS4VUjbvqQE6opfMLdoMhuqAxTY8Nlz51B2smf\/w7AAU4dpOE5sgdctbWpMNovAZe8yxt3Wk48pFIYPwTRXM6wSXoqYzX23s\/rJmuGzX3PKV5hVZazYetj5clK\/HB4Y\/Clf3bVaoOKKSUgtOT3KB732yHIfFJDlvhqe5niRNf2Decy6aYJFw\/IqMYM\/3Fh4B1JcDFHzOq4Ta6yuvhqbXVdbM5dPzcgQCO640v20uQVMjpknnxdBu7QxLMYuAfeuJkoWnvRtjSwQHPisnCWfxu6ryBIN3Xg7HtiEv+CVrvyq2UGbKhCtk\/Z50eOdyRTAldoP3AcGbakZHtKAuz\/m9TlTYDCnh\/tH79soVqj2HMaM5XzslueGaERt149pr8uOhhK4NO+e1bc65Fw9ysHVrVn4pcaq8OGmyPSAsaHXcskBG5CywWfPcBaSij\/0+QLbddie1cyeCFxz0aDypNMH+SCgsA=="]},{"sourceDir":"\/system\/priv-app\/CallLogBackup\/CallLogBackup.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.calllogbackup","label":"Call Log Backup\/Restore","versionName":"12","uid":10017,"versionCode":31,"flags":814333509,"pkg":"com.android.calllogbackup","firstInstallTime":1230768000000,"sign":["MIID9jCCAt6gAwIBAgITZ18uqmkHa2xlfO9Q519TQ92c9zANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMCAXDTIzMDIyMTA0MDAzNFoYDzIwNTAwNzA5MDQwMDM0WjCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3UmDNoXsR\/SZ1X6QbhmwXTTCELkLKu02rAgj+p2c16eWk96nILZq3OQXxXffG5HK7T9N7pGYK0dIfdxDFI2SWUIekqJ67a3\/NRXZnCF\/QuXh6HfbSFT\/U9d+liJRU6+Lms21YL0WI+WdQ3VGnvtB5uFEmpg\/8kxOBLfphVbT730aU7\/5CDv0ZH3n\/XV8yIZ4gwVyCFu5izvJxckwfdKQRh+J9mGgk+X2UzI9WfopiiKVQeCKkAWJ3lWcb+bVmXNIdp1bEP3OXipvs\/tL3zjE9uQPjSk8R9HILrAHOTsOezWgu8Mlz688ghTMRQD18cOTtWzbF+hmb5n+G7+6L7epUwIDAQABo1MwUTAdBgNVHQ4EFgQUMXvvF4CDHoAGzjNB6+1w913MUcswHwYDVR0jBBgwFoAUMXvvF4CDHoAGzjNB6+1w913MUcswDwYDVR0TAQH\/BAUwAwEB\/zANBgkqhkiG9w0BAQsFAAOCAQEAnyjza5YUEyW36OSIOzCQAt9WmmUVnoth0RlV6i7dgRpRomuY4qSMVrs8VpLWOM6LCoGl3x9looVIdlzD2\/qe\/stzz7Ju5TqD\/OH6j088GcJpU8s4iP\/hU3ibju0cXOCdDK0WxZ6C5IqymFLYqCVuO1sJLDiKKmwQrhCrUXhDPdFeh9K9BbrpTxIJl+WynxTfbdXa1LtgN\/ORFl2GRxqTRGpC\/Z\/9+nBK3kP1N9i+8WLD6Wr5dRBYTmTNIbBf8vB4IPgS7rdaKqvTjcoaEiVrGE4zGle5QUzD+6EO0fr82zRMMGrz5rOKqropb32kaAUkkkBhynCCK6LeOHaJ9mBncw=="]},{"sourceDir":"\/system\/app\/CameraExtensionsProxy\/CameraExtensionsProxy.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.cameraextensions","label":"CameraExtensionsProxy","versionName":"12","uid":10054,"versionCode":31,"flags":814267973,"pkg":"com.android.cameraextensions","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/LocalTransport\/LocalTransport.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.localtransport","label":"com.android.localtransport","versionName":"12","uid":1000,"versionCode":31,"flags":814235205,"pkg":"com.android.localtransport","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/PackageInstaller\/PackageInstaller.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.packageinstaller","label":"软件包安装程序","versionName":"12","uid":10036,"versionCode":31,"flags":818429509,"pkg":"com.android.packageinstaller","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/CarrierDefaultApp\/CarrierDefaultApp.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.carrierdefaultapp","label":"运营商默认应用","versionName":"12","uid":10065,"versionCode":31,"flags":948485701,"pkg":"com.android.carrierdefaultapp","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/overlay\/FontNotoSerifSource\/FontNotoSerifSourceOverlay.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.theme.font.notoserifsource","label":"Noto Serif \/ Source Sans Pro","versionName":"1.0","uid":10001,"versionCode":1,"flags":814267969,"pkg":"com.android.theme.font.notoserifsource","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/ProxyHandler\/ProxyHandler.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.proxyhandler","label":"ProxyHandler","versionName":"12","uid":10015,"versionCode":31,"flags":814267973,"pkg":"com.android.proxyhandler","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/overlay\/DisplayCutoutEmulationWaterfall\/DisplayCutoutEmulationWaterfallOverlay.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.display.cutout.emulation.waterfall","label":"瀑布刘海屏","versionName":"1.0","uid":10009,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.display.cutout.emulation.waterfall","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/app\/GoogleCalendarSyncAdapter\/GoogleCalendarSyncAdapter.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.google.android.syncadapters.calendar","label":"Google 日历同步","versionName":"2021.41.2-406147485-release","uid":10064,"versionCode":2017039780,"flags":814235205,"pkg":"com.google.android.syncadapters.calendar","firstInstallTime":1230768000000,"sign":["MIIEQzCCAyugAwIBAgIJAMLgh0ZkSjCNMA0GCSqGSIb3DQEBBAUAMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDAeFw0wODA4MjEyMzEzMzRaFw0zNjAxMDcyMzEzMzRaMHQxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtHb29nbGUgSW5jLjEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDCCASAwDQYJKoZIhvcNAQEBBQADggENADCCAQgCggEBAKtWLgDYO6IIrgqWbxJOKdoR8qtW0I9Y4sypEwPpt1TTcvZApxsdyxMJZ2JORland2qSGT2y5b+3JKkedxiLDmpHpDsz2WCbdxgxRczfey5YZnTJ4VZbH0xqWVW\/8lGmPav5xVwnIiJS6HXk+BVKZF+JcWjAsb\/GEuq\/eFdpuzSqeYTcfi6idkyugwfYwXFU1+5fZKUaRKYCwkkFQVfcAs1fXA5V+++FGfvjJ\/CxURaSxaBvGdGDhfXE28LWuT9ozCl5xw4Yq5OGazvV24mZVSoOO0yZ31j7kYvtwYK6NeADwbSxDdJEqO4k\/\/0zOHKrUiGYXtqw\/A0LFFtqoZKFjnkCAQOjgdkwgdYwHQYDVR0OBBYEFMd9jMIhF1Ylmn\/Tgt9r45jk14alMIGmBgNVHSMEgZ4wgZuAFMd9jMIhF1Ylmn\/Tgt9r45jk14aloXikdjB0MQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLR29vZ2xlIEluYy4xEDAOBgNVBAsTB0FuZHJvaWQxEDAOBgNVBAMTB0FuZHJvaWSCCQDC4IdGZEowjTAMBgNVHRMEBTADAQH\/MA0GCSqGSIb3DQEBBAUAA4IBAQBt0lLO74UwLDYKqs6Tm8\/yzKkEu116FmH4rkaymUIE0P9KaMftGlMexFlaYjzmB2OxZyl6euNXEsQH8gjwyxCUKRJNexBiGcCEyj6z+a1fuHHvkiaai+KL8W1EyNmgjmyy8AW7P+LLlkR+ho5zEHatRbM\/YAnqGcFh5iZBqpknHf1SKMXFh4dd239FJ1jWYfbMDMy3NS5CTMQ2XFI1MvcyUTdZPErjQfTbQe3aDQsQcafEQPD+nqActifKZ0Np0IS9L9kR\/wbNvyz6ENwPiTrjV2KRkEjH78ZMcUQXg0L3BYHJ3lc69Vs5Ddf9uUGGMYldX3WfMBEmh\/9iFBDAaTCK"]},{"sourceDir":"\/system\/priv-app\/ManagedProvisioning\/ManagedProvisioning.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.managedprovisioning","label":"工作设置","versionName":"12","uid":10021,"versionCode":31,"flags":952679941,"pkg":"com.android.managedprovisioning","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/sumsung\/sumsung.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.samsung.android.deviceidservice","label":"deviceidservice","versionName":"1.0","uid":10057,"versionCode":1,"flags":818462277,"pkg":"com.samsung.android.deviceidservice","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/SoundPicker\/SoundPicker.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.soundpicker","label":"声音","versionName":"12","uid":10023,"versionCode":31,"flags":818429509,"pkg":"com.android.soundpicker","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUNMu142V76fXuZ7PUFPgp6HC+ZoIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM2sZbt8wo2kH8AorvuSJMo5e4BrLV1xIME5gQzQ7HmjT4B0Kvx\/eJS9LD75RTaUeZD5+NsHKZcKt8uqcvgly4IjUwjx+kaFXV0R1oUsAWqAhFldaS+8miZFVOtYr0ASEJEeSZtnB+n4U+muLTUJvASMtgcqDxbZllIYN+2ASCfTVK72yngz5f7nf8RLUtQJ5ebyucUrGwAbQHytz6qvQnku1rrw1m0A4OKRtSPDq8YHMlWN7XLWtObSlNDAHZrd2AoF73zgj4hn2WiAvrJNAaJx2JajcZGci9MHEK3aYge6oiVmKNJViK6ZbXzeYz2Bpu5mRs1ID1mxPVQxz\/YNB\/0CAwEAAaNTMFEwHQYDVR0OBBYEFNmzS1F9a1FzXzorY1jGcaMK6Q3IMB8GA1UdIwQYMBaAFNmzS1F9a1FzXzorY1jGcaMK6Q3IMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAFzjV\/OOU9mQQ9XZZLeDnD4wk7y\/IK71u2H4o3OA\/zHZozTv6cF2tPeRQEUOCff5A1n4\/Hi9b2KjBc0j+kH0sR6TB0cNjSqbo5e9utTp0YKa1OakvFZapMe9j06ieuFXypxhNz1hZE\/VwZluWsb5gaVIn08eY6QO06QLcl2TiGXTY86k1XFqwdFDXp7Zj8ymJcDGjaM3C\/lcGlLsdg2pjKkVFiA63eM7W0iWYP6v+XAZWja+HYCy54kgh4BGj\/x4bWlKnTZUHMB6GwVxX\/Le4Uiy5IxppyAs\/kvB\/HFkirL9qqRCQKlaDlGzmlZ2T\/L4\/os8sN7PYBf8dB75y51QtO0="]},{"sourceDir":"\/product\/app\/PhotoTable\/PhotoTable.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.dreams.phototable","label":"照片屏幕保护程序","versionName":"12","uid":10079,"versionCode":31,"flags":815316549,"pkg":"com.android.dreams.phototable","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system_ext\/app\/WAPPushManager\/WAPPushManager.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.smspush","label":"com.android.smspush","versionName":"12","uid":10093,"versionCode":31,"flags":814267909,"pkg":"com.android.smspush","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/product\/priv-app\/ImsServiceEntitlement\/ImsServiceEntitlement.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.imsserviceentitlement","label":"com.android.imsserviceentitlement","versionName":"12","uid":10072,"versionCode":31,"flags":814267973,"pkg":"com.android.imsserviceentitlement","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/m_independent\/AndroidPlatformServices.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.google.android.gms.policy_sidecar_aps","label":"com.google.android.gms.policy_sidecar_aps","versionName":"2052073.215491873.215491873","uid":10038,"versionCode":2052073,"flags":680050245,"pkg":"com.google.android.gms.policy_sidecar_aps","firstInstallTime":1230768000000,"sign":["MIID2TCCAsGgAwIBAgIJAO6BeiySSl2OMA0GCSqGSIb3DQEBBQUAMIGCMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzEUMBIGA1UECgwLR29vZ2xlIEluYy4xEDAOBgNVBAsMB0FuZHJvaWQxHjAcBgNVBAMMFWdtc2NvcmVfbW9kdWxlc19wZXJjeTAeFw0xNjAzMDgyMzI3MzJaFw00MzA3MjUyMzI3MzJaMIGCMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzEUMBIGA1UECgwLR29vZ2xlIEluYy4xEDAOBgNVBAsMB0FuZHJvaWQxHjAcBgNVBAMMFWdtc2NvcmVfbW9kdWxlc19wZXJjeTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMtMBJ7X2zo1tRsVGn16jYgdhzLUE4pujr3swgAAZL5MXkqC2LG9tQRnZIF\/d3c9v5aPRH5ApIXjpDI\/ofOjEzr5EWd3EEj1XGKxwN+z5yv\/WnVtGHbW\/cb0XFWwcHaUMVNpGLG\/s5ywokKAfpZxtF7hgNVBkpIvEV0OtVOgUwIJ1hlPFNRu4IVwG1fNizTmOGA7Fy2lowvUZd6CzMhBY1SuSOOcwiAlC1xPaRDU\/\/x6b8Avl+gJhltDSOgvMZovfRrJN3XsTorGHQj3qo\/WW2TS8xp+VEaQiVeUYcMz5y9bG4flaTsovttN1n3YeUQXKy5NHkq7bIILiEwJH0nk\/YMCAwEAAaNQME4wHQYDVR0OBBYEFAEt0pkmHkt+l7ZwE\/h2TZ8X+Co1MB8GA1UdIwQYMBaAFAEt0pkmHkt+l7ZwE\/h2TZ8X+Co1MAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADggEBAMi49sXX8lWoJgz0WZo4pZZ0fP9CxjtdUiuK3Gi1I2GuXMzHh4Qbfpong7jn0NCE\/oA8X8u2+qqs40yqnS\/u3erNxb8duTHC6ndLyYAHRmP4k8RYMyILARj\/szxmz3KuBzCmptqPzKXMHynksZsgbciHcWIPtu\/iBmWVtbrBTB6\/yJ\/ZcSc7lRIAo89IP10jqOWjIFkZTY9xRDfKF7GE57P2DMIUqBl67tK5T8whJvA5ljEjugUY5DzF+x4NzjtGdBm6DtPpfW3z+70GWPwVkB84+LRsog9uK4WRXTgBnBJiePUYpIM6twq4Rj2MeYszcd\/CKO88X9UC0UW9ycVLZO4="]},{"sourceDir":"\/system_ext\/app\/call\/call.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.system.call","label":"call","versionName":"1.0","uid":10092,"versionCode":1,"flags":948485703,"pkg":"com.system.call","firstInstallTime":1230768000000,"sign":["MIIDDzCCAfegAwIBAgIEfitfZTANBgkqhkiG9w0BAQsFADA3MQswCQYDVQQGEwJVUzEQMA4GA1UEChMHQW5kcm9pZDEWMBQGA1UEAxMNQW5kcm9pZCBEZWJ1ZzAgFw0yMTEwMTMwOTU1MzNaGA8yMDUxMTAwNjA5NTUzM1owNzELMAkGA1UEBhMCVVMxEDAOBgNVBAoTB0FuZHJvaWQxFjAUBgNVBAMTDUFuZHJvaWQgRGVidWcwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCET451ztQrux7VTrbPBcHj5Er1ztlzG9fsffOfEQwE8EjKp\/4+u96dq1j6uWo5+dOaUmCZxdAMFbK\/M3CpDHE8O9lfg4dsyUFW7NnfVH+sV8bUW48BFvb9sjuWnS6\/tnQQo9F6cWHbwjLQusTMxTClb\/axH5JRwk6+Xucak6SaBVExwbBcR2ADbDh4gBPTTLasEhHRZJugdN9KXuhG+\/RYLA72j0kqwQG1OxTQ89LBEQDn4AtCHf3zLGy4xcn7hKAs5SPdNhuQkEdL30FwosXpXpyNoyo\/LVyNi7kRmynl+ihgYrtV2GPNRrYrpinchOYFQ8SBvuCOeM9JmI9ODDZTAgMBAAGjITAfMB0GA1UdDgQWBBSSFS7e93mbr5JZGsGjHvdPzojpfzANBgkqhkiG9w0BAQsFAAOCAQEAEO3RHDFnV+ddvyoYiZ80RQUvqvKCaHXTTkTbzOJ0ZaoQ5MTIxgWQMzmPpzK6vXPMeeYazo6SCQs9lM4QDf69fq3ib7pBptt+rqT+EASxW0Wd2amJhRBRn8cFMl+akVZoelbmeATjY+\/\/MjGtmUO3HMzxvekx61ScMSMfX7hEbmidW6EXTskDNDjyoF9VNbKTZi30v1xMf+STWIsl3TnlbxQ5Vx42ACA\/ay5JWXVR0yx901Lc0Kume61NW6QxRzRxe+ClkJOONrdFum3HmK4zbSqYyJ0NZBsvIY7V4qmSTPWvy6Z\/xeKV17HJNVXEwa1+MomsdwhuGlbSWB9dAwpvNQ=="]},{"sourceDir":"\/system_ext\/priv-app\/StorageManager\/StorageManager.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.storagemanager","label":"存储空间管理器","versionName":"12","uid":10087,"versionCode":31,"flags":818429509,"pkg":"com.android.storagemanager","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/app\/BookmarkProvider\/BookmarkProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.bookmarkprovider","label":"Bookmark Provider","versionName":"12","uid":10067,"versionCode":31,"flags":814267973,"pkg":"com.android.bookmarkprovider","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system_ext\/priv-app\/Settings\/Settings.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.settings","label":"设置","versionName":"12","uid":1000,"versionCode":31,"flags":952745541,"pkg":"com.android.settings","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/apex\/com.android.tethering\/priv-app\/InProcessTethering\/InProcessTethering.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.networkstack.tethering.inprocess","label":"Tethering","versionName":"12","uid":1000,"versionCode":31,"flags":680050245,"pkg":"com.android.networkstack.tethering.inprocess","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/PlatformNetworkPermissionConfig\/PlatformNetworkPermissionConfig.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.networkstack.permissionconfig","label":"com.android.server.NetworkPermissionConfig","versionName":"2019-09","uid":1073,"versionCode":300000000,"flags":948485701,"pkg":"com.android.networkstack.permissionconfig","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/ExactCalculator\/ExactCalculator.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.calculator2","label":"计算器","versionName":"12","uid":10056,"versionCode":31,"flags":549994053,"pkg":"com.android.calculator2","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/app\/CtsShimPrebuilt\/CtsShimPrebuilt.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.cts.ctsshim","label":"com.android.cts.ctsshim","versionName":"12-7552332","uid":10066,"versionCode":31,"flags":814267969,"pkg":"com.android.cts.ctsshim","firstInstallTime":1230768000000,"sign":["MIIEqDCCA5CgAwIBAgIJAJNurL4H8gHfMA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEQMA4GA1UEChMHQW5kcm9pZDEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbTAeFw0wODAyMjkwMTMzNDZaFw0zNTA3MTcwMTMzNDZaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEQMA4GA1UEChMHQW5kcm9pZDEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbTCCASAwDQYJKoZIhvcNAQEBBQADggENADCCAQgCggEBANaTGQTexgskse3HYuDZ2CU+Ps1s6x3i\/waMqOi8qM1r03hupwqnbOYOuw+ZNVn\/2T53qUPn6D1LZLjk\/qLT5lbx4meoG7+yMLV4wgRDvkxyGLhG9SEVhvA4oU6Jwr44f46+z4\/Kw9oe4zDJ6pPQp8PcSvNQIg1QCAcy4ICXF+5qBTNZ5qaU7Cyz8oSgpGbIepTYOzEJOmc3Li9kEsBubULxWBjf\/gOBzAzURNps3cO4JFgZSAGzJWQTT7\/emMkod0jb9WdqVA2BVMi7yge54kdVMxHEa5r3b97szI5p58ii0I54JiCUP5lyfTwE\/nKZHZnfm644oLIXf6MdW2r+6R8CAQOjgfwwgfkwHQYDVR0OBBYEFEhZAFY9JyxGrhGGBaR0GawJyowRMIHJBgNVHSMEgcEwgb6AFEhZAFY9JyxGrhGGBaR0GawJyowRoYGapIGXMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECBMKQ2FsaWZvcm5pYTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEQMA4GA1UEChMHQW5kcm9pZDEQMA4GA1UECxMHQW5kcm9pZDEQMA4GA1UEAxMHQW5kcm9pZDEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbYIJAJNurL4H8gHfMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADggEBAHqvlozrUMRBBVEY0NqrrwFbinZaJ6cVosK0TyIUFf\/azgMJWr+kLfcHCHJsIGnlw27drgQAvilFLAhLwn62oX6snb4YLCBOsVMR9FXYJLZW2+TcIkCRLXWG\/oiVHQGo\/rWuWkJgU134NDEFJCJGjDbiLCpe+ZTWHdcwauTJ9pUbo8EvHRkU3cYfGmLaLfgn9gP+pWA7LFQNvXwBnDa6sppCccEX31I828XzgXpJ4O+mDL1\/dBd+ek8ZPUP0IgdyZm5MTYPhvVqGCHzzTy3sIeJFymwrsBbmg2OAUNLEMO6nwmocSdN2ClirfxqCzJOLSDE4QyS9BAH6EhY6UFcOaE0="]},{"sourceDir":"\/system_ext\/app\/uimatorcore\/uimatorcore.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.uimator.test","label":"com.android.uimator.test","firstInstallTime":1230768000000,"uid":10091,"versionCode":0,"pkg":"com.android.uimator.test","flags":814267975,"sign":["MIIC5DCCAcwCAQEwDQYJKoZIhvcNAQEFBQAwNzEWMBQGA1UEAwwNQW5kcm9pZCBEZWJ1ZzEQMA4GA1UECgwHQW5kcm9pZDELMAkGA1UEBhMCVVMwIBcNMjMwNjAyMDkzOTMzWhgPMjA1MzA1MjUwOTM5MzNaMDcxFjAUBgNVBAMMDUFuZHJvaWQgRGVidWcxEDAOBgNVBAoMB0FuZHJvaWQxCzAJBgNVBAYTAlVTMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+gWYwueEC+U+Kiyip5\/Sr71gQBewKtsyl2OLCWHQCajk\/ATJ69PE6lr2Bl3MpPB0nIosOn0myNpULWnyQFGrjxnf1Jrf8kpB9ewaXrFEeJVsSddI8bnju2zfwrrAgMw\/xFHSoOc7yfsaIGSuGgllCw1zN1pG9pNaG4+pPZD63pLgVOM5jiZ8dfPJCyjvxrR51uGBuz\/v1676Qz3R\/nv+OOHiLptlg79DabaMshmuZ0ESS\/p45gk4D5qUASr0sWoVY79fnaTaOpxWEq9DQBxTGb5eaEaDJyBUMDzBrc0QXihC9wdFI3nv0ZNeedUbgoO+gzoyN+liMBSpXSfnhZkOQIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQAFpNysk2BJ6xflhnrJNXLEfg\/W1KFOadhYxoJuSi4D9S0omeW6mbklekDicmTX4dsLHtQjT+NIYB\/sUcfVQojM3IhXoKQMrBThOqOH2th034IYPZJd+FexkdgNHrg5\/lxn5gTKtDCUcOPc2JdKjQkFireQf0GCX8j\/l3l5HziCR4qZs+FX6DOSHrm7P6tLYNuEBmUG1kzW+9wq2ItN4kLc2ZeqB61lifhPz1y1mb+Hj18Mq8qEQGljRwkYkdu8tDfBH0Qi8r74uWWj7gl8ckDeu6kQI4enprFA5YGukWHuyR2fdRh88jkPYPaNc12+MkLW9+fY6vBtkSI9jh3S9XnI"]},{"sourceDir":"\/system\/app\/iflyime\/iflyime.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.iflytek.inputmethod","label":"讯飞输入法","versionName":"13.0.5","uid":10069,"versionCode":15072,"flags":953695813,"pkg":"com.iflytek.inputmethod","firstInstallTime":1230768000000,"sign":["MIICPzCCAaigAwIBAgIETPL\/HzANBgkqhkiG9w0BAQUFADBjMQswCQYDVQQGEwJDTjEOMAwGA1UECBMFQW5odWkxDjAMBgNVBAcTBUhlZmVpMRAwDgYDVQQKEwdpRmx5dGVrMRAwDgYDVQQLEwdpRmx5dGVrMRAwDgYDVQQDEwdpRmx5dGVrMCAXDTEwMTEyOTAxMTcxOVoYDzIwNjUwOTAxMDExNzE5WjBjMQswCQYDVQQGEwJDTjEOMAwGA1UECBMFQW5odWkxDjAMBgNVBAcTBUhlZmVpMRAwDgYDVQQKEwdpRmx5dGVrMRAwDgYDVQQLEwdpRmx5dGVrMRAwDgYDVQQDEwdpRmx5dGVrMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfJe7KJYuSvmxxY4KN+FZo4P\/Sc9vohO4MfbrSuKk81ORrIvZLLQulWyN6q9Yszgiq4JYhX\/a6NvanRerNTNHymBZDKuU5Jmq1SkqfzMirbeTuNPa704RHwZAimOMVnSKM3e5C6G9JMrxqfV2wAPgFFlj\/Er\/9OeTRNQxWYgKdsQIDAQABMA0GCSqGSIb3DQEBBQUAA4GBAD6yigZQSyT1oxMb1jVim51Iku9aFrB2\/R6BK+j0wwhNvItmKIg5wJm\/BWKPiTkPH8DTazpI5VdRt2Bo4+YjeCU7uOSJRmu4vrPgRipSGzyeKx+giVSma4V5pYG3H8Rl0uLOvISvJsrk2vFf2nK9Gl2X77iNikb6RjaVuCq69Vrx"]},{"sourceDir":"\/system\/priv-app\/VpnDialogs\/VpnDialogs.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.vpndialogs","label":"VpnDialogs","versionName":"12","uid":10029,"versionCode":31,"flags":814235205,"pkg":"com.android.vpndialogs","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/gmime\/gmime.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.gmime","label":"gmime","versionName":"1.0","uid":10046,"versionCode":1,"flags":818462277,"pkg":"com.android.gmime","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/app\/Music\/Music.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.music","label":"音乐","versionName":"12","uid":10076,"versionCode":31,"flags":948485733,"pkg":"com.android.music","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/TeleService\/TeleService.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.phone","label":"电话服务","versionName":"12","uid":1001,"versionCode":31,"flags":952647245,"pkg":"com.android.phone","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/Shell\/Shell.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.shell","label":"Shell","versionName":"12","uid":2000,"versionCode":31,"flags":814267973,"pkg":"com.android.shell","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/WallpaperBackup\/WallpaperBackup.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.wallpaperbackup","label":"com.android.wallpaperbackup","versionName":"12","uid":1000,"versionCode":31,"flags":881376773,"pkg":"com.android.wallpaperbackup","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/BlockedNumberProvider\/BlockedNumberProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.providers.blockednumber","label":"存储已屏蔽的号码","versionName":"12","uid":10017,"versionCode":31,"flags":814267973,"pkg":"com.android.providers.blockednumber","firstInstallTime":1230768000000,"sign":["MIID9jCCAt6gAwIBAgITZ18uqmkHa2xlfO9Q519TQ92c9zANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMCAXDTIzMDIyMTA0MDAzNFoYDzIwNTAwNzA5MDQwMDM0WjCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3UmDNoXsR\/SZ1X6QbhmwXTTCELkLKu02rAgj+p2c16eWk96nILZq3OQXxXffG5HK7T9N7pGYK0dIfdxDFI2SWUIekqJ67a3\/NRXZnCF\/QuXh6HfbSFT\/U9d+liJRU6+Lms21YL0WI+WdQ3VGnvtB5uFEmpg\/8kxOBLfphVbT730aU7\/5CDv0ZH3n\/XV8yIZ4gwVyCFu5izvJxckwfdKQRh+J9mGgk+X2UzI9WfopiiKVQeCKkAWJ3lWcb+bVmXNIdp1bEP3OXipvs\/tL3zjE9uQPjSk8R9HILrAHOTsOezWgu8Mlz688ghTMRQD18cOTtWzbF+hmb5n+G7+6L7epUwIDAQABo1MwUTAdBgNVHQ4EFgQUMXvvF4CDHoAGzjNB6+1w913MUcswHwYDVR0jBBgwFoAUMXvvF4CDHoAGzjNB6+1w913MUcswDwYDVR0TAQH\/BAUwAwEB\/zANBgkqhkiG9w0BAQsFAAOCAQEAnyjza5YUEyW36OSIOzCQAt9WmmUVnoth0RlV6i7dgRpRomuY4qSMVrs8VpLWOM6LCoGl3x9looVIdlzD2\/qe\/stzz7Ju5TqD\/OH6j088GcJpU8s4iP\/hU3ibju0cXOCdDK0WxZ6C5IqymFLYqCVuO1sJLDiKKmwQrhCrUXhDPdFeh9K9BbrpTxIJl+WynxTfbdXa1LtgN\/ORFl2GRxqTRGpC\/Z\/9+nBK3kP1N9i+8WLD6Wr5dRBYTmTNIbBf8vB4IPgS7rdaKqvTjcoaEiVrGE4zGle5QUzD+6EO0fr82zRMMGrz5rOKqropb32kaAUkkkBhynCCK6LeOHaJ9mBncw=="]},{"sourceDir":"\/system\/priv-app\/UserDictionaryProvider\/UserDictionaryProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.providers.userdictionary","label":"用户字典","versionName":"12","uid":10017,"versionCode":31,"flags":814267909,"pkg":"com.android.providers.userdictionary","firstInstallTime":1230768000000,"sign":["MIID9jCCAt6gAwIBAgITZ18uqmkHa2xlfO9Q519TQ92c9zANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMCAXDTIzMDIyMTA0MDAzNFoYDzIwNTAwNzA5MDQwMDM0WjCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3UmDNoXsR\/SZ1X6QbhmwXTTCELkLKu02rAgj+p2c16eWk96nILZq3OQXxXffG5HK7T9N7pGYK0dIfdxDFI2SWUIekqJ67a3\/NRXZnCF\/QuXh6HfbSFT\/U9d+liJRU6+Lms21YL0WI+WdQ3VGnvtB5uFEmpg\/8kxOBLfphVbT730aU7\/5CDv0ZH3n\/XV8yIZ4gwVyCFu5izvJxckwfdKQRh+J9mGgk+X2UzI9WfopiiKVQeCKkAWJ3lWcb+bVmXNIdp1bEP3OXipvs\/tL3zjE9uQPjSk8R9HILrAHOTsOezWgu8Mlz688ghTMRQD18cOTtWzbF+hmb5n+G7+6L7epUwIDAQABo1MwUTAdBgNVHQ4EFgQUMXvvF4CDHoAGzjNB6+1w913MUcswHwYDVR0jBBgwFoAUMXvvF4CDHoAGzjNB6+1w913MUcswDwYDVR0TAQH\/BAUwAwEB\/zANBgkqhkiG9w0BAQsFAAOCAQEAnyjza5YUEyW36OSIOzCQAt9WmmUVnoth0RlV6i7dgRpRomuY4qSMVrs8VpLWOM6LCoGl3x9looVIdlzD2\/qe\/stzz7Ju5TqD\/OH6j088GcJpU8s4iP\/hU3ibju0cXOCdDK0WxZ6C5IqymFLYqCVuO1sJLDiKKmwQrhCrUXhDPdFeh9K9BbrpTxIJl+WynxTfbdXa1LtgN\/ORFl2GRxqTRGpC\/Z\/9+nBK3kP1N9i+8WLD6Wr5dRBYTmTNIbBf8vB4IPgS7rdaKqvTjcoaEiVrGE4zGle5QUzD+6EO0fr82zRMMGrz5rOKqropb32kaAUkkkBhynCCK6LeOHaJ9mBncw=="]},{"sourceDir":"\/apex\/com.android.mediaprovider\/priv-app\/MediaProvider\/MediaProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.providers.media.module","label":"媒体存储设备","versionName":"12","uid":10100,"versionCode":31,"flags":684211781,"pkg":"com.android.providers.media.module","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUNMu142V76fXuZ7PUFPgp6HC+ZoIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM2sZbt8wo2kH8AorvuSJMo5e4BrLV1xIME5gQzQ7HmjT4B0Kvx\/eJS9LD75RTaUeZD5+NsHKZcKt8uqcvgly4IjUwjx+kaFXV0R1oUsAWqAhFldaS+8miZFVOtYr0ASEJEeSZtnB+n4U+muLTUJvASMtgcqDxbZllIYN+2ASCfTVK72yngz5f7nf8RLUtQJ5ebyucUrGwAbQHytz6qvQnku1rrw1m0A4OKRtSPDq8YHMlWN7XLWtObSlNDAHZrd2AoF73zgj4hn2WiAvrJNAaJx2JajcZGci9MHEK3aYge6oiVmKNJViK6ZbXzeYz2Bpu5mRs1ID1mxPVQxz\/YNB\/0CAwEAAaNTMFEwHQYDVR0OBBYEFNmzS1F9a1FzXzorY1jGcaMK6Q3IMB8GA1UdIwQYMBaAFNmzS1F9a1FzXzorY1jGcaMK6Q3IMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAFzjV\/OOU9mQQ9XZZLeDnD4wk7y\/IK71u2H4o3OA\/zHZozTv6cF2tPeRQEUOCff5A1n4\/Hi9b2KjBc0j+kH0sR6TB0cNjSqbo5e9utTp0YKa1OakvFZapMe9j06ieuFXypxhNz1hZE\/VwZluWsb5gaVIn08eY6QO06QLcl2TiGXTY86k1XFqwdFDXp7Zj8ymJcDGjaM3C\/lcGlLsdg2pjKkVFiA63eM7W0iWYP6v+XAZWja+HYCy54kgh4BGj\/x4bWlKnTZUHMB6GwVxX\/Le4Uiy5IxppyAs\/kvB\/HFkirL9qqRCQKlaDlGzmlZ2T\/L4\/os8sN7PYBf8dB75y51QtO0="]},{"sourceDir":"\/system_ext\/priv-app\/EmergencyInfo\/EmergencyInfo.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.emergency","label":"急救信息","versionName":"12","uid":10089,"versionCode":31,"flags":818462277,"pkg":"com.android.emergency","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/apex\/com.android.wifi\/app\/OsuLogin\/OsuLogin.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.hotspot2.osulogin","label":"OsuLogin","versionName":"12","uid":10097,"versionCode":31,"flags":550026821,"pkg":"com.android.hotspot2.osulogin","firstInstallTime":1230768000000,"sign":["MIIGDzCCA\/egAwIBAgIUHzkh0UCF\/H+1mZZp0ROX4nXKOUowDQYJKoZIhvcNAQELBQAwgZUxCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1Nb3VudGFpbiBWaWV3MRAwDgYDVQQKDAdBbmRyb2lkMRAwDgYDVQQLDAdBbmRyb2lkMREwDwYDVQQDDAhPc3VMb2dpbjEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbTAgFw0yMDAzMjUwMjQ5MTNaGA80NzU4MDIxOTAyNDkxM1owgZUxCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRYwFAYDVQQHDA1Nb3VudGFpbiBWaWV3MRAwDgYDVQQKDAdBbmRyb2lkMRAwDgYDVQQLDAdBbmRyb2lkMREwDwYDVQQDDAhPc3VMb2dpbjEiMCAGCSqGSIb3DQEJARYTYW5kcm9pZEBhbmRyb2lkLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAMJDnjAeIZ2KUvKcONwxuzIhLvXr6LRm+Uz0ebjz++5IzQJLwr\/COPBG9zbIm8izj2acp+l4WVEYT6I4Es5LEp556ySCuZx8IjOd0Zd6NCdaKmYouDTjYTrELWUlZjfA7Km2L5x2M6ArnDO5zJ1BIsQ06S3C7iR3ktAQ1cFdidg6Ha2gainS0A1JKN3kL9BL1pvHRLzWZX4gsNhBC\/6Ue3W3Sx2JRQkaaLksDdoKq0QswEk5tGfKbVr9+hHv\/pztaaqEXSeV6f305cAxHzd6+QJ8f8AJz2Rhnv43y72UO8b02CSP3laUj8geidR8XXw+R7Kzu8NfFDL7uVIhktPaBxfWPNYtedp3JrGeZhkzljsushY+bVHECEzROhY2CiUZBEn+wwZLWe2W7oeeVCL1EZBYctK5CfrrV6x0wvbBUF\/ViwV+2LQXQNp08xB8bJBqoBn4KZjK0tTN86DqqRALyoVIVh5VDU9Wbi3vrJb0\/9TEQtMjuo0DS3hdtnowdRyAyhwbQHO26dqnnzBIXtTAve4RkOwnb8QzZde56qvRgweDE9Im1jpx4E+MMGqVYs8Txurmd\/t6bCjTvp1P4i88crk\/zqCoHEQEbiaNdfkULJAWg9wqxPjqPCTVNtOXoJwuHsNymQVSztIUSySzZQ8Trk0ApqQf8yH2mjM6HJJZoNpBAgMBAAGjUzBRMB0GA1UdDgQWBBRdpduh1P+IBMbg5S4n1kbj5hQsOzAfBgNVHSMEGDAWgBRdpduh1P+IBMbg5S4n1kbj5hQsOzAPBgNVHRMBAf8EBTADAQH\/MA0GCSqGSIb3DQEBCwUAA4ICAQB+FzSuoA7LCvn8l86VsSI4lH1KLLH+wrXp20w\/wYcBY+s4hYPpAJ8YbEMOT9uibK\/HpEWYFqiVCqk4gKXrQraxvmtqq0WNSwkjeopTYlZeBzTC\/If3UoOCp7KCfMdydIcxvk6LNokMWWqSCNP8QiD872XuBvj\/uQeBsbHZTqruqPnu+LZwpuHFVRp\/Pyj9rT61PsvGitb7q\/chW0G77csHOc5q2223LKlNknPsfbcR6nVEg4KfN7kPKny8iJtl2pdbfBjFDp+73nzW8qZU5JWO5nWL7cJh4mt5sPGrzpt\/Hf8\/Dngg69sImRqjv\/6\/wCV0pEmmNjKJkXcMaZ0T2TSs+A7K6l15NYk8exkMymTU7jk+iDud3tnQ68YHf\/A9pDu15OCw6U\/pTgOgu9corBLLhGV0Tb6XAnsWKe9tsLcumQXU5ZUn9m5VJl58wQHNhUqpT7L0fWtpiTMTStVA\/yZbndPO4SbjR5rjcAk1xge8lyIIp0WBWmwoQ\/1y4DXF\/yPaX733wO7uWUljgKuyMM\/zM4zklB8nFjXfPNf3j24Bzqmy7rqy4XB64enVmYQ2mVNqfwXvINoo2XOrAmj\/bhSWXiCFltJFM7fmJGOMEEHBt9QfbmCgmM4aoWMgH7P+HxGW+Vc3tGixBbsxNRC+\/VrPAINQV4x5q8zGYNQBqNFn\/A=="]},{"sourceDir":"\/product\/overlay\/NavigationBarModeGestural\/NavigationBarModeGesturalOverlay.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.systemui.navbar.gestural","label":"Gestural Navigation Bar","versionName":"1.0","uid":10005,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.systemui.navbar.gestural","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/FusedLocation\/FusedLocation.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.location.fused","label":"一体化位置信息","versionName":"12","uid":1000,"versionCode":31,"flags":814267973,"pkg":"com.android.location.fused","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/app\/DeskClock\/DeskClock.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.deskclock","label":"时钟","versionName":"12","uid":10078,"versionCode":31,"flags":818429509,"pkg":"com.android.deskclock","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system_ext\/priv-app\/SystemUI\/SystemUI.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.systemui","label":"系统界面","versionName":"12","uid":10090,"versionCode":31,"flags":818462221,"pkg":"com.android.systemui","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/app\/BluetoothMidiService\/BluetoothMidiService.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.bluetoothmidiservice","label":"Bluetooth MIDI Service","versionName":"12","uid":10039,"versionCode":31,"flags":814267973,"pkg":"com.android.bluetoothmidiservice","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/apex\/com.android.permission\/priv-app\/PermissionController\/PermissionController.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.permissioncontroller","label":"权限控制器","versionName":"31 system image","uid":10099,"versionCode":319999900,"flags":549993989,"pkg":"com.android.permissioncontroller","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/system\/priv-app\/Traceur\/Traceur.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.traceur","label":"系统跟踪","versionName":"1.0","uid":10018,"versionCode":2,"flags":814267973,"pkg":"com.android.traceur","firstInstallTime":1230768000000,"sign":["MIID9jCCAt6gAwIBAgITZ18uqmkHa2xlfO9Q519TQ92c9zANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMCAXDTIzMDIyMTA0MDAzNFoYDzIwNTAwNzA5MDQwMDM0WjCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3UmDNoXsR\/SZ1X6QbhmwXTTCELkLKu02rAgj+p2c16eWk96nILZq3OQXxXffG5HK7T9N7pGYK0dIfdxDFI2SWUIekqJ67a3\/NRXZnCF\/QuXh6HfbSFT\/U9d+liJRU6+Lms21YL0WI+WdQ3VGnvtB5uFEmpg\/8kxOBLfphVbT730aU7\/5CDv0ZH3n\/XV8yIZ4gwVyCFu5izvJxckwfdKQRh+J9mGgk+X2UzI9WfopiiKVQeCKkAWJ3lWcb+bVmXNIdp1bEP3OXipvs\/tL3zjE9uQPjSk8R9HILrAHOTsOezWgu8Mlz688ghTMRQD18cOTtWzbF+hmb5n+G7+6L7epUwIDAQABo1MwUTAdBgNVHQ4EFgQUMXvvF4CDHoAGzjNB6+1w913MUcswHwYDVR0jBBgwFoAUMXvvF4CDHoAGzjNB6+1w913MUcswDwYDVR0TAQH\/BAUwAwEB\/zANBgkqhkiG9w0BAQsFAAOCAQEAnyjza5YUEyW36OSIOzCQAt9WmmUVnoth0RlV6i7dgRpRomuY4qSMVrs8VpLWOM6LCoGl3x9looVIdlzD2\/qe\/stzz7Ju5TqD\/OH6j088GcJpU8s4iP\/hU3ibju0cXOCdDK0WxZ6C5IqymFLYqCVuO1sJLDiKKmwQrhCrUXhDPdFeh9K9BbrpTxIJl+WynxTfbdXa1LtgN\/ORFl2GRxqTRGpC\/Z\/9+nBK3kP1N9i+8WLD6Wr5dRBYTmTNIbBf8vB4IPgS7rdaKqvTjcoaEiVrGE4zGle5QUzD+6EO0fr82zRMMGrz5rOKqropb32kaAUkkkBhynCCK6LeOHaJ9mBncw=="]},{"sourceDir":"\/system\/app\/meizu\/meizu.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.meizu.flyme.openidsdk","label":"openidsdk","versionName":"1.0","uid":10058,"versionCode":1,"flags":818462277,"pkg":"com.meizu.flyme.openidsdk","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/overlay\/framework-res__auto_generated_rro_product.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/android.auto_generated_rro_product__","label":"android.auto_generated_rro_product__","versionName":"1.0","uid":10006,"versionCode":1,"flags":143179333,"pkg":"android.auto_generated_rro_product__","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/app\/Bluetooth\/Bluetooth.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user_de\/0\/com.android.bluetooth","label":"蓝牙","versionName":"12","uid":1002,"versionCode":31,"flags":818462277,"pkg":"com.android.bluetooth","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/app\/WallpaperPicker\/WallpaperPicker.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.wallpaperpicker","label":"com.android.wallpaperpicker","versionName":"1.0","uid":10075,"versionCode":1,"flags":814267973,"pkg":"com.android.wallpaperpicker","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/system\/priv-app\/ContactsProvider\/ContactsProvider.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.providers.contacts","label":"联系人存储","versionName":"12","uid":10017,"versionCode":31,"flags":814235205,"pkg":"com.android.providers.contacts","firstInstallTime":1230768000000,"sign":["MIID9jCCAt6gAwIBAgITZ18uqmkHa2xlfO9Q519TQ92c9zANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMCAXDTIzMDIyMTA0MDAzNFoYDzIwNTAwNzA5MDQwMDM0WjCBiTELMAkGA1UEBhMCQ04xDjAMBgNVBAgMBUh1YmVpMRMwEQYDVQQHDApXdWhhbiBWaWV3MQwwCgYDVQQKDANEUkgxEDAOBgNVBAsMB1dpbGx6ZW4xEDAOBgNVBAMMB1dpbGx6ZW4xIzAhBgkqhkiG9w0BCQEWFG0xMzUzNTYzMDg1NkAxNjMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3UmDNoXsR\/SZ1X6QbhmwXTTCELkLKu02rAgj+p2c16eWk96nILZq3OQXxXffG5HK7T9N7pGYK0dIfdxDFI2SWUIekqJ67a3\/NRXZnCF\/QuXh6HfbSFT\/U9d+liJRU6+Lms21YL0WI+WdQ3VGnvtB5uFEmpg\/8kxOBLfphVbT730aU7\/5CDv0ZH3n\/XV8yIZ4gwVyCFu5izvJxckwfdKQRh+J9mGgk+X2UzI9WfopiiKVQeCKkAWJ3lWcb+bVmXNIdp1bEP3OXipvs\/tL3zjE9uQPjSk8R9HILrAHOTsOezWgu8Mlz688ghTMRQD18cOTtWzbF+hmb5n+G7+6L7epUwIDAQABo1MwUTAdBgNVHQ4EFgQUMXvvF4CDHoAGzjNB6+1w913MUcswHwYDVR0jBBgwFoAUMXvvF4CDHoAGzjNB6+1w913MUcswDwYDVR0TAQH\/BAUwAwEB\/zANBgkqhkiG9w0BAQsFAAOCAQEAnyjza5YUEyW36OSIOzCQAt9WmmUVnoth0RlV6i7dgRpRomuY4qSMVrs8VpLWOM6LCoGl3x9looVIdlzD2\/qe\/stzz7Ju5TqD\/OH6j088GcJpU8s4iP\/hU3ibju0cXOCdDK0WxZ6C5IqymFLYqCVuO1sJLDiKKmwQrhCrUXhDPdFeh9K9BbrpTxIJl+WynxTfbdXa1LtgN\/ORFl2GRxqTRGpC\/Z\/9+nBK3kP1N9i+8WLD6Wr5dRBYTmTNIbBf8vB4IPgS7rdaKqvTjcoaEiVrGE4zGle5QUzD+6EO0fr82zRMMGrz5rOKqropb32kaAUkkkBhynCCK6LeOHaJ9mBncw=="]},{"sourceDir":"\/system\/app\/PlatformCaptivePortalLogin\/PlatformCaptivePortalLogin.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.captiveportallogin","label":"CaptivePortalLogin","versionName":"s_aml_319999900","uid":10044,"versionCode":319999900,"flags":952680005,"pkg":"com.android.captiveportallogin","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUa+q17s\/If5sluSnBG+FXu3i3tXkwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKiLf9ELF84s+6CDvi+4CHshFAUt+IcvnHo1qGvYD9Jycr\/fQxrk\/BWXvliHqS8WsD95W\/J7hxph0xnvA4w+4cN7JH2gmBN78i3U1jyVWFOr5EaQ\/s4FsGHwhodGYGgJcieV8rg8VmccrBRolRAmkXdgDXyd8Qmi9lXzhUsLTrcn1AlupmNCyeCYDVI+bijDHqDQ5e+EXQb7fTstyHettYXKeS9uhUwkMzzwTeVASkevEdJqCmSwtL4FHHzTMPzYVMaPTG7G1ThUk6CGxe4F1wnoC\/pTaKIKc7mo8Qn8gO78OVqPue\/S4HuzP9I4gbXr3+VtLul3Ognl7E9MJi1Pg\/cCAwEAAaNTMFEwHQYDVR0OBBYEFAlOeySFEHL6zlSeJF0KxAS5yMIlMB8GA1UdIwQYMBaAFAlOeySFEHL6zlSeJF0KxAS5yMIlMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHXuSIdicOisw4l1pvYVqaRIgGtGzeGFjS\/VTsNVkoRw635Q\/6Axvw+wXxkCHf40ynqLNpC7CPpQsv2+78No8Px4kQh7J1m\/eV1rLYRQYt8E\/txdZZbGII9QF6czxnxE\/0ahjBeIjtf74mvbFzSdZoPPS0eMfBxvYK+spiRKszAI1J6R2Zs3L5L2tumQwGU7VQWxIs1\/E4rpbFmpVj6Z\/NQ9zETvOZk1JqrRhwVKgzpwTFdmoiCSNWQ4MJzO7a8TC3oFhjLw58eT9vGI95ngnFjxs8uVvlwAY3B8gLx\/H571srMvPFZxCYNDJ\/sYTeKL\/e4mvYqAbbLv46MZcWncb5E="]},{"sourceDir":"\/product\/overlay\/NavigationBarModeGesturalNarrowBack\/NavigationBarModeGesturalOverlayNarrowBack.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/com.android.internal.systemui.navbar.gestural_narrow_back","label":"Gestural Navigation Bar","versionName":"1.0","uid":10003,"versionCode":1,"flags":814267969,"pkg":"com.android.internal.systemui.navbar.gestural_narrow_back","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]},{"sourceDir":"\/vendor\/overlay\/framework-res__auto_generated_rro_vendor.apk","lastUpdateTime":1230768000000,"dataDir":"\/data\/user\/0\/android.auto_generated_rro_vendor__","label":"android.auto_generated_rro_vendor__","versionName":"1.0","uid":10013,"versionCode":1,"flags":143179333,"pkg":"android.auto_generated_rro_vendor__","firstInstallTime":1230768000000,"sign":["MIID9zCCAt+gAwIBAgIUK+IjeahHxVhRv9ikMJXjlhPCzgIwDQYJKoZIhvcNAQELBQAwgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTAgFw0yMzAyMjEwNDAwMzRaGA8yMDUwMDcwOTA0MDAzNFowgYkxCzAJBgNVBAYTAkNOMQ4wDAYDVQQIDAVIdWJlaTETMBEGA1UEBwwKV3VoYW4gVmlldzEMMAoGA1UECgwDRFJIMRAwDgYDVQQLDAdXaWxsemVuMRAwDgYDVQQDDAdXaWxsemVuMSMwIQYJKoZIhvcNAQkBFhRtMTM1MzU2MzA4NTZAMTYzLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANfJaRGBpYdZw\/YCAS7eMsewb\/rRKziyH7kG6F7H+Aermt7X+mtstVpE7bFg9C+gpTW0RYQo1TThse\/tiOObLLb4jSpvckqrIUnRA43ZVNPYasM3v7Qdf3YxlirHMDtmT+EqmN9iQftZqZK76Nvx005hAxAjywTL9ZJLZjHsKnsJsi1h7+23tcyjuzq4pcpykcSPKUsQMKg8+eqnNKJwxid0c3R08w6paRuhlsgdkstqgGvqjWUYdkWLF6ri3E2VlbCd2kS25p6Vj47dkR6jlnPCxObsMr9ghrRleIvHD6nVL72OlIG4eoE2rUMZQOg5zUWIE640YCGquMKWizlHQ0MCAwEAAaNTMFEwHQYDVR0OBBYEFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMB8GA1UdIwQYMBaAFFxBIOVOdPD6Ijh7g6ZgMiEQmwvrMA8GA1UdEwEB\/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADRmjDc1SMxrl7vZVyEKd7zaEoExjvoYHw4sah3sgnkqpkRVdaX98CxbU2u+lEbgmxT8CbrLgR+EaaJpJbLchqlRlKDku1aJ1gXQxQ1btG\/HEJWpReLRjBOzaRn65aGv4VC+CjBe1HT7NZszqQnWk\/4dXBoiukV3r1FG7MwJLi+rcfl9LFyUR5v2073MkhMhrlZdvK1U4VJc\/SZM6VG\/uEUdjB1cv1b6\/DyNYFsiWIWjR6bQ9wmx1fot+v6oOBVOxIeCtQkXftDlQ+EoIP16zX42\/6rb5a3GH24X02Fgv1USwqWtl44dYwkBJqp1E9lfhigiWRBXx9iN0VPvetkl5ZQ="]}],"cpuinfos":[{"name":"cpu7","freq":2256000,"maxfreq":2256000,"minfreq":408000,"availfreq":"408000 600000 816000 1008000 1200000 1416000 1608000 1800000 2016000 2208000 2256000"},{"name":"cpu5","freq":2256000,"maxfreq":2256000,"minfreq":408000,"availfreq":"408000 600000 816000 1008000 1200000 1416000 1608000 1800000 2016000 2208000 2256000"},{"name":"cpu3","freq":1800000,"maxfreq":1800000,"minfreq":408000,"availfreq":"408000 600000 816000 1008000 1200000 1416000 1608000 1800000"},{"name":"cpu1","freq":1800000,"maxfreq":1800000,"minfreq":408000,"availfreq":"408000 600000 816000 1008000 1200000 1416000 1608000 1800000"},{"name":"cpu6","freq":2256000,"maxfreq":2256000,"minfreq":408000,"availfreq":"408000 600000 816000 1008000 1200000 1416000 1608000 1800000 2016000 2208000 2256000"},{"name":"cpu4","freq":2256000,"maxfreq":2256000,"minfreq":408000,"availfreq":"408000 600000 816000 1008000 1200000 1416000 1608000 1800000 2016000 2208000 2256000"},{"name":"cpu2","freq":1800000,"maxfreq":1800000,"minfreq":408000,"availfreq":"408000 600000 816000 1008000 1200000 1416000 1608000 1800000"},{"name":"cpu0","freq":1800000,"maxfreq":1800000,"minfreq":408000,"availfreq":"408000 600000 816000 1008000 1200000 1416000 1608000 1800000"}],"deviceId":"45FD932B5AA3258996AAEEB2BE80B2A8AE8FC86AFC0665B91621689D66063402","sysinfo":{"disksize":"250903556096","datadiskid":"FFFFFFFF87C3AC93","rootdiskid":"FFFFFFFF99760650","memorysize":"12873699328","hostver":"#115 SMP PREEMPT Mon Jun 17 00:43:31 GMT 1985","hostrel":"5.10.115","hostmachine":"aarch64"},"telinfo":{"oaid":"d75631e409cd2c63b1c00159f49a1a9ea7a80d3eab3f1ce5e8236c4b7fa040e9"},"serviceList":"Found 216 services:\n0\tDockObserver: []\n1\tSurfaceFlinger: [android.ui.ISurfaceComposer]\n2\taccessibility: [android.view.accessibility.IAccessibilityManager]\n3\taccount: [android.accounts.IAccountManager]\n4\tactivity: [android.app.IActivityManager]\n5\tactivity_task: [android.app.IActivityTaskManager]\n6\tadb: []\n7\talarm: [android.app.IAlarmManager]\n8\tandroid.frameworks.stats.IStats\/default: [android.frameworks.stats.IStats]\n9\tandroid.hardware.light.ILights\/default: []\n10\tandroid.hardware.power.IPower\/default: []\n11\tandroid.security.apc: [android.security.apc.IProtectedConfirmation]\n12\tandroid.security.authorization: []\n13\tandroid.security.compat: []\n14\tandroid.security.identity: [android.security.identity.ICredentialStoreFactory]\n15\tandroid.security.legacykeystore: [android.security.legacykeystore.ILegacyKeystore]\n16\tandroid.security.maintenance: [android.security.maintenance.IKeystoreMaintenance]\n17\tandroid.security.metrics: []\n18\tandroid.service.gatekeeper.IGateKeeperService: [android.service.gatekeeper.IGateKeeperService]\n19\tandroid.system.keystore2.IKeystoreService\/default: [android.system.keystore2.IKeystoreService]\n20\tapp_binding: []\n21\tapp_hibernation: []\n22\tapp_integrity: []\n23\tapp_search: [android.app.appsearch.aidl.IAppSearchManager]\n24\tappops: [com.android.internal.app.IAppOpsService]\n25\tappwidget: [com.android.internal.appwidget.IAppWidgetService]\n26\taudio: [android.media.IAudioService]\n27\tauth: [android.hardware.biometrics.IAuthService]\n28\tautofill: [android.view.autofill.IAutoFillManager]\n29\tbackup: [android.app.backup.IBackupManager]\n30\tbattery: []\n31\tbatteryproperties: [android.os.IBatteryPropertiesRegistrar]\n32\tbatterystats: [com.android.internal.app.IBatteryStats]\n33\tbinder_calls_stats: []\n34\tbiometric: [android.hardware.biometrics.IBiometricService]\n35\tblob_store: [android.app.blob.IBlobStoreManager]\n36\tbluetooth_manager: [android.bluetooth.IBluetoothManager]\n37\tbugreport: [android.os.IDumpstate]\n38\tcacheinfo: []\n39\tcarrier_config: [com.android.internal.telephony.ICarrierConfigLoader]\n40\tclipboard: [android.content.IClipboard]\n41\tcolor_display: []\n42\tcompaniondevice: [android.companion.ICompanionDeviceManager]\n43\tconnectivity: [android.net.IConnectivityManager]\n44\tconnmetrics: [android.net.IIpConnectivityMetrics]\n45\tconsumer_ir: [android.hardware.IConsumerIrService]\n46\tcontent: [android.content.IContentService]\n47\tcountry_detector: [android.location.ICountryDetector]\n48\tcpuinfo: []\n49\tcrossprofileapps: [android.content.pm.ICrossProfileApps]\n50\tdataloader_manager: []\n51\tdbinfo: []\n52\tdevcfg: [android.hardware.IDevcfgService]\n53\tdevice_config: []\n54\tdevice_identifiers: [android.os.IDeviceIdentifiersPolicyService]\n55\tdevice_policy: [android.app.admin.IDevicePolicyManager]\n56\tdevice_state: [android.hardware.devicestate.IDeviceStateManager]\n57\tdeviceidle: [android.os.IDeviceIdleController]\n58\tdevicestoragemonitor: []\n59\tdiskstats: []\n60\tdisplay: [android.hardware.display.IDisplayManager]\n61\tdnsresolver: []\n62\tdomain_verification: [android.content.pm.verify.domain.IDomainVerificationManager]\n63\tdreams: [android.service.dreams.IDreamManager]\n64\tdrm.drmManager: [drm.IDrmManagerService]\n65\tdropbox: [com.android.internal.os.IDropBoxManagerService]\n66\tdynamic_system: []\n67\temergency_affordance: []\n68\tethernet: [android.net.IEthernetManager]\n69\texternal_vibrator_service: []\n70\tfile_integrity: [android.security.IFileIntegrityService]\n71\tfingerprint: [android.hardware.fingerprint.IFingerprintService]\n72\tfont: [com.android.internal.graphics.fonts.IFontManager]\n73\tgame: [android.app.IGameManagerService]\n74\tgfxinfo: []\n75\tgpu: [android.graphicsenv.IGpuService]\n76\tgraphicsstats: [android.view.IGraphicsStats]\n77\thardware_properties: [android.os.IHardwarePropertiesManager]\n78\timms: [com.android.internal.telephony.IMms]\n79\tincident: []\n80\tincidentcompanion: []\n81\tincremental: []\n82\tinput: [android.hardware.input.IInputManager]\n83\tinput_method: [com.android.internal.view.IInputMethodManager]\n84\tinputflinger: []\n85\tinstalld: []\n86\tions: [com.android.internal.telephony.IOns]\n87\tiphonesubinfo: [com.android.internal.telephony.IPhoneSubInfo]\n88\tipsec: [android.net.IIpSecService]\n89\tisms: [com.android.internal.telephony.ISms]\n90\tisub: [com.android.internal.telephony.ISub]\n91\tjobscheduler: [android.app.job.IJobScheduler]\n92\tlauncherapps: [android.content.pm.ILauncherApps]\n93\tlegacy_permission: [android.permission.ILegacyPermissionManager]\n94\tlgctrl: [com.huang.service.ILGCtrl]\n95\tlgimecore: [com.huang.task.ILGIme]\n96\tlgtask: []\n97\tlights: [android.hardware.lights.ILightsManager]\n98\tlocation: [android.location.ILocationManager]\n99\tlocation_time_zone_manager: []\n100\tlock_settings: [com.android.internal.widget.ILockSettings]\n101\tlooper_stats: []\n102\tmanager: []\n103\tmedia.audio_flinger: [android.media.IAudioFlingerService]\n104\tmedia.audio_policy: [android.media.IAudioPolicyService]\n105\tmedia.camera: [android.hardware.ICameraService]\n106\tmedia.camera.proxy: []\n107\tmedia.extractor: [android.IMediaExtractorService]\n108\tmedia.metrics: [android.media.IMediaMetricsService]\n109\tmedia.player: [android.media.IMediaPlayerService]\n110\tmedia.resource_manager: [android.media.IResourceManagerService]\n111\tmedia.resource_observer: [android.media.IResourceObserverService]\n112\tmedia_communication: [android.media.IMediaCommunicationService]\n113\tmedia_metrics: [android.media.metrics.IMediaMetricsManager]\n114\tmedia_projection: [android.media.projection.IMediaProjectionManager]\n115\tmedia_resource_monitor: [android.media.IMediaResourceMonitor]\n116\tmedia_router: [android.media.IMediaRouterService]\n117\tmedia_session: [android.media.session.ISessionManager]\n118\tmeminfo: []\n119\tmemtrack.proxy: [android.hardware.memtrack.IMemtrack]\n120\tmount: [android.os.storage.IStorageManager]\n121\tnetd: []\n122\tnetd_listener: []\n123\tnetpolicy: [android.net.INetworkPolicyManager]\n124\tnetstats: [android.net.INetworkStatsService]\n125\tnetwork_management: [android.os.INetworkManagementService]\n126\tnetwork_score: []\n127\tnetwork_stack: []\n128\tnetwork_time_update_service: []\n129\tnetwork_watchlist: []\n130\tnotification: [android.app.INotificationManager]\n131\totadexopt: []\n132\toverlay: []\n133\tpac_proxy: [android.net.IPacProxyManager]\n134\tpackage: [android.content.pm.IPackageManager]\n135\tpackage_native: [android.content.pm.IPackageManagerNative]\n136\tpeople: [android.app.people.IPeopleManager]\n137\tperformance_hint: [android.os.IHintManager]\n138\tpermission: [android.os.IPermissionController]\n139\tpermission_checker: [android.permission.IPermissionChecker]\n140\tpermissionmgr: [android.permission.IPermissionManager]\n141\tphone: [com.android.internal.telephony.ITelephony]\n142\tpinner: []\n143\tplatform_compat: [com.android.internal.compat.IPlatformCompat]\n144\tplatform_compat_native: [com.android.internal.compat.IPlatformCompatNative]\n145\tpower: [android.os.IPowerManager]\n146\tpowerstats: []\n147\tprint: [android.print.IPrintManager]\n148\tprocessinfo: []\n149\tprocstats: [com.android.internal.app.procstats.IProcessStats]\n150\treboot_readiness: [android.scheduling.IRebootReadinessManager]\n151\trecovery: []\n152\trestrictions: [android.content.IRestrictionsManager]\n153\trole: [android.app.role.IRoleManager]\n154\trollback: [android.content.rollback.IRollbackManager]\n155\truntime: []\n156\tscheduling_policy: []\n157\tsearch: [android.app.ISearchManager]\n158\tsearch_ui: [android.app.search.ISearchUiManager]\n159\tsec_key_att_app_id_provider: [android.security.keymaster.IKeyAttestationApplicationIdProvider]\n160\tsecure_element: []\n161\tsensor_privacy: [android.hardware.ISensorPrivacyManager]\n162\tsensorservice: [android.gui.SensorServer]\n163\tserial: []\n164\tservicediscovery: [android.net.nsd.INsdManager]\n165\tsettings: []\n166\tshortcut: [android.content.pm.IShortcutService]\n167\tsimphonebook: [com.android.internal.telephony.IIccPhoneBook]\n168\tslice: [android.app.slice.ISliceManager]\n169\tsmartspace: [android.app.smartspace.ISmartspaceManager]\n170\tsoundtrigger: [com.android.internal.app.ISoundTriggerService]\n171\tsoundtrigger_middleware: []\n172\tspeech_recognition: [android.speech.IRecognitionServiceManager]\n173\tstats: []\n174\tstatscompanion: []\n175\tstatsmanager: []\n176\tstatusbar: [com.android.internal.statusbar.IStatusBarService]\n177\tstoraged: []\n178\tstoraged_pri: []\n179\tstoragestats: [android.app.usage.IStorageStatsManager]\n180\tsuspend_control: []\n181\tsuspend_control_internal: []\n182\tsystem_config: []\n183\tsystem_server_dumper: []\n184\tsystem_update: []\n185\ttelecom: [com.android.internal.telecom.ITelecomService]\n186\ttelephony.registry: [com.android.internal.telephony.ITelephonyRegistry]\n187\ttelephony_ims: [android.telephony.ims.aidl.IImsRcsController]\n188\ttestharness: []\n189\ttethering: [android.net.ITetheringConnector]\n190\ttextclassification: [android.service.textclassifier.ITextClassifierService]\n191\ttextservices: [com.android.internal.textservice.ITextServicesManager]\n192\ttexttospeech: [android.speech.tts.ITextToSpeechManager]\n193\tthermalservice: [android.os.IThermalService]\n194\ttime_detector: [android.app.timedetector.ITimeDetectorService]\n195\ttime_zone_detector: [android.app.timezonedetector.ITimeZoneDetectorService]\n196\ttracing.proxy: []\n197\ttrust: [android.app.trust.ITrustManager]\n198\tuimode: [android.app.IUiModeManager]\n199\tupdatelock: []\n200\turi_grants: [android.app.IUriGrantsManager]\n201\tusagestats: [android.app.usage.IUsageStatsManager]\n202\tusb: [android.hardware.usb.IUsbManager]\n203\tuser: [android.os.IUserManager]\n204\tvcn_management: [android.net.vcn.IVcnManagementService]\n205\tvibrator_manager: [android.os.IVibratorManagerService]\n206\tvoiceinteraction: [com.android.internal.app.IVoiceInteractionManagerService]\n207\tvold: []\n208\tvpn_management: [android.net.IVpnManager]\n209\twallpaper: [android.app.IWallpaperManager]\n210\twebviewupdate: [android.webkit.IWebViewUpdateService]\n211\twifi: [android.net.wifi.IWifiManager]\n212\twifinl80211: []\n213\twifip2p: [android.net.wifi.p2p.IWifiP2pManager]\n214\twifiscanner: []\n215\twindow: []\n","featuresex":"[{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.sensor.proximity\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.sensor.accelerometer\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.controls\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.faketouch\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"com.google.android.feature.D2D_CABLE_MIGRATION_FEATURE\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.usb.accessory\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.telephony.cdma\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.backup\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.touchscreen\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.touchscreen.multitouch\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.print\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.activities_on_secondary_displays\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.voice_recognizers\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.picture_in_picture\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.fingerprint\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.sensor.gyroscope\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":132449025,\"name\":\"android.software.vulkan.deqp.level\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.cant_save_state\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.security.model.compatible\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.opengles.aep\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.bluetooth\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.camera.autofocus\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"com.google.android.feature.GOOGLE_BUILD\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.telephony.gsm\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.telephony.ims\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":2,\"name\":\"android.software.incremental_delivery\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.usb.host\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.audio.output\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.camera.flash\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.camera.front\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.screen.portrait\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.home_screen\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.microphone\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.autofill\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.bluetooth_le\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.sensor.compass\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.app_widgets\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.input_methods\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.sensor.light\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":4198400,\"name\":\"android.hardware.vulkan.version\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.companion_device_setup\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.device_admin\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.wifi.passpoint\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.camera\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.screen.landscape\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.ram.normal\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.managed_users\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.webview\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.camera.any\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.vulkan.compute\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.connectionservice\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.touchscreen.multitouch.distinct\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.location.network\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.cts\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.app_enumeration\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"com.google.android.apps.dialer.SUPPORTED\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.wifi.direct\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"com.google.android.feature.GOOGLE_EXPERIENCE\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.ipsec_tunnels\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"com.google.android.feature.EXCHANGE_6_2\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.location.gps\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.wifi\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.location\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":1,\"name\":\"android.hardware.vulkan.level\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.software.secure_lock_screen\"},{\"flags\":0,\"reqGlEsVersion\":0,\"version\":0,\"name\":\"android.hardware.telephony\"},{\"flags\":0,\"reqGlEsVersion\":196610,\"version\":0}]","librarys":"library:android.ext.shared\nlibrary:android.hidl.base-V1.0-java\nlibrary:android.hidl.manager-V1.0-java\nlibrary:android.net.ipsec.ike\nlibrary:android.test.base\nlibrary:android.test.mock\nlibrary:android.test.runner\nlibrary:com.android.cts.ctsshim.shared_library\nlibrary:com.android.future.usb.accessory\nlibrary:com.android.location.provider\nlibrary:com.android.media.remotedisplay\nlibrary:com.android.mediadrm.signer\nlibrary:com.google.android.dialer.support\nlibrary:com.google.android.gms\nlibrary:javax.obex\nlibrary:libOpenCL.so\nlibrary:org.apache.http.legacy\n","allcellinfo":["{\"type\":\"LTE\",\"mcc\":460,\"mnc\":1,\"tac\":7131,\"ci\":53071}","{\"type\":\"LTE\",\"mcc\":460,\"mnc\":1,\"tac\":28952,\"ci\":25295898}","{\"type\":\"LTE\",\"mcc\":460,\"mnc\":1,\"tac\":57627,\"ci\":144313275}","{\"type\":\"LTE\",\"mcc\":460,\"mnc\":1,\"tac\":57627,\"ci\":144328848}","{\"type\":\"LTE\",\"mcc\":460,\"mnc\":1,\"tac\":57627,\"ci\":144313278}","{\"type\":\"LTE\",\"mcc\":460,\"mnc\":1,\"tac\":7131,\"ci\":53071}"]}'
postman请求示例：
url http://192.168.30.2:10008/modifydev
post请求体中的
x-www-form-urlencoded
传参带上三个参数
cmd custom dev_data
```

python请求示例:

```
s_arr = {}
s_arr['dev_data'] = dev_data
s_arr['custom'] = custom
encoded_text = parse.urlencode(s_arr)
url =  "http://192.168.30.2:10008/modifydev?cmd=15&{encoded_text}"
```

设备具体信息是导出的真机信息数据通过抓包工具抓取的真机数据
自定义设备机型信息 自定义设备信息支持用户从真机提却数据后 导入到云手机 还可以指定相关指纹信息 重要提示:该接口请慎重使用 如果传入的数据异常 可能会导致系统无法开机 真机提取工具版本2 下载地址: https://gitee.com/zwj5151/myt_tools/raw/master/myt_dev_tools_v2.zip 该版本增加权限提权工具需要配置pc端使用,能够获取更多的真机参数
百度网盘下载地址: https://pan.baidu.com/s/1TQLQOuJEXLiQRajEX4huyg?pwd=lqs8 流程: 1 在要提取的真机上安装工具 获取数据下载地址 2 将真机数据通过该接口 传入指定的云机

```
**返回示例**:

json
成功
{
    "code": 200,
    "msg": "ok"
}
{
    "code":202,
    "reason":"失败原因"
}
```

### 16. 获取剪贴板内容

**接口说明**: 获取设备剪贴板内容

**请求 URL**: `http://{ip}:{port}/clipboard`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明 |
| ------ | ---- | ------ | ---- |
| ip     | 是   | string | ip   |
| port   | 是   | string | port |

**请求示例**:

```
GET http://192.168.30.2:10008/clipboard
```

**返回示例**:

```json
成功
{
    "code": 200,
    "msg": "query success",
    "data": {
        "text": ""
    }
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{
    "code":201,
    "error":"异常原因"
}
```

### 17. 设置剪贴板内容

**接口说明**: 设置设备剪贴板内容

**请求 URL**: `http://{ip}:{port}/clipboard`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明                    |
| ------ | ---- | ------ | ----------------------- |
| cmd    | 是   | int    | 固定值：2               |
| text   | 是   | string | 要设置的文本内容url编码 |

**请求示例**:

```
GET http://192.168.30.2:10008/clipboard?cmd=2&text=text
python请求示例 url编码方式python举例
s_arr = {}
s_arr['text'] = text
encoded_text = parse.urlencode(s_arr)
url = "http://192.168.30.2:10008/clipboard?cmd=2&{encoded_text}"
response = urllib.request.urlopen(url, timeout = 15)
```

**返回示例**:

```json
成功:
{
    "code": 200,
    "msg": "OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败:
{
    "code":201,
    "error":"异常原因"
}
```

### 18. 查询S5代理状态

**接口说明**: 查询S5代理连接状态

**请求 URL**: `http://{ip}:{port}/proxy`

**请求方式**: GET

**请求参数**: 无

**返回参数**:

| 参数名          | 类型   | 说明         |
| --------------- | ------ | ------------ |
| code            | int    | 状态码       |
| data            | object | 返回数据对象 |
| data.status     | string | 查询结果     |
| data.statusText | string | 提示信息     |
| data.addr       | string | 代理地址     |
| data.type       | int    | 代理类型     |

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

### 19. 设置S5代理

**接口说明**: 设置S5代理连接信息

**请求 URL**: `http://{ip}:{port}/proxy?cmd=2`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明                               |
| ------ | ---- | ------ | ---------------------------------- |
| cmd    | 是   | int    | 固定值：2                          |
| ip     | 是   | string | s5服务器地址                       |
| port   | 是   | int    | s5服务器端口                       |
| usr    | 是   | string | s5用户名                           |
| pwd    | 是   | string | s5密码                             |
| type   | 否   | int    | s5域名模式(0:不启用 1:启用 2:默认) |

**返回参数**:

| 参数名 | 类型   | 说明     |
| ------ | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 返回消息 |

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

### 20. 停止S5代理

**接口说明**: 停止S5代理连接

**请求 URL**: `http://{ip}:{port}/proxy?cmd=3`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明      |
| ------ | ---- | ---- | --------- |
| cmd    | 是   | int  | 固定值：3 |

**返回参数**:

| 参数名 | 类型   | 说明     |
| ------ | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 返回消息 |

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

### 21. 设置S5域名过滤

**接口说明**: 设置S5代理的域名过滤规则

**请求 URL**: `http://{ip}:{port}/proxy?cmd=4`

**请求方式**: POST

**请求参数**:

| 参数名 | 必选 | 类型 | 说明      |
| ------ | ---- | ---- | --------- |
| cmd    | 是   | int  | 固定值：4 |

**请求体**: 

```
body
[
    "qq.com",
    "baidu.com"
]
```

**返回参数**:

| 参数名 | 类型   | 说明     |
| ------ | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 返回消息 |

**请求示例**:

```
POST http://192.168.30.2:10008/proxy?cmd=4
[
    "qq.com",
    "baidu.com"
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

### 22. 设置运动传感器灵敏度

**接口说明**: 设置设备运动传感器的灵敏度

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=17`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型  | 说明                 |
| ------ | ---- | ----- | -------------------- |
| cmd    | 是   | int   | 固定值：17           |
| scale  | 是   | float | 灵敏度系数(0.1-10.0) |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=17&scale=1.5
```

**返回示例**:

```json
成功
{
    "code":200,
    "msg":"OK"
}
```

### 23. 设置摇一摇状态

**接口说明**: 设置设备摇一摇功能的状态

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=17`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型    | 说明                       |
| ------ | ---- | ------- | -------------------------- |
| cmd    | 是   | int     | 固定值：17                 |
| shake  | 是   | boolean | 是否启用摇一摇(true/false) |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=17&shake=true
```

**返回示例**:

```json
成功
{
    "code":200,
    "msg":"OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{
    "code":201,
    "error":"异常原因"
}
```

### 24. 设置应用权限

**接口说明**: 设置指定应用的权限

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=18`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明       |
| ------ | ---- | ------ | ---------- |
| cmd    | 是   | int    | 固定值：18 |
| pkg    | 是   | string | 应用包名   |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=18&pkg=com.example.app
```

**返回示例**:

```json
成功:
{
    "code":200,
    "msg":"OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{
    "code":201,
    "error":"异常原因"
}
```

### 25. 设置分辨率感知白名单

**接口说明**: 设置分辨率感知白名单

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=19`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型    | 说明                   |
| ------ | ---- | ------- | ---------------------- |
| cmd    | 是   | int     | 固定值：19             |
| pkg    | 是   | string  | 应用包名               |
| filter | 是   | boolean | 是否启用过滤true/false |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=19&pkg=com.android.mtp&filter=true
```

**返回示例**:

```json
成功:
{
    "code":200,
    "msg":"OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{
    "code":201,
    "error":"异常原因"
}

```

### 26. 更新设备信息

**接口说明**: 更新设备的基本信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=21`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明                                |
| ------ | ---- | ------ | ----------------------------------- |
| cmd    | 是   | int    | 固定值：21                          |
| data   | 是   | string | 设备信息JSON字符串传参前进行url编码 |

**data参数格式**:

```json
[
    {
        "id":0,
        "name":"PropRw",
        "description":"sim.imsi",
        "value":"12344567"
    }
]
```

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=21&data=%5B%7B%22id%22%3A0%2C%22name%22%3A%22PropRw%22%2C%22description%22%3A%22sim.imsi%22%2C%22value%22%3A%2212344567%22%7D%5D
python请求示例
s_arr = {}
s_arr['data'] = dev_data
encoded_text = parse.urlencode(s_arr)
url =  f"http://{ip}:{port}/modifydev?cmd=21&{encoded_text}"
response = urllib.request.urlopen(url, timeout = 15)
```

**返回示例**:

```json
成功
{
    "code":200,
    "msg":"OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{
    "code":201,
    "error":"异常原因"
}
```

### 27. 切换默认输入法

**接口说明**: 切换系统默认输入法

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=20`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明       |
| ------ | ---- | ------ | ---------- |
| cmd    | 是   | int    | 固定值：20 |
| imeid  | 是   | string | 输入法包名 |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=20&imeid=com.android.gmime/com.android.GmIme
```

**返回示例**:

```json
成功
{
    "code":200,
    "msg":"OK"
}
失败
{
    "code":201,
    "error":"异常原因"
}
```

### 28. 旋转摄像头

**接口说明**: 设置摄像头旋转角度和方向

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=22`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型 | 说明                      |
| ------ | ---- | ---- | ------------------------- |
| cmd    | 是   | int  | 固定值：22                |
| rot    | 是   | int  | 旋转角度(0/90/180/270)    |
| face   | 否   | int  | 前后摄像头(0:后置/1:前置) |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?cmd=22&rot=90&face=1
```

**返回示例**:

```json
成功:
{
    "code":200,
    "msg":"OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败
{
    "code":201,
    "error":"异常原因"
}

```

### 29. 发送短信

**接口说明**: 发送短信消息

**请求 URL**: `http://{ip}:{port}/sms`

**请求方式**: POST

**请求参数**:

| 参数名    | 必选 | 类型   | 说明         |
| --------- | ---- | ------ | ------------ |
| address   | 是   | string | 接收号码     |
| body      | 是   | string | 短信内容     |
| scaddress | 否   | string | 短信中心号码 |

**请求示例**:

```
POST http://192.168.30.2:10008/sms
请求头 
headers = {"Content-Type": "application/json"}
请求体 
body = {
    "address": "phone",
    "body": "content",
    "scaddress": "scaddress"
}
```

**返回示例**:

```json
成功:
{
    "code":200,
    "msg":"OK"
}
{
    "code":202,
    "reason":"失败原因"
}
失败:
{
    "code":201,
    "error":"异常原因"
}
```

### 30. 设置全球域名加速

**接口说明**: 启用或禁用全球域名加速功能

**请求 URL**: `http://{ip}:{port}/modifydev?sethost={host}`

**请求方式**: GET

**请求参数**:

| 参数名  | 必选 | 类型   | 说明     |
| ------- | ---- | ------ | -------- |
| sethost | 是   | string | 加速域名 |

**请求示例**:

```
GET http://192.168.30.2:10008/modifydev?sethost=fig.moyunteng.net
```

**返回示例**:

```json
成功
{
    "code": 200,
    "msg": "OK"
}
{
    "code":202,
    "reason":"失败原因"
}
```

### 31. 上传Google证书

**接口说明**: 上传Google服务框架证书

**请求 URL**: `http://{ip}:{port}/uploadkeybox`

**请求方式**: POST

**请求参数**:

| 参数名       | 必选 | 类型 | 说明             |
| ------------ | ---- | ---- | ---------------- |
| fileToUpload | 是   | file | 要上传的证书文件 |

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

### 32. 更新指纹信息

**接口说明**: 更新设备指纹信息

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=7&data=xx`

**请求方式**: GET

**请求参数**:

| 参数名 | 必选 | 类型   | 说明                           |
| ------ | ---- | ------ | ------------------------------ |
| cmd    | 是   | int    | 固定值：7                      |
| data   | 是   | string | 设备指纹信息JSON字符串 url编码 |

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
GET http://192.168.30.2:10008/modifydev?cmd=7&data=%7B%22lac%22%3A+%2212345%22%2C+%22cid%22%3A+%2267890%22%2C+%22lat%22%3A+%2239%22%7D
python请求示例
str_json = json.dumps(dev_info)
params = {
    "data": str_json
}
query_string = urllib.parse.urlencode(params)
url =  f"http://{ip}:{port}/modifydev?cmd=7&{query_string}"
try:
response = urllib.request.urlopen(url, timeout = 15)
```

**注意data参数需要转化为json字符串然后url编码后的字符串**
**返回示例**:

```json
成功:
{
    "code":200,
    "msg":"OK"
}
失败:
{
    "code":202,
    "reason":"错误原因"
}
```

### 33. 执行ADB命令

**接口说明**: 在设备上执行ADB命令

**请求 URL**: `http://{ip}:{port}/modifydev?cmd=6&cmdline=emulator-5554 device`

**请求方式**: GET

**请求参数**:

| 参数名  | 必选 | 类型   | 说明            |
| ------- | ---- | ------ | --------------- |
| cmd     | 是   | int    | 固定值：6       |
| cmdline | 是   | string | 要执行的ADB命令 |

**请求示例**:

```
# 获取设备属性
GET http://192.168.30.2:10008/modifydev?cmd=6&cmdline=emulator-5554 device
```

**返回示例**:

```json
成功:
{
    "code":200,
    "msg":"OK"
}
失败:
{
    "code":202,
    "reason":"错误原因"
}
```