import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { display } from "../components/displayNum";
import { db } from "../db";

export default function detailTransaction({ navigation, route }) {
  const { id, tanggal, tipe, nominal, keterangan, strukURL } = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  console.log(route.params);

  const deleteAlert = () =>
    Alert.alert(
      "Menghapus Transaksi",
      "Apakah anda yakin ?",
      [
        {
          text: "Kembali",
          //onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yakin", onPress: () => handleDeleteData() },
      ],
      { cancelable: true }
    );

  const handleDeleteData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM jajal where id = ?",
        [id],
        () => {
          console.log("deleted");
          navigation.popToTop();
        },
        (error) => console.log("error: ", error.message)
      );
    }, null);
  };

  const handleEdit = () => {
    navigation.navigate("add", {
      id: id,
      tanggal: tanggal,
      tipe: tipe,
      nominal: nominal,
      keterangan: keterangan,
      strukURL: strukURL,
    });
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        style={styles.cameraContainer}
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.cameraContainer}>
          <Image source={{ uri: strukURL }} style={styles.camera} />
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>close</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.row}>
        <View style={styles.column1}>
          <Text style={styles.text}>ID</Text>
          <Text style={styles.text}>Tipe</Text>
          <Text style={styles.text}>Nominal</Text>
          <Text style={styles.text}>Keterangan</Text>
          <Text style={styles.text}>Struk</Text>
        </View>
        <View>
          <Text style={styles.text}>: {id}</Text>
          <Text style={styles.text}>
            : {tipe === "in" ? "Pemasukan" : "Pengeluaran"}
          </Text>
          <Text style={styles.text}>: {display(nominal)}</Text>
          <Text style={styles.text}>: {keterangan}</Text>
          {strukURL ? (
            <View style={styles.row}>
              <Text>: </Text>
              <TouchableOpacity onPress={() => handlePress()}>
                <Image style={styles.image} source={{ uri: strukURL }} />
              </TouchableOpacity>
            </View>
          ) : (
            <Text>: -</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonTop, { backgroundColor: "red" }]}
          onPress={() => {
            deleteAlert();
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonTop, { backgroundColor: "green" }]}
          onPress={() => {
            handleEdit();
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "grey",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  column1: {
    width: "35%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  buttonContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    position: "absolute",
    bottom: 20,
  },
  buttonTop: {
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
  cameraContainer: {
    flexDirection: "row",
    flex: 1,
    //alignItems: "center",
  },
  camera: { flex: 1, aspectRatio: 0.75, borderRadius: 10, margin: 10 },
  button: {
    backgroundColor: "gold",
    borderRadius: 20,
    padding: 10,
    position: "absolute",
    left: 20,
    top: 20,
    alignItems: "center",
  },
});
