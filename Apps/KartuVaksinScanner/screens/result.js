import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  TextInput,
} from "react-native";
import { WANum } from "../../../bimil"; //your WhatsApp Number

export default function result({ navigation, route }) {
  const [sending, setSending] = React.useState(false);
  const [WAnum, setWAnum] = React.useState("");
  const [num, setNum] = React.useState("");
  const [email, setEmail] = React.useState("");

  const uri = route.params.url;

  const onSend = () => {
    if (sending == false) {
      setSending(true);
    } else setSending(false);
  };

  const openBrowser = () => {
    Linking.openURL(uri);
  };

  const sendToWA = () => {
    Linking.openURL(
      `whatsapp://send?text=${encodeURIComponent(uri)}&phone=${WAnum}`
    );
  };

  const sendToEmail = () => {
    Linking.openURL(
      `mailto: ${email}?subject=QRScanner&body=${uri}`
    );
  };

  const sendToSms = () => {
    Linking.openURL(
      `sms:${num}?body=${uri}`
    );
  };
  return (
    <View style={styles.container}>
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
          style={[styles.button, { backgroundColor: "#fcde74" }]}
          onPress={() => openBrowser()}
        >
          <Text style={[styles.buttonText, { fontSize: 15, color: "#CB4545" }]}>
            Open in Browser
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={() => {
            onSend();
            // Linking.openURL(
            //   `whatsapp://send?text=${encodeURIComponent(
            //     uri
            //   )}&phone=${WANum}`
            // );
          }}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {sending ? (
        <View
          style={{ marginTop: 10, backgroundColor: "#fcde74", padding: 10 }}
        >
          <Text>Send to:</Text>
          <View style={styles.form}>
            <TextInput
              placeholder="Whatsapp Number"
              keyboardType="phone-pad"
              onChangeText={(num) => setWAnum(num)}
              style={[styles.textBox, { flex: 1, backgroundColor: "#fff" }]}
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "green", marginTop: 0 },
              ]}
              onPress={() => sendToWA()}
            >
              <Text style={[styles.buttonText, { fontSize: 15 }]}>Send WA</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="Email Address"
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email)}
              style={[styles.textBox, { flex: 1, backgroundColor: "#fff" }]}
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "green", marginTop: 0 },
              ]}
              onPress={() => sendToEmail()}
            >
              <Text style={[styles.buttonText, { fontSize: 15 }]}>
                Send Email
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              onChangeText={(num) => setNum(num)}
              style={[styles.textBox, { flex: 1, backgroundColor: "#fff" }]}
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "green", marginTop: 0 },
              ]}
              onPress={() => sendToSms()}
            >
              <Text style={[styles.buttonText, { fontSize: 15 }]}>
                Send SMS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textBox: { borderWidth: 1, padding: 5, borderRadius: 5 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 0.5,
  },
  buttonText: {
    color: "white",
    padding: 10,
    alignSelf: "center",
    fontSize: 20,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    //marginTop: 10,
    // backgroundColor: "#fcde74",
    paddingVertical: 10,
  },
});
