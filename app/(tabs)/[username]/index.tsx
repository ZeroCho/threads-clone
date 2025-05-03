import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  Pressable,
  Image,
} from "react-native";
import { usePathname, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/_layout";
import { FlashList } from "@shopify/flash-list";
import Post from "@/components/Post";

export default function Index() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const { username } = useLocalSearchParams();
  console.log(pathname);
  const { user } = useContext(AuthContext);
  const [threads, setThreads] = useState<any[]>([]);

  const onEndReached = () => {
    console.log(
      "onEndReached",
      `/users/${username?.slice(1)}/threads?cursor=${threads.at(-1)?.id}`
    );
    fetch(`/users/${username?.slice(1)}/threads?cursor=${threads.at(-1)?.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts.length > 0) {
          setThreads((prev) => [...prev, ...data.posts]);
        }
      });
  };

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      {pathname === "/@" + user?.id && (
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
      <FlashList
        data={threads}
        renderItem={({ item }) => <Post item={item} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={2}
        estimatedItemSize={350}
      />
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
