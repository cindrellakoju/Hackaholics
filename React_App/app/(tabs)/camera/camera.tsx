import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import PhotoPreviewSection from '@/components/navigation/PhotoPreviewSection';

// Define ClickeClassification component to display classification
const ClickeClassification = ({ classification }: { classification: string }) => {
  return (
    <View style={styles.classificationContainer}>
      <Text style={styles.classificationText}>Classification: {classification}</Text>
    </View>
  );
};

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [classification, setClassification] = useState<string | null>(null); // Store classification here
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: false };
      const takedPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takedPhoto);
    }
  };

  const handleRetakePhoto = () => setPhoto(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to pick an image!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      aspect: [4, 3],
      quality: 2,
    });

    if (!result.canceled) {
      setPhoto(result);
    }
  };

  const handleConfirmPhoto = async () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append('file', {
      uri: photo.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('http://192.168.31.99:5000/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('API response:', data);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handleDiscardPhoto = () => {
    setPhoto(null);
    setClassification(null); // Reset classification when discarding photo
  };

  // Check if we need to show the classification screen
  if (classification) {
    return <ClickeClassification classification={classification} />;
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <PhotoPreviewSection photo={photo} />
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleConfirmPhoto}>
            <AntDesign name="checkcircle" size={44} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDiscardPhoto}>
            <AntDesign name="closecircle" size={44} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AntDesign name="retweet" size={44} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <AntDesign name="camera" size={44} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePickImage}>
            <AntDesign name="picture" size={44} color="black" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  actionButton: {
    margin: 20,
  },
  classificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classificationText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
