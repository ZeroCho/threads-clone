import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.tabBar}>
      <Text>Threads will be here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
