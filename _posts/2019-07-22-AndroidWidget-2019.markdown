---
layout:     post
title:      "AndroidWidget"
subtitle:   " \"Android桌面小部件开发(Widget)\""
date:       2019-07-22 14:00:00
author:     "ML"
header-img: "/img/post-bg-2019.jpg"
tags:
    - Android
---

# Android桌面小部件开发(Widget)

* 新建布局在res/layout文件夹下定义一个 布局文件 
res/layout/app_widget.xml

    ```xml
    <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:padding="@dimen/widget_margin"
                    android:background="#09C">

        <TextView
                android:id="@+id/appwidget_text"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerHorizontal="true"
                android:layout_centerVertical="true"
                android:text="@string/appwidget_text"
                android:textColor="#ffffff"
                android:textSize="24sp"
                android:textStyle="bold|italic"
                android:layout_margin="8dp"
                android:contentDescription="@string/appwidget_text"
                android:background="#09C"/>
        <ImageView
                android:id="@+id/start_stop"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:scaleType="center"
                android:src="@android:drawable/ic_delete"/>

    </RelativeLayout>
    ```
* 新建配置文档:res/xml文件夹中新建一个 appwidgetProvider的配置文件 
res/xml/desktop_widget_info.xml

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
                        android:minWidth="40dp"
                        android:minHeight="40dp"
                        android:updatePeriodMillis="86400000"
                        android:previewImage="@drawable/example_appwidget_preview"
                        android:initialLayout="@layout/desktop_widget"
                        android:resizeMode="horizontal|vertical"
                        android:widgetCategory="home_screen"
                        android:initialKeyguardLayout="@layout/desktop_widget">
    </appwidget-provider>
            <!--
                    计算size的公式: (70*n) -30  n为部件所需的大小(占几格)   当前的就是  3X1
                    minResizeWidth
                    minResizeHeight   能被调整的最小宽高，若大于minWidth minHeight 则忽略
                    label	选择部件时看到标签
                    icon	选择部件时看到图标
                    updatePeriodMillis	更新时间间隔
                    previewImage	选择部件时 展示的图像  3.0以上使用
                    initialLayout	布局文件
                    resizeMode		调整size模式,可在桌面调整大小
                    configure		如果需要在启动前先启动一个Activity进行设置，在这里给出Activity的完整类名
                    widgetCategory="keyguard|home_screen"  widget可添加的位置 锁屏界面|桌面

                    autoAdvanceViewId=@id/xx	与集合部件一起使用，指定该id所表示的集合的item自动推进
                    集合部件：3.0后才有。view：ListView、GridView、StackView、AdapterViewFilpper
                --> 
    ```

    + 参数说明

        |参数|说明|
        |---|---|
        minResizeHeight|能被调整的最小宽高，若大于minWidth minHeight 则忽略
        label|选择部件时看到标签
        icon|选择部件时看到图标
        updatePeriodMillis	|更新时间间隔
        previewImage|选择部件时 展示的图像  3.0以上使用
        initialLayout|布局文件
       resizeMode|调整size模式,可在桌面调整大小
        configure|如果需要在启动前先启动一个Activity进行设置，在这里给出Activity的完整类名
        widgetCategory="keyguard|home_screen"  |widget可添加的位置 锁屏界面|桌面
        autoAdvanceViewId=@id/xx|与集合部件一起使用，指定该id所表示的集合的item自动推进集合部件：3.0后才有。view：ListView、GridView、StackView、AdapterViewFilpper

* 新建DesktopWidget 类,继承 AppWidgetProvider

    ```java
    package com.example.test.activity

    import android.appwidget.AppWidgetManager
    import android.appwidget.AppWidgetProvider
    import android.content.Context
    import android.widget.RemoteViews
    import android.app.PendingIntent
    import android.content.Intent
    import com.example.test.R
    import com.example.test.service.TimerWidgetService
    import android.content.ComponentName
    import android.text.format.DateUtils
    import android.util.Log


    /**
    * Implementation of App Widget functionality.
    */
    class DesktopWidget : AppWidgetProvider() {
        final val TAG=DesktopWidget::class.java.simpleName
        //当Widget被添加或者被更新时会调用该方法。上边我们提到通过配置updatePeriodMillis可以定期更新Widget。但是当我们在widget的配置文件中声明了android:configure的时候，添加Widget时则不会调用onUpdate方法。
        override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
            Log.i(TAG,"onUpdate")
            super.onUpdate(context, appWidgetManager, appWidgetIds)
    //         There may be multiple widgets active, so update all of them
            for (appWidgetId in appWidgetIds) {
                updateAppWidget(context, appWidgetManager, appWidgetId)
            }
        }
        //第1次创建时调用，之后再创建不会调用
        override fun onEnabled(context: Context) {
            // Enter relevant functionality for when the first widget is created
        }
        //当最后一个部件实例 被删除时 调用  用于清除onEnabled执行的操作
        override fun onDisabled(context: Context) {
            // Enter relevant functionality for when the last widget is disabled
        }
        
        //部件从host中删除
        override fun onDeleted(context: Context?, appWidgetIds: IntArray?) {
            Log.i(TAG,"onDeleted")
            super.onDeleted(context, appWidgetIds)
        }
        override fun onReceive(context: Context?, intent: Intent?) {
            super.onReceive(context, intent)
            /*
            * * 接收 <action android:name="com.example.test.app_widget_update_time"/>
            * 在其他组件或activity或service中发送这些广播
                */
            Log.i(TAG,"onReceive $context  $intent")
            if (intent?.action.equals("com.example.test.app_widget_update_time")) {
                val time = intent?.getLongExtra("time", 0)
                context?.let {
                    time?.let { it1 -> updateWidget(it, it1) }
                }
            }
            val intent= Intent("com.example.test.app_widget_update_time").addFlags(0x01000000).putExtra("time", System.currentTimeMillis())

            context?.sendBroadcast(intent)
        }

        private fun updateWidget(context: Context, time: Long) {
            Log.i(TAG,"updateWidget")
            //RemoteViews处理异进程中的View
            val intent = Intent(context, TimerWidgetService::class.java)
            val pendingIntent = PendingIntent.getService(context, 0, intent, 0)

            val rv = RemoteViews(context.packageName, R.layout.desktop_widget)
            rv.setOnClickPendingIntent(R.id.start_stop, pendingIntent)
            println("time=$time")
            rv.setTextViewText(R.id.appwidget_text, DateUtils.formatElapsedTime(time / 1000))

            val am = AppWidgetManager.getInstance(context)
            val appWidgetIds = am.getAppWidgetIds(ComponentName(context, DesktopWidget::class.java))
            am.updateAppWidget(appWidgetIds, rv)//更新 所有实例
        }

        companion object {

            internal fun updateAppWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
                Log.i("DesktopWidget","updateAppWidget")
                val widgetText = context.getString(R.string.appwidget_text) + System.currentTimeMillis()
                // Construct the RemoteViews object
                val views = RemoteViews(context.packageName, R.layout.desktop_widget)
                views.setTextViewText(R.id.appwidget_text, widgetText)
                val intent = Intent(context, TimerWidgetService::class.java)
                val pendingIntent = PendingIntent.getService(context, 0, intent, 0)

                views.setOnClickPendingIntent(R.id.start_stop, pendingIntent)
                // Instruct the widget manager to update the widget
                appWidgetManager.updateAppWidget(appWidgetId, views)
            }
        }
    }


    ```

    + 函数说明

        |函数|说明|
        |--|--|
        |onUpdate|当Widget被添加或者被更新时会调用该方法。上边我们提到通过配置updatePeriodMillis可以定期更新Widget。但是当我们在widget的配置文件中声明了android:configure的时候，添加Widget时则不会调用onUpdate方法。 |
        | onEnabled| 第1次创建时调用，之后再创建不会调用  |
        | onDisabled|当最后一个部件实例 被删除时 调用  用于清除onEnabled执行的操作|
        | onDeleted|部件从host中删除 |
        |onReceive|接收到广播时|
* 注册,总的来说AppWidgetProvider是一个广播接收器,AppWidgetProvider类中在它的onReceiver()方法中，通过判断ACTION,可以执行相关操作

    ```xml
    <receiver android:name=".activity.DesktopWidget">
                <intent-filter>
                    <action android:name="android.appwidget.action.APPWIDGET_UPDATE"/>
                    <action android:name="com.example.test.app_widget_update_time"/>
                </intent-filter>

                <meta-data
                        android:name="android.appwidget.provider"
                        android:resource="@xml/desktop_widget_info"/>
            </receiver>
    ```

* 桌面插件只支持 RemoteView 要使用appWidgetManager 来更新的小部件.

    ```java
    RemoteView支持的控件
    FrameLayout
    LinearLayout
    RelativeLayout
    GridLayout
    AnalogClock
    Button
    Chronometer
    ImageButton
    ImageView
    ProgressBar
    TextView
    ViewFlipper
    ListView
    GridView
    StackView
    AdapterViewFlipper
    ```

## 参考

>[AppWidget的使用及原理分析](https://blog.csdn.net/a992036795/article/details/52129881)
>
>[Android列表小部件（Widget）开发详解](https://blog.csdn.net/qq_20521573/article/details/79174481)
>
>[Android Widget 小部件(一) 简单实现](https://blog.csdn.net/jjwwmlp456/article/details/38466969)
