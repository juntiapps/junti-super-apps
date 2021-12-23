import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

export default function result({ navigation, route }) {
  const uri = route.params.url;
  return (
    <View>
      <View style={styles.textBox}>
        <Text style={{ fontSize: 20 }}>
          {route === undefined ? "Hello" : uri}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "scanner" }],
            });
          }}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={() => {
            Linking.openURL(
              `whatsapp://send?text=${encodeURIComponent(
                uri
              )}&phone=+6285156283512`
            );
          }}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBox: { margin: 10, borderWidth: 1, padding: 5, borderRadius: 5 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    margin: 10,
    flex: 0.5,
  },
  buttonText: {
    color: "white",
    padding: 10,
    alignSelf: "center",
    fontSize: 20,
  },
});
