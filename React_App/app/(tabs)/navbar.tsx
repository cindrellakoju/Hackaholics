import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ExplorePage from "./explorePage";
import BooksPage from "./books/BookPage";
import LeaderboardPage from "./leaderboard/LeaderboardPage";
import UserInfo from "./usersinfo/UserInfo"

const BottomNavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Explore");

  const tabs = [
    { name: "Explore", icon: "compass-outline" },
    { name: "Books", icon: "book-outline" },
    { name: "Camera", icon: "camera-outline" },
    { name: "Leaderboard", icon: "trophy-outline" },
    { name: "User Info", icon: "person-outline" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {activeTab === "Explore" && <ExplorePage />}
        {activeTab === "Books" && <BooksPage />}
        {activeTab === "Leaderboard" && <LeaderboardPage />}
        {activeTab === "User Info" && <UserInfo />} {/* Show UserInfo component */}
        {activeTab !== "Explore" &&
          activeTab !== "Books" &&
          activeTab !== "Leaderboard" &&
          activeTab !== "User Info" && (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>{activeTab} Page</Text>
            </View>
          )}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.container}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => setActiveTab(tab.name)}
          >
            <View style={styles.iconContainer}>
              <Icon
                name={tab.icon}
                size={24}
                color={activeTab === tab.name ? "#6200EE" : "#888"}
              />
            </View>
            <Text
              style={[
                styles.label,
                { color: activeTab === tab.name ? "#6200EE" : "#888" },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#DDD",
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  placeholderText: {
    fontSize: 18,
    color: "#666",
  },
});

export default BottomNavBar;
