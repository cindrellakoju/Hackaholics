import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

function Images({ imageSource, classification, onClose }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clicked Image</Text>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.classificationText}>Classification: {classification}</Text>
      <Button title="Close" onPress={onClose} color="#e74c3c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: "80%",
    height: 400,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    marginBottom: 20,
  },
  classificationText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Images;
