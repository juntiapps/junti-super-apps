import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./home";
import AddScreen from "./addTransaction";
import DetailScreen from "./detailTransaction";
import CameraScreen from "./strukSaver";

const Stack = createNativeStackNavigator();

export default function navigator() {
  return (
    <Stack.Navigator
      initialRouteName="home"
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
        name="home"
        component={HomeScreen}
        options={{
          title: "Dashboard",
          // headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
          // headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="add"
        component={AddScreen}
        options={({ route }) => ({
          title: route.params.id ? "Edit Transaksi" : "Tambah Transaksi",
        })}
      />
      <Stack.Screen
        name="details"
        component={DetailScreen}
        options={{
          title: "Detail Transaksi",
        }}
      />
      <Stack.Screen
        name="camera"
        component={CameraScreen}
        options={{
          title: "Ambil Gambar",
        }}
      />
    </Stack.Navigator>
  );
}
