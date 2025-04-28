import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  useColorScheme,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { AuthContext } from "../_layout";
import SideMenu from "@/components/SideMenu";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();

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
          source={require("../../assets/images/react-logo.png")}
          style={styles.logo}
        />
        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </View>
      <View
        style={[
          styles.searchBarArea,
          colorScheme === "dark"
            ? styles.searchBarAreaDark
            : styles.searchBarAreaLight,
        ]}
      >
        <View
          style={[
            styles.searchBar,
            colorScheme === "dark"
              ? styles.searchBarDark
              : styles.searchBarLight,
          ]}
        >
          <Ionicons
            name="search"
            size={24}
            color={colorScheme === "dark" ? "gray" : "black"}
          />
          <TextInput
            style={[
              styles.searchInput,
              colorScheme === "dark"
                ? styles.searchInputDark
                : styles.searchInputLight,
            ]}
            placeholder="Search"
            placeholderTextColor={colorScheme === "dark" ? "gray" : "black"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 32,
    height: 32,
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
  searchBarArea: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  searchBarAreaLight: {
    backgroundColor: "white",
  },
  searchBarAreaDark: {
    backgroundColor: "#202020",
  },
  searchBar: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  searchBarLight: {
    backgroundColor: "white",
  },
  searchBarDark: {
    backgroundColor: "black",
    color: "white",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#aaa",
  },
  searchInput: {
    marginLeft: 10,
  },
  searchInputLight: {
    color: "black",
  },
  searchInputDark: {
    color: "white",
  },
});
