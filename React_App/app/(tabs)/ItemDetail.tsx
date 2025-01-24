import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

interface ItemDetailProps {
  item: any;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

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

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Images (55% Height and 80% Width) */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
        {item.images.map((image: string, index: number) => (
          <Image
            key={index}
            source={{ uri: image }}
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
        <TouchableOpacity style={styles.heartIcon}>
          <Icon name="heart" size={30} color="red" />
        </TouchableOpacity>
        <Text style={styles.likeCount}>10 Likes</Text>
      </View>

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
    marginBottom: 16,
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
