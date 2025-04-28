import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
  Image,
  ScrollView,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import NotFound from "@/app/+not-found";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "@/components/SideMenu";
import { useContext, useState } from "react";
import { AuthContext } from "../../_layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActivityItem from "@/components/Activity";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const isLoggedIn = !!user;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  if (
    ![
      "/activity",
      "/activity/follows",
      "/activity/replies",
      "/activity/mentions",
      "/activity/quotes",
      "/activity/reposts",
      "/activity/verified",
    ].includes(pathname)
  ) {
    return <NotFound />;
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <View
        style={[
          styles.header,
          colorScheme === "dark" ? styles.headerDark : styles.headerLight,
        ]}
      >
        {isLoggedIn && (
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
          source={require("../../../assets/images/react-logo.png")}
          style={styles.logo}
        />
        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </View>
      <View style={styles.tabBar}>
        <View>
          <TouchableOpacity
            style={[
              styles.tabButton,
              colorScheme === "dark"
                ? styles.tabButtonDark
                : styles.tabButtonLight,
              pathname === "/activity" &&
                (colorScheme === "dark"
                  ? styles.tabButtonActiveDark
                  : styles.tabButtonActiveLight),
            ]}
            onPress={() => router.replace(`/activity`)}
          >
            <Text
              style={[
                styles.tabButtonText,
                colorScheme === "dark"
                  ? styles.tabButtonTextDark
                  : styles.tabButtonTextLight,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.tabButton,
              colorScheme === "dark"
                ? styles.tabButtonDark
                : styles.tabButtonLight,
              pathname === "/activity/follows" &&
                (colorScheme === "dark"
                  ? styles.tabButtonActiveDark
                  : styles.tabButtonActiveLight),
            ]}
            onPress={() => router.replace(`/activity/follows`)}
          >
            <Text
              style={[
                styles.tabButtonText,
                colorScheme === "dark"
                  ? styles.tabButtonTextDark
                  : styles.tabButtonTextLight,
              ]}
            >
              Follows
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.tabButton,
              colorScheme === "dark"
                ? styles.tabButtonDark
                : styles.tabButtonLight,
              pathname === "/activity/replies" &&
                (colorScheme === "dark"
                  ? styles.tabButtonActiveDark
                  : styles.tabButtonActiveLight),
            ]}
            onPress={() => router.replace(`/activity/replies`)}
          >
            <Text
              style={[
                styles.tabButtonText,
                colorScheme === "dark"
                  ? styles.tabButtonTextDark
                  : styles.tabButtonTextLight,
              ]}
            >
              Replies
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.tabButton,
              colorScheme === "dark"
                ? styles.tabButtonDark
                : styles.tabButtonLight,
              pathname === "/activity/mentions" &&
                (colorScheme === "dark"
                  ? styles.tabButtonActiveDark
                  : styles.tabButtonActiveLight),
            ]}
            onPress={() => router.replace(`/activity/mentions`)}
          >
            <Text
              style={[
                styles.tabButtonText,
                colorScheme === "dark"
                  ? styles.tabButtonTextDark
                  : styles.tabButtonTextLight,
              ]}
            >
              Mentions
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.tabButton,
              colorScheme === "dark"
                ? styles.tabButtonDark
                : styles.tabButtonLight,
              pathname === "/activity/quotes" &&
                (colorScheme === "dark"
                  ? styles.tabButtonActiveDark
                  : styles.tabButtonActiveLight),
            ]}
            onPress={() => router.replace(`/activity/quotes`)}
          >
            <Text
              style={[
                styles.tabButtonText,
                colorScheme === "dark"
                  ? styles.tabButtonTextDark
                  : styles.tabButtonTextLight,
              ]}
            >
              Quotes
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.tabButton,
              colorScheme === "dark"
                ? styles.tabButtonDark
                : styles.tabButtonLight,
              pathname === "/activity/reposts" &&
                (colorScheme === "dark"
                  ? styles.tabButtonActiveDark
                  : styles.tabButtonActiveLight),
            ]}
            onPress={() => router.replace(`/activity/reposts`)}
          >
            <Text
              style={[
                styles.tabButtonText,
                colorScheme === "dark"
                  ? styles.tabButtonTextDark
                  : styles.tabButtonTextLight,
              ]}
            >
              Reposts
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.tabButton,
              colorScheme === "dark"
                ? styles.tabButtonDark
                : styles.tabButtonLight,
              pathname === "/activity/verified" &&
                (colorScheme === "dark"
                  ? styles.tabButtonActiveDark
                  : styles.tabButtonActiveLight),
            ]}
            onPress={() => router.replace(`/activity/verified`)}
          >
            <Text
              style={[
                styles.tabButtonText,
                colorScheme === "dark"
                  ? styles.tabButtonTextDark
                  : styles.tabButtonTextLight,
              ]}
            >
              Verified
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <ActivityItem
          id="1"
          username="John Doe"
          timeAgo="1h"
          content="팔로우"
          type="followed"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <ActivityItem
          id="2"
          username="John Doe"
          timeAgo="1h"
          postId="1"
          content="Hello, comment!"
          type="reply"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <ActivityItem
          id="2"
          username="John Doe"
          timeAgo="1h"
          postId="1"
          content="liked your post"
          type="like"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <ActivityItem
          id="3"
          username="John Doe"
          timeAgo="1h"
          postId="1"
          content="reposted your post"
          type="repost"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <ActivityItem
          id="5"
          username="John Doe"
          timeAgo="1h"
          postId="1"
          content="mentioned you"
          type="mention"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <ActivityItem
          id="4"
          username="John Doe"
          timeAgo="1h"
          postId="1"
          content="quoted your post"
          type="quote"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
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
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 7,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#aaa",
    backgroundColor: "#101010",
  },
  tabButtonLight: {
    backgroundColor: "white",
  },
  tabButtonDark: {
    backgroundColor: "#101010",
  },
  tabButtonActiveLight: {
    backgroundColor: "#eee",
  },
  tabButtonActiveDark: {
    backgroundColor: "#202020",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "900",
  },
  tabButtonTextLight: {
    color: "black",
  },
  tabButtonTextDark: {
    color: "white",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  logo: {
    width: 32,
    height: 32,
  },
});
