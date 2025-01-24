import React from "react";
import { SafeAreaView } from "react-native";
import BottomNavBar from "./(tabs)/navbar"

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
      <BottomNavBar />
    </SafeAreaView>
  );
};

export default App;
