import { View, Text, StyleSheet } from "react-native";

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>추가 화면</Text>
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
