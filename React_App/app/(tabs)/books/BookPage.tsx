import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BooksPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>
        "The only limit to our realization of tomorrow is our doubts of today."
      </Text>
      <Text style={styles.director}>- Franklin D. Roosevelt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 30, // Increased padding for better spacing
  },
  quote: {
    fontSize: 18, // Slightly larger text size
    fontStyle: "italic",
    textAlign: "center",
    color: "#333",
    marginBottom: 15, // Added more spacing below the quote
  },
  director: {
    fontSize: 16, // Slightly larger text size
    color: "#666",
    textAlign: "right", // Align text to the right
    width: "100%", // Ensures proper alignment within the container
    paddingRight: 10, // Add a little right padding for visual balance
  },
});

export default BooksPage;
