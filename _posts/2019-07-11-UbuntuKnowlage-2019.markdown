---
layout:     post
title:      "Ubuntu 知识点"
subtitle:   " \"Ubuntu 知识点。\""
date:       2019-07-11 10:00:00
author:     "ML"
header-img: "/img/post-bg-2019.jpg"
music-id: 471385043
tags:
    - Ubuntu
---

# Ubuntu 操作知识点

## 写入环境变量PATH

* 第一种方式：直接修改$PATH值：

```bash
echo $PATH //查看当前PATH的配置路径

export PATH=$PATH:/xxx/xxx //将需配置路径加入$PATH  等号两边一定不能有空格

//配置完后可以通过第一句命令查看配置结果。

生效方法：立即生效

有效期限：临时改变，只能在当前的终端窗口中有效，当前窗口关闭后就会恢复原有的path配置

用户局限：仅对当前用户
```

* 第二种方式：通过修改.bashrc文件：(.bashrc文件在根目录下)

```bash
vi .bashrc  //编辑.bashrc文件

//在最后一行添上：

export PATH=$PATH:/xxx/xxx  ///xxx/xxx位需要加入的环境变量地址 等号两边没空格

生效方法：（有以下两种）

..关闭当前终端窗口，重新打开一个新终端窗口就能生效

..输入“source .bashrc”命令，立即生效

有效期限：永久有效

用户局限：仅对当前用户
```

* 第三种方式：通过修改profile文件：（profile文件在/etc目录下）

```bash
vi /etc/profile //编辑profile文件

//在最后一行添上：

export PATH=$PATH:/xxx/xxx

生效方法：系统重启

有效期限：永久有效

用户局限：对所有用户
```

* 第四种方式：通过修改environment文件：（environment文件在/etc目录下）

```bash
vi /etc/profile //编辑profile文件

在PATH=/·········中加入“:/xxx/xxx”

生效方法：系统重启

有效期限：永久有效

用户局限：对所有用户
```
