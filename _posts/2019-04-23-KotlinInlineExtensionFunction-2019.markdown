---
layout:     post
title:      "Kotlin内联扩展函数let、with、run、apply、also函数的使用"
subtitle:   " \"Something About Kotlin内联扩展函数let、with、run、apply、also函数的使用.\""
date:       2019-04-23 19:00:00
author:     "ML"
header-img: "/img/post-bg-2019.jpg"
music-id: 471385043
tags:
    - 编程语言
    - Kotlin
---

* 目录
{:toc}

#  Kotlin内联扩展函数let、with、run、apply、also函数的使用，一张图看懂

![标志图](/img/in-post/kotlin/2018325102051477.png)

## let

- 函数定义：

    `public inline fun <T, R> T.let(block: (T) -> R): R = block(this)`

- 功能：
    >  调用某对象的let函数，则该对象为函数的参数。在函数块内可以通过 it 指代该对象。返回值为函数块的最后一行或指定return表达式。
- 分析：
    - let扩展函数的实际上是一个作用域函数，当你需要去定义一个变量在一个特定的作用域范围内，let函数的是一个不错的选择；let函数另一个作用就是可以避免写一些判断null的操作。

- 使用场景：
    - 场景一: 最常用的场景就是使用let函数处理需要针对一个可null的对象统一做判空处理。
    - 场景二: 然后就是需要去明确一个变量所处特定的作用域范围内可以使用
- 例子：
    ```
    object.let{
    it.todo()//在函数体内使用it替代object对象去访问其公有的属性和方法
    ...
    }

    //另一种用途 判断object为null的操作
    object?.let{//表示object不为null的条件下，才会去执行let函数体
    it.todo()
    }

    ```



## with

- 函数定义：

    `public inline fun <T, R> with(receiver: T, block: T.() -> R): R = receiver.block()`

- 功能：
    - with函数和其他几个函数使用方式略有不同，因为它不是以扩展的形式存在的。它是将某对象作为函数的参数，在函数块内可以通过 this 指代该对象。返回值为函数块的最后一行或指定return表达式。

- 使用场景：

    适用于调用同一个类的多个方法时，可以省去类名重复，直接调用类的方法即可，经常用于Android中RecyclerView中onBinderViewHolder中，数据model的属性映射到UI上
- 例子：
    ```kotlin
    with(object){
    //todo
    }

    val a = with("string") {
        println(this)
        3
    }
    println(a)
    //输出结果 string 3

    ```

## run
- 函数定义：

    `public inline fun <R> run(block: () -> R): R = block()`

    or
    
    `public inline fun <T, R> T.run(block: T.() -> R): R = block()`

- 功能：
    - 调用run函数块。返回值为函数块最后一行，或者指定return表达式。
    - 调用某对象的run函数，在函数块内可以通过 this 指代该对象。返回值为函数块的最后一行或指定return表达式。

- 分析：
    - run函数实际上可以说是let和with两个函数的结合体，run函数只接收一个lambda函数为参数，以闭包形式返回，返回值为最后一行的值或者指定的return的表达式。

- 使用场景：

    适用于let,with函数任何场景。因为run函数是let,with两个函数结合体，准确来说它弥补了let函数在函数体内必须使用it参数替代对象，在run函数中可以像with函数一样可以省略，直接访问实例的公有属性和方法，另一方面它弥补了with函数传入对象判空问题，在run函数中可以像let函数一样做判空处理。
- 例子：
    ```
    object.run{
    //todo
    }

    val a = run {
        println("run")
        return@run 3
    }
    println(a)
    //输出结果  run  3
   
    val a = "string".run {
        println(this)
        3
    }
    println(a)
    //输出结果 string 3
    ```

## apply


- 函数定义：

    `public inline fun <T> T.apply(block: T.() -> Unit): T { block(); return this }`

- 功能：
    - 调用某对象的apply函数，在函数块内可以通过 this 指代该对象。返回值为该对象自己。
