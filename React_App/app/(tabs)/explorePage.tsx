import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ItemDetail from "./ItemDetail";
import AddItemForm from "./AddItemForm"

const dummyData = [
    {
      id: "1",
      title: "Beautiful Sunset",
      thumbnail: "https://i.pinimg.com/736x/56/83/d3/5683d38a27a38b270866c4c0441f1006.jpg",
      description: "A breathtaking sunset at the beach.",
      images: [
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQiX1vaoWWbfHRBS-iVYzwFNgUJ7WcjzO_GBXufRHoRW4bi9YLS-YZnZmBx1CXzQSGXkIJEZozD_P-YOUrijreo5Q",
        "https://files.worldwildlife.org/wwfcmsprod/images/Tiger_resting_Bandhavgarh_National_Park_India/hero_small/6aofsvaglm_Medium_WW226365.jpg",
      ],
      videoLink: "https://www.example.com/video1",
      username: "johndoe",
    },
    {
      id: "2",
      title: "Mountain View",
      thumbnail: "https://via.placeholder.com/150/6495ED",
      description: "A beautiful view from the mountain top.",
      images: [
        "https://via.placeholder.com/500/6495ED",
        "https://via.placeholder.com/500/228B22",
        "https://via.placeholder.com/500/DC143C",
      ],
      videoLink: "https://www.example.com/video2",
      username: "janedoe", // Added username
    },
    {
      id: "3",
      title: "Forest Adventure",
      thumbnail: "https://via.placeholder.com/150/228B22",
      description: "Explore the lush green forests.",
      images: [
        "https://via.placeholder.com/500/228B22",
        "https://via.placeholder.com/500/DC143C",
        "https://via.placeholder.com/500/6495ED",
      ],
      videoLink: "https://www.example.com/video3",
      username: "naturelover", // Added username
    },
  ];
  

const ExplorePage: React.FC = () => {
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Track form visibility

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

  return (
    <View style={styles.container}>
      {selectedItem ? (
        <ItemDetail item={selectedItem} />
      ) : (
        <>
          <FlatList
            data={dummyData}
            renderItem={renderThumbnail}
            keyExtractor={(item) => item.id}
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
              onClose={() => setIsFormVisible(false)}  onAddItem={() => setIsFormVisible(false)}// Close modal on form submission or cancel
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
});

export default ExplorePage;
