---
id: simple-calculator
slug: /getting-started/simple-calculator
keywords: [make a simple calculator in jetpack compose, jetpack compose simple calculator]
---

# Simple Calculator

<Image src="/img/simple-calculator-ui.png" alt=""/>

We will create this simple calculator.

## Description

We will have two fields. After clicking the button the below text will show the sum of the values in those fields. Very simple.

## The code

```kotlin
class MainActivity : ComponentActivity() {
    val input1 = mutableStateOf("0")
    val input2 = mutableStateOf("0")
    val result = mutableStateOf("0")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            GettingStartedTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    Column{
                        TextField(
                            value = input1.value,
                            onValueChange = {
                                input1.value = it
                            },
                            keyboardOptions = KeyboardOptions(
                                keyboardType = KeyboardType.Number
                            )
                        )
                        TextField(
                            value = input2.value,
                            onValueChange = {
                                input2.value = it
                            },
                            keyboardOptions = KeyboardOptions(
                                keyboardType = KeyboardType.Number
                            )
                        )
                        Button(
                            onClick = {
                                try {
                                    result.value = (input1.value.toInt() + input2.value.toInt()).toString()
                                } catch (e: Exception) {
                                    result.value = "NaN"
                                }
                            }
                        ) {
                            Text("Calculate")
                        }
                        Text(result.value)
                    }
                }
            }
        }
    }
}
```

## Explanation

### mutableStateOf

Jetpack Compose is reactive in nature. Means changing in data will reflect in UI.

`mutableStateOf` is like `LiveData`.

* **mutable**: because it can be changed

* **state**: it has state, which can notify about its change.

The value of a `mutableStateOf` can be accessed(read or write) by its value property.

### TextField

* It is like the `EditText` in old UI approach.
* It is an editable text field. User can type text, number, email, etc.
* It is slightly different from normal `EditText`.
* It will notify about its change, but will not change its visible value until you set it. This mechanism is called as `state-hoisting`, we will learn more about it later.

```kotlin
TextField(
    value = input2.value,
    onValueChange = {
        input2.value = it
    },
    ..
)
```

`value` parameter will take the value to show

`onValueChange` will notify you about its change(by user)

```kotlin
keyboardOptions = KeyboardOptions(
    keyboardType = KeyboardType.Number
)
```

This is to mention the keyboard type.

### Button

```kotlin
Button(
    onClick = {
        ..
    }
) {
    Text("Calculate")
}
```

`Button` will have content, here the text **Calculator**.

You have to mention a callback, which will be executed when button will be clicked.

## How the calculator works?

We have declared 3 `mutableStateOf` variables:

1. `input1` for **first** textField
2. `input2` for **second** textField
3. `result` for the **result**

Changing this variables' value will reflect in UI

When the button will be clicked we will collect the values, convert to integer, do the summation and change the result value.
