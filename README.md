# chameleon-chess-app

Play a colorful, fresh and dynamic version of chess with this mobile app.

The app uses a library that implements the game logic, so that the app basically just has to care about the visual presentation of the game. This library can be found here: [chameleon-chess-logic](https://github.com/hd-code/chameleon-chess-logic/).

In that library is also a description of the game and its rules: [game rules](https://github.com/hd-code/chameleon-chess-logic/docs/game/).

// TODO: react native app, game: descrip here...

## Getting Started

A react native app always consists of two parts:
* **a node.js server**
  * that serves the content to be displayed
* **the actual app**
  * which is a bridge to transform the react native JSX components to native components
  * this usually has to be build only once

For Development that means, you need to start up the node.js server from the project directory. Then you need to install the app (bridge) on the device (or simulator of the same).

This is done as follows.

### Requirements

The following software needs to be installed for the app to be build and run:

* Node.js 10 LTS or greater

Only for Android:
* Java SE Development Kit (JDK) 8 or greater
* Python 2 (only required on Windows)
* Android Studio

TODO: Android Studio settings and env variables

Only for iOS (*Note:* iOS Apps can only be build and run on a Mac):

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

Once a virtual device is running. Go to the project folder and run this from terminal:

```sh
npm run android
```

Now the app will be installed on the virtual device.

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

[See react native documentation](http://reactnative.dev/docs/getting-started) if further information is needed.

## Usage

Once the app (the bridge) has been build and installed to a (virtual) device, it can always be run by starting the device and simply opening the app.

However, the node.js server needs to be running as well for the apps to display any content. If the node.js server is not running just go to the project folder and again run this command from terminal:

```sh
# start the node.js server
npm start
```

## Project Overview

TODO:
general, bridge server, typescript, functional, ccl, state

### Project folders and files

* `android/`: holds the code to build the android app (bridge).
* `assets/`: contains all images, fonts and the texts (for several languages) that are displayed in the app.
* `ios/`: holds the code to build the ios app (bridge).
  * `ChameleonChess.xcworkspace` – since we use CocoaPods, this is the correct XCode project file.
  * `Podfile`: specifies the needed additional dependencies for the ios app using CocoaPods.
* `src/`: holds all the code that gets served by the node.js server, thus the actual app content.
  * `components/`: holds all react native components (visuell rendering). They are all written as functional components and only hold local state if absolutely necessary. Usually they are just dumb 'data displayers'. There are some reimplementations of basic react native components here as well. Check it out in the code.
  * `controller/`: holds the apps controllers. They manage central tasks and hold the global app state.
  * `models/`: contain data structures that are used in the app and functions to work on these data structures. They are written in a purely functional style and do not have any side-effects.
  * `App.tsx`: is the root component of the whole app. Subscribes to any changes in the global app state (controller). If the global state has changed, this component re-renders, causing the whole app to re-render.
  * `assets.ts`: loads the assets from the `assets/` directory and makes them easily available to the rest of the app.
  * `helper.ts`: contains several useful functions. E.g. it offers functions to get the current screen orientation, determine a basic font size to be used in the app etc.
  * `storage.ts`: holds generic functions to store, retrieve and remove data from a local storage. This storage is persistent.
* `.gitignore` list files and directories that should not be saved to the git repo.
* `index.ts`: bootstraps the whole app. This is the entry point for the node.js server. It basically just registers the `App.tsx` component as the root component to be loaded and displayed.
* `package.json`: holds all settings and dependencies for the NPM package manager.
* `react-native.config.js`: is a configuration file for the react native cli.
* `tsconfig.json`: holds the configuration for the typescript compiler.