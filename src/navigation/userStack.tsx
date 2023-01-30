import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
    </NavigationContainer>
  );
}
