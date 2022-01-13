import moment from "moment";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { db } from "../db";
import { display } from "../components/displayNum";

export default function home({ navigation }) {
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  // console.log("data", data);
  //console.log("data2", data2);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS jajal (id INTEGER PRIMARY KEY AUTOINCREMENT, tanggal INT, tipe TEXT, nominal INT, keterangan TEXT, strukURL TEXT);"
      );
    });
    fetchData();
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM jajal", [], (_, { rows: { _array } }) => {
        setData2(_array);
        if (_array.length) {
          _array.map(
            (d) => (d.tanggal = moment(d.tanggal).format("DD-MMM-YY"))
          );

          const groups = _array.reduce((groups, data) => {
            const date = data.tanggal;
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(data);
            return groups;
          }, {});

          const groupArrays = Object.keys(groups).map((date) => {
            return {
              date,
              data: groups[date],
            };
          });
          setData(groupArrays);
        }
      });
    });
  };

  const dailySumIn = (date) => {
    let sum = 0;
    data2.forEach((data) => {
      if (date === data.tanggal && data.tipe === "in") {
        sum += data.nominal;
      }
    });
    return display(sum);
  };

  const dailySumOut = (date) => {
    let sum = 0;
    data2.forEach((data) => {
      if (date === data.tanggal && data.tipe === "out") {
        sum += data.nominal;
      }
    });
    return display(sum);
  };

  const totalSumOut = () => {
    let sum = 0;
    data2.forEach((data) => {
      if (data.tipe === "out") {
        sum += data.nominal;
      }
    });
    return sum;
  };

  const totalSumIn = () => {
    let sum = 0;
    data2.forEach((data) => {
      if (data.tipe === "in") {
        sum += data.nominal;
      }
    });
    return sum;
  };

  const Recap = () => {
    const recap = totalSumIn() - totalSumOut();
    let result = "";
    if (recap >= 0) {
      result = `Keuntungan: ${display(recap)}`;
    } else {
      result = `Kerugian: ${display(recap * -1)}`;
    }
    return result;
  };

  const handlePress = (id, tanggal, tipe, nominal, keterangan, strukURL) => {
    navigation.navigate("details", {
      id,
      tanggal,
      tipe,
      nominal,
      keterangan,
      strukURL,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.recap}>
        <View style={styles.recapRow1}>
          <View style={styles.recapColumn1}>
            <Text style={[styles.recapTextMain, { color: "green" }]}>
              {display(totalSumIn())}
            </Text>
            <Text style={styles.recapText}>Pemasukan</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.recapColumn1}>
            <Text style={[styles.recapTextMain, { color: "red" }]}>
              {display(totalSumOut())}
            </Text>
            <Text style={styles.recapText}>Pengeluaran</Text>
          </View>
        </View>
        <View style={[styles.recapRow1, { borderBottomWidth: 0 }]}>
          <Text
            style={[
              styles.recapTextMain,
              { color: totalSumIn() - totalSumOut() >= 0 ? "green" : "red" },
            ]}
          >
            {Recap()}
          </Text>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <View style={styles.cellLeft}>
          <Text style={styles.tableTextHeader}>Tanggal</Text>
        </View>
        <View style={styles.cellRight}>
          <Text style={styles.tableTextHeader}>Pemasukan</Text>
        </View>
        <View style={styles.cellRight}>
          <Text style={styles.tableTextHeader}>Pengeluaran</Text>
        </View>
      </View>
      <View>
        <FlatList
          keyExtractor={(item) => item.date}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.table}>
              <View
                style={[
                  styles.tableHeader,
                  { marginTop: 0, backgroundColor: "#dbf0fe" },
                ]}
              >
                <View style={styles.cellLeft}>
                  <Text style={[styles.tableTextHeader, { color: "grey" }]}>
                    {item.date}
                  </Text>
                </View>
                <View style={styles.cellRight}>
                  <Text style={[styles.tableTextHeader, { color: "green" }]}>
                    {dailySumIn(item.date)}
                  </Text>
                </View>
                <View style={styles.cellRight}>
                  <Text style={[styles.tableTextHeader, { color: "red" }]}>
                    {dailySumOut(item.date)}
                  </Text>
                </View>
              </View>
              <FlatList
                data={item.data}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.tableHeader,
                      {
                        marginTop: 0,
                        backgroundColor: "#fff",
                        borderBottomWidth: 1,
                        borderBottomColor: "#d3d3d3",
                      },
                    ]}
                    onPress={() =>
                      handlePress(
                        item.id,
                        item.tanggal,
                        item.tipe,
                        item.nominal,
                        item.keterangan,
                        item.strukURL
                      )
                    }
                  >
                    <View style={styles.cellLeft}>
                      <Text style={[styles.tableText, { color: "grey" }]}>
                        {item.keterangan}
                      </Text>
                    </View>
                    <View style={styles.cellRight}>
                      {item.tipe === "in" ? (
                        <Text style={[styles.tableText, { color: "green" }]}>
                          {display(item.nominal)}
                        </Text>
                      ) : (
                        <Text style={[styles.tableText, { color: "grey" }]}>
                          -
                        </Text>
                      )}
                    </View>
                    <View style={styles.cellRight}>
                      {item.tipe === "out" ? (
                        <Text style={[styles.tableText, { color: "red" }]}>
                          {display(item.nominal)}
                        </Text>
                      ) : (
                        <Text style={[styles.tableText, { color: "grey" }]}>
                          -
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addTransaction}
        onPress={() => navigation.navigate("add", { id: null })}
      >
        <Text>+ tambah transaksi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  separator: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  recap: {
    borderWidth: 2,
    borderColor: "#d3d3d3",
    borderRadius: 20,
    alignItems: "center",
  },
  recapRow1: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#d3d3d3",
    padding: 10,
  },
  recapColumn1: {
    flexDirection: "column",
    flex: 0.5,
    alignItems: "center",
  },
  recapTextMain: {
    fontSize: 20,
    fontWeight: "bold",
  },
  recapText: {
    color: "grey",
    fontSize: 12,
  },
  tableHeader: {
    backgroundColor: "#d3d3d3",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  table: {
    marginBottom: 5,
  },
  tableTextHeader: {
    fontWeight: "bold",
    fontSize: 12,
  },
  tableText: {
    fontSize: 12,
  },
  cellLeft: {
    width: "30%",
  },
  cellRight: {
    width: "35%",
    alignItems: "flex-end",
  },
  addTransaction: {
    position: "absolute",
    bottom: 20,
    height: 50,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "gold",
    justifyContent: "center",
  },
});
