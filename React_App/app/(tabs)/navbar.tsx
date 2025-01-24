// BottomNavBar.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CameraScreen from "./cameraScreen"; // Import CameraScreen component

const BottomNavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Search");
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const tabs = [
    { name: "Home", icon: "home-outline" },
    { name: "Camera", icon: "camera-outline" },
    { name: "Community", icon: "people-outline" },
  ];

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === "Camera") {
      setIsCameraOpen(true); // Open the camera when Camera tab is clicked
    }
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false); // Close the camera screen
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => handleTabPress(tab.name)}
        >
          <View style={styles.iconContainer}>
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === tab.name ? "#6200EE" : "#888"}
            />
          </View>
          <Text
            style={[
              styles.label,
              { color: activeTab === tab.name ? "#6200EE" : "#888" },
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Show Camera Screen when the Camera tab is active */}
      {isCameraOpen && <CameraScreen onClose={handleCloseCamera} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#DDD",
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
});

export default BottomNavBar;
