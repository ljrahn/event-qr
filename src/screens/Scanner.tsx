import React, { useState, useEffect, FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import useAuth from "@hooks/useAuth";
import useFirestore from "@hooks/useFirestore";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { signOut, getAuth } from "firebase/auth";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SelectList } from "react-native-dropdown-select-list";

const auth = getAuth();

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { user } = useAuth();
  const { hacker, getHacker, updateHacker, error } = useFirestore();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet Scanned");
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "breakfastSat" },
    { key: "2", value: "breakfastSun" },
    { key: "3", value: "dinnerFri" },
    { key: "4", value: "dinnerSat" },
    { key: "5", value: "lunchSat" },
    { key: "6", value: "lunchSun" },
    { key: "7", value: "midnightFri" },
    { key: "8", value: "midnightSat" },
    { key: "9", value: "name" },
    { key: "10", value: "workshopRaffle" },
  ];

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ text, data }: any) => {
    setScanned(true);
    setText(data);
    await getHacker(text);
    console.log("Type" + text + "\nData" + data);
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting Camera Permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    <View>
      <Text style={{ margin: 10 }}>No Access to Camera</Text>
      <Button
        title={"Allow Camera"}
        onPress={() => askForCameraPermission()}
      ></Button>
    </View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.mainText}>{text}</Text>

      {scanned && (
        <Button title={"Scan Again"} onPress={() => setScanned(false)}></Button>
      )}

      {!!error && (
        <View style={styles.error}>
          <Text>{error}</Text>
        </View>
      )}

      <Text>Welcome {user?.email}!</Text>
      <Text>{hacker.id}</Text>

      <SelectList
        data={data}
        setSelected={setSelected}
        dropdownStyles={{ backgroundColor: "gray" }}
        dropdownTextStyles={{ color: "white" }}
      />
      <Button
        title="Update Hacker"
        style={styles.button}
        onPress={() => updateHacker(hacker)}
      />
      <Button
        title="Navigate DetailedUserView"
        style={styles.button}
        onPress={() => navigation.navigate("DetailedUserView")}
      />
      <Button
        title="Sign Out"
        style={styles.button}
        onPress={() => signOut(auth)}
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
    marginTop: 5,
  },
  mainText: {
    margin: 20,
    fontSize: 16,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },

  barcodeBox: {
    backgroundColor: "#FFF",
    alignContent: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
  },
});

export default HomeScreen;
