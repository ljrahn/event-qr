import React, { useState, useEffect, FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import useAuth from "@hooks/useAuth";
import useFirestore from "@hooks/useFirestore";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { signOut, getAuth } from "firebase/auth";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SelectList } from "react-native-dropdown-select-list";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

const auth = getAuth();

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  let ScreenHeight = Dimensions.get("window").height;
  const { user } = useAuth();
  const { hacker, getHacker, updateHacker, error, setError } = useFirestore();

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
    { key: "9", value: "workshopRaffle" },
  ];

  const updateValue = async () => {
    switch (selected) {
      case "1":
        updateFood(hacker.breakfastSat, "Breakfast Saturday", "breakfastSat");
        break;
      case "2":
        updateFood(hacker.breakfastSun, "Breakfast Sunday", "breakfastSun");
        break;
      case "3":
        updateFood(hacker.dinnerFri, "Dinner Friday", "dinnerFri");
        break;
      case "4":
        updateFood(hacker.dinnerSat, "Dinner Saturday", "dinnerSat");
        break;
      case "5":
        updateFood(hacker.lunchSat, "Lunch Saturday", "lunchSat");
        break;
      case "6":
        updateFood(hacker.lunchSun, "Lunch Sunday", "lunchSun");
        break;
      case "7":
        updateFood(hacker.midnightFri, "Midnight Friday", "midnightFri");
        break;
      case "8":
        updateFood(hacker.midnightSat, "Midnight Saturday", "midnightSat");
        break;
      case "9":
        await updateHacker({
          ...hacker,
          workshopRaffle: hacker.workshopRaffle++,
        });
        if (error) {
          showMessage({
            message: "There was an error updating workshop raffle!",
            type: "danger",
          });
          setError("");
        } else {
          showMessage({
            message: "Workshop Raffle for Hacker Updated",
            type: "success",
          });
        }
        break;
      default:
        showMessage({
          message: "No Field Selected",
          type: "warning",
        });
        break;
    }
  };

  const updateFood = async (meal: boolean, day: string, key: string) => {
    if (meal) {
      showMessage({
        message: `Hacker has already eaten ${day}`,
        type: "warning",
      });
    } else {
      await updateHacker({ ...hacker, [key]: true });
      if (error) {
        showMessage({
          message: "There was an error updating hacker values!",
          type: "danger",
        });
        setError("");
      } else {
        showMessage({
          message: `${day} for Hacker Updated`,
          type: "success",
        });
      }
    }
  };

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
    await getHacker(data);
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
    <ScrollView style={{ backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <View style={styles.barcodeBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{
              width: "100%",
              height: "100%",
              borderColor: "#fff",
              borderWidth: 2,
            }}
          />
        </View>
        {scanned && (
          <View style={styles.scanAgainButton}>
            <Button
              title={"Scan Again"}
              type="outline"
              buttonStyle={{
                backgroundColor: "#fff",
                borderRadius: 5,
                borderColor: "#000000",
                borderWidth: 2,
              }}
              titleStyle={{
                marginHorizontal: 20,
                color: "black",
                fontSize: 18,
                fontWeight: "700",
                fontFamily: "Helvetica",
              }}
              onPress={() => setScanned(false)}
            ></Button>
          </View>
        )}

        {!!error && (
          <View style={styles.error}>
            <Text>{error}</Text>
          </View>
        )}
        <Text style={styles.hackerText}>HackerID: {hacker.id}</Text>

        <SelectList
          data={data}
          setSelected={setSelected}
          dropdownStyles={{ backgroundColor: "#fff" }}
          dropdownTextStyles={{ color: "#000000" }}
          boxStyles={{ borderColor: "#000000", borderWidth: 2 }}
          inputStyles={{
            color: "#000000",
            borderColor: "#fff",
            fontWeight: "700",
          }}
        />
        <View style={styles.button}>
          <Button
            title="Update Hacker"
            type="outline"
            buttonStyle={{
              backgroundColor: "#FFF",
              borderRadius: 5,
              borderColor: "#000000",
              borderWidth: 2,
            }}
            titleStyle={{
              marginHorizontal: 20,
              color: "black",
              fontSize: 18,
              fontWeight: "700",
            }}
            disabled={!scanned}
            onPress={() => updateValue()}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Navigate DetailedUserView "
            type="outline"
            buttonStyle={{
              backgroundColor: "#fff",
              borderRadius: 5,
              borderColor: "#000000",
              borderWidth: 2,
            }}
            titleStyle={{
              marginHorizontal: 20,
              color: "black",
              fontSize: 18,
              fontWeight: "700",
            }}
            disabled={!scanned}
            onPress={() => navigation.navigate("DetailedUserView")}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Sign Out"
            type="outline"
            buttonStyle={{
              backgroundColor: "#fff",
              borderRadius: 5,
              borderColor: "#000000",
              borderWidth: 2,
            }}
            titleStyle={{
              marginHorizontal: 20,
              color: "black",
              fontSize: 18,
              fontWeight: "700",
            }}
            onPress={() => signOut(auth)}
          />
        </View>
      </View>
      <FlashMessage position="top" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
    width: 300,
    marginBottom: 5,
    borderColor: "#fff",
    borderRadius: 10,
    color: "#fff",
  },
  scanAgainButton: {
    marginTop: 20,
    width: 200,
    marginBottom: 10,
  },
  mainText: {
    margin: 20,
    fontSize: 20,
  },
  hackerText: {
    margin: 20,
    fontSize: 15,
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
