# 스레드 클론코딩 threads-clone

## Expo 사용
- 공식문서가 Expo를 추천
- 안정성
- 갖춰진 라이브러리
- SDK 53, react native 79, react 19 사용

## 프로젝트 세팅하기
create-expo-app으로 간단하게 세팅 가능

```bash
npx create-expo-app@latest threads
# 구체적인 SDK 버전을 표시하고 싶다면
# npx create-expo-app@latest threads --template default@sdk-53
cd threads
```

[안드로이드 스튜디오 세팅](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build)

### EAS build
클라우드에 빌드를 올리는 것(나중에 팀원끼리 공유 가능). EAS에 회원가입도 할 것

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile development
```

### 실행 명령어
```bash
npm run android
npm run ios
npm run web
```

## 본격 코딩 시작
먼저 튜토리얼 프로젝트 제거. app 폴더가 app-sample 폴더로 이동
```bash
npm run reset-project
```

### Expo Router(React Navigation)
React Navigation 기반 기본 라우터
- 파일 기반 라우터
- Next Router와 비슷
- 웹을 기준으로 생각하면 됨
- 모든 페이지는 주소가 있음(index.tsx는 /, setting.tsx는 /setting 등)
- (tabs)처럼 특수 폴더들이 있음(탭 내비게이션)
- [동적주소].tsx: @zerocho @elonmusk처럼 변하는 이름일 때
- +not-found.tsx: 주소에 해당하는 파일 못 찾았을 때

### 로그인, 회원가입 구현해보기

### 게시글 작성, 표시하기

### WebSocket

### Api Routes

### Geolocation

### Push Notification

## 배포하기