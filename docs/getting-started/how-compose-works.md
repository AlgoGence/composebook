---
id: how-compose-works
slug: /getting-started/how-compose-works
keywords: [how jetpack compose works internally, jetpack compose behind the scene]
---

# How compose works?

## This is optional to read as of now. Skipping this part will not affect. But, good to read.

```kotlin
GettingStartedTheme {
    // A surface container using the 'background' color from the theme
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colors.background
    ) {
        Text("Hello World")
    }
}
```

This is a simple compose code, we have already seen.

This code will not run directly.

`Compose compilere` will convert every composable function into normal function with some extra code.

```kotlin
@Composable
fun Counter() {
 var count by remember { mutableStateOf(0) }
 Button(
   text="Count: $count",
   onPress={ count += 1 }
 )
}
```

This above code will be converted into the following:

```kotlin
fun Counter($composer: Composer) {
 $composer.start(123)
 var count by remember { mutableStateOf(0) }
 Button(
   text="Count: $count",
   onPress={ count += 1 }
 )
 $composer.end()
}
```

The generated code will be then converted into a node-tree.

<Image src="/img/node-tree.png" alt="node tree"/>

These nodes are directly mapped to some renderable things.

Any UI layout is like a hierarchy or tree. So, node tree is created.

<img src="/img/ui-tree.png" width="50%"></img>

This is the very basic explanation of how compose works. A more detail explanation will be there later. 