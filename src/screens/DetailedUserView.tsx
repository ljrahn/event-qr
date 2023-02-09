import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import HackerValue from "@components/hackerValue";
import HackerRaffleTickets from "@components/hackerRaffleTickets";
import GetUserValues from "@components/getUserValues";
import HackerName from "@components/hackerName";
import firebase from "firebase/compat/app";
import useFirestore from "@hooks/useFirestore";
import { useEffect } from "react";
// import { Button } from "react-native-elements";

/*
 * ?????????????
 * how to import hacker from scanner.tsx
 * import Hacker from "Scanner";
 */

const DetailedUserView: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  // const [hackerVal, sethackerVal] = useState();
  const { hacker, getHacker, updateHacker, error, setError } = useFirestore();
  // state for hacker values, food tickets
  const [hackerVal, sethackerVal] = useState(hacker);

  const [popupDisplay, setPopupDisplay] = useState({
    msg: "",
    displaySuccess: false,
  });

  useEffect(() => {
    // Remove!!
    // getHacker("000e556377b34c8d954b67acf22b0ac5");

    // Keep!!
    if (error) {
      setPopupDisplay({
        msg: "There was an error fetching the hacker",
        displaySuccess: false,
      });
      setTimeout(() => {
        setError("");
        setPopupDisplay({
          msg: "",
          displaySuccess: false,
        });
      }, 3000);
    }
  }, []);

  const updateDatabase = async () => {
    // Casts workshopRaffle as a Number after textinput from hackerRaffleTickets.tsx
    const newWorkshopRaffle = Number(hackerVal.workshopRaffle);
    await updateHacker({
      ...hackerVal,
      workshopRaffle: newWorkshopRaffle,
    });

    if (error) {
      setPopupDisplay({
        msg: `There was an error updating the hacker`,
        displaySuccess: false,
      });
      setTimeout(() => {
        setError("");
        setPopupDisplay({
          msg: "",
          displaySuccess: false,
        });
      }, 3000);
    } else {
      setPopupDisplay({
        msg: `Updating hacker ${hackerVal.name} was successful!`,
        displaySuccess: true,
      });
      setTimeout(() => {
        setPopupDisplay({
          msg: "",
          displaySuccess: false,
        });
      }, 3000);
    }
  };

  /*
  // Adds values to the display (learning)
  const handleAddValue = () => {
    console.log(hackerVal);
    Keyboard.dismiss();
    sethackerValItems([...hackerValItems, hackerVal])
    sethackerVal(null);
  }
  */

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation back to Scanner Page
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Scanner")}
      >
        <Text style={styles.databaseButtonText}>Go Back to Scanner</Text>
      </TouchableOpacity>*/}
      {!!popupDisplay.msg && (
        <View
          style={popupDisplay.displaySuccess ? styles.success : styles.error}
        >
          <Text>{popupDisplay.msg}</Text>
        </View>
      )}
      {/*<Text>DetailedUserView</Text>*/}
      {/* checklist wrapper */}
      <ScrollView>
        <View style={styles.checkListWrapper}>
          {/*<Text style={styles.checkListTitle}>Hacker Data Values</Text>*/}
          <Text style={styles.hackerNameplate}>Hacker: {hackerVal.name}</Text>
          {/* Items wrapper */}
          <View style={styles.checkListItem}>
            {/*
          TEST FOR GETTING FIREBASE DATA FOR A USERID
          <HackerValue text={GetUserValues('000e556377b34c8d954b67acf22b0ac5')} />
          
          PROPOSED CHECKBOX FROM LAST MEETING
          <Checkbox onChange={() => setState(...state, friBreakfast: true)} />
           */}

            <HackerValue
              text={"Friday Dinner"}
              onChange={() =>
                sethackerVal({
                  ...hackerVal,
                  dinnerFri: !hackerVal.dinnerFri,
                })
              }
              value={hackerVal.dinnerFri}
            />
            <HackerValue
              text={"Saturday Breakfast"}
              onChange={() =>
                sethackerVal({
                  ...hackerVal,
                  breakfastSat: !hackerVal.breakfastSat,
                })
              }
              value={hackerVal.breakfastSat}
            />
            <HackerValue
              text={"Saturday Lunch"}
              onChange={() =>
                sethackerVal({
                  ...hackerVal,
                  lunchSat: !hackerVal.lunchSat,
                })
              }
              value={hackerVal.lunchSat}
            />
            <HackerValue
              text={"Saturday Dinner"}
              onChange={() =>
                sethackerVal({
                  ...hackerVal,
                  dinnerSat: !hackerVal.dinnerSat,
                })
              }
              value={hackerVal.dinnerSat}
            />
            <HackerValue
              text={"Sunday Breakfast"}
              onChange={() =>
                sethackerVal({
                  ...hackerVal,
                  breakfastSun: !hackerVal.breakfastSun,
                })
              }
              value={hackerVal.breakfastSun}
            />
            <HackerValue
              text={"Sunday Lunch"}
              onChange={() =>
                sethackerVal({
                  ...hackerVal,
                  lunchSun: !hackerVal.lunchSun,
                })
              }
              value={hackerVal.lunchSun}
            />
            <HackerName
              text={"Hacker Name"}
              name={hackerVal.name}
              onChangeName={(name: any) =>
                sethackerVal({
                  ...hackerVal,
                  name,
                })
              }
            />
            <HackerRaffleTickets
              text={"Raffle Tickets"}
              workshopRaffle={hackerVal.workshopRaffle}
              onChangeWorkshopRaffle={(workshopRaffle: any) =>
                sethackerVal({
                  ...hackerVal,
                  workshopRaffle,
                })
              }
            />
          </View>

          <TouchableOpacity
            style={styles.databaseButton}
            onPress={() => updateDatabase()}
          >
            <Text style={styles.databaseButtonText}>UPDATE HACKER</Text>
          </TouchableOpacity>
        </View>

        {/* Keyboard Input */}
        {/* @ TextInputA value is the entered text i.e hacker Name and Raffle 
        value={textInput}
        onChangeText={text => sethackerVal(text)}*/}
        {/* @TouchableOpacity onPress={() => handleAddValue()} 
      
      
      
        <View style={styles.databaseButton}>
          <Button
            title="UPDATE DATABASE"
            // style={styles.databaseButton}
            color="#FF5F1F"
            onPress={() => sethackerVal({
              ...hackerVal
            })}
          />
      
      */}
      </ScrollView>
      {/*
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeDataWrapper}
        >
        <TextInput 
        style={styles.input} 
        placeholder={'Update Text'}
        />
        <TouchableOpacity
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    //paddingTop: 20,
    //alignItems: "center",
    //justifyContent: "center"
  },
  checkListWrapper: {
    paddingTop: 20,
    paddingHorizontal: 40,
    paddingBottom: 90,
  },
  checkListTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  hackerNameplate: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  checkListItem: {
    marginTop: 30,
  },
  writeDataWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 3,
  },
  addWrapper: {
    height: 60,
    width: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 3,
  },
  addText: {},
  button: {
    marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkgray",
  },
  databaseButton: {
    width: "100%",
    height: 70,
    backgroundColor: "darkgray",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 25,
    elevation: 3,
    fontSize: 70,
    fontWeight: "bold",
  },
  databaseButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },

  error: {
    padding: 15,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },

  success: {
    padding: 15,
    color: "#fff",
    backgroundColor: "#00FF00",
  },
});

export default DetailedUserView;
