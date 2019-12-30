---
layout:     post
title:      "一台电脑使用github,gitee,同时满足一个平台配置多个账号"
subtitle:   " \"Hello World, Hello Blog\""
date:       2019-12-30 12:00:00
author:     "ML"
header-img: "/img/post-bg-2019.jpg"
tags:
    - git
---

# 一台电脑同时配置使用github,gitee,gitlab
> 这篇主要介绍在一台电脑同时配置github,gitee的账户,并将ssh key添加到对应平台
* 创建对于的ssh 密匙,参考[这里](2019-03-24-GitSSH-2019.markdown)
* 在本机用户名目录下找到.ssh目录,创建config文件
    > 其中Host 可以自己定义,HostName为对应平台的域名,IdentityFile为需要在对相应平台使用的ssh文件
    > 这里可以看到我的配置里有两个gitee的配置,说明时同一个平台配置了两个账户,之后克隆可以用对于的host进行

    ```config
    # gitee
    Host gitee.com
    HostName gitee.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_gitee_wind
    IdentityFile ~/.ssh/gitee_id_rsa
    # gitee
    Host mm.gitee.com
    HostName gitee.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/gitee_id_rsa
    # github
    Host github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/github_id_rsa
    ```

* 测试链接
    > 添加完毕,使用代码 ssh git@github.com 测试github的配置
    > 使用 ssh git@gitee.com 测试gitee的
    > 使用 ssh git@mm.gitee.com 测试gitee的另一个账户
    > 使用ssh下载时只需要将使用对应的git@[Host]就行

