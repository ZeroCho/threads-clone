import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../../_layout";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "@/components/SideMenu";

export default function Index() {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

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
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user?.profileImageUrl }}
            style={styles.profileAvatar}
          />
          <Text>{user?.name}</Text>
          <Text>{user?.id}</Text>
          <Text>{user?.description}</Text>
        </View>
      </View>
      <View style={styles.tabBar}>
        <View>
          <TouchableOpacity onPress={() => router.push(`/${username}`)}>
            <Text>Threads</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/${username}/replies`)}>
            <Text>Replies</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/${username}/reposts`)}>
            <Text>Reposts</Text>
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
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuButton: {
    position: "absolute",
    left: 20,
    top: 10,
  },
  profile: {},
  profileHeader: {},
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
