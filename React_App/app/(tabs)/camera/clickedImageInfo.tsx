import React, { useState } from "react";
import demo from "../images/logo.png"; // Ensure this path is correct
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview"; // Import WebView

function ClickeClassification({ classification }) {
  const [isModalVisible, setModalVisible] = useState(null); // Modal state can be null or a category (causes, effect, prevention)
  const [isVideoVisible, setVideoVisible] = useState(false); // State to handle video visibility

  const causesVideos = [
    { id: 1, title: "Cause Video 1", videoUrl: "https://www.youtube.com/embed/9UKCv9T_rIo" },
  ];

  const effectVideos = [
    { id: 1, title: "Effect Video 1", videoUrl: "https://www.youtube.com/embed/9UKCv9T_rIo" },
  ];

  const preventionVideos = [
    { id: 1, title: "Prevention Video 1", videoUrl: "https://www.youtube.com/embed/9UKCv9T_rIo" },
  ];

  // Button handlers
  const handleCauses = () => setModalVisible('causes');
  const handleEffect = () => setModalVisible('effect');
  const handlePrevention = () => setModalVisible('prevention');

  // Close modal
  const closeModal = () => setModalVisible(null);

  // Handle video selection
  const handleVideoPress = (videoUrl) => {
    setVideoVisible(videoUrl); // Show the video
    setModalVisible(null); // Close the modal when a video is selected
  };

  return (
    <View style={styles.container}>
      {/* Display Image */}
      <Image source={demo} style={styles.logo} />

      {/* Display Classification */}
      <Text style={styles.classificationText}>
        Classification Type:{" "}
        <Text style={styles.classificationType}>{classification}</Text>
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Causes" onPress={handleCauses} color="#f39c12" />
        <Button title="Effect" onPress={handleEffect} color="#3498db" />
        <Button title="Prevention" onPress={handlePrevention} color="#27ae60" />
      </View>

      {/* Modal for Causes */}
      <Modal visible={isModalVisible === 'causes'} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Causes Videos</Text>
          <ScrollView contentContainerStyle={styles.videoGrid}>
            {causesVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                onPress={() => handleVideoPress(video.videoUrl)}
              >
                <Image
                  source={{ uri: "https://via.placeholder.com/150" }} // Use a thumbnail or placeholder
                  style={styles.videoThumbnail}
                />
                <Text style={styles.videoTitle}>{video.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button title="Close" onPress={closeModal} color="#e74c3c" />
        </View>
      </Modal>

      {/* Modal for Effect */}
      <Modal visible={isModalVisible === 'effect'} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Effect Videos</Text>
          <ScrollView contentContainerStyle={styles.videoGrid}>
            {effectVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                onPress={() => handleVideoPress(video.videoUrl)}
              >
                <Image
                  source={{ uri: "https://via.placeholder.com/150" }} // Use a thumbnail or placeholder
                  style={styles.videoThumbnail}
                />
                <Text style={styles.videoTitle}>{video.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button title="Close" onPress={closeModal} color="#e74c3c" />
        </View>
      </Modal>

      {/* Modal for Prevention */}
      <Modal visible={isModalVisible === 'prevention'} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Prevention Videos</Text>
          <ScrollView contentContainerStyle={styles.videoGrid}>
            {preventionVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                onPress={() => handleVideoPress(video.videoUrl)}
              >
                <Image
                  source={{ uri: "https://via.placeholder.com/150" }} // Use a thumbnail or placeholder
                  style={styles.videoThumbnail}
                />
                <Text style={styles.videoTitle}>{video.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button title="Close" onPress={closeModal} color="#e74c3c" />
        </View>
      </Modal>

      {/* WebView for video */}
      {isVideoVisible && (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: isVideoVisible }}
            style={{ width: "100%", height: 300 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
          <Button title="Close Video" onPress={() => setVideoVisible(false)} color="#e74c3c" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  logo: {
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
    marginBottom: 10,
    textAlign: "center",
  },
  classificationType: {
    fontWeight: "normal",
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginTop: 50,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  videoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  videoCard: {
    width: "48%",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  videoThumbnail: {
    width: "100%",
    height: 100,
  },
  videoTitle: {
    padding: 5,
    textAlign: "center",
    fontSize: 14,
  },
  videoContainer: {
    width: "100%",
    height: 300,
    marginTop: 20,
    backgroundColor: "#000",
  },
});

export default ClickeClassification;
