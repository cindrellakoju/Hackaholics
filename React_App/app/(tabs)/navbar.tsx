import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


const BottomNavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Search");

  const tabs = [
    { name: "Home", icon: "home-outline" },
    { name: "Camera", icon: "camera-outline" },
    { name: "Community", icon: "people-outline" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => setActiveTab(tab.name)}
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
