---
layout:     post
title:      "Android 实现流光字体显示"
subtitle:   " \"Android 实现流光字体显示。\""
date:       2019-07-10 19:00:00
author:     "ML"
header-img: "/img/post-bg-2019.jpg"
music-id: 471385043
tags:
    - 编程语言
    - Android
---

* 目录
{:toc}

# Android 实现流光字体显示

<!-- ![标志图](/img/in-post/kotlin/2018325102051477.png) -->

![效果图](/img/in-post/android/shimmer-small.gif)

## 实现方式一

> 借助Facebook开源的项目[Shimmer](https://facebook.github.io/shimmer-android/)，非常方便强大的一款开源项目。

## 实现方式二

> 开源项目[Shimmer-android](https://github.com/RomainPiel/Shimmer-android),方便使用，可去参考。

## 实现方式三

> 自定义view实现，参考方式二实现方式，代码如下，重写onSizeChanged设置一些基本参数，在onDraw方法中绘制图层，通过改变Shader实现，最后通过postInvalidateDelayed方法进行重绘图层。

```java

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.LinearGradient;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Shader;
import android.util.AttributeSet;
import android.widget.TextView;

import java.util.logging.Logger;

public class Test extends TextView {
    private   Logger logger= Logger.getLogger("Test");

    private LinearGradient mLinearGradient;
    private Matrix mGradientMatrix;
    private Paint mPaint;
    private int mViewWidth = 0;
    private int mTranslate = 0;
    private boolean mAnimating = true;

    public Test(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        logger.info("onSizeChanged");
        if (mViewWidth == 0) {
            mViewWidth = getMeasuredWidth();
            if (mViewWidth > 0) {
                mPaint = getPaint();
                mLinearGradient = new LinearGradient(-mViewWidth, 0, 0, 0,
                        new int[]{0x33ffffff, 0xffffffff, 0x33ffffff},
                        new float[]{0.0f, 0.5f, 1.0f}, Shader.TileMode.CLAMP);
                mPaint.setShader(mLinearGradient);
                mGradientMatrix = new Matrix();
            }
        }
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        logger.info("onDraw");
        if (mAnimating && mGradientMatrix != null) {
        mTranslate += mViewWidth / 10;
        if (mTranslate > 2 * mViewWidth) {
            mTranslate = -mViewWidth;
        }
        mGradientMatrix.setTranslate(mTranslate, 0);
        mLinearGradient.setLocalMatrix(mGradientMatrix);
        postInvalidateDelayed(30);
    }
}

}
```

### 扩展

* Shader知识点
    + [Paint#setShader](https://www.jianshu.com/p/6ab058329ca8)
    + [自定义控件之Shader(着色器/渲染器)](https://blog.csdn.net/asd7364645/article/details/52761204)
    + [Android笔记：invalidate()和postInvalidate() 的区别及使用](https://blog.csdn.net/Mars2639/article/details/6650876)
    + [Android自定义View之invalidate方法和postInvalidate方法](https://www.jianshu.com/p/f2b51180b705)
