import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import useAuth from "@hooks/useAuth";
import useFirestore from "@hooks/useFirestore";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth();

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuth();
  const { hacker, getHacker, updateHacker, error } = useFirestore();

  useEffect(() => {
    const initHacker = async () => {
      await getHacker("000e556377b34c8d954b67acf22b0ac5");
      console.log(hacker);
    };
    initHacker();
  }, []);

  return (
    <View style={styles.container}>
      {!!error && (
        <View style={styles.error}>
          <Text>{error}</Text>
        </View>
      )}

      <Text>Welcome {user?.email}!</Text>
      <Text>{hacker.id}</Text>

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
      <Button
        title="Update Hacker"
        style={styles.button}
        onPress={() =>
          updateHacker({
            ...hacker,
            dinnerFri: false,
            id: "000e556377b34c8d954b67acf22b0ac5",
          })
        }
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
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default HomeScreen;
