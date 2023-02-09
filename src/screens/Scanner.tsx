import React, { useState, useEffect, FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useAuth from "@hooks/useAuth";
import useFirestore from "@hooks/useFirestore";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { signOut, getAuth } from "firebase/auth";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SelectList } from "react-native-dropdown-select-list";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from 'react-native-flash-message';

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
    { key: "9", value: "workshopRaffle" },
  ];


  const updateValue = () => {
      switch(selected){
        case "1":
          updateHacker({...hacker , breakfastSat: !hacker.breakfastSat});
          updateHackerMessage("Breakfast Saturday for Hacker Updated", true);
          break;
        case "2":
          updateHacker({...hacker, breakfastSun: !hacker.breakfastSun});
          updateHackerMessage("Breakfast Sunday for Hacker Updated", true);
          break;        
        case "3":
          updateHacker({...hacker , dinnerFri: !hacker.dinnerFri});
          updateHackerMessage("Dinner Friday for Hacker Updated", true);
          break;
        case "4":
          updateHacker({...hacker , dinnerSat: !hacker.dinnerSat});
          updateHackerMessage("Dinner Saturday for Hacker Updated", true);
          break;
        case "5":
          updateHacker({...hacker , lunchSat: !hacker.lunchSat});
          updateHackerMessage("Lunch Saturday for Hacker Updated", true);
          break;
        case "6":
          updateHacker({...hacker , lunchSun: !hacker.lunchSun});
          updateHackerMessage("Lunch Sunday for Hacker Updated", true);
          break;
        case "7":
          updateHacker({...hacker , midnightFri: !hacker.midnightFri});
          updateHackerMessage("Midnight Friday for Hacker Updated", true);
          break;
        case "8":
          updateHacker({...hacker , midnightSat: !hacker.midnightSat});
          updateHackerMessage("Midnight Saturday for Hacker Updated", true);
          break;
        case "9":
          updateHacker({...hacker , workshopRaffle: hacker.workshopRaffle++});
          updateHackerMessage("WorkShopRaffle for Hacker Updated", true);
          break;
        default:
          updateHackerMessage("No Field Selected", false);
          break;
      }
  }

  const updateHackerMessage = (message: string, result: boolean) => {
    result ? 
      showMessage({
        message: message,
        type: 'success',
      })
      :
      showMessage({
        message: message,
        type: 'warning',
      })
  }

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
    <View style={styles.container}>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400, borderColor: "#fff", borderWidth: 2 }}
        />
      </View>
      <Text style={styles.mainText}>Welcome {user?.email}!</Text>
      {scanned && (
        <Button title={"Scan Again"} style={styles.scanAgainButton}  type="outline"
        buttonStyle={{
          backgroundColor: "#fff",
          borderRadius: 5,
          borderColor: '#000000',
          borderWidth: 2,
        }}
                titleStyle={{ marginHorizontal: 20, color: 'black', fontSize:18, fontWeight: '700', fontFamily: 'Helvetica',}} onPress={() => setScanned(false)}></Button>
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
        dropdownStyles={{ backgroundColor: "#fff",}}
        dropdownTextStyles={{ color: "#000000" }}
        boxStyles={{ borderColor: "#000000", borderWidth: 2}}
        inputStyles={{ color: "#000000", borderColor: "#fff", fontWeight: '700', fontFamily: 'Helvetica',}}
      />
      <Button
        title="Update Hacker"
        style={styles.button}
        type="outline"
                buttonStyle={{
                backgroundColor: "#FFF",
                borderRadius: 5,
                borderColor: '#000000',
                borderWidth: 2,
              }}
              titleStyle={{ marginHorizontal: 20, color: 'black', fontSize:18, fontWeight: '700', fontFamily: 'Helvetica',}}
        disabled={!scanned}
        onPress={() => updateValue()}

      />
      <Button
        title="Navigate DetailedUserView "
        style={styles.button}
        type="outline"
        buttonStyle={{
          backgroundColor: "#fff",
          borderRadius: 5,
          borderColor: '#000000',
          borderWidth: 2,
        }}
                titleStyle={{ marginHorizontal: 20, color: 'black', fontSize:18, fontWeight: '700', fontFamily: 'Helvetica',}}
        disabled={!scanned}
        onPress={() => navigation.navigate("DetailedUserView")}
      />
      <Button
        title="Sign Out"
        type="outline"
        buttonStyle={{
            backgroundColor: "#fff",
            borderRadius: 5,
            borderColor: '#000000',
            borderWidth: 2,
                
              }}
        titleStyle={{ marginHorizontal: 20, color: 'black', fontSize:18, fontWeight: '700',    fontFamily: 'Helvetica'}}
        style={styles.button}
        onPress={() => signOut(auth)}
      />  
      <FlashMessage style={{height: '20px'}} position="top"/>
    </View>
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
    marginTop: 10,
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
    fontFamily: 'Helvetica',
  },
  hackerText: {
    margin: 20,
    fontSize: 15,
    fontFamily: 'Helvetica',
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
