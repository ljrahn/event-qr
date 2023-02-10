import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import Checkbox from "expo-checkbox";

const options = {
  breakfastSat: false,
  breakfastSun: false,
  dinnerFri: false,
  dinnerSat: false,
  lunchSat: false,
  lunchSun: false,
  midnightFri: false,
  midnightSat: false,
};

const HackerValue = (props: any) => {
  return (
    <View style={styles.item}>
      <View style={styles.section}>
        <Text style={styles.paragraph}>{props.text}</Text>
      </View>
      <Checkbox
        style={styles.checkbox}
        value={props.value}
        onValueChange={props.onChange}
        color={props.value ? "#A7A7A7" : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  checkbox: {
    marginRight: 8,
  },

  item: {
    backgroundColor: "#262626",
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
  square: {
    width: 25,
    height: 25,
    backgroundColor: "#A020F0",
    opacity: 0.7,
    borderRadius: 8,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
    fontWeight: "bold",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "000",
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default HackerValue;
