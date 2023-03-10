---
id: text-basic-details-for-intro
slug: /getting-started/text-basic-details-for-intro
keywords: [jetpack compose text, how to show text in jetpack compose]
---

# Text

We will use `Text` to show a text.

Suppose we want to show ***Hello World*** then we can use the following code:

```kotlin
Text("Hello World")
```

<Image src="/img/hello-world-text.png" alt="hello world text in jetpack compose"/>

We will know more about `Text` later.

## What is it actually?

`Text` is a kotlin function, but treated little differently.

If you go to its definition you will see its definition:

```kotlin
@Composable
fun Text(
    text: String,
    ...
)
```

So, `Text` is a function annotated with `@Composable`

This type of functions are called as `composable function`.