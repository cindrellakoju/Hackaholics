import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

interface ItemDetailProps {
  item: {
    title: string;
    images: { image_url: string }[]; // Updated to reflect the correct data structure
    videoLink: string;
    description: string;
    username: string;
  };
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(10); // Default like count (can be dynamic)

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [navigation]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Images */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
        {item.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: `http://192.168.31.99:3000/uploads/${image.image_url} `}} 
            style={{
              width: screenWidth * 0.8, // 80% of the screen width
              height: screenHeight * 0.55, // 55% of the screen height
              marginRight: 10,
              borderRadius: 12,
            }}
          />
        ))}
      </ScrollView>

      {/* Like Button & Like Count */}
      <View style={styles.likeContainer}>
        <TouchableOpacity style={styles.heartIcon} onPress={handleLike}>
          <Icon name="heart" size={30} color={liked ? "red" : "gray"} />
        </TouchableOpacity>
        <Text style={styles.likeCount}>{likeCount} Likes</Text>
      </View>

      {/* Username */}
      <Text style={styles.username}>Posted by: {item.username}</Text>

      {/* Video Link */}
      <Text style={styles.videoLink}>
        <Text style={styles.label}>Video Link: </Text>
        <Text>{item.videoLink}</Text>
      </Text>

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  imageContainer: {
    marginBottom: 16,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginTop: -10,
  },
  heartIcon: {
    padding: 10,
  },
  likeCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  username: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 16,
  },
  videoLink: {
    marginVertical: 16,
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 12,
  },
});

export default ItemDetail;