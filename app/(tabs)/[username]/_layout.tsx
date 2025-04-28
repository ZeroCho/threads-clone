import {
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext, useLocalSearchParams } from "expo-router";
import type {
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import {
  Pressable,
  View,
  Image,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { AuthContext } from "@/app/_layout";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "@/components/SideMenu";
import EditProfileModal from "@/components/EditProfileModal";
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const isLoggedIn = !!user;
  const { username } = useLocalSearchParams();
  const isOwnProfile = isLoggedIn && user?.id === username?.slice(1);

  const handleOpenEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = () => setIsEditModalVisible(false);

  const handleShareProfile = () => {
    console.log("share profile");
  };

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
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
          source={require("@/assets/images/react-logo.png")}
          style={styles.logo}
        />
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
          <Text
            style={[
              styles.profileName,
              colorScheme === "dark"
                ? styles.profileNameDark
                : styles.profileNameLight,
            ]}
          >
            {user?.name}
          </Text>
          <Text
            style={[
              { marginBottom: 16 },
              colorScheme === "dark"
                ? styles.profileTextDark
                : styles.profileTextLight,
            ]}
          >
            {user?.id}
          </Text>
          <Text
            style={[
              colorScheme === "dark"
                ? styles.profileTextDark
                : styles.profileTextLight,
            ]}
          >
            {user?.description}
          </Text>
        </View>
        <View style={styles.profileActions}>
          {isOwnProfile ? (
            <Pressable
              style={[
                styles.actionButton,
                colorScheme === "dark"
                  ? styles.actionButtonDark
                  : styles.actionButtonLight,
              ]}
              onPress={handleOpenEditModal}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  colorScheme === "dark"
                    ? styles.actionButtonTextDark
                    : styles.actionButtonTextLight,
                ]}
              >
                Edit profile
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={[
                styles.actionButton,
                colorScheme === "dark"
                  ? styles.actionButtonDark
                  : styles.actionButtonLight,
              ]}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  colorScheme === "dark"
                    ? styles.actionButtonTextDark
                    : styles.actionButtonTextLight,
                ]}
              >
                Follow
              </Text>
            </Pressable>
          )}
          <Pressable
            style={[
              styles.actionButton,
              colorScheme === "dark"
                ? styles.actionButtonDark
                : styles.actionButtonLight,
            ]}
            onPress={handleShareProfile}
          >
            <Text
              style={[
                styles.actionButtonText,
                colorScheme === "dark"
                  ? styles.actionButtonTextDark
                  : styles.actionButtonTextLight,
              ]}
            >
              Share profile
            </Text>
          </Pressable>
        </View>
      </View>

      {user && (
        <EditProfileModal
          visible={isEditModalVisible}
          onClose={handleCloseEditModal}
          initialProfileData={user}
        />
      )}
      <MaterialTopTabs
        screenOptions={{
          lazy: true,
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#101010" : "white",
            shadowColor: "transparent",
            position: "relative",
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          tabBarPressColor: "transparent",
          tabBarActiveTintColor: colorScheme === "dark" ? "white" : "#555",
          tabBarIndicatorStyle: {
            backgroundColor: colorScheme === "dark" ? "white" : "black",
            height: 1,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: colorScheme === "dark" ? "#aaa" : "#555",
            position: "absolute",
            top: 48,
            height: 1,
          },
        }}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: "Threads" }} />
        <MaterialTopTabs.Screen name="replies" options={{ title: "Replies" }} />
        <MaterialTopTabs.Screen name="reposts" options={{ title: "Reposts" }} />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 50,
  },
  headerLight: {
    backgroundColor: "white",
  },
  headerDark: {
    backgroundColor: "#101010",
  },
  logo: {
    width: 32,
    height: 32,
  },
  menuButton: {
    position: "absolute",
    left: 16,
  },
  profile: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  profileAvatar: {
    position: "absolute",
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileNameLight: {
    color: "black",
  },
  profileNameDark: {
    color: "white",
  },
  profileTextDark: {
    color: "white",
  },
  profileTextLight: {
    color: "black",
  },
  containerLight: {
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#101010",
  },
  profileActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  actionButtonLight: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#333",
  },
  actionButtonDark: {
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionButtonTextLight: {
    color: "#000",
  },
  actionButtonTextDark: {
    color: "#fff",
  },
});
