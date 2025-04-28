import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import Post from "@/components/Post";
export default function Index() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <Post
        item={{
          id: "0",
          username: "madison",
          displayName: "Madison",
          content: "What is this?",
          timeAgo: "30 minutes ago",
          likes: 10,
          comments: 5,
          reposts: 2,
          isVerified: true,
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
          image: `https://picsum.photos/800/600?random=${Math.random()}`,
          location: [37.125, 124.97],
        }}
      />
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
        }}
      />
      <Post
        item={{
          id: "2",
          username: "zerocho",
          displayName: "Zerocho",
          content: "Hello, world!",
          timeAgo: "1 hour ago",
          likes: 10,
          comments: 5,
          reposts: 2,
          isVerified: true,
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        }}
      />
      <Post
        item={{
          id: "3",
          username: "karina",
          displayName: "Karina",
          content: "Hello, world!",
          timeAgo: "1 hour ago",
          likes: 10,
          comments: 5,
          reposts: 2,
          isVerified: true,
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
          image: `https://picsum.photos/800/600?random=${Math.random()}`,
          location: [37.125, 124.97],
        }}
      />
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
  textLight: {
    color: "black",
  },
  textDark: {
    color: "white",
  },
});
