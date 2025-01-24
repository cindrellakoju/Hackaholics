import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Camera } from "expo-camera";

interface CameraScreenProps {
  onClose: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ onClose }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const cameraRef = useRef<React.RefObject<typeof Camera>>(null);

  // Request camera permissions on mount
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermissions();
  }, []);

  // If permission is not granted, show an error message
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.camera}>
        <Camera style={styles.camera} ref={cameraRef as any}>
          {/* Camera controls */}
          <View style={styles.cameraControls}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cameraControls: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraScreen;
