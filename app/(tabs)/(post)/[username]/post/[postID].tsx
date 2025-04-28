import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import Post from "@/components/Post";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function PostScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <View
        style={[
          styles.header,
          colorScheme === "dark" ? styles.headerDark : styles.headerLight,
        ]}
      >
        {router.canGoBack() ? (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colorScheme === "dark" ? "gray" : "black"}
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              setIsSideMenuOpen(true);
            }}
          >
            <Ionicons
              name="menu"
              size={24}
              color={colorScheme === "dark" ? "gray" : "black"}
            />
          </Pressable>
        )}
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={styles.logo}
        />
        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Post
          item={{
            id: "1",
            username: "zerocho",
            displayName: "Zerocho",
            content: "Hello, world!",
            timeAgo: "1 hour ago",
            likes: 10,
            comments: 5,
            reposts: 2,
            isVerified: true,
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            image: `https://picsum.photos/800/600?random=${Math.random()}`,
          }}
        />
        <View style={styles.repliesHeader}>
          <Text
            style={
              colorScheme === "dark"
                ? styles.repliesHeaderDark
                : styles.repliesHeaderLight
            }
          >
            Replies
          </Text>
        </View>
        <Post
          item={{
            id: "2",
            username: "sarah",
            displayName: "Sarah",
            content: "Hello, comment!",
            timeAgo: "1 hour ago",
            likes: 10,
            comments: 5,
            reposts: 2,
            isVerified: true,
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          }}
        />
        <Post
          item={{
            id: "3",
            username: "anne",
            displayName: "Anne",
            content: "Another comment!",
            timeAgo: "1 hour ago",
            likes: 10,
            comments: 5,
            reposts: 2,
            isVerified: true,
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            image: `https://picsum.photos/800/600?random=${Math.random()}`,
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#101010",
  },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLight: {
    backgroundColor: "white",
  },
  headerDark: {
    backgroundColor: "#101010",
  },
  menuButton: {
    position: "absolute",
    left: 16,
  },
  logo: {
    width: 32,
    height: 32,
  },
  scrollView: {
    flex: 1,
  },
  repliesHeader: {
    height: 50,
    paddingLeft: 16,
    borderBottomWidth: 1,
    justifyContent: "center",
    borderBottomColor: "#e0e0e0",
  },
  repliesHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  repliesHeaderDark: {
    color: "white",
  },
  repliesHeaderLight: {
    color: "#000",
  },
});
