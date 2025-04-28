import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  useColorScheme,
  Pressable,
  Appearance,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur"; // For background blur effect
import { AuthContext } from "../app/_layout";

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isVisible, onClose }) => {
  const { logout } = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const [isAppearanceVisible, setIsAppearanceVisible] = useState(false);

  const showAppearance = () => {
    setIsAppearanceVisible(true);
  };

  const closeAppearance = () => {
    setIsAppearanceVisible(false);
  };

  const handleLogout = () => {
    logout?.();
    onClose(); // Close the menu after logout
    // Optionally navigate to login screen or home screen
    // e.g., using router.replace('/login');
  };

  // Use Modal for better presentation and handling outside clicks
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible && !isAppearanceVisible}
        onRequestClose={onClose} // Allows closing with back button on Android
      >
        <BlurView
          intensity={colorScheme === "dark" ? 0 : 10}
          tint="light"
          style={styles.overlay}
        >
          {/* Touchable overlay to close the menu when clicking outside */}
          <TouchableOpacity
            style={styles.touchableOverlay}
            activeOpacity={1}
            onPress={onClose}
          />

          <SafeAreaView
            style={[
              styles.menuContainer,
              colorScheme === "dark"
                ? styles.menuContainerDark
                : styles.menuContainerLight,
            ]}
          >
            {/* Header inside the menu if needed, or just items */}
            <View style={styles.menuContent}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={showAppearance}
              >
                <Text
                  style={[
                    styles.menuText,
                    colorScheme === "dark"
                      ? styles.menuTextDark
                      : styles.menuTextLight,
                  ]}
                >
                  Appearance
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#888" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text
                  style={[
                    styles.menuText,
                    colorScheme === "dark"
                      ? styles.menuTextDark
                      : styles.menuTextLight,
                  ]}
                >
                  Insights
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text
                  style={[
                    styles.menuText,
                    colorScheme === "dark"
                      ? styles.menuTextDark
                      : styles.menuTextLight,
                  ]}
                >
                  Settings
                </Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity style={styles.menuItem}>
                <Text
                  style={[
                    styles.menuText,
                    colorScheme === "dark"
                      ? styles.menuTextDark
                      : styles.menuTextLight,
                  ]}
                >
                  Report a problem
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Text style={[styles.menuText, styles.logoutText]}>
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
      <Modal
        animationType="none"
        transparent={true}
        visible={isAppearanceVisible}
        onRequestClose={closeAppearance} // Allows closing with back button on Android
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.touchableOverlay}
            activeOpacity={1}
            onPress={closeAppearance}
          />
          <View
            style={[
              styles.appearanceContainer,
              colorScheme === "dark"
                ? styles.appearanceContainerDark
                : styles.appearanceContainerLight,
            ]}
          >
            <View style={styles.appearanceHeader}>
              <Pressable
                onPress={closeAppearance}
                style={styles.appearanceBackButton}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </Pressable>
              <Text
                style={[
                  styles.appearanceText,
                  colorScheme === "dark"
                    ? styles.appearanceTextDark
                    : styles.appearanceTextLight,
                ]}
              >
                Appearance
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={[
                  styles.appearanceButton,
                  colorScheme === "dark"
                    ? styles.appearanceButtonDark
                    : {
                        backgroundColor: "#888",
                      },
                ]}
                onPress={() => {
                  Appearance.setColorScheme("light");
                }}
              >
                <Ionicons
                  name="sunny"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </Pressable>
              <Pressable
                style={[
                  styles.appearanceButton,
                  colorScheme === "dark"
                    ? {
                        backgroundColor: "#888",
                      }
                    : styles.appearanceButtonLight,
                ]}
                onPress={() => {
                  Appearance.setColorScheme("dark");
                }}
              >
                <Ionicons
                  name="moon"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </Pressable>
              <Pressable
                style={[
                  styles.appearanceButton,
                  !["dark", "light"].includes(Appearance.getColorScheme() || "")
                    ? {
                        backgroundColor: "#888",
                      }
                    : colorScheme === "dark"
                    ? styles.appearanceButtonDark
                    : styles.appearanceButtonLight,
                ]}
                onPress={() => {
                  Appearance.setColorScheme(undefined);
                }}
              >
                <Text
                  style={[
                    styles.appearanceText,
                    colorScheme === "dark"
                      ? styles.appearanceTextDark
                      : styles.appearanceTextLight,
                  ]}
                >
                  Auto
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // The BlurView replaces the semi-transparent background
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: "relative",
  },
  touchableOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Ensure this overlay doesn't block interaction with the menu itself
    // It's placed behind the menu container implicitly due to order or explicitly with zIndex if needed
  },
  menuContainer: {
    position: "absolute",
    top: 60, // Position below the header
    left: 10,
    width: "75%", // Adjust width as needed
    maxWidth: 320,
    borderRadius: 15, // Rounded corners like the screenshot
    paddingVertical: 5, // Reduced vertical padding
    paddingHorizontal: 0, // Padding handled by items
    shadowColor: "#000",
    shadowOpacity: 0.15,
    overflow: "hidden", // Ensure content respects border radius
  },
  menuContainerLight: {
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    shadowRadius: 10,
  },
  menuContainerDark: {
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#202020",
  },
  menuContent: {
    paddingVertical: 10, // Inner padding for the content block
    paddingHorizontal: 15, // Inner horizontal padding
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16, // Slightly increased vertical padding for items
    paddingHorizontal: 5, // Horizontal padding within the content block
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
  menuTextLight: {
    color: "black",
  },
  menuTextDark: {
    color: "white",
  },
  logoutText: {
    color: "#FF3B30", // iOS-like red color
  },
  separator: {
    height: StyleSheet.hairlineWidth, // Thinner separator
    backgroundColor: "#D1D1D6", // Lighter separator color
    marginVertical: 8,
    marginHorizontal: -15, // Extend separator to edges if needed, adjust based on menuContent padding
  },
  appearanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    position: "absolute",
    top: 60,
    left: 10,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
  appearanceContainerLight: {
    backgroundColor: "white",
    borderColor: "#ccc",
  },
  appearanceContainerDark: {
    backgroundColor: "#101010",
    borderColor: "#333",
  },
  appearanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    padding: 10,
    paddingBottom: 30,
    position: "relative",
    justifyContent: "center",
  },
  appearanceBackButton: {
    position: "absolute",
    top: 10,
    left: 0,
  },
  appearanceButton: {
    padding: 10,
    borderRadius: 10,
  },
  appearanceButtonLight: {
    backgroundColor: "white",
  },
  appearanceButtonDark: {
    backgroundColor: "#101010",
  },
  appearanceText: {
    fontSize: 16,
    fontWeight: "500",
  },
  appearanceTextLight: {
    color: "black",
  },
  appearanceTextDark: {
    color: "white",
  },
});

export default SideMenu;
