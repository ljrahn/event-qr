import React, { useState } from "react";
import {Button, SafeAreaView, ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import HackerValue from "@components/hackerValue";
import HackerRaffleTickets from "@components/hackerRaffleTickets";
import GetUserValues from "@components/getUserValues";
import HackerName from "@components/hackerName";
// import { Button } from "react-native-elements";

/* 
* ????????????? 
* how to import hacker from scanner.tsx
* import Hacker from "Scanner";
*/

const DetailedUserView: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  // const [hackerVal, sethackerVal] = useState();
  const [hackerValItems, sethackerValItems] = useState([]);

  // state for hacker values, food tickets
  const {hackerVal, sethackerVal} = useState({
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
  });
  // Checkbox onChange={() => setState(...state, friBreakfast: true)}
  
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
      {/* Navigation back to Scanner Page*/}
      <Button
        title=" Go Back to Scanner"
        onPress={() => navigation.navigate("Scanner")}
      />
      {/*<Text>DetailedUserView</Text>*/}
      {/* checklist wrapper */}
      <ScrollView>      
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
          <HackerValue 
            text={'Friday Dinner'} 
            onChange={() => sethackerVal({
              ...hackerVal, 
              dinnerFri: !hackerVal.dinnerFri
              })}
          />
          <HackerValue 
            text={'Saturday Breakfast'}
            onChange={() => sethackerVal({
              ...hackerVal, 
              breakfastSat: !hackerVal.breakfastSat
              })}
          />
          <HackerValue 
            text={'Saturday Lunch'}
            onChange={() => sethackerVal({
              ...hackerVal, 
              lunchSat: !hackerVal.lunchSat
              })}
          />
          <HackerValue 
            text={'Saturday Dinner'} 
            onChange={() => sethackerVal({
              ...hackerVal, 
              dinnerSat: !hackerVal.dinnerSat
              })}
          />
          <HackerValue 
            text={'Sunday Breakfast'}
            onChange={() => sethackerVal({
              ...hackerVal, 
              breakfastSun: !hackerVal.breakfastSun
              })}
          />
          <HackerValue 
            text={'Sunday Lunch'}
            onChange={() => sethackerVal({
              ...hackerVal, 
              lunchSun: !hackerVal.lunchSun
              })}
          />
          <HackerName 
            text={'Hacker Name'} 
          />
          <HackerRaffleTickets 
            text={'Raffle Tickets'} />
        </View>
        
      
        <TouchableOpacity 
        style={styles.databaseButton}
        onPress={() => sethackerVal({
          ...hackerVal
        })}
        >
          <Text style={styles.databaseButtonText}>UPDATE DATABASE</Text>
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
    backgroundColor: "#D3D3D3",
    //paddingTop: 20,
    //alignItems: "center",
    //justifyContent: "center"
  },  
  checkListWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 90,
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
    bottom: 20,
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
  databaseButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#FF5F1F",
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 25,
    elevation: 3,
    fontSize: 70,
    fontWeight: "bold",
  },
  databaseButtonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
}
});

export default DetailedUserView;
