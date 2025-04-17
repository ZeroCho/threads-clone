import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
const FEED_DATA = [
  {
    id: "1",
    user: "mk_lobb",
    time: "12시간",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    content:
      "오 그래 넌 정상적인 금액에 신경쓰지, 그냥 몇 년 동안 통화하지 않았어도 네 생일 알릴 수 있는 핸드폰을 설정해 놓았고 네 부모님은 건강하시고 네가 그 직업을 얻었으면 좋겠고 누군가가 널 사랑해 주길 바란다 당신이 받을 자격이 있는 방식 하하",
    image: null,
    likes: 12,
    comments: 1,
    shares: 2,
  },
  {
    id: "2",
    user: "trendspider",
    time: "23시간",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    content:
      "How low can you go? SPX\n\uD83D\uDCC8 market breadth symbols: trendspider.com",
    image: "https://i.imgur.com/4M34hi2.png",
    likes: 18,
    comments: 1,
    shares: 4,
  },
  {
    id: "3",
    user: "chronicallybrenna",
    time: "4시간",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    content: "Guess who went book shopping today :주황색_하트::반짝이는_하트:",
    image: "https://i.imgur.com/8Km9tLL.jpg",
    likes: 9,
    comments: 0,
    shares: 1,
  },
];
function FeedCard({ item }: { item: (typeof FEED_DATA)[0] }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Feather name="more-horizontal" size={20} color="#888" />
      </View>
      <Text style={styles.content}>{item.content}</Text>
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.feedImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.cardFooter}>
        <View style={styles.iconRow}>
          <AntDesign name="hearto" size={18} color="#222" style={styles.icon} />
          <Text style={styles.iconText}>{item.likes}</Text>
          <Feather
            name="message-circle"
            size={18}
            color="#222"
            style={styles.icon}
          />
          <Text style={styles.iconText}>{item.comments}</Text>
          <Feather name="repeat" size={18} color="#222" style={styles.icon} />
          <Text style={styles.iconText}>{item.shares}</Text>
        </View>
      </View>
    </View>
  );
}
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 버튼 */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.topButtonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.topButton, styles.topButtonActive]}>
          <Text style={[styles.topButtonText, { color: "#fff" }]}>
            앱 다운로드
          </Text>
        </TouchableOpacity>
      </View>
      {/* 피드 */}
      <FlatList
        data={FEED_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedCard item={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F1F6",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#F3F1F6",
  },
  topButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  topButtonActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  topButtonText: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222",
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  content: {
    fontSize: 15,
    color: "#222",
    marginBottom: 8,
  },
  feedImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
    marginLeft: 10,
  },
  iconText: {
    fontSize: 14,
    color: "#222",
    marginRight: 6,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});
