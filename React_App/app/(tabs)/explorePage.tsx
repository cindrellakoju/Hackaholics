import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants"; // Import Constants
import axios from "axios";
import ItemDetail from "./ItemDetail";
import AddItemForm from "./AddItemForm";

const ExplorePage: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // To store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Track form visibility

  const BASE_URL = Constants.manifest?.extra?.BASE_URL; // Access BASE_URL from manifest

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getAllPosts`); // Fetch data from backend
        setData(response.data); // Assuming the API returns an array of posts
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [BASE_URL]);

  const toggleLike = (id: string) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderThumbnail = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.thumbnailContainer}
      onPress={() => setSelectedItem(item)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <TouchableOpacity style={styles.heartIcon} onPress={() => toggleLike(item.id)}>
        <Icon name={likedItems[item.id] ? "heart" : "heart-outline"} size={24} color={likedItems[item.id] ? "red" : "#FFF"} />
      </TouchableOpacity>
      <Text style={styles.thumbnailTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedItem ? (
        <ItemDetail item={selectedItem} />
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={renderThumbnail}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsFormVisible(true)} // Open form modal
          >
            <Icon name="add" size={30} color="#FFF" />
          </TouchableOpacity>
          <Modal
            visible={isFormVisible}
            transparent={false}
            animationType="slide"
            onRequestClose={() => setIsFormVisible(false)} // Close modal on request
          >
            <AddItemForm
              onClose={() => setIsFormVisible(false)}
              onAddItem={() => setIsFormVisible(false)} // Close modal on form submission or cancel
            />
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  thumbnailContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: Dimensions.get("window").width / 2.5,
    resizeMode: "cover",
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  thumbnailTitle: {
    padding: 8,
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExplorePage;
