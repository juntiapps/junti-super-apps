import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("result", { url: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
        {!scanned && (
          <View style={styles.scanIcon}>
            <Ionicons size={350} color="white" name="scan" />
          </View>
        )}
      </View>
      {!scanned && (
        <Text style={{ fontSize: 20 }}>
          STATUS:<Text style={{ color: "red" }}>SCANNING</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cameraContainer: {
    flexDirection: "row",
    flex: 1,
  },
  camera: { flex: 1, aspectRatio: 0.75 },
  scanIcon: {
    position: "absolute",
    left: Dimensions.get("window").width / 2 - 350 / 2,
    top: Dimensions.get("window").width / 2 - 350 / 2,
  },
});
