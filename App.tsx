import React from "react";
import { ThemeProvider } from "react-native-elements";
import "./src/config/firebase";
import RootNavigation from "@navigation/index";
import FirestoreProvider from "@context/FirestoreProvider";

export default function App() {
  return (
    <FirestoreProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </FirestoreProvider>
  );
}
