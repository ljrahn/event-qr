import React from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

const HackerValue = (props: any) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 25,
    height: 25,
    backgroundColor: '#A020F0',
    opacity: 0.7,
    borderRadius: 8,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    fontWeight: 'bold',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '000',
    borderWidth: 2,
    borderRadius: 8,
  },
});

export default HackerValue;
