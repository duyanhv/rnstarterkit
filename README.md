
# React Native Stater Kit

![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)
![Eslint](https://badgen.net/badge/eslint/airbnb/ff5a5f?icon=airbnb)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Fully featured kit to jump right into doing what you love.

---

## 👋 Intro

The project is _super_ helpful to kick-start your next project, as it provides a lot of the common tools you may reach for, all ready to go. Specifically:

- __Flux architecture__
    - [Redux](https://redux.js.org/docs/introduction/)
    - Redux Wrapper: [Rematch](https://github.com/rematch/rematch)
- __Routing and navigation__
    - [React Navigation](https://reactnativepaper.com) for native mobile navigation
- __UI Toolkit/s__
    - [React Native Paper](https://reactnativepaper.com)
- __Splash Screen + Assets__
    - [React Native Splash Screen](https://github.com/zoontek/react-native-bootsplash)
- __Localization__
    - [React i18next](https://react.i18next.com) for multiple languages support
- __Global Error Handle__
    - [React Native Exception Handler](react-native-exception-handler) for global error handling and logging

---
## 🚀 Getting Started

## Scripts

- run Android:

```

yarn android

```

- run iOS:

```

yarn ios

```

- set environments (production/staging/etc), change related configurations (default is **production**):

```

yarn env production
yarn env staging

```

- update app version, for example 1.4:

```

yarn update-ver <latest-version>

```

- update app build number, for example 5 (should be ran by Github Actions):

```

yarn update-build <latest-build-number>

```

- validate source code

```

yarn validate

```

- get SHA1 of keystores

```

yarn android-signing

```

## Update app icons & splash screens

- install ImageMagick

```

brew install imagemagick

```

- update `src/assets/images/app-icon-1024.png`

- run

```

yarn update-icons

```

- for splash screen, follow [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash)

## Sign in with Firebase

Follow [rnfirebase](https://rnfirebase.io/)
