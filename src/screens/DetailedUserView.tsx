import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";

const DetailedUserView: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>DetailedUserView</Text>

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
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    marginTop: 10,
  },
});

export default DetailedUserView;
