import React from "react";
import { View, ActivityIndicator, Text, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screen/Home";
import LoginScreen from "../screen/Login";
import RegisterScreen from "../screen/Register";

import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";
import { backendAPIlogin, backendAPIreg} from "../../../bimil"

const Stack = createNativeStackNavigator();

export default function navigator() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken = null;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
        console.log("ut", userToken);
      } catch (e) {
        console.log("load error", e);
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    }, 2000);
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (user) => {
        fetch(backendAPIlogin, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: user.email,
            Password: user.password,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res[0].token) {
              const userToken = res[0].token;
              SecureStore.setItemAsync("userToken", userToken);
              dispatch({ type: "SIGN_IN", token: userToken });
            } else {
              Alert.alert(res[0].Message);
            }
          })
          .catch((error) => {
            console.log("Error login", error);
          });
      },
      signOut: () => {
        SecureStore.deleteItemAsync("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: (user) => {
        fetch(backendAPIreg, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: user.name,
            Email: user.email,
            Password: user.password,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res[0].token) {
              const userToken = res[0].token;
              SecureStore.setItemAsync("userToken", userToken);
              dispatch({ type: "SIGN_IN", token: userToken });
            } else Alert.alert(res[0].Message);
          })
          .catch((error) => {
            console.log("Error register", error);
          });
      },
    }),
    []
  );

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>LOADING</Text>
      </View>
    );
  }
  console.log("st", state);
  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: "#CB4545",
          },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#fcde74" },
        }}
      >
        {state.userToken ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
