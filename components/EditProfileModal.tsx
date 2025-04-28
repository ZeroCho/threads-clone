import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext, type User } from "@/app/_layout";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  initialProfileData: User;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  initialProfileData,
}) => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(initialProfileData?.name || "");
  const [description, setDescription] = useState(
    initialProfileData?.description || ""
  );
  const [link, setLink] = useState(initialProfileData?.link || "");
  const [showInstagramBadge, setShowInstagramBadge] = useState(
    initialProfileData?.showInstagramBadge || false
  );
  const [isPrivate, setIsPrivate] = useState(
    initialProfileData?.isPrivate || false
  );
  const [isSaving, setIsSaving] = useState(false);
  const [editingField, setEditingField] = useState<"bio" | "link" | null>(null);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    if (visible && initialProfileData) {
      setName(initialProfileData.name);
      setDescription(initialProfileData.description);
      setLink(initialProfileData.link || "");
      setShowInstagramBadge(initialProfileData.showInstagramBadge || false);
      setIsPrivate(initialProfileData.isPrivate || false);
    } else if (!visible) {
      setEditingField(null);
      setTempValue("");
    }
  }, [visible, initialProfileData]);

  const handleSave = async () => {
    if (!initialProfileData?.name) {
      console.error("Cannot save profile without a username.");
      return;
    }

    setIsSaving(true);
    try {
      await updateUser?.({
        id: initialProfileData.id,
        name: initialProfileData.name,
        description,
        link,
        showInstagramBadge,
        isPrivate,
        profileImageUrl: initialProfileData.profileImageUrl,
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!isSaving) {
      if (editingField) {
        setEditingField(null);
        setTempValue("");
      } else {
        if (initialProfileData) {
          setName(initialProfileData.name);
          setDescription(initialProfileData.description);
          setLink(initialProfileData.link || "");
          setShowInstagramBadge(initialProfileData.showInstagramBadge || false);
          setIsPrivate(initialProfileData.isPrivate || false);
        }
        onClose();
      }
    }
  };

  const handleEditBio = () => {
    setEditingField("bio");
    setTempValue(description);
  };

  const handleEditLink = () => {
    setEditingField("link");
    setTempValue(link);
  };

  const handleConfirmEdit = () => {
    if (editingField === "bio") {
      setDescription(tempValue);
    } else if (editingField === "link") {
      setLink(tempValue);
    }
    setEditingField(null);
    setTempValue("");
  };

  const renderEditFieldView = () => {
    const isBio = editingField === "bio";
    const title = isBio ? "Bio" : "Link";
    const placeholder = isBio ? "Write a bio" : "Add link";

    return (
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity
            onPress={handleConfirmEdit}
            style={styles.headerButton}
          >
            <Text style={[styles.headerButtonText, styles.doneButton]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editingContentContainer}>
          <TextInput
            style={isBio ? styles.textInputBioLarge : styles.textInputLinkLarge}
            value={tempValue}
            onChangeText={setTempValue}
            placeholder={placeholder}
            placeholderTextColor="#ccc"
            multiline={isBio}
            autoCapitalize={isBio ? "sentences" : "none"}
            keyboardType={isBio ? "default" : "url"}
            autoFocus
          />
        </View>
      </View>
    );
  };

  const renderMainProfileView = () => (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        {isSaving ? (
          <View style={styles.headerButtonPlaceholder} />
        ) : (
          <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Edit profile</Text>
        {isSaving ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="small" color="#888" />
          </View>
        ) : (
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Text style={[styles.headerButtonText, styles.doneButton]}>
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={[styles.section, styles.nameSection]}>
          <View style={styles.sectionText}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.nameRow}>
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color="#888"
                style={styles.lockIcon}
              />
              <Text
                style={styles.valueText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name} (@{initialProfileData?.id || "..."})
              </Text>
            </View>
          </View>
          <Image
            source={require("../assets/images/react-logo.png")}
            style={styles.profilePic}
          />
        </View>

        <TouchableOpacity onPress={handleEditBio} style={styles.section}>
          <View style={styles.sectionTextFull}>
            <Text style={styles.label}>Bio</Text>
            <Text
              style={[
                styles.tappableText,
                !description && styles.placeholderText,
              ]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {description || "Write a bio..."}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#ccc"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEditLink} style={styles.section}>
          <View style={styles.sectionTextFull}>
            <Text style={styles.label}>Link</Text>
            <Text
              style={[
                styles.tappableText,
                styles.linkText,
                !link && styles.placeholderText,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {link || "Add link..."}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#ccc"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.switchSection}>
          <View style={styles.switchTextContainer}>
            <Text style={styles.labelSwitch}>Show Instagram badge</Text>
            <Text style={styles.description}>
              When turned on, the Threads badge on your Instagram profile will
              also appear.
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E9E9EA", true: "#34C759" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#E9E9EA"
            onValueChange={setShowInstagramBadge}
            value={showInstagramBadge}
            style={styles.switch}
          />
        </View>

        <View style={styles.dividerThin} />

        <View style={styles.switchSection}>
          <View style={styles.switchTextContainer}>
            <Text style={styles.labelSwitch}>Private profile</Text>
            <Text style={styles.description}>
              If you switch to private, you won't be able to reply to others
              unless they follow you.
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#E9E9EA", true: "#34C759" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#E9E9EA"
            onValueChange={setIsPrivate}
            value={isPrivate}
            style={styles.switch}
          />
        </View>
        <View style={styles.dividerThin} />
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <SafeAreaView style={styles.safeArea}>
        {editingField ? renderEditFieldView() : renderMainProfileView()}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#f8f8f8",
    height: 55,
  },
  headerButton: {
    padding: 8,
    minWidth: 60,
    alignItems: "center",
  },
  headerButtonPlaceholder: {
    minWidth: 60,
    padding: 8,
  },
  activityIndicatorContainer: {
    minWidth: 60,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonText: {
    fontSize: 17,
    color: "#000",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  doneButton: {
    fontWeight: "600",
    color: "#000",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
  },
  editingContentContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  nameSection: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sectionText: {
    flex: 1,
    marginRight: 16,
  },
  sectionTextFull: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
  labelSwitch: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  lockIcon: {
    marginRight: 6,
  },
  valueText: {
    fontSize: 16,
    color: "#555",
    flexShrink: 1,
  },
  tappableText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    paddingVertical: Platform.OS === "ios" ? 4 : 2,
  },
  linkText: {
    color: "#007AFF",
  },
  placeholderText: {
    color: "#ccc",
    fontStyle: "italic",
  },
  chevronIcon: {
    marginLeft: "auto",
  },
  textInputBioLarge: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
    padding: 8,
    lineHeight: 22,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  textInputLinkLarge: {
    fontSize: 16,
    color: "#007AFF",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    maxHeight: 100,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e8e8e8",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d0d0d0",
  },
  divider: {
    height: 12,
    backgroundColor: "#f8f8f8",
  },
  dividerThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  switchSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  switchTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    lineHeight: 18,
  },
  switch: {
    transform: Platform.OS === "ios" ? [] : [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

export default EditProfileModal;
