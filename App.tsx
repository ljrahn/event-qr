import React from "react";
import { ThemeProvider } from "react-native-elements";
import "./src/config/firebase";
import RootNavigation from "@navigation/index";
import FirestoreProvider from "@context/FirestoreProvider";
import { useFonts } from "expo-font";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <FirestoreProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </FirestoreProvider>
  );
}
