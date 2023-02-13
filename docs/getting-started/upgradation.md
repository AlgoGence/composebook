---
id: upgradation
slug: /getting-started/upgradation
---

# Upgradation

There are few things we need to upgrade.

1. Compose UI version
2. Compose compiler version
3. Kotlin version
4. Android SDK version

## Compose UI version

We are going to use `1.3.3`

![](/img/compose-ui-version-change-before.png)

Go to the `project level build.gradle` file

Change the version to `1.3.3`

`Sync`

## Compose compiler version

Go to the `module level build.gradle` file

We will use `1.4.2`

![](/img/compose-compiler-version-change-before.png)

Change the version to `1.4.2`

`Sync`

If you run the project you may face the following type of error.

![](/img/kotlin-compatibility-with-compose-compiler-version-error.png)

It is due to the compose compiler and the kotlin version compatibility.

## Kotlin version

We have to use `1.8.10`

![](/img/kotlin-version-change-before.png)

## Android SDK version

Ensure Android SDK version 33 for:

* compileSdk
* targetSdk

![](/img/android-sdk-version-ensure.png)

## How to `discover` versions?

Go to [https://developer.android.com/jetpack/androidx/releases/compose#versions](https://developer.android.com/jetpack/androidx/releases/compose#versions)

![](/img/compose-ui-latest-stable-version-check.png)

Check the `compose.ui` and `compose.compiler` latest stable version.

Then go to [https://developer.android.com/jetpack/androidx/releases/compose-kotlin#pre-release_kotlin_compatibility](https://developer.android.com/jetpack/androidx/releases/compose-kotlin#pre-release_kotlin_compatibility)

Check Compose to Kotlin Compatibility Map

![](/img/compose-compiler-to-kotlin-compatibility-check.png)

And always have the `latest andriod SDK`.