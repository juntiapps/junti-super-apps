import React from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";

export default function Login({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [secureText, setSecureText] = React.useState(true);
  const [error,setError] = React.useState('');

  const handleSignIn = () => {
    const checkEmail = RegExp(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i
    );

    if ((user.password == "" || user.email == "")) {
      setError("Required Field is Missing");
      // username validation
    } else if (!checkEmail.test(user.email)) {
      setError("invalid email");
      // Password validations
    } else if (user.password.length < 8) {
      setError("Minimum 8 characters required");
    } else if (
      !/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(user.password)
    ) {
      setError("Use atleast 1 special character!!!");
    } else if (/[ ]/.test(user.password)) {
      setError("Don't include space in password");
    } else signIn(user);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="Email"
        //placeholder="enter email"
        onChangeText={(text) => setUser({ ...user, email: text })}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.textInput}
        label="Password"
        //placeholder="enter password"
        secureTextEntry={secureText}
        onChangeText={(text) => setUser({ ...user, password: text })}
        right={
          <TextInput.Icon
            name="eye"
            onPress={
              secureText
                ? () => setSecureText(false)
                : () => setSecureText(true)
            }
          />
        }
      />
      <Text>{error}</Text>
      <Button onPress={() => handleSignIn()} mode="contained" color="#CB4545">
        Login
      </Button>
      <Text style={{ margin: 10 }}>Have No Account? Press Register</Text>
      <Button onPress={() => navigation.navigate("Register")} mode="outlined" color="#CB4545">
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  textInput: {
    marginBottom: 10,
  },
});
