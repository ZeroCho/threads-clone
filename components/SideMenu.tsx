import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
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

  const handleLogout = () => {
    logout?.();
    onClose(); // Close the menu after logout
    // Optionally navigate to login screen or home screen
    // e.g., using router.replace('/login');
  };

  // Use Modal for better presentation and handling outside clicks
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose} // Allows closing with back button on Android
    >
      <BlurView intensity={10} tint="light" style={styles.overlay}>
        {/* Touchable overlay to close the menu when clicking outside */}
        <TouchableOpacity
          style={styles.touchableOverlay}
          activeOpacity={1}
          onPress={onClose}
        />

        <SafeAreaView style={styles.menuContainer}>
          {/* Header inside the menu if needed, or just items */}
          <View style={styles.menuContent}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Appearance</Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Insights</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Report a problem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={[styles.menuText, styles.logoutText]}>Log out</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BlurView>
    </Modal>
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
    backgroundColor: "#fff",
    borderRadius: 15, // Rounded corners like the screenshot
    paddingVertical: 5, // Reduced vertical padding
    paddingHorizontal: 0, // Padding handled by items
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    overflow: "hidden", // Ensure content respects border radius
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
    color: "#1C1C1E", // Darker text color
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
});

export default SideMenu;
