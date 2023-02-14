---
id: composable-function
slug: /guide/composable-function
keywords: [composable function, Composable annotation ]
---

# Composable Function

* Composable functions are just normal functions annotated with `@Composable`
* 
```kotlin
fun myNormalFunction(){
    ..
}

@Composable
fun myComposableFunction(){
    ..
}
```

* Composable functions are the building block of Jetpack Compose. It is used to create user interface.
* There are many in-built composable functions. Also, we can create our own.
* Composable functions emit user interface elements to the compose runtime system for rendering.
* A composable function can only be called from a composable function
* Composable function can call normal function but the reverse is not possible.

```kotlin
@Composable
fun fun1(){
    fun2()//ok
    fun3()//ok
}

@Composable
fun fun2(){
    ..
}

fun fun3(){
    ..
}

fun fun4(){
    fun2()//is an error
}
```
