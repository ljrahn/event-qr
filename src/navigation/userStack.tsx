import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

import Scanner from "@screens/Scanner";
import DetailedUserView from "@screens/DetailedUserView";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="DetailedUserView" component={DetailedUserView} />
      </Stack.Navigator>
      <FlashMessage style={{ marginTop: 98 }} position="top" />
    </NavigationContainer>
  );
}
