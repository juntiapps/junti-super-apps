import React from "react";
import { View, FlatList, LogBox } from "react-native";
import { Button, TextInput, Chip, Title } from "react-native-paper";
import SlotMachine from "react-native-slot-machine";

LogBox.ignoreLogs([
  "componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.",
]);

export default function () {
  const [participant, setParticipant] = React.useState("");
  const [participants, setParticipants] = React.useState([]);
  const [winner, setWinner] = React.useState("WINNER");

  const add = () => {
    setParticipants([...participants, participant]);
  };

  const roll = () => {
    const win = Math.floor(Math.random() * participants.length);
    setWinner(participants[win]);
  };

  console.log(participants);
  return (
    <View style={{ padding: 10, flex: 1, alignItems: "center" }}>
      <Title>Pemenang</Title>
      <SlotMachine
        width={50}
        height={70}
        delay={10}
        text={winner}
        range="abcdefghijklmnopqrstuvwxyz"
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          value={participant}
          placeholder="Masukan nama orang"
          style={{ width: "70%", margin: 10 }}
          onChangeText={(text) => {
            if (text.length < 7) {
              setParticipant(text);
            }
          }}
          right={<TextInput.Affix text={`${participant.length}/7`} />}
        />
        <Button
          mode="contained"
          onPress={() => {
            add();
            setParticipant("");
          }}
        >
          submit
        </Button>
      </View>
      <FlatList
        numColumns={4}
        data={participants}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <Chip
            mode="outlined"
            closeIcon="close"
            onClose={() => {
              setParticipants(participants.filter((p, i) => i !== index));
            }}
          >
            {item}
          </Chip>
        )}
      />
      <Button mode="contained" onPress={() => roll()}>
        Start
      </Button>
    </View>
  );
}
