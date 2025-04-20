import { Redirect } from "expo-router";
import { View, Text } from "react-native";

export default function Login() {
  const isLoggedIn = false;
  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}
