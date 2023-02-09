import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const hackerVal = {
  id: "",
  breakfastSat: false,
  breakfastSun: false,
  dinnerFri: false,
  dinnerSat: false,
  lunchSat: false,
  lunchSun: false,
  midnightFri: false,
  midnightSat: false,
  name: "PLACEHOLDER",
  workshopRaffle: 0,
};

const HackerName = (props: any) => {
  const [prevName, setPrevName] = useState(props.name);

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text>{props.text}</Text>

        <Text>{"  =  " + prevName}</Text>
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeName}
          value={props.name}
          placeholder="Overwrite Hacker Name"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FF8F2F",
  },

  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  itemText: {
    maxWidth: "80%",
    fontWeight: "bold",
  },
});

export default HackerName;