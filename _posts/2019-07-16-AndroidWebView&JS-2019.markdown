---
layout:     post
title:      "AndroidWebView&JS"
subtitle:   " Android 与JS进行交互"
date:       2019-07-16 12:00:00
author:     "ML"
header-img: "/img/post-bg-2019.jpg"
tags:
    - Android
---
# Android 与JS进行交互

* 设置支持javascript交互

    ```java
    WebSettings wSet = webView.getSettings();
    wSet.setJavaScriptEnabled(true);
    ```
* 加载js文件
    > 可以将文件放在资源文件assert文件夹下如：a.html
使用`webView.loadUrl("file:///android_asset/a.html");`加载js文件
    > 或者使用网络文件`webView.loadUrl("http://..");`
* 设置javascriptinterface接口

    > `webView.addJavascriptInterface(new JavaScriptInterface(), "JSI");`
* JavaScriptInterface内容

    ```java
    public class JavascriptInterface{
    @JavascriptInterface
            public  String get() {
                retutn "js call android by JavascriptInterface.";
            }
    }

    ```

* a.html 内容

    ```javascript
    <script>
    function showMsgWithoutParams(){
        alert("无参函数");
    }
    function showMsg(args){
        alert("有参函数"+args);
    }
    function callAndroidMethod(){
        //js调用android方法
       if (window.JSI && window.JSI.get) {
           alert( window.JSI.get());
        }
    }
    </script>

    ```

* Android 调用js方式

    >`webview.post(() -> mBinding.webview.loadUrl("javascript:getUserVipInfo()"));`
    + 调用过程可能会出现 [A WebView method was called on thread 'JavaBridge'. All WebView methods must be called异常](https://blog.csdn.net/xiabing082/article/details/51853486)，点击链接查看解决方式：主要使用异步调用方式解决即post形式。
  
## 参考链接

* [你要的WebView与 JS 交互方式 都在这里了](https://blog.csdn.net/carson_ho/article/details/64904691)

* [Android与Js相互调用基础篇](https://www.jianshu.com/p/b649c3c241a6)
