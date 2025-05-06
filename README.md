# 스레드 클론코딩 threads-clone

[English Documentation Link](https://github.com/zerocho/threads-clone/blob/main/README-en.md)

## Expo 사용

- 공식문서가 Expo를 추천
- 안정성
- 갖춰진 라이브러리
- SDK 53, react native 79, react 19 사용

## 프로젝트 세팅하기

create-expo-app으로 간단하게 세팅 가능(Node.js LTS 이상 버전이 설치되어 있어야 함)

```bash
npx create-expo-app@latest threads-clone
# 구체적인 SDK 버전을 표시하고 싶다면
# npx create-expo-app@latest threads-clone --template default@sdk-53
cd threads-clone
```

[안드로이드 스튜디오 세팅](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build)

### EAS build

클라우드에서 빌드를 하고 빌드 결과물을 저장해두는 것(나중에 다른 기기 및 팀원끼리도 공유 가능). EAS에 회원가입도 할 것

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile development
```

### 실행 명령어

```bash
npm run android # npx expo start --android
npm run ios # npx expo start --ios
npm run web
```

Expo Go와 threads-clone 앱이 설치 됨.
QR 코드를 인식하면 실제 기기에서 해볼 수도 있음. Expo Go는 빠르게 결과물 보는 용도(네이티브 모듈은 사용하지 못함)

### SDK 버전 업데이트 하기

강의에서는 expo sdk 52가 설치되어 있어서 RN도 0.76버전이고 React도 18 버전이라 올려줄 필요가 있음

```bash
npx expo install expo@53
npx expo install --fix
```

expo에서는 npm install보다 expo install로 expo sdk와 호환되는 패키지를 설치하는 게 중요!
expo install --fix를 하면 현재 sdk와 호환되는 버전으로 알아서 설치해줌.

나중에 업데이트하려면 expo install --check로 SDK 버전에 맞게 업데이트 가능

```bash
npx expo install --check
```

## 본격 코딩 시작

먼저 튜토리얼 프로젝트 제거. app 폴더가 app-example 폴더로 이동

```bash
npm run reset-project
```

### Expo Router(React Navigation)

React Navigation 기반 기본 라우터

- Next Router와 비슷한 파일 기반 라우터
- 웹을 기준으로 생각하면 됨
  - 모든 페이지는 주소가 있음(index.tsx는 /, setting.tsx는 /setting 등)
- (그룹)은 내비게이션과 더불어 요긴하게 사용할 수 있음.
  - (tabs)처럼 주소에는 반영되지 않는 특수 폴더들이 있음(탭 내비게이션)
  - (tabs) 내부의 파일들에는 전부 하단 탭 내비게이션이 보이게 됨
- [동적주소].tsx: @zerocho @elonmusk처럼 변하는 이름일 때
  - useLocalSearchParams로 [] 내부 값 조회 가능
- +not-found.tsx: 주소에 해당하는 파일 못 찾았을 때
- router.push(히스토리에 추가), router.replace(현재 히스토리 대체), router.navigate(중복 히스토리만 제거)
- \_layout.tsx에 내비게이션을 만들면 같은 폴더의 파일들이 전부 내비게이션으로 인식됨
  - 커스터마이징을하려면 Stack이나 Tabs 컴포넌트 사용
  - href: null을 options로 두면 탭에서 제거할 수 있음
  - [username] 탭이 있다면 [username]/post/[postId]도 전부 포함됨
    - (post)/[username]/post/[postId]를 만들어서 포함되지 않게 우회 가능!

### 화면 만들기

- View가 div, Text가 span이라고 생각하기(1대1 매칭은 아님)
- css는 dp 단위(density-independent pixels, 다양한 화면 크기에 영향받지 않음)
- [css 속성 리스트](https://github.com/vhpoet/react-native-styling-cheat-sheet): 좀 오래됨
- flex에서는 flexDirection이 Column이 default
- backdropFilter는 expo-blur로 대체
- Pressable이 TouchableOpacity보다 커스터마이징하기 용이함
- CSS 우선순위는 따로 없고 style 배열 뒤에 위치한 스타일이 앞의 스타일을 덮어씀.

### Animated

- 간단한 애니메이션 제작 시
- 애니메이션 === 숫자(위치든, 크기든) 값이 변하는 것(Animated.value, Animated.valueXY)
- 하나의 애니메이션은 Animated.timing, Animated.decay, Animated.spring
- 여러 애니메이션을 sequence(순차), parallel(동시에), delay(간격을 두고), stagger(delay + parallel, 일정 간격을 두고 시작)

복잡하면 react-native-reanimated, lottie-react-native 고려

### 게시글 업로드 모달 창 만들기

FlatList 사용

- 최적화 되어있음
- Header, Footer 추가 가능

### Geolocation

expo-location 설치
권한 체크 해야함

### 이미지 업로드

expo-image-picker, expo-media-library 설치
권한 체크 해야함

### 로그인, 회원가입 구현해보기

라이브러리 호환되는지 검색할 때는 [reactnative.directory](reactnative.directory)

- 전부 다 나오지는 않음
- expo go와 호환되는지 볼 때 좋음.
  Context API로 간단하게 유저 정보 공유(zustand 같은 것도 좋음)

### Material Top Tabs

스와이프로 탭간 이동할 수 있게 수정

### MirageJS

MSW보다 간단하고 React Native와 호환 잘 되는 서버 모킹 라이브러리.

- 더미데이터 저장 기능도 있고 더미데이터 간 관계 설정도 가능함
- 시드, 팩토리 기능 등 매우 굿
  @faker/faker-js와 함께 사용하면 좋음

### Dark Mode

```ts
const colorScheme = useColorScheme();
```

### Share

링크 공유는 react-native의 Share.share 그대로 사용.
파일 공유는 expo-sharing.
내 앱으로 파일 공유는 3rd 파티 라이브러리 사용해야 함. prebuild도 필요.

### StatusBar

expo-status-bar

- react native와 API는 똑같으나, iOS/android 모두 동일하게 표시되도록 api를 맞춰둠

### SplashScreen, Expo Constants

expo-splash-screen

- 스플래시 스크린 커스터마이징
- Constants.expoConfig 객체 내에서 접근 가능
  - Constants.expoConfig.extra에 환경 변수 연결해두곤 함.
- 첫 화면부터 나오게 하려면 preview 모드에서 build해야 함

```bash
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

### In App Browser, WebView

링크 클릭 시 인앱 브라우저를 띄워서 표시(유저 체류 시간을 늘리기 위함)
WebView는 컴포넌트처럼 내장하는 기능임.

### 게시글 작성, 표시하기

@shopify/flash-list 설치

- 인피니트 스크롤링 사용
- 화면 끝에 도달하면(onEndReached, 또는 도달하기 전에) 다음 게시글 로딩
- @shopify/flash-list가 2버전 출시되면 완전히 달라질 것으로 보임. 대기 중...

## react-native-reanimated

- PanResponder와 함께 사용자 터치/드래그에 따라 애니메이션 부여 가능
- react-native-gesture-handler와 함께 더 복잡한 상호작용 가능
- 진동은 expo-haptics

## Notifications

expo-notifications 설치

### Local Notification

권한 필요. Expo Go에서도 가능. 원하는 시간에 기기 알림을 보낼 수 있음.

### Remote Notification

Dev Build + 실제 기기 필요. 백엔드에서 Expo Push Service로 요청 보내기(백엔드 Expo SDK 존재)

- android의 경우는 [FCM 설정](https://docs.expo.dev/push-notifications/fcm-credentials/) 필요.
- ios의 경우는 prebuild로 ios 폴더 만들어서 xcode signing 및 push notification capability [설정](https://github.com/expo/fyi/blob/main/setup-xcode-signing.md) 필요.
- [expo.dev](https://expo.dev)에서 Proejct > Configuration > Credentials에 Android FCM V1 Service key와 iOS Service Credentials Push Key가 둘 다 있어야 함

- 배포할 때는 따로 key를 세팅해야 함
  [참고 링크](https://docs.expo.dev/push-notifications/faq/#notifications-work-in-development-but-not-in-release-mode)
- Expo Push Service는 초당 600 제한량을 가짐
- ExpoPushToken은 안드로이드의 경우 앱 재설치 시마다 갱신되고, iOS의 경우는 앱 재설치 후에도 바뀌지 않음.

### 실제 기기 사용

- 안드로이드에서 apk가 큰 것은 Android SDK 모든 빌드가 같이 들어있기 때문, 나중에 aab 형식이 되면서 최적화 됨
- 아이폰에서는 provisioning profile을 만들어(eas build시에 만듦) 아이폰에서 설치하고, 앱도 동일한 profile로 빌드해야 무결성 에러가 발생하지 않음

## OAuth2 Login

SNS가 비밀번호 검증을 대신 해주는 것

- 회원가입을 대신 해주는 게 아님.
- 직접 유저 정보 수집 후 서버로 보내야 함
- 액세스/리프레시 토큰도 직접 발급해야 함.
- OAuth에서 주는 토큰은 SNS API용임.

### Kakao 로그인

- Dev Build 필요
- developers.kakao.com 콘솔 설정 필요
- 키 해시 빌드(development/preview/production)마다 등록해주기

### 애플 로그인

- Expo Go에서도 돌아감
- ID 토큰 주는데 그걸 회원가입 시 백엔드로 같이 보내서 검증.

### 비밀 키 관리하기

## EAS

### Expo Orbit

빠르게 EAS 빌드를 원하는 기기에 설치해서 실행할 수 있음
[링크](https://docs.expo.dev/build/orbit/)

나중에 EAS Update 내용도 쉽게 적용 가능

### 배포하기

EAS Submit

### EAS Update

업데이트 발생 시 앱에서 자동으로 알아차려 업데이트 가능
JS단 업데이트(스타일, 이미지 등 포함)만 가능. 네이티브 단은 업데이트 시 스토어 제출 후 심사 필요

```
eas update --channel preview --message "fix: react-logo location"
```

- expo-updates 라이브러리로 앱 내에서 업데이트 여부 체크 가능
- EAS에서 main 브랜치에 push할 때 자동으로 빌드되게 만들 수 있음.
- 롤백 빠르게 가능

MAU 1명당 0.005$ 과금. 만명이면 50$가 과금됨

- 자신이 직접 서버를 띄워서 하는 방법도 있음 - [링크](https://github.com/doyoonkim12345/cloud-push)

### preview 실행 시 앱이 바로 꺼져버린다면?

- 메트로 서버가 없어서 에러 메시지 확인 불가
- Android Studio Logcat에서 threads 로 검색해서 에러 메시지 확인하기
- iOS라면 xcode 실행 시 에러 메시지 확인 가능
- fetch에 주소가 없는 게 원인이었음!

## Expo Module API

Expo에 네이티브 기능을 추가하는 API

- npm에서 찾아도 없을 때 직접 만들어보자!
