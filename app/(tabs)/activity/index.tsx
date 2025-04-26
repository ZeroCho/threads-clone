import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import NotFound from "@/app/+not-found";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "@/components/SideMenu";
import { useContext, useState } from "react";
import { AuthContext } from "../../_layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
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
      ]}
    >
      <View style={styles.header}>
        {isLoggedIn && (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              setIsSideMenuOpen(true);
            }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </Pressable>
        )}
        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </View>
      <View style={styles.tabBar}>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity`)}>
            <Text style={{ color: pathname === "/activity" ? "red" : "black" }}>
              All
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/follows`)}>
            <Text
              style={{
                color: pathname === "/activity/follows" ? "red" : "black",
              }}
            >
              Follows
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/replies`)}>
            <Text
              style={{
                color: pathname === "/activity/replies" ? "red" : "black",
              }}
            >
              Replies
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => router.replace(`/activity/mentions`)}
          >
            <Text
              style={{
                color: pathname === "/activity/mentions" ? "red" : "black",
              }}
            >
              Mentions
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/quotes`)}>
            <Text
              style={{
                color: pathname === "/activity/quotes" ? "red" : "black",
              }}
            >
              Quotes
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/reposts`)}>
            <Text
              style={{
                color: pathname === "/activity/reposts" ? "red" : "black",
              }}
            >
              Reposts
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => router.replace(`/activity/verified`)}
          >
            <Text
              style={{
                color: pathname === "/activity/verified" ? "red" : "black",
              }}
            >
              Verified
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
  },
  menuButton: {
    position: "absolute",
    left: 20,
    top: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
