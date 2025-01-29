# Welcome to the frontend! 👋

This is a [React Native](https://reactnative.dev/) project built with the [Expo](https://expo.dev) framework which allows generating native builds for development and internal distribution.

> [!NOTE]
> The app was only developed for Android devices so running on IOS devices may or may not work.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

All the application code is inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Run tests

Feel free to explore the tests under the `__tests__` directory. You can run them with `npm run test` or in watch mode with `npm run test-watch`.

3. Creating and running a development build
   Install the EAS CLI

   ```
   npm install -g eas-cli
   ```

   Log into your expo account or create one

   ```
   eas login
   ```

   Build the app for android and follow the prompts to create a keystore for the app. This will create a development build which runs outside of Expo Go.

   ```
   eas build --platform android --profile development
   ```

   Wait for the build to complete. You monitor the progress and read the logs by following the link to the build details page that EAS CLI prompts once the build process starts.

   Once the build is completed, click `Install` and scan the QR code to install the build directly on your device.

   Run the server with `npx expo start` and in the ouput you will find you are using the development build. You can make changes to the code and it will reflect the changes instantly.
