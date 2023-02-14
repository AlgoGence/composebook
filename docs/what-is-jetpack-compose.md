---
id: what-is-jetpack-compose
slug: /what-is-jetpack-compose
keywords: [what is jetpack compose]
---

# What is jetpack compose?

Jetpack Compose is a modern toolkit for building `native` Android UI. It's a `declarative` and `reactive` framework that allows developers to write UI code using Kotlin. It simplifies UI development by allowing developers to focus on the layout and content of their app, instead of the low-level details of drawing and laying out UI components.

The basic components in Jetpack Compose are:

* **Text** - for displaying text on screen
* **Image** - for displaying images
* **Button** - for creating clickable buttons
* **Card** - for creating card-style UI elements
* **Column** & Row - for arranging components in a grid layout
* **LazyColumn** - for creating scrolling UI
* **Modifier** - for changing the appearance and behavior of UI components
* **State** - for storing and updating UI state
* **MaterialTheme** - for applying Material Design styles to your app

## Example

```kotlin
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp

@Composable
fun MessageCard(msg: Message) {
    // Add padding around our message
    Row(modifier = Modifier.padding(all = 8.dp)) {
        Image(
            painter = painterResource(R.drawable.profile_picture),
            contentDescription = "Contact profile picture",
            modifier = Modifier
                // Set image size to 40 dp
                .size(40.dp)
                // Clip image to be shaped as a circle
                .clip(CircleShape)
        )

        // Add a horizontal space between the image and the column
        Spacer(modifier = Modifier.width(8.dp))

        Column {
            Text(text = msg.author)
            // Add a vertical space between the author and message texts
            Spacer(modifier = Modifier.height(4.dp))
            Text(text = msg.body)
        }
    }
}
```

<img src="https://developer.android.com/static/images/jetpack/compose-tutorial/lesson2-06.png" width="30%"></img>
