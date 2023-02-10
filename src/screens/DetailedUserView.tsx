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
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

const DetailedUserView: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const { hacker, updateHacker, error, setError } = useFirestore();
  // state for hacker values, food tickets
  const [hackerVal, sethackerVal] = useState(hacker);

  useEffect(() => {
    sethackerVal(hacker);
  }, [hacker]);

  const updateDatabase = async () => {
    // Casts workshopRaffle as a Number after textinput from hackerRaffleTickets.tsx
    const newWorkshopRaffle = Number(hackerVal.workshopRaffle);
    await updateHacker({
      ...hackerVal,
      workshopRaffle: newWorkshopRaffle,
    });

    if (error) {
      showMessage({
        message: "There was an error updating the hacker",
        type: "danger",
      });
      setError("");
    } else {
      showMessage({
        message: `Updating hacker ${hackerVal.name} was successful!`,
        type: "success",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.checkListWrapper}>
          <Text style={styles.hackerNameplate}>Hacker: {hacker.name}</Text>
          <View style={styles.checkListItem}>
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
            <HackerValue
              text={"Friday Midnight"}
              onChange={() =>
                sethackerVal({
                  ...hackerVal,
                  midnightFri: !hackerVal.midnightFri,
                })
              }
              value={hackerVal.midnightFri}
            />
            <HackerValue
              text={"Saturday Midnight"}
              onChange={() =>
                sethackerVal({
                  ...hackerVal,
                  midnightSat: !hackerVal.midnightSat,
                })
              }
              value={hackerVal.midnightSat}
            />
          </View>

          <TouchableOpacity
            style={styles.databaseButton}
            onPress={() => updateDatabase()}
          >
            <Text style={styles.databaseButtonText}>UPDATE HACKER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,
    elevation: 3,
    fontWeight: "bold",
  },
  databaseButtonText: {
    fontSize: 25,
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
