# chameleon-chess-app

Play a colorful, fresh and dynamic version of chess with this mobile app.

A description of the game and its rules can be found [here](https://github.com/hd-code/chameleon-chess-logic/tree/master/docs/game).

This app is cross-platform and runs on both iOS and Android devices. It can be run on smartphones and tablets.

It is written with the [react-native](http://reactnative.dev/) framework. React-native is based on the [react framework](https://reactjs.org). React-native uses a local node.js server to serve JSX components (instead of HTML components in react) to a native app (called the 'bridge'). JSX is a markup language closely related to HTML, but with embedded JS code. The 'bridge' converts the JSX components to native device components which then get rendered to the screen.

## Getting Started

A react-native app always consists of two parts:
* **a node.js server**
  * that serves the content to be displayed
* **the actual app**
  * which is the 'bridge' to transform the react-native JSX components to native components
  * this usually has to be build only once

For Development that means, you need to start up the node.js server from the project directory. Then you need to install the app (bridge) on the device (or simulator of the same).

This is done as follows.

### Requirements

The following software needs to be installed for the app to be build and run:

* Node.js 10 LTS or greater

#### For Android

* Java SE Development Kit (JDK) 8 or greater
* Python 2 (only required on Windows)
* Android Studio

In Android Studio make sure to have the following components installed:

* Android SDK (particularly Android 9 – Pie)
* Android SDK Platform (particularly Android SDK Platform 28)
* Performance (Intel ® HAXM) (Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image)
* Android Virtual Device

These can be installed during installation of Android Studio using a "Custom" installation. But they can also be configured any time later on in the menu.

**Lastly, you have to set some environment variables for the android build to work.**

On Mac, just create the file `$HOME/.bashrc` with this content:

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

On Windows create the environment variable using the Windows Control Panel: 
``` 
Variable name: ANDROID_HOME
Variable value: C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
Path: C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools
```

See [react-native documentation](http://reactnative.dev/docs/getting-started) for further information.

#### For iOS

_Note:_ iOS Apps can only be build and run on a Mac!

* XCode v9.4 or newer (easiest is to get it from the AppStore)
* XCode Command Line Tools (can be installed in the XCode settings)
* CocoaPods (install by using ruby: `sudo gem install cocoapods`)

### Installation

In order to get and basically setup the project, run the following commands in the terminal:

```sh
# clone git repo
git clone https://github.com/hd-code/chameleon-chess-app.git

# change to repo directory
cd chameleon-chess-app

# automatically install all dependencies
npm install

# start the node.js server
npm start
```

Now you can start the node.js server with:
```sh
# start the node.js server
npm start
```

The node.js server is now up and running in the terminal that was just used. Open up another terminal for the subsequent tasks.

Now you need to install the actual app (bridge) on your devices/simulators.

#### For Android

To install the app on an Android emulator, you need to have the emulator running. This can be done using Android Studio. In the starting dialog click on the bar at the bottom: `Configure > AVD Manager`. Here you can create virtual devices and start them up.

Make sure that your created devices use the android version 'Pie'.

Once a (or serval) virtual device are running, go to the project folder and run this from terminal:

```sh
npm run android
```

Now the app will be installed on all currently running virtual devices.

#### For iOS

Before you can build the iOS app, additional dependencies for the iOS app have to be installed. This is done using CocoaPods. Simply go to the terminal in the project directory and run:

```sh
npm run pod
```

Now you can build and install the app, using:

```sh
npm run ios
```

If you want to run it on a different simulator, you can do so in XCode. Go to XCode and open the project (`./ios/ChameleonChess.xcworkspace`). In the top bar you can now set the target simulator or even your own device, if that was configured.

By clicking on the Build button (the one that looks like a play button), the app will be build and installed on the device. Also, the node.js server will be started in a separate terminal, if it is not already running.

[See react-native documentation](http://reactnative.dev/docs/getting-started) if further information is needed.

## Usage

Once the app (the bridge) has been build and installed to a (virtual) device, it can always be run by starting the device and simply opening the app.

However, the node.js server needs to be running as well for the apps to display any content. If the node.js server is not running just go to the project folder and again run this command from terminal:

```sh
# start the node.js server
npm start
```

## Project Overview

As said before, this app uses the react-native framework. The `src/` folder contains the code for the node.js server, thus the content that actually gets displayed. `android/` contains the code for the native android app (bridge). Same goes for iOS, which can be found in the directory `ios/`.

The project is written in TypeScript for type safety and advanced error checking before compiling.

All react-native components are implemented as functional components. This a new nice way to excessively use a functional style for the implementation. [See react documentation](https://reactjs.org/docs/components-and-props.html) for details.

Most of the app's logic is implemented in a different library, called [chameleon-chess-logic](https://github.com/hd-code/chameleon-chess-logic). This library provides data structures and methods to implement a game of chameleon chess.

React works in a hierarchical data flow. So there is a root component (`./src/App.tsx`) which is the starting point of the rendering process. Depending on the app state, other components are then embedded in the root component. When the state changes, the whole app is re-rendered starting at the root component.

Components can hold state within themselves. However, this is only done for state that is only relevant to this very component. Anything, that is a global concern, is stored in controllers. When the state in the controllers changes, the app re-renders. This is done by by the `App.tsx` component subscribing to changes in the controllers (observer-pattern).

Also, we try to keep information centralized. So, colors, texts and images are kept centrally in a module, called `assets.ts`.

App settings and the currently played game is stored in a local storage, so that this data persists over several sessions.

### Project folders and files

* `android/` holds the code to build the android app (bridge).
* `assets/` contains all images, fonts and the texts (for several languages) that are displayed in the app.
* `ios/` holds the code to build the ios app (bridge).
  * `ChameleonChess.xcworkspace` – since we use CocoaPods, this is the correct XCode project file.
  * `Podfile` specifies the needed additional dependencies for the ios app using CocoaPods.
* `src/` holds all the code that gets served by the node.js server, thus the actual app content.
  * `components/` holds all react-native components (visuell rendering). They are all written as functional components and only hold local state if absolutely necessary. Usually they are just dumb 'data displayers'. There are some re-implementations of basic react-native components here as well. Check it out in the code.
  * `controller/` holds the apps controllers. They manage central tasks and hold the global app state.
  * `models/` contain data structures that are used in the app and functions to work on these data structures. They are written in a purely functional style and do not have any side-effects.
  * `App.tsx` is the root component of the whole app. It subscribes to any changes in the global app state (controller). If the global state has changed, this component re-renders, causing the whole app to re-render.
  * `assets.ts` loads the assets from the `assets/` directory and makes them easily available to the rest of the app.
  * `helper.ts` contains several useful functions. E.g. it offers functions to get the current screen orientation, determine a basic font size to be used in the app etc.
  * `storage.ts` holds generic functions to store, retrieve and remove data from a local storage. This storage is persistent.
* `.gitignore` list files and directories that should not be saved to the git repo.
* `index.ts` bootstraps the whole app. This is the entry point for the node.js server. It basically just registers the `App.tsx` component as the root component to be loaded and displayed.
* `package.json` holds all settings and dependencies for the NPM package manager.
* `react-native.config.js` is a configuration file for the react-native cli.
* `tsconfig.json` holds the configuration for the typescript compiler.
