---
layout:     post
title:      "AndroidAccessibilityFunction"
subtitle:   " \"Android无障碍开发\""
date:       2019-07-22 12:00:00
author:     "ML"
header-img: "/img/post-bg-2019.jpg"
tags:
    - Android
---

# Android无障碍开发

>无障碍服务,可以监听界面的操作,如:点击、拖动、界面更新等信息。更为强大的是可以获取屏幕信息,同时具备普通Service的能力,由于功能强大,属于系统服务,所以需要手动开启,位置为  设置->辅助功能.代码开启方式为:`val accessibleIntent =Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);startActivity(accessibleIntent)`

## 创建服务

* 创建一个类MyAccessibilityService继承自AccessibilityService，并实现其接口方法，onAccessibilityEvent与onInterrupt。

    ```java
    package com.example.test.service

    import android.accessibilityservice.AccessibilityService
    import android.content.Intent
    import android.util.Log
    import android.view.accessibility.AccessibilityEvent
    import com.example.test.showToast
    import java.util.logging.LogManager
    import java.util.logging.Logger
    import kotlin.properties.Delegates

    class MyAccessibilityService : AccessibilityService() {
        fun logi(msg: String){
            Log.i(TAG,msg)
        }
        companion object{
        var instances:MyAccessibilityService by Delegates.notNull()
        }
        private val TAG=MyAccessibilityService::class.java.simpleName
        override fun onInterrupt() {
            Log.i(TAG,"onInterrupt")
        }

        override fun onAccessibilityEvent(p0: AccessibilityEvent?) {
            Log.i(TAG,"onAccessibilityEvent")
            when (p0?.eventType) {
                AccessibilityEvent.TYPE_VIEW_CLICKED -> {
                    Log.i(TAG,"TYPE_VIEW_CLICKED")
                }
                AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED -> {
                    val result= "${p0.packageName} \n ${p0.className}"

                //dosomething

                    showToast(result)
                    Log.i(TAG,result)
                }
                null -> {

                }
            }

        }

        override fun onUnbind(intent: Intent?): Boolean {
            Log.i(TAG,"onUnbind")
            return super.onUnbind(intent)
        }

        override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
            Log.i(TAG,"onStartCommand")

            return super.onStartCommand(intent, flags, startId)
        }

        override fun onServiceConnected() {
            super.onServiceConnected()
            Log.i(TAG,"onServiceConnected")
            instances=this
        }
    }
    ```

* 函数说明

    |方法|描述|
    |  ----  | ----  |
    |onServiceConnected()|(可选)当系统成功连接到该AccessibilityService时,将调用此方法。主要用与一次性配置或调整的代码。
    |onAccessibilityEvent()|(必要)当系统监测到相匹配的AccessibilityEvent事件时,将调用此方法,在整个Service的生命周期中,该方法将被多次调用。
    |onInterrupt()|(必要)系统需要中断AccessibilityService反馈时,将调用此方法。AccessibilityService反馈包括服务发起的震动、音频等行为。
    |onUnbind()|(可选)系统要关闭该服务是,将调用此方法。主要用来释放资源。

* 无障碍服务注册,在Manifest.xml中注册.

    ```xml
        <service
                    android:name=".service.MyAccessibilityService"
                    android:description="@string/app_name"
                    android:enabled="true"
                    android:exported="true"
                    android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE">
                <intent-filter>
                    <action android:name="android.accessibilityservice.AccessibilityService"/>
                </intent-filter>

                <meta-data
                        android:name="android.accessibilityservice"
                        android:resource="@xml/accessibility_service_config"/>
            </service>
    ```

    >android.permission.BIND_ACCESSIBILITY_SERVICE权限和action是必须的。同时AccessibilityService需要提供设置列表(meta-data),该设置也可以在运行时通过AccessibilityService.setServiceInfo(AccessibilityServiceInfo info)进行动态设置.

* 无障碍配置内容:位置/res/xml/accessibility_service_config.xml

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <accessibility-service
            xmlns:android="http://schemas.android.com/apk/res/android"
            android:description="@string/app_name"
            android:accessibilityEventTypes="typeAllMask"
            android:accessibilityFeedbackType="feedbackAllMask"
            android:notificationTimeout="100"
            android:accessibilityFlags="flagDefault"
            android:canRetrieveWindowContent="true"/>
    <!--  xmlns:android="http://schemas.android.com/apk/res/android"
            //用于描述此服务的信息,会显示在系统开启服务的设置界面
            android:description="@string/app_accessibility_description"
            //接收EventTypes的包名,多个包名用,隔开  需要辅助的app包名，不写表示所有app
            android:packageNames="com.tencent.mm,com.tencent.mobileqq"
            //可以接收的事件
            android:accessibilityEventTypes="typeAllMask"
            //字面意思:反馈类型.官方解释真的"很详细".
            android:accessibilityFeedbackType="feedbackAllMask"
            //发送2次事件的时间间隔,超过后事件作废
            android:notificationTimeout="100"
            //设置界面,在系统的启动服务界面会出现一个设置按钮,用来打开这个Activity的;
            android:settingsActivity="com.angcyo.SettingsActivity"
            //官方解释很模糊,暂且就使用缺省值吧
            android:accessibilityFlags="flagDefault"
            //表明此服务是否可以读取窗口中的内容,应该是最重要的属性了.在运行时不可修改;
            android:canRetrieveWindowContent="true"-->

    ```

* 检测是否开启了无障碍

    ```java
        //检查服务是否开启
        private fun isServiceEnabled():Boolean {
            var accessibilityManager = getSystemService(Context.ACCESSIBILITY_SERVICE) as AccessibilityManager

            val accessibilityServices = accessibilityManager.getEnabledAccessibilityServiceList(
                AccessibilityServiceInfo.FEEDBACK_ALL_MASK
            )
            for (info in accessibilityServices) {
                if (info.id.contains("com.example.test/.service.MyAccessibilityService")) {
                    return true
                }
            }
            return false
        }
    ```

## 参考

>[Android 无障碍服务](https://blog.csdn.net/lancelots/article/details/84067414)
