import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  useColorScheme,
  Pressable,
  Image,
  Text,
} from "react-native";

export interface ActivityItemProps {
  id: string;
  username: string;
  otherCount?: number;
  timeAgo: string;
  content: string;
  type: string;
  link?: string;
  reply?: string;
  likes?: number;
  actionButton?: React.ReactNode;
  avatar: string;
  postId?: string;
}

export default function ActivityItem({
  id,
  username,
  otherCount,
  timeAgo,
  content,
  type,
  link,
  reply,
  likes,
  actionButton,
  avatar,
  postId,
}: ActivityItemProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  let iconColor = "#FF3B30";
  let iconName: any = "heart";
  let IconComponent: any = FontAwesome;

  if (type === "follow" || type === "followed") {
    iconColor = "#FF9500";
    iconName = "person";
    IconComponent = Ionicons;
  } else if (type === "mention") {
    iconColor = "#FF3B30";
    iconName = "at";
    IconComponent = FontAwesome;
  } else if (type === "reply") {
    iconColor = "#007AFF";
    iconName = "reply";
    IconComponent = FontAwesome;
  } else if (type === "quote") {
    iconColor = "#007AFF";
    iconName = "quote-left";
    IconComponent = FontAwesome;
  } else if (type === "repost") {
    iconColor = "#007AFF";
    iconName = "retweet";
    IconComponent = FontAwesome;
  }

  // 알림 항목 클릭 시 이동 로직
  const handleItemPress = () => {
    if (type === "follow" || type === "followed") {
      // 팔로우/팔로워 알림은 프로필로 이동
      router.push(`/${username}`);
    } else if (postId) {
      // 나머지 알림은 게시글로 이동 (postId가 있는 경우)
      router.push(`/${username}/post/${postId}`);
    } else {
      // postId가 없는 경우 (예: mention 등 특정 타입) 프로필로 이동하거나 다른 처리
      console.log(
        `No postId for activity type: ${type}, navigating to profile`
      );
      router.push(`/${username}`);
    }
  };

  // 프로필 사진 클릭 시 이동 로직
  const handleAvatarPress = () => {
    router.push(`/${username}`);
  };

  return (
    <Pressable onPress={handleItemPress} style={styles.activityItemContainer}>
      {/* Avatar + Icon Container */}
      <Pressable onPress={handleAvatarPress} style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
          <IconComponent name={iconName} size={12} color="white" />
        </View>
      </Pressable>

      {/* Content Container */}
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text
            style={[
              styles.username,
              colorScheme === "dark"
                ? styles.usernameDark
                : styles.usernameLight,
            ]}
          >
            {username}
          </Text>
          {otherCount && <Text style={styles.otherCount}>+{otherCount}명</Text>}
          <Text
            style={[
              styles.timeAgo,
              colorScheme === "dark" ? styles.timeAgoDark : styles.timeAgoLight,
            ]}
          >
            {timeAgo}
          </Text>
        </View>

        {type === "followed" ? (
          <Text
            style={[
              styles.activityText,
              colorScheme === "dark"
                ? styles.activityTextDark
                : styles.activityTextLight,
            ]}
          >
            Followed you
          </Text>
        ) : (
          <Text
            numberOfLines={2}
            style={[
              styles.activityText,
              colorScheme === "dark"
                ? styles.activityTextDark
                : styles.activityTextLight,
            ]}
          >
            {content}
          </Text>
        )}

        {link && (
          <View style={styles.linkContainer}>
            <FontAwesome name="link" size={14} color="#007AFF" />
            <Text style={styles.linkText}>{link}</Text>
          </View>
        )}

        {reply && (
          <View style={styles.replyContainer}>
            <Text
              style={[
                styles.replyText,
                colorScheme === "dark"
                  ? styles.replyTextDark
                  : styles.replyTextLight,
              ]}
            >
              {reply}
            </Text>
          </View>
        )}

        <View style={styles.activityFooter}>
          {likes !== undefined && (
            <View style={styles.likesContainer}>
              <FontAwesome name="heart" size={12} color="#FF3B30" />
              <Text style={styles.likesText}>{likes}</Text>
            </View>
          )}
          {actionButton && actionButton}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activityItemContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "flex-start",
  },
  avatarContainer: {
    marginRight: 12,
    position: "relative",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: "#fff",
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 4,
  },
  usernameDark: {
    color: "white",
  },
  usernameLight: {
    color: "black",
  },
  otherCount: {
    fontSize: 14,
    marginRight: 4,
  },
  otherCountDark: {
    color: "white",
  },
  otherCountLight: {
    color: "#888",
  },
  timeAgo: {
    fontSize: 14,
    color: "#888",
  },
  timeAgoDark: {
    color: "white",
  },
  timeAgoLight: {
    color: "#888",
  },
  activityText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 18,
  },
  activityTextDark: {
    color: "#ccc",
  },
  activityTextLight: {
    color: "#333",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
  },
  linkText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#007AFF",
    flexShrink: 1,
  },
  replyContainer: {
    marginTop: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#ddd",
    paddingLeft: 8,
  },
  replyText: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
  },
  replyTextDark: {
    color: "#ccc",
  },
  replyTextLight: {
    color: "#555",
  },
  activityFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  likesText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#FF3B30",
  },
  followBackButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: "auto",
  },
  followButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
