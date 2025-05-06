import { Redirect, router } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  useColorScheme,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "./_layout";
import { useContext, useEffect } from "react";
import {
  initializeKakaoSDK,
  getKeyHashAndroid,
} from "@react-native-kakao/core";
import { login as kakaoLogin, me } from "@react-native-kakao/user";
import * as AppleAuthentication from "expo-apple-authentication";
export default function Login() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const { user, login } = useContext(AuthContext);
  const isLoggedIn = !!user;

  useEffect(() => {
    initializeKakaoSDK("c428a9aa499e40f778d16513edbfa42d");
  }, []);

  const onAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(credential);
      // 서버로부터 유저데이터를 받아와야합니다.
      // AsyncStorage, SecureStore
      login?.();
    } catch (error) {
      console.log(error);
    }
  };

  const onKakaoLogin = async () => {
    console.log(await getKeyHashAndroid());
    try {
      const result = await kakaoLogin();
      console.log(result);
      const user = await me();
      console.log(user);
      // 서버로부터 유저데이터를 받아와야합니다.
      // AsyncStorage, SecureStore
      login?.();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        backgroundColor: colorScheme === "dark" ? "black" : "white",
      }}
    >
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>
      <Pressable style={styles.loginButton} onPress={login}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
      <Pressable
        style={[styles.loginButton, styles.kakaoLoginButton]}
        onPress={onKakaoLogin}
      >
        <Text style={[styles.loginButtonText, styles.kakaoLoginButtonText]}>
          Kakao Login
        </Text>
      </Pressable>
      <Pressable
        style={[styles.loginButton, styles.appleLoginButton]}
        onPress={onAppleLogin}
      >
        <Text style={styles.loginButtonText}>Apple Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
  },
  kakaoLoginButton: {
    backgroundColor: "#FEE500",
  },
  kakaoLoginButtonText: {
    color: "black",
  },
  appleLoginButton: {
    backgroundColor: "black",
  },
});
