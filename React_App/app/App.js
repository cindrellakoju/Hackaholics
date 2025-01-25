import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserInfo from "../app/(tabs)/usersinfo/UserInfo";
import Settings from  "../app/(tabs)/usersinfo/setting";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{ headerShown: false }} // Hide header for UserInfo
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }} // Title for Settings page
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
