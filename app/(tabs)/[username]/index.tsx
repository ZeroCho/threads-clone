import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  Pressable,
  Image,
} from "react-native";
import { usePathname } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/app/_layout";

export default function Index() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  console.log(pathname);
  const { user } = useContext(AuthContext);

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      {pathname === "/undefined" && (
        <View style={styles.postInputContainer}>
          <Image
            source={{ uri: user?.profileImageUrl }}
            style={styles.profileAvatar}
          />
          <Text
            style={
              colorScheme === "dark"
                ? styles.postInputTextDark
                : styles.postInputTextLight
            }
          >
            What's new?
          </Text>
          <Pressable
            style={[
              styles.postButton,
              colorScheme === "dark"
                ? styles.postButtonDark
                : styles.postButtonLight,
            ]}
          >
            <Text
              style={[
                styles.postButtonText,
                colorScheme === "dark"
                  ? styles.postButtonTextDark
                  : styles.postButtonTextLight,
              ]}
            >
              Post
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#101010",
  },
  containerLight: {
    backgroundColor: "white",
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#aaa",
  },
  postButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 22,
    position: "absolute",
    right: 0,
  },
  postButtonLight: {
    backgroundColor: "black",
  },
  postButtonDark: {
    backgroundColor: "white",
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },
  postButtonTextLight: {
    color: "white",
  },
  postButtonTextDark: {
    color: "black",
  },
  postInputText: {
    fontSize: 16,
    fontWeight: "600",
  },
  postInputTextLight: {
    color: "black",
  },
  postInputTextDark: {
    color: "#aaa",
  },
});
