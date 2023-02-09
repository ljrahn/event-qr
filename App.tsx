import React from "react";
import { ThemeProvider } from "react-native-elements";
import "./src/config/firebase";
import RootNavigation from "@navigation/index";
import FirestoreProvider from "@context/FirestoreProvider";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Helvetica: require("./assets/fonts/Helvetica.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <FirestoreProvider>
      <ThemeProvider>
        <RootNavigation />
      </ThemeProvider>
    </FirestoreProvider>
  );
}
