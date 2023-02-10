import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const HackerRaffleTickets = (props: any) => {
  const [workshopRaffle, setWorkshopRaffle] = React.useState(
    props.workshopRaffle
  );

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemText}>{props.text}</Text>

        <Text style={styles.itemText}>{":  " + workshopRaffle}</Text>
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeWorkshopRaffle}
          value={props.workshopRaffle}
          placeholder="Overwrite Number of Tickets"
          keyboardType="numeric"
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
    marginTop: 12,
    width: 250,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    fontWeight: "bold",
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

  itemText: {
    maxWidth: "80%",
    fontWeight: "bold",
    color: "white",
  },
});

export default HackerRaffleTickets;
