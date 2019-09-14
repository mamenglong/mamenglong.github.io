---
layout:     post
title:      "Welcome to ML's Blog"
subtitle:   " \"All Windows Environments. \""
date:       2019-03-22 12:00:00
author:     "ML"
header-img: "/img/post-bg-2019.jpg"
tags:
    - 环境变量
---
# All Windows Environments. 

> 记录一下系统配置开发环境的环境变量，免得每次都需要网上搜索。

* java

    >安装java以后，假如安装路径 `D:\Java`，路径下有 `D:\Java\jdk1.8.0_221` 和 `D:\Java\jre1.8.0_221`
    * 新建环境变量 `JAVA_HOME`值为：`D:\Java\jdk1.8.0_221`
    * `CLASSPATH` 值为： `.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`
    * PATH 下添加 `%JAVA_HOME%\bin` 和 `%JAVA_HOME%\jre\bin`
* node js
    >下载[zip](https://nodejs.org/zh-cn/)包
    + 配置环境变量：path下添加 `D:\node-v10.16.3-win-x64`
* ruby 
    + 配置环境变量：path下添加 `D:\Ruby25-x64\bin`
* maven
    + 创建新变量 `MAVEN_HOME` 值为 `D:\JetBrains\apache-maven-3.5.2`
    + `path`下添加 `%MAVEN_HOME%\bin`
* android sdk
    + 创建新变量 `ANDROID_HOME` 值为 `D:\Android\Sdk`
    + `path` 下添加 `%ANDROID_HOME%\tools` 和 `%ANDROID_HOME%\platform-tools`

