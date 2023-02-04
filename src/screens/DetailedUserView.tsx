import React, { useState } from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import HackerValue from "@components/hackerValue";
import GetUserValues from "@components/getUserValues";

const DetailedUserView: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [hackerVal, sethackerVal] = useState();
  const [hackerValItems, sethackerValItems] = useState([]);

  /* state for hacker values, food tickets
  const {state, setState} = useState({
    friDinner: false,
    satBreakfast: false,
    satLun: false,
    satDinner: false,
    sunBreakfast: false,
    sunLun: false,
    sunDinner: false,
    hackerName: "PLACEHOLDER",
    raffleTickets: 0,
  });
  // Checkbox onChange={() => setState(...state, friBreakfast: true)}
  */
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
    <View style={styles.container}>
      {/*<Text>DetailedUserView</Text>*/}
      {/* checklist wrapper */}
      <View style={styles.checkListWrapper}>
        <Text style={styles.checkListTitle}>
          Hacker Data Values
        </Text>
        {/* Items wrapper */}
        <View style={styles.checkListItem}>
          {/* 
          THIS OPERATES AS A TODO LIST ADDING ELEMENTS 
          {
            hackerValItems.map((hackerVal, index) => {
              return <HackerValue key={index} text={hackerVal} />
            })
          }
          */}
          
          {/*
          TEST FOR GETTING FIREBASE DATA FOR A USERID
          <HackerValue text={GetUserValues('000e556377b34c8d954b67acf22b0ac5')} />
          
          PROPOSED CHECKBOX FROM LAST MEETING
          <Checkbox onChange={() => setState(...state, friBreakfast: true)} />
           */}
          <HackerValue text={'Friday Dinner'} />
          <HackerValue text={'Saturday Breakfast'} />
          <HackerValue text={'Saturday Dinner'} />
          <HackerValue text={'Saturday Lunch'} />
          <HackerValue text={'Sunday Breakfast'} />
          <HackerValue text={'Sunday Lunch'} />
          <HackerValue text={'Sunday Dinner'} />
        </View>
      </View>

      {/* Keyboard Input */}
      {/* @ TextInputA value is the entered text i.e hacker Name and Raffle 
        value={textInput}
        onChangeText={text => sethackerVal(text)}*/}
      {/* @TouchableOpacity onPress={() => handleAddValue()} */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeDataWrapper}
        >
        <TextInput 
        style={styles.input} 
        placeholder={'Update Firebase'}
        />
        <TouchableOpacity
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      
      {/* Navigation back to Scanner Page*/}
      <Button
        title="Navigate Scanner"
        style={styles.button}
        onPress={() => navigation.navigate("Scanner")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    //paddingTop: 20,
    //alignItems: "center",
    //justifyContent: "center"
  },  
  checkListWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  checkListTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20
  },
  checkListItem: {
    marginTop: 30,
  },
  writeDataWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 3,
  },
  addWrapper: {
    height: 60,
    width: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 3,
  },
  addText: {

  },
  button: {
    marginTop: 10,
  },
});

export default DetailedUserView;