- 分析：
    - 从结构上来看apply函数和run函数很像，唯一不同点就是它们各自返回的值不一样，run函数是以闭包形式返回最后一行代码的值，而apply函数的返回的是传入对象的本身。

- 使用场景：

    整体作用功能和run函数很像，唯一不同点就是它返回的值是对象本身，而run函数是一个闭包形式返回，返回的是最后一行的值。正是基于这一点差异它的适用场景稍微与run函数有点不一样。apply一般用于一个对象实例初始化的时候，需要对对象中的属性进行赋值。或者动态inflate出一个XML的View的时候需要给View绑定数据也会用到，这种情景非常常见。特别是在我们开发中会有一些数据model向View model转化实例化的过程中需要用到。

- 例子：
    ``` 
    object.apply{
    //todo
    }
    val a = "string".apply {
        println(this)
    }
    println(a)
    //输出结果 string string

    ```

## also


- 函数定义：

    `public inline fun <T> T.also(block: (T) -> Unit): T { block(this); return this }`

- 功能：
    - 调用某对象的also函数，则该对象为函数的参数。在函数块内可以通过 it 指代该对象。返回值为该对象自己
- 分析：
    - also函数的结构实际上和let很像唯一的区别就是返回值的不一样，let是以闭包的形式返回，返回函数体内最后一行的值，如果最后一行为空就返回一个Unit类型的默认值。而also函数返回的则是传入对象的本身。

- 使用场景：

    整体作用功能和run函数很像，唯一不同点就是它返回的值是对象本身，而run函数是一个闭包形式返回，返回的是最后一行的值。正是基于这一点差异它的适用场景稍微与run函数有点不一样。apply一般用于一个对象实例初始化的时候，需要对对象中的属性进行赋值。或者动态inflate出一个XML的View的时候需要给View绑定数据也会用到，这种情景非常常见。特别是在我们开发中会有一些数据model向View model转化实例化的过程中需要用到。

- 例子：
    ``` 
    object.also{
    //todo
    }

    val a = "string".also {
        println(it)
    }
    println(a)
    //输出结果 string string

    ```
## 对比

| 函数名 | 定义inline的结构|函数体内使用的对象 | 返回值 | 是否是扩展函数 | 适用的场景 |
| :------: | :------: | :------: | :------: | :------: | :------: | :------: |
|let|fun <T, R> T.let(block: (T) -> R): R = block(this)|it指代当前对象|闭包形式返回|是|适用于处理不为null的操作场景|
|with|fun <T, R> with(receiver: T, block: T.() -> R): R = receiver.block()|this指代当前对象或者省略|闭包形式返回|否|适用于调用同一个类的多个方法时，可以省去类名重复，直接调用类的方法即可，经常用于Android中RecyclerView中onBinderViewHolder中，数据model的属性映射到UI上|
|run|fun <T, R> T.run(block: T.() -> R): R = block()|this指代当前对象或者省略|闭包形式返回|是|适用于let,with函数任何场景。|
|apply|fun T.apply(block: T.() -> Unit): T { block(); return this }|this指代当前对象或者省略|返回this|是|1、适用于run函数的任何场景，一般用于初始化一个对象实例的时候，操作对象属性，并最终返回这个对象。2、动态inflate出一个XML的View的时候需要给View绑定数据也会用到3、一般可用于多个扩展函数链式调用 4、数据model多层级包裹判空处理的问题|
|also|fun T.also(block: (T) -> Unit): T { block(this); return this }|it指代当前对象|返回this|是|适用于let函数的任何场景，一般可用于多个扩展函数链式调用|


> [Kotlin系列之let、with、run、apply、also函数的使用](https://blog.csdn.net/u013064109/article/details/78786646#1)

> [Kotlin中标准函数run、with、let、also与apply的使用和区别详解](https://www.jb51.net/article/137056.htm)