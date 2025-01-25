import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const LeaderboardPage: React.FC = () => {
  // Static user data
  const users = [
    { id: "1", name: "Alice", likes: 25 },
    { id: "2", name: "Bob", likes: 10 },
    { id: "3", name: "Charlie", likes: 15 },
    { id: "4", name: "David", likes: 5 },
  ];

  // Sort users by likes in increasing order
  const sortedUsers = users.sort((a, b) => b.likes - a.likes);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={sortedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.userName}>{item.name}</Text>
            <View style={styles.likeContainer}>
              <Text style={styles.likes}>{item.likes}</Text>
              <Icon name="heart" size={20} color="red" style={styles.heartIcon} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5, // Spacing between the number and the heart
  },
  heartIcon: {
    marginLeft: 5,
  },
});

export default LeaderboardPage;
