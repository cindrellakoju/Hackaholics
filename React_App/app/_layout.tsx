import React from "react";
import { SafeAreaView } from "react-native";
import BottomNavBar from "./(tabs)/navbar";
import LoginPage from "./(tabs)/logins/loginPage";


const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
      {/* <BottomNavBar /> */}
      <LoginPage/>
    </SafeAreaView>
  );
};

export default App;
