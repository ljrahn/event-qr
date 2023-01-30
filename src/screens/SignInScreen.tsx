import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function signIn() {
    if (email === "" || password === "") {
      setError("Email and password are mandatory.");
      return;
    }

    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(String(err));
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signin screen!</Text>

      {!!error && (
        <View style={styles.error}>
          <Text>{error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <Input
          placeholder="Email"
          containerStyle={styles.control}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="Password"
          containerStyle={styles.control}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
    width: 250,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default SignInScreen;
