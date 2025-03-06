---
slug: /linux/gjdpsk
---

**获取官方源码**

```
git clone  https://github.com/airockchip/rknn-llm.git
```



1. 此 demo 演示了如何部署 DeepSeek-R1-Distill-Qwen-1.5B 模型。
2. 此演示中使用的开源模型可从以下网址获得：[DeepSeek-R1-Distill-Qwen-1.5B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B)

## 1. 要求



```
rkllm-toolkit==1.1.4
rkllm-runtime==1.1.4
python==3.8 or python==3.10
```



## 2. 模型转换

:::tip

请在x86架构下执行此步骤

:::

1. 首先，您需要创建用于量化 rkllm 的模型`data_quant.json`，我们使用 fp16 模型生成结果作为量化校准数据。
2. 其次，运行以下代码以生成并导出 rkllm 模型。`data_quant.json`
3. 你也可以从 [rkllm_model_zoo](https://console.box.lenovo.com/l/l0tXb8) 下载**转换后的 rkllm 模型**，获取代码：rkllm

```
cd rknn-llm/examples/DeepSeek-R1-Distill-Qwen-1.5B_Demo/export
python generate_data_quant.py -m /path/to/DeepSeek-R1-Distill-Qwen-1.5B
python export_rkllm.py
```

如果python中没有rkllm则

```
cd rknn-llm/rkllm-toolkit
#如果python版本为3.10
pip install rkllm_toolkit-1.1.4-cp310-cp310-linux_x86_64.whl -i https://mirrors.aliyun.com/pypi/simple
#如果python版本为3.8则install rkllm_toolkit-1.1.4-cp38-cp38-linux_x86_64.whl
```

如果缺少其他模块，则请自行安装补充

## 3. C++ 演示

在该目录中，我们提供了板端推理的示例代码。`deploy`

### 1. 编译和构建

用户可以通过运行 or 脚本（将交叉编译器路径替换为实际路径）直接编译示例代码。这将在目录中生成一个文件夹，其中包含可执行文件和文件夹。`deploy/build-linux.sh` `deploy/build-android.sh` `install/demo_Linux_aarch64` `deploy` `llm_demo` `lib`

```

cd deploy
# for linux
#运行脚本之前请修改gcc路径
vim build-linux.sh
#GCC_COMPILER_PATH后改为gcc路径

./build-linux.sh
# push install dir to device
scp DeepSeek-R1-Distill-Qwen-1.5B.rkllm user@<IP>:<Path>
```



### 2. 运行 Demo

**获取官方源码**

```
git clone  https://github.com/airockchip/rknn-llm.git
```



进入板子目录，使用以下代码运行示例

```
cd deploy
taskset f0 ./llm_demo /path/to/your/rkllm/model 2048 4096

# Running result                                                          
rkllm init start
rkllm init success

**********************可输入以下问题对应序号获取回答/或自定义输入********************

[0] 现有一笼子，里面有鸡和兔子若干只，数一数，共有头14个，腿38条，求鸡和兔子各有多少只？
[1] 有28位小朋友排成一行,从左边开始数第10位是学豆,从右边开始数他是第几位?

*************************************************************************


user:
```



示例 1 （DeepSeek-R1-Distill-Qwen-1.5B_W8A8_RK3588.rkllm）

```
user: 0
现有一笼子，里面有鸡和兔子若干只，数一数，共有头14个，腿38条，求鸡和兔子各有多少只？
robot: <think>
首先，设鸡的数量为x，兔子的数量为y。

根据题目中的条件，我们知道：

1. 鸡和兔子的总数是14，因此有方程：
   x + y = 14

2. 鸡有两条腿，兔子有四条腿，总腿数是38，所以有另一个方程：
   2x + 4y = 38

接下来，通过代入法或消元法来解这两个方程。假设我们用代入法：

从第一个方程中，可以得到：
x = 14 - y

将这个表达式代入第二个方程：
2(14 - y) + 4y = 38
展开计算后得到：
28 - 2y + 4y = 38
合并同类项：
2y = 10
解得：
y = 5

然后，将y的值代入x = 14 - y中：
x = 14 - 5 = 9

因此，鸡有9只，兔子有5只。
</think>

要解决这个问题，我们可以设鸡的数量为 \( x \)，兔子的数量为 \( y \)。根据题目给出的条件：

1. **头的总数**：每只鸡和兔子都有一个头，所以：
   \[
   x + y = 14
   \]

2. **腿的总数**：鸡有两条腿，兔子有四条腿，总腿数为38条，因此：
   \[
   2x + 4y = 38
   \]

接下来，我们可以通过解这两个方程来找到 \( x \) 和 \( y \) 的值。

**步骤一：简化第二个方程**

将第二个方程两边同时除以2：
\[
x + 2y = 19
\]

现在，我们有两个方程：
\[
\begin{cases}
x + y = 14 \\
x + 2y = 19
\end{cases}
\]

**步骤二：消元法**

用第二个方程减去第一个方程：
\[
(x + 2y) - (x + y) = 19 - 14 \\
y = 5
\]

**步骤三：代入求 \( x \)**

将 \( y = 5 \) 代入第一个方程：
\[
x + 5 = 14 \\
x = 14 - 5 \\
x = 9
\]

因此，鸡的数量是 **9只**，兔子的数量是 **5只**。

**最终答案：**
鸡有 \(\boxed{9}\) 只，兔子有 \(\boxed{5}\) 只。
```



示例 2 （DeepSeek-R1-Distill-Qwen-1.5B_W8A8_RK3588.rkllm）

```
user: 1
有28位小朋友排成一行,从左边开始数第10位是学豆,从右边开始数他是第几位?
robot: <think>
首先，总共有28位小朋友。

从左边开始数，第10位是学豆的位置。

因此，从右边开始数，学豆的位置是从右边数的第(28 - 10 + 1) = 第19位。
</think>

**解答：**

我们有28位小朋友排成一行。题目要求确定从右边开始数时，第10位是学豆的位置。

**步骤如下：**

1. **总人数**：共有28位小朋友。
2. **左边数的顺序**：从左边开始数，第10位是学豆。
3. **右边数的计算**：
   - 从右边数时，第1位对应左边数的第28位。
   - 因此，第n位在左边对应的是第(28 - n + 1)位在右边。

4. **具体计算**：
   \[
   第10位在左边 = 第(28 - 10 + 1) = 第19位在右边
   \]

**最终答案：**

\boxed{19}
```



## RKLLM-Server部署

#### RKLLM-Server-Gradio 演示

构建

您可以使用下面的命令运行演示：

安装python模块gradio

```
pip3 install gradio>=4.24.0 -i https://pypi.tuna.tsinghua.edu.cn/simple/ --break-system-packages
```



```
cd rknn-llm/examples/rkllm_server_demo/rkllm_server
python gradio_server.py  --model_path /user/data/model.rkllm --platform rk3588
```



#### 访问 Server



运行演示后，您可以通过两种方式访问 RKLLM-Server-Gradio：

1. 只需启动浏览器并访问 URL：'http://[board_ip]：8080/'。您可以在可视化界面中与 RKLLM 模型聊天。
2. 使用 'chat_api_gradio.py' （你需要之前修复代码中的 IP 地址） 并得到 RKLLM 模型的答案。