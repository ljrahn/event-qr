import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // used ot be just firebase
import 'firebase/database';

const GetUserValues = (userID: any) => {
  const [value, setValue] = useState(null);

  // database() method works if firebase is imported from 'firebase'
  firebase.database().ref(`users/${userID}/breakfastSat`)
    .once('value')
    .then((snapshot: { val: () => any; }) => {
      const dataValue = snapshot.val();
      return dataValue;
    })
    .catch((error: any) => console.log(error));
}

export default GetUserValues;
