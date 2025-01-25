import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import BottomNavBar from "./(tabs)/navbar";
import LoginPage from "./(tabs)/logins/loginPage";

const App: React.FC = () => {
  // State to track user login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login (to be passed to LoginPage)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
      {isLoggedIn ? (
        <BottomNavBar />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </SafeAreaView>
  );
};

export default App;
