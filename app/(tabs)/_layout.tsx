import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "index") {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === "search") {
            return <Ionicons name="search" size={size} color={color} />;
          } else if (route.name === "add") {
            return (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            );
          } else if (route.name === "activity") {
            return <Ionicons name="heart-outline" size={size} color={color} />;
          } else if (route.name === "[username]") {
            return <Ionicons name="person-outline" size={size} color={color} />;
          }
          return null;
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#222",
        tabBarInactiveTintColor: "#bbb",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "홈" }} />
      <Tabs.Screen name="search" options={{ title: "검색" }} />
      <Tabs.Screen
        name="add"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
          },
        })}
        options={{
          title: "추가",
        }}
      />
      <Tabs.Screen name="activity" options={{ title: "좋아요" }} />
      <Tabs.Screen name="[username]" options={{ title: "프로필" }} />
    </Tabs>
  );
}
