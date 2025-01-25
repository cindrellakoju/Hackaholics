import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Define the type for the user data
interface User {
  id: string;
  name: string;
  likes: number[];
  like_count: number;
}

const LeaderboardPage: React.FC = () => {
  // State for storing user data
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.31.99:3000/getUsersWithLikes'); // Replace with actual API endpoint
        const data = await response.json();
        console.log(data);
        if (data.success) {
          // Assuming the API response contains the users' data
          const fetchedUsers = data.data.map((user: any) => ({
            id: String(user.user_id),
            name: user.name,
            likes: user.total_likes,
            like_count: user.total_likes,
          }));
          setUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sort users by likes in increasing order
  const sortedUsers = users.sort((a, b) => b.like_count - a.like_count);
  console.log(sortedUsers);

  if (loading) {
    return <Text>Loading...</Text>; // Loading state while fetching data
  }

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
              <Text style={styles.likes}>{item.like_count}</Text>
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
