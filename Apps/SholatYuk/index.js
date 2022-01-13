import moment from "moment";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import PickerModal from "react-native-picker-modal-view";
import { data } from "./data";
import { DataTable } from "react-native-paper";
import {SholatAPI} from "../../bimil"

export default function () {
  const [schedule, setSchedule] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchData = (city) => {
    setIsLoading(true);
    const year = moment().format("YYYY")
    const month = moment().format("MM")
    const date = moment().format("DD")
    fetch(
      `${SholatAPI}/${city}/${year}/${month}/${date}`,
      {
        method: "GET",
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setSchedule(result);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ alignSelf: "center", fontSize: 20 }}>
        {moment().format("dddd, D MMMM YYYY")}
      </Text>
      <PickerModal
        selectPlaceholderText="Pilih Kabupaten/Kota"
        searchPlaceholderText="Cari Kabupaten/Kota ..."
        onSelected={(v) => fetchData(v.Value)}
        items={data}
      />
      {isLoading && <ActivityIndicator size="large" color="#CB4545" />}
      {schedule.length != 0 && (
        <DataTable
          style={{ borderRadius: 10, backgroundColor: "#fff", marginTop: 10 }}
        >
          <DataTable.Header style={{ backgroundColor: "#fcde74" }}>
            <DataTable.Title style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {schedule.data.lokasi}, {schedule.data.daerah}
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>SHUBUH</DataTable.Cell>
            <DataTable.Cell>{schedule.data.jadwal.subuh}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>DHUHA</DataTable.Cell>
            <DataTable.Cell>{schedule.data.jadwal.dhuha}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>DZUHUR</DataTable.Cell>
            <DataTable.Cell>{schedule.data.jadwal.dzuhur}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>ASHAR</DataTable.Cell>
            <DataTable.Cell>{schedule.data.jadwal.ashar}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>MAGHRIB</DataTable.Cell>
            <DataTable.Cell>{schedule.data.jadwal.maghrib}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>ISYA</DataTable.Cell>
            <DataTable.Cell>{schedule.data.jadwal.isya}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      )}
    </View>
  );
}
