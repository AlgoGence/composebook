---
id: basic-ui
slug: /getting-started/basic-ui
keywords: [basic ui in jetpack compose, button in jetpack compose, text in jetpack compose, column in jetpack compose, layout, what is layout]
---

# Basic UI

Now we will create a very basic UI like below:

![basic ui in jetpac compose](/img/basic-ui.png)

## Layout analysis

Before even writing a single line of code, we should analyse the layout first.

## Layout

Layout is the process of calculating the position of objects in space subject to various constraints.

Simply say, layout is the arrangement/placement(where to put which one) of UI elements in the screen.

## The analysis

We can easily understand that the `text` and the `button` are arranged **vertically**(top to down). So, we need something which can arrange our elements in vertical manner.

In compose we have `Column` for this purpose.

We already know how to have a text by `Text`.

Now, we have to know how to have a button. We have `Button` for this.

## The code

```kotlin
Column(){
    Text("Hello World")
    Button(
        onClick = {

        }
    ) {
        Text("Click Me")
    }
}
```

Place this code instead of `Text("Hello World")`.

The above code may be easily understandable. But I want to explain.

## Column

`Column` is a composable function. Elements **_inside_** this will be arranged **vertically**. The parenthesis after `Column` is _optional as of now_.

You can have the following code with exactly same result.

```kotlin
Column{
    Text("Hello World")
    Button(
        onClick = {

        }
    ) {
        Text("Click Me")
    }
}
```

## Inside means?

When I say inside, it means **inside** the corresponding `braces`. The braces correspond to `trailing lambda`, a Kotlin feature.

```kotlin
Column(){
    // This is the inside the column
}
```

```kotlin
Column{
    // This also is the inside the column, because the () after Column is optional
}
```

## Button

The button need `content`(the text) and `onclick` callback. As of now we will do nothing `onClick` event. So, it is empty.
