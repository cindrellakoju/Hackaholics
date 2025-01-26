// import React, { useRef, useState } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
// import * as ImagePicker from 'expo-image-picker';
// import PhotoPreviewSection from '@/components/navigation/PhotoPreviewSection';

// // Define ClickeClassification component to display classification
// const ClickeClassification = ({ classification }: { classification: string }) => {
//   return (
//     <View style={styles.classificationContainer}>
//       <Text style={styles.classificationText}>Classification: {classification}</Text>
//     </View>
//   );
// };

// export default function Camera() {
//   const [facing, setFacing] = useState<CameraType>('back');
//   const [permission, requestPermission] = useCameraPermissions();
//   const [photo, setPhoto] = useState<any>(null);
//   const [classification, setClassification] = useState<string | null>(null); // Store classification here
//   const cameraRef = useRef<CameraView | null>(null);

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   }

//   const handleTakePhoto = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 1, base64: true, exif: false };
//       const takedPhoto = await cameraRef.current.takePictureAsync(options);
//       setPhoto(takedPhoto);
//     }
//   };

//   const handleRetakePhoto = () => setPhoto(null);

//   const handlePickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need camera roll permissions to pick an image!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: 'images',
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 2,
//     });

//     if (!result.canceled) {
//       setPhoto(result);
//     }
//   };

//   const handleConfirmPhoto = async () => {
//     if (!photo) return;

//     const formData = new FormData();
//     formData.append('file', {
//       uri: photo.uri,
//       name: 'photo.jpg',
//       type: 'image/jpeg',
//     });

//     try {
//       const response = await fetch('http://192.168.31.99:5000/predict', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload image');
//       }

//       const data = await response.json();
//       console.log('API response:', data);

//       // Assuming the API returns a classification result, set it
//       setClassification(data.classification); // Assuming "classification" is returned from API response
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       alert('Failed to upload image');
//     }
//   };

//   const handleDiscardPhoto = () => {
//     setPhoto(null);
//     setClassification(null); // Reset classification when discarding photo
//   };

//   // Check if we need to show the classification screen
//   if (classification) {
//     return <ClickeClassification classification={classification} />;
//   }

//   if (photo) {
//     return (
//       <View style={styles.container}>
//         <PhotoPreviewSection photo={photo} />
//         <View style={styles.actionsContainer}>
//           <TouchableOpacity style={styles.actionButton} onPress={handleConfirmPhoto}>
//             <AntDesign name="checkcircle" size={44} color="green" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionButton} onPress={handleDiscardPhoto}>
//             <AntDesign name="closecircle" size={44} color="red" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             <AntDesign name="retweet" size={44} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
//             <AntDesign name="camera" size={44} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handlePickImage}>
//             <AntDesign name="picture" size={44} color="black" />
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//     marginHorizontal: 10,
//     backgroundColor: 'gray',
//     borderRadius: 10,
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   actionButton: {
//     margin: 20,
//   },
//   classificationContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   classificationText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// });

import React, { useState } from "react";
import demo from "../images/logoo.jpg"; // Ensure this path is correct
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
import ImageDetails from "./items"

function ClickeClassification() {
  const [isModalVisible, setModalVisible] = useState(null); // Modal state can be null or a category (causes, effect, prevention)
  const [isVideoVisible, setVideoVisible] = useState(false); // State to handle video visibility
  const [showImageDetails, setShowImageDetails] = useState(false); // State to handle showing the image and classification

  const causesVideos = [
    { id: 1, title: "Cause Video 1", videoUrl: "https://www.youtube.com/embed/9UKCv9T_rIo" },
  ];

  const effectVideos = [
    { id: 1, title: "Effect Video 1", videoUrl: "https://www.youtube.com/embed/9UKCv9T_rIo" },
  ];

  const preventionVideos = [
    { id: 1, title: "Prevention Video 1", videoUrl: "https://www.youtube.com/embed/9UKCv9T_rIo" },
  ];

  const classification = "Plastic"; // Replace this with actual dynamic classification data

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

  // Handle image click to show details
  const handleImageClick = () => {
    setShowImageDetails(true); // Show the image details page
  };

  // Close the image details view
  const closeImageDetails = () => {
    setShowImageDetails(false); // Hide the image details page
  };

  if (showImageDetails) {
    return <ImageDetails imageSource={demo} classification={classification} onClose={closeImageDetails} />;
  }

  return (
    <View style={styles.container}>
      {/* Display Image */}
      <Image source={demo} style={styles.logo} />
      {/* <Button title="View Image Details" onPress={handleImageClick} color="#3498db" /> */}

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
