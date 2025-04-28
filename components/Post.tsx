import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Share,
  useColorScheme,
  Image,
} from "react-native";

export interface Post {
  id: string;
  username: string;
  displayName: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  reposts: number;
  isVerified?: boolean;
  avatar?: string;
  image?: string;
  location?: [number, number];
}

export interface DetailedPost extends Post {
  // Post의 필드들: id, username, displayName, content, timeAgo, likes, comments, reposts, isVerified?, avatar?, image?
  isLiked?: boolean; // isLiked 추가
  shares?: number; // shares 추가
}

export default function Post({ item }: { item: Post }) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  // 공유 기능 핸들러
  const handleShare = async (username: string, postId: string) => {
    const shareUrl = `thread://@${username}/post/${postId}`;
    try {
      await Share.share({
        message: shareUrl,
        url: shareUrl, // iOS에서는 url도 함께 전달하는 것이 좋습니다.
      });
    } catch (error) {
      console.error("Error sharing post:", error);
      // 사용자에게 오류 메시지를 표시할 수도 있습니다.
    }
  };

  // 게시글 클릭 핸들러 수정
  const handlePostPress = (post: Post) => {
    // DetailedPost 타입에 맞게 데이터 변환 (isLiked, shares는 상세 화면에서 관리)
    const detailedPost: DetailedPost = {
      ...post,
      // isLiked, shares 는 PostScreen 에서 초기화하거나 API 응답으로 받아와야 함
      // 여기서는 기본값 또는 undefined 로 설정
      isLiked: false, // 예시: 기본값 false
      shares: 0, // 예시: 기본값 0
    };
    router.push(`/@${post.username}/post/${post.id}`);
  };

  // 사용자 정보 클릭 핸들러 (아바타 또는 이름)
  const handleUserPress = (post: Post) => {
    router.push(`/@${post.username}`);
  };

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => handlePostPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => handleUserPress(item)}>
            {item.avatar ? (
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person-circle" size={40} color="#ccc" />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.usernameContainer}>
            <TouchableOpacity onPress={() => handleUserPress(item)}>
              <View style={styles.usernameRow}>
                <Text
                  style={[
                    styles.username,
                    colorScheme === "dark"
                      ? styles.usernameDark
                      : styles.usernameLight,
                  ]}
                >
                  {item.username}
                </Text>
                {item.isVerified && (
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color="#0095F6"
                    style={styles.verifiedIcon}
                  />
                )}
                <Text
                  style={[
                    styles.timeAgo,
                    colorScheme === "dark"
                      ? styles.timeAgoDark
                      : styles.timeAgoLight,
                  ]}
                >
                  {item.timeAgo}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Feather name="more-horizontal" size={16} color="#888" />
        </View>
      </View>

      <View style={styles.postContent}>
        <Text
          style={[
            styles.postText,
            colorScheme === "dark" ? styles.postTextDark : styles.postTextLight,
          ]}
        >
          {item.content}
        </Text>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}
        {item.location && item.location.length > 0 && (
          <Text style={styles.postText}>{item.location.join(", ")}</Text>
        )}
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="heart" size={20} color="#666" />
          {item.likes > 0 && (
            <Text style={styles.actionCount}>{item.likes}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="message-circle" size={20} color="#666" />
          {item.comments > 0 && (
            <Text style={styles.actionCount}>{item.comments}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="repeat" size={20} color="#666" />
          {item.reposts > 0 && (
            <Text style={styles.actionCount}>{item.reposts}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShare(item.username, item.id)}
        >
          <Feather name="send" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // 포스트 스타일
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 12,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameContainer: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: "600",
    fontSize: 15,
    marginRight: 4,
  },
  usernameDark: {
    color: "white",
  },
  usernameLight: {
    color: "#000",
  },
  verifiedIcon: {
    marginRight: 4,
  },
  timeAgo: {
    fontSize: 14,
    marginLeft: 4,
  },
  timeAgoDark: {
    color: "#ccc",
  },
  timeAgoLight: {
    color: "#888",
  },
  postContent: {
    marginLeft: 52,
  },
  postText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 8,
  },
  postTextDark: {
    color: "white",
  },
  postTextLight: {
    color: "#000",
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginTop: 8,
  },
  postActions: {
    flexDirection: "row",
    marginLeft: 52,
    marginTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionCount: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
});
