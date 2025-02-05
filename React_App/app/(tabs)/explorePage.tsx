import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Modal, 
  ActivityIndicator, 
  SafeAreaView 
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants"; 
import axios from "axios";
import ItemDetail from "./ItemDetail";
import AddItemForm from "./AddItemForm";

const ExplorePage: React.FC = () => {
  const [rdata, setRdata] = useState<any[]>([]);  // To store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({}); // Track liked items
  const [selectedItem, setSelectedItem] = useState<any>(null); // Track selected item
  const [isFormVisible, setIsFormVisible] = useState(false); // Track form visibility

  // const BASE_URL = Constants.manifest?.extra?.BASE_URL; // Access BASE_URL from manifest
  const BASE_URL = process.env.BASE_URL || 'http://192.168.31.99:3000';  // Fallback to localhost for local development


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getAllPosts`);
        // Ensure response is in expected format
        if (Array.isArray(response.data.data)) {
          setRdata(response.data.data);
        } else {
          throw new Error("Unexpected data format from API");
        }
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
      {item?.images?.[0]?.image_url ? (
        <>
        <Image
          source={{ uri: `http://192.168.31.99:3000/uploads/${item.images[0].image_url}` }}
          style={styles.thumbnail}
        />
        </>
      ) : (
        <View style={[styles.thumbnail, styles.missingImage]}>
          <Text style={styles.missingImageText}>No Image</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => toggleLike(item.post_id)}
      >
        <Icon
          name={likedItems[item.post_id] ? "heart" : "heart-outline"}
          size={24}
          color={likedItems[item.post_id] ? "red" : "#FFF"}
        />
      </TouchableOpacity>
      <Text style={styles.thumbnailTitle}>{item.title || "Untitled"}</Text>
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {selectedItem ? (
          <ItemDetail item={selectedItem} />
        ) : (
          <>
            <FlatList
              data={rdata}
              renderItem={renderThumbnail}
              keyExtractor={(item) => item.post_id.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7ecdb',
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
  flatListContainer: {
    paddingBottom: 60, // Adjust as needed for bottom spacing
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
  missingImage: {
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
  },
  missingImageText: {
    color: "#666",
    fontSize: 12,
  },
});

export default ExplorePage;
