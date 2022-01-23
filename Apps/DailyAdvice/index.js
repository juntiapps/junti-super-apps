import moment from "moment";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Translate from "translate-google-api"; //da, jw, su
import { AdviceAPI } from "../../bimil";
import {
  ActivityIndicator,
  Title,
  Paragraph,
  Caption,
  Chip,
} from "react-native-paper";

export default function () {
  const [quote, setQuote] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState([]);

  const today = moment().format("dddd, D MMMM YYYY");

  React.useEffect(() => {
    fetchAdvice();
    quote.length!=0&&onTranslate();
  }, [quote]);

  const fetchAdvice = () => {
    fetch(AdviceAPI, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.slip.advice);
        setQuote(result.slip.advice);
      });
  };
  const onTranslate = async () => {
    setIsLoading(true)
    let res = [];
    const result1 = await Translate(quote, {
      tld: "com",
      from: "en",
      to: "id",
    });
    //console.log(result1)
    res.push(result1);
    const result2 = await Translate(quote, {
      tld: "com",
      from: "en",
      to: "jw",
    });
    res.push(result2);
    const result3 = await Translate(quote, {
      tld: "com",
      from: "en",
      to: "su",
    });
    res.push(result3);
    setResult(res);
    setIsLoading(false)
  };
  console.log(result);
  const Loading = ()=> {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color="#CB4545" />
      </View>
    );
  }
  return (
    <View style={{ padding: 10, flex:1 }}>
      <Title style={{ fontSize: 30, marginTop: 10 }}>Today's Advice</Title>
      <Caption style={{ fontSize: 15, marginBottom:10 }}>{today}</Caption>
      <Chip
        style={{ backgroundColor: "#fcde74", width: 80 }}
        textStyle={{ color: "#CB4545" }}
      >
        English
      </Chip>
      <Paragraph style={styles.quote}>"{quote}"</Paragraph>
      <Chip
        style={{ backgroundColor: "#fcde74", width: 100 }}
        textStyle={{ color: "#CB4545" }}
      >
        Indonesia
      </Chip>
      {isLoading?Loading():<Paragraph style={styles.quote}>"{result[0]}"</Paragraph>}
      <Chip
        style={{ backgroundColor: "#fcde74", width: 80 }}
        textStyle={{ color: "#CB4545" }}
      >
        Jawa
      </Chip>
      {isLoading?Loading():<Paragraph style={styles.quote}>"{result[1]}"</Paragraph>}
      <Chip
        style={{ backgroundColor: "#fcde74", width: 80 }}
        textStyle={{ color: "#CB4545" }}
      >
        Sunda
      </Chip>
      {isLoading?Loading():<Paragraph style={styles.quote}>"{result[2]}"</Paragraph>}
    </View>
  );
}

const styles = StyleSheet.create({
  quote: {
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#fff",
  },
});
