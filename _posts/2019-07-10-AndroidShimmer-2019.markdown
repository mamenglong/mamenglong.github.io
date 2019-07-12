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

> 2019-07-12 修改实现方式，将流光效果封装到对象中，使用只需要调用对象设置paint即可。

* 接口

```kotlin
import android.graphics.Color
import android.graphics.LinearGradient
import android.graphics.Matrix
import android.graphics.Shader
import com.xjlmh.classic.view.sticker.Sticker

interface ShimmerStyle{
    fun setAnimating(boolean: Boolean=true)
    fun setLinearGradient(linearGradient: LinearGradient?=null)
    fun setGradientMatrix(matrix: Matrix?=null)
    fun setDefaultTranslate(default: Int=0)
    fun setLinearGradientColors(colors:IntArray?)
    fun setLinearGradientPositions(position:FloatArray?)
    fun initShimmerDefault(){
        println("initShimmerDefault")
        setAnimating()
        setLinearGradient()
        setGradientMatrix()
        setDefaultTranslate()
    }
}

```

* 实现类

```kotlin
import android.graphics.*
import com.xjlmh.classic.instrument.log.DebugLog

class Shimmer() : ShimmerStyle {


    private var mLinearGradient: LinearGradient? = null
    private var mGradientMatrix: Matrix? = null
    var mPaint = Paint()
    private var mViewWidth = 0
    private var isAnimating = true
    private var mTranslate = 0
    var mWidthDivideBy = 5
    val DEFAULT_COLORS = intArrayOf(0xff00ffff.toInt(), 0xffffffff.toInt(), 0xff00ffff.toInt())
    val DEFAULT_POSITIONS = floatArrayOf(0.0f, 0.5f, 1.0f)
    private var colors = DEFAULT_COLORS//intArrayOf(0xff00ffff.toInt(), 0xffffffff.toInt(), 0xff00ffff.toInt())
    private var positions = DEFAULT_POSITIONS
    private var content: String = ""


    /**
     * 构建基础数据
     */
    constructor(content: String) : this() {
        this.content = content
//        if (content.length>7)
//            setLinearGradientColors(intArrayOf(0xFF4DDA11.toInt(), 0xffffffff.toInt(), 0xFF4DDA11.toInt()))
        DebugLog.i("Shimmer", "shimmer create")
        println("shimmer create")
        val rect = Rect()
        mPaint.textSize = 60f
        mPaint.getTextBounds(content, 0, 1, rect)
        mViewWidth = mPaint.measureText(content).toInt()
    }

    /**
     * 初始化，所有配置设置好以后调用，调用以后设置关联，  LinearGradient首次实例化之后不可修改，因此采用每次修改都需实例化
     */
    fun init(){
        initShimmerDefault().apply {
            DebugLog.i("Shimmer", "initShimmerDefault")
        }
        mPaint.shader = mLinearGradient
    }

    override fun setLinearGradientColors(colors: IntArray?) {
        DebugLog.i("Shimmer", "setLinearGradientColors before:${this.colors.toList()}  ")
        var count=0
        if (colors != null) {
            this.colors=colors
//            colors.apply {
//                forEach {
//                    this@Shimmer.colors[count++] = it
//                }
//            }
        } else {
            this.colors=DEFAULT_COLORS
//            DEFAULT_COLORS.apply {
//                forEach {
//                    this@Shimmer.colors[count++] = it
//                }
//            }
        }
        DebugLog.i("Shimmer", "setLinearGradientColors  after: ${this.colors.toList()}")
    }

    override fun setLinearGradientPositions(position: FloatArray?) {
        DebugLog.i("Shimmer", "setLinearGradientPositions before:${this.positions.toList()}  ")
        if (position != null) {
            this.positions=positions
//            position.apply {
//                forEach {
//                    this@Shimmer.positions[indexOf(it)] = it
//                }
//            }
        } else {
            this.positions=DEFAULT_POSITIONS
//            DEFAULT_POSITIONS.apply {
//                forEach {
//                    this@Shimmer.positions[indexOf(it)] = it
//                }
//            }
        }
        DebugLog.i("Shimmer", "setLinearGradientPositions  after: ${this.positions.toList()}")
    }

    override fun setAnimating(b: Boolean) {
        DebugLog.i("Shimmer", "setAnimating:$b")
        isAnimating = b
    }


    override fun setLinearGradient(linearGradient: LinearGradient?) {
        DebugLog.i("Shimmer", "setLinearGradient:$linearGradient")
        mLinearGradient = linearGradient ?: LinearGradient((-mViewWidth).toFloat(), 0f, 0f, 0f,
                colors,
                positions, Shader.TileMode.CLAMP)
    }

    override fun setGradientMatrix(matrix: Matrix?) {
        DebugLog.i("Shimmer", "setGradientMatrix:$matrix")
        mGradientMatrix = matrix ?: Matrix()
    }

    override fun setDefaultTranslate(i: Int) {
        DebugLog.i("Shimmer", "setDefaultTranslate:$i")
        mTranslate = i
    }

    /**
     * 绘制函数,调用画出阴影
     */
    fun run() {
        DebugLog.i("Shimmer", "run")
        if (isAnimating && mGradientMatrix != null) {
            mTranslate += mViewWidth / mWidthDivideBy
            if (mTranslate > 2 * mViewWidth) {
                mTranslate = 0
            }
            DebugLog.i("Shimmer", "mTranslate :$mTranslate")
            mGradientMatrix!!.setTranslate(mTranslate.toFloat(), 0f)
            this.mLinearGradient?.setLocalMatrix(mGradientMatrix)
        }
        log()
    }

    /**
     * 关闭流光效果
     */
    fun stop() {
        isAnimating = false
    }
    fun log(){
        DebugLog.i("Shimmer","content:$content mViewWidth:$mViewWidth isAnimating:$isAnimating :mTranslate:$mTranslate  mWidthDivideBy:$mWidthDivideBy colors:${colors.toList()} positions:${positions.toList()}")
    }
    fun getContent()=content
}
```

* 使用

```java
  private val shimmerList = ArrayList<Shimmer>()
----------------------------------------------
   shimmerList.add(new Shimmer("你好呀！"))       ;
        shimmerList.add(new Shimmer("欢迎你哈啊阿达！"))  ;
        shimmerList.get(0).setMWidthDivideBy(10);
        shimmerList.get(1).setMWidthDivideBy(10);

        shimmerList.get(1).setLinearGradientColors(new int[]{0xFF4DDA11, 0xffffffff, 0xFF4DDA11});
        shimmerList.get(0).init();
        shimmerList.get(1).init();
----------------------------------------------
         canvas.drawText(shimmerList.get(0).getContent(), 200, 600, shimmerList.get(0).getMPaint());

```

### 扩展

* Shader知识点
    + [Paint#setShader](https://www.jianshu.com/p/6ab058329ca8)
    + [自定义控件之Shader(着色器/渲染器)](https://blog.csdn.net/asd7364645/article/details/52761204)
    + [Android中的LinearGradient](https://www.jianshu.com/p/a9d09cb7577f)
    + [Android笔记：invalidate()和postInvalidate() 的区别及使用](https://blog.csdn.net/Mars2639/article/details/6650876)
    + [Android自定义View之invalidate方法和postInvalidate方法](https://www.jianshu.com/p/f2b51180b705)
