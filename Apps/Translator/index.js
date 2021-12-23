import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Translate from "translate-google-api";
import PickerModal from "react-native-picker-modal-view";
import { langs } from "./data";

export default function index() {
  const [from, setFrom] = React.useState("auto");
  const [to, setTo] = React.useState("id");
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState("");

  const onTranslate = async () => {
    const result = await Translate(text, {
      tld: "com",
      from: from,
      to: to,
    });
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.box, { fontSize: 20 }]}
        text
        textAlignVertical="top"
        value={text}
        onChangeText={(v) => setText(v)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.language}>
          <PickerModal onSelected={(v) => setFrom(v.Value)} items={langs} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.translate}
          onPress={() => onTranslate()}
        >
          <Text style={styles.textButton}>Translate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.language}>
          <PickerModal onSelected={(v) => setTo(v.Value)} items={langs} />
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E5E5E5",
  },
  box: {
    width: "100%",
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  textButton: {
    fontSize: 20,
    color: "#CB4545",
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
  },
  buttonContainer: {
    padding: 10,
  },
  translate: {
    backgroundColor: "#FCDE74",
    padding: 10,
    borderRadius: 10,
  },
});
