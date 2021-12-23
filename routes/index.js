import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import KVS from "../Apps/KartuVaksinScanner/";
import CF from "../Apps/CashFlow/";
import TL from "../Apps/Translator";
import We from "../Apps/Weather";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: "#CB4545",
          },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#fcde74" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="KVS" component={KVS} />
        <Stack.Screen name="CF" component={CF} />
        <Stack.Screen
          name="TL"
          component={TL}
          options={{
            headerShown: true,
            title: "Translator",
          }}
        />
        <Stack.Screen
          name="We"
          component={We}
          options={{
            headerShown: true,
            title: "Weather",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
