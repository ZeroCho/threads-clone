import { Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const { username } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
  );
}
