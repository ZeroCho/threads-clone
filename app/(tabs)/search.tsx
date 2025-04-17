import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Link href="/home">
        <Text style={styles.text}>검색 화면</Text>
      </Link>
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
