import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useAuth from "@hooks/useAuth";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth();

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>

      <Button
        title="Sign Out"
        style={styles.button}
        onPress={() => signOut(auth)}
      />
      <Button
        title="Navigate DetailedUserView"
        style={styles.button}
        onPress={() => navigation.navigate("DetailedUserView")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
});

export default HomeScreen;
