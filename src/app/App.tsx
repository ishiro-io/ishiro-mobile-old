import { ApolloProvider } from "@apollo/client";
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts
} from "@expo-google-fonts/poppins";
import { AppLoading, registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { client } from "shared/graphql";
import { theme } from "shared/theme";

import AppNavigator from "./AppNavigator";

const App = () => {
  // TODO : Add scheme in app.json for production
  LogBox.ignoreLogs([
    "Linking requires that you provide a `scheme` in app.json",
    "source.uri should not be an empty string"
  ]);

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <ThemeProvider useDark {...{ theme }}>
        <ApolloProvider {...{ client }}>
          <AppNavigator />
        </ApolloProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default registerRootComponent(App);
