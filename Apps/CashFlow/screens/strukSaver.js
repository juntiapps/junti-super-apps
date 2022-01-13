import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

export default function strukSaver({ navigation }) {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [hasPermission2, setHasPermission2] = React.useState(null);
  const [camera, setCamera] = React.useState(null);
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
      //console.log('cam',cameraStatus);
      const mediaLib = await MediaLibrary.requestPermissionsAsync();
      setHasPermission2(mediaLib.status === "granted");
      //console.log('med',mediaLib);
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      //console.log(data.uri)
      setImage(data.uri);
    }
  };

  const savePicture = async () => {
    const asset = await MediaLibrary.createAssetAsync(image);
    //console.log(asset)
    navigation.navigate("add", { uri: asset.uri });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <View style={styles.cameraContainer}>
            <Image source={{ uri: image }} style={styles.camera} />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonSmall}
              onPress={() => setImage(null)}
            >
              <Ionicons
                name="arrow-back-circle-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonBig}
              onPress={() => savePicture()}
            >
              <Ionicons name="save" size={40} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonSmall, { backgroundColor: "transparent" }]}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.cameraContainer}>
            <Camera ref={(ref) => setCamera(ref)} style={styles.camera} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBig}
              onPress={() => takePicture()}
            >
              {/* <Text style={styles.textBig}>TAKE</Text> */}
              <Ionicons name="camera" size={40} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
    // <View style={styles.container}>
    //   <View style={styles.cameraContainer}>
    //     <Camera style={styles.camera} />
    //   </View>
    // </View>
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
  buttonBig: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gold",
    width: 80,
    height: 80,
    borderRadius: 80,
    margin: 10,
    borderStyle: "dashed",
    borderWidth: 2,
  },
  textBig: {
    fontSize: 18,
    color: "white",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },
  textSmall: {
    fontSize: 12,
    color: "white",
  },
  buttonSmall: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
  },
});
