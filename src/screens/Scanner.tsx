import React, { useState, useEffect, FC } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import useAuth from "@hooks/useAuth";
import useFirestore from "@hooks/useFirestore";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { signOut, getAuth } from "firebase/auth";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SelectList } from "react-native-dropdown-select-list";
import FlashMessage, { showMessage } from "react-native-flash-message";

const auth = getAuth();

const defaultHacker = {
  id: "",
  breakfastSat: false,
  breakfastSun: false,
  dinnerFri: false,
  dinnerSat: false,
  lunchSat: false,
  lunchSun: false,
  midnightFri: false,
  midnightSat: false,
  name: "",
  workshopRaffle: 0,
};

const HomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { hacker, getHacker, setHacker, updateHacker, error, setError } =
    useFirestore();
  const [isScannerPresent, setIsScannerPresent] = useState<boolean>(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
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
          workshopRaffle: ++hacker.workshopRaffle,
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
    setIsScannerPresent(true);
  }, []);

  useEffect(() => {
    if (error) {
      showMessage({
        message: "Error Loading Hacker. Likely Invalid QR Code",
        type: "danger",
      });
      setHacker(defaultHacker);
      setError("");
    }
  }, [error]);

  const handleBarCodeScanned = async ({ text, data }: any) => {
    setScanned(true);
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
    <>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View style={{ width: 300 }}>
            <View style={styles.signOutButton}>
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
                  fontSize: 15,
                  fontWeight: "600",
                }}
                onPress={() => signOut(auth)}
              />
            </View>
          </View>

          {isScannerPresent && (
            <View style={styles.barcodeBox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{
                  width: "100%",
                  height: "100%",
                  borderWidth: 2,
                }}
              />
            </View>
          )}

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
                  fontSize: 16,
                  fontWeight: "700",
                }}
                onPress={() => setScanned(false)}
              ></Button>
            </View>
          )}
          {scanned && hacker.id && (
            <View style={styles.hackerBackground}>
              <Text style={styles.hackerHeader}>HackerID</Text>
              <Text style={styles.hackerText}>{hacker.id}</Text>
            </View>
          )}

          <SelectList
            data={data}
            setSelected={setSelected}
            dropdownStyles={{ backgroundColor: "#fff" }}
            dropdownTextStyles={{ color: "#262626", textAlign: "center" }}
            boxStyles={{
              borderColor: "#262626",
              backgroundColor: "#fff",
              width: 300,
              marginTop: 15,
              marginBottom: 5,
            }}
            inputStyles={{
              color: "#262626",
              fontWeight: "700",
            }}
          />
          <View style={styles.button}>
            <Button
              title="Update Hacker"
              type="outline"
              buttonStyle={{
                backgroundColor: "#262626",
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#262626",
              }}
              titleStyle={{
                marginHorizontal: 20,
                color: "#fff",
                fontSize: 16,
                fontWeight: "700",
              }}
              disabled={!scanned || !hacker.id}
              onPress={() => updateValue()}
            />
          </View>

          <View style={styles.button}>
            <Button
              title="Navigate DetailedUserView "
              type="outline"
              buttonStyle={{
                backgroundColor: "#262626",
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#262626",
              }}
              titleStyle={{
                marginHorizontal: 20,
                color: "#fff",
                fontSize: 16,
                fontWeight: "700",
              }}
              disabled={!scanned || !hacker.id}
              onPress={() => {
                navigation.navigate("DetailedUserView");
                setIsScannerPresent(false);
                setTimeout(() => setIsScannerPresent(true), 1000);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 90,
  },
  signOutButton: {
    marginVertical: 10,
    marginLeft: "auto",
    width: 140,
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
  },
  mainText: {
    margin: 20,
    fontSize: 20,
  },
  hackerBackground: {
    backgroundColor: "#262626",
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    width: 300,
  },
  hackerText: {
    color: "#fff",
    fontSize: 12,
  },
  hackerHeader: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 2,
    textDecorationLine: "underline",
  },

  barcodeBox: {
    backgroundColor: "#262626",
    alignContent: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    marginTop: 10,
  },
});

export default HomeScreen;
