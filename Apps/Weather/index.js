import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import moment from "moment";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import {OpenWeaterMapToken} from '../../bimil'
//console.log(OpenWeaterMapToken)

export default function App() {
  const [data, setData] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //console.log(location.coords);
      fetch(
        'https://api.openweathermap.org/data/2.5/forecast?'
        +'lat='+location.coords.latitude
        +'&lon='+location.coords.longitude
        +'&appid='+OpenWeaterMapToken//you can get it from openweathermap website
        +'&units=metric',
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((result) => {
          //console.log(result);
          setData(result);
        })
        .catch((error) => console.log("error", error));
      //setLocation(location);
    })();
  }, []);
  //console.log("data", data);

  if (data.length === 0) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{data.city.name}</Text>
      <View style={styles.row}>
        <Text style={styles.currentTemp}>
          {data.list[0].main.temp.toFixed(0)}
        </Text>
        <Text style={styles.currentCelcius}>{"\xB0C"}</Text>
      </View>
      <Text style={styles.currentDescription}>
        {data.list[0].weather[0].description}
      </Text>
      <View style={styles.box}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View>
            <Text style={styles.text}>
              Today - {data.list[0].weather[0].description}
            </Text>
          </View>
          <Text style={styles.text}>
            {data.list[0].main.temp.toFixed(0)}
            {"\xB0C"}
          </Text>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View>
            <Text style={styles.text}>
              Tomorrow - {data.list[8].weather[0].description}
            </Text>
          </View>
          <Text style={styles.text}>
            {data.list[8].main.temp.toFixed(0)}
            {"\xB0C"}
          </Text>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View>
            <Text style={styles.text}>
              {moment().format("dddd")} - {data.list[15].weather[0].description}
            </Text>
          </View>
          <Text style={styles.text}>
            {data.list[15].main.temp.toFixed(0)}
            {"\xB0C"}
          </Text>
        </View>
        <Text style={styles.heading}>5-Days Forecast</Text>
      </View>
      <View style={styles.box}>
        <FlatList
          horizontal={true}
          data={data.list}
          keyExtractor={(item) => item.dt}
          renderItem={({ item, index }) => (
            <View style={styles.weatherCard}>
              <Text>
                {item.main.temp.toFixed(0)}
                {"\xB0C"}
              </Text>
              <Image
                style={{ height: 60, width: 60 }}
                source={{
                  uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                }}
              />
              <View style={styles.row}>
                <FontAwesome
                  name="location-arrow"
                  size={12}
                  color="black"
                  style={{
                    transform: [
                      {
                        rotate: `${
                          item.wind.deg - 45 < 0
                            ? 360 + (item.wind.deg - 45)
                            : item.wind.deg - 45
                        }deg`,
                      },
                    ],
                  }}
                />
                <Text>{item.wind.speed}m/s</Text>
              </View>
              <Text>
                {index === 0 ? "Now" : moment(item.dt * 1000).format("HH:mm")}
              </Text>
              <Text>
                {index !== 0 && moment(item.dt * 1000).format("DD/MM")}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.heading}>Details</Text>
        <View style={[styles.row, { marginTop: 10 }]}>
          <View
            style={[
              styles.column,
              { borderRightWidth: 0.5, borderRightColor: "grey" },
            ]}
          >
            <Text style={{ color: "grey" }}>
              {
                (data.list[0].wind.deg = 0
                  ? "North"
                  : (data.list[0].wind.deg = 90
                      ? "East"
                      : (data.list[0].wind.deg = 180
                          ? "South"
                          : (data.list[0].wind.deg = 270
                              ? "West"
                              : data.list[0].wind.deg > 0 &&
                                data.list[0].wind.deg < 90
                              ? "Northeast"
                              : data.list[0].wind.deg > 90 &&
                                data.list[0].wind.deg < 180
                              ? "Southeast"
                              : data.list[0].wind.deg > 180 &&
                                data.list[0].wind.deg < 270
                              ? "Southwest"
                              : "Northwest"))))
              }
            </Text>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={styles.text}>
                {data.list[0].wind.speed}
                m/s
              </Text>
              <MaterialCommunityIcons name="weather-windy" size={24} />
            </View>
          </View>
          <View
            style={[
              styles.column,
              { borderLeftWidth: 0.5, borderleftColor: "grey" },
            ]}
          >
             <Text style={{ color: "grey" }}>Feels like</Text>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={styles.text}>
                {data.list[0].main.feels_like}
                {"\xB0C"}
              </Text>
              <FontAwesome name="thermometer" size={24} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View
            style={[
              styles.column,
              { borderRightWidth: 0.5, borderRightColor: "grey" },
            ]}
          >
            <Text style={{ color: "grey" }}>Humidity</Text>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={styles.text}>{data.list[0].main.humidity}%</Text>
              <Ionicons name="water-outline" size={24} color="black" />
            </View>
          </View>
          <View
            style={[
              styles.column,
              { borderLeftWidth: 0.5, borderleftColor: "grey" },
            ]}
          >
            <Text style={{ color: "grey" }}>Air pressure</Text>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={styles.text}>{data.list[0].main.pressure}mbar</Text>
              <Entypo name="gauge" size={24} color="black" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    width: "50%",
    paddingLeft: 20,
    paddingRight: 5,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
  heading: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  city: {
    alignSelf: "center",
    fontSize: 30,
  },
  currentTemp: {
    fontSize: 100,
  },
  currentCelcius: {
    fontSize: 30,
  },
  currentDescription: {
    fontSize: 25,
  },
  box: {
    backgroundColor: "#fff",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 20,
  },
  cardContainer: {
    borderWidth: 1,
  },
  weatherCard: {
    alignItems: "center",
    margin: 5,
  },
  details: {
    borderWidth: 1,
  },
});
