import { View, Text, StyleSheet } from "react-native";

export default function HeartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>좋아요 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
});
