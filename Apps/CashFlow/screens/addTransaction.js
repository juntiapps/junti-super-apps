import moment from "moment";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../db";
import { displayInput } from "../components/displayNum";

export default function addTransaction({ navigation, route }) {
  const [onFocus, setOnFocus] = React.useState({ num: false, desc: false });
  const [data, setData] = React.useState({
    tanggal: route.params.id ? route.params.tanggal : Date.now(),
    tipe: route.params.id ? route.params.tipe : "in",
    nominal: route.params.id ? route.params.nominal : "",
    keterangan: route.params.id ? route.params.keterangan : "",
    strukURL: route.params.id ? route.params.strukURL : route.params.uri,
  });
  //console.log("route", route.params);
  //console.log("data", data);

  const [error, setError] = React.useState("");
  const [isIn, setIsIn] = React.useState(true);
  const [disp, setDisp] = React.useState("")

  const handleSubmit = () => {
    if (data.nominal === null) {
      setError("nominal harus diisi");
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO jajal (tanggal, tipe, nominal, keterangan, strukURL) values (?,?,?,?,?)",
          [
            data.tanggal,
            data.tipe,
            data.nominal,
            data.keterangan,
            data.strukURL,
          ],
          () => {
            //console.log("succeed");
            navigation.popToTop();
          },
          (error) => console.log("error: ", error.message)
        );
      }, null);
    }
  };

  const handleEditSubmit = () => {
    if (data.nominal === null) {
      setError("nominal harus diisi");
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE jajal SET tipe = ?, nominal = ?, keterangan = ?, strukURL = ? WHERE id = ? ",
          [
            data.tipe,
            data.nominal,
            data.keterangan,
            data.strukURL,
            route.params.id,
          ],
          () => {
            //console.log("UPDATED");
            navigation.popToTop();
          },
          (error) => console.log("error: ", error.message)
        );
      }, null);
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        Tanggal Transaksi:{" "}
        {route.params.id
          ? data.tanggal
          : moment(data.tanggal).format("DD-MMM-YY")}
        {`\n`}
      </Text>
      <Text>
        {isIn
          ? "Tekan Pengeluaran untuk input Pengeluaran"
          : "Tekan Pemasukan untuk input Pemasukan"}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.buttonTop,
            { backgroundColor: isIn ? "green" : "#d3d3d3" },
          ]}
          onPress={() => {
            setData({ ...data, tipe: "in", keterangan: "pemasukan" });
            setIsIn(true);
          }}
        >
          <Text style={styles.buttonText}>Pemasukan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonTop,
            { backgroundColor: isIn ? "#d3d3d3" : "red" },
          ]}
          onPress={() => {
            setData({ ...data, tipe: "out", keterangan: "pengeluaran" });
            setIsIn(false);
          }}
        >
          <Text style={styles.buttonText}>Pengeluaran</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={data.nominal.toString()}
        style={[
          styles.inputNumber,
          { color: isIn ? "green" : "red" },
          onFocus.num && {
            borderColor: isIn ? "green" : "red",
            borderWidth: 2,
          },
        ]}
        textAlign="center"
        placeholder="Masukkan Data"
        keyboardType="number-pad"
        onFocus={() => {
          setOnFocus({ ...onFocus, num: true });
        }}
        onEndEditing={() => {
          setOnFocus(false);
        }}
        onChangeText={(nominal) => {
          setData({ ...data, nominal: nominal });
        }}
      />
      <Text>Keterangan:</Text>
      <TextInput
        value={data.keterangan}
        style={[
          styles.inputDescription,
          onFocus.desc && {
            borderColor: isIn ? "green" : "red",
            borderWidth: 2,
          },
        ]}
        textAlignVertical="top"
        onFocus={() => {
          setOnFocus({ ...onFocus, desc: true });
        }}
        onEndEditing={() => {
          setOnFocus(false);
        }}
        onChangeText={(keterangan) => {
          if (keterangan === "") {
            setData({
              ...data,
              keterangan: data.tipe === "in" ? "pemasukan" : "pengeluaran",
            });
          }
          setData({ ...data, keterangan: keterangan });
        }}
      />

      {!route.params.id || !data.strukURL ? (
        <TouchableOpacity
          style={styles.buttonplus}
          onPress={() => {
            navigation.navigate("camera");
          }}
        >
          <Text>+ Upload Struk</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Image style={styles.image} source={{ uri: data.strukURL }} />
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              setData({ ...data, strukURL: "" });
            }}
          >
            <AntDesign name="delete" size={15} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <Text style={{ color: "red" }}>{error}</Text>
      {route.params.id ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleEditSubmit()}
        >
          <Text>Update</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text>Simpan</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  inputNumber: {
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    width: "70%",
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 20,
    //color: "green",
    margin: 10,
  },
  inputDescription: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    width: "90%",
    height: 100,
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
  },
  button: {
    position: "absolute",
    bottom: 20,
    width: "50%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "gold",
    alignItems: "center",
  },
  buttonplus: {
    width: "50%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#d3d3d3",
    borderColor: "grey",
    alignItems: "center",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  delete: {
    backgroundColor: "red",
    position: "absolute",
    right: 15,
    top: 15,
    width: 25,
    height: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
