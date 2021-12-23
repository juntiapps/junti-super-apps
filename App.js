import React from "react";
import { View } from "react-native";
import KVS from "./Apps/KartuVaksinScanner";
import CF from "./Apps/CashFlow";
import Main from './routes/'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Main />
    </View>
  );
}

