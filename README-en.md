# Threads Clone Coding

[한글 문서 링크](https://github.com/zerocho/threads-clone/blob/main/README.md)

## Using Expo

- Official documentation recommends Expo
- Stability
- Well-equipped libraries
- Uses SDK 53, React Native 79, React 19

## Setting Up the Project

Easily set up with create-expo-app (Node.js LTS or higher required):

```bash
npx create-expo-app@latest threads-clone
# To specify the SDK version:
# npx create-expo-app@latest threads-clone --template default@sdk-53
cd threads-clone
```

[Set up Android Studio](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build)

### EAS Build

Cloud-based build with artifact storage (can be shared with team members and used on other devices). Sign up for EAS:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile development
```

### Run Commands

```bash
npm run android # npx expo start --android
npm run ios # npx expo start --ios
npm run web
```

Installs Expo Go and the threads-clone app.
You can test on a real device by scanning the QR code. Expo Go is for quick previews (does not support native modules).

### Updating SDK Version

The course used Expo SDK 52 (React Native 0.76, React 18), so we need to upgrade:

```bash
npx expo install expo@53
npx expo install --fix
```

Use `expo install` instead of `npm install` to ensure compatibility with the SDK.
`expo install --fix` installs compatible versions automatically.

To update later:

```bash
npx expo install --check
```

## Start Coding

Remove tutorial project. Move `app` folder to `app-example`:

```bash
npm run reset-project
```

### Expo Router (React Navigation)

Default router based on React Navigation:

- File-based router similar to Next Router
- Think in terms of web URLs (e.g. index.tsx = /, setting.tsx = /setting)
- (Group) folders like (tabs) are used for navigation and are excluded from URLs
- All files in (tabs) show bottom tab navigation
- [dynamic].tsx: For dynamic names like @zerocho, @elonmusk
  - Use `useLocalSearchParams` to access the dynamic part
- +not-found.tsx: Shown when a matching route is not found
- `router.push` (add to history), `router.replace` (replace current), `router.navigate` (prevent duplicate history)
- `_layout.tsx` defines navigation for files in the same folder
  - Use Stack or Tabs component for customization
  - Set `href: null` in options to exclude from tab
  - If a [username] tab exists, all nested routes like [username]/post/[postId] are included
    - To exclude, use (post)/[username]/post/[postId]

### Creating Screens

- View is like div, Text is like span (not 1:1 match)
- CSS uses dp (density-independent pixels)
- [CSS Property List](https://github.com/vhpoet/react-native-styling-cheat-sheet): slightly outdated
- Default flexDirection is column
- Use `expo-blur` instead of `backdropFilter`
- Pressable is more customizable than TouchableOpacity
- No CSS priority; later styles in style array override earlier ones

### Animated

- For simple animations
- Animation = changing numeric values (position, size, etc.)
- Use `Animated.value`, `Animated.valueXY`
- Types of animation: `Animated.timing`, `Animated.decay`, `Animated.spring`
- Combine animations with: sequence, parallel, delay, stagger

For complex cases, consider `react-native-reanimated` or `lottie-react-native`

### Post Upload Modal

Use FlatList:

- Optimized
- Can add Header, Footer

### Geolocation

Install expo-location.
Must check permissions.

### Image Upload

Install expo-image-picker and expo-media-library.
Must check permissions.

### Implementing Login and Sign-up

When checking library compatibility, use [reactnative.directory](https://reactnative.directory)

- Not all libraries are listed
- Good for checking Expo Go compatibility
- Use Context API or libraries like zustand to share user info

### Material Top Tabs

Enable swipe between tabs

### MirageJS

Simpler than MSW, works well with React Native:

- Stores dummy data and supports relations between them
- Seed, factory features are great
- Works well with @faker/faker-js

### Dark Mode

```ts
const colorScheme = useColorScheme();
```

### Share

Use `Share.share` from react-native to share links.
Use expo-sharing for file sharing.
Use third-party libraries for sharing to your own app (requires prebuild).

### StatusBar

Use `expo-status-bar`:

- Same API as react-native
- Ensures consistent look across iOS and Android

### SplashScreen & Expo Constants

Use `expo-splash-screen`:

- Customize splash screen
- Access settings in `Constants.expoConfig`
  - Often use `Constants.expoConfig.extra` for environment variables
- To show splash from the first screen, build in preview mode:

```bash
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

### In App Browser, WebView

Use in-app browser for external links (to keep users in the app)
WebView is a component to embed web content

### Creating and Displaying Posts

Install `@shopify/flash-list`:

- Supports infinite scrolling
- Load next posts with `onEndReached`
- Major changes expected in v2

## react-native-reanimated

- Use with PanResponder for animations based on touch/drag
- Combine with `react-native-gesture-handler` for complex gestures
- Use `expo-haptics` for vibration

## Notifications

Install `expo-notifications`

### Local Notification

Requires permission. Works in Expo Go. Can schedule device notifications.

### Remote Notification

Requires Dev Build and real device. Backend must send request to Expo Push Service (Expo SDK available).

- Android: [FCM setup required](https://docs.expo.dev/push-notifications/fcm-credentials/)
- iOS: Prebuild project, set up Xcode signing and push notification capability ([guide](https://github.com/expo/fyi/blob/main/setup-xcode-signing.md))
- On [expo.dev](https://expo.dev), go to Project > Configuration > Credentials
  - Both Android FCM V1 Service key and iOS Push Key must be set
- For production, keys must be set properly:
  [Reference](https://docs.expo.dev/push-notifications/faq/#notifications-work-in-development-but-not-in-release-mode)
- Expo Push Service has a 600 requests/sec limit
- ExpoPushToken:
  - Android: changes on reinstall
  - iOS: does not change on reinstall

### Real Device Use

- Android APKs are large because all SDK builds are included. AAB format optimizes size later.
- iPhone needs a provisioning profile (created during `eas build`). App must match this profile to avoid integrity errors.

## OAuth2 Login

SNS verifies the password, but:

- Does not handle sign-up
- You must collect user info and send to backend
- You must issue your own access/refresh tokens
- Tokens from OAuth are for SNS API

### Kakao Login

- Requires Dev Build
- Configure on developers.kakao.com
- Register key hashes for each build (development/preview/production)

### Apple Login

- Works in Expo Go
- Returns ID token for backend verification during sign-up

## EAS

### Expo Orbit

Quickly install and run EAS build on your device:
[Link](https://docs.expo.dev/build/orbit/)

Also useful for applying EAS Update later.

### Deploying

Use EAS Submit

### EAS Update

App can auto-detect and apply updates
Only updates JS layer (style, images, etc.). Native changes require store submission and review.

```bash
eas update --channel preview --message "fix: react-logo location"
```

- Use `expo-updates` to check for updates in-app
- Can trigger automatic build when pushing to main branch
- Fast rollback possible

Charged $0.005 per MAU. $50/month for 10,000 MAU.

- You can also self-host: [link](https://github.com/doyoonkim12345/cloud-push)

## Expo Module API

API to add native features to Expo

- If you can't find it on npm, create your own!
