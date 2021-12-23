// screens/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { DATA } from "../data";

export default function HomeScreen({ navigation }) {
  console.log(navigation);
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>HELLO</Text>
      <Text style={styles.welcome}>
        Welcome To{" "}
        <Text style={{ fontWeight: "bold",color:"#CB4545" }}>Junti<Text style={{color: 'black'}}>Apps</Text></Text>
      </Text>
      <View style={styles.listContainer}>
        <FlatList
          data={DATA}
          horizontal={false}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listIcon}
              onPress={() => {
                navigation.navigate(item.app);
              }}
            >
              <Image style={styles.icon} source={item.icon} />
              <Text style={styles.textIcon}>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fcde74",
  },
  hello: {
    fontSize: 30,
  },
  welcome: {
    fontSize: 20,
  },
  listContainer: {
    margin: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  icon: {
    height: 70,
    width: 70,
  },
  textIcon: {
    fontSize: 12,
  },
  listIcon: {
    margin: 10,
    alignItems: "center",
  },
});
