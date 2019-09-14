---
layout:     post
title:      "Kotlin how to annotation"
subtitle:   " \"Kotlin how to annotation \""
date:       2019-09-14 12:00:00
author:     "ML"
header-img: "/img/post-bg-2019.jpg"
tags:
    - Kotlin
    - annotation
---
# Kotlin 如何使用注解
> 参考[Kotlin中文语言站](https://www.kotlincn.net/docs/reference/annotations.html)

* 使用方式:声明注解
    >使用关键字 annotation
    ` annotation class FieldOrderAnnotation(val order: Int)`
* 注解的附加属性可以通过用元注解标注注解类来指定,元注解标注表如下:

    | 元注解 | 注解解释 |
    | :----:|:-----|
    | @Target| 指定可以用该注解标注的元素的可能的类型（类、函数、属性、表达式等）|
    |@Retention |指定该注解是否存储在编译后的 class 文件中，以及它在运行时能否通过反射可见 （默认都是 true）|
    |@Repeatable |允许在单个元素上多次使用相同的该注解|
    |@MustBeDocumented |指定该注解是公有 API 的一部分，并且应该包含在生成的 API 文档中显示的类或方法的签名中|

* 例子:
    ```kotlin
        @Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION,
                AnnotationTarget.VALUE_PARAMETER,AnnotationTarget.FIELD, AnnotationTarget.EXPRESSION)
        @Retention(AnnotationRetention.SOURCE,AnnotationRetention.RUNTIME)
        @MustBeDocumented 
        annotation class FieldOrderAnnotation(val order: Int)
    ```
* 使用注解
    > 在kotlin中使用注解和反射按声明顺序获取声明属性
    * 获取反射获取属性
    ```kotlin
      val itemInfo = ItemInfo()
                val fieldList = itemInfo.javaClass.kotlin.declaredMemberProperties.toList()
                val map = fieldList.sortedWith(Comparator.comparingInt { m ->
                    m.javaField!!.getAnnotation(FieldOrderAnnotation::class.java)?.order ?: 0
                }).map { kProperty1 ->
                    Pair(
                        kProperty1.name,
                        kProperty1.get(itemInfo)
                    )
                }.toMap()
    ```
    > kotlin中使用反射获取属性要使用 javaField 

