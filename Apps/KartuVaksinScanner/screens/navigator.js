import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scanner from "./scanner";
import Result from "./result";

const Stack = createNativeStackNavigator();

export default function navigator() {
  return (
    <Stack.Navigator
      initialRouteName="scanner"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
          color: "#CB4545",
        },
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#fcde74" },
      }}
    >
      <Stack.Screen
        name="scanner"
        component={Scanner}
        options={{
          title: "Scan",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="result"
        component={Result}
        options={{
          title: "Result",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
